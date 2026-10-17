# Collie Writer website

A Vite + React + TypeScript + Mantine marketing website for Collie Writer, a
desktop nonfiction workspace. WEB01–WEB02 provide the branded homepage foundation,
Gather → Shape → Write story, illustrative workspaces and local-file ownership
section. WEB03 adds a brief, once-per-load decorative settling sequence in Shape.
WEB04 adds planned pricing, a Downloads page and shared release availability.
WEB05 adds Help, FAQ, policy-review pages and build-time route metadata/social assets.
Its public-content finalization is partial: seller, support, host/domain and approved
policies are still missing. Policy pages are explicitly local review drafts.
WEB06–WEB07 add plan selection, purchase/restore guidance and guarded future service
links. Website preparation is implemented; actual purchase integration remains blocked
by COM01/COM02/APP01. Owner-approved placeholders remain in the policy drafts.
The product is presented as **in development for Mac and Windows**. Downloads and
purchases are not enabled.

The October 16 WAI revision puts AI research, planning and substantive review at
the center of the intended product story. WAI01 adds the hero and ChatGPT plan
introduction, with customer AI availability still explicitly in development.
WAI02 replaces Gather with a research conversation and linked source excerpt,
using the same invented project and a clearly distinguished next research lead.
WAI03 develops Shape into an AI planning presentation: selected conversations,
notes and sources inform a proposal, the writer revises a chapter title, and the
same outline continues into the hero's Write illustration. WAI04 replaces the
duplicate Write showcase with planned substantive proofreading: source comparison,
a suggested revision, citation/source-use coverage and a repetition example.
WAI05 reconciles the feature story, AI FAQs, Help/Privacy, pricing context and
metadata/social copy. Feature links replace the repeated introduction summaries;
purchase details remain on the plan pages. All WAI stages are implemented,
awaiting user testing. Customer AI, public releases and commerce remain unavailable.

See [website-implementation-plan.md](website-implementation-plan.md) for the eight
stages, current status and user-owned acceptance guide. Implement one requested
stage at a time. Website work does not authorize desktop/service changes or publication.

## Local development — user operated

With Node 22.22 or newer and this checkout's npm dependencies installed, run `npm run dev` from the website
directory and open the local address printed by Vite. The assistant does not launch
the site or perform browser/runtime acceptance. Installation should preserve the
lockfile and avoid dependency lifecycle scripts and audits; for a fresh checkout,
use `npm ci --ignore-scripts --no-audit --no-fund`.

`npm run build` and `npm run preview` remain available for owner-operated production
review in the later release stage. They are not part of the assistant's code checks.
The site is noindex, has no approved canonical domain and has not been published.

## Required code checks

After code changes, run these commands in order:

1. `npm run format`
2. `npm run lint`
3. `npm run typecheck`

Fix all errors and warnings. Formatting targets authored source, `build-support/` and root
configuration/documentation, with the npm lockfile excluded; it does not traverse
dependencies, public license originals, binary assets or generated output. Inspect
the scope again if vendor/generated or historical test files are later present.
ESLint covers TS/TSX and root JS/CJS configuration, with zero warnings allowed.
TypeScript checks application, Vite configuration and production output code without emitting JS;
incremental diagnostic caches stay under ignored `node_modules/.tmp/`.

No tests, harnesses, fixtures, automated verification scripts, test CI, builds,
audits, app launches, browser automation, screenshots or runtime probes are
authorized by these checks. Documentation-only changes do not require them.

## Source and assets

- `src/components/site/` owns the header/footer and their styles.
- `src/features/home/` owns the hero, product story, ownership section and
  illustrative workspaces. `example-project.ts` holds their shared invented content.
  `AiIntroduction.tsx` owns the static ChatGPT connection/allowance explanation
  and brief introduction to the three planned AI tools.
  `ResearchStory.tsx` owns the research feature copy and static conversation/source
  example; its source link navigates to the illustrated excerpt, without AI calls.
  `ReviewStory.tsx` owns the planned proofreading presentation, source comparison
  and native repetition disclosure. The hero retains the writing workspace.
- `src/features/access/` owns pricing, the plan-selection panel and purchase help;
  `src/content/offers.ts` records the intended offers.
- `src/content/commerce.ts` owns purchase availability and future fixed service links.
- `src/content/release.ts` owns release metadata and the download-availability gate.
- `src/pages/` owns Downloads, Help, Privacy, Terms, Purchases and missing-route recovery.
- `src/content/faq.ts` owns the shared answers; Home shows five focused questions,
  Help shows all fifteen, including AI usage, history, review, author control and privacy.
- `src/content/site.ts` holds owner details and the explicit review/public setting.
- `src/content/pages.ts` owns route metadata; `build-support/site-output.ts` supplies
  HTML heads, crawler files and the social PNG during user-operated development/build.
- `src/theme.ts` and `src/index.css` own the Mantine theme and global foundations.
- [Asset provenance](src/assets/branding/README.md) records the unchanged approved
  artwork, favicon and local font files. The [font license](public/licenses/SourceSerif4-OFL.txt)
  is also linked from the site footer.

Illustrative text is invented presentation content, not an app screenshot or real
research. The static page performs no content uploads, checkout or AI requests.
Assets are site-owned copies; no sibling checkout is needed at runtime.

## Motion

`use-shape-motion.ts` observes only the Shape board. On a wide screen with motion
allowed, decorative paper edges settle toward a connection/chapter accent sequence;
all text stays stationary. CSS owns the finite animation. The observer, media and
visibility listeners retire after one second, or sooner on leaving view, hiding the
tab or changing the motion/display preference. There are no scroll listeners,
per-frame React updates or animation dependencies.

Narrow screens (62em or less), reduced motion and forced colors retain a complete
static composition. Missing observer/media-query support also leaves everything
visible. If a visit starts static or an effect is interrupted, it stays static for
that mount; reload at a wide size with motion allowed to see the sequence. Native
smooth anchor scrolling is enabled only on wide screens with motion allowed;
reduced-motion and narrow layouts use ordinary anchor jumps. Browser support may
leave anchors instantaneous. Actual motion and navigation acceptance is user-owned.

## Releases and routes

The current release record is `development`: no version, installer URLs, OS minimums,
release date or signing/acceptance evidence has been supplied. Downloads explains
this for both Mac and Windows. Platform choices are ordinary anchors to visible
sections, with no device detection, hidden alternatives or automatic downloads.

Only a separately approved release may replace that record. A `released` record
requires a version, date, approval-record reference, HTTPS download origin, release
notes and installers. Each installer needs platform/architecture, DMG for Mac or EXE
for Windows, exact filename/URL, minimum OS, installation steps, signing status
(signed/notarized on Mac) and an acceptance-record reference. The filename must
contain the exact release version as a hyphen/underscore-delimited part. URLs must
use the recorded origin, with no credentials, query or fragment. Updater ZIPs and
mutable latest links are not installer inputs. Conflicting platform/architecture
entries or incomplete data keep the entire release unavailable.

These guards check content shape and consistency; they do not authenticate signing,
prove an artifact is immutable, or replace owner approval. Use only reviewed public
record references; never include credentials or private evidence in this frontend.
Hero, pricing actions, header downloads and the Downloads page derive availability
from the validated record. Paid purchasing has an independent approval gate and
currently remains unavailable.
There is no environment/query/local-storage switch to enable either feature.

React Router 8.4.0 supplies `/`, `/downloads`, `/help`, `/privacy`, `/terms`, `/purchases`
and unknown-path recovery. Navigation uses normal document/fragment links, retaining
browser back/forward and opening in a new tab. Native details/summary disclosures
provide FAQ keyboard/touch behavior; navigation stays visible and wraps on mobile.

## Purchase preparation — WEB06 / WEB07

Pricing links open `/purchases?plan=free|monthly|lifetime#plan`. The selected plan's
rights, amount and next step appear in one panel; absent, unknown or repeated plan
values show Free. Native links preserve reload/back/forward. Selecting a plan does
not start a purchase, transfer a selection into the app or interpret a payment result.
No modal, account registration, billing lookup, payment SDK or website storage is needed.
The desktop already implements the Collie access/purchase controls described here;
this work did not modify that checkout or the service.

The current record is `{ status: 'unavailable' }`. The production presentation handles:

| Prerequisites                          | Presentation                                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| No accepted release or commerce        | Planned prices, Explore Collie, download availability and clearly future purchase instructions.                                |
| Accepted release, commerce unavailable | Download free; paid plans remain unavailable. Restore help stays reachable.                                                    |
| Accepted in-app route                  | Plan details lead to Purchase in the app, with a download path for newcomers and Settings → Collie access for installed users. |
| Accepted standalone route              | Monthly/Lifetime continue to fixed service-owned `/buy/monthly` and `/buy/lifetime` pages. The in-app alternative remains.     |

To configure a later accepted route, `commerceRecord` requires live environment,
approved HTTPS `serviceOrigin`, exact accepted `releaseVersion`, and public references
for `approvalRecord`, `directAcceptanceRecord` (COM01) and `desktopAcceptanceRecord`
(APP01). Public-mode policy readiness and `siteDetails.purchasePrivacy` are also required.
Standalone checkout additionally needs the implemented `website-purchase-v1` contract
and `website.acceptanceRecord` (COM02); incomplete standalone evidence falls back to
the independently accepted in-app path. Missing common evidence keeps both off.
Review mode cannot display active checkout links. These guards check configuration;
they do not authenticate evidence, discover outages or authorize publication/sales.
Changing sales availability does not erase release metadata or existing purchase rights.

Do not fill approval fields with placeholder evidence. Finalize draft copy, service
behavior, owner approvals and user acceptance first. A free release may ship before
commerce; pausing new sales must not disable the service's existing restore/management.
No website-query, local-storage or sandbox bypass is provided.

The [service handoff](purchase-service-handoff.md) specifies proposed entry paths,
status/privacy/recovery behavior, migration obligations and current official Paddle
references. It records the existing `_ptxn` payment-link incompatibility and repeated
recovery-code replacement behavior. Service implementation and a real paid journey
remain unfinished; this is not a working website shop.

For local review, start the site yourself with `npm run dev`. From Pricing, explore
each plan, switch selections, reload and use Back/Forward. Expect the corresponding
rights/price with no Buy button or payment confirmation. Open Help's restore, payment
problem and subscription-management topics; expect real app labels and working help
links. Review at phone width, 200% zoom and with keyboard navigation. No payment or
service setup is required for these local observations. Actual purchase, restore,
provider and native-release acceptance remain separately authorized user work.

## Review content and publication inputs

`siteDetails` is intentionally empty. Add only owner-supplied public seller/contact,
hosting/log/cookie/retention, contact-handling and refund information. Support remains
unavailable until there is a genuine destination; there is no submission form.
Privacy/Terms/Purchases show a local-review banner and draft footer labels. The
existing purchase service's `pages.mjs` informed those drafts, not an invented seller
or legal policy. Final seller/terms, jurisdiction/effective-date decisions, service
and host data practices, retention/deletion, provider eligibility and support/refund
handling must be reconciled and approved before public release. Edit the draft
prose into its final form; merely filling configuration does not perform that review.
`purchasePrivacy` holds the final service/provider, cookie/session and recovery-display
data practices once approved; without it no paid route can become active.

`publication.mode` remains `review`, without a canonical origin. Public-mode output
is refused unless an HTTPS canonical origin, seller, valid support destination,
hosting/contact privacy, refund terms and policy/publication approval records exist.
These are owner records, not legal or hosting verification by this code. Noindex and
robots controls are not access control: keep review output local, or use a separately
authorized private preview host. Neither build output nor a boolean authorizes publication.

## Static HTML and social output — user operated

The Vite plugin transforms the HTML metadata boundary for development requests and
emits route-specific HTML from Vite's processed root entry during a production build.
It retains Vite's hashed JS/CSS references; no SSR service or metadata-only browser
effect is used. Client-rendered title tags were removed so the delivered head owns
each page's title, description, Open Graph and Twitter metadata.

Output includes `index.html`, each named route's `index.html`, `404.html`,
`robots.txt`, `sitemap.xml` and `social/collie-writer.png`. The PNG is rendered from
the authored 1200×630 SVG template, unchanged approved mascot and bundled fonts by
the pinned build-only `@resvg/resvg-js`; no external images/fonts are fetched.
It is generated on demand in development and once in a production build. The
assistant has not run either generator or inspected generated output.

In review mode every page is noindex/nofollow, robots disallows crawling and the
sitemap has no URLs. Draft policy titles/descriptions identify their status.
Canonical and og:url tags are omitted until an approved origin exists; the review
social-image URL is root-relative. With an approved origin it becomes absolute.
Public output uses only the six named routes in its sitemap, never 404 or purchase
service completion pages; 404 remains noindex and has no canonical URL.

For your local output review, run `npm run build`, then `npm run preview`. Directly
open/reload each page and inspect View Source (not only the Elements panel). Expect
its own metadata and review indexing rules. Open `/social/collie-writer.png` to
review the composition. These are user-operated steps, not assistant checks.

No domain or host has been selected. Before publication, configure the chosen host
to serve each known clean path from its matching directory index (including reloads),
normalize trailing slashes consistently, and serve `404.html` with HTTP 404 for
unknown paths. Do not rewrite every request to the home HTML: that would return
the wrong metadata/status. Preserve asset/font/license/robots/sitemap URLs and
their content types. Set HTTPS, caching, security headers and log/privacy practices
for that actual host. Vite's dev/preview fallback is not evidence of production
HTTP status behavior. Host-specific configuration and observations remain pending
until a host is chosen; no deployment has occurred.
