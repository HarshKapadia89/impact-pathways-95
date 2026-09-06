import { LANGS, LANG_LABEL, toLang } from "@/lib/lang";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/** All four languages shown side by side (used in the footer, bottom-left). */
export function LanguagePicker() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const now = toLang(i18n.language);

  return (
    <div className="flex flex-wrap gap-2">
      {LANGS.map((l) => {
        const active = mounted && l === now;
        return (
          <button
            key={l}
            type="button"
            onClick={() => i18n.changeLanguage(l)}
            suppressHydrationWarning
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "border-accent bg-accent/20 text-sidebar-foreground"
                : "border-sidebar-border/40 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:border-accent/60"
            }`}
          >
            {LANG_LABEL[l]}
          </button>
        );
      })}
    </div>
  );
}
