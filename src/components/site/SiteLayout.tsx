import collieArtwork from '../../assets/branding/collie-writer.png'
import { releaseAvailability } from '../../content/release'
import { reviewMode } from '../../content/site'
import { useLocation } from 'react-router'
import styles from './SiteLayout.module.css'

export function SiteHeader() {
  const { pathname } = useLocation()
  return (
    <header className={styles['site-header']} id="top" tabIndex={-1}>
      <a
        className={styles['brand-link']}
        href="/#top"
        aria-label="Collie Writer — home"
      >
        <img
          className={styles['brand-artwork']}
          src={collieArtwork}
          width={52}
          height={52}
          alt=""
        />
        <span>
          Collie Writer<span className={styles['brand-period']}>.</span>
        </span>
      </a>
      <nav aria-label="Main navigation" className={styles['site-navigation']}>
        <a href="/#ai-tools">
          AI tools <span aria-hidden="true">↗</span>
        </a>
        <a href="/#pricing">Pricing</a>
        <a
          href="/help"
          aria-current={
            pathname.replace(/\/$/, '') === '/help' ? 'page' : undefined
          }
        >
          Help
        </a>
        {releaseAvailability.available ? (
          <a href={releaseAvailability.action.href}>Download</a>
        ) : null}
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className={styles['site-footer']}>
      <div>
        <a href="/#top" className={styles['footer-wordmark']}>
          Collie Writer.
        </a>
        <p>A little more room to think.</p>
      </div>
      <nav
        className={styles['footer-navigation']}
        aria-label="Footer navigation"
      >
        <a href="/#pricing">Pricing</a>
        <a href="/downloads">Downloads</a>
        <a href="/help">Help</a>
        <a href="/privacy">Privacy{reviewMode ? ' (draft)' : ''}</a>
        <a href="/terms">Terms{reviewMode ? ' (draft)' : ''}</a>
        <a href="/purchases">
          Purchase information{reviewMode ? ' (draft)' : ''}
        </a>
      </nav>
      <div className={styles['footer-details']}>
        <p>Permanently ad-free.</p>
        <a href="/licenses/SourceSerif4-OFL.txt">
          Source Serif 4 · font license
        </a>
      </div>
    </footer>
  )
}
