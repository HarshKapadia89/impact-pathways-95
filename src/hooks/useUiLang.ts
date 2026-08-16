import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Language for UI copy that is safe during SSR hydration.
 * Server always renders "en"; the stored language is applied after mount,
 * so the first client render matches the server markup exactly.
 */
export function useUiLang(): "en" | "hi" | "gu" {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return "en";
  if (i18n.language?.startsWith("gu")) return "gu";
  if (i18n.language?.startsWith("hi")) return "hi";
  return "en";
}

/** Two-language variant for pages that only have en/gu copy. */
export function useUiLangEnGu(): "en" | "gu" {
  return useUiLang() === "gu" ? "gu" : "en";
}
