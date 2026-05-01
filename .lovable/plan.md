## Goal
Generate the Career Discovery Report PDF in either English or Gujarati, picked from the `language` field already collected on the test form (and already passed into `generatePsychometricPDF`). Today the generator ignores `language` and renders only English in jsPDF's built-in Helvetica (Latin-1 only).

## Approach

### 1. Embed a Unicode font that supports Gujarati
- Use **Noto Sans** (Latin) + **Noto Sans Gujarati** (Indic) from Google Fonts, both regular + bold.
- Convert the 4 TTFs to base64 and ship them as TS modules in `src/lib/fonts/` (e.g. `notoSansGujarati.ts` exporting a base64 string). This avoids runtime fetches and keeps PDF generation 100% client-side, same as today.
- At the top of `generatePsychometricPDF`, register them with `doc.addFileToVFS()` + `doc.addFont()` so we can call `doc.setFont("NotoGujarati", "bold")` etc.
- Add a `font(doc, weight)` helper that picks Noto Gujarati when `language === "gu"` and Noto Sans (or keeps Helvetica) when `language === "en"`. Replace every `doc.setFont("helvetica", ...)` call with `font(doc, ...)`.
- Loosen the `safe()` glyph filter when a Unicode font is active (still map a few typographic chars like “ ” → " " for consistency, but stop replacing >255 codepoints with `?`).

### 2. Centralise translation strings
- Add `src/lib/psychometricReportStrings.ts` exporting `getReportStrings(lang)` returning a typed object with every user-visible string in the report:
  - Header / footer chrome ("HBK Careers — Career Discovery Report", "Page X of Y", "Generated …")
  - Cover page (tagline, "Prepared for", "Grade", "Age", bullet list at the bottom)
  - Section titles 1–19 (Table of Contents + every page header)
  - About section paragraphs
  - Snapshot labels ("Your top RIASEC code", "Top intelligences", …)
  - "Primary"/"Secondary" badges, "Core subjects", "Top career paths in this stream", "Entrance exams", etc.
  - Skills, This-Year action plan, 3-Year action plan, Parent tips, Glossary
  - Closing disclaimer
- Every Gujarati translation written as proper Devanagari/Gujarati Unicode (e.g. "કારકિર્દી શોધ રિપોર્ટ"). Keep proper nouns (IIT, NEET, GUJCET, college names) in English in both languages — that matches how Gujarati speakers actually refer to them and keeps the data layer untouched.

### 3. Translate domain content
- `RIASEC_LABELS`, `MI_LABELS`, aptitude category names + descriptions, stream names/taglines, career-path titles, college names live in `psychometricData.ts` and `careerData.ts`. Translating the entire careers/colleges dataset is out of scope for this turn (hundreds of strings).
- Pragmatic split:
  - **Translate now** (small, high-impact): RIASEC type names + descriptions, MI type names + descriptions, aptitude category descriptions — these all live inside `psychometricReport.ts` already as inline dictionaries, so we add a Gujarati copy alongside.
  - **Leave in English for now**: stream names/taglines, individual career path titles, college names, exam names. Reason: these are proper nouns or existing dataset content; translating them risks inaccuracy and bloats this change. They will render fine in the Gujarati PDF because the embedded Noto Sans handles Latin too.
- This gives a fully-Gujarati narrative around an English data spine, which is how Gujarati career counselling material is normally written.

### 4. Wire it through
- `generatePsychometricPDF` already receives `language`. Pull `const t = getReportStrings(language)` once, then replace every literal English string with `t.something`.
- Cover page: keep the "ગુજરાતી / English" label that's already there.
- `sampleReport.ts` currently calls the generator with `language: "en"`. Add a second helper `openSampleReportGu()` (and download counterpart) so the marketing page on `/test` can show both versions; update `test.index.tsx` to render two buttons ("View English sample" / "View Gujarati sample"). Existing `openSampleReport()` stays English so nothing else breaks.

### 5. QA
- After implementing, generate both an English and a Gujarati sample PDF in `/tmp` via a quick Node script, render each page to JPEG with `pdftoppm`, and visually check:
  - No `?` boxes anywhere (Gujarati glyphs render correctly)
  - English version is unchanged in look
  - Long Gujarati lines wrap properly inside their boxes
  - Section headers, bars and footers still align

## Files

**New**
- `src/lib/fonts/notoSans.ts` — base64 TTFs for Noto Sans regular + bold
- `src/lib/fonts/notoSansGujarati.ts` — base64 TTFs for Noto Sans Gujarati regular + bold
- `src/lib/psychometricReportStrings.ts` — all translatable strings keyed by language

**Edited**
- `src/lib/psychometricReport.ts` — register fonts, swap `setFont` calls through `font()` helper, replace literal strings with `t.*`, add Gujarati copies of the inline RIASEC/MI/aptitude descriptions, relax `safe()` for Unicode fonts.
- `src/lib/sampleReport.ts` — add `openSampleReportGu()` / `downloadSampleReportGu()`.
- `src/routes/test.index.tsx` — surface both sample buttons.

## Out of scope (call out to user if relevant)
- Translating the full `careerData.ts` stream/path catalogue and `gujaratColleges.ts` / `indiaColleges.ts` directories. Doable as a follow-up if you want a 100% Gujarati PDF.
