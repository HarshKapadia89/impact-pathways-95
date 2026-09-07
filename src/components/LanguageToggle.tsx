import { LANGS, LANG_LABEL, toLang, persistLang } from "@/lib/lang";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const now = toLang(i18n.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="font-medium gap-1.5" suppressHydrationWarning>
          <Globe className="h-4 w-4" />
          <span suppressHydrationWarning>{mounted ? LANG_LABEL[now] : ""}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => {
              persistLang(l);
              i18n.changeLanguage(l);
              document.documentElement.lang = l;
            }}
            className="flex items-center justify-between gap-3"
          >
            <span>{LANG_LABEL[l]}</span>
            {mounted && l === now ? <Check className="h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
