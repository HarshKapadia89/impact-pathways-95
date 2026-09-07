import { t4 } from "@/lib/t4";
import type { Lang } from "@/lib/lang";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_MODE = "hbk-mode-v1";

/** Applies the stored light/dark mode. Colour comes from the HBK brand theme. */
export function applyStoredTheme() {
  if (typeof document === "undefined") return;
  const mode = localStorage.getItem(STORAGE_MODE) || "light";
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export function ThemeSwitcher({ lang = "en" as Lang }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const m = (localStorage.getItem(STORAGE_MODE) as "light" | "dark") || "light";
    setMode(m);
    document.documentElement.classList.toggle("dark", m === "dark");
  }, []);

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem(STORAGE_MODE, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="hbk-focus inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-muted"
      aria-label={
        mode === "light"
          ? t4(lang, "Dark mode", "ડાર્ક મોડ")
          : t4(lang, "Light mode", "લાઇટ મોડ")
      }
    >
      {mode === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
