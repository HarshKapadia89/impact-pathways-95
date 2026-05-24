import { Link } from "@tanstack/react-router";
import { Brain, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function StickyMobileCTA() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("gu") ? "gu" : "en";
  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-20 z-30 pointer-events-none">
      <Link
        to="/test"
        className="pointer-events-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-3 text-sm font-semibold shadow-[0_8px_24px_color-mix(in_oklab,var(--primary)_40%,transparent)] active:scale-95 transition"
      >
        <Brain className="h-4 w-4" />
        {lang === "gu" ? "મફત ટેસ્ટ આપો — 20-પાનાનો રિપોર્ટ" : "Take free test → 20-page report"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
