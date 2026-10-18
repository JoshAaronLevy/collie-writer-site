import { useCallback, useLayoutEffect, useRef, useState } from 'react'

type Phase = 'summary' | 'revealing' | 'detail' | 'returning'
type Presentation = { phase: Phase; revision: number; focus: boolean }
const REVEAL_MS = 450
const COMPLETION_FALLBACK_MS = 650

function canAnimate() {
  return (
    typeof window.matchMedia === 'function' &&
    typeof window.matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener === 'function' &&
    window.matchMedia(
      '(prefers-reduced-motion: no-preference) and (forced-colors: none)',
    ).matches &&
    typeof Element.prototype.animate === 'function' &&
    'inert' in HTMLElement.prototype &&
    typeof CSS !== 'undefined' &&
    CSS.supports('overflow-x', 'clip') &&
    !document.hidden
  )
}

/** Per-feature state persists for this homepage mount, including mounted detail content. */
export function useFeatureReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const detailBodyRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const detailHeadingRef = useRef<HTMLHeadingElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const ownScroll = useRef<number | null>(null)
  const [presentation, setPresentation] = useState<Presentation>({
    phase: 'summary',
    revision: 0,
    focus: false,
  })
  const current = useRef(presentation)

  const commit = useCallback((phase: Phase, focus: boolean) => {
    const next = { phase, focus, revision: current.current.revision + 1 }
    current.current = next
    setPresentation(next)
    sectionRef.current?.dispatchEvent(
      new Event('home:feature-change', { bubbles: true }),
    )
  }, [])

  const request = useCallback(
    (open: boolean, focus: boolean, motion: boolean) => {
      const section = sectionRef.current
      if (!section) return
      const phase = current.current.phase
      const terminal = open ? 'detail' : 'summary'
      const moving = phase === 'revealing' || phase === 'returning'
      if (phase === terminal) return
      section.dispatchEvent(new Event('home:reveal-entry', { bubbles: true }))
      section.dispatchEvent(new Event('home:feature-change', { bubbles: true }))
      // Move focus outside the outgoing subtree before it becomes inert/hidden.
      // Navigation will focus its destination; first release any outgoing focus.
      const outgoing = open
        ? surfaceRef.current
        : detailBodyRef.current?.closest('[data-feature-details]')
      if (!focus && outgoing?.contains(document.activeElement))
        section.focus({ preventScroll: true })
      if (focus) {
        section.focus({ preventScroll: true })
        section.scrollIntoView({ block: 'start', behavior: 'instant' })
        ownScroll.current = window.scrollY
      }
      // A reversal during movement resolves immediately to the latest requested view.
      commit(
        motion && !moving && canAnimate()
          ? open
            ? 'revealing'
            : 'returning'
          : terminal,
        focus,
      )
    },
    [commit],
  )

  const open = useCallback(() => request(true, true, true), [request])
  const close = useCallback(() => request(false, true, true), [request])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const toolbar = toolbarRef.current
    if (!section || !toolbar) return
    function measure() {
      const height = toolbar?.getBoundingClientRect().height ?? 0
      if (height > 0)
        section?.style.setProperty('--detail-toolbar-height', `${height}px`)
    }
    measure()
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(toolbar)
    window.addEventListener('resize', measure)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [presentation.phase])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reveal = () => request(true, false, false)
    const finish = () => {
      const phase = current.current.phase
      if (phase === 'revealing') commit('detail', false)
      else if (phase === 'returning') commit('summary', false)
    }
    section.addEventListener('home:open-details', reveal)
    section.addEventListener('home:finish-feature', finish)
    return () => {
      section.removeEventListener('home:open-details', reveal)
      section.removeEventListener('home:finish-feature', finish)
    }
  }, [commit, request])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const surface = surfaceRef.current
    if (!section || !surface) return
    const { phase } = presentation
    const moving = phase === 'revealing' || phase === 'returning'
    if (!moving) {
      if (presentation.focus && document.activeElement === section) {
        const target =
          phase === 'detail' ? detailHeadingRef.current : openerRef.current
        target?.focus({ preventScroll: true })
        target?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      }
      ownScroll.current = null
      return
    }

    let disposed = false
    const animations: Animation[] = []
    function finish(restoreFocus: boolean) {
      if (disposed || current.current !== presentation) return
      const focus =
        restoreFocus && presentation.focus && document.activeElement === section
      commit(phase === 'revealing' ? 'detail' : 'summary', focus)
    }
    function interrupt() {
      finish(false)
    }
    function onFocus(event: FocusEvent) {
      if (event.target !== section) finish(false)
    }
    function onScroll() {
      if (
        ownScroll.current !== null &&
        Math.abs(window.scrollY - ownScroll.current) <= 1
      )
        return
      finish(false)
    }
    function preferenceChanged() {
      finish(true)
    }

    const fallback = window.setTimeout(
      () => finish(true),
      COMPLETION_FALLBACK_MS,
    )
    const preference = window.matchMedia(
      '(prefers-reduced-motion: no-preference) and (forced-colors: none)',
    )
    try {
      const sheet = surface.animate(
        phase === 'revealing'
          ? [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }]
          : [
              { transform: 'translateX(-100%)' },
              { transform: 'translateX(0)' },
            ],
        {
          duration: REVEAL_MS,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'both',
        },
      )
      sheet.onfinish = () => finish(true)
      sheet.oncancel = () => finish(false)
      animations.push(sheet)
      if (phase === 'revealing' && detailBodyRef.current) {
        animations.push(
          detailBodyRef.current.animate(
            [
              { opacity: 0.35, transform: 'translateX(12px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 320, delay: 80, easing: 'ease-out', fill: 'both' },
          ),
        )
      }
    } catch {
      // Keep a completion path even if the browser cannot start the animation.
      window.clearTimeout(fallback)
      const immediate = window.setTimeout(() => finish(true), 0)
      animations.forEach((animation) => {
        animation.onfinish = null
        animation.oncancel = null
        animation.cancel()
      })
      return () => {
        disposed = true
        window.clearTimeout(immediate)
      }
    }

    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('touchstart', interrupt, { passive: true })
    window.addEventListener('pointerdown', interrupt, { passive: true })
    window.addEventListener('keydown', interrupt)
    window.addEventListener('resize', interrupt)
    window.addEventListener('blur', interrupt)
    window.addEventListener('hashchange', interrupt)
    window.addEventListener('popstate', interrupt)
    document.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('focusin', onFocus)
    document.addEventListener('visibilitychange', interrupt)
    preference.addEventListener('change', preferenceChanged)
    window.visualViewport?.addEventListener('resize', interrupt)
    return () => {
      disposed = true
      window.clearTimeout(fallback)
      animations.forEach((animation) => {
        animation.onfinish = null
        animation.oncancel = null
        animation.cancel()
      })
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('touchstart', interrupt)
      window.removeEventListener('pointerdown', interrupt)
      window.removeEventListener('keydown', interrupt)
      window.removeEventListener('resize', interrupt)
      window.removeEventListener('blur', interrupt)
      window.removeEventListener('hashchange', interrupt)
      window.removeEventListener('popstate', interrupt)
      document.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('visibilitychange', interrupt)
      preference.removeEventListener('change', preferenceChanged)
      window.visualViewport?.removeEventListener('resize', interrupt)
    }
  }, [presentation, commit])

  return {
    phase: presentation.phase,
    sectionRef,
    surfaceRef,
    detailBodyRef,
    toolbarRef,
    detailHeadingRef,
    openerRef,
    open,
    close,
  }
}
