// Comprehensive directory of top Gujarat colleges, grouped by category.
// Used by the Career Guidance — Gujarat page.

export type CollegeCategory =
  | "engineering"
  | "medical"
  | "pharmacy"
  | "law"
  | "management"
  | "design-architecture"
  | "commerce"
  | "arts-science"
  | "agriculture"
  | "hotel-mass-comm"
  | "polytechnic-iti";

export interface GujCollege {
  name: string;
  city: string;
  type: "Government" | "Private" | "Government-Aided" | "Deemed" | "Central" | "State" | "Autonomous";
  established?: number;
  courses: string[];
  website?: string;
  notable?: string;
  feesRange?: string; // ₹ per year, indicative
  approxIntake?: string;
}

export interface CategoryGroup {
  id: CollegeCategory;
  title: string;
  titleGu: string;
  emoji: string;
  description: string;
  descriptionGu: string;
  /** Linked stream IDs for cross-navigation */
  streams: string[];
  /** Counselling / authority body */
  counselling?: string;
  colleges: GujCollege[];
}

export const GUJ_COLLEGES: CategoryGroup[] = [
  {
    id: "engineering",
    title: "Engineering & Technology",
    titleGu: "એન્જિનિયરિંગ અને ટેક્નોલોજી",
    emoji: "⚙️",
    description:
      "B.E. / B.Tech across Computer, IT, AI/ML, Mechanical, Civil, Electrical, Chemical, Electronics & semiconductor design. Admission via GUJCET + JEE Main → ACPC counselling.",
    descriptionGu:
      "B.E. / B.Tech — કમ્પ્યુટર, IT, AI/ML, મિકેનિકલ, સિવિલ, ઇલેક્ટ્રિકલ, કેમિકલ, ઇલેક્ટ્રોનિક્સ. પ્રવેશ: GUJCET + JEE Main → ACPC.",
    streams: ["science-pcm"],
    counselling: "ACPC (jacpcldce.ac.in)",
    colleges: [
      {
        name: "IIT Gandhinagar",
        city: "Palaj, Gandhinagar",
        type: "Central",
        established: 2008,
        courses: ["B.Tech (CSE, EE, ME, CL, MSME, BSBE)", "M.Tech", "PhD"],
        website: "iitgn.ac.in",
        notable: "Top-ranked IIT in Gujarat. NIRF Engineering Top 25.",
        feesRange: "₹2.25 L/year",
        approxIntake: "~300 B.Tech seats",
      },
      {
        name: "SVNIT Surat",
        city: "Surat",
        type: "Central",
        established: 1961,
        courses: ["B.Tech (CSE, IT, ECE, EE, ME, CE, CL)", "M.Tech", "MBA"],
        website: "svnit.ac.in",
        notable: "Premier NIT; strong placements (avg ₹12 LPA).",
        feesRange: "₹1.5 L/year",
        approxIntake: "~900 B.Tech seats",
      },
      {
        name: "DA-IICT (Dhirubhai Ambani ICT)",
        city: "Gandhinagar",
        type: "Deemed",
        established: 2001,
        courses: ["B.Tech ICT", "B.Tech Maths & Computing", "M.Tech", "MSc IT"],
        website: "daiict.ac.in",
        notable: "ICT specialised; recruiters: Microsoft, Goldman Sachs, Adobe.",
        feesRange: "₹3 L/year",
      },
      {
        name: "PDEU (Pandit Deendayal Energy University)",
        city: "Gandhinagar",
        type: "Private",
        established: 2007,
        courses: ["B.Tech (Petroleum, Mechanical, CSE, ICT)", "MBA", "Law"],
        website: "pdpu.ac.in",
        notable: "India's only energy-focused university; strong for petroleum.",
        feesRange: "₹2.5–3.5 L/year",
      },
      {
        name: "Nirma University — Institute of Technology",
        city: "Ahmedabad",
        type: "Private",
        established: 1995,
        courses: ["B.Tech (CSE, IT, EE, ME, CE, CL)", "M.Tech"],
        website: "nirmauni.ac.in",
        notable: "Consistently among top private engineering colleges in India.",
        feesRange: "₹2.5 L/year",
      },
      {
        name: "IIIT Vadodara",
        city: "Gandhinagar (campus shifted)",
        type: "Central",
        established: 2013,
        courses: ["B.Tech CSE", "B.Tech ECE", "M.Tech"],
        website: "iiitvadodara.ac.in",
        notable: "Public-Private IIIT; recruited by TCS, Infosys, Amazon.",
        feesRange: "₹1.5–2 L/year",
      },
      {
        name: "L. D. College of Engineering",
        city: "Ahmedabad",
        type: "Government",
        established: 1948,
        courses: ["B.E. (15+ branches)", "M.E.", "PhD"],
        website: "ldce.ac.in",
        notable: "Largest govt engineering college in Gujarat; very low fees.",
        feesRange: "₹15,000/year",
        approxIntake: "~1,200 seats",
      },
      {
        name: "Government Engineering College, Gandhinagar",
        city: "Gandhinagar",
        type: "Government",
        established: 2004,
        courses: ["B.E. (CSE, IT, ECE, ME, CE, EE)"],
        website: "gecg28.ac.in",
        feesRange: "₹15,000/year",
      },
      {
        name: "Government Engineering College, Rajkot",
        city: "Rajkot",
        type: "Government",
        established: 2004,
        courses: ["B.E. (CSE, IT, ECE, ME, CE, EE, ENC)"],
        website: "gecrajkot.ac.in",
        feesRange: "₹15,000/year",
      },
      {
        name: "Vishwakarma Government Engineering College",
        city: "Chandkheda, Ahmedabad",
        type: "Government",
        established: 1994,
        courses: ["B.E. (CSE, IT, EC, EE, ME, CE, IC, BME)"],
        website: "vgecg.ac.in",
      },
      {
        name: "Birla Vishvakarma Mahavidyalaya (BVM)",
        city: "Vallabh Vidyanagar, Anand",
        type: "Government-Aided",
        established: 1948,
        courses: ["B.E. (10+ branches)", "M.E."],
        website: "bvmengineering.ac.in",
        notable: "Among the oldest engineering colleges in western India.",
      },
      {
        name: "Sardar Vallabhbhai Patel Institute of Technology (SVIT)",
        city: "Vasad, Anand",
        type: "Private",
        established: 1998,
        courses: ["B.E. (CSE, IT, EC, EE, ME, CE, AERO)"],
        website: "svitvasad.ac.in",
      },
      {
        name: "Charotar University of Science & Technology (CHARUSAT)",
        city: "Changa, Anand",
        type: "Private",
        established: 2009,
        courses: ["B.Tech (CSE, IT, CE, ME, EC, EE)", "Pharmacy", "Computer Apps"],
        website: "charusat.ac.in",
      },
      {
        name: "Marwadi University",
        city: "Rajkot",
        type: "Private",
        established: 2008,
        courses: ["B.Tech (CSE, IT, ECE, ME, CE, EE)", "MBA", "Pharmacy"],
        website: "marwadiuniversity.ac.in",
      },
      {
        name: "Parul University — Faculty of Engineering",
        city: "Vadodara",
        type: "Private",
        established: 2009,
        courses: ["B.Tech (20+ branches)", "Pharmacy", "Medicine"],
        website: "paruluniversity.ac.in",
      },
      {
        name: "GTU (Gujarat Technological University) — affiliated colleges",
        city: "Ahmedabad (HQ); 400+ affiliated colleges statewide",
        type: "State",
        established: 2007,
        courses: ["B.E. / B.Tech / M.E. / Pharmacy / MBA / MCA / Architecture"],
        website: "gtu.ac.in",
        notable: "State-wide affiliating university for technical education.",
      },
    ],
  },

  {
    id: "medical",
    title: "Medical (MBBS, BDS, AYUSH, Veterinary)",
    titleGu: "મેડિકલ (MBBS, BDS, આયુષ, વેટરનરી)",
    emoji: "🩺",
    description:
      "MBBS, BDS, BAMS, BHMS, BUMS, B.V.Sc admissions via NEET-UG → ACPC (state) / MCC (15% AIQ). Gujarat has 30+ MBBS colleges with ~5,400 seats.",
    descriptionGu:
      "MBBS, BDS, BAMS, BHMS, B.V.Sc — પ્રવેશ NEET-UG → ACPC (રાજ્ય) / MCC (AIQ 15%). ગુજરાતમાં 30+ MBBS કોલેજો, ~5,400 સીટો.",
    streams: ["science-pcb"],
    counselling: "ACPC Medical (medadmgujarat.org); MCC for 15% AIQ",
    colleges: [
      {
        name: "AIIMS Rajkot",
        city: "Rajkot",
        type: "Central",
        established: 2020,
        courses: ["MBBS", "Nursing"],
        website: "aiimsrajkot.edu.in",
        notable: "Newest AIIMS in Gujarat; ~125 MBBS seats; central counselling.",
        feesRange: "₹6,000/year",
      },
      {
        name: "B. J. Medical College",
        city: "Ahmedabad",
        type: "Government",
        established: 1946,
        courses: ["MBBS", "MD/MS (50+ specialties)"],
        website: "bjmcabad.edu.in",
        notable: "Attached to Civil Hospital — Asia's largest hospital complex; ~250 MBBS seats.",
        feesRange: "₹6,000/year",
      },
      {
        name: "Government Medical College, Surat",
        city: "Surat",
        type: "Government",
        established: 1964,
        courses: ["MBBS", "MD/MS"],
        website: "gmcsurat.edu.in",
        feesRange: "₹6,000/year",
        approxIntake: "250 MBBS",
      },
      {
        name: "M. P. Shah Government Medical College",
        city: "Jamnagar",
        type: "Government",
        established: 1955,
        courses: ["MBBS", "MD/MS"],
        website: "mpshahmedicalcollege.in",
        feesRange: "₹6,000/year",
      },
      {
        name: "Government Medical College, Bhavnagar",
        city: "Bhavnagar",
        type: "Government",
        established: 1995,
        courses: ["MBBS", "MD/MS"],
        feesRange: "₹6,000/year",
      },
      {
        name: "Pandit Deendayal Upadhyay Medical College",
        city: "Rajkot",
        type: "Government",
        established: 1995,
        courses: ["MBBS", "MD/MS"],
        feesRange: "₹6,000/year",
      },
      {
        name: "Medical College Vadodara (Sir Sayajirao General Hospital)",
        city: "Vadodara",
        type: "Government",
        established: 1949,
        courses: ["MBBS", "MD/MS"],
        website: "medicalcollegebaroda.edu.in",
      },
      {
        name: "GMERS (Gujarat Medical Education & Research Society) Colleges",
        city: "Gandhinagar, Sola, Vadnagar, Junagadh, Patan, Valsad, Himmatnagar, Gotri",
        type: "State",
        established: 2011,
        courses: ["MBBS"],
        website: "gmers.ac.in",
        notable: "8 govt-society colleges; ~1,400 MBBS seats; mid-range fees.",
        feesRange: "₹3.3 L/year (govt quota); ~₹14 L (mgmt quota)",
      },
      {
        name: "Smt. NHL Municipal Medical College",
        city: "Ahmedabad",
        type: "Government",
        established: 1963,
        courses: ["MBBS", "MD/MS"],
        notable: "AMC-run; attached to V. S. Hospital.",
      },
      {
        name: "Pramukhswami Medical College",
        city: "Karamsad, Anand",
        type: "Private",
        established: 1987,
        courses: ["MBBS", "MD/MS"],
        notable: "Top private medical college in Gujarat; trust-run.",
      },
      {
        name: "Government Dental College & Hospital",
        city: "Ahmedabad",
        type: "Government",
        established: 1961,
        courses: ["BDS", "MDS"],
        website: "gdcha.org",
        feesRange: "₹6,000/year",
      },
      {
        name: "Institute of Teaching & Research in Ayurveda (ITRA)",
        city: "Jamnagar",
        type: "Central",
        established: 2020,
        courses: ["BAMS", "MD (Ayurveda)", "PhD"],
        website: "itra.edu.in",
        notable: "INI status; foremost Ayurveda institute in India.",
      },
      {
        name: "Kamdhenu University (Veterinary)",
        city: "Gandhinagar (HQ)",
        type: "State",
        established: 2009,
        courses: ["B.V.Sc & A.H.", "Dairy Tech", "Fishery"],
        website: "ku.edu.in",
        notable: "State veterinary university; campuses at Anand, Junagadh, Navsari.",
      },
    ],
  },

  {
    id: "pharmacy",
    title: "Pharmacy & Paramedical",
    titleGu: "ફાર્મસી અને પેરામેડિકલ",
    emoji: "💊",
    description:
      "B.Pharm, D.Pharm, Pharm.D and BPT/BSc Nursing/MLT. Admission via GUJCET / GPAT (PG) / direct + ACPC counselling.",
    descriptionGu:
      "B.Pharm, D.Pharm, Pharm.D, BPT, BSc નર્સિંગ. પ્રવેશ: GUJCET / GPAT (PG) / સીધી + ACPC.",
    streams: ["science-pcb", "science-pcm"],
    counselling: "ACPC Pharmacy",
    colleges: [
      {
        name: "L. M. College of Pharmacy",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 1947,
        courses: ["B.Pharm", "M.Pharm", "Pharm.D", "PhD"],
        website: "lmcp.in",
        notable: "Among India's top 10 pharmacy colleges (NIRF).",
        feesRange: "₹50,000/year",
      },
      {
        name: "NIPER Ahmedabad",
        city: "Gandhinagar",
        type: "Central",
        established: 2007,
        courses: ["M.S. Pharm", "M.Pharm", "MBA Pharma", "PhD"],
        website: "niperahm.res.in",
        notable: "National Institute of Pharmaceutical Education & Research.",
      },
      {
        name: "K. B. Institute of Pharmaceutical Education & Research",
        city: "Gandhinagar",
        type: "Private",
        established: 1996,
        courses: ["B.Pharm", "M.Pharm"],
      },
      {
        name: "Anand Pharmacy College",
        city: "Anand",
        type: "Private",
        established: 1996,
        courses: ["B.Pharm", "M.Pharm", "Pharm.D"],
      },
      {
        name: "Nirma University — Institute of Pharmacy",
        city: "Ahmedabad",
        type: "Private",
        established: 2003,
        courses: ["B.Pharm", "M.Pharm"],
      },
      {
        name: "Maliba Pharmacy College (UTU)",
        city: "Bardoli, Surat",
        type: "Private",
        established: 2004,
        courses: ["B.Pharm", "M.Pharm"],
      },
      {
        name: "Government Polytechnic for Pharmacy / Nursing colleges",
        city: "Ahmedabad, Vadodara, Rajkot, Surat (Govt schools)",
        type: "Government",
        courses: ["D.Pharm", "GNM", "BSc Nursing", "BPT"],
        notable: "Govt-run; very low fees (~₹8–20k/year).",
      },
    ],
  },

  {
    id: "law",
    title: "Law (LLB / Integrated Law)",
    titleGu: "કાયદો (LLB / સંકલિત કાયદો)",
    emoji: "⚖️",
    description:
      "5-yr integrated BA/BBA/B.Com LLB via CLAT (NLU), AILET, GNLU's own test, LSAT. 3-yr LLB via state direct admission after graduation.",
    descriptionGu:
      "5-વર્ષીય સંકલિત BA/BBA/B.Com LLB — CLAT, AILET, GNLU પરીક્ષા, LSAT. 3-વર્ષીય LLB — ગ્રેજ્યુએશન પછી.",
    streams: ["humanities", "commerce", "science-pcm"],
    counselling: "CLAT (consortiumofnlus.ac.in); state direct admission for 3-yr LLB",
    colleges: [
      {
        name: "Gujarat National Law University (GNLU)",
        city: "Gandhinagar",
        type: "State",
        established: 2003,
        courses: ["BA LLB (Hons)", "BCom LLB (Hons)", "BBA LLB", "BSc LLB", "LLM", "PhD"],
        website: "gnlu.ac.in",
        notable: "Top-5 NLU in India; recruits with AZB, Trilegal, Khaitan, S&R.",
        feesRange: "₹2.5–3 L/year",
      },
      {
        name: "Institute of Law, Nirma University",
        city: "Ahmedabad",
        type: "Private",
        established: 2007,
        courses: ["BA LLB (Hons)", "BCom LLB (Hons)", "LLM"],
        website: "nirmauni.ac.in",
        notable: "Consistently among top 10 private law schools in India.",
      },
      {
        name: "Faculty of Law, MS University Baroda",
        city: "Vadodara",
        type: "Government",
        established: 1949,
        courses: ["3-yr LLB", "5-yr BA LLB", "LLM"],
        website: "msubaroda.ac.in",
        feesRange: "Very low (govt fees)",
      },
      {
        name: "GLS Law College",
        city: "Ahmedabad",
        type: "Private",
        established: 2014,
        courses: ["3-yr LLB", "5-yr BA/BBA/BCom LLB"],
        website: "glslaw.in",
      },
      {
        name: "Auro University — School of Law",
        city: "Surat",
        type: "Private",
        established: 2011,
        courses: ["BA LLB", "BBA LLB", "LLM"],
        website: "aurouniversity.edu.in",
      },
      {
        name: "Sir L. A. Shah Law College",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 1927,
        courses: ["3-yr LLB"],
        notable: "Oldest law college in Gujarat.",
      },
      {
        name: "Karnavati University — UWSL",
        city: "Gandhinagar",
        type: "Private",
        established: 2017,
        courses: ["BA LLB (Hons)", "BBA LLB (Hons)"],
      },
    ],
  },

  {
    id: "management",
    title: "Management (BBA / Integrated MBA / MBA)",
    titleGu: "મેનેજમેન્ટ (BBA / સંકલિત MBA)",
    emoji: "💼",
    description:
      "BBA, Integrated 5-yr MBA (IPM/IPMAT), and PGDM/MBA at India's top business schools located in Gujarat — including IIM Ahmedabad.",
    descriptionGu:
      "BBA, સંકલિત 5-વર્ષીય MBA (IPMAT), અને PGDM/MBA — IIM અમદાવાદ સહિત ગુજરાતમાં ભારતની ટોચની બિઝનેસ સ્કૂલો.",
    streams: ["commerce", "humanities", "science-pcm"],
    counselling: "CAT/IPMAT/CMAT for MBA; direct + entrance for BBA",
    colleges: [
      {
        name: "IIM Ahmedabad",
        city: "Ahmedabad",
        type: "Central",
        established: 1961,
        courses: ["MBA (PGP)", "PGP-FABM", "PGPX", "PhD"],
        website: "iima.ac.in",
        notable: "India's #1 B-school (NIRF); avg placement ~₹35 LPA.",
        feesRange: "₹25 L/year (MBA)",
      },
      {
        name: "MICA (Mudra Institute of Communications)",
        city: "Ahmedabad",
        type: "Private",
        established: 1991,
        courses: ["PGDM-C (Communications)", "PGDM"],
        website: "mica.ac.in",
        notable: "India's foremost school for marketing & communications.",
      },
      {
        name: "Institute of Management, Nirma University",
        city: "Ahmedabad",
        type: "Private",
        established: 1996,
        courses: ["MBA", "MBA-FT/PT", "PhD"],
        website: "imnu.ac.in",
        notable: "Top 50 NIRF Management.",
      },
      {
        name: "School of Petroleum Management, PDEU",
        city: "Gandhinagar",
        type: "Private",
        established: 2006,
        courses: ["MBA (Energy & Infra)", "MBA"],
      },
      {
        name: "Faculty of Management Studies, MSU Baroda",
        city: "Vadodara",
        type: "Government",
        established: 1950,
        courses: ["MBA", "MBA-FS"],
        website: "msubaroda.ac.in",
      },
      {
        name: "GLS University — Faculty of Business Administration",
        city: "Ahmedabad",
        type: "Private",
        established: 2015,
        courses: ["BBA", "Integrated BBA-MBA", "MBA"],
      },
      {
        name: "B. K. School of Business Management",
        city: "Ahmedabad",
        type: "Government",
        established: 1976,
        courses: ["MBA"],
        notable: "Gujarat University's flagship MBA school.",
      },
      {
        name: "IRMA (Institute of Rural Management)",
        city: "Anand",
        type: "Autonomous",
        established: 1979,
        courses: ["PGDM (Rural Mgmt)", "FPM"],
        website: "irma.ac.in",
        notable: "Founded by Dr. Verghese Kurien; rural management leader.",
      },
    ],
  },

  {
    id: "design-architecture",
    title: "Design, Architecture & Planning",
    titleGu: "ડિઝાઇન, આર્કિટેક્ચર અને પ્લાનિંગ",
    emoji: "🎨",
    description:
      "B.Des / B.Arch / Planning. Admission via NID DAT, NIFT, UCEED, NATA, JEE Paper 2.",
    descriptionGu:
      "B.Des / B.Arch / Planning — પ્રવેશ: NID DAT, NIFT, UCEED, NATA, JEE Paper 2.",
    streams: ["science-pcm", "humanities", "vocational"],
    counselling: "NID, NIFT, JoSAA (B.Arch), CEPT direct",
    colleges: [
      {
        name: "National Institute of Design (NID) Ahmedabad",
        city: "Paldi, Ahmedabad",
        type: "Autonomous",
        established: 1961,
        courses: ["B.Des (8 disciplines)", "M.Des", "GDPD"],
        website: "nid.edu",
        notable: "India's #1 design school; founded by Eames brothers.",
        feesRange: "₹3 L/year",
      },
      {
        name: "NID Gandhinagar",
        city: "Gandhinagar",
        type: "Autonomous",
        established: 2004,
        courses: ["B.Des (Apparel, Lifestyle, R&D)", "M.Des"],
        website: "nid.edu",
      },
      {
        name: "CEPT University",
        city: "Ahmedabad",
        type: "Private",
        established: 1962,
        courses: ["B.Arch", "B.Plan", "B.Des (Interior, ID, FA)", "M.Arch", "M.Plan"],
        website: "cept.ac.in",
        notable: "India's top architecture school; founded by B. V. Doshi (Pritzker laureate).",
        feesRange: "₹3.7 L/year",
      },
      {
        name: "NIFT Gandhinagar",
        city: "Gandhinagar",
        type: "Central",
        established: 1995,
        courses: ["B.Des (FD, T&D, Acc, KD, FC, LD)", "B.FTech", "M.Des", "M.FM"],
        website: "nift.ac.in",
        notable: "National Institute of Fashion Technology — Gujarat campus.",
      },
      {
        name: "Faculty of Architecture, MSU Baroda",
        city: "Vadodara",
        type: "Government",
        established: 1950,
        courses: ["B.Arch", "M.Arch", "B.Des (Interior)"],
        website: "msubaroda.ac.in",
      },
      {
        name: "School of Architecture, Nirma University",
        city: "Ahmedabad",
        type: "Private",
        established: 2014,
        courses: ["B.Arch", "M.Arch"],
      },
      {
        name: "Anant National University",
        city: "Ahmedabad",
        type: "Private",
        established: 2016,
        courses: ["B.Arch", "B.Des (Climate, Fashion, Comm.)", "MFAB"],
        website: "anu.edu.in",
        notable: "India's first DesignX university (sustainability-focused).",
      },
      {
        name: "Faculty of Fine Arts, MSU Baroda",
        city: "Vadodara",
        type: "Government",
        established: 1950,
        courses: ["BFA", "MFA (Painting, Sculpture, Graphics, Applied Art)"],
        notable: "India's most acclaimed fine-arts faculty.",
      },
    ],
  },

  {
    id: "commerce",
    title: "Commerce, CA, CS & Finance",
    titleGu: "વાણિજ્ય, CA, CS અને ફાઇનાન્સ",
    emoji: "📊",
    description:
      "B.Com / BBA / BAF / BBI alongside CA (ICAI), CS (ICSI), CMA (ICAI-CMA), and finance specialisations.",
    descriptionGu:
      "B.Com / BBA / BAF — સાથે CA (ICAI), CS (ICSI), CMA (ICAI-CMA) અને ફાઇનાન્સ સ્પેશ્યલાઇઝેશન.",
    streams: ["commerce"],
    counselling: "Direct (most colleges); CUET-UG for central/some private; CA/CS/CMA via professional bodies",
    colleges: [
      {
        name: "H. L. Institute of Commerce",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 1937,
        courses: ["B.Com", "BBA", "M.Com"],
        notable: "Among Gujarat's oldest and most respected commerce colleges.",
      },
      {
        name: "St. Xavier's College — Commerce",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 1955,
        courses: ["B.Com", "BBA", "BCA"],
        website: "sxca.edu.in",
      },
      {
        name: "GLS University (B.Com / BBA / BBA-FS)",
        city: "Ahmedabad",
        type: "Private",
        established: 2015,
        courses: ["B.Com", "BBA (Honours / FS / Digital Mktg)", "Integrated BBA-MBA"],
        website: "glsuniversity.ac.in",
      },
      {
        name: "Bhavan's Sheth R. A. College of Commerce",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 1966,
        courses: ["B.Com", "M.Com"],
      },
      {
        name: "M. S. University Baroda — Faculty of Commerce",
        city: "Vadodara",
        type: "Government",
        established: 1949,
        courses: ["B.Com", "BBA", "M.Com", "MBA-FS"],
        feesRange: "Very low (govt fees)",
      },
      {
        name: "Saurashtra University — Department of Commerce",
        city: "Rajkot",
        type: "State",
        courses: ["B.Com", "M.Com", "Integrated B.Com LLB"],
      },
      {
        name: "ICAI Ahmedabad Branch (Chartered Accountancy)",
        city: "Ahmedabad",
        type: "Autonomous",
        courses: ["CA Foundation / Inter / Final"],
        website: "icai.org",
        notable: "One of India's largest CA branches; coaching + exams here.",
      },
      {
        name: "ICSI Ahmedabad Chapter (Company Secretary)",
        city: "Ahmedabad",
        type: "Autonomous",
        courses: ["CSEET / CS Executive / CS Professional"],
        website: "icsi.edu",
      },
    ],
  },

  {
    id: "arts-science",
    title: "Arts, Humanities & Pure Sciences",
    titleGu: "કળા, માનવવિદ્યા અને શુદ્ધ વિજ્ઞાન",
    emoji: "📚",
    description:
      "BA / B.Sc / BSW / BJMC / BFA / BPA / Languages — at general universities and arts/science colleges.",
    descriptionGu:
      "BA / B.Sc / BSW / BJMC / BFA / BPA / ભાષાઓ — સામાન્ય યુનિવર્સિટીઓ અને કોલેજો.",
    streams: ["humanities", "science-pcm", "science-pcb"],
    counselling: "CUET-UG (central) / direct (state)",
    colleges: [
      {
        name: "St. Xavier's College",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 1955,
        courses: ["BA", "B.Sc (Phy/Chem/Maths/Bio/Bot/Zoo/Micro/Biotech)", "BCA", "MA/M.Sc"],
        website: "sxca.edu.in",
        notable: "Best-rated arts & science college in Gujarat.",
      },
      {
        name: "Gujarat University",
        city: "Ahmedabad",
        type: "State",
        established: 1949,
        courses: ["BA / B.Sc / B.Com / Languages / Performing Arts (300+ programs)"],
        website: "gujaratuniversity.ac.in",
      },
      {
        name: "M. S. University of Baroda",
        city: "Vadodara",
        type: "Government",
        established: 1949,
        courses: ["13 Faculties: Arts, Science, Fine Arts, Performing Arts, Education, Social Work, Family Sciences, Tech, Commerce, Law, Medicine, Pharmacy, J&MC"],
        website: "msubaroda.ac.in",
        notable: "Gujarat's largest residential university; English-medium.",
      },
      {
        name: "M. G. Science Institute",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 1949,
        courses: ["B.Sc / M.Sc (Phy, Chem, Maths, Bio, Botany, Zoology, Microbio)"],
      },
      {
        name: "Bhavan's College",
        city: "Ahmedabad",
        type: "Government-Aided",
        courses: ["B.Sc", "B.Com", "BBA", "BCA"],
      },
      {
        name: "Saurashtra University",
        city: "Rajkot",
        type: "State",
        established: 1967,
        courses: ["BA / B.Sc / B.Com / Languages / Library Science"],
        website: "saurashtrauniversity.edu",
      },
      {
        name: "Sardar Patel University",
        city: "Vallabh Vidyanagar, Anand",
        type: "State",
        established: 1955,
        courses: ["BA / B.Sc / B.Com / Languages"],
        website: "spuvvn.edu",
      },
      {
        name: "Veer Narmad South Gujarat University",
        city: "Surat",
        type: "State",
        established: 1965,
        courses: ["BA / B.Sc / B.Com / Languages / J&MC"],
        website: "vnsgu.ac.in",
      },
      {
        name: "Hemchandracharya North Gujarat University",
        city: "Patan",
        type: "State",
        established: 1986,
        courses: ["BA / B.Sc / B.Com / B.Pharm / Library Sc"],
        website: "ngu.ac.in",
      },
      {
        name: "Krantiguru Shyamji Krishna Verma Kachchh University",
        city: "Bhuj, Kachchh",
        type: "State",
        established: 2003,
        courses: ["BA / B.Sc / B.Com / Earth Sciences"],
      },
      {
        name: "Indian Institute of Teacher Education (IITE)",
        city: "Gandhinagar",
        type: "State",
        established: 2010,
        courses: ["B.Ed integrated (4-yr ITEP)", "M.Ed", "PhD"],
        website: "iite.ac.in",
      },
      {
        name: "Children's University",
        city: "Gandhinagar",
        type: "State",
        established: 2009,
        courses: ["BA / MA Child Dev, Early Childhood Care & Edu"],
      },
    ],
  },

  {
    id: "agriculture",
    title: "Agriculture, Dairy & Fisheries",
    titleGu: "કૃષિ, ડેરી અને મત્સ્યઉદ્યોગ",
    emoji: "🌾",
    description:
      "B.Sc Agri / Horti / Forestry / Dairy Tech / Fishery / B.V.Sc — admission via ICAR AIEEA / GUJCET / state counselling.",
    descriptionGu:
      "B.Sc કૃષિ / બાગાયત / વન / ડેરી ટેક્નોલોજી / મત્સ્ય / B.V.Sc — ICAR AIEEA / GUJCET / રાજ્ય કાઉન્સેલિંગ.",
    streams: ["science-pcb", "vocational"],
    counselling: "ICAR AIEEA-UG (15% AIQ), state counselling (85%)",
    colleges: [
      {
        name: "Anand Agricultural University (AAU)",
        city: "Anand",
        type: "State",
        established: 2004,
        courses: ["B.Sc Agri/Horti/Forestry", "Dairy Tech", "Food Tech", "Agri Engg"],
        website: "aau.in",
        notable: "Gujarat's premier agri university; cradle of White Revolution.",
      },
      {
        name: "Junagadh Agricultural University",
        city: "Junagadh",
        type: "State",
        established: 2004,
        courses: ["B.Sc Agri/Horti/Forestry", "Fisheries (Veraval)"],
        website: "jau.in",
      },
      {
        name: "Navsari Agricultural University",
        city: "Navsari",
        type: "State",
        established: 2004,
        courses: ["B.Sc Agri/Horti/Forestry", "Agri Engg"],
        website: "nau.in",
      },
      {
        name: "Sardarkrushinagar Dantiwada Agricultural University",
        city: "S. K. Nagar, Banaskantha",
        type: "State",
        established: 2004,
        courses: ["B.Sc Agri/Horti/Forestry", "Agri Engg"],
        website: "sdau.edu.in",
      },
      {
        name: "Kamdhenu University (Veterinary & Animal Husbandry)",
        city: "Gandhinagar (HQ)",
        type: "State",
        established: 2009,
        courses: ["B.V.Sc & A.H.", "Dairy Tech", "Fishery"],
        website: "ku.edu.in",
      },
      {
        name: "Indian Institute of Forest Management (IIFM) — campus partnerships",
        city: "Gandhinagar (Forest Training Institute)",
        type: "State",
        courses: ["Diploma in Forestry / Forest Guard"],
      },
    ],
  },

  {
    id: "hotel-mass-comm",
    title: "Hotel Mgmt, Mass Comm. & Liberal Arts",
    titleGu: "હોટેલ મેનેજમેન્ટ, માસ કોમ્યુનિકેશન અને ઉદાર કળા",
    emoji: "🎬",
    description:
      "BHMCT, BJMC, BA Liberal Arts/Film/Mass Media — admission via NCHM JEE / direct / CUET / institute test.",
    descriptionGu:
      "BHMCT, BJMC, BA Liberal Arts / ફિલ્મ / માસ મીડિયા — NCHM JEE / સીધી / CUET / સંસ્થા પરીક્ષા.",
    streams: ["humanities", "vocational", "commerce"],
    colleges: [
      {
        name: "Institute of Hotel Management (IHM) Ahmedabad",
        city: "Gandhinagar",
        type: "Government",
        established: 1996,
        courses: ["B.Sc HHA", "Diploma in F&B / Bakery"],
        website: "ihmahmedabad.com",
        notable: "Central govt-affiliated; admission via NCHM JEE.",
        feesRange: "₹95,000/year",
      },
      {
        name: "MICA (Strategic Marketing & Comm.)",
        city: "Ahmedabad",
        type: "Private",
        established: 1991,
        courses: ["PGDM-C", "PGDM"],
        website: "mica.ac.in",
      },
      {
        name: "Mudra Institute of Communications — UG",
        city: "Ahmedabad",
        type: "Private",
        courses: ["BA (Communications, Liberal Arts)"],
      },
      {
        name: "Institute of Mass Communication, Film & Television Studies (Gujarat Vidyapith)",
        city: "Ahmedabad",
        type: "Government-Aided",
        established: 2008,
        courses: ["BA / MA J&MC", "PG Diploma Film & TV"],
      },
      {
        name: "Karnavati University — School of Liberal Studies",
        city: "Gandhinagar",
        type: "Private",
        established: 2017,
        courses: ["BA (Hons) Liberal Arts", "BA Psychology", "BA Film & TV"],
        website: "karnavatiuniversity.edu.in",
      },
      {
        name: "FLAME-style Liberal Programs — Anant National Univ., Auro Univ.",
        city: "Ahmedabad / Surat",
        type: "Private",
        courses: ["BA Liberal Arts", "BSc Psychology", "BBA-Liberal"],
      },
    ],
  },

  {
    id: "polytechnic-iti",
    title: "Polytechnic (Diploma) & ITI / Skill",
    titleGu: "પોલિટેક્નિક (ડિપ્લોમા) અને ITI / કૌશલ્ય",
    emoji: "🛠️",
    description:
      "3-yr Diploma Engineering after Class 10 (admission via ACPDC) and 1–2 yr ITI trades. Strong vocational route in Gujarat.",
    descriptionGu:
      "ધોરણ 10 પછી 3-વર્ષીય ડિપ્લોમા એન્જિનિયરિંગ (ACPDC) અને 1–2 વર્ષનાં ITI ટ્રેડ. ગુજરાતમાં મજબૂત વ્યાવસાયિક માર્ગ.",
    streams: ["vocational", "science-pcm"],
    counselling: "ACPDC (gujacpc.admissions.nic.in) for Diploma; itiadmission.gujarat.gov.in for ITI",
    colleges: [
      {
        name: "Government Polytechnic Ahmedabad",
        city: "Ahmedabad",
        type: "Government",
        established: 1956,
        courses: ["Diploma (CSE, IT, EC, EE, Mech, Civil, Auto, Chem, Plastic)"],
        feesRange: "₹3,000/year",
      },
      {
        name: "Sir Bhavsinhji Polytechnic Institute",
        city: "Bhavnagar",
        type: "Government",
        established: 1924,
        courses: ["Diploma Engg (multi-branch)"],
        notable: "One of India's oldest polytechnics.",
      },
      {
        name: "R. C. Technical Institute",
        city: "Sola, Ahmedabad",
        type: "Government",
        courses: ["Diploma Engg", "Civil/Mech/EE/EC"],
      },
      {
        name: "Government Polytechnic Rajkot / Surat / Vadodara / Junagadh",
        city: "Multiple cities",
        type: "Government",
        courses: ["Diploma Engg (all branches)"],
        feesRange: "₹3,000/year",
      },
      {
        name: "Industrial Training Institutes (ITIs) — 600+ across Gujarat",
        city: "Statewide (every district)",
        type: "Government",
        courses: ["Fitter, Electrician, Welder, COPA, Mechanic, Plumber, Tailor, Stenographer, etc. (130+ trades)"],
        website: "itiadmission.gujarat.gov.in",
        notable: "Gujarat has the highest number of govt ITIs in India.",
        feesRange: "₹1,000–4,000/year",
      },
      {
        name: "Skill India centres / PMKVY hubs",
        city: "Statewide",
        type: "Government",
        courses: ["Short-term skill courses (3–12 months) — IT, healthcare, BFSI, retail, beauty, tourism"],
        website: "kaushalyauniversity.gujarat.gov.in",
      },
      {
        name: "Kaushalya — The Skill University",
        city: "Ahmedabad",
        type: "State",
        established: 2021,
        courses: ["Diploma / Degree / PG in skill-led trades"],
        website: "kaushalyauniversity.gujarat.gov.in",
        notable: "India's first state skill university.",
      },
    ],
  },
];

// Quick stats for the hero
export const GUJ_COLLEGE_STATS = {
  totalListed: GUJ_COLLEGES.reduce((n, g) => n + g.colleges.length, 0),
  categories: GUJ_COLLEGES.length,
  govtUniversities: 30, // approximate
  totalEngColleges: 130, // GTU-affiliated approx
  totalMBBSSeats: 5400,
  iti: 600,
};

// All cities present (for filters)
export const GUJ_CITIES = Array.from(
  new Set(
    GUJ_COLLEGES.flatMap((g) =>
      g.colleges.map((c) => c.city.split(",")[0].split("(")[0].trim()),
    ),
  ),
).sort();
