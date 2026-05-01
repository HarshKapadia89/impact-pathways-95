import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { ChevronLeft, ChevronRight, BadgePercent, IndianRupee, ShieldCheck } from "lucide-react";
import paymentQR from "@/assets/payment-qr.jpg";

export const Route = createFileRoute("/test/pay")({
  head: () => ({
    meta: [
      { title: "Pay & Unlock — HBK Careers Psychometric Test" },
      { name: "description", content: "Pay ₹1,500 (intro) via UPI/QR and unlock the 20-page personalised report." },
    ],
  }),
  component: PayPage,
});

const FULL_PRICE = 2500;
const DISCOUNTED_PRICE = 1500;
const VALID_COUPON = "HBK1000";

interface Meta {
  name: string;
  grade: string;
  age: string;
  language: "en";
}

function PayPage() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [utr, setUtr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("disha-test-meta");
    if (!raw) {
      navigate({ to: "/test" });
      return;
    }
    setMeta({ ...(JSON.parse(raw) as Meta), language: "en" });
  }, [navigate]);

  const price = useMemo(() => (couponApplied ? DISCOUNTED_PRICE : FULL_PRICE), [couponApplied]);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === VALID_COUPON) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon. Try HBK1000.");
    }
  };

  const proceed = () => {
    if (!utr.trim() || utr.trim().length < 6) return;
    setSubmitting(true);
    sessionStorage.setItem(
      "disha-test-payment",
      JSON.stringify({
        amount: price,
        coupon: couponApplied ? VALID_COUPON : null,
        utr: utr.trim(),
        paid_at: new Date().toISOString(),
      }),
    );
    navigate({ to: "/test/take" });
  };

  if (!meta) return null;

  return (
    <PublicLayout>
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        <Link to="/test" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" /> Back to overview
        </Link>

        <div className="mt-4 grid md:grid-cols-5 gap-8">
          {/* Left — pay card */}
          <div className="md:col-span-3 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
              <IndianRupee className="h-3.5 w-3.5" /> Step 1 — Payment
            </div>
            <h1 className="mt-2 font-serif text-2xl md:text-3xl">Unlock your 20-page report</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Hi {meta.name}, scan the QR with any UPI app (PhonePe, GPay, Paytm, etc.) and pay the amount shown below.
            </p>

            {/* Price summary */}
            <div className="mt-6 rounded-xl border border-border bg-background p-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Test fee</div>
                  <div className="font-serif text-3xl mt-1">
                    {couponApplied && (
                      <span className="line-through text-muted-foreground text-xl mr-2">₹{FULL_PRICE.toLocaleString("en-IN")}</span>
                    )}
                    <span className={couponApplied ? "text-accent" : "text-primary"}>
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                {couponApplied && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-medium">
                    <BadgePercent className="h-3.5 w-3.5" /> HBK1000 applied · save ₹{(FULL_PRICE - DISCOUNTED_PRICE).toLocaleString("en-IN")}
                  </div>
                )}
              </div>

              {!couponApplied && (
                <div className="mt-5 border-t border-border pt-5">
                  <div className="text-xs text-muted-foreground">Have a coupon code?</div>
                  <div className="mt-2 flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon (e.g. HBK1000)"
                      className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      onClick={applyCoupon}
                      className="rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <div className="text-xs text-destructive mt-2">{couponError}</div>}
                  <div className="text-[11px] text-muted-foreground mt-2">
                    Tip: Use code <span className="font-mono font-semibold">HBK1000</span> for the introductory ₹1,500 price.
                  </div>
                </div>
              )}
            </div>

            {/* QR */}
            <div className="mt-6 rounded-xl border border-border bg-background p-5 flex flex-col sm:flex-row items-center gap-5">
              <img
                src={paymentQR}
                alt="HBK Careers payment QR (HDFC PayZapp)"
                className="w-48 rounded-lg border border-border bg-white"
              />
              <div className="text-sm flex-1">
                <div className="font-serif text-lg">Scan to pay ₹{price.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Pay via PhonePe, GPay, Paytm, Amazon Pay, PayZapp, or any UPI/cards-enabled app. Payee: <span className="font-medium text-foreground">The H B Kapadia New High School</span>.
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li>1. Open your UPI app and scan the QR.</li>
                  <li>2. Enter the exact amount: <span className="font-medium text-foreground">₹{price.toLocaleString("en-IN")}</span>.</li>
                  <li>3. Complete payment and copy the transaction reference (UTR).</li>
                </ul>
              </div>
            </div>

            {/* UTR */}
            <div className="mt-6">
              <label className="block">
                <span className="text-xs text-muted-foreground">Enter the 12-digit UPI Transaction Reference (UTR)</span>
                <input
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="e.g. 432189765012"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono tracking-wider"
                />
              </label>
              <p className="text-[11px] text-muted-foreground mt-2">
                Your UTR confirms the payment. We log it against your submission so the school can verify it.
              </p>
            </div>

            <button
              onClick={proceed}
              disabled={!utr.trim() || utr.trim().length < 6 || submitting}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-40"
            >
              I've paid — start the test <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right — summary */}
          <aside className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-accent">Order summary</div>
              <div className="mt-3 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student</span>
                  <span className="font-medium">{meta.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grade</span>
                  <span className="font-medium">{meta.grade || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assessment</span>
                  <span className="font-medium">RIASEC + MI + Aptitude</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{FULL_PRICE.toLocaleString("en-IN")}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-accent">
                    <span>Coupon HBK1000</span>
                    <span>− ₹{(FULL_PRICE - DISCOUNTED_PRICE).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-lg border-t border-border pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-primary">₹{price.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  Payments go directly to <span className="font-medium text-foreground">The H B Kapadia New High School</span> via HDFC Bank PayZapp. We never see or store your card or UPI PIN.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
