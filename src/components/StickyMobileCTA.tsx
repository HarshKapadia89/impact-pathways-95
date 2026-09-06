import { useLang, translator } from "@/lib/lang";
import { Link } from "@tanstack/react-router";
import { Brain, ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const lang = useLang();
  const t = translator(lang);
  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-20 z-30 pointer-events-none">
      <Link
        to="/test"
        className="pointer-events-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-3 text-sm font-semibold shadow-[0_8px_24px_color-mix(in_oklab,var(--primary)_40%,transparent)] active:scale-95 transition"
      >
        <Brain className="h-4 w-4" />
        {t({
          en: "Take free test → 20-page report",
          gu: "મફત ટેસ્ટ આપો → 20-પાનાનો રિપોર્ટ",
          hi: "मुफ़्त टेस्ट दें → 20-पृष्ठ रिपोर्ट",
          mr: "मोफत चाचणी द्या → 20-पानी अहवाल",
        })}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
