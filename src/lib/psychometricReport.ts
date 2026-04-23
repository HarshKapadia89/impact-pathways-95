// PDF report generator for the psychometric test result.
// Uses jsPDF (already installed). Produces a multi-section, ~20-page report.

import jsPDF from "jspdf";
import {
  RIASEC_ITEMS,
  RIASEC_LABELS,
  MI_ITEMS,
  MI_LABELS,
  APTITUDE_ITEMS,
  type ScoreReport,
} from "./psychometricData";
import { recommendStreams, STREAM_BY_ID, type StreamId } from "./careerData";

interface ReportInput {
  name: string;
  grade: string;
  age: string;
  language: "en" | "gu";
  report: ScoreReport;
  riasecAnswers: Record<string, number>;
  miAnswers: Record<string, number>;
  aptAnswers: Record<string, number>;
}

// --- styling helpers ---
const COLORS = {
  primary: [40, 30, 95] as [number, number, number],
  accent: [220, 145, 50] as [number, number, number],
  ink: [30, 30, 50] as [number, number, number],
  muted: [110, 110, 130] as [number, number, number],
  rule: [225, 225, 235] as [number, number, number],
  band: [248, 246, 240] as [number, number, number],
  bar: [60, 50, 130] as [number, number, number],
};

const M = 18; // page margin mm
const PW = 210;
const PH = 297;

function setFill(doc: jsPDF, c: [number, number, number]) {
  doc.setFillColor(c[0], c[1], c[2]);
}
function setText(doc: jsPDF, c: [number, number, number]) {
  doc.setTextColor(c[0], c[1], c[2]);
}
function setDraw(doc: jsPDF, c: [number, number, number]) {
  doc.setDrawColor(c[0], c[1], c[2]);
}

function header(doc: jsPDF, title: string, sub?: string) {
  setFill(doc, COLORS.primary);
  doc.rect(0, 0, PW, 14, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  setText(doc, [255, 255, 255]);
  doc.text("Disha — Career Discovery Report", M, 9);
  if (sub) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(sub, PW - M, 9, { align: "right" });
  }
  setText(doc, COLORS.ink);
  if (title) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    setText(doc, COLORS.primary);
    doc.text(title, M, 28);
    setDraw(doc, COLORS.accent);
    doc.setLineWidth(1.2);
    doc.line(M, 31, M + 22, 31);
    setText(doc, COLORS.ink);
  }
}

function footer(doc: jsPDF, page: number, total: number, name: string) {
  setDraw(doc, COLORS.rule);
  doc.setLineWidth(0.2);
  doc.line(M, PH - 14, PW - M, PH - 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setText(doc, COLORS.muted);
  doc.text(`Disha Report — ${name}`, M, PH - 8);
  doc.text(`Page ${page} of ${total}`, PW - M, PH - 8, { align: "right" });
  setText(doc, COLORS.ink);
}

// jsPDF's built-in helvetica only supports WinAnsi (Latin-1).
// Replace any character outside that range with a safe ASCII fallback so
// glyphs like ₹, ≥, ≠, ✓, ◯, ★ don't render as garbage.
const GLYPH_MAP: Record<string, string> = {
  "₹": "Rs.",
  "≥": ">=",
  "≤": "<=",
  "≠": "!=",
  "✓": "-",
  "◯": "-",
  "★": "*",
  "→": "->",
  "←": "<-",
  "—": "-", // en/em dash sometimes also breaks italic widths; keep ASCII hyphen
  "–": "-",
  "•": "-",
  "’": "'",
  "‘": "'",
  "“": '"',
  "”": '"',
};
function safe(text: string): string {
  let out = "";
  for (const ch of text) {
    if (GLYPH_MAP[ch] !== undefined) out += GLYPH_MAP[ch];
    else if (ch.charCodeAt(0) > 255) out += "?";
    else out += ch;
  }
  return out;
}
function wrap(doc: jsPDF, text: string, maxWidth: number) {
  return doc.splitTextToSize(safe(text), maxWidth) as string[];
}
// Wrap doc.text so every text call is sanitised.
const _origText = jsPDF.prototype.text;
function txt(doc: jsPDF, str: string, x: number, y: number, opts?: Parameters<typeof _origText>[3]) {
  return doc.text(safe(str), x, y, opts);
}

function drawBar(doc: jsPDF, x: number, y: number, label: string, value: number, max = 100, color = COLORS.bar) {
  const w = 110;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setText(doc, COLORS.ink);
  doc.text(label, x, y);
  doc.text(`${value}%`, x + w + 38, y, { align: "right" });
  setFill(doc, COLORS.rule);
  doc.roundedRect(x + 60, y - 3.5, w, 4.5, 1.5, 1.5, "F");
  setFill(doc, color);
  doc.roundedRect(x + 60, y - 3.5, (w * value) / max, 4.5, 1.5, 1.5, "F");
}

function ensureSpace(doc: jsPDF, y: number, needed: number, name: string, current: { page: number; total: number }) {
  if (y + needed > PH - 18) {
    footer(doc, current.page, current.total, name);
    doc.addPage();
    current.page += 1;
    header(doc, "", `Generated ${new Date().toLocaleDateString()}`);
    return 22;
  }
  return y;
}

export function generatePsychometricPDF(input: ReportInput): jsPDF {
  const { name, grade, age, language, report } = input;
  const recommendedStreams = recommendStreams(report.riasecTop, report.aptitudeTop);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const current = { page: 1, total: 20 };

  // ============== PAGE 1 — COVER ==============
  setFill(doc, COLORS.primary);
  doc.rect(0, 0, PW, PH, "F");
  setFill(doc, COLORS.accent);
  doc.rect(0, PH - 80, PW, 80, "F");

  setText(doc, [255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.text("Disha", M, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Career Discovery Report", M, 72);
  doc.setFontSize(10);
  doc.text("Shrimad Rajchandra Educational Trust", M, 80);

  doc.setFontSize(11);
  doc.text("Prepared for", M, 130);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(name || "Student", M, 145);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Grade ${grade || "—"}   •   Age ${age || "—"}   •   Language: ${language === "gu" ? "ગુજરાતી" : "English"}`, M, 155);

  setText(doc, COLORS.primary);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("A 20-page personalised guide", M, PH - 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  doc.text(
    "RIASEC interest profile  •  Multiple intelligences  •  Aptitude analysis",
    M,
    PH - 50
  );
  doc.text("Recommended streams  •  College & exam roadmap  •  Action plan", M, PH - 44);
  doc.setFontSize(9);
  setText(doc, COLORS.muted);
  doc.text(`Generated ${new Date().toLocaleDateString()}`, M, PH - 30);
  doc.text("Free • No login required • disha.org", M, PH - 24);

  // ============== PAGE 2 — TABLE OF CONTENTS ==============
  doc.addPage();
  current.page = 2;
  header(doc, "Table of Contents", `Page 2`);

  const toc = [
    "1. About This Report",
    "2. Your Snapshot",
    "3. RIASEC Interest Profile (Holland Codes)",
    "4. Detailed RIASEC Analysis",
    "5. Multiple Intelligences",
    "6. Detailed Intelligence Analysis",
    "7. Aptitude Strengths",
    "8. Detailed Aptitude Analysis",
    "9. Recommended Streams",
    "10. Stream Deep-Dive — Primary",
    "11. Stream Deep-Dive — Secondary",
    "12. Top Career Paths For You",
    "13. Entrance Exams to Plan For",
    "14. Top Colleges in Gujarat",
    "15. Skills to Build (Now)",
    "16. Action Plan — This Year",
    "17. Action Plan — Next 3 Years",
    "18. Tips for Parents & Mentors",
    "19. Your Answers (Reference)",
    "20. Notes & Glossary",
  ];
  let y = 50;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  for (const line of toc) {
    doc.text(line, M, y);
    setText(doc, COLORS.muted);
    doc.text(line.split(".")[0], PW - M, y, { align: "right" });
    setText(doc, COLORS.ink);
    y += 9;
  }
  footer(doc, 2, 20, name);

  // ============== PAGE 3 — ABOUT ==============
  doc.addPage();
  current.page = 3;
  header(doc, "1. About This Report");
  setText(doc, COLORS.ink);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const about = [
    "This report is built from three internationally-recognised assessments:",
    "",
    "• RIASEC (Holland Codes) — six personality–career types developed by Dr. John Holland.",
    "  Most colleges and HR systems globally still use this framework.",
    "",
    "• Multiple Intelligences — Howard Gardner's theory that we all have eight different",
    "  kinds of intelligence and grow fastest when we work with our strongest ones.",
    "",
    "• Aptitude — practical reasoning across Numerical, Verbal, Logical, Spatial and Memory",
    "  tasks. This shows where you are quick and accurate today.",
    "",
    "How to read your scores:",
    "• Likert scores are normalised to 0–100. Anything above 60 is a meaningful strength.",
    "• Aptitude scores are % correct for that section.",
    "• The recommendations combine all three lenses with research on India / Gujarat job market.",
    "",
    "This report is a starting point — not a verdict. Your interests, effort and context all matter.",
  ];
  let yy = 50;
  for (const l of about) {
    doc.text(l, M, yy);
    yy += 6.5;
  }
  footer(doc, 3, 20, name);

  // ============== PAGE 4 — SNAPSHOT ==============
  doc.addPage();
  current.page = 4;
  header(doc, "2. Your Snapshot");

  setFill(doc, COLORS.band);
  doc.roundedRect(M, 45, PW - 2 * M, 36, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setText(doc, COLORS.primary);
  doc.text("Your top RIASEC code", M + 6, 55);
  doc.text("Top intelligences", M + 6, 65);
  doc.text("Strongest aptitudes", M + 6, 75);

  doc.setFont("helvetica", "normal");
  setText(doc, COLORS.ink);
  doc.text(report.riasecTop.join(" — "), M + 80, 55);
  doc.text(report.miTop.map((k) => MI_LABELS[k]?.name ?? k).join(", "), M + 80, 65);
  doc.text(`${report.aptitudeTop.join(" & ")}  (overall ${report.aptitudeOverall}%)`, M + 80, 75);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  setText(doc, COLORS.primary);
  doc.text("Top recommended streams", M, 100);

  let py = 110;
  recommendedStreams.forEach((sid, i) => {
    const s = STREAM_BY_ID[sid];
    setFill(doc, i === 0 ? COLORS.accent : COLORS.rule);
    doc.roundedRect(M, py, PW - 2 * M, 22, 3, 3, "F");
    setText(doc, i === 0 ? COLORS.primary : COLORS.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${s.name}`, M + 6, py + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(s.tagline, M + 6, py + 17);
    py += 28;
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  setText(doc, COLORS.muted);
  doc.text(
    "Both options are strong. Read the deep-dives in sections 10 & 11 before deciding.",
    M,
    py + 4
  );

  footer(doc, 4, 20, name);

  // ============== PAGE 5 — RIASEC PROFILE ==============
  doc.addPage();
  current.page = 5;
  header(doc, "3. RIASEC Interest Profile");
  setText(doc, COLORS.ink);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Your scores across the six Holland Codes:", M, 48);

  let by = 60;
  ["R", "I", "A", "S", "E", "C"].forEach((k) => {
    drawBar(doc, M, by, `${k} — ${RIASEC_LABELS[k].name}`, report.riasec[k] ?? 0);
    by += 11;
  });

  by += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setText(doc, COLORS.primary);
  doc.text(`Your code: ${report.riasecTop.join(" - ")}`, M, by);
  by += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  const codeText =
    "Your top three letters together are called your Holland Code. " +
    "It's the single best predictor of which work environments you'll find energising. " +
    "Roles that combine all three letters tend to feel like 'flow' to you.";
  for (const l of wrap(doc, codeText, PW - 2 * M)) {
    doc.text(l, M, by);
    by += 5;
  }
  footer(doc, 5, 20, name);

  // ============== PAGE 6 — RIASEC DETAIL ==============
  doc.addPage();
  current.page = 6;
  header(doc, "4. Detailed RIASEC Analysis");
  yy = 48;
  for (const k of report.riasecTop) {
    yy = ensureSpace(doc, yy, 30, name, current);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    setText(doc, COLORS.primary);
    doc.text(`${RIASEC_LABELS[k].name}  —  ${report.riasec[k]}%`, M, yy);
    yy += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(doc, RIASEC_LABELS[k].description, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 4;
  }
  footer(doc, 6, 20, name);

  // ============== PAGE 7 — MI BARS ==============
  doc.addPage();
  current.page = 7;
  header(doc, "5. Multiple Intelligences");
  setText(doc, COLORS.ink);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Howard Gardner's eight intelligences — your scores:", M, 48);
  by = 60;
  for (const k of Object.keys(MI_LABELS)) {
    drawBar(doc, M, by, `${MI_LABELS[k].name}`, report.mi[k] ?? 0, 100, COLORS.accent);
    by += 11;
  }
  footer(doc, 7, 20, name);

  // ============== PAGE 8 — MI DETAIL ==============
  doc.addPage();
  current.page = 8;
  header(doc, "6. Detailed Intelligence Analysis");
  yy = 48;
  const miDescriptions: Record<string, string> = {
    Linguistic: "You learn well through reading, writing, debate and language. Strong fit for law, journalism, teaching, content, communication.",
    LogicalMath: "You process the world through logic and patterns. Strong fit for engineering, sciences, finance, computer science, research.",
    Spatial: "You think in pictures and models. Strong fit for design, architecture, surgery, mechanical engineering, aviation, animation.",
    Bodily: "You learn by doing. Strong fit for sports, dance, surgery, paramedical, hands-on engineering, performing arts, defence.",
    Musical: "You're attuned to sound, rhythm and tone. Strong fit for music, sound design, audio engineering, language teaching.",
    Interpersonal: "You read people well. Strong fit for teaching, counselling, sales, management, HR, hospitality, healthcare.",
    Intrapersonal: "You know yourself deeply. Strong fit for writing, philosophy, research, psychology, entrepreneurship, leadership.",
    Naturalist: "You're tuned to the natural world. Strong fit for agriculture, environmental science, biotech, veterinary, geology.",
  };
  for (const k of report.miTop) {
    yy = ensureSpace(doc, yy, 32, name, current);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    setText(doc, COLORS.primary);
    doc.text(`${MI_LABELS[k].name}  —  ${report.mi[k]}%`, M, yy);
    yy += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(doc, miDescriptions[k] ?? "", PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 4;
  }
  footer(doc, 8, 20, name);

  // ============== PAGE 9 — APTITUDE BARS ==============
  doc.addPage();
  current.page = 9;
  header(doc, "7. Aptitude Strengths");
  setText(doc, COLORS.ink);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Overall aptitude score: ${report.aptitudeOverall}%`, M, 48);
  by = 62;
  for (const [cat, v] of Object.entries(report.aptitude)) {
    drawBar(doc, M, by, `${cat}  (${v.correct}/${v.total})`, v.pct, 100, COLORS.bar);
    by += 11;
  }
  footer(doc, 9, 20, name);

  // ============== PAGE 10 — APTITUDE DETAIL ==============
  doc.addPage();
  current.page = 10;
  header(doc, "8. Detailed Aptitude Analysis");
  yy = 48;
  const aptDescriptions: Record<string, string> = {
    Numerical: "Speed and accuracy with numbers, ratios, and quick mental math. Vital for engineering, finance, data, accountancy, and competitive exams (JEE/CAT).",
    Verbal: "Comfort with words, reading comprehension, and language reasoning. Vital for law, civil services, journalism, BBA-MBA, communication.",
    Logical: "Ability to spot patterns and reason step-by-step. Vital for coding, research, law, strategy, and most competitive exams.",
    Spatial: "Visualising shapes and rotations in your mind. Vital for architecture, design, mechanical engineering, surgery, aviation.",
    Memory: "Holding and recalling information accurately. Helps in medicine, law, languages, and any exam-heavy field.",
  };
  for (const [cat, v] of Object.entries(report.aptitude)) {
    yy = ensureSpace(doc, yy, 24, name, current);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    setText(doc, COLORS.primary);
    doc.text(`${cat}  —  ${v.pct}%`, M, yy);
    yy += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(doc, aptDescriptions[cat] ?? "", PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 3;
  }
  footer(doc, 10, 20, name);

  // ============== PAGE 11 — RECOMMENDED STREAMS ==============
  doc.addPage();
  current.page = 11;
  header(doc, "9. Recommended Streams");
  yy = 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  for (const l of wrap(
    doc,
    "Based on your interests, intelligences and aptitudes, the following streams are the strongest fit. The next two pages dive deep into each.",
    PW - 2 * M
  )) {
    doc.text(l, M, yy);
    yy += 6;
  }
  yy += 4;
  recommendedStreams.forEach((sid, i) => {
    const s = STREAM_BY_ID[sid];
    setFill(doc, i === 0 ? [...COLORS.primary] as [number, number, number] : COLORS.band);
    doc.roundedRect(M, yy, PW - 2 * M, 30, 3, 3, "F");
    setText(doc, i === 0 ? [255, 255, 255] : COLORS.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${i === 0 ? "Primary" : "Secondary"}: ${s.name}`, M + 6, yy + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(s.tagline, M + 6, yy + 18);
    doc.setFontSize(9);
    doc.text(`Core subjects: ${s.coreSubjects.slice(0, 4).join(", ")}`, M + 6, yy + 25);
    setText(doc, COLORS.ink);
    yy += 38;
  });
  footer(doc, 11, 20, name);

  // ============== PAGE 12-13 — STREAM DEEP DIVE 1 & 2 ==============
  recommendedStreams.forEach((sid, i) => {
    doc.addPage();
    current.page = 12 + i;
    header(doc, `${10 + i}. Stream Deep-Dive — ${i === 0 ? "Primary" : "Secondary"}`);
    const s = STREAM_BY_ID[sid];
    yy = 48;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    setText(doc, COLORS.primary);
    doc.text(s.name, M, yy);
    yy += 8;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    setText(doc, COLORS.muted);
    doc.text(s.tagline, M, yy);
    yy += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setText(doc, COLORS.ink);
    for (const l of wrap(doc, s.overview, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5;
    }
    yy += 3;
    doc.setFont("helvetica", "bold");
    doc.text("Top career paths in this stream:", M, yy);
    yy += 6;
    doc.setFont("helvetica", "normal");
    for (const p of s.paths.slice(0, 5)) {
      yy = ensureSpace(doc, yy, 16, name, current);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`• ${p.title}`, M, yy);
      yy += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      setText(doc, COLORS.muted);
      for (const l of wrap(doc, `${p.duration}  •  ${p.eligibility}  •  ${p.avgSalary}`, PW - 2 * M - 4)) {
        doc.text(l, M + 4, yy);
        yy += 4.5;
      }
      setText(doc, COLORS.ink);
      yy += 1.5;
    }
    footer(doc, current.page, 20, name);
  });

  // ============== PAGE 14 — TOP CAREERS LIST ==============
  doc.addPage();
  current.page = 14;
  header(doc, "12. Top Career Paths For You");
  yy = 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  let counter = 1;
  for (const sid of recommendedStreams) {
    const s = STREAM_BY_ID[sid];
    for (const p of s.paths.slice(0, 4)) {
      yy = ensureSpace(doc, yy, 14, name, current);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      setText(doc, COLORS.primary);
      doc.text(`${counter}. ${p.title}`, M, yy);
      counter += 1;
      yy += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      setText(doc, COLORS.ink);
      doc.text(`Stream: ${s.name}  •  ${p.duration}  •  Salary: ${p.avgSalary}`, M, yy);
      yy += 5;
      setText(doc, COLORS.muted);
      const ent = p.entranceExams.join(", ");
      for (const l of wrap(doc, `Entrance exams: ${ent}`, PW - 2 * M)) {
        doc.text(l, M, yy);
        yy += 4.5;
      }
      setText(doc, COLORS.ink);
      yy += 2;
    }
  }
  footer(doc, 14, 20, name);

  // ============== PAGE 15 — ENTRANCE EXAMS ==============
  doc.addPage();
  current.page = 15;
  header(doc, "13. Entrance Exams to Plan For");
  yy = 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  const allExams = new Set<string>();
  for (const sid of recommendedStreams) {
    for (const p of STREAM_BY_ID[sid].paths) {
      for (const e of p.entranceExams) allExams.add(e);
    }
  }
  doc.text(`${allExams.size} entrance exams matter for your recommended streams:`, M, yy);
  yy += 7;
  for (const ex of allExams) {
    yy = ensureSpace(doc, yy, 8, name, current);
    setFill(doc, COLORS.band);
    doc.roundedRect(M, yy - 4, PW - 2 * M, 7, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    setText(doc, COLORS.primary);
    doc.text(ex, M + 3, yy + 1);
    setText(doc, COLORS.ink);
    yy += 9;
  }
  footer(doc, 15, 20, name);

  // ============== PAGE 16 — TOP COLLEGES ==============
  doc.addPage();
  current.page = 16;
  header(doc, "14. Top Colleges in Gujarat");
  yy = 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setText(doc, COLORS.ink);
  doc.text("Recommended for your streams (browse the full directory at /colleges):", M, yy);
  yy += 8;
  const collegesShown = new Set<string>();
  for (const sid of recommendedStreams) {
    for (const p of STREAM_BY_ID[sid].paths.slice(0, 4)) {
      for (const c of p.topColleges.slice(0, 3)) {
        if (collegesShown.has(c)) continue;
        collegesShown.add(c);
        yy = ensureSpace(doc, yy, 7, name, current);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`•  ${c}`, M, yy);
        yy += 6;
      }
    }
  }
  footer(doc, 16, 20, name);

  // ============== PAGE 17 — SKILLS TO BUILD ==============
  doc.addPage();
  current.page = 17;
  header(doc, "15. Skills to Build (Now)");
  yy = 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  const skills = [
    "English communication — speak, write, present.",
    "Spoken & written Gujarati / Hindi (mother-tongue confidence builds career confidence).",
    "Basic computer skills — typing, MS Office / Google Docs.",
    "Internet research and learning to use YouTube / Khan Academy / NPTEL.",
    "Public speaking — join debate, elocution, school theatre.",
    "Time management — daily plan, weekly review.",
    "Mental math + reading speed — tiny daily reps compound.",
    "Curiosity & question-asking — interview adults you admire about their work.",
  ];
  for (const s of skills) {
    yy = ensureSpace(doc, yy, 7, name, current);
    doc.text(`✓  ${s}`, M, yy);
    yy += 7;
  }
  footer(doc, 17, 20, name);

  // ============== PAGE 18 — ACTION PLAN THIS YEAR ==============
  doc.addPage();
  current.page = 18;
  header(doc, "16. Action Plan — This Year");
  yy = 50;
  const thisYear = [
    "Pick one role-model from each recommended stream and read 1 article about them this month.",
    "Visit one college from your shortlist (or take a virtual tour).",
    "Try one short online course (Coursera, NPTEL, SWAYAM) related to the stream.",
    "Talk to two seniors who chose this stream — what surprised them?",
    "Track your school marks per subject — which subjects energise you?",
    "Re-take this test in 6 months and compare scores.",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  for (const s of thisYear) {
    yy = ensureSpace(doc, yy, 8, name, current);
    doc.text(`◯  ${s}`, M, yy);
    yy += 8;
  }
  // 3-year plan starts here too
  yy += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  setText(doc, COLORS.primary);
  doc.text("17. Action Plan — Next 3 Years", M, yy);
  yy += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  const threeYear = [
    "Year 1: Strengthen base (math, language, daily reading, one extracurricular).",
    "Year 2: Try focused exam prep (NTSE, KVPY, foundation classes).",
    "Year 3: Lock the stream, choose 11th subjects, start exam-specific prep (JEE/NEET/CLAT/CUET).",
    "Build a portfolio (projects, blog, drawings, videos) — not just marks.",
    "Apply to scholarships every year (Inspire, NMMS, NTSE).",
  ];
  for (const s of threeYear) {
    yy = ensureSpace(doc, yy, 8, name, current);
    doc.text(`◯  ${s}`, M, yy);
    yy += 8;
  }
  footer(doc, 18, 20, name);

  // ============== PAGE 19 — TIPS FOR PARENTS ==============
  doc.addPage();
  current.page = 19;
  header(doc, "18. Tips for Parents & Mentors");
  yy = 50;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  const parentTips = [
    "Read this report together. Ask your child what surprised them.",
    "Stream choice belongs to the student. Adults guide; they don't decide.",
    "Marks ≠ ability. Aptitude + effort + interest matter more long-term.",
    "Gujarat has incredible institutions — IIM-A, NID, GNLU, NIFT, IIT-GN, MICA, MSU. Many give 100% scholarships.",
    "Visit one college campus together this year. It changes how a student thinks.",
    "Celebrate curiosity, not only marks. Ask 'what did you find interesting?' more than 'what did you score?'",
  ];
  for (const s of parentTips) {
    yy = ensureSpace(doc, yy, 12, name, current);
    for (const l of wrap(doc, `•  ${s}`, PW - 2 * M)) {
      doc.text(l, M, yy);
      yy += 5.5;
    }
    yy += 1;
  }
  footer(doc, 19, 20, name);

  // ============== PAGE 20 — NOTES & GLOSSARY ==============
  doc.addPage();
  current.page = 20;
  header(doc, "20. Notes & Glossary");
  yy = 50;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setText(doc, COLORS.ink);
  const glossary = [
    ["RIASEC", "Holland's six personality–career types — Realistic, Investigative, Artistic, Social, Enterprising, Conventional."],
    ["MI", "Multiple Intelligences — Howard Gardner's theory of eight different ways of being smart."],
    ["JEE", "Joint Entrance Examination — for engineering admission to IITs/NITs/IIITs."],
    ["NEET", "National Eligibility cum Entrance Test — for medical (MBBS, BDS, AYUSH)."],
    ["CUET", "Common University Entrance Test — for central universities."],
    ["CLAT", "Common Law Admission Test — for National Law Universities including GNLU."],
    ["GUJCET", "Gujarat Common Entrance Test — for Gujarat engineering & pharmacy seats."],
    ["IPM", "Integrated Programme in Management — IIMs' 5-year course after 12th."],
    ["GNLU", "Gujarat National Law University, Gandhinagar — top-5 NLU in India."],
    ["NID", "National Institute of Design, Ahmedabad — India's top design school."],
    ["MICA", "Mudra Institute of Communications, Ahmedabad — top communications PG school."],
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  for (const [k, v] of glossary) {
    yy = ensureSpace(doc, yy, 10, name, current);
    doc.setFont("helvetica", "bold");
    doc.text(k, M, yy);
    doc.setFont("helvetica", "normal");
    for (const l of wrap(doc, v, PW - 2 * M - 25)) {
      doc.text(l, M + 25, yy);
      yy += 5;
    }
    yy += 2;
  }

  yy += 6;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  setText(doc, COLORS.muted);
  doc.text(
    "This report is a guidance tool, not a final verdict. Discuss it with mentors, parents and teachers.",
    M,
    yy
  );
  footer(doc, 20, 20, name);

  // Re-stamp footer page numbers in case ensureSpace inserted extra pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setText(doc, COLORS.muted);
    doc.text(`Page ${i} of ${totalPages}`, PW - M, PH - 8, { align: "right" });
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
