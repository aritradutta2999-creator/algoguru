import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { topics } from "@/data/topics";
import { ChevronDown, Home, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const topicIcons: Record<string, string> = {
  recursion: "↻",
  backtracking: "⟵",
  dp: "⊞",
  graphs: "◉",
  bits: "⊕",
};

const topicColorVars: Record<string, string> = {
  recursion: "hsl(var(--primary))",
  backtracking: "hsl(var(--accent))",
  dp: "hsl(var(--success))",
  graphs: "hsl(var(--warning))",
  bits: "hsl(var(--info))",
};

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const currentHash = location.hash.replace("#", "");

  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    topics.forEach((t) => {
      initial[t.id] = t.subtopics.some((s) => currentPath === `/${t.id}` || currentHash === s.id);
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
      <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm font-mono"
          style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.3)" }}
        >
          CP
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>
            CP Guide
          </div>
          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            Basics → Advanced
          </div>
        </div>
      </div>

      <SidebarContent className="px-2 py-3">
        {/* Home */}
        <div className="mb-1">
          <button
            onClick={() => navigate("/")}
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
              currentPath === "/"
                ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]"
            )}
          >
            <Home size={15} />
            <span>Home</span>
          </button>
        </div>

        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest font-mono mt-2 mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
          Topics
        </div>

        <SidebarMenu>
          {topics.map((topic) => {
            const isOpen = openTopics[topic.id];
            const isActive = isTopicActive(topic.id);
            const color = topicColorVars[topic.id];

            return (
              <SidebarMenuItem key={topic.id}>
                {/* Topic header */}
                <SidebarMenuButton
                  asChild
                  className="h-auto p-0"
                >
                  <button
                    onClick={() => {
                      toggleTopic(topic.id);
                      navigate(`/${topic.id}`);
                    }}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 group",
                      isActive
                        ? "bg-[hsl(var(--sidebar-accent))]"
                        : "hover:bg-[hsl(var(--sidebar-accent)/0.5)]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex items-center justify-center w-6 h-6 rounded text-xs font-bold font-mono"
                        style={{ background: `${color}1a`, color }}
                      >
                        {topicIcons[topic.id]}
                      </span>
                      <span style={{ color: isActive ? color : "hsl(var(--sidebar-foreground))" }}>
                        {topic.title}
                      </span>
                    </div>
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-200"
                      style={{
                        color: "hsl(var(--muted-foreground))",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                </SidebarMenuButton>

                {/* Subtopics */}
                {isOpen && (
                  <SidebarMenuSub className="ml-3 mt-0.5 border-l pl-3" style={{ borderColor: `${color}30` }}>
                    {topic.subtopics.map((sub) => {
                      const active = isSubActive(topic.id, sub.id);
                      return (
                        <SidebarMenuSubItem key={sub.id}>
                          <SidebarMenuSubButton asChild className="h-auto p-0">
                            <button
                              onClick={() => navigate(`/${topic.id}#${sub.id}`)}
                              className={cn(
                                "flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs transition-all duration-150 text-left",
                                active
                                  ? "font-semibold"
                                  : "hover:bg-[hsl(var(--sidebar-accent)/0.5)]"
                              )}
                              style={{
                                color: active ? color : "hsl(var(--sidebar-foreground)/0.8)",
                                background: active ? `${color}15` : undefined,
                              }}
                            >
                              <span
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: active ? color : "hsl(var(--muted-foreground)/0.4)" }}
                              />
                              {sub.title}
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Footer */}
        <div className="mt-6 mx-2 p-3 rounded-xl" style={{ background: "hsl(var(--primary)/0.06)", border: "1px solid hsl(var(--primary)/0.15)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen size={13} style={{ color: "hsl(var(--primary))" }} />
            <span className="text-xs font-semibold" style={{ color: "hsl(var(--primary))" }}>
              Coverage
            </span>
          </div>
          <div className="text-[10px] space-y-0.5 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
            <div>✦ Recursion → Advanced</div>
            <div>✦ Backtracking & Pruning</div>
            <div>✦ DP → Bitmask & Trees</div>
            <div>✦ Graphs → SCC & Bridges</div>
            <div>✦ Bits → SOS DP & Trie</div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
