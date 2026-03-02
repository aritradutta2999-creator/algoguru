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
      { id: "dp-digit", title: "Digit DP" },
      { id: "dp-optimization", title: "DP Optimization Techniques" },
      { id: "dp-matrix-exp", title: "Matrix Exponentiation" },
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
      { id: "graph-euler-tour", title: "Euler Tour & DFS Order" },
      { id: "graph-hld", title: "Heavy-Light Decomposition" },
      { id: "graph-matching", title: "Bipartite Matching" },
      { id: "graph-mcmf", title: "Min-Cost Max-Flow" },
      { id: "graph-advanced", title: "Advanced Graph Algorithms" },
    ],
  },
  {
    id: "bits",
    title: "Bit Manipulation",
    icon: "⊕",
    color: "info",
    description: "Bitwise operations & masking",
    subtopics: [
      { id: "bits-intro", title: "Introduction to Bits" },
      { id: "bits-operators", title: "Basic Bitwise Operators" },
      { id: "bits-tricks", title: "Common Bit Tricks" },
      { id: "bits-masking", title: "Bit Masking Fundamentals" },
      { id: "bits-xor", title: "XOR Properties & Problems" },
      { id: "bits-counting", title: "Counting Bits & Lookups" },
      { id: "bits-cp", title: "Bit Manipulation in CP" },
      { id: "bits-bitmask-dp", title: "Bitmask DP" },
      { id: "bits-advanced", title: "Advanced Bit Techniques" },
      { id: "bits-practice", title: "Practice Problems & Patterns" },
    ],
  },
  {
    id: "heaps",
    title: "Heaps & Priority Queues",
    icon: "△",
    color: "heap",
    description: "Priority-based data structures",
    subtopics: [
      { id: "heap-intro", title: "Introduction to Heaps" },
      { id: "heap-build", title: "Building a Heap from Scratch" },
      { id: "heap-maxheap", title: "Max Heap, Validation & Conversion" },
      { id: "heap-pq", title: "Java PriorityQueue API" },
      { id: "heap-sort", title: "Heap Sort Algorithm" },
      { id: "heap-topk", title: "Top-K Element Problems" },
      { id: "heap-two", title: "Two-Heap Pattern" },
      { id: "heap-merge", title: "Merge K Sorted Structures" },
      { id: "heap-graphs", title: "Heaps in Graph Algorithms" },
      { id: "heap-advanced", title: "Advanced Heap Variants" },
      { id: "heap-practice", title: "Practice Problems & Patterns" },
    ],
  },
];
