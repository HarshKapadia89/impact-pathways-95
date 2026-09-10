# Lock the four-arrow brand mark to the exact reference

The four arrows must always look exactly like the supplied artwork — same order, same
directions, same colours — everywhere they appear. No variation, ever.

## The fixed lockup (left to right)

1. Pale lavender / white arrow pointing **up-right**
2. Pink-magenta arrow pointing **down-right**
3. Orange arrow pointing **up-left**
4. Lime arrow pointing **down-left**

Laid out in a single horizontal row, evenly spaced, on the purple field — as in the reference.

## What changes

- Rebuild the arrow mark so the shape matches the reference: a diagonal arrow with a square
  shaft and a solid triangular head (not the current chunky block arrow), drawn as vector so
  it stays sharp at every size.
- Correct the current mistake: today the mark shows a 2x2 square with orange up-left, white
  up-right, lime down-left, magenta down-right. It becomes the single row above.
- The order, directions and colours are hard-coded inside one shared piece — nothing that uses
  it can rotate, reorder, recolour or mirror it. Places that need it smaller or larger only
  choose a size.
- Update the four places it is used (homepage hero, homepage poster row, LevelUp Lab hero,
  page heroes, site footer) so the wider shape sits correctly, without changing any other
  content on those pages.

## Technical notes

- `src/components/BrandArrows.tsx`: switch the viewBox to a wide 4x1 strip, replace the
  rotation table with the fixed sequence (paper up-right, magenta down-right, orange up-left,
  lime down-left) using `--hbk-paper`, `--hbk-magenta`, `--hbk-orange`, `--hbk-lime`.
- Prop surface reduced to size/className placement only; no direction/colour props exposed.
- Consumers in `src/routes/index.tsx`, `src/routes/upskill.index.tsx`,
  `src/components/StudentPhotoHero.tsx`, `src/components/PublicLayout.tsx` get width-based
  sizing instead of square sizing.
- Verify at desktop and mobile widths with no layout overflow or console errors.
