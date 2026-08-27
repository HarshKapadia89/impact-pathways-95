# Redesign the site from your brand guidelines PDF

You upload the guidelines PDF; I extract the design system from it and roll it across the entire site — public pages, test flow, dashboard and admin — following the palette and typography closely while adapting layouts where the product needs it.

## What happens after you upload

1. **Extract the system.** I parse the PDF and pull out: colour values, typography (families, weights, heading/body scale), spacing rhythm, corner radii, shadows, button and card styling, and any imagery or tone rules. I report back a short summary of what I found and flag anything missing or ambiguous before building.
2. **Fonts.** I check whether the named fonts are on Google Fonts. If they are, I load them via the root route head. If they are licensed, I tell you exactly which files to upload (`.woff2` preferred) and self-host them. If a font is unavailable, I propose the closest free match for your approval rather than silently substituting.
3. **Rebuild the token layer.** All values land in `src/styles.css` as semantic tokens (oklch): background, foreground, primary, accent, muted, border, success/warning/destructive, chart colours, sidebar, plus radius, shadow and gradient tokens. Fonts register in `@theme`. Dark mode gets a matching set. The existing five colour themes collapse into your single brand theme.
4. **Restyle shared components first.** Buttons, cards, inputs, badges, tabs, accordions get variants matching the guideline examples. Then the header and footer in `PublicLayout`, plus `TeacherLayout` and `AdminLayout`.
5. **Page-by-page pass.** Home → test flow (intro, take, results) → career and handbook pages → scholarships/exams/colleges → resume builder and dashboard → about/parents/FAQ/success stories/for-schools → teacher and admin screens. Each page is checked for spacing, hierarchy and type scale against the guidelines.
6. **PDF report.** The generated 20-page report picks up the brand colours and, where the script allows, the brand fonts — so the deliverable matches the site.
7. **Visual QA.** I screenshot key pages at desktop and mobile, in light and dark mode, and iterate until they match. Then you review the preview.

## What stays the same

- All functionality: the psychometric engine, scoring, trilingual test and report, AI counsellor, data and backend.
- Current text logo "HBK Careers" — restyled with the new type and colours, not replaced.
- Route structure and navigation content.

## What I need from you

- The guidelines PDF (upload it in chat).
- Font files, only if the guidelines use licensed fonts not on Google Fonts — I'll tell you after reading the PDF.
- A note on anything in the PDF that is aspirational rather than binding (e.g. print-only rules).

## Technical notes

- Tokens are defined in `src/styles.css` under `:root`, `.dark` and `@theme inline`; components keep using semantic classes (`bg-primary`, `text-muted-foreground`) so no hardcoded colours are introduced.
- Web fonts load via `<link>` tags in `src/routes/__root.tsx` — never via CSS `@import`, which breaks the build on this stack.
- The five existing `data-theme` blocks (indigo/emerald/rose/ocean/sunset) are removed and replaced by the single brand theme.
- shadcn component variants are extended with brand variants rather than overridden inline.

## Sequencing

Because it is a full-site overhaul, I'll ship it in two reviewable stages: **Stage 1** = tokens, fonts, shared components, header/footer, homepage. You review. **Stage 2** = every remaining page plus the PDF report and QA pass.

Upload the PDF whenever you're ready and I'll start with the extraction summary.
