// Trilingual report strings (English, Hindi, Gujarati).
// English is the authoritative source; hi/gu are AI-translated in REPORT_XLATE.
import { REPORT_XLATE } from "./psychometricReportXlate";

export type ReportLang = "en" | "hi" | "gu";

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

const EN: Record<string, string> = {
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
  langNameHi: "Hindi",
  langNameGu: "Gujarati",
  coverHeadline: "What's inside",
  coverBullets1: "RIASEC interests · Multiple Intelligences · Aptitude scores",
  coverBullets2: "Recommended streams · Careers · Colleges · Exams · 3-year action plan",
  coverFooter: "hbkcareers.org",
  toc: "What's inside this report",
  snapTopRiasec: "Top RIASEC types:",
  snapTopMi: "Top intelligences:",
  snapTopApt: "Top aptitudes:",
  snapTopStreams: "Recommended streams for you",
  snapBoth: "Both streams are strong fits — your primary is the best match based on the combined profile.",
  riasecIntro: "Your interests across the six Holland types. Higher bars indicate stronger pull toward that type of work environment.",
  riasecCodeText: "Your Holland code is the combination of your top three interest types. Most careers can be mapped to a 3-letter Holland code, and the closest matches to yours tend to feel most engaging and sustainable over the long term.",
  miIntro: "Howard Gardner's eight intelligences — different ways of being smart. Most people are stronger in two or three of these.",
  streamsIntro: "Based on your interests and aptitudes, the following streams are the best fit for you after Class 10. The primary recommendation is your strongest match.",
  primary: "Primary",
  secondary: "Secondary",
  topPaths: "Top career paths in this stream:",
  collegesIntro: "A curated list of colleges in Gujarat and India offering programmes aligned with your recommended streams.",
  closingDisclaimer: "This report is generated from your responses and is intended as guidance only. Career decisions should also consider personal circumstances, family input, and ongoing exploration. Revisit this report yearly.",
  page: "Page", of: "of",
  topInterest: "Top interest type", topIntelligence: "Top intelligence",
  topAptitude: "Top aptitude", yourCode: "Your Holland code",
  scoreLegend: "Score (0-100)", appendix: "Appendix · Your Answers",
  appendixDesc: "A complete record of every question and the answer you gave.",
  monthLabel: "Month", weekLabel: "Week", habitsLabel: "Habits to build",
  resourcesLabel: "Resources", examsLabel: "Exams & deadlines",
  next90: "Next 90 days", notesTitle: "Notes & next conversation with parents",
  signatureLine: "Counsellor signature", execSummary: "Executive Summary",
  riasecTitle: "RIASEC Interest Profile", miTitle: "Multiple Intelligences",
  aptitude: "Aptitude Snapshot", streams: "Recommended Streams",
  careers: "Matching Career Roles", colleges: "Suggested Colleges",
  exams: "Entrance Exams to Target", skills: "Skill-Building Roadmap",
  actionPlan: "90-Day Personalised Action Plan",
  sec1: "1.  About this Report", sec2: "2.  Your Snapshot",
  sec3: "3.  RIASEC Interest Profile", sec4: "4.  RIASEC Detailed Insights",
  sec5: "5.  Multiple Intelligences Map", sec6: "6.  Multiple Intelligences — Your Top Areas",
  sec7: "7.  Aptitude Snapshot", sec8: "8.  Aptitude — Detailed Insights",
  sec9: "9.  Recommended Streams (after Class 10)", sec10: "10. Stream Deep Dive — Primary",
  sec11: "11. Stream Deep Dive — Secondary", sec12: "12. Matching Career Roles",
  sec13: "13. Entrance Exams to Target", sec14: "14. Suggested Colleges in Gujarat & India",
  sec15: "15. Skill-Building Roadmap", sec16: "16. Action Plan — This Year",
  sec17: "17. Action Plan — Next 3 Years", sec18: "18. Tips for Parents",
  sec19: "19. Glossary & Notes",
  R_name: "Realistic", R_desc: "Hands-on, practical, mechanical, outdoors. Enjoys working with tools, machines, plants, animals, or building things.",
  I_name: "Investigative", I_desc: "Analytical, scientific, curious. Enjoys research, problem-solving, mathematics, and understanding how things work.",
  A_name: "Artistic", A_desc: "Creative, expressive, original. Enjoys design, writing, music, performance, and unstructured creative work.",
  S_name: "Social", S_desc: "Helping, teaching, caring, communicating. Enjoys working with people, mentoring, healthcare, counselling.",
  E_name: "Enterprising", E_desc: "Persuading, leading, selling, organising. Enjoys business, entrepreneurship, leadership, and influencing others.",
  C_name: "Conventional", C_desc: "Organised, detail-oriented, methodical. Enjoys data, records, systems, accounting, and structured environments.",
  mi_linguistic_name: "Linguistic", mi_linguistic_desc: "Skill with words — reading, writing, speaking, languages.",
  mi_logical_name: "Logical-Mathematical", mi_logical_desc: "Reasoning, numbers, patterns, science, logic.",
  mi_spatial_name: "Spatial", mi_spatial_desc: "Visualising, design, maps, art, architecture, 3D thinking.",
  mi_musical_name: "Musical", mi_musical_desc: "Rhythm, pitch, sound, composition, performance.",
  mi_bodily_name: "Bodily-Kinesthetic", mi_bodily_desc: "Physical coordination, sport, dance, hands-on craft, surgery.",
  mi_interpersonal_name: "Interpersonal", mi_interpersonal_desc: "Understanding others, leadership, teamwork, empathy.",
  mi_intrapersonal_name: "Intrapersonal", mi_intrapersonal_desc: "Self-awareness, reflection, independent goal-setting.",
  mi_naturalist_name: "Naturalist", mi_naturalist_desc: "Nature, plants, animals, environment, classification.",
  apt_numerical_name: "Numerical", apt_numerical_desc: "Working with numbers, arithmetic, percentages, ratios, data interpretation. Important for engineering, finance, science, and data careers.",
  apt_verbal_name: "Verbal", apt_verbal_desc: "Reading comprehension, vocabulary, grammar, reasoning with language. Important for law, journalism, teaching, management, and communication roles.",
  apt_logical_name: "Logical", apt_logical_desc: "Pattern recognition, deductive reasoning, sequencing. Important for programming, research, strategy, and problem-solving careers.",
  apt_spatial_name: "Spatial", apt_spatial_desc: "Visualising shapes and rotations, mental imagery. Important for architecture, design, engineering, surgery, and the arts.",
  apt_mechanical_name: "Mechanical", apt_mechanical_desc: "Understanding how machines and physical systems work — forces, levers, gears. Important for engineering, trades, and applied science.",
  apt_abstract_name: "Abstract", apt_abstract_desc: "Reasoning about patterns and concepts without language or numbers. Important for science, research, and creative problem-solving.",
  about_1: "This report combines three internationally validated frameworks — Holland's RIASEC interest types, Gardner's Multiple Intelligences, and a school-grade aptitude battery — to give you a clear, personalised picture of where your strengths and interests lie.",
  about_2: "Use it as a conversation starter with your parents, teachers, and counsellor. It is not a verdict — it is a map. The next step is exploring the recommended streams, careers, and exams in detail and trying small experiments (clubs, internships, online courses) to validate what fits you best.",
  skills_1: "Strong reading habit — at least one non-fiction book per month.",
  skills_2: "Daily problem-solving practice (math/logic puzzles, 20 minutes).",
  skills_3: "Public speaking — debate club, MUN, or weekly classroom presentations.",
  skills_4: "Basic computer literacy — typing, spreadsheets, internet research.",
  skills_5: "One creative outlet — music, sketching, writing, photography, or coding side-projects.",
  skills_6: "Sports or physical activity at least 3x per week.",
  skills_7: "Volunteer / community service — builds empathy and the Social RIASEC dimension.",
  skills_8: "Time-management & study planning — weekly review and goal-setting.",
  thisYear_1: "Discuss this report with parents and class teacher within 2 weeks.",
  thisYear_2: "Pick 2 careers from the matching list and shadow/interview a professional.",
  thisYear_3: "Try one online course (Coursera, edX, NPTEL, Khan Academy) related to your top stream.",
  thisYear_4: "Maintain a 'curiosity journal' — note what excites you each week.",
  thisYear_5: "Strengthen weak aptitude areas with 30 min daily practice.",
  threeYear_1: "Year 1: Choose stream after Class 10 confidently with the help of this report.",
  threeYear_2: "Year 2: Begin entrance exam coaching for top 2 target exams.",
  threeYear_3: "Year 3: Shortlist 10 colleges and prepare application strategy.",
  threeYear_4: "Throughout: Build portfolio (projects, certificates, competitions) for college applications.",
  parent_1: "This report is a guide, not a verdict — your child's interests will evolve.",
  parent_2: "Focus on the top recommended streams, but allow exploration of secondary options.",
  parent_3: "Encourage exposure: workshops, internships, talks with professionals.",
  parent_4: "Support skill-building consistently — habits matter more than intensity.",
  parent_5: "Avoid comparing with peers; every profile is unique.",
  parent_6: "Revisit this report annually as part of an open career conversation.",
  gl_riasec: "Holland's six interest types: Realistic, Investigative, Artistic, Social, Enterprising, Conventional.",
  gl_mi: "Multiple Intelligences — Howard Gardner's framework of eight distinct ways of being smart.",
  gl_apt: "Natural ability or potential to learn a particular skill, measured here across six categories.",
  gl_stream: "The subject combination chosen after Class 10 — Science, Commerce, Arts, etc.",
  gl_code: "Three-letter combination of your top RIASEC types, used to match careers.",
};

function tr(key: string, lang: ReportLang): string {
  const en = EN[key];
  if (lang === "en") return en ?? key;
  const x = REPORT_XLATE[key];
  if (!x) return en ?? key;
  return (lang === "hi" ? x.hi : x.gu) || en || key;
}

export function getReportStrings(language: ReportLang = "en"): ReportStrings {
  const T = (k: string) => tr(k, language);
  const SECTIONS = [
    T("sec1"), T("sec2"), T("sec3"), T("sec4"), T("sec5"), T("sec6"),
    T("sec7"), T("sec8"), T("sec9"), T("sec10"), T("sec11"), T("sec12"),
    T("sec13"), T("sec14"), T("sec15"), T("sec16"), T("sec17"), T("sec18"),
    T("sec19"),
  ];
  const PAGE_LABEL = T("page");
  const OF_LABEL = T("of");
  const genOn = language === "hi" ? "इस दिन तैयार:" : language === "gu" ? "તૈયાર કરવાની તારીખ:" : "Generated on";
  const meta = (grade: string, age: string, lang: string) =>
    language === "hi"
      ? `कक्षा ${grade}  ·  आयु ${age}  ·  भाषा: ${lang}`
      : language === "gu"
        ? `ધોરણ ${grade}  ·  ઉંમર ${age}  ·  ભાષા: ${lang}`
        : `Grade ${grade}  ·  Age ${age}  ·  Language: ${lang}`;

  return {
    brand: T("brand"),
    reportTitle: T("reportTitle"),
    subtitle: T("subtitle"),
    prepared: T("prepared"),
    date: T("date"),
    coverSubtitle: T("coverSubtitle"),
    schoolLine: T("schoolLine"),
    preparedFor: T("preparedFor"),
    studentFallback: T("studentFallback"),
    langNameEn: T("langNameEn"),
    langNameGu: T("langNameGu"),
    metaLine: meta,
    coverHeadline: T("coverHeadline"),
    coverBullets1: T("coverBullets1"),
    coverBullets2: T("coverBullets2"),
    coverFooter: T("coverFooter"),
    generatedOn: (d) => `${genOn} ${d}`,

    toc: T("toc"),
    tocItems: SECTIONS,
    sec1: SECTIONS[0], sec2: SECTIONS[1], sec3: SECTIONS[2], sec4: SECTIONS[3],
    sec5: SECTIONS[4], sec6: SECTIONS[5], sec7: SECTIONS[6], sec8: SECTIONS[7],
    sec9: SECTIONS[8], sec10: SECTIONS[9], sec11: SECTIONS[10], sec12: SECTIONS[11],
    sec13: SECTIONS[12], sec14: SECTIONS[13], sec15: SECTIONS[14], sec16: SECTIONS[15],
    sec17: SECTIONS[16], sec18: SECTIONS[17], sec19: SECTIONS[18],

    about: [T("about_1"), "", T("about_2")],

    snapTopRiasec: T("snapTopRiasec"),
    snapTopMi: T("snapTopMi"),
    snapTopApt: T("snapTopApt"),
    snapTopStreams: T("snapTopStreams"),
    snapBoth: T("snapBoth"),
    snapAptOverall: (pct) =>
      language === "hi" ? `(कुल ${pct}%)` : language === "gu" ? `(કુલ ${pct}%)` : `(overall ${pct}%)`,

    riasecIntro: T("riasecIntro"),
    riasec: {
      R: { name: T("R_name"), description: T("R_desc") },
      I: { name: T("I_name"), description: T("I_desc") },
      A: { name: T("A_name"), description: T("A_desc") },
      S: { name: T("S_name"), description: T("S_desc") },
      E: { name: T("E_name"), description: T("E_desc") },
      C: { name: T("C_name"), description: T("C_desc") },
    },
    riasecYourCode: (code) =>
      language === "hi" ? `आपका हॉलैंड कोड: ${code}` : language === "gu" ? `તમારો હોલેન્ડ કોડ: ${code}` : `Your Holland code: ${code}`,
    riasecCodeText: T("riasecCodeText"),

    miIntro: T("miIntro"),
    mi: {
      linguistic: { name: T("mi_linguistic_name"), description: T("mi_linguistic_desc") },
      logical: { name: T("mi_logical_name"), description: T("mi_logical_desc") },
      spatial: { name: T("mi_spatial_name"), description: T("mi_spatial_desc") },
      musical: { name: T("mi_musical_name"), description: T("mi_musical_desc") },
      bodily: { name: T("mi_bodily_name"), description: T("mi_bodily_desc") },
      interpersonal: { name: T("mi_interpersonal_name"), description: T("mi_interpersonal_desc") },
      intrapersonal: { name: T("mi_intrapersonal_name"), description: T("mi_intrapersonal_desc") },
      naturalist: { name: T("mi_naturalist_name"), description: T("mi_naturalist_desc") },
    },

    aptOverall: (pct) =>
      language === "hi"
        ? `आपका कुल एप्टिट्यूड स्कोर: ${pct}%। नीचे श्रेणीवार विवरण है।`
        : language === "gu"
          ? `તમારો કુલ એપ્ટિટ્યુડ સ્કોર: ${pct}%. નીચે વર્ગવાર વિગત છે.`
          : `Your overall aptitude score: ${pct}%. Below is the breakdown by category.`,
    aptCategoryName: (cat) => {
      const map: Record<string, string> = {
        numerical: T("apt_numerical_name"),
        verbal: T("apt_verbal_name"),
        logical: T("apt_logical_name"),
        spatial: T("apt_spatial_name"),
        mechanical: T("apt_mechanical_name"),
        abstract: T("apt_abstract_name"),
      };
      return map[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
    },
    aptDescriptions: {
      numerical: T("apt_numerical_desc"),
      verbal: T("apt_verbal_desc"),
      logical: T("apt_logical_desc"),
      spatial: T("apt_spatial_desc"),
      mechanical: T("apt_mechanical_desc"),
      abstract: T("apt_abstract_desc"),
    },

    streamsIntro: T("streamsIntro"),
    primary: T("primary"),
    secondary: T("secondary"),
    coreSubjects: (s) =>
      language === "hi" ? `मुख्य विषय: ${s}` : language === "gu" ? `મુખ્ય વિષયો: ${s}` : `Core subjects: ${s}`,

    topPaths: T("topPaths"),
    pathStream: (s) => (language === "hi" ? `स्ट्रीम: ${s}` : language === "gu" ? `સ્ટ્રીમ: ${s}` : `Stream: ${s}`),
    pathSalary: (s) =>
      language === "hi" ? `औसत शुरुआती वेतन: ${s}` : language === "gu" ? `સરેરાશ પ્રારંભિક પગાર: ${s}` : `Avg starting salary: ${s}`,
    pathExams: (s) =>
      language === "hi" ? `प्रवेश परीक्षाएँ: ${s}` : language === "gu" ? `પ્રવેશ પરીક્ષાઓ: ${s}` : `Entrance exams: ${s}`,

    examsIntro: (n) =>
      language === "hi"
        ? `आपके अनुशंसित स्ट्रीम में, ये ${n} प्रवेश परीक्षाएँ सबसे प्रासंगिक हैं। जल्दी तैयारी शुरू करें — अधिकांश के लिए 1–2 वर्ष का केंद्रित प्रयास ज़रूरी है।`
        : language === "gu"
          ? `તમારા ભલામણ કરેલા સ્ટ્રીમમાં, નીચેની ${n} પ્રવેશ પરીક્ષાઓ સૌથી સંબંધિત છે. વહેલી તૈયારી શરૂ કરો — મોટા ભાગની માટે 1–2 વર્ષની કેન્દ્રિત મહેનત જરૂરી છે.`
          : `Across your recommended streams, the following ${n} entrance exams are most relevant. Start preparing early — most need 1–2 years of focused effort.`,
    collegesIntro: T("collegesIntro"),

    skillsList: [
      T("skills_1"), T("skills_2"), T("skills_3"), T("skills_4"),
      T("skills_5"), T("skills_6"), T("skills_7"), T("skills_8"),
    ],
    thisYearList: [T("thisYear_1"), T("thisYear_2"), T("thisYear_3"), T("thisYear_4"), T("thisYear_5")],
    threeYearList: [T("threeYear_1"), T("threeYear_2"), T("threeYear_3"), T("threeYear_4")],
    parentTips: [T("parent_1"), T("parent_2"), T("parent_3"), T("parent_4"), T("parent_5"), T("parent_6")],

    glossaryItems: [
      ["RIASEC", T("gl_riasec")],
      ["MI", T("gl_mi")],
      [language === "hi" ? "एप्टिट्यूड" : language === "gu" ? "એપ્ટિટ્યુડ" : "Aptitude", T("gl_apt")],
      [language === "hi" ? "स्ट्रीम" : language === "gu" ? "સ્ટ્રીમ" : "Stream", T("gl_stream")],
      [language === "hi" ? "हॉलैंड कोड" : language === "gu" ? "હોલેન્ડ કોડ" : "Holland code", T("gl_code")],
    ],
    closingDisclaimer: T("closingDisclaimer"),

    footerName: (name) => `${name || (language === "hi" ? "छात्र" : language === "gu" ? "વિદ્યાર્થી" : "Student")} · HBK Careers Report`,
    pageOf: (page, total) => `${PAGE_LABEL} ${page} ${OF_LABEL} ${total}`,
    page: PAGE_LABEL,
    of: OF_LABEL,
    topInterest: T("topInterest"),
    topIntelligence: T("topIntelligence"),
    topAptitude: T("topAptitude"),
    yourCode: T("yourCode"),
    scoreLegend: T("scoreLegend"),
    appendix: T("appendix"),
    appendixDesc: T("appendixDesc"),
    monthLabel: T("monthLabel"),
    weekLabel: T("weekLabel"),
    habitsLabel: T("habitsLabel"),
    resourcesLabel: T("resourcesLabel"),
    examsLabel: T("examsLabel"),
    next90: T("next90"),
    notesTitle: T("notesTitle"),
    signatureLine: T("signatureLine"),
    execSummary: T("execSummary"),
    riasecTitle: T("riasecTitle"),
    miTitle: T("miTitle"),
    aptitude: T("aptitude"),
    streams: T("streams"),
    careers: T("careers"),
    colleges: T("colleges"),
    exams: T("exams"),
    skills: T("skills"),
    actionPlan: T("actionPlan"),
  };
}
