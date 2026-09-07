import { useEffect, useState } from "react";
import type { Lang } from "@/lib/lang";

type Dictionary = Record<string, string>;
const cache = new Map<Lang, Dictionary>();

/** Translates structured catalogue content before it reaches the DOM. */
export function usePhraseTranslator(lang: Lang) {
  const [dictionary, setDictionary] = useState<Dictionary | null>(() => (lang === "en" ? {} : cache.get(lang) ?? null));

  useEffect(() => {
    let active = true;
    if (lang === "en") {
      setDictionary({});
      return () => { active = false; };
    }
    const cached = cache.get(lang);
    if (cached) {
      setDictionary(cached);
      return () => { active = false; };
    }
    setDictionary(null);
    fetch(`/auto/${lang}.json`)
      .then((response) => (response.ok ? response.json() : null))
      .then((next: Dictionary | null) => {
        if (!next || !active) return;
        cache.set(lang, next);
        setDictionary(next);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [lang]);

  return (source: string | undefined | null): string => {
    if (!source) return "";
    if (lang === "en") return source;
    return dictionary?.[source.trim()] ?? source;
  };
}