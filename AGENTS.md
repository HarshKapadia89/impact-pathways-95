# Project rules

- Meta Purchase is sent server-side (Conversions API) only when `verifyPayment` first moves an order to paid, with event ID `purchase_<order_id>` reused by the browser Pixel — prevents double-counting and fake purchases.
- The Meta Pixel loads only on an allowlist of public marketing/checkout paths in `src/lib/metaPixel.ts` — keeps test, report and account pages out of ad tracking.
- PDF report text in Gujarati/Devanagari is drawn via browser canvas (`src/lib/pdfIndicText.ts`) and leftover English is translated from `src/lib/reportXlate/{gu,hi,mr}.json`; always `await preloadReportFonts(lang)` before `generatePsychometricPDF` — jsPDF cannot shape Indic conjuncts/matras.
