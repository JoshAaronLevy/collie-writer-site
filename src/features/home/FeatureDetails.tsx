import {
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import styles from './FeatureDetails.module.css'

type DetailPage = {
  id: string
  title: string
  labelledBy: string
  content: ReactNode
}

/** Native horizontal paging; every page remains mounted to retain fragment targets. */
export default function FeatureDetails({
  name,
  pages,
}: {
  name: string
  pages: readonly DetailPage[]
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef(0)
  const widthRef = useRef(0)
  const [selected, setSelected] = useState(0)
  const [announcement, setAnnouncement] = useState('')
  const [nativePaging] = useState(
    () =>
      'inert' in HTMLElement.prototype &&
      typeof CSS !== 'undefined' &&
      CSS.supports('scroll-snap-type', 'x mandatory'),
  )
  const multiple = pages.length > 1

  const select = useCallback(
    (index: number, announce: boolean) => {
      const root = rootRef.current
      const next = Math.max(0, Math.min(pages.length - 1, index))
      if (!root || next === selectedRef.current) return
      const outgoing =
        root.querySelectorAll<HTMLElement>('[data-detail-page]')[
          selectedRef.current
        ]
      // Buttons keep their focus. A source link or swipe releases outgoing focus
      // before its page becomes inert; fragment navigation supplies its final focus.
      if (outgoing?.contains(document.activeElement))
        root.focus({ preventScroll: true })
      selectedRef.current = next
      setSelected(next)
      setAnnouncement(
        announce ? `${next + 1} of ${pages.length}: ${pages[next].title}` : '',
      )
      root.dispatchEvent(new Event('home:feature-change', { bubbles: true }))
    },
    [pages],
  )

  const align = useCallback(() => {
    const viewport = viewportRef.current
    if (!nativePaging || !viewport || viewport.clientWidth === 0) return
    widthRef.current = viewport.clientWidth
    // Explicit changes are immediate, including reduced-motion/forced-color paths.
    // Native touch/trackpad gestures own their movement and never drive document Y.
    viewport.scrollTo({
      left: selectedRef.current * viewport.clientWidth,
      behavior: 'instant',
    })
  }, [nativePaging])

  function go(delta: number, control: HTMLButtonElement) {
    control.focus({ preventScroll: true })
    select(selectedRef.current + delta, true)
    align()
  }

  useLayoutEffect(() => {
    const root = rootRef.current
    const viewport = viewportRef.current
    if (!root || !viewport) return
    let timer = 0
    let frame = 0
    let gesture = false
    const section = root.closest('[data-home-section]')
    function onScroll() {
      // Hidden/reshaped viewports must not overwrite the retained selection.
      if (
        !nativePaging ||
        !viewport ||
        viewport.clientWidth === 0 ||
        viewport.clientWidth !== widthRef.current
      )
        return
      select(Math.round(viewport.scrollLeft / viewport.clientWidth), gesture)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        gesture = false
      }, 180)
    }
    function onInput() {
      gesture = true
      cancelAnimationFrame(frame)
      frame = 0
    }
    function onWheel(event: WheelEvent) {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) onInput()
    }
    function onSelect(event: Event) {
      const target = (event as CustomEvent<HTMLElement>).detail
      const page = target?.closest<HTMLElement>('[data-detail-page]')
      const index = pages.findIndex((item) => item.id === page?.id)
      if (index < 0) return
      gesture = false
      select(index, false)
      align()
    }
    function onFeatureChange(event: Event) {
      if (event.target !== section) return
      setAnnouncement('')
      // A closed layer has zero width. Reposition after its parent reveals it,
      // even when close/reopen occurs before ResizeObserver reports a change.
      cancelAnimationFrame(frame)
      frame = 0
      // Reveal completion can be triggered by the same pointerdown that starts
      // a swipe. Do not queue an alignment over that newer native gesture.
      if (gesture && viewport && viewport.clientWidth > 0) return
      gesture = false
      frame = requestAnimationFrame(() => {
        frame = 0
        align()
      })
    }
    function onResize() {
      if (viewport && viewport.clientWidth !== widthRef.current) {
        widthRef.current = viewport.clientWidth
        gesture = false
        align()
      }
    }
    align()
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(onResize)
    observer?.observe(viewport)
    viewport.addEventListener('scroll', onScroll, { passive: true })
    viewport.addEventListener('pointerdown', onInput, { passive: true })
    viewport.addEventListener('wheel', onWheel, { passive: true })
    root.addEventListener('home:select-page', onSelect)
    root.addEventListener('home:align-page', align)
    section?.addEventListener('home:feature-change', onFeatureChange)
    window.addEventListener('resize', onResize)
    return () => {
      observer?.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
      viewport.removeEventListener('scroll', onScroll)
      viewport.removeEventListener('pointerdown', onInput)
      viewport.removeEventListener('wheel', onWheel)
      root.removeEventListener('home:select-page', onSelect)
      root.removeEventListener('home:align-page', align)
      section?.removeEventListener('home:feature-change', onFeatureChange)
      window.removeEventListener('resize', onResize)
    }
  }, [align, nativePaging, pages, select])

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-feature-pages=""
      data-native-paging={nativePaging}
      role="group"
      aria-label={name}
      aria-roledescription={multiple ? 'carousel' : undefined}
      tabIndex={-1}
    >
      {multiple ? (
        <div className={styles.controls}>
          <button
            type="button"
            aria-label={`Previous ${name} page`}
            aria-disabled={selected === 0}
            onClick={(event) => go(-1, event.currentTarget)}
          >
            Previous
          </button>
          <p className={styles.position}>
            {selected + 1} of {pages.length}
            <span className={styles.titles}>
              {pages.map((page, index) => (
                <span
                  key={page.id}
                  className={styles.title}
                  aria-hidden={index !== selected}
                  style={{
                    visibility: index === selected ? 'visible' : 'hidden',
                  }}
                >
                  {page.title}
                </span>
              ))}
            </span>
          </p>
          <button
            type="button"
            aria-label={`Next ${name} page`}
            aria-disabled={selected === pages.length - 1}
            onClick={(event) => go(1, event.currentTarget)}
          >
            Next
          </button>
        </div>
      ) : null}
      <div
        className={styles.announcement}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div ref={viewportRef} className={styles.viewport}>
        {pages.map((page, index) => (
          <div
            key={page.id}
            id={page.id}
            data-detail-page=""
            className={styles.page}
            role="group"
            aria-roledescription={multiple ? 'slide' : undefined}
            aria-labelledby={page.labelledBy}
            aria-hidden={index !== selected}
            inert={index !== selected}
            tabIndex={-1}
          >
            {page.content}
          </div>
        ))}
      </div>
    </div>
  )
}
