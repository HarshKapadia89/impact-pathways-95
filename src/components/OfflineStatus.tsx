/**
 * Small badge that shows offline state and number of pending submissions
 * waiting to be synced to the server. Renders nothing when online with no queue.
 */
import { useEffect, useState } from "react";
import { Wifi, WifiOff, RefreshCcw, CloudUpload } from "lucide-react";
import { onPendingChange, flushQueue } from "@/lib/offlineSync";

export function OfflineStatus({ lang = "en" }: { lang?: "en" | "gu" }) {
  const [online, setOnline] = useState(true);
  const [pending, setPending] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOnline(navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    const off = onPendingChange(setPending);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
      off();
    };
  }, []);

  if (!mounted || (online && pending === 0)) {
    return (
      <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Wifi className="h-3 w-3" />
        {lang === "gu" ? "ઑનલાઇન" : "Online"}
      </div>
    );
  }

  const handleSync = async () => {
    setSyncing(true);
    try {
      await flushQueue();
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-2 text-xs">
      {!online ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
          <WifiOff className="h-3 w-3" />
          {lang === "gu" ? "ઑફલાઇન મોડ" : "Offline mode"}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200">
          <Wifi className="h-3 w-3" />
          {lang === "gu" ? "ઑનલાઇન" : "Online"}
        </span>
      )}
      {pending > 0 && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
          <CloudUpload className="h-3 w-3" />
          {pending}{" "}
          {lang === "gu" ? "સિંક બાકી" : pending === 1 ? "to sync" : "to sync"}
          {online && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="ml-1 inline-flex items-center gap-0.5 underline-offset-2 hover:underline disabled:opacity-50"
            >
              <RefreshCcw className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} />
              {lang === "gu" ? "હવે સિંક કરો" : "Sync now"}
            </button>
          )}
        </span>
      )}
    </div>
  );
}
