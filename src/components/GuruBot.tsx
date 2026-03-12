import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X, Minus, Send, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

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

export function GuruBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Drag state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (open && !initialized.current) {
      // Position bottom-right
      setPos({
        x: window.innerWidth - 400 - 24,
        y: window.innerHeight - 520 - 24,
      });
      initialized.current = true;
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open, minimized]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  }, [pos]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging]);

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

  // FAB button
  const fab = (
    <button
      onClick={() => { setOpen(true); setMinimized(false); }}
      className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 z-50"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.8))",
        color: "hsl(var(--primary-foreground))",
        boxShadow: "0 8px 32px hsl(var(--primary)/0.4)",
      }}
    >
      <Sparkles size={20} />
      <span className="font-bold text-sm">Guru</span>
    </button>
  );

  if (!open) return fab;

  // Minimized pill
  if (minimized) {
    return (
      <>
        {createPortal(
          <button
            onClick={() => setMinimized(false)}
            className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl z-50 transition-all hover:scale-105"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <Sparkles size={16} style={{ color: "hsl(var(--primary))" }} />
            <span className="text-sm font-semibold">Guru</span>
            {messages.length > 0 && (
              <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--primary))" }} />
            )}
          </button>,
          document.body
        )}
      </>
    );
  }

  // Full chat panel
  return createPortal(
    <div
      ref={panelRef}
      className="fixed flex flex-col rounded-2xl overflow-hidden shadow-2xl"
      style={{
        left: pos.x,
        top: pos.y,
        width: 380,
        height: 500,
        zIndex: 9998,
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 20px 60px hsl(var(--foreground)/0.15)",
        userSelect: dragging ? "none" : "auto",
      }}
    >
      {/* Header - draggable */}
      <div
        onMouseDown={onMouseDown}
        className="flex items-center gap-2.5 px-4 py-3 border-b cursor-move flex-shrink-0"
        style={{
          borderColor: "hsl(var(--border))",
          background: "linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(var(--primary)/0.03))",
        }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary)/0.15)" }}>
          <Sparkles size={16} style={{ color: "hsl(var(--primary))" }} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>Guru</div>
          <div className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>DSA & CP Assistant</div>
        </div>
        <button onClick={clearChat} className="p-1.5 rounded-lg transition-colors hover:bg-muted" title="Clear chat" style={{ color: "hsl(var(--muted-foreground))" }}>
          <Trash2 size={14} />
        </button>
        <button onClick={() => setMinimized(true)} className="p-1.5 rounded-lg transition-colors hover:bg-muted" title="Minimize" style={{ color: "hsl(var(--muted-foreground))" }}>
          <Minus size={14} />
        </button>
        <button onClick={() => { setOpen(false); if (abortRef.current) abortRef.current.abort(); }} className="p-1.5 rounded-lg transition-colors hover:bg-muted" title="Close" style={{ color: "hsl(var(--muted-foreground))" }}>
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollBehavior: "smooth" }}>
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
              className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed"
              style={
                m.role === "user"
                  ? {
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      borderBottomRightRadius: 6,
                    }
                  : {
                      background: "hsl(var(--muted))",
                      color: "hsl(var(--foreground))",
                      borderBottomLeftRadius: 6,
                    }
              }
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none [&_pre]:bg-background [&_pre]:p-2 [&_pre]:rounded-lg [&_pre]:text-xs [&_code]:text-xs [&_p]:m-0 [&_p]:mb-1.5 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
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
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>,
    document.body
  );
}
