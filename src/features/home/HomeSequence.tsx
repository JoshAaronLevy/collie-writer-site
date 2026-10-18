import { useLayoutEffect, useRef } from 'react'
import HomeHero from './HomeHero'
import AiIntroduction from './AiIntroduction'
import ProductStory from './ProductStory'
import styles from './HomeSequence.module.css'
import { createSectionEntry } from './section-entry'
import { createSectionSettling } from './section-settling'

export default function HomeSequence() {
  const sequenceRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const sequence = sequenceRef.current
    const header = document.getElementById('top')
    if (!sequence || !header) return

    function measureHeader() {
      if (!header || !sequence) return
      sequence.style.setProperty(
        '--home-header-height',
        `${header.getBoundingClientRect().height}px`,
      )
    }
    measureHeader()
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(measureHeader)
    observer?.observe(header)
    window.addEventListener('resize', measureHeader)
    const settling = createSectionSettling(sequence, header)

    let navigationFrame = 0
    let historyDestination: string | null = null
    let linkDestination: string | null = null
    let interruptedDestination: string | null = null
    let pendingTarget: HTMLElement | null = null
    function cancelNavigation() {
      if (!navigationFrame) return
      interruptedDestination = linkDestination ?? window.location.href
      linkDestination = null
      cancelAnimationFrame(navigationFrame)
      navigationFrame = 0
      pendingTarget = null
    }
    function onFocus(event: FocusEvent) {
      // Native anchor focus at the requested target is part of this navigation.
      if (event.target !== pendingTarget) cancelNavigation()
    }
    function resolveTarget(hash: string) {
      let id: string
      try {
        id = decodeURIComponent(hash.slice(1))
      } catch {
        return null
      }
      const target = document.getElementById(id)
      return target && (target === header || sequence?.contains(target))
        ? target
        : null
    }

    function revealTarget(target: HTMLElement) {
      settling.navigate(target)
      target.dispatchEvent(new Event('home:reveal-entry', { bubbles: true }))
      const section = target.closest<HTMLElement>('[data-home-section]')
      section?.dispatchEvent(
        new Event(
          target.closest('[data-feature-details]')
            ? 'home:open-details'
            : 'home:finish-feature',
        ),
      )
      target
        .closest('[data-feature-pages]')
        ?.dispatchEvent(new CustomEvent('home:select-page', { detail: target }))
    }

    function navigateTo(target: HTMLElement) {
      cancelAnimationFrame(navigationFrame)
      navigationFrame = 0
      pendingTarget = null
      revealTarget(target)
      pendingTarget = target
      navigationFrame = requestAnimationFrame(() => {
        navigationFrame = 0
        pendingTarget = null
        linkDestination = null
        target
          .closest('[data-feature-pages]')
          ?.dispatchEvent(new Event('home:align-page'))
        // Native anchors own URL/history; this only makes their destination usable.
        const section = target.closest<HTMLElement>('[data-home-section]')
        const isSectionLink =
          section &&
          (target === section ||
            target.id === section.dataset.sectionHeading ||
            target.matches('[data-feature-heading]') ||
            Boolean(target.closest('[data-feature-summary]')))
        const isDetailRegion =
          section && target.matches('[data-feature-details]')
        const focusTarget =
          isSectionLink || isDetailRegion
            ? document.getElementById(
                section.getAttribute('aria-labelledby') ?? '',
              )
            : target.matches('h1, h2, h3, a, button, [tabindex]')
              ? target
              : target.querySelector<HTMLElement>('h1, h2, h3')
        if (focusTarget instanceof HTMLElement)
          focusTarget.focus({ preventScroll: true })
        if (
          target === header ||
          (isSectionLink && section.dataset.homeSection === 'hero')
        ) {
          window.scrollTo({ top: 0, behavior: 'instant' })
        } else {
          const alignmentTarget =
            isSectionLink || isDetailRegion ? section : target
          alignmentTarget.scrollIntoView({
            block: 'start',
            behavior: 'instant',
          })
        }
      })
    }

    function followHash() {
      // A delayed hashchange must not re-arm an alignment the visitor interrupted.
      if (interruptedDestination === window.location.href) {
        interruptedDestination = null
        historyDestination = null
        return
      }
      interruptedDestination = null
      // Back/Forward retain the browser's restored reading position.
      if (historyDestination === window.location.href) {
        historyDestination = null
        return
      }
      historyDestination = null
      const target = resolveTarget(window.location.hash)
      if (target) navigateTo(target)
    }

    function restoreHistory() {
      // Some browsers also emit popstate for a new native fragment navigation.
      if (linkDestination === window.location.href) return
      historyDestination = window.location.href
      cancelAnimationFrame(navigationFrame)
      navigationFrame = 0
      pendingTarget = null
      const target = resolveTarget(window.location.hash)
      if (target) revealTarget(target)
    }

    function followLink(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return
      cancelNavigation()
      const link =
        event.target instanceof Element ? event.target.closest('a[href]') : null
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute('download') ||
        (link.target && link.target !== '_self')
      )
        return
      const destination = new URL(link.href)
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search
      )
        return
      const target = resolveTarget(destination.hash)
      if (target) {
        interruptedDestination = null
        historyDestination = null
        linkDestination = destination.href
        navigateTo(target)
      }
    }

    // Covers initial deep links, history/hash changes and repeated same-hash clicks.
    followHash()
    const disposeEntry = createSectionEntry(sequence, header)
    document.addEventListener('click', followLink)
    window.addEventListener('hashchange', followHash)
    window.addEventListener('popstate', restoreHistory)
    document.addEventListener('wheel', cancelNavigation, {
      passive: true,
      capture: true,
    })
    document.addEventListener('pointerdown', cancelNavigation, true)
    document.addEventListener('touchstart', cancelNavigation, {
      passive: true,
      capture: true,
    })
    document.addEventListener('keydown', cancelNavigation, true)
    document.addEventListener('focusin', onFocus)
    document.addEventListener('visibilitychange', cancelNavigation)
    window.addEventListener('blur', cancelNavigation)
    return () => {
      settling.dispose()
      disposeEntry()
      observer?.disconnect()
      window.removeEventListener('resize', measureHeader)
      document.removeEventListener('click', followLink)
      window.removeEventListener('hashchange', followHash)
      window.removeEventListener('popstate', restoreHistory)
      document.removeEventListener('wheel', cancelNavigation, true)
      document.removeEventListener('pointerdown', cancelNavigation, true)
      document.removeEventListener('touchstart', cancelNavigation, true)
      document.removeEventListener('keydown', cancelNavigation, true)
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('visibilitychange', cancelNavigation)
      window.removeEventListener('blur', cancelNavigation)
      cancelAnimationFrame(navigationFrame)
    }
  }, [])

  return (
    <div ref={sequenceRef} className={styles.sequence}>
      <HomeHero />
      <AiIntroduction />
      <ProductStory />
    </div>
  )
}
