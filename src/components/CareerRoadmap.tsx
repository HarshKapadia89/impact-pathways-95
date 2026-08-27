import { GraduationCap, BookOpen, FileCheck2, Briefcase, TrendingUp, Award, Rocket, School } from "lucide-react";
import type { CareerPath, Stream } from "@/lib/careerData";

type Props = { stream: Stream; path: CareerPath; lang: "en" | "gu" };

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  detail: string;
  salary?: string;
};

function buildSteps(stream: Stream, path: CareerPath, lang: "en" | "gu"): Step[] {
  const t = (en: string, gu: string) => (lang === "gu" ? gu : en);
  const exams = path.entranceExams.join(", ");
  const baseSalary = path.avgSalary;
  // crude salary band derivation
  const mid = baseSalary;
  const senior = baseSalary.replace(/\d+/g, (n) => String(Number(n) * 2));

  return [
    {
      icon: School,
      label: t("Class 8–10", "ધોરણ 8–10"),
      title: t("Build the basics", "પાયો મજબૂત કરો"),
      detail: t(
        "Focus on Maths, English & Science fundamentals. Explore hobbies linked to this field.",
        "ગણિત, અંગ્રેજી અને વિજ્ઞાનનો પાયો મજબૂત કરો. આ ક્ષેત્ર સાથે જોડાયેલા શોખ શોધો.",
      ),
    },
    {
      icon: BookOpen,
      label: t("Class 11–12", "ધોરણ 11–12"),
      title: t(`Take the ${stream.name} stream`, `${stream.nameGu} પ્રવાહ લો`),
      detail: path.eligibility,
    },
    {
      icon: FileCheck2,
      label: t("Entrance Exam", "પ્રવેશ પરીક્ષા"),
      title: exams || t("Direct admission", "સીધો પ્રવેશ"),
      detail: t(
        "Begin focused prep in Class 11. Most students join coaching alongside boards.",
        "ધોરણ 11 થી તૈયારી શરૂ કરો. મોટાભાગના વિદ્યાર્થીઓ બોર્ડ સાથે કોચિંગ લે છે.",
      ),
    },
    {
      icon: GraduationCap,
      label: t("Undergrad", "સ્નાતક"),
      title: path.title,
      detail: `${path.duration} • ${t("Top picks", "ટોચની પસંદગી")}: ${path.topColleges.slice(0, 2).join(", ")}`,
    },
    {
      icon: Briefcase,
      label: t("Entry role (0–2 yrs)", "પ્રારંભિક ભૂમિકા (0–2 વર્ષ)"),
      title: path.careers[0] || t("Junior associate", "જુનિયર એસોસિએટ"),
      detail: t("Internship → first job. Build portfolio and certifications.", "ઈન્ટર્નશિપ → પ્રથમ નોકરી. પોર્ટફોલિયો બનાવો."),
      salary: baseSalary,
    },
    {
      icon: TrendingUp,
      label: t("Mid-career (3–7 yrs)", "મધ્ય કારકિર્દી (3–7 વર્ષ)"),
      title: path.careers[1] || t("Specialist", "નિષ્ણાત"),
      detail: t("Specialise, lead small teams, optionally pursue PG/MBA.", "વિશેષજ્ઞતા મેળવો, નાની ટીમનું નેતૃત્વ કરો, PG/MBA વિચારો."),
      salary: mid,
    },
    {
      icon: Award,
      label: t("Senior (8+ yrs)", "વરિષ્ઠ (8+ વર્ષ)"),
      title: path.careers[2] || path.careers[0] || t("Lead / Manager", "લીડ / મેનેજર"),
      detail: t("Manage teams, own outcomes, mentor juniors.", "ટીમ સંભાળો, પરિણામો માટે જવાબદાર બનો."),
      salary: senior,
    },
    {
      icon: Rocket,
      label: t("Long term", "લાંબા ગાળે"),
      title: t("Director / Founder / Consultant", "ડિરેક્ટર / સ્થાપક / કન્સલ્ટન્ટ"),
      detail: t(
        "Leadership, independent practice, or your own venture in this field.",
        "નેતૃત્વ, સ્વતંત્ર પ્રેક્ટિસ અથવા આ ક્ષેત્રમાં તમારું પોતાનું સાહસ.",
      ),
    },
  ];
}

export function CareerRoadmap({ stream, path, lang }: Props) {
  const steps = buildSteps(stream, path, lang);
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-serif text-xl flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        {lang === "gu" ? "કારકિર્દી રોડમેપ" : "Your career roadmap"}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {lang === "gu"
          ? "ધોરણ 8 થી વરિષ્ઠ ભૂમિકા સુધીના તબક્કા."
          : "Stage-by-stage path from Class 8 to senior roles."}
      </p>

      <ol className="mt-6 relative">
        <span className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={i} className="relative pl-14 pb-6 last:pb-0">
              <span className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="font-medium text-foreground mt-0.5">{s.title}</div>
              <p className="text-sm text-foreground/80 mt-1">{s.detail}</p>
              {s.salary && (
                <div className="mt-1 inline-block text-xs rounded-md bg-accent/20 text-accent-foreground px-2 py-0.5">
                  {lang === "gu" ? "પગાર" : "Salary"}: {s.salary}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
