import { readHomeViewport, readSectionGeometry } from './section-geometry'

type EntryState = 'waiting' | 'entering' | 'summary'
type SectionEntry = {
  element: HTMLElement
  key: string
  state: EntryState
  timer?: number
  startFrame?: number
}

const ENTRY_THRESHOLD = 0.6
const COMPLETION_SLACK_MS = 250
// This client-only memory lasts for the loaded document, including SPA remounts.
// Reloading creates a new set; sessionStorage would incorrectly survive reloads.
const enteredSections = new Set<string>()

/** Independent entry states. No scrolling, focus moves or cross-section completion. */
export function createSectionEntry(sequence: HTMLElement, header: HTMLElement) {
  const sections: SectionEntry[] = Array.from(
    sequence.querySelectorAll<HTMLElement>('[data-home-section]'),
    (element) => ({ element, key: element.id, state: 'waiting' }),
  )
  if (
    typeof IntersectionObserver === 'undefined' ||
    typeof window.matchMedia !== 'function'
  )
    return () => {}

  const motion = window.matchMedia(
    '(prefers-reduced-motion: no-preference) and (forced-colors: none)',
  )
  if (typeof motion.addEventListener !== 'function') return () => {}

  let disposed = false
  let updateFrame = 0
  let intersection: IntersectionObserver | undefined
  let resize: ResizeObserver | undefined

  function settle(entry: SectionEntry, remember = true) {
    window.clearTimeout(entry.timer)
    if (entry.startFrame !== undefined) cancelAnimationFrame(entry.startFrame)
    entry.timer = entry.startFrame = undefined
    entry.state = 'summary'
    entry.element.dataset.entryState = 'summary'
    delete entry.element.dataset.entryFreshHero
    if (remember) enteredSections.add(entry.key)
  }

  function finishActive() {
    for (const entry of sections) {
      if (entry.state === 'entering') settle(entry)
    }
  }

  function coverage(entry: SectionEntry) {
    const viewport = readHomeViewport(sequence)
    const box = readSectionGeometry(entry.element, viewport)
    // Tall sections can never reach 60% intersection of their entire height.
    // Entry uses the smaller of section/visible viewport, unlike vertical snapping.
    const basis = Math.min(box.bottom - box.top, viewport.visibleHeight)
    return basis > 0 ? box.visible / basis : 0
  }

  function enter(entry: SectionEntry, freshHero = false) {
    if (freshHero) entry.element.dataset.entryFreshHero = 'true'
    entry.state = 'entering'
    entry.element.dataset.entryState = 'entering'
    // Do not consume an entrance during StrictMode's pre-paint setup/cleanup.
    entry.startFrame = requestAnimationFrame(() => {
      entry.startFrame = undefined
      enteredSections.add(entry.key)
    })
    // Follow the CSS duration so changing its single tuning value cannot cause
    // the safety timer to cut the entrance short. Accept literal ms or s values.
    const duration = getComputedStyle(entry.element)
      .getPropertyValue('--entry-duration')
      .trim()
    const milliseconds =
      Number.parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000)
    const durationMs =
      Number.isFinite(milliseconds) && milliseconds > 0 ? milliseconds : 950
    entry.timer = window.setTimeout(
      () => settle(entry),
      durationMs + COMPLETION_SLACK_MS,
    )
  }

  function update(animate = true) {
    if (disposed || document.hidden) return
    try {
      for (const entry of sections) {
        if (entry.state === 'summary') continue
        const visible = coverage(entry)
        if (entry.state === 'entering') {
          if (!motion.matches || visible < ENTRY_THRESHOLD) settle(entry)
          continue
        }
        if (visible < ENTRY_THRESHOLD) continue
        if (
          !animate ||
          !motion.matches ||
          (entry.element.dataset.featureState &&
            entry.element.dataset.featureState !== 'summary')
        )
          settle(entry)
        else enter(entry)
      }
    } catch {
      // Readable local fallback; unseen sections are not remembered as visited.
      sections.forEach((entry) => settle(entry, entry.state === 'entering'))
    }
  }

  function scheduleUpdate() {
    if (disposed || updateFrame) return
    updateFrame = requestAnimationFrame(() => {
      updateFrame = 0
      update()
    })
  }

  function entryFor(target: EventTarget | null) {
    return target instanceof Element
      ? sections.find(({ element }) => element.contains(target))
      : undefined
  }

  function onInteraction(event: Event) {
    const entry = entryFor(event.target)
    if (entry) settle(entry)
  }

  function onControlInteraction(event: Event) {
    // Starting a touch scroll on a pending section is not a request to skip it.
    if (
      event.target instanceof Element &&
      event.target.closest(
        'a, button, summary, input, textarea, select, [contenteditable]:not([contenteditable="false"])',
      )
    )
      onInteraction(event)
  }

  function onAnimationEnd(event: AnimationEvent) {
    const entry = entryFor(event.target)
    if (
      entry?.state === 'entering' &&
      event.target instanceof Element &&
      event.target.getAttribute('data-entry-part') === 'illustration'
    )
      settle(entry)
  }

  function onAnimationCancel(event: Event) {
    const entry = entryFor(event.target)
    if (entry?.state === 'entering') settle(entry)
  }

  function onPreferenceChange() {
    if (!motion.matches) finishActive()
    update()
  }

  function onVisibilityChange() {
    if (document.hidden) finishActive()
    else scheduleUpdate()
  }

  function onPageShow(event: PageTransitionEvent) {
    if (event.persisted) {
      finishActive()
      update(false)
    } else scheduleUpdate()
  }

  function onResize() {
    finishActive()
    scheduleUpdate()
  }

  function cleanup() {
    disposed = true
    cancelAnimationFrame(updateFrame)
    sections.forEach((entry) => settle(entry, false))
    intersection?.disconnect()
    resize?.disconnect()
    motion.removeEventListener('change', onPreferenceChange)
    document.removeEventListener('scroll', scheduleUpdate)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    window.removeEventListener('pageshow', onPageShow)
    window.removeEventListener('pagehide', finishActive)
    window.removeEventListener('resize', onResize)
    window.visualViewport?.removeEventListener('resize', onResize)
    sequence.removeEventListener('focusin', onInteraction)
    sequence.removeEventListener('pointerdown', onControlInteraction, true)
    sequence.removeEventListener('click', onControlInteraction, true)
    sequence.removeEventListener('animationend', onAnimationEnd)
    sequence.removeEventListener('animationcancel', onAnimationCancel)
    sequence.removeEventListener('home:reveal-entry', onInteraction)
    sequence.removeEventListener('home:feature-change', onInteraction)
  }

  try {
    intersection = new IntersectionObserver(scheduleUpdate, {
      threshold: [0, 0.01, ENTRY_THRESHOLD, 1],
    })
    if (typeof ResizeObserver !== 'undefined') {
      const sizes = new WeakMap<Element, string>()
      resize = new ResizeObserver((entries) => {
        let changed = false
        for (const entry of entries) {
          const size = `${entry.contentRect.width}:${entry.contentRect.height}`
          const previous = sizes.get(entry.target)
          if (previous !== undefined && previous !== size) changed = true
          sizes.set(entry.target, size)
        }
        if (changed) onResize()
      })
    }
    motion.addEventListener('change', onPreferenceChange)
    document.addEventListener('scroll', scheduleUpdate, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('pagehide', finishActive)
    window.addEventListener('resize', onResize)
    window.visualViewport?.addEventListener('resize', onResize)
    sequence.addEventListener('focusin', onInteraction)
    sequence.addEventListener('pointerdown', onControlInteraction, true)
    sequence.addEventListener('click', onControlInteraction, true)
    sequence.addEventListener('animationend', onAnimationEnd)
    sequence.addEventListener('animationcancel', onAnimationCancel)
    sequence.addEventListener('home:reveal-entry', onInteraction)
    sequence.addEventListener('home:feature-change', onInteraction)

    const navigation = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    const restoring = navigation?.type === 'back_forward' || window.scrollY > 0
    let fragmentTarget: HTMLElement | null = null
    try {
      fragmentTarget = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      )
    } catch {
      // Malformed fragments have no target; all content stays usable.
    }
    for (const entry of sections) {
      intersection.observe(entry.element)
      resize?.observe(entry.element)
      if (
        enteredSections.has(entry.key) ||
        entry.element.contains(fragmentTarget) ||
        entry.element.contains(document.activeElement)
      ) {
        settle(entry)
      } else if (!document.hidden && coverage(entry) >= ENTRY_THRESHOLD) {
        if (restoring || !motion.matches) settle(entry)
        else
          enter(
            entry,
            entry.element.dataset.homeSection === 'hero' &&
              window.scrollY === 0 &&
              !window.location.hash,
          )
      } else {
        entry.element.dataset.entryState = 'waiting'
      }
    }
    resize?.observe(header)
    resize?.observe(sequence)
  } catch {
    cleanup()
  }

  return cleanup
}
