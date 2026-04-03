import { useState, useRef, useEffect } from "react";
import { Send, Trash2, Copy, Check, PanelRightClose, Sparkles } from "lucide-react";
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

function GuruCodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") || "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-2.5 rounded-xl overflow-hidden border" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
      <div className="flex items-center justify-between px-3 py-1.5 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.4)" }}>
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>{lang || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all hover:bg-background/80"
          style={{ color: copied ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3.5 text-xs leading-relaxed" style={{ color: "hsl(var(--foreground))" }}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

interface GuroBotProps {
  open: boolean;
  onClose: () => void;
}

export function GuruBot({ open, onClose }: GuroBotProps) {
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

  const handleClose = () => {
    if (abortRef.current) abortRef.current.abort();
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="flex flex-col border-l flex-shrink-0 h-screen sticky top-0"
      style={{
        width: 360,
        minWidth: 360,
        background: "hsl(var(--background))",
        borderColor: "hsl(var(--border))",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 border-b flex-shrink-0"
        style={{
          borderColor: "hsl(var(--border))",
          background: "linear-gradient(135deg, hsl(var(--primary)/0.06), hsl(var(--primary)/0.02))",
        }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary)/0.12)" }}>
          <Sparkles size={15} style={{ color: "hsl(var(--primary))" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>Guru</div>
          <div className="text-[10px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>DSA & CP Assistant</div>
        </div>
        <button onClick={clearChat} className="p-1.5 rounded-lg transition-colors hover:bg-muted" title="Clear chat" style={{ color: "hsl(var(--muted-foreground))" }}>
          <Trash2 size={14} />
        </button>
        <button onClick={handleClose} className="p-1.5 rounded-lg transition-colors hover:bg-muted" title="Close Guru" style={{ color: "hsl(var(--muted-foreground))" }}>
          <PanelRightClose size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "hsl(var(--primary)/0.08)" }}>
              <Sparkles size={30} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <div className="text-base font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>Hey! I'm Guru 👋</div>
              <div className="text-xs leading-relaxed max-w-[240px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                Ask me anything about DSA, competitive programming, or algorithms. I'm here to help!
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {["Explain BFS vs DFS", "Time complexity of merge sort", "DP approach for knapsack"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all hover:scale-[1.02]"
                  style={{
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--primary))",
                    background: "hsl(var(--primary)/0.04)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.7]`}
              style={
                m.role === "user"
                  ? {
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      borderBottomRightRadius: 6,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }
                  : {
                      background: "hsl(var(--muted)/0.5)",
                      color: "hsl(var(--foreground))",
                      borderBottomLeftRadius: 6,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      border: "1px solid hsl(var(--border)/0.5)",
                    }
              }
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none [&_pre]:p-0 [&_pre]:bg-transparent [&_pre]:m-0 [&_code]:text-xs [&_p]:m-0 [&_p]:mb-2 [&_ul]:m-0 [&_ul]:mb-2 [&_ol]:m-0 [&_ol]:mb-2 [&_li]:m-0 [&_li]:mb-0.5 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-xs [&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-1.5 [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2 overflow-hidden">
                  <ReactMarkdown
                    components={{
                      code({ className, children, ...props }) {
                        const isBlock = className?.startsWith("language-") || String(children).includes("\n");
                        if (isBlock) {
                          return <GuruCodeBlock className={className}>{String(children).replace(/\n$/, "")}</GuruCodeBlock>;
                        }
                        return (
                          <code
                            className="px-1.5 py-0.5 rounded-md text-xs font-mono"
                            style={{ background: "hsl(var(--muted))", color: "hsl(var(--primary))" }}
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
            <div className="rounded-2xl px-4 py-3" style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.5)" }}>
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "hsl(var(--primary))", animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "hsl(var(--primary))", animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "hsl(var(--primary))", animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t flex-shrink-0" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.15)" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask Guru anything..."
          disabled={loading}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 px-2"
          style={{ color: "hsl(var(--foreground))" }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
