import { createServerFn } from "@tanstack/react-start";
import { createHmac, timingSafeEqual } from "crypto";

const FULL_PRICE = 2500;
const DISCOUNTED_PRICE = 1500;
const VALID_COUPON = "HBK1000";

export type OrderInput = {
  coupon?: string | null;
  student_name?: string | null;
  grade?: string | null;
  age?: string | number | null;
  email?: string | null;
  mobile?: string | null;
  school_name?: string | null;
  language?: string | null;
};

export function priceForCoupon(coupon?: string | null) {
  return (coupon ?? "").trim().toUpperCase() === VALID_COUPON ? DISCOUNTED_PRICE : FULL_PRICE;
}

/** Creates a Razorpay order server-side; the price is decided here, never by the client. */
export const createPaymentOrder = createServerFn({ method: "POST" })
  .inputValidator((data: OrderInput) => data)
  .handler(async ({ data }) => {
    const keyId = process.env["RAZORPAY_KEY_ID"];
    const keySecret = process.env["RAZORPAY_KEY_SECRET"];
    if (!keyId || !keySecret) throw new Error("Payment is not configured yet.");

    const couponRaw = (data.coupon ?? "").trim().toUpperCase();
    const coupon = couponRaw === VALID_COUPON ? VALID_COUPON : null;
    const amountPaise = priceForCoupon(coupon) * 100;

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `hbk_${Date.now()}`,
        notes: {
          student: data.student_name ?? "",
          grade: data.grade ?? "",
          school: data.school_name ?? "",
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Razorpay order failed [${res.status}]: ${body}`);
      throw new Error(`Could not start payment [${res.status}]`);
    }

    const order = (await res.json()) as { id: string; amount: number; currency: string };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ageNum = data.age == null || data.age === "" ? null : Number(data.age);
    await supabaseAdmin.from("payment_orders").insert({
      razorpay_order_id: order.id,
      amount_paise: order.amount,
      currency: order.currency,
      status: "created",
      coupon,
      student_name: data.student_name ?? null,
      grade: data.grade ?? null,
      age: Number.isFinite(ageNum) ? ageNum : null,
      email: data.email ?? null,
      mobile: data.mobile ?? null,
      school_name: data.school_name ?? null,
      language: data.language ?? "en",
    });

    return {
      keyId,
      orderId: order.id,
      amountPaise: order.amount,
      currency: order.currency,
      coupon,
    };
  });

/** Verifies the Razorpay signature and marks the order paid. */
export const verifyPayment = createServerFn({ method: "POST" })
  .inputValidator((data: { orderId: string; paymentId: string; signature: string }) => {
    if (!data?.orderId || !data?.paymentId || !data?.signature) throw new Error("Incomplete payment data");
    return data;
  })
  .handler(async ({ data }) => {
    const keySecret = process.env["RAZORPAY_KEY_SECRET"];
    if (!keySecret) throw new Error("Payment is not configured yet.");

    const expected = createHmac("sha256", keySecret)
      .update(`${data.orderId}|${data.paymentId}`)
      .digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(data.signature);
    const valid = a.length === b.length && timingSafeEqual(a, b);
    if (!valid) {
      console.error("Razorpay signature mismatch for order", data.orderId);
      throw new Error("Payment could not be verified.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("payment_orders")
      .update({
        razorpay_payment_id: data.paymentId,
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", data.orderId)
      .select("amount_paise, coupon")
      .maybeSingle();

    if (error) {
      console.error("Failed to mark order paid:", error.message);
      throw new Error("Payment recorded but could not be saved. Please contact us.");
    }

    return {
      ok: true as const,
      amount: row ? row.amount_paise / 100 : null,
      coupon: row?.coupon ?? null,
    };
  });
