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
import { STREAM_BY_ID, type StreamId } from "./careerData";
import { recommendStreamsAccurate, rankCareerPaths } from "./careerMatch";
import { getReportStrings, type ReportLang, type ReportStrings } from "./psychometricReportStrings";
import { notoSansRegular, notoSansBold } from "./fonts/notoSans";
import { notoSansGujaratiRegular, notoSansGujaratiBold } from "./fonts/notoSansGujarati";
import { drawRadar, drawScoreBar, proficiencyBand } from "./pdfCharts";
import { buildParentSummary } from "./parentSummary";

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
  const recommendedStreams = recommendStreamsAccurate(report, 2);
  const topCareers = rankCareerPaths(report, recommendedStreams, 8);
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
    // Slim header bar
    setFill(doc, COLORS.primary);
    doc.rect(0, 0, PW, 11, "F");
    setFill(doc, COLORS.accent);
    doc.rect(0, 11, PW, 0.6, "F");
    font("bold");
    doc.setFontSize(8.5);
    setText(doc, [255, 255, 255]);
    doc.text(t.brand.toUpperCase(), M, 7.4);
    if (sub) {
      font("normal");
      doc.setFontSize(8);
      doc.text(sub, PW - M, 7.4, { align: "right" });
    }
    setText(doc, COLORS.ink);
    if (title) {
      font("normal");
      doc.setFontSize(8);
      setText(doc, COLORS.muted);
      doc.text("HBK CAREERS  ·  CAREER DISCOVERY REPORT", M, 24);
      font("bold");
      doc.setFontSize(20);
      setText(doc, COLORS.primary);
      doc.text(title, M, 33);
      setDraw(doc, COLORS.accent);
      doc.setLineWidth(1.4);
      doc.line(M, 36.5, M + 18, 36.5);
      setText(doc, COLORS.ink);
    }
  }

  function footer(page: number, total: number) {
    setDraw(doc, COLORS.hairline);
    doc.setLineWidth(0.2);
    doc.line(M, PH - 13, PW - M, PH - 13);
    font("normal");
    doc.setFontSize(7.5);
    setText(doc, COLORS.muted);
    doc.text(t.footerName(name).toUpperCase(), M, PH - 8);
    doc.text("hbkcareers.org", PW / 2, PH - 8, { align: "center" });
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
      return 26;
    }
    return y;
  }

  // Tinted callout box for personalised insights
  function callout(x: number, y: number, w: number, label: string, body: string): number {
    const lines = wrap(body, w - 8);
    const h = 10 + lines.length * 4.6;
    setFill(doc, COLORS.callout);
    doc.roundedRect(x, y, w, h, 2.5, 2.5, "F");
    setDraw(doc, COLORS.calloutBorder);
    doc.setLineWidth(0.4);
    doc.line(x, y, x, y + h);
    font("bold");
    doc.setFontSize(8.5);
    setText(doc, COLORS.calloutBorder);
    doc.text(label.toUpperCase(), x + 4, y + 5.5);
    font("normal");
    doc.setFontSize(9.5);
    setText(doc, COLORS.ink);
    let cy = y + 10.5;
    for (const ln of lines) {
      doc.text(ln, x + 4, cy);
      cy += 4.6;
    }
    return y + h + 3;
  }

  const current = { page: 1, total: 21 };

  // ============== PAGE 1 — COVER ==============
  // Top deep-indigo zone (≈ 62% of page)
  const SPLIT = PH - 110; // y-position where cream band starts
  setFill(doc, COLORS.primaryDark);
  doc.rect(0, 0, PW, PH, "F");
  setFill(doc, COLORS.primary);
  doc.rect(0, 0, PW, SPLIT, "F");

  // Decorative saffron arcs (top-right) — subtle brand motif
  setFill(doc, COLORS.accent);
  doc.circle(PW - 22, 38, 3.2, "F");
  setDraw(doc, COLORS.accent);
  doc.setLineWidth(0.7);
  doc.circle(PW - 22, 38, 8, "S");
  doc.setLineWidth(0.4);
  doc.circle(PW - 22, 38, 14, "S");

  // Cream lower band
  setFill(doc, COLORS.accentSoft);
  doc.rect(0, SPLIT, PW, PH - SPLIT, "F");
  // Saffron divider rule between zones
  setFill(doc, COLORS.accent);
  doc.rect(0, SPLIT - 1.2, PW, 2.4, "F");

  // Top corner monogram + brand
  setText(doc, [255, 255, 255]);
  font("bold");
  doc.setFontSize(11);
  doc.text("HBK", M, 20);
  setDraw(doc, COLORS.accent);
  doc.setLineWidth(0.8);
  doc.line(M + 13, 17.8, M + 24, 17.8);
  font("normal");
  doc.setFontSize(8.5);
  doc.text("CAREERS", M + 26, 20);
  doc.setFontSize(8.5);
  setText(doc, COLORS.accentSoft);
  doc.text("CAREER · DISCOVERY · REPORT", PW - M, 20, { align: "right" });

  // Big display title — pure white for max legibility
  font("bold");
  doc.setFontSize(58);
  setText(doc, [255, 255, 255]);
  doc.text("Career", M, 90);
  doc.text("Discovery", M, 114);
  // Hero word in saffron — pops against indigo
  setText(doc, COLORS.accent);
  doc.text("Report.", M, 138);

  // Hairline
  setDraw(doc, COLORS.accent);
  doc.setLineWidth(0.6);
  doc.line(M, 150, M + 70, 150);

  font("normal");
  doc.setFontSize(12);
  setText(doc, [255, 255, 255]);
  doc.text("RIASEC Interests   ·   Multiple Intelligences   ·   Aptitude", M, 160);

  font("normal");
  doc.setFontSize(9.5);
  setText(doc, COLORS.accentSoft);
  doc.text("A personalised psychometric profile to guide your next academic step.", M, 168);

  // ===== Cream band content — dark ink reads cleanly =====
  // Prepared For (left)
  setText(doc, COLORS.muted);
  font("bold");
  doc.setFontSize(8.5);
  doc.text("PREPARED FOR", M, SPLIT + 14);

  font("bold");
  doc.setFontSize(30);
  setText(doc, COLORS.primaryDark);
  doc.text(name || t.studentFallback, M, SPLIT + 32);

  // Saffron underline accent under the name
  setDraw(doc, COLORS.accent);
  doc.setLineWidth(0.9);
  doc.line(M, SPLIT + 36, M + 40, SPLIT + 36);

  font("normal");
  doc.setFontSize(10.5);
  setText(doc, COLORS.ink);
  doc.text(
    `Grade ${grade || "—"}   ·   Age ${age || "—"}   ·   ${language === "gu" ? t.langNameGu : t.langNameEn}`,
    M,
    SPLIT + 46,
  );

  // Issued By (right)
  font("bold");
  doc.setFontSize(8.5);
  setText(doc, COLORS.muted);
  doc.text("ISSUED BY", PW - M, SPLIT + 14, { align: "right" });
  font("bold");
  doc.setFontSize(11);
  setText(doc, COLORS.primaryDark);
  doc.text("The H B Kapadia New High School", PW - M, SPLIT + 22, { align: "right" });
  font("normal");
  doc.setFontSize(9);
  setText(doc, COLORS.ink);
  doc.text("Ahmedabad", PW - M, SPLIT + 28, { align: "right" });

  // Bottom row: date / ref / website
  font("normal");
  doc.setFontSize(8.5);
  setText(doc, COLORS.muted);
  doc.text(`ISSUED  ${new Date().toLocaleDateString()}`, M, PH - 14);
  const ref = `REF · ${(name || "STU").slice(0, 3).toUpperCase()}-${new Date().getFullYear()}`;
  doc.text(ref, PW / 2, PH - 14, { align: "center" });
  font("bold");
  setText(doc, COLORS.primary);
  doc.text("hbkcareers.org", PW - M, PH - 14, { align: "right" });


  // ============== PAGE 2 — TABLE OF CONTENTS ==============
  doc.addPage();
  current.page = 3;
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
  footer(3, 21);

  // ============== PAGE 3 — ABOUT ==============
  doc.addPage();
  current.page = 4;
  header(t.sec1);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(11);
  let yy = 50;
  for (const l of t.about) {
    doc.text(l, M, yy);
    yy += 6.5;
  }
  footer(4, 21);

  // ============== PAGE 4 — SNAPSHOT (Executive Summary) ==============
  doc.addPage();
  current.page = 5;
  header(t.sec2);

  // Three large stat tiles
  const tileW = (PW - 2 * M - 8) / 3;
  const tileY = 50;
  const tiles: { label: string; value: string; sub: string; tone: "primary" | "accent" }[] = [
    { label: "Holland Code", value: report.riasecTop.join("·"), sub: "Top 3 interest types", tone: "primary" },
    { label: "Top Intelligence", value: t.mi[report.miTop[0]]?.name ?? "—", sub: "Strongest cognitive style", tone: "accent" },
    { label: "Aptitude", value: `${report.aptitudeOverall}%`, sub: "Overall score across 6 areas", tone: "primary" },
  ];
  tiles.forEach((tile, i) => {
    const tx = M + i * (tileW + 4);
    setFill(doc, tile.tone === "primary" ? COLORS.primary : COLORS.accent);
    doc.roundedRect(tx, tileY, tileW, 36, 2.5, 2.5, "F");
    setText(doc, [255, 255, 255]);
    font("normal");
    doc.setFontSize(7.5);
    doc.text(tile.label.toUpperCase(), tx + 5, tileY + 7);
    font("bold");
    doc.setFontSize(tile.value.length > 10 ? 16 : 22);
    doc.text(tile.value, tx + 5, tileY + 22);
    font("normal");
    doc.setFontSize(7.5);
    doc.text(tile.sub, tx + 5, tileY + 31);
  });
  setText(doc, COLORS.ink);

  // Narrative
  const narrative = `Your profile points to a ${report.riasecTop.join("-")} interest pattern with ${t.mi[report.miTop[0]]?.name ?? "broad"} as your strongest intelligence and ${report.aptitudeTop.map(t.aptCategoryName).join(" & ")} as standout aptitudes. The streams below are mapped to fit this combined profile.`;
  font("normal");
  doc.setFontSize(10.5);
  setText(doc, COLORS.ink);
  let snapY = tileY + 44;
  for (const l of wrap(narrative, PW - 2 * M)) {
    doc.text(l, M, snapY);
    snapY += 5.5;
  }

  // Streams strip
  snapY += 4;
  font("bold");
  doc.setFontSize(11);
  setText(doc, COLORS.primary);
  doc.text(t.snapTopStreams.toUpperCase(), M, snapY);
  setDraw(doc, COLORS.accent);
  doc.setLineWidth(0.8);
  doc.line(M, snapY + 1.5, M + 14, snapY + 1.5);
  snapY += 9;

  recommendedStreams.forEach((sid, i) => {
    const s = STREAM_BY_ID[sid];
    setFill(doc, i === 0 ? COLORS.primary : COLORS.bandAlt);
    doc.roundedRect(M, snapY, PW - 2 * M, 24, 2.5, 2.5, "F");
    setFill(doc, i === 0 ? COLORS.accent : COLORS.primary);
    doc.roundedRect(M, snapY, 1.6, 24, 0.6, 0.6, "F");
    setText(doc, i === 0 ? [255, 255, 255] : COLORS.ink);
    font("normal");
    doc.setFontSize(7.5);
    doc.text(i === 0 ? "PRIMARY MATCH" : "SECONDARY MATCH", M + 6, snapY + 7);
    font("bold");
    doc.setFontSize(14);
    doc.text(s.name, M + 6, snapY + 15);
    font("normal");
    doc.setFontSize(9);
    setText(doc, i === 0 ? [220, 220, 235] : COLORS.muted);
    doc.text(s.tagline, M + 6, snapY + 21);
    snapY += 28;
  });

  // Methodology footnote
  setFill(doc, COLORS.band);
  doc.roundedRect(M, PH - 32, PW - 2 * M, 14, 2, 2, "F");
  font("normal");
  doc.setFontSize(7.5);
  setText(doc, COLORS.muted);
  doc.text("METHODOLOGY", M + 4, PH - 26);
  doc.setFontSize(8.5);
  setText(doc, COLORS.ink);
  doc.text("Based on Holland's RIASEC, Gardner's Multiple Intelligences, and a grade-banded aptitude battery. Scores are 0–100. This is guidance, not a verdict — revisit annually.", M + 4, PH - 21);

  footer(5, 21);

  // ============== PAGE 5 — RIASEC PROFILE (Holland Hexagon) ==============
  doc.addPage();
  current.page = 6;
  header(t.sec3);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(10.5);
  for (const l of wrap(t.riasecIntro, PW - 2 * M)) {
    doc.text(l, M, 48);
  }

  // Hexagon — canonical RIASEC order: R, I, A, S, E, C clockwise from top
  const RIASEC_ORDER: Array<"R" | "I" | "A" | "S" | "E" | "C"> = ["R", "I", "A", "S", "E", "C"];
  drawRadar(doc, {
    cx: PW / 2,
    cy: 110,
    radius: 38,
    axes: RIASEC_ORDER.map((k) => ({
      label: `${k} · ${t.riasec[k].name}`,
      value: report.riasec[k] ?? 0,
    })),
    fillColor: COLORS.bar,
    strokeColor: COLORS.primary,
    fillOpacity: 0.32,
  });

  // Code call-out
  let by = 168;
  setFill(doc, COLORS.primary);
  doc.roundedRect(M, by, PW - 2 * M, 14, 2, 2, "F");
  setText(doc, [255, 255, 255]);
  font("normal");
  doc.setFontSize(8);
  doc.text("YOUR HOLLAND CODE", M + 5, by + 5.5);
  font("bold");
  doc.setFontSize(16);
  doc.text(report.riasecTop.join(" · "), M + 5, by + 11.5);
  setText(doc, COLORS.ink);
  by += 20;

  // Inline bar list (secondary read)
  font("bold");
  doc.setFontSize(9.5);
  setText(doc, COLORS.muted);
  doc.text("DIMENSION SCORES", M, by);
  by += 5;
  RIASEC_ORDER.forEach((k) => {
    drawScoreBar(doc, M, by, PW - 2 * M, `${k} · ${t.riasec[k].name}`, report.riasec[k] ?? 0, {
      fillColor: COLORS.bar,
    });
    by += 8;
  });

  by += 2;
  by = callout(M, by, PW - 2 * M, `${t.riasec[report.riasecTop[0]].name} leads your profile`,
    `${t.riasec[report.riasecTop[0]].description} This pull tends to be most energising in the long run.`);
  footer(6, 21);

  // ============== PAGE 6 — RIASEC DETAIL ==============
  doc.addPage();
  current.page = 7;
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
  footer(7, 21);

  // ============== PAGE 7 — MI RADAR + BARS ==============
  doc.addPage();
  current.page = 8;
  header(t.sec5);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(10.5);
  doc.text(t.miIntro, M, 48);

  const miKeys = Object.keys(t.mi);
  // Two-column: radar left, bars right
  drawRadar(doc, {
    cx: M + 45,
    cy: 105,
    radius: 36,
    axes: miKeys.map((k) => ({
      label: t.mi[k].name.split("-")[0],
      value: report.mi[k] ?? 0,
    })),
    fillColor: COLORS.accent,
    strokeColor: [180, 110, 30],
    fillOpacity: 0.3,
    labelFontSize: 7.5,
    valueFontSize: 7,
  });

  // Right side bars
  by = 65;
  const barX = M + 95;
  const barW = PW - M - barX;
  font("bold");
  doc.setFontSize(8.5);
  setText(doc, COLORS.muted);
  doc.text("YOUR INTELLIGENCES", barX, by);
  by += 6;
  for (const k of miKeys) {
    drawScoreBar(doc, barX, by, barW, t.mi[k].name, report.mi[k] ?? 0, {
      fillColor: COLORS.accent,
    });
    by += 8;
  }

  by = Math.max(by, 155);
  by = callout(M, by, PW - 2 * M, `${t.mi[report.miTop[0]]?.name ?? ""} stands out`,
    `${t.mi[report.miTop[0]]?.description ?? ""} Lean into activities that exercise this style — they will compound fastest.`);
  footer(8, 21);

  // ============== PAGE 8 — MI DETAIL ==============
  doc.addPage();
  current.page = 9;
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
  footer(9, 21);

  // ============== PAGE 9 — APTITUDE WITH PROFICIENCY CHIPS ==============
  doc.addPage();
  current.page = 10;
  header(t.sec7);
  setText(doc, COLORS.ink);
  font("normal");
  doc.setFontSize(10.5);
  doc.text(t.aptOverall(report.aptitudeOverall), M, 48);

  // Big overall ring/tile
  setFill(doc, COLORS.primary);
  doc.roundedRect(M, 56, PW - 2 * M, 22, 2.5, 2.5, "F");
  setText(doc, [255, 255, 255]);
  font("normal");
  doc.setFontSize(8);
  doc.text("OVERALL APTITUDE", M + 6, 64);
  font("bold");
  doc.setFontSize(22);
  doc.text(`${report.aptitudeOverall}%`, M + 6, 74);
  font("normal");
  doc.setFontSize(9);
  const overallBand = proficiencyBand(report.aptitudeOverall);
  setFill(doc, overallBand.color);
  doc.roundedRect(PW - M - 32, 64, 26, 7, 1.5, 1.5, "F");
  setText(doc, [255, 255, 255]);
  doc.setFontSize(8);
  doc.text(overallBand.label.toUpperCase(), PW - M - 19, 68.8, { align: "center" });
  setText(doc, COLORS.ink);

  by = 88;
  for (const [cat, v] of Object.entries(report.aptitude)) {
    drawScoreBar(doc, M, by, PW - 2 * M, t.aptCategoryName(cat), v.pct, {
      sub: `${v.correct} of ${v.total} correct`,
      chip: true,
      fillColor: COLORS.bar,
    });
    by += 10;
  }

  by += 3;
  const topCat = report.aptitudeTop[0];
  if (topCat) {
    by = callout(M, by, PW - 2 * M, `${t.aptCategoryName(topCat)} is your strongest aptitude`,
      `${t.aptDescriptions[topCat] ?? ""}`);
  }
  footer(10, 21);

  // ============== PAGE 10 — APTITUDE DETAIL ==============
  doc.addPage();
  current.page = 11;
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
  footer(11, 21);



  // ============== PAGE 11 — RECOMMENDED STREAMS ==============
  doc.addPage();
  current.page = 12;
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
  footer(12, 21);

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
    footer(current.page, 21);
  });

  // ============== PAGE 14 — TOP CAREERS PERSONALISED FOR YOU ==============
  doc.addPage();
  current.page = 15;
  header(t.sec12);
  yy = 48;
  font("normal");
  doc.setFontSize(10);
  setText(doc, COLORS.muted);
  for (const l of wrap(
    "These careers are ranked by how well each one fits your unique combination of interests (RIASEC), intelligences and aptitude scores — not just your stream. The fit % shows how aligned your profile is with that career's typical demands.",
    PW - 2 * M,
  )) {
    doc.text(l, M, yy);
    yy += 5;
  }
  yy += 4;
  setText(doc, COLORS.ink);
  topCareers.forEach((c, idx) => {
    yy = ensureSpace(yy, 26, current);
    // Card background
    setFill(doc, idx === 0 ? COLORS.callout : COLORS.band);
    doc.roundedRect(M, yy - 4, PW - 2 * M, 24, 2.5, 2.5, "F");
    // Title + fit chip
    font("bold");
    doc.setFontSize(11);
    setText(doc, COLORS.primary);
    doc.text(`${idx + 1}. ${c.path.title}`, M + 4, yy + 1);
    // fit chip on the right
    const chipW = 22;
    const chipX = PW - M - chipW - 2;
    setFill(doc, COLORS.primary);
    doc.roundedRect(chipX, yy - 3, chipW, 7, 1.5, 1.5, "F");
    setText(doc, [255, 255, 255]);
    doc.setFontSize(9);
    doc.text(`${c.fit}% fit`, chipX + chipW / 2, yy + 1.5, { align: "center" });
    // Meta line
    font("normal");
    doc.setFontSize(9);
    setText(doc, COLORS.ink);
    doc.text(
      `${t.pathStream(c.streamName)}  •  ${c.path.duration}  •  ${t.pathSalary(c.path.avgSalary)}`,
      M + 4,
      yy + 7,
    );
    // Why this fits
    font("bold");
    setText(doc, COLORS.accent);
    doc.text("Why this fits you:", M + 4, yy + 12.5);
    font("normal");
    setText(doc, COLORS.ink);
    const reasonW = PW - 2 * M - 38;
    const reasonLines = wrap(c.reason, reasonW);
    doc.text(reasonLines[0] ?? "", M + 32, yy + 12.5);
    // Entrance exams (compact)
    setText(doc, COLORS.muted);
    const ent = c.path.entranceExams.slice(0, 4).join(", ");
    const examLines = wrap(t.pathExams(ent), PW - 2 * M - 8);
    doc.text(examLines[0] ?? "", M + 4, yy + 17.5);
    setText(doc, COLORS.ink);
    yy += 28;
  });
  footer(15, 21);


  // ============== PAGE 15 — ENTRANCE EXAMS ==============
  doc.addPage();
  current.page = 16;
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
  footer(16, 21);

  // ============== PAGE 16 — TOP COLLEGES ==============
  doc.addPage();
  current.page = 17;
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
  footer(17, 21);

  // ============== PAGE 17 — SKILLS TO BUILD ==============
  doc.addPage();
  current.page = 18;
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
  footer(18, 21);

  // ============== PAGE 18 — ACTION PLAN THIS YEAR ==============
  doc.addPage();
  current.page = 19;
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
  footer(19, 21);

  // ============== PAGE 19 — TIPS FOR PARENTS ==============
  doc.addPage();
  current.page = 20;
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
  footer(20, 21);

  // ============== PAGE 20 — NOTES & GLOSSARY ==============
  doc.addPage();
  current.page = 21;
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
  footer(21, 21);

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
