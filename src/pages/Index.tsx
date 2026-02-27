import { useNavigate } from "react-router-dom";
import { topics } from "@/data/topics";
import { ChevronRight, Zap, GitBranch, LayoutGrid, Share2, Award, Terminal } from "lucide-react";

const topicColors: Record<string, { color: string; bg: string; border: string }> = {
  recursion: {
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary)/0.08)",
    border: "hsl(var(--primary)/0.2)",
  },
  backtracking: {
    color: "hsl(var(--accent))",
    bg: "hsl(var(--accent)/0.08)",
    border: "hsl(var(--accent)/0.2)",
  },
  dp: {
    color: "hsl(var(--success))",
    bg: "hsl(var(--success)/0.08)",
    border: "hsl(var(--success)/0.2)",
  },
  graphs: {
    color: "hsl(var(--warning))",
    bg: "hsl(var(--warning)/0.08)",
    border: "hsl(var(--warning)/0.2)",
  },
  bits: {
    color: "hsl(var(--info))",
    bg: "hsl(var(--info)/0.08)",
    border: "hsl(var(--info)/0.2)",
  },
  heaps: {
    color: "hsl(var(--heap))",
    bg: "hsl(var(--heap)/0.08)",
    border: "hsl(var(--heap)/0.2)",
  },
};

const topicIcons: Record<string, string> = {
  recursion: "↻",
  backtracking: "⟵",
  dp: "⊞",
  graphs: "◉",
  bits: "⊕",
  heaps: "△",
};

const quickStats = [
  { label: "Topics", value: "5", icon: LayoutGrid },
  { label: "Sections", value: "55+", icon: GitBranch },
  { label: "Code Examples", value: "100+", icon: Terminal },
  { label: "Algorithms", value: "75+", icon: Zap },
];

const roadmapSteps = [
  { step: "01", title: "Recursion", desc: "Master the art of self-referential problem solving", tag: "Foundation" },
  { step: "02", title: "Backtracking", desc: "Systematic search with intelligent pruning", tag: "Search" },
  { step: "03", title: "Dynamic Programming", desc: "From memoization to bitmask DP", tag: "Optimization" },
  { step: "04", title: "Graphs", desc: "Networks, paths, and advanced algorithms", tag: "Advanced" },
  { step: "05", title: "Bit Manipulation", desc: "Bitwise tricks, masking, SOS DP & Trie XOR", tag: "Expert" },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero */}
      <section className="relative px-8 py-16 overflow-hidden border-b" style={{ borderColor: "hsl(var(--border))" }}>
        {/* Background glows */}
        <div className="hero-glow w-96 h-96 -top-32 -left-32 opacity-10" style={{ background: "hsl(var(--primary))" }} />
        <div className="hero-glow w-80 h-80 -bottom-20 right-0 opacity-8" style={{ background: "hsl(var(--accent))" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 font-mono"
            style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.25)" }}>
            <Award size={12} />
            Competitive Programming · Java Edition
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: "hsl(var(--foreground))" }}>
            Master Competitive{" "}
            <span className="text-primary-glow">Programming</span>
            <br />
            From Basics to{" "}
            <span className="text-accent-glow">Advanced</span>
          </h1>

          <p className="text-base leading-7 max-w-2xl mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
            A complete end-to-end guide covering Recursion, Backtracking, Dynamic Programming, and Graph Algorithms —
            with detailed theory, complexity analysis, and production-quality Java code.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/recursion")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:translate-y-[-2px]"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 0 20px hsl(var(--primary)/0.35)",
              }}
            >
              Start Learning
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => navigate("/graphs")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "hsl(var(--secondary))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <Share2 size={15} />
              Jump to Graphs
            </button>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="px-8 py-6 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                <Icon size={16} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div>
                <div className="text-xl font-bold font-mono" style={{ color: "hsl(var(--foreground))" }}>{value}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Topic cards */}
      <section className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>
              Topic Guide
            </h2>
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Each topic builds on the previous — follow the order for maximum impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {topics.map((topic, idx) => {
              const colors = topicColors[topic.id];
              return (
                <div
                  key={topic.id}
                  className="topic-card cursor-pointer group"
                  onClick={() => navigate(`/${topic.id}`)}
                  style={{ borderColor: colors.border, background: colors.bg }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                        style={{ background: `${colors.color}20`, border: `1px solid ${colors.color}30`, color: colors.color }}
                      >
                        {topicIcons[topic.id]}
                      </div>
                      <div>
                        <div className="text-xs font-mono mb-0.5" style={{ color: colors.color }}>
                          {String(idx + 1).padStart(2, "0")} / {String(topics.length).padStart(2, "0")}
                        </div>
                        <h3 className="font-bold text-base" style={{ color: "hsl(var(--foreground))" }}>
                          {topic.title}
                        </h3>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="mt-1 transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: colors.color }}
                    />
                  </div>

                  <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {topic.description}
                  </p>

                  {/* Subtopic pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {topic.subtopics.slice(0, 4).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                        style={{ background: `${colors.color}15`, color: colors.color, border: `1px solid ${colors.color}25` }}
                      >
                        {sub.title}
                      </span>
                    ))}
                    {topic.subtopics.length > 4 && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                        style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
                      >
                        +{topic.subtopics.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Section count */}
                  <div className="mt-4 pt-3 flex items-center justify-between border-t" style={{ borderColor: `${colors.color}20` }}>
                    <span className="text-xs font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {topic.subtopics.length} sections
                    </span>
                    <span className="text-xs font-semibold" style={{ color: colors.color }}>
                      Java Code ✦
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="px-8 py-10 border-t" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>
            Learning Roadmap
          </h2>
          <p className="text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
            Recommended progression from fundamentals to expert-level competitive programming.
          </p>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-7 top-8 bottom-8 w-px" style={{ background: "hsl(var(--border))" }} />

            <div className="space-y-4">
              {roadmapSteps.map((step, idx) => {
                const color = Object.values(topicColors)[idx]?.color;
                return (
                  <div
                    key={step.step}
                    className="flex items-start gap-5 cursor-pointer group"
                    onClick={() => navigate(`/${topics[idx].id}`)}
                  >
                    <div
                      className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                      style={{
                        background: `${color}15`,
                        border: `1.5px solid ${color}40`,
                        color,
                      }}
                    >
                      {step.step}
                    </div>
                    <div className="pt-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-sm" style={{ color: "hsl(var(--foreground))" }}>
                          {step.title}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                          style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                          {step.tag}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Cheat sheet reference */}
      <section className="px-8 py-10 border-t" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>
            Quick Complexity Reference
          </h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid hsl(var(--border))" }}>
            <table className="table-dark w-full">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Category</th>
                  <th>Time</th>
                  <th>Space</th>
                  <th>Key Insight</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Fibonacci (DP)", "Recursion/DP", "O(n)", "O(1)", "Eliminate overlapping subproblems"],
                  ["Merge Sort", "Divide & Conquer", "O(n log n)", "O(n)", "Split → Sort → Merge"],
                  ["Binary Search", "Divide & Conquer", "O(log n)", "O(1)", "Halve search space each step"],
                  ["N-Queens", "Backtracking", "O(n!)", "O(n)", "Prune by row/col/diagonal"],
                  ["0/1 Knapsack", "DP", "O(nW)", "O(W)", "Include or exclude each item"],
                  ["LCS", "DP", "O(mn)", "O(mn)", "Match or take best previous"],
                  ["Dijkstra", "Graphs", "O((V+E)logV)", "O(V)", "Greedy + Min-heap"],
                  ["Floyd-Warshall", "Graphs", "O(V³)", "O(V²)", "Try every intermediate vertex"],
                  ["Kruskal MST", "Graphs", "O(E log E)", "O(V)", "Sort edges + Union-Find"],
                  ["Topo Sort (BFS)", "Graphs", "O(V+E)", "O(V)", "Process zero in-degree first"],
                  ["Bridges/APs", "Graphs", "O(V+E)", "O(V)", "Tarjan's disc/low values"],
                  ["TSP (Bitmask DP)", "DP + Graphs", "O(2ⁿ·n²)", "O(2ⁿ·n)", "State = (mask, last city)"],
                ].map(([algo, cat, time, space, key]) => (
                  <tr key={algo}>
                    <td className="font-semibold font-mono text-xs" style={{ color: "hsl(var(--foreground))" }}>{algo}</td>
                    <td className="text-xs" style={{ color: "hsl(var(--primary))" }}>{cat}</td>
                    <td className="font-mono text-xs" style={{ color: "hsl(var(--accent))" }}>{time}</td>
                    <td className="font-mono text-xs" style={{ color: "hsl(var(--success))" }}>{space}</td>
                    <td className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t text-center" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
        <div className="text-xs font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
          Competitive Programming Guide · Java Edition · Basics → Advanced
        </div>
      </footer>
    </div>
  );
}
