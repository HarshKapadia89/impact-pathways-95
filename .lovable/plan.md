## What changes

### 1. Remove Gujarati report (keep English only)
- Delete Gujarati buttons on `src/routes/test.index.tsx` (View/Download Gujarati PDF).
- Remove the language selector before starting the test — language is fixed to English.
- Strip Gujarati branches from `src/routes/test.take.tsx` and the result page (all `lang === "gu"` ternaries → English string).
- Simplify `src/lib/psychometricReport.ts`: drop the Noto Sans Gujarati font registration and the `language: "gu"` code path.
- Delete `src/lib/fonts/notoSansGujarati.ts`, `NotoSansGujarati-*.ttf`, and the `gu` half of `src/lib/psychometricReportStrings.ts`.
- Note: site-wide UI translations (header nav, home page, etc.) stay as-is unless you also want those removed — confirm during implementation if needed. The **report PDF** is the only thing this change strictly targets.

### 2. Remove the word "Free" from the entire site
- Replace every "Free" / "free" mention across `src/routes/index.tsx`, `src/routes/test.index.tsx`, `src/routes/find-college.tsx`, `src/routes/career.*`, `src/routes/admin.tsx`, `src/components/PublicLayout.tsx`, `src/components/CareerChatbot.tsx`, `src/lib/careerData.ts`, `src/lib/psychometricData.ts`, `src/lib/psychometricReportStrings.ts`.
- Replacement strategy: rephrase rather than blank-delete. Examples:
  - "Free Bilingual Psychometric Test" → "Psychometric Test for Grades 6–12"
  - "100% Free · Instant 20-page PDF" → "Instant 20-page PDF Report"
  - "Take the free test" → "Take the test"
  - "Free forever" → trust badge replaced with "Trusted by schools"
  - FAQ "Is the test really free?" → removed; replaced with a pricing FAQ.
- Also remove the matching Gujarati "મફત" strings (they go away with the Gujarati removal anyway).

### 3. Paid aptitude test with QR + coupon
- Add a payment gate before `/test/take`. New flow: intro → **Payment screen** → existing meta form → test.
- New file `src/routes/test.pay.tsx`:
  - Shows ₹2,500 (struck through) → ₹1,500 with coupon **HBK1000** in an attractive offer card.
  - Embeds your uploaded UPI/payment QR PNG (you'll upload it in the next message; I'll save it to `src/assets/payment-qr.png`).
  - Coupon input box: entering `HBK1000` instantly drops the price to ₹1,500 with a confirmation animation.
  - "I have paid — enter UTR / Transaction ID" field (required, min 6 chars). Stored locally + synced.
  - "Continue to test" button enabled only after UTR entered.
  - Sets a `sessionStorage` flag `disha-test-paid = { amount, coupon, utr, paidAt }` that `/test/take` checks; users hitting `/test/take` directly without it get redirected to `/test/pay`.
- Conversion-friendly copy: "Limited launch offer — save ₹1,000 with code HBK1000", countdown urgency line, list of what they get (20-page PDF, RIASEC + MI + Aptitude, career & college recommendations, AI chatbot follow-up).
- Payment record schema: extend `psychometric_submissions` table with columns `payment_amount int`, `payment_coupon text`, `payment_utr text`, `paid_at timestamptz`. Mirror these into the Google Sheet append (extra columns).

### 4. Make the aptitude test much more accurate (Grade-banded 6–8 / 9–10 / 11–12)
- Rewrite `APTITUDE_ITEMS` in `src/lib/psychometricData.ts` to ~75 questions tagged with `gradeBand: "6-8" | "9-10" | "11-12"` and `category: "Numerical" | "Verbal" | "Logical" | "Spatial" | "Mechanical" | "DataInterpretation"`.
- ~25 questions per band, balanced 5–6 categories × 4 each, calibrated to NCERT-aligned difficulty:
  - **6–8**: arithmetic, fractions, basic algebra, vocabulary, simple analogies, pattern recognition, mirror images, simple cause-effect mechanical.
  - **9–10**: percentages, ratios, basic geometry, comprehension, reasoning chains, paper folding, lever/pulley basics, bar/pie charts.
  - **11–12**: data interpretation, probability basics, syllogisms, critical reasoning, 3D rotation, mechanical advantage, error spotting.
- Selection logic in `src/routes/test.take.tsx`: based on the grade entered on the meta form, only items with the matching band are served (≈24 questions, 4 pages of 6).
- Scoring in `src/lib/psychometricData.ts` (`scoreAptitude`) updated to compute per-category percentage **and** an age-normalised band score so reports stay comparable across grades.
- Existing `aptitude_top` and stream recommendations in `src/lib/careerData.ts` continue to work — categories remain the same set, just expanded.

### 5. Database + sheet updates
- Migration: add `payment_amount`, `payment_coupon`, `payment_utr`, `paid_at`, `grade_band` to `public.psychometric_submissions`. Same for the legacy `public.psychometric_results` (best-effort).
- `src/server/sheetsSync.functions.ts`: append the 5 new columns to the header row and each appended row.

### 6. SEO + meta cleanup
- Update titles/descriptions/og tags on `index.tsx` and `test.index.tsx` to drop "Free" and reflect the paid offer ("₹1,500 with launch code HBK1000").
- Single H1 per page maintained.

## Files touched (summary)

**Edited**
- `src/routes/test.index.tsx`, `src/routes/test.take.tsx`, `src/routes/index.tsx`, `src/routes/find-college.tsx`, `src/routes/career.tsx`, `src/routes/career.$stream.index.tsx`, `src/routes/career.$stream.$path.tsx`, `src/routes/admin.tsx`
- `src/components/PublicLayout.tsx`, `src/components/CareerChatbot.tsx`
- `src/lib/careerData.ts`, `src/lib/psychometricData.ts`, `src/lib/psychometricReport.ts`, `src/lib/psychometricReportStrings.ts`, `src/lib/sampleReport.ts`
- `src/server/sheetsSync.functions.ts`, `src/routes/test.take.tsx` enqueue payload

**New**
- `src/routes/test.pay.tsx` (payment screen)
- `src/assets/payment-qr.png` (your uploaded image)
- One DB migration

**Deleted**
- `src/lib/fonts/notoSansGujarati.ts`, the two Gujarati TTFs

## What I need from you to start
1. **Upload the payment QR image** in your next message (PNG/JPG). I'll drop it into `src/assets/payment-qr.png`.
2. Confirm coupon code = **HBK1000** (or tell me a different code).
3. Confirm the price displayed to user: original **₹2,500** struck through → final **₹1,500** with the coupon.
