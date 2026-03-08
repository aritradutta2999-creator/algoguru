import { useNavigate } from "react-router-dom";
import { topics } from "@/data/topics";
import { javaTopics } from "@/data/javaTopics";
import { motion } from "framer-motion";
import { ChevronRight, Zap, GitBranch, LayoutGrid, Terminal, Sparkles, ArrowRight, BookOpen, Coffee, Layers } from "lucide-react";
import { useMode } from "@/contexts/ModeContext";

const topicColors: Record<string, { color: string; bg: string; border: string }> = {
  recursion: { color: "hsl(var(--primary))", bg: "hsl(var(--primary)/0.06)", border: "hsl(var(--primary)/0.15)" },
  backtracking: { color: "hsl(var(--accent))", bg: "hsl(var(--accent)/0.06)", border: "hsl(var(--accent)/0.15)" },
  dp: { color: "hsl(var(--success))", bg: "hsl(var(--success)/0.06)", border: "hsl(var(--success)/0.15)" },
  graphs: { color: "hsl(var(--warning))", bg: "hsl(var(--warning)/0.06)", border: "hsl(var(--warning)/0.15)" },
  bits: { color: "hsl(var(--info))", bg: "hsl(var(--info)/0.06)", border: "hsl(var(--info)/0.15)" },
  heaps: { color: "hsl(var(--heap))", bg: "hsl(var(--heap)/0.06)", border: "hsl(var(--heap)/0.15)" },
  strings: { color: "hsl(var(--primary))", bg: "hsl(var(--primary)/0.06)", border: "hsl(var(--primary)/0.15)" },
  "number-theory": { color: "hsl(var(--success))", bg: "hsl(var(--success)/0.06)", border: "hsl(var(--success)/0.15)" },
  trees: { color: "hsl(var(--accent))", bg: "hsl(var(--accent)/0.06)", border: "hsl(var(--accent)/0.15)" },
  "java-basics": { color: "hsl(var(--primary))", bg: "hsl(var(--primary)/0.06)", border: "hsl(var(--primary)/0.15)" },
  "java-oop": { color: "hsl(var(--accent))", bg: "hsl(var(--accent)/0.06)", border: "hsl(var(--accent)/0.15)" },
  "java-exceptions": { color: "hsl(var(--warning))", bg: "hsl(var(--warning)/0.06)", border: "hsl(var(--warning)/0.15)" },
  "java-collections": { color: "hsl(var(--success))", bg: "hsl(var(--success)/0.06)", border: "hsl(var(--success)/0.15)" },
  "java-generics": { color: "hsl(var(--info))", bg: "hsl(var(--info)/0.06)", border: "hsl(var(--info)/0.15)" },
  "java-streams": { color: "hsl(var(--heap))", bg: "hsl(var(--heap)/0.06)", border: "hsl(var(--heap)/0.15)" },
  "java-multithreading": { color: "hsl(var(--primary))", bg: "hsl(var(--primary)/0.06)", border: "hsl(var(--primary)/0.15)" },
  "java-io": { color: "hsl(var(--accent))", bg: "hsl(var(--accent)/0.06)", border: "hsl(var(--accent)/0.15)" },
  "java-advanced": { color: "hsl(var(--warning))", bg: "hsl(var(--warning)/0.06)", border: "hsl(var(--warning)/0.15)" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Index() {
  const navigate = useNavigate();
  const { currentMode, setMode, modes } = useMode();
  const isDSMode = currentMode.id === "ds";
  const activeTopics = isDSMode ? topics : javaTopics;

  const dsStats = [
    { label: "Topics", value: "9", icon: LayoutGrid },
    { label: "Sections", value: "100+", icon: GitBranch },
    { label: "Code Examples", value: "200+", icon: Terminal },
    { label: "Algorithms", value: "120+", icon: Zap },
  ];

  const javaStats = [
    { label: "Modules", value: "9", icon: LayoutGrid },
    { label: "Sections", value: "80+", icon: GitBranch },
    { label: "Code Examples", value: "100+", icon: Terminal },
    { label: "Concepts", value: "150+", icon: Zap },
  ];

  const quickStats = isDSMode ? dsStats : javaStats;

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 px-6 md:px-10 py-3 flex items-center justify-center" style={{ background: "hsl(var(--background)/0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid hsl(var(--border))" }}>
        <span className="text-sm font-bold tracking-wide font-mono" style={{ color: "hsl(var(--foreground))" }}>
          Java <span style={{ color: "hsl(var(--muted-foreground))" }}>·</span> <span style={{ color: "hsl(var(--primary))" }}>CP Guide</span>
        </span>
      </div>

      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="hero-glow w-[500px] h-[500px] -top-48 left-1/2 -translate-x-1/2 opacity-[0.08]" style={{ background: "hsl(var(--primary))" }} />
        <div className="hero-glow w-72 h-72 bottom-0 -right-20 opacity-[0.05]" style={{ background: "hsl(var(--accent))" }} />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          key={currentMode.id}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
            style={{ background: "hsl(var(--primary)/0.08)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.15)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={13} />
            {isDSMode ? "Competitive Programming · Java Edition" : "Core & Advanced Java · A to Z"}
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            {isDSMode ? (
              <>
                Master <span className="text-primary-glow">Algorithms</span>
                <br />
                <span className="text-accent-glow">From Zero to Expert</span>
              </>
            ) : (
              <>
                Master <span className="text-primary-glow">Java</span>
                <br />
                <span className="text-accent-glow">Core to Advanced</span>
              </>
            )}
          </h1>

          <p className="text-base md:text-lg leading-8 max-w-xl mx-auto mb-10 font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
            Your complete learning platform for DSA & Java — pick a track below to begin.
          </p>

          {/* Mode Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {modes.map((mode) => {
              const isActive = currentMode.id === mode.id;
              const isDS = mode.id === "ds";
              return (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setMode(mode.id);
                    const targetTopics = isDS ? topics : javaTopics;
                    navigate(`/${targetTopics[0].id}`);
                  }}
                  className="relative flex flex-col items-center gap-3 px-8 py-8 rounded-2xl text-center transition-all duration-200 cursor-pointer overflow-hidden"
                  style={{
                    background: isActive ? "hsl(var(--primary)/0.10)" : "hsl(var(--card))",
                    border: isActive ? "2px solid hsl(var(--primary)/0.4)" : "1px solid hsl(var(--border))",
                    boxShadow: isActive ? "0 8px 32px hsl(var(--primary)/0.2)" : "var(--shadow-card)",
                  }}
                >
                  <div className="text-4xl mb-1">{isDS ? "⊞" : "☕"}</div>
                  <div className="flex items-center gap-2">
                    {isDS ? <Layers size={18} style={{ color: "hsl(var(--primary))" }} /> : <Coffee size={18} style={{ color: "hsl(var(--accent))" }} />}
                    <span className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>{mode.label}</span>
                  </div>
                  <p className="text-xs font-light leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {isDS
                      ? "Recursion, DP, Graphs, Trees, Heaps, Strings, Number Theory — with complexity analysis & Java code."
                      : "OOP, Collections, Generics, Streams, Multithreading, I/O — from fundamentals to advanced patterns."
                    }
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold" style={{ color: isDS ? "hsl(var(--primary))" : "hsl(var(--accent))" }}>
                    Start Learning <ArrowRight size={13} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>


      {/* Stats */}
      <section className="px-6 md:px-10 py-8 border-y" style={{ borderColor: "hsl(var(--border))" }}>
        <motion.div
          className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {quickStats.map(({ label, value, icon: Icon }) => (
            <motion.div key={label} variants={item} className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.12)" }}>
                <Icon size={18} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight" style={{ color: "hsl(var(--foreground))" }}>{value}</div>
                <div className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Topic cards */}
      <section className="px-6 md:px-10 py-14">
        <div className="max-w-3xl mx-auto">
          <motion.div className="mb-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
              {isDSMode ? "Topics" : "Java Modules"}
            </h2>
            <p className="text-sm font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
              {isDSMode
                ? "Each topic builds on the previous — follow the order for maximum impact."
                : "Master Java from the ground up — each module covers a core area of the language."
              }
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            key={currentMode.id}
          >
            {activeTopics.map((topic, idx) => {
              const colors = topicColors[topic.id] || { color: "hsl(var(--primary))", bg: "hsl(var(--primary)/0.06)", border: "hsl(var(--primary)/0.15)" };
              return (
                <motion.div
                  key={topic.id}
                  variants={item}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="topic-card group"
                  onClick={() => navigate(`/${topic.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold"
                        style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color }}
                      >
                        {topic.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono font-medium mb-0.5" style={{ color: colors.color }}>
                          MODULE {String(idx + 1).padStart(2, "0")}
                        </div>
                        <h3 className="font-bold text-[15px]" style={{ color: "hsl(var(--foreground))" }}>
                          {topic.title}
                        </h3>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
                      style={{ color: colors.color }}
                    />
                  </div>

                  <p className="text-sm font-light leading-relaxed mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {topic.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {topic.subtopics.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                        style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}
                      >
                        {sub.title}
                      </span>
                    ))}
                    {topic.subtopics.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                        style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                        +{topic.subtopics.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-5 pt-4 flex items-center justify-between border-t" style={{ borderColor: "hsl(var(--border))" }}>
                    <span className="text-[11px] font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {topic.subtopics.length} sections
                    </span>
                    <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: colors.color }}>
                      <Terminal size={11} />
                      Java
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Complexity reference — only for DS mode */}
      {isDSMode && (
        <section className="px-6 md:px-10 py-12 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-xl font-bold mb-2 tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
                Complexity Reference
              </h2>
              <p className="text-sm font-light mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                Quick lookup for the most common algorithms covered.
              </p>
            </motion.div>
            <motion.div
              className="overflow-x-auto rounded-2xl"
              style={{ border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-card)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <table className="table-dark w-full">
                <thead>
                  <tr><th>Algorithm</th><th>Category</th><th>Time</th><th>Space</th></tr>
                </thead>
                <tbody>
                  {[
                    ["Fibonacci (DP)", "DP", "O(n)", "O(1)"],
                    ["Merge Sort", "D&C", "O(n log n)", "O(n)"],
                    ["N-Queens", "Backtracking", "O(n!)", "O(n)"],
                    ["0/1 Knapsack", "DP", "O(nW)", "O(W)"],
                    ["Dijkstra", "Graphs", "O((V+E)logV)", "O(V)"],
                    ["Floyd-Warshall", "Graphs", "O(V³)", "O(V²)"],
                    ["Kruskal MST", "Graphs", "O(E log E)", "O(V)"],
                    ["TSP (Bitmask)", "DP + Graphs", "O(2ⁿ·n²)", "O(2ⁿ·n)"],
                  ].map(([algo, cat, time, space]) => (
                    <tr key={algo}>
                      <td className="font-semibold font-mono text-xs" style={{ color: "hsl(var(--foreground))" }}>{algo}</td>
                      <td className="text-xs font-medium" style={{ color: "hsl(var(--primary))" }}>{cat}</td>
                      <td className="font-mono text-xs" style={{ color: "hsl(var(--accent))" }}>{time}</td>
                      <td className="font-mono text-xs" style={{ color: "hsl(var(--success))" }}>{space}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>
      )}

      <footer className="px-6 md:px-10 py-10 border-t text-center" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="text-xs font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
          AlgoGuru · {isDSMode ? "Competitive Programming" : "Core & Advanced Java"} · Java Edition
        </div>
      </footer>
    </div>
  );
}
