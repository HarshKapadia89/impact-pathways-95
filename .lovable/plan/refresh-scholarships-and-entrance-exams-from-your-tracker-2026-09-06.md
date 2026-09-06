# Refresh Scholarships and Entrance Exams from your tracker

Your spreadsheet has 100 scholarships and 100 entrance exams, plus a short list of schemes that must never be shown. The site currently lists only 19 scholarships and 23 exams, so both pages get rebuilt from your file.

## What changes for visitors

**Scholarships page**
- All 100 schemes from your sheet, replacing the current 19 (existing Gujarat entries are kept only if they also appear in your list).
- Each card shows: who it's for, class/level, income limit, amount, where to apply, and the application window with the exact dates from your sheet.
- New filters: state it applies to (All India, Gujarat, Maharashtra and the other 13), category group (central school, state, technical, research, private, etc.), and class/level.
- A "Priority" marker so top-priority and high-priority schemes surface first; low/not-applicable ones still searchable but sorted last.
- Discontinued schemes (NTSE, KVPY, Begum Hazrat Mahal, Maulana Azad Fellowship, Padho Pardesh, minority Merit-cum-Means) are blocked from the site, with a small note explaining they are suspended/discontinued so nobody re-adds them.

**Entrance exams page**
- All 100 exams from your sheet, replacing the current 23.
- Each card shows: stream, qualifying level, conducting body, when it is usually held, and what route it opens after clearing it.
- Filters rebuilt around your sheet: stream group (after Class 10, engineering, medical, law, design, defence, teaching, etc.), qualifying level, and a "realistic for our students" filter (Yes / Maybe / No).
- Exams marked "Yes" appear first.

Language: the four-language switch keeps working; scheme names, exam names and websites stay in English as before, and labels/filters are translated.

## Technical notes

- Convert both sheets into `src/lib/scholarshipsData.ts` and `src/lib/entranceExamsData.ts` via a one-off script; committed output is plain typed TS arrays, no runtime Excel parsing.
- Extend the `Scholarship` type with `appliesTo`, `whoFor`, `incomeLimit`, `applyAt`, `window`, `priority`, `notes`; keep `id`, `name`, `amount`, `website` so existing imports (dashboard/report links, if any) don't break.
- Extend `EntranceExam` with `streamGroup`, `qualifyingLevel`, `routeOpens`, `realistic`, `notes`; retain `id`, `name`, `field`, `level`, `scope`, `conductedBy`, `typicalMonth`, `website`. Derive `field`/`scope`/`level` from Stream + Qualifying level so current filters and any other consumers keep working.
- Slugified stable ids from names; a `DO_NOT_CIRCULATE` array exported and asserted against in the data file.
- Update `src/routes/scholarships.tsx` and `src/routes/exams.tsx` for the new filters, sorting and card fields; keep the current visual style (Indigo & Amber cards, sticky filter bar).
- Verify with a typecheck and a browser pass over both pages.
