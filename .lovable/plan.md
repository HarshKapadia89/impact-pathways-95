# Redesign HBK Careers from the attached brand system

## Direction

Use the attached HBK Careers system as the only visual authority:

- Official HBK logo artwork and up-right arrow motif
- Orange for primary actions, lime for energy/highlights, purple for ambition and major feature fields
- Noto Serif for display headings; the brand body stack for navigation, forms and reading text
- Brand spacing, radii, shadows, focus states, cards, badges, buttons, fields, tabs, accordions and callouts
- Bright paper-led pages with bold colour bands, authentic student imagery and clear directional storytelling

The uploaded education-portal image will influence only composition: a photo-led opening, alternating full-width story bands, assessment preview, concise statistics and a strong final action band. Its logo, blue palette and exact styling will not be copied.

## Phase 1 — shared site foundation

1. Rebuild the header into a cleaner two-level navigation with the official logo, a focused set of primary destinations, a secondary menu for the remaining tools, and the four-language selector at the top right.
2. Rebuild the mobile navigation, footer, floating counsellor and aptitude actions using brand controls and accessible focus states.
3. Remove remaining invented theme aliases, raw colours, gradients and one-off card skins from app code where the attached system already provides a token or component.
4. Resolve the current page-head hydration mismatch and replace stale root metadata so the redesigned pages load consistently.

## Phase 2 — homepage from scratch

Build a new visitor-first homepage with this sequence:

1. **Photo-led opening** — `HBK Careers` as the single H1, “Find your direction” as the promise, student photography, and clear actions for the aptitude test and Career Library.
2. **Discover · Assess · Explore · Plan** — four concise steps showing the student journey, inspired by the reference but expressed with HBK cards, arrows and colour roles.
3. **Assessment and report preview** — explain the RIASEC, Multiple Intelligences and aptitude experience beside a realistic report preview and direct test action.
4. **Platform at a glance** — show every major student tool without a repetitive wall of equal cards: professions, streams, colleges, exams, scholarships, LevelUp Lab, resume, dashboard, AI counsellor and human counselling.
5. **Proof band** — real totals from project data: 1,600+ professions, 48 streams, 100 exams, 100 scholarships, 150 lessons and four languages.
6. **Student outcomes and trust** — success stories plus concise parent/school reassurance, official-source transparency and no-login/free-access cues where accurate.
7. **Final direction band** — a strong photographic or purple brand field leading into the aptitude test, followed by the redesigned footer.

All visible homepage text and actions will remain complete in English, Gujarati, Hindi and Marathi.

## Phase 3 — first redesign wave for other pages

Apply the same composition and attached components to the highest-use public journeys:

- Career Library and profession/stream detail templates
- Aptitude test introduction, student form, test flow and report preview/result surfaces
- LevelUp Lab hub, topic, lesson, quiz and certificate surfaces
- Scholarships, entrance exams and college search
- Counsellor booking
- Dashboard and resume builder
- About, parents, schools, success stories and FAQ

Each page will keep its existing content, data, translations, calculations and links. The redesign changes hierarchy, presentation and interaction styling only.

## Implementation approach

- Compose from `@/design-system/hbk-career-brand-guidelines-4f1c39` before using project-local controls.
- Use the supplied `Logotype`, `Button`, `Card`, `Hero`, `Section`, `Stat`, `Badge`, `Callout`, `Field`, `Input`, `Select`, `Tabs`, `Accordion` and `ArrowIcon` variants without re-skinning them.
- Use generated, authentic Indian student photography only where imagery materially supports the story; do not generate or redraw the HBK logo.
- Keep data-driven totals tied to existing datasets rather than hardcoding changing figures.
- Preserve all four-language behaviour, selected-language test/report continuity, search/filter state, progress, booking and backend behaviour.
- Keep admin and teacher workspaces functionally unchanged in this wave; they inherit the shared brand shell where applicable but are not structurally redesigned unless requested later.

## Quality checks

- Verify desktop and mobile layouts, especially the header, long translated text, controls and section spacing.
- Test English, Gujarati, Hindi and Marathi across the redesigned routes.
- Check keyboard focus, labels, colour contrast, reduced motion, image alt text and one-H1 page structure.
- Verify the homepage actions, navigation, search/filter controls, test start, LevelUp progress and counsellor form still work.
- Confirm no browser errors or hydration mismatch remain and every redesigned content route retains unique metadata.
