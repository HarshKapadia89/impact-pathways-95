import type { ScoreReport } from "@/lib/psychometricData";

type Row = {
  student_name: string | null;
  grade: string | null;
  age: number | null;
  riasec: unknown;
  multiple_intelligences: unknown;
  aptitude: unknown;
  riasec_top: string[] | null;
  mi_top: string[] | null;
  aptitude_top: string[] | null;
};

export function rowToScoreReport(row: Row): ScoreReport {
  const raw = (row.aptitude ?? {}) as Record<string, unknown>;
  const aptitude: Record<string, { correct: number; total: number; pct: number }> = {};
  let sum = 0;
  let n = 0;
  for (const [k, v] of Object.entries(raw)) {
    const pct = typeof v === "number" ? v : typeof v === "object" && v && "pct" in v ? Number((v as { pct: number }).pct) : 0;
    aptitude[k] = { correct: 0, total: 0, pct };
    sum += pct;
    n++;
  }
  return {
    riasec: (row.riasec ?? {}) as Record<string, number>,
    mi: (row.multiple_intelligences ?? {}) as Record<string, number>,
    aptitude,
    riasecTop: row.riasec_top ?? [],
    miTop: row.mi_top ?? [],
    aptitudeTop: row.aptitude_top ?? [],
    aptitudeOverall: n ? Math.round(sum / n) : 0,
  };
}

/** Rebuilds a student's PDF in the browser from stored scores and downloads it. */
export async function regenerateReportPdf(row: Row, language: "en" | "gu" | "hi" | "mr") {
  const { generatePsychometricPDF, preloadReportFonts } = await import("@/lib/psychometricReport");
  await preloadReportFonts(language);
  const name = row.student_name || "Student";
  const doc = generatePsychometricPDF({
    name,
    grade: row.grade ?? "",
    age: row.age ? String(row.age) : "",
    language,
    report: rowToScoreReport(row),
    riasecAnswers: {},
    miAnswers: {},
    aptAnswers: {},
  });
  doc.save(`HBK-Report-${name.replace(/\s+/g, "-")}-${language}.pdf`);
}
