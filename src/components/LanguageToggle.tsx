import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith("en");
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => i18n.changeLanguage(isEn ? "gu" : "en")}
      className="font-medium"
    >
      {isEn ? "ગુજરાતી" : "English"}
    </Button>
  );
}
