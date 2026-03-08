import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Loader2, Trash2, Copy, Check, Terminal, ChevronDown } from "lucide-react";

const JAVA_VERSIONS = [
  { label: "Java 15 (Piston)", version: "15.0.2", runtime: "java" },
];

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AlgoGuru! ☕");
        
        // Try some Java code here
        int[] arr = {5, 3, 8, 1, 9, 2};
        System.out.println("Original: " + java.util.Arrays.toString(arr));
        
        java.util.Arrays.sort(arr);
        System.out.println("Sorted:   " + java.util.Arrays.toString(arr));
        
        // Lambda example
        java.util.List<String> names = java.util.Arrays.asList("Alice", "Bob", "Charlie");
        names.forEach(name -> System.out.println("Hello, " + name + "!"));
    }
}`;

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(JAVA_VERSIONS[0]);
  const [copied, setCopied] = useState(false);
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    try {
      const res = await fetch(PISTON_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedVersion.runtime,
          version: selectedVersion.version,
          files: [{ name: "Main.java", content: code }],
          stdin: "",
          args: [],
          compile_timeout: 10000,
          run_timeout: 5000,
        }),
      });

      if (!res.ok) {
        setOutput(`Error: Server returned ${res.status}. The Piston API might be temporarily unavailable.`);
        return;
      }

      const data = await res.json();
      const compileOutput = data.compile?.stderr || data.compile?.output || "";
      const runOutput = data.run?.stdout || data.run?.output || "";
      const runError = data.run?.stderr || "";

      if (compileOutput && data.compile?.code !== 0) {
        setOutput(`⚠ Compilation Error:\n${compileOutput}`);
      } else {
        const parts = [];
        if (runOutput) parts.push(runOutput);
        if (runError) parts.push(`\n⚠ Runtime Error:\n${runError}`);
        setOutput(parts.join("") || "✓ Program executed successfully (no output)");
      }
    } catch (err) {
      setOutput(`Error: Could not connect to compiler service.\n${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedVersion]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      setCode(code.substring(0, start) + "    " + code.substring(end));
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "hsl(var(--background))" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl text-lg"
            style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
          >
            ☕
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
              Java Playground
            </h1>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              Write, compile & run Java code instantly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Version selector */}
          <div className="relative">
            <button
              onClick={() => setShowVersionMenu(!showVersionMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={{
                background: "hsl(var(--muted))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <Terminal size={13} />
              {selectedVersion.label}
              <ChevronDown size={12} />
            </button>
            {showVersionMenu && (
              <div
                className="absolute right-0 top-full mt-1 w-48 rounded-xl overflow-hidden z-50"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 8px 30px hsl(var(--foreground)/0.1)",
                }}
              >
                {JAVA_VERSIONS.map((v) => (
                  <button
                    key={v.version}
                    onClick={() => { setSelectedVersion(v); setShowVersionMenu(false); }}
                    className="w-full px-3 py-2.5 text-left text-xs transition-colors hover:bg-muted"
                    style={{
                      color: selectedVersion.version === v.version ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                      fontWeight: selectedVersion.version === v.version ? 600 : 400,
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={() => { setCode(""); setOutput(""); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            <Trash2 size={13} />
            Clear
          </button>

          <button
            onClick={runCode}
            disabled={isRunning || !code.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
            style={{
              background: "var(--gradient-primary)",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 2px 12px hsl(var(--primary)/0.3)",
            }}
          >
            {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            {isRunning ? "Running..." : "Run ⌘↵"}
          </button>
        </div>
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "hsl(var(--border))" }}>
          <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--accent))" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--warning))" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--success))" }} />
            </div>
            <span className="text-[11px] font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>Main.java</span>
          </div>
          <div className="flex-1 relative min-h-0">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="absolute inset-0 w-full h-full resize-none p-4 font-mono text-sm leading-relaxed outline-none"
              style={{
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                tabSize: 4,
                caretColor: "hsl(var(--primary))",
              }}
              placeholder="// Write your Java code here..."
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col min-h-0 lg:max-w-[50%]">
          <div
            className="flex items-center gap-2 px-4 py-2 border-b"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Terminal size={13} style={{ color: "hsl(var(--success))" }} />
            <span className="text-[11px] font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
              Output
            </span>
            {isRunning && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
              >
                compiling...
              </motion.span>
            )}
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            <pre
              className="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap h-full"
              style={{
                background: "hsl(var(--card))",
                color: output.includes("Error") || output.includes("⚠")
                  ? "hsl(var(--accent))"
                  : "hsl(var(--success))",
              }}
            >
              {output || (
                <span style={{ color: "hsl(var(--muted-foreground))" }}>
                  Click "Run" or press Ctrl+Enter to execute your code...
                </span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
