import type { ReactNode } from "react";

type Role = "admin" | "manager" | "teacher" | "school";

interface AuthCtx {
  user: null;
  session: null;
  roles: Role[];
  loading: false;
  isAdmin: boolean;
  signIn: () => Promise<{ error: null }>;
  signUp: () => Promise<{ error: null }>;
  signOut: () => Promise<void>;
}

const STUB: AuthCtx = {
  user: null,
  session: null,
  roles: [],
  loading: false,
  isAdmin: true, // treat everyone as admin so any admin-only UI keeps showing
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
};

export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useAuth(): AuthCtx {
  return STUB;
}
