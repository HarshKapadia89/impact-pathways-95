// Report strings — English only.
export type ReportLang = "en";

export interface ReportStrings {
  brand: string;
  reportTitle: string;
  subtitle: string;
  prepared: string;
  date: string;
  toc: string;
  tocItems: string[];
  // Section titles
  execSummary: string;
  riasec: string;
  mi: string;
  aptitude: string;
  streams: string;
  careers: string;
  colleges: string;
  exams: string;
  skills: string;
  actionPlan: string;
  // Misc
  topInterest: string;
  topIntelligence: string;
  topAptitude: string;
  yourCode: string;
  scoreLegend: string;
  page: string;
  of: string;
  appendix: string;
  appendixDesc: string;
  coverFooter: string;
  monthLabel: string;
  weekLabel: string;
  habitsLabel: string;
  resourcesLabel: string;
  examsLabel: string;
  next90: string;
  notesTitle: string;
  signatureLine: string;
}

const en: ReportStrings = {
  brand: "HBK Careers · The H B Kapadia New High School",
  reportTitle: "Career Discovery Report",
  subtitle: "Your personalised RIASEC + Multiple Intelligences + Aptitude profile",
  prepared: "Prepared for",
  date: "Date",
  toc: "What's inside this report",
  tocItems: [
    "1.  Executive Summary",
    "2.  RIASEC Interest Profile",
    "3.  Multiple Intelligences Map",
    "4.  Aptitude Snapshot",
    "5.  Recommended Streams (after Class 10)",
    "6.  Matching Career Roles",
    "7.  Suggested Colleges in Gujarat & India",
    "8.  Entrance Exams to Target",
    "9.  Skill-Building Roadmap",
    "10. 90-Day Personalised Action Plan",
  ],
  execSummary: "Executive Summary",
  riasec: "RIASEC Interest Profile",
  mi: "Multiple Intelligences",
  aptitude: "Aptitude Snapshot",
  streams: "Recommended Streams",
  careers: "Matching Career Roles",
  colleges: "Suggested Colleges",
  exams: "Entrance Exams to Target",
  skills: "Skill-Building Roadmap",
  actionPlan: "90-Day Personalised Action Plan",
  topInterest: "Top interest type",
  topIntelligence: "Top intelligence",
  topAptitude: "Top aptitude",
  yourCode: "Your Holland code",
  scoreLegend: "Score (0-100)",
  page: "Page",
  of: "of",
  appendix: "Appendix · Your Answers",
  appendixDesc: "A complete record of every question and the answer you gave, for your records and for parents/counsellors.",
  coverFooter: "hbkcareers.org",
  monthLabel: "Month",
  weekLabel: "Week",
  habitsLabel: "Habits to build",
  resourcesLabel: "Resources",
  examsLabel: "Exams & deadlines",
  next90: "Next 90 days",
  notesTitle: "Notes & next conversation with parents",
  signatureLine: "Counsellor signature",
};

export function getReportStrings(_language: ReportLang = "en"): ReportStrings {
  return en;
}
