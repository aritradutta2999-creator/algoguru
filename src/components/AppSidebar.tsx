import { useState } from "react";
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
import { ChevronDown, Home, BookOpen, Layers, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMode, APP_MODES } from "@/contexts/ModeContext";

const topicIcons: Record<string, string> = {
  recursion: "↻",
  backtracking: "⟵",
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
        {/* Mode Switcher */}
        <div className="mb-4 mx-1 p-1 rounded-xl flex gap-1" style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border))" }}>
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setMode(mode.id);
                navigate("/");
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200"
              )}
              style={{
                background: currentMode.id === mode.id ? "hsl(var(--primary)/0.12)" : "transparent",
                color: currentMode.id === mode.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                boxShadow: currentMode.id === mode.id ? "0 1px 4px hsl(var(--primary)/0.15)" : "none",
              }}
            >
              {modeIcons[mode.id]}
              {mode.label}
            </button>
          ))}
        </div>

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

        {/* Footer card */}
        <div className="mt-8 mx-1 p-4 rounded-2xl" style={{ background: "hsl(var(--primary)/0.05)", border: "1px solid hsl(var(--primary)/0.1)" }}>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={13} style={{ color: "hsl(var(--primary))" }} />
            <span className="text-xs font-semibold" style={{ color: "hsl(var(--primary))" }}>
              {currentMode.id === "ds" ? "DS Coverage" : "Java Coverage"}
            </span>
          </div>
          <div className="text-[10px] space-y-1 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
            {currentMode.id === "ds" ? (
              <>
                <div>✦ 6 Major Topics</div>
                <div>✦ 65+ Sections</div>
                <div>✦ 120+ Code Examples</div>
                <div>✦ Beginner → Advanced</div>
              </>
            ) : (
              <>
                <div>✦ 9 Core Modules</div>
                <div>✦ 80+ Sections</div>
                <div>✦ 100+ Code Examples</div>
                <div>✦ Core → Advanced Java</div>
              </>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
