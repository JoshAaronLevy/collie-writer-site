# Collie Writer website UX improvement plan

Prepared October 18, 2026; updated from Josh's recorded decisions. **UX01 documentation and UX02–UX07 implementation complete — awaiting user testing. No user-confirmed runtime acceptance has been recorded.**

## Confirmed direction

- Include **Hero → ChatGPT introduction → Research → Structure → Review → Ownership/files** in the full-height experience. Pricing, FAQ, the footer, and supporting pages retain natural height.
- Keep full-height presentations on phones where the content fits. Allow natural height when available space, enlarged text, or zoom requires it; useful detail carousels remain horizontal, with ordinary vertical page scrolling for tall content.
- Retain the scrolling, non-sticky header and the introduction's direct feature links; add ownership to those links. Do not add a persistent feature menu or dot rail.
- Play entry animation independently once per section per loaded document. Returning to a section shows its settled content immediately; a full reload resets entry memory. Hiding the tab, resizing or visiting another section must not consume unseen entrances. This reflects Josh’s post-UX07 correction.
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
- Josh requested UX01 after the planning revisions and subsequently explicitly requested UX02, UX03, UX04, UX05, UX06 and UX07. Those later requests authorize the named implementations without asserting that earlier manual reviews passed. The decisions above are settled; do not request them again or treat a copy rewrite as a prerequisite. Implement each subsequent stage when Josh requests it, then stop at its handoff for user observations.

## 2. Source baseline before UX02

The October 18 source inspection and Josh's supplied screenshot inform this plan. The screenshot demonstrates the current Review presentation; it is not evidence of scrolling, animation, or responsive behavior. No app, browser, dev server, build, automated test, or runtime check was run during planning.

| Area                 | Current owner and behavior                                                                                          | Planned treatment                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage order       | `src/App.tsx`: hero → ChatGPT introduction → product story → Pricing → FAQ; shared header/footer surround the route | Preserve this order; the first six sections share full-height layout, entry behavior, and eligible settling.                             |
| Header/navigation    | `src/components/site/SiteLayout.tsx` and its CSS Module; wrapping, non-sticky header                                | Keep the scrolling header and existing links. No persistent feature navigation.                                                          |
| Hero                 | `HomeHero.tsx`, `WorkspaceIllustration.tsx`                                                                         | Include in the full-height experience; preserve existing copy, illustration, release-derived CTA, and Explore the AI tools link.         |
| ChatGPT introduction | `AiIntroduction.tsx`; account explanation and Research/Structure/Review links                                       | Include in the full-height experience; keep all connection copy and availability qualifications visible, and add the ownership shortcut. |
| Research             | `ResearchStory.tsx`, `ResearchStory.module.css`                                                                     | Summary plus optional detail pages; retain the example conversation and source relationship.                                             |
| Structure            | Inline section and `PlanIllustration` in `ProductStory.tsx`, with `ProductStory.module.css`                         | Extract only as needed for the shared section; retain material → outline → writer revision.                                              |
| Review               | `ReviewStory.tsx`, `ReviewStory.module.css`                                                                         | Summary plus readable pages for evidence, citations/source use, and writing/repetition.                                                  |
| Ownership/files      | Inline section in `ProductStory.tsx`; currently dark green                                                          | Full-height summary and details, using pale green in the six-section alternating sequence.                                               |
| Existing motion      | `use-shape-motion.ts`; finite decorative Structure sequence                                                         | Coordinate or retire its migrated use when shared entry motion takes over; do not layer two independent entrance sequences.              |
| Global layout        | `src/index.css`; paper/green palette, global ID scroll margin, wide-screen smooth anchors                           | Preserve tokens and focus styles; reconcile anchor offsets and smooth scrolling with the new coordinator.                                |
| Illustrative content | `example-project.ts` and existing compositions                                                                      | Reuse the invented public-spaces project and visible example labels.                                                                     |
| Existing libraries   | `package.json` includes Mantine Carousel and Embla                                                                  | Inspect installed APIs before selecting an implementation; no new animation framework is required by this plan.                          |

The existing website plan records WAI01–WAI05 implementation as complete with user testing pending. This plan does not infer that those observations have since passed. Current source has separate `format`, `lint`, and `typecheck` scripts; the original plan's initial scaffold description is historical.

## 3. Information architecture and content direction

### Section scope

| Region                                          | Viewport-height summary                                                 | Entry/reveal states                                              | Automatic settling                                      |
| ----------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| Hero                                            | Yes; header and hero together fill the first viewport when content fits | Shared entry behavior; retain existing CTA and navigation        | Eligible first-screen presentation; target document top |
| ChatGPT introduction                            | Yes, when content fits                                                  | Shared entry behavior; retain account copy and feature shortcuts | Eligible settled/entering presentation                  |
| Research                                        | Yes, when content fits                                                  | Yes                                                              | Eligible summary only                                   |
| Structure                                       | Yes, when content fits                                                  | Yes                                                              | Eligible summary only                                   |
| Review                                          | Yes, when content fits                                                  | Yes                                                              | Eligible summary only                                   |
| Ownership/files                                 | Yes, when content fits                                                  | Yes                                                              | Eligible summary only                                   |
| Pricing, FAQ, footer                            | Natural height                                                          | Existing interactions                                            | No                                                      |
| Help, Downloads, policies, purchases, not-found | Natural height                                                          | Existing interactions                                            | No                                                      |

The hero and ChatGPT introduction join the same viewport, entry, and settling system. Their existing content and navigation remain directly available: preserve the hero's actual CTA and the introduction's feature shortcuts instead of adding a redundant detail layer. The four core feature sections use the Learn more reveal and optional detail carousel. Full-height inclusion does not require inventing additional content for the opening two sections.

### Existing copy to carry into the new layout

Keep the wording below as it appears in current source. Line breaks, placement, and grouping may change; sentences and meaning must not. Source takes precedence if Josh makes additional edits after this snapshot. Earlier proposed headline/subtitle replacements and word-count targets are withdrawn. Achieve a focused summary by moving whole existing content blocks into details, not by rewriting copy to fit the screen.

| Section              | Existing headline                                 | Existing introductory copy                                                                                                                                          | Illustration direction                                                                                                                       | Background                            |
| -------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Hero                 | **Research deeper. Write with conviction.**       | Explore your sources, turn your ideas into a structure, and review the strength of your writing, with AI alongside your work.                                       | Preserve the existing workspace illustration and its example text.                                                                           | Paper `--color-paper`                 |
| ChatGPT introduction | **Your ChatGPT plan. Put to work.**               | The plan: sign in with your existing ChatGPT account, allow plan use, and get back to writing.                                                                      | A restrained account-to-workspace composition using the existing document shapes, without a pretend sign-in control or new explanatory copy. | Pale sage, based on current `#e7eee4` |
| Research             | **Follow the question further.**                  | Find sources, explore disagreements and question the evidence. Keep useful references and conversations with your project.                                          | A question, a source fragment, and a retained reference connected in one spare composition; retain the full example in details.              | Paper                                 |
| Structure            | **There’s a structure in what you’ve collected.** | Find themes and gaps across selected material. Develop an AI outline with a purpose for each chapter.                                                               | Collected note/source/conversation cards arranged into a short chapter outline; retain the full example in details.                          | Pale sage                             |
| Review               | **Go beyond the red underline.**                  | A supercharged proofreader for evidence, citations and arguments, alongside spelling and grammar. Keep your voice.                                                  | One marked phrase beside its source and a restrained margin annotation; retain the full example in details.                                  | Paper                                 |
| Ownership/files      | **Your work. Your files.**                        | Write and organize offline. Save your manuscript and retained material in a portable .collie file. Local recovery and some unfinished drafts stay on your computer. | The existing `.collie` file motif with a few recognizable document forms.                                                                    | Pale sage                             |

The ChatGPT introduction also keeps these existing lines visible beside its introductory claim: **“No API keys. No separate AI token bill from Collie.”** and **“Eligible ChatGPT plan required. Your plan’s usage limits and credit settings apply. Collie pricing is separate. Customer AI access is not available yet.”** Retain the three current feature-link labels and add an ownership link using **Your work. Your files.** Update navigation/list accessible names as needed so ownership is not mislabeled as an AI tool. These direct links stay available without opening details.

Research, Structure, Review, and Ownership use **Learn more**. Give repeated buttons distinct accessible names that retain that visible phrase, such as “Learn more about research.” Preserve the hero's release-derived CTA label/destination and **Explore the AI tools** link. Do not show state names, snap percentages, or instructions about how the animation works to visitors.

Keep necessary status next to the claim: Research/Structure currently say **In development** and Review says **Planned feature**. Retain those qualifications in the summaries unless separately updated through the existing evidence process. Keep example labels next to illustrative product content. Other explanation belongs beside the relevant detail, without repeating it on every slide.

Use the established typography, document cards, source fragments, and brand palette. Summary illustrations should communicate a relationship at a glance; the current dense examples belong in details. Prefer responsive HTML/CSS and small decorative SVG elements so text stays readable and the style matches the site. Do not introduce a new mascot, stock artwork, pretend working editor, or raster screenshot full of tiny text. No new asset generation is needed during planning.

### Detail allocation using existing copy

UX01 fixes the following allocation from current source. Page names reuse existing wording. Where the wording already appears inside the page, use that element to name the page instead of adding a repeated heading. Research and Structure have two pages each, Review has three, and Ownership has one detail view without carousel controls. UX02 supplied these stable containers within long disclosures; UX05 added the layered presentation, and UX06 now supplies pagination.

| Feature         | Stable page ID          | Visible page name from existing copy          | Material                                                                                                                                |
| --------------- | ----------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Research        | `research-conversation` | **A direction to explore**                    | Existing question, answer, source link, research direction, and the distinction between a search direction and examined evidence.       |
| Research        | `research-excerpt`      | **The square at midday**                      | Selected source label, title, exact excerpt, and retained-original origin.                                                              |
| Structure       | `structure-material`    | **Selected project material**                 | The complete note, source, and conversation cards, including labels, titles, bodies, and origins.                                       |
| Structure       | `structure-outline`     | **AI proposal, refined by you**               | All chapter titles/purposes, writer's title revision, linked material, and the paragraph explaining discussion/editing and Use outline. |
| Review          | `review-evidence`       | **Possible overstatement**                    | The complete draft/source comparison, finding, and suggested wording.                                                                   |
| Review          | `review-source-use`     | **See your source use.**                      | Both existing capabilities about claim support/citation-style issues and source-use frequency, including the research link.             |
| Review          | `review-repetition`     | **Make each paragraph count.**                | Existing clarity/flow paragraph and the complete repeated-idea example.                                                                 |
| Ownership/files | `ownership-project`     | **One portable project. A place you choose.** | Existing project-file card and the full citations/export/ad-free/privacy paragraph. No thin second page is needed.                      |

Use one main idea and one example per page. Preserve context within each page; a visitor should not have to remember an essential qualification from a previous slide. Split the current Review composition rather than shrinking its text to force it into one screen. Do not replicate the entire original section in every slide.

The completed UX01 inventory below maps every current content block and link in the six sections. Illustration text stays intact in its retained composition or detail page. Relocation and grouping are in scope; deletions and editorial rewrites remain deferred until Josh reviews the implemented UX.

### UX01 content inventory — source to destination

**Source baseline:** October 18, 2026. The working tree was clean at stage start. The six headline/introductory-copy rows above match the current components. Source paths below are relative to `src/features/home/` unless stated otherwise. Selectors identify existing source blocks, not an instruction to preserve every current layout wrapper. This inventory does not change the website.

Every row has one primary content destination. Simplified summary illustrations may reuse decorative shapes or existing excerpts, but they never replace the full retained example, acquire duplicate IDs, or add focusable imitation controls. Existing repeated material across different illustrations remains intentional; do not deduplicate it by deleting a consumer. Hidden detail content must not increase the closed summary's measured height.

#### Hero — `hero`

All current hero content remains directly visible in the hero presentation; there is no Learn more layer or detail carousel here.

| Block | Current source/content                                   | Destination and preservation rule                                                                                                                                                                                                                                                |
| ----- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H01   | `HomeHero.tsx`: `.hero-heading`, `.hero-description`     | Hero title/copy; retain the H1 `hero-heading`, both headline clauses, and the entire introductory paragraph from the copy table.                                                                                                                                                 |
| H02   | `HomeHero.tsx`: release-derived button and `.story-link` | Hero actions; retain `releaseAvailability.action` and **Explore the AI tools** → `/#ai-tools`. The current source record derives **Explore Collie** → `/#how-it-works`; do not hardcode that development-only branch into the new shell.                                         |
| H03   | `WorkspaceIllustration.tsx`: `.workspace-titlebar`       | Hero illustration; preserve `exampleProject.title`, **Plan**, **Write**, and the decorative window marks. Plan/Write remain non-interactive depiction text.                                                                                                                      |
| H04   | `.chapter-outline`                                       | Hero illustration; preserve **Outline**, all three chapter titles in order, selected **Everyday encounters**, decorative numbers 01–03, and **Nonfiction book**. Keep the latter content in source; its existing phone-only visual treatment is not authorization to delete it.  |
| H05   | `.manuscript`: kicker, title, and first paragraph        | Hero illustration; preserve **Chapter 02**, `exampleProject.selectedChapter`, and all of `exampleProject.opening`.                                                                                                                                                               |
| H06   | `.manuscript`: second paragraph and context              | Preserve “A bench gives someone a reason to stay. And staying makes room for the small encounters that turn a place into a shared part of our lives.” with the existing marked phrase, and “Your writing, with its thinking close by.” The decorative rule remains non-semantic. |
| H07   | `.chapter-material`                                      | Hero illustration; preserve **Chapter material**, **For “Everyday encounters”**, **Note** with the full note text, and **Source excerpt · example** with the full source text.                                                                                                   |

**Source-specific handoff for UX02:** `WorkspaceIllustration` currently creates a `captionId` and references it from `aria-labelledby`, but renders no element with that ID and no figcaption. Name the retained figure from its existing project-title text by connecting the ID to that text; do not invent or restore a missing marketing caption. The commented hero eyebrow and unused `.development-notice`/`.development-label` CSS are not active copy. Do not restore text from historical plans simply because those classes remain. This is a source finding, not an observed accessibility result.

#### ChatGPT introduction — `ai`

All three existing paragraphs and all direct feature shortcuts stay visible. Any added account/workspace shapes are decorative and contain no new promise, sign-in button, or explanatory paragraph.

| Block | Current source/content                                                   | Destination and preservation rule                                                                                                                                                                                                                                                                                |
| ----- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01   | `AiIntroduction.tsx`: `#ai-tools` and first `.connection-copy` paragraph | Introduction title/copy; preserve both heading clauses and the entire “The plan: sign in…” paragraph in the copy table.                                                                                                                                                                                          |
| A02   | `.connection-promise`                                                    | Keep “No API keys. No separate AI token bill from Collie.” directly beside the account explanation.                                                                                                                                                                                                              |
| A03   | `.plan-qualification`                                                    | Keep the entire eligibility/usage-limits/credit-settings/separate-pricing/customer-unavailability paragraph directly visible. It does not move behind Learn more.                                                                                                                                                |
| A04   | `.ai-pillars`                                                            | Keep **Research deeper** → `/#how-it-works`, **Find your structure** → `/#shape-heading`, and **Review the substance** → `/#review-heading`; retain decorative arrows without extra focus stops.                                                                                                                 |
| A05   | New functional shortcut, using existing Ownership wording                | Add **Your work. Your files.** → `/#ownership-heading`. Set the navigation's accessible name to **Explore Collie features**; remove the redundant AI-only list label so ownership is not presented as a planned AI tool. This is a navigation label adjustment, not a rewrite of the three existing link labels. |

#### Research — `research`

| Block | Current source/content                                                    | Destination and preservation rule                                                                                                                                                                                                                                       |
| ----- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R01   | `ResearchStory.tsx`: `.section-kicker`, `#how-it-works`, `.research-copy` | Summary: **01 / Research · In development**, unchanged heading, and the entire existing introductory paragraph.                                                                                                                                                         |
| R02   | `.example-caption`                                                        | Shared detail figure caption visible on both Research pages: `exampleProject.title` and **Illustrative conversation · invented content**. Keep one caption owner above the changing content.                                                                            |
| R03   | `.research-question`                                                      | `research-conversation`: **You ask** and the complete `exampleProject.passage.text` question.                                                                                                                                                                           |
| R04   | `.research-answer`                                                        | `research-conversation`: **Research assistant · example** and the complete answer, beginning with **The square at midday** → `#research-source`, followed by “describes seating. Who stays, and whether they meet anyone, remains a question to investigate.”           |
| R05   | `.research-lead` and `.evidence-note`                                     | `research-conversation`: **A direction to explore**, “Compare research on social interaction around shaded and unshaded seating, including conflicting findings.” and “A search direction, not a source already examined.” Keep the qualification beside the direction. |
| R06   | `.selected-source`                                                        | `research-excerpt`: **Selected excerpt · example**, `exampleProject.source.title` at `#research-source`, the full source blockquote, and `exampleProject.source.origin`.                                                                                                |

The closed summary uses a spare question/source-card composition. Its full conversation remains in the two mapped detail pages. The source link deliberately selects the excerpt page; keep the complete answer on the conversation page and preserve a direct Previous route back.

#### Structure — `structure`

| Block | Current source/content                                                                       | Destination and preservation rule                                                                                                                                                                                                                           |
| ----- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S01   | `ProductStory.tsx`: Structure kicker, `#shape-heading`, first `.shape-description` paragraph | Summary: **02 / Structure · In development**, unchanged heading, and both sentences of the first paragraph from the copy table.                                                                                                                             |
| S02   | Second `.shape-description` paragraph                                                        | `structure-outline`: “Discuss or edit it, then choose Use outline. Your writing structure and chapter material stay connected.” Retain **Use outline** as descriptive text, not a website control.                                                          |
| S03   | `PlanIllustration`: `.plan-material`, all three `MaterialCard` instances                     | `structure-material`: **Selected project material** and complete Note / Source excerpt · example / Conversation passage · example cards. Each retains its title, body, and origin from `exampleProject`.                                                    |
| S04   | `.assignment-connection`                                                                     | `structure-outline`: **Find themes. Shape chapters.** with its decorative connector; it links the selected-material page conceptually to the outline.                                                                                                       |
| S05   | `.plan-structure`, `.planned-chapters`                                                       | `structure-outline`: **AI proposal, refined by you**, all three numbered chapters with complete purposes, and the selected-chapter treatment. Keep the list's **Illustrative chapter outline** name.                                                        |
| S06   | `.chapter-revision`                                                                          | Inside `structure-outline`'s selected chapter: **AI suggested: Places to meet** and **Your revised title**, followed by **Everyday encounters** and its purpose.                                                                                            |
| S07   | `.chapter-links`                                                                             | Inside the selected chapter: **Note · A reason to stay**, **Source · The square at midday**, and **Conversation · Who gets to linger?** Preserve the list name **Material linked to Everyday encounters**; these are descriptive list items, not new links. |
| S08   | `.illustration-caption`                                                                      | Shared detail figure caption across both Structure pages: **Illustrative proposal and writer’s revision · invented material**.                                                                                                                              |
| S09   | `.planning-context`                                                                          | Shared detail context below the two-page figure: “Import earlier conversations explicitly. Signing in doesn’t import history. Analysis uses selected material within size limits.” Remains visible with either selected page.                               |

The closed summary uses decorative material-card and chapter-outline shapes. The two detailed views retain all of the current board's text. The old `useShapeMotion` sequence belongs to that current board; disable its migrated use when UX02 makes the static presentation, and let UX03 own the new entrance without a second independent sequence.

#### Review — `review`

| Block | Current source/content                                                          | Destination and preservation rule                                                                                                                                                                                                                                                                                                               |
| ----- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| V01   | `ReviewStory.tsx`: `.section-kicker`, `#review-heading`, introductory paragraph | Summary: **03 / Review · Planned feature**, unchanged headline, and the entire proofreader/voice paragraph from the copy table.                                                                                                                                                                                                                 |
| V02   | `.example-caption`                                                              | `review-evidence` figure caption: `exampleProject.title` and **Illustrative review · invented content**.                                                                                                                                                                                                                                        |
| V03   | `.draft-passage`                                                                | `review-evidence`: **Draft · Everyday encounters**, the full “The square’s shaded seating brings strangers together.” quote with its existing mark, and **Cites:** with **The square at midday** → `#review-source`.                                                                                                                            |
| V04   | `.source-passage`                                                               | `review-evidence`, alongside the draft: **Supplied source excerpt**, `exampleProject.source.title` at `#review-source`, and the full source quote. Do not put the source on another Review page.                                                                                                                                                |
| V05   | `.review-finding`                                                               | `review-evidence`: **Possible overstatement**, “The excerpt describes seating, not interaction. Narrow the claim or find supporting evidence.”, **Suggested wording · for your review**, and “The square offers shaded seating beside the walking route.”                                                                                       |
| V06   | `.author-choice`                                                                | Shared detail context on all three Review pages: “You choose changes. No automatic rewriting or citation insertion.” Moving this existing note outside the evidence-only figure keeps it available while browsing the other findings.                                                                                                           |
| V07   | First `.review-capabilities` item                                               | `review-source-use`: **Give claims their support.** and the complete paragraph “Flag attribution gaps and citation-style issues. Find support in your project or continue with the research assistant.” Preserve **research assistant** → `/#how-it-works`.                                                                                     |
| V08   | Second `.review-capabilities` item                                              | `review-source-use`: **See your source use.** and “Which sources, how often, and where? Spot gaps and unused research; frequency alone isn’t overuse.”                                                                                                                                                                                          |
| V09   | Third `.review-capabilities` item                                               | `review-repetition`: **Make each paragraph count.** and “Strengthen wording, transitions and flow. Spot repeated arguments while preserving useful recaps.”                                                                                                                                                                                     |
| V10   | `.repetition-example` summary and `.example-label`                              | `review-repetition`: **Another lens: when an idea repeats** and **Illustrative repetition finding · invented passages**. At UX02–UX05 retain the native disclosure inside the long details. At UX06 show its full contents directly on this dedicated page, retaining the summary wording as a subheading so it needs no second opening action. |
| V11   | `.repeated-passages`                                                            | `review-repetition`: heading **Everyday encounters** with “Somewhere to sit without needing to buy anything.”, then **Making room for everyone** with “A welcoming space lets you sit without buying something.”                                                                                                                                |
| V12   | Final `.repetition-content` paragraph                                           | `review-repetition`: “These passages return to the same idea. Is the second a useful reminder, or could it move the argument forward by asking who still feels excluded?”                                                                                                                                                                       |
| V13   | `.review-scope`                                                                 | Shared detail context on all three pages: “Comparisons need relevant source text and context. Findings guide your judgment; they don’t certify accuracy.”                                                                                                                                                                                       |

Keep **Planned feature** visible in the detail header as well as the summary. The existing **Planned proofreading capabilities** accessible group name can label the relevant capability grouping when its items are distributed across pages; do not leave a hidden duplicate list solely to preserve the old wrapper. The summary illustration can reuse the existing marked phrase and source-card motif without the full comparison; the complete comparison stays together on `review-evidence`.

#### Ownership/files — `ownership`

| Block | Current source/content                                                | Destination and preservation rule                                                                                                                                                                                                                                                                             |
| ----- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O01   | `ProductStory.tsx`: Ownership `.section-kicker`, `#ownership-heading` | Summary: **Room to work your way** and **Your work. Your files.**                                                                                                                                                                                                                                             |
| O02   | First `.ownership-copy` paragraph                                     | Summary: the complete offline/portable-file/local-recovery paragraph from the copy table. Keeping its final sentence with the portability claim preserves the device-local distinction.                                                                                                                       |
| O03   | Second `.ownership-copy` paragraph                                    | `ownership-project`: “Add citations. Export to Word, PDF, Markdown or plain text. Permanently ad-free. AI requests send selected context to the provider.” Keep the last sentence linked to `/privacy`.                                                                                                       |
| O04   | `.project-file`                                                       | `ownership-project`: decorative **.collie**, **Why public spaces matter.collie**, **Manuscript · research · saved conversations**, and **One portable project. A place you choose.** Keep the existing filename and caption; use the caption to name this single detail view without duplicating its wording. |

The summary reuses the `.collie` file silhouette as its contextual illustration; the full labeled file card is retained in details. One detail view provides enough room for both the card and the existing export/privacy paragraph. Do not introduce Previous/Next, page counts, or filler copy for Ownership.

#### Shared example values and retained consumers

`example-project.ts` remains the single source of truth. Preserve these exact current values and every mapped consumer; copying values into a new parallel content file is unnecessary.

| Field(s)                         | Current value                                                                                                                                | Retained consumers                                                                                                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`; `filename`              | **Why public spaces matter**; **Why public spaces matter.collie**                                                                            | Hero titlebar; Research shared caption; Review evidence caption; Ownership file card.                                                                                                                 |
| `chapters[0]`                    | **A place to pause** — “Explore what makes a place inviting enough to stay.”                                                                 | Title in hero outline; title and purpose in Structure outline.                                                                                                                                        |
| `chapters[1]`; `selectedChapter` | **Everyday encounters** — “Ask when sharing a space becomes a social connection.”                                                            | Title in hero outline/manuscript/material context, Structure outline/material-list context, Review draft label and repetition comparison; purpose in Structure.                                       |
| `chapters[2]`                    | **Making room for everyone** — “Consider who feels welcome, and what still gets in the way.”                                                 | Title in hero outline, Structure outline, and Review repetition comparison; purpose in Structure.                                                                                                     |
| `suggestedChapterTitle`          | **Places to meet**                                                                                                                           | Structure's AI-suggested title before the writer's retained revision.                                                                                                                                 |
| `note`                           | **A reason to stay**; “A bench gives someone a reason to stay.”; **Personal note**                                                           | Full card in Structure material, title in Structure linked-material list, text in hero Chapter material.                                                                                              |
| `source`                         | **The square at midday**; “The square has shaded seating beside the walking route.”; **Original kept: Square observations.txt**              | Full card in Structure material and full source in Research excerpt; title in Structure material list and Research/Review source links; title/text in Review evidence; text in hero Chapter material. |
| `passage`                        | **Who gets to linger?**; “What changes when a place welcomes people who have no reason to hurry?”; **Imported conversation · saved passage** | Full card in Structure material, title in Structure linked-material list, question text in Research conversation.                                                                                     |
| `opening`                        | “A public space begins with an invitation. A patch of shade. A clear path. Somewhere to sit without needing to buy anything.”                | Full first manuscript paragraph in the hero; retain the separately authored repeated-idea quotation in Review as well.                                                                                |

### UX01 section, heading, and page identities

These are ordinary component IDs/keys for the existing React site, not a new content schema or set of routes. Keep the current public fragments working. New container/page IDs must be unique within the document; titles may reuse existing words without reusing a DOM ID.

| Order / key     | Outer section ID for UX02 | Existing heading ID      | Background / geometry                              | Detail pages in order                                       |
| --------------- | ------------------------- | ------------------------ | -------------------------------------------------- | ----------------------------------------------------------- |
| 1 / `hero`      | `home-hero`               | `hero-heading` (H1)      | Paper `--color-paper` / header-plus-hero footprint | None                                                        |
| 2 / `ai`        | `home-ai`                 | `ai-tools` (H2)          | Pale sage `#e7eee4` / own viewport minimum         | None                                                        |
| 3 / `research`  | `home-research`           | `how-it-works` (H2)      | Paper / own viewport minimum                       | `research-conversation`, `research-excerpt`                 |
| 4 / `structure` | `home-structure`          | `shape-heading` (H2)     | Pale sage / own viewport minimum                   | `structure-material`, `structure-outline`                   |
| 5 / `review`    | `home-review`             | `review-heading` (H2)    | Paper / own viewport minimum                       | `review-evidence`, `review-source-use`, `review-repetition` |
| 6 / `ownership` | `home-ownership`          | `ownership-heading` (H2) | Pale sage / own viewport minimum                   | `ownership-project`                                         |

For the four core features, reserve `{key}-summary`, `{key}-details`, and `{key}-learn-more` for the presentation regions and opener. Existing heading IDs remain on the summary headings. If a separate detail heading is needed, repeat the unchanged section title with the unique ID `{key}-detail-heading` and label the section from its active heading. Never make the active detail region rely on an inert summary title for its accessible name. The hero/AI sections need no dormant detail regions or dead controls.

At UX02–UX05, retain the allocated page contents in the same order within the native disclosure/long detail region, with stable page containers and fragment resolution. Only UX06 adds pagination. Ownership remains one page throughout. This keeps content and source links working at every stage instead of deferring link repairs until the carousel exists.

### UX01 navigation and fragment map

Section navigation must honor the chosen memory policy: on a fresh homepage visit, a section link reaches its summary; on the same visit, it locates the target section's already active presentation without closing open details or resetting its selected page. Focus the active heading after making it visible. A link to a specific source/page deliberately opens that detail page. **Back to overview** is the explicit close action. Ordinary scroll position and entry/snap events never rewrite the URL.

| Destination                                                                                              | Current callers / role                                                                                                                                            | Required handling in the new layout                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/#top`                                                                                                  | Header brand and footer wordmark                                                                                                                                  | Keep `top` on the scrolling header; align document top and focus that existing target. It does not reset other sections.                                                                                          |
| `/#hero-heading`                                                                                         | Existing H1 fragment, even without a current explicit caller                                                                                                      | Reveal/locate hero immediately and align the first-screen footprint at document top. Preserve its H1 focus target.                                                                                                |
| `/#ai-tools`                                                                                             | Header **AI tools**, hero **Explore the AI tools**, Pricing **How AI connects**, Help **Explore Collie’s planned AI tools**                                       | Show the introduction at its section boundary with all three paragraphs and four shortcuts directly available.                                                                                                    |
| `/#how-it-works`                                                                                         | Introduction **Research deeper**; Review **research assistant**; development CTA from Hero/Pricing/PlanSelection; Downloads **Explore Collie**                    | Locate Research. Fresh visit: Summary. Existing open details: keep the selected Research page and focus the active Research heading. Do not silently retarget Explore Collie to the AI introduction.              |
| `/#shape-heading`                                                                                        | Introduction **Find your structure**                                                                                                                              | Locate Structure with the same retained-presentation rule.                                                                                                                                                        |
| `/#review-heading`                                                                                       | Introduction **Review the substance**                                                                                                                             | Locate Review with the same retained-presentation rule.                                                                                                                                                           |
| `/#ownership-heading`                                                                                    | New introduction **Your work. Your files.**                                                                                                                       | Locate Ownership with the same retained-presentation rule. Make the existing heading programmatically focusable when UX02 adds the shortcut.                                                                      |
| `#research-source` / `/#research-source`                                                                 | Research answer's **The square at midday**; direct source fragment                                                                                                | Open Research, select `research-excerpt`, then reveal/focus the existing source-title target. Never leave it in a hidden page.                                                                                    |
| `#review-source` / `/#review-source`                                                                     | Review **Cites: The square at midday**; direct source fragment                                                                                                    | Open Review, select `review-evidence`, then reveal/focus the source-title target within the same draft/source comparison.                                                                                         |
| New `#home-*` section IDs                                                                                | Stable container fragments                                                                                                                                        | Treat as aliases for the corresponding section navigation above; keep the legacy heading fragments canonical in existing links.                                                                                   |
| The eight new detail-page IDs                                                                            | Stable page fragments for direct navigation                                                                                                                       | Open the owning section, select the named page once pagination exists, and focus its existing page title/content heading. Before UX06, reveal the long detail region and locate the corresponding page container. |
| `#main-content`                                                                                          | Existing skip link                                                                                                                                                | Preserve the main landmark and focus destination, without automatic settling or a forced return to the header.                                                                                                    |
| `/#pricing`, `/#faq`, `/#faq-files`, `/#faq-ai`, `/#faq-ai-usage`, `/#faq-ai-history`, `/#faq-ai-review` | Existing Pricing/FAQ headings and homepage disclosure IDs; header/footer Pricing and PlanSelection comparison link                                                | Preserve ordinary document destinations outside the six-section coordinator. Keep existing FAQ disclosures and links; do not intercept them as feature pages.                                                     |
| `/privacy`                                                                                               | Ownership provider-context sentence; footer                                                                                                                       | Retain normal route navigation and exact link wording. No feature reveal, sign-in, or provider request is involved.                                                                                               |
| Other routes and anchors                                                                                 | Header/footer Help, Downloads, Terms, Purchases and font license; Pricing offers, download/restore links; FAQ **All questions and getting started** → `/help#faq` | Preserve existing owners, labels, guarded destinations, and normal navigation. The homepage coordinator must release all listeners when its route unmounts.                                                       |

Resolve initial and changed fragments after the target content mounts. A same-page hash change must not remount the homepage wrapper or erase per-section state. For section-level links, align the outer footprint and then focus the active heading without a second heading-offset scroll. For source/page links, reveal/select before aligning the inner target. Preserve ordinary modified-click/open-in-new-tab behavior; a new document has fresh state and resolves its fragment explicitly. Browser history restores location without an additional automatic correction.

### UX01 viewport and presentation map

**Geometry for UX02, reused by UX04:** use one settled viewport-height basis `H` for both CSS sizing and alignment decisions. Use `100dvh` when available with `100vh` as the fallback; actual mobile/browser behavior remains user-owned acceptance. Header measurement `B` includes its current wrapping content, padding, and border. Do not hardcode its present 6.75rem/5.75rem minimum as its actual height.

- Hero outer minimum block size is `max(0, H - B)`, with its own padding included in that size. Its content may make it taller. Its registered first-screen footprint runs from document top through the hero's bottom, including the existing header. In a fitting layout the footprint is `H`; in a constrained layout it grows naturally.
- Each of the other five outer sections has a minimum block size of `H`, including padding. Their inner content uses the site's existing content-width/gutter system. Outer surfaces cover the page width; inner content width must not restrict the alternating backgrounds.
- The first screen is paper, followed by pale sage, paper, pale sage, paper, pale sage. Keep the header on the first paper surface and in normal flow. A shared pale-surface token can replace the repeated `#e7eee4` literal without changing the color. No fixed/persistent-navigation offset exists.
- Count safe-area padding inside the footprint; do not add it a second time to the viewport target. Hidden details and translated decorative layers do not contribute to closed-summary sizing. Preserve visible focus outlines when clipping horizontal reveal decoration.
- When content exceeds the viewport, allow natural page height and exclude that footprint from automatic settling. Check the rendered footprint, not a width-only device category. Long current headlines/paragraphs are retained; do not shrink fonts, truncate text, or move required introductory qualifications out of view to force a fit.
- For future fit/alignment comparisons, allow only a small rounding tolerance (initially 2 CSS px). The 10% capture band is a different setting; it must not be used as permission to snap a section whose content is 10% taller than the screen.
- Font/layout changes, header wrapping, orientation, toolbar changes, and zoom invalidate geometry and cancel a pending correction. Recompute against the next stable layout; a resize alone never initiates a snap. Keep the static/natural-flow fallback when measurements or enhancement APIs are unavailable.
- Override the existing global 1.5rem ID scroll margin only as necessary for these section destinations. Do not remove comfortable inner-source or supporting-page offsets globally. The explicit section-navigation path and UX04's alignment path must agree on the same section boundary.

**State ownership for UX03–UX06:** retain one entry flag per section and one detail/open/page record per core feature for the lifetime of the homepage wrapper. Do not key that wrapper by fragment or scroll position. No persistent storage or new URL state is needed.

| Situation                                                                            | Required presentation / navigation result                                                                                                                                                        |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fresh homepage at top                                                                | Hero usable immediately; one short entrance only if it can start without hiding visible content. Introduction/features may arm while offscreen. No initial automatic snap.                       |
| First ordinary approach to another fitting section                                   | Enter around 60% visibility, once. Idle settling is separately eligible only within the 10% band, with departure protection.                                                                     |
| Scroll back to a visited section                                                     | Keep its settled summary or its open details/selected page. Do not replay entry, blank it, or reset a carousel.                                                                                  |
| Learn more                                                                           | Open the feature's retained page, initially its first mapped page; cancel pending settling and transfer focus deliberately.                                                                      |
| Back to overview                                                                     | Close that feature, restore its opener, and retain its page selection for reopening during the same visit.                                                                                       |
| Section shortcut to a feature already open                                           | Locate its retained detail presentation and active heading; do not equate navigating to a section with closing it.                                                                               |
| Source or detail-page fragment                                                       | Open/select that explicit destination, overriding only the target feature's selected page. Expose/focus it without entrance delay or an automatic snap.                                          |
| Scroll into Pricing/FAQ and return                                                   | Keep all per-section entry/detail/page state; these destinations are still on the homepage.                                                                                                      |
| Leave homepage / fresh homepage mount                                                | Release the coordinator and ephemeral state. A new mount starts from summaries unless its fragment explicitly opens details. Do not defeat browser scroll restoration with a pending correction. |
| Reduced motion, forced colors, oversized content, or unavailable enhancement support | Render readable static content; preserve real navigation/disclosures. Reduced motion disables automatic settling; oversized sections remain ordinary document flow.                              |

**Boundary of this completed stage:** this content/geometry map is ready for UX02. No six-screen layout, new shortcut, corrected figure label, motion, snapping, reveal, or carousel has been implemented by UX01. Those changes belong to their named code stages and still need their required code checks and Josh's runtime observations.

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

| State         | Appearance                                                                                   | Entry/exit rule                                                                                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Waiting**   | Only the alternating background is visually present.                                         | An unvisited, offscreen section may be armed for entry after the enhancement is ready. Never leave initially visible, focused, restored, or unsupported content waiting indefinitely. |
| **Entering**  | Headline/copy, illustration, and action arrive in a short coordinated sequence.              | Trigger around 60% visibility, or immediately on a deliberate navigation/focus request. Finish as Summary.                                                                            |
| **Summary**   | Existing title/introductory copy, illustration, necessary status, and the section's actions. | Remains stable while reading. Learn more opens details for the four core features; the hero and introduction retain direct navigation.                                                |
| **Revealing** | The colored summary surface and its contents slide aside together, exposing details beneath. | A short transition initiated only by Learn more; finish as Detail.                                                                                                                    |
| **Detail**    | One detail page with Back to overview and, when useful, carousel controls.                   | Visitors can browse horizontally or scroll onward vertically at any time.                                                                                                             |
| **Returning** | The summary surface returns over the detail layer.                                           | Explicit Back to overview; finish as Summary with focus restored.                                                                                                                     |

Prefer a small explicit presentation state plus `hasEntered` and selected slide ownership. Do not represent every combination with unrelated booleans that can leave both layers active. Entry visibility, document settling, and horizontal slide selection have separate responsibilities.

### 4.3 Entry choreography

The current trigger is **60% of the smaller of the section height and visible viewport**. This starts the presentation; it does not move the page. A section can become Summary at 60% visibility without ever becoming eligible to snap.

Intersection Observer signals visibility changes; a passive document-scroll listener coalesced into one pending animation frame supplies the viewport-relative threshold for tall sections. Oversized sections can animate on first entry while remaining ineligible for automatic vertical settling. See [MDN's Intersection Observer documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Initial art direction, to be tuned from Josh's observations:

| Group                           | Proposed movement                                                           | Starting timing                     |
| ------------------------------- | --------------------------------------------------------------------------- | ----------------------------------- |
| Feature label and headline      | Short upward arrival, approximately 16–24 px, with opacity                  | About 420 ms, starting immediately  |
| Subtitle                        | Same direction with a smaller offset                                        | About 360 ms, starting 60 ms later  |
| Illustration                    | A restrained horizontal arrival or assembly of its existing document shapes | About 500 ms, starting 80 ms later  |
| Section action or feature links | Small upward arrival and opacity                                            | About 300 ms, starting 120 ms later |

The whole entrance should settle in roughly 600 ms. Use a smooth deceleration without bounce, overshoot, letter-by-letter animation, or a long delay before the action appears. Buttons must respond immediately if focused or activated during entry.

Give each section a related illustration gesture: the hero workspace settles into place, the ChatGPT introduction connects account/workspace shapes, references connect in Research, material aligns into an outline in Structure, a margin annotation resolves in Review, and document forms gather around the project file in Ownership. Keep title/copy behavior consistent. Animate a small number of transform/opacity layers, not every word or every card independently.

Entry plays independently once per section per loaded document, including the hero and ChatGPT introduction. Reloading resets the in-memory entry record; homepage remounts within the same document retain it. Offscreen pending sections stay pending through other sections’ transitions, resize and tab visibility changes. Returning up the page does not erase content and start over. Leaving during entry resolves to a readable settled state. There is no continuous animation after entry and no animation tied to every pixel of scrolling.

On a fresh top-of-home load, the hero may start its one short entrance immediately when the enhancement is ready; do not first hide a visibly rendered hero or wait for a scroll threshold. Its CTA and the header remain usable. If that entrance cannot start without a hide/reveal flash, show the settled hero and count it as entered. Fragment/history restoration uses the settled path, and a hero encountered later after a deep initial link follows the same once-per-document rule.

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
- Feature-level links locate the target section's retained active presentation; a fresh visit starts at its summary, while an already open detail view keeps its selected page. This preserves the confirmed open-detail policy instead of treating a section shortcut as an implicit close. A fragment inside a detail page first reveals the owning feature and selects the correct page, then aligns/focuses the actual target. This applies to direct loads and hash/history changes, including the Review-to-Research link and source links. Follow the UX01 navigation map in Section 3.
- Preserve existing links from other routes. Handle initial fragments after route content is mounted; do not rely on the browser finding a target that is still hidden. Use the existing routing/navigation conventions rather than replacing the router.
- Learn more, Back to overview, and carousel clicks need not create browser-history entries by default. Explicit fragment links retain normal history semantics. Automatic entry/snap changes never push history or rewrite the URL. Returning via browser history must not replay a pending correction over restoration.
- Reduced motion shows the settled summary immediately, opens/closes details without a large moving sheet, changes slides without animated travel, and disables automatic vertical settling. A preference change during motion cancels it into the intended readable state.
- Forced colors uses visible text, borders, controls, and focus without relying on background hues or decorative masks. A static presentation is an acceptable fallback.
- A blank Waiting appearance is only a visual enhancement for ready, eligible sections. Missing animation/observer support must not make summaries or Learn more inaccessible. The current app is client-rendered: this plan does not claim a new no-JavaScript homepage. Preserve its existing no-script message.
- Browser Find is guaranteed only for exposed content under the default collapsed presentation. Do not claim it searches inert/unmounted detail slides. If whole-story Find is required, decide on an explicit readable-all mode before adding it; do not silently make hidden controls focusable to approximate search support.
- Cleanup observers, timers, media-query listeners, route listeners, and animation frames when the homepage unmounts. Handle React development effect cleanup without duplicate listeners. Switching routes must leave the shared document's scrolling behavior intact.

## 5. Implementation ownership

Keep this a small website feature, with explicit responsibilities and no generalized presentation engine.

| Implemented owner                                                                                   | Responsibility                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/features/home/FeatureSection.tsx`, CSS Module and `use-feature-reveal.ts`                      | Shared layout/entry registration; optional summary/detail presentation, reveal/return, and focus transfer. Support opening sections without inventing detail layers, and preserve the hero's H1.                                                                                                |
| `src/features/home/section-entry.ts`                                                                | Offscreen arming, entry visibility, once-per-visit policy, preference changes, and cleanup.                                                                                                                                                                                                     |
| `src/features/home/section-settling.ts` with `section-geometry.ts`                                  | Single homepage coordinator for all six registered sections, header-plus-hero geometry, input completion, departure protection, cancellation, and one alignment correction.                                                                                                                     |
| `src/features/home/FeatureDetails.tsx` and CSS Module                                               | Detail navigation, selected page, horizontal presentation, and accessible carousel behavior. Implemented in UX06.                                                                                                                                                                               |
| `HomeHero.tsx`, `AiIntroduction.tsx`, `ResearchStory.tsx`, `ProductStory.tsx` and `ReviewStory.tsx` | Preserved section-owned copy, illustrations, actions/navigation, optional detail content, and stable fragment targets.                                                                                                                                                                          |
| `HomeSequence.tsx` composed in `src/App.tsx`                                                        | Enclose Hero, ChatGPT introduction, and `ProductStory` under one coordinator. `ProductStory` alone cannot own the sequence because the opening two sections sit outside it. Keep the shared header in its existing owner and measure its first-screen footprint without affecting other routes. |
| `example-project.ts`                                                                                | Existing illustrative project content; do not create a second competing example dataset.                                                                                                                                                                                                        |
| Existing header/intro/global CSS owners                                                             | Scrolling-header geometry, direct feature navigation including ownership, and genuine shared tokens only.                                                                                                                                                                                       |

These are the implemented ownership boundaries; optional extractions were not needed. Prefer typed props and ordinary React composition over a JSON-driven page schema. Use stable feature/page IDs, derive state that can be derived, and keep scroll sampling out of React render state unless it changes visible UI.

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

**Status: documentation implementation complete — awaiting user testing (content-map review).** The source-to-destination inventory, eight detail-page allocations, section/heading identities, navigation map, viewport rules, and presentation-state map are recorded in Section 3. This completion does not implement UX02's UI or establish runtime acceptance.

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

**Status: implementation complete — awaiting user testing.** The six-section static layout, native feature disclosures, preserved copy, and fragment navigation are implemented. Required checks passed; rendered layout and interaction acceptance remain pending. See the dated record below.

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

**Status: implementation complete — awaiting user testing.** Once-per-visit entry, feature illustration gestures, navigation/focus overrides and static fallbacks are implemented. Required code checks are clean; motion comfort and browser/accessibility behavior remain unobserved. UX02 layout observations are still pending; Josh explicitly authorized this stage.

**Outcome:** summary content arrives deliberately without delaying navigation or reading.

**Dependencies:** UX02's stable geometry and user layout observations, or explicit authorization to proceed with documented pending observations. **Likely files:** section shell/CSS, entry hook, summary illustration owners, and the static Structure illustration (the obsolete `use-shape-motion.ts` hook was removed in UX02).

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

**Status: implementation complete — awaiting user testing.** Near-boundary settling, persistent departure protection, cancellable alignment and interaction exclusions are implemented. Required code checks are clean. Josh explicitly authorized UX04 with earlier layout/motion observations still pending; scroll-feel acceptance remains user-owned.

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

**Status: implementation complete — awaiting user testing.** Layered reveal/return, focus and interruption handling, retained details, fragment navigation and settling exclusions are implemented. Required checks are clean. Josh explicitly authorized UX05 while earlier user observations remain pending; rendered motion and accessibility acceptance remain user-owned.

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

**Status: implementation complete — awaiting user testing.** Research/Structure/Review pagination, named controls and pages, retained selection, source-fragment routing and natural-height layout are implemented. Required code checks are clean; browser, touch and accessibility observations remain pending.

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

**Status: implementation complete — awaiting user testing.** Integrated source review, interruption/focus corrections, documentation reconciliation and the consolidated manual guide are complete. Required check results are recorded below. No browser/device findings have been supplied; visual tuning and user-confirmed acceptance remain pending.

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

| Stage | Implementation                        | Required checks                                              | User acceptance                                            |
| ----- | ------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| UX01  | Documentation implementation complete | Format/lint/typecheck not run; documentation-only exemption  | Awaiting content-map review; no runtime acceptance claimed |
| UX02  | Implementation complete               | `npm run format`, `npm run lint`, `npm run typecheck`: clean | Awaiting layout/navigation observations                    |
| UX03  | Implementation complete               | `npm run format`, `npm run lint`, `npm run typecheck`: clean | Awaiting motion/navigation/accessibility observations      |
| UX04  | Implementation complete               | `npm run format`, `npm run lint`, `npm run typecheck`: clean | Awaiting scroll-feel and interruption observations         |
| UX05  | Implementation complete               | `npm run format`, `npm run lint`, `npm run typecheck`: clean | Awaiting reveal/focus/navigation observations              |
| UX06  | Implementation complete               | `npm run format`, `npm run lint`, `npm run typecheck`: clean | Awaiting pagination/touch/focus/navigation observations    |
| UX07  | Implementation complete               | `npm run format`, `npm run lint`, `npm run typecheck`: clean | Awaiting integrated manual review                          |

Append a compact dated record per requested stage: approved decisions, changed paths, actual format/lint/typecheck results, unverified behavior, tailored user guide, and subsequently supplied observations. Keep these fields separate. No stage advances automatically.

**October 18 planning record:** created this document from the user's brief, supplied Review screenshot, current website source/configuration, and existing website planning context. Consulted the primary browser/accessibility references linked at the relevant design decisions. All interaction timings and layout proposals remain unimplemented and unobserved. No application code or existing copy was changed. Documentation-only work requires no format/lint/typecheck commands.

**October 18 decision revision:** incorporated Josh's six recorded responses and removed the completed clarifying-questions section. Expanded the full-height sequence to include Hero and ChatGPT introduction; retained natural-height overflow on constrained screens, the scrolling header with direct feature links, one-time entrances, and preserved open details/slide selection during a homepage visit. Withdrew proposed copy replacements and deferred editorial changes until Josh reviews the implemented experience. Updated geometry, ownership, stages, and manual guides accordingly. Only this planning document changed; no implementation stage, code checks, or runtime testing was performed.

### UX01 — October 18, 2026 — documentation implementation complete

**Authorization and scope:** Josh requested review of this plan and implementation of UX01. Read the full plan, current six-section source, shared illustrative data, homepage/header/figure styles, inbound fragment links, release-action derivation, and relevant existing website-plan records. The source tree was clean at the start. No local/ancestor website `AGENTS.md` was found; the supplied standing instructions govern this stage. Only `ux-improvement-plan.md` changed. UX02–UX07 remain unstarted.

**Delivered:**

- A source-to-destination inventory covering the hero, all ChatGPT introduction copy/navigation, Research, Structure, Review, Ownership, and every consumed shared example value. Current headlines/introductory paragraphs match the source snapshot. No marketing copy is rewritten or discarded.
- A finalized allocation of two Research pages, two Structure pages, three Review pages, and one Ownership detail view. The single Ownership page avoids an unnecessary carousel; all page names use existing text. Caption and qualification placement remains explicit across paginated content.
- Stable section, heading, detail-region, opener, and page identities; a map for current fragment links and direct source/page navigation, including links arriving from supporting routes. Section shortcuts retain already open details and their selected page, consistent with the confirmed state policy.
- Concrete header-plus-hero geometry, full-width alternating surfaces, viewport/overflow rules, and one-time-entry/open-detail ownership. The map separates initial fragment resolution, ordinary scrolling, explicit detail controls, and future idle settling.
- A narrow UX02 handoff for the hero figure's unresolved `aria-labelledby` reference, to be connected to existing title text without adding marketing copy. No code fix or runtime result is claimed here.

**Command outcomes:** `npm run format`, `npm run lint`, and `npm run typecheck` were **not run** because this stage changed documentation only. Source and Git-diff inspection were used to review the document; they are not passed runtime tests. No automated tests, builds, app/dev-server launches, browser automation, screenshots, or runtime probes were performed.

**Manual review for Josh — no app launch needed:**

1. Read **Existing copy to carry into the new layout** and **UX01 content inventory**; expect your current six-section copy, every example/caption, and required qualifications to have explicit retained destinations.
2. Read **Detail allocation using existing copy** and **UX01 navigation and fragment map**; expect the 2/2/3/1 detail arrangement, working source-target plans, and section shortcuts that preserve open details.
3. Read **UX01 viewport and presentation map**; expect the scrolling header and hero to share the first viewport, five subsequent full-height presentations when they fit, natural overflow on constrained screens, one-time entrances, and retained detail state.

**Acceptance:** implementation complete — awaiting user testing, which for UX01 means document/content-map review. User results have not been supplied. Actual fit, scroll comfort, motion, focus, and carousel behavior remain unimplemented and unobserved until later stages. Existing WEB/WAI, product/provider, release, commerce, and publication gates are unchanged. Stop here; do not begin UX02 automatically.

### UX02 — October 18, 2026 — implementation complete

**Authorization and scope:** Josh explicitly requested UX02 after UX01. Read the plan and current source; preserve the existing UX01 document edits and all current marketing/example copy. This later-stage authorization does not establish UX01 acceptance. Implement only the static presentation and its necessary working navigation; UX03–UX07 remain unstarted.

**Delivered and changed paths:**

- `src/features/home/FeatureSection.tsx` and its CSS Module provide a shared semantic section, stable IDs, paper/sage surfaces, viewport minimum heights, responsive spacing, and natural overflow. The four core features use native disclosures styled as **Learn more**, with **Back to overview** at the top and bottom of expanded details. Closing explicitly restores focus to the opener; browsing to other sections preserves open details.
- `HomeSequence.tsx` and its CSS Module, mounted by `src/App.tsx`, own the six-section sequence. Actual header border-box measurement, including wrapping, sets the hero's remaining viewport minimum. CSS uses `100dvh` with `100vh` fallback. The header stays in normal document flow; Pricing, FAQ, footer and supporting routes retain their owners.
- `HomeHero.tsx`, `AiIntroduction.tsx`, `ResearchStory.tsx`, `ProductStory.tsx`, `ReviewStory.tsx` and their CSS Modules migrate the existing copy and examples. The introduction keeps all three paragraphs directly visible and adds **Your work. Your files.** to the existing shortcuts, labelled **Explore Collie features**. The eight mapped detail containers now exist in normal document flow, with the Review repetition disclosure nested inside its allocated region.
- `FeatureIllustration.tsx` and its CSS Module add static, decorative account/workspace, source, outline, review and file compositions. `WorkspaceIllustration.tsx` names the retained hero figure from its existing project-title text. No new marketing prose or provider claims are introduced.
- Homepage fragment handling opens ancestor disclosures before source/page navigation; section links align full section boundaries or locate retained open details. In this native-disclosure stage an already open feature focuses its disclosure control. Initial fragments, repeated same-fragment clicks, and hash changes are handled; native anchors retain URL/history ownership and modified-click behavior. Back/Forward expose hidden targets while leaving positional restoration to the browser. All observers/listeners and pending animation-frame work are cleaned up on unmount. No frame loop, gesture interception, idle correction, or entry animation is added.
- Remove the unused `use-shape-motion.ts` and obsolete Structure animation CSS. Update `README.md` to describe the implemented static layout and navigation. Required repository formatting also normalizes line wrapping in `src/pages/Help.tsx`, `src/pages/Privacy.tsx`, and `index.html`; their copy and behavior are unchanged. The plan's inventory tables were formatted without discarding UX01 edits.

**Command outcomes:** `npm run format`, then `npm run lint`, then `npm run typecheck` completed successfully with no warnings/errors on the final code. Formatting scope was inspected first; dependencies, lockfile, generated assets and historical tests were not rewritten. Source/diff review, including the React best-practices checklist, is not runtime acceptance. No tests or testing code, builds, dependency audits, app/dev-server launches, browser automation, screenshots, or runtime probes were performed.

**Remaining observations and boundaries:** full-height fit, responsive wrapping, touch/browser behavior, native disclosure focus, deep links, restored scroll positions, reduced-motion and forced-color presentation need Josh's observations. Long open details intentionally expand the document; this is the UX02 precursor to UX05's reveal and UX06's pagination. UX03 entry motion and UX04 automatic settling are absent. Existing global smooth anchors outside the six-section navigation retain their previous behavior; explicit feature alignment is immediate. The existing release, AI availability, purchase, publication and desktop gates remain unchanged.

**Manual guide for Josh — user-operated setup and observations:**

1. From this repository, run `npm run dev` and open the address Vite prints. At a roomy desktop size, scroll from the top: expect the non-sticky header and hero to share the first viewport when their content fits, followed by five full-height presentations in paper/sage alternation. Pricing, FAQ and the footer keep natural heights. Ordinary scrolling should have no entry animation or automatic snapping.
2. Activate the hero CTA and **Explore the AI tools**, then each of the introduction's four shortcuts. Expect the actual development CTA to reach Research, the introduction to show all existing account/availability copy, and each shortcut to reach its correct feature. Open **Learn more** in each core feature: expect its existing example and full wording in an expanding document. Close using either **Back to overview** control: expect the summary and a visible, focused opener.
3. Leave Research open, scroll to another section, then use the Research shortcut or Review's **research assistant** link. Expect Research to remain open. In Research and Review, activate **The square at midday** source links: expect the source title to be visible and focused. Directly open `/#research-source`, `/#review-source`, `/#structure-outline` and `/#ownership-project` using your local origin: expect the owning disclosure to open before the target is located. Close and repeat a same-fragment link; expect its target to reopen. Use Back/Forward: expect native restoration without an extra alignment correction.
4. Reload at the top and use Tab, the skip link, and Enter/Space on disclosures: expect visible focus, a usable main-content skip, and reachable feature details. Open Review's **Another lens: when an idea repeats**: expect both passages and the existing question. Visit Help or Privacy and return: expect normal routes and a fresh homepage disclosure state.
5. Narrow/shorten the window and use 200% zoom; expect wrapping, readable unchanged text, accessible actions and ordinary vertical overflow wherever a section cannot fit one screen. Enable reduced motion or forced colors if available: expect static, readable content and discernible controls.

**Acceptance:** implementation complete — awaiting user testing. No runtime observations or user-confirmed acceptance are recorded. Stop for Josh's layout/navigation results; do not begin UX03 automatically.

### UX03 — October 18, 2026 — implementation complete

**Authorization and scope:** Josh explicitly requested review of this plan and implementation of UX03. Preserve the existing uncommitted UX01/UX02 work and current copy. This request authorizes proceeding with the recorded pending UX02 observations; no user-confirmed layout acceptance is inferred. Only entry choreography and its necessary interruption/fallback paths are added. UX04–UX07 remain unstarted.

**Delivered and changed paths:**

- `src/features/home/section-entry.ts` provides one controller for the homepage visit, integrated into `HomeSequence.tsx`. Each section progresses from an eligible offscreen **Waiting** presentation through **Entering** to terminal **Summary**. No settled section is re-armed during the visit. Intersection Observer signals visibility; the controller checks roughly 60% vertical coverage and actual fit using the shared CSS viewport basis and the header-plus-hero footprint. There is no scroll listener, gesture interception, animation frame loop, scroll correction or persistent storage in the entry controller.
- `FeatureSection.module.css` supplies the shared transform/opacity rhythm: headline 420ms, subtitle 360ms after 60ms, illustration 500ms after 80ms, and actions 300ms after 120ms. One decorative accent group per feature uses 360ms after 160ms. The nominal maximum is 580ms; an 800ms timer resolves to Summary if the final illustration animation event does not arrive. These are starting values, not measured comfort results.
- `FeatureSection.tsx`, `HomeHero.tsx`, `AiIntroduction.tsx` and `WorkspaceIllustration.tsx` identify the existing content groups without rewriting copy. `FeatureIllustration.tsx` adds a transformable wrapper and restrained grouped accents: account connection, reference lens, outline connection, review annotation and gathering document. The hero workspace settles as a whole. The fresh, fitting top-of-page hero starts fully opaque, including its CTA, so entry never first hides already visible content. The header stays outside the effect.
- `HomeSequence.module.css` exposes the same viewport basis as a resolvable minimum block size for fit checks. Oversized content, including the combined header/hero footprint, stays static and naturally scrollable. Resize/toolbar/font-layout changes end active entry and settle affected visible or oversized sections; resizing does not itself start choreography.
- Native disclosures remain intact. Focus, pointer activation, clicks, disclosure toggles and fragment navigation settle the relevant section immediately. The navigation owner signals readiness before its existing alignment/focus path, including source links into details. Animation cancellation and departure during entry finish in Summary. Scrolled/history-restored loads and restored pages use the static path; direct initial fragment destinations and already visible non-hero content remain readable. Other eligible offscreen sections on a fresh fragment visit may still enter when encountered.
- Reduced motion, forced colors, missing observer/media APIs, setup errors and update errors retain/restore readable static content. CSS applies hidden/animated appearances only when motion is allowed and the section lacks focus. A preference change to a static mode, a hidden document or pagehide settles the visit; reversing the preference does not replay it. Homepage unmount clears observers, event listeners and completion timers. No inactive DOM, hidden accessibility tree, delayed action admission or new animation dependency is introduced.
- `README.md` now describes the implemented entry behavior and fallbacks. This plan records implementation separately from user observations. Existing UX02 native disclosure controls, copy, route owners, Pricing/FAQ/footer, release/commerce/provider records and sibling desktop source remain unchanged by UX03.

**Command outcomes:** `npm run format`, then `npm run lint`, then `npm run typecheck` completed successfully with no warnings/errors on the final code. The existing script/ignore scope was inspected before formatting; no test, vendor or generated files were added to that scope. React best-practices and source/control-flow review were applied, without treating inspection as runtime acceptance. No test code, tests, builds, dependency audits, app/dev-server launches, browser automation, screenshots, benchmarks or runtime probes were added or run.

**Unverified behavior:** rendered timing/gesture quality, 60% entry comfort, fast-scroll interruptions, keyboard/screen-reader focus, mobile toolbar changes, history restoration, reduced motion and forced colors still need Josh's observations. An oversized, restored, interacted-with or accessibility-fallback section intentionally skips entry. Native detail expansion remains until UX05; automatic settling remains UX04 work, and pagination remains UX06 work.

**Manual guide for Josh — user-operated setup and observations:**

1. From this repository, run `npm run dev`, open the address Vite prints and reload at the bare homepage URL with motion allowed. On a roomy viewport, expect the fitting hero to make a short, fully visible entrance with immediately usable actions and header. Scroll normally into the introduction and each core feature: expect eligible new sections to enter near 60% visibility, with coordinated text/action timing and a restrained illustration gesture. The page must not automatically align or resist scrolling.
2. Scroll back through sections already seen, then reload and cross sections quickly or reverse direction mid-entrance. Expect settled content on return, no replay, no lingering animation and no persistent blank section after departing an entrance.
3. Use Tab to reach a waiting section, follow all four introduction shortcuts, or open **Learn more** promptly during entry. Expect immediate readable content and usable controls without waiting for animation completion. Open `/#research-source` or `/#review-source` directly: expect the owning details and source to be visible and focused. Browse away and back within the homepage: expect open details to remain open.
4. Enable reduced motion before reloading, and change the preference during an entrance if your system allows. Expect complete static content with no delayed reveal. If available, try forced colors and switch tabs mid-entrance: expect readable content on return; disabling the preference again must not replay settled sections during that visit.
5. Use a short/narrow window or 200% zoom, then resize during entry. Expect oversized sections to remain static, all text/actions to remain reachable through normal scrolling, and resizing to end active movement. Try browser Back/Forward and returning from Help: expect readable destinations and no leftover homepage motion controller on other routes.

**Acceptance:** implementation complete — awaiting user testing. No runtime results or user-confirmed acceptance have been recorded. Stop for Josh's observations before UX04.

### UX04 — October 18, 2026 — implementation complete

**Authorization and scope:** Josh explicitly requested review of this plan and implementation of UX04. Preserve all prior uncommitted UX work and current copy. This request authorizes the named stage with earlier layout/motion observations still pending; it does not establish their acceptance. UX05–UX07 remain unstarted. No copy, feature disclosure layout, route destinations, pricing/release/provider records or desktop source was changed.

**Delivered and changed paths:**

- `src/features/home/section-settling.ts` owns a single homepage correction controller. All six section footprints participate; only the dominant, viewport-fitting summary in an entered/entering or static presentation can qualify, within the 10% capture band and beyond the 2px alignment tolerance. An open dominant detail region is ineligible. Smaller trailing details or offscreen open panels do not disable another dominant summary. Pricing/FAQ/footer are never registered destinations.
- Departure protection is stored independently of an individual input episode. When an episode begins at an aligned section, that section remains excluded across repeated small gestures and pauses. Crossing exact alignment while continuously approaching is not mistaken for leaving an already settled section. The destination re-arms after movement outside the band and a return, a deliberate reversal toward it, or explicit section navigation. Interrupting a correction also protects its unfinished destination from immediate recapture.
- Native document `scrollend` is feature-detected and required where supported. All paths require roughly 200ms with no new relevant input or movement, no held pointer/touch/scrolling key, and two stable frame samples before deciding. The fallback without `scrollend` uses the same quiet/position conditions. A decision consumes the episode even if it produces no correction; unrecognized or ambiguous input leaves ordinary scrolling alone.
- A single 280ms cubic ease-out performs immediate per-frame scroll writes. `behavior: 'instant'` explicitly bypasses the existing global smooth-anchor rule, so frames do not enqueue browser smooth scrolls; no global CSS override is left behind. Controller-originated positions and consumed episodes prevent scroll/scrollend loops. No persistent frame loop, vertical CSS snap, wheel cancellation, body scroll lock or horizontal input conversion is added.
- Wheel, pointer/touch and scrolling-key observations remain passive/native. New input, navigation, focus, disclosure toggles, selection, hidden tabs, window blur, page lifecycle events, preference changes or geometry changes cancel pending/running correction. Held gestures cannot trigger an idle correction. Reduced motion, forced colors, unsupported required APIs, pinch zoom/visual offsets, font loading, visible focused controls, nested scrollers and oversized sections use ordinary scrolling. Normal VisualViewport scroll notifications are distinguished from actual visual-offset/scale changes.
- `section-geometry.ts` centralizes the CSS viewport basis, 2px fit tolerance, visible coverage and section boundary. Hero geometry includes the scrolling header and always targets document top. `section-entry.ts` now uses these same measurements instead of a second fit calculation; its once-per-visit choreography remains independent of settling. ResizeObserver, window/visual viewport events and font completion invalidate pending work rather than initiating correction.
- `HomeSequence.tsx` creates/disposes the controller and explicitly cancels it before existing fragment reveal/alignment/focus handling. Section navigation also re-arms that destination's departure record. History restoration, source links, initial fragments, skip/FAQ/Pricing navigation and explicit disclosure returns do not themselves authorize a snap. Unmount removes all listeners/observers and cancels timers, stability frames and motion frames.
- `README.md` and this plan describe the implementation, fallbacks, starting constants and pending user observations. No dependency, test harness, diagnostic UI, benchmark, tuning panel or test-only hook was added.

**Command outcomes:** `npm run format`, then `npm run lint`, then `npm run typecheck` completed successfully with no warnings/errors on the final code. Existing scripts and formatter scope were inspected before use; no broad exclusions or diagnostic suppressions were added. Source/control-flow inspection is not runtime acceptance. No tests, builds, audits, app/dev-server launches, browser automation, screenshots, gesture simulations or runtime probes were run.

**Unverified behavior and limitations:** comfort with actual wheel/trackpad momentum, cancellation latency, touch and scrollbar event delivery, browser scroll restoration, mobile toolbar changes, keyboard behavior and fallback pause detection require Josh's observations. Native input origin/completion cannot always be inferred; those cases intentionally skip correction. The 10% band, 200ms quiet interval and 280ms movement are initial tuning values, not measured results. UX05's layered reveal and UX06's carousel remain unimplemented; native disclosures continue to expand the document.

**Manual guide for Josh — user-operated setup and observations:**

1. From this repository, run `npm run dev` and open the address Vite prints with motion allowed and a viewport large enough for the summaries to fit. Approach the introduction or a feature from outside its capture band and stop roughly 5–8% short of alignment: expect one small correction only after scrolling/momentum ends. Repeat with a small overshoot during one continuous approach. Return toward Hero from below: expect an eligible correction to restore the header and hero together at document top.
2. Stop around 20% or halfway into the next section: expect the page to stay where you stopped. Scroll quickly across several sections: expect freedom to pass them without an enforced stop.
3. From an aligned section, make several small forward scrolls separated by pauses: expect continued departure without being pulled back. Move outside its 10% band and approach again, or deliberately reverse toward it: expect near-boundary settling to become eligible again.
4. During a correction, scroll either direction, press a scrolling key, touch/drag if available, or activate a link: expect the correction to stop and your normal input to take effect. Hold a scrolling key or touch gesture: expect no correction while it remains held. Mouse/trackpad, keyboard, touch and scrollbar navigation should stay native; ambiguous browser gesture signals may produce no settling.
5. Open a feature's details, select/read text, use **Back to overview**, and follow source links/shortcuts. Expect no automatic settling during these interactions and no closing of details as you browse elsewhere. Scroll well into a different dominant summary: expect that summary to remain eligible even if the prior details are still open. Use the skip link and browser Back/Forward: expect their normal destination/restoration without a second correction.
6. Resize, zoom, change orientation if available, switch tabs or enable reduced motion while a correction is pending/running: expect it to cancel. With reduced motion or an oversized summary, expect ordinary unsnapped scrolling. Visit Help/Privacy and return: expect no homepage scroll controller affecting those routes.

**Acceptance:** implementation complete — awaiting user testing. No runtime outcomes or user-confirmed acceptance are recorded. Stop for Josh's scroll-feel observations; do not begin UX05 automatically.

### UX05 — October 18, 2026 — implementation complete

**Authorization and scope:** Josh explicitly requested review of this plan and implementation of UX05. Preserve prior uncommitted stages and existing copy. This authorizes UX05 with earlier observations still pending; it does not establish user acceptance. UX06 pagination and UX07 reconciliation remain unstarted.

**Delivered:**

- Replaced the four outer native disclosures with layered Summary → Revealing → Detail → Returning presentations in `FeatureSection.tsx`/CSS and the new `use-feature-reveal.ts`. The colored summary sheet and its contents slide left over 450ms, exposing the warm detail surface. Returning reverses that movement. A 650ms completion fallback, animation cancellation and latest-request checks prevent stale transition completion. A reversal during movement resolves immediately to the newly requested presentation.
- Kept all feature copy, examples, source links and availability qualifications. `ResearchStory.tsx`, `ReviewStory.tsx` and `ProductStory.tsx` share each existing feature title/status between its overview and detail heading. Only the active layer is exposed to keyboard and assistive technology; outgoing focus moves outside its subtree before it becomes inert. Unique legacy heading IDs remain available for navigation, with section naming directed to the visible heading.
- Added explicit focus transfer into details and back to Learn more, guarded by continued focus ownership. New input, movement, focus elsewhere, navigation, resize or visibility interruption finishes the intended presentation without a delayed focus move. Reduced motion, forced colors, unavailable animation/inert/clipping support and animation startup failure use a static completion path. Changing motion preferences during movement also resolves the transition. Cleanup releases animation callbacks, timers, observers and event listeners.
- Kept natural vertical document scrolling for long details, with a small local sticky Back to overview toolbar and a second return at the bottom. The measured toolbar height supplies source/heading scroll clearance. Closing from deep detail explicitly restores that feature's overview. Escape closes only within the feature, respecting handled events and descendant input/menu/dialog interactions. There is no modal, focus trap, scroll lock or new global navigation.
- Updated `HomeSequence.tsx` so section links locate the retained active presentation, while detail/page/source fragments open their layer before focus/alignment. Repeated fragments and initial destinations retain their existing handling; Back/Forward keep native scroll restoration. Learn more/Back to overview do not add history entries. The nested native Review repetition disclosure is preserved, including its contents and open state, until UX06.
- Updated `section-entry.ts` and `section-settling.ts` to resolve entry/cancel settling on feature-state changes and exclude dominant detail/reveal/return states. An open offscreen panel does not disable another dominant summary. Detail state persists while browsing the homepage, resets on explicit close or homepage unmount, and needs no storage. Updated README to describe the current interaction and remaining pagination work.

**Command outcomes:** `npm run format`, `npm run lint` and `npm run typecheck` completed cleanly on the final application code. The initial lint run flagged ref access through the hook's aggregate return object in `FeatureSection`; destructuring the returned state, refs and handlers resolved those diagnostics without suppressions or rule changes. The subsequent lint run reported no errors or warnings. No automated tests, builds, app/dev-server launches, browser automation, screenshots or runtime probes were added or run. Source inspection and these code checks are not runtime acceptance.

**Unverified behavior and limits:** the swipe's visual quality, focus announcements, interruption timing, sticky toolbar behavior, source clearance, browser restoration, touch input and enlarged text need Josh's observations. Long details intentionally remain unpaginated; UX06 will divide them into horizontal pages and preserve selected-page state. Browser Find only reaches content currently exposed by the presentation. Existing product/provider, release, commerce and publication gates remain unchanged.

**Manual guide for Josh:**

1. Use the existing local site, or run `npm run dev` from `collie-writer-site` and open the URL it prints. Open Learn more for Research, Structure, Review and Ownership, with both pointer and keyboard; expect the colored overview to slide aside, the existing detail content to appear, and keyboard focus to move to its heading. Tab should reach only controls in the active layer.
2. Scroll down a long detail panel; expect ordinary page scrolling, a reachable local Back to overview control and a second return at the bottom. Activate either return, or focus a detail control and press Escape; expect the originating overview to be visible and focus returned to Learn more. Pricing/FAQ and adjacent sections remain reachable without closing details.
3. Leave a feature open, browse another section and return via the introduction shortcut; expect its open detail presentation to remain. Explicitly close/reopen it; expect all existing content to remain available. Visit Help, then return to the homepage without a detail fragment; expect fresh summaries. There are no carousel controls yet.
4. Open and return in quick succession; also scroll away or Tab elsewhere during a reveal. Expect the latest requested presentation, one usable layer, and no delayed focus/scroll jump back. A detail view must not attract automatic settling; another dominant summary may still qualify normally.
5. Follow Research/Review source links and directly load `#research-source`, `#review-source` and `#review-repetition`. Expect the relevant detail layer (and nested disclosure when applicable) to open with its target visible below the local toolbar. Follow section links to open/closed features, repeat the same link, then use Back/Forward; expect the retained active presentation and native history behavior. Opening/closing itself must not create history entries.
6. Enable reduced motion, and forced colors if available, then open/close features; expect immediate usable changes. Change the preference during movement; expect a resolved presentation. Repeat at phone width, a short window and 200%/400% zoom; expect readable natural-height details, visible controls, no horizontal page overflow and no trapped vertical scrolling. Use a screen reader if available to inspect active section names/headings and the absence of hidden-layer controls.

**Acceptance:** implementation complete — awaiting user testing. No runtime outcomes or user-confirmed acceptance are recorded. Stop for Josh's reveal/navigation observations; do not begin UX06 automatically.

### UX06 — October 18, 2026 — implementation complete

**Authorization and scope:** Josh explicitly requested review of this plan and implementation of UX06. Preserve all earlier uncommitted work and copy. The request authorizes UX06 with earlier user observations still pending; it does not imply their acceptance. UX07 remains unstarted. No desktop, commerce, release or provider behavior changed.

**Delivered and implementation choices:**

- Added `FeatureDetails.tsx` and its CSS Module. Research has conversation/excerpt pages; Structure has material/outline pages; Review has evidence/source-use/repetition pages. Ownership retains its existing single view without page controls. Page IDs from UX01 remain unique mounted destinations. Pages use their existing visible content for accessible names.
- Inspected installed Mantine Carousel/Embla APIs and source, including selection, drag, keyboard and focus behavior. Chose the plan's permitted small native horizontal implementation: CSS horizontal snapping with native overflow, named Previous/Next buttons, a current count/title and clear endpoints. No additional dependency, autoplay, loop, wheel conversion, drag interception or custom slide-animation engine is needed. Buttons and fragment changes are immediate for all motion preferences; touch/trackpad movement remains browser-owned. Missing inert/snap support falls back to static button-selected pages.
- Controls remain outside the scrolling content. Native flex layout reserves the largest page's natural height; stacked indicator titles reserve wrapping space without exposing inactive titles. This prevents height jumps while keeping all paragraphs readable. At constrained sizes the document grows; shorter pages may contain reserved blank space. There is no fixed-height vertical slide scroller or undersized text used to force a fit. Native horizontal snap is limited to detail browsing and does not change UX04's vertical settling policy.
- Inactive pages are inert and hidden from assistive technology. Outgoing page focus is released before deactivation; Previous/Next keep focus, including at unavailable endpoints, where activation is a no-op. Visitor changes announce only a short page number/title. Ordinary vertical scrolling, resizing, reveal transitions and fragment selection do not announce entire pages. No global arrow-key capture is added. The static fallback uses visibility to exclude inactive content if inert is unavailable.
- Selection persists across scrolling away and explicit close/reopen during a homepage visit. Width changes and reveal completion realign only the horizontal viewport to the retained page. Unmount clears observers, input/scroll/navigation listeners, pending frames and announcement-origin timers. Pagination uses the existing feature-change signal to cancel pending vertical settling; open offscreen details still do not block another dominant summary.
- Updated `HomeSequence.tsx` to select the owning page for a source/detail fragment before focus/alignment, including initial loads, repeated fragments and history destinations. Section shortcuts retain the current detail/page presentation. Carousel actions never push history. The existing homepage-unmount policy ends temporary selection.
- Reorganized `ResearchStory.tsx`, `ProductStory.tsx`, `ReviewStory.tsx` and their CSS without rewriting copy. Research's caption and Structure's caption/import qualifications remain shared. Review's author-choice and comparison-scope notes now remain outside the changing pages. The full repetition example is directly shown on its dedicated page with its former disclosure label retained as a subheading. Source, privacy and cross-feature links remain intact. README describes the current implementation and its limits.

**Reference basis:** consulted the [WAI carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) for named groups, buttons, normal Tab order and focus retention, and [MDN's horizontal scroll-snap documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type) for the native scrolling choice. These are implementation references, not browser acceptance evidence.

**Command outcomes:** `npm run format`, `npm run lint` and `npm run typecheck` completed cleanly on the final code, with no lint warnings. No automated tests/test code, builds, app/dev-server launches, browser automation, screenshots, runtime probes or dependency audits were added or run. Source review and static checks do not establish rendered behavior.

**Unverified behavior and limits:** native horizontal gesture/snap feel, vertical gesture arbitration, pinch zoom, screen-reader announcements, focus across source links, reserved-height spacing and browser scroll restoration need Josh's observations. Controls provide the guaranteed alternative to gestures; no mouse-drag carousel behavior is promised. Exposed-content Browser Find limits remain. Existing acceptance/release gates are unchanged.

**Manual guide for Josh:**

1. Use the local site, or run `npm run dev` in `collie-writer-site` and open its printed URL. Open Research, Structure and Review and use Previous/Next; expect respectively 2, 2 and 3 named pages, accurate counts and clear non-looping endpoints. Ownership should have no carousel controls. Review's third page should show the complete repetition example immediately.
2. Tab to Previous/Next and activate repeatedly, including at an endpoint; expect visible focus to stay on that control. Tab through the selected page; expect no focus stops in other pages. With a screen reader if available, expect a useful page name and brief count/title announcement on a user change, without the entire page being announced.
3. Swipe horizontally on touch or scroll horizontally on a trackpad; expect page browsing and an updated count. Scroll/swipe vertically over the same content and pinch zoom; expect ordinary document movement/zoom without forced horizontal progression. Select text and activate links; expect normal browser behavior.
4. Choose a later page, close/reopen, scroll away/back and use a section shortcut; expect that page to remain selected. Resize/rotate while on that page; expect the same page with readable layout. Leave for Help and return to a fresh homepage without a detail fragment; expect selection to start from the first page when reopened.
5. From Research's first page, follow the source link; expect page 2 and the source target to be visible. Directly open `#research-source`, `#structure-outline`, `#review-source` and `#review-repetition`; expect the correct detail layer/page and target. Repeat a fragment, use the Review-to-Research link and browser Back/Forward; expect the correct retained presentation and history behavior. Previous/Next alone should add no history entries.
6. Repeat at phone width, short height and 200%/400% zoom, with reduced motion or forced colors where available. Expect readable content, stable controls, natural vertical document height and no page-wide horizontal overflow or clipped paragraphs. Buttons should change pages immediately. Some blank space on shorter pages is intentional to reserve the largest page's height. Scroll into another feature or Pricing without closing details; expect no vertical trap or automatic snap into the detail view.

**Acceptance:** implementation complete — awaiting user testing. No runtime outcomes or user-confirmed acceptance are recorded. Stop for Josh's pagination/navigation observations; do not begin UX07 automatically.

### UX07 — October 18, 2026 — implementation complete

**Authorization and scope:** Josh explicitly requested review of this plan and implementation of UX07. No manual findings accompanied the request; earlier acceptance remains pending. Reviewed the integrated entry, geometry, settling, reveal, pagination, navigation, scoped layout and route/availability ownership. Preserve all earlier uncommitted work, existing copy, Vite/React/Mantine and the desktop boundary. No visual timing changes are inferred from the absence of observations.

**Corrections and reconciliation:**

- `HomeSequence.tsx`: cancel pending fragment alignment/focus when newer wheel/touch/pointer/keyboard input, focus elsewhere, another click, document visibility or window focus supersedes it. Preserve native focus at the requested anchor. An interrupted destination suppresses its delayed hash callback so that callback cannot re-arm a jump. Explicit subsequent links still work, and Back/Forward retain native restoration. Cleanup removes the new listeners and the existing pending frame on unmount.
- `FeatureDetails.tsx`: cancel queued horizontal realignment when a new gesture begins. If that same gesture completes an in-progress reveal, its feature-state event no longer queues another alignment over the gesture. Explicit page/source selection and resize still position the retained page; no native input is prevented or converted.
- `FeatureSection.module.css`: apply measured local-toolbar scroll clearance to focusable links/buttons/inputs as well as ID destinations, so keyboard scrolling can account for the sticky Back to overview control.
- Removed the obsolete native feature-disclosure traversal and focus branches from homepage navigation after confirming feature details are now layered and Review repetition is directly exposed on its page. FAQ and purchase-help native disclosures are outside this handler and retain their behavior. The old Structure hook has no remaining source consumer; its earlier retirement is preserved.
- Reconciled README's current homepage narrative, this plan's implemented owner names/status/ledger, and the concise UX cross-reference near the top of `website-implementation-plan.md`. Historical WEB/WAI and UX01–UX06 records are retained as records of their stages, including their then-pending later work.

**Integrated source findings, not passed runtime tests:**

- The homepage owns six alternating minimum-height presentations; the measured scrolling header shares the hero's viewport. Pricing/FAQ/footer and supporting routes remain outside the sequence. Short/zoomed layouts retain natural height.
- Entry remains once per homepage visit with a 60% trigger and static fallbacks. Settling retains its 10% capture band, 200ms quiet interval, 280ms cancellable correction and persistent departure protection. It excludes dominant details, focus conflicts, unstable geometry and reduced-motion/forced-color paths. None of these values has been tuned from device evidence.
- The 450ms reveal has a 650ms completion fallback, explicit focus transfer, a single active accessible layer and interruption cleanup. Local return controls do not trap the page. Open detail state and selected carousel pages remain ephemeral per homepage visit.
- Research/Structure/Review retain 2/2/3 named pages, intact examples and shared qualifications; Ownership has one view. Previous/Next use immediate changes, native horizontal gestures remain browser-owned, and inactive pages stay outside the keyboard/accessibility sequence. The largest natural page height is reserved, so shorter pages can contain blank space. These deliberate UX06 choices remain open to Josh's visual feedback.
- Feature/source destinations remain mounted and route to the active presentation or owning page. Section shortcuts preserve selected detail pages; explicit carousel/disclosure actions add no history. The source still reports release `development`, commerce `unavailable`, Research/Structure in development, Review planned and customer AI unavailable. Existing pricing, privacy, licensing and supporting routes remain intact.

**Command outcomes:** `npm run format`, then `npm run lint`, then `npm run typecheck` completed cleanly on the final application code. Lint reported no errors or warnings. No tests/test code, builds, app/dev-server launches, browser automation, screenshots, runtime probes, benchmarks or dependency audits were added or run. Source review is not user acceptance.

**Remaining acceptance:** motion comfort, scroll-wheel/trackpad/touch arbitration, responsive fit, reserved-height spacing, mobile toolbar/rotation behavior, focus announcements, reduced motion, forced colors and browser restoration need user observations. No reported runtime defects are waiting to be fixed, and no runtime pass is claimed. User feedback may require focused corrections followed by format/lint/typecheck; it does not authorize an unrelated redesign or publication. Browser Find remains limited to exposed content. Existing release/provider/commerce/publication gates remain unresolved.

**Consolidated manual guide for Josh:**

1. Use the existing local site, or run `npm run dev` from `collie-writer-site` and open its printed URL. Start at the hero, continue to the ChatGPT introduction and follow each feature shortcut; expect six alternating full-height presentations where content fits, unchanged copy, one-time entry and natural overflow when needed. Return to an already visited feature; expect its settled content without replaying entry.
2. With your usual wheel/trackpad, pause within roughly 10% of a fitting summary boundary; expect a gentle correction only after scrolling stops. Leave an aligned section using repeated small movements, reverse direction, or resume scrolling during correction; expect easy departure and immediate cancellation, without aggressive pulling between sections. Pauses farther away should not snap.
3. Open details, browse Research's two pages, Structure's two and Review's three, scroll elsewhere and return, then close/reopen; expect retained open state/page, clear endpoints and ordinary vertical movement. Ownership should have no carousel controls. Review's repetition example should need no second disclosure. Choose Back to overview deep within details or press Escape with focus in that feature; expect its overview and Learn more focus to return.
4. Use Tab/Shift+Tab, activate Previous/Next repeatedly and follow source links. Expect only active-layer/page controls, visible focus, unchanged control focus at carousel endpoints and clearance from the local return toolbar. With a screen reader if available, expect meaningful section/page names and brief user-change announcements. Interrupt a link/reveal promptly with scrolling, another action or focus movement; expect no delayed pull back. Start a horizontal gesture as a reveal finishes; expect it to remain native.
5. On a phone/tablet if available, swipe horizontally within details, then vertically over the same area and pinch zoom. Expect horizontal browsing when intended and ordinary vertical page movement/zoom. Rotate or change browser-toolbar visibility on a later page; expect retained selection and readable layout without viewport-change snapping. At short height and 200%/400% zoom, expect reachable controls and complete content without page-wide horizontal overflow. Shorter carousel pages may retain blank space for the largest page.
6. Enable reduced motion and forced colors where available, including changing preference during a reveal; expect readable settled content, immediate detail/page changes, no automatic vertical settling and visible controls/focus. Return to normal preferences; expect previously visited entries to remain settled.
7. Directly load feature fragments and `#research-source`, `#structure-outline`, `#review-source`, `#review-repetition`; expect the appropriate presentation/page and target. Repeat a link and use Back/Forward; expect useful destinations and browser restoration. Visit Help and Downloads, then return without a detail fragment; expect normal supporting routes and fresh homepage state. Finish by navigating to Pricing, FAQ and the footer; expect immediate access without closing every feature or completing the carousels, with development/planned/unavailable labels intact.

**Acceptance:** implementation complete — awaiting user testing. UX01–UX07 implementation is complete; user-confirmed acceptance is not. Stop here for Josh's observations. No deployment, publication, live purchase activation or desktop acceptance is implied.

### Post-UX07 — Independent first-entry correction

**User observation:** Josh saw entry animation in the first feature section but not subsequent sections. He clarified that each section must own its state and animate on first encounter, then remain settled until the site is reloaded. This supersedes earlier homepage-mount-only entry lifetime and oversized-entry exclusions; detail/page retention and vertical-settling rules remain separate.

**Source findings:** the entry controller globally settled pending sections on tab hiding/page restoration, excluded oversized sections entirely, and consumed partial visits or touch starts on plain section content. Resize could also settle pending sections before their entrance. These paths explain how later sections could lose eligibility; no browser reproduction was performed.

**Correction:** `section-entry.ts` now owns independent Waiting/Entering/Summary records and a document-lifetime set of encountered section IDs. Offscreen/partially encountered sections retain Waiting through visibility, resize and restoration; only a running entrance or explicitly encountered destination is settled. Plain-content touch starts no longer consume an entrance. A 60% viewport-relative trigger also works for tall sections, using passive scroll observation coalesced to one pending frame. Started entrances remain settled after interruption; completed entrances do not replay. Cleanup preserves unseen eligibility and avoids consuming the fresh hero during React's pre-paint effect replay. Reload clears the memory; no storage service is used. Reduced motion, forced colors and explicit focus/navigation retain immediate readable paths. README and current entry guidance were updated; earlier stage records remain historical.

**Checks:** `npm run format`, `npm run lint` and `npm run typecheck` completed cleanly; lint reported no errors or warnings. No automated tests, app/dev-server launches, browser automation, screenshots or runtime probes were added or run.

**Manual guide for Josh:**

1. Reload the homepage at the top with reduced motion off, then scroll through Hero, ChatGPT introduction, Research, Structure, Review and Ownership. Expect each section's own entrance as it reaches the visibility threshold, regardless of which earlier sections have finished.
2. Scroll back and revisit them, including opening/closing details. Expect settled summaries with no repeated entry animation. Reload at the top and repeat; expect entrances to be available again.
3. Reload, visit only the first sections, switch tabs and return, then continue down. Expect every still-unvisited section to animate. Repeat after resizing and with a short viewport where a section is taller than the screen; expect unvisited sections to remain eligible, with ordinary scrolling through tall content.
4. Partly reveal a section below the trigger, scroll away, then return farther into it. Expect its entrance still to be available. Starting a touch scroll on plain section content should not consume it.
5. Enable reduced motion or forced colors, or use keyboard/direct feature/source links. Expect immediate readable content, usable focus and correct destinations. These accessibility/navigation overrides should affect the encountered section without consuming unrelated unseen sections.

**Status:** correction implemented — awaiting user testing. Josh's original observation is recorded; acceptance of this correction has not yet been supplied.
