import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play, Loader2, Trash2, Copy, Check, Terminal,
  Code2, ExternalLink, RotateCcw, Sun, Moon, Palette,
  AlignLeft, ChevronDown, Keyboard, GripVertical,
} from "lucide-react";
import Editor, { OnMount } from "@monaco-editor/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const JAVA_COMPILERS = [
  { label: "Java (Latest)", compiler: "openjdk-head" },
  { label: "Java 15", compiler: "openjdk-jdk-15.0.2+7" },
];

const THEMES = [
  { id: "vs-dark", label: "Dark", icon: <Moon size={13} /> },
  { id: "light", label: "Light", icon: <Sun size={13} /> },
  { id: "solarized-dark", label: "Solarized Dark", icon: <Palette size={13} /> },
  { id: "hc-black", label: "High Contrast", icon: <Palette size={13} /> },
];

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AlgoGuru! ☕");

        // Array operations
        int[] arr = {5, 3, 8, 1, 9, 2};
        System.out.println("Original: " + java.util.Arrays.toString(arr));

        java.util.Arrays.sort(arr);
        System.out.println("Sorted:   " + java.util.Arrays.toString(arr));

        // Lambda & Streams
        java.util.List<String> names = java.util.Arrays.asList("Alice", "Bob", "Charlie");
        names.stream()
             .map(String::toUpperCase)
             .forEach(name -> System.out.println("Hello, " + name + "!"));
    }
}`;

const WANDBOX_API = "https://wandbox.org/api/compile.json";

// Solarized Dark theme definition
const SOLARIZED_DARK_THEME = {
  base: "vs-dark" as const,
  inherit: true,
  rules: [
    { token: "", foreground: "839496", background: "002b36" },
    { token: "comment", foreground: "586e75", fontStyle: "italic" },
    { token: "keyword", foreground: "859900" },
    { token: "string", foreground: "2aa198" },
    { token: "number", foreground: "d33682" },
    { token: "type", foreground: "b58900" },
    { token: "class", foreground: "b58900" },
    { token: "function", foreground: "268bd2" },
    { token: "variable", foreground: "268bd2" },
    { token: "operator", foreground: "859900" },
    { token: "annotation", foreground: "93a1a1" },
  ],
  colors: {
    "editor.background": "#002b36",
    "editor.foreground": "#839496",
    "editor.lineHighlightBackground": "#073642",
    "editor.selectionBackground": "#073642",
    "editorCursor.foreground": "#d30102",
    "editorWhitespace.foreground": "#073642",
    "editorLineNumber.foreground": "#586e75",
    "editorLineNumber.activeForeground": "#93a1a1",
    "editor.selectionHighlightBackground": "#073642aa",
  },
};

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [selectedCompiler, setSelectedCompiler] = useState(JAVA_COMPILERS[0]);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showCompilerMenu, setShowCompilerMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stdin, setStdin] = useState("");
  const [showStdin, setShowStdin] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme("solarized-dark", SOLARIZED_DARK_THEME);
  };

  const formatCode = useCallback(() => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }, []);

  const resetCode = useCallback(() => {
    setCode(DEFAULT_CODE);
    setOutput("");
    setStdin("");
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    try {
      const res = await fetch(WANDBOX_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          compiler: selectedCompiler.compiler,
          stdin,
          "compiler-option-raw": "",
          "runtime-option-raw": "",
          save: false,
        }),
      });

      if (!res.ok) {
        setOutput(`⚠ Server error (${res.status}). Please try again.`);
        return;
      }

      const data = await res.json();
      const parts: string[] = [];

      if (data.compiler_error) {
        parts.push(`⚠ Compilation Error:\n${data.compiler_error}`);
      }
      if (data.compiler_message && !data.compiler_error) {
        parts.push(`Compiler: ${data.compiler_message}`);
      }
      if (data.program_output) {
        parts.push(data.program_output);
      }
      if (data.program_error) {
        parts.push(`\n⚠ Runtime Error:\n${data.program_error}`);
      }

      setOutput(parts.join("\n") || "✓ Program executed successfully (no output)");
    } catch (err) {
      setOutput(`⚠ Could not connect to compiler.\n${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, stdin, selectedCompiler]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col" style={{ background: "hsl(var(--background))" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0 gap-2 flex-wrap"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
          >
            <Code2 size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
              Java Playground
            </h1>
            <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
              Write · Compile · Run
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Java version selector */}
          <div className="relative">
            <button
              onClick={() => setShowCompilerMenu(!showCompilerMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={{ background: "hsl(var(--success)/0.1)", color: "hsl(var(--success))", border: "1px solid hsl(var(--success)/0.25)" }}
            >
              ☕ {selectedCompiler.label}
              <ChevronDown size={11} />
            </button>
            {showCompilerMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCompilerMenu(false)} />
                <div
                  className="absolute right-0 top-full mt-1 w-44 rounded-xl overflow-hidden z-50"
                  style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 8px 30px hsl(var(--foreground)/0.1)" }}
                >
                  {JAVA_COMPILERS.map((c) => (
                    <button
                      key={c.compiler}
                      onClick={() => { setSelectedCompiler(c); setShowCompilerMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] transition-colors hover:bg-muted"
                      style={{
                        color: selectedCompiler.compiler === c.compiler ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        fontWeight: selectedCompiler.compiler === c.compiler ? 600 : 400,
                      }}
                    >
                      ☕ {c.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }}
            >
              {currentTheme.icon}
              {currentTheme.label}
              <ChevronDown size={11} />
            </button>
            {showThemeMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowThemeMenu(false)} />
                <div
                  className="absolute right-0 top-full mt-1 w-44 rounded-xl overflow-hidden z-50"
                  style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 8px 30px hsl(var(--foreground)/0.1)" }}
                >
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setCurrentTheme(t); setShowThemeMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] transition-colors hover:bg-muted"
                      style={{
                        color: currentTheme.id === t.id ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        fontWeight: currentTheme.id === t.id ? 600 : 400,
                      }}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Format */}
          <button
            onClick={formatCode}
            title="Format Code"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            <AlignLeft size={13} />
            Format
          </button>

          {/* Copy */}
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>

          {/* Reset */}
          <button
            onClick={resetCode}
            title="Reset to default"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            <RotateCcw size={13} />
            Reset
          </button>

          {/* Stdin toggle */}
          <button
            onClick={() => setShowStdin(!showStdin)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
            style={{
              color: showStdin ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
              border: `1px solid ${showStdin ? "hsl(var(--primary)/0.3)" : "hsl(var(--border))"}`,
              background: showStdin ? "hsl(var(--primary)/0.1)" : undefined,
            }}
          >
            <Keyboard size={13} />
            Input
          </button>

          {/* Run */}
          <button
            onClick={runCode}
            disabled={isRunning || !code.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all disabled:opacity-50"
            style={{
              background: "var(--gradient-primary)",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 2px 12px hsl(var(--primary)/0.3)",
            }}
          >
            {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
            {isRunning ? "Running..." : "Run ⌘↵"}
          </button>
        </div>
      </div>

      {/* Editor + Output with resizable panels */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <div className="flex flex-col h-full">
              {/* File tab */}
              <div className="flex items-center gap-2 px-4 py-1.5 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--accent))" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--warning))" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--success))" }} />
                </div>
                <span className="text-[11px] font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>Main.java</span>
                <span className="text-[9px] font-mono ml-auto px-2 py-0.5 rounded" style={{ background: "hsl(var(--success)/0.1)", color: "hsl(var(--success))" }}>
                  {selectedCompiler.label}
                </span>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  language="java"
                  theme={currentTheme.id}
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  onMount={handleEditorMount}
                  options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                    fontLigatures: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: "on",
                    renderLineHighlight: "line",
                    bracketPairColorization: { enabled: true },
                    autoClosingBrackets: "always",
                    autoClosingQuotes: "always",
                    formatOnPaste: true,
                    suggest: { showKeywords: true },
                    tabSize: 4,
                    wordWrap: "on",
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                  }}
                />
              </div>

              {/* Stdin input */}
              {showStdin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5" style={{ background: "hsl(var(--muted)/0.3)" }}>
                    <Keyboard size={12} style={{ color: "hsl(var(--muted-foreground))" }} />
                    <span className="text-[10px] font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Standard Input (stdin)</span>
                  </div>
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Enter input for your program..."
                    rows={3}
                    className="w-full px-4 py-2 font-mono text-xs resize-none outline-none"
                    style={{ background: "hsl(var(--card))", color: "hsl(var(--foreground))", caretColor: "hsl(var(--primary))" }}
                  />
                </motion.div>
              )}
            </div>
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle withHandle />

          {/* Output Panel */}
          <ResizablePanel defaultSize={45} minSize={20}>
            <div className="flex flex-col h-full">
              <div
                className="flex items-center gap-2 px-4 py-1.5 border-b"
                style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}
              >
                <Terminal size={12} style={{ color: "hsl(var(--success))" }} />
                <span className="text-[10px] font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Output
                </span>
                {isRunning && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                    style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
                  >
                    compiling...
                  </motion.span>
                )}
                {output && !isRunning && (
                  <button
                    onClick={() => setOutput("")}
                    className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded hover:bg-muted"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    Clear
                  </button>
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
                      Click <strong>Run</strong> or press <kbd className="px-1.5 py-0.5 rounded text-[11px]" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>Ctrl+Enter</kbd> to compile & run...
                    </span>
                  )}
                </pre>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
