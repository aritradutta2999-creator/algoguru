import { useState, useMemo, useRef, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import TopicPage from "./pages/TopicPage";
import NotFound from "./pages/NotFound";
import { Menu, Sun, Moon, ZoomIn, ZoomOut, Search, X, ChevronRight } from "lucide-react";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";
import { ModeProvider, useMode } from "@/contexts/ModeContext";
import { topics } from "@/data/topics";
import { javaTopics } from "@/data/javaTopics";

const allTopics = [...topics, ...javaTopics];

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return allTopics;
    const q = query.toLowerCase();
    return allTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.subtopics.some((s) => s.title.toLowerCase().includes(q))
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  // Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Search topics (Ctrl+K)"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-muted"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <Search size={14} />
        <span className="hidden sm:inline text-[11px] font-mono">Search</span>
        <kbd className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
          <div className="fixed inset-0" style={{ background: "hsl(var(--background)/0.7)", backdropFilter: "blur(4px)" }} />
          <div
            className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 20px 60px hsl(var(--foreground)/0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "hsl(var(--border))" }}>
              <Search size={16} style={{ color: "hsl(var(--muted-foreground))" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "hsl(var(--foreground))" }}
              />
              <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-muted" style={{ color: "hsl(var(--muted-foreground))" }}>
                <X size={14} />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>No topics found</div>
              ) : (
                results.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { navigate(`/${t.id}`); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-[hsl(var(--muted)/0.5)]"
                    style={{ color: "hsl(var(--foreground))", borderBottom: "1px solid hsl(var(--border)/0.5)" }}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{t.title}</div>
                      <div className="text-[11px] font-light" style={{ color: "hsl(var(--muted-foreground))" }}>{t.subtopics.length} sections</div>
                    </div>
                    <ChevronRight size={13} style={{ color: "hsl(var(--muted-foreground))" }} />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const queryClient = new QueryClient();

const ZOOM_MAP: Record<string, string> = { sm: "85%", md: "100%", lg: "115%", xl: "125%" };

function HeaderControls() {
  const { theme, toggleTheme, fontSize, increaseFontSize, decreaseFontSize } = useSettings();
  const isDark = theme === "dark";
  const isMin = fontSize === "sm";
  const isMax = fontSize === "xl";

  return (
    <div className="flex items-center gap-1">
      {/* Zoom controls */}
      <button
        onClick={decreaseFontSize}
        disabled={isMin}
        title="Zoom out"
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 disabled:opacity-25 hover:bg-muted"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <ZoomOut size={14} />
      </button>
      <span className="text-[11px] font-mono font-semibold min-w-[36px] text-center" style={{ color: "hsl(var(--foreground))" }}>
        {ZOOM_MAP[fontSize] || "100%"}
      </span>
      <button
        onClick={increaseFontSize}
        disabled={isMax}
        title="Zoom in"
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 disabled:opacity-25 hover:bg-muted"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <ZoomIn size={14} />
      </button>

      <div className="w-px h-4 mx-1.5" style={{ background: "hsl(var(--border))" }} />

      <button
        onClick={toggleTheme}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-muted"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentMode } = useMode();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: "hsl(var(--background))" }}>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header
            className="h-14 flex items-center gap-3 px-5 border-b flex-shrink-0 sticky top-0 z-40"
            style={{
              borderColor: "hsl(var(--border))",
              background: "hsl(var(--background)/0.85)",
              backdropFilter: "blur(16px)",
            }}
          >
            <SidebarTrigger
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-muted"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <Menu size={16} />
            </SidebarTrigger>
            <div className="h-4 w-px" style={{ background: "hsl(var(--border))" }} />
            <span className="text-xs font-medium tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>
              AlgoGuru
            </span>
            <div className="flex-1" />

            <SearchButton />
            <div className="h-4 w-px mx-1" style={{ background: "hsl(var(--border))" }} />
            <HeaderControls />
          </header>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SettingsProvider>
        <ModeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/:topicId" element={<TopicPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </ModeProvider>
      </SettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
