// Report strings — English only.
// NOTE: ReportLang keeps "gu" in the union for backwards compat with existing
// call sites in psychometricReport.ts; we always return English content.
export type ReportLang = "en" | "gu";

type RiasecKey = "R" | "I" | "A" | "S" | "E" | "C";

export interface ReportStrings {
  // Brand / cover
  brand: string;
  reportTitle: string;
  subtitle: string;
  prepared: string;
  date: string;
  coverSubtitle: string;
  schoolLine: string;
  preparedFor: string;
  studentFallback: string;
  langNameEn: string;
  langNameGu: string;
  metaLine: (grade: string, age: string, lang: string) => string;
  coverHeadline: string;
  coverBullets1: string;
  coverBullets2: string;
  coverFooter: string;
  generatedOn: (d: string) => string;

  // TOC
  toc: string;
  tocItems: string[];
  sec1: string; sec2: string; sec3: string; sec4: string; sec5: string;
  sec6: string; sec7: string; sec8: string; sec9: string; sec10: string;
  sec11: string; sec12: string; sec13: string; sec14: string; sec15: string;
  sec16: string; sec17: string; sec18: string; sec19: string;

  // Section bodies
  about: string[];

  // Snapshot
  snapTopRiasec: string;
  snapTopMi: string;
  snapTopApt: string;
  snapTopStreams: string;
  snapBoth: string;
  snapAptOverall: (pct: number) => string;

  // RIASEC
  riasecIntro: string;
  riasec: Record<string, { name: string; description: string }>;
  riasecYourCode: (code: string) => string;
  riasecCodeText: string;

  // MI
  miIntro: string;
  mi: Record<string, { name: string; description: string }>;

  // Aptitude
  aptOverall: (pct: number) => string;
  aptCategoryName: (cat: string) => string;
  aptDescriptions: Record<string, string>;

  // Streams
  streamsIntro: string;
  primary: string;
  secondary: string;
  coreSubjects: (s: string) => string;

  // Careers
  topPaths: string;
  pathStream: (s: string) => string;
  pathSalary: (s: string) => string;
  pathExams: (s: string) => string;

  // Exams / colleges
  examsIntro: (n: number) => string;
  collegesIntro: string;

  // Skills / actions
  skillsList: string[];
  thisYearList: string[];
  threeYearList: string[];
  parentTips: string[];

  // Glossary / closing
  glossaryItems: Array<[string, string]>;
  closingDisclaimer: string;

  // Footer / misc
  footerName: (name: string) => string;
  pageOf: (page: number, total: number) => string;
  page: string;
  of: string;
  topInterest: string;
  topIntelligence: string;
  topAptitude: string;
  yourCode: string;
  scoreLegend: string;
  appendix: string;
  appendixDesc: string;
  monthLabel: string;
  weekLabel: string;
  habitsLabel: string;
  resourcesLabel: string;
  examsLabel: string;
  next90: string;
  notesTitle: string;
  signatureLine: string;
  execSummary: string;
  riasecTitle: string;
  miTitle: string;
  aptitude: string;
  streams: string;
  careers: string;
  colleges: string;
  exams: string;
  skills: string;
  actionPlan: string;
}

const SECTIONS = [
  "1.  About this Report",
  "2.  Your Snapshot",
  "3.  RIASEC Interest Profile",
  "4.  RIASEC Detailed Insights",
  "5.  Multiple Intelligences Map",
  "6.  Multiple Intelligences — Your Top Areas",
  "7.  Aptitude Snapshot",
  "8.  Aptitude — Detailed Insights",
  "9.  Recommended Streams (after Class 10)",
  "10. Stream Deep Dive — Primary",
  "11. Stream Deep Dive — Secondary",
  "12. Matching Career Roles",
  "13. Entrance Exams to Target",
  "14. Suggested Colleges in Gujarat & India",
  "15. Skill-Building Roadmap",
  "16. Action Plan — This Year",
  "17. Action Plan — Next 3 Years",
  "18. Tips for Parents",
  "19. Glossary & Notes",
];

const en: ReportStrings = {
  brand: "HBK Careers · The H B Kapadia New High School",
  reportTitle: "Career Discovery Report",
  subtitle: "Your personalised RIASEC + Multiple Intelligences + Aptitude profile",
  prepared: "Prepared for",
  date: "Date",
  coverSubtitle: "Career Discovery Report — RIASEC + Multiple Intelligences + Aptitude",
  schoolLine: "The H B Kapadia New High School · Ahmedabad",
  preparedFor: "Prepared for",
  studentFallback: "Student",
  langNameEn: "English",
  langNameGu: "Gujarati",
  metaLine: (grade, age, lang) => `Grade ${grade}  ·  Age ${age}  ·  Language: ${lang}`,
  coverHeadline: "What's inside",
  coverBullets1: "RIASEC interests · Multiple Intelligences · Aptitude scores",
  coverBullets2: "Recommended streams · Careers · Colleges · Exams · 3-year action plan",
  coverFooter: "hbkcareers.org",
  generatedOn: (d) => `Generated on ${d}`,

  toc: "What's inside this report",
  tocItems: SECTIONS,
  sec1: SECTIONS[0], sec2: SECTIONS[1], sec3: SECTIONS[2], sec4: SECTIONS[3],
  sec5: SECTIONS[4], sec6: SECTIONS[5], sec7: SECTIONS[6], sec8: SECTIONS[7],
  sec9: SECTIONS[8], sec10: SECTIONS[9], sec11: SECTIONS[10], sec12: SECTIONS[11],
  sec13: SECTIONS[12], sec14: SECTIONS[13], sec15: SECTIONS[14], sec16: SECTIONS[15],
  sec17: SECTIONS[16], sec18: SECTIONS[17], sec19: SECTIONS[18],

  about: [
    "This report combines three internationally validated frameworks — Holland's RIASEC",
    "interest types, Gardner's Multiple Intelligences, and a school-grade aptitude",
    "battery — to give you a clear, personalised picture of where your strengths and",
    "interests lie.",
    "",
    "Use it as a conversation starter with your parents, teachers, and counsellor.",
    "It is not a verdict — it is a map. The next step is exploring the recommended",
    "streams, careers, and exams in detail and trying small experiments (clubs,",
    "internships, online courses) to validate what fits you best.",
  ],

  snapTopRiasec: "Top RIASEC types:",
  snapTopMi: "Top intelligences:",
  snapTopApt: "Top aptitudes:",
  snapTopStreams: "Recommended streams for you",
  snapBoth: "Both streams are strong fits — your primary is the best match based on the combined profile.",
  snapAptOverall: (pct) => `(overall ${pct}%)`,

  riasecIntro: "Your interests across the six Holland types. Higher bars indicate stronger pull toward that type of work environment.",
  riasec: {
    R: { name: "Realistic", description: "Hands-on, practical, mechanical, outdoors. Enjoys working with tools, machines, plants, animals, or building things." },
    I: { name: "Investigative", description: "Analytical, scientific, curious. Enjoys research, problem-solving, mathematics, and understanding how things work." },
    A: { name: "Artistic", description: "Creative, expressive, original. Enjoys design, writing, music, performance, and unstructured creative work." },
    S: { name: "Social", description: "Helping, teaching, caring, communicating. Enjoys working with people, mentoring, healthcare, counselling." },
    E: { name: "Enterprising", description: "Persuading, leading, selling, organising. Enjoys business, entrepreneurship, leadership, and influencing others." },
    C: { name: "Conventional", description: "Organised, detail-oriented, methodical. Enjoys data, records, systems, accounting, and structured environments." },
  },
  riasecYourCode: (code) => `Your Holland code: ${code}`,
  riasecCodeText: "Your Holland code is the combination of your top three interest types. Most careers can be mapped to a 3-letter Holland code, and the closest matches to yours tend to feel most engaging and sustainable over the long term.",

  miIntro: "Howard Gardner's eight intelligences — different ways of being smart. Most people are stronger in two or three of these.",
  mi: {
    linguistic: { name: "Linguistic", description: "Skill with words — reading, writing, speaking, languages." },
    logical: { name: "Logical-Mathematical", description: "Reasoning, numbers, patterns, science, logic." },
    spatial: { name: "Spatial", description: "Visualising, design, maps, art, architecture, 3D thinking." },
    musical: { name: "Musical", description: "Rhythm, pitch, sound, composition, performance." },
    bodily: { name: "Bodily-Kinesthetic", description: "Physical coordination, sport, dance, hands-on craft, surgery." },
    interpersonal: { name: "Interpersonal", description: "Understanding others, leadership, teamwork, empathy." },
    intrapersonal: { name: "Intrapersonal", description: "Self-awareness, reflection, independent goal-setting." },
    naturalist: { name: "Naturalist", description: "Nature, plants, animals, environment, classification." },
  },

  aptOverall: (pct) => `Your overall aptitude score: ${pct}%. Below is the breakdown by category.`,
  aptCategoryName: (cat) => {
    const map: Record<string, string> = {
      numerical: "Numerical",
      verbal: "Verbal",
      logical: "Logical",
      spatial: "Spatial",
      mechanical: "Mechanical",
      abstract: "Abstract",
    };
    return map[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
  },
  aptDescriptions: {
    numerical: "Working with numbers, arithmetic, percentages, ratios, data interpretation. Important for engineering, finance, science, and data careers.",
    verbal: "Reading comprehension, vocabulary, grammar, reasoning with language. Important for law, journalism, teaching, management, and communication roles.",
    logical: "Pattern recognition, deductive reasoning, sequencing. Important for programming, research, strategy, and problem-solving careers.",
    spatial: "Visualising shapes and rotations, mental imagery. Important for architecture, design, engineering, surgery, and the arts.",
    mechanical: "Understanding how machines and physical systems work — forces, levers, gears. Important for engineering, trades, and applied science.",
    abstract: "Reasoning about patterns and concepts without language or numbers. Important for science, research, and creative problem-solving.",
  },

  streamsIntro: "Based on your interests and aptitudes, the following streams are the best fit for you after Class 10. The primary recommendation is your strongest match.",
  primary: "Primary",
  secondary: "Secondary",
  coreSubjects: (s) => `Core subjects: ${s}`,

  topPaths: "Top career paths in this stream:",
  pathStream: (s) => `Stream: ${s}`,
  pathSalary: (s) => `Avg starting salary: ${s}`,
  pathExams: (s) => `Entrance exams: ${s}`,

  examsIntro: (n) => `Across your recommended streams, the following ${n} entrance exams are most relevant. Start preparing early — most need 1–2 years of focused effort.`,
  collegesIntro: "A curated list of colleges in Gujarat and India offering programmes aligned with your recommended streams.",

  skillsList: [
    "Strong reading habit — at least one non-fiction book per month.",
    "Daily problem-solving practice (math/logic puzzles, 20 minutes).",
    "Public speaking — debate club, MUN, or weekly classroom presentations.",
    "Basic computer literacy — typing, spreadsheets, internet research.",
    "One creative outlet — music, sketching, writing, photography, or coding side-projects.",
    "Sports or physical activity at least 3x per week.",
    "Volunteer / community service — builds empathy and the Social RIASEC dimension.",
    "Time-management & study planning — weekly review and goal-setting.",
  ],
  thisYearList: [
    "Discuss this report with parents and class teacher within 2 weeks.",
    "Pick 2 careers from the matching list and shadow/interview a professional.",
    "Try one online course (Coursera, edX, NPTEL, Khan Academy) related to your top stream.",
    "Maintain a 'curiosity journal' — note what excites you each week.",
    "Strengthen weak aptitude areas with 30 min daily practice.",
  ],
  threeYearList: [
    "Year 1: Choose stream after Class 10 confidently with the help of this report.",
    "Year 2: Begin entrance exam coaching for top 2 target exams.",
    "Year 3: Shortlist 10 colleges and prepare application strategy.",
    "Throughout: Build portfolio (projects, certificates, competitions) for college applications.",
  ],
  parentTips: [
    "This report is a guide, not a verdict — your child's interests will evolve.",
    "Focus on the top recommended streams, but allow exploration of secondary options.",
    "Encourage exposure: workshops, internships, talks with professionals.",
    "Support skill-building consistently — habits matter more than intensity.",
    "Avoid comparing with peers; every profile is unique.",
    "Revisit this report annually as part of an open career conversation.",
  ],

  glossaryItems: [
    ["RIASEC", "Holland's six interest types: Realistic, Investigative, Artistic, Social, Enterprising, Conventional."],
    ["MI", "Multiple Intelligences — Howard Gardner's framework of eight distinct ways of being smart."],
    ["Aptitude", "Natural ability or potential to learn a particular skill, measured here across six categories."],
    ["Stream", "The subject combination chosen after Class 10 — Science, Commerce, Arts, etc."],
    ["Holland code", "Three-letter combination of your top RIASEC types, used to match careers."],
  ],
  closingDisclaimer: "This report is generated from your responses and is intended as guidance only. Career decisions should also consider personal circumstances, family input, and ongoing exploration. Revisit this report yearly.",

  footerName: (name) => `${name || "Student"} · HBK Careers Report`,
  pageOf: (page, total) => `Page ${page} of ${total}`,
  page: "Page",
  of: "of",
  topInterest: "Top interest type",
  topIntelligence: "Top intelligence",
  topAptitude: "Top aptitude",
  yourCode: "Your Holland code",
  scoreLegend: "Score (0-100)",
  appendix: "Appendix · Your Answers",
  appendixDesc: "A complete record of every question and the answer you gave.",
  monthLabel: "Month",
  weekLabel: "Week",
  habitsLabel: "Habits to build",
  resourcesLabel: "Resources",
  examsLabel: "Exams & deadlines",
  next90: "Next 90 days",
  notesTitle: "Notes & next conversation with parents",
  signatureLine: "Counsellor signature",
  execSummary: "Executive Summary",
  riasecTitle: "RIASEC Interest Profile",
  miTitle: "Multiple Intelligences",
  aptitude: "Aptitude Snapshot",
  streams: "Recommended Streams",
  careers: "Matching Career Roles",
  colleges: "Suggested Colleges",
  exams: "Entrance Exams to Target",
  skills: "Skill-Building Roadmap",
  actionPlan: "90-Day Personalised Action Plan",
};

export function getReportStrings(_language: ReportLang = "en"): ReportStrings {
  return en;
}
