export interface SubTopic {
  id: string;
  title: string;
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  subtopics: SubTopic[];
}

export const topics: Topic[] = [
  {
    id: "recursion",
    title: "Recursion",
    icon: "↻",
    color: "primary",
    description: "Foundation of algorithmic thinking",
    subtopics: [
      { id: "recursion-intro", title: "What is Recursion?" },
      { id: "recursion-types", title: "Types of Recursion" },
      { id: "recursion-factorial", title: "Factorial & Fibonacci" },
      { id: "recursion-tower", title: "Tower of Hanoi" },
      { id: "recursion-divide", title: "Divide & Conquer" },
      { id: "recursion-tree", title: "Tree Recursion" },
      { id: "recursion-advanced", title: "Advanced Problems" },
    ],
  },
  {
    id: "backtracking",
    title: "Backtracking",
    icon: "⟵",
    color: "accent",
    description: "Systematic search with pruning",
    subtopics: [
      { id: "bt-intro", title: "Backtracking Fundamentals" },
      { id: "bt-nqueens", title: "N-Queens Problem" },
      { id: "bt-sudoku", title: "Sudoku Solver" },
      { id: "bt-maze", title: "Rat in a Maze" },
      { id: "bt-subsets", title: "Subsets & Permutations" },
      { id: "bt-wordsearch", title: "Word Search" },
      { id: "bt-coloring", title: "Graph Coloring" },
      { id: "bt-hamiltonian", title: "Hamiltonian Path" },
    ],
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    icon: "⊞",
    color: "success",
    description: "Optimal substructure mastery",
    subtopics: [
      { id: "dp-intro", title: "DP Fundamentals" },
      { id: "dp-memoization", title: "Memoization (Top-Down)" },
      { id: "dp-tabulation", title: "Tabulation (Bottom-Up)" },
      { id: "dp-1d", title: "1D DP Problems" },
      { id: "dp-2d", title: "2D DP Problems" },
      { id: "dp-knapsack", title: "0/1 Knapsack" },
      { id: "dp-lcs", title: "LCS & Edit Distance" },
      { id: "dp-lis", title: "LIS & Variants" },
      { id: "dp-matrix", title: "Matrix Chain Multiplication" },
      { id: "dp-trees", title: "DP on Trees" },
      { id: "dp-bitmask", title: "Bitmask DP" },
      { id: "dp-advanced", title: "Advanced DP Patterns" },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    icon: "◉",
    color: "warning",
    description: "Network algorithms & structures",
    subtopics: [
      { id: "graph-intro", title: "Graph Representation" },
      { id: "graph-bfs", title: "BFS - Breadth First Search" },
      { id: "graph-dfs", title: "DFS - Depth First Search" },
      { id: "graph-dijkstra", title: "Dijkstra's Algorithm" },
      { id: "graph-bellman", title: "Bellman-Ford Algorithm" },
      { id: "graph-floyd", title: "Floyd-Warshall" },
      { id: "graph-mst", title: "Minimum Spanning Tree" },
      { id: "graph-topo", title: "Topological Sort" },
      { id: "graph-dsu", title: "Union-Find (DSU)" },
      { id: "graph-scc", title: "Strongly Connected Components" },
      { id: "graph-bridges", title: "Bridges & Articulation Points" },
      { id: "graph-advanced", title: "Advanced Graph Algorithms" },
    ],
  },
];
