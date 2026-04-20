import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { Compass, GraduationCap, Library, Sparkles, Brain, Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useState } from "react";

const NAV = [
  { to: "/", label: { en: "Home", gu: "મુખ્ય" }, icon: Sparkles },
  { to: "/career", label: { en: "Career Guidance", gu: "કારકિર્દી માર્ગદર્શન" }, icon: Compass },
  { to: "/colleges", label: { en: "Colleges", gu: "કોલેજો" }, icon: Library },
  { to: "/test", label: { en: "Aptitude Test", gu: "મનો-યોગ્યતા ટેસ્ટ" }, icon: Brain },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <GraduationCap className="h-6 w-6 text-primary" />
            <div className="leading-tight">
              <div className="font-serif text-base md:text-lg">Disha</div>
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
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
          <div className="ml-auto flex items-center gap-2">
            <LanguageToggle />
            <Link
              to="/admin"
              className="hidden md:inline-flex text-xs text-muted-foreground hover:text-foreground px-2 py-1"
            >
              {lang === "gu" ? "એડમિન" : "Admin"}
            </Link>
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
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-md text-xs text-muted-foreground"
              >
                {lang === "gu" ? "એડમિન ડેશબોર્ડ" : "Admin Dashboard"} →
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-sidebar text-sidebar-foreground mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-serif text-lg mb-2">Disha — દિશા</div>
            <p className="text-sidebar-foreground/70 text-xs">
              {lang === "gu"
                ? "શ્રીમદ્ રાજચંદ્ર એજ્યુકેશનલ ટ્રસ્ટ દ્વારા ગુજરાતના વિદ્યાર્થીઓ માટે મફત કારકિર્દી માર્ગદર્શન."
                : "Free career guidance for students of Gujarat by the Shrimad Rajchandra Educational Trust outreach program."}
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
            © {new Date().getFullYear()} Shrimad Rajchandra Educational Trust
          </div>
        </div>
      </footer>
    </div>
  );
}
