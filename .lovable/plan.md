## What "world class" means here

Right now the product is solid: a clean test, a 20-page report, a brand-aligned site. To go from "very good" to world-class, the gaps that show up clearest in the codebase + the 2 real submissions are:

1. **Trust on the landing page is thin.** No testimonials, no counsellor bio, no "How accurate is this?" page, no sample report inline (only static images). Parents pay ₹1,500 sight-unseen.
2. **The PDF is the only deliverable.** No email of the report, no shareable web view, no parent-friendly summary, no follow-up.
3. **The test result vanishes.** Once the PDF closes, the student/parent can't revisit it. There's no private link, no progress save during the test, no resume.
4. **No social proof loop.** No way for a happy parent to share, no counsellor follow-up CTA, no review collection.
5. **Counsellor / ops blind spot.** Admin can see submissions in a sheet, but there's no per-student review screen, no "send to parent" button, no notes by a counsellor.

Picking the highest-leverage slice for this iteration (keeping it shippable in one round, not five): **a Parent + Student report-delivery layer, plus the trust upgrades on the landing page.** This single iteration moves conversion AND retention.

---

## Iteration goal

Every paying student walks away with:
- a private, mobile-friendly **web report URL** they can revisit forever,
- the **PDF emailed** to student + parent automatically,
- a **one-page parent summary** at the top of the report (and on the web view),
- the landing page now has the **proof a parent needs** before paying.

---

## Part A — Trust upgrades on the public site

### A1. Inline interactive sample report on `/test`
Today the sample is 5 static jpg screenshots. Replace the screenshot strip with a small embedded preview that:
- Shows actual rendered cover (we already generate it via `openSampleReport`).
- Has a "Flip through 20 pages" carousel (use existing 5 page screenshots + 3 new ones for: parent summary, careers, action plan).
- Has a "See the full sample (English / Gujarati)" button — already wired, just promote it visually.

### A2. New `/about` page (counsellor + methodology)
Trust comes from a real human + a real method. New route `/about` with:
- Photo + bio of the counsellor / school principal (placeholder content with editable JSON).
- "How the test works" — 3-paragraph explanation of RIASEC + MI + Aptitude with citations.
- "How accurate?" — explain the affinity engine in plain language; note this is guidance, not destiny.
- HBK school context (year founded, students served).

### A3. Testimonials section on `/` and `/test`
- Carousel of 4–6 short quotes (start with placeholder content the school can replace).
- Stored as a single `src/lib/testimonials.ts` JSON so the school can edit without code knowledge.
- Show student first name + grade + city only.

### A4. FAQ accordion on `/test`
8–10 entries covering: refund policy, time required, who sees my data, can I retake, English vs Gujarati, what if I'm in grade 6 vs 12, how is this different from free tests online, do you give college admission help.

### A5. SEO + share polish
- Each route already has its own head() — verify and tighten meta descriptions.
- Add `application/ld+json` `EducationalOrganization` + `Course` schema on `/test` so it shows rich results in Google.
- Generate a real OG image (1200x630) for the home + `/test` instead of reusing the screenshot.

---

## Part B — Report delivery layer

### B1. Shareable private web report (`/r/$reportId`)
After the test, save the full report payload (already in `psychometric_results`) and mint a link like `/r/abc123`. The page is a beautiful, mobile-first web rendering of the same data the PDF uses:
- Hero: name + Holland code + top intelligence + top stream.
- Parent Summary card (see B3).
- Tabs / sections matching the PDF: Interests, Intelligences, Aptitudes, Careers, Action Plan.
- "Download PDF" button regenerates the PDF on demand.
- "Share with parent" → copy link / WhatsApp / email pre-filled.

Security: the URL contains a short random token; no auth required (parents are not logged in). RLS allows public read by `id` but not list — easy to enforce.

### B2. Email delivery via edge function
- New edge function `send-report` that takes `reportId`, fetches the row, generates the PDF server-side (jsPDF runs in workers), and sends via Resend.
- Triggers automatically after payment confirmation in `test.pay.tsx`.
- Two recipients: student email (collected on `/test`) and an optional parent email field (add to the form).
- Template is short + warm, signed by the counsellor, with the web link AND the attached PDF.
- Requires user to add the `RESEND_API_KEY` secret + verified domain.

### B3. Parent Summary page in the PDF + web report
Insert a NEW page (page 2, before the TOC) titled "For Parents — what this means in 2 minutes":
- Plain-language paragraph: "Aarav shows strong Investigative + Logical-Mathematical traits, suited to Science / Engineering paths."
- 3 concrete next steps for the parent: "Talk about subjects in Class 11", "Visit one of these 3 sample colleges", "Encourage these activities".
- Avoids jargon (no "RIASEC", no "Holland code") — that's for the rest of the report.

### B4. Save-and-resume on the test
Today, refreshing `/test/take` loses progress. Add localStorage autosave keyed by mobile number; show a "Resume your test" banner if a draft exists. Critical for a 60-min test on a phone.

---

## Part C — Counsellor mini-dashboard

A lightweight admin view at `/admin/submissions` showing each submission with:
- Student name, grade, mobile, paid status, timestamp.
- Top RIASEC / MI / stream at a glance.
- "Open web report" link.
- "Email PDF" button (re-trigger B2).
- "Add counsellor note" — free text saved to a new column.

This lets the school actually deliver value, not just collect payments.

---

## What we're NOT doing this round

- Cohort/school-level analytics (later).
- Bulk codes / per-school pricing (later).
- WhatsApp delivery (needs WhatsApp Business API setup — separate iteration).
- Re-balancing the test item bank or extended 60-min version (assessment work, separate iteration).
- Changing the PDF visual layout — we just add the Parent Summary page.

---

## Files & data changes

### Database (one migration)
- Add `report_token TEXT UNIQUE` and `counsellor_note TEXT` and `parent_email TEXT` and `emailed_at TIMESTAMPTZ` to `psychometric_results`.
- Add public-read RLS by `report_token` (so `/r/$token` works without auth) — list/select * stays admin-only.

### New files
- `src/routes/r.$token.tsx` — public web report.
- `src/routes/about.tsx` — counsellor + methodology page.
- `src/routes/admin.submissions.tsx` — counsellor dashboard.
- `src/lib/testimonials.ts` — editable testimonials JSON.
- `src/lib/parentSummary.ts` — narrative builder used by both PDF and web view.
- `src/components/ReportWebView.tsx` — shared web rendering of report sections.
- `src/components/Testimonials.tsx`, `src/components/SampleReportCarousel.tsx`, `src/components/FAQ.tsx`.
- `supabase/functions/send-report/index.ts` — edge function for email delivery.

### Modified
- `src/routes/index.tsx` — add Testimonials + FAQ teaser + About link.
- `src/routes/test.index.tsx` — replace screenshot strip with carousel; add FAQ; add parent email field.
- `src/routes/test.pay.tsx` — on payment confirm, mint `report_token`, call `send-report`, redirect to `/r/$token` instead of straight PDF.
- `src/routes/test.take.tsx` — autosave + resume banner.
- `src/lib/psychometricReport.ts` — insert Parent Summary page (page 2).
- `src/components/PublicLayout.tsx` — add `About` to nav.
- `src/components/AdminLayout.tsx` — add `Submissions` link.

### Secrets to request
- `RESEND_API_KEY` (for email).
- The user must verify a sending domain in Resend (we'll guide them).

---

## How to judge success after this lands

- Landing-to-test conversion: should rise meaningfully thanks to A1–A4.
- Test completion rate: should rise thanks to B4 (resume).
- Parent NPS / informal feedback: B2 + B3 turn the deliverable from "a PDF" into "a service".
- Counsellor time per student: drops because C eliminates manual sheet hunting.

If you'd rather front-load a different slice (assessment quality, cohort/school sales, or pure visual polish), say the word and I'll re-scope before any code is written.
