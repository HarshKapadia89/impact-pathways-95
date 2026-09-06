import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Rocket, ArrowRight } from "lucide-react";
import { TOTAL_LESSONS, getLesson } from "@/lib/upskilling";
import { getProgress, lastLesson } from "@/lib/upskillProgress";

export function UpskillProgressCard() {
  const [done, setDone] = useState(0);
  const [resume, setResume] = useState<{ topic: string; lesson: string } | null>(null);

  useEffect(() => {
    const sync = () => {
      setDone(Object.keys(getProgress()).length);
      const l = lastLesson();
      setResume(l ? { topic: l.topic, lesson: l.lesson } : null);
    };
    sync();
    window.addEventListener("hbk-upskill-change", sync);
    return () => window.removeEventListener("hbk-upskill-change", sync);
  }, []);

  const meta = resume ? getLesson(resume.topic, resume.lesson) : undefined;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Rocket className="h-4 w-4 text-accent" />
        Upskilling
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {done > 0
          ? `${done} of ${TOTAL_LESSONS} lessons completed.`
          : "150 free lessons on time management, communication, money skills, AI and more."}
      </p>
      <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${(done / TOTAL_LESSONS) * 100}%` }} />
      </div>
      {meta ? (
        <Link
          to="/upskill/$topic/$lesson"
          params={{ topic: meta.topic.slug, lesson: meta.lesson.slug }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          Continue: {meta.lesson.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <Link to="/upskill" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
          Explore skills <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
