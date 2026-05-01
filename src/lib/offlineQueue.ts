/**
 * Tiny IndexedDB queue for offline psychometric submissions.
 * Each record carries a stable client-generated UUID so re-syncing is idempotent.
 */
const DB_NAME = "hbk-offline";
const DB_VERSION = 1;
const STORE = "submissions";

export interface QueuedSubmission {
  id: string; // client-generated uuid (also the row PK in Supabase)
  payload: Record<string, unknown>;
  createdAt: number;
  attempts: number;
  lastError?: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T> | Promise<T>) {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const db = await openDB();
      const t = db.transaction(STORE, mode);
      const store = t.objectStore(STORE);
      const result = fn(store);
      if (result instanceof Promise) {
        result.then(resolve, reject);
      } else {
        result.onsuccess = () => resolve(result.result);
        result.onerror = () => reject(result.error);
      }
    } catch (e) {
      reject(e);
    }
  });
}

export async function enqueueSubmission(item: QueuedSubmission): Promise<void> {
  await tx("readwrite", (store) => store.put(item));
}

export async function listPending(): Promise<QueuedSubmission[]> {
  return tx<QueuedSubmission[]>("readonly", (store) => store.getAll() as IDBRequest<QueuedSubmission[]>);
}

export async function removeSubmission(id: string): Promise<void> {
  await tx("readwrite", (store) => store.delete(id));
}

export async function updateSubmission(item: QueuedSubmission): Promise<void> {
  await tx("readwrite", (store) => store.put(item));
}

export async function pendingCount(): Promise<number> {
  return tx<number>("readonly", (store) => store.count() as IDBRequest<number>);
}
