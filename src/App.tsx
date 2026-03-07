import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import TopicPage from "./pages/TopicPage";
import NotFound from "./pages/NotFound";
import { Menu, Sun, Moon, AArrowUp, AArrowDown } from "lucide-react";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";

const queryClient = new QueryClient();

function HeaderControls() {
  const { theme, toggleTheme, fontSize, increaseFontSize, decreaseFontSize } = useSettings();
  const isDark = theme === "dark";
  const isMin = fontSize === "sm";
  const isMax = fontSize === "xl";

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={decreaseFontSize}
        disabled={isMin}
        title="Decrease font size"
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 disabled:opacity-25 hover:bg-muted"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <AArrowDown size={14} />
      </button>
      <button
        onClick={increaseFontSize}
        disabled={isMax}
        title="Increase font size"
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 disabled:opacity-25 hover:bg-muted"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <AArrowUp size={14} />
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

            <HeaderControls />

            <div className="h-4 w-px mx-1" style={{ background: "hsl(var(--border))" }} />
            <div
              className="hidden sm:flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full font-mono font-medium"
              style={{ background: "hsl(var(--primary)/0.08)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.12)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(var(--primary))" }} />
              Java · CP Guide
            </div>
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
      </SettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
