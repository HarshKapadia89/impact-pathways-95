// Career affinity engine.
//
// Goal: produce ACCURATE, personalised stream + career recommendations from
// a student's psychometric profile (RIASEC, Multiple Intelligences, Aptitude).
//
// Two stages:
//   1. score every stream using the FULL RIASEC + MI + Aptitude vectors
//      (not just the top-3 codes) so that strong secondary signals influence
//      the result.
//   2. score every individual career path within the top streams using
//      path-level affinity tags (which RIASEC letters / MIs / aptitudes
//      a path actually demands), then return the personalised top N careers
//      with a fit % and a 1-line "why this fits" explanation.
//
// All weights are tuned against career-counselling literature
// (Holland's RIASEC, Gardner's MI, DBDA-style aptitude buckets).

import { STREAMS, STREAM_BY_ID, type CareerPath, type Stream, type StreamId } from "./careerData";
import type { ScoreReport } from "./psychometricData";

// ---------- types ----------

export interface StreamMatch {
  id: StreamId;
  stream: Stream;
  score: number;       // 0..100 normalised fit
  reasons: string[];   // short bullets explaining the match
}

export interface CareerMatch {
  streamId: StreamId;
  streamName: string;
  path: CareerPath;
  fit: number;         // 0..100 normalised fit
  reason: string;      // single-sentence personalised rationale
}

// ---------- stream-level weights ----------
// Rows = stream, Cols = RIASEC letter. Values 0..3.
// Calibrated so each stream has a clear "primary" interest profile but no
// stream is fully zero on any letter (avoids cliff-effects for mixed kids).
const STREAM_RIASEC_W: Record<StreamId, Record<string, number>> = {
  "science-pcm":  { R: 2.0, I: 3.0, A: 0.5, S: 0.3, E: 0.6, C: 1.4 },
  "science-pcb":  { R: 1.4, I: 3.0, A: 0.5, S: 2.4, E: 0.4, C: 1.0 },
  commerce:       { R: 0.4, I: 1.0, A: 0.6, S: 0.8, E: 3.0, C: 2.6 },
  humanities:     { R: 0.3, I: 1.6, A: 2.6, S: 2.8, E: 1.4, C: 0.6 },
  vocational:     { R: 3.0, I: 0.6, A: 1.0, S: 0.8, E: 1.0, C: 1.4 },
};

// MI weights per stream (8 intelligences x 5 streams).
const STREAM_MI_W: Record<StreamId, Record<string, number>> = {
  "science-pcm":  { Linguistic: 0.8, "Logical-Math": 3.0, Spatial: 2.2, "Bodily-Kin": 0.8, Musical: 0.3, Interpersonal: 0.6, Intrapersonal: 1.2, Naturalist: 0.6 },
  "science-pcb":  { Linguistic: 1.4, "Logical-Math": 2.4, Spatial: 1.4, "Bodily-Kin": 1.6, Musical: 0.3, Interpersonal: 1.6, Intrapersonal: 1.6, Naturalist: 2.6 },
  commerce:       { Linguistic: 1.8, "Logical-Math": 2.4, Spatial: 0.6, "Bodily-Kin": 0.4, Musical: 0.3, Interpersonal: 2.4, Intrapersonal: 1.4, Naturalist: 0.4 },
  humanities:     { Linguistic: 3.0, "Logical-Math": 1.0, Spatial: 1.4, "Bodily-Kin": 0.8, Musical: 1.6, Interpersonal: 2.6, Intrapersonal: 2.4, Naturalist: 1.0 },
  vocational:     { Linguistic: 0.6, "Logical-Math": 1.4, Spatial: 2.2, "Bodily-Kin": 3.0, Musical: 0.6, Interpersonal: 1.0, Intrapersonal: 0.6, Naturalist: 1.6 },
};

// Aptitude weights per stream (4 categories x 5 streams).
const STREAM_APT_W: Record<StreamId, Record<string, number>> = {
  "science-pcm":  { Numerical: 3.0, Verbal: 1.0, Logical: 3.0, Spatial: 2.4 },
  "science-pcb":  { Numerical: 2.0, Verbal: 2.4, Logical: 2.6, Spatial: 1.4 },
  commerce:       { Numerical: 3.0, Verbal: 2.4, Logical: 2.0, Spatial: 0.6 },
  humanities:     { Numerical: 0.8, Verbal: 3.0, Logical: 1.6, Spatial: 1.0 },
  vocational:     { Numerical: 1.4, Verbal: 0.8, Logical: 1.4, Spatial: 2.4 },
};

// ---------- path-level affinity table ----------
// Lookup by EXACT path.title from careerData.ts. Each entry says which RIASEC
// letters, MI keys and aptitude categories that career genuinely demands.
// (Backed up by O*NET / NCS career-cluster mappings.)
type PathTags = {
  riasec: string[];   // 1-3 dominant Holland letters
  mi: string[];       // 1-3 most-used intelligences
  apt: string[];      // 1-3 aptitudes most predictive of success
};

const PATH_TAGS: Record<string, PathTags> = {
  // ---- Science PCM ----
  "B.Tech / B.E. (Engineering)":              { riasec: ["I", "R"],     mi: ["Logical-Math", "Spatial"],            apt: ["Numerical", "Logical", "Spatial"] },
  "B.Arch (Architecture)":                    { riasec: ["A", "R", "I"],mi: ["Spatial", "Logical-Math"],            apt: ["Spatial", "Logical"] },
  "B.Sc. (Pure Sciences)":                    { riasec: ["I"],          mi: ["Logical-Math", "Intrapersonal"],      apt: ["Numerical", "Logical"] },
  "NDA — Defence Services":                   { riasec: ["R", "S", "E"],mi: ["Bodily-Kin", "Interpersonal"],        apt: ["Logical", "Spatial"] },
  "B.Des (Design)":                           { riasec: ["A", "I"],     mi: ["Spatial", "Linguistic"],              apt: ["Spatial", "Verbal"] },
  "Integrated Law (BA LLB / B.Com LLB)":      { riasec: ["S", "E", "A"],mi: ["Linguistic", "Interpersonal"],        apt: ["Verbal", "Logical"] },

  // ---- Science PCB ----
  "MBBS (Medicine)":                          { riasec: ["I", "S"],     mi: ["Logical-Math", "Interpersonal", "Naturalist"], apt: ["Verbal", "Logical", "Numerical"] },
  "BDS (Dentistry)":                          { riasec: ["I", "R", "S"],mi: ["Bodily-Kin", "Spatial", "Logical-Math"],       apt: ["Spatial", "Logical"] },
  "B.Pharm (Pharmacy)":                       { riasec: ["I", "C"],     mi: ["Logical-Math", "Naturalist"],         apt: ["Numerical", "Logical"] },
  "BAMS / BHMS (Ayurveda / Homeopathy)":      { riasec: ["I", "S"],     mi: ["Naturalist", "Interpersonal"],        apt: ["Verbal", "Logical"] },
  "B.Sc. Nursing / Physiotherapy / Allied Health": { riasec: ["S", "I", "R"], mi: ["Interpersonal", "Bodily-Kin"],  apt: ["Verbal", "Logical"] },
  "B.Sc. Agriculture / Horticulture / Veterinary": { riasec: ["R", "I", "S"], mi: ["Naturalist", "Bodily-Kin"],     apt: ["Numerical", "Logical"] },
  "B.Sc. Biotechnology / Microbiology / Forensic Science": { riasec: ["I"], mi: ["Logical-Math", "Naturalist"],     apt: ["Numerical", "Logical"] },

  // ---- Commerce ----
  "CA (Chartered Accountancy)":               { riasec: ["C", "E", "I"],mi: ["Logical-Math", "Intrapersonal"],      apt: ["Numerical", "Logical"] },
  "B.Com (General / Honours)":                { riasec: ["C", "E"],     mi: ["Logical-Math", "Linguistic"],         apt: ["Numerical", "Verbal"] },
  "BBA / BMS (Business Management)":          { riasec: ["E", "S", "C"],mi: ["Interpersonal", "Linguistic", "Logical-Math"], apt: ["Verbal", "Numerical"] },
  "CS (Company Secretary)":                   { riasec: ["C", "E"],     mi: ["Linguistic", "Intrapersonal"],        apt: ["Verbal", "Logical"] },
  "CMA (Cost & Management Accounting)":       { riasec: ["C", "I"],     mi: ["Logical-Math", "Intrapersonal"],      apt: ["Numerical", "Logical"] },
  "B.A. Economics (Honours)":                 { riasec: ["I", "E", "C"],mi: ["Logical-Math", "Linguistic"],         apt: ["Numerical", "Verbal", "Logical"] },
  "BBA-LLB / B.Com-LLB (Integrated Law)":     { riasec: ["E", "S", "A"],mi: ["Linguistic", "Interpersonal"],        apt: ["Verbal", "Logical"] },

  // ---- Humanities ----
  "B.A. (Hons.) — Political Science / History / Sociology / Psychology":
                                              { riasec: ["S", "I", "A"],mi: ["Linguistic", "Intrapersonal", "Interpersonal"], apt: ["Verbal", "Logical"] },
  "Integrated Law (BA LLB)":                  { riasec: ["S", "E", "A"],mi: ["Linguistic", "Interpersonal"],        apt: ["Verbal", "Logical"] },
  "B.A. Journalism & Mass Communication / Media": { riasec: ["A", "S", "E"], mi: ["Linguistic", "Interpersonal"],   apt: ["Verbal"] },
  "B.A. Psychology / B.Sc. Psychology":       { riasec: ["S", "I", "A"],mi: ["Interpersonal", "Intrapersonal", "Linguistic"], apt: ["Verbal", "Logical"] },
  "BSW / MSW (Social Work)":                  { riasec: ["S", "A"],     mi: ["Interpersonal", "Intrapersonal"],     apt: ["Verbal"] },
  "B.Des / B.F.A (Design / Fine Arts)":       { riasec: ["A", "R"],     mi: ["Spatial", "Bodily-Kin"],              apt: ["Spatial", "Verbal"] },
  "B.A. Performing Arts / Music / Theatre":   { riasec: ["A", "S"],     mi: ["Musical", "Bodily-Kin", "Linguistic"],apt: ["Verbal", "Spatial"] },
  "Hotel Management & Hospitality (BHM)":     { riasec: ["E", "S", "C"],mi: ["Interpersonal", "Bodily-Kin"],        apt: ["Verbal", "Numerical"] },

  // ---- Vocational ----
  "Diploma in Engineering (Polytechnic)":     { riasec: ["R", "I", "C"],mi: ["Spatial", "Logical-Math", "Bodily-Kin"], apt: ["Spatial", "Numerical", "Logical"] },
  "ITI (Industrial Training Institute)":      { riasec: ["R", "C"],     mi: ["Bodily-Kin", "Spatial"],              apt: ["Spatial", "Logical"] },
  "Paramedical Diplomas (DMLT, X-Ray, OT)":   { riasec: ["R", "I", "S"],mi: ["Bodily-Kin", "Naturalist"],           apt: ["Logical", "Spatial"] },
  "Diploma in Pharmacy (D.Pharm)":            { riasec: ["I", "C"],     mi: ["Logical-Math", "Naturalist"],         apt: ["Numerical", "Logical"] },
  "Skill India Certifications":               { riasec: ["R", "C", "E"],mi: ["Bodily-Kin", "Interpersonal"],        apt: ["Spatial", "Logical"] },
};

// Fallback when a path has no explicit tags (uses stream-level signature).
function fallbackTagsFor(streamId: StreamId): PathTags {
  const r = topKeys(STREAM_RIASEC_W[streamId], 2);
  const m = topKeys(STREAM_MI_W[streamId], 2);
  const a = topKeys(STREAM_APT_W[streamId], 2);
  return { riasec: r, mi: m, apt: a };
}

function topKeys(weights: Record<string, number>, n: number): string[] {
  return Object.entries(weights).sort((x, y) => y[1] - x[1]).slice(0, n).map(([k]) => k);
}

// ---------- helpers ----------

// Convert raw category->score into a proportion vector that sums to 1
// (so a kid with uniformly-low MI scores still expresses preference shape).
function normalise(map: Record<string, number>): Record<string, number> {
  const sum = Object.values(map).reduce((a, b) => a + (b || 0), 0) || 1;
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(map)) out[k] = (v || 0) / sum;
  return out;
}

function dot(a: Record<string, number>, w: Record<string, number>): number {
  let s = 0;
  for (const [k, v] of Object.entries(w)) s += (a[k] || 0) * v;
  return s;
}

// Friendly labels (must match the strings shown in the report).
const RIASEC_LABEL: Record<string, string> = {
  R: "Realistic / hands-on", I: "Investigative / analytical", A: "Artistic / creative",
  S: "Social / helping", E: "Enterprising / leadership", C: "Conventional / structured",
};

// ---------- public API ----------

export function scoreStreams(report: ScoreReport): StreamMatch[] {
  // Use the FULL vectors, not just top-3, so secondary strengths matter.
  const ri = normalise(report.riasec);
  const mi = normalise(report.mi);
  const apt: Record<string, number> = {};
  for (const [k, v] of Object.entries(report.aptitude)) apt[k] = v.pct / 100; // 0..1
  const aptN = normalise(apt);

  const raw: { id: StreamId; r: number; m: number; a: number }[] = STREAMS.map((s) => ({
    id: s.id,
    r: dot(ri, STREAM_RIASEC_W[s.id]),
    m: dot(mi, STREAM_MI_W[s.id]),
    a: dot(aptN, STREAM_APT_W[s.id]),
  }));

  // Normalise each component across streams so they sit on a comparable scale,
  // then combine with weights: interest 0.45, intelligence 0.30, aptitude 0.25.
  const normCol = (key: "r" | "m" | "a") => {
    const vals = raw.map((x) => x[key]);
    const max = Math.max(...vals, 1e-9);
    return raw.map((x) => x[key] / max);
  };
  const rN = normCol("r");
  const mN = normCol("m");
  const aN = normCol("a");

  const matches: StreamMatch[] = raw.map((x, i) => {
    const score01 = 0.45 * rN[i] + 0.3 * mN[i] + 0.25 * aN[i];
    const score = Math.round(score01 * 100);
    const stream = STREAM_BY_ID[x.id];
    const reasons: string[] = [];
    // Top contributing RIASEC letter for this stream
    const riTop = Object.entries(STREAM_RIASEC_W[x.id])
      .map(([k, w]) => [k, (ri[k] || 0) * w] as const)
      .sort((p, q) => q[1] - p[1])[0]?.[0];
    if (riTop) reasons.push(`Matches your ${RIASEC_LABEL[riTop]} interest`);
    const miTop = Object.entries(STREAM_MI_W[x.id])
      .map(([k, w]) => [k, (mi[k] || 0) * w] as const)
      .sort((p, q) => q[1] - p[1])[0]?.[0];
    if (miTop) reasons.push(`Leverages your ${miTop} intelligence`);
    const aTop = Object.entries(STREAM_APT_W[x.id])
      .map(([k, w]) => [k, (aptN[k] || 0) * w] as const)
      .sort((p, q) => q[1] - p[1])[0]?.[0];
    if (aTop) reasons.push(`Uses your ${aTop} aptitude strength`);
    return { id: x.id, stream, score, reasons };
  });

  matches.sort((a, b) => b.score - a.score);
  return matches;
}

/** Top-N stream IDs (back-compat with the old recommendStreams API). */
export function recommendStreamsAccurate(report: ScoreReport, n = 2): StreamId[] {
  return scoreStreams(report).slice(0, n).map((s) => s.id);
}

/** Personalised ranked list of career paths drawn from the top streams. */
export function rankCareerPaths(
  report: ScoreReport,
  topStreamIds: StreamId[],
  limit = 8,
): CareerMatch[] {
  // Per-student normalised vectors
  const ri = normalise(report.riasec);
  const mi = normalise(report.mi);
  const aptRaw: Record<string, number> = {};
  for (const [k, v] of Object.entries(report.aptitude)) aptRaw[k] = v.pct / 100;
  const apt = normalise(aptRaw);

  // Light bonus for being in the top stream (so primary-stream careers
  // dominate, but a great cross-stream fit can still surface).
  const streamBonus: Record<string, number> = {};
  topStreamIds.forEach((sid, i) => { streamBonus[sid] = i === 0 ? 1.0 : 0.6; });

  const candidates: CareerMatch[] = [];
  for (const s of STREAMS) {
    const sb = streamBonus[s.id] ?? 0.2;
    for (const p of s.paths) {
      const tags = PATH_TAGS[p.title] ?? fallbackTagsFor(s.id);
      // Average the student's normalised score across the path's tagged dims.
      const riAvg = avg(tags.riasec.map((k) => ri[k] || 0));
      const miAvg = avg(tags.mi.map((k) => mi[k] || 0));
      const aptAvg = avg(tags.apt.map((k) => apt[k] || 0));
      // Combine: interests 0.45, MI 0.30, aptitude 0.25, then mult by stream bonus.
      const fit01 = (0.45 * riAvg + 0.30 * miAvg + 0.25 * aptAvg) * sb;
      // Build a personalised reason from the strongest contributor.
      const rContrib = bestKey(tags.riasec, ri);
      const mContrib = bestKey(tags.mi, mi);
      const aContrib = bestKey(tags.apt, apt);
      const parts: string[] = [];
      if (rContrib) parts.push(`your ${RIASEC_LABEL[rContrib] ?? rContrib} interest`);
      if (mContrib) parts.push(`${mContrib} intelligence`);
      if (aContrib) parts.push(`${aContrib} aptitude`);
      const reason = parts.length
        ? `Fits ${parts.slice(0, 2).join(" and ")}.`
        : `Aligned with your overall profile.`;
      candidates.push({
        streamId: s.id,
        streamName: s.name,
        path: p,
        fit: 0, // filled after normalisation
        reason,
      });
      // Stash raw fit on the object temporarily.
      (candidates[candidates.length - 1] as unknown as { _raw: number })._raw = fit01;
    }
  }

  // Normalise raw fit to 0..100 across all candidates so the top match sits
  // near 95-99 and the bottom near ~40, which reads naturally to students.
  const rawVals = candidates.map((c) => (c as unknown as { _raw: number })._raw);
  const max = Math.max(...rawVals, 1e-9);
  const min = Math.min(...rawVals, 0);
  for (const c of candidates) {
    const r = (c as unknown as { _raw: number })._raw;
    const scaled = (r - min) / (max - min || 1);
    // Compress to 55..98 so even the lowest visible career still feels viable.
    c.fit = Math.round(55 + scaled * 43);
  }

  candidates.sort((a, b) => b.fit - a.fit);
  return candidates.slice(0, limit);
}

function avg(xs: number[]): number {
  if (!xs.length) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function bestKey(keys: string[], v: Record<string, number>): string | undefined {
  let best: string | undefined; let bv = -Infinity;
  for (const k of keys) { const x = v[k] || 0; if (x > bv) { bv = x; best = k; } }
  return best;
}
