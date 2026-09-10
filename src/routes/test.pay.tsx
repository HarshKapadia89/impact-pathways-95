import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PublicLayout } from "@/components/PublicLayout";
import { ChevronLeft, BadgePercent, ShieldCheck, Lock, FileText, Sparkles } from "lucide-react";
import { Badge, Button, Card, Input } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import { createPaymentOrder, verifyPayment } from "@/lib/payments.functions";

export const Route = createFileRoute("/test/pay")({
  head: () => ({
    meta: [
      { title: "Secure payment — HBK Careers Psychometric Test" },
      { name: "description", content: "Pay securely by UPI, card, netbanking or wallet and unlock your 20-page personalised career report." },
      { property: "og:title", content: "Secure payment — HBK Careers Psychometric Test" },
      { property: "og:description", content: "Pay securely and unlock your 20-page personalised career report." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PayPage,
});

const FULL_PRICE = 2500;
const DISCOUNTED_PRICE = 1500;
const VALID_COUPON = "HBK1000";

interface Meta {
  name?: string;
  grade?: string;
  age?: string;
  email?: string;
  mobile?: string;
  school?: string;
  schoolName?: string;
  language?: string;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function PayPage() {
  const navigate = useNavigate();
  const startOrder = useServerFn(createPaymentOrder);
  const confirmPayment = useServerFn(verifyPayment);

  const [meta, setMeta] = useState<Meta | null>(null);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [busy, setBusy] = useState(false);
  const [payError, setPayError] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("disha-test-meta");
    if (!raw) {
      navigate({ to: "/test" });
      return;
    }
    setMeta(JSON.parse(raw) as Meta);
    void loadRazorpay();
  }, [navigate]);

  const price = useMemo(() => (couponApplied ? DISCOUNTED_PRICE : FULL_PRICE), [couponApplied]);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === VALID_COUPON) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("That code is not valid. Try HBK1000.");
    }
  };

  const pay = async () => {
    if (!meta) return;
    setPayError("");
    setBusy(true);
    try {
      const ok = await loadRazorpay();
      if (!ok || !window.Razorpay) throw new Error("Could not load the secure payment window. Check your connection.");

      const order = await startOrder({
        data: {
          coupon: couponApplied ? VALID_COUPON : null,
          student_name: meta.name ?? null,
          grade: meta.grade ?? null,
          age: meta.age ?? null,
          email: meta.email ?? null,
          mobile: meta.mobile ?? null,
          school_name: meta.schoolName ?? meta.school ?? null,
          language: meta.language ?? "en",
        },
      });

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amountPaise,
        currency: order.currency,
        name: "HBK Careers",
        description: "Psychometric assessment + 20-page report",
        prefill: {
          name: meta.name ?? "",
          email: meta.email ?? "",
          contact: meta.mobile ?? "",
        },
        theme: { color: "#6a05cc" } /* --hbk-purple token value; Razorpay needs a literal */,
        modal: {
          ondismiss: () => {
            setBusy(false);
            setPayError("Payment was cancelled. You can try again any time.");
          },
        },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const res = await confirmPayment({
              data: {
                orderId: r.razorpay_order_id,
                paymentId: r.razorpay_payment_id,
                signature: r.razorpay_signature,
              },
            });
            sessionStorage.setItem(
              "disha-test-payment",
              JSON.stringify({
                amount: res.amount ?? price,
                coupon: res.coupon,
                order_id: r.razorpay_order_id,
                payment_id: r.razorpay_payment_id,
                paid_at: new Date().toISOString(),
              }),
            );
            navigate({ to: "/test/take" });
          } catch (err) {
            setBusy(false);
            setPayError(err instanceof Error ? err.message : "We could not confirm your payment. Please contact us.");
          }
        },
      });
      rzp.open();
    } catch (err) {
      setBusy(false);
      setPayError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (!meta) return null;

  return (
    <PublicLayout>
      <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <Link to="/test" className="hbk-focus inline-flex items-center gap-1 text-caption text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Back to overview
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-5">
          {/* Payment */}
          <Card variant="surface" padding="lg" className="md:col-span-3">
            <Badge variant="primary" size="sm">Secure payment</Badge>
            <h1 className="mt-3 font-display text-title">Unlock your 20-page career report</h1>
            <p className="mt-2 text-body text-muted-foreground">
              Hi {meta.name || "there"} — pay securely with UPI, card, netbanking or wallet. Your test starts the moment
              your payment is confirmed.
            </p>

            <div className="mt-6 rounded-lg border border-border bg-background p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-caption text-muted-foreground">Total payable</div>
                  <div className="mt-1 font-display text-title">
                    {couponApplied && (
                      <span className="mr-2 text-subheading text-muted-foreground line-through">
                        ₹{FULL_PRICE.toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-primary">₹{price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                {couponApplied && (
                  <Badge variant="success" size="sm">
                    <BadgePercent className="h-3.5 w-3.5" /> HBK1000 · saved ₹{(FULL_PRICE - DISCOUNTED_PRICE).toLocaleString("en-IN")}
                  </Badge>
                )}
              </div>

              {!couponApplied && (
                <div className="mt-5 border-t border-border pt-5">
                  <div className="text-caption text-muted-foreground">Have a coupon code?</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon (e.g. HBK1000)"
                      aria-label="Coupon code"
                      className="flex-1"
                    />
                    <Button variant="accent" onClick={applyCoupon}>Apply</Button>
                  </div>
                  {couponError && <p className="mt-2 text-caption text-destructive">{couponError}</p>}
                </div>
              )}
            </div>

            {payError && (
              <p className="mt-4 rounded-md border border-destructive bg-background p-3 text-caption text-destructive">
                {payError}
              </p>
            )}

            <Button className="mt-6" size="lg" fullWidth withArrow loading={busy} disabled={busy} onClick={pay}>
              Pay ₹{price.toLocaleString("en-IN")} securely
            </Button>

            <p className="mt-3 flex items-center justify-center gap-2 text-caption text-muted-foreground">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Payments processed by Razorpay. We never see your card or UPI details.
            </p>
          </Card>

          {/* Summary */}
          <aside className="space-y-4 md:col-span-2">
            <Card variant="plain" padding="md">
              <div className="text-overline uppercase text-muted-foreground">Order summary</div>
              <dl className="mt-3 space-y-2 text-body">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Student</dt>
                  <dd className="font-medium">{meta.name || "—"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Grade</dt>
                  <dd className="font-medium">{meta.grade || "—"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Assessment</dt>
                  <dd className="font-medium">RIASEC + MI + Aptitude</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-border pt-2">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>₹{FULL_PRICE.toLocaleString("en-IN")}</dd>
                </div>
                {couponApplied && (
                  <div className="flex justify-between gap-3 text-success">
                    <dt>Coupon HBK1000</dt>
                    <dd>− ₹{(FULL_PRICE - DISCOUNTED_PRICE).toLocaleString("en-IN")}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-3 border-t border-border pt-2 font-display text-subheading">
                  <dt>Total</dt>
                  <dd className="text-primary">₹{price.toLocaleString("en-IN")}</dd>
                </div>
              </dl>
            </Card>

            <Card variant="highlight" padding="md">
              <div className="text-overline uppercase">What you get</div>
              <ul className="mt-3 space-y-2 text-body">
                <li className="flex gap-2"><FileText className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> A 20-page personalised report for you and your parents</li>
                <li className="flex gap-2"><Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> Interests, intelligences, aptitude and stream fit</li>
                <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> Career, exam and college pathways matched to your result</li>
              </ul>
            </Card>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
