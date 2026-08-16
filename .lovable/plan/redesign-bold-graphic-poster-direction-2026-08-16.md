# Redesign: bold graphic-poster direction

Your four references share one clear language: **flat, saturated colour blocks, heavy black grotesque type set tight and large, hard edges with no rounded corners or soft shadows, and playful geometric motifs** (stripes, checkerboards, angled colour bars radiating from a point). Black is used as a canvas, not just as text. That becomes the new HBK Careers look.

## The design language

**Colour** — a bright poster palette used as full blocks, not accents:
- Ink black (canvas and type), cream/off-white (paper)
- Electric blue, hot pink, grass green, tomato red-orange, sunflower yellow, violet
- Colours are applied as solid fields; sections alternate between cream, black, and a colour field so scrolling the page feels like flipping through posters.

**Typography** — one heavy grotesque for everything. Headlines set huge, ALL CAPS, tight tracking, tight leading, often two or three lines stacked flush-left. Body text small, plain, high contrast. The current Fraunces serif is retired. Font: a free grotesque in the Helvetica/Archivo family loaded from Google Fonts (Archivo/Archivo Black as the working pick — I'll show it in the first pass and can swap to Anton, Bebas or Space Grotesk if you prefer).

**Shape and depth** — corner radius drops to 0 (or a hard 2px). Soft blur shadows are removed; depth comes from offset solid-colour blocks and thick black borders. Gradients go away entirely.

**Motifs** — three reusable graphic elements taken from the references:
1. Stripe bands and checkerboard blocks as section dividers and card headers.
2. Angled colour bars radiating from a black dot — used for the RIASEC/soft-skills visuals in the report and on career pages.
3. Word stacks where each line is a different colour, for hero and section intros.

## What changes, screen by screen

- **Header/footer** — black bar, oversized "HBK CAREERS" wordmark in the grotesque, nav as flat uppercase labels with a solid colour block on the active item. Keeps the current two-row structure so nothing clips.
- **Homepage** — poster hero with a stacked coloured word list ("DREAMED / DESIGNED / BUILT…" style, applied to career verbs), then alternating full-bleed colour sections for How it works, Inside the report, Vibe quiz, Trust layer and FAQ.
- **Test flow** — intro page as a bold poster with the grade tiles and language picker as solid colour blocks; the question screens get a thick progress bar, big numbered questions, and answer options as flat bordered blocks that fill with colour when selected.
- **Career, handbook, scholarships, exams, colleges** — cards become hard-edged blocks with a coloured header strip; each career stream gets an assigned palette colour so it reads consistently across the site.
- **Dashboard, resume builder, teacher and admin screens** — same tokens applied; tables and forms get flat borders and colour-blocked headers.
- **PDF report** — colour blocks, the radiating-bars chart and the heavy type carried into the generated report so the deliverable matches the site.

## What stays untouched

All functionality: psychometric scoring, trilingual test and report, AI counsellor, data, routes, and the current text logo (restyled only). Gujarati and Devanagari scripts keep their Noto fonts where the grotesque has no coverage.

## Technical notes

- Tokens rewritten in `src/styles.css`: new oklch palette, `--radius: 0`, shadow tokens replaced with offset-block equivalents, gradient tokens removed, `--font-sans` / `--font-serif` pointed at the grotesque.
- The five `data-theme` blocks (indigo/emerald/rose/ocean/sunset) are removed — one brand look replaces them. Dark mode becomes the black-canvas variant.
- Fonts load via `<link>` in `src/routes/__root.tsx`, not a CSS `@import`.
- shadcn button/card/badge/tab variants extended with the flat block styles so pages pick up the look without per-page hardcoding.
- New `src/components/graphics/` holds the stripe, checkerboard and radiating-bars motif components.

## Sequencing

**Stage 1** — tokens, fonts, shared components, header/footer, homepage. You review the preview.
**Stage 2** — test flow and results, career/handbook/scholarships/exams/colleges, dashboard/resume, about/parents/FAQ/success stories/for-schools, teacher and admin.
**Stage 3** — PDF report restyle, then a light/dark, desktop/mobile QA pass.
