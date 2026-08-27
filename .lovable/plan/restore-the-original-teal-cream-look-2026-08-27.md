# Restore the original teal & cream look

Bring back the earlier visual identity shown in your screenshot — teal/cream palette, serif display headings, soft rounded cards, glassy pill navigation — while keeping every feature added since (profession directory, trilingual test, career cards, dashboard, etc.).

## What changes

1. **Theme layer** — restore the original design tokens in `src/styles.css`: warm cream background, deep teal primary, soft accent tints, `--radius: 0.75rem`, subtle blur/soft shadows, and the original serif + sans font pairing. The flat "poster" tokens (ink/cream blocks, hard offset shadows, all-caps display) are removed.
2. **Header** — restore the glassy rounded nav rail from the screenshot: HBK Careers logo + "STUDENT GUIDANCE HUB" on line one, pill tabs (Home, Gujarat, India, Colleges, Scholarships, Exams, Aptitude, Dashboard, Resume) below, with the active tab as a filled teal pill. Language toggle stays in the footer.
3. **Homepage** — hero back to cream background with serif headline (teal first word), soft rounded feature cards with tinted icon chips; stream cards, trust layer, how-it-works, report preview, vibe quiz and FAQ restyled to rounded/soft-shadow cards.
4. **Shared UI** — `button`, `card`, `badge` variants return to rounded corners and soft shadows instead of thick borders and hard offsets.
5. **New pages built after the poster redesign** — handbook stream listing and profession detail pages get restyled to the restored system (rounded cards, teal section rail, no all-caps block headings). Content and layout stay as-is.

## Technical notes

- Base tokens are recovered from the pre-redesign version of `src/styles.css` (teal `--primary`, cream `--background`, 0.75rem radius) and re-applied, keeping any tokens newer components depend on so nothing breaks.
- Components still referencing removed utilities (`block-card`, `display-caps`, `bar-stripes`, `--ink`, `--cream`, `--brand-N`) are updated: `PublicLayout`, `VibeQuizCard`, `index`, `handbook.$slug.index`, `handbook.$slug.$profession`, and the shadcn `button`/`card`/`badge`.
- Fonts: reinstate the original serif display + sans body pairing via the root route `<link>`; Archivo Black is dropped.
- A stray language-toggle hydration mismatch in the footer is fixed along the way.
- The PDF report styling is untouched.
