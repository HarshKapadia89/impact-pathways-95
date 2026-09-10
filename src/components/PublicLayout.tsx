import { translator, useLang } from "@/lib/lang";
import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  Award,
  Brain,
  Building2,
  CalendarCheck,
  ChevronDown,
  Compass,
  FileCheck,
  FileText,
  Heart,
  HelpCircle,
  LayoutDashboard,
  Library,
  Menu,
  Rocket,
  Search,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowIcon, Button, Logotype } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import { LanguageToggle } from "./LanguageToggle";
import { CareerChatbot } from "./CareerChatbot";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { StatsBand } from "./StatsBand";

type NavLabel = { en: string; gu: string; hi: string; mr: string };
type NavItem = { to: string; label: NavLabel; short?: NavLabel; icon: LucideIcon };

const PRIMARY_NAV: NavItem[] = [
  { to: "/", label: { en: "Home", gu: "હોમ", hi: "होम", mr: "होम" }, icon: Sparkles },
  { to: "/test", label: { en: "Aptitude Test", gu: "અભિરુચિ ટેસ્ટ", hi: "एप्टीट्यूड टेस्ट", mr: "अ‍ॅप्टिट्यूड टेस्ट" }, short: { en: "Test", gu: "ટેસ્ટ", hi: "टेस्ट", mr: "टेस्ट" }, icon: Brain },
  { to: "/career-library", label: { en: "Career Library", gu: "કારકિર્દી લાઇબ્રેરી", hi: "करियर लाइब्रेरी", mr: "करिअर लायब्ररी" }, short: { en: "Career Library", gu: "કારકિર્દી લાઇબ્રેરી", hi: "करियर लाइब्रेरी", mr: "करिअर लायब्ररी" }, icon: Library },
  { to: "/find-college", label: { en: "College Finder", gu: "કૉલેજ શોધક", hi: "कॉलेज फाइंडर", mr: "कॉलेज फाइंडर" }, short: { en: "College Finder", gu: "કૉલેજ શોધક", hi: "कॉलेज फाइंडर", mr: "कॉलेज फाइंडर" }, icon: Search },
  { to: "/upskill", label: { en: "LevelUp Lab", gu: "લેવલઅપ લેબ", hi: "लेवलअप लॅब", mr: "लेवलअप लॅब" }, short: { en: "LevelUp", gu: "લેવલઅપ", hi: "लेवलअप", mr: "लेवलअप" }, icon: Rocket },
  { to: "/counsellor", label: { en: "Counsellor", gu: "માર્ગદર્શક", hi: "काउंसलर", mr: "समुपदेशक" }, icon: CalendarCheck },
];

const TOOL_NAV = [
  { to: "/career", label: { en: "Gujarat guidance", gu: "ગુજરાત માર્ગદર્શન", hi: "गुजरात मार्गदर्शन", mr: "गुजरात मार्गदर्शन" }, short: { en: "Gujarat", gu: "ગુજરાત", hi: "गुजरात", mr: "गुजरात" }, icon: Compass },
  { to: "/scholarships", label: { en: "Scholarships", gu: "શિષ્યવૃત્તિ", hi: "छात्रवृत्ति", mr: "शिष्यवृत्ती" }, icon: Award },
  { to: "/exams", label: { en: "Entrance exams", gu: "પ્રવેશ પરીક્ષાઓ", hi: "प्रवेश परीक्षाएँ", mr: "प्रवेश परीक्षा" }, short: { en: "Exams", gu: "પરીક્ષાઓ", hi: "परीक्षाएँ", mr: "परीक्षा" }, icon: FileCheck },
  { to: "/dashboard", label: { en: "Dashboard", gu: "ડૅશબોર્ડ", hi: "डैशबोर्ड", mr: "डॅशबोर्ड" }, icon: LayoutDashboard },
  { to: "/profile-builder", label: { en: "Resume Builder", gu: "રિઝ્યુમે બિલ્ડર", hi: "रिज़्यूमे बिल्डर", mr: "रेझ्युमे बिल्डर" }, short: { en: "Resume", gu: "રિઝ્યુમે", hi: "रिज़्यूमे", mr: "रेझ्युमे" }, icon: FileText },
];

const FOOTER_NAV = [
  { to: "/about", label: { en: "About", gu: "અમારા વિશે", hi: "हमारे बारे में", mr: "आमच्याविषयी" } },
  { to: "/parents", label: { en: "For Parents", gu: "વાલીઓ માટે", hi: "अभिभावकों के लिए", mr: "पालकांसाठी" }, icon: Heart },
  { to: "/for-schools", label: { en: "For Schools", gu: "શાળાઓ માટે", hi: "स्कूलों के लिए", mr: "शाळांसाठी" }, icon: Building2 },
  { to: "/success-stories", label: { en: "Success Stories", gu: "સફળતાની વાતો", hi: "सफलता की कहानियाँ", mr: "यशोगाथा" }, icon: Trophy },
  { to: "/faq", label: { en: "FAQ", gu: "પ્રશ્નો", hi: "सवाल", mr: "प्रश्न" }, icon: HelpCircle },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const lang = useLang();
  const t = translator(lang);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const active = (to: string) => (to === "/" ? location.pathname === "/" : location.pathname === to || location.pathname.startsWith(`${to}/`));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header data-no-translate className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex h-16 items-center gap-4">
            <Link to="/" className="brand-link rounded-md shrink-0" aria-label="HBK Careers home">
              <Logotype size="md" />
            </Link>

            <nav className="ml-auto hidden items-center gap-0.5 xl:flex" aria-label="Primary navigation">
              {[...PRIMARY_NAV, ...TOOL_NAV].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`brand-link whitespace-nowrap rounded-md px-2 py-2 text-caption font-semibold ${active(item.to) ? "bg-highlight text-highlight-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  {t(item.short ?? item.label)}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-1 xl:ml-0">
              <LanguageToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen((value) => !value)}
                className="xl:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <nav className="overflow-x-auto border-t border-border py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:hidden" aria-label="Quick navigation">
            <div className="flex w-max items-center gap-1">
              {[...PRIMARY_NAV, ...TOOL_NAV].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`brand-link whitespace-nowrap rounded-md px-2.5 py-1.5 text-caption font-semibold ${active(item.to) ? "bg-highlight text-highlight-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  {t(item.short ?? item.label)}
                </Link>
              ))}
            </div>
          </nav>

          {mobileOpen && (
            <nav className="border-t border-border py-4 xl:hidden" aria-label="Mobile navigation">
              <div className="grid gap-1">
                {[...PRIMARY_NAV, ...TOOL_NAV].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={`brand-link flex items-center gap-3 rounded-md px-3 py-3 text-body ${active(item.to) ? "bg-highlight text-highlight-foreground font-semibold" : "text-foreground hover:bg-muted"}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                      {t(item.label)}
                    </Link>
                  );
                })}
              </div>
              <Button variant="ghost" fullWidth onClick={() => setToolsOpen((value) => !value)} className="mt-2 justify-between" aria-expanded={toolsOpen}>
                {t({ en: "About HBK Careers", gu: "HBK Careers વિશે", hi: "HBK Careers के बारे में", mr: "HBK Careers विषयी" })}
                <ChevronDown className="h-4 w-4" />
              </Button>
              {toolsOpen && (
                <div className="grid gap-1 pt-2">
                  {FOOTER_NAV.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="brand-link rounded-md px-3 py-2 text-caption text-muted-foreground hover:bg-muted hover:text-foreground">
                      {t(item.label)}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <StatsBand lang={lang} />

      <footer data-no-translate className="bg-highlight text-highlight-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
          <div>
            <Logotype size="md" tone="inverse" />
            <p className="mt-4 max-w-sm text-caption text-highlight-foreground/80">
              {t({
                en: "Clear, practical career guidance for every student—built by The H B Kapadia New High School, Ahmedabad.",
                gu: "દરેક વિદ્યાર્થી માટે સ્પષ્ટ અને વ્યવહારુ કારકિર્દી માર્ગદર્શન—ધ એચ. બી. કાપડિયા ન્યૂ હાઈસ્કૂલ, અમદાવાદ દ્વારા.",
                hi: "हर विद्यार्थी के लिए स्पष्ट और व्यावहारिक करियर मार्गदर्शन—द एच. बी. कापड़िया न्यू हाई स्कूल, अहमदाबाद द्वारा।",
                mr: "प्रत्येक विद्यार्थ्यासाठी स्पष्ट आणि व्यावहारिक करिअर मार्गदर्शन—द एच. बी. कापडिया न्यू हायस्कूल, अहमदाबाद तर्फे.",
              })}
            </p>
          </div>
          <div>
            <h2 className="text-subheading">{t({ en: "Explore", gu: "અન્વેષણ", hi: "जानकारी", mr: "शोधा" })}</h2>
            <ul className="mt-4 grid gap-3 text-caption text-highlight-foreground/80">
              {[...PRIMARY_NAV.slice(1), ...TOOL_NAV.slice(1)].map((item) => (
                <li key={item.to}><Link to={item.to} className="brand-link rounded-sm hover:text-highlight-foreground">{t(item.label)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-subheading">{t({ en: "Support", gu: "સહાય", hi: "सहायता", mr: "सहाय्य" })}</h2>
            <ul className="mt-4 grid gap-3 text-caption text-highlight-foreground/80">
              {FOOTER_NAV.map((item) => (
                <li key={item.to}><Link to={item.to} className="brand-link rounded-sm hover:text-highlight-foreground">{t(item.label)}</Link></li>
              ))}
            </ul>
            <Link to="/test" className="brand-link mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-caption font-semibold text-accent-foreground">
              {t({ en: "Start your assessment", gu: "મૂલ્યાંકન શરૂ કરો", hi: "मूल्यांकन शुरू करें", mr: "मूल्यांकन सुरू करा" })}
              <ArrowIcon size={16} />
            </Link>
          </div>
        </div>
        <div className="border-t border-highlight-foreground/20">
          <div className="mx-auto max-w-7xl px-4 py-4 text-overline text-highlight-foreground/70 md:px-8">
            © {new Date().getFullYear()} The H B Kapadia New High School, Ahmedabad
          </div>
        </div>
      </footer>

      <StickyMobileCTA />
      <CareerChatbot />
    </div>
  );
}