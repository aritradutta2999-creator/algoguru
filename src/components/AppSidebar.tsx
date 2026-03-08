import { useState, useMemo, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { topics } from "@/data/topics";
import { javaTopics } from "@/data/javaTopics";
import { ChevronDown, Home, BookOpen, Layers, Coffee, Search, X, Code2, Bug, Mail, Send } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMode, APP_MODES } from "@/contexts/ModeContext";

const topicIcons: Record<string, string> = {
  recursion: "↻",
  backtracking: "←",
  dp: "⊞",
  graphs: "◉",
  bits: "⊕",
  heaps: "△",
};

const topicColorVars: Record<string, string> = {
  recursion: "hsl(var(--primary))",
  backtracking: "hsl(var(--accent))",
  dp: "hsl(var(--success))",
  graphs: "hsl(var(--warning))",
  bits: "hsl(var(--info))",
  heaps: "hsl(var(--heap))",
  strings: "hsl(var(--primary))",
  "number-theory": "hsl(var(--success))",
  trees: "hsl(var(--accent))",
  "segment-tree": "hsl(var(--info))",
  "advanced-math": "hsl(var(--warning))",
  "advanced-topics": "hsl(var(--heap))",
  // Java topic colors
  "java-basics": "hsl(var(--primary))",
  "java-oop": "hsl(var(--accent))",
  "java-exceptions": "hsl(var(--warning))",
  "java-collections": "hsl(var(--success))",
  "java-generics": "hsl(var(--info))",
  "java-streams": "hsl(var(--heap))",
  "java-multithreading": "hsl(var(--primary))",
  "java-io": "hsl(var(--accent))",
  "java-advanced": "hsl(var(--warning))",
};

const modeIcons: Record<string, React.ReactNode> = {
  ds: <Layers size={14} />,
  lang: <Coffee size={14} />,
};

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentMode, setMode, modes } = useMode();
  const currentPath = location.pathname;
  const currentHash = location.hash.replace("#", "");

  const activeTopics = currentMode.id === "ds" ? topics : javaTopics;

  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    activeTopics.forEach((t) => {
      initial[t.id] = currentPath === `/${t.id}`;
    });
    return initial;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allSearchItems = useMemo(() => {
    const allTopicsList = [...topics, ...javaTopics];
    return allTopicsList.flatMap((t) => [
      { id: t.id, title: t.title, icon: t.icon, type: "topic" as const, path: `/${t.id}`, parent: null, subtopicCount: t.subtopics.length },
      ...t.subtopics.map((s) => ({
        id: s.id, title: s.title, icon: t.icon, type: "subtopic" as const, path: `/${t.id}#${s.id}`, parent: t.title, subtopicCount: 0,
      })),
    ]);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return allSearchItems.filter((i) => i.title.toLowerCase().includes(q));
  }, [searchQuery, allSearchItems]);

  const toggleTopic = (id: string) => {
    setOpenTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isSubActive = (topicId: string, subId: string) => {
    return currentPath === `/${topicId}` && currentHash === subId;
  };

  const isTopicActive = (topicId: string) => {
    return currentPath === `/${topicId}`;
  };

  return (
    <Sidebar className="border-r" style={{ borderColor: "hsl(var(--sidebar-border))", background: "hsl(var(--sidebar-background))" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl font-bold text-sm font-mono"
          style={{
            background: "var(--gradient-primary)",
            color: "hsl(var(--primary-foreground))",
            boxShadow: "0 2px 12px hsl(var(--primary)/0.25)",
          }}
        >
          AG
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            AlgoGuru
          </div>
          <div className="text-[10px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
            {currentMode.description}
          </div>
        </div>
      </div>

      <SidebarContent className="px-3 py-4">

        {/* Home */}
        <div className="mb-2">
          <button
            onClick={() => navigate("/")}
            className={cn(
              "flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              currentPath === "/" ? "" : "hover:bg-muted/50"
            )}
            style={{
              color: currentPath === "/" ? "hsl(var(--primary))" : "hsl(var(--sidebar-foreground))",
              background: currentPath === "/" ? "hsl(var(--primary)/0.08)" : undefined,
            }}
          >
            <Home size={15} />
            <span>Home</span>
          </button>
          <button
            onClick={() => navigate("/playground")}
            className={cn(
              "flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              currentPath === "/playground" ? "" : "hover:bg-muted/50"
            )}
            style={{
              color: currentPath === "/playground" ? "hsl(var(--success))" : "hsl(var(--sidebar-foreground))",
              background: currentPath === "/playground" ? "hsl(var(--success)/0.08)" : undefined,
            }}
          >
            <Code2 size={15} />
            <span>Playground</span>
          </button>
        </div>

        <div className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
          {currentMode.id === "ds" ? "Topics" : "Java Modules"}
        </div>

        <SidebarMenu>
          {activeTopics.map((topic) => {
            const isOpen = openTopics[topic.id];
            const isActive = isTopicActive(topic.id);
            const color = topicColorVars[topic.id] || "hsl(var(--primary))";

            return (
              <SidebarMenuItem key={topic.id}>
                <SidebarMenuButton asChild className="h-auto p-0">
                  <button
                    onClick={() => {
                      toggleTopic(topic.id);
                      navigate(`/${topic.id}`);
                    }}
                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
                    style={{
                      background: isActive ? "hsl(var(--sidebar-accent))" : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono"
                        style={{ background: `${color}12`, color }}
                      >
                        {topic.icon}
                      </span>
                      <span style={{ color: isActive ? color : "hsl(var(--sidebar-foreground))" }}>
                        {topic.title}
                      </span>
                    </div>
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-300"
                      style={{
                        color: "hsl(var(--muted-foreground))",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                </SidebarMenuButton>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <SidebarMenuSub className="ml-4 mt-1 border-l pl-3" style={{ borderColor: `${color}20` }}>
                        {topic.subtopics.map((sub) => {
                          const active = isSubActive(topic.id, sub.id);
                          return (
                            <SidebarMenuSubItem key={sub.id}>
                              <SidebarMenuSubButton asChild className="h-auto p-0">
                                <button
                                  onClick={() => navigate(`/${topic.id}#${sub.id}`)}
                                  className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 text-left"
                                  style={{
                                    color: active ? color : "hsl(var(--sidebar-foreground)/0.75)",
                                    background: active ? `${color}10` : undefined,
                                    fontWeight: active ? 600 : 400,
                                  }}
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                                    style={{ background: active ? color : "hsl(var(--muted-foreground)/0.3)" }}
                                  />
                                  {sub.title}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Search Topics */}
        <div className="mt-8 mx-1">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "hsl(var(--muted)/0.4)", border: "1px solid hsl(var(--border))" }}
          >
            <div className="flex items-center gap-2 px-3 py-2.5">
              <Search size={13} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all topics..."
                className="flex-1 bg-transparent text-xs outline-none"
                style={{ color: "hsl(var(--foreground))" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-0.5 rounded hover:bg-muted" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <X size={12} />
                </button>
              )}
            </div>
            {searchQuery.trim() && (
              <div className="max-h-48 overflow-y-auto border-t" style={{ borderColor: "hsl(var(--border))" }}>
                {searchResults.length === 0 ? (
                  <div className="px-3 py-3 text-[11px] text-center" style={{ color: "hsl(var(--muted-foreground))" }}>No results found</div>
                ) : (
                  searchResults.slice(0, 15).map((item) => (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); setSearchQuery(""); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-[11px] transition-colors hover:bg-muted/60"
                      style={{ color: "hsl(var(--foreground))", borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        {item.parent && (
                          <div className="text-[9px]" style={{ color: "hsl(var(--muted-foreground))" }}>{item.parent}</div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Report a Bug / Contact */}
        <div className="mt-auto mx-1 mb-4">
          <div className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
            Report a Bug
          </div>
          <div className="flex flex-col gap-1">
            <a
              href="mailto:officialjobs.aritra2001@gmail.com?subject=Bug%20Report%20-%20AlgoGuru"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:bg-muted/50"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <Mail size={14} />
              <span>Email Admin</span>
            </a>
            <a
              href="https://t.me/aritra0109"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:bg-muted/50"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <Send size={14} />
              <span>Telegram @aritra0109</span>
            </a>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
