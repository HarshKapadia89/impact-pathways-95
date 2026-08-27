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
  /** Opening sentence of the generated summary; {name} is replaced. */
  lead?: string;
  duties: string[];
  sectors: string[];
  skills: string[];
  pros: string[];
  cons: string[];
};

const ARCHETYPES: Archetype[] = [
  {
    test: /doctor|physician|surgeon|medical officer|paediatric|cardiolog|dermatolog|psychiatr|radiolog|anaesth|gynaec|orthoped|oncolog|neurolog|pathologist|ophthalm|dentist|ayurved|homoeopath|homeopath|unani|siddha/i,
    lead: "A {name} diagnoses and treats patients, working in hospitals, clinics or community health programmes, and carries direct clinical responsibility for the people under their care.",
    duties: [
      "Examine patients, take a clinical history and order the investigations needed for a diagnosis.",
      "Decide on treatment, prescribe medication or procedures and explain the plan to the patient and family.",
      "Perform or assist in procedures within the scope of the qualification and registration.",
      "Review progress, adjust treatment and refer to super-specialists when required.",
      "Maintain clinical records, follow infection-control protocols and meet council registration norms.",
    ],
    sectors: ["Government hospitals and district health services", "Private hospitals and nursing homes", "Own clinic or group practice", "Medical colleges, research and public-health programmes"],
    skills: ["Clinical reasoning and diagnostic skill", "Steady hands and calm decision-making under pressure", "Communication with anxious patients and families", "Lifelong study of updated protocols"],
    pros: ["High social respect and secure demand", "Direct, visible impact on people's lives", "Clear specialisation ladder with strong earnings later"],
    cons: ["Very long training before independent practice", "Long duty hours, night calls and emotional strain", "Medico-legal responsibility for every decision"],
  },
  {
    test: /nurse|midwif|paramedic|emergency medical|ward|dialysis|perfusion|optometr|radiograph|laboratory technolog|imaging|sonograph|prosthet|orthot|physiotherap|occupational therap|dietician|dietitian|nutritionist|pharmacist|pharmac/i,
    lead: "A {name} is a qualified allied-health professional who supports diagnosis, treatment and recovery alongside doctors, and is often the person a patient interacts with most.",
    duties: [
      "Prepare patients, equipment and records before each procedure or session.",
      "Carry out the clinical or technical work the role is licensed for, following standard protocols.",
      "Monitor patients, record readings and escalate anything abnormal to the treating doctor.",
      "Maintain equipment, stock, calibration and sterility standards.",
      "Counsel patients and families on aftercare, medication and follow-up.",
    ],
    sectors: ["Hospitals and multi-speciality centres", "Diagnostic labs and imaging centres", "Community health and government programmes", "Home-care, rehabilitation and wellness providers"],
    skills: ["Precise clinical technique", "Patience and empathy with patients", "Equipment handling and hygiene discipline", "Accurate documentation"],
    pros: ["Short, employable qualification with fast entry", "Very strong demand in India and abroad", "Regular hospital-sector openings and overseas mobility"],
    cons: ["Shift duties including nights and weekends", "Physically and emotionally demanding days", "Pay depends heavily on employer type and city"],
  },
  {
    test: /lawyer|advocate|judge|legal|solicitor|attorney|counsel at law|notary|magistrate|jurist/i,
    lead: "A {name} works with the law — advising clients, drafting documents and representing or deciding matters within the Indian legal system.",
    duties: [
      "Read the file, research statutes, rules and case law relevant to the matter.",
      "Draft pleadings, contracts, opinions or orders in the correct legal form.",
      "Advise clients on risk, options and likely outcomes in plain language.",
      "Appear before courts, tribunals or authorities and argue the matter.",
      "Track deadlines, filings and compliance obligations meticulously.",
    ],
    sectors: ["Litigation practice at district, High Court and Supreme Court", "Corporate law firms and in-house legal teams", "Judicial services and government law offices", "Compliance, IP and legal-research organisations"],
    skills: ["Legal research and precise drafting", "Argument and public speaking", "Reading long documents with attention to detail", "Ethics and client confidentiality"],
    pros: ["Independent practice is possible from day one", "Strong earnings after reputation is built", "Direct role in justice, policy and business decisions"],
    cons: ["Early years in litigation pay very little", "Adjournments and long hours are routine", "Success depends heavily on networks and persistence"],
  },
  {
    test: /accountant|auditor|chartered|company secretary|cost account|tax|actuar|treasur|financial analyst|finance|investment|banker|equity|portfolio|insurance|underwrit|credit/i,
    lead: "A {name} works with money, numbers and regulation — keeping records accurate, assessing risk and helping organisations or individuals make sound financial decisions.",
    duties: [
      "Collect and verify financial data, statements and supporting documents.",
      "Prepare accounts, valuations, forecasts or risk assessments to the applicable standard.",
      "Test compliance with tax law, accounting standards and regulator requirements.",
      "Present findings, recommendations and reports to management or clients.",
      "Track statutory deadlines, filings and audit trails.",
    ],
    sectors: ["Audit and accounting firms", "Banks, NBFCs and insurance companies", "Corporate finance and treasury teams", "Independent practice and consultancy"],
    skills: ["Numerical accuracy and analytical thinking", "Knowledge of tax, accounting and regulatory rules", "Excel, ERP and financial-modelling tools", "Integrity and confidentiality"],
    pros: ["Recognised professional qualifications with clear market value", "Every sector needs the skill, so demand is stable", "Practice, industry and overseas routes all open"],
    cons: ["Professional exams have low pass rates and take years", "Deadline seasons mean very long hours", "Errors carry regulatory and reputational consequences"],
  },
  {
    test: /architect|urban planner|town planner|planner|interior|landscape|surveyor|valuer/i,
    lead: "A {name} shapes built space — turning a client brief and a site into drawings, approvals and a finished project that people use every day.",
    duties: [
      "Study the site, the brief, the budget and the applicable development-control rules.",
      "Prepare concepts, drawings and 3D models, and revise them with the client.",
      "Prepare working drawings, specifications and municipal approval submissions.",
      "Coordinate with structural, services and landscape consultants.",
      "Visit site during construction to check quality against drawings.",
    ],
    sectors: ["Architecture and design practices", "Real-estate developers and construction firms", "Urban local bodies and planning authorities", "Independent practice and consultancy"],
    skills: ["Spatial imagination and drawing", "CAD, BIM and visualisation software", "Building codes and by-laws", "Client handling and coordination"],
    pros: ["Creative work with a permanent, visible result", "Licensed profession with independent-practice rights", "Wide scope from housing to public infrastructure"],
    cons: ["Long five-year degree plus registration", "Project timelines and client changes cause pressure", "Income is uneven in the early practice years"],
  },
  {
    test: /designer|design|animator|illustrat|art director|craft|jewel|ceramic artist|textile design|fashion|photograph|videograph|cinematograph|game art/i,
    lead: "A {name} solves problems visually — combining research, craft and software to produce work that communicates clearly and looks right.",
    duties: [
      "Understand the brief, the audience and the constraints of the medium.",
      "Research references, sketch options and develop the strongest concept.",
      "Produce finished work in the required software and file standards.",
      "Take feedback from clients or art directors and iterate.",
      "Prepare final files for production, print, screen or manufacture.",
    ],
    sectors: ["Design studios and creative agencies", "Product, apparel and manufacturing companies", "Media, gaming and entertainment houses", "Freelance and own-label practice"],
    skills: ["Visual sense, colour and composition", "Industry-standard design software", "Concept development and storytelling", "Time management across parallel briefs"],
    pros: ["Creative, portfolio-driven career where skill beats pedigree", "Freelance and remote work are genuinely possible", "Fast-growing demand from digital brands"],
    cons: ["Income is uneven at the start", "Subjective feedback and rework are constant", "Portfolio must be kept current to stay employable"],
  },
  {
    test: /journalis|reporter|anchor|correspondent|editor|copywriter|content writer|columnist|broadcast|radio jockey|video jockey|public relation|media|publish|advertis|screenwriter|script/i,
    lead: "A {name} works with words, stories and audiences — gathering material, shaping it for a medium and publishing it to deadline.",
    duties: [
      "Track the beat, sources and trends the audience cares about.",
      "Research, interview and verify facts before anything is published.",
      "Write, edit or present the piece in the tone the platform requires.",
      "Work with designers, editors and producers to finish the story.",
      "Meet publication deadlines and follow legal and ethical norms.",
    ],
    sectors: ["Newspapers, TV channels and digital newsrooms", "Advertising, PR and content agencies", "Brand and corporate communication teams", "Independent creator and freelance work"],
    skills: ["Clear writing and editing", "Interviewing and fact-checking", "Speed under deadline", "Social and digital publishing tools"],
    pros: ["Varied work with real public influence", "Entry is skill-based; a portfolio matters more than marks", "Digital platforms have opened independent earning routes"],
    cons: ["Irregular hours and unpredictable news cycles", "Starting salaries in media are modest", "Pressure and public criticism come with the role"],
  },
  {
    test: /pilot|cabin crew|air traffic|flight|aviation|airline|navigat|merchant navy|marine officer|ship/i,
    lead: "A {name} works in the transport and aviation system, where licensing, safety procedure and precision matter more than anything else.",
    duties: [
      "Complete pre-departure checks, documentation and briefings.",
      "Operate or coordinate the movement of aircraft, vessels or traffic under standard procedures.",
      "Monitor weather, instruments and communication continuously.",
      "Handle abnormal situations using trained emergency protocols.",
      "Maintain logs, licences, medicals and recurrent training records.",
    ],
    sectors: ["Airlines and charter operators", "Airport and air-navigation authorities", "Shipping and port organisations", "Defence and coast-guard services"],
    skills: ["Situational awareness and quick judgement", "Strict procedural discipline", "Clear radio and crew communication", "Physical and medical fitness"],
    pros: ["High earnings once licensed and current", "Travel and international exposure", "Highly respected, structured profession"],
    cons: ["Training and licensing are expensive", "Rosters, time-zone changes and time away from home", "Medical fitness must be maintained throughout the career"],
  },
  {
    test: /chef|culinar|baker|hotel|hospitality|tourism|travel|event|catering|front office|housekeep|restaurant|resort|cruise/i,
    lead: "A {name} works in the hospitality and tourism industry, where the product is the guest's experience and consistency is everything.",
    duties: [
      "Plan the day's service, staffing, stock and set-up.",
      "Deliver the service or product to the property's quality standard.",
      "Handle guest requests, complaints and special requirements on the spot.",
      "Control cost, wastage, hygiene and safety standards.",
      "Train and supervise junior staff during the shift.",
    ],
    sectors: ["Hotels, resorts and restaurant chains", "Airlines, cruise lines and railways catering", "Travel companies, tour operators and event firms", "Own restaurant, cloud kitchen or travel business"],
    skills: ["Guest-handling and calm under pressure", "Operational planning and costing", "Team leadership on the floor", "Presentation and hygiene discipline"],
    pros: ["Fast promotions for people who perform on the floor", "Genuine international placement opportunities", "Entrepreneurship is realistic after a few years"],
    cons: ["Long shifts, weekends and festival duty", "Physically tiring and guest-facing pressure", "Entry pay is modest before supervisory roles"],
  },
  {
    test: /farmer|agronom|horticultur|agricultur|soil|seed|plant|dairy|poultry|fisher|aqua|forest|apicultur|sericultur|food technolog|agri/i,
    lead: "A {name} works with land, crops, livestock or food systems, applying scientific method to production, quality and supply.",
    duties: [
      "Assess soil, water, breed or crop conditions and plan the production cycle.",
      "Apply scientific practices for inputs, disease control and yield improvement.",
      "Monitor growth, quality and compliance with food-safety and export norms.",
      "Advise farmers, cooperatives or company teams on better practice.",
      "Record data, costs and results for the next cycle.",
    ],
    sectors: ["State agriculture and horticulture departments", "ICAR institutes and agricultural universities", "Agri-input, seed, dairy and food-processing companies", "Cooperatives, FPOs and own agri-enterprise"],
    skills: ["Applied biology and field observation", "Data recording and analysis", "Extension work and farmer communication", "Practical, outdoor working ability"],
    pros: ["Government scientist and officer routes through ICAR and state services", "Growing agri-tech and food-processing industry", "Strong scope for own enterprise on family land"],
    cons: ["Field work in heat, rain and remote postings", "Outcomes depend on weather and market prices", "Corporate pay is lower than in urban sectors at entry"],
  },
  {
    test: /veterinar|animal|livestock|zoo|wildlife/i,
    lead: "A {name} works with animal health and production, combining clinical skill with public-health and food-safety responsibility.",
    duties: [
      "Examine and treat animals in clinics, farms or field camps.",
      "Run vaccination, breeding and disease-surveillance programmes.",
      "Advise owners and farms on nutrition, housing and hygiene.",
      "Certify animal health for movement, sale or export.",
      "Maintain treatment and drug records as per council rules.",
    ],
    sectors: ["State animal-husbandry departments", "Dairy, poultry and livestock companies", "Pet clinics and hospitals", "Wildlife parks, research institutes and NGOs"],
    skills: ["Clinical handling of animals", "Diagnostic and surgical technique", "Physical stamina for field work", "Communication with farmers and pet owners"],
    pros: ["Government veterinary officer posts across every district", "Rapidly growing urban pet-care market", "Meaningful work with animals and rural livelihoods"],
    cons: ["Physically demanding and sometimes risky work", "Emergency and field calls at odd hours", "Rural postings are common in government service"],
  },
  {
    test: /athlete|coach|sport|fitness|yoga|physical education|referee|umpire|gym/i,
    lead: "A {name} works in sport and physical performance — training people, managing programmes and applying sports science to results.",
    duties: [
      "Assess fitness, technique or performance levels of athletes or clients.",
      "Design training, conditioning and recovery programmes.",
      "Supervise sessions, correct technique and prevent injury.",
      "Track progress data and adjust the plan through the season.",
      "Coordinate with physiotherapists, nutritionists and officials."
    ],
    sectors: ["Schools, colleges and sports academies", "Professional clubs, leagues and federations", "Fitness chains and personal-training practice", "Sports authorities and government sports bodies"],
    skills: ["Sport-specific technical knowledge", "Motivation and coaching communication", "Anatomy, conditioning and injury awareness", "Personal fitness and discipline"],
    pros: ["Active career doing what you enjoy", "Growing fitness and sports-science market in India", "Government and school posts are available with B.P.Ed."],
    cons: ["Competitive playing careers are short and uncertain", "Early and late working hours around clients' schedules", "Pay outside cricket and top leagues remains modest"],
  },
  {
    test: /special educator|audiolog|speech|rehabilit|prosthesis|clinical psycholog|psycholog|counsellor|counselor|social work/i,
    lead: "A {name} supports people through difficulty — assessing needs, planning intervention and working patiently with individuals and families over time.",
    duties: [
      "Assess the person's condition, needs and support environment.",
      "Prepare an individual intervention or care plan with measurable goals.",
      "Run regular sessions and adjust the plan against progress.",
      "Train families, teachers or caregivers to continue support at home.",
      "Maintain case records and coordinate with doctors and institutions.",
    ],
    sectors: ["Special schools, inclusive schools and early-intervention centres", "Hospitals and rehabilitation centres", "NGOs, CSR programmes and government schemes", "Private practice and tele-therapy"],
    skills: ["Empathy with firm professional boundaries", "Assessment tools and record keeping", "Patience across slow progress", "Family counselling and teamwork"],
    pros: ["Deeply meaningful, visibly life-changing work", "Rising awareness has created strong demand", "RCI-registered practice allows independent clinics"],
    cons: ["Emotionally heavy caseloads", "Progress can be slow and non-linear", "Pay in the NGO and school sector is modest"],
  },
  {
    test: /teacher|professor|lecturer|principal|educator|tutor|librarian|academic/i,
    lead: "A {name} teaches and guides learners, combining subject mastery with the classroom skill needed to make it land.",
    duties: [
      "Plan the syllabus, lessons and assessments for the term.",
      "Teach classes and adapt the method to how different learners respond.",
      "Set, conduct and evaluate tests and give useful feedback.",
      "Support students pastorally and communicate with parents.",
      "Keep up with curriculum changes, research and training.",
    ],
    sectors: ["Schools — government, aided and private", "Colleges and universities", "Coaching and ed-tech organisations", "Curriculum, assessment and teacher-training bodies"],
    skills: ["Deep subject knowledge", "Explanation and classroom management", "Assessment design", "Patience and consistency"],
    pros: ["Stable hours and long-term job security in the school system", "Direct influence on young lives", "Government posts through TET, NET and state exams"],
    cons: ["Administrative and paperwork load", "Salary growth is slow in many private schools", "Large class sizes make individual attention hard"],
  },
  {
    test: /musician|singer|dancer|actor|theatre|performer|choreograph|composer|conductor|instrument|artist|film maker|film director|producer|disk jockey|model/i,
    lead: "A {name} performs or creates for an audience, building a career on years of practice, stage time and reputation rather than a single degree.",
    duties: [
      "Practise and rehearse daily to keep technique and stamina at performance level.",
      "Prepare, interpret or compose material for the production or show.",
      "Rehearse with the ensemble, director or crew before performance.",
      "Perform live or on camera, adjusting to the audience and setting.",
      "Build a portfolio, network and audience across platforms.",
    ],
    sectors: ["Theatre, film, TV and OTT productions", "Music, dance and cultural institutions", "Event, wedding and corporate performance circuits", "Teaching, academies and content platforms"],
    skills: ["Mastery of the art form through sustained practice", "Stage presence and expression", "Collaboration with directors and co-performers", "Self-marketing and resilience"],
    pros: ["Doing what you genuinely love, with a public identity", "Digital platforms allow direct audience earning", "Teaching provides steady income alongside performance"],
    cons: ["Income is irregular, especially in the first years", "Highly competitive with no guaranteed entry path", "Physical wear and constant auditioning"],
  },
  {
    test: /developer|programmer|software|data scien|data analyst|machine learning|artificial intelligence|cyber|network|cloud|database|web|app|it |information technolog|system analyst|game develop|blockchain|devops|tester|qa/i,
    lead: "A {name} builds or protects digital systems — writing, testing and maintaining the software and infrastructure organisations run on.",
    duties: [
      "Understand the requirement and break it into technical tasks.",
      "Write, review and test code or configuration to the team's standards.",
      "Debug issues reported by users, monitoring or security tooling.",
      "Deploy changes safely and document the system for the team.",
      "Keep learning the frameworks, tools and threats that change every year.",
    ],
    sectors: ["IT services and product companies", "Start-ups and digital-first businesses", "Banks, telecom and public-sector IT divisions", "Freelance, contract and remote work worldwide"],
    skills: ["Programming and problem-solving logic", "Data structures, databases and cloud basics", "Debugging patience and version control", "Clear communication in a team"],
    pros: ["Highest volume of fresher hiring in India", "Remote and international work is normal", "Skills can be self-taught and proven through projects"],
    cons: ["Technology churn means constant relearning", "Long hours during releases and incidents", "Entry-level competition is intense"],
  },
  {
    test: /entrepreneur|businessperson|consultant|analyst|marketing|sales|human resource|hr |supply chain|logistic|operations|procurement|retail|brand|product manager/i,
    lead: "A {name} works on the commercial side of an organisation — planning, selling, coordinating and improving how the business performs.",
    duties: [
      "Set targets and plan the activity needed to hit them.",
      "Analyse market, cost or performance data and spot the gaps.",
      "Coordinate teams, vendors and customers to get work moving.",
      "Present proposals, reports and recommendations to leadership.",
      "Review results and refine the process for the next cycle.",
    ],
    sectors: ["Corporates across FMCG, retail, manufacturing and services", "Consulting and market-research firms", "Start-ups and family businesses", "Own venture or independent consultancy"],
    skills: ["Commercial judgement and numeracy", "Negotiation and presentation", "Stakeholder coordination", "Spreadsheets, CRM and analytics tools"],
    pros: ["Fast career growth for performers", "Skills transfer across industries", "Direct route to entrepreneurship"],
    cons: ["Target pressure is constant", "Travel and long hours in sales roles", "Performance is measured monthly, not annually"],
  },
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

function article(name: string): string {
  return /^[aeiou]/i.test(name.trim()) ? "An" : "A";
}

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
    (arch.lead
      ? `${arch.lead.replace(/^A \{name\}/, `${article(professionName)} {name}`).replace(/\{name\}/g, professionName)} In India this work sits inside the ${stream.stream} stream: students usually take ${ladder.after10} in Class 11–12, qualify through ${ladder.ug}, and specialise later through work experience or a master's. The sections below set out the study route, the entrance exams, the leading institutes in India and abroad, and the day-to-day reality of the job.`
      : null) ??
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
