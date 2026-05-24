// HBK-original overview content for each handbook stream.
// Written in-house from public regulator/exam information (AICTE, NMC, BCI, ICAI,
// NCHMCT, COA, NCTE, NCERT, Ministry of Education, official exam portals, official
// Gujarat admission authorities). Does NOT reuse phrasing from any third-party site.

export type HandbookOverview = {
  tagline: string;
  overview: string; // 2–3 short paragraphs, HBK voice
  whoFitsWell: string[]; // RIASEC / MI cues mapped to our test
  hbkNote: string; // one-line "how HBK helps"
  sources: { label: string; url: string }[];
  // Substrings used to flag a "Gujarat pick" from the institutes list.
  gujaratHints: string[];
};

const DEFAULT_GUJARAT_HINTS = [
  "Gujarat",
  "Ahmedabad",
  "Vadodara",
  "Baroda",
  "Surat",
  "Rajkot",
  "Gandhi Nagar",
  "Gandhinagar",
  "Anand",
  "Bhavnagar",
  "Junagadh",
  "Patan",
  "Navsari",
  "Nirma",
  "PDPU",
  "Pandit Deendayal",
  "MS University",
  "M.S. University",
  "GTU",
  "IIM Ahmedabad",
  "NID",
  "DAIICT",
];

const COMMON_SOURCES = {
  moe: { label: "Ministry of Education, Govt. of India", url: "https://www.education.gov.in/" },
  ncert: { label: "NCERT — National Council of Educational Research and Training", url: "https://ncert.nic.in/" },
  nta: { label: "NTA — National Testing Agency (exam calendar)", url: "https://nta.ac.in/" },
  acpc: { label: "ACPC Gujarat — Admission Committee for Professional Courses", url: "https://gujacpc.admissions.nic.in/" },
  gseb: { label: "GSEB / GUJCET — Gujarat Secondary & Higher Secondary Education Board", url: "https://www.gseb.org/" },
};

export const HANDBOOK_OVERVIEWS: Record<string, HandbookOverview> = {
  "agriculture-and-allied-sciences": {
    tagline: "Feed the future — science, soil, and supply chains.",
    overview:
      "Agriculture today is far more than farming. It spans plant breeding, soil science, food technology, dairy, horticulture, agri-business and agri-fintech. India trains agricultural graduates through ICAR-affiliated universities, with seats filled via the ICAR AIEEA exam at the national level and state CETs locally.\n\nGujarat has a strong agri-education base — four state agricultural universities (Anand, Navsari, Junagadh, Sardarkrushinagar) and a thriving co-operative dairy ecosystem rooted in Amul. If you enjoy biology, fieldwork and rural-impact problem solving, this stream offers stable government roles plus a fast-growing private sector in agri-tech and food processing.",
    whoFitsWell: [
      "Realistic + Investigative (hands-on + scientific curiosity)",
      "High Naturalist intelligence",
      "Comfortable with biology and chemistry at Class 12",
    ],
    hbkNote: "Use your HBK report's RIASEC profile to choose between research (plant science) vs management (agri-business) tracks.",
    sources: [
      { label: "ICAR — Indian Council of Agricultural Research", url: "https://icar.org.in/" },
      { label: "ICAR AIEEA (entrance exam)", url: "https://icar.nta.ac.in/" },
      COMMON_SOURCES.moe,
      COMMON_SOURCES.acpc,
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "Anand Agricultural", "Navsari Agricultural", "Junagadh Agricultural", "Sardarkrushinagar"],
  },

  "architecture-and-planning": {
    tagline: "Design the spaces people live, work and meet in.",
    overview:
      "Architecture combines art, engineering and social science. In India the profession is regulated by the Council of Architecture (COA), and the only recognised entry route to a B.Arch is qualifying NATA (or the JEE Main Paper 2 for some institutes). Programmes run 5 years and end in mandatory COA registration before you can sign off on a building.\n\nBeyond mainstream architecture there is urban planning, landscape, interior, conservation and sustainable design — all high-demand as Indian cities densify. CEPT University in Ahmedabad is one of the country's top design schools, which makes Gujarat a strong base for this stream.",
    whoFitsWell: [
      "Artistic + Investigative + Realistic",
      "Strong Spatial intelligence; comfortable with both maths and freehand drawing",
      "Patience for long projects and iteration",
    ],
    hbkNote: "If the report shows high Spatial + Artistic but lower Mathematical, consider interior design or landscape architecture before B.Arch.",
    sources: [
      { label: "Council of Architecture (COA)", url: "https://www.coa.gov.in/" },
      { label: "NATA — National Aptitude Test in Architecture", url: "https://www.nata.in/" },
      COMMON_SOURCES.nta,
      COMMON_SOURCES.acpc,
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "CEPT", "School of Architecture"],
  },

  "arts-humanities-and-social-sciences": {
    tagline: "Understand people, history and ideas — and put them to work.",
    overview:
      "Arts and Humanities cover history, political science, sociology, psychology, philosophy, languages, anthropology and more. After Class 12 the common admission route is CUET-UG for central universities, plus state university merit lists. Top destinations include Delhi University, JNU, Jadavpur, Ashoka, Azim Premji University and Gujarat's MSU Baroda and Gujarat University.\n\nCareer outcomes are broader than parents often assume — civil services, policy research, journalism, UX research, HR, content, education, law (via 5-year integrated programmes) and the entire NGO/CSR sector. A humanities degree pairs especially well with a postgraduate qualification in management, design or law.",
    whoFitsWell: [
      "Social + Investigative + Artistic",
      "High Linguistic and Interpersonal intelligence",
      "Curious readers who enjoy debate and writing",
    ],
    hbkNote: "HBK counsellors map your top-3 RIASEC interests to specific BA Hons subjects so you don't pick 'arts' by default.",
    sources: [
      { label: "CUET-UG (NTA)", url: "https://cuet.nta.nic.in/" },
      { label: "UGC — University Grants Commission", url: "https://www.ugc.gov.in/" },
      COMMON_SOURCES.moe,
    ],
    gujaratHints: DEFAULT_GUJARAT_HINTS,
  },

  "business-management": {
    tagline: "Run, scale and build organisations.",
    overview:
      "Management education in India follows two main shapes: a 3-year BBA / BMS undergraduate degree (often via CUET, IPMAT or institute-specific tests like NPAT, SET, CHRIST) followed by an MBA via CAT/XAT/NMAT/CMAT/MAH-CET, or 5-year integrated programmes (IPM at IIMs Indore/Rohtak/Ranchi/Jammu/Bodhgaya/Visakhapatnam, IIM Mumbai's IPM, ISBM, etc.).\n\nReal-world outcomes range from consulting, FMCG sales, banking and investment to product management, supply chain and entrepreneurship. IIM Ahmedabad is one of the world's leading business schools and is in Gujarat itself — but a strong undergraduate from Nirma, MICA or PDPU is also a credible launchpad.",
    whoFitsWell: [
      "Enterprising + Conventional + Social",
      "Comfort with quant + persuasion + ambiguity",
      "Leadership in school activities or family business exposure",
    ],
    hbkNote: "Use the HBK aptitude scores to decide between an early-IPM bet (high quant + verbal) vs BBA-then-CAT (steady builder).",
    sources: [
      { label: "AICTE — All India Council for Technical Education", url: "https://www.aicte-india.org/" },
      { label: "IIM Common Admission Test (CAT)", url: "https://iimcat.ac.in/" },
      { label: "AIMA — All India Management Association", url: "https://www.aima.in/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "IIM Ahmedabad", "MICA", "Nirma", "PDPU"],
  },

  "commerce-and-finance": {
    tagline: "From CA to data-driven finance — the language of business.",
    overview:
      "Commerce after 12th opens four broad tracks: professional certifications (CA via ICAI, CS via ICSI, CMA via ICMAI), university degrees (B.Com Hons, BBA Finance, BAF, BMS), banking & analytics (BBA + CFA/FRM later) and integrated routes like the 5-year BBA-MBA. CUET-UG is the gateway to most central universities; many private institutions run their own tests.\n\nGujarat has long been a commerce-heavy state, with a deep CA ecosystem and active stock-broking and trading communities in Ahmedabad, Surat and Rajkot. A B.Com paired with CA or CFA remains one of the most reliable middle-class career pipelines in India.",
    whoFitsWell: [
      "Conventional + Enterprising + Investigative",
      "Comfort with arithmetic, attention to detail",
      "Patience for long professional-exam cycles",
    ],
    hbkNote: "If HBK shows high Conventional + Logical-Mathematical, CA is a strong fit. High Enterprising tilts you towards finance / markets.",
    sources: [
      { label: "ICAI — Institute of Chartered Accountants of India", url: "https://www.icai.org/" },
      { label: "ICSI — Institute of Company Secretaries of India", url: "https://www.icsi.edu/" },
      { label: "ICMAI — Institute of Cost Accountants of India", url: "https://icmai.in/" },
      { label: "CUET-UG (NTA)", url: "https://cuet.nta.nic.in/" },
    ],
    gujaratHints: DEFAULT_GUJARAT_HINTS,
  },

  "computer-applications-and-sciences": {
    tagline: "Software, data and AI — the most mobile career in India today.",
    overview:
      "Computer Applications and Sciences spans BCA, B.Sc Computer Science, B.Tech CSE/IT, and integrated M.Tech / dual degrees. Entry routes are JEE Main (for B.Tech), CUET-UG (for BCA / B.Sc CS at central universities), state CETs, and institute-specific tests (e.g. NIMCET for MCA later).\n\nThe field rewards continuous learning more than the entry degree — a B.Sc CS graduate who masters DSA, systems and one specialisation (AI/ML, data, security, distributed systems) competes well with B.Tech CSE peers. Gujarat's DAIICT, Nirma, PDPU and Ahmedabad University are strong regional choices alongside the national IIITs.",
    whoFitsWell: [
      "Investigative + Realistic + Conventional",
      "Strong Logical-Mathematical intelligence",
      "Enjoys building, breaking and rebuilding things",
    ],
    hbkNote: "BCA is often a better fit than B.Tech for students whose HBK report shows high Logical-Math but moderate Spatial / Physical-engineering interest.",
    sources: [
      { label: "AICTE", url: "https://www.aicte-india.org/" },
      { label: "JEE Main (NTA)", url: "https://jeemain.nta.nic.in/" },
      { label: "CUET-UG (NTA)", url: "https://cuet.nta.nic.in/" },
      COMMON_SOURCES.acpc,
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "DAIICT", "Dhirubhai", "Ahmedabad University"],
  },

  "design-and-fine-arts": {
    tagline: "Make things people love to look at, use and live with.",
    overview:
      "Design in India is a fast-maturing field: communication, product, UX, fashion, textile, animation, game and transportation design all have dedicated undergraduate programmes. The two anchor exams are UCEED (for IITs, IISc and a few others) and NID DAT / NIFT for the National Institute of Design and the National Institute of Fashion Technology, plus institute-specific tests at Pearl, Srishti Manipal, Symbiosis and MIT-ID.\n\nFine arts (BFA) follows a separate admission flow, often via state colleges of art and university entrance tests. Gujarat hosts NID Ahmedabad and NID Gandhinagar — two of the most influential design schools in the country — making it a natural base for this stream.",
    whoFitsWell: [
      "Artistic + Realistic + Enterprising",
      "Strong Spatial + Visual intelligence",
      "Sketchbook habit; comfortable showing work and taking feedback",
    ],
    hbkNote: "A portfolio matters more than your Class 12 percentage. HBK helps students build a NID/NIFT-ready portfolio over Classes 11–12.",
    sources: [
      { label: "NID — National Institute of Design", url: "https://www.nid.edu/" },
      { label: "NIFT — National Institute of Fashion Technology", url: "https://www.nift.ac.in/" },
      { label: "UCEED (IIT Bombay)", url: "https://www.uceed.iitb.ac.in/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "NID", "MICA"],
  },

  economics: {
    tagline: "Models, markets and policy — the social science with maths.",
    overview:
      "Economics as a discipline sits at the crossroads of mathematics, statistics, policy and behavioural science. The strongest undergraduate routes in India are BA / B.Sc (Hons) Economics at Delhi University (St. Stephen's, SRCC, LSR, Hindu), Ashoka, Azim Premji, MSU Baroda, Gujarat University and the IITs / ISI / Madras School of Economics for quant-heavy variants. Admission is via CUET-UG or institute-specific tests (ISI BStat / BMath, Ashoka, IIT JAM later).\n\nGraduates go on to research (NCAER, NIPFP), policy (RBI, SEBI, Finance Ministry, World Bank), consulting, data analytics and finance. A Class 12 student should take Mathematics if they want to do Hons Economics anywhere serious.",
    whoFitsWell: [
      "Investigative + Conventional + Social",
      "High Logical-Mathematical intelligence; enjoys puzzles + reading",
    ],
    hbkNote: "Mathematics in Class 11–12 is non-negotiable for Hons Economics. HBK will flag this early if it's missing.",
    sources: [
      { label: "Indian Statistical Institute (ISI)", url: "https://www.isical.ac.in/" },
      { label: "CUET-UG", url: "https://cuet.nta.nic.in/" },
      { label: "RBI Careers (Research)", url: "https://www.rbi.org.in/" },
    ],
    gujaratHints: DEFAULT_GUJARAT_HINTS,
  },

  "engineering-and-technology": {
    tagline: "Build the systems modern India runs on.",
    overview:
      "Engineering remains India's largest professional undergraduate stream, with ~10 lakh seats across IITs, NITs, IIITs, GFTIs, state and private universities. The main entrance is JEE Main (NTA) with JEE Advanced for the IITs; state-level routes include GUJCET + ACPC counselling in Gujarat, MHT-CET, KEA-CET, WBJEE and TNEA. BITSAT, VITEEE and SRMJEEE serve their respective private campuses.\n\nThe branch matters more than the brand once you're past the top 20 institutes — CSE, ECE, Electrical, Mechanical, Chemical, Civil and emerging branches like AI/DS, Robotics, EV and Semiconductor all have very different work-day realities. Gujarat's IIT Gandhinagar, SVNIT Surat, DAIICT, Nirma, PDPU and the GTU network give strong in-state options.",
    whoFitsWell: [
      "Realistic + Investigative",
      "Strong Logical-Mathematical and Spatial intelligence",
      "Enjoys problem-solving more than memorising",
    ],
    hbkNote: "HBK matches your interest profile to a specific branch — not just 'engineering yes/no' — to avoid the common drop-out trap of joining the wrong branch.",
    sources: [
      { label: "AICTE", url: "https://www.aicte-india.org/" },
      { label: "JEE Main (NTA)", url: "https://jeemain.nta.nic.in/" },
      { label: "JEE Advanced", url: "https://jeeadv.ac.in/" },
      { label: "ACPC Gujarat", url: "https://gujacpc.admissions.nic.in/" },
      COMMON_SOURCES.gseb,
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "SVNIT", "IIT Gandhi", "DAIICT", "Nirma", "PDPU", "GTU"],
  },

  "hotel-hospitality-and-tourism-management": {
    tagline: "People-first careers in food, travel and experiences.",
    overview:
      "Hospitality programmes in India fall into three buckets: government IHMs admitted through NCHMCT JEE (now NTA-administered), university BHM / BBA Hospitality degrees (CUET-UG or institute tests), and private specialised schools (Welcomgroup, Oberoi STEP, IIHM, ITM). Programmes typically include hands-on kitchen, F&B service, front-office and housekeeping rotations.\n\nCareer outcomes go well beyond hotels: airlines and cruise lines, QSR chains, event and wedding management, hospital and corporate facility management, culinary entrepreneurship, and tourism boards. Stamina, language skills and emotional resilience matter more than top-percentile academics.",
    whoFitsWell: [
      "Social + Enterprising + Conventional",
      "High Interpersonal + Bodily-Kinesthetic intelligence",
      "Comfortable on your feet for long shifts; love food/travel",
    ],
    hbkNote: "If HBK shows high Social + Enterprising, hospitality often beats a forced commerce/engineering path.",
    sources: [
      { label: "NCHMCT — National Council for Hotel Management & Catering Technology", url: "https://nchmct.nic.in/" },
      { label: "NCHM JEE (NTA)", url: "https://nchmjee.nta.nic.in/" },
      { label: "Ministry of Tourism, Govt. of India", url: "https://tourism.gov.in/" },
    ],
    gujaratHints: DEFAULT_GUJARAT_HINTS,
  },

  law: {
    tagline: "Argue, advise and shape the rules of society.",
    overview:
      "Law in India is regulated by the Bar Council of India (BCI). The dominant route after Class 12 is the 5-year integrated programme (BA LLB, BBA LLB, B.Com LLB, BSc LLB) at National Law Universities admitted through CLAT, plus AILET (NLU Delhi), LSAT-India, SET-Law (Symbiosis) and university-specific tests (NMIMS, CHRIST, Jindal). The traditional 3-year LLB (after any bachelor's) remains a strong second route, especially for late deciders.\n\nCareer outcomes go far beyond litigation: corporate law firms, in-house legal at companies, judiciary, civil services, policy think-tanks, journalism, sports/entertainment law, mediation and legal-tech. Gujarat National Law University (GNLU) in Gandhinagar is one of the top NLUs in the country.",
    whoFitsWell: [
      "Investigative + Social + Enterprising",
      "High Linguistic + Logical-Mathematical intelligence",
      "Strong reading stamina and willingness to argue both sides",
    ],
    hbkNote: "HBK helps Class 9–10 students start CLAT prep early — the exam rewards reading habits built over years, not last-minute coaching.",
    sources: [
      { label: "Bar Council of India (BCI)", url: "https://www.barcouncilofindia.org/" },
      { label: "CLAT — Consortium of NLUs", url: "https://consortiumofnlus.ac.in/" },
      { label: "AILET — NLU Delhi", url: "https://nationallawuniversitydelhi.in/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "GNLU", "Gujarat National Law"],
  },

  "liberal-studies": {
    tagline: "Choose your own combination across arts, sciences and design.",
    overview:
      "Liberal Studies / Liberal Arts is a relatively new but fast-growing UG model in India that lets you major + minor across disciplines (e.g. Economics + Computer Science, Psychology + Media Studies, History + Public Policy). Leading destinations include Ashoka, Krea, FLAME, Symbiosis, OP Jindal, Azim Premji University, NMIMS, Plaksha and several IITs' humanities and HSS programmes.\n\nAdmission is usually via CUET-UG, SAT, or institute-specific tests with interviews and statements of purpose. The model fits students who genuinely don't want to lock into one stream at 17, and who plan to go on to a master's or professional programme later.",
    whoFitsWell: [
      "Multi-modal: top-2 RIASEC types close in score",
      "High Linguistic + Interpersonal",
      "Self-driven readers who like writing essays",
    ],
    hbkNote: "If your HBK report shows no single dominant interest, liberal studies is often a better fit than picking randomly.",
    sources: [
      { label: "CUET-UG", url: "https://cuet.nta.nic.in/" },
      { label: "UGC", url: "https://www.ugc.gov.in/" },
      COMMON_SOURCES.moe,
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "Ahmedabad University", "Karnavati"],
  },

  "mass-communication-mass-media": {
    tagline: "Storytelling at scale — journalism, film, digital and PR.",
    overview:
      "Mass Communication covers journalism (print, broadcast, digital), film and TV production, advertising, public relations, corporate communication, content marketing and emerging creator-economy roles. Top entry routes: IIMC Delhi (IIMC entrance), Jamia Millia Islamia, ACJ Chennai, Symbiosis (SET), Christ, MICA Ahmedabad (postgraduate), Xavier Institute of Communications, plus university BJMC programmes via CUET-UG.\n\nThe field rewards a strong portfolio (writing samples, short films, podcasts, social audiences) more than raw marks. MICA in Ahmedabad is one of India's best-known schools for strategic marketing communication and is a Gujarat-based asset.",
    whoFitsWell: [
      "Artistic + Social + Enterprising",
      "High Linguistic + Interpersonal intelligence",
      "Already creating something publicly — blog, reels, podcast, school paper",
    ],
    hbkNote: "Start building a portfolio in Class 11 — HBK helps you pick projects that match the kind of media work you'll enjoy long-term.",
    sources: [
      { label: "IIMC — Indian Institute of Mass Communication", url: "https://iimc.gov.in/" },
      { label: "Jamia Millia Islamia AJK MCRC", url: "https://www.jmi.ac.in/" },
      { label: "MICA Ahmedabad", url: "https://www.mica.ac.in/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "MICA"],
  },

  "medicine-and-surgery": {
    tagline: "The long, demanding, deeply meaningful path of an Indian doctor.",
    overview:
      "MBBS in India is regulated by the National Medical Commission (NMC). The only admission route is NEET-UG, conducted by NTA. Seats are filled through All-India 15% (MCC) and state quotas (in Gujarat, by ACPC). The 5.5-year MBBS is followed by NEET-PG for specialisation, plus NEXT in the coming years.\n\nAdjacent careers without MBBS: BDS (dental), BAMS / BHMS / BUMS / BSMS (AYUSH), B.Sc Nursing (entry via NEET / state tests), paramedical and allied health (covered in a separate stream). Gujarat has a deep public-medical-college network (BJ Ahmedabad, MS Baroda, Smt. NHL, GMERS chain) plus growing private capacity.",
    whoFitsWell: [
      "Investigative + Social",
      "High Bodily-Kinesthetic + Naturalist intelligence",
      "Comfort with biology + chemistry; high stress tolerance",
    ],
    hbkNote: "HBK helps students realistically test their NEET commitment in Class 11 before sinking two years into a single-exam path.",
    sources: [
      { label: "NMC — National Medical Commission", url: "https://www.nmc.org.in/" },
      { label: "NEET-UG (NTA)", url: "https://neet.nta.nic.in/" },
      { label: "MCC — Medical Counselling Committee", url: "https://mcc.nic.in/" },
      { label: "ACPC Gujarat (Medical)", url: "https://medadmgujarat.org/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "BJ Medical", "GMERS", "Smt. NHL", "Pramukhswami"],
  },

  "paramedical-sciences": {
    tagline: "The clinical and diagnostic backbone of healthcare.",
    overview:
      "Paramedical and allied health sciences cover radiography & imaging, medical lab technology (MLT), operation theatre tech, optometry, dialysis tech, perfusion, anaesthesia tech, emergency medical tech, cardiac care tech, audiology & speech-language pathology, and more. Most B.Sc programmes are 3–4 years; admission is via NEET (for some), CUET-UG, state CETs or university-specific tests.\n\nDemand is strong and growing, with shorter study cycles than MBBS and clear hospital-employment pipelines. Several courses come under the National Commission for Allied and Healthcare Professions (NCAHP). For students who want healthcare without the NEET-PG marathon, this is an underrated, practical stream.",
    whoFitsWell: [
      "Realistic + Investigative + Social",
      "Steady hands, comfort with hospital settings",
      "Biology in Class 12 helps but isn't always required",
    ],
    hbkNote: "HBK shows you which paramedical specialisation matches your interest profile — radiology vs lab vs therapy roles feel very different day-to-day.",
    sources: [
      { label: "National Commission for Allied and Healthcare Professions (NCAHP)", url: "https://ncahp.abdm.gov.in/" },
      { label: "Indian Nursing Council", url: "https://www.indiannursingcouncil.org/" },
      { label: "NEET-UG (NTA)", url: "https://neet.nta.nic.in/" },
    ],
    gujaratHints: DEFAULT_GUJARAT_HINTS,
  },

  "performing-arts": {
    tagline: "Music, theatre, dance and film — trained, not just talented.",
    overview:
      "Performing Arts in India can be pursued through formal university programmes (BA / BPA in music, dance, theatre at BHU, Delhi University, MSU Baroda, MS University, Shantiniketan, Rabindra Bharati, FTII, SRFTI, NSD, KM Music Conservatory, Whistling Woods, AR Rahman's KM Music Conservatory) and through long-form guru-shishya training that runs in parallel.\n\nCareer outcomes include performance, music production, sound design, choreography, theatre directing, arts education, music therapy, film/OTT production roles, and increasingly the creator economy (YouTube musicians, indie artists). It is one of the few streams where consistent practice from Class 6–7 onwards genuinely changes outcomes.",
    whoFitsWell: [
      "Artistic + Social + Realistic",
      "Strong Musical / Bodily-Kinesthetic intelligence",
      "Already practising regularly outside school",
    ],
    hbkNote: "HBK helps families take performing-arts seriously as a career — with concrete college options instead of vague 'pursue your passion' talk.",
    sources: [
      { label: "NSD — National School of Drama", url: "https://nsd.gov.in/" },
      { label: "FTII — Film and Television Institute of India", url: "https://www.ftii.ac.in/" },
      { label: "SRFTI — Satyajit Ray Film & Television Institute", url: "https://srfti.ac.in/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "MSU Baroda", "Faculty of Performing Arts"],
  },

  "pure-sciences": {
    tagline: "Physics, chemistry, maths, biology — the foundation of everything.",
    overview:
      "B.Sc and integrated M.Sc programmes in pure sciences are the launchpad for research, academia, R&D, data science, actuarial work, scientific journalism and competitive exams (UPSC, ISRO, DRDO, BARC). Top entry routes: IISERs and IISc via IAT, NISER + CEBS via NEST, ICAR for life sciences, ISI for stats/maths, plus CUET-UG and state university merit lists.\n\nA pure-sciences degree pairs particularly well with a postgraduate qualification in a quant/data field. Gujarat's universities (MSU Baroda, Gujarat University, Saurashtra, Sardar Patel) offer credible B.Sc programmes; PRL Ahmedabad is a leading national lab for space and physical sciences.",
    whoFitsWell: [
      "Investigative + Realistic",
      "High Logical-Mathematical or Naturalist intelligence",
      "Curious by default — asks 'why' more than 'what'",
    ],
    hbkNote: "Pure sciences need a research mindset, not just good marks. HBK uses your aptitude pattern to flag genuine fit vs default fallback.",
    sources: [
      { label: "IISER Aptitude Test (IAT)", url: "https://www.iiseradmission.in/" },
      { label: "NEST — NISER + CEBS", url: "https://www.nestexam.in/" },
      { label: "IISc Bangalore", url: "https://www.iisc.ac.in/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "PRL", "Physical Research"],
  },

  "rehabilitation-sciences": {
    tagline: "Help people regain function, dignity and independence.",
    overview:
      "Rehabilitation Sciences include physiotherapy (BPT), occupational therapy (BOT), prosthetics & orthotics (BPO), speech-language pathology, audiology, clinical psychology, special education and developmental therapy. Most programmes are 4 to 4.5 years including internship, regulated variously by NCAHP, Rehabilitation Council of India (RCI), and state universities. Admission is via NEET / CUET-UG / state CETs / institute tests depending on the course.\n\nDemand is rising sharply with India's ageing population, road-trauma load and growing awareness of developmental disorders. Career settings span hospitals, sports academies, special schools, old-age and palliative care, corporate ergonomics and private practice.",
    whoFitsWell: [
      "Social + Investigative + Realistic",
      "High Interpersonal + Bodily-Kinesthetic intelligence",
      "Patience with slow, incremental progress",
    ],
    hbkNote: "Great fit if your HBK profile shows high Social + Realistic but you don't want the NEET-MBBS path.",
    sources: [
      { label: "Rehabilitation Council of India (RCI)", url: "https://www.rehabcouncil.nic.in/" },
      { label: "NCAHP", url: "https://ncahp.abdm.gov.in/" },
      { label: "AIIMS", url: "https://www.aiims.edu/" },
    ],
    gujaratHints: DEFAULT_GUJARAT_HINTS,
  },

  "sports-physical-education": {
    tagline: "Sport as a profession — coach, scientist, manager, athlete.",
    overview:
      "Beyond playing competitively, sport supports a wide professional ecosystem: physical education teaching (B.P.Ed / M.P.Ed via NCTE-recognised institutes), sports coaching (NIS Patiala diplomas), sports science / kinanthropometry, sports nutrition, sports management (IIM-B, Symbiosis, NSU Sonepat), sports journalism, physiotherapy, and esports.\n\nThe Lakshmibai National Institute of Physical Education (LNIPE) Gwalior, Sports Authority of India (SAI), and the new National Sports University (Manipur) anchor the public side. Gujarat's Swarnim Gujarat Sports University and the growing private academy network give regional pathways.",
    whoFitsWell: [
      "Realistic + Social + Enterprising",
      "High Bodily-Kinesthetic intelligence",
      "Already playing or training seriously",
    ],
    hbkNote: "HBK helps athletes plan a 'two-track' career — sport + a complementary degree — so neither track is left to chance.",
    sources: [
      { label: "Sports Authority of India (SAI)", url: "https://sportsauthorityofindia.nic.in/" },
      { label: "LNIPE Gwalior", url: "https://lnipe.edu.in/" },
      { label: "NCTE", url: "https://ncte.gov.in/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "Swarnim", "Sports University"],
  },

  "veterinary-and-fishery-sciences": {
    tagline: "Animal health, dairy, fisheries — a science-led rural-impact career.",
    overview:
      "Veterinary Science (BVSc & AH) in India is regulated by the Veterinary Council of India (VCI). Admission is largely via NEET-UG (15% All-India through VCI) plus state-quota counselling. Fishery Science (B.F.Sc) is a separate 4-year programme under ICAR-affiliated universities, with admission via ICAR AIEEA or state CETs.\n\nGraduates work in government veterinary hospitals, dairy co-operatives (Amul, NDDB Anand), poultry and aquaculture firms, wildlife conservation, pet clinics, pharma R&D and food safety. Gujarat — home to NDDB, Amul, Kamdhenu University, and the College of Veterinary Science at Anand and Navsari — is one of India's strongest states for this field.",
    whoFitsWell: [
      "Investigative + Realistic + Social",
      "High Naturalist + Bodily-Kinesthetic intelligence",
      "Comfortable working with animals and in rural settings",
    ],
    hbkNote: "If you love biology but find the MBBS competition crushing, veterinary or fishery science is a strong, under-discussed alternative.",
    sources: [
      { label: "Veterinary Council of India (VCI)", url: "https://vci.nic.in/" },
      { label: "ICAR", url: "https://icar.org.in/" },
      { label: "NDDB — National Dairy Development Board", url: "https://www.nddb.coop/" },
    ],
    gujaratHints: [...DEFAULT_GUJARAT_HINTS, "Kamdhenu", "Anand", "Navsari", "NDDB"],
  },
};

export function getOverview(slug: string): HandbookOverview | null {
  return HANDBOOK_OVERVIEWS[slug] ?? null;
}
