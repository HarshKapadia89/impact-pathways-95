## Goal

Two improvements:
1. **Report cover (Page 1 of PDF)** — text in the lower "Prepared For / Issued By" block is dark indigo on a dark indigo background, so it's effectively invisible. Make the entire cover legible and crisp.
2. **Public website** — refresh the look to feel brighter, more colourful and more student-friendly without abandoning the existing brand (deep indigo + saffron).

---

## Part 1 — Fix the report cover (`src/lib/psychometricReport.ts`)

The cover currently fills the page with `primaryDark` and `primary` (both deep indigo) for the full height, but the bottom block writes labels in `COLORS.muted` and big text in `COLORS.primary` / `COLORS.ink` — all dark, so they disappear.

Two options to fix:

- **Option A (chosen):** Restore the intended two-tone layout. Keep deep indigo for the top ~62% of the page (title area), then paint a **bright cream band** (`COLORS.accentSoft` / pale ivory) for the bottom ~38% so the dark "Prepared For / Issued By" text reads with strong contrast.
- Add a thin saffron accent rule between the two zones for polish.

Concrete changes on the cover:
- Replace the single dark fill with: `primaryDark` band (top), `cream` band (bottom), `accent` hairline divider.
- "PREPARED FOR" / "ISSUED BY" small caps → keep, but use a clearly readable muted-on-cream tone.
- Student name → large serif, deep indigo on cream (high contrast).
- Add a subtle saffron underline under the student name (decorative + brand).
- Brighten the title area too: make "Report." word use full saffron (`COLORS.accent`) instead of pale `accentSoft` so the hero word pops.
- Tagline "RIASEC interests · Multiple Intelligences · Aptitude" → bump to pure white at slightly larger size.
- Footer ref/date row → ensure it sits inside the cream band with muted indigo text.

No structural changes elsewhere in the PDF; this is cover-only.

---

## Part 2 — Brighter, friendlier public site

Keep the current design tokens (so the rest of the app stays consistent), but lift the palette and add more colour accents on the surfaces students actually see.

### Token tweaks (`src/styles.css`)
- Slightly warmer, brighter background (already cream — nudge lightness up a touch).
- Add a few semantic helper tokens so we can sprinkle colour without hand-coding hex:
  - `--brand-1` (indigo), `--brand-2` (saffron), `--brand-3` (teal/green from chart-3), `--brand-4` (coral from chart-4), `--brand-5` (sky from chart-5).
  - `--gradient-hero`, `--gradient-card`, `--shadow-glow` for soft tinted shadows.
- Keep dark-mode mapping intact.

### Header (`src/components/PublicLayout.tsx`)
- Active nav link: pill background using `bg-accent/15 text-primary` with a saffron underline dot, instead of muted indigo tint only.
- Add a small coloured icon chip behind each nav icon (rotating brand colours) so the bar feels lively.
- Logo: keep mark, add a tiny saffron accent dot.

### Home hero (`src/routes/index.tsx`)
- Replace flat `from-primary/5 via-background to-accent/10` with a richer multi-stop gradient using the new `--gradient-hero` (indigo → cream → saffron glow) and a soft blurred saffron blob in the corner.
- Headline: keep serif, but colour the verb ("Find" / "શોધો") in saffron for emphasis.
- CTA buttons: primary stays indigo; secondary becomes outlined saffron for visual variety.

### Section tiles (Career / Handbook / Test)
- Each tile gets its own brand accent (indigo, saffron, teal) — coloured icon background, coloured top border, soft tinted hover shadow using the matching `--shadow-glow`.
- Slightly larger icon, bolder titles.

### Stream cards ("paths after Class 12")
- Add a coloured left border per stream and a subtle gradient background tint.
- Hover: lift + tinted shadow.

### Footer (`PublicLayout` footer)
- Already dark indigo (sidebar). Add a thin saffron top accent line and brighten link hover to saffron for warmth.

### Buttons (`src/components/ui/button.tsx`)
- Add two new variants (purely additive, no breaking change):
  - `accent` — saffron background, indigo text — for friendly CTAs.
  - `soft` — tinted brand background (`bg-primary/10 text-primary`) — for tertiary actions.

---

## Out of scope

- No changes to the test flow, scoring logic, Google Sheets sync, or career match engine.
- No changes to admin/teacher routes (different audience, different design language).
- Other PDF pages stay as-is — only the cover is touched.

---

## Files

- **Modified:** `src/lib/psychometricReport.ts` (cover page only, ~lines 270-352)
- **Modified:** `src/styles.css` (add brand helper tokens + gradients)
- **Modified:** `src/components/PublicLayout.tsx` (header polish, footer accent)
- **Modified:** `src/routes/index.tsx` (hero, tiles, stream cards)
- **Modified:** `src/components/ui/button.tsx` (add `accent` and `soft` variants)

## QA

- Generate a sample PDF via the existing sample-report route and visually inspect page 1 (convert to image, confirm name/grade/school all read clearly).
- Load `/` at the current 1162px viewport and at mobile (375px) to confirm the brighter palette holds and nothing regresses.
