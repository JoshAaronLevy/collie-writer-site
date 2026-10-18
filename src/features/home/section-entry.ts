import { readHomeViewport, readSectionGeometry } from './section-geometry'

type EntryState = 'waiting' | 'entering' | 'summary'

type SectionEntry = {
  element: HTMLElement
  state: EntryState
  seen: boolean
  timer?: number
}

const ENTRY_THRESHOLD = 0.6
// Longest CSS entrance is 580ms; completion must not depend on animation events.
const COMPLETION_FALLBACK_MS = 800

/** One visit-scoped controller. It never scrolls, changes focus, or hides DOM nodes. */
export function createSectionEntry(sequence: HTMLElement, header: HTMLElement) {
  const sections: SectionEntry[] = Array.from(
    sequence.querySelectorAll<HTMLElement>('[data-home-section]'),
    (element) => ({ element, state: 'summary', seen: false }),
  )
  if (
    typeof IntersectionObserver === 'undefined' ||
    typeof ResizeObserver === 'undefined' ||
    typeof window.matchMedia !== 'function'
  )
    return () => {}

  const motion = window.matchMedia(
    '(prefers-reduced-motion: no-preference) and (forced-colors: none)',
  )
  if (!motion.matches || typeof motion.addEventListener !== 'function')
    return () => {}

  let disposed = false
  let intersection: IntersectionObserver | undefined
  let resize: ResizeObserver | undefined

  function settle(entry: SectionEntry) {
    window.clearTimeout(entry.timer)
    entry.timer = undefined
    entry.state = 'summary'
    entry.element.dataset.entryState = 'summary'
    delete entry.element.dataset.entryFreshHero
  }

  function settleAll() {
    sections.forEach(settle)
  }

  function geometry(entry: SectionEntry) {
    return readSectionGeometry(entry.element, readHomeViewport(sequence))
  }

  function enter(entry: SectionEntry, freshHero = false) {
    if (freshHero) entry.element.dataset.entryFreshHero = 'true'
    entry.state = 'entering'
    entry.element.dataset.entryState = 'entering'
    entry.timer = window.setTimeout(() => settle(entry), COMPLETION_FALLBACK_MS)
  }

  function update() {
    if (disposed) return
    try {
      for (const entry of sections) {
        if (entry.state === 'summary') continue
        const box = geometry(entry)
        if (
          !box.fits ||
          !motion.matches ||
          document.hidden ||
          (entry.element.dataset.featureState &&
            entry.element.dataset.featureState !== 'summary')
        ) {
          settle(entry)
        } else if (entry.state === 'entering') {
          if (box.ratio < ENTRY_THRESHOLD) settle(entry)
        } else if (box.ratio >= ENTRY_THRESHOLD) {
          enter(entry)
        } else if (box.bottom <= 0 || (entry.seen && box.ratio === 0)) {
          settle(entry)
        } else if (box.ratio > 0) {
          entry.seen = true
        }
      }
    } catch {
      settleAll()
    }
  }

  function revealTarget(target: EventTarget | null) {
    if (!(target instanceof Element)) return
    const entry = sections.find(({ element }) => element.contains(target))
    if (entry) settle(entry)
  }

  function onInteraction(event: Event) {
    revealTarget(event.target)
  }

  function onAnimationEnd(event: AnimationEvent) {
    // The illustration is the last group to finish (80 + 500ms).
    if (
      event.target instanceof Element &&
      event.target.getAttribute('data-entry-part') === 'illustration'
    ) {
      revealTarget(event.target)
    }
  }

  function onPreferenceChange() {
    // A settled/fallback visit never re-arms when the preference changes back.
    if (!motion.matches) settleAll()
  }

  function onVisibilityChange() {
    if (document.hidden) settleAll()
  }

  function onPageShow(event: PageTransitionEvent) {
    if (event.persisted || window.scrollY > 0) settleAll()
    else update()
  }

  function onResize() {
    // Geometry changes stop active movement; oversized or newly visible waiting
    // content takes the static path. Resizing alone must not start an entrance.
    for (const entry of sections) {
      if (entry.state === 'summary') continue
      const box = geometry(entry)
      if (entry.state === 'entering' || !box.fits || box.ratio > 0)
        settle(entry)
    }
  }

  function cleanup() {
    disposed = true
    settleAll()
    intersection?.disconnect()
    resize?.disconnect()
    motion.removeEventListener('change', onPreferenceChange)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    window.removeEventListener('pageshow', onPageShow)
    window.removeEventListener('pagehide', settleAll)
    window.removeEventListener('resize', onResize)
    window.visualViewport?.removeEventListener('resize', onResize)
    sequence.removeEventListener('focusin', onInteraction)
    sequence.removeEventListener('pointerdown', onInteraction, true)
    sequence.removeEventListener('click', onInteraction, true)
    sequence.removeEventListener('toggle', onInteraction, true)
    sequence.removeEventListener('animationend', onAnimationEnd)
    sequence.removeEventListener('animationcancel', onInteraction)
    sequence.removeEventListener('home:reveal-entry', onInteraction)
    sequence.removeEventListener('home:feature-change', onInteraction)
  }

  try {
    intersection = new IntersectionObserver(update, {
      threshold: [0, 0.01, ENTRY_THRESHOLD, 1],
    })
    // Initial ResizeObserver delivery is not a geometry change.
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
    motion.addEventListener('change', onPreferenceChange)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('pagehide', settleAll)
    window.addEventListener('resize', onResize)
    window.visualViewport?.addEventListener('resize', onResize)
    sequence.addEventListener('focusin', onInteraction)
    sequence.addEventListener('pointerdown', onInteraction, true)
    sequence.addEventListener('click', onInteraction, true)
    sequence.addEventListener('toggle', onInteraction, true)
    sequence.addEventListener('animationend', onAnimationEnd)
    sequence.addEventListener('animationcancel', onInteraction)
    sequence.addEventListener('home:reveal-entry', onInteraction)
    sequence.addEventListener('home:feature-change', onInteraction)

    const navigation = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    const restoring = navigation?.type === 'back_forward' || window.scrollY > 0
    const hasFragment = Boolean(window.location.hash)
    let fragmentTarget: HTMLElement | null = null
    try {
      fragmentTarget = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      )
    } catch {
      // A malformed fragment has no destination; keep the mounted content usable.
    }
    for (const entry of sections) {
      intersection.observe(entry.element)
      resize.observe(entry.element)
      const box = geometry(entry)
      if (
        !box.fits ||
        document.hidden ||
        restoring ||
        entry.element.contains(fragmentTarget) ||
        entry.element.contains(document.activeElement)
      ) {
        settle(entry)
      } else if (box.ratio > 0) {
        if (
          entry.element.dataset.homeSection === 'hero' &&
          window.scrollY === 0 &&
          !hasFragment
        )
          enter(entry, true)
        else settle(entry)
      } else {
        entry.state = 'waiting'
        entry.element.dataset.entryState = 'waiting'
      }
    }
    resize.observe(header)
    resize.observe(sequence)
  } catch {
    cleanup()
  }

  return cleanup
}
