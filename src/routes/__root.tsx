import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/hooks/useAuth";
import { AutoTranslate } from "@/components/AutoTranslate";
import { Toaster } from "@/components/ui/sonner";
import { bootstrapOffline } from "@/lib/offlineBoot";
import { applyStoredTheme } from "@/components/ThemeSwitcher";
import "@/lib/i18n";
import i18n from "@/lib/i18n";
import { toLang, persistLang, getCookieLang } from "@/lib/lang";
import { applyRequestLang } from "@/lib/langServer.functions";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground font-serif">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  loader: () => applyRequestLang(),
  staleTime: Infinity,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HBK Careers — Find Your Direction" },
      {
        name: "description",
        content:
          "Career guidance, assessments, professions, colleges, exams, scholarships and skill-building for students in four languages.",
      },
      { name: "author", content: "The H B Kapadia New High School, Ahmedabad" },
      { property: "og:title", content: "HBK Careers — Find Your Direction" },
      { property: "og:description", content: "A complete career guidance platform for students in English, Gujarati, Hindi and Marathi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "HBK Careers — Find Your Direction" },
      { name: "twitter:description", content: "A complete career guidance platform for students in four languages." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Gujarati:wght@400;600;700&display=swap",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    applyStoredTheme();
    bootstrapOffline();
    // Prefer the cookie (mirrors SSR), then localStorage, then whatever i18n
    // already initialized with — never force English over a saved choice.
    const saved = getCookieLang() ?? toLang(localStorage.getItem("i18nextLng") || i18n.language);
    persistLang(saved);
    if (i18n.language !== saved) i18n.changeLanguage(saved);
    document.documentElement.lang = saved;
  }, []);
  return (
    <Suspense fallback={null}>
      <AuthProvider>
        <AutoTranslate />
        <Outlet />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </Suspense>
  );
}
