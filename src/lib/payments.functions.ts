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
  .inputValidator((data: { orderId: string; paymentId: string; signature: string; fbp?: string | null; fbc?: string | null; sourceUrl?: string | null }) => {
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
    // Only transition orders that are not yet paid — makes repeat calls no-ops.
    const { data: changed, error } = await supabaseAdmin
      .from("payment_orders")
      .update({
        razorpay_payment_id: data.paymentId,
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", data.orderId)
      .neq("status", "paid")
      .select("amount_paise, coupon")
      .maybeSingle();

    if (error) {
      console.error("Failed to mark order paid:", error.message);
      throw new Error("Payment recorded but could not be saved. Please contact us.");
    }

    let row = changed;
    if (!row) {
      const { data: existing } = await supabaseAdmin
        .from("payment_orders")
        .select("amount_paise, coupon")
        .eq("razorpay_order_id", data.orderId)
        .maybeSingle();
      row = existing;
    }

    const eventId = `purchase_${data.orderId}`;
    const amount = row ? row.amount_paise / 100 : null;

    if (changed && amount != null) {
      await sendMetaPurchase({ orderId: data.orderId, eventId, amount, fbp: data.fbp, fbc: data.fbc, sourceUrl: data.sourceUrl });
    }

    return {
      ok: true as const,
      amount,
      coupon: row?.coupon ?? null,
      eventId,
      firstConfirmation: !!changed,
    };
  });

async function sendMetaPurchase(p: { orderId: string; eventId: string; amount: number; fbp?: string | null; fbc?: string | null; sourceUrl?: string | null }) {
  const token = process.env["META_CAPI_ACCESS_TOKEN"];
  if (!token) return;
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest();
    const ip = req?.headers.get("cf-connecting-ip") ?? req?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
    const ua = req?.headers.get("user-agent") ?? undefined;
    const user_data: Record<string, string> = {};
    if (ip) user_data["client_ip_address"] = ip;
    if (ua) user_data["client_user_agent"] = ua;
    if (p.fbp) user_data["fbp"] = p.fbp;
    if (p.fbc) user_data["fbc"] = p.fbc;
    const body: Record<string, unknown> = {
      data: [{
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: p.eventId,
        action_source: "website",
        event_source_url: p.sourceUrl || "https://hbkcareers.org/test/pay",
        user_data,
        custom_data: { value: p.amount, currency: "INR", content_ids: ["hbk_aptitude_test"], content_type: "product", num_items: 1 },
      }],
    };
    const testCode = process.env["META_TEST_EVENT_CODE"];
    if (testCode) body["test_event_code"] = testCode;
    const res = await fetch(`https://graph.facebook.com/v21.0/1164890204578653/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`Meta CAPI failed [${res.status}]: ${await res.text()}`);
      return;
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("payment_orders").update({ meta_purchase_sent_at: new Date().toISOString() }).eq("razorpay_order_id", p.orderId);
  } catch (e) {
    console.error("Meta CAPI error:", e instanceof Error ? e.message : e);
  }
}
