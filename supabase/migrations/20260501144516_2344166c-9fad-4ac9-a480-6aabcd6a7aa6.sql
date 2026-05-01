ALTER TABLE public.psychometric_submissions
  ADD COLUMN IF NOT EXISTS payment_amount integer,
  ADD COLUMN IF NOT EXISTS payment_coupon text,
  ADD COLUMN IF NOT EXISTS payment_utr text,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS grade_band text;

ALTER TABLE public.psychometric_results
  ADD COLUMN IF NOT EXISTS payment_amount integer,
  ADD COLUMN IF NOT EXISTS payment_coupon text,
  ADD COLUMN IF NOT EXISTS payment_utr text,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS grade_band text;