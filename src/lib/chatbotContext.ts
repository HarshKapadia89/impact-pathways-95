// Reads the saved psychometric report (if any) and formats it as compact context
// for the career chatbot.

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
  aptitude: Record<string, number>;
  recommendedStreams: string[];
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

function topN(scores: Record<string, number>, n = 3) {
  return Object.entries(scores)
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
  ].join("\n");
}
