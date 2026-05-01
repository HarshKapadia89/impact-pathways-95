import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { Compass, GraduationCap, Sparkles, Brain, BookOpen, Menu, X, Search } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { CareerChatbot } from "./CareerChatbot";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";

const NAV = [
  { to: "/", label: { en: "Home", gu: "મુખ્ય" }, icon: Sparkles },
  { to: "/career", label: { en: "Career Guidance — Gujarat", gu: "કારકિર્દી માર્ગદર્શન — ગુજરાત" }, icon: Compass },
  { to: "/handbook", label: { en: "Career Guidance — India", gu: "કારકિર્દી માર્ગદર્શન — ભારત" }, icon: BookOpen },
  { to: "/find-college", label: { en: "Find Your College", gu: "તમારી કોલેજ શોધો" }, icon: Search },
  { to: "/test", label: { en: "Aptitude Test", gu: "મનો-યોગ્યતા ટેસ્ટ" }, icon: Brain },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <GraduationCap className="h-6 w-6 text-primary" />
            <div className="leading-tight">
              <div className="font-serif text-base md:text-lg">HBK Careers</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">
                {lang === "gu" ? "વિદ્યાર્થી માર્ગદર્શન કેન્દ્ર" : "Student Guidance Hub"}
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active =
                item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                    active
                      ? "bg-accent/15 text-primary font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-primary hover:bg-accent/10"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-accent-foreground" : ""}`} style={active ? { color: "var(--brand-2)" } : undefined} />
                  {item.label[lang]}
                  {active && <span className="absolute -bottom-px left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-accent" />}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 -mr-2 rounded-md hover:bg-muted"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border">
            <nav className="px-4 py-3 space-y-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active =
                  item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm ${
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
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

      <footer className="border-t-4 border-accent/70 bg-sidebar text-sidebar-foreground mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-serif text-lg mb-2">HBK Careers</div>
            <p className="text-sidebar-foreground/70 text-xs">
              {lang === "gu"
                ? "ધ એચ બી કાપડિયા ન્યૂ હાઈ સ્કૂલ, અમદાવાદ દ્વારા ગુજરાતના વિદ્યાર્થીઓ માટે મફત કારકિર્દી માર્ગદર્શન."
                : "Free career guidance for students of Gujarat by The H B Kapadia New High School, Ahmedabad."}
            </p>
          </div>
          <div>
            <div className="font-medium mb-2">{lang === "gu" ? "વિભાગો" : "Sections"}</div>
            <ul className="space-y-1 text-sidebar-foreground/70 text-xs">
              {NAV.slice(1).map((n) => (
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

      <CareerChatbot />
    </div>
  );
}
