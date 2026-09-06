import type { Lang } from "@/lib/lang";
import { AUTO_TX } from "@/lib/autoStrings";

/**
 * Four-language helper for pages that were authored with English + Gujarati.
 * Hindi and Marathi come from the generated AUTO_TX table, keyed by the
 * English string, and fall back to English when a phrase is not translated.
 */
export function t4(lang: Lang, en: string, gu: string): string {
  if (lang === "gu") return gu;
  if (lang === "en") return en;
  const entry = AUTO_TX[en];
  return entry?.[lang] || en;
}
