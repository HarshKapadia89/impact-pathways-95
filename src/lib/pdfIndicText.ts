// Gujarati / Devanagari text shaping for jsPDF.
//
// jsPDF has no OpenType shaping, so conjuncts (સ્ન, ન્સ), the halant and the
// pre-base "i" matra (રિ) come out broken. The browser's canvas shapes text
// correctly, so Indic strings are rendered on a high-resolution canvas and
// placed in the PDF as images. Latin-only text keeps the native PDF path.
import type { jsPDF } from "jspdf";
import { notoSansRegular, notoSansBold } from "./fonts/notoSans";
import { notoSansGujaratiRegular, notoSansGujaratiBold } from "./fonts/notoSansGujarati";
import { notoSansDevanagariRegular, notoSansDevanagariBold } from "./fonts/notoSansDevanagari";

const INDIC = /[\u0900-\u097F\u0A80-\u0AFF]/;
export function isIndic(text: string): boolean {
  return INDIC.test(text);
}

const PX_PER_PT = 5; // ~360 dpi
const PT_TO_MM = 25.4 / 72;
const FAMILY = "HBKPdfGu, HBKPdfDeva, HBKPdfLatin, sans-serif";

let ready = false;
let loading: Promise<void> | null = null;

function b64ToBuf(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

// ---------- Runtime translation of leftover English report text ----------
type Dict = Record<string, string>;
const dicts: Partial<Record<string, Dict>> = {};
let activeDict: Dict | null = null;
let activeNames: string[] = [];
let collector: ((key: string) => void) | null = null;

/** Called by the report generator before drawing. */
export function setReportContext(lang: string, names: string[]) {
  activeDict = lang === "en" ? null : dicts[lang] ?? null;
  const all = new Set<string>();
  for (const n of names) {
    if (!n) continue;
    all.add(n);
    all.add(n.toUpperCase());
  }
  activeNames = [...all].sort((a, b) => b.length - a.length);
}
export function setReportStringCollector(fn: ((key: string) => void) | null) {
  collector = fn;
}
const INDIC_RUN = /[\u0900-\u097F\u0A80-\u0AFF](?:[\u0900-\u097F\u0A80-\u0AFF\u200c\u200d]|[\s\-/·]+(?=[\u0900-\u097F\u0A80-\u0AFF]))*/g;

export function maskReportString(s: string, names: string[]) {
  const nums: string[] = [];
  // Numbers first so the digits inside placeholders are never masked.
  let out = s.replace(/\d+(?:[.,]\d+)*/g, (m) => {
    nums.push(m);
    return `{D${nums.length - 1}}`;
  });
  // Already-translated runs (e.g. "ભાષાકીય STANDS OUT") become {T0}.
  const runs: string[] = [];
  const keep = (m: string) => {
    runs.push(m);
    return `{T${runs.length - 1}}`;
  };
  out = out.replace(INDIC_RUN, keep).replace(/\b[RIASEC](?:[-·][RIASEC]){1,2}\b/g, keep);
  const nameVals: string[] = [];
  for (const n of names) {
    if (out.includes(n)) {
      out = out.split(n).join(`{N${nameVals.length}}`);
      nameVals.push(n);
    }
  }
  return { key: out, nameVals, nums, runs };
}
function translateOne(s: string, dict: Dict | null, names: string[]): string | null {
  if (!hasLatinWord(s)) return null;
  const { key, nameVals, nums, runs } = maskReportString(s, names);
  collector?.(key);
  const v = dict?.[key];
  if (!v || v === key) return null;
  return v
    .replace(/\{N(\d+)\}/g, (_, i) => nameVals[+i] ?? "")
    .replace(/\{T(\d+)\}/g, (_, i) => runs[+i] ?? "")
    .replace(/\{D(\d+)\}/g, (_, i) => nums[+i] ?? "");
}
function hasLatinWord(s: string) {
  return /[A-Za-z]{3,}/.test(s.replace(INDIC_RUN, ""));
}

/**
 * Translate leftover English. Tries the whole string first, then sentence by
 * sentence so templated paragraphs (different traits, streams) still match.
 */
export function translateReportString(s: string, dict: Dict | null = activeDict, names = activeNames): string {
  if (!s || !hasLatinWord(s)) return s;
  const sentences = s.split(/(?<=[.!?:।])\s+(?=[A-Z{"(₹\d•\u0900-\u097F\u0A80-\u0AFF])/);
  if (sentences.length <= 1) return translateOne(s, dict, names) ?? s;
  const whole = dict?.[maskReportString(s, names).key];
  if (whole) return translateOne(s, dict, names) ?? s;
  return sentences.map((p) => translateOne(p, dict, names) ?? p).join(" ");
}

async function loadDict(lang: string) {
  if (lang === "en" || dicts[lang]) return;
  try {
    const mod = (await import(`./reportXlate/${lang}.json`)) as { default: Dict };
    dicts[lang] = mod.default;
  } catch {
    dicts[lang] = {};
  }
}

export function indicShapingReady(): boolean {
  return ready;
}

/** Load the report fonts into the browser so canvas can shape Indic text. */
export async function preloadReportFonts(lang?: string): Promise<void> {
  if (lang) await loadDict(lang);
  return loadFonts();
}
function loadFonts(): Promise<void> {
  if (ready) return Promise.resolve();
  if (typeof document === "undefined" || typeof FontFace === "undefined") return Promise.resolve();
  if (!loading) {
    const defs: [string, string, string][] = [
      ["HBKPdfGu", notoSansGujaratiRegular, "400"],
      ["HBKPdfGu", notoSansGujaratiBold, "700"],
      ["HBKPdfDeva", notoSansDevanagariRegular, "400"],
      ["HBKPdfDeva", notoSansDevanagariBold, "700"],
      ["HBKPdfLatin", notoSansRegular, "400"],
      ["HBKPdfLatin", notoSansBold, "700"],
    ];
    loading = Promise.all(
      defs.map(async ([fam, data, weight]) => {
        const face = new FontFace(fam, b64ToBuf(data), { weight });
        await face.load();
        document.fonts.add(face);
      }),
    )
      .then(() => {
        ready = true;
      })
      .catch((e) => {
        console.warn("Indic PDF fonts failed to load", e);
        loading = null;
      });
  }
  return loading;
}

let measureCtx: CanvasRenderingContext2D | null = null;
function ctxFont(sizePt: number, bold: boolean, scale = 1) {
  return `${bold ? 700 : 400} ${sizePt * scale}px ${FAMILY}`;
}

/** Width in mm of a string at the given font size. */
export function measureIndic(text: string, sizePt: number, bold: boolean): number {
  if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d");
  const ctx = measureCtx!;
  ctx.font = ctxFont(sizePt, bold);
  return ctx.measureText(text).width * PT_TO_MM;
}

export function wrapIndic(text: string, maxWidthMm: number, sizePt: number, bold: boolean): string[] {
  const lines: string[] = [];
  for (const para of text.split("\n")) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = "";
    for (const w of words) {
      const next = line ? `${line} ${w}` : w;
      if (line && measureIndic(next, sizePt, bold) > maxWidthMm) {
        lines.push(line);
        line = w;
      } else line = next;
    }
    lines.push(line);
  }
  return lines;
}

/** Draw one line of text at (x, y baseline) in mm, honouring align. */
export function drawIndicLine(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  opts: { sizePt: number; bold: boolean; color: string; align?: string },
) {
  if (!text) return;
  const { sizePt, bold, color } = opts;
  const k = PX_PER_PT;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = ctxFont(sizePt, bold, k);
  const m = ctx.measureText(text);
  const ascent = Math.max(m.actualBoundingBoxAscent || 0, sizePt * k * 1.05);
  const descent = Math.max(m.actualBoundingBoxDescent || 0, sizePt * k * 0.45);
  const left = Math.max(m.actualBoundingBoxLeft || 0, 0) + 2;
  const w = Math.ceil(Math.max(m.width, m.actualBoundingBoxRight || 0) + left + 4);
  const h = Math.ceil(ascent + descent + 4);
  canvas.width = w;
  canvas.height = h;
  ctx.font = ctxFont(sizePt, bold, k);
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, left, ascent + 2);

  const toMm = PT_TO_MM / k;
  const wMm = w * toMm;
  const hMm = h * toMm;
  const textW = m.width * toMm;
  let x0 = x - left * toMm;
  if (opts.align === "center") x0 -= textW / 2;
  else if (opts.align === "right") x0 -= textW;
  const y0 = y - (ascent + 2) * toMm;
  doc.addImage(canvas, "PNG", x0, y0, wMm, hMm, undefined, "FAST");
}

function currentColor(doc: jsPDF): string {
  const c = (doc as unknown as { getTextColor: () => string }).getTextColor?.();
  return typeof c === "string" && c.startsWith("#") ? c : "#000000";
}

/**
 * Patch a jsPDF instance so text() and splitTextToSize() shape Indic strings.
 * `isBold` reports the current weight. Returns false when shaping isn't
 * available (fonts not preloaded / no DOM) and leaves the doc untouched.
 */
export function installIndicShaping(doc: jsPDF, isBold: () => boolean): boolean {
  if (!ready || typeof document === "undefined") return false;
  const origText = doc.text.bind(doc) as (...a: unknown[]) => jsPDF;
  const origSplit = doc.splitTextToSize.bind(doc);

  const origWidth = doc.getTextWidth.bind(doc);
  doc.getTextWidth = function (text: string) {
    const tr = translateReportString(text);
    return isIndic(tr) ? measureIndic(tr, doc.getFontSize(), isBold()) : origWidth(tr);
  } as typeof doc.getTextWidth;

  doc.splitTextToSize = function (text: string, maxlen: number, options?: unknown) {
    if (typeof text === "string") text = translateReportString(text);
    if (typeof text === "string" && isIndic(text)) {
      return wrapIndic(text, maxlen, doc.getFontSize(), isBold());
    }
    return origSplit(text, maxlen, options as never);
  } as typeof doc.splitTextToSize;

  doc.text = function (text: unknown, x: unknown, y: unknown, options?: unknown, ...rest: unknown[]) {
    if (typeof text === "string") text = translateReportString(text);
    else if (Array.isArray(text)) text = text.map((l) => (typeof l === "string" ? translateReportString(l) : l));
    const lines = typeof text === "string" ? text.split("\n") : Array.isArray(text) ? (text as unknown[]) : null;
    if (lines && lines.some((l) => typeof l === "string" && isIndic(l)) && typeof x === "number" && typeof y === "number") {
      const o = (options ?? {}) as { align?: string; maxWidth?: number };
      const sizePt = doc.getFontSize();
      const bold = isBold();
      const color = currentColor(doc);
      let all = lines.map(String);
      if (o.maxWidth) all = all.flatMap((l) => wrapIndic(l, o.maxWidth!, sizePt, bold));
      const lh = sizePt * doc.getLineHeightFactor() * PT_TO_MM;
      all.forEach((l, i) => {
        if (isIndic(l)) drawIndicLine(doc, l, x, y + i * lh, { sizePt, bold, color, align: o.align });
        else origText(l, x, y + i * lh, options, ...rest);
      });
      return doc;
    }
    return origText(text, x, y, options, ...rest);
  } as typeof doc.text;
  return true;
}
