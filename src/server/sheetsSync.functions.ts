import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1iOZDWT1khsext0b5nq8ekXz3meH9HCCh3heVtbPvQQ4";
const SHEET_NAME = "Submissions";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const HEADERS = [
  "Submission ID",
  "Taken At",
  "Student Name",
  "School Name",
  "Mobile",
  "Email",
  "Payment Status",
  "Payment Amount (INR)",
  "Payment UTR",
  "Payment Coupon",
  "Grade",
  "Age",
  "Language",
  "RIASEC Top",
  "RIASEC Scores",
  "MI Top",
  "MI Scores",
  "Aptitude Top",
  "Aptitude Scores",
  "Recommended Streams",
  "Device ID",
  "App Version",
];

const SubmissionSchema = z.object({
  id: z.string(),
  student_name: z.string().nullable().optional(),
  school_name: z.string().nullable().optional(),
  mobile: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  grade: z.string().nullable().optional(),
  age: z.number().nullable().optional(),
  language: z.string().nullable().optional(),
  riasec: z.unknown().optional(),
  riasec_top: z.array(z.string()).optional(),
  multiple_intelligences: z.unknown().optional(),
  mi_top: z.array(z.string()).optional(),
  aptitude: z.unknown().optional(),
  aptitude_top: z.array(z.string()).optional(),
  recommended_streams: z.array(z.string()).optional(),
  taken_at: z.string().optional(),
  device_id: z.string().nullable().optional(),
  app_version: z.string().nullable().optional(),
  payment_amount: z.number().nullable().optional(),
  payment_utr: z.string().nullable().optional(),
  payment_coupon: z.string().nullable().optional(),
});

function gwHeaders() {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!sheetsKey) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": sheetsKey,
    "Content-Type": "application/json",
  };
}

async function ensureHeader() {
  // Check if header row exists; if not, write it.
  const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:R1`;
  const res = await fetch(url, { headers: gwHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets read failed [${res.status}]: ${text}`);
  }
  const data = (await res.json()) as { values?: string[][] };
  const existing = data.values?.[0] ?? [];
  if (existing.length >= HEADERS.length) return;

  const writeUrl = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1?valueInputOption=RAW`;
  const writeRes = await fetch(writeUrl, {
    method: "PUT",
    headers: gwHeaders(),
    body: JSON.stringify({ values: [HEADERS] }),
  });
  if (!writeRes.ok) {
    const text = await writeRes.text();
    throw new Error(`Sheets header write failed [${writeRes.status}]: ${text}`);
  }
}

function rowFor(s: z.infer<typeof SubmissionSchema>): string[] {
  const stringify = (v: unknown) => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  };
  return [
    s.id,
    s.taken_at ?? new Date().toISOString(),
    s.student_name ?? "",
    s.school_name ?? "",
    s.mobile ?? "",
    s.email ?? "",
    s.grade ?? "",
    s.age != null ? String(s.age) : "",
    s.language ?? "",
    (s.riasec_top ?? []).join("-"),
    stringify(s.riasec),
    (s.mi_top ?? []).join(", "),
    stringify(s.multiple_intelligences),
    (s.aptitude_top ?? []).join(", "),
    stringify(s.aptitude),
    (s.recommended_streams ?? []).join(", "),
    s.device_id ?? "",
    s.app_version ?? "",
  ];
}

export const appendSubmissionToSheet = createServerFn({ method: "POST" })
  .inputValidator((input) => SubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      await ensureHeader();
      const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:R:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
      const res = await fetch(url, {
        method: "POST",
        headers: gwHeaders(),
        body: JSON.stringify({ values: [rowFor(data)] }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Sheets append failed [${res.status}]: ${text}`);
      }
      return { ok: true };
    } catch (e) {
      console.error("appendSubmissionToSheet error:", e);
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  });
