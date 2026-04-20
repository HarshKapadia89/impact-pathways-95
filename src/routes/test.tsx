import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { Brain, Globe2, FileText, Sparkles, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Free Bilingual Psychometric Test (Grades 6–12) — 20-page PDF | Disha" },
      {
        name: "description",
        content:
          "Free RIASEC + Multiple Intelligences + Aptitude test in English & Gujarati for grades 6–12. Get a detailed 20-page PDF report instantly.",
      },
      { property: "og:title", content: "Free Psychometric Test — Disha" },
      { property: "og:description", content: "Bilingual test, 20-page personalised PDF report." },
    ],
  }),
  component: TestIntro,
});

function TestIntro() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState<"en" | "gu">(lang);

  const start = () => {
    sessionStorage.setItem(
      "disha-test-meta",
      JSON.stringify({ name: name || "Student", grade, age, language })
    );
    navigate({ to: "/test/take" });
  };

  return (
    <PublicLayout>
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <h1 className="font-serif text-3xl md:text-5xl">
          {lang === "gu" ? "મફત મનો-યોગ્યતા ટેસ્ટ" : "Free Psychometric Test"}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {lang === "gu"
            ? "ધોરણ 6 થી 12 ના વિદ્યાર્થીઓ માટે. RIASEC + મલ્ટિપલ ઇન્ટેલિજન્સ + યોગ્યતા. 15-25 મિનિટ. તરત જ 20-પાનાનો રિપોર્ટ."
            : "For students of grades 6 through 12. RIASEC + Multiple Intelligences + Aptitude. 15–25 minutes. Instant 20-page PDF report."}
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Brain,
              title: lang === "gu" ? "3 ભાગો" : "3 Parts",
              text:
                lang === "gu"
                  ? "RIASEC રુચિ + 8 ઇન્ટેલિજન્સ + 5 યોગ્યતા."
                  : "RIASEC interests + 8 intelligences + 5 aptitudes.",
            },
            {
              icon: Globe2,
              title: lang === "gu" ? "દ્વિભાષી" : "Bilingual",
              text:
                lang === "gu"
                  ? "પ્રશ્નો અંગ્રેજી અને ગુજરાતી બંનેમાં."
                  : "Questions in both English and Gujarati.",
            },
            {
              icon: FileText,
              title: lang === "gu" ? "20-પાનાનો રિપોર્ટ" : "20-page Report",
              text:
                lang === "gu"
                  ? "વ્યક્તિગત PDF — પ્રવાહ, કોલેજો, એક્શન પ્લાન."
                  : "Personalised PDF — streams, colleges, action plan.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
              <c.icon className="h-6 w-6 text-primary" />
              <div className="mt-3 font-serif text-lg">{c.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 max-w-2xl">
          <div className="font-serif text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            {lang === "gu" ? "શરૂ કરતા પહેલાં" : "Before you start"}
          </div>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="text-xs text-muted-foreground">
                {lang === "gu" ? "તમારું નામ" : "Your name"}
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder={lang === "gu" ? "નામ" : "Full name"}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground">
                  {lang === "gu" ? "ધોરણ" : "Grade"}
                </span>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">--</option>
                  {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">
                  {lang === "gu" ? "ઉંમર" : "Age"}
                </span>
                <input
                  type="number"
                  min={9}
                  max={20}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs text-muted-foreground">
                {lang === "gu" ? "ભાષા" : "Language"}
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "gu")}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </label>
          </div>
          <button
            onClick={start}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md py-2.5 text-sm font-medium hover:opacity-90"
          >
            {lang === "gu" ? "ટેસ્ટ શરૂ કરો" : "Start the test"}
            <ChevronRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {lang === "gu"
              ? "કોઈ લૉગિન જરૂરી નથી. તમારા જવાબો ફક્ત રિપોર્ટ જનરેટ કરવા માટે વપરાય છે."
              : "No login needed. Your answers are used only to generate your report."}
          </p>
          <Link to="/career" className="mt-3 block text-xs text-primary hover:underline">
            {lang === "gu" ? "પ્રથમ કારકિર્દી માર્ગો જુઓ" : "Browse career paths first"} →
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
