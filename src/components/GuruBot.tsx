import { useState, useRef, useEffect, forwardRef } from "react";
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
    <div className="relative my-3 rounded-xl overflow-hidden border" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
      <div className="flex items-center justify-between px-3.5 py-2 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--destructive, 0 84% 60%)/0.6)" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--warning)/0.6)" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--success)/0.6)" }} />
          </div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider ml-1.5" style={{ color: "hsl(var(--muted-foreground)/0.7)" }}>{lang || "code"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all hover:bg-background/80"
          style={{
            color: copied ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            background: copied ? "hsl(var(--primary)/0.1)" : "transparent",
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-[1.8] font-mono" style={{ color: "hsl(var(--foreground))" }}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

interface GuruBotProps {
  open: boolean;
  onClose: () => void;
}

export const GuruBot = forwardRef<HTMLDivElement, GuruBotProps>(function GuruBot({ open, onClose }, ref) {
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
      ref={ref}
      className="flex h-full flex-col overflow-hidden"
      style={{
        background: "hsl(var(--background))",
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
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 min-h-0" style={{ overscrollBehavior: "contain" }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "hsl(var(--primary)/0.08)" }}>
              <Sparkles size={30} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <div className="text-base font-bold mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Hey! I'm Guru 👋</div>
              <div className="text-[13px] leading-relaxed max-w-[260px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                Ask me anything about DSA, competitive programming, or algorithms.
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["Explain BFS vs DFS", "Merge sort complexity", "DP knapsack approach"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                  className="text-[11px] font-medium px-3.5 py-2 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-sm"
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
            {m.role === "assistant" && (
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 mr-2" style={{ background: "hsl(var(--primary)/0.1)" }}>
                <Sparkles size={12} style={{ color: "hsl(var(--primary))" }} />
              </div>
            )}
            <div
              className="max-w-[85%] overflow-hidden"
              style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
            >
              {m.role === "assistant" ? (
                <div
                  className="rounded-2xl rounded-tl-md px-4 py-3 text-[13px] leading-[1.85]"
                  style={{
                    background: "hsl(var(--card))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border)/0.6)",
                  }}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none
                    [&_pre]:p-0 [&_pre]:bg-transparent [&_pre]:m-0
                    [&_code]:text-[12px]
                    [&_p]:m-0 [&_p]:mb-2.5 [&_p]:leading-[1.85]
                    [&_ul]:m-0 [&_ul]:mb-2.5 [&_ul]:pl-4
                    [&_ol]:m-0 [&_ol]:mb-2.5 [&_ol]:pl-4
                    [&_li]:m-0 [&_li]:mb-1 [&_li]:leading-[1.75]
                    [&_h1]:text-[15px] [&_h1]:font-bold [&_h1]:mb-2 [&_h1]:mt-4
                    [&_h2]:text-[14px] [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-3
                    [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:mb-1.5 [&_h3]:mt-2.5
                    [&_strong]:font-bold [&_strong]:text-foreground
                    [&_blockquote]:border-l-2 [&_blockquote]:border-primary/30 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
                    overflow-hidden
                  ">
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const isBlock = className?.startsWith("language-") || String(children).includes("\n");
                          if (isBlock) {
                            return <GuruCodeBlock className={className}>{String(children).replace(/\n$/, "")}</GuruCodeBlock>;
                          }
                          return (
                            <code
                              className="px-1.5 py-0.5 rounded-md text-[11px] font-mono font-medium"
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
                </div>
              ) : (
                <div
                  className="rounded-2xl rounded-br-md px-4 py-2.5 text-[13px] leading-[1.7]"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  {m.content}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start items-start">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 mr-2" style={{ background: "hsl(var(--primary)/0.1)" }}>
              <Sparkles size={12} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div className="rounded-2xl rounded-tl-md px-4 py-3" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border)/0.6)" }}>
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
      <div
        className="flex items-center gap-2 px-4 py-3 border-t flex-shrink-0"
        style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.1)" }}
      >
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask Guru anything..."
            disabled={loading}
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground disabled:opacity-50"
            style={{ color: "hsl(var(--foreground))" }}
          />
        </div>
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl transition-all disabled:opacity-30 hover:scale-105 active:scale-95 flex-shrink-0"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
});

GuruBot.displayName = "GuruBot";
