# Remove the four-arrow graphic

The hand-drawn four-arrow decoration does not match the brand reference, so it comes off the site entirely. The single brand arrow used inside buttons, badges and headings stays exactly as it is.

## What changes

- Homepage: remove the large faded arrows behind the hero and the arrow block in the poster section.
- Footer: remove the arrow row under the logo.
- Page heroes (About, Parents, Schools, Success Stories, Career Library, Test, Counsellor and other pages using the shared student photo hero): remove the faded arrows in the corner.
- LevelUp Lab: remove the faded arrows behind the hero.
- Delete the arrow graphic component itself so it cannot creep back in.

Spacing around each affected area is tidied so nothing is left with an empty gap. No text, colours, photos, translations or any other content changes.

## Technical detail

- Delete `src/components/BrandArrows.tsx`.
- Remove the import and usage in `src/components/PublicLayout.tsx` (line 167), `src/components/StudentPhotoHero.tsx` (line 38), `src/routes/index.tsx` (lines 113 and 164), and `src/routes/upskill.index.tsx` (line 75), adjusting surrounding layout/padding classes with design-system tokens only.
- Leave the design system's `ArrowIcon` and `withArrow` usages untouched.

## Verification

Typecheck, then load home, footer, a student-photo hero page and LevelUp at desktop and mobile widths to confirm clean layout with no console errors.
