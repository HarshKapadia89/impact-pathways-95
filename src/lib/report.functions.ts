import { createServerFn } from "@tanstack/react-start";

const COLS =
  "id,student_name,grade,age,grade_band,school_name,riasec,multiple_intelligences,aptitude,riasec_top,mi_top,aptitude_top,recommended_streams,recommended_careers,taken_at,report_token";

/** Public lookup of one report by its secret share token (never lists other students). */
export const getReportByToken = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => {
    const token = String(d?.token ?? "").trim();
    if (token.length < 8 || token.length > 200) throw new Error("Invalid token");
    return { token };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("psychometric_submissions")
      .select(COLS)
      .eq("report_token", data.token)
      .maybeSingle();
    return row ? JSON.parse(JSON.stringify(row)) : null;
  });
