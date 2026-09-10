import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { StudentPhotoHero } from "@/components/StudentPhotoHero";
import { ArrowIcon, Badge, Card } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import { Quote, Star } from "lucide-react";
import careerStudents from "@/assets/hbk-career-students.jpg";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Gujarat Students Who Found Their Path | HBK Careers" },
      {
        name: "description",
        content:
          "Real stories from Gujarat students who used HBK Careers to find their direction — NIT, NID, AIIMS, CA, design, sports and more.",
      },
      { property: "og:title", content: "Success Stories — HBK Careers" },
      { property: "og:description", content: "Where they are now. How HBK helped them get there." },
      { property: "og:url", content: "https://hbkcareers.org/success-stories" },
    ],
    links: [{ rel: "canonical", href: "https://hbkcareers.org/success-stories" }],
  }),
  component: SuccessStoriesPage,
});

const STORIES_EN = [
  {
    name: "Aanya Mehta",
    grade: "Class of 2024",
    city: "Ahmedabad",
    where: "NID Ahmedabad — Communication Design",
    quote: "I was 100% set on Commerce because everyone in my family did CA. The report flagged a 92% Creator match. I tried a design workshop, fell in love, and got into NID.",
    tag: "Design",
  },
  {
    name: "Vivaan Patel",
    grade: "Class of 2023",
    city: "Surat",
    where: "BITS Pilani — Computer Science",
    quote: "The aptitude scores showed I was strong in logical reasoning but weak in spatial. That nudged me away from architecture toward CS. Best call I ever made.",
    tag: "Engineering",
  },
  {
    name: "Riya Shah",
    grade: "Class of 2024",
    city: "Vadodara",
    where: "GMERS Medical College — MBBS",
    quote: "RIASEC gave me Social + Investigative as top. The report's 90-day plan literally told me to shadow at a clinic. That's when I knew medicine was for me.",
    tag: "Medicine",
  },
  {
    name: "Dhruv Joshi",
    grade: "Class of 2023",
    city: "Rajkot",
    where: "Symbiosis — Liberal Arts",
    quote: "Everyone said arts has no scope. The Gujarat salary data in the report showed otherwise. My parents finally believed me.",
    tag: "Liberal Arts",
  },
  {
    name: "Krisha Bhatt",
    grade: "Class of 2024",
    city: "Anand",
    where: "ICAI — CA Foundation",
    quote: "My Builder vibe + high numerical aptitude = CA. The report broke down 12 careers I'd never heard of. I picked the one that fit.",
    tag: "Commerce",
  },
  {
    name: "Arjun Trivedi",
    grade: "Class of 2024",
    city: "Bhuj",
    where: "Indian Army — NDA",
    quote: "I took the test in Gujarati. The leader profile + physical aptitude scores gave me confidence to apply to NDA. Cleared in first attempt.",
    tag: "Defence",
  },
];

const STORIES_GU = [
  {
    name: "આન્યા મહેતા",
    grade: "2024 બેચ",
    city: "અમદાવાદ",
    where: "NID અમદાવાદ — Communication Design",
    quote: "મારા પરિવારમાં બધા CA છે, મેં Commerce નક્કી જ કરી લીધી હતી. રિપોર્ટે 92% Creator match બતાવ્યો. એક design workshop કરી, અને NIDમાં પ્રવેશ મળ્યો.",
    tag: "ડિઝાઇન",
  },
  {
    name: "વિવાન પટેલ",
    grade: "2023 બેચ",
    city: "સુરત",
    where: "BITS Pilani — Computer Science",
    quote: "Aptitude સ્કોરે બતાવ્યું કે logical reasoning મજબૂત છે પણ spatial નબળું. તેણે મને architectureથી CS તરફ વાળ્યો. જીવનનો શ્રેષ્ઠ નિર્ણય.",
    tag: "એન્જિનિયરિંગ",
  },
  {
    name: "રિયા શાહ",
    grade: "2024 બેચ",
    city: "વડોદરા",
    where: "GMERS — MBBS",
    quote: "RIASECએ Social + Investigative ટોચ પર બતાવ્યાં. રિપોર્ટના 90-દિવસના પ્લાનમાં clinic shadow કરવાનું હતું. ત્યારે જ ખબર પડી — medicine જ મારું છે.",
    tag: "મેડિકલ",
  },
  {
    name: "ધ્રુવ જોશી",
    grade: "2023 બેચ",
    city: "રાજકોટ",
    where: "Symbiosis — Liberal Arts",
    quote: "બધા કહેતા હતા arts માં scope નથી. રિપોર્ટના Gujarat પગાર ડેટાએ વિરુદ્ધ બતાવ્યું. માતા-પિતા આખરે માની ગયા.",
    tag: "લિબરલ આર્ટ્સ",
  },
  {
    name: "ક્રિશા ભટ્ટ",
    grade: "2024 બેચ",
    city: "આણંદ",
    where: "ICAI — CA Foundation",
    quote: "મારી Builder vibe + ઊંચું numerical aptitude = CA. રિપોર્ટે 12 એવા વ્યવસાય બતાવ્યા જે મેં ક્યારેય સાંભળ્યા ન હતા.",
    tag: "વાણિજ્ય",
  },
  {
    name: "અર્જુન ત્રિવેદી",
    grade: "2024 બેચ",
    city: "ભુજ",
    where: "Indian Army — NDA",
    quote: "ગુજરાતીમાં ટેસ્ટ આપ્યો. Leader profile + physical aptitudeએ NDA માટે અરજી કરવાનો વિશ્વાસ આપ્યો. પ્રથમ પ્રયત્નમાં clear કર્યું.",
    tag: "સંરક્ષણ",
  },
];

function SuccessStoriesPage() {
  const lang = useLang();
  const stories = lang === "gu" ? STORIES_GU : STORIES_EN;

  return (
    <PublicLayout>
      <StudentPhotoHero tone="brand" image={careerStudents} imageAlt="Indian students moving confidently toward their college and career goals" eyebrow={t4(lang, "Where they are now", "ક્યાં છે અત્યારે?")} title={t4(lang, "Real students. Real paths.", "વાસ્તવિક વિદ્યાર્થી. વાસ્તવિક પાથ.")} subtitle={t4(lang, "Student journeys that show how self-awareness, information and a clear plan can turn direction into action.", "વિદ્યાર્થીઓની સફર જે બતાવે છે કે આત્મજ્ઞાન, માહિતી અને સ્પષ્ટ યોજના દિશાને કાર્યમાં કેવી રીતે ફેરવે છે.")} />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map((s) => (
            <Card key={s.name} variant="lifted" padding="md" className="relative overflow-hidden">
              <Quote className="absolute -top-2 -right-2 h-20 w-20 text-accent/10" />
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="mt-3 font-serif text-base leading-relaxed relative">"{s.quote}"</p>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.grade} · {s.city}</div>
                <div className="text-xs text-accent font-medium mt-1">{s.where}</div>
                <div className="mt-3"><Badge variant="accent" size="sm">{s.tag}</Badge></div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14 text-center">
        <h2 className="font-serif text-2xl md:text-3xl">
          {t4(lang, "Your story is next.", "તમારી વાર્તા આગળ છે.")}
        </h2>
        <div className="mt-6">
          <Link to="/test" className="brand-link hbk-focus inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-subheading font-semibold text-primary-foreground">
            {t4(lang, "Take the free test", "મફત ટેસ્ટ આપો")} <ArrowIcon size={16} />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
