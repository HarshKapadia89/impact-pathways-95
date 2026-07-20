# Plan: Career Cards Hub + Full HI/GU Test & Report

Two independent workstreams. Both can ship in one build.

---

## Part 1 — Career Cards Hub (`/careers-cards`)

### Prerequisite (blocking)
You'll share the master Google Sheet URL that has all card fields for the 522 careers (role name, category, education path, entrance exams, key skills, salary band, top employers, EN/HI/GU description). I'll import from that sheet — the Index sheet in the Drive folder only has folder-level counts, not per-card data.

Once shared, I:
1. Create `career_cards` table in Lovable Cloud with columns: `id, code, name_en, name_hi, name_gu, category, handbook_stream_slug, education, exams[], skills[], salary_min, salary_max, employers[], description_en, description_hi, description_gu, pdf_url_en, pdf_url_hi, pdf_url_gu`. RLS: public SELECT.
2. Run a one-time import script (via `code--exec` + Google Sheets connector) that also resolves each card to one of our 20 existing handbook streams via a keyword/category map.
3. Match PDF filenames in the Drive folders to card codes and store viewable Drive URLs (`https://drive.google.com/file/d/{id}/preview`).

### New pages
- **`/careers-cards`** — main hub
  - Search bar + filters (stream, category, salary band, exam)
  - Grid of card tiles (name, category chip, top skills, salary)
  - Language toggle (EN / HI / GU) updates card text and PDF link
  - Each card has: **View details**, **Open PDF** (in current language), **+ Compare** (adds to compare tray)
- **`/careers-cards/$code`** — single card detail
  - Full structured info, embedded PDF preview iframe, bookmark button, link back to the mapped handbook stream page
- **`/careers-cards/compare`** — comparison view
  - Up to 4 cards side-by-side table: education, exams, skills, salary, employers, RIASEC fit
  - Sticky compare tray on `/careers-cards` shows selected cards + "Compare (n)" button
  - Compare selection persisted in `localStorage` (no login required)

### Handbook integration
Each `/handbook/$slug` page gets a new "Explore careers in this stream" section listing matching cards (linked via `handbook_stream_slug`).

### Nav
Add "Career Cards" to top nav (row 2, between Handbook and Colleges).

---

## Part 2 — Full HI/GU Test + Report

### Language plumbing (ships first)
- Extend `Meta.language` type from `"en"` → `"en" | "hi" | "gu"` in `src/routes/test.take.tsx` (currently hardcoded to `"en"`).
- Read `language` from the intake form (`test.index.tsx`) and honour it end-to-end: question stems, options, aptitude items, result page UI, PDF report.
- `psychometricData.ts`: extend `text/options` shape from `{en, gu}` to `{en, hi, gu}` for all RIASEC + MI + aptitude items (~150 items).
- `psychometricReportStrings.ts`: rebuild `hi` and `gu` string bundles alongside the existing `en` (currently `getReportStrings` returns EN for both).
- `psychometricReport.ts`: font already loads `notoSans`; extend to Devanagari + Gujarati fonts (Noto Sans Devanagari + Noto Sans Gujarati) so the jsPDF report renders both scripts. Report cover, section titles, narrative, appendix all switch on `language`.
- Result page (`test.take.tsx`) + `AIInterpretationPanel` + `ReportPreview` + Parent Summary switch on language.
- `interpret-report` edge function receives `language` and instructs the model to write the narrative in that language.

### AI-generated translations
Using `google/gemini-2.5-pro` via the AI Gateway skill, I generate:
- All missing HI translations for RIASEC/MI question texts + options
- All HI + GU translations for aptitude items (question + 4 options each), with a system prompt that preserves numbers, units, and technical precision
- HI + GU translations for `psychometricReportStrings.ts` (cover, TOC, section bodies, skill lists, action plans, parent tips, glossary, closing)
- HI + GU narrative templates for `parentSummary.ts` and `chatbotContext.ts`

Output committed as static TS strings — no runtime translation. You spot-check a sample of each language before we mark it done; anything you flag I revise.

### Report language flag storage
- Save `language` on `psychometric_submissions` (already saved via `meta.language`) and use it as the source of truth when regenerating the PDF from `/r/$token`.
- Google Sheets sync gains a `Language` column.

---

## Technical section (dev-only)

- **Fonts:** add `src/lib/fonts/notoDevanagari.ts` and `src/lib/fonts/notoGujarati.ts` (base64) mirroring existing `notoSans.ts`; register in jsPDF based on `report.language`.
- **Aptitude translation quality:** aptitude items are shuffled, so any translation drift breaks scoring only if `answer` index changes — I keep option order identical in translation prompts and validate with a diff check post-generation.
- **Build error above:** the import-protection failure will be diagnosed when we enter build mode (likely a `.functions.ts` file importing `client.server` at top level from earlier work). I'll read the full stderr and fix before adding new files.
- **New table grants:**
  ```sql
  GRANT SELECT ON public.career_cards TO anon, authenticated;
  GRANT ALL   ON public.career_cards TO service_role;
  ALTER TABLE public.career_cards ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "public read" ON public.career_cards FOR SELECT USING (true);
  ```
- **PDF hosting:** we link to Drive `preview` URLs — no storage cost. If Drive rate-limits or you want the app to work with Drive private, follow-up is mirroring PDFs into a Supabase storage bucket.

---

## Suggested build order
1. Fix the outstanding build error.
2. Ship language plumbing end-to-end in EN only (regression-safe).
3. AI-translate + wire HI and GU strings; you review batches.
4. Once you share the master sheet: build `career_cards` table, import, ship the hub + compare + handbook integration.

Reply with the master Google Sheet link and I'll start building.
