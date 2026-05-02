CREATE TABLE public.payment_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  razorpay_order_id text UNIQUE,
  razorpay_payment_id text,
  amount_paise integer NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  status text NOT NULL DEFAULT 'created',
  coupon text,
  student_name text,
  grade text,
  age integer,
  email text,
  mobile text,
  school_name text,
  language text DEFAULT 'en',
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can read order by id"
  ON public.payment_orders
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TRIGGER update_payment_orders_updated_at
  BEFORE UPDATE ON public.payment_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_payment_orders_razorpay_order_id ON public.payment_orders(razorpay_order_id);