// Reads the saved psychometric report (if any) and formats it as compact context
// for HBK Career Counsellor.

const REPORT_KEY = "hbk-last-report";

export interface SavedReport {
  name: string;
  grade: string;
  age?: string;
  language: "en" | "gu";
  riasecTop: string[];
  riasec: Record<string, number>;
  miTop: string[];
  mi: Record<string, number>;
  aptitudeTop: string[];
  aptitude: Record<string, { correct: number; total: number; pct: number } | number>;
  recommendedStreams: string[];
  recommendedCareers?: string[];
  takenAt: string;
}

export function saveReport(r: SavedReport) {
  try {
    localStorage.setItem(REPORT_KEY, JSON.stringify(r));
  } catch {
    /* ignore */
  }
}

export function loadReport(): SavedReport | null {
  try {
    const raw = localStorage.getItem(REPORT_KEY);
    return raw ? (JSON.parse(raw) as SavedReport) : null;
  } catch {
    return null;
  }
}

export function clearReport() {
  try {
    localStorage.removeItem(REPORT_KEY);
  } catch {
    /* ignore */
  }
}

function topN(scores: Record<string, number | { pct: number }>, n = 3) {
  return Object.entries(scores)
    .map(([k, v]) => [k, typeof v === "number" ? v : v.pct] as const)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k, v]) => `${k} (${Math.round(v)})`)
    .join(", ");
}

export function buildReportContext(r: SavedReport): string {
  return [
    `Student: ${r.name}, Grade ${r.grade || "?"}${r.age ? `, age ${r.age}` : ""}.`,
    `Test taken: ${new Date(r.takenAt).toDateString()}.`,
    `RIASEC code: ${r.riasecTop.join("-")}. Full scores — ${topN(r.riasec, 6)}.`,
    `Top Multiple Intelligences: ${topN(r.mi, 3)}.`,
    `Top Aptitudes: ${topN(r.aptitude, 3)}.`,
    `App-recommended streams: ${r.recommendedStreams.join(", ") || "—"}.`,
    r.recommendedCareers?.length
      ? `Top personalised career matches: ${r.recommendedCareers.slice(0, 6).join("; ")}.`
      : "",
  ].filter(Boolean).join("\n");
}
