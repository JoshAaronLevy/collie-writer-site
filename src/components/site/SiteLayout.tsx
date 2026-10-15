import collieArtwork from '../../assets/branding/collie-writer.png'
import styles from './SiteLayout.module.css'

export function SiteHeader() {
  return (
    <header className={styles['site-header']} id="top" tabIndex={-1}>
      <a
        className={styles['brand-link']}
        href="#top"
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
        <a href="#how-it-works">
          How it works <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className={styles['site-footer']}>
      <div>
        <a href="#top" className={styles['footer-wordmark']}>
          Collie Writer.
        </a>
        <p>A little more room to think.</p>
      </div>
      <div className={styles['footer-details']}>
        <p>Permanently ad-free.</p>
        <a href="/licenses/SourceSerif4-OFL.txt">
          Source Serif 4 · font license
        </a>
      </div>
    </footer>
  )
}
