// Plain-language narrative builder. Used by the PDF report (Parent Summary
// page) and the shareable web report. Avoids jargon (no "RIASEC" or "Holland
// code") so a parent who has never heard of these frameworks can still
// understand what the report is saying.

import type { ScoreReport } from "./psychometricData";
import type { CareerMatch } from "./careerMatch";
import { STREAM_BY_ID, type StreamId } from "./careerData";

const RIASEC_PLAIN: Record<string, string> = {
  R: "hands-on and practical",
  I: "curious and analytical",
  A: "creative and expressive",
  S: "people-oriented and helpful",
  E: "ambitious and persuasive",
  C: "organised and detail-oriented",
};

const MI_PLAIN: Record<string, string> = {
  Linguistic: "words and language",
  "Logical-Math": "numbers and reasoning",
  Spatial: "visual thinking and design",
  "Bodily-Kin": "movement and hands-on skill",
  Musical: "music and rhythm",
  Interpersonal: "understanding people",
  Intrapersonal: "self-awareness",
  Naturalist: "nature and the living world",
};

const STREAM_NEXT_STEPS: Record<StreamId, string[]> = {
  "science-pcm": [
    "In Class 11, choose Science with Maths (PCM). Add Computer Science if available.",
    "Encourage 30 minutes a day of problem-solving (NCERT, foundation Olympiads, or coding).",
    "By Class 11 end, register for JEE Main and explore IITs, NITs, Nirma, PDEU, DA-IICT.",
  ],
  "science-pcb": [
    "In Class 11, choose Science with Biology (PCB). Maths optional but useful.",
    "Visit a local hospital or lab so the student sees the real day-to-day of medicine.",
    "By Class 11 end, plan for NEET. Look at AIIMS, BJ Medical, GMERS, Smt. NHL.",
  ],
  commerce: [
    "In Class 11, choose Commerce. Add Maths if CA or Economics is on the table.",
    "Watch one short business news segment together each week — builds intuition.",
    "Look at CA Foundation, B.Com (H), BBA — and colleges like SRCC, NMIMS, GLS, HL.",
  ],
  humanities: [
    "In Class 11, choose Humanities/Arts. Pick subjects that match the student's strongest interest (Psychology, Pol. Sci., Sociology, Economics, Law).",
    "Encourage one creative or social activity weekly (debate, theatre, volunteering, journaling).",
    "Look at CUET, CLAT, NID/NIFT, BA programmes at Ashoka, Symbiosis, Gujarat University.",
  ],
  vocational: [
    "Consider a Diploma (Polytechnic) after Class 10, or a vocational stream in Class 11.",
    "Visit a workshop, ITI, or skill-development centre — practical exposure helps confidence.",
    "Look at GTU polytechnics, ITIs in Ahmedabad/Surat/Vadodara, and Skill India certifications.",
  ],
};

export interface ParentSummary {
  /** First short paragraph: who this child is, in plain language. */
  whoTheyAre: string;
  /** Second short paragraph: what direction the data points to. */
  direction: string;
  /** 3 concrete things the parent can do this term. */
  nextSteps: string[];
  /** A single warm line to close on. */
  closing: string;
}

export function buildParentSummary(args: {
  studentName: string;
  grade: string;
  report: ScoreReport;
  topStreamIds: StreamId[];
  topCareers: CareerMatch[];
}): ParentSummary {
  const { studentName, grade, report, topStreamIds, topCareers } = args;
  const firstName = (studentName || "Your child").split(" ")[0];
  const topRi = report.riasecTop[0] ?? "I";
  const secondRi = report.riasecTop[1];
  const topMi = report.miTop[0] ?? "Logical-Math";
  const topStream = topStreamIds[0];
  const stream = topStream ? STREAM_BY_ID[topStream] : undefined;
  const altStream = topStreamIds[1] ? STREAM_BY_ID[topStreamIds[1]] : undefined;

  const traitA = RIASEC_PLAIN[topRi] ?? "curious";
  const traitB = secondRi ? RIASEC_PLAIN[secondRi] : undefined;
  const miPlain = MI_PLAIN[topMi] ?? "logical thinking";

  const whoTheyAre =
    `${firstName} comes across as ${traitA}` +
    (traitB ? `, with a strong ${traitB} side` : "") +
    `. The strongest cognitive style we picked up is ${miPlain}, and the overall aptitude score is ${report.aptitudeOverall}%. ` +
    `These signals are fairly stable in Grade ${grade || "9-10"}, but they are guidance — not a verdict.`;

  const careerHints = topCareers
    .slice(0, 3)
    .map((c) => c.path.title.replace(/\(.*?\)/g, "").trim())
    .filter(Boolean);

  const direction = stream
    ? `The strongest direction the data suggests is **${stream.name}**` +
      (altStream ? ` (with ${altStream.name} as a close second)` : "") +
      `. Concrete paths that fit the profile include ${careerHints.slice(0, 3).join(", ") || "several options across this stream"}. ` +
      `This does not lock the child in — it tells you where they are most likely to thrive if encouraged.`
    : `The data does not point cleanly to a single stream yet, which is normal. Keep the door open across two or three options for the next 6 months and revisit.`;

  const nextSteps = topStream
    ? STREAM_NEXT_STEPS[topStream]
    : [
        "Talk through this report together — ask which careers feel exciting and which feel boring.",
        "Pick one short activity (a club, a free online course, a workshop) aligned with the top interests above.",
        "Revisit the test in 6 months. Profiles can shift, especially between Class 9 and Class 11.",
      ];

  const closing =
    `Use this report as a conversation starter, not a final answer. The most important thing you can do is listen to what ${firstName} feels excited about — the data above is meant to back that conversation, not replace it.`;

  return { whoTheyAre, direction, nextSteps, closing };
}
