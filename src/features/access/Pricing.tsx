import { Button } from '@mantine/core'
import { offers } from '../../content/offers'
import { purchaseAvailability } from '../../content/commerce'
import { releaseAvailability } from '../../content/release'
import styles from './Pricing.module.css'

export default function Pricing() {
  return (
    <section className={styles['pricing-section']} aria-labelledby="pricing">
      <p className={styles['eyebrow']}>{purchaseAvailability.heading}</p>
      <h2 id="pricing" tabIndex={-1}>
        Start with one project.
        <br />
        Make room for more.
      </h2>
      <p className={styles['pricing-intro']}>{purchaseAvailability.notice}</p>
      <div className={styles['offer-list']}>
        {offers.map((offer) => (
          <article
            key={offer.id}
            className={styles['offer-row']}
            aria-labelledby={`offer-${offer.id}`}
          >
            <h3 id={`offer-${offer.id}`}>{offer.name}</h3>
            <p className={styles['offer-price']}>
              {offer.price}
              <span>{offer.cadence}</span>
            </p>
            <div className={styles['offer-copy']}>
              <p>{offer.summary}</p>
              <p>{offer.detail}</p>
              <a
                className={styles['offer-link']}
                href={`/purchases?plan=${offer.id}#plan`}
              >
                {offer.id === 'free' ? 'About Free' : `Explore ${offer.name}`}
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className={styles['pricing-note']}>
        Ending paid access preserves reading, individual exports, backups,
        recovery and free writing. Applicable taxes and the final total will
        appear before payment when purchasing becomes available.
      </p>
      <div className={styles['pricing-actions']}>
        <Button component="a" href={releaseAvailability.action.href}>
          {releaseAvailability.action.label}
        </Button>
        {!releaseAvailability.available ? (
          <a href="/downloads">Download availability</a>
        ) : null}
        <a href="/help#restore">Already purchased? Restore access</a>
      </div>
    </section>
  )
}
