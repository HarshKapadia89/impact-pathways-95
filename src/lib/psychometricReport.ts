// PDF report generator for the psychometric test result.
// Uses jsPDF (already installed). Produces a multi-section, ~20-page report
// in either English or Gujarati, with embedded Noto Sans + Noto Sans Gujarati
// so Gujarati script renders correctly.

import jsPDF from "jspdf";
import {
  RIASEC_ITEMS,
  MI_ITEMS,
  APTITUDE_ITEMS,
  type ScoreReport,
} from "./psychometricData";
import { recommendStreams, STREAM_BY_ID, type StreamId } from "./careerData";
import { getReportStrings, type ReportLang, type ReportStrings } from "./psychometricReportStrings";
import { notoSansRegular, notoSansBold } from "./fonts/notoSans";
import { notoSansGujaratiRegular, notoSansGujaratiBold } from "./fonts/notoSansGujarati";
import { drawRadar, drawScoreBar, proficiencyBand } from "./pdfCharts";

interface ReportInput {
  name: string;
  grade: string;
  age: string;
  language: ReportLang;
  report: ScoreReport;
  riasecAnswers: Record<string, number>;
  miAnswers: Record<string, number>;
  aptAnswers: Record<string, number>;
}

// --- styling helpers ---
const COLORS = {
  primary: [28, 24, 78] as [number, number, number],          // deep indigo
  primaryDark: [18, 16, 52] as [number, number, number],
  accent: [212, 138, 42] as [number, number, number],         // warm gold
  accentSoft: [245, 224, 184] as [number, number, number],
  ink: [28, 28, 46] as [number, number, number],
  muted: [110, 110, 130] as [number, number, number],
  hairline: [220, 220, 232] as [number, number, number],
  rule: [225, 225, 235] as [number, number, number],
  band: [248, 246, 240] as [number, number, number],
  bandAlt: [241, 240, 248] as [number, number, number],
  bar: [60, 50, 130] as [number, number, number],
  bar2: [200, 130, 60] as [number, number, number],
  callout: [248, 244, 232] as [number, number, number],
  calloutBorder: [212, 138, 42] as [number, number, number],
  ok: [38, 130, 90] as [number, number, number],
};

const M = 18; // page margin mm
const PW = 210;
const PH = 297;

// Font family aliases registered with jsPDF
const FONT_LATIN = "NotoSans";
const FONT_GU = "NotoGujarati";

function setFill(doc: jsPDF, c: [number, number, number]) {
  doc.setFillColor(c[0], c[1], c[2]);
}
function setText(doc: jsPDF, c: [number, number, number]) {
  doc.setTextColor(c[0], c[1], c[2]);
}
function setDraw(doc: jsPDF, c: [number, number, number]) {
  doc.setDrawColor(c[0], c[1], c[2]);
}

function registerFonts(doc: jsPDF) {
  doc.addFileToVFS("NotoSans-Regular.ttf", notoSansRegular);
  doc.addFont("NotoSans-Regular.ttf", FONT_LATIN, "normal");
  doc.addFileToVFS("NotoSans-Bold.ttf", notoSansBold);
  doc.addFont("NotoSans-Bold.ttf", FONT_LATIN, "bold");
  doc.addFileToVFS("NotoSansGujarati-Regular.ttf", notoSansGujaratiRegular);
  doc.addFont("NotoSansGujarati-Regular.ttf", FONT_GU, "normal");
  doc.addFileToVFS("NotoSansGujarati-Bold.ttf", notoSansGujaratiBold);
  doc.addFont("NotoSansGujarati-Bold.ttf", FONT_GU, "bold");
}

// Lightweight glyph cleanup. With Noto fonts, most Unicode chars render fine,
// but a few typographic chars are still better normalised.
const TYPO_MAP: Record<string, string> = {
  "—": " — ",
  "“": '"',
  "”": '"',
  "‘": "'",
  "’": "'",
};
function safe(text: string): string {
  let out = "";
  for (const ch of text) {
    out += TYPO_MAP[ch] !== undefined ? TYPO_MAP[ch] : ch;
  }
  return out;
}

export function generatePsychometricPDF(input: ReportInput): jsPDF {
  const { name, grade, age, language, report } = input;
  const t: ReportStrings = getReportStrings(language);
  const recommendedStreams = recommendStreams(report.riasecTop, report.aptitudeTop);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  registerFonts(doc);

  // Choose font based on language. Noto Sans Gujarati does NOT contain Latin
  // glyphs, so for Gujarati we still need the Latin font for proper nouns
  // (IIT, NEET, college names). jsPDF only supports a single active font at a
  // time, so we pick Gujarati-first for Gu mode (it falls back gracefully for
  // anything that's pure Latin via the base TTF's notdef → space behaviour).
  // For mixed strings, we route Latin-only strings through Latin font where
  // possible. The simplest reliable approach: in Gujarati mode set both the
  // font and rely on jsPDF's per-call setFont — every text() call below uses
  // font(weight) which auto-picks based on string content.
  const PRIMARY_FONT = language === "gu" ? FONT_GU : FONT_LATIN;

  function font(weight: "normal" | "bold" = "normal", forceLatin = false) {
    doc.setFont(forceLatin ? FONT_LATIN : PRIMARY_FONT, weight);
  }

  // Detect whether a string contains any Gujarati codepoints
  function hasGu(s: string): boolean {
    for (const ch of s) {
      const code = ch.charCodeAt(0);
      if (code >= 0x0A80 && code <= 0x0AFF) return true;
    }
    return false;
  }

  // Safe text renderer: picks Gu font for Gu strings, Latin font otherwise.
  // We can't easily mix fonts within a single text() call in jsPDF, so we
  // pick by majority. Practically, body strings in EN mode are pure Latin
  // (Latin font), and body strings in GU mode are mostly Gujarati (Gu font);
  // proper nouns embedded inside Gu strings fall back to .notdef but Noto
  // Gujarati's notdef is a small box — visible but acceptable.
  // Better: switch font per string. For Gu mode if a string is pure Latin
  // (no Gujarati chars), use Latin font.
  function smartFont(text: string, weight: "normal" | "bold") {
    if (language === "gu" && !hasGu(text)) {
      doc.setFont(FONT_LATIN, weight);
    } else {
      doc.setFont(PRIMARY_FONT, weight);
    }
  }

  // Wrap doc.text so we sanitise typography & auto-pick font per string.
  const _origText = doc.text.bind(doc) as (...args: unknown[]) => jsPDF;
  let currentWeight: "normal" | "bold" = "normal";
  const _origSetFont = doc.setFont.bind(doc);
  doc.setFont = function (family: string, style?: string) {
    if (style === "bold") currentWeight = "bold";
    else if (style === "normal") currentWeight = "normal";
    return _origSetFont(family, style);
  } as typeof doc.setFont;

  doc.text = function (text: unknown, ...rest: unknown[]) {
    if (typeof text === "string") {
      const s = safe(text);
      smartFont(s, currentWeight);
      return _origText(s, ...rest);
    }
    if (Array.isArray(text)) {
      // For arrays of lines, sanitise; font is set once based on first line.
      const arr = text.map((x) => (typeof x === "string" ? safe(x) : x));
      const sample = arr.find((x) => typeof x === "string") as string | undefined;
      if (sample) smartFont(sample, currentWeight);
      return _origText(arr, ...rest);
    }
    return _origText(text, ...rest);
  } as typeof doc.text;

  function wrap(text: string, maxWidth: number) {
    smartFont(safe(text), currentWeight);
    return doc.splitTextToSize(safe(text), maxWidth) as string[];
  }

  function header(title: string, sub?: string) {
    setFill(doc, COLORS.primary);
    doc.rect(0, 0, PW, 14, "F");
    font("bold");
    doc.setFontSize(11);
    setText(doc, [255, 255, 255]);
    doc.text(t.brand, M, 9);
    if (sub) {
      font("normal");
      doc.setFontSize(9);
      doc.text(sub, PW - M, 9, { align: "right" });
    }
    setText(doc, COLORS.ink);
    if (title) {
      font("bold");
      doc.setFontSize(18);
      setText(doc, COLORS.primary);
      doc.text(title, M, 28);
      setDraw(doc, COLORS.accent);
      doc.setLineWidth(1.2);
      doc.line(M, 31, M + 22, 31);
      setText(doc, COLORS.ink);
    }
  }

  function footer(page: number, total: number) {
    setDraw(doc, COLORS.rule);
    doc.setLineWidth(0.2);
    doc.line(M, PH - 14, PW - M, PH - 14);
    font("normal");
    doc.setFontSize(8);
    setText(doc, COLORS.muted);
    doc.text(t.footerName(name), M, PH - 8);
    doc.text(t.pageOf(page, total), PW - M, PH - 8, { align: "right" });
    setText(doc, COLORS.ink);
  }

  function drawBar(x: number, y: number, label: string, value: number, max = 100, color = COLORS.bar) {
    const w = 110;
    font("normal");
    doc.setFontSize(9);
    setText(doc, COLORS.ink);
    doc.text(label, x, y);
    doc.text(`${value}%`, x + w + 38, y, { align: "right" });
    setFill(doc, COLORS.rule);
    doc.roundedRect(x + 60, y - 3.5, w, 4.5, 1.5, 1.5, "F");
    setFill(doc, color);
    doc.roundedRect(x + 60, y - 3.5, (w * value) / max, 4.5, 1.5, 1.5, "F");
  }

  function ensureSpace(y: number, needed: number, current: { page: number; total: number }) {
    if (y + needed > PH - 18) {
      footer(current.page, current.total);
      doc.addPage();
      current.page += 1;
      header("", t.generatedOn(new Date().toLocaleDateString()));
      return 22;
    }
    return y;
  }

  const current = { page: 1, total: 20 };

  // ============== PAGE 1 — COVER ==============
  setFill(doc, COLORS.primary);
  doc.rect(0, 0, PW, PH, "F");
  setFill(doc, COLORS.accent);
  doc.rect(0, PH - 80, PW, 80, "F");

  setText(doc, [255, 255, 255]);
  font("bold");
  doc.setFontSize(36);
  doc.text("HBK Careers", M, 60);
  font("normal");
  doc.setFontSize(14);
  doc.text(t.coverSubtitle, M, 72);
  doc.setFontSize(10);
  doc.text(t.schoolLine, M, 80);

  doc.setFontSize(11);
  doc.text(t.preparedFor, M, 130);
  font("bold");
  doc.setFontSize(28);
  doc.text(name || t.studentFallback, M, 145);
  font("normal");
  doc.setFontSize(11);
  const langName = language === "gu" ? t.langNameGu : t.langNameEn;
  doc.text(t.metaLine(grade, age, langName), M, 155);

  setText(doc, COLORS.primary);
  font("bold");
  doc.setFontSize(13);
  doc.text(t.coverHeadline, M, PH - 60);
  font("normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  doc.text(t.coverBullets1, M, PH - 50);
  doc.text(t.coverBullets2, M, PH - 44);
  doc.setFontSize(9);
  setText(doc, COLORS.muted);
  doc.text(t.generatedOn(new Date().toLocaleDateString()), M, PH - 30);
  doc.text(t.coverFooter, M, PH - 24);

  // ============== PAGE 2 — TABLE OF CONTENTS ==============
  doc.addPage();
  current.page = 2;
  header(t.toc, `Page 2`);

  const toc = [
    t.sec1, t.sec2, t.sec3, t.sec4, t.sec5, t.sec6, t.sec7, t.sec8, t.sec9,
    t.sec10, t.sec11, t.sec12, t.sec13, t.sec14, t.sec15, t.sec16, t.sec17, t.sec18, t.sec19,
  ];
  let y = 50;
  font("normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  for (let i = 0; i < toc.length; i++) {
    const line = toc[i];
    doc.text(line, M, y);
    setText(doc, COLORS.muted);
    doc.text(String(i + 1), PW - M, y, { align: "right" });
    setText(doc, COLORS.ink);
    y += 9;
  }
  footer(2, 20);

  // ============== PAGE 3 — ABOUT ==============
  doc.addPage();
  current.page = 3;
  header(t.sec1);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(11);
  let yy = 50;
  for (const l of t.about) {
    doc.text(l, M, yy);
    yy += 6.5;
  }
  footer(3, 20);

  // ============== PAGE 4 — SNAPSHOT ==============
  doc.addPage();
  current.page = 4;
  header(t.sec2);

  setFill(doc, COLORS.band);
  doc.roundedRect(M, 45, PW - 2 * M, 36, 3, 3, "F");
  font("bold");
  doc.setFontSize(12);
  setText(doc, COLORS.primary);
  doc.text(t.snapTopRiasec, M + 6, 55);
  doc.text(t.snapTopMi, M + 6, 65);
  doc.text(t.snapTopApt, M + 6, 75);

  font("normal");
  setText(doc, COLORS.ink);
  doc.text(report.riasecTop.join(" — "), M + 80, 55);
  doc.text(report.miTop.slice(0, 2).map((k) => t.mi[k]?.name ?? k).join(", "), M + 80, 65);
  doc.text(
    `${report.aptitudeTop.map(t.aptCategoryName).join(" & ")}  ${t.snapAptOverall(report.aptitudeOverall)}`,
    M + 80,
    75,
  );

  font("bold");
  doc.setFontSize(13);
  setText(doc, COLORS.primary);
  doc.text(t.snapTopStreams, M, 100);

  let py = 110;
  recommendedStreams.forEach((sid, i) => {
    const s = STREAM_BY_ID[sid];
    setFill(doc, i === 0 ? COLORS.accent : COLORS.rule);
    doc.roundedRect(M, py, PW - 2 * M, 22, 3, 3, "F");
    setText(doc, i === 0 ? COLORS.primary : COLORS.ink);
    font("bold");
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${s.name}`, M + 6, py + 9);
    font("normal");
    doc.setFontSize(10);
    doc.text(s.tagline, M + 6, py + 17);
    py += 28;
  });

  font("normal");
  doc.setFontSize(9);
  setText(doc, COLORS.muted);
  doc.text(t.snapBoth, M, py + 4);

  footer(4, 20);

  // ============== PAGE 5 — RIASEC PROFILE ==============
  doc.addPage();
  current.page = 5;
  header(t.sec3);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(11);
  doc.text(t.riasecIntro, M, 48);

  let by = 60;
  ["R", "I", "A", "S", "E", "C"].forEach((k) => {
    drawBar(M, by, `${k} — ${t.riasec[k].name}`, report.riasec[k] ?? 0);
    by += 11;
  });

  by += 6;
  font("bold");
  doc.setFontSize(12);
  setText(doc, COLORS.primary);
  doc.text(t.riasecYourCode(report.riasecTop.join(" - ")), M, by);
  by += 8;
  font("normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  for (const l of wrap(t.riasecCodeText, PW - 2 * M)) {
    doc.text(l, M, by);
    by += 5;
  }
  footer(5, 20);

  // ============== PAGE 6 — RIASEC DETAIL ==============
  doc.addPage();
  current.page = 6;
  header(t.sec4);
  yy = 48;
  for (const k of report.riasecTop) {
    yy = ensureSpace(yy, 30, current);
    font("bold");
    doc.setFontSize(12);
    setText(doc, COLORS.primary);
    doc.text(`${t.riasec[k].name}  —  ${report.riasec[k]}%`, M, yy);
    yy += 7;
    font("normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(t.riasec[k].description, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 4;
  }
  footer(6, 20);

  // ============== PAGE 7 — MI BARS ==============
  doc.addPage();
  current.page = 7;
  header(t.sec5);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(11);
  doc.text(t.miIntro, M, 48);
  by = 60;
  for (const k of Object.keys(t.mi)) {
    drawBar(M, by, `${t.mi[k].name}`, report.mi[k] ?? 0, 100, COLORS.accent);
    by += 11;
  }
  footer(7, 20);

  // ============== PAGE 8 — MI DETAIL ==============
  doc.addPage();
  current.page = 8;
  header(t.sec6);
  yy = 48;
  for (const k of report.miTop) {
    yy = ensureSpace(yy, 32, current);
    font("bold");
    doc.setFontSize(12);
    setText(doc, COLORS.primary);
    doc.text(`${t.mi[k]?.name ?? k}  —  ${report.mi[k]}%`, M, yy);
    yy += 7;
    font("normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(t.mi[k]?.description ?? "", PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 4;
  }
  footer(8, 20);

  // ============== PAGE 9 — APTITUDE BARS ==============
  doc.addPage();
  current.page = 9;
  header(t.sec7);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(11);
  doc.text(t.aptOverall(report.aptitudeOverall), M, 48);
  by = 62;
  for (const [cat, v] of Object.entries(report.aptitude)) {
    drawBar(M, by, `${t.aptCategoryName(cat)}  (${v.correct}/${v.total})`, v.pct, 100, COLORS.bar);
    by += 11;
  }
  footer(9, 20);

  // ============== PAGE 10 — APTITUDE DETAIL ==============
  doc.addPage();
  current.page = 10;
  header(t.sec8);
  yy = 48;
  for (const [cat, v] of Object.entries(report.aptitude)) {
    yy = ensureSpace(yy, 24, current);
    font("bold");
    doc.setFontSize(12);
    setText(doc, COLORS.primary);
    doc.text(`${t.aptCategoryName(cat)}  —  ${v.pct}%`, M, yy);
    yy += 6;
    font("normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(t.aptDescriptions[cat] ?? "", PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 3;
  }
  footer(10, 20);

  // ============== PAGE 11 — RECOMMENDED STREAMS ==============
  doc.addPage();
  current.page = 11;
  header(t.sec9);
  yy = 48;
  font("normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  for (const l of wrap(t.streamsIntro, PW - 2 * M)) {
    doc.text(l, M, yy);
    yy += 6;
  }
  yy += 4;
  recommendedStreams.forEach((sid, i) => {
    const s = STREAM_BY_ID[sid];
    setFill(doc, i === 0 ? ([...COLORS.primary] as [number, number, number]) : COLORS.band);
    doc.roundedRect(M, yy, PW - 2 * M, 30, 3, 3, "F");
    setText(doc, i === 0 ? [255, 255, 255] : COLORS.ink);
    font("bold");
    doc.setFontSize(14);
    doc.text(`${i === 0 ? t.primary : t.secondary}: ${s.name}`, M + 6, yy + 10);
    font("normal");
    doc.setFontSize(10);
    doc.text(s.tagline, M + 6, yy + 18);
    doc.setFontSize(9);
    doc.text(t.coreSubjects(s.coreSubjects.slice(0, 4).join(", ")), M + 6, yy + 25);
    setText(doc, COLORS.ink);
    yy += 38;
  });
  footer(11, 20);

  // ============== PAGE 12-13 — STREAM DEEP DIVE 1 & 2 ==============
  recommendedStreams.forEach((sid, i) => {
    doc.addPage();
    current.page = 12 + i;
    header(i === 0 ? t.sec10 : t.sec11);
    const s = STREAM_BY_ID[sid];
    yy = 48;
    font("bold");
    doc.setFontSize(15);
    setText(doc, COLORS.primary);
    doc.text(s.name, M, yy);
    yy += 8;
    font("normal");
    doc.setFontSize(10);
    setText(doc, COLORS.muted);
    for (const l of wrap(s.tagline, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 3;
    font("normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(s.overview, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 3;
    font("bold");
    doc.text(t.topPaths, M, yy);
    yy += 6;
    font("normal");
    for (const p of s.paths.slice(0, 5)) {
      yy = ensureSpace(yy, 16, current);
      font("bold");
      doc.setFontSize(10);
      doc.text(`• ${p.title}`, M, yy);
      yy += 5;
      font("normal");
      doc.setFontSize(9);
      setText(doc, COLORS.muted);
      for (const l of wrap(`${p.duration}  •  ${p.eligibility}  •  ${p.avgSalary}`, PW - 2 * M - 4)) {
        doc.text(l, M + 4, yy);
        yy += 4.5;
      }
      setText(doc, COLORS.ink);
      yy += 1.5;
    }
    footer(current.page, 20);
  });

  // ============== PAGE 14 — TOP CAREERS LIST ==============
  doc.addPage();
  current.page = 14;
  header(t.sec12);
  yy = 48;
  font("normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  let counter = 1;
  for (const sid of recommendedStreams) {
    const s = STREAM_BY_ID[sid];
    for (const p of s.paths.slice(0, 4)) {
      yy = ensureSpace(yy, 14, current);
      font("bold");
      doc.setFontSize(11);
      setText(doc, COLORS.primary);
      doc.text(`${counter}. ${p.title}`, M, yy);
      counter += 1;
      yy += 5;
      font("normal");
      doc.setFontSize(9);
      setText(doc, COLORS.ink);
      doc.text(`${t.pathStream(s.name)}  •  ${p.duration}  •  ${t.pathSalary(p.avgSalary)}`, M, yy);
      yy += 5;
      setText(doc, COLORS.muted);
      const ent = p.entranceExams.join(", ");
      for (const l of wrap(t.pathExams(ent), PW - 2 * M)) {
        doc.text(l, M, yy);
        yy += 4.5;
      }
      setText(doc, COLORS.ink);
      yy += 2;
    }
  }
  footer(14, 20);

  // ============== PAGE 15 — ENTRANCE EXAMS ==============
  doc.addPage();
  current.page = 15;
  header(t.sec13);
  yy = 48;
  font("normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  const allExams = new Set<string>();
  for (const sid of recommendedStreams) {
    for (const p of STREAM_BY_ID[sid].paths) {
      for (const e of p.entranceExams) allExams.add(e);
    }
  }
  doc.text(t.examsIntro(allExams.size), M, yy);
  yy += 7;
  for (const ex of allExams) {
    yy = ensureSpace(yy, 8, current);
    setFill(doc, COLORS.band);
    doc.roundedRect(M, yy - 4, PW - 2 * M, 7, 1.5, 1.5, "F");
    font("bold");
    doc.setFontSize(10);
    setText(doc, COLORS.primary);
    doc.text(ex, M + 3, yy + 1);
    setText(doc, COLORS.ink);
    yy += 9;
  }
  footer(15, 20);

  // ============== PAGE 16 — TOP COLLEGES ==============
  doc.addPage();
  current.page = 16;
  header(t.sec14);
  yy = 48;
  font("normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  doc.text(t.collegesIntro, M, yy);
  yy += 8;
  const collegesShown = new Set<string>();
  for (const sid of recommendedStreams) {
    for (const p of STREAM_BY_ID[sid].paths.slice(0, 4)) {
      for (const c of p.topColleges.slice(0, 3)) {
        if (collegesShown.has(c)) continue;
        collegesShown.add(c);
        yy = ensureSpace(yy, 7, current);
        font("normal");
        doc.setFontSize(10);
        doc.text(`•  ${c}`, M, yy);
        yy += 6;
      }
    }
  }
  footer(16, 20);

  // ============== PAGE 17 — SKILLS TO BUILD ==============
  doc.addPage();
  current.page = 17;
  header(t.sec15);
  yy = 48;
  font("normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  for (const sk of t.skillsList) {
    yy = ensureSpace(yy, 7, current);
    for (const l of wrap(`-  ${sk}`, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5.5;
    }
    yy += 1;
  }
  footer(17, 20);

  // ============== PAGE 18 — ACTION PLAN THIS YEAR ==============
  doc.addPage();
  current.page = 18;
  header(t.sec16);
  yy = 50;
  font("normal");
  doc.setFontSize(11);
  for (const s of t.thisYearList) {
    yy = ensureSpace(yy, 8, current);
    for (const l of wrap(`[ ]  ${s}`, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5.5;
    }
    yy += 1;
  }
  // 3-year plan starts here too
  yy += 4;
  font("bold");
  doc.setFontSize(13);
  setText(doc, COLORS.primary);
  doc.text(t.sec17, M, yy);
  yy += 8;
  font("normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  for (const s of t.threeYearList) {
    yy = ensureSpace(yy, 8, current);
    for (const l of wrap(`[ ]  ${s}`, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5.5;
    }
    yy += 1;
  }
  footer(18, 20);

  // ============== PAGE 19 — TIPS FOR PARENTS ==============
  doc.addPage();
  current.page = 19;
  header(t.sec18);
  yy = 50;
  font("normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  for (const s of t.parentTips) {
    yy = ensureSpace(yy, 12, current);
    for (const l of wrap(`•  ${s}`, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5.5;
    }
    yy += 1;
  }
  footer(19, 20);

  // ============== PAGE 20 — NOTES & GLOSSARY ==============
  doc.addPage();
  current.page = 20;
  header(t.sec19);
  yy = 50;
  font("normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(10);
  for (const [k, v] of t.glossaryItems) {
    yy = ensureSpace(yy, 10, current);
    font("bold");
    doc.text(k, M, yy);
    font("normal");
    for (const l of wrap(v, PW - 2 * M - 25)) {
      doc.text(l, M + 25, yy);
      yy += 5;
    }
    yy += 2;
  }

  yy += 6;
  font("normal");
  doc.setFontSize(9);
  setText(doc, COLORS.muted);
  for (const l of wrap(t.closingDisclaimer, PW - 2 * M)) {
    doc.text(l, M, yy);
    yy += 5;
  }
  footer(20, 20);

  // Re-stamp footer page numbers in case ensureSpace inserted extra pages.
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    setFill(doc, [255, 255, 255]);
    doc.rect(PW - M - 30, PH - 12, 30, 6, "F");
    font("normal");
    doc.setFontSize(8);
    setText(doc, COLORS.muted);
    doc.text(t.pageOf(i, totalPages), PW - M, PH - 8, { align: "right" });
  }

  // mark unused vars to satisfy strict TS
  void RIASEC_ITEMS;
  void MI_ITEMS;
  void APTITUDE_ITEMS;
  void input.riasecAnswers;
  void input.miAnswers;
  void input.aptAnswers;

  return doc;
}

export type { StreamId };
