// Curated entrance exams catalogue. Static — edit to update.
export type EntranceExam = {
  id: string;
  name: string;
  fullName: string;
  field: "Engineering" | "Medical" | "Management" | "Law" | "Design" | "Arts/Humanities" | "Commerce" | "Pharmacy" | "Agriculture" | "Architecture" | "General";
  level: "Class 12 / UG" | "PG" | "Diploma";
  scope: "Gujarat" | "National";
  conductedBy: string;
  typicalMonth: string;
  eligibility: string;
  pattern: string;
  website: string;
  forStreams: string[];
};

export const ENTRANCE_EXAMS: EntranceExam[] = [
  // Engineering
  {
    id: "jee-main", name: "JEE Main", fullName: "Joint Entrance Examination (Main)",
    field: "Engineering", level: "Class 12 / UG", scope: "National", conductedBy: "NTA",
    typicalMonth: "Jan & Apr (2 sessions)",
    eligibility: "Class 12 with PCM, 75% (or top 20 percentile)",
    pattern: "CBT, 90 questions, 300 marks, 3 hrs",
    website: "jeemain.nta.nic.in", forStreams: ["Science (PCM)"],
  },
  {
    id: "jee-advanced", name: "JEE Advanced", fullName: "Joint Entrance Examination (Advanced)",
    field: "Engineering", level: "Class 12 / UG", scope: "National", conductedBy: "IITs (rotating)",
    typicalMonth: "May–Jun",
    eligibility: "Top 2.5 lakh JEE Main rankers, max 2 attempts",
    pattern: "2 papers x 3 hrs, CBT",
    website: "jeeadv.ac.in", forStreams: ["Science (PCM)"],
  },
  {
    id: "gujcet", name: "GUJCET", fullName: "Gujarat Common Entrance Test",
    field: "Engineering", level: "Class 12 / UG", scope: "Gujarat", conductedBy: "GSEB",
    typicalMonth: "Mar–Apr",
    eligibility: "Class 12 Science (PCM/PCB), Gujarat board candidates",
    pattern: "OMR, 120 questions, 3 hrs",
    website: "gujcet.gseb.org", forStreams: ["Science (PCM)", "Science (PCB)"],
  },
  {
    id: "bitsat", name: "BITSAT", fullName: "Birla Institute of Technology and Science Admission Test",
    field: "Engineering", level: "Class 12 / UG", scope: "National", conductedBy: "BITS Pilani",
    typicalMonth: "May–Jun",
    eligibility: "Class 12 with PCM, 75% aggregate",
    pattern: "CBT, 130 questions, 3 hrs",
    website: "bitsadmission.com", forStreams: ["Science (PCM)"],
  },
  // Medical
  {
    id: "neet-ug", name: "NEET-UG", fullName: "National Eligibility cum Entrance Test (UG)",
    field: "Medical", level: "Class 12 / UG", scope: "National", conductedBy: "NTA",
    typicalMonth: "May",
    eligibility: "Class 12 with PCB, 50% (40% reserved)",
    pattern: "Pen-paper, 200 questions (180 attempt), 720 marks, 3hr 20min",
    website: "neet.nta.nic.in", forStreams: ["Science (PCB)"],
  },
  {
    id: "aiims-inicet", name: "INI-CET", fullName: "Institute of National Importance Combined Entrance Test",
    field: "Medical", level: "PG", scope: "National", conductedBy: "AIIMS Delhi",
    typicalMonth: "May & Nov",
    eligibility: "MBBS with internship completed",
    pattern: "CBT, 200 questions, 3 hrs",
    website: "aiimsexams.ac.in", forStreams: ["Medical PG"],
  },
  // Management
  {
    id: "cat", name: "CAT", fullName: "Common Admission Test",
    field: "Management", level: "PG", scope: "National", conductedBy: "IIMs (rotating)",
    typicalMonth: "Nov",
    eligibility: "Bachelor's with 50% (45% reserved)",
    pattern: "CBT, 66 questions, 2 hrs",
    website: "iimcat.ac.in", forStreams: ["Any UG"],
  },
  {
    id: "xat", name: "XAT", fullName: "Xavier Aptitude Test",
    field: "Management", level: "PG", scope: "National", conductedBy: "XLRI Jamshedpur",
    typicalMonth: "Jan",
    eligibility: "Bachelor's degree (final-year eligible)",
    pattern: "CBT, ~95 questions + essay, 3hr 30min",
    website: "xatonline.in", forStreams: ["Any UG"],
  },
  {
    id: "cmat", name: "CMAT", fullName: "Common Management Admission Test",
    field: "Management", level: "PG", scope: "National", conductedBy: "NTA",
    typicalMonth: "May",
    eligibility: "Bachelor's degree",
    pattern: "CBT, 100 questions, 3 hrs",
    website: "cmat.nta.nic.in", forStreams: ["Any UG"],
  },
  // Law
  {
    id: "clat", name: "CLAT", fullName: "Common Law Admission Test",
    field: "Law", level: "Class 12 / UG", scope: "National", conductedBy: "Consortium of NLUs",
    typicalMonth: "Dec",
    eligibility: "Class 12 with 45% (40% reserved) for UG; LLB for PG",
    pattern: "Offline, 120 questions, 2 hrs",
    website: "consortiumofnlus.ac.in", forStreams: ["Any Class 12"],
  },
  {
    id: "ailet", name: "AILET", fullName: "All India Law Entrance Test",
    field: "Law", level: "Class 12 / UG", scope: "National", conductedBy: "NLU Delhi",
    typicalMonth: "Dec",
    eligibility: "Class 12 with 45%",
    pattern: "Offline, 150 questions, 90 min",
    website: "nationallawuniversitydelhi.in", forStreams: ["Any Class 12"],
  },
  // Design
  {
    id: "nid-dat", name: "NID DAT", fullName: "NID Design Aptitude Test",
    field: "Design", level: "Class 12 / UG", scope: "National", conductedBy: "NID Ahmedabad",
    typicalMonth: "Prelims Jan, Mains Apr",
    eligibility: "Class 12 (any stream)",
    pattern: "Prelims (objective) + Mains (studio + interview)",
    website: "admissions.nid.edu", forStreams: ["Any Class 12"],
  },
  {
    id: "nift", name: "NIFT Entrance", fullName: "NIFT Entrance Examination",
    field: "Design", level: "Class 12 / UG", scope: "National", conductedBy: "NIFT",
    typicalMonth: "Feb",
    eligibility: "Class 12 (any stream) for B.Des / B.FTech",
    pattern: "GAT + CAT + Situation Test",
    website: "nift.ac.in", forStreams: ["Any Class 12"],
  },
  {
    id: "uceed", name: "UCEED", fullName: "Undergraduate Common Entrance Exam for Design",
    field: "Design", level: "Class 12 / UG", scope: "National", conductedBy: "IIT Bombay",
    typicalMonth: "Jan",
    eligibility: "Class 12 (any stream)",
    pattern: "CBT, 3 hrs, sketching + aptitude",
    website: "uceed.iitb.ac.in", forStreams: ["Any Class 12"],
  },
  // Architecture
  {
    id: "nata", name: "NATA", fullName: "National Aptitude Test in Architecture",
    field: "Architecture", level: "Class 12 / UG", scope: "National", conductedBy: "Council of Architecture",
    typicalMonth: "Apr–Jul (multiple sessions)",
    eligibility: "Class 12 with PCM (or PCM + Maths) 50%",
    pattern: "Online, drawing + aptitude, 3 hrs",
    website: "nata.in", forStreams: ["Science (PCM)", "Any Class 12 with Maths"],
  },
  // Arts/Humanities
  {
    id: "cuet-ug", name: "CUET-UG", fullName: "Common University Entrance Test (UG)",
    field: "General", level: "Class 12 / UG", scope: "National", conductedBy: "NTA",
    typicalMonth: "May–Jun",
    eligibility: "Class 12 pass (any stream)",
    pattern: "CBT, domain + language + general test",
    website: "cuet.nta.nic.in", forStreams: ["Any Class 12"],
  },
  {
    id: "cuet-pg", name: "CUET-PG", fullName: "Common University Entrance Test (PG)",
    field: "General", level: "PG", scope: "National", conductedBy: "NTA",
    typicalMonth: "Mar",
    eligibility: "Bachelor's degree",
    pattern: "CBT, 100 questions, 105 min",
    website: "cuet.nta.nic.in", forStreams: ["Any UG"],
  },
  // Commerce
  {
    id: "ipmat", name: "IPMAT", fullName: "Integrated Programme in Management Aptitude Test",
    field: "Commerce", level: "Class 12 / UG", scope: "National", conductedBy: "IIM Indore/Rohtak",
    typicalMonth: "May",
    eligibility: "Class 12 with 60% (any stream)",
    pattern: "CBT, Quant + Verbal, 2 hrs",
    website: "iimidr.ac.in", forStreams: ["Any Class 12"],
  },
  {
    id: "ca-foundation", name: "CA Foundation", fullName: "Chartered Accountancy Foundation",
    field: "Commerce", level: "Class 12 / UG", scope: "National", conductedBy: "ICAI",
    typicalMonth: "Jun & Dec",
    eligibility: "Class 12 pass",
    pattern: "4 papers, MCQ + descriptive",
    website: "icai.org", forStreams: ["Commerce", "Any Class 12"],
  },
  // Pharmacy
  {
    id: "gpat", name: "GPAT", fullName: "Graduate Pharmacy Aptitude Test",
    field: "Pharmacy", level: "PG", scope: "National", conductedBy: "NTA",
    typicalMonth: "Mar–Apr",
    eligibility: "B.Pharm graduate",
    pattern: "CBT, 125 questions, 3 hrs",
    website: "gpat.nta.nic.in", forStreams: ["B.Pharm"],
  },
  // Agriculture
  {
    id: "icar-aieea", name: "ICAR AIEEA", fullName: "ICAR All India Entrance Examination for Agriculture",
    field: "Agriculture", level: "Class 12 / UG", scope: "National", conductedBy: "NTA",
    typicalMonth: "Jul",
    eligibility: "Class 12 with PCB / PCM / Agriculture",
    pattern: "CBT, 150 questions, 2hr 30min",
    website: "icar.nta.nic.in", forStreams: ["Science (PCB)", "Science (PCM)"],
  },
  // Hotel
  {
    id: "nchmct", name: "NCHM JEE", fullName: "NCHMCT Joint Entrance Examination",
    field: "General", level: "Class 12 / UG", scope: "National", conductedBy: "NTA",
    typicalMonth: "May",
    eligibility: "Class 12 (any stream) with English",
    pattern: "CBT, 200 questions, 3 hrs",
    website: "nchmjee.nta.nic.in", forStreams: ["Any Class 12"],
  },
];
