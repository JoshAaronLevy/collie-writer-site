import ReadingPage from '../components/site/ReadingPage'
import Faq from '../features/home/Faq'
import PurchaseHelp from '../features/access/PurchaseHelp'
import { siteDetails, supportDestination } from '../content/site'
import { releaseAvailability } from '../content/release'

export default function Help() {
  const contact = supportDestination()
  return (
    <ReadingPage
      title="A little help, when you need it."
      intro={`${releaseAvailability.notice}. ${releaseAvailability.available ? 'Use the installation instructions for your release, then follow the guides below.' : 'This guide describes the current development workflow; release-specific instructions will accompany an approved installer.'}`}
    >
      <nav aria-label="Help topics">
        <a href="#getting-started">Getting started</a>
        <a href="#ai-help">AI and ChatGPT</a>
        <a href="#save-open">Save and Open</a>
        <a href="#moving">Moving a project</a>
        <a href="#restore">Restore a purchase</a>
        <a href="#payment-help">Purchase help</a>
        <a href="#manage-subscription">Manage subscription</a>
        <a href="#faq">Questions</a>
        <a href="#support">Support</a>
      </nav>
      <section aria-labelledby="getting-started">
        <h2 id="getting-started" tabIndex={-1}>
          Start with a project
        </h2>
        <ol>
          <li>
            Choose <strong>New project</strong> in the project library and
            complete its details.
          </li>
          <li>
            Gather notes and sources, or begin writing. Use Plan to arrange
            chapters and link their material when that helps your thinking.
          </li>
          <li>
            Choose <strong>Save</strong> and select a location for your .collie
            file.
          </li>
        </ol>
        <p>
          <a href="/downloads">Check download availability</a> before looking
          for an installer.
        </p>
      </section>
      <section aria-labelledby="ai-help">
        <h2 id="ai-help" tabIndex={-1}>
          AI and your ChatGPT account
        </h2>
        <p>
          The connection happens in the desktop app: sign in
          through OpenAI, then allow eligible ChatGPT plan use. No API keys or
          separate Collie token bill. Collie pricing is separate.
        </p>
        <p>
          In participating apps, plan use counts toward your existing allowance.
          ChatGPT Settings → Usage lets you review app usage, limits and credit
          settings. See{' '}
          <a href="https://learn.chatgpt.com/docs/sign-in-with-chatgpt">
            OpenAI’s sign-in and usage guide
          </a>{' '}
          for current account controls.
        </p>
        <p>
          <a href="/#ai-tools">Explore Collie’s planned AI tools</a> or read the
          questions below about importing history, reviewing suggestions and
          sending selected context to the provider.
        </p>
      </section>
      <section aria-labelledby="save-open">
        <h2 id="save-open" tabIndex={-1}>
          Save, Open and local recovery
        </h2>
        <p>
          A new project has no file destination. The first <strong>Save</strong>{' '}
          chooses one; later saves update that selected .collie file.{' '}
          <strong>Save As…</strong> lets you choose another destination.
        </p>
        <p>
          Local working data and recovery protect work on that computer. They
          are separate from the file you chose: closing the project does not
          silently save that file. Save before transferring or sharing it.
        </p>
        <p>
          Use <strong>Open project file…</strong> in the library to open a saved
          .collie file, or <strong>Open backup…</strong> for a retained backup.
          Keep your current file and backups when reviewing recovery choices; do
          not delete local working data to resolve an issue.
        </p>
      </section>
      <section aria-labelledby="moving">
        <h2 id="moving" tabIndex={-1}>
          Move a project to another computer
        </h2>
        <ol>
          <li>
            Save, then close the project on the first computer. Keep a separate
            copy before moving important work.
          </li>
          <li>
            Transfer the .collie file. If you use a cloud folder, wait for your
            provider to finish syncing.
          </li>
          <li>
            On a compatible Collie installation, choose{' '}
            <strong>Open project file…</strong>. Avoid editing the same project
            on two computers at once.
          </li>
        </ol>
        <p>
          Saved manuscript and retained material travel together. Some
          unfinished drafts, settings and account credentials stay on the
          original device. Paid-access restore is separate from the project
          file.
        </p>
      </section>
      <PurchaseHelp />
      <Faq full />
      <section aria-labelledby="support">
        <h2 id="support" tabIndex={-1}>
          Support
        </h2>
        {contact ? (
          <p>
            <a href={contact}>{siteDetails.support?.label}</a>
          </p>
        ) : (
          <p>
            A public support contact has not been announced yet. There is no
            support form on this review site.
          </p>
        )}
        <p>
          For a product issue, describe the version, Mac or Windows, the action
          you took and the visible problem. For a purchase issue, use the
          approved receipt/reference process once support is available. Do not
          send manuscripts, project files, source attachments, passwords or full
          recovery codes.
        </p>
      </section>
    </ReadingPage>
  )
}
