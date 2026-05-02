# Take payment for each report (auto-verified via Razorpay)

Today the pay page (`src/routes/test.pay.tsx`) shows a static QR and asks the student to type a UTR — the school then verifies manually. This plan replaces that with Razorpay so each report is paid for and **auto-verified** before the test starts. Pricing stays the same: ₹2,500 with `HBK1000` coupon → ₹1,500.

## What the student will see

1. Same intro page (`/test`) → name/grade/age form.
2. New `/test/pay` flow:
   - Order summary + coupon entry (unchanged UI).
   - Click **Pay ₹1,500** → Razorpay Checkout opens (UPI / cards / netbanking / wallets).
   - On success, page polls our backend; once webhook confirms payment, student is auto-redirected to `/test/take`.
   - If they close Checkout, they can retry — same order is reused.
3. `/test/take`, report PDF, and `/r/$token` are **only reachable** if the matching `payment_orders` row is `paid`.

## What changes in the backend

### New table `payment_orders`
- `id` (uuid, pk) — our internal order id, also used as `submission_id` once the test is taken.
- `razorpay_order_id` (text, unique)
- `razorpay_payment_id` (text, nullable)
- `amount_paise` (int), `currency` (text default `INR`)
- `status` (text: `created` | `paid` | `failed`), default `created`
- `coupon` (text, nullable), `student_name`, `grade`, `age`, `email`, `mobile`, `school_name`, `language`
- `paid_at` (timestamptz), `created_at`, `updated_at`
- RLS: anon can `SELECT` own row by `id` (id acts as unguessable token); only service role can `INSERT`/`UPDATE`. (Insert/update happens in server functions with service role.)

### Server functions (`src/server/payments.functions.ts`)
- `createPaymentOrder({ meta, coupon })` → calls Razorpay `POST /v1/orders`, inserts `payment_orders` row, returns `{ orderId, razorpayOrderId, amount, keyId }`. Coupon validated server-side (only `HBK1000` → ₹1,500, else ₹2,500) so the price can't be tampered with from the client.
- `getPaymentStatus({ orderId })` → returns `status` for the polling UI.

### Public webhook route `src/routes/api/public/razorpay-webhook.ts`
- Verifies `X-Razorpay-Signature` HMAC-SHA256 against `RAZORPAY_WEBHOOK_SECRET`.
- On `payment.captured`: marks the matching `payment_orders` row `paid`, stores `razorpay_payment_id` and `paid_at`.
- On `payment.failed`: marks `failed`.
- Returns 200 quickly; idempotent on repeat deliveries.

### Submission linkage
- `psychometric_submissions.id` will use the same uuid as `payment_orders.id`. `offlineSync.ts` already upserts by `id`, so no schema change needed there — we just pass the order id through to `/test/take`.
- Sheet sync gets two extra columns (`razorpay_order_id`, `razorpay_payment_id`) so the school can reconcile.

## What changes in the frontend

- `test.pay.tsx`: drop UTR field + static QR. Add Razorpay Checkout (script loaded on demand from `https://checkout.razorpay.com/v1/checkout.js`). New flow:
  1. On mount, call `createPaymentOrder` with the coupon → store `orderId` in `sessionStorage`.
  2. Coupon "Apply" recreates the order at the new price.
  3. **Pay** button opens Razorpay Checkout with `order_id`.
  4. After checkout closes, poll `getPaymentStatus` every 2 s for up to 60 s. On `paid` → `navigate("/test/take")`.
- `test.take.tsx`: on mount, refuse to render if `getPaymentStatus(orderId) !== "paid"` (redirect back to `/test/pay`).
- Static QR asset (`payment-qr.jpg`) stays in repo but is no longer rendered.

## Secrets & setup the user needs to add

To go live we'll need three secrets (added via the secrets tool, not committed):
- `RAZORPAY_KEY_ID` (also exposed to client as a non-secret build var)
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

In the Razorpay dashboard the user will need to:
1. Create an account (test mode is fine to start) and grab the API key pair.
2. Add a webhook pointing to `https://hbkcareers.org/api/public/razorpay-webhook` with the `payment.captured` and `payment.failed` events, then copy the webhook secret.

We'll start in **test mode** so payments don't move real money until they switch to live keys.

## Out of scope (intentionally)

- Refunds, partial payments, settlement reports — handled in Razorpay dashboard.
- Per-school invoicing or GST line items.
- Changing the price model or adding new coupons.

## Files touched

- New: `supabase/migrations/<ts>_payment_orders.sql`, `src/server/payments.functions.ts`, `src/server/payments.server.ts`, `src/routes/api/public/razorpay-webhook.ts`.
- Edit: `src/routes/test.pay.tsx`, `src/routes/test.take.tsx`, `src/routes/r.$token.tsx` (gate by paid status), `src/server/sheetsSync.functions.ts` (extra columns), `src/lib/offlineSync.ts` (pass through `razorpay_payment_id`).
