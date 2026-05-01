## Goal
Collect three additional fields on the test intake form — **School Name**, **Mobile Number**, **Email ID** — alongside existing Full Name / Grade / Age / Language, and carry them through payment, submission, sync, and report.

## Changes

### 1. Intake form — `src/routes/test.index.tsx`
- Add `school`, `mobile`, `email` state.
- Add three new `<Field>` inputs (with `type="tel"` for mobile, `type="email"` for email).
- Lightweight client validation:
  - Mobile: 10 digits (Indian format).
  - Email: standard regex (only if provided; or required — see Q1).
  - School: non-empty trim.
- Disable "Continue to payment" until grade + school + mobile (+ email if required) are valid.
- Persist all fields in `sessionStorage["disha-test-meta"]`.

### 2. Test runner — `src/routes/test.take.tsx`
- Read new meta fields and include them in the submission payload (`school_name`, `mobile`, `email`).

### 3. Database — migration via `supabase--migration`
Add nullable columns to both tables:
- `psychometric_submissions`: `school_name text`, `mobile text`, `email text`
- `psychometric_results`: `school_name text`, `mobile text`, `email text`

### 4. Sync — `src/lib/offlineSync.ts` and `src/server/sheetsSync.functions.ts`
- Pass the three new fields through the upsert payload.
- Add the three columns to the Google Sheets row mapping so they appear in the spreadsheet.

### 5. Report — `src/lib/psychometricReport.ts`
- Show School Name on the cover page header (next to name/grade).
- (Optionally) include mobile/email in the small footer/meta line — see Q2.

### 6. Types — `src/integrations/supabase/types.ts` regenerates automatically after migration.

## Open questions
1. Should **Email** be required or optional? (Mobile clearly required for delivery; school clearly required.)
2. Should mobile/email be printed on the PDF cover, or only stored in DB + Sheets?

## Technical notes
- All new DB columns are nullable to stay backward-compatible with existing rows.
- No changes to RLS — existing public insert policy already covers these fields.
- Sheets sync uses upsert by `id`, so adding new columns is additive.
