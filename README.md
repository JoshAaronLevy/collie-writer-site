# Collie Writer website

A Vite + React + TypeScript + Mantine marketing website for Collie Writer, a
desktop nonfiction workspace. WEB01–WEB02 provide the branded homepage foundation,
Gather → Shape → Write story, illustrative workspaces and local-file ownership
section. WEB03 adds a brief, once-per-load decorative settling sequence in Shape.
WEB04 adds planned pricing, a Downloads page and shared release availability.
The product is presented as **in development for Mac and Windows**. Downloads and
purchases are not enabled.

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

Fix all errors and warnings. Formatting targets authored source and root
configuration/documentation, with the npm lockfile excluded; it does not traverse
dependencies, public license originals, binary assets or generated output. Inspect
the scope again if vendor/generated or historical test files are later present.
ESLint covers TS/TSX and root JS/CJS configuration, with zero warnings allowed.
TypeScript checks both application and Vite configuration without emitting JS;
incremental diagnostic caches stay under ignored `node_modules/.tmp/`.

No tests, harnesses, fixtures, automated verification scripts, test CI, builds,
audits, app launches, browser automation, screenshots or runtime probes are
authorized by these checks. Documentation-only changes do not require them.

## Source and assets

- `src/components/site/` owns the header/footer and their styles.
- `src/features/home/` owns the hero, product story, ownership section and
  illustrative workspaces. `example-project.ts` holds their shared invented content.
- `src/features/access/` owns the pricing comparison; `src/content/offers.ts`
  records the intended offers and unavailable purchase state.
- `src/content/release.ts` owns release metadata and the download-availability gate.
- `src/pages/` owns Downloads and basic missing-route recovery.
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
from the validated record. Paid purchasing remains independently unavailable.
There is no environment/query/local-storage switch to enable either feature.

React Router 8.4.0 supplies declarative routes for `/`, `/downloads` and a minimal
unknown-path recovery page. Navigation uses normal document/fragment links, retaining
browser back/forward and opening in a new tab. Vite's existing SPA configuration is
retained for local direct loads; the user must observe reload behavior. The eventual
static host must serve the app for `/downloads` while preserving asset/license URLs.
No host has been chosen or configured. WEB05/WEB08 still own delivered per-route
metadata, final host route/status handling and public readiness. React-rendered tab
titles are a convenience, not crawler-visible metadata completion; the HTML remains
noindex with its development description.
