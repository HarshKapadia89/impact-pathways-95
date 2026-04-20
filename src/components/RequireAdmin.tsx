import type { ReactNode } from "react";

// Auth removed — admin sections are open to everyone.
export function RequireAdmin({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
