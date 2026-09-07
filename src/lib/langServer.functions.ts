import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import i18n from "@/lib/i18n";
import { toLang, type Lang } from "@/lib/lang";

/**
 * Runs during SSR for every request: switches the server-side i18next instance
 * to the visitor's saved language (hbk_lang cookie) so the server renders pages
 * in the same language the client will use — no English flash, no hydration
 * mismatch for returning visitors.
 */
export const applyRequestLang = createServerFn({ method: "GET" }).handler(async (): Promise<Lang> => {
  const cookie = getRequestHeader("cookie") ?? "";
  const m = cookie.match(/(?:^|;\s*)hbk_lang=(en|gu|hi|mr)/);
  const lang = toLang(m?.[1]);
  if (i18n.language !== lang) await i18n.changeLanguage(lang);
  return lang;
});
