// Self-certification PDF for LevelUp Lab — topic certificate and master certificate.
import jsPDF from "jspdf";
import type { Lang } from "@/lib/lang";
import { notoSansRegular, notoSansBold } from "./fonts/notoSans";
import { notoSansGujaratiRegular, notoSansGujaratiBold } from "./fonts/notoSansGujarati";
import { notoSansDevanagariRegular, notoSansDevanagariBold } from "./fonts/notoSansDevanagari";

const FONT_LATIN = "NotoLatin";
const FONT_GU = "NotoGu";
const FONT_HI = "NotoDev";

const INDIGO: [number, number, number] = [49, 46, 129];
const AMBER: [number, number, number] = [217, 119, 6];
const INK: [number, number, number] = [30, 30, 45];
const MUTED: [number, number, number] = [110, 110, 130];

function registerFonts(doc: jsPDF) {
  doc.addFileToVFS("NotoSans-Regular.ttf", notoSansRegular);
  doc.addFont("NotoSans-Regular.ttf", FONT_LATIN, "normal");
  doc.addFileToVFS("NotoSans-Bold.ttf", notoSansBold);
  doc.addFont("NotoSans-Bold.ttf", FONT_LATIN, "bold");
  doc.addFileToVFS("NotoSansGujarati-Regular.ttf", notoSansGujaratiRegular);
  doc.addFont("NotoSansGujarati-Regular.ttf", FONT_GU, "normal");
  doc.addFileToVFS("NotoSansGujarati-Bold.ttf", notoSansGujaratiBold);
  doc.addFont("NotoSansGujarati-Bold.ttf", FONT_GU, "bold");
  doc.addFileToVFS("NotoSansDevanagari-Regular.ttf", notoSansDevanagariRegular);
  doc.addFont("NotoSansDevanagari-Regular.ttf", FONT_HI, "normal");
  doc.addFileToVFS("NotoSansDevanagari-Bold.ttf", notoSansDevanagariBold);
  doc.addFont("NotoSansDevanagari-Bold.ttf", FONT_HI, "bold");
}

// Gujarati/Devanagari Noto fonts have no Latin glyphs, so route Latin-only
// strings (English titles, dates, numbers) through the Latin font.
const INDIC = /[\u0A80-\u0AFF\u0900-\u097F]/;
function fontFor(text: string, lang: Lang) {
  return INDIC.test(text) ? bodyFont(lang) : FONT_LATIN;
}

function bodyFont(lang: Lang) {
  if (lang === "gu") return FONT_GU;
  if (lang === "hi" || lang === "mr") return FONT_HI;
  return FONT_LATIN;
}

type Copy = {
  heading: string;
  sub: string;
  awarded: string;
  forCompleting: string;
  selfCert: string;
  lessons: string;
  hours: string;
  score: string;
  issued: string;
  org: string;
  note: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    heading: "Certificate of Completion",
    sub: "LevelUp Lab — life and career skills",
    awarded: "This certifies that",
    forCompleting: "has completed",
    selfCert: "Self-certified: the learner confirms they studied every lesson and completed the chapter test themselves.",
    lessons: "Lessons completed",
    hours: "Hours of study",
    score: "Chapter test score",
    issued: "Issued on",
    org: "HBK Careers · hbkcareers.org",
    note: "This is a self-certification of learning, not a government or university qualification.",
  },
  gu: {
    heading: "પૂર્ણતા પ્રમાણપત્ર",
    sub: "લેવલઅપ લેબ — જીવન અને કારકિર્દી કુશળતા",
    awarded: "આ પ્રમાણિત કરે છે કે",
    forCompleting: "એ પૂર્ણ કર્યું",
    selfCert: "સ્વ-પ્રમાણિત: વિદ્યાર્થીએ દરેક પાઠ જાતે ભણ્યો અને પ્રકરણ કસોટી જાતે આપી હોવાની ખાતરી આપે છે.",
    lessons: "પૂર્ણ થયેલા પાઠ",
    hours: "અભ્યાસના કલાક",
    score: "પ્રકરણ કસોટીના ગુણ",
    issued: "તારીખ",
    org: "HBK Careers · hbkcareers.org",
    note: "આ શીખવાનું સ્વ-પ્રમાણપત્ર છે, સરકારી કે યુનિવર્સિટી લાયકાત નથી.",
  },
  hi: {
    heading: "पूर्णता प्रमाणपत्र",
    sub: "लेवलअप लॅब — जीवन और करियर कौशल",
    awarded: "यह प्रमाणित करता है कि",
    forCompleting: "ने पूरा किया",
    selfCert: "स्व-प्रमाणित: विद्यार्थी पुष्टि करता है कि उसने हर पाठ स्वयं पढ़ा और अध्याय परीक्षा स्वयं दी।",
    lessons: "पूर्ण पाठ",
    hours: "अध्ययन के घंटे",
    score: "अध्याय परीक्षा अंक",
    issued: "जारी दिनांक",
    org: "HBK Careers · hbkcareers.org",
    note: "यह सीखने का स्व-प्रमाणपत्र है, कोई सरकारी या विश्वविद्यालय योग्यता नहीं।",
  },
  mr: {
    heading: "पूर्णत्व प्रमाणपत्र",
    sub: "लेवलअप लॅब — जीवन आणि करिअर कौशल्ये",
    awarded: "हे प्रमाणित करते की",
    forCompleting: "यांनी पूर्ण केले",
    selfCert: "स्व-प्रमाणित: विद्यार्थ्याने प्रत्येक धडा स्वतः अभ्यासला आणि प्रकरण चाचणी स्वतः दिली याची पुष्टी करतो.",
    lessons: "पूर्ण धडे",
    hours: "अभ्यासाचे तास",
    score: "प्रकरण चाचणी गुण",
    issued: "दिनांक",
    org: "HBK Careers · hbkcareers.org",
    note: "हे शिकण्याचे स्व-प्रमाणपत्र आहे, सरकारी किंवा विद्यापीठ पात्रता नाही.",
  },
};

export type CertificateInput = {
  name: string;
  lang: Lang;
  title: string; // topic title or master title
  lessons: number;
  hours: number;
  scoreText?: string;
  master?: boolean;
};

export function generateUpskillCertificate(input: CertificateInput): jsPDF {
  const lang = input.lang;
  const c = COPY[lang] ?? COPY.en;
  const font = bodyFont(lang);
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  registerFonts(doc);

  const W = 297;
  const H = 210;

  // Border frame
  doc.setFillColor(...INDIGO);
  doc.rect(0, 0, W, 14, "F");
  doc.rect(0, H - 14, W, 14, "F");
  doc.setDrawColor(...AMBER);
  doc.setLineWidth(0.8);
  doc.rect(10, 20, W - 20, H - 40);

  const center = (text: string, y: number, size: number, style: "normal" | "bold", color: [number, number, number], f = font) => {
    doc.setFont(f, style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.text(text, W / 2, y, { align: "center" });
  };

  center(c.org, 9.5, 11, "bold", [255, 255, 255], FONT_LATIN);
  center(c.heading, 45, 30, "bold", INDIGO);
  center(c.sub, 56, 12, "normal", MUTED);

  doc.setDrawColor(...AMBER);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - 30, 62, W / 2 + 30, 62);

  center(c.awarded, 76, 12, "normal", MUTED);
  center(input.name || "—", 92, 26, "bold", INK, FONT_LATIN);
  center(c.forCompleting, 105, 12, "normal", MUTED);
  const titleLines = doc.splitTextToSize(input.title, W - 80) as string[];
  let y = 117;
  for (const line of titleLines.slice(0, 2)) {
    center(line, y, 16, "bold", INDIGO, fontFor(line, lang));
    y += 8;
  }

  // Stats row
  const stats: [string, string][] = [
    [c.lessons, String(input.lessons)],
    [c.hours, String(input.hours)],
  ];
  if (input.scoreText) stats.push([c.score, input.scoreText]);
  const boxW = 60;
  const gap = 8;
  const totalW = stats.length * boxW + (stats.length - 1) * gap;
  let x = (W - totalW) / 2;
  const boxY = y + 6;
  for (const [label, value] of stats) {
    doc.setDrawColor(220, 220, 232);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, boxY, boxW, 20, 2, 2, "S");
    doc.setFont(FONT_LATIN, "bold");
    doc.setFontSize(15);
    doc.setTextColor(...INDIGO);
    doc.text(value, x + boxW / 2, boxY + 9, { align: "center" });
    doc.setFont(font, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.setFont(fontFor(label, lang), "normal");
    const l = doc.splitTextToSize(label, boxW - 6) as string[];
    doc.text(l[0], x + boxW / 2, boxY + 15.5, { align: "center" });
    x += boxW + gap;
  }

  doc.setFont(font, "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  const certLines = doc.splitTextToSize(c.selfCert, W - 80) as string[];
  let cy = boxY + 30;
  for (const line of certLines) {
    doc.text(line, W / 2, cy, { align: "center" });
    cy += 4.6;
  }

  const date = new Date().toLocaleDateString(lang === "en" ? "en-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" });
  doc.setFont(font, "normal");
  doc.setFontSize(9);
  doc.setTextColor(...INK);
  doc.setFont(bodyFont(lang), "normal");
  doc.text(`${c.issued}:`, 22, H - 24);
  const issuedW = doc.getTextWidth(`${c.issued}: `);
  doc.setFont(FONT_LATIN, "normal");
  doc.text(date, 22 + issuedW, H - 24);
  doc.setFont(bodyFont(lang), "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  const noteLines = doc.splitTextToSize(c.note, 150) as string[];
  doc.text(noteLines, W - 22, H - 28, { align: "right" });

  doc.setFont(FONT_LATIN, "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("HBK Careers · Student Guidance Hub", W / 2, H - 5, { align: "center" });

  return doc;
}

export function downloadUpskillCertificate(input: CertificateInput) {
  const doc = generateUpskillCertificate(input);
  const safe = (input.name || "learner").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
  const topic = input.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().slice(0, 40);
  doc.save(`hbk-levelup-certificate-${safe}-${topic}.pdf`);
}
