// Generates a real sample PDF using the production report generator,
// with a realistic Grade-10 student answer set. Used on the test intro page
// so visitors can preview an actual student report before taking the test.

import {
  RIASEC_ITEMS,
  MI_ITEMS,
  APTITUDE_ITEMS,
  buildReport,
  type LikertItem,
  type AptitudeItem,
} from "./psychometricData";
import { generatePsychometricPDF } from "./psychometricReport";

// Realistic answer profile for a sample Science-leaning grade-10 student.
// Each category gets a target Likert value (1-5); answers are deterministic.
const RIASEC_PROFILE: Record<string, number> = {
  R: 3, // Realistic — moderate
  I: 5, // Investigative — strong
  A: 4, // Artistic — above average
  S: 4, // Social — above average
  E: 3, // Enterprising — moderate
  C: 3, // Conventional — moderate
};

const MI_PROFILE: Record<string, number> = {
  Linguistic: 4,
  "Logical-Mathematical": 5,
  Spatial: 4,
  "Bodily-Kinesthetic": 3,
  Musical: 3,
  Interpersonal: 4,
  Intrapersonal: 4,
  Naturalistic: 3,
};

// For aptitude, we mark this percentage of items correct per category.
const APT_CORRECT_RATE: Record<string, number> = {
  Numerical: 0.85,
  Verbal: 0.7,
  Logical: 0.8,
  Spatial: 0.75,
  Memory: 0.65,
};

function buildLikertAnswers(items: LikertItem[], profile: Record<string, number>) {
  const out: Record<string, number> = {};
  for (const item of items) {
    // Slight deterministic variation around the target so charts look organic
    const target = profile[item.category] ?? 3;
    const seedHash =
      item.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0) % 3;
    const jitter = seedHash === 0 ? -1 : seedHash === 1 ? 0 : 1;
    const v = Math.max(1, Math.min(5, target + (Math.random() < 0.3 ? jitter : 0)));
    out[item.id] = v;
  }
  return out;
}

function buildAptitudeAnswers(items: AptitudeItem[]) {
  const out: Record<string, number> = {};
  // Group by category and mark first N items correct based on rate
  const grouped: Record<string, AptitudeItem[]> = {};
  for (const it of items) {
    (grouped[it.category] ||= []).push(it);
  }
  for (const [cat, list] of Object.entries(grouped)) {
    const rate = APT_CORRECT_RATE[cat] ?? 0.7;
    const correctCount = Math.round(list.length * rate);
    list.forEach((it, i) => {
      if (i < correctCount) {
        out[it.id] = it.answer;
      } else {
        // Pick a deterministic wrong answer
        out[it.id] = (it.answer + 1) % it.options.length;
      }
    });
  }
  return out;
}

export function buildSampleReportInput(language: "en" | "hi" | "gu" = "en") {
  const riasecAns = buildLikertAnswers(RIASEC_ITEMS, RIASEC_PROFILE);
  const miAns = buildLikertAnswers(MI_ITEMS, MI_PROFILE);
  const aptAns = buildAptitudeAnswers(APTITUDE_ITEMS);
  const report = buildReport(riasecAns, miAns, aptAns);
  return {
    name: "Aarav Patel",
    grade: "10",
    age: "15",
    language,
    report,
    riasecAnswers: riasecAns,
    miAnswers: miAns,
    aptAnswers: aptAns,
  };
}

export function openSampleReport(language: "en" | "hi" | "gu" = "en") {
  const doc = generatePsychometricPDF(buildSampleReportInput(language));
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export function downloadSampleReport(language: "en" | "hi" | "gu" = "en") {
  const doc = generatePsychometricPDF(buildSampleReportInput(language));
  const suffix = language === "gu" ? "Gujarati" : language === "hi" ? "Hindi" : "English";
  doc.save(`HBK-Careers-Sample-Report-Aarav-Patel-${suffix}.pdf`);
}
