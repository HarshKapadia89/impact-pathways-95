import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

// Cycle order: English → हिन्दी → ગુજરાતી → English
const ORDER = ["en", "hi", "gu"] as const;
type Lng = (typeof ORDER)[number];

const LABEL: Record<Lng, string> = {
  en: "English",
  hi: "हिन्दी",
  gu: "ગુજરાતી",
};

function currentLng(raw: string | undefined): Lng {
  if (raw?.startsWith("hi")) return "hi";
  if (raw?.startsWith("gu")) return "gu";
  return "en";
}

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const now = currentLng(i18n.language);
  const nextIdx = (ORDER.indexOf(now) + 1) % ORDER.length;
  const next = ORDER[nextIdx];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => i18n.changeLanguage(next)}
      className="font-medium"
      title={mounted ? `Switch to ${LABEL[next]}` : undefined}
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>{mounted ? LABEL[next] : ""}</span>
    </Button>
  );
}
