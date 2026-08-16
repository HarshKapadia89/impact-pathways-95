import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Compass, Sparkles, Brain, BookOpen, Menu, X, Search, LayoutDashboard, Award, FileCheck, FileText, Building2, Heart, HelpCircle, Trophy, Info } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { CareerChatbot } from "./CareerChatbot";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { useState } from "react";
import { useUiLangEnGu } from "@/hooks/useUiLang";

const NAV = [
  { to: "/", label: { en: "Home", gu: "મુખ્ય" }, icon: Sparkles },
  { to: "/career", label: { en: "Gujarat", gu: "ગુજરાત" }, icon: Compass },
  { to: "/handbook", label: { en: "India", gu: "ભારત" }, icon: BookOpen },
  { to: "/find-college", label: { en: "Colleges", gu: "કોલેજો" }, icon: Search },
  { to: "/scholarships", label: { en: "Scholarships", gu: "શિષ્યવૃત્તિ" }, icon: Award },
  { to: "/exams", label: { en: "Exams", gu: "પરીક્ષાઓ" }, icon: FileCheck },
  { to: "/test", label: { en: "Aptitude", gu: "ટેસ્ટ" }, icon: Brain },
  { to: "/dashboard", label: { en: "Dashboard", gu: "ડેશબોર્ડ" }, icon: LayoutDashboard },
  { to: "/profile-builder", label: { en: "Resume", gu: "રિઝ્યુમ" }, icon: FileText },
];

const FOOTER_EXTRA = [
  { to: "/about", label: { en: "About", gu: "વિશે" }, icon: Info },
  { to: "/parents", label: { en: "For Parents", gu: "માતા-પિતા માટે" }, icon: Heart },
  { to: "/success-stories", label: { en: "Success Stories", gu: "સફળતા" }, icon: Trophy },
  { to: "/faq", label: { en: "FAQ", gu: "પ્રશ્નો" }, icon: HelpCircle },
  { to: "/for-schools", label: { en: "For Schools", gu: "શાળાઓ માટે" }, icon: Building2 },
];

// Flat poster colours cycled across nav items
const NAV_TONE = [
  "var(--brand-4)",
  "var(--brand-1)",
  "var(--brand-3)",
  "var(--brand-2)",
  "var(--brand-5)",
  "var(--brand-6)",
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const lang = useUiLangEnGu();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top colour stripe */}
      <div className="h-2 stripe-band" aria-hidden />

      <header className="sticky top-0 z-40 bg-paper text-ink border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          {/* Row 1: brand */}
          <div className="flex items-center gap-3 py-3">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div
                className="flex items-center justify-center w-10 h-10 border-2 border-ink"
                style={{ background: "var(--brand-5)" }}
              >
                <span className="font-serif text-lg text-ink leading-none">H</span>
              </div>
              <div className="leading-none">
                <div className="poster-title text-xl md:text-2xl text-ink">HBK CAREERS</div>
                <div className="mt-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--brand-1)" }}>
                  {lang === "gu" ? "વિદ્યાર્થી માર્ગદર્શન કેન્દ્ર" : "Student Guidance Hub"}
                </div>
              </div>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-auto p-2 border-2 border-ink"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Row 2: nav */}
          <nav className="hidden lg:flex flex-wrap items-stretch gap-0 border-t-2 border-ink/15">
            {NAV.map((item, i) => {
              const Icon = item.icon;
              const active =
                item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
              const tone = NAV_TONE[i % NAV_TONE.length];
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-extrabold uppercase tracking-wide whitespace-nowrap transition-colors"
                  style={active ? { background: tone, color: "var(--ink)" } : { color: "var(--ink)" }}
                >
                  <Icon className="h-4 w-4" style={active ? undefined : { color: tone }} />
                  <span>{item.label[lang]}</span>
                  {!active && (
                    <span
                      className="pointer-events-none absolute left-0 right-0 bottom-0 h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
                      style={{ background: tone }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t-2 border-ink/15">
            <nav className="px-3 py-2">
              {NAV.map((item, i) => {
                const Icon = item.icon;
                const active =
                  item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                const tone = NAV_TONE[i % NAV_TONE.length];
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-extrabold uppercase tracking-wide border-b-2 border-ink/10"
                    style={active ? { background: tone, color: "var(--ink)" } : undefined}
                  >
                    <Icon className="h-4 w-4" style={active ? undefined : { color: tone }} />
                    {item.label[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="text-paper mt-16" style={{ background: "var(--brand-1)" }}>
        <div className="h-2 stripe-band" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="poster-title text-3xl mb-3">HBK CAREERS</div>
            <p className="text-paper/70 text-xs leading-relaxed max-w-xs">
              {lang === "gu"
                ? "ધ એચ બી કાપડિયા ન્યૂ હાઈ સ્કૂલ, અમદાવાદ દ્વારા ગુજરાતના વિદ્યાર્થીઓ માટે મફત કારકિર્દી માર્ગદર્શન."
                : "Free career guidance for students of Gujarat by The H B Kapadia New High School, Ahmedabad."}
            </p>
            <div className="mt-6">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-paper/50 mb-2">
                {lang === "gu" ? "ભાષા" : "Language"}
              </div>
              <LanguageToggle />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: "var(--brand-5)" }}>
              {lang === "gu" ? "વિભાગો" : "Sections"}
            </div>
            <ul className="space-y-1.5 text-paper/75 text-xs font-semibold uppercase tracking-wide">
              {[...NAV.slice(1), ...FOOTER_EXTRA].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-paper">
                    {n.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: "var(--brand-5)" }}>
              {lang === "gu" ? "ઉપયોગ" : "Usage"}
            </div>
            <p className="text-paper/70 text-xs leading-relaxed">
              {lang === "gu"
                ? "બધી માહિતી અને ટેસ્ટ સંપૂર્ણપણે મફત છે. કોઈ લૉગિન જરૂરી નથી."
                : "All content and tests are completely free. No login required."}
            </p>
          </div>
        </div>
        <div className="border-t-2 border-paper/15">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 text-[10px] uppercase tracking-widest text-paper/45">
            © {new Date().getFullYear()} The H B Kapadia New High School, Ahmedabad
          </div>
        </div>
      </footer>

      <StickyMobileCTA />
      <CareerChatbot />
    </div>
  );
}
