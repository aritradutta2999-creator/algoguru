import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  Play, Loader2, Copy, Check, Terminal,
  Code2, RotateCcw, Sun, Moon, Palette,
  AlignLeft, ChevronDown, Keyboard, Settings, Maximize, Minimize,
  FileCode, Plus, Pencil, Trash2, Save, X,
  BookOpen, ArrowLeft,
} from "lucide-react";
import Editor, { OnMount } from "@monaco-editor/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ALL_SNIPPETS, PRIORITY_LABELS } from "@/data/javaSnippets";
import { CP_TEMPLATES } from "@/data/cpTemplates";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface UserTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
}

const USER_TEMPLATES_KEY = "playground-user-templates";
const BUILTIN_OVERRIDES_KEY = "playground-builtin-overrides";

const loadUserTemplates = (): UserTemplate[] => {
  try {
    const raw = localStorage.getItem(USER_TEMPLATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveUserTemplates = (templates: UserTemplate[]) => {
  localStorage.setItem(USER_TEMPLATES_KEY, JSON.stringify(templates));
};

const loadBuiltinOverrides = (): Record<string, { code: string; description: string }> => {
  try {
    const raw = localStorage.getItem(BUILTIN_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
};

const saveBuiltinOverrides = (overrides: Record<string, { code: string; description: string }>) => {
  localStorage.setItem(BUILTIN_OVERRIDES_KEY, JSON.stringify(overrides));
};
const FALLBACK_JAVA_COMPILERS = [
  { label: "Java 17", compiler: "openjdk-jdk-17.0.1+12" },
  { label: "Java 15", compiler: "openjdk-jdk-15+36" },
];

const THEMES = [
  { id: "vs-dark", label: "Dark", icon: <Moon size={13} /> },
  { id: "light", label: "Light", icon: <Sun size={13} /> },
  { id: "solarized-dark", label: "Solarized Dark", icon: <Palette size={13} /> },
  { id: "hc-black", label: "High Contrast", icon: <Palette size={13} /> },
];

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

const WANDBOX_API = "https://wandbox.org/api/compile.json";

const JAVA_AUTO_IMPORTS = [
  "import java.util.*;",
  "import java.util.stream.*;",
  "import java.io.*;",
  "import java.math.*;",
];

const addAutoImports = (source: string) => {
  const missingImports = JAVA_AUTO_IMPORTS.filter((statement) => !source.includes(statement));
  if (!missingImports.length) return source;

  const packageMatch = source.match(/^\s*package\s+[\w.]+\s*;\s*/);
  if (packageMatch?.[0]) {
    return `${packageMatch[0]}\n${missingImports.join("\n")}\n${source.slice(packageMatch[0].length)}`;
  }

  return `${missingImports.join("\n")}\n\n${source}`;
};

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
  const [availableCompilers, setAvailableCompilers] = useState(FALLBACK_JAVA_COMPILERS);
  const [selectedCompiler, setSelectedCompiler] = useState(FALLBACK_JAVA_COMPILERS[0]);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showCompilerMenu, setShowCompilerMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stdin, setStdin] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [userTemplates, setUserTemplates] = useState<UserTemplate[]>(loadUserTemplates);
  const [builtinOverrides, setBuiltinOverrides] = useState<Record<string, { code: string; description: string }>>(loadBuiltinOverrides);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<UserTemplate | null>(null);
  const [editingBuiltinPrefix, setEditingBuiltinPrefix] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateDesc, setTemplateDesc] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const editorRef = useRef<any>(null);

  useEffect(() => {
    // Fetch actual available Java compilers from Wandbox
    fetch("https://wandbox.org/api/list.json")
      .then((res) => res.json())
      .then((list: any[]) => {
        const javaCompilers = list
          .filter((c: any) => c.language === "Java")
          .map((c: any) => {
            const name = c.name as string;
            // Extract major version from name like "openjdk-jdk-22+36"
            const versionMatch = name.match(/(\d+)[\+\.\-]/);
            const major = versionMatch ? versionMatch[1] : "";
            const label = major ? `JDK ${major}` : name;
            return { label, compiler: name };
          });
        if (javaCompilers.length > 0) {
          setAvailableCompilers(javaCompilers);
          setSelectedCompiler(javaCompilers[0]);
        } else {
          setAvailableCompilers(FALLBACK_JAVA_COMPILERS);
          setSelectedCompiler(FALLBACK_JAVA_COMPILERS[0]);
        }
      })
      .catch(() => {
        setAvailableCompilers(FALLBACK_JAVA_COMPILERS);
        setSelectedCompiler(FALLBACK_JAVA_COMPILERS[0]);
      });
  }, []);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme("solarized-dark", SOLARIZED_DARK_THEME);

    // Register Java snippets & auto-completions
    monaco.languages.registerCompletionItemProvider("java", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        return {
          suggestions: ALL_SNIPPETS.map((s) => ({
            label: s.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: s.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: s.detail,
            documentation: s.documentation,
            filterText: `${s.label} ${s.detail}`,
            sortText: `${PRIORITY_LABELS.has(s.label) ? "0" : "1"}_${s.label.toLowerCase()}`,
            range,
          })),
        };
      },
    });

    // Ctrl+Enter / Cmd+Enter to run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
  };

  const formatCode = useCallback(() => {
    const raw = code;
    if (!raw.trim()) return;

    const lines = raw.split('\n');
    const formatted: string[] = [];
    let indent = 0;

    for (let line of lines) {
      let trimmed = line.trim();
      if (!trimmed) { formatted.push(''); continue; }

      // Decrease indent before closing braces
      const closers = (trimmed.match(/^[}\])]/g) || []).length;
      if (closers > 0 && indent > 0) indent--;

      formatted.push('    '.repeat(Math.max(indent, 0)) + trimmed);

      // Count openers and closers for next line
      const opens = (trimmed.match(/[{(\[]/g) || []).length;
      const closes = (trimmed.match(/[}\])]/g) || []).length;
      indent += opens - closes;
      // Re-adjust if we already handled leading closer
      if (closers > 0) indent += closers;
      indent = Math.max(indent, 0);
    }

    setCode(formatted.join('\n'));
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(DEFAULT_CODE);
    setOutput("");
    setStdin("");
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    try {
      // Wandbox saves code as prog.java, so strip 'public' from class declarations
      // and inject common Java imports for CP snippets (Scanner, List, Map, etc.)
      const processedCode = addAutoImports(code).replace(/public\s+class\s+/g, "class ");
      const res = await fetch(WANDBOX_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: processedCode,
          compiler: selectedCompiler.compiler,
          stdin,
          "compiler-option-raw": "",
          "runtime-option-raw": "",
          save: false,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setOutput(`⚠ Compile service error (${res.status}): ${errorText || "Unknown error"}`);
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

  const openCreateTemplate = () => {
    setEditingTemplate(null);
    setEditingBuiltinPrefix(null);
    setTemplateName("");
    setTemplateDesc("");
    setShowTemplateMenu(false);
    setTemplateDialogOpen(true);
  };

  const openEditTemplate = (tmpl: UserTemplate) => {
    setEditingTemplate(tmpl);
    setEditingBuiltinPrefix(null);
    setTemplateName(tmpl.name);
    setTemplateDesc(tmpl.description);
    setShowTemplateMenu(false);
    setTemplateDialogOpen(true);
  };

  const openEditBuiltinTemplate = (tmpl: typeof CP_TEMPLATES[0]) => {
    setEditingTemplate(null);
    setEditingBuiltinPrefix(tmpl.prefix);
    const override = builtinOverrides[tmpl.prefix];
    setTemplateName(tmpl.name);
    setTemplateDesc(override?.description ?? tmpl.description);
    setShowTemplateMenu(false);
    // Load the current code from editor into the template
    setTemplateDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;

    if (editingBuiltinPrefix) {
      // Save built-in template override
      const updated = {
        ...builtinOverrides,
        [editingBuiltinPrefix]: { code, description: templateDesc.trim() },
      };
      setBuiltinOverrides(updated);
      saveBuiltinOverrides(updated);
      setTemplateDialogOpen(false);
      return;
    }

    let updated: UserTemplate[];
    if (editingTemplate) {
      updated = userTemplates.map((t) =>
        t.id === editingTemplate.id
          ? { ...t, name: templateName.trim(), description: templateDesc.trim(), code }
          : t
      );
    } else {
      const newTmpl: UserTemplate = {
        id: crypto.randomUUID(),
        name: templateName.trim(),
        description: templateDesc.trim(),
        code,
      };
      updated = [...userTemplates, newTmpl];
    }
    setUserTemplates(updated);
    saveUserTemplates(updated);
    setTemplateDialogOpen(false);
  };

  const handleResetBuiltinTemplate = (prefix: string) => {
    const updated = { ...builtinOverrides };
    delete updated[prefix];
    setBuiltinOverrides(updated);
    saveBuiltinOverrides(updated);
  };

  const handleDeleteTemplate = (id: string) => {
    const updated = userTemplates.filter((t) => t.id !== id);
    setUserTemplates(updated);
    saveUserTemplates(updated);
    setDeleteConfirmId(null);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[calc(100vh-3.5rem)]'} flex flex-col`} style={{ background: "hsl(var(--background))" }}>
      {/* Header */}
      {!isFullscreen && (
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
          {/* Templates */}
          <div className="relative">
            <button
              onClick={() => setShowTemplateMenu(!showTemplateMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
              style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
            >
              <FileCode size={13} />
              Templates
              <ChevronDown size={11} />
            </button>
            {showTemplateMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowTemplateMenu(false)} />
                <div
                  className="absolute left-0 top-full mt-1 w-80 rounded-xl overflow-hidden z-50 shadow-xl max-h-[70vh] overflow-y-auto"
                  style={{ backgroundColor: "hsl(var(--popover))", color: "hsl(var(--popover-foreground))", border: "1px solid hsl(var(--border))" }}
                >
                  <div className="px-3 pt-3 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
                      CP Templates by Aritra Dutta
                    </span>
                  </div>
                  {CP_TEMPLATES.map((tmpl) => {
                    const override = builtinOverrides[tmpl.prefix];
                    const isOverridden = !!override;
                    return (
                      <div key={tmpl.prefix} className="group flex items-center hover:bg-muted transition-colors">
                        <button
                          onClick={() => {
                            setCode(override?.code ?? tmpl.code);
                            setOutput("");
                            setShowTemplateMenu(false);
                          }}
                          className="flex-1 flex flex-col gap-0.5 px-3 py-2 text-left"
                        >
                          <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: "hsl(var(--foreground))" }}>
                            {tmpl.name}
                            {isOverridden && (
                              <span className="text-[8px] px-1 py-0.5 rounded font-medium" style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))" }}>
                                edited
                              </span>
                            )}
                          </span>
                          <span className="text-[9px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                            {override?.description ?? tmpl.description}
                          </span>
                        </button>
                        <div className="flex items-center gap-0.5 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); openEditBuiltinTemplate(tmpl); }}
                            className="p-1 rounded hover:bg-accent/50 transition-colors"
                            style={{ color: "hsl(var(--muted-foreground))" }}
                            title="Edit template (saves current editor code)"
                          >
                            <Pencil size={11} />
                          </button>
                          {isOverridden && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleResetBuiltinTemplate(tmpl.prefix); }}
                              className="p-1 rounded hover:bg-accent/50 transition-colors"
                              style={{ color: "hsl(var(--muted-foreground))" }}
                              title="Reset to original"
                            >
                              <RotateCcw size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {userTemplates.length > 0 && (
                    <>
                      <div className="mx-3 my-1 border-t" style={{ borderColor: "hsl(var(--border))" }} />
                      <div className="px-3 pt-2 pb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
                          My Templates
                        </span>
                      </div>
                      {userTemplates.map((tmpl) => (
                        <div key={tmpl.id} className="group flex items-center hover:bg-muted transition-colors">
                          <button
                            onClick={() => {
                              setCode(tmpl.code);
                              setOutput("");
                              setShowTemplateMenu(false);
                            }}
                            className="flex-1 flex flex-col gap-0.5 px-3 py-2 text-left"
                          >
                            <span className="text-[11px] font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                              {tmpl.name}
                            </span>
                            {tmpl.description && (
                              <span className="text-[9px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                                {tmpl.description}
                              </span>
                            )}
                          </button>
                          <div className="flex items-center gap-0.5 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditTemplate(tmpl); }}
                              className="p-1 rounded hover:bg-accent/50 transition-colors"
                              style={{ color: "hsl(var(--muted-foreground))" }}
                              title="Edit template"
                            >
                              <Pencil size={11} />
                            </button>
                            {deleteConfirmId === tmpl.id ? (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteTemplate(tmpl.id); }}
                                className="p-1 rounded text-[9px] font-bold"
                                style={{ color: "hsl(var(--destructive))" }}
                                title="Confirm delete"
                              >
                                <Check size={11} />
                              </button>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(tmpl.id); }}
                                className="p-1 rounded hover:bg-accent/50 transition-colors"
                                style={{ color: "hsl(var(--muted-foreground))" }}
                                title="Delete template"
                              >
                                <Trash2 size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="mx-3 my-1 border-t" style={{ borderColor: "hsl(var(--border))" }} />
                  <button
                    onClick={openCreateTemplate}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] font-medium transition-colors hover:bg-muted"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    <Plus size={13} />
                    Save Current Code as Template
                  </button>
                </div>
              </>
            )}
          </div>

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

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(true)}
            title="Fullscreen Mode"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            <Maximize size={13} />
            Fullscreen
          </button>

          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
              style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
            >
              <Settings size={13} />
              Settings
              <ChevronDown size={11} />
            </button>
            {showSettingsMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSettingsMenu(false)} />
                <div
                  className="absolute right-0 top-full mt-1 w-64 rounded-xl overflow-hidden z-50 shadow-xl"
                  style={{ backgroundColor: "hsl(var(--popover))", color: "hsl(var(--popover-foreground))", border: "1px solid hsl(var(--border))" }}
                >
                  {/* Java Compiler Section */}
                  <div className="px-3 pt-3 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Java Compiler
                    </span>
                  </div>
                  {availableCompilers.map((c) => (
                    <button
                      key={c.compiler}
                      onClick={() => { setSelectedCompiler(c); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-[11px] transition-colors hover:bg-muted"
                      style={{
                        color: selectedCompiler.compiler === c.compiler ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        fontWeight: selectedCompiler.compiler === c.compiler ? 600 : 400,
                      }}
                    >
                      ☕ {c.label}
                      {selectedCompiler.compiler === c.compiler && <Check size={11} className="ml-auto" />}
                    </button>
                  ))}

                  <div className="mx-3 my-1 border-t" style={{ borderColor: "hsl(var(--border))" }} />

                  {/* Editor Theme Section */}
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Editor Theme
                    </span>
                  </div>
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setCurrentTheme(t); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-[11px] transition-colors hover:bg-muted"
                      style={{
                        color: currentTheme.id === t.id ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        fontWeight: currentTheme.id === t.id ? 600 : 400,
                      }}
                    >
                      {t.icon} {t.label}
                      {currentTheme.id === t.id && <Check size={11} className="ml-auto" />}
                    </button>
                  ))}

                  <div className="mx-3 my-1 border-t" style={{ borderColor: "hsl(var(--border))" }} />

                  {/* Other Actions */}
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Actions
                    </span>
                  </div>
                  <button
                    onClick={() => { copyCode(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-[11px] transition-colors hover:bg-muted"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                  <button
                    onClick={() => { resetCode(); setShowSettingsMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] transition-colors hover:bg-muted"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    <RotateCcw size={13} />
                    Reset to Default
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Fullscreen toggle bar */}
      {isFullscreen && (
        <div className="flex items-center justify-between px-4 py-1.5 border-b flex-shrink-0" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}>
          <span className="text-xs font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
            ☕ Java Playground — Fullscreen
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={resetCode}
              title="Reset Code"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
              style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
            >
              <RotateCcw size={13} />
              Reset
            </button>
            <button
              onClick={formatCode}
              title="Format Code"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
              style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
            >
              <AlignLeft size={13} />
              Format
            </button>
            <button
              onClick={runCode}
              disabled={isRunning || !code.trim()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition-all disabled:opacity-50"
              style={{ background: "var(--gradient-primary)", color: "hsl(var(--primary-foreground))" }}
            >
              {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
              {isRunning ? "Running..." : "Run ⌘↵"}
            </button>
            <button
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
              style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
            >
              <Minimize size={13} />
              Exit
            </button>
          </div>
        </div>
      )}

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
                    suggest: { showKeywords: true, showSnippets: true },
                    quickSuggestions: { other: true, comments: false, strings: true },
                    quickSuggestionsDelay: 0,
                    suggestOnTriggerCharacters: true,
                    snippetSuggestions: "top",
                    tabSize: 4,
                    wordWrap: "on",
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                  }}
                />
              </div>

            </div>
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle withHandle />

          {/* Right Panel: Input (top) + Output (bottom) */}
          <ResizablePanel defaultSize={45} minSize={20}>
            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* Input Panel - always visible */}
              <ResizablePanel defaultSize={30} minSize={15}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-1.5 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}>
                    <Keyboard size={14} style={{ color: "hsl(var(--muted-foreground))" }} />
                    <span className="text-xs font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Standard Input (stdin)</span>
                  </div>
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Enter input for your program..."
                    className="flex-1 w-full px-4 py-2.5 font-mono text-base resize-none outline-none"
                    style={{ background: "hsl(var(--card))", color: "hsl(var(--foreground))", caretColor: "hsl(var(--primary))" }}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Output Panel */}
              <ResizablePanel defaultSize={70} minSize={20}>
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
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Create / Edit Template Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent className="sm:max-w-md" style={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
          <DialogHeader>
            <DialogTitle className="text-base font-bold" style={{ color: "hsl(var(--foreground))" }}>
              {editingBuiltinPrefix ? "Edit Built-in Template" : editingTemplate ? "Edit Template" : "Save as Template"}
            </DialogTitle>
            <DialogDescription className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              {editingBuiltinPrefix
                ? "Update this built-in template's description. Current editor code will be saved as your custom version."
                : editingTemplate
                ? "Update template name, description, and code (current editor code will be saved)."
                : "Save your current editor code as a reusable template."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            <div>
              <label className="text-[11px] font-medium mb-1 block" style={{ color: "hsl(var(--muted-foreground))" }}>
                Template Name {editingBuiltinPrefix ? "" : "*"}
              </label>
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g. My Graph Template"
                className="text-sm"
                disabled={!!editingBuiltinPrefix}
              />
            </div>
            <div>
              <label className="text-[11px] font-medium mb-1 block" style={{ color: "hsl(var(--muted-foreground))" }}>
                Description (optional)
              </label>
              <Textarea
                value={templateDesc}
                onChange={(e) => setTemplateDesc(e.target.value)}
                placeholder="e.g. BFS/DFS with adjacency list"
                className="text-sm min-h-[60px]"
                rows={2}
              />
            </div>
            <div className="text-[10px] px-2 py-1.5 rounded" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
              💡 The current editor code will be saved with this template.
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveTemplate} disabled={!editingBuiltinPrefix && !templateName.trim()}>
              <Save size={13} className="mr-1" />
              {editingTemplate || editingBuiltinPrefix ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
