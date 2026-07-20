// Additional per-career "career card" details layered on top of careerData.ts.
// Sourced from the national Career Card format (personal competencies, work
// environment, national institutes, distance/online options, loans, role model,
// keywords). Rendered by /career/$stream/$path.
//
// Everything here is prose — strings are stored per language.
// Language fallback: hi → en, gu → en.

export type Lang = "en" | "hi" | "gu";
export type T = Partial<Record<Lang, string>> & { en: string };
export type TList = Partial<Record<Lang, string[]>> & { en: string[] };

export interface RoleModel {
  name: string;
  bio: T;
  sourceUrl?: string;
}

export interface Loan {
  label: T;
  url?: string;
}

export interface Institute {
  name: string;
  city?: string;
}

export interface OnlineCourse {
  provider: string;
  title: T;
  url: string;
}

export interface CareerCardExtras {
  /** "You are good with computers", "You like to build things", … */
  competencies?: TList;
  /** Places you might work: labs, studios, sites, homes, offices */
  placesOfWork?: TList;
  /** e.g. "5–6 days a week, 8–9 hours, shifts possible" */
  workEnvironment?: T;
  /** Can you start your own firm / practice? */
  entrepreneurship?: T;
  /** Whether opportunities exist for differently-abled candidates */
  differentlyAbled?: T;
  /** Title-only growth ladder (Trainee → Designer → Sr. → Lead) */
  ladder?: TList;
  /** National-level government institutes */
  govtInstitutes?: Institute[];
  /** National-level private institutes */
  privateInstitutes?: Institute[];
  /** Distance-learning universities */
  distanceLearning?: Institute[];
  /** MOOC / online routes */
  onlineCourses?: OnlineCourse[];
  /** Education loan schemes */
  loans?: Loan[];
  /** Real practitioner story */
  roleModel?: RoleModel;
  /** Search-keyword synonyms (used in SEO chips) */
  keywords?: string[];
  /** Salary / info source URLs */
  sources?: { label: string; url: string }[];
}

/* ------------------------------------------------------------------
 * Trilingual defaults – shown when a specific career has no override.
 * ------------------------------------------------------------------ */
export const DEFAULT_COMPETENCIES: TList = {
  en: [
    "You enjoy learning new things and reading widely.",
    "You are comfortable working in groups and communicating clearly.",
    "You are organised and can meet deadlines.",
    "You are curious about how the field works in the real world.",
  ],
  hi: [
    "आप नई चीज़ें सीखने और पढ़ने में रुचि रखते हैं।",
    "आप समूह में काम करना और स्पष्ट संवाद करना पसंद करते हैं।",
    "आप व्यवस्थित हैं और समय-सीमा का पालन कर सकते हैं।",
    "आप जानना चाहते हैं कि यह क्षेत्र वास्तविक दुनिया में कैसे काम करता है।",
  ],
  gu: [
    "તમે નવી બાબતો શીખવા અને વાંચવામાં રસ ધરાવો છો.",
    "તમે ટીમમાં કામ કરી અને સ્પષ્ટ સંવાદ કરી શકો છો.",
    "તમે વ્યવસ્થિત છો અને સમય-મર્યાદા સાચવી શકો છો.",
    "તમે આ ક્ષેત્ર વાસ્તવિક દુનિયામાં કેવી રીતે કામ કરે છે તે જાણવા ઉત્સુક છો.",
  ],
};

export const DEFAULT_PLACES: TList = {
  en: ["Offices", "Client sites", "Studios / labs", "Remote / hybrid"],
  hi: ["कार्यालय", "क्लाइंट साइट", "स्टूडियो / लैब", "रिमोट / हाइब्रिड"],
  gu: ["ઓફિસો", "ક્લાયન્ટ સાઇટ", "સ્ટુડિયો / લેબ", "રિમોટ / હાઇબ્રિડ"],
};

export const DEFAULT_WORK_ENV: T = {
  en: "Typically 5–6 days a week, 8–9 hours per day. Some roles include shift or weekend duty.",
  hi: "आमतौर पर सप्ताह में 5–6 दिन, प्रतिदिन 8–9 घंटे। कुछ भूमिकाओं में शिफ्ट या सप्ताहांत ड्यूटी होती है।",
  gu: "સામાન્ય રીતે અઠવાડિયામાં 5–6 દિવસ, રોજ 8–9 કલાક. કેટલીક ભૂમિકાઓમાં શિફ્ટ કે વીકએન્ડ ડ્યુટી હોય શકે.",
};

export const DEFAULT_ENTREPRENEURSHIP: T = {
  en: "Yes — with experience, you can start your own practice, studio or consulting firm.",
  hi: "हाँ — अनुभव के साथ आप अपना खुद का व्यवसाय, स्टूडियो या सलाहकार फर्म शुरू कर सकते हैं।",
  gu: "હા — અનુભવ સાથે તમે તમારી પોતાની પ્રેક્ટિસ, સ્ટુડિયો કે કન્સલ્ટિંગ ફર્મ શરૂ કરી શકો છો.",
};

export const DEFAULT_DIFFERENTLY_ABLED: T = {
  en: "Opportunities exist for differently-abled candidates; many employers offer accessible workplaces.",
  hi: "दिव्यांग उम्मीदवारों के लिए अवसर उपलब्ध हैं; कई कंपनियाँ सुलभ कार्यस्थल प्रदान करती हैं।",
  gu: "દિવ્યાંગ ઉમેદવારો માટે તકો ઉપલબ્ધ છે; ઘણી કંપનીઓ સુલભ કાર્યસ્થળ પ્રદાન કરે છે.",
};

export const DEFAULT_LOANS: Loan[] = [
  { label: { en: "Vidya Lakshmi portal – single application for education loans from major banks.", hi: "विद्या लक्ष्मी पोर्टल – प्रमुख बैंकों से शिक्षा ऋण के लिए एक ही आवेदन।", gu: "વિદ્યા લક્ષ્મી પોર્ટલ – મુખ્ય બેંકોમાંથી શિક્ષણ લોન માટે એક જ અરજી." }, url: "https://www.vidyalakshmi.co.in" },
  { label: { en: "All nationalised & private banks offer education loans up to ₹10 L without collateral.", hi: "सभी राष्ट्रीयकृत व निजी बैंक ₹10 लाख तक बिना गारंटी शिक्षा ऋण देते हैं।", gu: "તમામ રાષ્ટ્રીયકૃત અને ખાનગી બેંકો ₹10 લાખ સુધીની શિક્ષણ લોન કોલેટરલ વગર આપે છે." } },
  { label: { en: "Some states (West Bengal, Odisha, Bihar) offer student credit cards at low interest.", hi: "पश्चिम बंगाल, ओडिशा, बिहार जैसे कुछ राज्य कम ब्याज पर स्टूडेंट क्रेडिट कार्ड देते हैं।", gu: "પશ્ચિમ બંગાળ, ઓડિશા, બિહાર જેવા કેટલાક રાજ્યો ઓછા વ્યાજે સ્ટુડન્ટ ક્રેડિટ કાર્ડ આપે છે." } },
];

export const DEFAULT_ONLINE: OnlineCourse[] = [
  { provider: "NPTEL / SWAYAM", title: { en: "Free government-run MOOCs across engineering, management, sciences and humanities.", hi: "इंजीनियरिंग, प्रबंधन, विज्ञान व मानविकी में मुफ्त सरकारी MOOC.", gu: "એન્જિનિયરિંગ, મેનેજમેન્ટ, વિજ્ઞાન અને માનવવિદ્યાના મફત સરકારી MOOC." }, url: "https://swayam.gov.in" },
  { provider: "Coursera / edX / Udemy", title: { en: "Global platforms with certificate & degree pathways.", hi: "प्रमाणपत्र और डिग्री पथ वाले वैश्विक प्लेटफ़ॉर्म.", gu: "સર્ટિફિકેટ અને ડિગ્રી માર્ગ સાથે વૈશ્વિક પ્લેટફોર્મ્સ." }, url: "https://www.coursera.org" },
];

export const DEFAULT_DISTANCE: Institute[] = [
  { name: "IGNOU (Indira Gandhi National Open University)" },
  { name: "Dr. B. R. Ambedkar Open University" },
];

/* ------------------------------------------------------------------
 * Per-career overrides. Keyed by pathSlug(title).
 * Seeded with a reference implementation for the uploaded card
 * (Industrial Designer, matched to B.Des) plus a handful of flagship
 * paths from careerData.ts. Others fall back to the defaults above.
 * ------------------------------------------------------------------ */
export const CAREER_CARDS: Record<string, CareerCardExtras> = {
  // B.Des (Design) – reference implementation from DS001-Industrial-Designer.pdf
  "b-des-design": {
    competencies: {
      en: [
        "You like to build and shape things with your hands.",
        "You are drawn to art, form and aesthetics.",
        "You are comfortable working in cross-functional teams.",
        "You are good with computers and 3D / CAD software.",
      ],
      hi: [
        "आप हाथों से चीज़ें बनाना और आकार देना पसंद करते हैं।",
        "आप कला, आकार और सौंदर्य की ओर आकर्षित हैं।",
        "आप विविध टीमों में सहज होकर काम कर सकते हैं।",
        "आप कंप्यूटर व 3D / CAD सॉफ़्टवेयर में दक्ष हैं।",
      ],
      gu: [
        "તમે હાથે વસ્તુઓ બનાવવી અને આકાર આપવો ગમે છે.",
        "તમને કલા, આકાર અને સૌંદર્ય તરફ ખેંચાણ છે.",
        "તમે વિવિધ ટીમમાં સાથે કામ કરી શકો છો.",
        "તમે કમ્પ્યુટર અને 3D / CAD સોફ્ટવેર સાથે સહજ છો.",
      ],
    },
    placesOfWork: {
      en: ["Design centres & studios", "Product manufacturing sites", "Testing facilities & user homes", "Client exhibits and showrooms"],
      hi: ["डिज़ाइन केंद्र व स्टूडियो", "प्रोडक्ट निर्माण स्थल", "टेस्टिंग सुविधाएँ व यूज़र होम", "क्लाइंट प्रदर्शनी व शोरूम"],
      gu: ["ડિઝાઇન કેન્દ્રો અને સ્ટુડિયો", "પ્રોડક્ટ મેન્યુફેક્ચરિંગ સ્થળ", "ટેસ્ટિંગ સુવિધા અને યુઝર હોમ", "ક્લાયન્ટ પ્રદર્શન અને શોરૂમ"],
    },
    workEnvironment: {
      en: "5–6 days a week, 8–9 hours a day. Shift-based work is common in manufacturing tie-ups.",
      hi: "सप्ताह में 5–6 दिन, प्रतिदिन 8–9 घंटे। मैन्युफैक्चरिंग साझेदारी में शिफ्ट सामान्य है।",
      gu: "અઠવાડિયામાં 5–6 દિવસ, રોજ 8–9 કલાક. મેન્યુફેક્ચરિંગ ટાઇ-અપ્સમાં શિફ્ટ સામાન્ય છે.",
    },
    entrepreneurship: {
      en: "Yes — many designers launch their own studios or product brands.",
      hi: "हाँ — कई डिज़ाइनर अपना खुद का स्टूडियो या प्रोडक्ट ब्रांड शुरू करते हैं।",
      gu: "હા — ઘણા ડિઝાઇનર્સ પોતાનો સ્ટુડિયો કે પ્રોડક્ટ બ્રાન્ડ શરૂ કરે છે.",
    },
    differentlyAbled: DEFAULT_DIFFERENTLY_ABLED,
    ladder: {
      en: ["Trainee Industrial Designer", "Industrial Designer", "Senior Industrial Designer", "Design Lead / Director"],
      hi: ["ट्रेनी इंडस्ट्रियल डिज़ाइनर", "इंडस्ट्रियल डिज़ाइनर", "सीनियर इंडस्ट्रियल डिज़ाइनर", "डिज़ाइन लीड / डायरेक्टर"],
      gu: ["ટ્રેની ઇન્ડસ્ટ્રિયલ ડિઝાઇનર", "ઇન્ડસ્ટ્રિયલ ડિઝાઇનર", "સિનિયર ઇન્ડસ્ટ્રિયલ ડિઝાઇનર", "ડિઝાઇન લીડ / ડિરેક્ટર"],
    },
    govtInstitutes: [
      { name: "IIT Bombay – Industrial Design Centre" },
      { name: "IIT Roorkee" },
      { name: "NID Ahmedabad / Gandhinagar" },
      { name: "NID Assam / MP / Haryana / Andhra Pradesh" },
      { name: "NIT Rourkela" },
    ],
    privateInstitutes: [
      { name: "Symbiosis Institute of Design, Pune" },
      { name: "Unitedworld Institute of Design, Ahmedabad" },
      { name: "Nirma University, Ahmedabad" },
      { name: "MIT Institute of Design, Pune" },
      { name: "Srishti Manipal Institute, Bengaluru" },
      { name: "VIT, Vellore" },
    ],
    distanceLearning: [{ name: "IGNOU – School of Vocational Education & Training" }],
    onlineCourses: [
      { provider: "NPTEL", title: { en: "Product Design & Development", hi: "प्रोडक्ट डिज़ाइन एवं विकास", gu: "પ્રોડક્ટ ડિઝાઇન અને વિકાસ" }, url: "https://onlinecourses.nptel.ac.in" },
      { provider: "Udemy", title: { en: "Drawing for Product Design", hi: "प्रोडक्ट डिज़ाइन के लिए ड्रॉइंग", gu: "પ્રોડક્ટ ડિઝાઇન માટે ડ્રોઇંગ" }, url: "https://www.udemy.com/course/drawing-for-product-design/" },
    ],
    loans: DEFAULT_LOANS,
    roleModel: {
      name: "Mann Singh",
      bio: {
        en: "Indian product/industrial designer and Design Director at HOF (award-winning Indian furniture brand). B.Des from NID Ahmedabad; won Elle Decor International Design Award in 2009 and 2010.",
        hi: "भारतीय प्रोडक्ट/इंडस्ट्रियल डिज़ाइनर, HOF (पुरस्कार-प्राप्त फ़र्नीचर ब्रांड) के डिज़ाइन डायरेक्टर। NID अहमदाबाद से B.Des; 2009 व 2010 में Elle Decor इंटरनेशनल डिज़ाइन अवार्ड।",
        gu: "ભારતીય પ્રોડક્ટ/ઇન્ડસ્ટ્રિયલ ડિઝાઇનર, HOF (પુરસ્કૃત ફર્નિચર બ્રાન્ડ) ના ડિઝાઇન ડિરેક્ટર. NID અમદાવાદથી B.Des; 2009 અને 2010માં Elle Decor ઇન્ટરનેશનલ ડિઝાઇન એવોર્ડ.",
      },
      sourceUrl: "https://shop.hofindia.com/mann-singh-collection-2",
    },
    keywords: ["industrial designer", "product designer", "product design technician", "UX designer", "design engineer"],
    sources: [
      { label: "Payscale — Industrial Designer (India)", url: "https://www.payscale.com/research/IN/Job=Industrial_Designer/Salary" },
      { label: "NIRF Rankings", url: "https://www.nirfindia.org" },
    ],
  },

  // B.Tech / B.E. (Engineering)
  "b-tech-b-e-engineering": {
    competencies: {
      en: ["You enjoy maths and logical problem solving.", "You like building or fixing things.", "You are comfortable with computers and coding.", "You can work through long, structured problems."],
      hi: ["आपको गणित व तार्किक समस्याएँ पसंद हैं।", "आपको बनाना/ठीक करना अच्छा लगता है।", "आप कंप्यूटर व कोडिंग में सहज हैं।", "आप लंबी, संरचित समस्याओं पर काम कर सकते हैं।"],
      gu: ["તમને ગણિત અને તાર્કિક સમસ્યાઓ ગમે છે.", "તમને બનાવવું/સુધારવું ગમે છે.", "તમે કમ્પ્યુટર અને કોડિંગ સાથે સહજ છો.", "તમે લાંબી, સંરચિત સમસ્યાઓ પર કામ કરી શકો છો."],
    },
    ladder: {
      en: ["Trainee / Graduate Engineer", "Software / Design Engineer", "Senior Engineer / Tech Lead", "Engineering Manager / Architect", "Director / VP Engineering / Founder"],
      hi: ["ट्रेनी / ग्रेजुएट इंजीनियर", "सॉफ़्टवेयर / डिज़ाइन इंजीनियर", "सीनियर इंजीनियर / टेक लीड", "इंजीनियरिंग मैनेजर / आर्किटेक्ट", "डायरेक्टर / VP इंजीनियरिंग / फ़ाउंडर"],
      gu: ["ટ્રેની / ગ્રેજ્યુએટ એન્જિનિયર", "સોફ્ટવેર / ડિઝાઇન એન્જિનિયર", "સિનિયર એન્જિનિયર / ટેક લીડ", "એન્જિનિયરિંગ મેનેજર / આર્કિટેક્ટ", "ડિરેક્ટર / VP એન્જિનિયરિંગ / ફાઉન્ડર"],
    },
    govtInstitutes: [
      { name: "IITs (Bombay, Delhi, Madras, Kanpur, Kharagpur, Roorkee, Guwahati…)" },
      { name: "NITs (Trichy, Warangal, Surathkal, Rourkela…)" },
      { name: "IIITs (Hyderabad, Bangalore, Allahabad…)" },
      { name: "IIT Gandhinagar, SVNIT Surat" },
    ],
    privateInstitutes: [
      { name: "BITS Pilani (Pilani / Goa / Hyderabad)" },
      { name: "VIT Vellore", city: "Vellore" },
      { name: "Nirma University", city: "Ahmedabad" },
      { name: "PDEU / DA-IICT", city: "Gandhinagar" },
      { name: "Manipal Institute of Technology" },
      { name: "Thapar University, Patiala" },
    ],
    distanceLearning: DEFAULT_DISTANCE,
    onlineCourses: [
      { provider: "NPTEL", title: { en: "Full B.Tech courseware across CSE, ECE, Mech, Civil.", hi: "CSE, ECE, Mech, Civil में पूरा B.Tech पाठ्यक्रम.", gu: "CSE, ECE, Mech, Civil માટે સંપૂર્ણ B.Tech અભ્યાસક્રમ." }, url: "https://nptel.ac.in" },
      { provider: "Coursera / edX", title: { en: "IIT & IISc micro-credentials, Google/Meta specialisations.", hi: "IIT/IISc माइक्रो-क्रेडेंशियल, Google/Meta स्पेशलाइज़ेशन.", gu: "IIT/IISc માઇક્રો-ક્રેડેન્શિયલ, Google/Meta સ્પેશલાઇઝેશન." }, url: "https://www.coursera.org" },
    ],
    loans: DEFAULT_LOANS,
    roleModel: {
      name: "Sundar Pichai",
      bio: { en: "Metallurgical Engineering, IIT Kharagpur → CEO, Alphabet/Google.", hi: "मेटलर्जिकल इंजीनियरिंग, IIT खड़गपुर → CEO, Alphabet/Google.", gu: "મેટલર્જિકલ એન્જિનિયરિંગ, IIT ખડગપુર → CEO, Alphabet/Google." },
      sourceUrl: "https://abc.xyz",
    },
    keywords: ["engineer", "software engineer", "b.tech", "b.e.", "computer science", "mechanical engineer", "data scientist"],
    sources: [{ label: "NIRF Engineering Rankings", url: "https://www.nirfindia.org" }],
  },

  // MBBS
  "mbbs-medicine": {
    competencies: {
      en: ["You are patient and empathetic with people.", "You can handle long study hours and biology-heavy content.", "You stay calm under pressure.", "You value continuous, lifelong learning."],
      hi: ["आप धैर्यवान व संवेदनशील हैं।", "आप लम्बी पढ़ाई व जीव-विज्ञान संभाल सकते हैं।", "आप दबाव में शांत रहते हैं।", "आप निरंतर सीखते रहना पसंद करते हैं।"],
      gu: ["તમે ધીરજવાન અને લાગણીશીલ છો.", "તમે લાંબા અભ્યાસ અને જીવવિજ્ઞાનનો ભાર સંભાળી શકો છો.", "તમે દબાણમાં શાંત રહો છો.", "તમે સતત શીખવામાં માનો છો."],
    },
    ladder: {
      en: ["MBBS Intern", "Junior Resident", "PG (MD/MS) Resident", "Consultant / Specialist", "Senior Consultant / HOD / Practice owner"],
      hi: ["MBBS इंटर्न", "जूनियर रेज़िडेंट", "पीजी (MD/MS) रेज़िडेंट", "कंसल्टेंट / विशेषज्ञ", "सीनियर कंसल्टेंट / HOD / प्रैक्टिस मालिक"],
      gu: ["MBBS ઈન્ટર્ન", "જુનિયર રેસિડેન્ટ", "પી.જી. (MD/MS) રેસિડેન્ટ", "કન્સલ્ટન્ટ / નિષ્ણાત", "સિનિયર કન્સલ્ટન્ટ / HOD / પોતાની પ્રેક્ટિસ"],
    },
    govtInstitutes: [
      { name: "AIIMS (Delhi, Rajkot, Jodhpur, Bhopal, Patna…)" },
      { name: "PGIMER Chandigarh, JIPMER Puducherry" },
      { name: "Maulana Azad Medical College, Delhi" },
      { name: "B. J. Medical College, Ahmedabad" },
      { name: "GMC Surat / Vadodara / Bhavnagar" },
    ],
    privateInstitutes: [
      { name: "CMC Vellore" },
      { name: "Kasturba Medical College, Manipal" },
      { name: "St. John's Medical College, Bengaluru" },
      { name: "DY Patil Medical, Pune / Navi Mumbai" },
    ],
    distanceLearning: [],
    loans: DEFAULT_LOANS,
    roleModel: {
      name: "Dr. Devi Shetty",
      bio: { en: "Cardiac surgeon, founder Narayana Health — democratised affordable heart surgery in India.", hi: "कार्डियक सर्जन, नारायणा हेल्थ के संस्थापक — भारत में सुलभ हार्ट सर्जरी की शुरुआत.", gu: "કાર્ડિયાક સર્જન, નારાયણા હેલ્થના સ્થાપક — ભારતમાં પરવડે તેવી હાર્ટ સર્જરી શરૂ કરી." },
      sourceUrl: "https://www.narayanahealth.org",
    },
    keywords: ["mbbs", "doctor", "physician", "surgeon", "neet ug"],
    sources: [{ label: "NMC (National Medical Commission)", url: "https://www.nmc.org.in" }],
  },

  // CA (Chartered Accountancy)
  "ca-chartered-accountancy": {
    competencies: {
      en: ["You enjoy numbers, accounts and puzzles.", "You are patient and detail-oriented.", "You can self-study consistently for exams.", "You are comfortable with laws and regulations."],
      hi: ["आपको अंक, हिसाब व पहेलियाँ पसंद हैं।", "आप धैर्यवान व सटीक हैं।", "आप स्व-अध्ययन कर सकते हैं।", "आप कानून व नियमों में सहज हैं।"],
      gu: ["તમને આંકડા, હિસાબ અને કોયડા ગમે છે.", "તમે ધીરજવાન અને ચોકસાઈવાળા છો.", "તમે સ્વ-અભ્યાસ કરી શકો છો.", "તમે કાયદા અને નિયમો સાથે સહજ છો."],
    },
    ladder: {
      en: ["Article Assistant (3 yrs)", "Qualified CA (Industry / Big-4)", "Manager / Sr. Manager", "Partner / CFO / Practice owner"],
      hi: ["आर्टिकल असिस्टेंट (3 वर्ष)", "योग्य CA (उद्योग / Big-4)", "मैनेजर / सीनियर मैनेजर", "पार्टनर / CFO / प्रैक्टिस मालिक"],
      gu: ["આર્ટિકલ આસિસ્ટન્ટ (3 વર્ષ)", "લાયક CA (ઉદ્યોગ / Big-4)", "મેનેજર / સિનિયર મેનેજર", "પાર્ટનર / CFO / પ્રેક્ટિસ માલિક"],
    },
    govtInstitutes: [{ name: "ICAI — Institute of Chartered Accountants of India (statutory body)" }],
    privateInstitutes: [
      { name: "ICAI-approved coaching institutes (regional)" },
      { name: "J. K. Shah Classes, Aldine, VSI, ETEN CA" },
    ],
    distanceLearning: [{ name: "ICAI Board of Studies e-learning (built into every registration)" }],
    onlineCourses: DEFAULT_ONLINE,
    loans: DEFAULT_LOANS,
    roleModel: {
      name: "T. N. Manoharan",
      bio: { en: "Padma Shri CA, former ICAI President, court-appointed administrator of Satyam Computers post-fraud.", hi: "पद्मश्री CA, पूर्व ICAI अध्यक्ष, सत्यम कंप्यूटर्स के कोर्ट-नियुक्त प्रशासक.", gu: "પદ્મશ્રી CA, ભૂતપૂર્વ ICAI પ્રમુખ, સત્યમ કમ્પ્યુટર્સના કોર્ટ-નિયુક્ત વ્યવસ્થાપક." },
      sourceUrl: "https://www.icai.org",
    },
    keywords: ["ca", "chartered accountant", "auditor", "tax consultant"],
    sources: [{ label: "ICAI Official", url: "https://www.icai.org" }],
  },
};

/* ------------------------------------------------------------------ */

export function pickT(t: T | undefined, lang: Lang, fallback = ""): string {
  if (!t) return fallback;
  return t[lang] ?? t.en ?? fallback;
}
export function pickList(t: TList | undefined, lang: Lang, fallback: string[] = []): string[] {
  if (!t) return fallback;
  return t[lang] ?? t.en ?? fallback;
}

export function getCareerCard(slug: string): CareerCardExtras {
  return CAREER_CARDS[slug] ?? {};
}
