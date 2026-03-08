import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";

const JAVA_VERSIONS = [
  { label: "Java 21", embedUrl: "https://onecompiler.com/embed/java?theme=dark" },
  { label: "Java 17", embedUrl: "https://onecompiler.com/embed/java?theme=dark" },
  { label: "Java 8", embedUrl: "https://onecompiler.com/embed/java?theme=dark" },
];

export default function Playground() {
  const [selectedVersion, setSelectedVersion] = useState(JAVA_VERSIONS[0]);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col" style={{ background: "hsl(var(--background))" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl text-base"
            style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
          >
            <Code2 size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
              Java Playground
            </h1>
            <p className="text-[11px]" style={{ color: "hsl(var(--muted-foreground))" }}>
              Write, compile & run Java code instantly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {JAVA_VERSIONS.map((v) => (
            <button
              key={v.label}
              onClick={() => setSelectedVersion(v)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: selectedVersion.label === v.label ? "hsl(var(--primary)/0.15)" : "hsl(var(--muted))",
                color: selectedVersion.label === v.label ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                border: `1px solid ${selectedVersion.label === v.label ? "hsl(var(--primary)/0.3)" : "hsl(var(--border))"}`,
              }}
            >
              {v.label}
            </button>
          ))}

          <a
            href="https://onecompiler.com/java"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            <ExternalLink size={12} />
            Open Full Editor
          </a>
        </div>
      </div>

      {/* Embedded Compiler */}
      <motion.div
        key={selectedVersion.label}
        className="flex-1 min-h-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <iframe
          src={selectedVersion.embedUrl}
          className="w-full h-full border-0"
          title={`Java Compiler - ${selectedVersion.label}`}
          allow="clipboard-read; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        />
      </motion.div>
    </div>
  );
}
