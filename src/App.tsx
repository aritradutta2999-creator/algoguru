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
    <div className="flex items-center gap-1">
      {/* Font size controls */}
      <button
        onClick={decreaseFontSize}
        disabled={isMin}
        title="Decrease font size"
        className="flex items-center justify-center w-7 h-7 rounded-md transition-colors disabled:opacity-30"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <AArrowDown size={15} />
      </button>
      <button
        onClick={increaseFontSize}
        disabled={isMax}
        title="Increase font size"
        className="flex items-center justify-center w-7 h-7 rounded-md transition-colors disabled:opacity-30"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <AArrowUp size={15} />
      </button>

      <div className="w-px h-4 mx-1" style={{ background: "hsl(var(--border))" }} />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className="flex items-center justify-center w-7 h-7 rounded-md transition-colors"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
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
            className="h-12 flex items-center gap-3 px-4 border-b flex-shrink-0 sticky top-0 z-40"
            style={{
              borderColor: "hsl(var(--border))",
              background: "hsl(var(--background)/0.95)",
              backdropFilter: "blur(12px)",
            }}
          >
            <SidebarTrigger
              className="flex items-center justify-center w-7 h-7 rounded-md transition-colors"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <Menu size={15} />
            </SidebarTrigger>
            <div className="h-4 w-px" style={{ background: "hsl(var(--border))" }} />
            <span className="text-xs font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
              CP Guide — Java Competitive Programming
            </span>
            <div className="flex-1" />

            {/* Font size + theme controls */}
            <HeaderControls />

            <div className="h-4 w-px mx-1" style={{ background: "hsl(var(--border))" }} />
            <div
              className="hidden sm:flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-mono"
              style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(var(--primary))" }} />
              Java · Basics → Advanced
            </div>
          </header>

          {/* Page content */}
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
