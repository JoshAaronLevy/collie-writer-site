import { useEffect, useRef } from 'react'

// CSS owns the finite decorative sequence; this hook only starts/stops it.
// Nothing is hidden while waiting for an observer, or when enhancement is absent.
export function useShapeMotion() {
  const boardRef = useRef<HTMLDivElement>(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const board = boardRef.current
    if (
      !board ||
      playedRef.current ||
      typeof window.IntersectionObserver !== 'function' ||
      typeof window.matchMedia !== 'function'
    ) {
      return
    }

    // Match the CSS gate. A visit that starts narrow/reduced stays static.
    const motion = window.matchMedia(
      '(width > 62em) and (prefers-reduced-motion: no-preference) and (forced-colors: none)',
    )
    if (!motion.matches || typeof motion.addEventListener !== 'function') return

    let finished = false
    let settleTimer: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (finished) return
        const entry = entries[entries.length - 1]
        if (!entry) return

        if (!entry.isIntersecting) {
          if (playedRef.current) finish()
          return
        }
        if (
          playedRef.current ||
          entry.intersectionRatio < 0.15 ||
          document.hidden ||
          !motion.matches
        ) {
          return
        }

        playedRef.current = true
        board.setAttribute('data-settling', '')
        // Longest CSS sequence is 880ms. Retire the observer/listeners afterward,
        // even when the browser does not support the animation itself.
        settleTimer = window.setTimeout(finish, 1000)
      },
      { threshold: [0, 0.15], rootMargin: '0px 0px -8% 0px' },
    )

    function finish() {
      finished = true
      observer.disconnect()
      window.clearTimeout(settleTimer)
      board?.removeAttribute('data-settling')
      motion.removeEventListener('change', finish)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }

    function onVisibilityChange() {
      if (document.hidden) finish()
    }

    motion.addEventListener('change', finish)
    document.addEventListener('visibilitychange', onVisibilityChange)
    observer.observe(board)
    return finish
  }, [])

  return boardRef
}
