# Plan: Slim the Gujarat page into a lean "Gujarat Hub"

## Why
The `/career` ("Gujarat") page duplicates content that already lives elsewhere:
- The Gujarat college directory is already on `/find-college` (merged with India colleges, searchable, with a Gujarat/India toggle).
- MYSY, Digital Gujarat and other state schemes are already on `/scholarships` (filterable by state = Gujarat).
- GUJCET, ACPDC, ACPC are already on `/exams` (filterable by scope = Gujarat).

The Career Library (`/career-library`) is profession/stream-focused, so it is **not** a duplicate of the Gujarat page — merging Gujarat colleges "into" the Career Library is the wrong target. The real merge target for colleges is `/find-college`.

This plan removes the duplication while keeping the Gujarat brand, its SEO landing page, and the genuinely Gujarat-specific curation (ACPC counselling flow, MYSY highlights, state-scheme pointers) as a lean hub that deep-links out to the full lists.

## What changes

### `src/routes/career.tsx` — rewrite to a lean Gujarat Hub
- **Keep** the hero: "100% Gujarat-focused" badge, heading, intro paragraph, and the stats row (streams, career paths, Gujarat colleges, MBBS seats, ITI centres). Keep the existing cross-link to `/career-library` for India-wide professions.
- **Remove** the duplicated Gujarat college directory: the category chips, the `CategorySection` college-card grid, and the `GUJ_COLLEGES` rendering. Keep `GUJ_COLLEGE_STATS` for the hero stats only.
- **Replace** the college directory with one prominent CTA card linking to `/find-college` (the full Gujarat + India search).
- **Slim the "Major Entrance Exams" section** to a short highlight (GUJCET, NEET, JEE, CLAT, NID) with a CTA to `/exams` for the full 100-exam list (the full per-exam cards already live there).
- **Keep the "Gujarat — Scholarships & Counselling" section** but convert each `ResourceCard` into a deep-link card: MYSY / Digital Gujarat / Kaushalya → `/scholarships` (state = Gujarat); ACPC / ACPDC → `/exams` (scope = Gujarat). Keep the short descriptions (they are useful orientation), but the cards now link inward instead of duplicating the underlying data.
- **Keep** the "Still unsure?" CTA to `/test`.
- Remove now-unused imports (`GUJ_COLLEGES`, `CategoryGroup`, `CategorySection`, `ENTRANCE_EXAMS` if no longer rendered) but **do not** touch `src/lib/gujaratColleges.ts` — `/find-college` still imports it.
- Update the `head()` description to reflect the hub role (Gujarat counselling, state schemes, and pointers to the full college/exam/scholarship directories) instead of "100+ Gujarat colleges across …".

### No other route changes
- `/find-college`, `/scholarships`, `/exams`, `/career-library` are unchanged — they already hold the full data.
- Nav label stays "Gujarat" (still meaningful as the Gujarat hub).
- No redirects needed; `/career` keeps the same URL and purpose, just leaner.

## Verification
- `bunx tsgo --noEmit -p tsconfig.json` passes (no unused imports, route ID unchanged).
- Playwright: `/career` renders the hero + stats, the /find-college CTA, the slimmed exams highlight, and the deep-link resource cards; no console errors; the four language toggle still works (Gujarati strings already exist in the file).
- Confirm the Gujarat college cards are no longer on `/career` but still searchable on `/find-college`.
