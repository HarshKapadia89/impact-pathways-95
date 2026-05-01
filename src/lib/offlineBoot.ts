/**
 * Registers the service worker and starts the offline sync engine.
 * Skips registration inside Lovable preview iframes to avoid stale-cache pain in the editor.
 */
import { installSyncListeners } from "./offlineSync";

function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function isLovablePreviewHost(): boolean {
  const host = window.location.hostname;
  return (
    host.includes("id-preview--") ||
    host.includes("lovableproject.com") ||
    host.includes("lovable.app") === false && host.endsWith(".lovable.dev")
  );
}

export function bootstrapOffline() {
  if (typeof window === "undefined") return;

  // Always start the sync engine so any queued items get pushed when online.
  installSyncListeners();

  if (!("serviceWorker" in navigator)) return;

  // In the Lovable editor preview iframe, skip SW entirely and clean up any stale registrations.
  if (isInIframe() && isLovablePreviewHost()) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister().catch(() => null));
    });
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {
        // Silent — offline is a progressive enhancement.
      });
  });
}
