import { useLang } from "@/lib/lang";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  Trash2,
  Brain,
} from "lucide-react";
import {
  loadReport,
  buildReportContext,
  type SavedReport,
} from "@/lib/chatbotContext";
import { cb, CHAT_SUGGESTIONS_PRE, CHAT_SUGGESTIONS_POST } from "@/lib/chatbotStrings";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "hbk-chatbot-history";
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-career`;


export function CareerChatbot() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SavedReport | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history + report
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch { /* ignore */ }
    setReport(loadReport());
  }, []);

  // Refresh report whenever opened (in case user just finished test)
  useEffect(() => {
    if (open) setReport(loadReport());
  }, [open]);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch { /* ignore */ }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next,
          lang,
          reportContext: report ? buildReportContext(report) : null,
        }),
      });

      if (!resp.ok || !resp.body) {
        let msg = cb("errGeneric", lang);
        if (resp.status === 429) msg = cb("errRate", lang);
        if (resp.status === 402) msg = cb("errCredits", lang);
        try {
          const j = await resp.json();
          if (j?.error) msg = j.error;
        } catch { /* ignore */ }
        upsert(msg);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      upsert(cb("errNetwork", lang));
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const suggestions = report ? CHAT_SUGGESTIONS_POST[lang] : CHAT_SUGGESTIONS_PRE[lang];

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center group"
          aria-label="Open HBK Career Counsellor"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground text-background text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {cb("fabTip", lang)}
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[420px] sm:h-[640px] sm:max-h-[85vh] flex flex-col bg-card border border-border sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/15 to-accent/15">
            <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-sm leading-tight">
                {cb("title", lang)}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                {report ? `${cb("subReport", lang)} ${report.name}` : cb("subAsk", lang)}
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clear}
                className="p-2 rounded-md hover:bg-muted text-muted-foreground"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Report banner */}
          {report ? (
            <div className="px-4 py-2 border-b border-border bg-primary/5 text-[11px] text-foreground/80 flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">
                RIASEC <b>{report.riasecTop.join("-")}</b> · {report.miTop[0]} · {report.aptitudeTop[0]}
              </span>
            </div>
          ) : (
            <div className="px-4 py-2 border-b border-border bg-accent/10 text-[11px] flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 text-accent" />
              <Link to="/test" onClick={() => setOpen(false)} className="underline hover:text-foreground">
                {cb("takeTest", lang)}
              </Link>
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="rounded-2xl bg-muted px-3 py-2.5 text-sm">
                  {cb("greeting", lang)}
                </div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wide">
                  {cb("tryAsking", lang)}
                </div>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs rounded-lg border border-border bg-background hover:bg-muted px-3 py-2 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.content || (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" /> {cb("thinking", lang)}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 text-sm inline-flex items-center gap-1 text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" /> {cb("thinking", lang)}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-border p-3 flex items-end gap-2 bg-card"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder={
                cb("placeholder", lang)
              }
              rows={1}
              className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="h-9 w-9 shrink-0 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:opacity-90"
              aria-label="Send"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          <div className="px-3 pb-2 text-[10px] text-muted-foreground text-center">
            {cb("disclaimer", lang)}
          </div>
        </div>
      )}
    </>
  );
}
