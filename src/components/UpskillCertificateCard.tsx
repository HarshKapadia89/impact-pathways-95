import { useEffect, useState } from "react";
import { Award, Lock, Download } from "lucide-react";
import { useLang } from "@/lib/lang";
import { us } from "@/lib/upskillStrings";
import { getLearnerName, setLearnerName } from "@/lib/upskillProgress";
import { downloadUpskillCertificate } from "@/lib/upskillCertificate";

interface Props {
  unlocked: boolean;
  title: string;
  lessons: number;
  hours: number;
  scoreText?: string;
  master?: boolean;
}

export function UpskillCertificateCard({ unlocked, title, lessons, hours, scoreText, master }: Props) {
  const lang = useLang();
  const t = (k: string) => us(k, lang);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(getLearnerName());
  }, []);

  return (
    <div className="mt-8 rounded-2xl border border-accent/40 bg-accent/5 p-5">
      <h2 className="font-serif text-lg flex items-center gap-2">
        <Award className="h-5 w-5 text-accent" />
        {t("certificate")}
      </h2>

      {!unlocked ? (
        <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
          <Lock className="h-4 w-4 shrink-0 mt-0.5" />
          {t(master ? "certMasterLocked" : "certLocked")}
        </p>
      ) : (
        <>
          <label className="mt-4 block text-xs font-medium text-muted-foreground">{t("yourName")}</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setLearnerName(e.target.value);
            }}
            className="mt-1.5 w-full max-w-sm rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="—"
          />
          <button
            type="button"
            disabled={!name.trim()}
            onClick={() =>
              downloadUpskillCertificate({ name: name.trim(), lang, title, lessons, hours, scoreText, master })
            }
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-40"
          >
            <Download className="h-4 w-4" />
            {t(master ? "certMaster" : "certTopic")}
          </button>
        </>
      )}
    </div>
  );
}
