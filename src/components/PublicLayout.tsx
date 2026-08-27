import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import {
  Compass,
  GraduationCap,
  Sparkles,
  Brain,
  BookOpen,
  Menu,
  X,
  Search,
  LayoutDashboard,
  Award,
  FileCheck,
  FileText,
  Building2,
  Heart,
  HelpCircle,
  Trophy,
  Info,
} from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { CareerChatbot } from "./CareerChatbot";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { useState } from "react";

const NAV = [
  { to: "/", label: { en: "Home", gu: "મુખ્ય" }, icon: Sparkles, color: "var(--brand-5)" },
  { to: "/career", label: { en: "Gujarat", gu: "ગુજરાત" }, icon: Compass, color: "var(--brand-1)" },
  { to: "/handbook", label: { en: "India", gu: "ભારત" }, icon: BookOpen, color: "var(--brand-2)" },
  { to: "/find-college", label: { en: "Colleges", gu: "કોલેજો" }, icon: Search, color: "var(--brand-3)" },
  { to: "/scholarships", label: { en: "Scholarships", gu: "શિષ્યવૃત્તિ" }, icon: Award, color: "var(--brand-4)" },
  { to: "/exams", label: { en: "Exams", gu: "પરીક્ષાઓ" }, icon: FileCheck, color: "var(--brand-6)" },
  { to: "/test", label: { en: "Aptitude", gu: "ટેસ્ટ" }, icon: Brain, color: "var(--brand-1)" },
  { to: "/dashboard", label: { en: "Dashboard", gu: "ડેશબોર્ડ" }, icon: LayoutDashboard, color: "var(--brand-2)" },
  { to: "/profile-builder", label: { en: "Resume", gu: "રિઝ્યુમ" }, icon: FileText, color: "var(--brand-3)" },
];

const FOOTER_EXTRA = [
  { to: "/about", label: { en: "About", gu: "વિશે" }, icon: Info },
  { to: "/parents", label: { en: "For Parents", gu: "માતા-પિતા માટે" }, icon: Heart },
  { to: "/success-stories", label: { en: "Success Stories", gu: "સફળતા" }, icon: Trophy },
  { to: "/faq", label: { en: "FAQ", gu: "પ્રશ્નો" }, icon: HelpCircle },
  { to: "/for-schools", label: { en: "For Schools", gu: "શાળાઓ માટે" }, icon: Building2 },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40">
        {/* Diagonal neon bar strip */}
        <div className="bar-stripes h-2 w-full" />

        <div className="bg-[var(--ink)] text-[var(--cream)] border-b-4 border-[var(--ink)]">
          <div className="max-w-7xl mx-auto px-3 md:px-6">
            {/* Row 1: brand */}
            <div className="flex items-center gap-3 py-2.5">
              <Link to="/" className="flex items-center gap-3 shrink-0">
                <span
                  className="flex items-center justify-center w-10 h-10 border-2 border-[var(--cream)]"
                  style={{ background: "var(--brand-5)" }}
                >
                  <GraduationCap className="h-6 w-6 text-[oklch(0.16_0.01_270)]" />
                </span>
                <span className="leading-none">
                  <span className="block font-display text-lg md:text-2xl tracking-tight whitespace-nowrap">
                    HBK CAREERS
                  </span>
                  <span
                    className="block mt-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] whitespace-nowrap"
                    style={{ color: "var(--brand-3)" }}
                  >
                    {lang === "gu" ? "વિદ્યાર્થી માર્ગદર્શન કેન્દ્ર" : "Student Guidance Hub"}
                  </span>
                </span>
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden ml-auto p-2 border-2 border-[var(--cream)] active:translate-y-0.5"
                aria-label="Menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Row 2: nav tiles */}
            <nav className="hidden lg:flex flex-wrap items-stretch gap-1.5 pb-2.5">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active =
                  item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold uppercase tracking-wide whitespace-nowrap border-2 transition-transform ${
                      active
                        ? "text-[oklch(0.16_0.01_270)] border-[var(--cream)]"
                        : "border-[oklch(0.96_0.022_95_/_35%)] text-[var(--cream)] hover:-translate-y-0.5"
                    }`}
                    style={active ? { background: item.color } : undefined}
                  >
                    <Icon className="h-4 w-4" style={!active ? { color: item.color } : undefined} />
                    {item.label[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-[var(--ink)] border-b-4 border-[var(--ink)]">
            <nav className="px-3 pb-3 grid grid-cols-2 gap-1.5">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active =
                  item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wide border-2 ${
                      active
                        ? "text-[oklch(0.16_0.01_270)] border-[var(--cream)]"
                        : "text-[var(--cream)] border-[oklch(0.96_0.022_95_/_35%)]"
                    }`}
                    style={active ? { background: item.color } : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-sidebar text-sidebar-foreground mt-16 border-t-4 border-[var(--ink)]">
        <div className="bar-stripes h-2 w-full" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-display text-2xl mb-3">HBK CAREERS</div>
            <p className="text-sidebar-foreground/70 text-xs leading-relaxed">
              {lang === "gu"
                ? "ધ એચ બી કાપડિયા ન્યૂ હાઈ સ્કૂલ, અમદાવાદ દ્વારા ગુજરાતના વિદ્યાર્થીઓ માટે મફત કારકિર્દી માર્ગદર્શન."
                : "Free career guidance for students of Gujarat by The H B Kapadia New High School, Ahmedabad."}
            </p>
            <div className="mt-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-sidebar-foreground/60 mb-2">
                {lang === "gu" ? "ભાષા" : "Language"}
              </div>
              <LanguageToggle />
            </div>
          </div>
          <div>
            <div className="font-display text-sm mb-3" style={{ color: "var(--brand-5)" }}>
              {lang === "gu" ? "વિભાગો" : "Sections"}
            </div>
            <ul className="space-y-1.5 text-sidebar-foreground/75 text-xs">
              {[...NAV.slice(1), ...FOOTER_EXTRA].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-sidebar-foreground uppercase tracking-wide font-semibold">
                    {n.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-sm mb-3" style={{ color: "var(--brand-3)" }}>
              {lang === "gu" ? "ઉપયોગ" : "Usage"}
            </div>
            <p className="text-sidebar-foreground/75 text-xs leading-relaxed">
              {lang === "gu"
                ? "બધી માહિતી અને ટેસ્ટ સંપૂર્ણપણે મફત છે. કોઈ લૉગિન જરૂરી નથી."
                : "All content and tests are completely free. No login required."}
            </p>
          </div>
        </div>
        <div className="border-t border-sidebar-border/40">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/50">
            © {new Date().getFullYear()} The H B Kapadia New High School, Ahmedabad
          </div>
        </div>
      </footer>

      <StickyMobileCTA />
      <CareerChatbot />
    </div>
  );
}
