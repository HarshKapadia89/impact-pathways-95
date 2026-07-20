/**
 * Sync engine for offline psychometric submissions.
 * - Auto-flushes when the browser regains connectivity.
 * - Idempotent: payload.id is the row PK, so re-sending the same item is safe (upsert).
 * - Lazy-imports the supabase client to keep the SW-controlled bundle smaller.
 */
import {
  listPending,
  removeSubmission,
  updateSubmission,
  pendingCount,
  type QueuedSubmission,
} from "./offlineQueue";

let syncing = false;
const listeners = new Set<(count: number) => void>();

export function onPendingChange(cb: (count: number) => void): () => void {
  listeners.add(cb);
  pendingCount().then(cb).catch(() => cb(0));
  return () => listeners.delete(cb);
}

async function notify() {
  try {
    const c = await pendingCount();
    listeners.forEach((l) => l(c));
  } catch {
    /* ignore */
  }
}

export async function flushQueue(): Promise<{ ok: number; failed: number }> {
  if (syncing) return { ok: 0, failed: 0 };
  if (typeof navigator !== "undefined" && !navigator.onLine) return { ok: 0, failed: 0 };
  syncing = true;
  let ok = 0;
  let failed = 0;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const items = await listPending();
    for (const item of items) {
      try {
        const { error } = await supabase
          .from("psychometric_submissions")
          .upsert(item.payload as never, { onConflict: "id" });
        if (error) throw error;
        // Mirror to Google Sheet (best effort — failures don't block sync).
        try {
          const { appendSubmissionToSheet } = await import(
            "@/lib/sheetsSync.functions"
          );
          await appendSubmissionToSheet({ data: item.payload as never });
        } catch (sheetErr) {
          console.warn("Sheet append failed (non-fatal):", sheetErr);
        }
        // Also write to the legacy table for backward compatibility (best effort).
        await supabase
          .from("psychometric_results")
          .insert([{
            student_name: (item.payload as { student_name?: string }).student_name ?? null,
            grade: (item.payload as { grade?: string }).grade ?? null,
            age: (item.payload as { age?: number }).age ?? null,
            language: (item.payload as { language?: string }).language ?? "en",
            school_name: (item.payload as { school_name?: string }).school_name ?? null,
            mobile: (item.payload as { mobile?: string }).mobile ?? null,
            email: (item.payload as { email?: string }).email ?? null,
            parent_email: (item.payload as { parent_email?: string }).parent_email ?? null,
            report_token: (item.payload as { report_token?: string }).report_token ?? null,
            riasec: (item.payload as { riasec?: unknown }).riasec ?? {},
            multiple_intelligences:
              (item.payload as { multiple_intelligences?: unknown }).multiple_intelligences ?? {},
            aptitude: (item.payload as { aptitude?: unknown }).aptitude ?? {},
            recommended_streams:
              (item.payload as { recommended_streams?: string[] }).recommended_streams ?? [],
            recommended_careers:
              (item.payload as { recommended_careers?: string[] }).recommended_careers ?? [],
          }])
          .then(() => null, () => null);
        await removeSubmission(item.id);
        ok++;
      } catch (e) {
        failed++;
        const updated: QueuedSubmission = {
          ...item,
          attempts: item.attempts + 1,
          lastError: e instanceof Error ? e.message : String(e),
        };
        await updateSubmission(updated).catch(() => null);
      }
    }
  } finally {
    syncing = false;
    notify();
  }
  return { ok, failed };
}

let installed = false;
export function installSyncListeners() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  window.addEventListener("online", () => {
    flushQueue().catch(() => null);
  });
  // Periodic retry for flaky networks.
  setInterval(() => {
    if (navigator.onLine) flushQueue().catch(() => null);
  }, 60_000);
  // Initial flush on load.
  if (navigator.onLine) flushQueue().catch(() => null);
}
