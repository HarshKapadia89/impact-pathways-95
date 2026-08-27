import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Home, School, CalendarCheck, Sparkles, User } from "lucide-react";
import type { ReactNode } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { PreviewBanner } from "./PreviewBanner";

export function TeacherLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const location = useLocation();

  const nav = [
    { to: "/teacher", label: t("teacher.nav.today"), icon: Home, exact: true },
    { to: "/teacher/schools", label: t("teacher.nav.schools"), icon: School },
    { to: "/teacher/sessions", label: t("teacher.nav.sessions"), icon: CalendarCheck },
    { to: "/teacher/profile", label: t("teacher.nav.profile"), icon: User },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PreviewBanner />
      <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="h-5 w-5 text-primary shrink-0" />
          <div className="font-serif text-base leading-tight truncate">
            {t("teacher.appName")}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <LanguageToggle />
        </div>
      </header>

      <main className="flex-1 overflow-auto pb-20">{children}</main>

      <nav className="fixed bottom-0 inset-x-0 flex border-t border-border bg-card z-40 max-w-2xl mx-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
