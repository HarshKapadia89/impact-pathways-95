// Comprehensive post-12th career guidance data.
// Used by /career, /career/$stream, and the psychometric report.

export type StreamId = "science-pcm" | "science-pcb" | "commerce" | "humanities" | "vocational";

export interface CareerPath {
  title: string;
  duration: string;
  eligibility: string;
  entranceExams: string[];
  topColleges: string[];
  careers: string[];
  avgSalary: string;
  description: string;
}

export interface Stream {
  id: StreamId;
  name: string;
  nameGu: string;
  tagline: string;
  taglineGu: string;
  color: string;
  emoji: string;
  overview: string;
  overviewGu: string;
  coreSubjects: string[];
  paths: CareerPath[];
  /** Gujarat-specific advantages: clusters, schemes, recruiters, scholarships */
  gujaratHighlights: string[];
  gujaratHighlightsGu: string[];
}

export const STREAMS: Stream[] = [
  {
    id: "science-pcm",
    name: "Science (PCM)",
    nameGu: "વિજ્ઞાન (PCM)",
    tagline: "Engineering, Architecture, Technology, Defence",
    taglineGu: "એન્જિનિયરિંગ, આર્કિટેક્ચર, ટેક્નોલોજી, ડિફેન્સ",
    color: "var(--chart-1)",
    emoji: "⚙️",
    overview:
      "Physics, Chemistry, Mathematics opens the largest set of pathways: engineering of every kind, computer science, data, architecture, defence services, pure sciences, design, and business. Best for students who enjoy solving structured problems and abstract reasoning.",
    overviewGu:
      "ભૌતિકશાસ્ત્ર, રસાયણશાસ્ત્ર અને ગણિત (PCM) સૌથી વ્યાપક માર્ગ ખોલે છે — એન્જિનિયરિંગ, કમ્પ્યુટર સાયન્સ, ડેટા, આર્કિટેક્ચર, ડિફેન્સ, શુદ્ધ વિજ્ઞાન, ડિઝાઇન અને બિઝનેસ. જે વિદ્યાર્થીઓને તાર્કિક અને અમૂર્ત સમસ્યાઓ ઉકેલવાનો શોખ હોય તેમના માટે શ્રેષ્ઠ.",
    coreSubjects: ["Physics", "Chemistry", "Mathematics", "English", "Optional (Computer / Biology)"],
    paths: [
      {
        title: "B.Tech / B.E. (Engineering)",
        duration: "4 years",
        eligibility: "12th PCM ≥ 50–75% + JEE Main / GUJCET",
        entranceExams: ["JEE Main", "JEE Advanced", "GUJCET", "BITSAT", "VITEEE", "SRMJEEE"],
        topColleges: [
          "IIT Gandhinagar",
          "IIIT Vadodara",
          "Nirma University, Ahmedabad",
          "DA-IICT, Gandhinagar",
          "PDEU (Pandit Deendayal Energy University), Gandhinagar",
          "SVNIT Surat",
          "L. D. College of Engineering, Ahmedabad",
        ],
        careers: [
          "Software Engineer",
          "Data Scientist",
          "Mechanical Engineer",
          "Civil Engineer",
          "Electrical Engineer",
          "Aerospace Engineer",
          "Chemical Engineer",
          "Robotics Engineer",
        ],
        avgSalary: "₹4–25 LPA (entry to senior, varies by branch & college)",
        description:
          "The flagship engineering route. Specialise in CSE, IT, AI/ML, Mechanical, Civil, Electrical, Electronics, Chemical, Aerospace, Biomedical, etc.",
      },
      {
        title: "B.Arch (Architecture)",
        duration: "5 years",
        eligibility: "12th PCM ≥ 50% + NATA / JEE Paper 2",
        entranceExams: ["NATA", "JEE Main Paper 2"],
        topColleges: [
          "CEPT University, Ahmedabad",
          "Faculty of Architecture, MSU Baroda",
          "School of Architecture, Nirma University",
          "Anant National University, Ahmedabad",
        ],
        careers: ["Architect", "Urban Planner", "Interior Designer", "Landscape Architect", "Heritage Conservation"],
        avgSalary: "₹3.5–18 LPA",
        description: "Design buildings, cities, and interiors. CEPT Ahmedabad is one of India's most prestigious schools.",
      },
      {
        title: "B.Sc. (Pure Sciences)",
        duration: "3 years (4 years for honours/research)",
        eligibility: "12th Science",
        entranceExams: ["CUET-UG", "Direct admission (most state colleges)"],
        topColleges: [
          "St. Xavier's College, Ahmedabad",
          "M. G. Science Institute, Ahmedabad",
          "Faculty of Science, MSU Baroda",
          "Bhavan's College, Ahmedabad",
          "Gujarat University, Ahmedabad",
        ],
        careers: ["Researcher", "Lab Scientist", "Teacher", "Data Analyst", "Patent Analyst", "Civil Services"],
        avgSalary: "₹3–10 LPA (much higher with M.Sc/PhD)",
        description: "Specialise in Physics, Maths, Statistics, Chemistry, Computer Science, IT, Biotechnology, Forensic Science.",
      },
      {
        title: "NDA — Defence Services",
        duration: "3 years (NDA) + 1 year (IMA/INA/AFA)",
        eligibility: "12th PCM (for Air Force/Navy), unmarried male/female, 16.5–19.5 yrs",
        entranceExams: ["NDA written (UPSC)", "SSB Interview"],
        topColleges: ["National Defence Academy, Khadakwasla, Pune"],
        careers: ["Officer — Indian Army", "Officer — Indian Navy", "Officer — Indian Air Force"],
        avgSalary: "₹56,100/month (Lieutenant) + perks; rises substantially with rank",
        description: "Join as a commissioned officer in the Armed Forces. Highly competitive, prestigious, life of service.",
      },
      {
        title: "B.Des (Design)",
        duration: "4 years",
        eligibility: "12th any stream + UCEED / NID DAT",
        entranceExams: ["UCEED", "NID DAT", "NIFT", "CEED (PG)"],
        topColleges: [
          "NID Ahmedabad (National Institute of Design)",
          "CEPT University, Ahmedabad",
          "MIT Institute of Design",
          "Anant National University",
        ],
        careers: ["Product Designer", "UX/UI Designer", "Animation Artist", "Industrial Designer", "Graphic Designer"],
        avgSalary: "₹4–20 LPA",
        description: "NID Ahmedabad is India's top design school. Design thinking + creativity + tech.",
      },
      {
        title: "Integrated Law (BA LLB / B.Com LLB)",
        duration: "5 years",
        eligibility: "12th any stream + CLAT",
        entranceExams: ["CLAT", "AILET", "CUET-LLB"],
        topColleges: ["GNLU Gandhinagar (one of India's top NLUs)", "Nirma University Law", "MSU Baroda Law"],
        careers: ["Lawyer", "Corporate Counsel", "Judge", "Civil Services", "Legal Tech"],
        avgSalary: "₹6–30 LPA",
        description: "GNLU Gandhinagar is consistently ranked in India's top 5 National Law Universities.",
      },
    ],
  },
  {
    id: "science-pcb",
    name: "Science (PCB)",
    nameGu: "વિજ્ઞાન (PCB)",
    tagline: "Medical, Pharmacy, Biotech, Allied Health",
    taglineGu: "મેડિકલ, ફાર્મસી, બાયોટેક, હેલ્થ",
    color: "var(--chart-3)",
    emoji: "🩺",
    overview:
      "Physics, Chemistry, Biology leads to medicine (MBBS, BDS, BAMS, BHMS), pharmacy, nursing, physiotherapy, biotechnology, microbiology, agriculture, veterinary science, and the rapidly growing allied health sciences.",
    overviewGu:
      "ભૌતિકશાસ્ત્ર, રસાયણશાસ્ત્ર અને જીવવિજ્ઞાન (PCB) તબીબી (MBBS, BDS, BAMS, BHMS), ફાર્મસી, નર્સિંગ, ફિઝિયોથેરાપી, બાયોટેક્નોલોજી, માઇક્રોબાયોલોજી, કૃષિ અને પશુ ચિકિત્સા તરફ દોરી જાય છે.",
    coreSubjects: ["Physics", "Chemistry", "Biology", "English", "Optional (Maths)"],
    paths: [
      {
        title: "MBBS (Medicine)",
        duration: "5.5 years (incl. internship)",
        eligibility: "12th PCB ≥ 50% + NEET-UG",
        entranceExams: ["NEET-UG"],
        topColleges: [
          "B. J. Medical College, Ahmedabad",
          "Smt. NHL Municipal Medical College, Ahmedabad",
          "Government Medical College, Surat",
          "Government Medical College, Vadodara",
          "AIIMS Rajkot",
          "M. P. Shah Government Medical College, Jamnagar",
          "GCS Medical College, Ahmedabad",
        ],
        careers: ["Doctor (MD/MS specialist)", "Surgeon", "Public Health Officer", "Medical Researcher"],
        avgSalary: "₹6–60 LPA (rises sharply with PG)",
        description: "The most sought-after PCB path. NEET cut-off is highly competitive.",
      },
      {
        title: "BDS (Dentistry)",
        duration: "5 years",
        eligibility: "12th PCB + NEET-UG",
        entranceExams: ["NEET-UG"],
        topColleges: [
          "Government Dental College, Ahmedabad",
          "Govt. Dental College, Jamnagar",
          "Manubhai Patel Dental College, Vadodara",
        ],
        careers: ["Dental Surgeon", "Orthodontist", "Oral Pathologist"],
        avgSalary: "₹4–20 LPA",
        description: "Dentistry as a private practice or hospital specialist.",
      },
      {
        title: "B.Pharm (Pharmacy)",
        duration: "4 years",
        eligibility: "12th PCB/PCM + GUJCET / GPAT",
        entranceExams: ["GUJCET", "GPAT (PG)", "NIPER"],
        topColleges: [
          "L. M. College of Pharmacy, Ahmedabad",
          "Nirma Institute of Pharmacy",
          "K. B. Institute of Pharmaceutical Education",
          "Maliba Pharmacy College",
        ],
        careers: ["Pharmacist", "Drug Inspector", "Clinical Research", "QA/QC Pharma Industry"],
        avgSalary: "₹3.5–12 LPA",
        description: "Gujarat is India's pharmaceutical hub — strong industry placements.",
      },
      {
        title: "BAMS / BHMS (Ayurveda / Homeopathy)",
        duration: "5.5 years",
        eligibility: "12th PCB + NEET-UG",
        entranceExams: ["NEET-UG"],
        topColleges: [
          "Government Akhandanand Ayurveda College, Ahmedabad",
          "I.P.G.T.&R.A., Jamnagar",
          "Anand Homeopathic Medical College",
        ],
        careers: ["Ayurvedic Doctor", "Homeopath", "Wellness Consultant"],
        avgSalary: "₹3–15 LPA",
        description: "Traditional medicine systems with growing demand globally.",
      },
      {
        title: "B.Sc. Nursing / Physiotherapy / Allied Health",
        duration: "4 years",
        eligibility: "12th PCB",
        entranceExams: ["GUJCET", "AIIMS Nursing", "Direct admission"],
        topColleges: [
          "Govt. College of Nursing, Ahmedabad",
          "Sumandeep Vidyapeeth, Vadodara",
          "Manikaka Topawala Institute of Nursing, Anand",
        ],
        careers: ["Staff Nurse", "Physiotherapist", "Occupational Therapist", "Radiologist", "Optometrist"],
        avgSalary: "₹3–10 LPA",
        description: "High employability, both India and abroad.",
      },
      {
        title: "B.Sc. Agriculture / Horticulture / Veterinary",
        duration: "4 years",
        eligibility: "12th PCB / PCMB + ICAR AIEEA",
        entranceExams: ["ICAR AIEEA", "GUJCET-Agri"],
        topColleges: [
          "Anand Agricultural University",
          "Junagadh Agricultural University",
          "Navsari Agricultural University",
          "Kamdhenu University (Veterinary)",
        ],
        careers: ["Agriculture Officer", "Agri-business Manager", "Veterinarian", "Horticulturist"],
        avgSalary: "₹4–12 LPA",
        description: "Strong public sector openings + agri-startups. Gujarat has 4 dedicated agri universities.",
      },
      {
        title: "B.Sc. Biotechnology / Microbiology / Forensic Science",
        duration: "3 years",
        eligibility: "12th Science",
        entranceExams: ["CUET-UG", "Direct admission"],
        topColleges: [
          "MSU Baroda — Biochemistry/Biotech",
          "St. Xavier's, Ahmedabad",
          "Gujarat Forensic Sciences University, Gandhinagar",
        ],
        careers: ["Research Scientist", "Forensic Analyst", "Biotech Industry", "Pharma R&D"],
        avgSalary: "₹3–10 LPA (much higher with PG)",
        description: "Research-oriented; usually requires M.Sc/PhD for top roles.",
      },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    nameGu: "વાણિજ્ય",
    tagline: "CA, Finance, Business, Economics, Law",
    taglineGu: "CA, ફાઇનાન્સ, બિઝનેસ, અર્થશાસ્ત્ર, કાયદો",
    color: "var(--chart-2)",
    emoji: "💼",
    overview:
      "Commerce opens chartered accountancy, banking, finance, business management, economics, company secretary, cost accountancy, investment, law, and entrepreneurship. Strong demand across India and especially Gujarat's industrial corridor.",
    overviewGu:
      "વાણિજ્ય CA, બેન્કિંગ, ફાઇનાન્સ, બિઝનેસ મેનેજમેન્ટ, અર્થશાસ્ત્ર, કંપની સેક્રેટરી, ખર્ચ હિસાબ, રોકાણ, કાયદો અને ઉદ્યોગ સાહસિકતા તરફ દોરી જાય છે. ગુજરાતના ઔદ્યોગિક કોરિડોરમાં ઊંચી માંગ.",
    coreSubjects: ["Accountancy", "Business Studies", "Economics", "English", "Maths / IP"],
    paths: [
      {
        title: "CA (Chartered Accountancy)",
        duration: "4.5–5 years (after 12th)",
        eligibility: "12th any stream + CA Foundation",
        entranceExams: ["CA Foundation (ICAI)", "CA Intermediate", "CA Final"],
        topColleges: ["ICAI — self-study + articleship at any CA firm", "H. L. College of Commerce (parallel B.Com)"],
        careers: ["Chartered Accountant", "Auditor", "Tax Consultant", "CFO", "Forensic Accountant"],
        avgSalary: "₹7–25 LPA at qualification; partners earn ₹50L+",
        description: "India's most prestigious commerce qualification. Self-study under ICAI + 3-year articleship.",
      },
      {
        title: "B.Com (General / Honours)",
        duration: "3 years",
        eligibility: "12th",
        entranceExams: ["CUET-UG (for top colleges)", "Direct admission (most colleges)"],
        topColleges: [
          "H. L. College of Commerce, Ahmedabad",
          "St. Xavier's College, Ahmedabad",
          "M. S. University, Vadodara",
          "Narsee Monjee, Ahmedabad campus",
        ],
        careers: ["Accountant", "Banker", "Tax Officer", "Auditor", "Operations Analyst"],
        avgSalary: "₹3–8 LPA (entry); higher with PG",
        description: "Foundational degree; usually paired with CA/CS/CMA, MBA, or specialised PG.",
      },
      {
        title: "BBA / BMS (Business Management)",
        duration: "3–4 years",
        eligibility: "12th + entrance test",
        entranceExams: ["NMIMS NPAT", "IPM (IIM Indore/Rohtak)", "Direct admission"],
        topColleges: [
          "IIM Ahmedabad — IPM (5-yr integrated)",
          "Nirma University BBA",
          "PDEU School of Liberal Studies",
          "Karnavati University",
        ],
        careers: ["Marketing Manager", "Operations Manager", "HR", "Business Analyst", "Entrepreneur"],
        avgSalary: "₹4–12 LPA (entry)",
        description: "Best paired with an MBA. IIM Ahmedabad's IPM is a flagship 5-year programme.",
      },
      {
        title: "CS (Company Secretary)",
        duration: "3 years (after 12th)",
        eligibility: "12th + CS Foundation (CSEET)",
        entranceExams: ["CSEET (ICSI)"],
        topColleges: ["ICSI — self-study"],
        careers: ["Company Secretary", "Compliance Officer", "Corporate Governance", "Legal Advisor"],
        avgSalary: "₹6–20 LPA",
        description: "Compliance & corporate law specialist. Mandatory for listed companies.",
      },
      {
        title: "CMA (Cost & Management Accounting)",
        duration: "3–4 years",
        eligibility: "12th + CMA Foundation",
        entranceExams: ["ICMAI Foundation"],
        topColleges: ["ICMAI — self-study"],
        careers: ["Cost Accountant", "Internal Auditor", "Finance Manager"],
        avgSalary: "₹6–18 LPA",
        description: "Cost & management accounting; complements CA/CS in industry.",
      },
      {
        title: "B.A. Economics (Honours)",
        duration: "3 years",
        eligibility: "12th + CUET",
        entranceExams: ["CUET-UG", "ISI / IIT JAM (PG)"],
        topColleges: ["Gujarat University", "St. Xavier's Ahmedabad", "MSU Baroda"],
        careers: ["Economist", "Policy Analyst", "Banking", "Civil Services", "Data Analyst"],
        avgSalary: "₹4–15 LPA",
        description: "Strong base for civil services, finance, and policy work.",
      },
      {
        title: "BBA-LLB / B.Com-LLB (Integrated Law)",
        duration: "5 years",
        eligibility: "12th + CLAT",
        entranceExams: ["CLAT", "AILET", "GNLU Direct"],
        topColleges: ["GNLU Gandhinagar", "Nirma Law", "Auro University Surat"],
        careers: ["Corporate Lawyer", "Tax Lawyer", "In-house Counsel"],
        avgSalary: "₹6–30 LPA",
        description: "Lucrative corporate law track combining commerce + law.",
      },
    ],
  },
  {
    id: "humanities",
    name: "Humanities / Arts",
    nameGu: "માનવવિદ્યા / કલા",
    tagline: "Civil Services, Law, Media, Psychology, Design, Social Sciences",
    taglineGu: "સિવિલ સર્વિસીસ, કાયદો, મીડિયા, મનોવિજ્ઞાન, ડિઝાઇન, સામાજિક વિજ્ઞાન",
    color: "var(--chart-4)",
    emoji: "📚",
    overview:
      "Humanities is the most flexible stream. It is the primary route to civil services, law, journalism, psychology, social work, languages, history, political science, international relations, fine arts, design, performing arts, and a vast variety of specialised roles in modern industry.",
    overviewGu:
      "માનવવિદ્યા સૌથી લવચીક પ્રવાહ છે. તે સિવિલ સર્વિસીસ, કાયદો, પત્રકારત્વ, મનોવિજ્ઞાન, સામાજિક કાર્ય, ભાષાઓ, ઇતિહાસ, રાજ્યશાસ્ત્ર, આંતરરાષ્ટ્રીય સંબંધો, લલિત કલા, ડિઝાઇન અને પ્રદર્શન કલાઓ માટે મુખ્ય માર્ગ છે.",
    coreSubjects: ["English", "History / Political Science / Geography", "Psychology / Sociology", "Economics", "Languages"],
    paths: [
      {
        title: "B.A. (Hons.) — Political Science / History / Sociology / Psychology",
        duration: "3 years (4 years with research)",
        eligibility: "12th + CUET",
        entranceExams: ["CUET-UG"],
        topColleges: [
          "Gujarat University, Ahmedabad",
          "St. Xavier's, Ahmedabad",
          "MSU Baroda — Faculty of Arts",
          "Sardar Patel University, Vallabh Vidyanagar",
        ],
        careers: ["Civil Servant (IAS/IPS/IFS)", "Researcher", "NGO Leader", "Journalist", "Diplomat", "Policy Analyst"],
        avgSalary: "₹3–20 LPA (much higher in civil services & corporate)",
        description: "Foundation degree for UPSC aspirants and a launchpad into law, social sciences, and policy.",
      },
      {
        title: "Integrated Law (BA LLB)",
        duration: "5 years",
        eligibility: "12th + CLAT",
        entranceExams: ["CLAT", "AILET", "CUET-LLB"],
        topColleges: ["GNLU Gandhinagar", "Nirma Law", "MSU Baroda Law"],
        careers: ["Litigator", "Corporate Lawyer", "Judge", "Civil Services", "Legal Journalism"],
        avgSalary: "₹6–30 LPA",
        description: "Among the most rewarding humanities paths.",
      },
      {
        title: "B.A. Journalism & Mass Communication / Media",
        duration: "3 years",
        eligibility: "12th + entrance / direct",
        entranceExams: ["IIMC Entrance", "JMI Entrance", "Direct admission"],
        topColleges: [
          "MICA Ahmedabad (PG flagship; UG via affiliated Mudra Institute)",
          "Gujarat University Dept. of Journalism",
          "Karnavati University School of Journalism",
        ],
        careers: ["Journalist", "Anchor", "PR & Communications", "Content Strategist", "Documentary Maker"],
        avgSalary: "₹3.5–15 LPA",
        description: "MICA is a global brand for communications & advertising.",
      },
      {
        title: "B.A. Psychology / B.Sc. Psychology",
        duration: "3 years",
        eligibility: "12th",
        entranceExams: ["CUET-UG", "Direct admission"],
        topColleges: ["Gujarat University", "MSU Baroda", "St. Xavier's Ahmedabad"],
        careers: ["Counsellor", "Clinical Psychologist (with M.Phil)", "HR/People Analytics", "UX Researcher", "School Psychologist"],
        avgSalary: "₹3.5–14 LPA",
        description: "High-growth field. Mental health awareness is creating massive demand.",
      },
      {
        title: "BSW / MSW (Social Work)",
        duration: "3 + 2 years",
        eligibility: "12th",
        entranceExams: ["TISS (PG)", "Direct admission"],
        topColleges: ["MSU Baroda — Faculty of Social Work (one of India's oldest)", "Gujarat Vidyapith"],
        careers: ["NGO Leader", "Community Development Officer", "CSR Specialist", "Policy Researcher"],
        avgSalary: "₹3–12 LPA",
        description: "MSU Baroda's Faculty of Social Work was India's first (founded 1949).",
      },
      {
        title: "B.Des / B.F.A (Design / Fine Arts)",
        duration: "4 years",
        eligibility: "12th any stream + UCEED / NID DAT / NIFT",
        entranceExams: ["UCEED", "NID DAT", "NIFT", "CEED"],
        topColleges: ["NID Ahmedabad", "MSU Baroda — Faculty of Fine Arts", "NIFT Gandhinagar", "CEPT University"],
        careers: ["Fashion Designer", "Animator", "Illustrator", "UX Designer", "Painter", "Sculptor"],
        avgSalary: "₹4–18 LPA",
        description: "Gujarat hosts NID, NIFT, CEPT, and MSU Fine Arts — one of India's strongest design clusters.",
      },
      {
        title: "B.A. Performing Arts / Music / Theatre",
        duration: "3 years",
        eligibility: "12th + audition",
        entranceExams: ["Audition", "Direct admission"],
        topColleges: ["MSU Baroda — Faculty of Performing Arts", "Gujarat Sangeet Nritya Akademi"],
        careers: ["Performing Artist", "Music Teacher", "Theatre Director", "Film/TV"],
        avgSalary: "₹2.5–15 LPA (highly variable)",
        description: "MSU Baroda's Performing Arts faculty is one of India's premier institutions.",
      },
      {
        title: "Hotel Management & Hospitality (BHM)",
        duration: "4 years",
        eligibility: "12th any stream + NCHM JEE",
        entranceExams: ["NCHM JEE"],
        topColleges: ["IHM Ahmedabad", "IHM Gandhinagar"],
        careers: ["Hotel Manager", "F&B Manager", "Cruise/Airlines", "Event Management"],
        avgSalary: "₹3.5–12 LPA",
        description: "Strong global mobility, growing tourism in Gujarat.",
      },
    ],
  },
  {
    id: "vocational",
    name: "Vocational / Skill-based",
    nameGu: "વ્યાવસાયિક / કૌશલ્ય આધારિત",
    tagline: "ITI, Polytechnic, Diplomas, Direct Employment",
    taglineGu: "ITI, પોલિટેક્નિક, ડિપ્લોમા, સીધી નોકરી",
    color: "var(--chart-5)",
    emoji: "🛠️",
    overview:
      "For students who want to start earning quickly with a hands-on skill — diplomas, ITI trades, polytechnics, paramedical courses, and Skill India certifications. Many lead to lateral entry into degree programmes too.",
    overviewGu:
      "જે વિદ્યાર્થીઓ વ્યવહારુ કૌશલ્ય સાથે ઝડપથી કમાવાનું શરૂ કરવા માંગે છે તેમના માટે — ડિપ્લોમા, ITI ટ્રેડ્સ, પોલિટેક્નિક, પેરામેડિકલ કોર્સ. ઘણા ડિગ્રી પ્રોગ્રામમાં લેટરલ એન્ટ્રી પણ આપે છે.",
    coreSubjects: ["Trade-specific theory + heavy practical training"],
    paths: [
      {
        title: "Diploma in Engineering (Polytechnic)",
        duration: "3 years",
        eligibility: "10th or 12th",
        entranceExams: ["ACPDC (Gujarat)"],
        topColleges: [
          "Government Polytechnic, Ahmedabad",
          "Government Polytechnic, Rajkot",
          "L. E. College, Morbi",
        ],
        careers: ["Junior Engineer (Govt)", "Technician", "Lateral entry to B.E. (2nd year)"],
        avgSalary: "₹2.5–6 LPA (entry)",
        description: "Fast track into engineering jobs and B.E. programmes.",
      },
      {
        title: "ITI (Industrial Training Institute)",
        duration: "1–2 years",
        eligibility: "8th–10th depending on trade",
        entranceExams: ["Direct admission via ITI portal"],
        topColleges: ["Government ITIs across Gujarat (250+)", "Kaushalya — The Skill University"],
        careers: ["Electrician", "Fitter", "Welder", "Mechanic", "Plumber", "Computer Operator"],
        avgSalary: "₹1.8–4.5 LPA",
        description: "Direct skill training, often with apprenticeship. PSU recruitment is heavy from ITIs.",
      },
      {
        title: "Paramedical Diplomas (DMLT, X-Ray, OT)",
        duration: "1–2 years",
        eligibility: "12th Science",
        entranceExams: ["Direct admission"],
        topColleges: ["Civil Hospital, Ahmedabad", "B. J. Medical Paramedical", "GMERS Paramedical"],
        careers: ["Lab Technician", "Radiology Technician", "OT Technician", "Dialysis Technician"],
        avgSalary: "₹2.4–6 LPA",
        description: "High employability in hospitals, diagnostic chains, and clinics.",
      },
      {
        title: "Diploma in Pharmacy (D.Pharm)",
        duration: "2 years",
        eligibility: "12th Science",
        entranceExams: ["Direct admission"],
        topColleges: ["L. M. College of Pharmacy", "K. B. Institute, Gandhinagar"],
        careers: ["Pharmacist (retail/hospital)", "Lateral entry to B.Pharm"],
        avgSalary: "₹2.4–5 LPA",
        description: "Quickest route into the pharma industry.",
      },
      {
        title: "Skill India Certifications",
        duration: "3–12 months",
        eligibility: "8th–12th",
        entranceExams: ["Direct enrolment"],
        topColleges: ["NSDC partners across Gujarat", "Kaushalya — The Skill University"],
        careers: ["Mobile repair", "Solar PV technician", "Beauty & wellness", "Hospitality", "Tourism guide"],
        avgSalary: "₹1.8–4 LPA",
        description: "Short, focused certifications under Skill India / PMKVY.",
      },
    ],
  },
];

export const STREAM_BY_ID: Record<StreamId, Stream> = STREAMS.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {} as Record<StreamId, Stream>);

// Major entrance exam quick-reference
export const ENTRANCE_EXAMS = [
  { code: "JEE Main", for: "Engineering (NITs, IIITs, GFTIs)", when: "Jan & Apr", website: "jeemain.nta.nic.in" },
  { code: "JEE Advanced", for: "IITs", when: "May", website: "jeeadv.ac.in" },
  { code: "GUJCET", for: "Gujarat Engineering & Pharmacy", when: "Apr", website: "gujcet.gseb.org" },
  { code: "NEET-UG", for: "MBBS, BDS, AYUSH, Veterinary", when: "May", website: "neet.nta.nic.in" },
  { code: "CUET-UG", for: "Central Universities (BA, B.Sc, B.Com)", when: "May", website: "cuet.samarth.ac.in" },
  { code: "CLAT", for: "National Law Universities (incl. GNLU)", when: "Dec", website: "consortiumofnlus.ac.in" },
  { code: "NDA", for: "Defence Services", when: "Apr & Sep", website: "upsc.gov.in" },
  { code: "NID DAT", for: "NID (Design)", when: "Jan", website: "admissions.nid.edu" },
  { code: "UCEED", for: "B.Des at IITs", when: "Jan", website: "uceed.iitb.ac.in" },
  { code: "NIFT", for: "Fashion Design / Tech", when: "Feb", website: "nift.ac.in" },
  { code: "NATA", for: "Architecture", when: "Apr & Jul", website: "nata.in" },
  { code: "CA Foundation", for: "Chartered Accountancy", when: "May & Nov", website: "icai.org" },
  { code: "CSEET", for: "Company Secretary", when: "Jan, May, Jul, Nov", website: "icsi.edu" },
  { code: "ICAR AIEEA", for: "Agriculture & Allied", when: "Apr", website: "icar.nta.nic.in" },
  { code: "IIM IPM", for: "5-yr Integrated MBA at IIMs", when: "May", website: "iimidr.ac.in" },
  { code: "NCHM JEE", for: "Hotel Management", when: "Apr", website: "nchmjee.nta.nic.in" },
];

// Used by the psychometric report engine to recommend streams.
export function recommendStreams(riasecTop: string[], aptitudeTop: string[]): StreamId[] {
  const score: Record<StreamId, number> = {
    "science-pcm": 0,
    "science-pcb": 0,
    commerce: 0,
    humanities: 0,
    vocational: 0,
  };
  const inc = (s: StreamId, n: number) => (score[s] += n);
  for (const code of riasecTop) {
    if (code === "I") {
      inc("science-pcm", 3);
      inc("science-pcb", 3);
    }
    if (code === "R") {
      inc("science-pcm", 2);
      inc("vocational", 3);
    }
    if (code === "A") {
      inc("humanities", 3);
    }
    if (code === "S") {
      inc("humanities", 3);
      inc("science-pcb", 2);
    }
    if (code === "E") {
      inc("commerce", 3);
      inc("humanities", 1);
    }
    if (code === "C") {
      inc("commerce", 3);
    }
  }
  for (const a of aptitudeTop) {
    if (a === "Numerical") {
      inc("science-pcm", 2);
      inc("commerce", 2);
    }
    if (a === "Verbal") {
      inc("humanities", 2);
      inc("commerce", 1);
    }
    if (a === "Logical") {
      inc("science-pcm", 2);
    }
    if (a === "Spatial") {
      inc("science-pcm", 1);
      inc("vocational", 1);
      inc("humanities", 1);
    }
  }
  return (Object.entries(score) as [StreamId, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id);
}
