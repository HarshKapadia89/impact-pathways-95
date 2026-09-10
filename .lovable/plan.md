# Plan: Four-arrow brand motif (sharp, vector)

## Goal
Recreate the four bold arrows from the reference image (lime, orange, magenta, white on purple, pointing four directions) as a crisp reusable brand element, and weave it through the site. No blurry bitmap anywhere — everything drawn as vector SVG, sharp at any screen size.

## What you'll see
- A four-arrow cluster — lime, orange, magenta, white block arrows pointing in four directions on the brand purple — appearing as a signature brand motif:
  - Homepage: in the purple hero next to the tagline, and beside the two brand poster images already added
  - Footer (purple band) as a decorative sign-off above the wordmark area
  - CTA bands (bottom of key pages: homepage, Career Library, LevelUp Lab, counsellor) as a directional accent
- Everything stays in the official HBK palette (purple field, lime/orange/magenta/paper arrows) and works in all 4 languages.

## Technical details
- New app component `src/components/BrandArrows.tsx` (app code, design system untouched): one inline SVG drawing the four geometric block arrows as clean polygon paths — no strokes, no blur, infinitely sharp; sized via a `size` prop, decorative (`aria-hidden`), colors from the HBK tokens (`hbk-lime`, `hbk-orange`, `hbk-magenta`, `hbk-paper`).
- Arrows match the reference style: thick block arrows (solid fill), directions down-left / up-left / down-right / up-right as in the image.
- Placed via composition only — inside existing `Card`/section surfaces on purple backgrounds, with token spacing; no design-system file edits.
- The existing single `ArrowIcon` stays as-is for buttons/badges; this is a separate decorative lockup.
- Verify: typecheck + Playwright pass on `/` at desktop and mobile, checking sharpness (SVG), contrast, no console errors.
