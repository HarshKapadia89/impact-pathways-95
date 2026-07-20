
## Goal
Every profession page under `/career/$stream/$path` should carry the information that the attached career card (DS001 – Industrial Designer) contains, minus what we already show, and render fully in **English, Hindi, Gujarati**.

## What we already have (do NOT duplicate)
Duration · Eligibility · Entrance exams · Avg salary · Description · Top Gujarat colleges · What you'll study · Day in the life · Growth path (basic) · Scholarships · FAQs · Career roles.

## What is missing from the card (to be added)
1. **Personal competencies** – "You are good with…" style bullet checklist.
2. **Work environment** – places of work, weekly hours / shift pattern, differently-abled friendliness.
3. **Entrepreneurship note** – can you start your own firm?
4. **Detailed growth-path ladder** – Trainee → Designer → Sr. Designer → Design Lead (title-only, separate from the salary ladder we already show).
5. **National institutes** – Government + Private institutes across India (currently only Gujarat).
6. **Distance-learning option** (IGNOU etc.) and **Online courses** (NPTEL/Swayam/Udemy) with links.
7. **Loans block** – Vidya Lakshmi, state student credit cards, bank education loans.
8. **Example from the field** – one real practitioner with a 2-line bio and source link.
9. **Search keywords / role synonyms** – helps SEO + student vocabulary.
10. **Reference / source URLs** – Payscale, NIRF etc. as a small footnote.

## Language plan (EN / HI / GU)
- Extend `CareerPath` (in `src/lib/careerData.ts`) with a `titleHi/titleGu`, `descriptionHi/Gu`, `avgSalaryHi/Gu` etc. — only for fields that are prose. Numeric fields (duration, salary numbers, college names) stay language-neutral.
- Extend the new "card extras" (`ExtraContent`) with `hi` and `gu` variants so all added prose is trilingual.
- `PublicLayout` already exposes an i18n language toggle. Read `i18n.language` → `en | hi | gu` and pick the right variant in `career.$stream.$path.tsx`. Fall back to English when a Hindi/Gujarati string is missing.
- Add Hindi strings to `src/lib/i18n.ts` for the section labels ("Personal competencies", "Work environment", etc.).

## Data source strategy (scales to all 522 professions)
Rather than hand-writing prose for every path, we introduce a small **card-extras map** keyed by career path slug, e.g. `industrial-designer`, `mbbs`, `b-tech-computer-science`. Each entry stores the 10 missing fields in EN/HI/GU. Paths without an explicit entry keep today's auto-generated fallback (already trilingual-ready).

- New file: `src/lib/careerCards.ts` – typed `Record<slug, CareerCardExtras>`.
- Seed it with **~30 flagship paths** first (all paths currently in `careerData.ts`: B.Tech, MBBS, CA, LLB, B.Des, B.Arch, BBA, BCA, Hotel Mgmt, etc.).
- Include the uploaded Industrial Designer card as the reference implementation.
- Later cards from the Google-Drive PDF pack can be appended in the same shape (out of scope for this turn; the schema stays stable).

## UI changes to `career.$stream.$path.tsx`
Add these sections after "Day in the life", before "Related exams":
1. **Personal competencies** – tick-list.
2. **Where you'll work** – 3-column grid (Places · Hours · Entrepreneurship).
3. **Career growth ladder** – horizontal stepper (reuses `CareerRoadmap` styling).
4. **Where you'll study – India-wide** – two lists: Government / Private, plus a "Distance & Online" note.
5. **Financing your studies** – Scholarships (existing) + new **Loans** card.
6. **Example from the field** – small quote card with practitioner name, one-line bio, source link.
7. **Also searched as** – comma-separated keyword chips (aids on-page SEO).
8. Footer note: "Salary figures indicative — source: Payscale / NIRF" with the source URL.

All new sections read from `careerCards[slug]` when present, else use safe generic defaults.

## Head / SEO
Update `head()` to switch `title` and `description` by language (English / Hindi / Gujarati) so shared links preview in the reader's language.

## Technical notes
- No database changes; everything is static TS data (fast, SSR-safe, works offline).
- New type additions in `careerData.ts` are additive → no breaking changes to existing consumers (handbook, dashboard, chatbot).
- All added strings pass through `t()` or the manual `lang` switch already used in the file — no new i18n framework.
- 522-card bulk import is deferred: this turn wires the schema, UI, and ~30 flagship entries. Bulk PDF-→-JSON extraction can follow in a dedicated batch turn once you confirm the schema.

## Out of scope for this turn
- Bulk-ingesting all 522 PDFs (needs a separate extraction pipeline; will propose once schema is approved).
- Translating the entire `handbook` route (kept as EN/GU as it is today).
- Changing psychometric report language (separate track already discussed).
