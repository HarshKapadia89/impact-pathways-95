// All translatable strings for the Career Discovery Report PDF.
// Keep proper nouns (IIT, NEET, GUJCET, college names) in English in both
// languages — that matches how Gujarati speakers refer to them and lets us
// avoid translating the data layer (careerData.ts / colleges).

export type ReportLang = "en" | "gu";

export interface ReportStrings {
  // chrome
  brand: string;
  pageOf: (p: number, t: number) => string;
  generatedOn: (date: string) => string;
  footerName: (name: string) => string;

  // cover
  coverSubtitle: string;
  schoolLine: string;
  preparedFor: string;
  studentFallback: string;
  metaLine: (grade: string, age: string, langName: string) => string;
  langNameEn: string;
  langNameGu: string;
  coverHeadline: string;
  coverBullets1: string;
  coverBullets2: string;
  coverFooter: string;

  // section titles
  toc: string;
  sec1: string;
  sec2: string;
  sec3: string;
  sec4: string;
  sec5: string;
  sec6: string;
  sec7: string;
  sec8: string;
  sec9: string;
  sec10: string;
  sec11: string;
  sec12: string;
  sec13: string;
  sec14: string;
  sec15: string;
  sec16: string;
  sec17: string;
  sec18: string;
  sec19: string;

  // about
  about: string[];

  // snapshot
  snapTopRiasec: string;
  snapTopMi: string;
  snapTopApt: string;
  snapAptOverall: (pct: number) => string;
  snapTopStreams: string;
  snapBoth: string;

  // riasec
  riasecIntro: string;
  riasecYourCode: (code: string) => string;
  riasecCodeText: string;

  // mi
  miIntro: string;

  // aptitude
  aptOverall: (pct: number) => string;

  // streams
  streamsIntro: string;
  primary: string;
  secondary: string;
  coreSubjects: (s: string) => string;

  // stream deep dive
  topPaths: string;

  // careers
  pathStream: (s: string) => string;
  pathDuration: (d: string) => string;
  pathSalary: (s: string) => string;
  pathExams: (e: string) => string;

  // exams
  examsIntro: (n: number) => string;

  // colleges
  collegesIntro: string;

  // skills
  skillsList: string[];

  // action plans
  thisYearList: string[];
  threeYearList: string[];

  // parents
  parentTips: string[];

  // glossary
  glossaryItems: [string, string][];
  closingDisclaimer: string;

  // RIASEC labels
  riasec: Record<string, { name: string; description: string }>;

  // MI labels
  mi: Record<string, { name: string; description: string }>;

  // Aptitude category descriptions
  aptDescriptions: Record<string, string>;

  // Aptitude category display name (translated)
  aptCategoryName: (key: string) => string;
}

const EN: ReportStrings = {
  brand: "HBK Careers — Career Discovery Report",
  pageOf: (p, t) => `Page ${p} of ${t}`,
  generatedOn: (d) => `Generated ${d}`,
  footerName: (n) => `HBK Careers Report — ${n}`,

  coverSubtitle: "Career Discovery Report",
  schoolLine: "The H B Kapadia New High School, Ahmedabad",
  preparedFor: "Prepared for",
  studentFallback: "Student",
  metaLine: (g, a, l) => `Grade ${g || "—"}   •   Age ${a || "—"}   •   Language: ${l}`,
  langNameEn: "English",
  langNameGu: "ગુજરાતી",
  coverHeadline: "A 20-page personalised guide",
  coverBullets1: "RIASEC interest profile  •  Multiple intelligences  •  Aptitude analysis",
  coverBullets2: "Recommended streams  •  College & exam roadmap  •  Action plan",
  coverFooter: "Free • No login required • hbkcareers.org",

  toc: "Table of Contents",
  sec1: "1. About This Report",
  sec2: "2. Your Snapshot",
  sec3: "3. RIASEC Interest Profile (Holland Codes)",
  sec4: "4. Detailed RIASEC Analysis",
  sec5: "5. Multiple Intelligences",
  sec6: "6. Detailed Intelligence Analysis",
  sec7: "7. Aptitude Strengths",
  sec8: "8. Detailed Aptitude Analysis",
  sec9: "9. Recommended Streams",
  sec10: "10. Stream Deep-Dive — Primary",
  sec11: "11. Stream Deep-Dive — Secondary",
  sec12: "12. Top Career Paths For You",
  sec13: "13. Entrance Exams to Plan For",
  sec14: "14. Top Colleges in Gujarat",
  sec15: "15. Skills to Build (Now)",
  sec16: "16. Action Plan — This Year",
  sec17: "17. Action Plan — Next 3 Years",
  sec18: "18. Tips for Parents & Mentors",
  sec19: "19. Notes & Glossary",

  about: [
    "This report is built from three internationally-recognised assessments:",
    "",
    "• RIASEC (Holland Codes) — six personality–career types developed by Dr. John Holland.",
    "  Most colleges and HR systems globally still use this framework.",
    "",
    "• Multiple Intelligences — Howard Gardner's theory that we all have eight different",
    "  kinds of intelligence and grow fastest when we work with our strongest ones.",
    "",
    "• Aptitude — practical reasoning across Numerical, Verbal, Logical, Spatial and Memory",
    "  tasks. This shows where you are quick and accurate today.",
    "",
    "How to read your scores:",
    "• Likert scores are normalised to 0–100. Anything above 60 is a meaningful strength.",
    "• Aptitude scores are % correct for that section.",
    "• The recommendations combine all three lenses with research on India / Gujarat job market.",
    "",
    "This report is a starting point — not a verdict. Your interests, effort and context all matter.",
  ],

  snapTopRiasec: "Your top RIASEC code",
  snapTopMi: "Top intelligences",
  snapTopApt: "Strongest aptitudes",
  snapAptOverall: (p) => `(overall ${p}%)`,
  snapTopStreams: "Top recommended streams",
  snapBoth: "Both options are strong. Read the deep-dives in sections 10 & 11 before deciding.",

  riasecIntro: "Your scores across the six Holland Codes:",
  riasecYourCode: (c) => `Your code: ${c}`,
  riasecCodeText:
    "Your top three letters together are called your Holland Code. " +
    "It's the single best predictor of which work environments you'll find energising. " +
    "Roles that combine all three letters tend to feel like 'flow' to you.",

  miIntro: "Howard Gardner's eight intelligences — your scores:",

  aptOverall: (p) => `Overall aptitude score: ${p}%`,

  streamsIntro:
    "Based on your interests, intelligences and aptitudes, the following streams are the strongest fit. The next two pages dive deep into each.",
  primary: "Primary",
  secondary: "Secondary",
  coreSubjects: (s) => `Core subjects: ${s}`,

  topPaths: "Top career paths in this stream:",

  pathStream: (s) => `Stream: ${s}`,
  pathDuration: (d) => d,
  pathSalary: (s) => `Salary: ${s}`,
  pathExams: (e) => `Entrance exams: ${e}`,

  examsIntro: (n) => `${n} entrance exams matter for your recommended streams:`,

  collegesIntro: "Recommended for your streams (browse the full directory at /colleges):",

  skillsList: [
    "English communication — speak, write, present.",
    "Spoken & written Gujarati / Hindi (mother-tongue confidence builds career confidence).",
    "Basic computer skills — typing, MS Office / Google Docs.",
    "Internet research and learning to use YouTube / Khan Academy / NPTEL.",
    "Public speaking — join debate, elocution, school theatre.",
    "Time management — daily plan, weekly review.",
    "Mental math + reading speed — tiny daily reps compound.",
    "Curiosity & question-asking — interview adults you admire about their work.",
  ],

  thisYearList: [
    "Pick one role-model from each recommended stream and read 1 article about them this month.",
    "Visit one college from your shortlist (or take a virtual tour).",
    "Try one short online course (Coursera, NPTEL, SWAYAM) related to the stream.",
    "Talk to two seniors who chose this stream — what surprised them?",
    "Track your school marks per subject — which subjects energise you?",
    "Re-take this test in 6 months and compare scores.",
  ],

  threeYearList: [
    "Year 1: Strengthen base (math, language, daily reading, one extracurricular).",
    "Year 2: Try focused exam prep (NTSE, KVPY, foundation classes).",
    "Year 3: Lock the stream, choose 11th subjects, start exam-specific prep (JEE/NEET/CLAT/CUET).",
    "Build a portfolio (projects, blog, drawings, videos) — not just marks.",
    "Apply to scholarships every year (Inspire, NMMS, NTSE).",
  ],

  parentTips: [
    "Read this report together. Ask your child what surprised them.",
    "Stream choice belongs to the student. Adults guide; they don't decide.",
    "Marks are not ability. Aptitude + effort + interest matter more long-term.",
    "Gujarat has incredible institutions — IIM-A, NID, GNLU, NIFT, IIT-GN, MICA, MSU. Many give 100% scholarships.",
    "Visit one college campus together this year. It changes how a student thinks.",
    "Celebrate curiosity, not only marks. Ask 'what did you find interesting?' more than 'what did you score?'",
  ],

  glossaryItems: [
    ["RIASEC", "Holland's six personality–career types — Realistic, Investigative, Artistic, Social, Enterprising, Conventional."],
    ["MI", "Multiple Intelligences — Howard Gardner's theory of eight different ways of being smart."],
    ["JEE", "Joint Entrance Examination — for engineering admission to IITs/NITs/IIITs."],
    ["NEET", "National Eligibility cum Entrance Test — for medical (MBBS, BDS, AYUSH)."],
    ["CUET", "Common University Entrance Test — for central universities."],
    ["CLAT", "Common Law Admission Test — for National Law Universities including GNLU."],
    ["GUJCET", "Gujarat Common Entrance Test — for Gujarat engineering & pharmacy seats."],
    ["IPM", "Integrated Programme in Management — IIMs' 5-year course after 12th."],
    ["GNLU", "Gujarat National Law University, Gandhinagar — top-5 NLU in India."],
    ["NID", "National Institute of Design, Ahmedabad — India's top design school."],
    ["MICA", "Mudra Institute of Communications, Ahmedabad — top communications PG school."],
  ],
  closingDisclaimer:
    "This report is a guidance tool, not a final verdict. Discuss it with mentors, parents and teachers.",

  riasec: {
    R: { name: "Realistic", description: "You enjoy hands-on, practical tasks — building, fixing, working with tools, machines, the outdoors and physical activity." },
    I: { name: "Investigative", description: "You enjoy thinking, analysing and researching. You like to understand how and why things work." },
    A: { name: "Artistic", description: "You enjoy creative expression — design, writing, music, performance, visual arts and original ideas." },
    S: { name: "Social", description: "You enjoy helping, teaching and working with people. You're energised by service and connection." },
    E: { name: "Enterprising", description: "You enjoy leading, persuading and starting things. You like challenges, sales, business and organising people." },
    C: { name: "Conventional", description: "You enjoy structure, organisation and detail. You like clear systems, rules, data and getting things accurate." },
  },

  mi: {
    Linguistic: { name: "Linguistic", description: "You learn well through reading, writing, debate and language. Strong fit for law, journalism, teaching, content, communication." },
    LogicalMath: { name: "Logical-Mathematical", description: "You process the world through logic and patterns. Strong fit for engineering, sciences, finance, computer science, research." },
    Spatial: { name: "Spatial", description: "You think in pictures and models. Strong fit for design, architecture, surgery, mechanical engineering, aviation, animation." },
    Bodily: { name: "Bodily-Kinesthetic", description: "You learn by doing. Strong fit for sports, dance, surgery, paramedical, hands-on engineering, performing arts, defence." },
    Musical: { name: "Musical", description: "You're attuned to sound, rhythm and tone. Strong fit for music, sound design, audio engineering, language teaching." },
    Interpersonal: { name: "Interpersonal", description: "You read people well. Strong fit for teaching, counselling, sales, management, HR, hospitality, healthcare." },
    Intrapersonal: { name: "Intrapersonal", description: "You know yourself deeply. Strong fit for writing, philosophy, research, psychology, entrepreneurship, leadership." },
    Naturalist: { name: "Naturalist", description: "You're tuned to the natural world. Strong fit for agriculture, environmental science, biotech, veterinary, geology." },
  },

  aptDescriptions: {
    Numerical: "Speed and accuracy with numbers, ratios, and quick mental math. Vital for engineering, finance, data, accountancy, and competitive exams (JEE/CAT).",
    Verbal: "Comfort with words, reading comprehension, and language reasoning. Vital for law, civil services, journalism, BBA-MBA, communication.",
    Logical: "Ability to spot patterns and reason step-by-step. Vital for coding, research, law, strategy, and most competitive exams.",
    Spatial: "Visualising shapes and rotations in your mind. Vital for architecture, design, mechanical engineering, surgery, aviation.",
    Memory: "Holding and recalling information accurately. Helps in medicine, law, languages, and any exam-heavy field.",
  },

  aptCategoryName: (k) => k,
};

const GU: ReportStrings = {
  brand: "HBK Careers — કારકિર્દી શોધ રિપોર્ટ",
  pageOf: (p, t) => `પાનું ${p} / ${t}`,
  generatedOn: (d) => `બનાવ્યું: ${d}`,
  footerName: (n) => `HBK Careers રિપોર્ટ — ${n}`,

  coverSubtitle: "કારકિર્દી શોધ રિપોર્ટ",
  schoolLine: "ધ એચ બી કાપડિયા ન્યૂ હાઈસ્કૂલ, અમદાવાદ",
  preparedFor: "તૈયાર કરાયું",
  studentFallback: "વિદ્યાર્થી",
  metaLine: (g, a, l) => `ધોરણ ${g || "—"}   •   ઉંમર ${a || "—"}   •   ભાષા: ${l}`,
  langNameEn: "English",
  langNameGu: "ગુજરાતી",
  coverHeadline: "20-પાનાંની વ્યક્તિગત માર્ગદર્શિકા",
  coverBullets1: "RIASEC રુચિ પ્રોફાઇલ  •  બહુવિધ બુદ્ધિમત્તાઓ  •  યોગ્યતા વિશ્લેષણ",
  coverBullets2: "ભલામણ કરેલા પ્રવાહો  •  કોલેજ અને પરીક્ષા રોડમેપ  •  એક્શન પ્લાન",
  coverFooter: "મફત • લૉગિન જરૂરી નથી • hbkcareers.org",

  toc: "વિષય સૂચિ",
  sec1: "1. આ રિપોર્ટ વિશે",
  sec2: "2. તમારો સ્નેપશોટ",
  sec3: "3. RIASEC રુચિ પ્રોફાઇલ (Holland Codes)",
  sec4: "4. વિગતવાર RIASEC વિશ્લેષણ",
  sec5: "5. બહુવિધ બુદ્ધિમત્તાઓ",
  sec6: "6. વિગતવાર બુદ્ધિમત્તા વિશ્લેષણ",
  sec7: "7. યોગ્યતા તાકાતો",
  sec8: "8. વિગતવાર યોગ્યતા વિશ્લેષણ",
  sec9: "9. ભલામણ કરેલા પ્રવાહો",
  sec10: "10. પ્રવાહ ઊંડું વિશ્લેષણ — મુખ્ય",
  sec11: "11. પ્રવાહ ઊંડું વિશ્લેષણ — બીજો",
  sec12: "12. તમારા માટે શ્રેષ્ઠ કારકિર્દી માર્ગો",
  sec13: "13. પ્લાન કરવા જેવી પ્રવેશ પરીક્ષાઓ",
  sec14: "14. ગુજરાતની ટોચની કોલેજો",
  sec15: "15. હવે વિકસાવવા જેવી કુશળતાઓ",
  sec16: "16. એક્શન પ્લાન — આ વર્ષ",
  sec17: "17. એક્શન પ્લાન — આગામી 3 વર્ષ",
  sec18: "18. માતા-પિતા અને માર્ગદર્શકો માટે ટિપ્સ",
  sec19: "19. નોંધો અને શબ્દકોશ",

  about: [
    "આ રિપોર્ટ ત્રણ આંતરરાષ્ટ્રીય માન્યતાપ્રાપ્ત મૂલ્યાંકનો પર આધારિત છે:",
    "",
    "• RIASEC (Holland Codes) — Dr. John Holland દ્વારા વિકસાવાયેલા છ વ્યક્તિત્વ–કારકિર્દી પ્રકારો.",
    "  વિશ્વભરની મોટાભાગની કોલેજો અને HR સિસ્ટમો આ માળખું વાપરે છે.",
    "",
    "• બહુવિધ બુદ્ધિમત્તાઓ — Howard Gardnerનો સિદ્ધાંત કે આપણા બધામાં આઠ અલગ-અલગ",
    "  પ્રકારની બુદ્ધિ હોય છે, અને આપણે પોતાની સૌથી મજબૂત બુદ્ધિ સાથે કામ કરતી વખતે સૌથી ઝડપથી વિકસતા હોઈએ છીએ.",
    "",
    "• યોગ્યતા — સંખ્યાત્મક, શાબ્દિક, તાર્કિક, અવકાશી અને સ્મૃતિ — એમ પાંચ ક્ષેત્રોમાં વ્યવહારિક તર્ક.",
    "  આ બતાવે છે કે આજે તમે ક્યાં ઝડપી અને સચોટ છો.",
    "",
    "તમારા સ્કોર્સ કેવી રીતે વાંચવા:",
    "• Likert સ્કોર્સ 0–100 માં સામાન્ય કરેલા છે. 60 થી ઉપરનું કોઈપણ સ્કોર અર્થપૂર્ણ તાકાત છે.",
    "• યોગ્યતા સ્કોર્સ એ વિભાગના સાચા જવાબોની ટકાવારી છે.",
    "• ભલામણો આ ત્રણેય દૃષ્ટિકોણ + ભારત/ગુજરાતના જોબ માર્કેટના સંશોધનને જોડે છે.",
    "",
    "આ રિપોર્ટ એક શરૂઆત છે — અંતિમ ચુકાદો નથી. તમારી રુચિ, મહેનત અને સંજોગો — બધું જ મહત્વનું છે.",
  ],

  snapTopRiasec: "તમારો ટોચનો RIASEC કોડ",
  snapTopMi: "ટોચની બુદ્ધિમત્તાઓ",
  snapTopApt: "સૌથી મજબૂત યોગ્યતાઓ",
  snapAptOverall: (p) => `(કુલ ${p}%)`,
  snapTopStreams: "ટોચના ભલામણ કરેલા પ્રવાહો",
  snapBoth: "બંને વિકલ્પો મજબૂત છે. નિર્ણય લેતા પહેલાં વિભાગ 10 અને 11 માં ઊંડાણભર્યું વાંચન કરો.",

  riasecIntro: "છ Holland Codes પરના તમારા સ્કોર્સ:",
  riasecYourCode: (c) => `તમારો કોડ: ${c}`,
  riasecCodeText:
    "તમારા ટોચના ત્રણ અક્ષરો મળીને તમારો Holland Code કહેવાય. " +
    "આ સૌથી સારો સંકેત છે કે કયું કાર્ય વાતાવરણ તમને ઊર્જા આપશે. " +
    "એ ભૂમિકાઓ જે ત્રણેય અક્ષરોને જોડે છે, એ તમને 'flow' જેવી લાગશે.",

  miIntro: "Howard Gardnerની આઠ બુદ્ધિમત્તાઓ — તમારા સ્કોર્સ:",

  aptOverall: (p) => `કુલ યોગ્યતા સ્કોર: ${p}%`,

  streamsIntro:
    "તમારી રુચિ, બુદ્ધિમત્તાઓ અને યોગ્યતાઓના આધારે, નીચેના પ્રવાહો સૌથી શ્રેષ્ઠ બંધબેસતા છે. પછીના બે પાનાં દરેકને ઊંડાણથી જુએ છે.",
  primary: "મુખ્ય",
  secondary: "બીજો",
  coreSubjects: (s) => `મુખ્ય વિષયો: ${s}`,

  topPaths: "આ પ્રવાહમાં ટોચના કારકિર્દી માર્ગો:",

  pathStream: (s) => `પ્રવાહ: ${s}`,
  pathDuration: (d) => d,
  pathSalary: (s) => `પગાર: ${s}`,
  pathExams: (e) => `પ્રવેશ પરીક્ષાઓ: ${e}`,

  examsIntro: (n) => `તમારા ભલામણ કરેલા પ્રવાહો માટે ${n} પ્રવેશ પરીક્ષાઓ મહત્વની છે:`,

  collegesIntro: "તમારા પ્રવાહો માટે ભલામણ કરેલી (સંપૂર્ણ ડિરેક્ટરી માટે /colleges જુઓ):",

  skillsList: [
    "અંગ્રેજી સંવાદ — બોલવું, લખવું, રજૂ કરવું.",
    "બોલેલી અને લખેલી ગુજરાતી / હિન્દી (માતૃભાષાનો આત્મવિશ્વાસ કારકિર્દીનો આત્મવિશ્વાસ બાંધે છે).",
    "મૂળભૂત કમ્પ્યુટર કૌશલ્ય — ટાઇપિંગ, MS Office / Google Docs.",
    "ઇન્ટરનેટ સંશોધન અને YouTube / Khan Academy / NPTEL વાપરતા શીખવું.",
    "જાહેરમાં બોલવું — ડિબેટ, એલોક્યુશન, શાળાના નાટકમાં જોડાઓ.",
    "સમય વ્યવસ્થાપન — દૈનિક યોજના, સાપ્તાહિક સમીક્ષા.",
    "મનોગણિત + વાંચન ઝડપ — દરરોજ થોડું થોડું મોટું થઈ જાય છે.",
    "જિજ્ઞાસા અને પ્રશ્ન પૂછવા — જે પ્રૌઢો તમને ગમે છે તેમની સાથે કામ વિશે વાત કરો.",
  ],

  thisYearList: [
    "દરેક ભલામણ કરેલા પ્રવાહમાંથી એક રોલ-મૉડલ પસંદ કરો અને આ મહિને તેમના વિશે 1 લેખ વાંચો.",
    "તમારી શોર્ટલિસ્ટમાંથી એક કોલેજની મુલાકાત લો (અથવા વર્ચ્યુઅલ ટૂર કરો).",
    "પ્રવાહ સંબંધિત એક ટૂંકો ઑનલાઇન કોર્સ કરો (Coursera, NPTEL, SWAYAM).",
    "જે બે સિનિયરોએ આ પ્રવાહ પસંદ કર્યો છે તેમની સાથે વાત કરો — તેમને શું આશ્ચર્ય થયું?",
    "વિષય મુજબ તમારા શાળાના માર્કસ ટ્રેક કરો — કયા વિષયો તમને ઊર્જા આપે છે?",
    "6 મહિના પછી આ ટેસ્ટ ફરી આપો અને સ્કોર્સ સરખાવો.",
  ],

  threeYearList: [
    "વર્ષ 1: પાયાને મજબૂત કરો (ગણિત, ભાષા, દૈનિક વાંચન, એક ઇતર પ્રવૃત્તિ).",
    "વર્ષ 2: કેન્દ્રિત પરીક્ષાની તૈયારી અજમાવો (NTSE, KVPY, ફાઉન્ડેશન ક્લાસ).",
    "વર્ષ 3: પ્રવાહ નક્કી કરો, 11મા ધોરણના વિષયો પસંદ કરો, પરીક્ષા-ચોક્કસ તૈયારી શરૂ કરો (JEE/NEET/CLAT/CUET).",
    "પોર્ટફોલિયો બનાવો (પ્રોજેક્ટ્સ, બ્લોગ, ડ્રોઇંગ્સ, વિડિયો) — ફક્ત માર્કસ જ નહીં.",
    "દર વર્ષે સ્કૉલરશિપ માટે અરજી કરો (Inspire, NMMS, NTSE).",
  ],

  parentTips: [
    "આ રિપોર્ટ સાથે મળીને વાંચો. તમારા બાળકને પૂછો કે તેને શું આશ્ચર્ય થયું.",
    "પ્રવાહની પસંદગી વિદ્યાર્થીની છે. પ્રૌઢો માર્ગદર્શન આપે છે; નિર્ણય નથી લેતા.",
    "માર્કસ એ ક્ષમતા નથી. યોગ્યતા + મહેનત + રુચિ — લાંબા ગાળે વધુ મહત્વના છે.",
    "ગુજરાતમાં અદ્ભુત સંસ્થાઓ છે — IIM-A, NID, GNLU, NIFT, IIT-GN, MICA, MSU. ઘણી 100% સ્કૉલરશિપ આપે છે.",
    "આ વર્ષે સાથે મળીને એક કોલેજ કેમ્પસની મુલાકાત લો. તે વિદ્યાર્થીના વિચારવાની રીત બદલે છે.",
    "જિજ્ઞાસાને બિરદાવો, ફક્ત માર્કસને નહીં. 'કેટલા માર્કસ આવ્યા?' કરતાં 'શું રસપ્રદ લાગ્યું?' વધુ પૂછો.",
  ],

  glossaryItems: [
    ["RIASEC", "Hollandના છ વ્યક્તિત્વ–કારકિર્દી પ્રકારો — Realistic, Investigative, Artistic, Social, Enterprising, Conventional."],
    ["MI", "બહુવિધ બુદ્ધિમત્તાઓ — Howard Gardnerનો સિદ્ધાંત: બુદ્ધિમાન હોવાની આઠ અલગ રીતો."],
    ["JEE", "Joint Entrance Examination — IITs/NITs/IIITs માં એન્જિનિયરિંગ પ્રવેશ માટે."],
    ["NEET", "National Eligibility cum Entrance Test — મેડિકલ માટે (MBBS, BDS, AYUSH)."],
    ["CUET", "Common University Entrance Test — કેન્દ્રીય યુનિવર્સિટીઓ માટે."],
    ["CLAT", "Common Law Admission Test — GNLU સહિતની National Law Universities માટે."],
    ["GUJCET", "Gujarat Common Entrance Test — ગુજરાત એન્જિનિયરિંગ અને ફાર્મસી બેઠકો માટે."],
    ["IPM", "Integrated Programme in Management — IIMsનો 12મા ધોરણ પછી 5-વર્ષનો કોર્સ."],
    ["GNLU", "Gujarat National Law University, ગાંધીનગર — ભારતની ટોપ-5 NLU."],
    ["NID", "National Institute of Design, અમદાવાદ — ભારતની ટોચની ડિઝાઇન શાળા."],
    ["MICA", "Mudra Institute of Communications, અમદાવાદ — ટોચની કોમ્યુનિકેશન્સ PG શાળા."],
  ],
  closingDisclaimer:
    "આ રિપોર્ટ માર્ગદર્શન માટેનું સાધન છે, અંતિમ ચુકાદો નહીં. માર્ગદર્શકો, માતા-પિતા અને શિક્ષકો સાથે તેની ચર્ચા કરો.",

  riasec: {
    R: { name: "Realistic (વાસ્તવિક)", description: "તમને હાથથી કરવાના, વ્યવહારિક કાર્યો ગમે છે — બાંધવું, સમારવું, સાધનો-મશીનો સાથે કામ કરવું, બહારી અને શારીરિક પ્રવૃત્તિ." },
    I: { name: "Investigative (વિચારક)", description: "તમને વિચારવું, વિશ્લેષણ કરવું અને સંશોધન કરવું ગમે છે. વસ્તુઓ કેવી રીતે અને કેમ કામ કરે છે તે સમજવું તમને ગમે છે." },
    A: { name: "Artistic (કલાત્મક)", description: "તમને સર્જનાત્મક અભિવ્યક્તિ ગમે છે — ડિઝાઇન, લેખન, સંગીત, પ્રદર્શન, વિઝ્યુઅલ આર્ટ્સ અને નવા વિચારો." },
    S: { name: "Social (સામાજિક)", description: "તમને લોકોને મદદ કરવી, શીખવવું અને તેમની સાથે કામ કરવું ગમે છે. સેવા અને જોડાણ તમને ઊર્જા આપે છે." },
    E: { name: "Enterprising (ઉદ્યોગસાહસિક)", description: "તમને નેતૃત્વ કરવું, સમજાવવું અને નવી શરૂઆત કરવી ગમે છે. પડકારો, સેલ્સ, બિઝનેસ અને લોકોને સંગઠિત કરવા તમને ગમે છે." },
    C: { name: "Conventional (વ્યવસ્થિત)", description: "તમને માળખું, સંગઠન અને વિગતો ગમે છે. સ્પષ્ટ સિસ્ટમો, નિયમો, ડેટા અને સચોટતા તમને ગમે છે." },
  },

  mi: {
    Linguistic: { name: "ભાષાકીય", description: "તમે વાંચન, લેખન, ડિબેટ અને ભાષા દ્વારા સારી રીતે શીખો છો. કાયદો, પત્રકારત્વ, શિક્ષણ, કન્ટેન્ટ, કોમ્યુનિકેશન માટે યોગ્ય." },
    LogicalMath: { name: "તાર્કિક-ગાણિતિક", description: "તમે વિશ્વને તર્ક અને પેટર્ન દ્વારા સમજો છો. એન્જિનિયરિંગ, વિજ્ઞાન, ફાઇનાન્સ, કમ્પ્યુટર સાયન્સ, સંશોધન માટે યોગ્ય." },
    Spatial: { name: "અવકાશી", description: "તમે ચિત્રો અને મૉડેલ્સમાં વિચારો છો. ડિઝાઇન, સ્થાપત્ય, સર્જરી, મિકેનિકલ એન્જિનિયરિંગ, ઉડ્ડયન, એનિમેશન માટે યોગ્ય." },
    Bodily: { name: "શારીરિક-ગતિક", description: "તમે કરીને શીખો છો. રમતગમત, નૃત્ય, સર્જરી, પેરામેડિકલ, હાથથી કરવાનું એન્જિનિયરિંગ, પ્રદર્શન કલા, સંરક્ષણ માટે યોગ્ય." },
    Musical: { name: "સંગીતમય", description: "તમે ધ્વનિ, લય અને સ્વર સાથે જોડાયેલા છો. સંગીત, સાઉન્ડ ડિઝાઇન, ઑડિયો એન્જિનિયરિંગ, ભાષા શિક્ષણ માટે યોગ્ય." },
    Interpersonal: { name: "આંતર-વ્યક્તિગત", description: "તમે લોકોને સારી રીતે વાંચી શકો છો. શિક્ષણ, કાઉન્સેલિંગ, સેલ્સ, મેનેજમેન્ટ, HR, હૉસ્પિટાલિટી, હેલ્થકેર માટે યોગ્ય." },
    Intrapersonal: { name: "આંતરિક", description: "તમે પોતાને ઊંડાણથી જાણો છો. લેખન, તત્વચિંતન, સંશોધન, મનોવિજ્ઞાન, ઉદ્યોગસાહસ, નેતૃત્વ માટે યોગ્ય." },
    Naturalist: { name: "પ્રકૃતિવાદી", description: "તમે કુદરતી જગત સાથે જોડાયેલા છો. કૃષિ, પર્યાવરણ વિજ્ઞાન, બાયોટેક, વેટરનરી, ભૂસ્તરશાસ્ત્ર માટે યોગ્ય." },
  },

  aptDescriptions: {
    Numerical: "સંખ્યાઓ, ગુણોત્તર અને ઝડપી મનોગણિતમાં ગતિ અને સચોટતા. એન્જિનિયરિંગ, ફાઇનાન્સ, ડેટા, એકાઉન્ટન્સી અને સ્પર્ધાત્મક પરીક્ષાઓ (JEE/CAT) માટે મહત્વપૂર્ણ.",
    Verbal: "શબ્દો, વાંચન સમજણ અને ભાષા તર્કમાં આરામ. કાયદો, સિવિલ સર્વિસિસ, પત્રકારત્વ, BBA-MBA, કોમ્યુનિકેશન માટે મહત્વપૂર્ણ.",
    Logical: "પેટર્ન શોધવાની અને પગલે-પગલે તર્ક કરવાની ક્ષમતા. કોડિંગ, સંશોધન, કાયદો, સ્ટ્રેટેજી અને મોટાભાગની સ્પર્ધાત્મક પરીક્ષાઓ માટે મહત્વપૂર્ણ.",
    Spatial: "મનમાં આકારો અને પરિભ્રમણ વિઝ્યુઅલાઇઝ કરવા. સ્થાપત્ય, ડિઝાઇન, મિકેનિકલ એન્જિનિયરિંગ, સર્જરી, ઉડ્ડયન માટે મહત્વપૂર્ણ.",
    Memory: "માહિતીને સચોટ રીતે પકડવી અને યાદ રાખવી. તબીબી, કાયદો, ભાષાઓ અને કોઈપણ પરીક્ષા-ભારે ક્ષેત્રમાં મદદરૂપ.",
  },

  aptCategoryName: (k) => {
    const map: Record<string, string> = {
      Numerical: "સંખ્યાત્મક",
      Verbal: "શાબ્દિક",
      Logical: "તાર્કિક",
      Spatial: "અવકાશી",
      Memory: "સ્મૃતિ",
    };
    return map[k] ?? k;
  },
};

export function getReportStrings(lang: ReportLang): ReportStrings {
  return lang === "gu" ? GU : EN;
}
