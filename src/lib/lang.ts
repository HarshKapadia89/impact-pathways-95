import { useTranslation } from "react-i18next";

export type Lang = "en" | "gu" | "hi" | "mr";

export const LANGS: Lang[] = ["en", "gu", "hi", "mr"];

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  gu: "ગુજરાતી",
  hi: "हिन्दी",
  mr: "मराठी",
};

export function toLang(raw: string | undefined | null): Lang {
  if (!raw) return "en";
  if (raw.startsWith("gu")) return "gu";
  if (raw.startsWith("hi")) return "hi";
  if (raw.startsWith("mr")) return "mr";
  return "en";
}

/** Current UI language, one of en | gu | hi | mr. */
export function useLang(): Lang {
  const { i18n } = useTranslation();
  return toLang(i18n.language);
}

type Entry<T> = Partial<Record<Lang, T>> & { en: T };

/**
 * Pick a value for the active language, falling back:
 * mr → hi → en, hi → en, gu → en.
 */
export function pick<T>(entry: Entry<T>, lang: Lang): T {
  if (lang === "mr") return (entry.mr ?? entry.hi ?? entry.en) as T;
  return (entry[lang] ?? entry.en) as T;
}

/** Curry-friendly translator for component-local dictionaries. */
export function translator(lang: Lang) {
  return <T,>(entry: Entry<T>) => pick(entry, lang);
}
