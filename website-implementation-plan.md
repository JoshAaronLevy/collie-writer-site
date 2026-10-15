# Collie Writer website implementation plan

Prepared October 15, 2026. **WEB01–WEB02 implementation complete — awaiting user testing. WEB03–WEB08 are not started.**

This plan turns the supplied creative brief into eight independently requestable stages. “Implement stage WEB01” authorizes that stage's local website work and required code checks. Stop at its handoff for Josh's observations. It does not authorize the next stage, changes to the desktop repository, service deployment, publication, or live commerce.

## 1. Starting point and decisions

### Repository inspection — planning baseline

The website is `/Users/joshlevy/Desktop/collie-writer-site`. The desktop reference checkout is `../collie-writer`; all desktop paths below are relative to that checkout unless explicitly identified as website paths.

- The website is the Vite React/TypeScript starter, with React 19, Vite 8, TypeScript 6 and Mantine 9 declared in `package.json`. Preserve this stack and the existing npm lockfile.
- Existing work at planning start: modified `package.json`, `package-lock.json` and `src/App.tsx`; untracked `postcss.config.cjs`. These add Mantine packages, a provider/style import and Mantine PostCSS configuration. Preserve and build on that work. The counter, framework logos and template links are still present.
- Read website `README.md`, source, HTML, Vite/PostCSS/TypeScript/ESLint configuration and `.gitignore`. No repository-local or ancestor `AGENTS.md` was found on the website path; the instructions supplied in this conversation apply. The desktop has its own `AGENTS.md`, which was read for reference boundaries and current status.
- Website scripts are `dev`, `build`, `lint` and `preview`. **Format and typecheck scripts are missing.** `build` runs `tsc -b && vite build`; it must not be used as a typecheck substitute. WEB01 supplies independent checks.
- No site routing, approved content, release metadata or commerce integration exists. Installed carousel, chart, editor and other Mantine packages do not create a requirement to use them. Avoid an unrelated dependency cleanup.
- The desktop remains read-only for website stages. Its inspected Git status includes untracked `data/` and `website-creative-brief.md`; preserve them without copying private data into the site. No app, service, browser, build, test or runtime probe was run during planning.

### Chosen direction

**Material becoming a manuscript.** A warm editorial website follows one invented nonfiction project from collected pieces to a chapter outline and a readable draft. The product, typography and example carry the page; the Border Collie is a small, memorable brand signature.

The site is a static marketing frontend. The existing entitlement service remains the only purchase and licensing authority. No website accounts, manuscript uploads, online editor, CMS, blog, newsletter, waitlist, analytics, advertising, tracking pixels, session replay or embedded third-party media are planned. Start without a cookie banner; disclose actual hosting and commerce behavior when those services are selected.

Choose a light paper palette with a deliberate dark-green section, rather than adding a site-wide theme switch. Use Source Serif 4 for editorial headings and selected manuscript text, system sans for body and controls, and Mantine for interaction primitives. Styling belongs to its component or feature, with descriptive lowercase hyphenated class names. Root CSS contains only tokens, base styles and genuine global rules.

### Launch-state decision

**The initial implementation state is “in development.”** No release or checkout is publicly available based on the inspected records. No stage silently promotes this state.

| State                            | Visitor experience                                                                                                                                                                                                     | Evidence required to enable it                                                                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| In development — current default | Hero says “In development for Mac and Windows”; primary action is **Explore Collie**, linked to the product story. Intended prices are labeled “Planned pricing”; downloads explain availability without fake buttons. | Local site work can proceed now. Public publication still needs approved claims, privacy/support information and separate authorization.                        |
| Free release available           | **Download Collie Writer** opens platform choices. Paid offers remain informational if checkout is unavailable.                                                                                                        | Exact accepted signed artifacts, supported systems, release notes and owner approval for each listed build.                                                     |
| Purchase in app available        | Pricing offers **Download free** and **Purchase in the app** instructions, including a short path for existing users.                                                                                                  | Accepted release plus configured, approved and user-accepted existing direct purchase/restore service.                                                          |
| Website purchase available       | Monthly/lifetime selections open the existing service's new website checkout entry. Confirmation leads to recovery-code activation in the app.                                                                         | WEB07 and its separately scoped service dependency, accepted recovery journey, approved merchant/legal setup and explicit activation/publication authorization. |

Keep release availability and purchase availability independent. A service outage must not remove free downloads. A visible price is not proof that a plan can be bought. Never use the source package's `1.0.0` as a released version.

**AI decision:** omit AI from the hero, pricing benefits and primary demonstrations. A factual FAQ can say optional AI is in development and is not currently offered to customers. Do not promote an owner-only development preview as a customer benefit. Reconsider only after provider eligibility, commercial authorization, packaged availability and owner acceptance are recorded. If eventually eligible, explain selected context leaving the device, the user's own ChatGPT account and explicit review/insertion; never imply included tokens, unlimited AI, an OpenAI partnership or automatic verified citations. Current Proofreading Run is unavailable.

## 2. Product evidence and claim eligibility

These are source findings, not runtime results. Product claims must be matched to the particular accepted release before publication. During development, introductory copy describes the product under an obvious development label; illustrations identify their status. Remove or qualify any feature absent from the release being offered.

| Area                           | Inspected evidence                                                                                                                                                         | Eligible website treatment and remaining boundary                                                                                                                                                                                                                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nonfiction writing             | `src/domain/projects/templates.ts`; `README.md`; project/workspace source                                                                                                  | Book, academic essay, article, report, study critique, research paper and blank nonfiction exist. Lead with book/article/essay; no fiction, screenplay or collaboration promise. Core runtime acceptance is not established.                                                                                                                    |
| Plan and chapter material      | `features/planning/PlanningCards.tsx`, `PlanWorkspace.tsx`, `features/workspace/ChapterMaterialPanel.tsx` under renderer source; current `AGENTS.md`; PL01–PL06 records    | Manual topics, chapter links and Plan/Write structure are implemented. Demonstrate a note and excerpt linked to a chapter. PL01–PL06 remain awaiting user testing; do not present a mock composition as a captured, accepted app.                                                                                                               |
| Useful conversations           | Current PL03 record and conversation/planning source                                                                                                                       | Retained conversations and kept passages can support the collection story. Distinguish imported/saved material from generating a new AI conversation. Do not depict a live customer AI session in the default launch story.                                                                                                                     |
| Research, citations and export | `features/projects/SourceInspector.tsx`, `CitationsPanel.tsx`, `ExportPanel.tsx`, `AccessPanel.tsx`; current README                                                        | Brief benefits: originals/excerpts, APA 7, Chicago 18 notes and bibliography, DOCX/PDF/Markdown/plain text. Output fidelity remains an owner acceptance gate. No universal style support, flawless metadata, identical pagination or EPUB promise.                                                                                              |
| Import                         | `src/main/imports/selected-file.ts`, `import-hybrid-implementation-plan.md`, `docs/validation/import-curated-envelope.md` and current AGENTS                               | Supported JSON/chat structures, text, Markdown and bibliography material; review then Accept. Extensions alone are not parser guarantees. Recheck current readers before publishing a detailed list. PDF/text source attachments are separate from general import. No universal document conversion, arbitrary ZIP, OCR or transcription claim. |
| Files and offline work         | Current README/AGENTS and Save/recovery references                                                                                                                         | Local work and an explicit Save to a portable `.collie` file. No built-in cloud sync, manuscript-hosting requirement, whole-file encryption or guaranteed cloud-upload claim. Some drafts, preview edits, preferences and credentials remain device-local.                                                                                      |
| Optional AI                    | Current AGENTS; `features/ai/conversations/WritingPreview.tsx`; PL04–PL06 records                                                                                          | Owner-only unpackaged own-account route. No customer sales claims until independently eligible and accepted. Source-backed preview/insertion is not permission to market shipping AI.                                                                                                                                                           |
| Free and paid rights           | `features/projects/AccessPanel.tsx`, `DirectAccessPanel.tsx`; `services/entitlements/pages.mjs`                                                                            | Preserve the existing offers below. Lifetime works from cached rights offline; monthly uses verified paid periods and up to 14 days of signed offline grace, with explicit refresh for renewals/changes. Do not promise indefinite monthly offline paid access.                                                                                 |
| Purchases                      | `services/entitlements/README.md`, `server.mjs`, `public/connect.js`, `store.mjs`, `policy.mjs`; `src/main/entitlements/direct/config.ts`, `src/main/entitlements/keys.ts` | Checkout policy is false, desktop configuration null, issuer keys empty. Existing sessions originate in the desktop; no standalone website store exists. No live sale or successful restore is established.                                                                                                                                     |
| Releases                       | `docs/release/release-candidate-manifest.json`, `docs/release/store-listings.md`, current AGENTS                                                                           | Dated manifest is `blocked-no-go`; candidate version and artifact URLs/signing evidence are null. Store listings are drafts. Its older schema/feature snapshot must not override current source. No badges or public development builds.                                                                                                        |

`features/...` in the table means `src/renderer/src/features/...` in the app. The entitlement README references `docs/formats/direct-commerce-v1.md`, which is absent in this checkout. Use current source and surviving records; do not invent that missing contract. Refresh these findings at the relevant stage, especially release and commerce status.

### Offer language to preserve

| Offer    | Concise comparison                                                                                                   | Details for the purchase FAQ                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Free     | One editable personal project at a time. Switch whenever you want. No timed trial.                                   | Other projects remain readable, individually exportable, backed up and recoverable. No invented card requirement or automatic conversion.                                   |
| Monthly  | **$9.99 USD/month**. Unlimited editable projects, saved export recipes and multiple export formats in one operation. | Recurring billing, verified paid period, up to 14 days of signed offline grace; refresh online for changes. Ending paid access preserves essential access and free writing. |
| Lifetime | **$199 USD once**. The same paid conveniences and all future updates to the purchased nonfiction edition.            | No major-version ceiling; separate future editions/products are not promised. Buying lifetime does not cancel an existing monthly subscription.                             |

Initial sales market is the United States. Taxes/final totals belong in the real checkout. Do not add annual plans, discounts, countdowns, refund windows or “unlimited AI.” Free use can use existing export recipes for one format at a time; avoid implying individual exports become paid-only.

## 3. Site map and homepage story

### Destinations

| Destination             | Contents and stage owner                                                                                                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                     | Hero; `#how-it-works` gather/shape/write story; ownership; `#pricing`; short `#faq`. WEB01–WEB04, then FAQ completion in WEB05.                                                                           |
| `/downloads`            | Honest availability, platform/architecture choices, accepted version/date, requirements, install guidance and compact release notes. WEB04. No separate changelog site.                                   |
| `/help`                 | Getting started, Save/Open, moving a project, purchase/restore/manage help and a real support destination. WEB05; purchase sections completed in WEB06–WEB07.                                             |
| `/privacy`              | Website hosting/service collection and the separate desktop/provider boundaries. WEB05; owner-reviewed before publication.                                                                                |
| `/terms`                | Real seller, edition rights and applicable terms. WEB05; owner-reviewed before publication.                                                                                                               |
| `/purchases`            | Price/renewal/refund information, activation/restore and subscription management. WEB05–WEB07. Supports pricing without a new login portal.                                                               |
| Unknown route           | Helpful not-found page with Home, Downloads and Help links. WEB05. Host must return an appropriate not-found status at publication.                                                                       |
| Purchase service origin | Existing `/connect`; proposed `/buy/monthly` and `/buy/lifetime` service pages for standalone buying. These are service-owned destinations, not a second licensing app in Vite. WEB06–WEB07 dependencies. |

Final navigation: **How it works · Pricing · Help**, with a download action only when eligible. Before destination stages exist, show only implemented working links. Footer adds Downloads, Privacy, Terms and Purchase information when real pages exist. No dead `#` placeholders.

### Narrative and copy direction

Aim for 450–700 words across the finished homepage narrative, excluding expanded FAQ answers and legal/release pages. Edit downward if the story works with fewer words. These are direction-setting excerpts, not copy that must all appear verbatim.

| Moment    | Heading and message                                                                                                                                                                                 | Composition                                                                                                                                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero      | **You've gathered the ideas. Now give them a shape.** “Collie Writer brings your research, notes and writing into one calm workspace, so you can turn what you know into a book, article or essay.” | Editorial headline beside one large manuscript/outline/material illustration. On a normal laptop, show identity, short description and the primary action without scrolling. Small mascot beside live-text wordmark; no full-screen mascot. |
| Gather    | **A place for the pieces.** Keep notes, sources and useful conversations together, with the original close at hand.                                                                                 | Three or four legible pieces from the same project, arranged like working material rather than feature cards.                                                                                                                               |
| Shape     | **Find the shape of your argument.** Group related ideas, arrange chapters and connect the material each chapter needs. Planning stays optional and iterative.                                      | A wide, pale-sage composition shows one note and excerpt becoming chapter material. The outline grows from that same content.                                                                                                               |
| Write     | **Keep your research within reach.** Settle into the draft with its notes and sources beside it. Add citations and export to familiar formats when ready.                                           | The clearest, largest writing surface. Preserve readable prose on phones through a focused composition, not a miniature whole desktop.                                                                                                      |
| Ownership | **Your work. Your files.** Write offline. Save a portable project where you choose. Keep your research and manuscript together.                                                                     | Dark-green change of pace with concise text and a small project-file motif. No security certification badges or sweeping “nothing ever leaves your device.”                                                                                 |
| Access    | **Start with one project. Make room for more.** Free, monthly and lifetime in a compact comparison, then the appropriate next action and a few FAQ answers.                                         | Calm pricing rows or a small comparison that stacks naturally. No “most popular” badge without evidence, urgency or repeated closing pitch.                                                                                                 |

Use **Explore Collie** in development; use **Download Collie Writer** with quieter **See how it works** when releases exist. “For Mac and Windows” must match actual available artifacts. “No ads. No timed trial.” is a short reassurance when free access is available, not a manifesto.

### One public example

Use **Why public spaces matter** throughout. Example chapter sequence: “A place to pause,” “Everyday encounters,” “Making room for everyone.” A note might read “A bench gives someone a reason to stay.” A clearly fictional source excerpt might read “The square has shaded seating beside the walking route.” The manuscript connects those observations without fabricated statistics or scholarly citations.

Put “Illustrative workspace · example content” beside product compositions. Identify synthetic source text as an example, not a real quoted authority. A retained conversation passage can be described as imported example material; avoid AI send controls or a generated-answer animation in the default story. Use source-backed terms such as Plan, Write, Chapter material, Notes and Sources. Illustrations are presentational HTML/CSS with live readable text, not a working editor, draggable app demo or evidence of runtime behavior. Nonfunctional depicted controls are not focusable website controls.

## 4. Assets, structure and content ownership

### Asset inventory

| Existing asset/reference                                                                  | Website decision                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resources/branding/collie-writer-master.png` — approximately 2.1 MB                      | Approved source of truth, recorded in branding README. Preserve the original unchanged. During WEB01 copy only needed material into the site; use appropriately sized derivatives for delivery rather than loading the master in the header. No regenerated mascot or redesigned logo.                                                                                           |
| `src/renderer/src/assets/collie-writer.png` — 256 px, approximately 99 KB                 | Suitable existing header/footer brand image; pair with live “Collie Writer” text. Empty image alt when adjacent text already names the brand.                                                                                                                                                                                                                                    |
| `build/icon.png` — 1024 px, approximately 1.4 MB; `build/icon.ico`                        | Possible sources for web favicon/social derivatives. Do not ship all native icon formats or use macOS Dock padding as the web identity.                                                                                                                                                                                                                                          |
| `resources/fonts/SourceSerif4-Regular.ttf`, `SourceSerif4-Bold.ttf`                       | Start with regular and bold only; no italic faces unless the finished design needs them. Prefer lossless WOFF2 packaging of these full faces if available without a new asset pipeline; retain original font metadata, copyright and OFL. Otherwise self-host selected TTFs and record the size tradeoff. `font-display: swap`, sensible Georgia fallback, no remote font calls. |
| `resources/licenses/SourceSerif4-OFL.txt`, `resources/branding/README.md`                 | Copy applicable notices/provenance into site-owned asset documentation. Keep font attribution/license accessible. Respect reserved font names; do not silently subset or rename font software.                                                                                                                                                                                   |
| `src/renderer/src/theme/theme.ts`, `tokens.css`                                           | Adapt palette and spacing selectively. Do not copy app-wide CSS, runtime providers or desktop-specific CSP bridges.                                                                                                                                                                                                                                                              |
| Approved app screenshots — none supplied                                                  | Optional replacement for illustrations after owner supplies cleared, accepted-release images. Record release/version, permitted use and crop. No assistant-run screenshot capture; no private manuscripts or project archives.                                                                                                                                                   |
| Website `src/assets/hero.png`, React/Vite logos, `public/favicon.svg`, `public/icons.svg` | Starter material, not Collie artwork. Remove starter usage in WEB01; remove unused starter files only within that change after inspecting references.                                                                                                                                                                                                                            |

Reserve dimensions/aspect ratios for images. Use responsive brand/product assets, lazy loading below the fold and no large decorative image on the critical path. A 1200×630 social composition in WEB05 can reuse the wordmark, mascot and public example; do not invent press marks or endorsements. No runtime imports, symlinks or absolute paths into the sibling app. Never copy `data/`, private projects, credentials, exports or whole application directories.

### Small implementation structure

Keep `src/main.tsx` as bootstrap, `src/App.tsx` as composition/route wiring, `src/index.css` for global foundations, and a small `src/theme.ts` for Mantine defaults. Suggested owners, created only when their stage needs them:

- `src/components/site/`: header, footer, page container and their scoped styles.
- `src/features/home/`: hero/story/ownership, illustrative workspace, motion and feature-owned CSS.
- `src/features/access/`: comparison and availability-aware actions.
- `src/pages/`: Downloads, Help, Privacy, Terms, Purchases and NotFound.
- `src/content/site.ts`, `offers.ts`, `release.ts`: concise editorial content/settings, offers, and one release/availability record. Use small typed data objects, not a CMS or generic page-builder schema.
- `src/assets/branding/`, `public/fonts/`, `public/licenses/`: site-owned assets and notices.

Use ordinary page links and a small maintained React router when WEB04 introduces multiple destinations; no framework migration or custom navigation engine. The chosen static host must support direct loads and reloads. WEB05 provides per-route HTML metadata at build time using the existing Vite setup, including crawler-visible title/description/canonical/social data. A client-only title update is insufficient for sharing. Choose a small Vite multipage/static-output solution; no server rendering infrastructure just for this site. Build-output generation is production code, not an automated verification script; the assistant still must not execute a build.

Release metadata owns availability, accepted version/date, artifact platform/architecture/format/URL, supported OS requirements, installation notes and changelog. Store owner-supplied size/hash only when authentic. Keep unavailable values absent, never dummy links. Validate publication-critical content in production code so incomplete or inconsistent records cannot render an active download or purchase. Offer copy has one website owner; the service remains authoritative for actual catalog, tax and payment totals.

Publication settings hold an optional approved canonical origin and explicit public/indexable status. Development/review output is noindex and excluded from a public sitemap. Do not put localhost, an invented domain or account/service secrets into public metadata. Noindex is not access control; host preview privacy is a separate deployment choice.

## 5. Purchase and activation design

### What exists today

The desktop creates a 20-minute session with separate app and browser credentials; the browser opens service `/connect` with a fragment that is removed before Paddle loads. `server.mjs` refuses browser origins on the native session endpoint, so a Vite page cannot reuse it as a public checkout API. Browser-only operations require the service's own origin. The service checks the canonical Paddle transaction and reconciles signed access; a checkout event/redirect is not payment proof. Restore uses a private recovery code; the desktop's **Check completion** claims the verified result. Connected users have **Refresh purchase access** and **Manage subscription…**. No automatic desktop callback is established.

`store.mjs` currently initializes an empty schema-1 database and refuses unknown schemas; it has no general migration path. Any website-purchase persistence change must preserve existing purchases, revisions, recovery credentials and pending sessions through an explicit migration. Do not replace the database to make a new flow work.

### Customer journeys

| Situation                               | First usable route: purchase in app                                                                                                                         | Standalone website purchase deliverable                                                                                                                                                                                                  |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New visitor, no app                     | Choose an offer → Download → install/open → Collie access → Monthly or Lifetime → browser checkout. Website says purchase happens in the app.               | Choose Monthly or Lifetime → service-hosted checkout → service confirms payment → save recovery code → download/install → Restore purchase in app → enter code in its browser → Check completion.                                        |
| App already installed                   | Pricing/help gives the exact Collie access steps; user selects the same offer in the app. Do not claim a plan was transferred automatically.                | Buy on service page, then Restore purchase in the installed app. Retain **Purchase in the app** as a simple alternative, especially for an already connected customer. No custom URL protocol dependency.                                |
| Payment canceled or fails               | Return to pricing or app; free work remains available. Offer a deliberate retry only after the outcome is known.                                            | Same; no paid success screen, code or new automatic charge. A redirect or query parameter cannot unlock anything.                                                                                                                        |
| Payment confirmation is delayed         | **Check payment** in browser and **Check completion** in app reconcile the same attempt. Explain pending, keep the receipt, and offer support after expiry. | Service-owned confirmation distinguishes pending from confirmed. Recheck the same order; never advise buying again to fix a delay. If the session is lost/expired, recover through verified purchase support.                            |
| Browser closes before code is saved     | Existing support verifies merchant ownership and replaces a lost recovery code. No writing is needed.                                                       | Durable purchase fulfillment survives browser/session closure. Use a bounded secure completion session; provide the same verified-support fallback if it expires. No promised email automation unless actually implemented and approved. |
| Replacement computer / Mac–Windows move | Install an approved direct release → Restore purchase → enter recovery code in service browser → Check completion. Transfer `.collie` separately.           | Same restore mechanism and purchase owner. No fingerprint, second license backend or account-registration portal. Direct-license portability is not a cross-store entitlement promise.                                                   |
| Manage/cancel subscription              | Connected app → **Manage subscription…** → service-created provider portal. Cancel recurring billing there.                                                 | Link to those instructions. Receipt/provider links may be documented only after verified. Without an installed/connected app, approved support assists; do not expose an unauthenticated portal URL generator.                           |
| Paid access ends, refund or outage      | Essential reading, individual exports, backups/recovery and free writing remain. Cancellation, disconnect and refund are distinct.                          | Identical rights. Monthly terms explain renewal/offline limits; lifetime purchase does not automatically stop monthly billing.                                                                                                           |

Keep the normal confirmation page to three steps: **Save your recovery code → Install/open Collie Writer → Restore purchase**. Explain delays and lost-code recovery only where needed. Never request manuscripts, credentials or full recovery codes through routine support.

### Explicit dependencies outside website scope

These are concrete deliverables in the desktop repository, **not authorization to edit it during a WEB stage**. A separate request naming the dependency/repository is required for those changes. Website work can prepare copy, contracts and disabled states first; ask for any necessary authorization only after the proposed change is concrete.

| Dependency                                                     | Scope and completion evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Used by                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| **COM01 — configure and accept the existing direct route**     | Owner supplies real seller/Paddle eligibility, US/USD prices, service domain/host, support and approved policies, genuine issuer/public key and server secrets. Separately scoped service/app work sets `policy.mjs`, `direct/config.ts` and `keys.ts` consistently; keeps sandbox/live identities separate and restores available independently of new sales. Owner performs authorized purchase/restore/cancel/renewal/refund observations on approved builds.                                       | WEB06; WEB07 uses the same authority.                                    |
| **COM02 — service-owned website purchases**                    | Extend `services/entitlements/` with browser-initiated purchase sessions, fixed monthly/lifetime entry pages, secure pending/confirmation/recovery display, durable fulfillment and any explicit database migration. Reuse current Paddle reconciliation, webhook deduplication, signed grants and recovery-code restore. See the bounded contract below. No replacement licensing backend.                                                                                                            | WEB07.                                                                   |
| **APP01 — accepted desktop release and restore compatibility** | Owner supplies accepted signed artifacts and feature/OS evidence. Free release approval does not require commerce to be enabled. For paid activation, the shipping desktop must additionally trust the correct direct issuer/origin and expose working Collie access/restore. Source suggests the existing restore UX can serve website buyers; owner observations must confirm it. If COM02 reveals a compatibility gap, scope that exact desktop change separately; no deep-link feature by default. | WEB04 artifacts only; WEB06–WEB07 purchase configuration and activation. |

COM02 design contract for the separate implementation:

1. The static site links to approved service-owned plan pages. GET shows the selected offer; an explicit action creates the purchase attempt. Plan identifiers are allowlisted server-side; price IDs, quantity, currency and environment are not trusted from the marketing URL. No service secrets or signing keys in Vite. A public Paddle client token, if required, belongs on the service checkout page.
2. Add a distinct browser session path; do not weaken the existing app-claim endpoint's origin protections or emulate an installed device in JavaScript. Keep completion authority on the service origin, using bounded secure sessions, appropriate CSRF/origin protection, no-store responses and restricted referrers. Never put recovery codes or bearer secrets in query strings, marketing-site storage, analytics or logs.
3. Persist attempt/transaction/customer association before issuing recovery authority. Repeated completion checks and provider events reconcile the same attempt; uncertain transaction creation cannot silently create another purchase. Catalog, amount, paid status and edition must be service-verified using current provider rules. Browser success callbacks remain presentation hints only.
4. Confirmed purchases survive the 20-minute browser/app sessions and are restorable later. Design code display/reload deliberately: the current recovery endpoint generates a replacement on each request, so a refreshed completion view must not silently rotate a code the customer just saved. Reuse hashed recovery storage; avoid indefinite plaintext-code persistence. Deliberate replacement and expired-session support must be explicit.
5. Migration preserves existing purchases, monotonic revisions, credentials, sessions and recovery records. Backups and operational migration remain owner-operated with private service storage. Do not reset historical records, introduce synthetic grants or treat sandbox purchases as live.
6. Existing customers should retain an app-connected purchase route; additional browser identity matching, if needed, requires verified recovery authority, not an email/receipt supplied without proof. Explain that lifetime does not cancel monthly billing. Subscription portal access remains authenticated through the existing service/app route.
7. Consult **current official Paddle documentation during COM01/COM02 and WEB06/WEB07** for checkout/session requirements, website/domain approval, catalogs, taxes, US geography restrictions, callbacks, webhooks, refunds and portal behavior. Record relevant links/date in the stage record. This source inspection did not establish current provider approval or API compatibility. Do not create accounts, accept terms, provision secrets, deploy or transact as part of local implementation.

If only download-then-purchase works, publish that description when authorized and record standalone purchase as **pending COM02/WEB07**. An informational pricing page or a button leading to app instructions is not a completed website shop.

## 6. Stage workflow and required checks

Every stage begins by reading this plan, applicable instructions, current Git changes and relevant prerequisite evidence. Implement only the requested stage. Preserve unrelated work. A later request is not evidence that earlier manual acceptance passed; carry unresolved observations forward and block only work that actually depends on them.

**Check protocol Q — required after code changes:** inspect package scripts, lifecycle hooks and ignore scope, then run `npm run format`, `npm run lint`, `npm run typecheck`, in that order. Fix all reported issues, including pre-existing errors/warnings surfaced by these commands. Rerun affected checks and finish with all three clean on final code. Do not silence diagnostics, weaken rules or broadly ignore application code. Preserve generated/vendor files, lockfiles, assets and historical test code from broad formatting. Documentation-only edits require none of these commands.

WEB01 establishes the missing scripts: a narrowly scoped Prettier command covering authored site source/configuration/documentation, the existing ESLint command with zero warnings accepted, and TypeScript `--noEmit` checks for both `tsconfig.app.json` and `tsconfig.node.json`. Do not invoke `build`, `dev`, `preview` or hooks indirectly. Expand authored script/config lint/type coverage narrowly as later stages introduce production code; do not turn typechecking into an asset build. Dependency installation, if needed, must not trigger prohibited lifecycle work or an audit.

**Not authorized:** adding or maintaining tests, fixtures, mocks, harnesses, testing hooks, automated verification scripts or test CI; running tests, audits, builds/packages, launches/dev servers, browser automation, screenshots, runtime probes, benchmarks or failure injection. Do not outsource these through agents, tools or CI. Synthetic website example text is presentation content, not a test fixture. Reading source and Git diffs is allowed but is never described as a passed runtime test.

**User-only local setup:** when handing off implemented UI, tell Josh to use the website directory and run `npm run dev`, then open the local address Vite prints. If dependencies still need installation, supply the actual prerequisites first. The assistant does not execute these launch steps. Before publication, production build/preview and actual hosted observations are owner-operated; do not ask the user to run automated suites. Any app/file scenarios use disposable projects/copies. Purchases require a separately authorized environment and user-operated transaction; normal website review does not authorize payment.

**Evidence at each boundary:** update the ledger and append a compact dated record here with changed paths, scope/decisions, actual Q command outcomes, known limitations, relevant source/provider references, a tailored manual guide and any owner-supplied results. No separate report per cosmetic change. Keep implementation, manual acceptance and publication in separate fields. Use **implementation complete — awaiting user testing** only when that stage's code and required checks are complete. Missing integration is “partial/blocked,” not “complete.”

Handoff after implementation: “Stage WEB0X complete. As a user:” followed by ordered actions with visible expected outcomes. Report actual code-check outcomes separately; stop after the guide for Josh's results. Fix reported defects within that stage, repeat Q as required and return updated steps. Do not continue to the next stage automatically.

## 7. Implementation stages

### WEB01 — Foundation and first impression

**Outcome:** a recognizable Collie homepage with a finished visual direction, responsive header, strong hero and honest development CTA.

**Prerequisites:** current scaffold and supplied brief; no release, payment account, domain or screenshots required. Likely files: `package.json`, lockfile, formatter/ignore and ESLint configuration, `src/main.tsx`, `App.tsx`, `index.css`, `theme.ts`, site header/footer, home hero/illustration, branding assets and `index.html`.

**Tasks and scope:**

1. Preserve the existing Mantine/PostCSS setup. Establish Q scripts and safe formatting scope before any broad formatting. Use only required library imports; keep the selected stack.
2. Remove the starter UI and its unused assets after tracing references. Install the shared Mantine theme, paper/graphite/green/sage palette, editorial font treatment and scoped semantic CSS. Load Mantine base styles before site overrides.
3. Copy only approved brand assets/notices needed now. Provide the live-text wordmark and a suitable favicon. Do not regenerate the artwork or alter sibling files.
4. Build the header, skip link, semantic main/footer and hero. Put a small, genuinely useful `#how-it-works` introduction below it so **Explore Collie** works immediately. Show only working navigation destinations; later stages add the rest.
5. Build the first labeled illustrative workspace from synthetic content, with readable manuscript, outline and material relationship. Create desktop and narrow arrangements now. Use intrinsic sizing, visible focus, adequate contrast and stable image space; no initial animation required. Set a real title/description and development noindex.

**Exclusions:** full story, pricing/download pages, commerce, elaborate motion and legal content. No deployed site or asserted release.

**Acceptance:** visitors can identify product, audience, development status and next action quickly; the hero has character and a legible product example. Header/CTA work at phone width and keyboard/zoom use. No template links, horizontal overflow or focusable fake editor controls.

**Manual guide for Josh:**

1. Start the website with the user-only setup above and open Home; expect Collie branding, nonfiction positioning, the development label and one clear primary action.
2. Select **Explore Collie**, then use the wordmark; expect the introduction and return to Home/top, with sensible focus/anchor positioning.
3. Narrow the browser to phone size and zoom to 200%; expect readable copy and example, no clipped controls or sideways page scrolling.
4. Use Tab/Shift+Tab and the skip link; expect a visible focus path and access to main content without traversing decorative illustration controls.

**Checks/evidence:** Q; record actual outcomes and asset provenance. Implementation completion awaits all Q checks; visual/native-browser observations remain user-owned. External release gates do not block this stage.

### WEB02 — Gather, shape and write

**Outcome:** a complete, coherent product story with a clear destination: writing a manuscript using the material already gathered.

**Prerequisites:** WEB01 foundation. Likely files: `src/features/home/` story/illustration/ownership components and styles, `src/content/site.ts`, homepage composition. Owner screenshots are optional; absent screenshots do not block labeled illustrations.

**Tasks and scope:**

1. Expand the first example into Gather, Shape and Write using the same public-spaces project. Show note/excerpt association with “Everyday encounters,” then that chapter's readable draft. Respect source-backed labels without reproducing the whole app.
2. Use varied compositions: clustered material, wider outline transition, prominent writing surface and dark-green ownership text. Build polished responsive arrangements in this stage, not in WEB08.
3. Draft concise copy around the chosen narrative. Target the total homepage budget after access/FAQ are added; avoid a feature inventory. Cover sources/originals and export formats in context; leave citation-style/import details to FAQ.
4. Explain local work, explicit portable Save and offline non-AI value plainly. Keep live AI out of demonstrations and paid benefits. Add a quiet route toward the future access area only when it has an implemented destination.
5. Ensure illustrative figures have clear captions and equivalent textual meaning, while decorative layers are hidden from assistive technology. If approved screenshots arrive, record provenance and crop without changing the claim boundary.

**Exclusions:** building app functionality, AI integrations, interactive editor demos, download/purchase actions and elaborate animations.

**Acceptance:** one quick scroll explains gathering → structure → writing. The same example develops throughout, the editor is prominent, and every illustration is identifiable as illustrative. No synthetic evidence is presented as scholarship or an observed app screenshot.

**Manual guide for Josh:**

1. Open the locally served homepage and follow the story; expect the same note/source/chapter to carry from Gather through Write.
2. Read it on a phone-sized window; expect readable selected details in a deliberate sequence, not shrunken desktop UI.
3. Review the ownership section and illustration captions; expect accurate local-file language and a clear example-content label.
4. Navigate headings and links by keyboard or a screen reader; expect a sensible reading order and no decorative noise or compulsory interaction.

**Checks/evidence:** Q; record copy/claim decisions, changed components and approximate narrative length. Record visual/content acceptance only from Josh; AI and release acceptance remain unchanged.

### WEB03 — Restrained motion and interaction

**Outcome:** the material-to-manuscript story gains one memorable transition while ordinary scrolling and reading remain comfortable.

**Prerequisites:** WEB02 compositions. Likely files: home illustration/story styles and a small feature-owned enhancement hook if necessary; site navigation only where interaction needs refinement. No external inputs.

**Tasks and scope:**

1. Add a one-time material-to-outline settling transition as the Shape composition enters view. The final/static arrangement must already explain the relationship without motion.
2. Add shallow offset movement to decorative paper layers in at most one or two sections. Keep body text, controls and essential product text stationary. Prefer CSS progressive enhancement and IntersectionObserver; no animation engine by default or per-frame React state.
3. Provide a complete `prefers-reduced-motion` version, also disabling animated anchor scrolling. Simplify to a static or short non-parallax transition on small screens. Stop unnecessary work when out of view; reserve layout space.
4. Keep the initial content visible if observers or motion features are unsupported. Use hover/focus feedback only where it clarifies real links/buttons. Retain keyboard and touch behavior from earlier stages.

**Exclusions:** scroll hijacking, pinned walkthroughs, cursor effects, autoplay sound/video, looping decoration, motion-dependent disclosure or a browser performance benchmark.

**Acceptance:** motion reinforces the content relationship and never impedes reading/navigation. Reduced-motion and narrow presentations tell the same complete story. Reloading or scrolling backward does not create uncontrolled repeat effects or layout jumps.

**Manual guide for Josh:**

1. Scroll through Home at ordinary speed; expect a subtle Shape transition and restrained decorative movement without trapping scrolling.
2. Enable reduced motion in the operating system and reload; expect the full static story, ordinary anchor movement and no parallax.
3. View a narrow window and use keyboard navigation; expect stable, readable text and the same functional controls.
4. Scroll away and return; expect the composition to remain settled without distracting repeated animation.

**Checks/evidence:** Q; document enhancement/fallback choices and any unsupported-browser limits. No assistant-run performance or browser checks; perceived motion quality awaits Josh.

### WEB04 — Access, availability and downloads

**Outcome:** visitors understand the three offers and can find real releases when approved, with a useful development state while artifacts are absent.

**Prerequisites:** WEB02; WEB03 may remain pending without blocking static access/download content. Approved artifact details are required only for active downloads. Likely files: `src/content/offers.ts`, `release.ts`, access components, Downloads page, route wiring and header/footer links.

**Tasks and scope:**

1. Implement the free/monthly/lifetime comparison exactly as recorded. In the current state label it **Planned pricing** and explain purchases are not yet available. Give the visitor a working next step such as **Explore Collie**, not disabled “Buy” buttons masquerading as functionality.
2. Add the maintainable availability/release record and render every hero, pricing and download action from it. Missing required release fields prevent an active artifact link. No development-build substitute or invented compatibility values.
3. Build `/downloads` with Mac/Windows choices and architecture details only for approved artifacts. Explain unavailable options clearly; keep both platform choices reachable. Platform detection may suggest an option without redirecting, hiding alternatives or starting a download. Offer simple guidance for choosing architecture; do not infer Apple Silicon versus Intel from unreliable browser signals.
4. Add accepted version/date, minimum OS requirements, short install instructions and release notes when supplied. Artifact URLs should identify immutable approved releases. Do not publish updater ZIPs as installers just because the older manifest lists them.
5. Introduce small, conventional routing and useful page navigation. Keep the homepage pricing section an anchor; avoid creating a redundant pricing page. Cross-platform file transfer and license restore remain separate explanations.

**Exclusions:** checkout/payment code, signing/build generation, store submissions, false badges, automatic downloads and inventing checksums or release dates.

**Acceptance:** prices and free rights are clear; all download/promotional surfaces agree. Current missing artifacts produce an honest page with a useful return path. If approved artifacts are supplied, the selected links match exact platform/version metadata without hiding alternatives.

**Manual guide for Josh:**

1. Open Pricing; expect the intended US/USD offers and clear current availability, with no trial or AI token claims.
2. Open `/downloads` directly and reload; expect a readable page and consistent development status, or the exact approved release information supplied for this stage.
3. Select each platform option on desktop and phone widths; expect reachable choices and architecture guidance, with no automatic download.
4. Only when real approved links are enabled, choose the relevant release; expect the named official artifact. Installing it is a separate user-owned desktop acceptance task.

**Checks/evidence:** Q; record the exact metadata source and absent inputs. Unavailable states can be fully implemented and accepted; real download/installation acceptance remains pending when there are no artifacts. Do not call placeholder-state review a passed download.

### WEB05 — Help, trust and discoverability

**Outcome:** visitors can answer practical questions, find real support and read clear policies; every public page has an intentional route and sharing/search presentation.

**Prerequisites:** WEB04 routes/offers. Owner identity, support destination, selected hosting details and legal review are required only to finalize/publish their dependent content. Likely files: Help/Privacy/Terms/Purchases/NotFound pages, content owners, route/HTML metadata, social artwork, Vite static-output configuration and host configuration after a host is chosen.

**Tasks and scope:**

1. Write short Help sections for getting started, Save/Open, local recovery versus selected file, portable transfer, and purchase restore/manage. Match actual UI names at implementation. Use a verified support email/page when supplied; no non-delivering form or invented address. Ask only for version/platform, action and visible issue; purchase support uses the approved receipt-reference process, never manuscript or credential uploads.
2. Complete FAQ: free access; paid additions; offline work; local/portable storage; personal cloud folders without simultaneous editing/upload assurance; AI availability/network boundaries; supported import versus source attachments; exports/citations; moving between Mac and Windows; subscription ending.
3. Prepare readable Privacy, Terms and Purchase/refund content from actual behavior and existing service drafts. Include website host request logs/retention, payment provider and necessary metadata, contact handling and any actual cookies. Keep missing seller/retention/refund decisions marked as internal draft blockers; do not publish placeholder policies or invented terms. Reconcile shared commercial wording with the service owner so two origins do not contradict each other.
4. Complete mobile navigation, skip links, semantic landmarks, heading hierarchy, meaningful alternatives, visible focus, accessible FAQ disclosure and not-found recovery. Accessibility remains integrated work, not a certification claim.
5. Supply page-specific titles/descriptions and social metadata in delivered HTML, favicon, social image and approved canonical URLs. Prepare sitemap/robots behavior for public versus review states. Exclude service completion pages and non-public routes. Add no invented ratings/reviews structured data.
6. Specify direct-load/reload and not-found behavior for the chosen static host. Production metadata/static-page output may be implemented through Vite, but its build and hosted response behavior remain owner-observed. Hosting choice does not authorize deployment.

**Exclusions:** legal advice/approval by the assistant, sending support messages, collecting writing, a CMS, newsletter, accounts, search-marketing campaign or publishing pages before review.

**Acceptance:** working help/footer destinations and a compact FAQ answer real adoption questions; review-only drafts are unmistakable internally. Public-ready pages contain no fake entity/contact/domain. Metadata and route source are prepared for the actual public status; browser-only title changes are not the whole implementation.

**Manual guide for Josh:**

1. Open Help and expand FAQ answers by keyboard; expect concise, source-matched explanations and usable focus states.
2. Read Privacy, Terms and Purchase information; expect the actual seller, support and policies if supplied, with any unresolved draft item explicitly identified before publication.
3. Directly open/reload supporting routes and an unknown path; expect the correct page or a useful not-found page with recovery links.
4. Use phone navigation and 200% zoom; expect all links and policy text to remain readable and operable.
5. When production output is available through owner-operated build/preview, inspect page source and shared-link metadata; expect per-page titles/social content and indexability matching the approved domain/status. This result remains pending until supplied.

**Checks/evidence:** Q after code edits; document-only legal revisions need no checks. Record content approvals separately from code completion. If required real support/legal inputs remain absent, mark public-content finalization partial, keep drafts local, and do not claim publication readiness.

### WEB06 — Download, purchase in app and restore

**Outcome:** the website accurately guides new and existing users through the first supported commercial route, including recovery and subscription management.

**Prerequisites:** WEB04 and the relevant WEB05 help/purchase content. COM01 and APP01 are required to enable/accept the actual journey, not to write its local unavailable states. Likely website files: access actions, Purchases/Help pages, `offers.ts`, `release.ts` or a small `commerce.ts` if configuration needs its own owner. Desktop/service files are reference-only; their changes belong to COM01/APP01.

**Tasks and scope:**

1. Reconcile current official Paddle requirements with the existing service and record documentation links/date. Identify any actual incompatibility as scoped dependency work rather than adding a frontend workaround.
2. Implement three honest commercial presentations: unavailable; free download available but purchases unavailable; purchase in app available. Every paid CTA tells users where purchase happens. New visitors see Download → Collie access → choose offer; existing users get the short in-app path without being forced to download again.
3. Explain service-confirmed completion, saving the recovery code, return to app and **Check completion**. Add focused help for pending/expired sessions, lost code, replacement computer, subscription portal and cancellation. Do not imply automatic activation or create a success page that grants access.
4. Ensure the app route and site quote the same rights/prices/edition. Make US availability, renewal, final taxes/total, approved refund policy and lifetime-versus-subscription distinction easy to find before purchase. Do not load Paddle on ordinary marketing pages.
5. Record COM01/APP01 owner evidence when supplied. Enabling public purchase instructions as a live offer requires actual service/app readiness; a boolean alone is not commercial approval.

**Exclusions:** modifying the app/service, standalone website checkout, custom-protocol launch links, account creation, transactions, secret provisioning, deployment and live-sale activation.

**Acceptance:** the visitor never mistakes website plan discovery for completed checkout. Normal instructions are short; recovery help exists at the point of need. Active purchase actions cannot appear from missing configuration, and service unavailability does not remove free downloads or imply work is lost.

**Manual guide for Josh:**

1. Open Pricing and Purchase information in the current local state; expect a clear purchase-availability message and a working next step, with no fake checkout or paid success.
2. If COM01/APP01 are configured and the user-operated environment/transaction is separately authorized, follow the new-user path; expect the browser to open from Collie access with the chosen offer and accurate total/terms.
3. Complete the authorized flow, save the code and return to **Check completion**; expect paid access only after service confirmation. If payment is pending, expect a recheck/support route rather than another charge. Record only outcomes actually encountered.
4. Using an authorized disposable installation/profile, restore the genuine purchase; expect the same direct entitlement without sending any project content. Open **Manage subscription…**; expect authenticated provider management, with cancellation remaining a deliberate user action.

**Checks/evidence:** Q for website code. Record website presentation completion separately from COM01/APP01, provider observations and end-to-end acceptance. Without dependencies, report **website preparation complete; purchase integration blocked**, not a completed commercial journey. No assistant-run purchase or service probe.

### WEB07 — Buy on the website, activate on your computer

**Outcome:** a visitor can buy before installing and later restore on their computer, through the same entitlement owner and rights as an in-app purchase.

**Prerequisites:** WEB06 contract/content, approved WEB05 commercial pages and **COM02 service implementation** plus COM01/APP01. This stage intentionally preserves standalone website buying as a deliverable. It cannot be fully completed by editing the static site alone. Likely website files: access CTA components, commerce availability/configuration, Purchases/Help content and release links. Service implementation paths are named under COM02 above; a separately requested service task owns them.

**Tasks and scope:**

1. Before service authorization is needed, make the COM02 handoff concrete: selected plan entry URLs, request/response/status meanings, session/privacy boundaries, durable payment/recovery behavior, migration needs and exact desktop compatibility assumptions. Keep the contract small and source-grounded. Incorporate current official provider documentation, not guessed API shapes.
2. Once COM02 provides the real contract, connect Monthly/Lifetime to fixed approved service destinations. The site carries only a plan selection; service catalog validation determines what is sold. Preserve an installed-user route through the app and avoid an unnecessary login/account system.
3. Coordinate service-owned payment states and website return/help pages. “Payment received” requires service confirmation; a bare return URL can say only “Check your purchase status.” The verified service page supplies the recovery-code instructions and download link. Marketing JavaScript never sees or issues the grant/code.
4. Finish buy-before-install, install-after-payment, already-installed restore, delayed payment, canceled/failed checkout, expired browser session, lost code, replacement computer and subscription-management copy. Match the journey table. No repeat payment as a recovery step; no promised automatic receipt/code email unless implemented.
5. Reconcile final terms/privacy across marketing and service origins, including any new secure-session cookie/retention. Leave active website buying off until approved service URLs, correct live/sandbox separation and user acceptance exist. Update the ledger precisely if the website portion is ready but COM02 remains missing.

**Exclusions:** implementing a second backend, frontend license issuance, public accounts, desktop deep-link work by default, modifying the sibling repository under WEB07 alone, entering card details or running/deploying transactions/services.

**Acceptance:** a real, separately authorized user-operated purchase made before installation is recoverable in an accepted desktop build. A forged success URL, cancellation or pending payment never creates entitlement. Repeat status checks do not create duplicate purchases or silently invalidate a saved recovery code. Existing direct customers retain their records/restore path. The website's unavailable state remains useful until this can be demonstrated.

**Manual guide for Josh:**

1. Review the local unavailable state first; expect correct offers and a clear explanation if standalone buying is not enabled.
2. After COM02 and a user-operated payment environment are separately authorized, choose a plan with Collie not installed; expect the approved service checkout and a confirmed recovery-code/installation path only after verified payment.
3. Save the code, install/open an approved release and use **Restore purchase** then **Check completion**; expect the purchased edition and conveniences, without a new website account.
4. Review canceled, failed, pending and expired-session behavior only through legitimate user-operated conditions or supplied provider outcomes; expect preserved purchase records, clear status and no automatic retry charge. Do not inject failures or invent observations.
5. Restore on an authorized replacement installation and review subscription-management guidance; expect the same direct rights and a deliberate authenticated management path. Use disposable project copies for any writing/storage observation.

**Checks/evidence:** Q for website code; the separately requested service/app task must meet its own repository format/lint/typecheck policy. Record its actual reference/outcomes, never infer them. WEB07 is partial/blocked until the service contract is implemented; code completion still differs from user acceptance and permission to make sales live.

### WEB08 — Release preparation and owner acceptance

**Outcome:** a coherent, reviewable site for one explicitly chosen launch state, with exact remaining publication prerequisites and no ambiguity about what has been accepted.

**Prerequisites:** WEB01–WEB05 implementation/content sufficient for the chosen state, plus WEB06 for purchase-in-app or WEB07 for website purchase. In-development presentation can be prepared while commercial stages remain pending. Approved releases, legal/support inputs and domain/host are required only for their applicable publication state. Likely files: stage-owned fixes, content/release/configuration, README operator instructions and this plan.

**Tasks and scope:**

1. Review source/content/Git changes for consistency with the selected state. Resolve owner-reported presentation/content defects in their existing owners, including mobile, focus, motion, copy and unavailable states. This is not a deferred wholesale redesign or assistant runtime audit.
2. Match each public claim and screenshot/illustration to the exact released capability or clear development status. Recheck current release/commerce records; remove stale version, platform, AI, signing/store, refund and support assertions.
3. Prepare the domain/host-specific static route, HTTPS/header, canonical/robots/sitemap and per-page metadata configuration. Document owner-operated build/preview commands and, once chosen, exact deployment steps. Keep service secrets/server setup out of the static frontend. No host is chosen merely because a plugin is installed.
4. Give Josh the integrated manual walkthrough below. Record only supplied observations; close or explicitly defer reported defects and identify which ones block the chosen public state.
5. Produce a concrete publication packet in this plan/README: exact site revision or reviewed diff, approved content/assets, selected availability state, real artifact URLs/version if applicable, merchant/service readiness if applicable, domain/host/account, pending results and intended publication actions. Deployment remains separately authorized and unperformed.

**Exclusions:** deployment, uploads, domain purchase/registration, live sale/download activation, merchant agreement acceptance, release signing, assistant-run build/preview/browser checks and completing missing desktop release gates by assertion.

**Acceptance:** the site is understandable in a quick scroll, actions match availability, supporting pages resolve, and known defects/approvals are explicit. Local source preparation can finish with publication still blocked; never mark the entire website or commerce user-accepted without actual results.

**Manual guide for Josh:**

1. Launch the local site and read it from hero to footer at laptop and phone widths; expect a clear nonfiction product story, readable examples and one appropriate main action.
2. Use keyboard navigation, 200% zoom and reduced motion; expect usable navigation/FAQ, visible focus, no clipping and a complete static story.
3. Directly open/reload each destination and an unknown route; expect correct content, helpful recovery and working internal/external links.
4. Review Pricing, Downloads and Help against the chosen launch state; expect exact current offers and artifacts, or honest unavailability. When authorized dependencies exist, follow the applicable WEB06/WEB07 user journey; otherwise record it as pending.
5. Run the production build and preview yourself using the inspected repository commands (`npm run build`, then `npm run preview` for the current Vite setup); expect the same presentation and delivered metadata. On a separately authorized host, report route/status, privacy, canonical and sharing behavior. The assistant does not run these commands or host checks.
6. Approve the actual seller/support/privacy/terms/refund copy and intended domain/public state, or report precise changes. Expect the publication packet to retain every unresolved item and show that deployment has not yet happened.

**Checks/evidence:** Q after any code fixes; no Q required for a documentation-only final packet. Record build/browser/host observations only when Josh provides them. Distinguish **local implementation complete — awaiting user testing**, **owner accepted for [state]**, and **published**; the latter cannot be claimed by this stage alone.

## 8. Material inputs and dependency order

Ordinary design/engineering decisions are resolved above. These are the few remaining owner/external inputs; do not ask for them all before beginning WEB01.

| Input                                                                                                                                               | Needed for                                                                      | Work that can proceed without it                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accepted release artifacts and matching feature/OS/architecture observations; exact URLs, version/date, signing approval and notes                  | Active WEB04 downloads and WEB08 release state                                  | All design/story work, release schema and unavailable pages. No invented date or OS minimum.                                                              |
| Actual seller, approved support destination, privacy/retention and purchase/refund decisions                                                        | Public WEB05 trust/help content; COM01 and commercial publication               | Local page layout and clearly marked internal drafts. Missing details are not a request to invent an entity or policy.                                    |
| Owned domain and selected static/service hosts, with actual logging/header/route behavior                                                           | Final WEB05 metadata/privacy, COM01 service origin and WEB08 publication packet | Local routing, generic static implementation, noindex review state and all design work.                                                                   |
| Merchant eligibility/catalog/US restriction review, non-AI value decision, issuer configuration, COM01/COM02/APP01 implementation and owner results | WEB06/WEB07 active integration and commercial acceptance                        | Pricing discovery, download-first instructions, contracts and unavailable states. Secrets stay in approved secret storage, never this plan/chat/frontend. |
| Cleared screenshots and acceptance for any optional AI customer route                                                                               | Replacing illustrations or later including AI claims                            | The chosen illustrative, non-AI-led site. Neither is required to begin or finish that presentation.                                                       |

Dependency sequence:

`WEB01 → WEB02 → WEB03`, with `WEB02 → WEB04 → WEB05 → WEB06 → WEB07` for access and commerce. WEB03 can be finished independently of external commercial inputs. WEB08 prepares whichever truthful launch state has sufficient evidence; it never hides unfinished WEB06/WEB07. Missing commerce can leave a useful, accepted development/free site; it cannot make the standalone shop complete.

## 9. Progress and evidence ledger

Update this table at every requested stage boundary. “Not applicable” for publication means the stage itself publishes nothing; it is not approval for later publication.

| Stage | Scope                              | Implementation / checks               | User acceptance                      | Publication / activation       |
| ----- | ---------------------------------- | ------------------------------------- | ------------------------------------ | ------------------------------ |
| WEB01 | Foundation and first impression    | Complete; format/lint/typecheck clean | Awaiting user testing                | Not authorized                 |
| WEB02 | Product story                      | Complete; format/lint/typecheck clean | Awaiting user testing                | Not authorized                 |
| WEB03 | Motion and interaction             | Not started                           | Not requested                        | Not authorized                 |
| WEB04 | Access and downloads               | Not started; no approved artifacts    | Not requested                        | Downloads unavailable          |
| WEB05 | Help, trust and discoverability    | Not started; owner inputs pending     | Not requested                        | Content not approved/published |
| WEB06 | Purchase in app journey            | Not started; COM01/APP01 pending      | No commerce results supplied         | Checkout disabled              |
| WEB07 | Website purchase and activation    | Not started; COM02 required           | No website-purchase results supplied | Website sales unavailable      |
| WEB08 | Release preparation and acceptance | Not started                           | Not requested                        | No deployment authorization    |

### Planning record — October 15, 2026

- Created this plan only. Website source, dependency/configuration changes already present and the desktop checkout were preserved.
- Inspected local instructions, Git state, website source/scripts/configuration, current desktop status and relevant product/commerce/release/asset source. Historical memory informed continuity of settled decisions; current source and the supplied brief control this plan.
- Chosen defaults: development state; one synthetic nonfiction example; static Vite/React/Mantine marketing site; local fonts/brand assets; no AI sales claims; no analytics/forms; existing service owns all paid access.
- No code checks were required or run for documentation-only planning. No automated tests, audits, builds, previews, screenshots, runtime probes, purchases, account actions or deployments were performed.
- No implementation stage, customer acceptance, public release or commercial approval is claimed. Next request may be **Implement stage WEB01**.

### WEB01 — October 15, 2026 — implementation complete — awaiting user testing

**Plan review:** reviewed the full eight-stage plan, launch states, content/asset decisions, commerce dependencies, manual acceptance boundaries and current scaffold before implementation. No material blocker to WEB01 was found. Confirmed that its introduction must be a usable anchor destination, all depicted workspace controls remain presentational, and real routing/downloads/commerce/motion belong to later stages. WEB05's metadata output and WEB07's service extension remain explicit future deliverables; this stage does not imply either is implemented. The website Git tree was clean at this implementation start; the previously uncommitted Mantine setup and plan were already retained in the baseline.

**Implemented:**

- `src/App.tsx`, `main.tsx`, `theme.ts` and `index.css`: retained Mantine provider, explicit light theme, green/paper palette, local serif fonts, base semantics and skip link. Mantine base styles load before authored styles.
- `src/components/site/SiteLayout.tsx` and its CSS Module: approved artwork with live-text wordmark, working How it works anchor, responsive header/footer and original font-license link. No placeholder navigation or signup form.
- `src/features/home/HomeHero.tsx`, `WorkspaceIllustration.tsx` and their CSS Modules: editorial headline and development CTA; readable, labeled public-spaces example showing outline, manuscript and associated note/source; brief dark-green workflow introduction. Narrow layouts stack real text rather than shrinking an entire desktop. No motion or interactive editor simulation was added.
- `index.html`: meaningful title/description, noindex/nofollow, local favicon, theme color and a short no-JavaScript message. No canonical/OG claim for an unapproved domain.
- Site-owned artwork/favicon and original Source Serif 4 Regular/Bold TTFs plus OFL; provenance in `src/assets/branding/README.md`. Full unmodified TTFs avoid adding a conversion pipeline; their size tradeoff remains documented. The desktop files were only read/copied from, never edited.
- Added pinned Prettier 3.7.4 with lifecycle scripts/audit disabled. Narrow format scope excludes npm's generated lockfile and never visits public originals/binaries/dependencies. Lint now also covers root JS/CJS configuration and rejects warnings. Separate no-emit app/config typechecks keep their existing cache locations with explicit incremental mode. Existing Mantine/PostCSS dependencies were preserved. Removed the unused starter UI, styles, framework logos and template art/icons after reading their callers. README now describes the actual site and user-only launch steps.

**Source review:** static React components need no effects, state, persistence, fetches or custom event handlers. Native anchors target focusable content; the example uses ordinary readable text with no fake interactive controls. Styles remain with their component owners; responsive layout, focus and forced-color rules are present in source. This review is not browser or accessibility acceptance.

**Code checks:** `npm run format`, then `npm run lint`, then `npm run typecheck` each exited 0 with no warnings or errors. Format applied the repository style to authored files (including this plan); ESLint passed with `--max-warnings 0`; both app and Node/config non-emitting TypeScript checks passed. A final documentation-only status update was formatted afterward without changing application source. No build, test, application launch, browser automation, screenshot or runtime probe has been performed.

**Manual guide for Josh:**

1. From the website directory, run `npm run dev` and open Vite's local address. Expect the Collie wordmark/artwork, editorial hero, clear development status and Explore Collie action; no download or purchase controls.
2. Select Explore Collie or How it works. Expect the short green workflow introduction; select the header/footer wordmark to return to the top.
3. Inspect the public-spaces illustration. Expect the selected chapter, readable prose, linked note/source and “Illustrative workspace · example content” caption. Its depicted app controls are not clickable website controls.
4. Narrow the browser to phone width and zoom to 200%. Expect the header to wrap as needed, content to stack, and manuscript/material text to remain readable without sideways page scrolling.
5. Use Tab/Shift+Tab and activate Skip to content. Expect visible focus and a sensible path through real links, with no stops inside the illustrative editor. Open the footer font-license link; expect the original OFL text.

**User results:** not supplied. Typography, layout, anchor/focus behavior and asset rendering await user observation. WEB02–WEB08 remain unstarted; no signed release, AI access, purchase readiness or publication is implied. Deployment and external account actions remain unperformed.

### WEB02 — October 15, 2026 — implementation complete — awaiting user testing

**Plan review:** reviewed the full plan, including WEB03–WEB08 dependencies, release/AI boundaries and manual acceptance. No blocker to WEB02 was found. The website Git tree was clean at this stage's start. WEB01 acceptance has not been supplied; requesting WEB02 authorizes this implementation without establishing prior browser acceptance. Read current desktop status, README, planning records, chapter material and export source to ground the copy; no desktop files were changed.

**Implemented:**

- `ProductStory.tsx` and its CSS Module replace the short introduction with clustered Gather material, a wider Plan composition, a prominent writing surface and a dark-green ownership section. `App.tsx` composes the story after the retained hero; obsolete introduction markup/styles were removed. Explore Collie and How it works now target the Gather heading.
- `example-project.ts` keeps the invented public-spaces project, note, source excerpt and chapter consistent across the hero and story. The Plan composition explicitly associates that note/source with “Everyday encounters”; the writing illustration retains both beside the draft. Each illustration has an example-content caption, ordinary readable text and no interactive editor controls.
- `WorkspaceIllustration.tsx` and its CSS Module add a larger writing variant with retained-original context and a further draft paragraph. Unique caption IDs support both instances. Responsive arrangements stack chapters, draft and material on narrow screens; decorative numbers/arrows/window ornaments are hidden from assistive technology.
- Copy covers sources/originals, saved conversation context, manual chapter planning, citations and Word/PDF/Markdown/plain-text exports. Ownership explains offline non-AI work, explicit Save to a portable `.collie` file, and device-local unfinished drafts/settings. Roughly 400 words of homepage narrative/ownership copy, excluding illustration text and navigation, leave room for later access/FAQ content within the planned total budget.
- Updated README and asset provenance. No new dependencies, images, screenshots, network requests, live AI, download/commerce controls or motion. The site retains its development state and noindex metadata. There is no access link before its destination exists.

**Source review:** feature-owned components/styles, semantic section headings/figures, shared presentation content, no effects or event simulation, and stable caption references. This is source inspection, not visual or accessibility acceptance.

**Code checks:** `npm run format`, `npm run lint` and `npm run typecheck` each exited 0 with no warnings or errors, in that order. No tests, builds, launches, browser automation, screenshots, audits or runtime probes were performed.

**Manual guide for Josh:**

1. From the website directory, run `npm run dev` and open Vite's local address. Select Explore Collie or How it works; expect the Gather heading, “A place for the pieces.”
2. Scroll through Gather, Shape and Write. Expect the same bench note and square excerpt to connect to “Everyday encounters,” then appear beside its larger draft. Every illustration should be labeled; depicted app controls should remain presentational.
3. Narrow the browser to phone width and zoom to 200%. Expect a readable stacked sequence, intact captions and no sideways page scrolling.
4. Read “Your work. Your files.” Expect offline/local work and explicit portable Save explained, with the device-local limitation visible.
5. Use keyboard navigation and, if available, screen-reader heading navigation. Expect a sensible reading order, visible focus on real links and no focus stops on illustrated material or editor controls.

**User results:** not supplied. Visual layout, small-screen readability, zoom, anchor/focus behavior and assistive-technology behavior await user testing. WEB03–WEB08 remain unstarted. No publication, desktop release, AI access or commerce acceptance is implied.

### Stage record format

Append a short dated entry when work occurs:

> **WEB0X — date — implementation status**  
> Changed paths and visible outcome: …  
> Decisions/source or official-provider references: …  
> Format: actual outcome. Lint: actual outcome, including warnings. Typecheck: actual outcome.  
> User guide: stage-specific ordered actions and expected observations.  
> User results: not supplied, or attributed observations/date.  
> Remaining dependencies/limitations: …  
> Publication/activation: unperformed, or separately authorized action and actual evidence.

Keep this record compact. Source inspection and clean code checks do not establish browser behavior, native installation, purchase success, legal approval or release readiness.
