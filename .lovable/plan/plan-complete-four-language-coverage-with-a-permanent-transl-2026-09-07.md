# Plan: Complete four-language coverage with a permanent translation safeguard

## Confirmed problems
- The 15 LevelUp Lab topic files contain newly expanded reading, task, checkpoint, note, case-study, practice, quiz, and navigation content that is rendered directly from English JSON.
- The current generated dictionaries are missing approximately **4,475 Gujarati**, **4,474 Hindi**, and **4,475 Marathi** LevelUp Lab phrases. The exact English paragraph shown in the screenshot is absent from all three dictionaries.
- The current automatic translator only replaces a text node when its complete trimmed English text exactly matches a dictionary key. New or changed paragraphs therefore remain English without any warning.
- Saved language is detected from browser storage before React hydration. The server renders English while the first client render can already be Hindi, which produces the confirmed `Home` / `होम` hydration error.

## What will change

### 1. Translate every LevelUp Lab content field
- Complete Gujarati, Hindi, and Marathi translations for all 150 lessons and all 1,050 study days, including:
  - topic and lesson titles, introductions, outcomes, and levels
  - Why this matters and full lesson notes
  - every Read, Do, and Check section
  - study-day focus and tasks
  - case-study country labels, stories, and takeaways
  - practice exercises and every quiz question/answer
  - resource labels and previous/next lesson labels
- Use education-appropriate, grammatically natural language rather than word-for-word transliteration.
- Remove the “English content” fallback notice wherever complete localized content is available.

### 2. Make structured content translate at render time
- Add one shared phrase resolver for English-authored data and use it wherever lists or JSON content are rendered.
- Apply it to LevelUp Lab, profession details, Career Library, exams, scholarships, colleges, career roadmaps, report summaries, and other structured catalogues.
- Keep the DOM translation layer only as a safety net for ordinary static text, not as the primary translation mechanism for data-driven pages.
- Translate placeholders, field labels, validation messages, tooltips, button accessibility labels, menus, dialogs, toasts, loading/empty/error states, and print views—not only visible paragraph nodes.

### 3. Audit every page and deliverable
- Inventory every public, student, teacher, and admin page plus shared header, footer, mobile menu, chatbot, test flow, booking flow, forms, and 404/error screens.
- Complete missing Gujarati, Hindi, and Marathi entries across all four-language dictionaries.
- Verify the aptitude test end to end: setup, instructions, questions, choices, progress, results, AI interpretation, and downloaded PDF.
- Verify LevelUp Lab topic and master certificates in all four languages.
- Verify shared report pages and downloadable reports in the language selected by the student.
- Proper names, official exam/institution names, URLs, email addresses, and registered brand names remain unchanged only where translating them would make them inaccurate; every surrounding label and explanation is translated.

### 4. Fix language switching and hydration
- Introduce a hydration-safe language bootstrap so server output and the first browser render always agree.
- Preserve the saved language and switch the complete page only after the language state is ready, without mixed-language sections.
- Update the document language attribute when the selection changes.
- Ensure switching between any two languages restores the correct source text and does not leave phrases from the previous language behind.

### 5. Prevent this from recurring with new changes
- Add an automated localization coverage audit that scans source content and structured datasets against Gujarati, Hindi, and Marathi dictionaries.
- Treat missing user-visible phrases as a failing check, with a precise file/field report instead of silently falling back to English.
- Add a project rule and content helper so every newly added heading, paragraph, form field, lesson, list item, test question, report string, and PDF string must include all four languages before the change is considered complete.

## Verification
- Run the coverage audit with **zero unexplained missing user-visible phrases** for Gujarati, Hindi, and Marathi.
- Browser-check every content route in all four languages, including direct page loads with a previously saved non-English language.
- Exercise language switching on long lesson pages and dynamic states such as expanded days, quizzes, forms, chatbot replies, errors, and completion states.
- Complete representative aptitude-test and LevelUp Lab flows in Gujarati, Hindi, and Marathi, then inspect the generated PDFs/certificates for correct script, wrapping, and no English fallback.
- Confirm no hydration errors, mixed-language content, missing glyphs, clipped text, or console errors on desktop and mobile widths.
