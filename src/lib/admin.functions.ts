import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Ctx = { supabase: any; userId: string };

async function assertAdmin(ctx: Ctx) {
  const { data, error } = await ctx.supabase.rpc("has_role", { _user_id: ctx.userId, _role: "admin" });
  if (error || !data) throw new Error("Forbidden: admin only");
}

const plain = <T,>(v: T): T => JSON.parse(JSON.stringify(v ?? null));

const LIST_COLS =
  "id,student_name,grade,age,school_name,mobile,email,parent_email,language,riasec_top,mi_top,aptitude_top,recommended_streams,payment_amount,payment_coupon,paid_at,taken_at,report_token";

export const adminOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const sb = (context as Ctx).supabase;
    const [subs, orders, bookings, leads] = await Promise.all([
      sb.from("psychometric_submissions").select("taken_at,paid_at,payment_amount").limit(10000),
      sb.from("payment_orders").select("status,amount_paise,paid_at,created_at").limit(10000),
      sb.from("counsellor_bookings").select("created_at").limit(10000),
      sb.from("school_leads").select("created_at").limit(10000),
    ]);
    return plain({
      submissions: subs.data ?? [],
      orders: orders.data ?? [],
      bookings: bookings.data ?? [],
      leads: leads.data ?? [],
    });
  });

export const adminListStudents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { data, error } = await (context as Ctx).supabase
      .from("psychometric_submissions")
      .select(LIST_COLS)
      .order("taken_at", { ascending: false })
      .limit(5000);
    if (error) throw new Error(error.message);
    return plain(data ?? []);
  });

export const adminGetStudent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => ({ id: String(d.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as Ctx);
    const sb = (context as Ctx).supabase;
    const { data: row, error } = await sb.from("psychometric_submissions").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    const [legacy, bookings, orders] = await Promise.all([
      row.report_token
        ? sb.from("psychometric_results").select("id,counsellor_note").eq("report_token", row.report_token).limit(1)
        : Promise.resolve({ data: [] }),
      row.report_token
        ? sb.from("counsellor_bookings").select("*").eq("report_token", row.report_token)
        : Promise.resolve({ data: [] }),
      row.mobile || row.email
        ? sb
            .from("payment_orders")
            .select("*")
            .or([row.mobile && `mobile.eq.${row.mobile}`, row.email && `email.eq.${row.email}`].filter(Boolean).join(","))
            .order("created_at", { ascending: false })
        : Promise.resolve({ data: [] }),
    ]);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: files } = await supabaseAdmin.storage.from("report-pdfs").list("", { search: `${row.id}.pdf` });
    return plain({
      row,
      counsellorNote: legacy.data?.[0]?.counsellor_note ?? null,
      legacyId: legacy.data?.[0]?.id ?? null,
      bookings: bookings.data ?? [],
      orders: orders.data ?? [],
      hasSavedPdf: (files ?? []).some((f: { name: string }) => f.name === `${row.id}.pdf`),
    });
  });

export const adminUpdateStudent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: { id: string; fields: Record<string, string | null>; counsellorNote?: string | null; legacyId?: string | null }) => {
      const allowed = ["student_name", "grade", "school_name", "mobile", "email", "parent_email"];
      const fields: Record<string, string | null> = {};
      for (const k of allowed) if (k in (d.fields ?? {})) fields[k] = d.fields[k] ? String(d.fields[k]).slice(0, 300) : null;
      return { id: String(d.id), fields, counsellorNote: d.counsellorNote ?? null, legacyId: d.legacyId ?? null };
    },
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context as Ctx);
    const sb = (context as Ctx).supabase;
    const { error } = await sb.from("psychometric_submissions").update(data.fields).eq("id", data.id);
    if (error) throw new Error(error.message);
    if (data.legacyId) {
      await sb.from("psychometric_results").update({ counsellor_note: data.counsellorNote }).eq("id", data.legacyId);
    }
    return { ok: true };
  });

export const adminDeleteStudent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => ({ id: String(d.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as Ctx);
    const sb = (context as Ctx).supabase;
    const { data: row } = await sb.from("psychometric_submissions").select("report_token").eq("id", data.id).maybeSingle();
    const { error } = await sb.from("psychometric_submissions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (row?.report_token) await sb.from("psychometric_results").delete().eq("report_token", row.report_token);
    await sb.storage.from("report-pdfs").remove([`${data.id}.pdf`]);
    return { ok: true };
  });

export const adminSignedPdfUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => ({ id: String(d.id).replace(/[^A-Za-z0-9-]/g, "") }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as Ctx);
    const { data: s, error } = await (context as Ctx).supabase.storage
      .from("report-pdfs")
      .createSignedUrl(`${data.id}.pdf`, 300);
    return { url: error || !s ? null : s.signedUrl };
  });

export const adminListPayments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { data, error } = await (context as Ctx).supabase
      .from("payment_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) throw new Error(error.message);
    return plain(data ?? []);
  });

export const adminListTeam = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { data: roles } = await (context as Ctx).supabase.from("user_roles").select("user_id,role,created_at").eq("role", "admin");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const out: { user_id: string; email: string | null; since: string }[] = [];
    for (const r of roles ?? []) {
      const { data: u } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
      out.push({ user_id: r.user_id, email: u?.user?.email ?? null, since: r.created_at });
    }
    return { me: (context as Ctx).userId, admins: out };
  });

export const adminGrant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { email: string }) => ({ email: String(d.email).trim().toLowerCase().slice(0, 254) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let found: string | null = null;
    for (let page = 1; page <= 20 && !found; page++) {
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
      const u = list?.users.find((x) => (x.email ?? "").toLowerCase() === data.email);
      if (u) found = u.id;
      if (!list || list.users.length < 1000) break;
    }
    if (!found) return { ok: false, message: "No account with that email. Ask them to create one at /auth first." };
    const { error } = await (context as Ctx).supabase.from("user_roles").insert({ user_id: found, role: "admin" });
    if (error && error.code !== "23505") throw new Error(error.message);
    return { ok: true, message: `${data.email} is now an admin.` };
  });

export const adminRevoke = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string }) => ({ userId: String(d.userId) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as Ctx);
    if (data.userId === (context as Ctx).userId) throw new Error("You can't remove your own admin access.");
    const { error } = await (context as Ctx).supabase.from("user_roles").delete().eq("user_id", data.userId).eq("role", "admin");
    if (error) throw new Error(error.message);
    return { ok: true };
  });
