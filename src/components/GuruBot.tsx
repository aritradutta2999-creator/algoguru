import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, X, Send, Trash2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/guru-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  signal,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  signal?: AbortSignal;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!resp.ok || !resp.body) {
    const err = await resp.text();
    throw new Error(err || "Stream failed");
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

/* ── Code block with copy button ── */
function GuruCodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") || "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-2 rounded-lg overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
      <div className="flex items-center justify-between px-3 py-1.5 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.6)" }}>
        <span className="text-[10px] font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
          {lang || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded transition-colors hover:bg-background/50"
          style={{ color: copied ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed" style={{ color: "hsl(var(--foreground))" }}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── Draggable FAB ── */
function DraggableFab({ onClick }: { onClick: () => void }) {
  const [pos, setPos] = useState({ x: -1, y: -1 });
  const dragging = useRef(false);
  const hasMoved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize position to bottom-right
    setPos({ x: window.innerWidth - 130, y: window.innerHeight - 70 });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    hasMoved.current = false;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    hasMoved.current = true;
    setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    if (!hasMoved.current) onClick();
  }, [onClick]);

  if (pos.x < 0) return null;

  return (
    <button
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="fixed flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl transition-shadow hover:shadow-[0_8px_40px_hsl(var(--primary)/0.5)] active:scale-95 z-50 touch-none select-none"
      style={{
        left: pos.x,
        top: pos.y,
        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.8))",
        color: "hsl(var(--primary-foreground))",
        boxShadow: "0 8px 32px hsl(var(--primary)/0.4)",
        cursor: dragging.current ? "grabbing" : "grab",
      }}
    >
      <Sparkles size={20} />
      <span className="font-bold text-sm">Guru</span>
    </button>
  );
}

/* ── Main GuruBot component ── */
export function GuruBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((p) => [...p, userMsg]);
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setLoading(false),
        signal: controller.signal,
      });
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setMessages((p) => [...p, { role: "assistant", content: "⚠️ Error connecting to Guru. Please try again." }]);
      }
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (abortRef.current) abortRef.current.abort();
    setMessages([]);
    setLoading(false);
  };

  return (
    <>
      {!open && <DraggableFab onClick={() => setOpen(true)} />}

      <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v && abortRef.current) abortRef.current.abort(); }}>
        <SheetContent
          side="right"
          className="p-0 flex flex-col w-[380px] sm:max-w-[420px] border-l gap-0"
          style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b flex-shrink-0"
            style={{
              borderColor: "hsl(var(--border))",
              background: "linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(var(--primary)/0.03))",
            }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary)/0.15)" }}>
              <Sparkles size={16} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-sm font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>Guru</SheetTitle>
              <div className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>DSA & CP Assistant</div>
            </div>
            <button onClick={clearChat} className="p-1.5 rounded-lg transition-colors hover:bg-muted" title="Clear chat" style={{ color: "hsl(var(--muted-foreground))" }}>
              <Trash2 size={14} />
            </button>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg transition-colors hover:bg-muted" title="Close" style={{ color: "hsl(var(--muted-foreground))" }}>
              <X size={14} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "hsl(var(--primary)/0.1)" }}>
                  <Sparkles size={28} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>Hey! I'm Guru 👋</div>
                <div className="text-xs leading-relaxed max-w-[260px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Ask me anything about DSA, competitive programming, or algorithms. I'm here to help!
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed overflow-hidden"
                  style={
                    m.role === "user"
                      ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", borderBottomRightRadius: 6, wordBreak: "break-word", overflowWrap: "anywhere" }
                      : { background: "hsl(var(--muted))", color: "hsl(var(--foreground))", borderBottomLeftRadius: 6, wordBreak: "break-word", overflowWrap: "anywhere" }
                  }
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none [&_pre]:p-0 [&_pre]:bg-transparent [&_pre]:m-0 [&_code]:text-xs [&_p]:m-0 [&_p]:mb-1.5 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0 overflow-hidden">
                      <ReactMarkdown
                        components={{
                          code({ className, children, ...props }) {
                            const isBlock = className?.startsWith("language-") || String(children).includes("\n");
                            if (isBlock) {
                              return <GuruCodeBlock className={className}>{String(children).replace(/\n$/, "")}</GuruCodeBlock>;
                            }
                            return (
                              <code
                                className="px-1 py-0.5 rounded text-xs"
                                style={{ background: "hsl(var(--background))", color: "hsl(var(--primary))" }}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                          pre({ children }) {
                            return <>{children}</>;
                          },
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3" style={{ background: "hsl(var(--muted))" }}>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "hsl(var(--primary))", animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "hsl(var(--primary))", animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "hsl(var(--primary))", animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-t flex-shrink-0" style={{ borderColor: "hsl(var(--border))" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask Guru anything..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
              style={{ color: "hsl(var(--foreground))" }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              <Send size={14} />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
