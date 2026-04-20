// Psychometric test bank — RIASEC + Multiple Intelligences + Aptitude.
// Bilingual (English / Gujarati) for grades 6-12.
//
// RIASEC (Holland Codes): 30 items, 5 per type.
// Multiple Intelligences (Gardner): 24 items, 3 per type x 8 types.
// Aptitude: 20 items (Numerical, Verbal, Logical, Spatial, Memory).

export type Lang = "en" | "gu";

export interface LikertItem {
  id: string;
  text: { en: string; gu: string };
  category: string;
}

export interface AptitudeItem {
  id: string;
  category: "Numerical" | "Verbal" | "Logical" | "Spatial" | "Memory";
  text: { en: string; gu: string };
  options: { en: string; gu: string }[];
  answer: number; // index
}

export const RIASEC_LABELS: Record<string, { name: string; nameGu: string; description: string; descriptionGu: string }> = {
  R: {
    name: "Realistic — Doer",
    nameGu: "વાસ્તવિક — કરનાર",
    description: "You enjoy hands-on activities, building, fixing, working with tools, machines, and the outdoors.",
    descriptionGu: "તમને હાથથી કરવાનું, બાંધવું, સુધારવું, ઓજારો, મશીનો અને બહારના કામો ગમે છે.",
  },
  I: {
    name: "Investigative — Thinker",
    nameGu: "સંશોધક — વિચારક",
    description: "You enjoy researching, analysing, and solving complex problems with logic.",
    descriptionGu: "તમને સંશોધન, વિશ્લેષણ અને તર્ક દ્વારા જટિલ સમસ્યા ઉકેલવાનું ગમે છે.",
  },
  A: {
    name: "Artistic — Creator",
    nameGu: "કલાત્મક — સર્જક",
    description: "You enjoy creative expression — art, music, writing, design, performance.",
    descriptionGu: "તમને કલા, સંગીત, લેખન, ડિઝાઇન, અભિનય જેવી સર્જનાત્મક પ્રવૃત્તિ ગમે છે.",
  },
  S: {
    name: "Social — Helper",
    nameGu: "સામાજિક — મદદગાર",
    description: "You enjoy helping, teaching, counselling, and working closely with people.",
    descriptionGu: "તમને લોકોને મદદ કરવી, ભણાવવું, માર્ગદર્શન આપવું ગમે છે.",
  },
  E: {
    name: "Enterprising — Persuader",
    nameGu: "ઉદ્યમી — પ્રેરક",
    description: "You enjoy leading, persuading, selling, and starting new ventures.",
    descriptionGu: "તમને નેતૃત્વ, મનાવવું, વેચાણ અને નવા સાહસો શરૂ કરવાનું ગમે છે.",
  },
  C: {
    name: "Conventional — Organiser",
    nameGu: "પરંપરાગત — સંગઠક",
    description: "You enjoy organising, working with data, following procedures, and accuracy.",
    descriptionGu: "તમને વ્યવસ્થા, ડેટા, પ્રક્રિયા અને ચોકસાઈ ગમે છે.",
  },
};

export const RIASEC_ITEMS: LikertItem[] = [
  // R
  { id: "r1", category: "R", text: { en: "I like fixing things — bicycles, gadgets, machines.", gu: "મને વસ્તુઓ સુધારવી ગમે છે — સાયકલ, ગેજેટ્સ, મશીનો." } },
  { id: "r2", category: "R", text: { en: "I enjoy building or making things with my hands.", gu: "મને હાથથી કંઈક બનાવવું ગમે છે." } },
  { id: "r3", category: "R", text: { en: "I prefer working outdoors over sitting at a desk.", gu: "મને ડેસ્ક પર બેસવાને બદલે બહાર કામ કરવું ગમે." } },
  { id: "r4", category: "R", text: { en: "I'm interested in how machines and engines work.", gu: "મશીનો અને એન્જિનો કેવી રીતે કામ કરે છે તેમાં મને રસ છે." } },
  { id: "r5", category: "R", text: { en: "I like sports, farming, or physical activities.", gu: "મને રમતગમત, ખેતી અથવા શારીરિક પ્રવૃત્તિ ગમે છે." } },
  // I
  { id: "i1", category: "I", text: { en: "I love understanding why things happen the way they do.", gu: "વસ્તુઓ આ રીતે કેમ થાય છે તે સમજવું મને ગમે છે." } },
  { id: "i2", category: "I", text: { en: "I enjoy science experiments and observation.", gu: "મને વિજ્ઞાનના પ્રયોગો અને નિરીક્ષણ ગમે છે." } },
  { id: "i3", category: "I", text: { en: "I like solving puzzles and brain-teasers.", gu: "મને કોયડા અને બ્રેઇન-ટીઝર ઉકેલવા ગમે છે." } },
  { id: "i4", category: "I", text: { en: "I'd rather research a topic deeply than skim it.", gu: "મને કોઈ વિષય ઊંડાણથી અભ્યાસ કરવો ગમે." } },
  { id: "i5", category: "I", text: { en: "I enjoy maths, logic, or analysing data.", gu: "મને ગણિત, તર્ક અથવા ડેટાનું વિશ્લેષણ ગમે છે." } },
  // A
  { id: "a1", category: "A", text: { en: "I like drawing, painting, or designing.", gu: "મને ચિત્રકામ, રંગાવટ અથવા ડિઝાઇન ગમે છે." } },
  { id: "a2", category: "A", text: { en: "I enjoy writing stories, poems, or scripts.", gu: "મને વાર્તા, કવિતા અથવા સ્ક્રિપ્ટ લખવાનું ગમે છે." } },
  { id: "a3", category: "A", text: { en: "I love music, dance, or theatre.", gu: "મને સંગીત, નૃત્ય અથવા નાટક ગમે છે." } },
  { id: "a4", category: "A", text: { en: "I prefer freedom to invent over following set rules.", gu: "મને નિયમો કરતાં શોધવાની સ્વતંત્રતા ગમે." } },
  { id: "a5", category: "A", text: { en: "I see beauty in colours, patterns, and design.", gu: "મને રંગો, પેટર્ન અને ડિઝાઇનમાં સૌંદર્ય દેખાય છે." } },
  // S
  { id: "s1", category: "S", text: { en: "I enjoy helping classmates with their problems.", gu: "મને સહપાઠીઓને તેમની સમસ્યામાં મદદ કરવી ગમે છે." } },
  { id: "s2", category: "S", text: { en: "I'd like to teach or train others.", gu: "મને બીજાઓને શીખવવું ગમે છે." } },
  { id: "s3", category: "S", text: { en: "I care deeply about my community and people around me.", gu: "મને મારા સમુદાય અને આસપાસના લોકોની ચિંતા છે." } },
  { id: "s4", category: "S", text: { en: "Listening to other people's feelings comes naturally.", gu: "બીજાની લાગણીઓ સાંભળવી મારી આદત છે." } },
  { id: "s5", category: "S", text: { en: "I'd be happy in a job that directly serves people.", gu: "જે કામ સીધું લોકોની સેવા કરે તેમાં મને ખુશી મળે." } },
  // E
  { id: "e1", category: "E", text: { en: "I like leading group projects and activities.", gu: "મને ગ્રૂપ પ્રોજેક્ટ અને પ્રવૃત્તિનું નેતૃત્વ કરવું ગમે છે." } },
  { id: "e2", category: "E", text: { en: "I enjoy convincing others of my ideas.", gu: "મને બીજાઓને મારા વિચારો પર મનાવવા ગમે છે." } },
  { id: "e3", category: "E", text: { en: "I'd love to start my own business one day.", gu: "મને એક દિવસ મારો પોતાનો બિઝનેસ શરૂ કરવો છે." } },
  { id: "e4", category: "E", text: { en: "I'm comfortable speaking in front of an audience.", gu: "મને જાહેર સભામાં બોલવામાં ડર નથી." } },
  { id: "e5", category: "E", text: { en: "I enjoy negotiating and selling things.", gu: "મને વાટાઘાટો અને વેચાણ ગમે છે." } },
  // C
  { id: "c1", category: "C", text: { en: "I keep my notes and books well organised.", gu: "મારી નોટ્સ અને પુસ્તકો વ્યવસ્થિત હોય છે." } },
  { id: "c2", category: "C", text: { en: "I like working with numbers, lists, and records.", gu: "મને નંબર, યાદી અને રેકોર્ડ સાથે કામ કરવું ગમે છે." } },
  { id: "c3", category: "C", text: { en: "I prefer clear instructions over open-ended tasks.", gu: "મને સ્પષ્ટ સૂચનાઓવાળું કામ વધુ ગમે." } },
  { id: "c4", category: "C", text: { en: "Being on time and following rules matters to me.", gu: "સમય પાળવો અને નિયમો પાળવા મારા માટે મહત્વનું છે." } },
  { id: "c5", category: "C", text: { en: "I'd enjoy a job that involves accuracy and detail.", gu: "ચોકસાઈ અને બારીકી વાળું કામ મને ગમે." } },
];

export const MI_LABELS: Record<string, { name: string; nameGu: string }> = {
  Linguistic: { name: "Linguistic (Word smart)", nameGu: "ભાષાકીય" },
  LogicalMath: { name: "Logical-Mathematical (Number smart)", nameGu: "તાર્કિક-ગણિતીય" },
  Spatial: { name: "Spatial (Picture smart)", nameGu: "અવકાશીય" },
  Bodily: { name: "Bodily-Kinesthetic (Body smart)", nameGu: "શારીરિક-ગતિશીલ" },
  Musical: { name: "Musical (Sound smart)", nameGu: "સંગીતમય" },
  Interpersonal: { name: "Interpersonal (People smart)", nameGu: "આંતરવ્યક્તિગત" },
  Intrapersonal: { name: "Intrapersonal (Self smart)", nameGu: "આત્મ-ચિંતનશીલ" },
  Naturalist: { name: "Naturalist (Nature smart)", nameGu: "પ્રાકૃતિક" },
};

export const MI_ITEMS: LikertItem[] = [
  { id: "mi1", category: "Linguistic", text: { en: "I enjoy reading books and writing essays.", gu: "મને પુસ્તકો વાંચવા અને નિબંધ લખવા ગમે છે." } },
  { id: "mi2", category: "Linguistic", text: { en: "I notice and enjoy wordplay, puns, and language patterns.", gu: "મને શબ્દોની રમત અને ભાષાની પેટર્ન ગમે છે." } },
  { id: "mi3", category: "Linguistic", text: { en: "I express my ideas easily in writing or speech.", gu: "હું મારા વિચારો સહેલાઈથી લખીને કે બોલીને કહી શકું છું." } },
  { id: "mi4", category: "LogicalMath", text: { en: "I enjoy maths problems and number patterns.", gu: "મને ગણિતની સમસ્યા અને નંબર પેટર્ન ગમે છે." } },
  { id: "mi5", category: "LogicalMath", text: { en: "I think step-by-step and like clear logical reasoning.", gu: "મને ક્રમબદ્ધ વિચારણા અને તર્ક ગમે છે." } },
  { id: "mi6", category: "LogicalMath", text: { en: "I quickly spot inconsistencies in arguments.", gu: "દલીલમાં વિરોધાભાસ હું ઝડપથી ઓળખું છું." } },
  { id: "mi7", category: "Spatial", text: { en: "I can easily picture maps, rooms, or 3D objects in my mind.", gu: "મને નકશા, રૂમ અથવા 3D વસ્તુઓ માનસપટલ પર સ્પષ્ટ દેખાય છે." } },
  { id: "mi8", category: "Spatial", text: { en: "I enjoy drawing, designing, or solving visual puzzles.", gu: "મને ચિત્રકામ, ડિઝાઇન અથવા દ્રશ્ય કોયડા ગમે છે." } },
  { id: "mi9", category: "Spatial", text: { en: "I have a good sense of direction.", gu: "મને દિશાનું સારું જ્ઞાન છે." } },
  { id: "mi10", category: "Bodily", text: { en: "I learn faster by doing than by reading.", gu: "હું વાંચવા કરતાં કરીને વધુ ઝડપથી શીખું છું." } },
  { id: "mi11", category: "Bodily", text: { en: "I enjoy sports, dance, or physical games.", gu: "મને રમત, નૃત્ય અથવા શારીરિક રમતો ગમે છે." } },
  { id: "mi12", category: "Bodily", text: { en: "I'm good at using my hands for crafts or repairs.", gu: "મને હાથની કારીગરી અને સુધારકામ સારું આવડે છે." } },
  { id: "mi13", category: "Musical", text: { en: "I remember tunes and songs easily.", gu: "મને ગીત-ધૂનો સહેલાઈથી યાદ રહે છે." } },
  { id: "mi14", category: "Musical", text: { en: "I tap, hum, or sing along often.", gu: "હું વારંવાર ગુનગુનાવું છું કે તાલ આપું છું." } },
  { id: "mi15", category: "Musical", text: { en: "I notice rhythm and pitch in everyday sounds.", gu: "રોજિંદા અવાજોમાં હું તાલ અને સૂર પારખું છું." } },
  { id: "mi16", category: "Interpersonal", text: { en: "I make friends easily and enjoy group work.", gu: "મને જલ્દી મિત્રો બને છે અને ગ્રૂપ વર્ક ગમે છે." } },
  { id: "mi17", category: "Interpersonal", text: { en: "I sense how others are feeling.", gu: "બીજાની લાગણી હું પારખી શકું છું." } },
  { id: "mi18", category: "Interpersonal", text: { en: "Friends often come to me for advice.", gu: "મિત્રો વારંવાર મારી પાસે સલાહ લેવા આવે છે." } },
  { id: "mi19", category: "Intrapersonal", text: { en: "I understand my own emotions and motivations well.", gu: "મને મારી લાગણીઓ અને પ્રેરણા સમજાય છે." } },
  { id: "mi20", category: "Intrapersonal", text: { en: "I prefer reflecting alone before making decisions.", gu: "નિર્ણય લેતા પહેલાં હું એકલા વિચારવાનું પસંદ કરું છું." } },
  { id: "mi21", category: "Intrapersonal", text: { en: "I have clear personal goals and values.", gu: "મારા સ્પષ્ટ વ્યક્તિગત લક્ષ્ય અને મૂલ્યો છે." } },
  { id: "mi22", category: "Naturalist", text: { en: "I love being in nature, with plants or animals.", gu: "મને કુદરત, છોડ અને પ્રાણીઓની વચ્ચે રહેવું ગમે છે." } },
  { id: "mi23", category: "Naturalist", text: { en: "I notice and remember different birds, plants, or weather.", gu: "મને જુદાં પક્ષીઓ, છોડ અથવા હવામાનની નોંધ રહે છે." } },
  { id: "mi24", category: "Naturalist", text: { en: "I care about environment and sustainability.", gu: "મને પર્યાવરણ અને ટકાઉપણાંની ચિંતા છે." } },
];

export const APTITUDE_ITEMS: AptitudeItem[] = [
  // Numerical
  {
    id: "ap1",
    category: "Numerical",
    text: { en: "If 5 pencils cost ₹40, how much do 8 pencils cost?", gu: "જો 5 પેન્સિલની કિંમત ₹40 છે, તો 8 પેન્સિલની કિંમત શું?" },
    options: [
      { en: "₹56", gu: "₹56" },
      { en: "₹64", gu: "₹64" },
      { en: "₹72", gu: "₹72" },
      { en: "₹80", gu: "₹80" },
    ],
    answer: 1,
  },
  {
    id: "ap2",
    category: "Numerical",
    text: { en: "What is 15% of 240?", gu: "240નું 15% શું?" },
    options: [
      { en: "24", gu: "24" },
      { en: "32", gu: "32" },
      { en: "36", gu: "36" },
      { en: "48", gu: "48" },
    ],
    answer: 2,
  },
  {
    id: "ap3",
    category: "Numerical",
    text: { en: "Next number: 2, 6, 12, 20, ?", gu: "આગળનો નંબર: 2, 6, 12, 20, ?" },
    options: [
      { en: "26", gu: "26" },
      { en: "28", gu: "28" },
      { en: "30", gu: "30" },
      { en: "32", gu: "32" },
    ],
    answer: 2,
  },
  {
    id: "ap4",
    category: "Numerical",
    text: { en: "A train covers 180 km in 3 hours. Speed in km/h?", gu: "ટ્રેન 3 કલાકમાં 180 કિમી જાય. ગતિ કિમી/કલાક?" },
    options: [
      { en: "50", gu: "50" },
      { en: "55", gu: "55" },
      { en: "60", gu: "60" },
      { en: "65", gu: "65" },
    ],
    answer: 2,
  },
  // Verbal
  {
    id: "ap5",
    category: "Verbal",
    text: { en: "Choose the synonym of ABUNDANT:", gu: "ABUNDANT નો સમાનાર્થી પસંદ કરો:" },
    options: [
      { en: "Scarce", gu: "દુર્લભ" },
      { en: "Plentiful", gu: "વિપુલ" },
      { en: "Tiny", gu: "નાનું" },
      { en: "Empty", gu: "ખાલી" },
    ],
    answer: 1,
  },
  {
    id: "ap6",
    category: "Verbal",
    text: { en: "Antonym of BRAVE:", gu: "BRAVE નો વિરુદ્ધાર્થી:" },
    options: [
      { en: "Bold", gu: "બહાદુર" },
      { en: "Cowardly", gu: "ડરપોક" },
      { en: "Strong", gu: "શક્તિશાળી" },
      { en: "Heroic", gu: "વીર" },
    ],
    answer: 1,
  },
  {
    id: "ap7",
    category: "Verbal",
    text: { en: "Doctor : Hospital :: Teacher : ?", gu: "ડોક્ટર : હોસ્પિટલ :: શિક્ષક : ?" },
    options: [
      { en: "Office", gu: "ઓફિસ" },
      { en: "School", gu: "શાળા" },
      { en: "Library", gu: "ગ્રંથાલય" },
      { en: "Court", gu: "કોર્ટ" },
    ],
    answer: 1,
  },
  {
    id: "ap8",
    category: "Verbal",
    text: { en: "Pick the odd one out:", gu: "વિચિત્ર પસંદ કરો:" },
    options: [
      { en: "Apple", gu: "સફરજન" },
      { en: "Banana", gu: "કેળું" },
      { en: "Carrot", gu: "ગાજર" },
      { en: "Mango", gu: "આંબો" },
    ],
    answer: 2,
  },
  // Logical
  {
    id: "ap9",
    category: "Logical",
    text: {
      en: "All roses are flowers. Some flowers fade quickly. Therefore:",
      gu: "બધાં ગુલાબ ફૂલ છે. કેટલાંક ફૂલ જલ્દી મરી જાય. તેથી:",
    },
    options: [
      { en: "All roses fade quickly", gu: "બધાં ગુલાબ જલ્દી મરી જાય" },
      { en: "Some roses might fade quickly", gu: "કેટલાંક ગુલાબ જલ્દી મરી શકે" },
      { en: "No roses fade", gu: "કોઈ ગુલાબ મરી જાય નહીં" },
      { en: "Roses are not flowers", gu: "ગુલાબ ફૂલ નથી" },
    ],
    answer: 1,
  },
  {
    id: "ap10",
    category: "Logical",
    text: { en: "Find the missing letter: A, C, F, J, ?", gu: "ખૂટતો અક્ષર: A, C, F, J, ?" },
    options: [
      { en: "M", gu: "M" },
      { en: "N", gu: "N" },
      { en: "O", gu: "O" },
      { en: "P", gu: "P" },
    ],
    answer: 2,
  },
  {
    id: "ap11",
    category: "Logical",
    text: {
      en: "If MONDAY is coded as NPOEBZ, how is FRIDAY coded?",
      gu: "જો MONDAY = NPOEBZ, તો FRIDAY = ?",
    },
    options: [
      { en: "GSJEBZ", gu: "GSJEBZ" },
      { en: "GSJFBZ", gu: "GSJFBZ" },
      { en: "GSJEBA", gu: "GSJEBA" },
      { en: "HTKFCA", gu: "HTKFCA" },
    ],
    answer: 0,
  },
  {
    id: "ap12",
    category: "Logical",
    text: {
      en: "Ravi is taller than Sita. Sita is taller than Mira. Who is shortest?",
      gu: "રવિ સીતા કરતાં ઊંચો છે. સીતા મીરા કરતાં ઊંચી છે. સૌથી નાનું કોણ?",
    },
    options: [
      { en: "Ravi", gu: "રવિ" },
      { en: "Sita", gu: "સીતા" },
      { en: "Mira", gu: "મીરા" },
      { en: "Cannot say", gu: "કહી શકાય નહીં" },
    ],
    answer: 2,
  },
  // Spatial
  {
    id: "ap13",
    category: "Spatial",
    text: {
      en: "How many faces does a cube have?",
      gu: "ઘન (cube) ને કેટલાં ફેસ હોય છે?",
    },
    options: [
      { en: "4", gu: "4" },
      { en: "6", gu: "6" },
      { en: "8", gu: "8" },
      { en: "12", gu: "12" },
    ],
    answer: 1,
  },
  {
    id: "ap14",
    category: "Spatial",
    text: {
      en: "If you fold a square paper twice in half, how many small squares form?",
      gu: "ચોરસ કાગળને બે વાર અડધો વાળો, તો કેટલાં નાના ચોરસ બને?",
    },
    options: [
      { en: "2", gu: "2" },
      { en: "3", gu: "3" },
      { en: "4", gu: "4" },
      { en: "8", gu: "8" },
    ],
    answer: 2,
  },
  {
    id: "ap15",
    category: "Spatial",
    text: {
      en: "Mirror image of the letter 'b' looks like:",
      gu: "'b' અક્ષરનું દર્પણ-પ્રતિબિંબ કેવું દેખાય?",
    },
    options: [
      { en: "p", gu: "p" },
      { en: "d", gu: "d" },
      { en: "q", gu: "q" },
      { en: "b", gu: "b" },
    ],
    answer: 1,
  },
  {
    id: "ap16",
    category: "Spatial",
    text: {
      en: "Walking 3 km North, then 4 km East — how far from start (straight line)?",
      gu: "3 કિમી ઉત્તર, પછી 4 કિમી પૂર્વ ચાલ્યા — શરૂઆતથી સીધી દૂરી?",
    },
    options: [
      { en: "5 km", gu: "5 કિમી" },
      { en: "6 km", gu: "6 કિમી" },
      { en: "7 km", gu: "7 કિમી" },
      { en: "12 km", gu: "12 કિમી" },
    ],
    answer: 0,
  },
  // Memory
  {
    id: "ap17",
    category: "Memory",
    text: {
      en: "Memorise: 7-2-9-4-6. Which digit was 3rd?",
      gu: "યાદ રાખો: 7-2-9-4-6. ત્રીજો અંક?",
    },
    options: [
      { en: "2", gu: "2" },
      { en: "9", gu: "9" },
      { en: "4", gu: "4" },
      { en: "6", gu: "6" },
    ],
    answer: 1,
  },
  {
    id: "ap18",
    category: "Memory",
    text: {
      en: "List: Apple, Sun, Book, Tiger, River. Which is the animal?",
      gu: "યાદી: સફરજન, સૂર્ય, પુસ્તક, વાઘ, નદી. પ્રાણી કયું?",
    },
    options: [
      { en: "Apple", gu: "સફરજન" },
      { en: "Sun", gu: "સૂર્ય" },
      { en: "Tiger", gu: "વાઘ" },
      { en: "River", gu: "નદી" },
    ],
    answer: 2,
  },
  {
    id: "ap19",
    category: "Memory",
    text: {
      en: "Sequence: ▲ ● ■ ▲ ● ?  What comes next?",
      gu: "ક્રમ: ▲ ● ■ ▲ ● ?  પછી શું?",
    },
    options: [
      { en: "▲", gu: "▲" },
      { en: "●", gu: "●" },
      { en: "■", gu: "■" },
      { en: "★", gu: "★" },
    ],
    answer: 2,
  },
  {
    id: "ap20",
    category: "Memory",
    text: {
      en: "Words: Cat, Dog, Cow, Cat, Dog. How many times did 'Cat' appear?",
      gu: "શબ્દો: બિલાડી, કૂતરો, ગાય, બિલાડી, કૂતરો. 'બિલાડી' કેટલી વાર?",
    },
    options: [
      { en: "1", gu: "1" },
      { en: "2", gu: "2" },
      { en: "3", gu: "3" },
      { en: "4", gu: "4" },
    ],
    answer: 1,
  },
];

export const LIKERT_OPTIONS: { value: number; label: { en: string; gu: string } }[] = [
  { value: 1, label: { en: "Strongly Disagree", gu: "પૂરતો અસંમત" } },
  { value: 2, label: { en: "Disagree", gu: "અસંમત" } },
  { value: 3, label: { en: "Neutral", gu: "તટસ્થ" } },
  { value: 4, label: { en: "Agree", gu: "સંમત" } },
  { value: 5, label: { en: "Strongly Agree", gu: "પૂરેપૂરો સંમત" } },
];

export interface ScoreReport {
  riasec: Record<string, number>; // R/I/A/S/E/C → 0-100
  riasecTop: string[]; // top 3
  mi: Record<string, number>; // 0-100
  miTop: string[]; // top 3
  aptitude: Record<string, { correct: number; total: number; pct: number }>;
  aptitudeTop: string[];
  aptitudeOverall: number; // overall %
}

export function scoreLikert(items: LikertItem[], answers: Record<string, number>) {
  const totals: Record<string, { sum: number; count: number }> = {};
  for (const item of items) {
    const v = answers[item.id] ?? 3;
    if (!totals[item.category]) totals[item.category] = { sum: 0, count: 0 };
    totals[item.category].sum += v;
    totals[item.category].count += 1;
  }
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(totals)) {
    out[k] = Math.round(((v.sum - v.count) / (v.count * 4)) * 100); // map 1..5 → 0..100
  }
  return out;
}

export function scoreAptitude(items: AptitudeItem[], answers: Record<string, number>) {
  const cats: Record<string, { correct: number; total: number }> = {};
  for (const item of items) {
    if (!cats[item.category]) cats[item.category] = { correct: 0, total: 0 };
    cats[item.category].total += 1;
    if (answers[item.id] === item.answer) cats[item.category].correct += 1;
  }
  const out: Record<string, { correct: number; total: number; pct: number }> = {};
  let total = 0;
  let correct = 0;
  for (const [k, v] of Object.entries(cats)) {
    out[k] = { ...v, pct: Math.round((v.correct / v.total) * 100) };
    total += v.total;
    correct += v.correct;
  }
  return { perCategory: out, overall: Math.round((correct / total) * 100) };
}

export function buildReport(
  riasecAns: Record<string, number>,
  miAns: Record<string, number>,
  aptAns: Record<string, number>
): ScoreReport {
  const riasec = scoreLikert(RIASEC_ITEMS, riasecAns);
  const mi = scoreLikert(MI_ITEMS, miAns);
  const apt = scoreAptitude(APTITUDE_ITEMS, aptAns);
  const top = (obj: Record<string, number>, n: number) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([k]) => k);
  const aptTop = Object.entries(apt.perCategory)
    .sort((a, b) => b[1].pct - a[1].pct)
    .slice(0, 2)
    .map(([k]) => k);
  return {
    riasec,
    riasecTop: top(riasec, 3),
    mi,
    miTop: top(mi, 3),
    aptitude: apt.perCategory,
    aptitudeTop: aptTop,
    aptitudeOverall: apt.overall,
  };
}
