# Four languages, end to end: English, ગુજરાતી, हिन्दी, मराठी

## Goal

Every page, button, label and message on the site reads correctly in the language the visitor picks — not just a few pages. Gujarati gets a full grammar and wording clean-up, and Hindi and Marathi are added alongside it.

## What changes for visitors

- The language switch offers four choices: English, ગુજરાતી, हिन्दी, मराठी. The choice is remembered and applies to the whole site, including the test and the report.
- All pages currently written only in English-or-Gujarati (home, Gujarat guidance, India handbook, colleges, career library, scholarships, exams, dashboard, resume builder, about, parents, success stories, FAQ, for schools, chat assistant, menus and footers) show properly translated text in all four languages.
- Gujarati wording is rewritten by-hand across the site: correct grammar, natural student-facing phrasing, consistent terms for words like stream, exam, college, report, scholarship.
- The aptitude test questions, options, on-screen guidance and the PDF report already exist in three languages; Marathi is added to them and the Gujarati text is corrected in the same pass.

## Scope of the text itself

Two kinds of text exist on the site and they are treated differently:

1. **Site text and curated guidance** (menus, headings, page copy, buttons, test items, report labels, career stream names and descriptions, FAQs, scholarships, exams) — fully translated into all four languages.
2. **The large auto-generated directory** (roughly 1,650 profession profiles and 1,900 institute entries in the India handbook) — the page frame, section names and labels translate fully; the individual profession write-ups fall back to English where a translation does not exist, with a small "shown in English" note. Hand-translating that volume is not realistic in one pass; it can be filled in stream by stream later if wanted.

## How it is built

- Move all currently hardcoded `lang === "gu" ? ... : ...` pairs (28 files, ~300 occurrences) into i18next translation files: `src/locales/{en,gu,hi,mr}.ts`, keyed by page/section.
- Replace the two-way language flag with a shared `useLang()` helper returning `en | gu | hi | mr`, so components stop assuming only two languages.
- Extend `LanguageToggle` from a cycle button to a four-option dropdown; keep the footer placement and add it to the header row too.
- Extend the trilingual data structures already in place (`careerCards.ts`, `psychometricData.ts`, `psychometricReportXlate.ts`, `chatbotContext.ts`, `careerData.ts`, `handbookOverviews.ts`, `scholarshipsData.ts`, `entranceExamsData.ts`) with an `mr` field and correct the existing `gu` strings.
- PDF report: register a Devanagari font for Marathi (the same Noto Devanagari already used for Hindi) and add Marathi label strings.
- The chat counsellor answers in the visitor's selected language.
- Add `lang` on the page and per-language page titles/descriptions so search engines index each language correctly.

## Order of work

1. Translation infrastructure: locale files, `useLang()`, four-way switcher, language on the page.
2. Convert shared shell + home + high-traffic pages; corrected Gujarati and new Hindi/Marathi copy.
3. Convert remaining pages (career, handbook, colleges, career library, scholarships, exams, dashboard, resume, about/parents/stories/FAQ/schools).
4. Test flow and PDF report: Marathi added, Gujarati corrected.
5. Chat counsellor and English fallback notice for the large directory.
6. Walk every page in all four languages and fix leftovers.

This is a large job; it will land in these steps rather than all at once.
