import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  School,
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  Sparkles,
  Smartphone,
} from "lucide-react";
import type { ReactNode } from "react";
import { LanguageToggle } from "./LanguageToggle";

export function AdminLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const location = useLocation();

  const nav = [
    { to: "/", label: t("nav.overview"), icon: LayoutDashboard },
    { to: "/schools", label: t("nav.schools"), icon: School },
    { to: "/teachers", label: t("nav.teachers"), icon: Users },
    { to: "/programs", label: t("nav.programs"), icon: BookOpen },
    { to: "/sessions", label: t("nav.sessions"), icon: CalendarCheck },
    { to: "/reports", label: t("nav.reports"), icon: FileText },
    { to: "/teacher", label: t("teacher.appName"), icon: Smartphone },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-6 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sidebar-primary" />
            <div className="font-serif text-lg leading-tight">{t("app.name")}</div>
          </div>
          <p className="mt-1 text-xs text-sidebar-foreground/70 leading-snug">
            {t("app.tagline")}
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active =
              item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-card/60 backdrop-blur px-4 md:px-8 py-3">
          <div className="md:hidden font-serif text-lg">{t("app.name")}</div>
          <div className="ml-auto flex items-center gap-2">
            <LanguageToggle />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
        {/* Mobile bottom nav */}
        <nav className="md:hidden flex border-t border-border bg-card">
          {nav.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active =
              item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
