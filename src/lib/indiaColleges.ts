// Notable India-wide colleges (outside Gujarat) for the Find Your College directory.
// Curated list of premier institutes across major streams.

export interface IndiaCollege {
  name: string;
  city: string;
  state: string;
  type: "Government" | "Private" | "Government-Aided" | "Deemed" | "Central" | "State" | "Autonomous";
  category:
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
  established?: number;
  courses: string[];
  website?: string;
  notable?: string;
  feesRange?: string;
  approxIntake?: string;
}

export const INDIA_COLLEGES: IndiaCollege[] = [
  // ---------------- IITs ----------------
  { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", type: "Central", category: "engineering", established: 1958, courses: ["B.Tech (CSE, EE, ME, CL, AE, MM)", "M.Tech", "Dual Degree"], website: "iitb.ac.in", notable: "NIRF #3 Engineering. Top placements (avg ₹21 LPA).", feesRange: "₹2.25 L/year", approxIntake: "~1,360 B.Tech seats" },
  { name: "IIT Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "engineering", established: 1961, courses: ["B.Tech", "Dual Degree", "M.Tech", "MBA"], website: "iitd.ac.in", notable: "NIRF #2 Engineering.", feesRange: "₹2.25 L/year" },
  { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", type: "Central", category: "engineering", established: 1959, courses: ["B.Tech", "Dual Degree", "BS Data Science (online)"], website: "iitm.ac.in", notable: "NIRF #1 Engineering & Overall.", feesRange: "₹2.25 L/year" },
  { name: "IIT Kanpur", city: "Kanpur", state: "Uttar Pradesh", type: "Central", category: "engineering", established: 1959, courses: ["B.Tech", "BS", "M.Tech"], website: "iitk.ac.in", notable: "NIRF #4 Engineering.", feesRange: "₹2.25 L/year" },
  { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal", type: "Central", category: "engineering", established: 1951, courses: ["B.Tech", "Dual Degree", "Integrated MSc"], website: "iitkgp.ac.in", notable: "Oldest IIT.", feesRange: "₹2.25 L/year" },
  { name: "IIT Roorkee", city: "Roorkee", state: "Uttarakhand", type: "Central", category: "engineering", established: 1847, courses: ["B.Tech", "B.Arch", "Integrated M.Tech"], website: "iitr.ac.in", notable: "Strong in Civil & Earth Sciences.", feesRange: "₹2.25 L/year" },
  { name: "IIT Guwahati", city: "Guwahati", state: "Assam", type: "Central", category: "engineering", established: 1994, courses: ["B.Tech", "B.Des"], website: "iitg.ac.in", feesRange: "₹2.25 L/year" },
  { name: "IIT Hyderabad", city: "Hyderabad", state: "Telangana", type: "Central", category: "engineering", established: 2008, courses: ["B.Tech (CSE, AI, EE, ME)", "M.Tech"], website: "iith.ac.in", feesRange: "₹2.25 L/year" },
  { name: "IIT BHU Varanasi", city: "Varanasi", state: "Uttar Pradesh", type: "Central", category: "engineering", established: 1919, courses: ["B.Tech", "IDD"], website: "iitbhu.ac.in", feesRange: "₹2.25 L/year" },
  { name: "IIT Indore", city: "Indore", state: "Madhya Pradesh", type: "Central", category: "engineering", established: 2009, courses: ["B.Tech", "M.Tech"], website: "iiti.ac.in", feesRange: "₹2.25 L/year" },

  // ---------------- NITs ----------------
  { name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", type: "Central", category: "engineering", established: 1964, courses: ["B.Tech (CSE, ECE, EE, ME, CE)", "M.Tech", "MBA"], website: "nitt.edu", notable: "Top-ranked NIT.", feesRange: "₹1.5 L/year" },
  { name: "NIT Warangal", city: "Warangal", state: "Telangana", type: "Central", category: "engineering", established: 1959, courses: ["B.Tech", "M.Tech"], website: "nitw.ac.in", feesRange: "₹1.5 L/year" },
  { name: "NIT Karnataka (Surathkal)", city: "Mangalore", state: "Karnataka", type: "Central", category: "engineering", established: 1960, courses: ["B.Tech", "M.Tech"], website: "nitk.ac.in", feesRange: "₹1.5 L/year" },
  { name: "NIT Rourkela", city: "Rourkela", state: "Odisha", type: "Central", category: "engineering", established: 1961, courses: ["B.Tech", "Integrated MSc"], website: "nitrkl.ac.in", feesRange: "₹1.5 L/year" },
  { name: "NIT Calicut", city: "Calicut", state: "Kerala", type: "Central", category: "engineering", established: 1961, courses: ["B.Tech", "B.Arch"], website: "nitc.ac.in", feesRange: "₹1.5 L/year" },
  { name: "MNNIT Allahabad", city: "Prayagraj", state: "Uttar Pradesh", type: "Central", category: "engineering", established: 1961, courses: ["B.Tech", "M.Tech"], website: "mnnit.ac.in", feesRange: "₹1.5 L/year" },

  // ---------------- IIITs / Premier Tech ----------------
  { name: "IIIT Hyderabad", city: "Hyderabad", state: "Telangana", type: "Deemed", category: "engineering", established: 1998, courses: ["B.Tech (CSE)", "Dual Degree", "MS by Research"], website: "iiit.ac.in", notable: "Top private CS research institute.", feesRange: "₹3.5 L/year" },
  { name: "BITS Pilani", city: "Pilani", state: "Rajasthan", type: "Deemed", category: "engineering", established: 1964, courses: ["B.E.", "M.Sc.", "MBA"], website: "bits-pilani.ac.in", notable: "Premier private engineering institute.", feesRange: "₹5.4 L/year" },
  { name: "BITS Goa", city: "Goa", state: "Goa", type: "Deemed", category: "engineering", established: 2004, courses: ["B.E.", "M.Sc."], website: "bits-pilani.ac.in/goa", feesRange: "₹5.4 L/year" },
  { name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu", type: "Deemed", category: "engineering", established: 1984, courses: ["B.Tech", "M.Tech"], website: "vit.ac.in", feesRange: "₹2–4 L/year" },
  { name: "Manipal Institute of Technology", city: "Manipal", state: "Karnataka", type: "Deemed", category: "engineering", established: 1957, courses: ["B.Tech", "M.Tech"], website: "manipal.edu", feesRange: "₹3.6 L/year" },
  { name: "Delhi Technological University (DTU)", city: "New Delhi", state: "Delhi", type: "State", category: "engineering", established: 1941, courses: ["B.Tech", "M.Tech"], website: "dtu.ac.in", feesRange: "₹1.9 L/year" },
  { name: "NSUT Delhi", city: "New Delhi", state: "Delhi", type: "State", category: "engineering", established: 1983, courses: ["B.Tech"], website: "nsut.ac.in", feesRange: "₹1.6 L/year" },
  { name: "COEP Pune", city: "Pune", state: "Maharashtra", type: "State", category: "engineering", established: 1854, courses: ["B.Tech"], website: "coep.org.in" },
  { name: "Jadavpur University", city: "Kolkata", state: "West Bengal", type: "State", category: "engineering", established: 1955, courses: ["B.E.", "B.Arch"], website: "jaduniv.edu.in", feesRange: "₹10,000/year", notable: "Top-ranked govt university." },
  { name: "Anna University", city: "Chennai", state: "Tamil Nadu", type: "State", category: "engineering", established: 1978, courses: ["B.E.", "B.Tech", "M.E."], website: "annauniv.edu" },

  // ---------------- AIIMS / Medical ----------------
  { name: "AIIMS New Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "medical", established: 1956, courses: ["MBBS", "BDS", "B.Sc Nursing", "MD/MS", "DM/MCh"], website: "aiims.edu", notable: "NIRF #1 Medical for years.", feesRange: "₹6,000/year", approxIntake: "125 MBBS seats" },
  { name: "AIIMS Bhopal", city: "Bhopal", state: "Madhya Pradesh", type: "Central", category: "medical", established: 2012, courses: ["MBBS", "MD/MS"], website: "aiimsbhopal.edu.in", feesRange: "₹6,000/year" },
  { name: "AIIMS Bhubaneswar", city: "Bhubaneswar", state: "Odisha", type: "Central", category: "medical", established: 2012, courses: ["MBBS", "MD/MS"], website: "aiimsbhubaneswar.edu.in", feesRange: "₹6,000/year" },
  { name: "AIIMS Jodhpur", city: "Jodhpur", state: "Rajasthan", type: "Central", category: "medical", established: 2012, courses: ["MBBS", "MD/MS"], website: "aiimsjodhpur.edu.in", feesRange: "₹6,000/year" },
  { name: "AIIMS Patna", city: "Patna", state: "Bihar", type: "Central", category: "medical", established: 2012, courses: ["MBBS", "MD/MS"], website: "aiimspatna.org", feesRange: "₹6,000/year" },
  { name: "AIIMS Raipur", city: "Raipur", state: "Chhattisgarh", type: "Central", category: "medical", established: 2012, courses: ["MBBS", "MD/MS"], website: "aiimsraipur.edu.in", feesRange: "₹6,000/year" },
  { name: "AIIMS Rishikesh", city: "Rishikesh", state: "Uttarakhand", type: "Central", category: "medical", established: 2012, courses: ["MBBS", "MD/MS"], website: "aiimsrishikesh.edu.in", feesRange: "₹6,000/year" },
  { name: "PGIMER Chandigarh", city: "Chandigarh", state: "Chandigarh", type: "Central", category: "medical", established: 1962, courses: ["MD/MS", "DM/MCh", "MSc"], website: "pgimer.edu.in", notable: "NIRF #2 Medical." },
  { name: "JIPMER Puducherry", city: "Puducherry", state: "Puducherry", type: "Central", category: "medical", established: 1823, courses: ["MBBS", "MD/MS"], website: "jipmer.edu.in" },
  { name: "CMC Vellore", city: "Vellore", state: "Tamil Nadu", type: "Private", category: "medical", established: 1900, courses: ["MBBS", "MD/MS", "B.Sc Nursing"], website: "cmch-vellore.edu", notable: "Top private medical college." },
  { name: "Maulana Azad Medical College", city: "New Delhi", state: "Delhi", type: "Government", category: "medical", established: 1959, courses: ["MBBS", "MD/MS"], website: "mamc.ac.in" },
  { name: "King George's Medical University", city: "Lucknow", state: "Uttar Pradesh", type: "State", category: "medical", established: 1911, courses: ["MBBS", "BDS", "MD/MS"], website: "kgmu.org" },
  { name: "Grant Medical College", city: "Mumbai", state: "Maharashtra", type: "State", category: "medical", established: 1845, courses: ["MBBS", "MD/MS"], website: "ggmcjjh.org" },
  { name: "Madras Medical College", city: "Chennai", state: "Tamil Nadu", type: "State", category: "medical", established: 1835, courses: ["MBBS", "MD/MS"], website: "mmc.tn.gov.in" },
  { name: "Bangalore Medical College", city: "Bengaluru", state: "Karnataka", type: "State", category: "medical", established: 1955, courses: ["MBBS", "MD/MS"], website: "bmcri.org" },
  { name: "Kasturba Medical College", city: "Manipal", state: "Karnataka", type: "Deemed", category: "medical", established: 1953, courses: ["MBBS", "MD/MS"], website: "manipal.edu" },

  // ---------------- IIMs ----------------
  { name: "IIM Bangalore", city: "Bengaluru", state: "Karnataka", type: "Central", category: "management", established: 1973, courses: ["MBA", "PGP", "Executive MBA", "PhD"], website: "iimb.ac.in", notable: "NIRF #2 Management.", feesRange: "₹24 L (2-yr)" },
  { name: "IIM Calcutta", city: "Kolkata", state: "West Bengal", type: "Central", category: "management", established: 1961, courses: ["MBA", "PGP", "PGDBA"], website: "iimcal.ac.in", notable: "First IIM, top finance institute.", feesRange: "₹27 L (2-yr)" },
  { name: "IIM Lucknow", city: "Lucknow", state: "Uttar Pradesh", type: "Central", category: "management", established: 1984, courses: ["MBA", "PGP"], website: "iiml.ac.in", feesRange: "₹20 L (2-yr)" },
  { name: "IIM Kozhikode", city: "Kozhikode", state: "Kerala", type: "Central", category: "management", established: 1996, courses: ["MBA", "PGP"], website: "iimk.ac.in", feesRange: "₹21 L (2-yr)" },
  { name: "IIM Indore", city: "Indore", state: "Madhya Pradesh", type: "Central", category: "management", established: 1996, courses: ["MBA", "5-yr Integrated IPM"], website: "iimidr.ac.in", notable: "Offers 5-yr IPM after Class 12.", feesRange: "₹21 L (2-yr); IPM ₹4 L/yr" },
  { name: "XLRI Jamshedpur", city: "Jamshedpur", state: "Jharkhand", type: "Private", category: "management", established: 1949, courses: ["PGDM (BM, HRM)"], website: "xlri.ac.in", feesRange: "₹27 L (2-yr)" },
  { name: "FMS Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "management", established: 1954, courses: ["MBA"], website: "fms.edu", notable: "Highly affordable top MBA.", feesRange: "₹2 L (2-yr)" },
  { name: "MDI Gurgaon", city: "Gurgaon", state: "Haryana", type: "Private", category: "management", established: 1973, courses: ["PGPM"], website: "mdi.ac.in" },
  { name: "SPJIMR Mumbai", city: "Mumbai", state: "Maharashtra", type: "Private", category: "management", established: 1981, courses: ["PGDM", "PGPM"], website: "spjimr.org" },
  { name: "JBIMS Mumbai", city: "Mumbai", state: "Maharashtra", type: "State", category: "management", established: 1965, courses: ["MMS"], website: "jbims.edu" },

  // ---------------- NLUs / Law ----------------
  { name: "NLSIU Bangalore", city: "Bengaluru", state: "Karnataka", type: "State", category: "law", established: 1987, courses: ["B.A. LL.B (Hons)", "LL.M"], website: "nls.ac.in", notable: "NIRF #1 Law.", feesRange: "₹3.25 L/year" },
  { name: "NALSAR Hyderabad", city: "Hyderabad", state: "Telangana", type: "State", category: "law", established: 1998, courses: ["B.A. LL.B (Hons)", "LL.M"], website: "nalsar.ac.in", feesRange: "₹2.6 L/year" },
  { name: "NUJS Kolkata", city: "Kolkata", state: "West Bengal", type: "State", category: "law", established: 1999, courses: ["B.A. LL.B", "LL.M"], website: "nujs.edu" },
  { name: "NLU Delhi", city: "New Delhi", state: "Delhi", type: "State", category: "law", established: 2008, courses: ["B.A. LL.B (Hons)", "LL.M"], website: "nludelhi.ac.in", notable: "Admission via AILET (separate from CLAT)." },
  { name: "NLU Jodhpur", city: "Jodhpur", state: "Rajasthan", type: "State", category: "law", established: 1999, courses: ["B.A. LL.B", "B.B.A LL.B"], website: "nlujodhpur.ac.in" },
  { name: "Symbiosis Law School", city: "Pune", state: "Maharashtra", type: "Private", category: "law", established: 1977, courses: ["B.A. LL.B", "B.B.A LL.B"], website: "symlaw.ac.in" },
  { name: "Faculty of Law, DU", city: "New Delhi", state: "Delhi", type: "Central", category: "law", established: 1924, courses: ["LL.B (3-yr)", "LL.M"], website: "lawfaculty.du.ac.in" },

  // ---------------- Design / Architecture ----------------
  { name: "NID Ahmedabad", city: "Ahmedabad", state: "Gujarat", type: "Autonomous", category: "design-architecture", established: 1961, courses: ["B.Des", "M.Des"], website: "nid.edu", notable: "India's premier design institute.", feesRange: "₹3.5 L/year" },
  { name: "NIFT Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "design-architecture", established: 1986, courses: ["B.Des", "B.F.Tech", "M.Des"], website: "nift.ac.in", feesRange: "₹3 L/year" },
  { name: "NIFT Mumbai", city: "Mumbai", state: "Maharashtra", type: "Central", category: "design-architecture", established: 1995, courses: ["B.Des", "B.F.Tech"], website: "nift.ac.in", feesRange: "₹3 L/year" },
  { name: "NIFT Bengaluru", city: "Bengaluru", state: "Karnataka", type: "Central", category: "design-architecture", established: 1995, courses: ["B.Des", "B.F.Tech"], website: "nift.ac.in" },
  { name: "Pearl Academy", city: "New Delhi", state: "Delhi", type: "Private", category: "design-architecture", established: 1993, courses: ["B.Des (Fashion, Comm, Interior)"], website: "pearlacademy.com" },
  { name: "Srishti Manipal Institute", city: "Bengaluru", state: "Karnataka", type: "Private", category: "design-architecture", established: 1996, courses: ["B.Des"], website: "srishtimanipalinstitute.in" },
  { name: "SPA Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "design-architecture", established: 1955, courses: ["B.Arch", "B.Plan", "M.Arch"], website: "spa.ac.in", notable: "NIRF #1 Architecture." },
  { name: "Sir J.J. College of Architecture", city: "Mumbai", state: "Maharashtra", type: "State", category: "design-architecture", established: 1913, courses: ["B.Arch", "M.Arch"], website: "sirjjarchitecture.org" },
  { name: "Chandigarh College of Architecture", city: "Chandigarh", state: "Chandigarh", type: "State", category: "design-architecture", established: 1961, courses: ["B.Arch"], website: "ccachd.org" },

  // ---------------- Commerce / Arts-Science (Central Universities) ----------------
  { name: "SRCC (Shri Ram College of Commerce)", city: "New Delhi", state: "Delhi", type: "Central", category: "commerce", established: 1926, courses: ["B.Com (Hons)", "B.A. Economics (Hons)"], website: "srcc.edu", notable: "Top commerce college, DU." },
  { name: "St. Stephen's College", city: "New Delhi", state: "Delhi", type: "Central", category: "arts-science", established: 1881, courses: ["B.A.", "B.Sc."], website: "ststephens.edu" },
  { name: "Hindu College", city: "New Delhi", state: "Delhi", type: "Central", category: "arts-science", established: 1899, courses: ["B.A. (Hons)", "B.Sc. (Hons)"], website: "hinducollege.ac.in" },
  { name: "Lady Shri Ram College for Women", city: "New Delhi", state: "Delhi", type: "Central", category: "arts-science", established: 1956, courses: ["B.A. (Hons)", "B.Com (Hons)"], website: "lsr.edu.in" },
  { name: "Miranda House", city: "New Delhi", state: "Delhi", type: "Central", category: "arts-science", established: 1948, courses: ["B.A. (Hons)", "B.Sc. (Hons)"], website: "mirandahouse.ac.in", notable: "NIRF #1 College for years." },
  { name: "Hansraj College", city: "New Delhi", state: "Delhi", type: "Central", category: "arts-science", established: 1948, courses: ["B.A.", "B.Sc.", "B.Com"], website: "hansrajcollege.co.in" },
  { name: "Loyola College", city: "Chennai", state: "Tamil Nadu", type: "Government-Aided", category: "arts-science", established: 1925, courses: ["B.A.", "B.Sc.", "B.Com"], website: "loyolacollege.edu" },
  { name: "St. Xavier's College", city: "Mumbai", state: "Maharashtra", type: "Government-Aided", category: "arts-science", established: 1869, courses: ["B.A.", "B.Sc.", "B.Com"], website: "xaviers.edu" },
  { name: "Christ University", city: "Bengaluru", state: "Karnataka", type: "Deemed", category: "arts-science", established: 1969, courses: ["B.A.", "B.Sc.", "B.Com", "BBA"], website: "christuniversity.in" },
  { name: "Presidency University", city: "Kolkata", state: "West Bengal", type: "State", category: "arts-science", established: 1817, courses: ["B.A.", "B.Sc."], website: "presiuniv.ac.in" },
  { name: "JNU New Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "arts-science", established: 1969, courses: ["B.A. (Hons) Languages", "MA", "M.Phil/PhD"], website: "jnu.ac.in", notable: "Top research university." },
  { name: "BHU Varanasi", city: "Varanasi", state: "Uttar Pradesh", type: "Central", category: "arts-science", established: 1916, courses: ["B.A.", "B.Sc.", "B.Com", "Professional courses"], website: "bhu.ac.in" },
  { name: "Aligarh Muslim University", city: "Aligarh", state: "Uttar Pradesh", type: "Central", category: "arts-science", established: 1875, courses: ["B.A.", "B.Sc.", "Professional courses"], website: "amu.ac.in" },
  { name: "University of Hyderabad", city: "Hyderabad", state: "Telangana", type: "Central", category: "arts-science", established: 1974, courses: ["Integrated MA/MSc", "PhD"], website: "uohyd.ac.in" },
  { name: "Jamia Millia Islamia", city: "New Delhi", state: "Delhi", type: "Central", category: "arts-science", established: 1920, courses: ["B.A.", "B.Sc.", "Professional courses"], website: "jmi.ac.in" },
  { name: "Indian Statistical Institute", city: "Kolkata", state: "West Bengal", type: "Central", category: "arts-science", established: 1931, courses: ["B.Stat (Hons)", "B.Math (Hons)", "M.Stat"], website: "isical.ac.in", notable: "Premier statistics institute." },
  { name: "Chennai Mathematical Institute", city: "Chennai", state: "Tamil Nadu", type: "Deemed", category: "arts-science", established: 1989, courses: ["B.Sc Math+CS", "B.Sc Physics", "M.Sc"], website: "cmi.ac.in" },
  { name: "IISc Bangalore", city: "Bengaluru", state: "Karnataka", type: "Central", category: "arts-science", established: 1909, courses: ["B.Sc Research", "M.Tech", "PhD"], website: "iisc.ac.in", notable: "NIRF #1 Overall (research)." },
  { name: "IISER Pune", city: "Pune", state: "Maharashtra", type: "Central", category: "arts-science", established: 2006, courses: ["BS-MS Dual Degree"], website: "iiserpune.ac.in" },
  { name: "IISER Kolkata", city: "Kolkata", state: "West Bengal", type: "Central", category: "arts-science", established: 2006, courses: ["BS-MS Dual Degree"], website: "iiserkol.ac.in" },
  { name: "IISER Mohali", city: "Mohali", state: "Punjab", type: "Central", category: "arts-science", established: 2007, courses: ["BS-MS Dual Degree"], website: "iisermohali.ac.in" },

  // ---------------- Agriculture / Veterinary ----------------
  { name: "IARI New Delhi (Pusa)", city: "New Delhi", state: "Delhi", type: "Central", category: "agriculture", established: 1905, courses: ["M.Sc Ag", "PhD"], website: "iari.res.in", notable: "Premier agri research institute." },
  { name: "G.B. Pant University of Agriculture", city: "Pantnagar", state: "Uttarakhand", type: "State", category: "agriculture", established: 1960, courses: ["B.Sc Agri", "B.V.Sc", "B.Tech"], website: "gbpuat.ac.in" },
  { name: "Punjab Agricultural University", city: "Ludhiana", state: "Punjab", type: "State", category: "agriculture", established: 1962, courses: ["B.Sc Agri", "B.Tech (Food)"], website: "pau.edu" },
  { name: "ICAR-NDRI", city: "Karnal", state: "Haryana", type: "Central", category: "agriculture", established: 1923, courses: ["B.Tech Dairy", "M.Sc"], website: "ndri.res.in" },
  { name: "TANUVAS", city: "Chennai", state: "Tamil Nadu", type: "State", category: "agriculture", established: 1989, courses: ["B.V.Sc & AH"], website: "tanuvas.ac.in" },

  // ---------------- Mass Comm / Hotel ----------------
  { name: "IIMC New Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "hotel-mass-comm", established: 1965, courses: ["PG Diploma Journalism (English/Hindi/Urdu/Odia)"], website: "iimc.gov.in", notable: "Premier journalism institute." },
  { name: "Symbiosis Institute of Media & Communication", city: "Pune", state: "Maharashtra", type: "Private", category: "hotel-mass-comm", established: 1990, courses: ["MA (Mass Comm)", "BA"], website: "simc.edu" },
  { name: "Asian College of Journalism", city: "Chennai", state: "Tamil Nadu", type: "Private", category: "hotel-mass-comm", established: 2000, courses: ["PG Diploma Journalism"], website: "asianmedia.org.in" },
  { name: "IHM Pusa New Delhi", city: "New Delhi", state: "Delhi", type: "Central", category: "hotel-mass-comm", established: 1962, courses: ["B.Sc Hospitality & Hotel Admin"], website: "ihmpusa.net", notable: "Top IHM via NCHMCT JEE." },
  { name: "IHM Mumbai", city: "Mumbai", state: "Maharashtra", type: "Central", category: "hotel-mass-comm", established: 1954, courses: ["B.Sc HHA", "Diploma"], website: "ihmctan.edu" },
  { name: "WGSHA Manipal", city: "Manipal", state: "Karnataka", type: "Deemed", category: "hotel-mass-comm", established: 1986, courses: ["B.A. Culinary Arts", "B.HM"], website: "manipal.edu" },

  // ---------------- Pharmacy ----------------
  { name: "NIPER Mohali", city: "Mohali", state: "Punjab", type: "Central", category: "pharmacy", established: 1998, courses: ["M.S. (Pharm)", "M.Pharm", "PhD"], website: "niper.gov.in", notable: "NIRF #1 Pharmacy." },
  { name: "Jamia Hamdard", city: "New Delhi", state: "Delhi", type: "Deemed", category: "pharmacy", established: 1989, courses: ["B.Pharm", "M.Pharm", "Pharm.D"], website: "jamiahamdard.edu" },
  { name: "BITS Pilani — Pharmacy", city: "Pilani", state: "Rajasthan", type: "Deemed", category: "pharmacy", established: 1964, courses: ["B.Pharm (Hons)"], website: "bits-pilani.ac.in" },
  { name: "Bombay College of Pharmacy", city: "Mumbai", state: "Maharashtra", type: "Government-Aided", category: "pharmacy", established: 1957, courses: ["B.Pharm", "M.Pharm"], website: "bcpindia.org" },
  { name: "Manipal College of Pharmaceutical Sciences", city: "Manipal", state: "Karnataka", type: "Deemed", category: "pharmacy", established: 1963, courses: ["B.Pharm", "Pharm.D"], website: "manipal.edu" },
];

export const INDIA_STATES = Array.from(new Set(INDIA_COLLEGES.map((c) => c.state))).sort();
