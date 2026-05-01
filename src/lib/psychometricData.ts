// Psychometric test bank — RIASEC + Multiple Intelligences + Aptitude.
// Bilingual (English / Gujarati) for the on-screen test UI; reports are English-only.
//
// RIASEC (Holland Codes): 30 items, 5 per type.
// Multiple Intelligences (Gardner): 24 items, 3 per type x 8 types.
// Aptitude: ~75 items, tagged by grade band (6-8, 9-10, 11-12) and category
//           (Numerical, Verbal, Logical, Spatial, Mechanical, DataInterpretation).
//           Selection logic in test.take.tsx serves only items matching the
//           student's grade band — ~24 questions per attempt.

export type Lang = "en" | "gu";
export type GradeBand = "6-8" | "9-10" | "11-12";
export type AptitudeCategory =
  | "Numerical"
  | "Verbal"
  | "Logical"
  | "Spatial"
  | "Mechanical"
  | "DataInterpretation";

export interface LikertItem {
  id: string;
  text: { en: string; gu: string };
  category: string;
}

export interface AptitudeItem {
  id: string;
  category: AptitudeCategory;
  gradeBand: GradeBand;
  text: { en: string; gu: string };
  options: { en: string; gu: string }[];
  answer: number; // index
}

export function gradeToBand(grade: string | number | undefined): GradeBand {
  const n = Number(grade);
  if (!Number.isFinite(n)) return "9-10";
  if (n <= 8) return "6-8";
  if (n <= 10) return "9-10";
  return "11-12";
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

// Helper to keep aptitude items concise. answer is the 0-based index.
const opt = (...items: string[]) => items.map((s) => ({ en: s, gu: s }));

// ============================================================
// APTITUDE BANK — grade-banded, NCERT-aligned difficulty.
// ~25 items per band × 3 bands = ~75 total.
// Categories balanced 4–5 per category per band.
// ============================================================
export const APTITUDE_ITEMS: AptitudeItem[] = [
  // ============================================================
  // GRADE 6–8 — arithmetic, basic algebra, vocab, simple analogies,
  // pattern recognition, mirror images, simple mechanical cause-effect.
  // ============================================================

  // Numerical (5)
  { id: "g68_n1", category: "Numerical", gradeBand: "6-8",
    text: { en: "If 5 pencils cost ₹40, how much do 8 pencils cost?", gu: "જો 5 પેન્સિલની કિંમત ₹40, તો 8 પેન્સિલની?" },
    options: opt("₹56", "₹64", "₹72", "₹80"), answer: 1 },
  { id: "g68_n2", category: "Numerical", gradeBand: "6-8",
    text: { en: "Find: 1/2 + 1/3 = ?", gu: "ગણો: 1/2 + 1/3 = ?" },
    options: opt("2/5", "5/6", "3/5", "1/6"), answer: 1 },
  { id: "g68_n3", category: "Numerical", gradeBand: "6-8",
    text: { en: "What is the next number? 2, 6, 12, 20, ?", gu: "આગળનો નંબર: 2, 6, 12, 20, ?" },
    options: opt("26", "28", "30", "32"), answer: 2 },
  { id: "g68_n4", category: "Numerical", gradeBand: "6-8",
    text: { en: "If x + 7 = 15, then x = ?", gu: "જો x + 7 = 15, તો x = ?" },
    options: opt("6", "7", "8", "9"), answer: 2 },
  { id: "g68_n5", category: "Numerical", gradeBand: "6-8",
    text: { en: "A bag has 3 red and 2 blue balls. Probability of red?", gu: "બેગમાં 3 લાલ અને 2 ભૂરા બોલ. લાલની સંભાવના?" },
    options: opt("2/5", "3/5", "1/2", "1/5"), answer: 1 },

  // Verbal (4)
  { id: "g68_v1", category: "Verbal", gradeBand: "6-8",
    text: { en: "Choose the synonym of HAPPY:", gu: "HAPPY નો સમાનાર્થી પસંદ કરો:" },
    options: opt("Sad", "Joyful", "Angry", "Tired"), answer: 1 },
  { id: "g68_v2", category: "Verbal", gradeBand: "6-8",
    text: { en: "Antonym of BRAVE:", gu: "BRAVE નો વિરુદ્ધાર્થી:" },
    options: opt("Bold", "Cowardly", "Strong", "Heroic"), answer: 1 },
  { id: "g68_v3", category: "Verbal", gradeBand: "6-8",
    text: { en: "Doctor : Hospital :: Teacher : ?", gu: "ડોક્ટર : હોસ્પિટલ :: શિક્ષક : ?" },
    options: opt("Office", "School", "Library", "Court"), answer: 1 },
  { id: "g68_v4", category: "Verbal", gradeBand: "6-8",
    text: { en: "Pick the odd one out:", gu: "વિચિત્ર પસંદ કરો:" },
    options: opt("Apple", "Banana", "Carrot", "Mango"), answer: 2 },

  // Logical (4)
  { id: "g68_l1", category: "Logical", gradeBand: "6-8",
    text: { en: "Find the missing letter: A, C, E, G, ?", gu: "ખૂટતો અક્ષર: A, C, E, G, ?" },
    options: opt("H", "I", "J", "K"), answer: 1 },
  { id: "g68_l2", category: "Logical", gradeBand: "6-8",
    text: { en: "Ravi is taller than Sita. Sita is taller than Mira. Who is shortest?", gu: "રવિ સીતાથી ઊંચો, સીતા મીરાથી ઊંચી. સૌથી નાનું?" },
    options: opt("Ravi", "Sita", "Mira", "Cannot say"), answer: 2 },
  { id: "g68_l3", category: "Logical", gradeBand: "6-8",
    text: { en: "If today is Wednesday, what day will it be 10 days later?", gu: "જો આજે બુધવાર છે, તો 10 દિવસ પછી કયો વાર?" },
    options: opt("Friday", "Saturday", "Sunday", "Monday"), answer: 1 },
  { id: "g68_l4", category: "Logical", gradeBand: "6-8",
    text: { en: "Series: 1, 4, 9, 16, ?", gu: "શ્રેણી: 1, 4, 9, 16, ?" },
    options: opt("20", "24", "25", "30"), answer: 2 },

  // Spatial (4)
  { id: "g68_s1", category: "Spatial", gradeBand: "6-8",
    text: { en: "How many faces does a cube have?", gu: "ઘન (cube) ને કેટલાં ફેસ?" },
    options: opt("4", "6", "8", "12"), answer: 1 },
  { id: "g68_s2", category: "Spatial", gradeBand: "6-8",
    text: { en: "Mirror image of the letter 'b' looks like:", gu: "'b' નું દર્પણ-પ્રતિબિંબ:" },
    options: opt("p", "d", "q", "b"), answer: 1 },
  { id: "g68_s3", category: "Spatial", gradeBand: "6-8",
    text: { en: "Walking 3 km North then 4 km East — straight-line distance?", gu: "3 કિમી ઉત્તર, પછી 4 કિમી પૂર્વ — સીધી દૂરી?" },
    options: opt("5 km", "6 km", "7 km", "12 km"), answer: 0 },
  { id: "g68_s4", category: "Spatial", gradeBand: "6-8",
    text: { en: "Fold a square paper in half twice. How many small squares form?", gu: "ચોરસ કાગળ બે વાર અડધો વાળો — કેટલાં નાના ચોરસ?" },
    options: opt("2", "3", "4", "8"), answer: 2 },

  // Mechanical (4)
  { id: "g68_m1", category: "Mechanical", gradeBand: "6-8",
    text: { en: "Which of these is a simple machine?", gu: "આમાંથી સરળ યંત્ર કયું?" },
    options: opt("Lever", "Computer", "Mobile phone", "TV"), answer: 0 },
  { id: "g68_m2", category: "Mechanical", gradeBand: "6-8",
    text: { en: "A see-saw is an example of a:", gu: "સી-સો કયા પ્રકારનું યંત્ર છે?" },
    options: opt("Pulley", "Lever", "Wedge", "Screw"), answer: 1 },
  { id: "g68_m3", category: "Mechanical", gradeBand: "6-8",
    text: { en: "A bicycle uses which simple machines mainly?", gu: "સાયકલ મુખ્યત્વે કયા સરળ યંત્રો વાપરે છે?" },
    options: opt("Wheel and axle, lever", "Pulley only", "Screw only", "None"), answer: 0 },
  { id: "g68_m4", category: "Mechanical", gradeBand: "6-8",
    text: { en: "If you drop a stone and a feather in vacuum, which lands first?", gu: "શૂન્યાવકાશમાં પથ્થર અને પીંછું ફેંકો — પહેલા કયું પડે?" },
    options: opt("Stone", "Feather", "Both together", "Neither falls"), answer: 2 },

  // Data Interpretation (4)
  { id: "g68_d1", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "Class strength: Class 6 = 30, Class 7 = 35, Class 8 = 25. Total students?", gu: "વર્ગ સંખ્યા: 6 = 30, 7 = 35, 8 = 25. કુલ?" },
    options: opt("80", "85", "90", "95"), answer: 2 },
  { id: "g68_d2", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "If a pie chart shows 25% Maths, 25% Science, 50% Other — Other is what fraction?", gu: "પાઇ ચાર્ટ: 25% ગણિત, 25% વિજ્ઞાન, 50% અન્ય — અન્યનો અપૂર્ણાંક?" },
    options: opt("1/4", "1/3", "1/2", "2/3"), answer: 2 },
  { id: "g68_d3", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "Rainfall (mm): Mon 5, Tue 10, Wed 15, Thu 0. Average?", gu: "વરસાદ (mm): સોમ 5, મંગ 10, બુધ 15, ગુરુ 0. સરેરાશ?" },
    options: opt("5", "7.5", "10", "30"), answer: 1 },
  { id: "g68_d4", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "If 60 out of 100 students passed, what % failed?", gu: "જો 100માંથી 60 વિદ્યાર્થી પાસ થયા, કેટલા % ફેલ?" },
    options: opt("30%", "40%", "50%", "60%"), answer: 1 },

  // ============================================================
  // GRADE 9–10 — percentages, ratios, geometry, comprehension,
  // reasoning chains, paper folding, levers/pulleys, charts.
  // ============================================================

  // Numerical (5)
  { id: "g910_n1", category: "Numerical", gradeBand: "9-10",
    text: { en: "What is 15% of 240?", gu: "240 નું 15% શું?" },
    options: opt("24", "32", "36", "48"), answer: 2 },
  { id: "g910_n2", category: "Numerical", gradeBand: "9-10",
    text: { en: "A train covers 180 km in 3 hours. Speed in km/h?", gu: "ટ્રેન 3 કલાકમાં 180 કિમી. ગતિ?" },
    options: opt("50", "55", "60", "65"), answer: 2 },
  { id: "g910_n3", category: "Numerical", gradeBand: "9-10",
    text: { en: "If a:b = 2:3 and b:c = 4:5, then a:c = ?", gu: "જો a:b = 2:3 અને b:c = 4:5, તો a:c?" },
    options: opt("2:5", "8:15", "4:5", "2:3"), answer: 1 },
  { id: "g910_n4", category: "Numerical", gradeBand: "9-10",
    text: { en: "Simple interest on ₹2000 at 5% per year for 3 years?", gu: "₹2000 પર 5% પ્રતિ વર્ષ, 3 વર્ષનું સાદું વ્યાજ?" },
    options: opt("₹200", "₹250", "₹300", "₹400"), answer: 2 },
  { id: "g910_n5", category: "Numerical", gradeBand: "9-10",
    text: { en: "Solve: 2x − 5 = 11, x = ?", gu: "ઉકેલો: 2x − 5 = 11, x = ?" },
    options: opt("3", "6", "8", "16"), answer: 2 },

  // Verbal (4)
  { id: "g910_v1", category: "Verbal", gradeBand: "9-10",
    text: { en: "Synonym of ABUNDANT:", gu: "ABUNDANT નો સમાનાર્થી:" },
    options: opt("Scarce", "Plentiful", "Tiny", "Empty"), answer: 1 },
  { id: "g910_v2", category: "Verbal", gradeBand: "9-10",
    text: { en: "Choose the correctly spelt word:", gu: "સાચી જોડણી પસંદ કરો:" },
    options: opt("Recieve", "Receive", "Receeve", "Recive"), answer: 1 },
  { id: "g910_v3", category: "Verbal", gradeBand: "9-10",
    text: { en: "Architect : Building :: Author : ?", gu: "આર્કિટેક્ટ : ઇમારત :: લેખક : ?" },
    options: opt("Pen", "Book", "Paper", "Library"), answer: 1 },
  { id: "g910_v4", category: "Verbal", gradeBand: "9-10",
    text: { en: "Identify the part of speech: 'She runs quickly.' — quickly is a:", gu: "વાક્યમાં 'quickly' કયો ભાગ?" },
    options: opt("Noun", "Verb", "Adjective", "Adverb"), answer: 3 },

  // Logical (4)
  { id: "g910_l1", category: "Logical", gradeBand: "9-10",
    text: { en: "All roses are flowers. Some flowers fade quickly. Therefore:", gu: "બધાં ગુલાબ ફૂલ છે. કેટલાંક ફૂલ જલ્દી મરી જાય. તેથી:" },
    options: opt("All roses fade quickly", "Some roses might fade quickly", "No roses fade", "Roses are not flowers"), answer: 1 },
  { id: "g910_l2", category: "Logical", gradeBand: "9-10",
    text: { en: "If MONDAY is coded NPOEBZ, FRIDAY is coded:", gu: "જો MONDAY = NPOEBZ, તો FRIDAY?" },
    options: opt("GSJEBZ", "GSJFBZ", "GSJEBA", "HTKFCA"), answer: 0 },
  { id: "g910_l3", category: "Logical", gradeBand: "9-10",
    text: { en: "Which doesn't belong: Triangle, Square, Circle, Cube", gu: "આમાંથી જુદું: ત્રિકોણ, ચોરસ, વર્તુળ, ઘન" },
    options: opt("Triangle", "Square", "Circle", "Cube"), answer: 3 },
  { id: "g910_l4", category: "Logical", gradeBand: "9-10",
    text: { en: "A is B's brother. B is C's mother. C is A's:", gu: "A એ B નો ભાઈ. B એ C ની માતા. C એ A નો?" },
    options: opt("Son", "Niece/Nephew", "Brother", "Father"), answer: 1 },

  // Spatial (4)
  { id: "g910_s1", category: "Spatial", gradeBand: "9-10",
    text: { en: "Area of a circle with radius 7 (use π = 22/7):", gu: "ત્રિજ્યા 7 વાળા વર્તુળનું ક્ષેત્રફળ (π = 22/7):" },
    options: opt("44", "144", "154", "196"), answer: 2 },
  { id: "g910_s2", category: "Spatial", gradeBand: "9-10",
    text: { en: "A rectangle is folded along its diagonal. The two halves are:", gu: "લંબચોરસને કર્ણ સાથે વાળો — બે ભાગ?" },
    options: opt("Equal squares", "Congruent triangles", "Two trapeziums", "Different shapes"), answer: 1 },
  { id: "g910_s3", category: "Spatial", gradeBand: "9-10",
    text: { en: "Number of edges on a rectangular box (cuboid):", gu: "લંબઘન (cuboid) ની ધારોની સંખ્યા:" },
    options: opt("8", "10", "12", "14"), answer: 2 },
  { id: "g910_s4", category: "Spatial", gradeBand: "9-10",
    text: { en: "Volume of a cube of side 5 cm:", gu: "5 સેમી બાજુવાળા ઘનનું કદ:" },
    options: opt("25 cm³", "75 cm³", "125 cm³", "150 cm³"), answer: 2 },

  // Mechanical (4)
  { id: "g910_m1", category: "Mechanical", gradeBand: "9-10",
    text: { en: "If a pulley reduces effort to half, what is the mechanical advantage?", gu: "પુલી અડધો પ્રયત્ન કરે — મિકેનિકલ એડવાન્ટેજ?" },
    options: opt("0.5", "1", "2", "4"), answer: 2 },
  { id: "g910_m2", category: "Mechanical", gradeBand: "9-10",
    text: { en: "Heavier objects fall faster than lighter ones in air mainly due to:", gu: "ભારે વસ્તુઓ હવામાં ઝડપથી પડે — મુખ્ય કારણ?" },
    options: opt("Gravity differs", "Air resistance", "Mass alone", "Wind speed"), answer: 1 },
  { id: "g910_m3", category: "Mechanical", gradeBand: "9-10",
    text: { en: "Which gear arrangement increases speed?", gu: "કયો ગિયર ગતિ વધારે છે?" },
    options: opt("Big driver, small driven", "Small driver, big driven", "Equal gears", "No gears"), answer: 0 },
  { id: "g910_m4", category: "Mechanical", gradeBand: "9-10",
    text: { en: "The unit of force is:", gu: "બળનું એકમ?" },
    options: opt("Joule", "Newton", "Watt", "Pascal"), answer: 1 },

  // Data Interpretation (4)
  { id: "g910_d1", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "Marks: 80, 70, 60, 90, 50. Median?", gu: "ગુણ: 80, 70, 60, 90, 50. મીડિયન?" },
    options: opt("60", "70", "75", "80"), answer: 1 },
  { id: "g910_d2", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "A bar chart shows monthly sales. Jan = 200, Feb = 300, Mar = 250. Average sales?", gu: "વેચાણ: જાન્યુ 200, ફેબ્રુ 300, માર્ચ 250. સરેરાશ?" },
    options: opt("225", "250", "275", "300"), answer: 1 },
  { id: "g910_d3", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "If sales rose from 200 to 250, percentage increase is:", gu: "વેચાણ 200થી 250 થયું. ટકાવારી વધારો?" },
    options: opt("20%", "25%", "30%", "50%"), answer: 1 },
  { id: "g910_d4", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "In a class of 40, 25% are girls. How many boys?", gu: "40 વિદ્યાર્થી વર્ગમાં 25% છોકરીઓ. છોકરા?" },
    options: opt("10", "20", "25", "30"), answer: 3 },

  // ============================================================
  // GRADE 11–12 — DI, probability, syllogisms, critical reasoning,
  // 3D rotation, mechanical advantage, error spotting.
  // ============================================================

  // Numerical (5)
  { id: "g1112_n1", category: "Numerical", gradeBand: "11-12",
    text: { en: "Compound interest on ₹10,000 at 10% p.a. for 2 years (compounded annually):", gu: "₹10,000 પર 10% p.a., 2 વર્ષનું ચક્રવૃદ્ધિ વ્યાજ (વાર્ષિક):" },
    options: opt("₹2000", "₹2100", "₹2200", "₹2400"), answer: 1 },
  { id: "g1112_n2", category: "Numerical", gradeBand: "11-12",
    text: { en: "Probability of rolling a sum of 7 with two dice?", gu: "બે પાસાથી સરવાળો 7 થાય તેવી સંભાવના?" },
    options: opt("1/9", "1/6", "5/36", "1/12"), answer: 1 },
  { id: "g1112_n3", category: "Numerical", gradeBand: "11-12",
    text: { en: "If log₁₀ 2 = 0.301, log₁₀ 8 = ?", gu: "જો log₁₀ 2 = 0.301, તો log₁₀ 8?" },
    options: opt("0.602", "0.903", "0.804", "1.204"), answer: 1 },
  { id: "g1112_n4", category: "Numerical", gradeBand: "11-12",
    text: { en: "Solve: x² − 5x + 6 = 0. Roots are:", gu: "ઉકેલો: x² − 5x + 6 = 0. મૂળ?" },
    options: opt("1, 6", "2, 3", "−2, −3", "3, 4"), answer: 1 },
  { id: "g1112_n5", category: "Numerical", gradeBand: "11-12",
    text: { en: "A man invests ₹50,000 at 8% p.a. simple interest. Total amount after 4 years?", gu: "₹50,000 પર 8% p.a. સાદું વ્યાજ, 4 વર્ષ. કુલ રકમ?" },
    options: opt("₹62,000", "₹64,000", "₹66,000", "₹70,000"), answer: 2 },

  // Verbal (4)
  { id: "g1112_v1", category: "Verbal", gradeBand: "11-12",
    text: { en: "Synonym of UBIQUITOUS:", gu: "UBIQUITOUS નો સમાનાર્થી:" },
    options: opt("Rare", "Omnipresent", "Hidden", "Sudden"), answer: 1 },
  { id: "g1112_v2", category: "Verbal", gradeBand: "11-12",
    text: { en: "Spot the error: 'Each of the boys have completed their homework.'", gu: "ભૂલ શોધો: 'Each of the boys have completed their homework.'" },
    options: opt("Each of", "the boys", "have completed", "No error"), answer: 2 },
  { id: "g1112_v3", category: "Verbal", gradeBand: "11-12",
    text: { en: "Choose the closest meaning of 'PRAGMATIC':", gu: "'PRAGMATIC' નો નજીકનો અર્થ:" },
    options: opt("Theoretical", "Practical", "Idealistic", "Romantic"), answer: 1 },
  { id: "g1112_v4", category: "Verbal", gradeBand: "11-12",
    text: { en: "Sentence completion: 'Despite the rain, the match _____ as scheduled.'", gu: "વાક્ય પૂરું કરો: 'Despite the rain, the match _____ as scheduled.'" },
    options: opt("proceeded", "preceded", "procured", "proclaimed"), answer: 0 },

  // Logical (4)
  { id: "g1112_l1", category: "Logical", gradeBand: "11-12",
    text: { en: "Syllogism — All artists are creative. No accountant is an artist. Therefore:", gu: "બધાં કલાકારો સર્જનાત્મક છે. કોઈ એકાઉન્ટન્ટ કલાકાર નથી. તેથી:" },
    options: opt("No accountant is creative", "All accountants are creative", "Some accountants may be creative", "All artists are accountants"), answer: 2 },
  { id: "g1112_l2", category: "Logical", gradeBand: "11-12",
    text: { en: "Critical reasoning — Sales rose after we increased ad spend. So ads caused sales. The reasoning is:", gu: "જાહેરાત ખર્ચ પછી વેચાણ વધ્યું, માટે જાહેરાતે વેચાણ વધાર્યું — તર્ક?" },
    options: opt("Strong", "Weak — correlation ≠ causation", "Conclusive", "Mathematical"), answer: 1 },
  { id: "g1112_l3", category: "Logical", gradeBand: "11-12",
    text: { en: "If A > B, B > C and C = D, then which is true?", gu: "જો A > B, B > C અને C = D, તો સાચું?" },
    options: opt("A > D", "A < D", "A = D", "Cannot decide"), answer: 0 },
  { id: "g1112_l4", category: "Logical", gradeBand: "11-12",
    text: { en: "A statement: 'Either all students pass or the teacher resigns.' If no student passes, then:", gu: "'કાં બધા વિદ્યાર્થી પાસ થાય, કાં શિક્ષક રાજીનામું આપે.' જો કોઈ પાસ ન થાય, તો:" },
    options: opt("Teacher does not resign", "Teacher must resign", "All pass", "Cannot say"), answer: 1 },

  // Spatial (4)
  { id: "g1112_s1", category: "Spatial", gradeBand: "11-12",
    text: { en: "If a cube is rotated 90° about a vertical axis, the top face:", gu: "ઘનને ઊભા અક્ષ પર 90° ઘુમાવો — ઉપરનું ફેસ?" },
    options: opt("Becomes the bottom", "Stays as top", "Becomes a side", "Disappears"), answer: 1 },
  { id: "g1112_s2", category: "Spatial", gradeBand: "11-12",
    text: { en: "How many small cubes form a 3×3×3 large cube?", gu: "3×3×3 ઘન કેટલા નાના ઘનથી બને?" },
    options: opt("9", "18", "27", "36"), answer: 2 },
  { id: "g1112_s3", category: "Spatial", gradeBand: "11-12",
    text: { en: "A net of 6 squares connected in a cross shape folds into:", gu: "ક્રોસ આકારમાં જોડાયેલા 6 ચોરસનું જાળ વાળતાં બને:" },
    options: opt("Pyramid", "Cube", "Cylinder", "Cone"), answer: 1 },
  { id: "g1112_s4", category: "Spatial", gradeBand: "11-12",
    text: { en: "If you reflect the digit 6 in a mirror, it most resembles:", gu: "દર્પણમાં 6 અંક કોને મળતું દેખાય?" },
    options: opt("9", "0", "5", "6"), answer: 0 },

  // Mechanical (4)
  { id: "g1112_m1", category: "Mechanical", gradeBand: "11-12",
    text: { en: "A lever has effort arm 4 m and load arm 1 m. Mechanical advantage?", gu: "લિવર: પ્રયત્ન બાજુ 4 મી, બોજ બાજુ 1 મી. MA?" },
    options: opt("0.25", "1", "4", "5"), answer: 2 },
  { id: "g1112_m2", category: "Mechanical", gradeBand: "11-12",
    text: { en: "Power = Work / ?", gu: "પાવર = કામ ÷ ?" },
    options: opt("Force", "Time", "Mass", "Distance"), answer: 1 },
  { id: "g1112_m3", category: "Mechanical", gradeBand: "11-12",
    text: { en: "Which has the highest efficiency in transferring rotary motion?", gu: "રોટરી મોશન ટ્રાન્સફરમાં શ્રેષ્ઠ કાર્યક્ષમતા?" },
    options: opt("Belt drive", "Chain drive", "Gear drive", "Friction drive"), answer: 2 },
  { id: "g1112_m4", category: "Mechanical", gradeBand: "11-12",
    text: { en: "Hydraulic brakes work on which principle?", gu: "હાઇડ્રોલિક બ્રેક કયા સિદ્ધાંત પર?" },
    options: opt("Newton's", "Pascal's", "Bernoulli's", "Archimedes'"), answer: 1 },

  // Data Interpretation (4)
  { id: "g1112_d1", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "A company's revenue: 2021=₹100Cr, 2022=₹120Cr, 2023=₹150Cr. CAGR (approx)?", gu: "મહેસુલ: 2021=₹100Cr, 2022=₹120Cr, 2023=₹150Cr. CAGR (લગભગ)?" },
    options: opt("15%", "20%", "22%", "25%"), answer: 2 },
  { id: "g1112_d2", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "If 30% of 200 students play cricket and 25% play football (no overlap), how many play neither?", gu: "200માંથી 30% ક્રિકેટ, 25% ફૂટબોલ રમે (ઓવરલેપ નહીં). કેટલા કોઈ ન રમે?" },
    options: opt("70", "80", "90", "110"), answer: 2 },
  { id: "g1112_d3", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "Pie chart: Food 30%, Rent 25%, Travel 15%, Savings 30%. If income is ₹40,000, savings amount?", gu: "પાઇ: ખોરાક 30%, ભાડું 25%, મુસાફરી 15%, બચત 30%. આવક ₹40,000 — બચત?" },
    options: opt("₹10,000", "₹12,000", "₹14,000", "₹15,000"), answer: 1 },
  { id: "g1112_d4", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "Standard deviation measures:", gu: "પ્રમાણિત વિચલન શું માપે છે?" },
    options: opt("Average", "Spread of data", "Median", "Mode"), answer: 1 },
];

export const LIKERT_OPTIONS: { value: number; label: { en: string; gu: string } }[] = [
  { value: 1, label: { en: "Strongly Disagree", gu: "પૂરતો અસંમત" } },
  { value: 2, label: { en: "Disagree", gu: "અસંમત" } },
  { value: 3, label: { en: "Neutral", gu: "તટસ્થ" } },
  { value: 4, label: { en: "Agree", gu: "સંમત" } },
  { value: 5, label: { en: "Strongly Agree", gu: "પૂરેપૂરો સંમત" } },
];

export interface ScoreReport {
  riasec: Record<string, number>;
  riasecTop: string[];
  mi: Record<string, number>;
  miTop: string[];
  aptitude: Record<string, { correct: number; total: number; pct: number }>;
  aptitudeTop: string[];
  aptitudeOverall: number;
  gradeBand?: GradeBand;
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
    out[k] = Math.round(((v.sum - v.count) / (v.count * 4)) * 100);
  }
  return out;
}

// Returns aptitude items for a specific grade band (used by the test runner).
export function aptitudeItemsForBand(band: GradeBand): AptitudeItem[] {
  return APTITUDE_ITEMS.filter((i) => i.gradeBand === band);
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
    out[k] = { ...v, pct: v.total ? Math.round((v.correct / v.total) * 100) : 0 };
    total += v.total;
    correct += v.correct;
  }
  return { perCategory: out, overall: total ? Math.round((correct / total) * 100) : 0 };
}

export function buildReport(
  riasecAns: Record<string, number>,
  miAns: Record<string, number>,
  aptAns: Record<string, number>,
  aptItems: AptitudeItem[] = APTITUDE_ITEMS,
  band?: GradeBand,
): ScoreReport {
  const riasec = scoreLikert(RIASEC_ITEMS, riasecAns);
  const mi = scoreLikert(MI_ITEMS, miAns);
  const apt = scoreAptitude(aptItems, aptAns);
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
    gradeBand: band,
  };
}
