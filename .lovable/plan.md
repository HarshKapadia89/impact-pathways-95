## Goal

Let a student pick English / हिन्दी / ગુજરાતી on the test intake form and have every subsequent surface — RIASEC questions, MI questions, aptitude MCQs (question + all 4 options), the on-screen result page, and the full 20-page PDF report — render in that language. Report PDF must embed Devanagari font so Hindi renders correctly.

## What exists today

- `Lang` type is `"en" | "gu"`. RIASEC/MI question stems have real Gujarati; aptitude options are English-only (the `opt()` helper duplicates `en` into `gu`).
- `test.take.tsx` hardcodes English (`item.text.en`, `o.label.en`, `meta.language = "en"`).
- `psychometricReportStrings.ts` — `getReportStrings()` ignores its arg and always returns English.
- PDF report embeds Noto Sans + Noto Sans Gujarati; no Devanagari font yet.
- Header language toggle (EN → HI → GU) already exists, but the test flow ignores it.

## Plan

### 1. Widen the language type end-to-end
- `Lang` and `ReportLang` become `"en" | "hi" | "gu"`.
- `LikertItem.text`, `AptitudeItem.text`, `AptitudeItem.options`, `LIKERT_OPTIONS.label` all gain `hi` alongside `en` and `gu`.
- Meta / payload / dashboard store / offline queue accept the wider union.

### 2. Fill in real translations for the test bank
- Rewrite `RIASEC_ITEMS` and `MI_ITEMS` to carry proper Hindi text next to existing English/Gujarati.
- Rewrite `APTITUDE_ITEMS`: replace the `opt(...)` shortcut with per-language option arrays, add proper Gujarati and Hindi for both the question stem and every option across all 3 grade bands.
- Translations are authored by hand in the repo, not called at runtime — keeps the test deterministic and offline-capable.

### 3. Wire language selection through the flow
- Test intake form (`test.index.tsx`) already collects preferences; add a language radio (English / हिन्दी / ગુજરાતી) stored on `Meta`.
- `test.take.tsx` reads `meta.language` and renders `item.text[lang]`, `option[lang]`, `LIKERT_OPTIONS.label[lang]`. Nav buttons ("Back", "Next", "Finish", "Progress", "Resume", etc.) become localised strings.
- Result screen (Result component) uses the same lang for headings, buttons, "Download report", AI panel labels.

### 4. Rebuild `psychometricReportStrings.ts` for three languages
- Replace the single English `ReportStrings` object with `en`, `hi`, `gu` variants covering: brand line, TOC, section titles, snapshot phrasing, RIASEC/MI/Aptitude labels + descriptions, streams, careers, exams, colleges, skills list, action-plan lists, parent tips, glossary, footer, page-of, "Executive Summary", etc.
- `getReportStrings(lang)` returns the right one.

### 5. PDF report — add Devanagari font + smart font routing
- Add `src/lib/fonts/notoSansDevanagari.ts` (base64 of Noto Sans Devanagari Regular + Bold), same pattern as the existing Gujarati font file.
- Register a new `FONT_HI` alias in `psychometricReport.ts`.
- Extend `hasGu`-style detection with `hasHi` (`U+0900–U+097F`); `smartFont` picks Devanagari font for Hindi strings, Gujarati font for Gujarati strings, Latin font otherwise. Works for mixed strings (proper nouns stay Latin).
- Report body loops over questions in the appendix — those already carry `text[lang]` from step 2, so appendix pages render in the chosen language automatically.

### 6. AI interpretation panel
- Pass `language` to `fetchInterpretation` so the `interpret-report` edge function returns narrative + action plan in the selected language (system prompt tweak: "respond in {lang}"). Non-blocking — panel already handles error state.

### 7. Sanity checks
- Take the test in each language, download the PDF, open pages 1/2/RIASEC/MI/Aptitude/Appendix, confirm glyphs render (no boxes) and no English leaks into HI/GU sections.
- Verify dashboard/report-token flow still works (language field is stored but non-breaking for existing rows).

## Out of scope (call out to user)

- Translating career-card prose and stream deep-dive copy inside the PDF beyond section headings — those pull from `careerData` / `careerCards` (career-cards trilingual work landed earlier; stream copy stays English for now).
- Retranslating the marketing site pages (About, Parents, FAQ, etc.).
- Translations of the AI chatbot answers — the chatbot already handles language via its own prompt.

## Notes

- Hand-authored translations (not runtime AI) so the test is deterministic, printable, and offline-friendly.
- Adding a Devanagari TTF grows the JS bundle by ~350 KB gzipped (same order of magnitude as the Gujarati font already shipped).
- This is a large mechanical edit across ~8 files with hundreds of translation strings; expect a single big commit rather than incremental UI changes.
