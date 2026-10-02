// Meta Pixel (browser side). Only loads on public marketing/checkout pages.
// Never send student details, answers, scores or report content.
export const META_PIXEL_ID = "1164890204578653";
export const PRODUCT_ID = "hbk_aptitude_test";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq }
}

const ALLOWED = [
  /^\/$/, /^\/test\/?$/, /^\/test\/pay\/?$/, /^\/about\/?$/, /^\/parents\/?$/,
  /^\/schools\/?$/, /^\/for-schools\/?$/, /^\/scholarships\/?$/, /^\/exams\/?$/,
  /^\/career-library(\/.*)?$/, /^\/success-stories\/?$/, /^\/upskill\/?$/,
];

export function isTrackedPath(path: string) {
  return ALLOWED.some((r) => r.test(path));
}

let initialised = false;
function ensurePixel() {
  if (typeof window === "undefined") return false;
  if (initialised) return true;
  if (!window.fbq) {
    const n: Fbq = function (...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (n as any).callMethod ? (n as any).callMethod(...args) : n.queue!.push(args);
    } as Fbq;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    window.fbq = n; window._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  window.fbq("set", "autoConfig", false, META_PIXEL_ID);
  window.fbq("init", META_PIXEL_ID);
  initialised = true;
  return true;
}

export function newEventId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function trackStandard(name: string, params: Record<string, unknown> = {}, eventId?: string) {
  if (!ensurePixel()) return;
  window.fbq!("track", name, params, eventId ? { eventID: eventId } : undefined);
}

export function trackCustom(name: string, params: Record<string, unknown> = {}, eventId?: string) {
  if (!ensurePixel()) return;
  window.fbq!("trackCustom", name, params, eventId ? { eventID: eventId } : undefined);
}

export function trackPageView(path: string) {
  if (!isTrackedPath(path)) return;
  trackStandard("PageView", {}, newEventId("pv"));
}

/** Meta browser cookies, used to match the server Purchase. */
export function metaCookies() {
  if (typeof document === "undefined") return { fbp: null, fbc: null };
  const get = (k: string) => document.cookie.split("; ").find((c) => c.startsWith(`${k}=`))?.split("=")[1] ?? null;
  return { fbp: get("_fbp"), fbc: get("_fbc") };
}
