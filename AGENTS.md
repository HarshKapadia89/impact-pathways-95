# Project rules

- Meta Purchase is sent server-side (Conversions API) only when `verifyPayment` first moves an order to paid, with event ID `purchase_<order_id>` reused by the browser Pixel — prevents double-counting and fake purchases.
- The Meta Pixel loads only on an allowlist of public marketing/checkout paths in `src/lib/metaPixel.ts` — keeps test, report and account pages out of ad tracking.
