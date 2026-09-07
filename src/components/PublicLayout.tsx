import { translator, useLang } from "@/lib/lang";
import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Compass,
  GraduationCap,
  Sparkles,
  Brain,
  
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
  Library,
  Rocket,
  CalendarCheck,
} from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { CareerChatbot } from "./CareerChatbot";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { useState } from "react";
import { useEffect } from "react";

const NAV = [
  { to: "/", label: { en: "Home", gu: "હોમ", hi: "होम", mr: "होम" }, icon: Sparkles },
  { to: "/career", label: { en: "Gujarat", gu: "ગુજરાત", hi: "गुजरात", mr: "गुजरात" }, icon: Compass },
  
  { to: "/find-college", label: { en: "Colleges", gu: "કૉલેજ", hi: "कॉलेज", mr: "कॉलेज" }, icon: Search },
  {
    to: "/career-library",
    label: { en: "Career Library", gu: "કારકિર્દી લાઇબ્રેરી", hi: "करियर लाइब्रेरी", mr: "करिअर लायब्ररी" },
    icon: Library,
  },
  { to: "/scholarships", label: { en: "Scholarships", gu: "શિષ્યવૃત્તિ", hi: "छात्रवृत्ति", mr: "शिष्यवृत्ती" }, icon: Award },
  { to: "/exams", label: { en: "Exams", gu: "પરીક્ષાઓ", hi: "परीक्षाएँ", mr: "परीक्षा" }, icon: FileCheck },
  { to: "/upskill", label: { en: "LevelUp Lab", gu: "લેવલઅપ લેબ", hi: "लेवलअप लॅब", mr: "लेवलअप लॅब" }, icon: Rocket },
  { to: "/test", label: { en: "Aptitude", gu: "અભિરુચિ ટેસ્ટ", hi: "एप्टीट्यूड टेस्ट", mr: "अ‍ॅप्टिट्यूड टेस्ट" }, icon: Brain },
  { to: "/dashboard", label: { en: "Dashboard", gu: "ડૅશબોર્ડ", hi: "डैशबोर्ड", mr: "डॅशबोर्ड" }, icon: LayoutDashboard },
  { to: "/profile-builder", label: { en: "Resume", gu: "રિઝ્યુમે", hi: "रिज़्यूमे", mr: "रेझ्युमे" }, icon: FileText },
  { to: "/counsellor", label: { en: "Counsellor", gu: "માર્ગદર્શક", hi: "काउंसलर", mr: "समुपदेशक" }, icon: CalendarCheck },
];

const FOOTER_EXTRA = [
  { to: "/about", label: { en: "About", gu: "અમારા વિશે", hi: "हमारे बारे में", mr: "आमच्याविषयी" }, icon: Info },
  { to: "/parents", label: { en: "For Parents", gu: "વાલીઓ માટે", hi: "अभिभावकों के लिए", mr: "पालकांसाठी" }, icon: Heart },
  {
    to: "/success-stories",
    label: { en: "Success Stories", gu: "સફળતાની વાતો", hi: "सफलता की कहानियाँ", mr: "यशोगाथा" },
    icon: Trophy,
  },
  { to: "/faq", label: { en: "FAQ", gu: "વારંવાર પુછાતા પ્રશ્નો", hi: "अक्सर पूछे सवाल", mr: "नेहमीचे प्रश्न" }, icon: HelpCircle },
  { to: "/for-schools", label: { en: "For Schools", gu: "શાળાઓ માટે", hi: "स्कूलों के लिए", mr: "शाळांसाठी" }, icon: Building2 },
];

const ACTIVE_PILL =
  "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 65%, var(--primary)))";

export function PublicLayout({ children }: { children: ReactNode }) {
  const lang = useLang();
  const t = translator(lang);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header data-no-translate className="sticky top-0 z-40 px-2 md:px-4 pt-3 pb-2">
        <div className="max-w-7xl mx-auto relative group">
          {/* Floating glow background */}
          <div
            className="pointer-events-none absolute -inset-1 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--accent) 35%, transparent), color-mix(in oklab, var(--primary) 20%, transparent))",
            }}
          />

          {/* Main glass bar — two rows: brand, then nav pills */}
          <div
            className="relative px-3 md:px-5 py-3 bg-card/70 backdrop-blur-2xl border border-white/40 rounded-3xl ring-1 ring-inset"
            style={{
              boxShadow: "0 8px 32px color-mix(in oklab, var(--accent) 12%, transparent)",
              // @ts-expect-error custom prop accepted by Tailwind ring-color
              "--tw-ring-color": "color-mix(in oklab, var(--accent) 30%, transparent)",
            }}
          >
            {/* Row 1 — brand */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 shrink-0 pl-1">
                <div
                  className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 70%, var(--primary)))",
                    boxShadow: "0 0 18px color-mix(in oklab, var(--accent) 40%, transparent)",
                  }}
                >
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                <div className="leading-tight">
                  <div className="font-serif text-base md:text-xl text-foreground tracking-tight whitespace-nowrap">
                    HBK Careers
                  </div>
                  <div
                    className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
                    style={{ color: "var(--accent)" }}
                    suppressHydrationWarning
                  >
                    {safeT({ en: "Student Guidance Hub", gu: "વિદ્યાર્થી માર્ગદર્શન કેન્દ્ર", hi: "छात्र मार्गदर्शन केंद्र", mr: "विद्यार्थी मार्गदर्शन केंद्र" })}
                  </div>
                </div>
              </Link>

              <div className="ml-auto flex items-center gap-1">
                <LanguageToggle />
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="lg:hidden p-2 rounded-full hover:bg-accent/10 text-foreground transition-all active:scale-90"
                  aria-label="Menu"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Row 2 — nav pills */}
            <nav className="hidden lg:flex flex-wrap items-center gap-1 mt-2.5">
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
                      className="relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-primary-foreground whitespace-nowrap transition-all duration-300"
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: ACTIVE_PILL,
                          boxShadow: "0 4px 14px color-mix(in oklab, var(--accent) 35%, transparent)",
                        }}
                      />
                      <Icon className="relative h-4 w-4" />
                      <span className="relative">{safeT(item.label)}</span>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap text-muted-foreground hover:text-foreground transition-all hover:bg-accent/10 ${
                      isResume ? "border border-accent/30 font-semibold text-foreground hover:bg-accent/15" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" style={isResume ? { color: "var(--accent)" } : undefined} />
                    {safeT(item.label)}
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
                          ? "text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }`}
                      style={active ? { background: ACTIVE_PILL } : undefined}
                    >
                      <Icon className="h-4 w-4" />
                      {safeT(item.label)}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer data-no-translate className="border-t-4 border-accent/70 bg-sidebar text-sidebar-foreground mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-serif text-lg mb-2">HBK Careers</div>
            <p className="text-sidebar-foreground/70 text-xs leading-relaxed">
              {safeT({
                en: "Free career guidance for students of Gujarat by The H B Kapadia New High School, Ahmedabad.",
                gu: "ધ એચ. બી. કાપડિયા ન્યૂ હાઈસ્કૂલ, અમદાવાદ તરફથી ગુજરાતના વિદ્યાર્થીઓ માટે નિઃશુલ્ક કારકિર્દી માર્ગદર્શન.",
                hi: "द एच. बी. कापड़िया न्यू हाई स्कूल, अहमदाबाद द्वारा विद्यार्थियों के लिए निःशुल्क करियर मार्गदर्शन।",
                mr: "द एच. बी. कापडिया न्यू हायस्कूल, अहमदाबाद यांच्याकडून विद्यार्थ्यांसाठी मोफत करिअर मार्गदर्शन.",
              })}
            </p>
          </div>
          <div>
            <div className="font-medium mb-2">{safeT({ en: "Sections", gu: "વિભાગો", hi: "अनुभाग", mr: "विभाग" })}</div>
            <ul className="space-y-1 text-sidebar-foreground/70 text-xs">
              {[...NAV.slice(1), ...FOOTER_EXTRA].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-sidebar-foreground">
                    {safeT(n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">{safeT({ en: "Usage", gu: "ઉપયોગ", hi: "उपयोग", mr: "वापर" })}</div>
            <p className="text-sidebar-foreground/70 text-xs leading-relaxed">
              {safeT({
                en: "All content and tests are completely free. No login required.",
                gu: "બધી માહિતી અને ટેસ્ટ સંપૂર્ણપણે નિઃશુલ્ક છે. લૉગિન કરવાની જરૂર નથી.",
                hi: "सारी जानकारी और टेस्ट पूरी तरह निःशुल्क हैं। लॉगिन ज़रूरी नहीं है।",
                mr: "सर्व माहिती आणि चाचण्या पूर्णपणे मोफत आहेत. लॉगिन करण्याची गरज नाही.",
              })}
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
