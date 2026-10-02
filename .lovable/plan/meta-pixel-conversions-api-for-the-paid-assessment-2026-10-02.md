# Meta Pixel + Conversions API for the paid assessment

Follows the uploaded brief: Purchase is the main signal, fires once per verified Razorpay order, and the browser and server copies are deduplicated.

## What you need to provide
- **Meta Pixel ID**: received (1164890204578653). It is public, so it can sit in the site code.
- **Conversions API access token**: received. It will be saved as an encrypted secret, never in the code.
- Optional: a **Test Event Code** so you can watch events arrive in Meta's "Test Events" tab before launch.

## Where events fire

| Event | Trigger |
|---|---|
| PageView | Public marketing and checkout pages only: home, /test, /test/pay, about, parents, schools, scholarships, exams, career library. Not on the test-taking page, reports, shared reports, dashboard, admin or teacher pages. |
| ViewContent | /test offer page loads. Value = price shown (2500 INR), content_ids ["hbk_aptitude_test"]. |
| ViewSampleReport (custom) | The sample report preview actually opens on /test. |
| InitiateCheckout | Form details accepted and the Razorpay order is created (actual payable amount, e.g. 1500 with HBK1000). |
| AddPaymentInfo | Skipped. Razorpay does not report a "method chosen" step, and the brief allows leaving it out. |
| Purchase | Only after the server confirms the Razorpay signature and marks the order paid. Value = amount actually paid, INR, num_items 1. |

## Stopping double counting
- Purchase event ID = `purchase_<razorpay_order_id>`, used for both the browser and server copies.
- The server sends Purchase only the first time an order moves to "paid", and records that it was sent. Retries, refreshes and repeat verification send nothing new.
- No student name, school, email, phone, answers or scores are sent to Meta. Automatic form capture is turned off.

## Technical details
- `src/lib/metaPixel.ts`: loads the fbq script only on allowed pages, sets `autoConfig=false`, and provides a `track(name, params, eventId)` helper. Pixel ID is a constant.
- `src/routes/__root.tsx`: fires PageView on route change if the path is on the allowlist.
- `src/routes/test.index.tsx`: ViewContent on mount; ViewSampleReport when the sample section/modal opens.
- `src/routes/test.pay.tsx`: InitiateCheckout after `createPaymentOrder` succeeds (eventID `checkout_<orderId>`); browser Purchase only after `verifyPayment` returns ok, using the server-returned amount and the shared event ID.
- `src/lib/payments.functions.ts`: in `verifyPayment`, update only rows still `created` (`.neq("status","paid")`); when the update actually changed a row, POST to `graph.facebook.com/v21.0/<PIXEL_ID>/events` with event_id, event_time, action_source "website", event_source_url, client IP and user agent from request headers, and `_fbp`/`_fbc` cookies passed from the browser. Return `eventId` to the client.
- Migration: add `meta_purchase_sent_at timestamptz` to `payment_orders` for delivery tracking.
- Secret: `META_CAPI_ACCESS_TOKEN` (and optional `META_TEST_EVENT_CODE`).
- Record the tracking decision in `AGENTS.md`.

## After building
Test in Meta Test Events: offer visit, a rejected form (no checkout), a completed HBK1000 payment (one Purchase of 1500), then a page refresh (no second Purchase).
