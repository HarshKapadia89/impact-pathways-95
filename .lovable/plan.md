# Career Library tab + 24 new career streams

## What you get

1. A new top nav tab **Career Library** (after Colleges) at `/career-library`.
2. That page lists **all streams A–Z** as cards, with a live search box that searches
   both stream names and every individual profession (935+ today, ~1,300+ after this work).
   Searching "ethical hacking" or "actuary" jumps straight to the matching profession.
3. Clicking a stream opens its profession list; clicking a profession opens the existing
   full detail page (Summary, Path, Institutes, Exams, Pros/Cons, Facts) — same engine
   already used in the India tab, so nothing is rebuilt twice.
4. **24 new streams added** so the library matches your list, each with professions,
   entrance exams and ranked colleges/institutes — the same structure as the existing 20.

## New streams to add

Ethical Hacking & Cybersecurity · Aviation · Merchant Navy & Marine · Physical Sciences ·
Life Sciences & Environment · Mathematics & Statistics · Allied Medicine ·
Nutrition, Fitness & Wellness · Animation, VFX & Graphics · Applied Arts ·
Cabin Crew & Airline Services · Civil Services · Defence & Armed Forces ·
Marketing & Advertising · Sales & Business Development · Entrepreneurship ·
Actuarial Sciences · Social Services & Development · Education & Training ·
Distribution & Logistics · Political Science & International Relations · Culinary Arts ·
Psychology · Geography & Earth Sciences · Languages & Linguistics · Museology & Heritage ·
Film Making · Data Science & Artificial Intelligence

Items on your list that already exist (Engineering, Computer Applications & IT, Architecture,
Food & Agriculture, Medicine, Design, Media & Communication, Performing Arts, Hotel Management,
Management, Law, Finance & Banking, Commerce & Accounts, Economics, Social Sciences & Humanities)
are kept as-is and cross-linked, not duplicated. Sub-fields like robotics, mining, power,
genetic, sound and environmental engineering are added as professions inside
Engineering & Technology rather than as separate streams.

## Colleges

Each new stream ships its own ranked institute list (national + strong regional, with entrance
exam and website), so the Institutes section on every new profession page is populated, and the
stream totals on the India / Career Library pages stay accurate.

## Sorting

Sort control on the library: **Name (A–Z)** and **Popularity** (by profession count / demand
weighting), as you specified.

## Technical notes

- New data files follow the existing `src/lib/handbook/<slug>.json` shape
  (`stream`, `professions[]`, `exams[]`, `institutes[]`), so `professionData.ts`,
  `/handbook/$slug`, `/handbook/$slug/$profession` and `/exams` pick them up automatically.
- `src/lib/handbookSummaries.json` regenerated with the new counts.
- New archetype families added to `ARCHETYPES` in `src/lib/professionData.ts` (cyber, aviation,
  marine, actuarial, culinary, psychology, data/AI, museology, logistics, defence, civil services,
  languages, education, social work) so generated summaries read correctly instead of falling back.
- New route `src/routes/career-library.index.tsx` (+ layout) reusing `PublicLayout`, with its own
  `head()` metadata; stream/profession pages continue to live under `/handbook/...` to avoid
  duplicate URLs, with the library acting as the A–Z entry point.
- Nav entry added to `NAV` in `src/components/PublicLayout.tsx` after Colleges.
- Search runs client-side over a prebuilt lightweight index of stream + profession names
  (generated at build from the JSON files) so it stays fast without loading all stream files.
- Trilingual labels (EN/HI/GU) for the new page chrome via the existing i18n dictionary.

## Rollout

Given the volume, the new streams land in batches (roughly 6 streams per batch) so each batch is
reviewable; the Career Library page and nav ship in the first batch and grow as batches land.
