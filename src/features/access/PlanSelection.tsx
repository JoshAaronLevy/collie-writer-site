import { Button } from '@mantine/core'
import { useLocation } from 'react-router'
import { offers } from '../../content/offers'
import {
  checkoutDestination,
  purchaseAvailability,
} from '../../content/commerce'
import { releaseAvailability } from '../../content/release'
import styles from './PlanSelection.module.css'

export default function PlanSelection() {
  const { search } = useLocation()
  const choices = new URLSearchParams(search).getAll('plan')
  const selected =
    offers.find((offer) => choices.length === 1 && offer.id === choices[0]) ??
    offers[0]
  const checkout =
    selected.id === 'free' ? undefined : checkoutDestination(selected.id)

  return (
    <section aria-labelledby="plan">
      <h2 id="plan" tabIndex={-1}>
        {purchaseAvailability.heading}
      </h2>
      <nav
        className={styles['plan-choices']}
        aria-label="Choose a plan to read about"
      >
        {offers.map((offer) => (
          <a
            key={offer.id}
            href={`/purchases?plan=${offer.id}#plan`}
            aria-current={selected.id === offer.id ? 'true' : undefined}
          >
            <span>{offer.name}</span>
            <span>
              {offer.price} · {offer.cadence}
            </span>
          </a>
        ))}
      </nav>
      <div className={styles['selected-plan']}>
        <h3>
          {selected.name} · {selected.price} · {selected.cadence}
        </h3>
        <p>{selected.summary}</p>
        <p>{selected.detail}</p>
        {selected.id === 'free' ? (
          <p>No automatic conversion to paid access.</p>
        ) : (
          <p>
            For the nonfiction edition. Applicable taxes and the final total
            appear before payment. Read the{' '}
            <a href="#refunds">refund information</a> and{' '}
            <a href="/terms">terms</a> before purchasing.
          </p>
        )}
        <div className={styles['plan-actions']}>
          {checkout ? (
            <Button component="a" href={checkout} rel="noreferrer">
              Continue with {selected.name}
            </Button>
          ) : selected.id !== 'free' &&
            purchaseAvailability.status === 'in-app' ? (
            <Button component="a" href="#purchase-in-app">
              Purchase in the app
            </Button>
          ) : (
            <Button component="a" href={releaseAvailability.action.href}>
              {releaseAvailability.available
                ? 'Download free'
                : releaseAvailability.action.label}
            </Button>
          )}
          {selected.id !== 'free' &&
          purchaseAvailability.status === 'in-app' ? (
            <a href="/help#restore">Already purchased? Restore access</a>
          ) : selected.id !== 'free' ? (
            <a href="#purchase-in-app">
              {checkout
                ? 'Already have Collie? Purchase in the app'
                : 'How purchasing works'}
            </a>
          ) : (
            <a href="/#pricing">Compare all plans</a>
          )}
        </div>
        {checkout ? (
          <p className={styles['plan-note']}>
            Continue to the purchase service to review checkout. This step does
            not charge you.
          </p>
        ) : null}
        {selected.id !== 'free' &&
        purchaseAvailability.status === 'unavailable' ? (
          <p className={styles['plan-note']}>
            This is a plan preview. No purchase has started.
          </p>
        ) : null}
      </div>
    </section>
  )
}
