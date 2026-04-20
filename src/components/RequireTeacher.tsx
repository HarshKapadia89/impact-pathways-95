import type { ReactNode } from "react";

// Auth removed — teacher app is open to everyone.
export function RequireTeacher({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
