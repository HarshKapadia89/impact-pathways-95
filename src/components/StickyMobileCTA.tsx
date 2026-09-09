import { useLang, translator } from "@/lib/lang";
import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { ArrowIcon } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export function StickyMobileCTA() {
  const lang = useLang();
  const t = translator(lang);
  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-20 z-30 pointer-events-none">
      <Link
        to="/test"
        className="brand-link pointer-events-auto flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-caption font-semibold text-primary-foreground shadow-lift"
      >
        <Brain className="h-4 w-4" />
        {t({
          en: "Take free test → 20-page report",
          gu: "મફત ટેસ્ટ આપો → 20-પાનાનો રિપોર્ટ",
          hi: "मुफ़्त टेस्ट दें → 20-पृष्ठ रिपोर्ट",
          mr: "मोफत चाचणी द्या → 20-पानी अहवाल",
        })}
        <ArrowIcon size={16} />
      </Link>
    </div>
  );
}
