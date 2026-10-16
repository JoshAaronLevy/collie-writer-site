import { reviewMode } from '../../content/site'
import styles from './ReviewNotice.module.css'

export default function ReviewNotice({ pending }: { pending: string }) {
  if (!reviewMode) return null
  return (
    <aside className={styles['review-notice']} aria-label="Local review draft">
      <strong>Local review draft · not approved for publication</strong>
      <p>{pending}</p>
    </aside>
  )
}
