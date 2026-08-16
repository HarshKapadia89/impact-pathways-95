import { useTranslation } from "react-i18next";
import { useUiLang } from "@/hooks/useUiLang";

// Cycle order: English → हिन्दी → ગુજરાતી → English
const ORDER = ["en", "hi", "gu"] as const;
type Lng = (typeof ORDER)[number];

const LABEL: Record<Lng, string> = {
  en: "English",
  hi: "हिन्दी",
  gu: "ગુજરાતી",
};

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const now = useUiLang();
  const nextIdx = (ORDER.indexOf(now) + 1) % ORDER.length;
  const next = ORDER[nextIdx];
  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      title={`Switch to ${LABEL[next]}`}
      className="inline-flex items-center gap-2 border-2 border-current px-3 py-1.5 text-xs font-black uppercase tracking-widest transition-transform hover:-translate-y-0.5"
    >
      {LABEL[next]}
    </button>
  );
}
