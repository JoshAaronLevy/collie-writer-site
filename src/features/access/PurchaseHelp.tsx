import { purchaseAvailability } from '../../content/commerce'
import styles from './PurchaseHelp.module.css'

export default function PurchaseHelp() {
  return (
    <>
      <section aria-labelledby="restore">
        <h2 id="restore" tabIndex={-1}>
          Restore a purchase
        </h2>
        {purchaseAvailability.status === 'unavailable' ? (
          <p className={styles['availability-note']}>
            New purchases are not available. Restore requires a configured
            direct release and purchase service; the steps below describe that
            workflow. Pausing new sales does not itself disable existing
            purchase restore.
          </p>
        ) : null}
        <ol>
          <li>
            Install or open Collie Writer, then go to{' '}
            <strong>Settings → Collie access → Restore purchase…</strong>.
          </li>
          <li>
            Enter your private recovery code in the purchase-service browser
            page opened by the app.
          </li>
          <li>
            Return to Collie Writer and choose <strong>Check completion</strong>
            . The app receives access only after the service confirms the
            purchase.
          </li>
        </ol>
        <p>
          Use the same steps on a replacement computer or when moving between
          compatible direct Mac and Windows releases. Transfer your saved
          .collie project separately; it does not contain purchase credentials.
          You do not need to buy again to restore.
        </p>
        <p>
          <a href="/downloads">Download availability</a> ·{' '}
          <a href="/purchases">Plans and purchase instructions</a>
        </p>
      </section>
      <section
        className={styles['purchase-help']}
        aria-labelledby="payment-help"
      >
        <h2 id="payment-help" tabIndex={-1}>
          Help with a purchase
        </h2>
        <p>
          This website cannot read or confirm a payment. Use the
          purchase-service page opened for that attempt.
        </p>
        <details>
          <summary>Payment is pending, or access has not appeared</summary>
          <p>
            Keep the purchase browser page open. For an in-app purchase, use{' '}
            <strong>Check payment</strong> there until confirmation, save the
            recovery code, then return to the app and choose{' '}
            <strong>Check completion</strong>. While that app session is active,{' '}
            <strong>Continue in browser</strong> reopens its browser page.
          </p>
          <p>
            For a website purchase, check the same order on its service page,
            then follow <a href="#restore">Restore a purchase</a> after
            confirmation. A checkout message or return to this site is not proof
            of paid access. Do not pay again to fix a delay. If the session has
            expired, use the receipt/reference with{' '}
            <a href="#support">support</a>.
          </p>
        </details>
        <details>
          <summary>I closed checkout, or a payment failed</summary>
          <p>
            Closing checkout does not prove whether a payment went through.
            Check the original attempt first. Retry deliberately only after its
            unpaid outcome is known; an uncertain or completed payment belongs
            with purchase support. You can continue free writing while resolving
            it.
          </p>
        </details>
        <details>
          <summary>
            The session expired, or I closed the browser before saving my code
          </summary>
          <p>
            If you saved the code, start <strong>Restore purchase…</strong> from
            the app. If you did not, keep the receipt/reference and use{' '}
            <a href="#support">verified purchase support</a>. An expired browser
            session does not mean the purchase was erased. Do not buy a second
            time or assume a code will arrive by email.
          </p>
        </details>
        <details>
          <summary>My recovery code is missing or no longer works</summary>
          <p>
            Keep the latest code private in a password manager. A replacement
            code can invalidate an earlier one. Approved support must verify
            ownership before replacing a lost code; a receipt reference alone
            does not grant access. Never post the code or send it through
            routine support messages.
          </p>
        </details>
        <details>
          <summary>The purchase service is unavailable</summary>
          <p>
            Keep your saved code and existing app data. Reading, individual
            exports, backups, recovery and free writing remain available. An
            outage does not extend a monthly paid period or its signed offline
            grace. Use <strong>Refresh purchase access</strong> when the service
            is available again; reinstalling or deleting project data is not a
            recovery step.
          </p>
        </details>
      </section>
      <section aria-labelledby="manage-subscription">
        <h2 id="manage-subscription" tabIndex={-1}>
          Manage or cancel a subscription
        </h2>
        <p>
          In the connected app, open{' '}
          <strong>Settings → Collie access → Manage subscription…</strong>.
          Review or cancel recurring billing in the provider’s portal. Then use{' '}
          <strong>Refresh purchase access</strong> in Collie to receive the
          current paid-access record.
        </p>
        <p>
          Buying Lifetime, uninstalling Collie or choosing{' '}
          <strong>Disconnect purchase account</strong> does not cancel monthly
          billing. If you cannot use a connected app,{' '}
          <a href="#support">approved purchase support</a> must help verify the
          purchase. This site has no account portal or billing lookup form.
        </p>
      </section>
    </>
  )
}
