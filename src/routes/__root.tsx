import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Suspense } from "react";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import "@/lib/i18n";

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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Outreach Mission Control — The H B Kapadia New High School, Ahmedabad" },
      {
        name: "description",
        content:
          "Mission control for The H B Kapadia New High School, Ahmedabad outreach program — managing 428 schools across Dharampur.",
      },
      { name: "author", content: "The H B Kapadia New High School, Ahmedabad" },
      { property: "og:title", content: "Outreach Mission Control — The H B Kapadia New High School, Ahmedabad" },
      { property: "og:description", content: "Impact Compass is an app for managing educational outreach programs and tracking student impact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Outreach Mission Control — The H B Kapadia New High School, Ahmedabad" },
      { name: "description", content: "Impact Compass is an app for managing educational outreach programs and tracking student impact." },
      { name: "twitter:description", content: "Impact Compass is an app for managing educational outreach programs and tracking student impact." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/97c7d7ef-1c14-4c94-ad29-cda8bb94e96d/id-preview-344737cc--e314d757-25ae-430b-a2ef-6530bea02d8b.lovable.app-1776978743326.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/97c7d7ef-1c14-4c94-ad29-cda8bb94e96d/id-preview-344737cc--e314d757-25ae-430b-a2ef-6530bea02d8b.lovable.app-1776978743326.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
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
  return (
    <Suspense fallback={null}>
      <AuthProvider>
        <Outlet />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </Suspense>
  );
}
