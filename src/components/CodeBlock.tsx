import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Code2 } from "lucide-react";

interface CodeBlockProps {
  title?: string;
  language?: string;
  code: string;
}

export function CodeBlock({ title, language = "java", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper my-5">
      <div className="code-block-header">
        <div className="flex items-center gap-2">
          <Code2 size={14} style={{ color: "hsl(var(--primary))" }} />
          {title && (
            <span className="text-xs font-semibold font-mono" style={{ color: "hsl(var(--foreground))" }}>
              {title}
            </span>
          )}
          <span className="section-badge" style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.2)" }}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-all duration-200"
          style={{
            background: copied ? "hsl(var(--success)/0.15)" : "hsl(var(--muted))",
            color: copied ? "hsl(var(--success))" : "hsl(var(--muted-foreground))",
            border: `1px solid ${copied ? "hsl(var(--success)/0.3)" : "hsl(var(--border))"}`,
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          background: "hsl(var(--code-bg))",
          fontSize: "0.78rem",
          lineHeight: "1.6",
          borderRadius: 0,
        }}
        showLineNumbers
        lineNumberStyle={{
          color: "hsl(var(--muted-foreground)/0.4)",
          fontSize: "0.7rem",
          paddingRight: "1rem",
          minWidth: "2.5rem",
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
