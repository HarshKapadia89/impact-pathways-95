import { Link } from "@tanstack/react-router";
import { Brain, ArrowRight } from "lucide-react";
import { useUiLangEnGu } from "@/hooks/useUiLang";

export function StickyMobileCTA() {
  const lang = useUiLangEnGu();
  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-20 z-30 pointer-events-none">
      <Link
        to="/test"
        className="pointer-events-auto flex items-center gap-2 bg-poster-blue text-paper border-2 border-ink px-4 py-3 text-[13px] font-extrabold uppercase tracking-wide block-shadow active:translate-x-[2px] active:translate-y-[2px] transition-transform"
        style={{ boxShadow: "5px 5px 0 0 var(--brand-4)" }}
      >
        <Brain className="h-4 w-4" style={{ color: "var(--brand-5)" }} />
        <span className="truncate">
          {lang === "gu" ? "એપ્ટિટ્યુડ ટેસ્ટ આપો — 20-પાનાનો રિપોર્ટ" : "Take the aptitude test — 20-page report"}
        </span>
        <ArrowRight className="h-4 w-4 ml-auto" />
      </Link>
    </div>
  );
}
