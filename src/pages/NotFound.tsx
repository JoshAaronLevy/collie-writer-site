import styles from './NotFound.module.css'

// Basic route recovery; the wider Help/legal navigation belongs to WEB05.
export default function NotFound() {
  return (
    <div className={styles['not-found-page']}>
      <title>Page not found — Collie Writer</title>
      <div>
        <p className={styles['eyebrow']}>Page not found</p>
        <h1>Let’s find your way back.</h1>
        <p>
          This address doesn’t have a page. Explore Collie or check download
          availability.
        </p>
      </div>
      <nav className={styles['recovery-links']} aria-label="Find a page">
        <a href="/">Home</a>
        <a href="/downloads">Downloads</a>
      </nav>
    </div>
  )
}
