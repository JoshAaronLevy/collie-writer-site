# Collie Writer website UX improvement plan

Prepared October 18, 2026; updated from Josh's recorded decisions. **Planning decisions incorporated. No implementation stages have started.**

## Confirmed direction

- Include **Hero → ChatGPT introduction → Research → Structure → Review → Ownership/files** in the full-height experience. Pricing, FAQ, the footer, and supporting pages retain natural height.
- Keep full-height presentations on phones where the content fits. Allow natural height when available space, enlarged text, or zoom requires it; useful detail carousels remain horizontal, with ordinary vertical page scrolling for tall content.
- Retain the scrolling, non-sticky header and the introduction's direct feature links; add ownership to those links. Do not add a persistent feature menu or dot rail.
- Play entry animation once per section per homepage visit. Returning to a section shows its settled content immediately.
- Preserve an open detail view and its selected slide while visitors browse the homepage. Explicit **Back to overview** closes it; leaving the homepage ends this temporary state. Closing retains the selected slide for reopening during the same visit.
- **Keep the existing copy.** Reorganize it into summaries and details without rewriting headlines, shortening sentences, or deleting explanations. Josh will judge wording after the new experience is implemented. New functional labels needed for the requested controls are permitted; a marketing-copy revision is deferred.

## 1. Purpose and design principles

The existing site has a strong visual identity and useful feature examples. The change is about how visitors encounter that information. Someone interested in research should be able to recognize it quickly and explore it; someone interested in outlining should be able to pass research without reading a demonstration first.

Josh's three principles govern the implementation:

1. **Make the destination easy to reach.** Preserve direct links and ordinary scrolling. A visitor can skip features, reverse direction, leave details, or go to Pricing without completing an animation or a sequence of slides.
2. **Ask for attention only when it is relevant.** Each of the four core feature summaries initially offers its existing title and introductory copy, one contextual illustration, and one **Learn more** action. Detailed explanations and examples appear by choice. Longer explanations become a small set of distinct horizontal pages. The hero and ChatGPT introduction retain their existing actions and direct navigation within the full-height layout.
3. **Respect the visitor's judgment.** Write clear, economical copy with some character. Show the relationship between ideas through design and examples. Avoid instructional paragraphs explaining an obvious interface, repeated benefit claims, forced tours, or slogans that obscure the subject.

The intended experience is a series of six calm, full-height presentations, beginning with the hero and ChatGPT introduction. Alternating paper and pale green backgrounds create clear boundaries. Content enters as its section becomes substantially visible. After the visitor stops scrolling, a section that is already very close to alignment may settle gently into position. In Research, Structure, Review, and Ownership, selecting **Learn more** moves the summary's colored surface aside to reveal the detail layer beneath it.

**Full height and snapping serve these principles; they do not outrank them.** Text must remain readable, wheel input must remain effective, and overflowing content must remain reachable. No visitor needs to learn a special scrolling technique.

### Scope and relationship to existing work

- Work belongs to `/Users/joshlevy/Desktop/collie-writer-site`. Preserve the existing Vite, React, TypeScript, Mantine, CSS Modules, fonts, artwork, routing, and content owners.
- Preserve all current copy, including Josh's recent changes. Re-read current files and Git changes at every stage; move existing prose into the appropriate presentation without rewriting or deleting it. Do not restore older copy from the original brief or implementation plan. Editorial changes wait for Josh's review of the implemented experience.
- This document records the interaction/layout direction for all six included homepage sections. It supersedes earlier instructions that those sections remain static or use only the existing Structure animation. Earlier WEB/WAI implementation records remain historical.
- `website-implementation-plan.md` continues to own existing release, commerce, publication, and product-claim boundaries. This UX change does not establish customer AI availability or turn planned proofreading into an available feature.
- Supporting routes, pricing behavior, purchase guards, publication settings, metadata generation, and the desktop repository are outside this redesign unless a precise navigation dependency requires a website-only adjustment.
- This request authorizes this planning-document revision only. The decisions above are settled; do not request them again or treat a copy rewrite as a prerequisite. Implement a stage when Josh requests it, then stop at its handoff for user observations.

## 2. Current source baseline

The October 18 source inspection and Josh's supplied screenshot inform this plan. The screenshot demonstrates the current Review presentation; it is not evidence of scrolling, animation, or responsive behavior. No app, browser, dev server, build, automated test, or runtime check was run during planning.

| Area | Current owner and behavior | Planned treatment |
| --- | --- | --- |
| Homepage order | `src/App.tsx`: hero → ChatGPT introduction → product story → Pricing → FAQ; shared header/footer surround the route | Preserve this order; the first six sections share full-height layout, entry behavior, and eligible settling. |
| Header/navigation | `src/components/site/SiteLayout.tsx` and its CSS Module; wrapping, non-sticky header | Keep the scrolling header and existing links. No persistent feature navigation. |
| Hero | `HomeHero.tsx`, `WorkspaceIllustration.tsx` | Include in the full-height experience; preserve existing copy, illustration, release-derived CTA, and Explore the AI tools link. |
| ChatGPT introduction | `AiIntroduction.tsx`; account explanation and Research/Structure/Review links | Include in the full-height experience; keep all connection copy and availability qualifications visible, and add the ownership shortcut. |
| Research | `ResearchStory.tsx`, `ResearchStory.module.css` | Summary plus optional detail pages; retain the example conversation and source relationship. |
| Structure | Inline section and `PlanIllustration` in `ProductStory.tsx`, with `ProductStory.module.css` | Extract only as needed for the shared section; retain material → outline → writer revision. |
| Review | `ReviewStory.tsx`, `ReviewStory.module.css` | Summary plus readable pages for evidence, citations/source use, and writing/repetition. |
| Ownership/files | Inline section in `ProductStory.tsx`; currently dark green | Full-height summary and details, using pale green in the six-section alternating sequence. |
| Existing motion | `use-shape-motion.ts`; finite decorative Structure sequence | Coordinate or retire its migrated use when shared entry motion takes over; do not layer two independent entrance sequences. |
| Global layout | `src/index.css`; paper/green palette, global ID scroll margin, wide-screen smooth anchors | Preserve tokens and focus styles; reconcile anchor offsets and smooth scrolling with the new coordinator. |
| Illustrative content | `example-project.ts` and existing compositions | Reuse the invented public-spaces project and visible example labels. |
| Existing libraries | `package.json` includes Mantine Carousel and Embla | Inspect installed APIs before selecting an implementation; no new animation framework is required by this plan. |

The existing website plan records WAI01–WAI05 implementation as complete with user testing pending. This plan does not infer that those observations have since passed. Current source has separate `format`, `lint`, and `typecheck` scripts; the original plan's initial scaffold description is historical.

## 3. Information architecture and content direction

### Section scope

| Region | Viewport-height summary | Entry/reveal states | Automatic settling |
| --- | --- | --- | --- |
| Hero | Yes; header and hero together fill the first viewport when content fits | Shared entry behavior; retain existing CTA and navigation | Eligible first-screen presentation; target document top |
| ChatGPT introduction | Yes, when content fits | Shared entry behavior; retain account copy and feature shortcuts | Eligible settled/entering presentation |
| Research | Yes, when content fits | Yes | Eligible summary only |
| Structure | Yes, when content fits | Yes | Eligible summary only |
| Review | Yes, when content fits | Yes | Eligible summary only |
| Ownership/files | Yes, when content fits | Yes | Eligible summary only |
| Pricing, FAQ, footer | Natural height | Existing interactions | No |
| Help, Downloads, policies, purchases, not-found | Natural height | Existing interactions | No |

The hero and ChatGPT introduction join the same viewport, entry, and settling system. Their existing content and navigation remain directly available: preserve the hero's actual CTA and the introduction's feature shortcuts instead of adding a redundant detail layer. The four core feature sections use the Learn more reveal and optional detail carousel. Full-height inclusion does not require inventing additional content for the opening two sections.

### Existing copy to carry into the new layout

Keep the wording below as it appears in current source. Line breaks, placement, and grouping may change; sentences and meaning must not. Source takes precedence if Josh makes additional edits after this snapshot. Earlier proposed headline/subtitle replacements and word-count targets are withdrawn. Achieve a focused summary by moving whole existing content blocks into details, not by rewriting copy to fit the screen.

| Section | Existing headline | Existing introductory copy | Illustration direction | Background |
| --- | --- | --- | --- | --- |
| Hero | **Research deeper. Write with conviction.** | Explore your sources, turn your ideas into a structure, and review the strength of your writing, with AI alongside your work. | Preserve the existing workspace illustration and its example text. | Paper `--color-paper` |
| ChatGPT introduction | **Your ChatGPT plan. Put to work.** | The plan: sign in with your existing ChatGPT account, allow plan use, and get back to writing. | A restrained account-to-workspace composition using the existing document shapes, without a pretend sign-in control or new explanatory copy. | Pale sage, based on current `#e7eee4` |
| Research | **Follow the question further.** | Find sources, explore disagreements and question the evidence. Keep useful references and conversations with your project. | A question, a source fragment, and a retained reference connected in one spare composition; retain the full example in details. | Paper |
| Structure | **There’s a structure in what you’ve collected.** | Find themes and gaps across selected material. Develop an AI outline with a purpose for each chapter. | Collected note/source/conversation cards arranged into a short chapter outline; retain the full example in details. | Pale sage |
| Review | **Go beyond the red underline.** | A supercharged proofreader for evidence, citations and arguments, alongside spelling and grammar. Keep your voice. | One marked phrase beside its source and a restrained margin annotation; retain the full example in details. | Paper |
| Ownership/files | **Your work. Your files.** | Write and organize offline. Save your manuscript and retained material in a portable .collie file. Local recovery and some unfinished drafts stay on your computer. | The existing `.collie` file motif with a few recognizable document forms. | Pale sage |

The ChatGPT introduction also keeps these existing lines visible beside its introductory claim: **“No API keys. No separate AI token bill from Collie.”** and **“Eligible ChatGPT plan required. Your plan’s usage limits and credit settings apply. Collie pricing is separate. Customer AI access is not available yet.”** Retain the three current feature-link labels and add an ownership link using **Your work. Your files.** Update navigation/list accessible names as needed so ownership is not mislabeled as an AI tool. These direct links stay available without opening details.

Research, Structure, Review, and Ownership use **Learn more**. Give repeated buttons distinct accessible names that retain that visible phrase, such as “Learn more about research.” Preserve the hero's release-derived CTA label/destination and **Explore the AI tools** link. Do not show state names, snap percentages, or instructions about how the animation works to visitors.

Keep necessary status next to the claim: Research/Structure currently say **In development** and Review says **Planned feature**. Retain those qualifications in the summaries unless separately updated through the existing evidence process. Keep example labels next to illustrative product content. Other explanation belongs beside the relevant detail, without repeating it on every slide.

Use the established typography, document cards, source fragments, and brand palette. Summary illustrations should communicate a relationship at a glance; the current dense examples belong in details. Prefer responsive HTML/CSS and small decorative SVG elements so text stays readable and the style matches the site. Do not introduce a new mascot, stock artwork, pretend working editor, or raster screenshot full of tiny text. No new asset generation is needed during planning.

### Detail allocation using existing copy

Start with the following content allocation, then combine pages if necessary without removing their existing content. These page names describe organizational units in this plan; they are not approved replacements for site copy. Reuse existing headings/phrases when naming visible pages, adding only functional navigation labels where needed. A section with one useful detail page has no carousel controls. Do not add slides to meet a quota.

| Feature | Detail page | Material and qualifications to preserve |
| --- | --- | --- |
| Research | **Follow a lead** | Existing example question/answer and a direction to explore. Distinguish a suggested search direction from evidence already examined. |
| Research | **Keep the source close** | Selected excerpt, origin, retained reference/conversation context. Keep the source link and its destination within a usable navigation path. |
| Structure | **Find the shape** | Selected note, source, and conversation informing a proposed outline; themes, gaps, and chapter purposes. |
| Structure | **Make it yours** | Writer's changed chapter title, discussion/editing, explicit Use outline choice, and connected chapter material. Keep selected-material limits and explicit history import qualifications with this explanation. |
| Review | **Read against the evidence** | Existing draft/source comparison, possible overstatement, and suggested wording. The writer chooses changes; findings require relevant source text/context. |
| Review | **See your source use** | Attribution/citation-style direction, which sources are used and where, missing support, and continuation to research. Preserve the distinction between frequency and overuse. |
| Review | **Make the argument stronger** | Clarity/flow and the current repeated-idea example. Useful recaps remain distinct from unnecessary repetition. No claim of certified accuracy or automatic rewriting. |
| Ownership/files | **Keep your project together** | Portable `.collie` project and explicit Save. Retain the difference between saved project material and device-local recovery/unfinished drafts. |
| Ownership/files | **Take your writing with you** | Existing export formats, offline non-AI writing, and ad-free positioning. Keep the selected-context AI/privacy distinction beside its relevant claim and preserve the privacy link. |

Use one main idea and one example per page. Preserve context within each page; a visitor should not have to remember an essential qualification from a previous slide. Split the current Review composition rather than shrinking its text to force it into one screen. Do not replicate the entire original section in every slide.

UX01 must map every current paragraph, link, example, and qualification to its new home, including the hero and ChatGPT introduction. Keep illustration text intact in its retained composition or detail page. Relocation and grouping are in scope; deletions and editorial rewrites are deferred until Josh reviews the implemented UX. Preserve the Structure paragraph beginning “Discuss or edit it,” its import/size-limit note, the Ownership export/privacy paragraph, and every existing example caption.

## 4. Interaction contract

### 4.1 Viewport occupancy and ordinary scrolling

- Use the document as the vertical scroll container. Do not create a nested full-screen vertical scroller, body scroll lock, pinned scroll narrative, or wheel-to-page navigation system.
- All six included sections have full-width alternating backgrounds and viewport-sized presentations. Use content-driven minimum block heights, never fixed heights with clipped text. Full height refers to the browser's available page area, not the physical display or browser chrome; do not request browser fullscreen.
- On desktop, the summary should occupy one usable viewport when its content fits. Keep enough padding for text, illustration, action, and any safe-area insets. Reduce decorative space before reducing illustration size; do not reduce body text below the site's normal readable size just to fit.
- Keep the non-sticky header in document flow. On the first screen, header plus hero together occupy at least one usable viewport: give the hero the remaining height after measuring the actual wrapping header, with natural growth when needed. Do not add a full viewport of hero height beneath an extra header. Register this combined first-screen footprint for settling to document top, so returning to the hero also restores the header.
- The ChatGPT introduction and four core features each align their top edge to the top of the unobscured viewport. There is no persistent header offset after the first screen. Keep the header visible and usable throughout first-screen entry; it does not become a hidden animation layer.
- Use modern viewport units with a conventional fallback. Mobile toolbar changes, orientation, and zoom must not start an alignment animation. Pause settling during changing geometry, then measure the stable available viewport before the next user scroll can qualify.
- Apply the same full-height design on phones wherever content fits. At narrow widths, short landscape heights, enlarged text, or zoom, allow summaries and details to grow. An oversized section, including an oversized header-plus-hero footprint, remains normally scrollable and is ineligible for automatic settling. Keep all controls reachable without inner vertical scrolling; retain useful horizontal detail navigation rather than automatically replacing it with a stacked phone-only story.
- Preserve the ability to scroll straight into Pricing, FAQ, and the footer. Large gestures may cross several feature sections.

### 4.2 Names for the section states

Use these names in code and developer documentation, not as on-screen labels. **Summary** is the normal resting presentation; avoid calling both the blank state and the visible state “default.”

All six sections use the entry/settled presentation states. The hero and ChatGPT introduction stop at Summary with their existing actions and navigation; only the four core features use Revealing, Detail, and Returning.

| State | Appearance | Entry/exit rule |
| --- | --- | --- |
| **Waiting** | Only the alternating background is visually present. | An unvisited, offscreen section may be armed for entry after the enhancement is ready. Never leave initially visible, focused, restored, or unsupported content waiting indefinitely. |
| **Entering** | Headline/copy, illustration, and action arrive in a short coordinated sequence. | Trigger around 60% visibility, or immediately on a deliberate navigation/focus request. Finish as Summary. |
| **Summary** | Existing title/introductory copy, illustration, necessary status, and the section's actions. | Remains stable while reading. Learn more opens details for the four core features; the hero and introduction retain direct navigation. |
| **Revealing** | The colored summary surface and its contents slide aside together, exposing details beneath. | A short transition initiated only by Learn more; finish as Detail. |
| **Detail** | One detail page with Back to overview and, when useful, carousel controls. | Visitors can browse horizontally or scroll onward vertically at any time. |
| **Returning** | The summary surface returns over the detail layer. | Explicit Back to overview; finish as Summary with focus restored. |

Prefer a small explicit presentation state plus `hasEntered` and selected slide ownership. Do not represent every combination with unrelated booleans that can leave both layers active. Entry visibility, document settling, and horizontal slide selection have separate responsibilities.

### 4.3 Entry choreography

The proposed trigger is **60% of a viewport-fitting section visible**. This starts the presentation; it does not move the page. A section can become Summary at 60% visibility without ever becoming eligible to snap.

For ordinary feature geometry, Intersection Observer can signal that threshold. Its ratio is relative to the observed target; a section taller than the viewport may never reach 60%. Oversized sections therefore take the visible static path rather than waiting for an unreachable threshold. See [MDN's Intersection Observer documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Initial art direction, to be tuned from Josh's observations:

| Group | Proposed movement | Starting timing |
| --- | --- | --- |
| Feature label and headline | Short upward arrival, approximately 16–24 px, with opacity | About 420 ms, starting immediately |
| Subtitle | Same direction with a smaller offset | About 360 ms, starting 60 ms later |
| Illustration | A restrained horizontal arrival or assembly of its existing document shapes | About 500 ms, starting 80 ms later |
| Section action or feature links | Small upward arrival and opacity | About 300 ms, starting 120 ms later |

The whole entrance should settle in roughly 600 ms. Use a smooth deceleration without bounce, overshoot, letter-by-letter animation, or a long delay before the action appears. Buttons must respond immediately if focused or activated during entry.

Give each section a related illustration gesture: the hero workspace settles into place, the ChatGPT introduction connects account/workspace shapes, references connect in Research, material aligns into an outline in Structure, a margin annotation resolves in Review, and document forms gather around the project file in Ownership. Keep title/copy behavior consistent. Animate a small number of transform/opacity layers, not every word or every card independently.

Entry plays once per section per homepage visit, including the hero and ChatGPT introduction. Returning up the page does not erase content and start over. Leaving during entry resolves to a readable settled state. There is no continuous animation after entry and no animation tied to every pixel of scrolling.

On a fresh top-of-home load, the hero may start its one short entrance immediately when the enhancement is ready; do not first hide a visibly rendered hero or wait for a scroll threshold. Its CTA and the header remain usable. If that entrance cannot start without a hide/reveal flash, show the settled hero and count it as entered. Fragment/history restoration uses the settled path, and a hero encountered later after a deep initial link follows the same once-per-visit rule.

Do not hide content before the controller is ready. The normal mounted presentation is readable; arm the visual Waiting treatment only for eligible offscreen sections. Focus entering a visually waiting summary reveals it immediately. Initial fragment destinations, restored viewport content, reduced-motion/forced-color presentations, missing observer support, and interruption/error cleanup must all reach a complete readable state without waiting for an animation event.

### 4.4 Settling after scrolling stops

**Required behavior:** the visitor controls all ordinary scrolling. After scrolling and its momentum end, the page may make one small alignment correction, and only when one of the six included sections is already within approximately ±10% of its aligned position.

CSS Scroll Snap leaves snapping physics and proximity choices to the browser. It does not provide this exact idle-and-distance contract, so the proposed vertical behavior uses a small homepage coordinator instead of CSS `mandatory` or `proximity` snapping. Do not run both systems on the vertical axis. This is a design decision based on the [CSS Scroll Snap specification](https://www.w3.org/TR/css-scroll-snap-1/), not a claim that CSS snapping is inherently unsuitable elsewhere.

#### Eligibility and distance

Let `H` be the current usable viewport height, `A` the unobscured top alignment edge, and `T` a registered section's top edge, measured in the same viewport coordinate system. Its alignment error is `d = T - A`. Register all six sections with one coordinator. The hero's registered footprint includes the scrolling header and targets document top; the other five target their own section boundaries. Use the same footprint for visibility and height eligibility so the shorter hero body is not mistaken for a separate incomplete screen.

At the end of a user-driven scroll episode:

1. Identify the most visible registered section by visible vertical coverage. It must be an eligible viewport-fitting presentation in Entering or Summary, with no competing detail/transition interaction. Entry animation need not finish before alignment can qualify; the two triggers remain independent. Hero and ChatGPT introduction are eligible under these same rules.
2. Require `abs(d) <= 0.10 × H`. Compare the section boundary, not the heading's position or a percentage of page scroll progress. If already aligned within a small rounding tolerance, do nothing.
3. Reject a candidate the visitor is deliberately leaving, even if it still occupies most of the screen. Apply the departure rule below before moving anything.
4. Require stable viewport/layout geometry, completed input/momentum, and no navigation, focus, or user-selection conflict. If these cannot be established, leave the page where it is.
5. Move only that small remaining distance and only once for this settled user episode. Do not queue another section or advance a slide.

Examples with an 800 px usable viewport: a newly approached target 56 px from alignment can qualify; one 160 px away cannot. At 60% visibility an entrance can run but snapping cannot. A 50/50 boundary stays where the visitor leaves it. Reaching 20% of the next section does not pull the visitor into it or back to the previous one.

#### Departure protection — essential to easy exit

When a visitor scrolls away from an aligned section, temporarily exclude that section as a snap destination. A small 4–8% scroll followed by a pause must not bring them back. Preserve this exclusion across several small wheel gestures so repeated gentle scrolling can actually leave the section.

Re-arm that destination only after the visitor approaches it again from outside its capture band, deliberately reverses toward it, or explicitly selects its navigation link. The correction's own scroll events do not count as new input or a reversal. Do not introduce a minimum number of wheel ticks, a gesture threshold required to escape, or a cooldown that blocks native scrolling.

#### Detecting a genuine pause

Prefer the document `scrollend` event where supported: it accounts for pending position changes and completion of a scrolling gesture. It also occurs after programmatic scrolling, so origin tracking is still required. Feature-detect support; do not infer it from browser names. See [MDN's document scrollend documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollend_event).

Use an initial quiet interval of roughly **200 ms** with no new relevant input or document movement, plus no held pointer/touch or scrolling key. Treat that value as a tuning proposal. In a fallback without `scrollend`, wait for both the quiet interval and stable positions; a timer after the last wheel event alone does not establish the end of momentum. If input completion is ambiguous, skip the correction. A website cannot infer human intent perfectly, so user observations determine whether the timing feels right.

Mouse wheel, trackpad momentum, touch dragging, scrollbar dragging, and scrolling keys must remain native. Listeners that observe wheel/touch/scroll input should be passive where appropriate. Do not cancel their default behavior or convert vertical input into horizontal carousel movement.

#### Alignment movement and cancellation

- Start with a short **250–320 ms** ease-out alignment, with about 280 ms as a tunable default. No bounce or spring. The final position should be exact enough to avoid a visible sliver caused by rounding.
- Own one cancellable animation at the homepage level. If a frame-driven tween is used, use immediate scroll writes per frame and reconcile the existing global smooth-scroll rule so each frame does not launch another browser smooth scroll.
- Any new wheel, touch/pointer action, scrolling key, navigation, resize, or tab visibility change cancels the pending/running correction immediately. Do not retry it without a new eligible user episode. The interrupting input keeps its normal browser effect.
- Mark controller-originated movement so its own scroll/scrollend callbacks cannot trigger a loop. Do not maintain a perpetual animation-frame loop when idle.
- Do not snap on initial load, fragment navigation, browser restoration, focus-driven scrolling, selecting text, or a viewport change. Anchor clicks are deliberate navigation and may go directly to their target without being inside the 10% band; they are separate from automatic settling.
- While details occupy the main reading area, or a reveal/return/carousel interaction is active there, suspend automatic vertical settling. Once the visitor has moved into a different dominant summary, that summary can qualify normally if there is no ongoing detail interaction. A small trailing edge of the previous detail panel, or an open offscreen panel, must not disable settling elsewhere.
- Disable automatic settling for reduced motion, oversized sections, pinch-zoom/unstable visual viewport conditions, and unavailable required APIs. Ordinary scrolling remains the fallback.

Use named constants for the capture fraction, entry threshold, quiet interval, and animation duration in their appropriate owners. Centralize behavior that must agree; do not build a general animation settings framework or a testing-only tuning panel.

### 4.5 The summary surface and reveal

The visual model is a colored front surface over a detail layer within the same semantic feature section. Background alternation belongs to the outer section and its summary surface; the underlying detail layer can use the existing warm surface color and feature accent for contrast.

On Learn more:

1. Cancel pending automatic settling. Resolve any incomplete entrance so the control responds immediately.
2. Prepare the appropriate detail page and its heading before starting the reveal. Reserve layout space without letting hidden content create an oversized summary.
3. Slide the colored summary surface and its contents sideways as one composition, revealing details underneath. Start with roughly 450 ms and a slight, restrained arrival of the detail content. The visitor does not need to drag the surface.
4. End with only the detail layer interactive and accessible. Provide a plainly labeled **Back to overview** control in a consistent, visible position.

Keep this interaction inside the document. It is not a modal: do not trap focus, lock page scrolling, obscure adjacent sections, or require dismissal before proceeding. Clip decorative horizontal movement within the section without clipping vertical content or focus outlines.

Use a persistent small detail toolbar within a tall detail panel if needed so Back to overview is reachable without a long return scroll. Do not add an extra global toolbar.

On Back to overview, reverse the surface transition and return focus to that feature's Learn more control. If closing a tall detail panel would leave the viewport elsewhere after its height collapses, deliberately restore the originating summary's visible position as part of the explicit close action. Do not treat that movement as an automatic snap or land on the next feature.

Move focus into details on an explicit open and back to its opener on an explicit close. Coordinate the transfer with inactive-layer changes so focus is never inside an inert or hidden subtree. If the visitor scrolls away or moves focus elsewhere during a transition, finish state cleanup without a delayed focus move pulling them back. Escape may close details when focus is within that section and no descendant interaction owns Escape; do not bind Escape globally to an offscreen section.

Rapid open/close actions must resolve to the latest requested presentation without duplicate layers or stale callbacks. Transition completion needs an interruption/fallback path; content access cannot depend exclusively on `transitionend` firing.

Detail state is ephemeral per feature: preserve Detail and the selected slide when scrolling elsewhere on the homepage, including into the hero, introduction, Pricing, or FAQ. Explicit close returns to Summary and retains the selected slide for reopening during that visit. Leaving the homepage ends this temporary state; a fresh homepage mount starts from summaries unless a detail fragment explicitly requests otherwise. Never close details merely because they leave the viewport. No local storage, tracking, or persistence service is needed.

### 4.6 Horizontal detail browsing

Use a simple non-looping, visitor-controlled carousel only where there is more than one useful detail page. No autoplay, forced progression, or requirement to finish the carousel before leaving vertically.

- Provide visible Previous/Next buttons and a small current-page indicator such as **2 of 3** with meaningful page titles. Distinguish unavailable directions at the ends. Dots alone are insufficient.
- Support touch horizontal swiping without blocking vertical pan or pinch zoom. Provide buttons for mouse and keyboard users. Preserve text selection and link activation inside slides.
- Do not map vertical mouse-wheel input to horizontal movement. Horizontal trackpad movement can follow the selected implementation's native capability; buttons remain the guaranteed alternative.
- Keep keyboard handling local. Tab follows the normal document order, and activating Previous/Next retains focus on that control. If arrow-key navigation is added, scope it to the carousel and avoid capturing keys used by text or other controls.
- Offscreen slides must not contribute hidden tab stops or a confusing screen-reader reading sequence. Give the carousel and each slide useful names, and announce a visitor-initiated slide change briefly without reading the entire slide or announcing ordinary section scrolling. Follow the [WAI-ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).
- Keep controls outside the moving slide track. In a viewport-fitting layout, reserve enough height for the largest slide and controls to prevent the page shifting with every Next click. Split excessive content before making a giant panel.
- On constrained screens, allow detail content to extend in the document. Do not create a separately scrolling vertical slide or cut off a paragraph to preserve one-screen height. Resize can retain the selected slide while recalculating geometry; it must not trigger a vertical snap.
- Inspect the installed Mantine/Embla source/types and applicable current documentation before using it. Use its basic controlled selection and swipe behavior only if they satisfy this contract; otherwise use a small native horizontal implementation. Do not add a full-page scrolling library.

### 4.7 Accessibility, navigation, and resilient rendering

These behaviors belong in each implementation stage, not solely in a final polish pass:

- Preserve semantic sections/headings, the main landmark, skip link, figure captions, visible focus, sufficient contrast, and usable touch targets. Summary illustration details cannot be the only way to identify a feature.
- Keep a meaningful feature heading and accessible section name available in both Summary and Detail. Do not make a visible detail region depend on an inaccessible summary heading for its name; preserve one unique destination for each existing heading ID while switching presentations.
- Keep **one active presentation layer** in the keyboard/accessibility path. `inert` can exclude inactive content from interaction, but it also affects browser search and accessibility exposure; it is not a substitute for deliberate state and navigation design. See [MDN's inert documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert).
- Preserve unique fragment destinations: `#top`, `#hero-heading`, `#ai-tools`, `#how-it-works`, `#shape-heading`, `#review-heading`, `#ownership-heading`, `#research-source`, `#review-source`, `#pricing`, and `#faq`. Do not duplicate IDs across summary/detail layers. Keep the hero as the page's H1; a shared section shell must not replace it with an H2.
- Feature-level links open/locate the summary explicitly. A fragment inside a detail page first reveals the owning feature and selects the correct page, then aligns/focuses the actual target. This applies to direct loads and hash/history changes, including the Review-to-Research link and source links.
- Preserve existing links from other routes. Handle initial fragments after route content is mounted; do not rely on the browser finding a target that is still hidden. Use the existing routing/navigation conventions rather than replacing the router.
- Learn more, Back to overview, and carousel clicks need not create browser-history entries by default. Explicit fragment links retain normal history semantics. Automatic entry/snap changes never push history or rewrite the URL. Returning via browser history must not replay a pending correction over restoration.
- Reduced motion shows the settled summary immediately, opens/closes details without a large moving sheet, changes slides without animated travel, and disables automatic vertical settling. A preference change during motion cancels it into the intended readable state.
- Forced colors uses visible text, borders, controls, and focus without relying on background hues or decorative masks. A static presentation is an acceptable fallback.
- A blank Waiting appearance is only a visual enhancement for ready, eligible sections. Missing animation/observer support must not make summaries or Learn more inaccessible. The current app is client-rendered: this plan does not claim a new no-JavaScript homepage. Preserve its existing no-script message.
- Browser Find is guaranteed only for exposed content under the default collapsed presentation. Do not claim it searches inert/unmounted detail slides. If whole-story Find is required, decide on an explicit readable-all mode before adding it; do not silently make hidden controls focusable to approximate search support.
- Cleanup observers, timers, media-query listeners, route listeners, and animation frames when the homepage unmounts. Handle React development effect cleanup without duplicate listeners. Switching routes must leave the shared document's scrolling behavior intact.

## 5. Implementation ownership

Keep this a small website feature, with explicit responsibilities and no generalized presentation engine.

| Proposed owner | Responsibility |
| --- | --- |
| `src/features/home/FeatureSection.tsx` and CSS Module | Shared layout/entry registration; optional summary/detail presentation, reveal/return, and focus transfer. Support opening sections without inventing detail layers, and preserve the hero's H1. |
| `src/features/home/use-feature-entry.ts` | Offscreen arming, entry visibility, once-per-visit policy, preference changes, and cleanup. |
| `src/features/home/use-feature-settling.ts` | Single homepage coordinator for all six registered sections, header-plus-hero geometry, input completion, departure protection, cancellation, and one alignment correction. |
| `src/features/home/FeatureDetails.tsx` and CSS Module | Detail navigation, selected page, horizontal presentation, and accessible carousel behavior. Create only when UX06 needs it. |
| `HomeHero.tsx`, `AiIntroduction.tsx`, existing feature components; optional extracted `StructureStory.tsx` and `OwnershipStory.tsx` | Preserved section-owned copy, illustrations, actions/navigation, optional detail content, and stable fragment targets. |
| A narrowly scoped homepage sequence wrapper composed in `src/App.tsx` | Enclose Hero, ChatGPT introduction, and `ProductStory` under one coordinator. `ProductStory` alone cannot own the sequence because the opening two sections sit outside it. Keep the shared header in its existing owner and measure its first-screen footprint without affecting other routes. |
| `example-project.ts` | Existing illustrative project content; do not create a second competing example dataset. |
| Existing header/intro/global CSS owners | Scrolling-header geometry, direct feature navigation including ownership, and genuine shared tokens only. |

Names are proposed boundaries, not a requirement to create every file in advance. Prefer typed props and ordinary React composition over a JSON-driven page schema. Use stable feature/page IDs, derive state that can be derived, and keep scroll sampling out of React render state unless it changes visible UI.

At implementation time inspect actual current APIs and package versions rather than assuming a remembered Mantine/Embla interface. Maintain existing dependencies unless a concrete approved requirement cannot be satisfied with them. No framework migration, broad dependency cleanup, analytics, accounts, AI requests, or backend work.

## 6. Stage workflow and required checks

Every stage begins with this plan's confirmed direction, applicable instructions, relevant source, and Git changes. Implement only the requested stage. Where a later stage depends on subjective geometry, scroll feel, or motion acceptance, wait for Josh's observations before tuning or building on that behavior. An explicit later-stage request can authorize proceeding with recorded unresolved observations; it does not make those observations pass. Preserve current copy throughout; later wording changes require Josh's direction after he reviews the implemented experience.

**After code changes:** inspect scripts/lifecycle hooks and ignore scope, then run `npm run format`, `npm run lint`, and `npm run typecheck`, in that order. Fix every reported formatting issue, warning, and error, including pre-existing issues surfaced by those commands. Rerun affected commands and finish with all three clean on final code. Do not suppress diagnostics, weaken rules, or add broad ignores. Protect generated/vendor artifacts, historical tests, lockfiles, and unrelated user work from broad formatting. Documentation-only stages do not require these checks.

The inspected scripts format authored `src`/`build-support` source and root documentation/configuration, run ESLint with zero warnings, and typecheck the app and node configurations without emitting a build. Re-inspect before execution; script definitions can change.

**User-owned runtime acceptance:** do not add/modify test code, harnesses, fixtures, mocks, verification scripts, testing hooks, or test CI. Do not run automated tests, dependency audits, builds/packages, launches/dev servers, browser automation, verification screenshots, benchmarks, failure injection, or runtime probes, directly or indirectly. Source inspection and Git diff reading are permitted; neither is a passed runtime test.

**User-only setup for the guides below:** from the website directory, Josh can run `npm run dev` and open the local address Vite prints. If dependencies are not installed, provide setup instructions appropriate to the actual checkout first. The assistant does not execute launch/build steps. Use user-operated production build/preview only when output behavior actually needs acceptance; this plan introduces no deployment stage.

After each code stage, record changed paths, actual code-check results, known limitations, and a short ordered guide pairing each user action with an observable outcome. State **implementation complete — awaiting user testing** only after implementation and the required checks are complete. Stop for results. Fix defects within the same stage and repeat the required code checks. Record acceptance separately and only from Josh's supplied observations.

Suggested effort: careful editorial/layout work for UX01–UX03; high reasoning effort for the state, navigation, input-cancellation, and focus interactions in UX04–UX07. Use the selected coding model and the existing repository tools; no model migration or additional agent workflow is required.

## 7. Implementation stages

### UX01 — Map existing content and six-section geometry

**Outcome:** an implementation-ready map of the existing copy, illustrations, links, and section boundaries; the direction above is already settled.

**Dependencies:** the confirmed direction and current source. **Scope:** documentation only. **Likely file:** this plan; read all six section owners and the existing website plan.

1. Inventory the six sections in their existing order. Retain hero actions and introduction copy/navigation directly; map summary/detail content for Research, Structure, Review, and Ownership.
2. Reconcile the copy snapshot above with current source so any further user edits are retained. Record which complete introductory blocks remain visible and which complete blocks move into details. Do not draft replacement marketing text or apply a word-count reduction.
3. Map every paragraph, example, internal/external link, status label, and qualification to a destination. Preserve all existing content; group related blocks without deleting them. Use existing words for visible detail-page titles wherever possible.
4. Specify stable section/page IDs and legacy-fragment destinations, the paper/sage order across all six sections, and how the scrolling header plus hero form the first viewport. Keep the non-sticky navigation decision and mobile overflow path fixed.
5. Carry the once-per-visit entry and preserved detail/slide policies into the content map. Account for initially visible hero content and for direct links into detail pages; leave release/commerce/provider records intact.

**Acceptance:** every current content block and link has an explicit destination, all six sections are represented, and the next stage can proceed without reopening the settled design decisions or requiring a copy rewrite. All timings remain initial tuning values, not claims of measured comfort.

**Manual review for Josh:**

1. Compare the six section rows with the current site; expect the existing headlines and introductory wording, including the hero and ChatGPT introduction.
2. Compare the detail allocation with the current site and recent copy changes; expect every content block to remain accounted for without rewritten claims.
3. Read the first-screen geometry and interaction rules; expect a scrolling header, six full-height presentations when they fit, one-time entry, and preserved open details.

Stop at the documentation-stage handoff. The confirmed decisions need no further approval; runtime layout and future wording judgments follow implementation. No code checks are required for this documentation stage.

### UX02 — Build the static full-height summaries

**Outcome:** the six-section sequence works as a readable, responsive page with existing copy before introducing motion or automatic settling.

**Dependencies:** UX01's content/geometry map. **Likely files:** shared section shell/CSS, `HomeHero.tsx`, `AiIntroduction.tsx`, existing feature components and CSS, `ProductStory.tsx`, the homepage wrapper in `App.tsx`, and header/global tokens where needed.

1. Introduce the small shared semantic shell and migrate all six sections. Extract Structure/Ownership only where it simplifies actual ownership; retain the hero's H1 and actual CTA.
2. Implement viewport-sized minimum heights, the header-plus-hero first screen, six alternating paper/sage surfaces, responsive spacing, illustrations, existing copy, and necessary labels. Provide natural-height overflow on desktop and phones at the same time; do not shorten text to make it fit.
3. In the four core feature sections, keep detailed content available through a working native disclosure styled as Learn more for this intermediate stage. Expanded content uses natural document height. This is the static precursor to UX05's layered reveal. The hero and introduction retain their existing actions/navigation without an artificial disclosure.
4. Preserve existing fragments and make links into collapsed detail content reveal their destination before scrolling. No stage may temporarily break source links while awaiting UX05/UX06.
5. Keep the scrolling header and introduction's direct feature links; add the ownership destination with an appropriate accessible navigation name. Preserve the current skip link, normal document scrolling, and routes. Add no persistent navigation rail/menu.
6. Remove or disable only obsolete layout/motion uses in migrated sections; retain unrelated source and user copy. Do not add Waiting appearances yet.

**Acceptance:** the header and hero fill the first usable viewport together when they fit, followed by five full-height presentations. All current copy/information remains reachable, and narrow/zoomed layouts can grow without clipping. No new animation or snapping is active.

**Manual guide for Josh:**

1. Start the site using the user-only setup and scroll from the top; expect header and hero to share the first screen, followed by ChatGPT introduction and four feature screens with alternating backgrounds and existing copy.
2. Use the hero CTA and introduction shortcuts, then open/close a core feature disclosure; expect direct navigation for the opening sections and the corresponding existing details for the feature.
3. Use the new ownership shortcut, existing feature/source links, Tab, and the skip link; expect visible destinations and focus, including links into details.
4. Narrow the window, shorten it, and use 200% zoom; expect readable content and accessible actions even when a section exceeds one screen.

Run the required code checks, record outcomes, and stop for layout observations.

### UX03 — Add the entry choreography

**Outcome:** summary content arrives deliberately without delaying navigation or reading.

**Dependencies:** UX02's stable geometry and user layout observations, or explicit authorization to proceed with documented pending observations. **Likely files:** section shell/CSS, entry hook, summary illustration owners, and the migrated use of `use-shape-motion.ts`.

1. Implement Waiting → Entering → Summary once per visit for all six sections. Arm only ready offscreen sections; preserve readable initial/restored/focused content. Handle the initial hero entrance without hiding already visible content or delaying its CTA/header.
2. Trigger around 60% visibility for fitting sections, including the ChatGPT introduction, and use the static fallback for oversized sections. A fresh top-of-page hero can enter immediately. Do not couple entry to automatic page alignment.
3. Add the shared text/action rhythm and restrained feature-specific illustration gestures. Replace conflicting old Structure motion.
4. Implement reduced-motion, forced-colors, preference changes, fast departures, direct-link/focus overrides, completion fallback, and cleanup now.
5. Keep hero actions, introduction feature links, and static detail disclosures working. No action must wait for entry completion to become usable.

**Acceptance:** arrivals feel related and concise, settled sections remain stable, and no section gets stuck blank. Scrolling remains entirely native; snapping is still absent.

**Manual guide for Josh:**

1. Reload at the top, then scroll into the introduction and four features; expect an immediate usable hero and short coordinated entrances for newly encountered sections.
2. Scroll back or move quickly across several sections; expect settled content on return, no replay, and no persistent blank section.
3. Tab or follow a feature link into a waiting section and activate Learn more promptly; expect immediate readable content and a usable action.
4. Enable reduced motion, then reload or change the preference during an entrance; expect complete static content with no delayed reveal.

Run the required code checks and stop for motion observations.

### UX04 — Add gentle settling with easy exit

**Outcome:** near-aligned summaries settle only after scrolling ends, with no resistance to leaving them.

**Dependencies:** UX02 geometry and UX03 entry behavior. **Likely files:** one settling hook/coordinator, section registration, and narrowly scoped global smooth-scroll coordination.

1. Register all six sections with the single homepage coordinator. Implement the precise geometry/eligibility rules, completed-input detection, and ordinary-scroll fallback in Section 4.4, including the first-screen footprint that settles to document top.
2. Implement departure protection before enabling any correction. Keep that protection across small repeated gestures.
3. Add the short cancellable alignment and own-scroll-event suppression. Do not install CSS vertical snapping or intercept ordinary scrolling.
4. Add navigation/focus/restoration, detail-disclosure, selection, hidden-tab, reduced-motion, resize, oversized-layout, and route-unmount exclusions.
5. Keep tuning constants together and record Josh's observations before changing the capture band or timing. Do not use benchmarks, gesture simulation, or diagnostic UI.

**Acceptance:** one small correction can occur within the approved band; a 20%/50% boundary pause stays put; tiny attempts to leave do not bounce back; interruption immediately returns control to the visitor.

**Manual guide for Josh:**

1. Approach the ChatGPT introduction or any feature until it is almost aligned, then stop; expect a brief gentle correction after wheel/trackpad momentum ends. Approach the hero from below; expect eligible settling to restore the header and hero together at document top.
2. Stop around one-fifth or halfway into the next section; expect the page to remain at that position.
3. From an aligned section, make several small scrolls with pauses; expect each to move you onward without being pulled back.
4. Scroll again in either direction during a correction, then try a long fast scroll; expect immediate response and permission to skip multiple sections.
5. Use touch/scrollbar/keyboard scrolling where available, feature links, browser Back, and a resized window; expect normal navigation with no surprise correction. Reduced motion and an oversized summary should remain unsnapped.

Run the required code checks and stop for scroll-feel observations. Do not proceed automatically to the reveal work.

### UX05 — Reveal details beneath the summary surface

**Outcome:** Learn more opens the detail layer through the approved swipe, with dependable focus and a clear return action.

**Dependencies:** UX02/UX03 and UX04's interaction exclusions. **Likely files:** shared section shell/CSS, feature detail containers, fragment resolution, and coordinator interaction state.

1. Replace the four core features' intermediate disclosures with Summary → Revealing → Detail → Returning. Keep existing copy, semantic relationships, and content access intact; hero/introduction remain direct presentations.
2. Build the moving colored summary surface and detail layer, scoped clipping, responsive natural-height overflow, and Back to overview control.
3. Implement focus transfer, inactive layers, reduced-motion/forced-color paths, interrupted/repeated actions, and cleanup. Avoid delayed focus stealing after the visitor moves on.
4. Suspend settling for the visible detail interaction and retain vertical scrolling into adjacent sections.
5. Preserve open details and selected-page state while visitors scroll elsewhere; close only by explicit action or leaving the homepage. Preserve fragments/history. Until UX06 splits the details, long detail content can flow naturally down the page; do not squeeze it into one screen.

**Acceptance:** the reveal reads as a surface moving aside, the detail content remains usable, and opening/closing does not trap the visitor or strand focus. Long details have a predictable close behavior.

**Manual guide for Josh:**

1. Activate Learn more with a pointer and keyboard; expect the summary surface to move aside and the details to become active with sensible focus.
2. Choose Back to overview or use Escape within details; expect the summary and its Learn more control to return visibly.
3. Open details and scroll to another section without closing them; expect ordinary vertical movement and the same open details when returning. Explicitly close and reopen them; expect the same selected page once UX06 adds pagination.
4. Activate open/close quickly or move focus away during a transition; expect one usable layer and no later jump back.
5. Repeat with reduced motion and a short/zoomed window; expect immediate presentation changes and all long content reachable.

Run the required code checks and stop for reveal/navigation observations.

### UX06 — Divide details into readable horizontal pages

**Outcome:** interested visitors can explore one idea at a time without dense, undersized compositions.

**Dependencies:** UX01's content map and UX05's usable detail layer. **Likely files:** `FeatureDetails.tsx`/CSS, feature-owned detail content, selected-page state, and fragment-to-page mapping.

1. Use UX01's page allocation and preserve current copy. Move examples and complete prose blocks intact; split dense Review content across pages without rewriting it or deleting material.
2. Inspect existing carousel APIs and choose the smallest implementation meeting Section 4.6. Provide controls, slide names/counts, touch behavior, and keyboard accessibility without autoplay or looping.
3. Keep controls steady and manage detail height without clipping or nested vertical scroll traps. Keep horizontal pages on phones where useful, with ordinary vertical page scrolling for tall content; full-height summaries can grow at constrained sizes or zoom.
4. Route source/detail fragments to the right open section and slide. Keep inactive slide content out of the tab order and handle focus before a focused slide becomes inactive.
5. Preserve selection across close/reopen and scrolling away/back during the homepage visit. Leaving the homepage ends that temporary state. Suspend vertical settling only for relevant visible interactions.

**Acceptance:** each page has a distinct purpose, details are comfortably readable, every page is accessible without swiping, and vertical scrolling never forces horizontal progress.

**Manual guide for Josh:**

1. Open each feature's details and use Previous/Next; expect the named pages, accurate position indicator, and clear endpoints.
2. Swipe horizontally on touch, then swipe/scroll vertically over the same panel; expect horizontal browsing when intended and ordinary page movement vertically.
3. Navigate with Tab and activate the controls repeatedly; expect visible focus that stays usable and no focus stops in hidden slides.
4. Follow a source/detail link or load its fragment directly; expect the correct section and page to open with the target visible.
5. Browse the longest page at phone width and 200% zoom; expect readable text, reachable controls, and no page-wide horizontal overflow or clipped content.

Run the required code checks and stop for detail-browsing observations.

### UX07 — Reconcile the complete experience and hand off acceptance

**Outcome:** the implemented behavior, documentation, and remaining user observations agree across the full homepage.

**Dependencies:** UX02–UX06 implementations and supplied user findings. **Likely files:** only files implicated by actual defects, this plan, relevant README motion/navigation descriptions, and a concise cross-reference in `website-implementation-plan.md`.

1. Resolve reported defects and inspect integrated state ownership, cleanup, anchor targets, responsive rules, focus transitions, and inactive content. This is source review, not a runtime verification pass.
2. Reconcile visual timing and content placement using Josh's observations. Remove obsolete styles/hooks only after references are accounted for; preserve current copy and unrelated code. Record any suggested wording changes for Josh's later decision rather than silently including a copy rewrite in this stage.
3. Ensure required route boundaries, Pricing/FAQ access, release/commerce labels, and example qualifications remain intact. Do not expand this into a release, legal, provider, or deployment project.
4. Update developer documentation to describe the actual interaction and fallback behavior, replacing superseded static-motion guidance without rewriting historical acceptance records.
5. Record actual check outcomes, remaining browser/device observations, and any differences from the approved plan. Code completion cannot stand in for comfortable scrolling on Josh's devices.

**Acceptance:** all requested behavior is implemented with clean required code checks and no known unresolved implementation defect. Runtime acceptance is recorded separately after Josh's final observations.

**Manual guide for Josh:**

1. On your usual desktop browser, start at the hero, continue to the ChatGPT introduction, use a feature shortcut, open details, browse pages, scroll away and return, then close and go to Pricing; expect six coherent full-height presentations, unchanged wording, retained open details/slide, and a voluntary path with no forced sequence.
2. Repeat near-boundary pauses, small departures, reversals, and interruptions with a wheel and trackpad if available; expect gentle alignment only when eligible and effortless exits.
3. Repeat on a phone or tablet, including browser-toolbar changes and rotation; expect readable summaries/details and no sudden alignment caused by viewport changes.
4. Use keyboard navigation, your screen reader if available, reduced motion, high contrast, and 200%/400% zoom; expect meaningful headings, visible focus, accessible content, and natural overflow. Do not require unavailable devices/tools to claim an observation.
5. Open feature/source fragments directly, use browser Back/Forward, and visit Help/Downloads before returning; expect correct targets, preserved route behavior, and no leftover scrolling controller on other pages.

Run the required code checks after any code corrections. Hand off as **implementation complete — awaiting user testing**, then stop. Mark user acceptance only when Josh reports the relevant observations; do not infer release/publication readiness.

## 8. Progress and evidence ledger

| Stage | Implementation | Required checks | User acceptance |
| --- | --- | --- | --- |
| UX01 | Not started; decisions recorded, detailed content map remains | Documentation only | Pending content-map review |
| UX02 | Not started | Not run | Pending |
| UX03 | Not started | Not run | Pending |
| UX04 | Not started | Not run | Pending |
| UX05 | Not started | Not run | Pending |
| UX06 | Not started | Not run | Pending |
| UX07 | Not started | Not run | Pending |

Append a compact dated record per requested stage: approved decisions, changed paths, actual format/lint/typecheck results, unverified behavior, tailored user guide, and subsequently supplied observations. Keep these fields separate. No stage advances automatically.

**October 18 planning record:** created this document from the user's brief, supplied Review screenshot, current website source/configuration, and existing website planning context. Consulted the primary browser/accessibility references linked at the relevant design decisions. All interaction timings and layout proposals remain unimplemented and unobserved. No application code or existing copy was changed. Documentation-only work requires no format/lint/typecheck commands.

**October 18 decision revision:** incorporated Josh's six recorded responses and removed the completed clarifying-questions section. Expanded the full-height sequence to include Hero and ChatGPT introduction; retained natural-height overflow on constrained screens, the scrolling header with direct feature links, one-time entrances, and preserved open details/slide selection during a homepage visit. Withdrew proposed copy replacements and deferred editorial changes until Josh reviews the implemented experience. Updated geometry, ownership, stages, and manual guides accordingly. Only this planning document changed; no implementation stage, code checks, or runtime testing was performed.
