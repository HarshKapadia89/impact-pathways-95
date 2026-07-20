## Problem

Today the test language is silently inferred from the global header `i18n.language` at the moment the student clicks "Begin test" on `/test`. There is no explicit picker on the intro form, so students don't realise they must switch language *before* starting, and the choice is easy to miss. Additionally, while question text and Likert/MCQ options are already localised (EN/HI/GU), several fixed UI strings on the test-taking page (`Part 1: Interests`, `Part 2: Multiple Intelligences`, `Part 3: Aptitude (Grade X)`, `Progress`, `Page x / y`, `Back`, `Next`, `Finish`, resume prompts) still render in English regardless of chosen language, which makes the experience feel half-translated.

## Goal

Make language a first-class, explicit choice on the pre-test form. Once chosen, the test questions, options, the surrounding test-taking chrome, and the generated PDF report must all render in that language — independent of the header toggle.

## Changes

### 1. Explicit language picker on `/test` (src/routes/test.index.tsx)

- Add a required "Test language / परीक्षा की भाषा / પરીક્ષાની ભાષા" selector in the start form (three large pill buttons: English · हिन्दी · ગુજરાતી), defaulting to the current `i18n.language`.
- Store the picked language in local state (`testLang`) and use *that* — not `i18n.language` — when writing `disha-test-meta` to `sessionStorage`.
- Also call `i18n.changeLanguage(testLang)` on submit so the whole shell aligns with the pick.
- Add a small helper line: "You can change this later only by retaking the test."

### 2. Localise test-taking chrome (src/routes/test.take.tsx)

Introduce a small in-file `T` dictionary keyed by `UILang` for the strings currently hard-coded in English:
- Section titles ("Part 1: Interests (RIASEC)", "Part 2: Multiple Intelligences", "Part 3: Aptitude (Grade {band})")
- `Progress: X%`, `Page {n} / {total}`
- Resume-draft card ("Resume your earlier attempt?", "Resume", "Start fresh", saved-answers sentence)
- Nav buttons: `Back`, `Next`, `Finish`

All strings picked via `T[meta.language]` so the page fully reflects the chosen test language. Header `LanguageToggle` continues to work but is not what drives the test.

### 3. Force PDF / Result to use `meta.language`

`generatePsychometricPDF` and `saveReport` are already called with `meta.language`, and `psychometricReportXlate.ts` covers EN/HI/GU — no logic change needed, just confirm no code path falls back to `i18n.language`. Add a comment noting the source of truth is `meta.language`.

### 4. Sanity check

- `sessionStorage` `disha-test-meta.language` is the single source of truth from the moment the student clicks Start.
- Header toggle change mid-test does not mutate `meta.language` (already the case; keep it that way).

## Out of scope

- No new translations of career-card content or handbook (already trilingual).
- No changes to payment page copy (short, mostly numeric).
- No DB schema change.
