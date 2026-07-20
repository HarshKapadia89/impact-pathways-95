// Psychometric test bank — RIASEC + Multiple Intelligences + Aptitude.
// Bilingual (English / Gujarati) for the on-screen test UI; reports are English-only.
//
// RIASEC (Holland Codes): 30 items, 5 per type.
// Multiple Intelligences (Gardner): 24 items, 3 per type x 8 types.
// Aptitude: ~75 items, tagged by grade band (6-8, 9-10, 11-12) and category
//           (Numerical, Verbal, Logical, Spatial, Mechanical, DataInterpretation).
//           Selection logic in test.take.tsx serves only items matching the
//           student's grade band — ~24 questions per attempt.

export type Lang = "en" | "hi" | "gu";
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
  text: { en: string; hi: string; gu: string };
  category: string;
}

export interface AptitudeItem {
  id: string;
  category: AptitudeCategory;
  gradeBand: GradeBand;
  text: { en: string; hi: string; gu: string };
  options: { en: string; hi: string; gu: string }[];
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
  { id: "r1", category: "R", text: { en: "I like fixing things — bicycles, gadgets, machines.", hi: "मुझे चीज़ें ठीक करना पसंद है — जैसे साइकिल, गैजेट, मशीनें।", gu: "મને વસ્તુઓ સુધારવી ગમે છે — સાયકલ, ગેજેટ્સ, મશીનો." } },
  { id: "r2", category: "R", text: { en: "I enjoy building or making things with my hands.", hi: "मुझे अपने हाथों से चीज़ें बनाने में मज़ा आता है।", gu: "મને હાથથી કંઈક બનાવવું ગમે છે." } },
  { id: "r3", category: "R", text: { en: "I prefer working outdoors over sitting at a desk.", hi: "मुझे डेस्क पर बैठने के बजाय बाहर काम करना ज़्यादा पसंद है।", gu: "મને ડેસ્ક પર બેસવાને બદલે બહાર કામ કરવું ગમે." } },
  { id: "r4", category: "R", text: { en: "I'm interested in how machines and engines work.", hi: "मुझे यह जानने में दिलचस्पी है कि मशीनें और इंजन कैसे काम करते हैं।", gu: "મશીનો અને એન્જિનો કેવી રીતે કામ કરે છે તેમાં મને રસ છે." } },
  { id: "r5", category: "R", text: { en: "I like sports, farming, or physical activities.", hi: "मुझे खेल-कूद, खेती-बाड़ी या शारीरिक गतिविधियाँ पसंद हैं।", gu: "મને રમતગમત, ખેતી અથવા શારીરિક પ્રવૃત્તિ ગમે છે." } },
  // I
  { id: "i1", category: "I", text: { en: "I love understanding why things happen the way they do.", hi: "मुझे यह समझना बहुत पसंद है कि चीज़ें जैसी होती हैं, वैसी क्यों होती हैं।", gu: "વસ્તુઓ આ રીતે કેમ થાય છે તે સમજવું મને ગમે છે." } },
  { id: "i2", category: "I", text: { en: "I enjoy science experiments and observation.", hi: "मुझे विज्ञान के प्रयोग करने और चीज़ों को ध्यान से देखने में मज़ा आता है।", gu: "મને વિજ્ઞાનના પ્રયોગો અને નિરીક્ષણ ગમે છે." } },
  { id: "i3", category: "I", text: { en: "I like solving puzzles and brain-teasers.", hi: "मुझे पहेलियाँ और दिमागी कसरत वाले सवाल सुलझाना पसंद है।", gu: "મને કોયડા અને બ્રેઇન-ટીઝર ઉકેલવા ગમે છે." } },
  { id: "i4", category: "I", text: { en: "I'd rather research a topic deeply than skim it.", hi: "मुझे किसी विषय को ऊपरी तौर पर पढ़ने के बजाय, उस पर गहराई से रिसर्च करना ज़्यादा पसंद है।", gu: "મને કોઈ વિષય ઊંડાણથી અભ્યાસ કરવો ગમે." } },
  { id: "i5", category: "I", text: { en: "I enjoy maths, logic, or analysing data.", hi: "मुझे गणित, तर्क (logic) या डेटा का विश्लेषण (analysing) करने में मज़ा आता है।", gu: "મને ગણિત, તર્ક અથવા ડેટાનું વિશ્લેષણ ગમે છે." } },
  // A
  { id: "a1", category: "A", text: { en: "I like drawing, painting, or designing.", hi: "मुझे ड्राइंग, पेंटिंग या डिज़ाइन करना पसंद है।", gu: "મને ચિત્રકામ, રંગાવટ અથવા ડિઝાઇન ગમે છે." } },
  { id: "a2", category: "A", text: { en: "I enjoy writing stories, poems, or scripts.", hi: "मुझे कहानियाँ, कविताएँ या स्क्रिप्ट लिखने में मज़ा आता है।", gu: "મને વાર્તા, કવિતા અથવા સ્ક્રિપ્ટ લખવાનું ગમે છે." } },
  { id: "a3", category: "A", text: { en: "I love music, dance, or theatre.", hi: "मुझे संगीत, नृत्य या थिएटर बहुत पसंद है।", gu: "મને સંગીત, નૃત્ય અથવા નાટક ગમે છે." } },
  { id: "a4", category: "A", text: { en: "I prefer freedom to invent over following set rules.", hi: "मुझे तय नियमों का पालन करने के बजाय, कुछ नया आविष्कार करने की आज़ादी ज़्यादा पसंद है।", gu: "મને નિયમો કરતાં શોધવાની સ્વતંત્રતા ગમે." } },
  { id: "a5", category: "A", text: { en: "I see beauty in colours, patterns, and design.", hi: "मुझे रंगों, पैटर्न और डिज़ाइन में सुंदरता दिखाई देती है।", gu: "મને રંગો, પેટર્ન અને ડિઝાઇનમાં સૌંદર્ય દેખાય છે." } },
  // S
  { id: "s1", category: "S", text: { en: "I enjoy helping classmates with their problems.", hi: "मुझे अपने सहपाठियों की समस्याओं में उनकी मदद करने में मज़ा आता है।", gu: "મને સહપાઠીઓને તેમની સમસ્યામાં મદદ કરવી ગમે છે." } },
  { id: "s2", category: "S", text: { en: "I'd like to teach or train others.", hi: "मुझे दूसरों को सिखाना या ट्रेनिंग देना अच्छा लगेगा।", gu: "મને બીજાઓને શીખવવું ગમે છે." } },
  { id: "s3", category: "S", text: { en: "I care deeply about my community and people around me.", hi: "मुझे अपने समुदाय और आसपास के लोगों की बहुत परवाह है।", gu: "મને મારા સમુદાય અને આસપાસના લોકોની ચિંતા છે." } },
  { id: "s4", category: "S", text: { en: "Listening to other people's feelings comes naturally.", hi: "दूसरे लोगों की भावनाओं को सुनना मेरे लिए एक स्वाभाविक बात है।", gu: "બીજાની લાગણીઓ સાંભળવી મારી આદત છે." } },
  { id: "s5", category: "S", text: { en: "I'd be happy in a job that directly serves people.", hi: "मुझे ऐसी नौकरी करने में खुशी होगी जिसमें सीधे लोगों की सेवा की जा सके।", gu: "જે કામ સીધું લોકોની સેવા કરે તેમાં મને ખુશી મળે." } },
  // E
  { id: "e1", category: "E", text: { en: "I like leading group projects and activities.", hi: "मुझे ग्रुप प्रोजेक्ट्स और एक्टिविटीज़ का नेतृत्व (lead) करना पसंद है।", gu: "મને ગ્રૂપ પ્રોજેક્ટ અને પ્રવૃત્તિનું નેતૃત્વ કરવું ગમે છે." } },
  { id: "e2", category: "E", text: { en: "I enjoy convincing others of my ideas.", hi: "मुझे दूसरों को अपने विचारों के लिए मनाना अच्छा लगता है।", gu: "મને બીજાઓને મારા વિચારો પર મનાવવા ગમે છે." } },
  { id: "e3", category: "E", text: { en: "I'd love to start my own business one day.", hi: "मैं एक दिन अपना खुद का बिज़नेस शुरू करना चाहूँगा।", gu: "મને એક દિવસ મારો પોતાનો બિઝનેસ શરૂ કરવો છે." } },
  { id: "e4", category: "E", text: { en: "I'm comfortable speaking in front of an audience.", hi: "मैं बहुत से लोगों के सामने बोलने में सहज हूँ।", gu: "મને જાહેર સભામાં બોલવામાં ડર નથી." } },
  { id: "e5", category: "E", text: { en: "I enjoy negotiating and selling things.", hi: "मुझे मोल-भाव करने और चीज़ें बेचने में मज़ा आता है।", gu: "મને વાટાઘાટો અને વેચાણ ગમે છે." } },
  // C
  { id: "c1", category: "C", text: { en: "I keep my notes and books well organised.", hi: "मैं अपने नोट्स और किताबें अच्छी तरह व्यवस्थित रखता हूँ।", gu: "મારી નોટ્સ અને પુસ્તકો વ્યવસ્થિત હોય છે." } },
  { id: "c2", category: "C", text: { en: "I like working with numbers, lists, and records.", hi: "मुझे नंबरों, सूचियों (lists) और रिकॉर्ड के साथ काम करना पसंद है।", gu: "મને નંબર, યાદી અને રેકોર્ડ સાથે કામ કરવું ગમે છે." } },
  { id: "c3", category: "C", text: { en: "I prefer clear instructions over open-ended tasks.", hi: "मुझे खुले-अंत वाले कामों की बजाय स्पष्ट निर्देशों के साथ काम करना पसंद है।", gu: "મને સ્પષ્ટ સૂચનાઓવાળું કામ વધુ ગમે." } },
  { id: "c4", category: "C", text: { en: "Being on time and following rules matters to me.", hi: "मेरे लिए समय पर पहुँचना और नियमों का पालन करना मायने रखता है।", gu: "સમય પાળવો અને નિયમો પાળવા મારા માટે મહત્વનું છે." } },
  { id: "c5", category: "C", text: { en: "I'd enjoy a job that involves accuracy and detail.", hi: "मुझे ऐसी नौकरी में मज़ा आएगा जिसमें सटीकता (accuracy) और बारीकी (detail) की ज़रूरत हो।", gu: "ચોકસાઈ અને બારીકી વાળું કામ મને ગમે." } },
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
  { id: "mi1", category: "Linguistic", text: { en: "I enjoy reading books and writing essays.", hi: "मुझे किताबें पढ़ना और निबंध लिखना अच्छा लगता है।", gu: "મને પુસ્તકો વાંચવા અને નિબંધ લખવા ગમે છે." } },
  { id: "mi2", category: "Linguistic", text: { en: "I notice and enjoy wordplay, puns, and language patterns.", hi: "मैं शब्दों के खेल, तुकबंदी और भाषा के पैटर्न पर ध्यान देता हूँ और मुझे उनमें मज़ा आता है।", gu: "મને શબ્દોની રમત અને ભાષાની પેટર્ન ગમે છે." } },
  { id: "mi3", category: "Linguistic", text: { en: "I express my ideas easily in writing or speech.", hi: "मैं अपने विचार लिखने या बोलने के माध्यम से आसानी से व्यक्त कर लेता हूँ।", gu: "હું મારા વિચારો સહેલાઈથી લખીને કે બોલીને કહી શકું છું." } },
  { id: "mi4", category: "LogicalMath", text: { en: "I enjoy maths problems and number patterns.", hi: "मुझे गणित के सवाल हल करने और नंबर पैटर्न में मज़ा आता है।", gu: "મને ગણિતની સમસ્યા અને નંબર પેટર્ન ગમે છે." } },
  { id: "mi5", category: "LogicalMath", text: { en: "I think step-by-step and like clear logical reasoning.", hi: "मैं कदम-दर-कदम सोचता हूँ और मुझे साफ़-साफ़ तर्क वाली बातें पसंद हैं।", gu: "મને ક્રમબદ્ધ વિચારણા અને તર્ક ગમે છે." } },
  { id: "mi6", category: "LogicalMath", text: { en: "I quickly spot inconsistencies in arguments.", hi: "मैं दलीलों (arguments) में विरोधी बातों को जल्दी पकड़ लेता हूँ।", gu: "દલીલમાં વિરોધાભાસ હું ઝડપથી ઓળખું છું." } },
  { id: "mi7", category: "Spatial", text: { en: "I can easily picture maps, rooms, or 3D objects in my mind.", hi: "मैं अपने मन में नक्शे, कमरे या 3D चीज़ों की तस्वीर आसानी से बना सकता हूँ।", gu: "મને નકશા, રૂમ અથવા 3D વસ્તુઓ માનસપટલ પર સ્પષ્ટ દેખાય છે." } },
  { id: "mi8", category: "Spatial", text: { en: "I enjoy drawing, designing, or solving visual puzzles.", hi: "मुझे ड्राइंग, डिज़ाइनिंग या तस्वीरों वाली पहेलियाँ सुलझाने में मज़ा आता है।", gu: "મને ચિત્રકામ, ડિઝાઇન અથવા દ્રશ્ય કોયડા ગમે છે." } },
  { id: "mi9", category: "Spatial", text: { en: "I have a good sense of direction.", hi: "मुझे दिशाओं की अच्छी समझ है।", gu: "મને દિશાનું સારું જ્ઞાન છે." } },
  { id: "mi10", category: "Bodily", text: { en: "I learn faster by doing than by reading.", hi: "मैं पढ़ने के बजाय, कोई काम करके ज़्यादा तेज़ी से सीखता हूँ।", gu: "હું વાંચવા કરતાં કરીને વધુ ઝડપથી શીખું છું." } },
  { id: "mi11", category: "Bodily", text: { en: "I enjoy sports, dance, or physical games.", hi: "मुझे खेल-कूद, डांस या शारीरिक मेहनत वाले खेलों में मज़ा आता है।", gu: "મને રમત, નૃત્ય અથવા શારીરિક રમતો ગમે છે." } },
  { id: "mi12", category: "Bodily", text: { en: "I'm good at using my hands for crafts or repairs.", hi: "मैं हस्तकला (crafts) या मरम्मत के कामों के लिए अपने हाथों का उपयोग करने में अच्छा हूँ।", gu: "મને હાથની કારીગરી અને સુધારકામ સારું આવડે છે." } },
  { id: "mi13", category: "Musical", text: { en: "I remember tunes and songs easily.", hi: "मुझे धुनें और गाने आसानी से याद हो जाते हैं।", gu: "મને ગીત-ધૂનો સહેલાઈથી યાદ રહે છે." } },
  { id: "mi14", category: "Musical", text: { en: "I tap, hum, or sing along often.", hi: "मैं अक्सर कुछ थपथपाता, गुनगुनाता या साथ में गाता रहता हूँ।", gu: "હું વારંવાર ગુનગુનાવું છું કે તાલ આપું છું." } },
  { id: "mi15", category: "Musical", text: { en: "I notice rhythm and pitch in everyday sounds.", hi: "मैं रोज़मर्रा की आवाज़ों में लय (rhythm) और सुर (pitch) पर ध्यान देता हूँ।", gu: "રોજિંદા અવાજોમાં હું તાલ અને સૂર પારખું છું." } },
  { id: "mi16", category: "Interpersonal", text: { en: "I make friends easily and enjoy group work.", hi: "मैं आसानी से दोस्त बना लेता हूँ और मुझे ग्रुप में काम करना अच्छा लगता है।", gu: "મને જલ્દી મિત્રો બને છે અને ગ્રૂપ વર્ક ગમે છે." } },
  { id: "mi17", category: "Interpersonal", text: { en: "I sense how others are feeling.", hi: "मैं समझ जाता हूँ कि दूसरे कैसा महसूस कर रहे हैं।", gu: "બીજાની લાગણી હું પારખી શકું છું." } },
  { id: "mi18", category: "Interpersonal", text: { en: "Friends often come to me for advice.", hi: "दोस्त अक्सर सलाह के लिए मेरे पास आते हैं।", gu: "મિત્રો વારંવાર મારી પાસે સલાહ લેવા આવે છે." } },
  { id: "mi19", category: "Intrapersonal", text: { en: "I understand my own emotions and motivations well.", hi: "मैं अपनी भावनाओं और प्रेरणाओं को अच्छी तरह समझता हूँ।", gu: "મને મારી લાગણીઓ અને પ્રેરણા સમજાય છે." } },
  { id: "mi20", category: "Intrapersonal", text: { en: "I prefer reflecting alone before making decisions.", hi: "मैं फैसले लेने से पहले अकेले में सोचना-विचारना पसंद करता हूँ।", gu: "નિર્ણય લેતા પહેલાં હું એકલા વિચારવાનું પસંદ કરું છું." } },
  { id: "mi21", category: "Intrapersonal", text: { en: "I have clear personal goals and values.", hi: "मेरे व्यक्तिगत लक्ष्य और मूल्य (values) स्पष्ट हैं।", gu: "મારા સ્પષ્ટ વ્યક્તિગત લક્ષ્ય અને મૂલ્યો છે." } },
  { id: "mi22", category: "Naturalist", text: { en: "I love being in nature, with plants or animals.", hi: "मुझे प्रकृति में, पौधों या जानवरों के साथ रहना बहुत पसंद है।", gu: "મને કુદરત, છોડ અને પ્રાણીઓની વચ્ચે રહેવું ગમે છે." } },
  { id: "mi23", category: "Naturalist", text: { en: "I notice and remember different birds, plants, or weather.", hi: "मैं अलग-अलग पक्षियों, पौधों या मौसम पर ध्यान देता हूँ और उन्हें याद रखता हूँ।", gu: "મને જુદાં પક્ષીઓ, છોડ અથવા હવામાનની નોંધ રહે છે." } },
  { id: "mi24", category: "Naturalist", text: { en: "I care about environment and sustainability.", hi: "मुझे पर्यावरण और स्थिरता (sustainability) की परवाह है।", gu: "મને પર્યાવરણ અને ટકાઉપણાંની ચિંતા છે." } },
];


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
    text: { en: "If 5 pencils cost ₹40, how much do 8 pencils cost?", hi: "अगर 5 पेंसिल की कीमत ₹40 है, तो 8 पेंसिल की कीमत कितनी होगी?", gu: "જો 5 પેન્સિલની કિંમત ₹40, તો 8 પેન્સિલની?" },
    options: [{ en: "₹56", hi: "₹56", gu: "₹56" }, { en: "₹64", hi: "₹64", gu: "₹64" }, { en: "₹72", hi: "₹72", gu: "₹72" }, { en: "₹80", hi: "₹80", gu: "₹80" }], answer: 1 },
  { id: "g68_n2", category: "Numerical", gradeBand: "6-8",
    text: { en: "Find: 1/2 + 1/3 = ?", hi: "हल करें: 1/2 + 1/3 = ?", gu: "ગણો: 1/2 + 1/3 = ?" },
    options: [{ en: "2/5", hi: "2/5", gu: "2/5" }, { en: "5/6", hi: "5/6", gu: "5/6" }, { en: "3/5", hi: "3/5", gu: "3/5" }, { en: "1/6", hi: "1/6", gu: "1/6" }], answer: 1 },
  { id: "g68_n3", category: "Numerical", gradeBand: "6-8",
    text: { en: "What is the next number? 2, 6, 12, 20, ?", hi: "अगली संख्या क्या है? 2, 6, 12, 20, ?", gu: "આગળનો નંબર: 2, 6, 12, 20, ?" },
    options: [{ en: "26", hi: "26", gu: "26" }, { en: "28", hi: "28", gu: "28" }, { en: "30", hi: "30", gu: "30" }, { en: "32", hi: "32", gu: "32" }], answer: 2 },
  { id: "g68_n4", category: "Numerical", gradeBand: "6-8",
    text: { en: "If x + 7 = 15, then x = ?", hi: "अगर x + 7 = 15, तो x = ?", gu: "જો x + 7 = 15, તો x = ?" },
    options: [{ en: "6", hi: "6", gu: "6" }, { en: "7", hi: "7", gu: "7" }, { en: "8", hi: "8", gu: "8" }, { en: "9", hi: "9", gu: "9" }], answer: 2 },
  { id: "g68_n5", category: "Numerical", gradeBand: "6-8",
    text: { en: "A bag has 3 red and 2 blue balls. Probability of red?", hi: "एक थैले में 3 लाल और 2 नीली गेंदें हैं। लाल गेंद आने की प्रायिकता (probability) क्या है?", gu: "બેગમાં 3 લાલ અને 2 ભૂરા બોલ. લાલની સંભાવના?" },
    options: [{ en: "2/5", hi: "2/5", gu: "2/5" }, { en: "3/5", hi: "3/5", gu: "3/5" }, { en: "1/2", hi: "1/2", gu: "1/2" }, { en: "1/5", hi: "1/5", gu: "1/5" }], answer: 1 },

  // Verbal (4)
  { id: "g68_v1", category: "Verbal", gradeBand: "6-8",
    text: { en: "Choose the synonym of HAPPY:", hi: "HAPPY का पर्यायवाची शब्द चुनें:", gu: "HAPPY નો સમાનાર્થી પસંદ કરો:" },
    options: [{ en: "Sad", hi: "दुखी", gu: "દુઃખી" }, { en: "Joyful", hi: "आनंदित", gu: "આનંદી" }, { en: "Angry", hi: "गुस्सैल", gu: "ગુસ્સાવાળું" }, { en: "Tired", hi: "थका हुआ", gu: "થાકેલું" }], answer: 1 },
  { id: "g68_v2", category: "Verbal", gradeBand: "6-8",
    text: { en: "Antonym of BRAVE:", hi: "BRAVE का विलोम शब्द चुनें:", gu: "BRAVE નો વિરુદ્ધાર્થી:" },
    options: [{ en: "Bold", hi: "साहसी", gu: "બહાદુર" }, { en: "Cowardly", hi: "डरपोक", gu: "ડરપોક" }, { en: "Strong", hi: "मजबूत", gu: "મજબૂત" }, { en: "Heroic", hi: "वीर", gu: "વીર" }], answer: 1 },
  { id: "g68_v3", category: "Verbal", gradeBand: "6-8",
    text: { en: "Doctor : Hospital :: Teacher : ?", hi: "डॉक्टर : अस्पताल :: शिक्षक : ?", gu: "ડોક્ટર : હોસ્પિટલ :: શિક્ષક : ?" },
    options: [{ en: "Office", hi: "ऑफिस", gu: "ઑફિસ" }, { en: "School", hi: "स्कूल", gu: "શાળા" }, { en: "Library", hi: "पुस्तकालय", gu: "પુસ્તકાલય" }, { en: "Court", hi: "न्यायालय", gu: "કોર્ટ" }], answer: 1 },
  { id: "g68_v4", category: "Verbal", gradeBand: "6-8",
    text: { en: "Pick the odd one out:", hi: "इनमें से जो अलग है उसे चुनें:", gu: "વિચિત્ર પસંદ કરો:" },
    options: [{ en: "Apple", hi: "सेब", gu: "સફરજન" }, { en: "Banana", hi: "केला", gu: "કેળું" }, { en: "Carrot", hi: "गाजर", gu: "ગાજર" }, { en: "Mango", hi: "आम", gu: "કેરી" }], answer: 2 },

  // Logical (4)
  { id: "g68_l1", category: "Logical", gradeBand: "6-8",
    text: { en: "Find the missing letter: A, C, E, G, ?", hi: "लुप्त अक्षर ज्ञात करें: A, C, E, G, ?", gu: "ખૂટતો અક્ષર: A, C, E, G, ?" },
    options: [{ en: "H", hi: "H", gu: "H" }, { en: "I", hi: "I", gu: "I" }, { en: "J", hi: "J", gu: "J" }, { en: "K", hi: "K", gu: "K" }], answer: 1 },
  { id: "g68_l2", category: "Logical", gradeBand: "6-8",
    text: { en: "Ravi is taller than Sita. Sita is taller than Mira. Who is shortest?", hi: "रवि, सीता से लंबा है। सीता, मीरा से लंबी है। सबसे छोटा कौन है?", gu: "રવિ સીતાથી ઊંચો, સીતા મીરાથી ઊંચી. સૌથી નાનું?" },
    options: [{ en: "Ravi", hi: "रवि", gu: "રવિ" }, { en: "Sita", hi: "सीता", gu: "સીતા" }, { en: "Mira", hi: "मीरा", gu: "મીરા" }, { en: "Cannot say", hi: "कह नहीं सकते", gu: "કહી શકાય નહીં" }], answer: 2 },
  { id: "g68_l3", category: "Logical", gradeBand: "6-8",
    text: { en: "If today is Wednesday, what day will it be 10 days later?", hi: "अगर आज बुधवार है, तो 10 दिन बाद कौन सा दिन होगा?", gu: "જો આજે બુધવાર છે, તો 10 દિવસ પછી કયો વાર?" },
    options: [{ en: "Friday", hi: "शुक्रवार", gu: "શુક્રવાર" }, { en: "Saturday", hi: "शनिवार", gu: "શનિવાર" }, { en: "Sunday", hi: "रविवार", gu: "રવિવાર" }, { en: "Monday", hi: "सोमवार", gu: "સોમવાર" }], answer: 1 },
  { id: "g68_l4", category: "Logical", gradeBand: "6-8",
    text: { en: "Series: 1, 4, 9, 16, ?", hi: "श्रृंखला: 1, 4, 9, 16, ?", gu: "શ્રેણી: 1, 4, 9, 16, ?" },
    options: [{ en: "20", hi: "20", gu: "20" }, { en: "24", hi: "24", gu: "24" }, { en: "25", hi: "25", gu: "25" }, { en: "30", hi: "30", gu: "30" }], answer: 2 },

  // Spatial (4)
  { id: "g68_s1", category: "Spatial", gradeBand: "6-8",
    text: { en: "How many faces does a cube have?", hi: "एक घन (cube) के कितने फलक (faces) होते हैं?", gu: "ઘન (cube) ને કેટલાં ફેસ?" },
    options: [{ en: "4", hi: "4", gu: "4" }, { en: "6", hi: "6", gu: "6" }, { en: "8", hi: "8", gu: "8" }, { en: "12", hi: "12", gu: "12" }], answer: 1 },
  { id: "g68_s2", category: "Spatial", gradeBand: "6-8",
    text: { en: "Mirror image of the letter 'b' looks like:", hi: "अक्षर 'b' का दर्पण प्रतिबिंब (mirror image) कैसा दिखता है:", gu: "'b' નું દર્પણ-પ્રતિબિંબ:" },
    options: [{ en: "p", hi: "p", gu: "p" }, { en: "d", hi: "d", gu: "d" }, { en: "q", hi: "q", gu: "q" }, { en: "b", hi: "b", gu: "b" }], answer: 1 },
  { id: "g68_s3", category: "Spatial", gradeBand: "6-8",
    text: { en: "Walking 3 km North then 4 km East — straight-line distance?", hi: "पहले 3 km उत्तर और फिर 4 km पूर्व चलने पर — सीधी रेखा में दूरी क्या होगी?", gu: "3 કિમી ઉત્તર, પછી 4 કિમી પૂર્વ — સીધી દૂરી?" },
    options: [{ en: "5 km", hi: "5 km", gu: "5 km" }, { en: "6 km", hi: "6 km", gu: "6 km" }, { en: "7 km", hi: "7 km", gu: "7 km" }, { en: "12 km", hi: "12 km", gu: "12 km" }], answer: 0 },
  { id: "g68_s4", category: "Spatial", gradeBand: "6-8",
    text: { en: "Fold a square paper in half twice. How many small squares form?", hi: "एक वर्गाकार कागज़ को दो बार आधा मोड़ें। कितने छोटे वर्ग बनेंगे?", gu: "ચોરસ કાગળ બે વાર અડધો વાળો — કેટલાં નાના ચોરસ?" },
    options: [{ en: "2", hi: "2", gu: "2" }, { en: "3", hi: "3", gu: "3" }, { en: "4", hi: "4", gu: "4" }, { en: "8", hi: "8", gu: "8" }], answer: 2 },

  // Mechanical (4)
  { id: "g68_m1", category: "Mechanical", gradeBand: "6-8",
    text: { en: "Which of these is a simple machine?", hi: "इनमें से कौन सी एक सरल मशीन (simple machine) है?", gu: "આમાંથી સરળ યંત્ર કયું?" },
    options: [{ en: "Lever", hi: "उत्तोलक (Lever)", gu: "લિવર (ઉચ્ચાલન)" }, { en: "Computer", hi: "कंप्यूटर", gu: "કમ્પ્યુટર" }, { en: "Mobile phone", hi: "मोबाइल फोन", gu: "મોબાઇલ ફોન" }, { en: "TV", hi: "टीवी", gu: "ટીવી" }], answer: 0 },
  { id: "g68_m2", category: "Mechanical", gradeBand: "6-8",
    text: { en: "A see-saw is an example of a:", hi: "एक सी-सॉ (see-saw) किसका उदाहरण है:", gu: "સી-સો કયા પ્રકારનું યંત્ર છે?" },
    options: [{ en: "Pulley", hi: "घिरनी (Pulley)", gu: "ગરગડી (Pulley)" }, { en: "Lever", hi: "उत्तोलक (Lever)", gu: "ઉચ્ચાલન (Lever)" }, { en: "Wedge", hi: "वेज (Wedge)", gu: "ફાચર (Wedge)" }, { en: "Screw", hi: "पेंच (Screw)", gu: "સ્ક્રૂ" }], answer: 1 },
  { id: "g68_m3", category: "Mechanical", gradeBand: "6-8",
    text: { en: "A bicycle uses which simple machines mainly?", hi: "एक साइकिल में मुख्य रूप से किन सरल मशीनों का उपयोग होता है?", gu: "સાયકલ મુખ્યત્વે કયા સરળ યંત્રો વાપરે છે?" },
    options: [{ en: "Wheel and axle, lever", hi: "पहिया और धुरा, उत्तोलक", gu: "પૈડું અને ધરી, ઉચ્ચાલન" }, { en: "Pulley only", hi: "केवल घिरनी", gu: "ફક્ત ગરગડી" }, { en: "Screw only", hi: "केवल पेंच", gu: "ફક્ત સ્ક્રૂ" }, { en: "None", hi: "कोई नहीं", gu: "કોઈ નહીં" }], answer: 0 },
  { id: "g68_m4", category: "Mechanical", gradeBand: "6-8",
    text: { en: "If you drop a stone and a feather in vacuum, which lands first?", hi: "यदि आप निर्वात (vacuum) में एक पत्थर और एक पंख गिराते हैं, तो कौन पहले ज़मीन पर पहुँचेगा?", gu: "શૂન્યાવકાશમાં પથ્થર અને પીંછું ફેંકો — પહેલા કયું પડે?" },
    options: [{ en: "Stone", hi: "पत्थर", gu: "પથ્થર" }, { en: "Feather", hi: "पंख", gu: "પીંછું" }, { en: "Both together", hi: "दोनों एक साथ", gu: "બંને એક સાથે" }, { en: "Neither falls", hi: "कोई नहीं गिरेगा", gu: "કોઈ નીચે નહીં પડે" }], answer: 2 },

  // Data Interpretation (4)
  { id: "g68_d1", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "Class strength: Class 6 = 30, Class 7 = 35, Class 8 = 25. Total students?", hi: "कक्षा में छात्रों की संख्या: कक्षा 6 = 30, कक्षा 7 = 35, कक्षा 8 = 25. कुल छात्र?", gu: "વર્ગ સંખ્યા: 6 = 30, 7 = 35, 8 = 25. કુલ?" },
    options: [{ en: "80", hi: "80", gu: "80" }, { en: "85", hi: "85", gu: "85" }, { en: "90", hi: "90", gu: "90" }, { en: "95", hi: "95", gu: "95" }], answer: 2 },
  { id: "g68_d2", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "If a pie chart shows 25% Maths, 25% Science, 50% Other — Other is what fraction?", hi: "यदि एक पाई चार्ट 25% गणित, 25% विज्ञान, 50% अन्य दिखाता है — तो 'अन्य' कितना भिन्न (fraction) है?", gu: "પાઇ ચાર્ટ: 25% ગણિત, 25% વિજ્ઞાન, 50% અન્ય — અન્યનો અપૂર્ણાંક?" },
    options: [{ en: "1/4", hi: "1/4", gu: "1/4" }, { en: "1/3", hi: "1/3", gu: "1/3" }, { en: "1/2", hi: "1/2", gu: "1/2" }, { en: "2/3", hi: "2/3", gu: "2/3" }], answer: 2 },
  { id: "g68_d3", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "Rainfall (mm): Mon 5, Tue 10, Wed 15, Thu 0. Average?", hi: "वर्षा (mm): सोम 5, मंगल 10, बुध 15, गुरु 0. औसत क्या है?", gu: "વરસાદ (mm): સોમ 5, મંગ 10, બુધ 15, ગુરુ 0. સરેરાશ?" },
    options: [{ en: "5", hi: "5", gu: "5" }, { en: "7.5", hi: "7.5", gu: "7.5" }, { en: "10", hi: "10", gu: "10" }, { en: "30", hi: "30", gu: "30" }], answer: 1 },
  { id: "g68_d4", category: "DataInterpretation", gradeBand: "6-8",
    text: { en: "If 60 out of 100 students passed, what % failed?", hi: "यदि 100 में से 60 छात्र पास हुए, तो कितने % फेल हुए?", gu: "જો 100માંથી 60 વિદ્યાર્થી પાસ થયા, કેટલા % ફેલ?" },
    options: [{ en: "30%", hi: "30%", gu: "30%" }, { en: "40%", hi: "40%", gu: "40%" }, { en: "50%", hi: "50%", gu: "50%" }, { en: "60%", hi: "60%", gu: "60%" }], answer: 1 },

  // ============================================================
  // GRADE 9–10 — percentages, ratios, geometry, comprehension,
  // reasoning chains, paper folding, levers/pulleys, charts.
  // ============================================================

  // Numerical (5)
  { id: "g910_n1", category: "Numerical", gradeBand: "9-10",
    text: { en: "What is 15% of 240?", hi: "240 का 15% क्या है?", gu: "240 નું 15% શું?" },
    options: [{ en: "24", hi: "24", gu: "24" }, { en: "32", hi: "32", gu: "32" }, { en: "36", hi: "36", gu: "36" }, { en: "48", hi: "48", gu: "48" }], answer: 2 },
  { id: "g910_n2", category: "Numerical", gradeBand: "9-10",
    text: { en: "A train covers 180 km in 3 hours. Speed in km/h?", hi: "एक ट्रेन 3 घंटे में 180 km की दूरी तय करती है। गति (km/h में) क्या है?", gu: "ટ્રેન 3 કલાકમાં 180 કિમી. ગતિ?" },
    options: [{ en: "50", hi: "50", gu: "50" }, { en: "55", hi: "55", gu: "55" }, { en: "60", hi: "60", gu: "60" }, { en: "65", hi: "65", gu: "65" }], answer: 2 },
  { id: "g910_n3", category: "Numerical", gradeBand: "9-10",
    text: { en: "If a:b = 2:3 and b:c = 4:5, then a:c = ?", hi: "यदि a:b = 2:3 और b:c = 4:5, तो a:c = ?", gu: "જો a:b = 2:3 અને b:c = 4:5, તો a:c?" },
    options: [{ en: "2:5", hi: "2:5", gu: "2:5" }, { en: "8:15", hi: "8:15", gu: "8:15" }, { en: "4:5", hi: "4:5", gu: "4:5" }, { en: "2:3", hi: "2:3", gu: "2:3" }], answer: 1 },
  { id: "g910_n4", category: "Numerical", gradeBand: "9-10",
    text: { en: "Simple interest on ₹2000 at 5% per year for 3 years?", hi: "₹2000 पर 3 साल के लिए 5% प्रति वर्ष की दर से साधारण ब्याज कितना होगा?", gu: "₹2000 પર 5% પ્રતિ વર્ષ, 3 વર્ષનું સાદું વ્યાજ?" },
    options: [{ en: "₹200", hi: "₹200", gu: "₹200" }, { en: "₹250", hi: "₹250", gu: "₹250" }, { en: "₹300", hi: "₹300", gu: "₹300" }, { en: "₹400", hi: "₹400", gu: "₹400" }], answer: 2 },
  { id: "g910_n5", category: "Numerical", gradeBand: "9-10",
    text: { en: "Solve: 2x − 5 = 11, x = ?", hi: "हल करें: 2x − 5 = 11, तो x = ?", gu: "ઉકેલો: 2x − 5 = 11, x = ?" },
    options: [{ en: "3", hi: "3", gu: "3" }, { en: "6", hi: "6", gu: "6" }, { en: "8", hi: "8", gu: "8" }, { en: "16", hi: "16", gu: "16" }], answer: 2 },

  // Verbal (4)
  { id: "g910_v1", category: "Verbal", gradeBand: "9-10",
    text: { en: "Synonym of ABUNDANT:", hi: "ABUNDANT का पर्यायवाची शब्द चुनें:", gu: "ABUNDANT નો સમાનાર્થી:" },
    options: [{ en: "Scarce", hi: "कम", gu: "અછત" }, { en: "Plentiful", hi: "प्रचुर", gu: "વિપુલ" }, { en: "Tiny", hi: "छोटा", gu: "નાનું" }, { en: "Empty", hi: "खाली", gu: "ખાલી" }], answer: 1 },
  { id: "g910_v2", category: "Verbal", gradeBand: "9-10",
    text: { en: "Choose the correctly spelt word:", hi: "सही वर्तनी (spelling) वाला शब्द चुनें:", gu: "સાચી જોડણી પસંદ કરો:" },
    options: [{ en: "Recieve", hi: "Recieve", gu: "Recieve" }, { en: "Receive", hi: "Receive", gu: "Receive" }, { en: "Receeve", hi: "Receeve", gu: "Receeve" }, { en: "Recive", hi: "Recive", gu: "Recive" }], answer: 1 },
  { id: "g910_v3", category: "Verbal", gradeBand: "9-10",
    text: { en: "Architect : Building :: Author : ?", hi: "आर्किटेक्ट : इमारत :: लेखक : ?", gu: "આર્કિટેક્ટ : ઇમારત :: લેખક : ?" },
    options: [{ en: "Pen", hi: "कलम", gu: "પેન" }, { en: "Book", hi: "किताब", gu: "પુસ્તક" }, { en: "Paper", hi: "कागज़", gu: "કાગળ" }, { en: "Library", hi: "पुस्तकालय", gu: "પુસ્તકાલય" }], answer: 1 },
  { id: "g910_v4", category: "Verbal", gradeBand: "9-10",
    text: { en: "Identify the part of speech: 'She runs quickly.' — quickly is a:", hi: "शब्द-भेद पहचानें: 'She runs quickly.' — इसमें 'quickly' क्या है:", gu: "વાક્યમાં 'quickly' કયો ભાગ?" },
    options: [{ en: "Noun", hi: "संज्ञा", gu: "સંજ્ઞા (નામ)" }, { en: "Verb", hi: "क्रिया", gu: "ક્રિયાપદ" }, { en: "Adjective", hi: "विशेषण", gu: "વિશેષણ" }, { en: "Adverb", hi: "क्रिया-विशेषण", gu: "ક્રિયા-વિશેષણ" }], answer: 3 },

  // Logical (4)
  { id: "g910_l1", category: "Logical", gradeBand: "9-10",
    text: { en: "All roses are flowers. Some flowers fade quickly. Therefore:", hi: "सभी गुलाब फूल हैं। कुछ फूल जल्दी मुरझा जाते हैं। इसलिए:", gu: "બધાં ગુલાબ ફૂલ છે. કેટલાંક ફૂલ જલ્દી મરી જાય. તેથી:" },
    options: [{ en: "All roses fade quickly", hi: "सभी गुलाब जल्दी मुरझा जाते हैं", gu: "બધા ગુલાબ જલ્દી કરમાઈ જાય છે" }, { en: "Some roses might fade quickly", hi: "कुछ गुलाब जल्दी मुरझा सकते हैं", gu: "કેટલાક ગુલાબ જલ્દી કરમાઈ શકે છે" }, { en: "No roses fade", hi: "कोई गुलाब नहीं मुरझाता", gu: "કોઈ ગુલાબ કરમાતું નથી" }, { en: "Roses are not flowers", hi: "गुलाब फूल नहीं हैं", gu: "ગુલાબ ફૂલો નથી" }], answer: 1 },
  { id: "g910_l2", category: "Logical", gradeBand: "9-10",
    text: { en: "If MONDAY is coded NPOEBZ, FRIDAY is coded:", hi: "यदि MONDAY को NPOEBZ कोड किया जाता है, तो FRIDAY को कैसे कोड किया जाएगा:", gu: "જો MONDAY = NPOEBZ, તો FRIDAY?" },
    options: [{ en: "GSJEBZ", hi: "GSJEBZ", gu: "GSJEBZ" }, { en: "GSJFBZ", hi: "GSJFBZ", gu: "GSJFBZ" }, { en: "GSJEBA", hi: "GSJEBA", gu: "GSJEBA" }, { en: "HTKFCA", hi: "HTKFCA", gu: "HTKFCA" }], answer: 0 },
  { id: "g910_l3", category: "Logical", gradeBand: "9-10",
    text: { en: "Which doesn't belong: Triangle, Square, Circle, Cube", hi: "कौन सा समूह में शामिल नहीं है: त्रिभुज, वर्ग, वृत्त, घन", gu: "આમાંથી જુદું: ત્રિકોણ, ચોરસ, વર્તુળ, ઘન" },
    options: [{ en: "Triangle", hi: "त्रिभुज", gu: "ત્રિકોણ" }, { en: "Square", hi: "वर्ग", gu: "ચોરસ" }, { en: "Circle", hi: "वृत्त", gu: "વર્તુળ" }, { en: "Cube", hi: "घन", gu: "ઘન" }], answer: 3 },
  { id: "g910_l4", category: "Logical", gradeBand: "9-10",
    text: { en: "A is B's brother. B is C's mother. C is A's:", hi: "A, B का भाई है। B, C की माँ है। C, A का/की क्या है:", gu: "A એ B નો ભાઈ. B એ C ની માતા. C એ A નો?" },
    options: [{ en: "Son", hi: "बेटा", gu: "પુત્ર" }, { en: "Niece/Nephew", hi: "भतीजी/भतीजा", gu: "ભત્રીજી/ભત્રીજો" }, { en: "Brother", hi: "भाई", gu: "ભાઈ" }, { en: "Father", hi: "पिता", gu: "પિતા" }], answer: 1 },

  // Spatial (4)
  { id: "g910_s1", category: "Spatial", gradeBand: "9-10",
    text: { en: "Area of a circle with radius 7 (use π = 22/7):", hi: "7 त्रिज्या वाले वृत्त का क्षेत्रफल (π = 22/7 का उपयोग करें):", gu: "ત્રિજ્યા 7 વાળા વર્તુળનું ક્ષેત્રફળ (π = 22/7):" },
    options: [{ en: "44", hi: "44", gu: "44" }, { en: "144", hi: "144", gu: "144" }, { en: "154", hi: "154", gu: "154" }, { en: "196", hi: "196", gu: "196" }], answer: 2 },
  { id: "g910_s2", category: "Spatial", gradeBand: "9-10",
    text: { en: "A rectangle is folded along its diagonal. The two halves are:", hi: "एक आयत (rectangle) को उसके विकर्ण (diagonal) पर मोड़ा जाता है। दोनों आधे हिस्से क्या हैं:", gu: "લંબચોરસને કર્ણ સાથે વાળો — બે ભાગ?" },
    options: [{ en: "Equal squares", hi: "बराबर वर्ग", gu: "સમાન ચોરસ" }, { en: "Congruent triangles", hi: "सर्वांगसम त्रिभुज", gu: "એકરૂપ ત્રિકોણ" }, { en: "Two trapeziums", hi: "दो समलंब चतुर्भुज", gu: "બે સમલંબ ચતુષ્કોણ" }, { en: "Different shapes", hi: "अलग-अलग आकार", gu: "જુદા જુદા આકારો" }], answer: 1 },
  { id: "g910_s3", category: "Spatial", gradeBand: "9-10",
    text: { en: "Number of edges on a rectangular box (cuboid):", hi: "एक आयताकार बॉक्स (घनाभ/cuboid) के किनारों की संख्या:", gu: "લંબઘન (cuboid) ની ધારોની સંખ્યા:" },
    options: [{ en: "8", hi: "8", gu: "8" }, { en: "10", hi: "10", gu: "10" }, { en: "12", hi: "12", gu: "12" }, { en: "14", hi: "14", gu: "14" }], answer: 2 },
  { id: "g910_s4", category: "Spatial", gradeBand: "9-10",
    text: { en: "Volume of a cube of side 5 cm:", hi: "5 cm भुजा वाले घन (cube) का आयतन:", gu: "5 સેમી બાજુવાળા ઘનનું કદ:" },
    options: [{ en: "25 cm³", hi: "25 cm³", gu: "25 cm³" }, { en: "75 cm³", hi: "75 cm³", gu: "75 cm³" }, { en: "125 cm³", hi: "125 cm³", gu: "125 cm³" }, { en: "150 cm³", hi: "150 cm³", gu: "150 cm³" }], answer: 2 },

  // Mechanical (4)
  { id: "g910_m1", category: "Mechanical", gradeBand: "9-10",
    text: { en: "If a pulley reduces effort to half, what is the mechanical advantage?", hi: "यदि एक घिरनी (pulley) प्रयास को आधा कर देती है, तो यांत्रिक लाभ (mechanical advantage) क्या है?", gu: "પુલી અડધો પ્રયત્ન કરે — મિકેનિકલ એડવાન્ટેજ?" },
    options: [{ en: "0.5", hi: "0.5", gu: "0.5" }, { en: "1", hi: "1", gu: "1" }, { en: "2", hi: "2", gu: "2" }, { en: "4", hi: "4", gu: "4" }], answer: 2 },
  { id: "g910_m2", category: "Mechanical", gradeBand: "9-10",
    text: { en: "Heavier objects fall faster than lighter ones in air mainly due to:", hi: "हवा में भारी वस्तुएँ हल्की वस्तुओं की तुलना में तेज़ी से गिरती हैं, इसका मुख्य कारण है:", gu: "ભારે વસ્તુઓ હવામાં ઝડપથી પડે — મુખ્ય કારણ?" },
    options: [{ en: "Gravity differs", hi: "गुरुत्वाकर्षण अलग है", gu: "ગુરુત્વાકર્ષણ અલગ છે" }, { en: "Air resistance", hi: "वायु प्रतिरोध", gu: "હવાનો અવરોધ" }, { en: "Mass alone", hi: "केवल द्रव्यमान", gu: "માત્ર દળ" }, { en: "Wind speed", hi: "हवा की गति", gu: "પવનની ગતિ" }], answer: 1 },
  { id: "g910_m3", category: "Mechanical", gradeBand: "9-10",
    text: { en: "Which gear arrangement increases speed?", hi: "कौन सी गियर व्यवस्था गति बढ़ाती है?", gu: "કયો ગિયર ગતિ વધારે છે?" },
    options: [{ en: "Big driver, small driven", hi: "बड़ा ड्राइवर, छोटा ड्रिवन", gu: "મોટો ડ્રાઇવર, નાનો ડ્રિવન" }, { en: "Small driver, big driven", hi: "छोटा ड्राइवर, बड़ा ड्रिवन", gu: "નાનો ડ્રાઇવર, મોટો ડ્રિવન" }, { en: "Equal gears", hi: "बराबर गियर", gu: "સમાન ગિયર" }, { en: "No gears", hi: "कोई गियर नहीं", gu: "કોઈ ગિયર નહીં" }], answer: 0 },
  { id: "g910_m4", category: "Mechanical", gradeBand: "9-10",
    text: { en: "The unit of force is:", hi: "बल (force) की इकाई है:", gu: "બળનું એકમ?" },
    options: [{ en: "Joule", hi: "जूल", gu: "જૂલ" }, { en: "Newton", hi: "न्यूटन", gu: "ન્યૂટન" }, { en: "Watt", hi: "वॉट", gu: "વૉટ" }, { en: "Pascal", hi: "पास्कल", gu: "પાસ્કલ" }], answer: 1 },

  // Data Interpretation (4)
  { id: "g910_d1", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "Marks: 80, 70, 60, 90, 50. Median?", hi: "अंक: 80, 70, 60, 90, 50. माध्यिका (Median) क्या है?", gu: "ગુણ: 80, 70, 60, 90, 50. મીડિયન?" },
    options: [{ en: "60", hi: "60", gu: "60" }, { en: "70", hi: "70", gu: "70" }, { en: "75", hi: "75", gu: "75" }, { en: "80", hi: "80", gu: "80" }], answer: 1 },
  { id: "g910_d2", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "A bar chart shows monthly sales. Jan = 200, Feb = 300, Mar = 250. Average sales?", hi: "एक बार चार्ट मासिक बिक्री दिखाता है। जन = 200, फर = 300, मार्च = 250. औसत बिक्री क्या है?", gu: "વેચાણ: જાન્યુ 200, ફેબ્રુ 300, માર્ચ 250. સરેરાશ?" },
    options: [{ en: "225", hi: "225", gu: "225" }, { en: "250", hi: "250", gu: "250" }, { en: "275", hi: "275", gu: "275" }, { en: "300", hi: "300", gu: "300" }], answer: 1 },
  { id: "g910_d3", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "If sales rose from 200 to 250, percentage increase is:", hi: "यदि बिक्री 200 से बढ़कर 250 हो गई, तो प्रतिशत वृद्धि क्या है:", gu: "વેચાણ 200થી 250 થયું. ટકાવારી વધારો?" },
    options: [{ en: "20%", hi: "20%", gu: "20%" }, { en: "25%", hi: "25%", gu: "25%" }, { en: "30%", hi: "30%", gu: "30%" }, { en: "50%", hi: "50%", gu: "50%" }], answer: 1 },
  { id: "g910_d4", category: "DataInterpretation", gradeBand: "9-10",
    text: { en: "In a class of 40, 25% are girls. How many boys?", hi: "40 छात्रों की एक कक्षा में, 25% लड़कियाँ हैं। लड़के कितने हैं?", gu: "40 વિદ્યાર્થી વર્ગમાં 25% છોકરીઓ. છોકરા?" },
    options: [{ en: "10", hi: "10", gu: "10" }, { en: "20", hi: "20", gu: "20" }, { en: "25", hi: "25", gu: "25" }, { en: "30", hi: "30", gu: "30" }], answer: 3 },

  // ============================================================
  // GRADE 11–12 — DI, probability, syllogisms, critical reasoning,
  // 3D rotation, mechanical advantage, error spotting.
  // ============================================================

  // Numerical (5)
  { id: "g1112_n1", category: "Numerical", gradeBand: "11-12",
    text: { en: "Compound interest on ₹10,000 at 10% p.a. for 2 years (compounded annually):", hi: "₹10,000 पर 2 साल के लिए 10% प्रति वर्ष की दर से चक्रवृद्धि ब्याज (वार्षिक रूप से संयोजित):", gu: "₹10,000 પર 10% p.a., 2 વર્ષનું ચક્રવૃદ્ધિ વ્યાજ (વાર્ષિક):" },
    options: [{ en: "₹2000", hi: "₹2000", gu: "₹2000" }, { en: "₹2100", hi: "₹2100", gu: "₹2100" }, { en: "₹2200", hi: "₹2200", gu: "₹2200" }, { en: "₹2400", hi: "₹2400", gu: "₹2400" }], answer: 1 },
  { id: "g1112_n2", category: "Numerical", gradeBand: "11-12",
    text: { en: "Probability of rolling a sum of 7 with two dice?", hi: "दो पासे फेंकने पर योग 7 आने की प्रायिकता (probability) क्या है?", gu: "બે પાસાથી સરવાળો 7 થાય તેવી સંભાવના?" },
    options: [{ en: "1/9", hi: "1/9", gu: "1/9" }, { en: "1/6", hi: "1/6", gu: "1/6" }, { en: "5/36", hi: "5/36", gu: "5/36" }, { en: "1/12", hi: "1/12", gu: "1/12" }], answer: 1 },
  { id: "g1112_n3", category: "Numerical", gradeBand: "11-12",
    text: { en: "If log₁₀ 2 = 0.301, log₁₀ 8 = ?", hi: "यदि log₁₀ 2 = 0.301, तो log₁₀ 8 = ?", gu: "જો log₁₀ 2 = 0.301, તો log₁₀ 8?" },
    options: [{ en: "0.602", hi: "0.602", gu: "0.602" }, { en: "0.903", hi: "0.903", gu: "0.903" }, { en: "0.804", hi: "0.804", gu: "0.804" }, { en: "1.204", hi: "1.204", gu: "1.204" }], answer: 1 },
  { id: "g1112_n4", category: "Numerical", gradeBand: "11-12",
    text: { en: "Solve: x² − 5x + 6 = 0. Roots are:", hi: "हल करें: x² − 5x + 6 = 0. इसके मूल (roots) हैं:", gu: "ઉકેલો: x² − 5x + 6 = 0. મૂળ?" },
    options: [{ en: "1, 6", hi: "1, 6", gu: "1, 6" }, { en: "2, 3", hi: "2, 3", gu: "2, 3" }, { en: "−2, −3", hi: "−2, −3", gu: "−2, −3" }, { en: "3, 4", hi: "3, 4", gu: "3, 4" }], answer: 1 },
  { id: "g1112_n5", category: "Numerical", gradeBand: "11-12",
    text: { en: "A man invests ₹50,000 at 8% p.a. simple interest. Total amount after 4 years?", hi: "एक आदमी ₹50,000 का निवेश 8% प्रति वर्ष साधारण ब्याज पर करता है। 4 साल बाद कुल राशि क्या होगी?", gu: "₹50,000 પર 8% p.a. સાદું વ્યાજ, 4 વર્ષ. કુલ રકમ?" },
    options: [{ en: "₹62,000", hi: "₹62,000", gu: "₹62,000" }, { en: "₹64,000", hi: "₹64,000", gu: "₹64,000" }, { en: "₹66,000", hi: "₹66,000", gu: "₹66,000" }, { en: "₹70,000", hi: "₹70,000", gu: "₹70,000" }], answer: 2 },

  // Verbal (4)
  { id: "g1112_v1", category: "Verbal", gradeBand: "11-12",
    text: { en: "Synonym of UBIQUITOUS:", hi: "UBIQUITOUS का पर्यायवाची शब्द चुनें:", gu: "UBIQUITOUS નો સમાનાર્થી:" },
    options: [{ en: "Rare", hi: "दुर्लभ", gu: "દુર્લભ" }, { en: "Omnipresent", hi: "सर्वव्यापी", gu: "સર્વવ્યાપી" }, { en: "Hidden", hi: "छिपा हुआ", gu: "છુપાયેલું" }, { en: "Sudden", hi: "अचानक", gu: "અચાનક" }], answer: 1 },
  { id: "g1112_v2", category: "Verbal", gradeBand: "11-12",
    text: { en: "Spot the error: 'Each of the boys have completed their homework.'", hi: "इस वाक्य में त्रुटि खोजें: 'Each of the boys have completed their homework.'", gu: "ભૂલ શોધો: 'Each of the boys have completed their homework.'" },
    options: [{ en: "Each of", hi: "Each of", gu: "Each of" }, { en: "the boys", hi: "the boys", gu: "the boys" }, { en: "have completed", hi: "have completed", gu: "have completed" }, { en: "No error", hi: "कोई त्रुटि नहीं", gu: "કોઈ ભૂલ નથી" }], answer: 2 },
  { id: "g1112_v3", category: "Verbal", gradeBand: "11-12",
    text: { en: "Choose the closest meaning of 'PRAGMATIC':", hi: "'PRAGMATIC' का निकटतम अर्थ चुनें:", gu: "'PRAGMATIC' નો નજીકનો અર્થ:" },
    options: [{ en: "Theoretical", hi: "सैद्धांतिक", gu: "સૈદ્ધાંતિક" }, { en: "Practical", hi: "व्यावहारिक", gu: "વ્યાવહારિક" }, { en: "Idealistic", hi: "आदर्शवादी", gu: "આદર્શવાદી" }, { en: "Romantic", hi: "काल्पनिक", gu: "કાલ્પનિક" }], answer: 1 },
  { id: "g1112_v4", category: "Verbal", gradeBand: "11-12",
    text: { en: "Sentence completion: 'Despite the rain, the match _____ as scheduled.'", hi: "वाक्य पूरा करें: 'Despite the rain, the match _____ as scheduled.'", gu: "વાક્ય પૂરું કરો: 'Despite the rain, the match _____ as scheduled.'" },
    options: [{ en: "proceeded", hi: "proceeded", gu: "proceeded" }, { en: "preceded", hi: "preceded", gu: "preceded" }, { en: "procured", hi: "procured", gu: "procured" }, { en: "proclaimed", hi: "proclaimed", gu: "proclaimed" }], answer: 0 },

  // Logical (4)
  { id: "g1112_l1", category: "Logical", gradeBand: "11-12",
    text: { en: "Syllogism — All artists are creative. No accountant is an artist. Therefore:", hi: "न्याय-वाक्य (Syllogism) — सभी कलाकार रचनात्मक होते हैं। कोई भी अकाउंटेंट कलाकार नहीं है। इसलिए:", gu: "બધાં કલાકારો સર્જનાત્મક છે. કોઈ એકાઉન્ટન્ટ કલાકાર નથી. તેથી:" },
    options: [{ en: "No accountant is creative", hi: "कोई भी अकाउंटेंट रचनात्मक नहीं है", gu: "કોઈ એકાઉન્ટન્ટ સર્જનાત્મક નથી" }, { en: "All accountants are creative", hi: "सभी अकाउंटेंट रचनात्मक हैं", gu: "બધા એકાઉન્ટન્ટ સર્જનાત્મક છે" }, { en: "Some accountants may be creative", hi: "कुछ अकाउंटेंट रचनात्मक हो सकते हैं", gu: "કેટલાક એકાઉન્ટન્ટ સર્જનાત્મક હોઈ શકે છે" }, { en: "All artists are accountants", hi: "सभी कलाकार अकाउंटेंट हैं", gu: "બધા કલાકારો એકાઉન્ટન્ટ છે" }], answer: 2 },
  { id: "g1112_l2", category: "Logical", gradeBand: "11-12",
    text: { en: "Critical reasoning — Sales rose after we increased ad spend. So ads caused sales. The reasoning is:", hi: "तार्किक विवेचन — विज्ञापन खर्च बढ़ाने के बाद बिक्री बढ़ी। इसलिए विज्ञापन बिक्री का कारण बने। यह तर्क है:", gu: "જાહેરાત ખર્ચ પછી વેચાણ વધ્યું, માટે જાહેરાતે વેચાણ વધાર્યું — તર્ક?" },
    options: [{ en: "Strong", hi: "मजबूत", gu: "મજબૂત" }, { en: "Weak — correlation ≠ causation", hi: "कमजोर — सह-संबंध, कारण नहीं होता", gu: "નબળું — સહસંબંધ કારણ નથી હોતો" }, { en: "Conclusive", hi: "निर्णायक", gu: "નિર્ણાયક" }, { en: "Mathematical", hi: "गणितीय", gu: "ગાણિતિક" }], answer: 1 },
  { id: "g1112_l3", category: "Logical", gradeBand: "11-12",
    text: { en: "If A > B, B > C and C = D, then which is true?", hi: "यदि A > B, B > C और C = D, तो कौन सा सत्य है?", gu: "જો A > B, B > C અને C = D, તો સાચું?" },
    options: [{ en: "A > D", hi: "A > D", gu: "A > D" }, { en: "A < D", hi: "A < D", gu: "A < D" }, { en: "A = D", hi: "A = D", gu: "A = D" }, { en: "Cannot decide", hi: "तय नहीं कर सकते", gu: "નક્કી ન કરી શકાય" }], answer: 0 },
  { id: "g1112_l4", category: "Logical", gradeBand: "11-12",
    text: { en: "A statement: 'Either all students pass or the teacher resigns.' If no student passes, then:", hi: "एक कथन: 'या तो सभी छात्र पास होंगे या शिक्षक इस्तीफा देंगे।' यदि कोई भी छात्र पास नहीं होता है, तो:", gu: "'કાં બધા વિદ્યાર્થી પાસ થાય, કાં શિક્ષક રાજીનામું આપે.' જો કોઈ પાસ ન થાય, તો:" },
    options: [{ en: "Teacher does not resign", hi: "शिक्षक इस्तीफा नहीं देंगे", gu: "શિક્ષક રાજીનામું નહીં આપે" }, { en: "Teacher must resign", hi: "शिक्षक को इस्तीफा देना होगा", gu: "શિક્ષકે રાજીનામું આપવું જ પડશે" }, { en: "All pass", hi: "सभी पास होंगे", gu: "બધા પાસ થશે" }, { en: "Cannot say", hi: "कह नहीं सकते", gu: "કહી શકાય નહીં" }], answer: 1 },

  // Spatial (4)
  { id: "g1112_s1", category: "Spatial", gradeBand: "11-12",
    text: { en: "If a cube is rotated 90° about a vertical axis, the top face:", hi: "यदि एक घन को एक ऊर्ध्वाधर अक्ष (vertical axis) पर 90° घुमाया जाता है, तो ऊपरी फलक:", gu: "ઘનને ઊભા અક્ષ પર 90° ઘુમાવો — ઉપરનું ફેસ?" },
    options: [{ en: "Becomes the bottom", hi: "नीचे का फलक बन जाता है", gu: "નીચેની સપાટી બની જાય છે" }, { en: "Stays as top", hi: "ऊपर ही रहता है", gu: "ઉપર જ રહે છે" }, { en: "Becomes a side", hi: "एक साइड का फलक बन जाता है", gu: "એક બાજુની સપાટી બની જાય છે" }, { en: "Disappears", hi: "गायब हो जाता है", gu: "અદૃશ્ય થઈ જાય છે" }], answer: 1 },
  { id: "g1112_s2", category: "Spatial", gradeBand: "11-12",
    text: { en: "How many small cubes form a 3×3×3 large cube?", hi: "एक 3×3×3 बड़े घन को बनाने के लिए कितने छोटे घनों की आवश्यकता होती है?", gu: "3×3×3 ઘન કેટલા નાના ઘનથી બને?" },
    options: [{ en: "9", hi: "9", gu: "9" }, { en: "18", hi: "18", gu: "18" }, { en: "27", hi: "27", gu: "27" }, { en: "36", hi: "36", gu: "36" }], answer: 2 },
  { id: "g1112_s3", category: "Spatial", gradeBand: "11-12",
    text: { en: "A net of 6 squares connected in a cross shape folds into:", hi: "क्रॉस के आकार में जुड़े 6 वर्गों का एक नेट (net) मोड़ने पर क्या बनता है:", gu: "ક્રોસ આકારમાં જોડાયેલા 6 ચોરસનું જાળ વાળતાં બને:" },
    options: [{ en: "Pyramid", hi: "पिरामिड", gu: "પિરામિડ" }, { en: "Cube", hi: "घन", gu: "ઘન" }, { en: "Cylinder", hi: "सिलेंडर", gu: "નળાકાર" }, { en: "Cone", hi: "शंकु", gu: "શંકુ" }], answer: 1 },
  { id: "g1112_s4", category: "Spatial", gradeBand: "11-12",
    text: { en: "If you reflect the digit 6 in a mirror, it most resembles:", hi: "यदि आप अंक 6 को दर्पण में देखते हैं, तो यह सबसे अधिक किससे मिलता-जुलता है:", gu: "દર્પણમાં 6 અંક કોને મળતું દેખાય?" },
    options: [{ en: "9", hi: "9", gu: "9" }, { en: "0", hi: "0", gu: "0" }, { en: "5", hi: "5", gu: "5" }, { en: "6", hi: "6", gu: "6" }], answer: 0 },

  // Mechanical (4)
  { id: "g1112_m1", category: "Mechanical", gradeBand: "11-12",
    text: { en: "A lever has effort arm 4 m and load arm 1 m. Mechanical advantage?", hi: "एक उत्तोलक (lever) की आयास भुजा (effort arm) 4 m और भार भुजा (load arm) 1 m है। यांत्रिक लाभ क्या है?", gu: "લિવર: પ્રયત્ન બાજુ 4 મી, બોજ બાજુ 1 મી. MA?" },
    options: [{ en: "0.25", hi: "0.25", gu: "0.25" }, { en: "1", hi: "1", gu: "1" }, { en: "4", hi: "4", gu: "4" }, { en: "5", hi: "5", gu: "5" }], answer: 2 },
  { id: "g1112_m2", category: "Mechanical", gradeBand: "11-12",
    text: { en: "Power = Work / ?", hi: "शक्ति (Power) = कार्य (Work) / ?", gu: "પાવર = કામ ÷ ?" },
    options: [{ en: "Force", hi: "बल", gu: "બળ" }, { en: "Time", hi: "समय", gu: "સમય" }, { en: "Mass", hi: "द्रव्यमान", gu: "દળ" }, { en: "Distance", hi: "दूरी", gu: "અંતર" }], answer: 1 },
  { id: "g1112_m3", category: "Mechanical", gradeBand: "11-12",
    text: { en: "Which has the highest efficiency in transferring rotary motion?", hi: "घूर्णी गति (rotary motion) को स्थानांतरित करने में किसकी दक्षता सबसे अधिक होती है?", gu: "રોટરી મોશન ટ્રાન્સફરમાં શ્રેષ્ઠ કાર્યક્ષમતા?" },
    options: [{ en: "Belt drive", hi: "बेल्ट ड्राइव", gu: "બેલ્ટ ડ્રાઇવ" }, { en: "Chain drive", hi: "चेन ड्राइव", gu: "ચેઇન ડ્રાઇવ" }, { en: "Gear drive", hi: "गियर ड्राइव", gu: "ગિયર ડ્રાઇવ" }, { en: "Friction drive", hi: "घर्षण ड्राइव", gu: "ઘર્ષણ ડ્રાઇવ" }], answer: 2 },
  { id: "g1112_m4", category: "Mechanical", gradeBand: "11-12",
    text: { en: "Hydraulic brakes work on which principle?", hi: "हाइड्रोलिक ब्रेक किस सिद्धांत पर काम करते हैं?", gu: "હાઇડ્રોલિક બ્રેક કયા સિદ્ધાંત પર?" },
    options: [{ en: "Newton's", hi: "न्यूटन का", gu: "ન્યૂટનનો" }, { en: "Pascal's", hi: "पास्कल का", gu: "પાસ્કલનો" }, { en: "Bernoulli's", hi: "बर्नूली का", gu: "બર્નૌલીનો" }, { en: "Archimedes'", hi: "आर्किमिडीज का", gu: "આર્કિમિડીઝનો" }], answer: 1 },

  // Data Interpretation (4)
  { id: "g1112_d1", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "A company's revenue: 2021=₹100Cr, 2022=₹120Cr, 2023=₹150Cr. CAGR (approx)?", hi: "एक कंपनी का राजस्व: 2021=₹100Cr, 2022=₹120Cr, 2023=₹150Cr. CAGR (लगभग) क्या है?", gu: "મહેસુલ: 2021=₹100Cr, 2022=₹120Cr, 2023=₹150Cr. CAGR (લગભગ)?" },
    options: [{ en: "15%", hi: "15%", gu: "15%" }, { en: "20%", hi: "20%", gu: "20%" }, { en: "22%", hi: "22%", gu: "22%" }, { en: "25%", hi: "25%", gu: "25%" }], answer: 2 },
  { id: "g1112_d2", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "If 30% of 200 students play cricket and 25% play football (no overlap), how many play neither?", hi: "यदि 200 छात्रों में से 30% क्रिकेट खेलते हैं और 25% फुटबॉल खेलते हैं (कोई भी दोनों खेल नहीं खेलता है), तो कितने छात्र कोई भी खेल नहीं खेलते हैं?", gu: "200માંથી 30% ક્રિકેટ, 25% ફૂટબોલ રમે (ઓવરલેપ નહીં). કેટલા કોઈ ન રમે?" },
    options: [{ en: "70", hi: "70", gu: "70" }, { en: "80", hi: "80", gu: "80" }, { en: "90", hi: "90", gu: "90" }, { en: "110", hi: "110", gu: "110" }], answer: 2 },
  { id: "g1112_d3", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "Pie chart: Food 30%, Rent 25%, Travel 15%, Savings 30%. If income is ₹40,000, savings amount?", hi: "पाई चार्ट: भोजन 30%, किराया 25%, यात्रा 15%, बचत 30%. यदि आय ₹40,000 है, तो बचत की राशि क्या है?", gu: "પાઇ: ખોરાક 30%, ભાડું 25%, મુસાફરી 15%, બચત 30%. આવક ₹40,000 — બચત?" },
    options: [{ en: "₹10,000", hi: "₹10,000", gu: "₹10,000" }, { en: "₹12,000", hi: "₹12,000", gu: "₹12,000" }, { en: "₹14,000", hi: "₹14,000", gu: "₹14,000" }, { en: "₹15,000", hi: "₹15,000", gu: "₹15,000" }], answer: 1 },
  { id: "g1112_d4", category: "DataInterpretation", gradeBand: "11-12",
    text: { en: "Standard deviation measures:", hi: "मानक विचलन (Standard deviation) क्या मापता है:", gu: "પ્રમાણિત વિચલન શું માપે છે?" },
    options: [{ en: "Average", hi: "औसत", gu: "સરેરાશ" }, { en: "Spread of data", hi: "डेटा का फैलाव", gu: "ડેટાનો ફેલાવો" }, { en: "Median", hi: "माध्यिका", gu: "મધ્યસ્થ" }, { en: "Mode", hi: "बहुलक", gu: "બહુલક" }], answer: 1 },
];

export const LIKERT_OPTIONS: { value: number; label: { en: string; hi: string; gu: string } }[] = [
  { value: 1, label: { en: "Strongly Disagree", hi: "पूरी तरह असहमत", gu: "પૂરેપૂરો અસંમત" } },
  { value: 2, label: { en: "Disagree", hi: "असहमत", gu: "અસંમત" } },
  { value: 3, label: { en: "Neutral", hi: "तटस्थ", gu: "તટસ્થ" } },
  { value: 4, label: { en: "Agree", hi: "सहमत", gu: "સંમત" } },
  { value: 5, label: { en: "Strongly Agree", hi: "पूरी तरह सहमत", gu: "પૂરેપૂરો સંમત" } },
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
