import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { Compass, GraduationCap, Sparkles, Brain, BookOpen, Menu, X, Search, LayoutDashboard, Award, FileCheck, FileText, Building2, Heart, HelpCircle, Trophy, Info } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { CareerChatbot } from "./CareerChatbot";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { useState } from "react";

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

export function PublicLayout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 px-2 md:px-4 pt-3 pb-2">
        <div className="max-w-7xl mx-auto relative group">
          {/* Floating glow background */}
          <div
            className="pointer-events-none absolute -inset-1 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"
            style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--accent) 35%, transparent), color-mix(in oklab, var(--primary) 20%, transparent))" }}
          />

          {/* Main glass bar — dual-layer borders: outer white/40, inner ring teal */}
          <div
            className="relative flex flex-col gap-2 px-3 md:px-5 py-2.5 bg-card/70 backdrop-blur-2xl border border-white/40 rounded-3xl ring-1 ring-inset"
            style={{
              boxShadow: "0 8px 32px color-mix(in oklab, var(--accent) 12%, transparent)",
              // @ts-expect-error custom ring color
              "--tw-ring-color": "color-mix(in oklab, var(--accent) 30%, transparent)",
            }}
          >
            {/* Row 1: brand + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 shrink-0 pl-1">
                <div
                  className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 70%, var(--primary)))",
                    boxShadow: "0 0 18px color-mix(in oklab, var(--accent) 40%, transparent)",
                  }}
                >
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="leading-tight">
                  <div className="font-serif text-base md:text-lg text-foreground tracking-tight whitespace-nowrap">HBK Careers</div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
                    style={{ color: "var(--brand-2, var(--accent))" }}
                  >
                    {lang === "gu" ? "વિદ્યાર્થી માર્ગદર્શન કેન્દ્ર" : "Student Guidance Hub"}
                  </div>
                </div>
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden ml-auto p-2 rounded-full hover:bg-accent/10 text-foreground transition-all active:scale-90"
                aria-label="Menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Row 2: full nav (desktop) */}
            <nav className="hidden lg:flex flex-wrap items-center gap-1 pt-1.5 border-t border-white/30">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active =
                  item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                const isResume = item.to === "/profile-builder";
                if (active) {
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="relative flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-white whitespace-nowrap transition-all duration-300"
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 65%, var(--primary)))",
                          boxShadow: "0 4px 14px color-mix(in oklab, var(--accent) 35%, transparent)",
                        }}
                      />
                      <Icon className="relative h-4 w-4" />
                      <span className="relative">{item.label[lang]}</span>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap text-muted-foreground hover:text-foreground transition-all hover:bg-accent/10 ${
                      isResume ? "border border-accent/30 font-semibold text-foreground hover:bg-accent/15" : ""
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isResume ? "text-accent" : ""}`} style={isResume ? { color: "var(--accent)" } : undefined} />
                    {item.label[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="lg:hidden mt-2 rounded-2xl border border-white/40 bg-card/85 backdrop-blur-2xl shadow-[0_8px_32px_color-mix(in_oklab,var(--accent)_12%,transparent)] overflow-hidden">
              <nav className="px-2 py-2 space-y-0.5">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  const active =
                    item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        active
                          ? "text-white font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }`}
                      style={active ? { background: "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 65%, var(--primary)))" } : undefined}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label[lang]}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t-4 border-accent/70 bg-sidebar text-sidebar-foreground mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-serif text-lg mb-2">HBK Careers</div>
            <p className="text-sidebar-foreground/70 text-xs">
              {lang === "gu"
                ? "ધ એચ બી કાપડિયા ન્યૂ હાઈ સ્કૂલ, અમદાવાદ દ્વારા ગુજરાતના વિદ્યાર્થીઓ માટે મફત કારકિર્દી માર્ગદર્શન."
                : "Free career guidance for students of Gujarat by The H B Kapadia New High School, Ahmedabad."}
            </p>
            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60 mb-2">
                {lang === "gu" ? "ભાષા" : "Language"}
              </div>
              <LanguageToggle />
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">{lang === "gu" ? "વિભાગો" : "Sections"}</div>
            <ul className="space-y-1 text-sidebar-foreground/70 text-xs">
              {[...NAV.slice(1), ...FOOTER_EXTRA].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-sidebar-foreground">
                    {n.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">{lang === "gu" ? "ઉપયોગ" : "Usage"}</div>
            <p className="text-sidebar-foreground/70 text-xs">
              {lang === "gu"
                ? "બધી માહિતી અને ટેસ્ટ સંપૂર્ણપણે મફત છે. કોઈ લૉગિન જરૂરી નથી."
                : "All content and tests are completely free. No login required."}
            </p>
          </div>
        </div>
        <div className="border-t border-sidebar-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-[10px] text-sidebar-foreground/50">
            © {new Date().getFullYear()} The H B Kapadia New High School, Ahmedabad
          </div>
        </div>
      </footer>

      <StickyMobileCTA />
      <CareerChatbot />
    </div>
  );
}
