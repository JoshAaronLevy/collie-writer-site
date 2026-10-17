# Website brand assets

The unchanged `collie-writer.png` is the desktop application's 256-pixel image,
copied from `src/renderer/src/assets/collie-writer.png` on October 15, 2026.
`public/favicon.ico` is the existing Windows icon, copied from `build/icon.ico`.
It includes small icon sizes suitable for browser tabs. No new artwork was generated.

The original is `resources/branding/collie-writer-master.png` in the desktop
repository: the black-and-white Border Collie with a golden pencil and pale sage
background approved by Josh on October 3, 2026. That repository's branding README
records its creation with the built-in image-generation tool and the derivation of
these assets. The original remains unchanged in the desktop repository. The site
uses a live-text wordmark alongside the artwork.

Source Serif 4 Regular and Bold are copied unchanged from the desktop's
`resources/fonts/` into this site's `public/fonts/`. Their original full TTF files
are retained, rather than adding font-conversion tooling or modifying the fonts.
Only those two faces are loaded, with `font-display: swap` and a Georgia fallback.
Together they are approximately 521 KB before HTTP compression. The unchanged
Adobe copyright and SIL Open Font License are in
[`public/licenses/SourceSerif4-OFL.txt`](../../../public/licenses/SourceSerif4-OFL.txt)
and linked in the website footer.

The Research, Plan, Review and hero Write illustrations are authored HTML/CSS with shared invented
public-spaces content from `src/features/home/example-project.ts`. They are explicitly
labeled as illustrative, are not captured app screenshots, and contain no private
project material or real scholarly quotations. All website
assets are local to this checkout; there is no runtime dependency on the desktop repo.

WEB05 adds `social-card.svg`, an authored 1200×630 composition template. The
production output plugin embeds the unchanged approved mascot at 72×72, resolves
the availability line from the shared release record and rasterizes the template
with the bundled Source Serif 4 faces. `@resvg/resvg-js` produces
`social/collie-writer.png` during the user's build (or on a local dev request).
There are no new generated mascots, altered originals, screenshots, endorsements
or private project contents. The assistant did not run the build/render or inspect
the resulting PNG; visual acceptance is pending the user's output review.

WAI05 updates only the social template's copy to Research / Structure / Review,
the homepage headline and an explicit AI development label. The artwork and
font assets are unchanged; the new output still awaits user visual review.
