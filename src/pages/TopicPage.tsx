import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContentRenderer } from "@/components/ContentRenderer";
import { recursionContent } from "@/data/recursionContent";
import { backtrackingContent } from "@/data/backtrackingContent";
import { dpContent } from "@/data/dpContent";
import { graphsContent } from "@/data/graphsContent";
import { bitManipulationContent } from "@/data/bitManipulationContent";
import { heapContent } from "@/data/heapContent";
import { topics } from "@/data/topics";
import { ContentSection } from "@/data/recursionContent";
import { ChevronRight, ChevronLeft, List, X } from "lucide-react";

const contentMap: Record<string, ContentSection[]> = {
  recursion: recursionContent,
  backtracking: backtrackingContent,
  dp: dpContent,
  graphs: graphsContent,
  bits: bitManipulationContent,
  heaps: heapContent,
};

const topicColorVars: Record<string, string> = {
  recursion: "hsl(var(--primary))",
  backtracking: "hsl(var(--accent))",
  dp: "hsl(var(--success))",
  graphs: "hsl(var(--warning))",
  bits: "hsl(var(--info))",
};

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [tocOpen, setTocOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  const topic = topics.find((t) => t.id === topicId);
  const content = topicId ? contentMap[topicId] : null;

  // Scroll to hash on load/change
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(hash);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (content?.[0]) setActiveSection(content[0].id);
    }
  }, [location.hash, topicId]);

  // Intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -60% 0%", threshold: 0 }
    );
    content?.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [content]);

  if (!topic || !content) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Topic not found
      </div>
    );
  }

  // Navigation between topics
  const allTopics = topics;
  const currentIdx = allTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIdx > 0 ? allTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null;

  const color = topicColorVars[topic.id] || "hsl(var(--primary))";

  return (
    <div className="flex min-h-screen relative" ref={mainRef}>
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Topic header banner */}
        <div
          className="px-8 py-10 border-b relative overflow-hidden"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
        >
          {/* Decorative glow */}
          <div
            className="hero-glow w-64 h-64 -top-16 -right-16 opacity-20"
            style={{ background: color }}
          />
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/")}
                style={{ color: "hsl(var(--primary))" }}
              >
                Home
              </span>
              <ChevronRight size={12} />
              <span style={{ color }}>
                {topic.title}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-2xl text-2xl font-bold"
                style={{ background: `${color}1a`, border: `1px solid ${color}40` }}
              >
                {topic.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                  {topic.title}
                </h1>
                <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {topic.description} · {content.length} sections · Java
                </p>
              </div>
            </div>
            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mt-4">
              {content.map((s, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeSection === s.id ? color : "hsl(var(--border))",
                    transform: activeSection === s.id ? "scale(1.5)" : "scale(1)",
                  }}
                  onClick={() => navigate(`/${topicId}#${s.id}`)}
                  title={s.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-4xl mx-auto px-8 py-10">
          {content.map((section) => (
            <ContentRenderer key={section.id} section={section} />
          ))}

          {/* Topic navigation */}
          <div className="flex items-center justify-between mt-8 pt-8" style={{ borderTop: "1px solid hsl(var(--border))" }}>
            {prevTopic ? (
              <button
                onClick={() => navigate(`/${prevTopic.id}`)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-x-0.5"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              >
                <ChevronLeft size={16} />
                <div className="text-left">
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Previous</div>
                  <div>{prevTopic.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextTopic && (
              <button
                onClick={() => navigate(`/${nextTopic.id}`)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:translate-x-0.5"
                style={{
                  background: "hsl(var(--primary)/0.1)",
                  border: "1px solid hsl(var(--primary)/0.3)",
                  color: "hsl(var(--primary))",
                }}
              >
                <div className="text-right">
                  <div className="text-xs" style={{ color: "hsl(var(--primary)/0.7)" }}>Next</div>
                  <div>{nextTopic.title}</div>
                </div>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right TOC panel */}
      <div className="hidden xl:flex flex-col w-56 flex-shrink-0 border-l sticky top-0 h-screen overflow-y-auto py-6 px-4"
        style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-4 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
          On this page
        </div>
        <nav className="space-y-0.5">
          {content.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => navigate(`/${topicId}#${s.id}`)}
                className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs transition-all duration-150"
                style={{
                  background: isActive ? `${color}12` : "transparent",
                  color: isActive ? color : "hsl(var(--muted-foreground))",
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: isActive ? `2px solid ${color}` : "2px solid transparent",
                }}
              >
                {s.title}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile TOC toggle */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2.5 rounded-full text-xs font-semibold shadow-lg"
        style={{
          background: color,
          color: "hsl(var(--background))",
        }}
      >
        {tocOpen ? <X size={14} /> : <List size={14} />}
        {tocOpen ? "Close" : "Contents"}
      </button>

      {/* Mobile TOC panel */}
      {tocOpen && (
        <div
          className="xl:hidden fixed bottom-20 right-6 z-50 w-64 rounded-2xl shadow-2xl p-4 border"
          style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
            Sections
          </div>
          <nav className="space-y-0.5 max-h-72 overflow-y-auto">
            {content.map((s) => (
              <button
                key={s.id}
                onClick={() => { navigate(`/${topicId}#${s.id}`); setTocOpen(false); }}
                className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs transition-all"
                style={{ color: activeSection === s.id ? color : "hsl(var(--foreground))" }}
              >
                <span className="w-1 h-1 rounded-full" style={{ background: activeSection === s.id ? color : "hsl(var(--border))" }} />
                {s.title}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
