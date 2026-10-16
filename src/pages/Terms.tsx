import ReadingPage from '../components/site/ReadingPage'
import ReviewNotice from '../components/site/ReviewNotice'
import { siteDetails } from '../content/site'
import { purchaseAvailability } from '../content/commerce'
import { releaseAvailability } from '../content/release'

export default function Terms() {
  return (
    <ReadingPage
      title="Terms"
      intro="The intended nonfiction edition and its access rights."
    >
      <ReviewNotice pending="The legal seller, contact details, applicable terms and jurisdiction, effective date and policy approval are unresolved. These source-grounded edition notes are for local review; they are not finalized customer terms." />
      <section>
        <h2>Seller and availability</h2>
        <p>
          {siteDetails.sellerName
            ? `Seller: ${siteDetails.sellerName}.`
            : 'The legal seller has not been confirmed for this site.'}{' '}
          {releaseAvailability.notice}. {purchaseAvailability.notice} A price
          shown as planned is not a checkout offer or a completed purchase.
        </p>
      </section>
      <section>
        <h2>The nonfiction edition</h2>
        <p>
          Free use is untimed, with one editable personal project at a time and
          unrestricted switching. Reading, individual exports, backups and
          recovery remain available when paid access ends.
        </p>
        <p>
          Monthly and Lifetime add unlimited editable projects, saved export
          recipes and multi-format exports. Lifetime includes all future updates
          to the purchased nonfiction edition, without a major-version ceiling.
          Separate future products or editions are not promised.
        </p>
        <p>
          The existing direct-license design covers a customer’s own Mac and
          Windows installations. Moving the project file and restoring purchase
          access are separate actions. This does not promise cross-store
          entitlement portability.
        </p>
      </section>
      <section>
        <h2>Your work and review</h2>
        <p>
          The project workflow keeps writing and retained material in a local,
          portable file. Review citations, source details and exported output
          before relying on them. The site’s illustrative material is invented
          example content, not scholarship or evidence of an accepted app
          release.
        </p>
        <p>
          No currently available AI feature is being sold. Product release,
          provider eligibility and commercial approval remain separate
          decisions.
        </p>
      </section>
      <section>
        <h2>Purchases</h2>
        <p>
          See <a href="/purchases">Purchase information</a> for prices, renewals
          and refund information. Purchase management uses the connected desktop
          app; this website has no account portal.
        </p>
      </section>
    </ReadingPage>
  )
}
