# Collie Writer website

A Vite + React + TypeScript + Mantine marketing website for Collie Writer, a
desktop nonfiction workspace. WEB01–WEB02 provide the branded homepage foundation,
Gather → Shape → Write story, illustrative workspaces and local-file ownership
section. The product is presented
as **in development for Mac and Windows**. Downloads and purchases are not enabled.

See [website-implementation-plan.md](website-implementation-plan.md) for the eight
stages, current status and user-owned acceptance guide. Implement one requested
stage at a time. Website work does not authorize desktop/service changes or publication.

## Local development — user operated

With this checkout's npm dependencies installed, run `npm run dev` from the website
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
- `src/theme.ts` and `src/index.css` own the Mantine theme and global foundations.
- [Asset provenance](src/assets/branding/README.md) records the unchanged approved
  artwork, favicon and local font files. The [font license](public/licenses/SourceSerif4-OFL.txt)
  is also linked from the site footer.

Illustrative text is invented presentation content, not an app screenshot or real
research. The static page performs no content uploads, checkout or AI requests.
Assets are site-owned copies; no sibling checkout is needed at runtime.
