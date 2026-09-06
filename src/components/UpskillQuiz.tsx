import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RefreshCcw, Trophy } from "lucide-react";
import type { Topic } from "@/lib/upskilling";
import { UPSKILL_TOPICS } from "@/lib/upskilling";
import { useLang } from "@/lib/lang";
import { us } from "@/lib/upskillStrings";

interface PoolItem {
  q: string;
  a: string;
  topic: string;
  lesson: string;
}

function buildPool(topics: Topic[]): PoolItem[] {
  const out: PoolItem[] = [];
  for (const t of topics) {
    for (const l of t.lessons) {
      for (const item of l.quiz) {
        out.push({ q: item.q, a: item.a, topic: t.title, lesson: l.title });
      }
    }
  }
  return out;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Question {
  q: string;
  options: string[];
  correct: number;
  source: string;
}

function buildQuestions(pool: PoolItem[], count: number, seed: number): Question[] {
  const picked = shuffle(pool, seed).slice(0, count);
  return picked.map((item, i) => {
    const distractors = shuffle(
      pool.filter((p) => p.a !== item.a),
      seed + i * 7 + 3,
    )
      .slice(0, 3)
      .map((p) => p.a);
    const options = shuffle([item.a, ...distractors], seed + i * 13 + 5);
    return {
      q: item.q,
      options,
      correct: options.indexOf(item.a),
      source: `${item.topic} · ${item.lesson}`,
    };
  });
}

export function UpskillQuiz({ topic }: { topic?: Topic }) {
  const lang = useLang();
  const t = (k: string) => us(k, lang);
  const pool = useMemo(() => buildPool(topic ? [topic] : UPSKILL_TOPICS), [topic]);
  const maxQ = Math.min(50, pool.length);

  const [count, setCount] = useState(Math.min(10, maxQ));
  const [marks, setMarks] = useState(1);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = useMemo(() => buildQuestions(pool, count, seed), [pool, count, seed]);
  const correctCount = questions.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0);

  const restart = () => {
    setSeed(Math.floor(Math.random() * 100000));
    setAnswers({});
    setSubmitted(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl">{t("quizTitle")}</h2>
        <p className="text-sm text-muted-foreground mt-2">{t("quizSub")}</p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">{t("quizLength")}</span>
          <span className="text-sm font-medium">
            {count} {t("quizQuestions")}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={maxQ}
          step={5}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--primary)]"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>10</span>
          <span>{maxQ}</span>
        </div>

        <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-accent">{t("quizMarks")}</div>
        <div className="mt-2 flex gap-2">
          {[1, 2, 5].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMarks(m)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                marks === m ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {t("quizTotal")}: {count * marks}
        </p>

        <button
          onClick={() => setStarted(true)}
          className="mt-6 w-full rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90"
        >
          {t("quizStart")}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {submitted && (
        <div className="mb-6 rounded-xl border border-accent/40 bg-accent/10 p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Trophy className="h-4 w-4 text-accent" />
            {t("quizScore")}
          </div>
          <div className="font-serif text-3xl mt-2">
            {correctCount * marks} / {questions.length * marks}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {correctCount}/{questions.length} {t("quizCorrect")} · {Math.round((correctCount / questions.length) * 100)}%
          </div>
          <button onClick={restart} className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
            <RefreshCcw className="h-4 w-4" />
            {t("quizRetry")}
          </button>
        </div>
      )}

      <ol className="space-y-5">
        {questions.map((q, i) => (
          <li key={i} className="rounded-xl border border-border p-4">
            <div className="text-[11px] text-muted-foreground">
              {i + 1}. {q.source} · {marks} {t("quizMarksShort")}
            </div>
            <div className="text-sm font-medium mt-1.5">{q.q}</div>
            <div className="mt-3 space-y-2">
              {q.options.map((o, oi) => {
                const chosen = answers[i] === oi;
                const isCorrect = oi === q.correct;
                let cls = "border-border hover:bg-muted";
                if (submitted && isCorrect) cls = "border-primary/60 bg-primary/10";
                else if (submitted && chosen) cls = "border-destructive/60 bg-destructive/10";
                else if (chosen) cls = "border-primary bg-primary/5";
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={`w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors flex gap-2 items-start ${cls}`}
                  >
                    {submitted && isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    ) : submitted && chosen ? (
                      <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    ) : null}
                    <span>{o}</span>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="mt-6 w-full rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-40"
        >
          {t("quizSubmit")}
        </button>
      )}
    </div>
  );
}
