/* HBK Careers — offline-first service worker
 * Strategy:
 *   - Precache app shell and key static assets at install time.
 *   - HTML navigations: NetworkFirst (so new deploys win), fall back to cached shell when offline.
 *   - Same-origin static assets (JS/CSS/fonts/images): StaleWhileRevalidate.
 *   - Never touch /api/, supabase, or AI gateway requests — let the network handle them.
 *   - Bump CACHE_VERSION on each meaningful change to invalidate old caches.
 */
const CACHE_VERSION = "hbk-v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const APP_SHELL = [
  "/",
  "/test",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      // Best-effort precache; ignore individual failures (e.g. 404 in dev).
      await Promise.all(
        APP_SHELL.map((url) =>
          cache.add(new Request(url, { cache: "reload" })).catch(() => null),
        ),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

// Allow the page to trigger an immediate update.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function shouldBypass(url) {
  if (url.origin !== self.location.origin) return true; // Supabase, AI gateway, fonts CDN, etc.
  if (url.pathname.startsWith("/api/")) return true;
  if (url.pathname.startsWith("/_build/")) return false;
  return false;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (shouldBypass(url)) return;

  // HTML navigations -> NetworkFirst with cached shell fallback.
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(req);
          if (cached) return cached;
          // Fall back to the test page shell — it's the offline workhorse.
          const shell = await caches.match("/test");
          if (shell) return shell;
          return new Response("Offline", { status: 503, statusText: "Offline" });
        }
      })(),
    );
    return;
  }

  // Static assets -> StaleWhileRevalidate.
  event.respondWith(
    (async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            cache.put(req, res.clone());
          }
          return res;
        })
        .catch(() => null);
      return cached || (await network) || new Response("", { status: 504 });
    })(),
  );
});
