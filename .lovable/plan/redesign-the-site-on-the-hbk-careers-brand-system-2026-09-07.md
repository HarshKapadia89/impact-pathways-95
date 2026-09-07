# Redesign the site on the HBK Careers brand system

You are right — the earlier maroon/cream look was my own invention. The attached HBK Careers brand system is now in the project, and this plan replaces the invented theme with the real brand.

## The brand, in plain terms

- Colours: orange for actions, lime for energy/highlight blocks, purple for ambition (heroes, feature panels), plus lilac, amber, green, mint, indigo and magenta for different sections. White and soft-paper backgrounds.
- Type: Noto Serif for headlines, card titles and quotes; a clean sans for all body text.
- The up-right arrow is the brand symbol — used as frames, badges, buttons and background patterns.
- Rounded corners, soft shadows, generous spacing, always-visible focus outlines.
- The supplied HBK logo artwork (colour, white, white-on-purple) is used everywhere — never re-drawn.

## What changes

1. **Theme layer** — remove the invented maroon/cream/sky palette, the Archivo/Poppins fonts and the card-dotted / maroon-panel styles from the project stylesheet, so the brand theme is the single source of colour, type, radius and shadow. Load Noto Serif in the page head. Drop the leftover theme-switcher wiring that forces the old palette.
2. **Shell** — header and footer rebuilt on brand tokens with the real logotype, arrow-styled navigation and buttons; language dropdown stays top-right, unchanged in behaviour.
3. **Home page** — hero on the purple field with the arrow motif, statistics as brand stat blocks, the feature cards re-cut as brand cards with one deliberate colour per group, lime pull-quote / call-to-action band.
4. **Key pages** — Career Library, Aptitude Test flow, LevelUp Lab, Scholarships, Exams, Counsellor, Dashboard, About / Parents / Schools / Success Stories restyled to the same language: brand buttons, badges, cards, tabs, accordions, alerts and form fields from the design system.
5. **Profession and lesson pages** — the panels, dotted boxes and coloured strips replaced with brand cards, callouts and section headers.
6. **Consistency pass** — remove hardcoded colours found in page code so everything themes correctly, keep light and dark both working, and check all four languages still render.

## Not changing

Content, data, translations, test logic, scoring, PDFs and backend behaviour stay exactly as they are. This is a visual redesign only.

## Technical notes

- `src/styles.css` keeps `@import "tailwindcss"` and the app's own utilities, but the palette/typography blocks are deleted; the design-system theme is imported last so its tokens win.
- All styling comes from design-system tokens and components (`@/design-system/hbk-career-brand-guidelines-4f1c39`); no hex, rgb or raw px values in app code.
- Existing shadcn primitives stay where a design-system equivalent does not exist, but inherit brand tokens.
- Work is staged: theme + shell first (visible immediately), then home, then the remaining routes.
