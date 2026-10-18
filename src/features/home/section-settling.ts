import {
  FIT_TOLERANCE,
  readHomeViewport,
  readSectionGeometry,
} from './section-geometry'

const CAPTURE_FRACTION = 0.1
const QUIET_MS = 200
const ALIGNMENT_MS = 280
const POSITION_TOLERANCE = 1
const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])
const INTERACTIVE =
  'a, button, summary, input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="slider"], [role="combobox"], [role="textbox"]'

type Episode = {
  moved: boolean
  ended: boolean
  lastInput: number
  lastMovement: number
}
type Alignment = {
  section: HTMLElement
  from: number
  to: number
  started: number
  height: number
}
type Direction = -1 | 0 | 1
type SettlingController = {
  dispose: () => void
  navigate: (target: HTMLElement) => void
}
const directionOf = (value: number): Direction =>
  value === 0 ? 0 : value > 0 ? 1 : -1

/** Optional near-boundary correction; native scrolling always owns user input. */
export function createSectionSettling(
  sequence: HTMLElement,
  header: HTMLElement,
): SettlingController {
  const fallback: SettlingController = {
    dispose() {},
    navigate() {},
  }
  if (
    typeof ResizeObserver === 'undefined' ||
    typeof window.matchMedia !== 'function' ||
    typeof window.requestAnimationFrame !== 'function' ||
    typeof PointerEvent === 'undefined'
  )
    return fallback
  const motion = window.matchMedia(
    '(prefers-reduced-motion: no-preference) and (forced-colors: none)',
  )
  if (typeof motion.addEventListener !== 'function') return fallback

  const sections = Array.from(
    sequence.querySelectorAll<HTMLElement>('[data-home-section]'),
  )
  const hasScrollEnd = 'onscrollend' in document
  // This map deliberately outlives individual wheel gestures and pauses.
  const departures = new Map<HTMLElement, Direction>()
  const pointers = new Set<number>()
  const keys = new Set<string>()
  let touches = 0
  let touchY = 0
  let touchAllowed = false
  let episode: Episode | null = null
  let alignment: Alignment | null = null
  let expectedWrite: number | null = null
  let lastY = window.scrollY
  let inputDirection: Direction = 0
  let lastGeometryChange = performance.now()
  let timer = 0
  let pauseFrame = 0
  let motionFrame = 0
  let disposed = false

  function clearPause() {
    window.clearTimeout(timer)
    cancelAnimationFrame(pauseFrame)
    timer = pauseFrame = 0
  }

  function interrupt() {
    clearPause()
    if (alignment) departures.set(alignment.section, 0)
    cancelAnimationFrame(motionFrame)
    alignment = null
    motionFrame = 0
    episode = null
    lastY = window.scrollY
  }

  function selectedText() {
    return window.getSelection()?.isCollapsed === false
  }

  function allowed() {
    return (
      !disposed &&
      !document.hidden &&
      motion.matches &&
      !selectedText() &&
      readHomeViewport(sequence).stable &&
      document.fonts?.status !== 'loading'
    )
  }

  function held() {
    return pointers.size > 0 || touches > 0 || keys.size > 0
  }

  function snapshot() {
    const viewport = readHomeViewport(sequence)
    return {
      viewport,
      sections: sections.map((element) => ({
        element,
        ...readSectionGeometry(element, viewport),
      })),
    }
  }

  function focusConflict() {
    const active = document.activeElement
    if (!(active instanceof HTMLElement) || !active.matches(INTERACTIVE))
      return false
    const rect = active.getBoundingClientRect()
    return (
      rect.bottom > 0 &&
      rect.top < (window.visualViewport?.height ?? window.innerHeight)
    )
  }

  function candidate() {
    if (!allowed() || focusConflict()) return null
    const view = snapshot()
    const dominant = view.sections.reduce<
      (typeof view.sections)[number] | null
    >(
      (best, section) =>
        !best || section.visible > best.visible ? section : best,
      null,
    )
    if (
      !dominant ||
      dominant.visible <= view.viewport.height / 2 ||
      !dominant.fits ||
      departures.has(dominant.element) ||
      dominant.element.dataset.entryState === 'waiting' ||
      (dominant.element.dataset.featureState &&
        dominant.element.dataset.featureState !== 'summary') ||
      Math.abs(dominant.top) > CAPTURE_FRACTION * view.viewport.height ||
      Math.abs(dominant.top) <= FIT_TOLERANCE
    )
      return null
    return { ...dominant, viewportHeight: view.viewport.height }
  }

  function animate(destination: NonNullable<ReturnType<typeof candidate>>) {
    episode = null // Controller writes and their scrollend cannot create another episode.
    alignment = {
      section: destination.element,
      from: window.scrollY,
      to: destination.targetY,
      started: performance.now(),
      height: destination.viewportHeight,
    }
    const move = alignment
    function frame(now: number) {
      if (alignment !== move || disposed) return
      const viewport = readHomeViewport(sequence)
      const box = readSectionGeometry(move.section, viewport)
      if (
        !allowed() ||
        held() ||
        focusConflict() ||
        !box.fits ||
        (move.section.dataset.featureState &&
          move.section.dataset.featureState !== 'summary') ||
        Math.abs(box.targetY - move.to) > POSITION_TOLERANCE ||
        Math.abs(viewport.height - move.height) > FIT_TOLERANCE
      ) {
        interrupt()
        return
      }
      const progress = Math.min(1, (now - move.started) / ALIGNMENT_MS)
      const eased = 1 - (1 - progress) ** 3
      // Explicit instant writes bypass the site's smooth-anchor CSS on every frame.
      window.scrollTo({
        top: move.from + (move.to - move.from) * eased,
        left: window.scrollX,
        behavior: 'instant',
      })
      expectedWrite = window.scrollY
      lastY = window.scrollY
      if (progress < 1) motionFrame = requestAnimationFrame(frame)
      else {
        alignment = null
        motionFrame = 0
      }
    }
    motionFrame = requestAnimationFrame(frame)
  }

  function schedulePause() {
    clearPause()
    const current = episode
    if (!current || !current.moved || held()) return
    const quietSince = Math.max(
      current.lastInput,
      current.lastMovement,
      lastGeometryChange,
    )
    timer = window.setTimeout(
      () => {
        timer = 0
        if (
          episode !== current ||
          held() ||
          !allowed() ||
          (hasScrollEnd && !current.ended)
        )
          return
        const position = window.scrollY
        // Even with scrollend, require quiet input and two stable position samples.
        pauseFrame = requestAnimationFrame(() => {
          pauseFrame = 0
          if (
            episode !== current ||
            held() ||
            Math.abs(window.scrollY - position) > POSITION_TOLERANCE
          )
            return
          pauseFrame = requestAnimationFrame(() => {
            pauseFrame = 0
            if (
              episode !== current ||
              held() ||
              Math.abs(window.scrollY - position) > POSITION_TOLERANCE
            )
              return
            const target = candidate()
            episode = null // One decision per completed user episode, including no correction.
            if (target) animate(target)
          })
        })
      },
      Math.max(0, QUIET_MS - (performance.now() - quietSince)),
    )
  }

  function noteIntent(direction: Direction) {
    if (alignment) interrupt()
    clearPause()
    if (!allowed()) {
      episode = null
      return
    }
    const now = performance.now()
    const starting =
      episode === null ||
      episode.ended ||
      now - Math.max(episode.lastInput, episode.lastMovement) >= QUIET_MS
    if (starting || !episode) {
      episode = {
        moved: false,
        ended: false,
        lastInput: now,
        lastMovement: now,
      }
    }
    episode.lastInput = now
    episode.ended = false
    inputDirection = direction
    // Protect a section aligned at the start of a user episode. Passing through
    // alignment during the same gesture is an arrival/overshoot, not an exit.
    for (const section of snapshot().sections) {
      if (starting && Math.abs(section.top) <= FIT_TOLERANCE)
        departures.set(section.element, direction)
      const departing = departures.get(section.element)
      if (
        departing !== undefined &&
        direction !== 0 &&
        departing !== 0 &&
        direction !== departing &&
        direction === directionOf(section.top)
      )
        departures.delete(section.element)
    }
    schedulePause()
  }

  function localControl(target: EventTarget | null) {
    if (!(target instanceof Element)) return false
    if (target.closest(INTERACTIVE)) return true
    // Nested native scrolling stays independent; ambiguous input does not arm the page.
    for (
      let node: Element | null = target;
      node && node !== document.body && node !== document.documentElement;
      node = node.parentElement
    ) {
      if (
        node.scrollHeight > node.clientHeight + 1 &&
        /(auto|scroll)/.test(getComputedStyle(node).overflowY)
      )
        return true
    }
    return false
  }

  function onWheel(event: WheelEvent) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.deltaY === 0 ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
      localControl(event.target)
    ) {
      interrupt()
      return
    }
    noteIntent(directionOf(event.deltaY))
  }

  function onScroll() {
    const y = window.scrollY
    if (
      expectedWrite !== null &&
      Math.abs(y - expectedWrite) <= POSITION_TOLERANCE
    ) {
      expectedWrite = null
      lastY = y
      return
    }
    expectedWrite = null
    if (y === lastY) return
    if (alignment) {
      interrupt()
      return
    }
    const delta = y - lastY
    const previous = lastY
    lastY = y
    if (!episode || delta === 0) return
    const direction = directionOf(delta)
    const view = snapshot()
    for (const section of view.sections) {
      const before = section.targetY - previous
      const departing = departures.get(section.element)
      if (departing === undefined) continue
      if (Math.abs(section.top) > CAPTURE_FRACTION * view.viewport.height)
        departures.delete(section.element)
      else if (departing === 0) departures.set(section.element, direction)
      else if (
        direction !== departing &&
        Math.abs(section.top) < Math.abs(before) &&
        (direction === inputDirection || pointers.size > 0 || touches > 0)
      )
        departures.delete(section.element)
    }
    episode.moved = true
    episode.ended = false
    episode.lastMovement = performance.now()
    schedulePause()
  }

  function onScrollEnd() {
    if (!episode || !episode.moved) return
    episode.ended = true
    schedulePause()
  }

  function onPointerDown(event: PointerEvent) {
    interrupt()
    pointers.add(event.pointerId)
    if (
      event.button === 0 &&
      event.pointerType !== 'touch' &&
      !localControl(event.target)
    )
      noteIntent(0)
  }

  function onPointerUp(event: PointerEvent) {
    pointers.delete(event.pointerId)
    if (episode) episode.lastInput = performance.now()
    schedulePause()
  }

  function onTouchStart(event: TouchEvent) {
    interrupt()
    touches = event.touches.length
    touchAllowed = touches === 1 && !localControl(event.target)
    touchY = event.touches[0]?.clientY ?? 0
    if (touchAllowed) noteIntent(0)
  }

  function onTouchMove(event: TouchEvent) {
    touches = event.touches.length
    if (!touchAllowed || touches !== 1) {
      interrupt()
      return
    }
    const y = event.touches[0].clientY
    noteIntent(directionOf(touchY - y))
    touchY = y
  }

  function onTouchEnd(event: TouchEvent) {
    touches = event.touches.length
    if (touches === 0) touchAllowed = false
    if (episode) episode.lastInput = performance.now()
    schedulePause()
  }

  function onKeyDown(event: KeyboardEvent) {
    if (
      !SCROLL_KEYS.has(event.key) ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      localControl(event.target)
    ) {
      interrupt()
      return
    }
    keys.add(event.key)
    const up =
      ['ArrowUp', 'PageUp', 'Home'].includes(event.key) ||
      (event.key === ' ' && event.shiftKey)
    noteIntent(up ? -1 : 1)
  }

  function onKeyUp(event: KeyboardEvent) {
    keys.delete(event.key)
    if (episode) episode.lastInput = performance.now()
    schedulePause()
  }

  function onSelectionChange() {
    if (selectedText()) interrupt()
  }
  function onGeometryChange() {
    lastGeometryChange = performance.now()
    interrupt()
  }
  function onVisualScroll() {
    // Ordinary document movement can also notify VisualViewport. Only a changed
    // visual offset/scale is a geometry exclusion, not every page scroll.
    if (!readHomeViewport(sequence).stable) onGeometryChange()
  }
  function resetInteraction() {
    pointers.clear()
    keys.clear()
    touches = 0
    touchAllowed = false
    interrupt()
  }

  const listenerCleanup: (() => void)[] = []
  function listen(
    target: EventTarget,
    name: string,
    callback: EventListener,
    capture = false,
  ) {
    target.addEventListener(name, callback, { passive: true, capture })
    listenerCleanup.push(() =>
      target.removeEventListener(name, callback, capture),
    )
  }
  let resize: ResizeObserver | undefined
  function dispose() {
    disposed = true
    interrupt()
    resize?.disconnect()
    listenerCleanup.forEach((remove) => remove())
    departures.clear()
    pointers.clear()
    keys.clear()
  }

  try {
    listen(document, 'wheel', onWheel as EventListener, true)
    listen(document, 'scroll', onScroll)
    if (hasScrollEnd) listen(document, 'scrollend', onScrollEnd)
    listen(document, 'pointerdown', onPointerDown as EventListener, true)
    listen(document, 'pointerup', onPointerUp as EventListener, true)
    listen(document, 'pointercancel', onPointerUp as EventListener, true)
    listen(document, 'touchstart', onTouchStart as EventListener, true)
    listen(document, 'touchmove', onTouchMove as EventListener, true)
    listen(document, 'touchend', onTouchEnd as EventListener, true)
    listen(document, 'touchcancel', resetInteraction, true)
    listen(document, 'keydown', onKeyDown as EventListener, true)
    listen(document, 'keyup', onKeyUp as EventListener, true)
    listen(document, 'click', interrupt, true)
    listen(document, 'focusin', interrupt, true)
    listen(document, 'toggle', interrupt, true)
    listen(sequence, 'home:feature-change', interrupt)
    listen(document, 'selectionchange', onSelectionChange)
    listen(document, 'visibilitychange', resetInteraction)
    listen(window, 'blur', resetInteraction)
    listen(window, 'hashchange', interrupt)
    listen(window, 'popstate', interrupt)
    listen(window, 'pagehide', resetInteraction)
    listen(window, 'pageshow', resetInteraction)
    listen(window, 'resize', onGeometryChange)
    listen(motion, 'change', onGeometryChange)
    if (window.visualViewport) {
      listen(window.visualViewport, 'resize', onGeometryChange)
      listen(window.visualViewport, 'scroll', onVisualScroll)
    }
    if (document.fonts) listen(document.fonts, 'loadingdone', onGeometryChange)
    const sizes = new WeakMap<Element, string>()
    resize = new ResizeObserver((entries) => {
      let changed = false
      for (const entry of entries) {
        const size = `${entry.contentRect.width}:${entry.contentRect.height}`
        if (sizes.has(entry.target) && sizes.get(entry.target) !== size)
          changed = true
        sizes.set(entry.target, size)
      }
      if (changed) onGeometryChange()
    })
    for (const element of [header, sequence, ...sections])
      resize.observe(element)
  } catch {
    dispose()
  }

  return {
    dispose,
    navigate(target: HTMLElement) {
      interrupt()
      const section =
        target === header
          ? sections[0]
          : target.closest<HTMLElement>('[data-home-section]')
      if (section) departures.delete(section)
    },
  }
}
