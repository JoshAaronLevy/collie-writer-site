import ReadingPage from '../components/site/ReadingPage'
import ReviewNotice from '../components/site/ReviewNotice'
import { siteDetails } from '../content/site'
import { purchaseAvailability } from '../content/commerce'

export default function Privacy() {
  return (
    <ReadingPage
      title="Privacy"
      intro="How the website, local projects and separate account services relate."
    >
      <ReviewNotice pending="Seller/contact identity, website and service hosts, request logs, cookie behavior, retention/deletion periods and support handling require owner review. This describes current source behavior, not an approved public privacy policy." />
      <section>
        <h2>The website</h2>
        <p>
          This marketing site has no accounts, manuscript uploads, analytics,
          advertising, tracking pixels or embedded third-party media. Its fonts
          and artwork are served with the site. The application code does not
          set cookies or store visitor data in browser storage.
        </p>
        <p>
          {siteDetails.hostingPrivacy ??
            'Hosting has not been selected. A host may receive request information such as IP addresses, requested URLs, browser details and timestamps. The actual fields, security use, cookies, recipients and retention must be confirmed before publication; no retention period is promised here.'}
        </p>
      </section>
      <section>
        <h2>Your desktop project</h2>
        <p>
          Writing, research, originals and local recovery live on your computer.
          Explicit Save writes retained project material to your selected
          .collie file. Some drafts, preview edits, preferences and credentials
          remain device-local. The website does not receive that material.
        </p>
        <p>
          A personal cloud folder is governed by your arrangement with its
          provider. Collie does not guarantee that a cloud upload has completed
          or provide simultaneous editing across computers.
        </p>
      </section>
      <section>
        <h2>Purchases and account services</h2>
        <p>{purchaseAvailability.notice}</p>
        {siteDetails.purchasePrivacy ? (
          <p>{siteDetails.purchasePrivacy}</p>
        ) : (
          <>
            <p>
              The existing direct-purchase service is designed to use Paddle for
              billing and required transaction records. It keeps opaque
              customer/purchase identifiers, paid-access decisions, signing
              revisions, hashed recovery/connection credentials and minimal
              webhook records. Project contents are not purchase-service inputs.
            </p>
            <p>
              Connection sessions are short-lived; purchase and revocation
              history supports restore and replay protection. Final
              provider/host disclosures and retention/deletion terms remain
              pending. Opening checkout or subscription management would contact
              the payment provider separately from this marketing page.
            </p>
            <p>
              The planned buy-before-install flow needs a separate service-owned
              browser session. Its cookie, completion-session lifetime and
              recovery-code display retention have not been finalized. These
              details require review before that flow becomes available.
            </p>
          </>
        )}
      </section>
      <section>
        <h2>Optional AI</h2>
        <p>
          The intended connection uses
          your own ChatGPT account and separate permission to use your eligible
          plan. Signing in does not import your ChatGPT history. Account
          credentials remain device-local and are not part of a portable
          project.
        </p>
        <p>
          When you request AI help, your prompt and selected context go to the
          provider. That context can include writing, source passages, notes and
          conversation material. The marketing website does not receive it or
          run AI requests. Local writing and organization remain available
          without AI; provider requests require a network connection.
        </p>
        <p>
          Provider/account data handling, retention and deletion disclosures
          still require review before customer access. This draft does not
          promise a retention period or make a training-use claim. See{' '}
          <a href="/help#ai-help">AI and ChatGPT help</a> for the planned
          connection and usage model.
        </p>
      </section>
      <section>
        <h2>Contact and requests</h2>
        <p>
          {siteDetails.contactPrivacy ??
            'A support destination and its message-handling, retention and deletion process have not been approved. Do not send private project material or credentials to an unverified contact.'}
        </p>
        <p>
          <a href="/help#support">Support availability</a>
        </p>
      </section>
    </ReadingPage>
  )
}
