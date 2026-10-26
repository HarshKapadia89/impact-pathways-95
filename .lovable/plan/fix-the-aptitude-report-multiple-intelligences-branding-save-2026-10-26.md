# Fix the aptitude report: Multiple Intelligences, branding, saved PDF copies, Gujarati

## 1. Multiple Intelligences showing 0 (root cause confirmed)
The test saves scores under names like `Linguistic`, `LogicalMath`, `Bodily`, but the PDF report looks them up as `linguistic`, `logical`, `bodily`. Nothing matches, so every bar, the radar chart and the "Top intelligence" card fall back to 0 / blank.

Fix: add one shared key map so the report reads the test's real names, in the PDF, on-screen results and the shared report page (`/r/...`). Old saved reports also start showing correct values, since their stored scores are fine.

## 2. Full report check
Generate the PDF in all four languages for a sample student and review every page: RIASEC, Multiple Intelligences, aptitude, streams, careers, parent summary. Fix any other blank, zero or mislabelled sections found.

## 3. Latest HBK branding in the PDF
Update the PDF colours from the old indigo to the HBK palette (purple headers and fields, orange highlights, lime accents), use the official HBK logo on the cover and page headers, and apply the same to the on-screen results and the Career Counsellor review panel.

## 4. PDF copy in the backend
- Every time a report PDF is generated after a test, upload a copy to a private file store and save its link against the student's test record.
- Admin page (`/admin/reports`): list of students with name, grade, school, date, top results, and a "Download PDF" button. Only admins can see or download.

## 5. Gujarati grammar
Review and correct all Gujarati text in the test questions, answer options, test page, report strings and PDF (for example the hero line "કારકિર્દીની દુનિય્ય્ય" becomes "કારકિર્દીની દુનિયા", and the shortened question translations are made complete and natural).

## Technical details
- Key map `{Linguistic→linguistic, LogicalMath→logical, Spatial→spatial, Bodily→bodily, Musical→musical, Interpersonal→interpersonal, Intrapersonal→intrapersonal, Naturalist→naturalist}` applied in `psychometricReport.ts`, `test.take.tsx`, `r.$token.tsx`, `AIInterpretationPanel`; add a unit test asserting a full-score MI answer set yields 100 in the PDF lookup.
- `pdfCharts.ts` default colours and report header colours moved to HBK values (jsPDF needs RGB, derived from the theme tokens).
- New private storage bucket `report-pdfs`, column `pdf_path` on the test results table, admin-only RLS/storage policies; signed URLs for download.
- Gujarati edits in `psychometricData.ts`, `psychometricReportXlate.ts`, `testPageStrings.ts`, `index.tsx`.
