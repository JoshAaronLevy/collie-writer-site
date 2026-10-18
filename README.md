# Collie Writer website

A Vite + React + TypeScript + Mantine marketing website for Collie Writer, a
desktop nonfiction workspace. WEB01–WEB02 provide the branded homepage foundation,
Gather → Shape → Write story, illustrative workspaces and local-file ownership
section. WEB03 originally added decorative settling in Shape; UX02 retires it
for the static full-height layout.
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
  and direct shortcuts to the three planned AI tools and file ownership.
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

## Homepage layout and navigation

UX02 provides six full-height presentations: Hero, ChatGPT introduction,
Research, Structure, Review, and Ownership. `HomeSequence` measures the scrolling
header so it shares the first viewport with the hero. `FeatureSection` uses viewport
minimum heights and natural overflow, with alternating paper/sage surfaces.
The existing copy and detailed examples are retained. UX05 gives the four core
features layered Learn more reveals with explicit Back to overview controls.
Details remain open while browsing this homepage. Leaving the homepage ends that
state. Hero actions and all four introduction shortcuts remain directly available.

The homepage resolves section and source/page fragments after mounting, opens
the relevant detail layer and selected page before locating a hidden destination,
and handles repeated same-fragment links. Section shortcuts
locate the active presentation at its section boundary; source links locate the
source itself with clearance for the local return toolbar. Explicit feature
navigation is immediate after the presentation update. Pending alignment yields
to newer input, focus elsewhere, another click or a hidden/unfocused document;
a delayed hash event cannot restart an interrupted alignment. Back/Forward leave
scroll restoration to the browser.
Pricing/FAQ and supporting routes retain their existing navigation behavior.

Entry choreography in `section-entry.ts` gives each section its own Waiting →
Entering → Summary state. Each entrance runs once per loaded document, including
across SPA remounts; reloading resets that memory. Unseen sections keep waiting
when another section finishes, the tab is hidden, the page is restored or geometry
changes. A partial visit below the trigger does not consume the entrance.

About 60% of the smaller of the section height and visible viewport starts entry.
Tall sections can therefore animate without needing 60% of their entire height on
screen. Intersection observation and a passive document-scroll listener schedule
at most one pending frame; there is no idle animation loop. The nominal entrance
lasts 580ms, with an 800ms completion fallback. A fresh hero uses the existing
fully opaque entrance. Entry changes transforms/opacity without scrolling or
moving focus; oversized sections still remain ineligible for vertical settling.

Explicit focus/control activation and fragment navigation immediately settle only
the relevant section. A running entrance can finish early on departure, resize,
visibility or preference change; this does not consume unseen sections. Reduced
motion and forced colors show readable content and mark only encountered sections
as settled. Restoration settles visible destinations while leaving other first
visits eligible. Unsupported enhancement APIs use readable static content. Cleanup
releases listeners, observers, timers and pending frames without recording unseen
sections or consuming an entrance during React's pre-paint effect cleanup.

UX04 adds optional near-boundary settling through `section-settling.ts`, using
`section-geometry.ts` for the same viewport and header-plus-hero measurements as
entry. A dominant, fitting summary can align only within 10% of its boundary after
a user scroll episode completes. The controller prefers document `scrollend`,
requires 200ms without input/movement, and samples a stable position twice. Without
`scrollend`, the quiet/stable-position fallback applies. Ambiguous input leaves
ordinary scrolling alone; a correction uses a cancellable 280ms ease-out.

Departure protection persists across small gestures and pauses. A section aligned
at the beginning of an episode stays excluded while the visitor leaves it; merely
passing through alignment during a continuous gesture is not treated as departure.
Approaching again from outside its capture band, deliberately reversing toward it,
or selecting its navigation link re-arms it. New input immediately cancels a
pending/running correction. The controller's own writes never create another
scroll episode. Each frame explicitly uses instant scrolling, bypassing the global
smooth-anchor CSS without changing the site's normal anchor behavior.

Initial load, navigation/restoration, focus-driven scroll, text selection, held
input, visible focused controls, open dominant details, oversized content, reduced
motion, forced colors, pinch zoom and changing viewport/layout geometry exclude
settling. An open offscreen detail panel does not block a newly dominant summary.
Wheel, touch, scrollbar and keyboard behavior remain native; when the browser does
not expose enough input origin/completion information, no correction is attempted.
Leaving the homepage clears listeners, observers, timers and animation frames.

UX05's `use-feature-reveal.ts` owns each feature's Summary → Revealing → Detail →
Returning state. The colored overview sheet moves aside over 450ms, with a 650ms
completion fallback and restrained detail arrival. The active layer alone is
available to keyboard and assistive technology; each presentation has its own
heading and the section is named by the active one. Explicit opening moves focus
into details, and closing returns to Learn more. Interruption resolves the state
without delayed focus movement after the visitor scrolls or moves focus elsewhere.
Reduced motion, forced colors and missing motion APIs use immediate changes.

Details retain natural document height, with a local sticky Back to overview
control and a second return at the bottom. Closing from deep within a detail view
explicitly restores its overview. Escape closes only within that feature and
respects descendant interactions. Navigation resolves in-progress reveals before
locating the active heading or a source; opening/closing adds no history entries.
Entry/settling controllers observe reveal state, excluding an active detail view
without disabling another dominant summary. Timers, animations and listeners are
released on completion or unmount.

UX06's `FeatureDetails.tsx` divides Research into two pages, Structure into two,
and Review into three. Ownership remains one view without pagination controls.
Native horizontal scrolling and CSS snap provide touch/trackpad browsing; no input
handler converts vertical wheel movement or prevents vertical pan/pinch zoom.
Previous/Next stay outside the scrolling content, with names, page counts and
focusable unavailable endpoints. Button/fragment changes are immediate, including
reduced motion. There is no autoplay, loop or custom slide animation. Browsers
without inert or horizontal snap support get static button-selected pages.

Each page is named by its existing content; only the selected page is available
to keyboard and assistive technology. User page changes have a short polite
announcement. Outgoing page focus moves outside that page before deactivation;
Previous/Next retain focus on their control. Content reserves the tallest page's
natural height and controls reserve their longest title's height, avoiding jumps
between pages without clipping tall content or adding a vertical slide scroller.
Shorter pages consequently leave some reserved space, especially at narrow widths.

UX07 reconciles the integrated behavior and documentation. Pending carousel
realignment yields to a newly started native gesture, including input that finishes
a reveal. Detail links and keyboard-focused controls use the measured local return
toolbar clearance. The old outer/nested feature-disclosure navigation path is
retired; FAQ and purchase-help disclosures remain native outside this sequence.

Selection survives close/reopen and scrolling elsewhere, and ends on homepage
unmount. Detail/source fragments select their owning page before focus/alignment;
section shortcuts keep the selected page. Resize preserves selection without a
vertical correction. Existing captions/qualifications remain shared across their
pages. Review's repetition example is directly visible on its dedicated page,
without a second disclosure. Pagination does not add history entries. Touch feel,
focus announcements, tall-page spacing and browser restoration await user review.

The old Structure motion hook remains retired. Existing global smooth anchors
outside the six-section navigation still apply only on wide screens with motion
allowed. Layout, scroll feel, motion comfort, focus and browser restoration await
user-owned observation; format/lint/typecheck do not establish runtime acceptance.
UX01–UX07 implementation is complete; user acceptance remains pending. No device
observations have been supplied to tune the initial timings or reserved-page
spacing. Use the [final UX manual guide](ux-improvement-plan.md#ux07--october-18-2026--implementation-complete)
for the complete homepage journey and remaining acceptance observations.

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
