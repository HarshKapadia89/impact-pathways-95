# Bold visual redesign + comprehensive profession directory

Two pieces of work: a new visual identity taken from the four reference images, and a full profession-detail directory under the India career guidance section.

## Part 1 — Visual redesign

The references share one language: pure black and white base, large flat blocks of saturated colour (pink, electric blue, green, orange-red, yellow, cream), heavy condensed-grotesk headlines in ALL CAPS, sharp corners, no gradients, no soft shadows, colour used as full-bleed panels rather than accents.

Translated into the design system:

- **Palette** — near-black ink and off-white cream as base; six accent blocks: hot pink, electric blue, signal green, orange-red, sun yellow, violet. Redefine all tokens in `src/styles.css` (oklch) and delete the five `data-theme` variants; one identity only.
- **Typography** — heavy grotesk display face for headings (all-caps, tight tracking, large sizes) with a clean neutral sans for body. Loaded via `<link>` in the root route. Hindi and Gujarati keep matching Noto families so the trilingual UI stays consistent.
- **Shape and depth** — radius drops to near-zero, shadows replaced by hard offsets and solid borders, cards become colour blocks, section bands alternate colours edge-to-edge.
- **Components** — restyle button, card, badge, tab, accordion, input variants; then header, footer, homepage, test flow, career and handbook pages, dashboard, resume builder, teacher and admin shells.
- **Colour-block system** — each of the 20 handbook streams and each profession category gets a fixed accent from the palette, so the colour carries meaning instead of decoration.
- Dark mode inverts to black base with the same accents.

Functionality, routes, content and the backend are untouched.

## Part 2 — Comprehensive profession pages

Today `/handbook/<stream>` lists professions as plain text chips — around 500 names across 20 streams with no detail pages. The reference screenshots show the target: a sticky section rail plus a long, sectioned profile.

### New route

`/handbook/$slug/$profession` — one page per profession, with a sticky left rail linking to:

1. **Summary** — what the professional does, in HBK's own words
2. **Professional Opportunities** — sectors and roles, as expandable rows
3. **Career Path** — table of routes: Stream after 10th → Graduation → After Graduation → After Post-Graduation
4. **Important Facts** — eligibility percentages, age limits, programme variants
5. **Leading Institutes (India)** — college, location, website
6. **Institutions Abroad** — same table, global
7. **Entrance Exams** — UG and PG tables: exam, tentative month, subjects, website
8. **Work Description** — day-to-day duties
9. **Pros & Cons**
10. **Fit check CTA** — "Are you fit for this career?" linking into the free test

Profession chips on `/handbook/<stream>` become links into these pages, plus a "choose another profession" jump menu.

### Data consistency

This is the part that needs discipline, so nothing contradicts existing pages:

- Institutes reuse the institute lists already in `src/lib/handbook/*.json` and the colleges table, filtered per profession — no new conflicting college names or ranks.
- Entrance exams reuse the exam records already in the handbook JSON and `/exams`, so codes, months and websites match everywhere.
- Career paths align with the stream/path structures in `src/lib/careerData.ts` — a profession reachable through B.Tech points at the same eligibility and exams the `/career` page states.
- Salary bands, where shown, reuse the ranges already published on the career pages rather than new figures.
- Trilingual: English authored first, Hindi and Gujarati generated for headings and prose, with the same fallback rules the career cards already use.
- Every page ends with an HBK-authored sources line citing official regulators and institute sites — no third-party portal attribution.

### Scale and sequencing

500 professions cannot all be hand-authored at once, so:

- **Stage A** — build the route, the section template, the data schema, the cross-linking to existing exams/institutes, plus fully authored profiles for one stream (Engineering and Technology) to lock the pattern for your review.
- **Stage B** — roll out the remaining 19 streams in batches, generating each profile from the shared schema and reconciling it against the existing handbook, career and exam data. Professions without a full profile keep working as today until their batch lands.

## Technical notes

- Tokens live in `src/styles.css` (`:root`, `.dark`, `@theme inline`); components keep semantic classes, no hardcoded colours.
- Fonts load through `<link>` tags in `src/routes/__root.tsx`, never a CSS `@import`.
- Profession data lands as per-stream JSON under `src/lib/professions/`, lazily imported the same way `handbookData.ts` already code-splits stream JSON.
- New route gets its own `head()` with unique title, description and OG tags for SEO.
- Each page renders semantic HTML with a single H1 and JSON-LD, so the directory is indexable.

## Sequencing

1. Redesign tokens, fonts, shared components, header/footer, homepage — you review.
2. Redesign remaining pages plus the PDF report colours.
3. Profession directory Stage A (Engineering) — you review.
4. Profession directory Stage B (remaining streams, in batches).
