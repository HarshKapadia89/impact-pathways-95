// Profession directory engine.
// Builds a full, section-by-section profile for every profession listed in the
// India handbook (src/lib/handbook/*.json).
//
// Consistency rules (important):
//  - Entrance exams come ONLY from the stream's own exam list (same records the
//    /handbook and /exams pages show), so codes, purposes and websites match.
//  - Indian institutes come ONLY from the stream's own institute list, so names,
//    ranks and websites match everywhere on the site.
//  - Education ladders mirror the stream/path structures already published on
//    /career and in the psychometric report.
//  - Profession-specific prose lives in per-stream overlay files and is written
//    in-house from public regulator information.

import type { HandbookStream, HandbookExam, HandbookInstitute } from "./handbookData";
import { slugify } from "./handbookData";

export type ProfessionOverlay = {
  /** One-paragraph plain-language summary of what this professional does. */
  summary?: string;
  /** Day-to-day work description bullets. */
  duties?: string[];
  /** Sectors / employer types that hire this role. */
  sectors?: string[];
  /** Core skills and competencies. */
  skills?: string[];
  /** Typical entry qualification, when it differs from the stream default. */
  entry?: string;
  /** Graduation-level programmes, when they differ from the stream default. */
  ug?: string[];
  /** Post-graduation programmes, when they differ from the stream default. */
  pg?: string[];
  /** Exam codes (from the stream's exam list) most relevant to this role. */
  examCodes?: string[];
  /** Substrings used to surface the most relevant institutes for this role. */
  instituteHints?: string[];
  pros?: string[];
  cons?: string[];
  facts?: string[];
};

export type EducationRow = {
  stage: string;
  options: string;
  duration: string;
};

export type AbroadInstitute = { name: string; country: string; website: string };

export type ProfessionProfile = {
  name: string;
  slug: string;
  streamName: string;
  streamSlug: string;
  summary: string;
  sectors: string[];
  skills: string[];
  duties: string[];
  path: EducationRow[];
  facts: string[];
  institutes: HandbookInstitute[];
  abroad: AbroadInstitute[];
  exams: HandbookExam[];
  pros: string[];
  cons: string[];
};

/* ------------------------------------------------------------------ */
/* Stream-level education ladders — mirror /career and the handbook.    */
/* ------------------------------------------------------------------ */

type Ladder = { after10: string; ug: string; ugYears: string; pg: string; pgYears: string; doc?: string };

const DEFAULT_LADDER: Ladder = {
  after10: "Any stream in Class 11–12 (subject requirements vary by programme)",
  ug: "Bachelor's degree in the relevant subject",
  ugYears: "3–4 years",
  pg: "Master's degree / PG diploma in a specialisation",
  pgYears: "2 years",
  doc: "M.Phil. / Ph.D. for research and teaching roles",
};

export const STREAM_LADDERS: Record<string, Ladder> = {
  "engineering-and-technology": {
    after10: "Science with Physics, Chemistry and Mathematics (PCM)",
    ug: "B.E. / B.Tech in the chosen branch (or 3-year diploma + lateral entry)",
    ugYears: "4 years",
    pg: "M.E. / M.Tech, MS abroad, or MBA for management tracks",
    pgYears: "2 years",
    doc: "Ph.D. for R&D, ISRO/DRDO labs and academia",
  },
  "medicine-and-surgery": {
    after10: "Science with Physics, Chemistry and Biology (PCB)",
    ug: "MBBS / BDS / BAMS / BHMS as applicable",
    ugYears: "4.5–5.5 years + internship",
    pg: "MD / MS / MDS / DNB in a clinical specialisation",
    pgYears: "3 years",
    doc: "DM / M.Ch. super-speciality",
  },
  "paramedical-sciences": {
    after10: "Science with Physics, Chemistry and Biology (PCB)",
    ug: "B.Sc. in the allied-health specialisation (nursing, MLT, radiology, optometry…)",
    ugYears: "3–4 years",
    pg: "M.Sc. in the specialisation",
    pgYears: "2 years",
  },
  "pure-sciences": {
    after10: "Science (PCM or PCB depending on the subject)",
    ug: "B.Sc. (Hons.) or integrated B.S.–M.S.",
    ugYears: "3–5 years",
    pg: "M.Sc. in the specialisation",
    pgYears: "2 years",
    doc: "Ph.D. — the standard route into research and college teaching",
  },
  "computer-applications-and-sciences": {
    after10: "Science or Commerce with Mathematics",
    ug: "BCA / B.Sc. (CS or IT) / B.Tech CSE",
    ugYears: "3–4 years",
    pg: "MCA / M.Sc. (CS) / M.Tech",
    pgYears: "2 years",
  },
  "commerce-and-finance": {
    after10: "Commerce (Accounts, Business Studies, Economics, Maths recommended)",
    ug: "B.Com. (Hons.) / BBA, alongside CA, CS or CMA foundation",
    ugYears: "3 years",
    pg: "M.Com. / MBA (Finance) / completion of CA, CS or CMA",
    pgYears: "2 years",
  },
  "business-management": {
    after10: "Any stream; Maths and Economics help in analytics roles",
    ug: "BBA / BMS / integrated BBA-MBA",
    ugYears: "3 years",
    pg: "MBA / PGDM in a functional specialisation",
    pgYears: "2 years",
  },
  economics: {
    after10: "Any stream with Mathematics",
    ug: "B.A. / B.Sc. (Hons.) Economics",
    ugYears: "3 years",
    pg: "M.A. / M.Sc. Economics, or an integrated 5-year programme",
    pgYears: "2 years",
    doc: "Ph.D. for policy research, RBI/NITI and academia",
  },
  law: {
    after10: "Any stream",
    ug: "5-year integrated B.A. LL.B. after Class 12, or 3-year LL.B. after graduation",
    ugYears: "3–5 years",
    pg: "LL.M. in a specialisation",
    pgYears: "1–2 years",
  },
  "architecture-and-planning": {
    after10: "Science with Mathematics (PCM), or any stream with Maths as per COA norms",
    ug: "B.Arch. / B.Planning",
    ugYears: "5 years / 4 years",
    pg: "M.Arch. / M.Plan. in a specialisation",
    pgYears: "2 years",
  },
  "design-and-fine-arts": {
    after10: "Any stream",
    ug: "B.Des. / BFA / B.Sc. in the design discipline",
    ugYears: "4 years",
    pg: "M.Des. / MFA",
    pgYears: "2 years",
  },
  "mass-communication-mass-media": {
    after10: "Any stream",
    ug: "BAJMC / BMM / B.A. (Journalism)",
    ugYears: "3 years",
    pg: "MAJMC / M.A. (Mass Communication)",
    pgYears: "2 years",
  },
  "arts-humanities-and-social-sciences": {
    after10: "Arts / Humanities (any stream is accepted for most programmes)",
    ug: "B.A. (Hons.) in the chosen subject",
    ugYears: "3 years",
    pg: "M.A. in the specialisation",
    pgYears: "2 years",
    doc: "Ph.D. / NET for teaching and research",
  },
  "liberal-studies": {
    after10: "Any stream",
    ug: "B.A. / B.Sc. (Hons.) Liberal Arts with a major and minor",
    ugYears: "3–4 years",
    pg: "Master's in the chosen major",
    pgYears: "2 years",
  },
  "hotel-hospitality-and-tourism-management": {
    after10: "Any stream",
    ug: "B.Sc. Hospitality & Hotel Administration / BHM / BTTM",
    ugYears: "3–4 years",
    pg: "M.Sc. Hospitality Administration / MBA (Hospitality or Tourism)",
    pgYears: "2 years",
  },
  "agriculture-and-allied-sciences": {
    after10: "Science with Biology or Mathematics (PCB / PCM)",
    ug: "B.Sc. (Hons.) Agriculture, Horticulture, Food Technology or allied",
    ugYears: "4 years",
    pg: "M.Sc. (Ag.) in the specialisation",
    pgYears: "2 years",
    doc: "Ph.D. for ICAR scientist roles (ARS exam)",
  },
  "veterinary-and-fishery-sciences": {
    after10: "Science with Physics, Chemistry and Biology (PCB)",
    ug: "B.V.Sc. & A.H. / B.F.Sc.",
    ugYears: "5.5 years / 4 years",
    pg: "M.V.Sc. / M.F.Sc.",
    pgYears: "2 years",
  },
  "performing-arts": {
    after10: "Any stream; sustained practice and training in the art form",
    ug: "B.P.A. / B.A. (Music, Dance, Theatre)",
    ugYears: "3–4 years",
    pg: "M.P.A. / M.A. in the art form",
    pgYears: "2 years",
  },
  "rehabilitation-sciences": {
    after10: "Science with Biology (PCB); some programmes accept any stream",
    ug: "B.A.S.L.P. / B.Ed. Special Education / B.Sc. in the rehabilitation discipline",
    ugYears: "3–4 years",
    pg: "M.A.S.L.P. / M.Ed. Special Education / M.Sc.",
    pgYears: "2 years",
  },
  "sports-physical-education": {
    after10: "Any stream, with demonstrated sporting ability",
    ug: "B.P.Ed. / B.Sc. Sports Science",
    ugYears: "3–4 years",
    pg: "M.P.Ed. / M.Sc. Sports Science",
    pgYears: "2 years",
  },
};

/* ------------------------------------------------------------------ */
/* Institutions abroad — respected global programmes per stream.        */
/* ------------------------------------------------------------------ */

const GLOBAL_FALLBACK: AbroadInstitute[] = [
  { name: "University of Oxford", country: "United Kingdom", website: "https://www.ox.ac.uk/" },
  { name: "University of Cambridge", country: "United Kingdom", website: "https://www.cam.ac.uk/" },
  { name: "Harvard University", country: "United States", website: "https://www.harvard.edu/" },
  { name: "University of Toronto", country: "Canada", website: "https://www.utoronto.ca/" },
  { name: "University of Melbourne", country: "Australia", website: "https://www.unimelb.edu.au/" },
  { name: "National University of Singapore", country: "Singapore", website: "https://www.nus.edu.sg/" },
];

export const ABROAD_BY_STREAM: Record<string, AbroadInstitute[]> = {
  "engineering-and-technology": [
    { name: "Massachusetts Institute of Technology (MIT)", country: "United States", website: "https://www.mit.edu/" },
    { name: "Stanford University", country: "United States", website: "https://www.stanford.edu/" },
    { name: "University of California, Berkeley", country: "United States", website: "https://www.berkeley.edu/" },
    { name: "ETH Zurich", country: "Switzerland", website: "https://ethz.ch/en.html" },
    { name: "Imperial College London", country: "United Kingdom", website: "https://www.imperial.ac.uk/" },
    { name: "Nanyang Technological University", country: "Singapore", website: "https://www.ntu.edu.sg/" },
    { name: "Technical University of Munich", country: "Germany", website: "https://www.tum.de/en/" },
    { name: "University of Toronto", country: "Canada", website: "https://www.utoronto.ca/" },
  ],
  "computer-applications-and-sciences": [
    { name: "Carnegie Mellon University", country: "United States", website: "https://www.cmu.edu/" },
    { name: "Massachusetts Institute of Technology (MIT)", country: "United States", website: "https://www.mit.edu/" },
    { name: "University of California, Berkeley", country: "United States", website: "https://www.berkeley.edu/" },
    { name: "ETH Zurich", country: "Switzerland", website: "https://ethz.ch/en.html" },
    { name: "University of Waterloo", country: "Canada", website: "https://uwaterloo.ca/" },
    { name: "National University of Singapore", country: "Singapore", website: "https://www.nus.edu.sg/" },
  ],
  "medicine-and-surgery": [
    { name: "Harvard Medical School", country: "United States", website: "https://hms.harvard.edu/" },
    { name: "University of Oxford", country: "United Kingdom", website: "https://www.ox.ac.uk/" },
    { name: "Karolinska Institutet", country: "Sweden", website: "https://ki.se/en" },
    { name: "Johns Hopkins University", country: "United States", website: "https://www.jhu.edu/" },
    { name: "University of Melbourne", country: "Australia", website: "https://www.unimelb.edu.au/" },
  ],
  "business-management": [
    { name: "Harvard Business School", country: "United States", website: "https://www.hbs.edu/" },
    { name: "London Business School", country: "United Kingdom", website: "https://www.london.edu/" },
    { name: "INSEAD", country: "France / Singapore", website: "https://www.insead.edu/" },
    { name: "Wharton School, University of Pennsylvania", country: "United States", website: "https://www.wharton.upenn.edu/" },
    { name: "IESE Business School", country: "Spain", website: "https://www.iese.edu/" },
  ],
  "commerce-and-finance": [
    { name: "London School of Economics (LSE)", country: "United Kingdom", website: "https://www.lse.ac.uk/" },
    { name: "Bocconi University", country: "Italy", website: "https://www.unibocconi.eu/" },
    { name: "University of Warwick", country: "United Kingdom", website: "https://warwick.ac.uk/" },
    { name: "New York University (Stern)", country: "United States", website: "https://www.stern.nyu.edu/" },
  ],
  economics: [
    { name: "London School of Economics (LSE)", country: "United Kingdom", website: "https://www.lse.ac.uk/" },
    { name: "University of Chicago", country: "United States", website: "https://www.uchicago.edu/" },
    { name: "Paris School of Economics", country: "France", website: "https://www.parisschoolofeconomics.eu/en/" },
    { name: "University of Cambridge", country: "United Kingdom", website: "https://www.cam.ac.uk/" },
  ],
  law: [
    { name: "Harvard Law School", country: "United States", website: "https://hls.harvard.edu/" },
    { name: "University of Oxford — Faculty of Law", country: "United Kingdom", website: "https://www.law.ox.ac.uk/" },
    { name: "Yale Law School", country: "United States", website: "https://law.yale.edu/" },
    { name: "National University of Singapore — Faculty of Law", country: "Singapore", website: "https://law.nus.edu.sg/" },
  ],
  "architecture-and-planning": [
    { name: "Massachusetts Institute of Technology (MIT)", country: "United States", website: "https://www.mit.edu/" },
    { name: "Delft University of Technology", country: "Netherlands", website: "https://www.tudelft.nl/en/" },
    { name: "The Bartlett, University College London", country: "United Kingdom", website: "https://www.ucl.ac.uk/bartlett/" },
    { name: "ETH Zurich", country: "Switzerland", website: "https://ethz.ch/en.html" },
  ],
  "design-and-fine-arts": [
    { name: "Royal College of Art", country: "United Kingdom", website: "https://www.rca.ac.uk/" },
    { name: "Parsons School of Design", country: "United States", website: "https://www.newschool.edu/parsons/" },
    { name: "Rhode Island School of Design", country: "United States", website: "https://www.risd.edu/" },
    { name: "Politecnico di Milano — Design", country: "Italy", website: "https://www.polimi.it/en" },
  ],
  "mass-communication-mass-media": [
    { name: "Columbia Journalism School", country: "United States", website: "https://journalism.columbia.edu/" },
    { name: "London School of Economics — Media & Communications", country: "United Kingdom", website: "https://www.lse.ac.uk/" },
    { name: "University of Southern California (Annenberg)", country: "United States", website: "https://annenberg.usc.edu/" },
    { name: "University of Amsterdam", country: "Netherlands", website: "https://www.uva.nl/en" },
  ],
  "hotel-hospitality-and-tourism-management": [
    { name: "École hôtelière de Lausanne (EHL)", country: "Switzerland", website: "https://www.ehl.edu/" },
    { name: "Les Roches", country: "Switzerland", website: "https://lesroches.edu/" },
    { name: "Cornell University — Nolan School of Hotel Administration", country: "United States", website: "https://sha.cornell.edu/" },
    { name: "Glion Institute of Higher Education", country: "Switzerland", website: "https://www.glion.edu/" },
  ],
  "agriculture-and-allied-sciences": [
    { name: "Wageningen University & Research", country: "Netherlands", website: "https://www.wur.nl/en.htm" },
    { name: "University of California, Davis", country: "United States", website: "https://www.ucdavis.edu/" },
    { name: "Cornell University — CALS", country: "United States", website: "https://cals.cornell.edu/" },
    { name: "University of Queensland", country: "Australia", website: "https://www.uq.edu.au/" },
  ],
  "veterinary-and-fishery-sciences": [
    { name: "Royal Veterinary College", country: "United Kingdom", website: "https://www.rvc.ac.uk/" },
    { name: "University of California, Davis — Veterinary Medicine", country: "United States", website: "https://www.vetmed.ucdavis.edu/" },
    { name: "Utrecht University", country: "Netherlands", website: "https://www.uu.nl/en" },
  ],
  "pure-sciences": [
    { name: "California Institute of Technology (Caltech)", country: "United States", website: "https://www.caltech.edu/" },
    { name: "University of Cambridge", country: "United Kingdom", website: "https://www.cam.ac.uk/" },
    { name: "Max Planck Institutes", country: "Germany", website: "https://www.mpg.de/en" },
    { name: "ETH Zurich", country: "Switzerland", website: "https://ethz.ch/en.html" },
  ],
  "paramedical-sciences": [
    { name: "Johns Hopkins University", country: "United States", website: "https://www.jhu.edu/" },
    { name: "King's College London", country: "United Kingdom", website: "https://www.kcl.ac.uk/" },
    { name: "University of Sydney", country: "Australia", website: "https://www.sydney.edu.au/" },
  ],
  "rehabilitation-sciences": [
    { name: "University College London", country: "United Kingdom", website: "https://www.ucl.ac.uk/" },
    { name: "University of Toronto", country: "Canada", website: "https://www.utoronto.ca/" },
    { name: "University of Queensland", country: "Australia", website: "https://www.uq.edu.au/" },
  ],
  "sports-physical-education": [
    { name: "Loughborough University", country: "United Kingdom", website: "https://www.lboro.ac.uk/" },
    { name: "German Sport University Cologne", country: "Germany", website: "https://www.dshs-koeln.de/en/" },
    { name: "University of Queensland", country: "Australia", website: "https://www.uq.edu.au/" },
  ],
  "performing-arts": [
    { name: "Juilliard School", country: "United States", website: "https://www.juilliard.edu/" },
    { name: "Royal Academy of Music", country: "United Kingdom", website: "https://www.ram.ac.uk/" },
    { name: "Berklee College of Music", country: "United States", website: "https://www.berklee.edu/" },
  ],
  "liberal-studies": [
    { name: "Yale University", country: "United States", website: "https://www.yale.edu/" },
    { name: "Amherst College", country: "United States", website: "https://www.amherst.edu/" },
    { name: "University College Utrecht", country: "Netherlands", website: "https://www.uu.nl/en/organisation/university-college-utrecht" },
  ],
  "arts-humanities-and-social-sciences": [
    { name: "University of Oxford", country: "United Kingdom", website: "https://www.ox.ac.uk/" },
    { name: "Sciences Po", country: "France", website: "https://www.sciencespo.fr/en/" },
    { name: "University of Chicago", country: "United States", website: "https://www.uchicago.edu/" },
  ],
};

/* ------------------------------------------------------------------ */
/* Archetypes — used when a profession has no authored overlay yet.     */
/* ------------------------------------------------------------------ */

type Archetype = {
  test: RegExp;
  duties: string[];
  sectors: string[];
  skills: string[];
  pros: string[];
  cons: string[];
};

const ARCHETYPES: Archetype[] = [
  {
    test: /engineer|technolog/i,
    duties: [
      "Study the requirement or problem brief and translate it into a technical specification.",
      "Design, model and test solutions using standard engineering tools and codes of practice.",
      "Run trials, measure results and refine the design until it meets safety and quality norms.",
      "Coordinate with production, site or client teams while the solution is built and installed.",
      "Document drawings, test data and compliance records for audits and future maintenance.",
    ],
    sectors: ["Public sector undertakings and government departments", "Private manufacturing and infrastructure firms", "Consulting and design practices", "R&D labs and technology start-ups"],
    skills: ["Applied mathematics and physics", "Design and simulation software", "Problem decomposition and testing discipline", "Teamwork with technicians and site staff"],
    pros: ["Strong demand across public and private employers", "Clear technical growth ladder and global mobility", "Work is measurable and skill-based"],
    cons: ["Deadline and site pressure is common", "Continuous upskilling is unavoidable as tools change", "Entry pay varies widely by college and branch"],
  },
  {
    test: /technician|operator|mechanic/i,
    duties: [
      "Inspect, service and repair equipment following approved procedures and checklists.",
      "Diagnose faults using test instruments and manufacturer manuals.",
      "Replace or recondition parts and record every intervention in the log.",
      "Follow safety, calibration and quality standards without exception.",
      "Support engineers during installation, commissioning and audits.",
    ],
    sectors: ["Maintenance and service organisations", "Manufacturing plants", "Transport and aviation operators", "Equipment vendors and dealerships"],
    skills: ["Hands-on mechanical or electrical aptitude", "Careful fault-finding", "Safety discipline", "Accurate record keeping"],
    pros: ["Skill-based entry with diploma or ITI routes", "Practical work with visible results", "Certification adds pay quickly"],
    cons: ["Shift work and physical demands", "Strict safety and compliance responsibility", "Growth needs added qualifications"],
  },
  {
    test: /scientist|ologist|physicist|astronaut|research/i,
    duties: [
      "Frame research questions and design experiments or field studies.",
      "Collect, clean and analyse data using statistical and computational tools.",
      "Interpret results and publish findings in journals or technical reports.",
      "Present work at conferences and to funding bodies.",
      "Supervise students, lab staff and instrumentation.",
    ],
    sectors: ["National research laboratories and institutes", "Universities and colleges", "Government scientific departments", "Industry R&D divisions"],
    skills: ["Scientific reasoning and statistics", "Laboratory or field technique", "Scientific writing", "Patience with long timelines"],
    pros: ["Intellectually rewarding, frontier work", "Stable government scientist cadres", "International collaboration and fellowships"],
    cons: ["Long qualification path, usually up to Ph.D.", "Funding and publication pressure", "Fewer positions than applicants"],
  },
  {
    test: /manager|managment|management|administrator|executive|officer/i,
    duties: [
      "Plan targets, budgets and schedules for the team or unit.",
      "Allocate work, review progress and remove blockers.",
      "Report performance to leadership with data and recommendations.",
      "Manage vendors, clients and cross-functional stakeholders.",
      "Build team capability through hiring, training and reviews.",
    ],
    sectors: ["Corporates and MNCs", "Public sector and government bodies", "Start-ups and family businesses", "NGOs and institutions"],
    skills: ["Communication and negotiation", "Planning and prioritisation", "Numerical and analytical ability", "People leadership"],
    pros: ["Wide industry mobility", "Fast pay growth with performance", "Broad exposure to how organisations run"],
    cons: ["Accountability for results outside your direct control", "Long hours during crunch periods", "Requires constant stakeholder handling"],
  },
  {
    test: /teacher|professor|counsel|therapist|trainer|worker/i,
    duties: [
      "Assess the needs of each learner, client or patient.",
      "Plan and deliver sessions matched to those needs.",
      "Track progress and adjust the plan with evidence.",
      "Work with families, schools or institutions for support.",
      "Maintain confidential, accurate case records.",
    ],
    sectors: ["Schools, colleges and universities", "Hospitals and clinics", "NGOs and community organisations", "Private practice"],
    skills: ["Empathy and active listening", "Clear explanation", "Assessment and record keeping", "Ethical judgement"],
    pros: ["Direct, visible impact on people", "Respected, socially valued work", "Practice can be built independently"],
    cons: ["Emotionally demanding", "Pay in early years can be modest", "Licences and refresher training are mandatory"],
  },
  {
    test: /designer|artist|writer|director|photograph|editor|animator|musician|dancer|actor/i,
    duties: [
      "Understand the brief, audience and constraints before starting.",
      "Develop concepts, drafts or storyboards and take feedback.",
      "Produce the finished work to professional technical standards.",
      "Collaborate with clients, producers and technical crews.",
      "Maintain a portfolio and keep pace with tools and trends.",
    ],
    sectors: ["Studios, agencies and production houses", "Media and publishing organisations", "Brands and in-house creative teams", "Freelance and independent practice"],
    skills: ["Craft and technique in the medium", "Visual or narrative thinking", "Software and production tools", "Presenting and defending ideas"],
    pros: ["Creative freedom and portfolio-led growth", "Freelance and studio options both viable", "Skill outweighs pedigree over time"],
    cons: ["Income can be irregular early on", "Deadlines and client revisions", "Portfolio must stay current"],
  },
];

const GENERIC: Archetype = {
  test: /.*/,
  duties: [
    "Plan the day's work against targets set by the organisation or client.",
    "Apply the specialist knowledge of the field to the task at hand.",
    "Coordinate with colleagues, suppliers and users involved in the work.",
    "Maintain accurate records, reports and compliance documents.",
    "Keep skills current through training and professional updates.",
  ],
  sectors: ["Government departments and public bodies", "Private companies in the sector", "Consultancies and service providers", "Self-employment and freelance practice"],
  skills: ["Subject knowledge from the qualifying degree", "Communication and teamwork", "Attention to detail", "Willingness to keep learning"],
  pros: ["Recognised qualification pathway", "Options across public and private employers", "Specialisation raises pay over time"],
  cons: ["Entry can be competitive", "Continuing education is expected", "Early-career pay varies by employer"],
};

function archetypeFor(name: string): Archetype {
  return ARCHETYPES.find((a) => a.test.test(name)) ?? GENERIC;
}

/* ------------------------------------------------------------------ */
/* Profile builder                                                      */
/* ------------------------------------------------------------------ */

export function professionSlug(name: string): string {
  return slugify(name);
}

function pickExams(stream: HandbookStream, overlay?: ProfessionOverlay): HandbookExam[] {
  if (overlay?.examCodes?.length) {
    const wanted = new Set(overlay.examCodes);
    const hits = stream.exams.filter((e) => wanted.has(e.code));
    if (hits.length) return hits;
  }
  return stream.exams;
}

function pickInstitutes(stream: HandbookStream, overlay?: ProfessionOverlay): HandbookInstitute[] {
  const sorted = [...stream.institutes].sort((a, b) => a.rank - b.rank);
  if (overlay?.instituteHints?.length) {
    const hints = overlay.instituteHints.map((h) => h.toLowerCase());
    const hits = sorted.filter((i) => hints.some((h) => i.name.toLowerCase().includes(h)));
    if (hits.length >= 5) return hits.slice(0, 30);
  }
  return sorted.slice(0, 30);
}

export function buildProfessionProfile(
  stream: HandbookStream,
  streamSlug: string,
  professionName: string,
  overlay?: ProfessionOverlay,
): ProfessionProfile {
  const arch = archetypeFor(professionName);
  const ladder = STREAM_LADDERS[streamSlug] ?? DEFAULT_LADDER;

  const summary =
    overlay?.summary ??
    `A ${professionName} works within the ${stream.stream} field in India. The role applies the specialist training of this stream to real problems — in industry, in public service, in institutions or in independent practice. Students usually enter through the ${ladder.ug} route after Class 12, then specialise through work experience or a master's degree. This page brings together the study route, the entrance exams, the leading institutes and the day-to-day reality of the job, using the same exam and institute records published elsewhere on HBK Careers.`;

  const path: EducationRow[] = [
    { stage: "After Class 10", options: ladder.after10, duration: "2 years (Class 11–12)" },
    { stage: "Graduation", options: overlay?.ug?.join(" · ") ?? ladder.ug, duration: ladder.ugYears },
    { stage: "After Graduation", options: overlay?.pg?.join(" · ") ?? ladder.pg, duration: ladder.pgYears },
    {
      stage: "After Post-Graduation",
      options: ladder.doc ?? "Ph.D., professional certifications, or senior practice in the field",
      duration: "3–5 years (optional)",
    },
  ];

  const facts = overlay?.facts ?? [
    `Entry qualification: ${overlay?.entry ?? ladder.ug}.`,
    `Most institutes ask for 50–60% in the qualifying examination; reserved categories usually get a 5% relaxation.`,
    `Admission is through the entrance exams listed below — national tests plus the state CET where applicable.`,
    `Government and private institutes both offer this route; fee levels differ sharply between them.`,
    `Scholarships listed on the HBK scholarships page apply to most of these programmes.`,
  ];

  return {
    name: professionName,
    slug: professionSlug(professionName),
    streamName: stream.stream,
    streamSlug,
    summary,
    sectors: overlay?.sectors ?? arch.sectors,
    skills: overlay?.skills ?? arch.skills,
    duties: overlay?.duties ?? arch.duties,
    path,
    facts,
    institutes: pickInstitutes(stream, overlay),
    abroad: ABROAD_BY_STREAM[streamSlug] ?? GLOBAL_FALLBACK,
    exams: pickExams(stream, overlay),
    pros: overlay?.pros ?? arch.pros,
    cons: overlay?.cons ?? arch.cons,
  };
}

/* Overlay registry — per-stream authored detail, lazily loaded. */
const overlayLoaders = import.meta.glob<{ default: Record<string, ProfessionOverlay> }>(
  "./professionDetails/*.ts",
);

const overlayCache = new Map<string, Record<string, ProfessionOverlay>>();

export async function loadOverlays(streamSlug: string): Promise<Record<string, ProfessionOverlay>> {
  if (overlayCache.has(streamSlug)) return overlayCache.get(streamSlug)!;
  const loader = overlayLoaders[`./professionDetails/${streamSlug}.ts`];
  if (!loader) return {};
  const mod = await loader();
  overlayCache.set(streamSlug, mod.default);
  return mod.default;
}
