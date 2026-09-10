# Homepage hero: two-line title + visible student photo

## What you asked
1. The tagline must break into exactly two lines: "THE WORLD OF CAREERS," on line one and "ALL IN ONE PLACE." on line two.
2. The student background photo should actually be visible — right now it is hidden behind the heavy purple overlay.

## Changes (all in the homepage hero, `src/routes/index.tsx` lines 102–131)

### 1. Two-line headline
- Split the title into two translated strings per language with a line break (`<br />`) between them:
  - English: `THE WORLD OF CAREERS,` / `ALL IN ONE PLACE.`
  - Gujarati: `કારકિર્દીની દુનિયા,` / `બધું એક જગ્યાએ.`
  - Hindi: `करियर की दुनिया,` / `सब एक जगह।`
  - Marathi: `करिअरचा विश्व,` / `सर्व एका ठिकाणी.`
- Headline spans full width (keep `max-w-5xl` container so it extends across the page as in your screenshot).

### 2. Make the photo visible
- Remove `mix-blend-luminosity` so the photo shows in real colour instead of washed-out purple.
- Raise photo opacity from 30% to about 60%.
- Lighten the purple overlay from `bg-highlight/75` to a gentler `bg-highlight/50`, fading slightly toward the left so the white text stays readable while the students on the right show through clearly.
- Keep the brand contrast safeguard: text stays white on the purple field, fully readable.

### 3. Same treatment in the shared hero component
- `src/components/StudentPhotoHero.tsx` (`tone="brand"`) uses the same heavy overlay on other pages (success stories, about, parents, etc.). Apply the same lighter overlay + higher photo opacity there so the photo is visible everywhere consistently.

## Verification
- Typecheck passes.
- Browser check on desktop and mobile: two-line headline, photo clearly visible, text readable, no console errors.
