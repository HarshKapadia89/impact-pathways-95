import { useEffect, useState } from "react";
import { Palette, Check, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeId = "indigo" | "emerald" | "rose" | "ocean" | "sunset";

const THEMES: { id: ThemeId; name: string; nameGu: string; swatch: string }[] = [
  { id: "indigo",  name: "Indigo & Saffron", nameGu: "ઇન્ડિગો અને કેસરી", swatch: "linear-gradient(135deg, oklch(0.32 0.11 270), oklch(0.78 0.15 60))" },
  { id: "emerald", name: "Emerald & Gold",   nameGu: "નીલમ અને સુવર્ણ",     swatch: "linear-gradient(135deg, oklch(0.42 0.13 160), oklch(0.80 0.14 85))" },
  { id: "rose",    name: "Rose & Plum",      nameGu: "ગુલાબી અને જાંબુ",    swatch: "linear-gradient(135deg, oklch(0.45 0.16 0),   oklch(0.65 0.18 340))" },
  { id: "ocean",   name: "Ocean Blue",       nameGu: "મહાસાગર નીલો",       swatch: "linear-gradient(135deg, oklch(0.40 0.14 235), oklch(0.72 0.14 200))" },
  { id: "sunset",  name: "Sunset Coral",     nameGu: "સૂર્યાસ્ત",            swatch: "linear-gradient(135deg, oklch(0.50 0.18 30),  oklch(0.78 0.16 70))" },
];

const STORAGE_THEME = "hbk-theme-v1";
const STORAGE_MODE = "hbk-mode-v1";

export function applyStoredTheme() {
  if (typeof document === "undefined") return;
  const theme = (localStorage.getItem(STORAGE_THEME) as ThemeId) || "ocean";
  const mode = localStorage.getItem(STORAGE_MODE) || "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export function ThemeSwitcher({ lang = "en" as "en" | "gu" }) {
  const [theme, setTheme] = useState<ThemeId>("ocean");
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const t = (localStorage.getItem(STORAGE_THEME) as ThemeId) || "ocean";
    const m = (localStorage.getItem(STORAGE_MODE) as "light" | "dark") || "light";
    setTheme(t);
    setMode(m);
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.classList.toggle("dark", m === "dark");
  }, []);

  const pickTheme = (id: ThemeId) => {
    setTheme(id);
    localStorage.setItem(STORAGE_THEME, id);
    document.documentElement.setAttribute("data-theme", id);
  };

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem(STORAGE_MODE, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-card hover:bg-muted transition-colors"
        aria-label={lang === "gu" ? "રંગ બદલો" : "Change colors"}
      >
        <Palette className="h-4 w-4 text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{lang === "gu" ? "રંગ થીમ" : "Color theme"}</DropdownMenuLabel>
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => pickTheme(t.id)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span
              className="h-5 w-5 rounded-full border border-border shrink-0"
              style={{ background: t.swatch }}
              aria-hidden
            />
            <span className="flex-1 text-sm">{lang === "gu" ? t.nameGu : t.name}</span>
            {theme === t.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleMode} className="flex items-center gap-2 cursor-pointer">
          {mode === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="flex-1 text-sm">
            {mode === "light"
              ? lang === "gu" ? "ડાર્ક મોડ" : "Dark mode"
              : lang === "gu" ? "લાઇટ મોડ" : "Light mode"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
