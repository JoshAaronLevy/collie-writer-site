import ReadingPage from '../components/site/ReadingPage'
import ReviewNotice from '../components/site/ReviewNotice'
import PlanSelection from '../features/access/PlanSelection'
import { purchaseAvailability } from '../content/commerce'
import { releaseAvailability } from '../content/release'
import { reviewMode, siteDetails } from '../content/site'

export default function Purchases() {
  const unavailable = purchaseAvailability.status === 'unavailable'
  const websiteAvailable = purchaseAvailability.status === 'website'
  return (
    <ReadingPage
      title="Purchase information"
      intro={purchaseAvailability.notice}
    >
      <ReviewNotice pending="Seller, support and final purchase/refund terms remain placeholders for owner review. The purchase and restore journeys below are preparation for a future release; no checkout is enabled." />
      <PlanSelection />
      <nav aria-label="Purchase topics">
        <a href="#purchase-in-app">Purchase in the app</a>
        <a href="#buy-before-installing">Buy before installing</a>
        <a href="/help#restore">Restore a purchase</a>
        <a href="#refunds">Refund information</a>
      </nav>
      <section aria-labelledby="purchase-in-app">
        <h2 id="purchase-in-app" tabIndex={-1}>
          Purchase in the app
        </h2>
        {unavailable ? (
          <p>
            When purchases become available, this will be the in-app path. The
            current development build may show purchase access as unavailable.
          </p>
        ) : null}
        <ol>
          <li>
            <a href="/downloads">
              {releaseAvailability.available
                ? 'Download Collie Writer free'
                : 'Check download availability'}
            </a>
            , then install and open it. Already installed? Go straight to{' '}
            <strong>Settings → Collie access</strong>.
          </li>
          <li>
            Choose <strong>Monthly · $9.99 USD</strong> or{' '}
            <strong>Lifetime · $199 USD</strong> in the app. The app opens your
            browser for checkout. The plan you viewed on this website is not
            selected automatically in the app.
          </li>
          <li>
            Review the total and terms before payment. Use{' '}
            <strong>Check payment</strong> in the browser; after confirmation,
            save your recovery code. Return to Collie Writer and choose{' '}
            <strong>Check completion</strong>.
          </li>
        </ol>
        <p>
          Keep the latest recovery code in a password manager for future
          restores. Once you have saved it, return to the app; requesting
          another code may replace the one you saved.
        </p>
      </section>
      <section aria-labelledby="buy-before-installing">
        <h2 id="buy-before-installing" tabIndex={-1}>
          {websiteAvailable
            ? 'Buy before installing'
            : 'Planned: buy before installing'}
        </h2>
        <p>
          {websiteAvailable
            ? 'Choose Monthly or Lifetime above and continue to the purchase service. Review the final total and terms there.'
            : 'Website checkout is not available yet. The planned route will let you choose Monthly or Lifetime here and pay on the purchase service before installing Collie.'}{' '}
          After the service confirms payment:
        </p>
        <ol>
          <li>
            <strong>Save your recovery code.</strong> Keep it private; this
            website never asks for it.
          </li>
          <li>
            <strong>Install or open Collie Writer.</strong> Already installed?
            Use the app you have; no second download is needed.
          </li>
          <li>
            <strong>Restore purchase.</strong> In Settings → Collie access,
            choose <strong>Restore purchase…</strong>, enter the code in its
            browser page, then return to <strong>Check completion</strong>.
          </li>
        </ol>
        <p>
          <a href="/help#payment-help">
            Payment pending, browser closed or code lost?
          </a>{' '}
          Check the existing purchase; do not buy again to recover it.
        </p>
      </section>
      <section aria-labelledby="renewals">
        <h2 id="renewals" tabIndex={-1}>
          Renewals and cancellations
        </h2>
        <p>
          Monthly{unavailable ? ' is planned at' : ' costs'} $9.99 USD per month
          with recurring billing. Applicable taxes and the final total appear in
          checkout. Access follows the verified paid period, with up to 14 days
          of signed offline grace. Go online and use{' '}
          <strong>Refresh purchase access</strong> for renewals or changes.
        </p>
        <p>
          Lifetime is $199 USD once for the nonfiction edition and its future
          updates, without a major-version ceiling. Buying Lifetime does not
          cancel monthly billing. Use <strong>Manage subscription…</strong> in
          the connected app to review or cancel it.
        </p>
        <p>
          Cancellation, disconnecting a purchase account and a refund are
          different actions. Reading, individual exports, backups, recovery and
          free writing remain available after paid access ends.
        </p>
        <p>
          <a href="/help#manage-subscription">Subscription management help</a>
        </p>
      </section>
      <section aria-labelledby="refunds">
        <h2 id="refunds" tabIndex={-1}>
          Refunds and purchase problems
        </h2>
        <p>
          {siteDetails.refundTerms ??
            'Refund policy: awaiting owner approval. The seller, support destination and final refund terms are placeholders for now. No refund window is promised by this draft; sales remain unavailable.'}
        </p>
        <p>
          Use the approved receipt/reference process and a short description
          when support is available. Never send writing, passwords or a full
          recovery code. Pending payment or refund status is not a confirmed
          outcome.
        </p>
        <p>
          <a href="/help#support">Support availability</a> ·{' '}
          <a href="/privacy">Privacy{reviewMode ? ' draft' : ''}</a> ·{' '}
          <a href="/terms">Terms{reviewMode ? ' draft' : ''}</a>
        </p>
      </section>
    </ReadingPage>
  )
}
