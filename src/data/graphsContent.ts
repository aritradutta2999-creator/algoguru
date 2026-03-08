import { ContentSection } from "./recursionContent";

export const graphsContent: ContentSection[] = [
  {
    id: "graph-intro",
    title: "Graph Representation",
    difficulty: "Easy",
    theory: [
      "A Graph G = (V, E) consists of a set of Vertices (nodes) V and a set of Edges E connecting pairs of vertices. Graphs model networks, maps, dependencies, and countless real-world problems. Think of cities connected by roads, friends in a social network, or tasks with dependencies — all are graphs.",
      "Directed Graph (Digraph): Edges have direction — edge (u,v) goes FROM u TO v. Think of one-way streets or Twitter follows. Undirected Graph: Edges have no direction — edge {u,v} connects u and v symmetrically, like Facebook friendships or two-way roads.",
      "Weighted Graph: Edges have associated weights/costs (e.g., distances, travel times, bandwidths). Unweighted: all edges have equal weight (often 1). In competitive programming, always check if the graph is weighted or unweighted — it determines which algorithm to use.",
      "Three primary representations: Adjacency Matrix (O(V²) space, O(1) edge lookup), Adjacency List (O(V+E) space, efficient for sparse graphs), Edge List (O(E) space, simple for edge-centric algorithms like Kruskal's MST).",
      "Key graph terminology: Degree of a vertex = number of edges connected to it. In directed graphs: in-degree (edges coming in) and out-degree (edges going out). A path is a sequence of vertices connected by edges. A cycle is a path that starts and ends at the same vertex.",
      "Connected Graph: Every vertex is reachable from every other (undirected). Strongly Connected: Every vertex reachable from every other via directed paths. A tree is a connected acyclic undirected graph with exactly V-1 edges. A forest is a collection of trees.",
      "In competitive programming, 99% of the time you'll use Adjacency List. Use Adjacency Matrix only when V ≤ 1000 and you need O(1) edge lookups. Use Edge List for Kruskal's MST or when you process edges one by one.",
    ],
    diagram: {
      type: "table-visual",
      title: "Graph Representations Comparison",
      data: [
        {
          label: "Adjacency List",
          color: "success",
          children: [
            { label: "Space: O(V + E)" },
            { label: "Edge lookup: O(degree)" },
            { label: "Best for: sparse graphs (E << V²)" },
            { label: "⭐ Most common in CP" }
          ]
        },
        {
          label: "Adjacency Matrix",
          color: "info",
          children: [
            { label: "Space: O(V²)" },
            { label: "Edge lookup: O(1)" },
            { label: "Best for: dense graphs, V ≤ 1000" },
            { label: "Floyd-Warshall, small graphs" }
          ]
        },
        {
          label: "Edge List",
          color: "accent",
          children: [
            { label: "Space: O(E)" },
            { label: "Edge lookup: O(E)" },
            { label: "Best for: edge-centric algorithms" },
            { label: "Kruskal's MST, Bellman-Ford" }
          ]
        },
        {
          label: "Graph Types",
          color: "warning",
          children: [
            { label: "Directed vs Undirected" },
            { label: "Weighted vs Unweighted" },
            { label: "Cyclic vs Acyclic (DAG)" },
            { label: "Connected vs Disconnected" }
          ]
        }
      ]
    },
    keyPoints: [
      "Always clarify: directed vs undirected, weighted vs unweighted, cyclic vs acyclic",
      "Adjacency List is the default choice — O(V+E) space, efficient iteration",
      "For dense graphs (E ≈ V²), adjacency matrix may be faster due to cache locality",
      "Tree = connected graph with V-1 edges = connected acyclic graph",
      "Self-loops and multi-edges: check if the problem allows them",
    ],
    tip: "When reading graph problems, always ask: (1) Directed or undirected? (2) Weighted? (3) Can there be cycles? (4) Is it connected? These determine your algorithm choice.",
    code: [
      {
        title: "Graph Representations in Java",
        language: "java",
        content: `import java.util.*;

public class GraphRepresentation {
    
    // ==================== ADJACENCY LIST (most common) ====================
    // Space: O(V + E), Best for sparse graphs
    
    static class Graph {
        int vertices;
        List<List<Integer>> adj;      // Unweighted
        List<List<int[]>> adjWeighted; // Weighted: [neighbor, weight]
        
        Graph(int v) {
            vertices = v;
            adj = new ArrayList<>();
            adjWeighted = new ArrayList<>();
            for (int i = 0; i < v; i++) {
                adj.add(new ArrayList<>());
                adjWeighted.add(new ArrayList<>());
            }
        }
        
        // Undirected edge
        void addEdge(int u, int v) {
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        
        // Directed weighted edge
        void addDirectedWeightedEdge(int u, int v, int w) {
            adjWeighted.get(u).add(new int[]{v, w});
        }
    }
    
    // ==================== ADJACENCY MATRIX ====================
    // Space: O(V²), O(1) edge lookup, good for dense graphs
    
    static class MatrixGraph {
        int[][] matrix;
        int v;
        
        MatrixGraph(int v) {
            this.v = v;
            matrix = new int[v][v];
        }
        
        void addEdge(int u, int v, int w) {
            matrix[u][v] = w;
            matrix[v][u] = w; // Remove for directed
        }
        
        boolean hasEdge(int u, int v) {
            return matrix[u][v] != 0;
        }
    }
    
    public static void main(String[] args) {
        Graph g = new Graph(5);
        g.addEdge(0, 1); g.addEdge(0, 4);
        g.addEdge(1, 2); g.addEdge(1, 3); g.addEdge(1, 4);
        g.addEdge(2, 3); g.addEdge(3, 4);
        
        System.out.println("Adjacency List:");
        for (int i = 0; i < 5; i++)
            System.out.println(i + " → " + g.adj.get(i));
    }
}`,
      },
    ],
    table: {
      headers: ["Representation", "Space", "Add Edge", "Check Edge", "Neighbors", "Best For"],
      rows: [
        ["Adjacency List", "O(V+E)", "O(1)", "O(degree)", "O(degree)", "Sparse graphs"],
        ["Adjacency Matrix", "O(V²)", "O(1)", "O(1)", "O(V)", "Dense graphs"],
        ["Edge List", "O(E)", "O(1)", "O(E)", "O(E)", "Edge-centric algos"],
      ],
    },
  },
  {
    id: "graph-bfs",
    title: "BFS — Breadth First Search",
    difficulty: "Easy",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) for queue and visited array",
    theory: [
      "BFS explores vertices **level by level** using a queue (FIFO). Think of it as a **fire spreading on a graph**: at step 0 only the source is on fire; at each step, the fire at each vertex spreads to all unvisited neighbors. The 'ring of fire' expands by one unit at each iteration.",
      "BFS guarantees the **shortest path** (in terms of number of edges) in an unweighted graph. This is because it processes vertices in order of their distance from the source. The first time you reach a vertex, it's via the shortest path.",
      "**Path reconstruction**: Maintain a parent array `p[]` where `p[v]` = the vertex from which v was discovered. To reconstruct the shortest path to vertex u, backtrack: `u → p[u] → p[p[u]] → ... → source`, then reverse.",
      "When to use BFS vs DFS: Use BFS when you need shortest path in unweighted graphs, level-by-level processing, or when the solution is close to the root. Use DFS when you need to explore all paths, detect cycles, find connected components, or do topological sorting.",
      "**Multi-source BFS**: Start BFS from multiple sources simultaneously by putting all sources in the queue initially. This gives shortest distance from ANY source. Used in problems like 'minimum distance from any 0', 'rotting oranges', or 'walls and gates'.",
      "**0-1 BFS**: For graphs with edge weights 0 or 1, use a deque instead of a queue. Add 0-weight edges to the front and 1-weight edges to the back. This gives shortest paths in O(V+E) without needing Dijkstra.",
      "**Shortest cycle**: Start BFS from each vertex; as soon as we try to go back to the source, we've found the shortest cycle through that vertex. Take the minimum over all sources.",
      "**Edges on shortest path**: Run BFS from both a and b. Edge (u,v) lies on some shortest a→b path iff `d_a[u] + 1 + d_b[v] = d_a[b]`.",
      "BFS on implicit graphs: Sometimes the graph isn't given explicitly. You generate neighbors on the fly. For example, in Word Ladder, each word is a node, and two words are connected if they differ by one character. BFS finds the shortest transformation sequence.",
      "Time complexity is O(V + E) because each vertex is enqueued and dequeued exactly once, and each edge is examined exactly once (twice for undirected graphs).",
    ],
    keyPoints: [
      "BFS uses a Queue (FIFO) — always process the oldest discovered node first",
      "Mark nodes as visited WHEN ADDING TO QUEUE, not when processing — prevents duplicates",
      "BFS gives shortest path only in unweighted graphs — use Dijkstra for weighted",
      "Multi-source BFS: add ALL sources to queue initially with distance 0",
      "Level-by-level processing: use queue.size() to process one level at a time",
      "0-1 BFS: use deque, push 0-weight to front, 1-weight to back — O(V+E)",
      "Path reconstruction: maintain parent array p[], backtrack from target to source",
      "BFS on grids: use direction arrays dr[] = {0,0,1,-1}, dc[] = {1,-1,0,0}",
    ],
    tip: "A common mistake is marking a node as visited when you PROCESS it (poll from queue) instead of when you ADD it to the queue. This causes the same node to be added multiple times, wasting time and potentially giving wrong answers.",
    warning: "BFS does NOT work for shortest paths in weighted graphs. If edges have different weights, BFS may find a path with fewer edges but higher total weight. Use Dijkstra's algorithm instead. For 0/1 weights, use 0-1 BFS with a deque.",
    code: [
      {
        title: "BFS — Complete with Applications",
        language: "java",
        content: `import java.util.*;

public class BFS {
    
    // ==================== BASIC BFS ====================
    
    public static void bfs(List<List<Integer>> adj, int start, int V) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");
            
            for (int neighbor : adj.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
    
    // ==================== SHORTEST PATH (unweighted) ====================
    
    public static int[] shortestPath(List<List<Integer>> adj, int start, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, -1);
        Queue<Integer> queue = new LinkedList<>();
        
        dist[start] = 0;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int neighbor : adj.get(node)) {
                if (dist[neighbor] == -1) {
                    dist[neighbor] = dist[node] + 1;
                    queue.offer(neighbor);
                }
            }
        }
        return dist;
    }
    
    // ==================== BIPARTITE CHECK ====================
    // A graph is bipartite if we can 2-color it with no same-color neighbors
    
    public static boolean isBipartite(List<List<Integer>> adj, int V) {
        int[] color = new int[V];
        Arrays.fill(color, -1);
        
        for (int start = 0; start < V; start++) {
            if (color[start] != -1) continue;
            
            Queue<Integer> queue = new LinkedList<>();
            queue.offer(start);
            color[start] = 0;
            
            while (!queue.isEmpty()) {
                int node = queue.poll();
                for (int neighbor : adj.get(node)) {
                    if (color[neighbor] == -1) {
                        color[neighbor] = 1 - color[node]; // Alternate colors
                        queue.offer(neighbor);
                    } else if (color[neighbor] == color[node]) {
                        return false; // Same color adjacent — not bipartite!
                    }
                }
            }
        }
        return true;
    }
    
    // ==================== MULTI-SOURCE BFS ====================
    // 0-1 Matrix: distance of each cell from nearest 0
    
    public static int[][] zeroOneMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] dist = new int[m][n];
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[m][n];
        
        // Start BFS from ALL 0-cells simultaneously
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    queue.offer(new int[]{i, j});
                    visited[i][j] = true;
                    dist[i][j] = 0;
                } else {
                    dist[i][j] = Integer.MAX_VALUE;
                }
            }
        }
        
        int[] dr = {0, 0, 1, -1};
        int[] dc = {1, -1, 0, 0};
        
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int r = cell[0], c = cell[1];
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    dist[nr][nc] = dist[r][c] + 1;
                    visited[nr][nc] = true;
                    queue.offer(new int[]{nr, nc});
                }
            }
        }
        return dist;
    }
    
    // ==================== WORD LADDER (BFS on implicit graph) ====================
    
    public static int wordLadder(String begin, String end, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(end)) return 0;
        
        Queue<String> queue = new LinkedList<>();
        queue.offer(begin);
        int steps = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String word = queue.poll();
                char[] chars = word.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char original = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        chars[j] = c;
                        String next = new String(chars);
                        if (next.equals(end)) return steps + 1;
                        if (wordSet.contains(next)) {
                            queue.offer(next);
                            wordSet.remove(next); // Mark visited
                        }
                    }
                    chars[j] = original;
                }
            }
            steps++;
        }
        return 0;
    }
}`,
      },
    ],
  },
  {
    id: "graph-dfs",
    title: "DFS — Depth First Search",
    difficulty: "Easy",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) for recursion stack",
    theory: [
      "DFS explores as **deep as possible** along each branch before backtracking. Uses a stack (implicit via recursion or explicit). Think of navigating a maze: go straight as far as you can, hit a dead end, backtrack to the last junction, try the next path.",
      "DFS finds the **lexicographically first path** from source to each vertex (if adjacency lists are sorted). It finds shortest paths in **trees** (where only one simple path exists), but NOT in general graphs.",
      "**Edge classification**: DFS creates a DFS tree with four edge types: (1) **Tree edges** — edges in the DFS tree. (2) **Back edges** — point to an ancestor, indicate a **CYCLE**. (3) **Forward edges** — point to a descendant (directed graphs only). (4) **Cross edges** — point to a visited non-ancestor (directed graphs only).",
      "**Theorem**: In an undirected graph, DFS classifies every edge as either a tree edge or a back edge. Forward and cross edges **only exist in directed graphs**. This is because in an undirected graph, if u is visited before v, either (u,v) is a tree edge or v is an ancestor of u (back edge).",
      "**Entry/exit times**: Track `tin[v]` (when DFS enters v) and `tout[v]` (when DFS exits v). Vertex u is an ancestor of v iff `tin[u] < tin[v]` AND `tout[u] > tout[v]`. This ancestor check runs in O(1) and is used in LCA, bridges, and many other algorithms.",
      "**3-color DFS**: Color vertices WHITE(0) = unvisited, GRAY(1) = in recursion stack (entered but not exited), BLACK(2) = fully processed. A back edge to a GRAY vertex means cycle in directed graphs. This is the standard cycle detection approach.",
      "Cycle detection differs for directed vs undirected. In **undirected**: cycle exists if we visit an already-visited node that's NOT the parent. In **directed**: use 3-color — back edge to GRAY node means cycle.",
      "**Applications**: Cycle detection, topological sort (vertices in descending order of exit time), connected/strongly connected components (Tarjan's, Kosaraju's), bridges & articulation points, path finding, flood fill, counting islands.",
      "DFS vs BFS: DFS uses O(h) stack space where h = max depth (could be O(V)). DFS is preferred for: detecting cycles, topological sort, finding all paths, solving puzzles with backtracking.",
    ],
    keyPoints: [
      "DFS uses Stack (LIFO) — recursion is an implicit stack",
      "Back edge to an ancestor = cycle detected (undirected: back edge to non-parent)",
      "For directed cycle detection, use 3-color: WHITE/GRAY/BLACK",
      "Entry/exit times: u is ancestor of v iff tin[u] < tin[v] AND tout[u] > tout[v]",
      "DFS tree classifies edges: tree, back (both graphs), forward, cross (directed only)",
      "Topological sort = vertices in descending order of DFS exit time",
      "Time: O(V+E) — each vertex and edge visited once",
      "Grid DFS: mark cell as visited by changing its value (e.g., '1' → '0')",
    ],
    tip: "For grid-based DFS problems (like Number of Islands), you often don't need a separate visited array — just modify the grid itself (e.g., sink '1' to '0'). This saves space and simplifies the code.",
    warning: "Be careful with DFS recursion depth! Java's default stack size is ~512KB, allowing roughly 5000-10000 recursive calls. For large graphs (V > 10000), use iterative DFS with an explicit stack, or increase stack size with -Xss flag.",
    code: [
      {
        title: "DFS — All Key Applications",
        language: "java",
        content: `import java.util.*;

public class DFS {
    
    static int timer = 0;
    
    // ==================== BASIC DFS ====================
    
    public static void dfs(List<List<Integer>> adj, int node, boolean[] visited) {
        visited[node] = true;
        System.out.print(node + " ");
        
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfs(adj, neighbor, visited);
            }
        }
    }
    
    // ==================== CYCLE DETECTION ====================
    
    // Undirected graph — cycle exists if we visit an already-visited node
    // that is NOT the parent (to avoid false positives on tree edges)
    public static boolean hasCycleUndirected(List<List<Integer>> adj, int V) {
        boolean[] visited = new boolean[V];
        for (int i = 0; i < V; i++) {
            if (!visited[i] && dfsCycleUndirected(adj, i, -1, visited))
                return true;
        }
        return false;
    }
    
    private static boolean dfsCycleUndirected(List<List<Integer>> adj, int node,
                                               int parent, boolean[] visited) {
        visited[node] = true;
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                if (dfsCycleUndirected(adj, neighbor, node, visited)) return true;
            } else if (neighbor != parent) {
                return true; // Back edge — cycle found!
            }
        }
        return false;
    }
    
    // Directed graph — uses 3-color: WHITE(0), GRAY(1=in-stack), BLACK(2=done)
    public static boolean hasCycleDirected(List<List<Integer>> adj, int V) {
        int[] color = new int[V]; // 0=unvisited, 1=in stack, 2=done
        for (int i = 0; i < V; i++) {
            if (color[i] == 0 && dfsCycleDirected(adj, i, color))
                return true;
        }
        return false;
    }
    
    private static boolean dfsCycleDirected(List<List<Integer>> adj, int node, int[] color) {
        color[node] = 1; // Mark as being processed (in recursion stack)
        for (int neighbor : adj.get(node)) {
            if (color[neighbor] == 1) return true;   // Back edge — cycle!
            if (color[neighbor] == 0 && dfsCycleDirected(adj, neighbor, color))
                return true;
        }
        color[node] = 2; // Mark as fully processed
        return false;
    }
    
    // ==================== CONNECTED COMPONENTS ====================
    
    public static int countComponents(List<List<Integer>> adj, int V) {
        boolean[] visited = new boolean[V];
        int components = 0;
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(adj, i, visited);
                components++;
            }
        }
        return components;
    }
    
    // ==================== FLOOD FILL ====================
    
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig != color) fill(image, sr, sc, orig, color);
        return image;
    }
    
    private static void fill(int[][] img, int r, int c, int orig, int newColor) {
        if (r < 0 || r >= img.length || c < 0 || c >= img[0].length) return;
        if (img[r][c] != orig) return;
        img[r][c] = newColor;
        fill(img, r+1, c, orig, newColor);
        fill(img, r-1, c, orig, newColor);
        fill(img, r, c+1, orig, newColor);
        fill(img, r, c-1, orig, newColor);
    }
    
    // ==================== NUMBER OF ISLANDS ====================
    
    public static int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    sinkIsland(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    
    private static void sinkIsland(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0'; // Sink this cell
        sinkIsland(grid, r+1, c); sinkIsland(grid, r-1, c);
        sinkIsland(grid, r, c+1); sinkIsland(grid, r, c-1);
    }
}`,
      },
    ],
  },
  {
    id: "graph-dijkstra",
    title: "Dijkstra's Algorithm",
    difficulty: "Hard",
    timeComplexity: "O((V + E) log V) with priority queue",
    spaceComplexity: "O(V + E)",
    theory: [
      "Dijkstra finds shortest paths from a single source to all other vertices in a weighted graph with NON-NEGATIVE edge weights. It's the most important shortest path algorithm in competitive programming.",
      "Core idea (greedy): Always process the unvisited vertex with the smallest known distance. Once a vertex is processed, its distance is final — it can never be improved. This greedy choice works because all edge weights are non-negative.",
      "Why it fails with negative weights: If an edge has weight -5, a vertex we already 'finalized' could be reached through this negative edge with a smaller total distance. The greedy assumption breaks. Example: A→B (weight 1), A→C (weight 3), C→B (weight -5). Dijkstra finalizes B with distance 1, but the actual shortest path is A→C→B = -2.",
      "Uses a min-heap (priority queue) to efficiently get the next vertex to process. With a binary heap, complexity is O((V + E) log V). With a Fibonacci heap: O(E + V log V), but Fibonacci heaps are rarely used in practice due to high constant factor.",
      "The 'lazy deletion' trick: Instead of decreasing key in the priority queue (which Java's PriorityQueue doesn't support), just add a new entry. When we poll a vertex with a distance larger than the known best, skip it (stale entry). This is the standard competitive programming approach.",
      "Dijkstra on grids: Very common in CP! Treat each cell as a node with 4 neighbors (up/down/left/right). Edge weight = cost to enter the neighbor cell. Use PQ with {cost, row, col}. This handles weighted grids efficiently.",
    ],
    keyPoints: [
      "Only works with NON-NEGATIVE edge weights — this is the key constraint",
      "Greedy: once a vertex is finalized (popped from PQ), its distance is optimal",
      "Skip stale entries: if d > dist[u] when we pop, skip (lazy deletion)",
      "Java PQ: use Comparator.comparingInt(a -> a[0]) for min-heap on distance",
      "For dense graphs (E ≈ V²), Dijkstra with adjacency matrix is O(V²) — sometimes better",
      "Common mistake: not skipping stale entries → TLE or wrong answers",
    ],
    tip: "In competitive programming, always use the 'lazy deletion' variant of Dijkstra: push new {dist, vertex} pairs and skip stale ones. Never try to remove old entries from the PQ — it's O(n) per removal.",
    note: "If the problem has edge weights 0 and 1 only, use 0-1 BFS with a deque instead of Dijkstra — it's O(V+E) instead of O((V+E) log V). Push 0-weight edges to front, 1-weight to back.",
    code: [
      {
        title: "Dijkstra — Standard & Optimized",
        language: "java",
        content: `import java.util.*;

public class Dijkstra {
    
    // Standard Dijkstra with Priority Queue
    // adj: adjacency list of [neighbor, weight] pairs
    public static int[] dijkstra(List<List<int[]>> adj, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        // Min-heap: [distance, vertex]
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, src});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0], u = curr[1];
            
            if (d > dist[u]) continue; // Outdated entry — skip
            
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }
        return dist;
    }
    
    // Dijkstra with path reconstruction
    public static List<Integer> shortestPath(List<List<int[]>> adj, int src, int dst, int V) {
        int[] dist = new int[V];
        int[] prev = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        Arrays.fill(prev, -1);
        dist[src] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, src});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0], u = curr[1];
            if (d > dist[u]) continue;
            if (u == dst) break; // Found destination
            
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    prev[v] = u;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }
        
        // Reconstruct path
        List<Integer> path = new ArrayList<>();
        for (int v = dst; v != -1; v = prev[v]) path.add(v);
        Collections.reverse(path);
        return dist[dst] == Integer.MAX_VALUE ? new ArrayList<>() : path;
    }
    
    // Dijkstra on grid — common in competitive programming
    public static int minCostPath(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        dist[0][0] = grid[0][0];
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{grid[0][0], 0, 0});
        
        int[] dr = {0,0,1,-1};
        int[] dc = {1,-1,0,0};
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int cost = curr[0], r = curr[1], c = curr[2];
            if (cost > dist[r][c]) continue;
            
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int newCost = dist[r][c] + grid[nr][nc];
                    if (newCost < dist[nr][nc]) {
                        dist[nr][nc] = newCost;
                        pq.offer(new int[]{newCost, nr, nc});
                    }
                }
            }
        }
        return dist[m-1][n-1];
    }
}`,
      },
    ],
  },
  {
    id: "graph-floyd",
    title: "Bellman-Ford & Floyd-Warshall",
    difficulty: "Hard",
    timeComplexity: "Bellman-Ford: O(VE) | Floyd-Warshall: O(V³)",
    spaceComplexity: "O(V) | O(V²)",
    theory: [
      "Bellman-Ford handles negative edge weights and detects negative cycles. It works by relaxing ALL edges V-1 times. Why V-1? Because the shortest path between any two vertices has at most V-1 edges (in a graph with V vertices and no negative cycles).",
      "Relaxation: For each edge (u, v, w), if dist[u] + w < dist[v], update dist[v]. After iteration k, all shortest paths using at most k edges are correct. After V-1 iterations, ALL shortest paths are finalized.",
      "Negative cycle detection: After V-1 relaxation rounds, do one more round. If ANY edge can still be relaxed, a negative cycle exists — the distance can be decreased infinitely. This is how Bellman-Ford detects negative cycles.",
      "When to use Bellman-Ford vs Dijkstra: Use Bellman-Ford when edges can have negative weights, or when you need to detect negative cycles. Use Dijkstra when all weights are non-negative (it's faster: O((V+E)logV) vs O(VE)).",
      "Floyd-Warshall finds ALL-PAIRS shortest paths in O(V³). It answers: 'What is the shortest distance between EVERY pair of vertices?' Unlike Dijkstra (single-source), Floyd-Warshall gives the complete distance matrix.",
      "Floyd-Warshall DP insight: dist[i][j][k] = shortest path from i to j using only vertices 0..k as intermediates. For each vertex k, we decide: does the shortest path from i to j go through k? dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).",
      "Floyd-Warshall handles negative weights but NOT negative cycles. To detect negative cycles: check if dist[i][i] < 0 for any vertex i after the algorithm completes.",
    ],
    keyPoints: [
      "Bellman-Ford: O(VE) — slower than Dijkstra but handles negative weights",
      "V-1 iterations suffice because shortest paths have at most V-1 edges",
      "Extra iteration (V-th) detects negative cycles — if anything relaxes, cycle exists",
      "Floyd-Warshall: O(V³) — practical only for small graphs (V ≤ 500)",
      "Floyd-Warshall loop order must be: k (intermediate) → i (source) → j (destination)",
      "Use Floyd-Warshall when you need distances between ALL pairs, V is small",
    ],
    tip: "SPFA (Shortest Path Faster Algorithm) is an optimization of Bellman-Ford using a queue. It's faster in practice (often O(E)) but has the same worst-case O(VE). Very popular in competitive programming.",
    warning: "Floyd-Warshall loop order is critical! The outer loop MUST be the intermediate vertex k. If you put i or j as the outer loop, the algorithm gives wrong answers because dependencies aren't satisfied.",
    code: [
      {
        title: "Bellman-Ford & Floyd-Warshall",
        language: "java",
        content: `import java.util.*;

public class AllPairsShortestPath {
    
    // ==================== BELLMAN-FORD ====================
    
    public static int[] bellmanFord(int V, int[][] edges, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        // Relax all edges V-1 times
        for (int i = 0; i < V - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        
        // Check for negative cycles (V-th relaxation)
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                System.out.println("Negative cycle detected!");
                return null;
            }
        }
        return dist;
    }
    
    // ==================== FLOYD-WARSHALL ====================
    
    static final int INF = Integer.MAX_VALUE / 2;
    
    public static int[][] floydWarshall(int[][] graph, int V) {
        int[][] dist = new int[V][V];
        
        // Initialize: dist[i][j] = direct edge weight (or INF if no edge)
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                dist[i][j] = graph[i][j];
            }
        }
        
        // Try each vertex as intermediate node
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    // If path through k is shorter
                    if (dist[i][k] != INF && dist[k][j] != INF
                            && dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        
        // Detect negative cycles: dist[i][i] < 0 means i is in a negative cycle
        for (int i = 0; i < V; i++) {
            if (dist[i][i] < 0) {
                System.out.println("Negative cycle exists!");
                return null;
            }
        }
        return dist;
    }
    
    public static void main(String[] args) {
        // Bellman-Ford example
        int[][] edges = {{0,1,4},{0,2,5},{1,3,-3},{2,1,2},{3,2,1}};
        int[] dist = bellmanFord(4, edges, 0);
        if (dist != null) System.out.println("Bellman-Ford: " + Arrays.toString(dist));
        
        // Floyd-Warshall example
        int[][] graph = {
            {0,   3,   INF, 5  },
            {2,   0,   INF, 4  },
            {INF, 1,   0,   INF},
            {INF, INF, 2,   0  }
        };
        int[][] all = floydWarshall(graph, 4);
        System.out.println("\nAll-pairs shortest paths:");
        for (int[] row : all) System.out.println(Arrays.toString(row));
    }
}`,
      },
    ],
  },
  {
    id: "graph-mst",
    title: "Minimum Spanning Tree",
    difficulty: "Hard",
    timeComplexity: "Kruskal: O(E log E) | Prim: O((V+E) log V)",
    spaceComplexity: "O(V + E)",
    theory: [
      "A Minimum Spanning Tree (MST) of a weighted undirected graph is a subset of edges that connects ALL vertices with the minimum possible total edge weight. It has exactly V-1 edges and no cycles — it's a tree.",
      "MST is guaranteed to exist if the graph is connected. If the graph has multiple components, each component has its own MST (together forming a Minimum Spanning Forest).",
      "Kruskal's Algorithm: Sort all edges by weight. Iterate through edges in ascending order. For each edge, if it connects two different components (checked via Union-Find), add it to the MST. Skip edges that would create a cycle. Time: O(E log E) due to sorting.",
      "Prim's Algorithm: Start from any vertex. Maintain a set of vertices in the MST. At each step, add the minimum weight edge that connects a vertex in the MST to a vertex outside the MST. Uses a priority queue. Time: O((V+E) log V). Better for dense graphs.",
      "When to use which: Kruskal's is simpler and better for sparse graphs (E ≈ V). Prim's is better for dense graphs (E ≈ V²). In competitive programming, Kruskal's with Union-Find is used 90% of the time because it's easier to code.",
      "MST has a special property: the maximum weight edge on the unique path between any two vertices in the MST is minimized. This is the 'minimax path' property — useful in many problems.",
      "MST applications: Network design (minimum cost to connect all cities), clustering (remove k-1 heaviest edges to get k clusters), Steiner tree approximation, bottleneck spanning tree.",
    ],
    keyPoints: [
      "MST has exactly V-1 edges and connects all V vertices",
      "Kruskal's: sort edges + Union-Find — O(E log E)",
      "Prim's: priority queue from a starting vertex — O((V+E) log V)",
      "Cut property: the minimum weight edge crossing any cut belongs to the MST",
      "If all edge weights are distinct, the MST is unique",
      "Second-best MST: try replacing each MST edge with the best non-MST edge",
    ],
    tip: "In competitive programming, always use Kruskal's with Union-Find. It's the simplest to code and handles most MST problems. Only switch to Prim's if the graph is very dense (V² edges) and you need better performance.",
    code: [
      {
        title: "Kruskal's & Prim's MST",
        language: "java",
        content: `import java.util.*;

public class MinimumSpanningTree {
    
    // ==================== UNION-FIND (DSU) ====================
    
    static int[] parent, rank;
    
    static void init(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    static int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]); // Path compression
        return parent[x];
    }
    
    static boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false; // Same component — would form cycle
        if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
    
    // ==================== KRUSKAL'S ALGORITHM ====================
    
    public static int kruskal(int V, int[][] edges) {
        // Sort edges by weight
        Arrays.sort(edges, Comparator.comparingInt(e -> e[2]));
        init(V);
        
        int mstWeight = 0, edgesUsed = 0;
        List<int[]> mstEdges = new ArrayList<>();
        
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (union(u, v)) {       // Doesn't form cycle
                mstWeight += w;
                mstEdges.add(edge);
                edgesUsed++;
                if (edgesUsed == V - 1) break; // MST has V-1 edges
            }
        }
        
        System.out.println("MST Edges (Kruskal):");
        for (int[] e : mstEdges)
            System.out.printf("  %d -- %d (weight %d)%n", e[0], e[1], e[2]);
        return mstWeight;
    }
    
    // ==================== PRIM'S ALGORITHM ====================
    
    public static int prims(List<List<int[]>> adj, int V) {
        boolean[] inMST = new boolean[V];
        int[] key = new int[V]; // Min weight edge to connect vertex to MST
        Arrays.fill(key, Integer.MAX_VALUE);
        key[0] = 0;
        
        // Min-heap: [weight, vertex]
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, 0});
        int mstWeight = 0;
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int w = curr[0], u = curr[1];
            
            if (inMST[u]) continue;
            inMST[u] = true;
            mstWeight += w;
            
            for (int[] edge : adj.get(u)) {
                int v = edge[0], weight = edge[1];
                if (!inMST[v] && weight < key[v]) {
                    key[v] = weight;
                    pq.offer(new int[]{key[v], v});
                }
            }
        }
        return mstWeight;
    }
    
    public static void main(String[] args) {
        int[][] edges = {{0,1,10},{0,2,6},{0,3,5},{1,3,15},{2,3,4}};
        System.out.println("MST Weight (Kruskal): " + kruskal(4, edges)); // 19
    }
}`,
      },
    ],
  },
  {
    id: "graph-topo",
    title: "Topological Sort & SCC",
    difficulty: "Hard",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    theory: [
      "Topological Sort: Linear ordering of vertices in a DAG (Directed Acyclic Graph) such that for every directed edge u→v, u appears before v in the ordering. Think of it as a valid order to complete tasks with dependencies.",
      "Topological sort only exists for DAGs (Directed Acyclic Graphs). If the graph has a cycle, no valid ordering exists — a cycle means A depends on B, B depends on C, C depends on A, which is impossible to resolve.",
      "Two approaches: (1) Kahn's Algorithm (BFS-based): Start with all nodes having in-degree 0, process them, reduce in-degrees of neighbors, add new 0-in-degree nodes. If all nodes processed → valid topo sort. If not → cycle exists. (2) DFS-based: Run DFS, push nodes to stack when finished (post-order). Reverse gives topo sort.",
      "Kahn's vs DFS topo sort: Kahn's naturally detects cycles (if processed nodes < V). Kahn's gives lexicographically smallest order if you use a min-heap. DFS-based is simpler to code but doesn't directly detect cycles.",
      "Classic applications: Course scheduling (prerequisites), build systems (Makefile), task scheduling, compilation order, dependency resolution in package managers.",
      "Strongly Connected Components (SCC): Maximal sets of vertices where every vertex is reachable from every other via directed paths. SCCs partition a directed graph. Think of 'groups of mutual friends' in a social network.",
      "Kosaraju's: Two DFS passes — (1) DFS on original graph, record finish order, (2) DFS on reversed graph in reverse finish order. Each DFS tree in pass 2 is one SCC. Tarjan's: Single DFS pass using disc[] and low[] values — more efficient.",
    ],
    keyPoints: [
      "Topological sort ONLY exists for DAGs — no cycles allowed",
      "Kahn's: BFS with in-degree tracking, naturally detects cycles",
      "DFS topo sort: post-order DFS, then reverse the order",
      "If Kahn's processes fewer than V nodes, the graph has a cycle",
      "Use min-heap in Kahn's for lexicographically smallest topo order",
      "Course Schedule = check if topo sort exists = check if DAG",
    ],
    tip: "For 'Course Schedule' type problems: if you just need to check if valid ordering exists, Kahn's is easiest — just check if the result has all V nodes. If you need the actual ordering, both approaches work.",
    note: "Topological sort is not unique — a DAG can have many valid orderings. For example, if A→C and B→C, both [A,B,C] and [B,A,C] are valid.",
    code: [
      {
        title: "Topological Sort & Kosaraju's SCC",
        language: "java",
        content: `import java.util.*;

public class TopoSortSCC {
    
    // ==================== KAHN'S ALGORITHM (BFS Topo Sort) ====================
    
    public static List<Integer> kahnTopoSort(List<List<Integer>> adj, int V) {
        int[] inDegree = new int[V];
        for (int u = 0; u < V; u++)
            for (int v : adj.get(u)) inDegree[v]++;
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++)
            if (inDegree[i] == 0) queue.offer(i);
        
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            for (int v : adj.get(u)) {
                inDegree[v]--;
                if (inDegree[v] == 0) queue.offer(v);
            }
        }
        
        if (order.size() != V) {
            System.out.println("Cycle detected — no topological order!");
            return new ArrayList<>();
        }
        return order;
    }
    
    // DFS-based Topo Sort
    public static List<Integer> dfsTopoSort(List<List<Integer>> adj, int V) {
        boolean[] visited = new boolean[V];
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int i = 0; i < V; i++)
            if (!visited[i]) toposDFS(adj, i, visited, stack);
        
        List<Integer> result = new ArrayList<>(stack);
        return result;
    }
    
    private static void toposDFS(List<List<Integer>> adj, int u, boolean[] visited, Deque<Integer> stack) {
        visited[u] = true;
        for (int v : adj.get(u))
            if (!visited[v]) toposDFS(adj, v, visited, stack);
        stack.push(u); // Add AFTER all descendants (post-order)
    }
    
    // ==================== KOSARAJU'S SCC ====================
    
    public static List<List<Integer>> kosarajuSCC(List<List<Integer>> adj, int V) {
        // Step 1: DFS on original graph, push to stack by finish time
        boolean[] visited = new boolean[V];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < V; i++)
            if (!visited[i]) dfsFirst(adj, i, visited, stack);
        
        // Step 2: Build reversed graph
        List<List<Integer>> revAdj = new ArrayList<>();
        for (int i = 0; i < V; i++) revAdj.add(new ArrayList<>());
        for (int u = 0; u < V; u++)
            for (int v : adj.get(u)) revAdj.get(v).add(u);
        
        // Step 3: DFS on reversed graph in stack order
        Arrays.fill(visited, false);
        List<List<Integer>> sccs = new ArrayList<>();
        
        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (!visited[node]) {
                List<Integer> scc = new ArrayList<>();
                dfsSecond(revAdj, node, visited, scc);
                sccs.add(scc);
            }
        }
        return sccs;
    }
    
    private static void dfsFirst(List<List<Integer>> adj, int u, boolean[] visited, Deque<Integer> stack) {
        visited[u] = true;
        for (int v : adj.get(u)) if (!visited[v]) dfsFirst(adj, v, visited, stack);
        stack.push(u);
    }
    
    private static void dfsSecond(List<List<Integer>> adj, int u, boolean[] visited, List<Integer> scc) {
        visited[u] = true;
        scc.add(u);
        for (int v : adj.get(u)) if (!visited[v]) dfsSecond(adj, v, visited, scc);
    }
    
    // Course Schedule (classic topo sort application)
    public static boolean canFinishCourses(int n, int[][] prereqs) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] p : prereqs) adj.get(p[1]).add(p[0]);
        return kahnTopoSort(adj, n).size() == n;
    }
    
    public static void main(String[] args) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < 6; i++) adj.add(new ArrayList<>());
        adj.get(5).add(2); adj.get(5).add(0);
        adj.get(4).add(0); adj.get(4).add(1);
        adj.get(2).add(3); adj.get(3).add(1);
        
        System.out.println("Topological Order: " + kahnTopoSort(adj, 6));
        System.out.println("Can finish 2 courses [[1,0]]: " + canFinishCourses(2, new int[][]{{1,0}}));
    }
}`,
      },
    ],
  },
  {
    id: "graph-dsu",
    title: "Union-Find (DSU)",
    difficulty: "Medium",
    timeComplexity: "O(α(n)) per operation — nearly O(1)",
    spaceComplexity: "O(n)",
    theory: [
      "Disjoint Set Union (DSU), also called Union-Find, is a data structure that tracks elements partitioned into non-overlapping sets. It supports two operations: Find (which set does element x belong to?) and Union (merge the sets containing x and y).",
      "Without optimizations, both operations can be O(n) in the worst case (a long chain). Two optimizations make it nearly O(1): Path Compression and Union by Rank.",
      "Path Compression: When calling find(x), make every node on the path point directly to the root. This flattens the tree, so future find operations on these nodes are O(1). Implementation: parent[x] = find(parent[x]) — one line of code!",
      "Union by Rank/Size: Always attach the shorter/smaller tree under the root of the taller/larger tree. This keeps trees balanced and limits height to O(log n). Combined with path compression, amortized time per operation is O(α(n)) ≈ O(1).",
      "α(n) is the inverse Ackermann function, which grows incredibly slowly. For all practical purposes (n < 10^80), α(n) ≤ 4. So DSU operations are effectively constant time.",
      "Applications: Kruskal's MST (check if adding an edge creates a cycle), detecting cycles in undirected graphs, counting connected components, offline connectivity queries, dynamic connectivity, and many competitive programming problems.",
    ],
    keyPoints: [
      "Two operations: find(x) returns root, union(x,y) merges sets",
      "Path compression: parent[x] = find(parent[x]) — one line, huge speedup",
      "Union by rank: attach smaller tree under larger — keeps trees balanced",
      "Both optimizations together: amortized O(α(n)) ≈ O(1) per operation",
      "Track component count: decrement on each successful union",
      "Track component size: size[root] += size[other] during union",
    ],
    tip: "Always implement BOTH path compression AND union by rank. Path compression alone gives amortized O(log n). Union by rank alone gives O(log n). Together they give O(α(n)) ≈ O(1). It's free performance!",
    code: [
      {
        title: "DSU — Full Implementation & Applications",
        language: "java",
        content: `public class DSU {
    int[] parent, rank, size;
    int components;
    
    DSU(int n) {
        parent = new int[n]; rank = new int[n]; size = new int[n];
        components = n;
        for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
    }
    
    // Path compression — O(α(n)) amortized
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    // Union by rank
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
        parent[py] = px;
        size[px] += size[py];
        if (rank[px] == rank[py]) rank[px]++;
        components--;
        return true;
    }
    
    boolean connected(int x, int y) { return find(x) == find(y); }
    int getSize(int x) { return size[find(x)]; }
    
    // Application: Number of Provinces
    public static int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        DSU dsu = new DSU(n);
        for (int i = 0; i < n; i++)
            for (int j = i+1; j < n; j++)
                if (isConnected[i][j] == 1) dsu.union(i, j);
        return dsu.components;
    }
    
    // Application: Redundant Connection (detect first cycle-forming edge)
    public static int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        DSU dsu = new DSU(n + 1);
        for (int[] edge : edges)
            if (!dsu.union(edge[0], edge[1])) return edge;
        return new int[]{};
    }
    
    public static void main(String[] args) {
        DSU dsu = new DSU(5);
        dsu.union(0, 1); dsu.union(1, 2); dsu.union(3, 4);
        System.out.println("Components: " + dsu.components); // 2
        System.out.println("0 and 2 connected? " + dsu.connected(0, 2)); // true
        System.out.println("0 and 3 connected? " + dsu.connected(0, 3)); // false
    }
}`,
      },
    ],
  },
  {
    id: "graph-scc",
    title: "Strongly Connected Components",
    difficulty: "Expert",
    timeComplexity: "O(V + E) — Tarjan's / Kosaraju's",
    spaceComplexity: "O(V)",
    theory: [
      "A Strongly Connected Component (SCC) is a maximal subgraph where every vertex can reach every other vertex. SCCs partition a directed graph.",
      "Kosaraju's Algorithm: Two DFS passes. (1) DFS on original graph, record finish order. (2) DFS on transposed graph in reverse finish order — each DFS tree is one SCC.",
      "Tarjan's Algorithm: Single DFS pass using discovery time (disc) and low-link values. A node u is root of an SCC when low[u] == disc[u]. Uses an explicit stack.",
      "Condensation Graph: Replace each SCC with a single node — the result is a DAG. Used to solve problems on cyclic graphs by reducing to DAG problems.",
      "Applications: Finding cycles in dependencies, 2-SAT problems, deadlock detection, compiler optimizations.",
    ],
    keyPoints: [
      "Tarjan's is preferred in competitive programming (single pass, no graph reversal)",
      "The condensation DAG can be processed with topological sort",
      "Every single node in a DAG is its own SCC",
      "2-SAT problem reduces to finding SCCs — solved in O(V+E)",
    ],
    code: [
      {
        title: "Tarjan's SCC — Single Pass O(V+E)",
        language: "java",
        content: `import java.util.*;

public class TarjanSCC {
    
    private int timer = 0;
    private int[] disc, low;
    private boolean[] onStack;
    private Deque<Integer> stack;
    private List<List<Integer>> sccs;
    
    public List<List<Integer>> findSCCs(List<List<Integer>> adj, int V) {
        disc = new int[V];
        low = new int[V];
        onStack = new boolean[V];
        stack = new ArrayDeque<>();
        sccs = new ArrayList<>();
        Arrays.fill(disc, -1); // -1 = unvisited
        
        for (int i = 0; i < V; i++)
            if (disc[i] == -1) dfs(adj, i);
        
        return sccs;
    }
    
    private void dfs(List<List<Integer>> adj, int u) {
        disc[u] = low[u] = timer++;
        stack.push(u);
        onStack[u] = true;
        
        for (int v : adj.get(u)) {
            if (disc[v] == -1) {
                dfs(adj, v);
                low[u] = Math.min(low[u], low[v]); // Propagate low-link up
            } else if (onStack[v]) {
                // v is in the current DFS stack — back edge within same SCC
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        
        // u is root of an SCC if low[u] == disc[u]
        if (low[u] == disc[u]) {
            List<Integer> scc = new ArrayList<>();
            while (true) {
                int w = stack.pop();
                onStack[w] = false;
                scc.add(w);
                if (w == u) break;
            }
            sccs.add(scc);
        }
    }
    
    // ==================== CONDENSATION DAG ====================
    // Build DAG of SCCs (each SCC is one node)
    
    public static List<List<Integer>> buildCondensationDAG(
            List<List<Integer>> adj, List<List<Integer>> sccs, int V) {
        
        int[] comp = new int[V]; // comp[v] = SCC index of vertex v
        for (int i = 0; i < sccs.size(); i++)
            for (int v : sccs.get(i)) comp[v] = i;
        
        int n = sccs.size();
        Set<Long> seen = new HashSet<>();
        List<List<Integer>> dag = new ArrayList<>();
        for (int i = 0; i < n; i++) dag.add(new ArrayList<>());
        
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) {
                int cu = comp[u], cv = comp[v];
                if (cu != cv) { // Edge between different SCCs
                    long key = (long) cu * n + cv;
                    if (seen.add(key)) dag.get(cu).add(cv);
                }
            }
        }
        return dag;
    }
    
    // ==================== 2-SAT USING SCC ====================
    // 2-SAT: Boolean formula with clauses of exactly 2 literals (a OR b)
    // Satisfiability check in O(V+E) using Tarjan's SCC
    
    public static boolean twoSAT(int n, int[][] clauses) {
        // 2n nodes: x_i = 2i, NOT x_i = 2i+1
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < 2 * n; i++) adj.add(new ArrayList<>());
        
        for (int[] clause : clauses) {
            // Clause: a OR b  → (NOT a → b) AND (NOT b → a)
            int a = clause[0], b = clause[1]; // Positive = 2i, Negative = 2i+1
            adj.get(a ^ 1).add(b);  // NOT a implies b
            adj.get(b ^ 1).add(a);  // NOT b implies a
        }
        
        TarjanSCC tarjan = new TarjanSCC();
        List<List<Integer>> sccs = tarjan.findSCCs(adj, 2 * n);
        
        int[] comp = new int[2 * n];
        for (int i = 0; i < sccs.size(); i++)
            for (int v : sccs.get(i)) comp[v] = i;
        
        // Formula is satisfiable iff no variable and its negation are in the same SCC
        for (int i = 0; i < n; i++) {
            if (comp[2 * i] == comp[2 * i + 1]) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        // Graph: 0→1→2→0 (SCC), 1→3→4→3 (SCC: 3,4), 2→4
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < 5; i++) adj.add(new ArrayList<>());
        adj.get(0).add(1); adj.get(1).add(2); adj.get(2).add(0); // SCC: {0,1,2}
        adj.get(1).add(3); adj.get(3).add(4); adj.get(4).add(3); // SCC: {3,4}
        adj.get(2).add(4);
        
        TarjanSCC tarjan = new TarjanSCC();
        List<List<Integer>> sccs = tarjan.findSCCs(adj, 5);
        System.out.println("SCCs found: " + sccs.size()); // 3
        for (int i = 0; i < sccs.size(); i++)
            System.out.println("SCC " + i + ": " + sccs.get(i));
    }
}`,
      },
    ],
  },
  {
    id: "graph-bridges",
    title: "Bridges & Articulation Points",
    difficulty: "Expert",
    timeComplexity: "O(V + E) — Tarjan's algorithm",
    spaceComplexity: "O(V)",
    theory: [
      "Bridge: An edge whose removal disconnects the graph. Critical in network reliability — a bridge is a single point of failure.",
      "Articulation Point (Cut Vertex): A vertex whose removal disconnects the graph.",
      "Tarjan's Algorithm: Uses DFS with discovery time (disc) and low value (low). low[u] = minimum disc reachable from subtree rooted at u.",
      "Bridge condition: Edge (u,v) is a bridge if low[v] > disc[u] (v can't reach u or earlier without using edge u-v).",
      "Articulation point condition: u is AP if (1) u is root with 2+ children, OR (2) u is non-root and has child v where low[v] >= disc[u].",
    ],
    code: [
      {
        title: "Bridges & Articulation Points — Tarjan's",
        language: "java",
        content: `import java.util.*;

public class BridgesAPs {
    
    static int timer;
    static int[] disc, low;
    static boolean[] visited, isAP;
    static List<int[]> bridges;
    
    public static void findBridgesAndAPs(List<List<Integer>> adj, int V) {
        timer = 0;
        disc = new int[V]; low = new int[V];
        visited = new boolean[V]; isAP = new boolean[V];
        bridges = new ArrayList<>();
        Arrays.fill(disc, -1);
        
        for (int i = 0; i < V; i++)
            if (!visited[i]) dfs(adj, i, -1);
        
        System.out.println("Bridges:");
        for (int[] b : bridges) System.out.println("  " + b[0] + " -- " + b[1]);
        
        System.out.print("Articulation Points: ");
        for (int i = 0; i < V; i++) if (isAP[i]) System.out.print(i + " ");
        System.out.println();
    }
    
    private static void dfs(List<List<Integer>> adj, int u, int parent) {
        visited[u] = true;
        disc[u] = low[u] = timer++;
        int childCount = 0;
        
        for (int v : adj.get(u)) {
            if (v == parent) continue; // Skip the edge we came from
            
            if (visited[v]) {
                // Back edge: update low[u] (can reach v without tree edge)
                low[u] = Math.min(low[u], disc[v]);
            } else {
                childCount++;
                dfs(adj, v, u);
                low[u] = Math.min(low[u], low[v]);
                
                // BRIDGE condition: low[v] > disc[u]
                if (low[v] > disc[u]) bridges.add(new int[]{u, v});
                
                // ARTICULATION POINT conditions:
                // Case 1: u is root and has 2+ children
                if (parent == -1 && childCount > 1) isAP[u] = true;
                // Case 2: u is non-root and low[v] >= disc[u]
                if (parent != -1 && low[v] >= disc[u]) isAP[u] = true;
            }
        }
    }
    
    // Tarjan's for SCC (single pass)
    static Deque<Integer> sccStack;
    static boolean[] onStack;
    static List<List<Integer>> sccs;
    
    public static List<List<Integer>> tarjanSCC(List<List<Integer>> adj, int V) {
        disc = new int[V]; low = new int[V];
        visited = new boolean[V]; onStack = new boolean[V];
        sccStack = new ArrayDeque<>(); sccs = new ArrayList<>();
        timer = 0;
        Arrays.fill(disc, -1);
        
        for (int i = 0; i < V; i++)
            if (disc[i] == -1) tarjanDFS(adj, i);
        
        return sccs;
    }
    
    private static void tarjanDFS(List<List<Integer>> adj, int u) {
        disc[u] = low[u] = timer++;
        sccStack.push(u); onStack[u] = true;
        
        for (int v : adj.get(u)) {
            if (disc[v] == -1) {
                tarjanDFS(adj, v);
                low[u] = Math.min(low[u], low[v]);
            } else if (onStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        
        // u is root of an SCC if low[u] == disc[u]
        if (low[u] == disc[u]) {
            List<Integer> scc = new ArrayList<>();
            while (true) {
                int w = sccStack.pop();
                onStack[w] = false;
                scc.add(w);
                if (w == u) break;
            }
            sccs.add(scc);
        }
    }
    
    public static void main(String[] args) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < 5; i++) adj.add(new ArrayList<>());
        // Build graph: 0-1-2-0 (triangle), 1-3, 3-4
        adj.get(0).add(1); adj.get(1).add(0);
        adj.get(1).add(2); adj.get(2).add(1);
        adj.get(0).add(2); adj.get(2).add(0);
        adj.get(1).add(3); adj.get(3).add(1);
        adj.get(3).add(4); adj.get(4).add(3);
        
        findBridgesAndAPs(adj, 5);
        // Bridges: 1--3, 3--4
        // APs: 1, 3
    }
}`,
      },
    ],
  },
  {
    id: "graph-euler-tour",
    title: "Euler Tour & DFS Order",
    difficulty: "Hard",
    timeComplexity: "O(V + E) — single DFS pass",
    spaceComplexity: "O(V)",
    theory: [
      "Euler Tour (also called DFS order or tree flattening) linearizes a tree into an array, enabling subtree queries with range data structures (segment trees, BIT).",
      "The tour records each node twice: tin[v] (entry time) and tout[v] (exit time). The subtree of v corresponds to the interval [tin[v], tout[v]] in the tour array.",
      "This allows converting subtree queries into range queries, and path queries (combined with LCA) into a constant number of range queries.",
      "Applications: subtree sum/update queries, LCA via RMQ (Range Minimum Query), offline tree queries, handling tree updates efficiently.",
      "DFS Order variants: (1) Discovery order — just the entry times. (2) Full Euler tour — record on both entry and exit. (3) Edge-based tour — record each edge traversal.",
    ],
    keyPoints: [
      "tin[v] = when DFS first visits v; tout[v] = when DFS leaves v",
      "Subtree of v = indices [tin[v], tout[v]] in the tour",
      "Subtree queries reduce to range queries on the flattened array",
      "LCA(u,v) can be found as RMQ on Euler tour depths",
      "Combined with segment tree for O(log n) subtree updates/queries",
    ],
    code: [
      {
        title: "Euler Tour — Flattening Tree for Range Queries",
        language: "java",
        content: `import java.util.*;

public class EulerTour {
    
    static int timer = 0;
    static int[] tin, tout, flat, depth;
    static List<Integer>[] adj;
    
    // ==================== BUILD EULER TOUR ====================
    
    @SuppressWarnings("unchecked")
    public static void buildTour(int n, int[][] edges, int root) {
        adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        
        tin = new int[n];
        tout = new int[n];
        flat = new int[n]; // flat[i] = node at position i in the tour
        depth = new int[n];
        timer = 0;
        
        dfs(root, -1, 0);
    }
    
    private static void dfs(int v, int parent, int d) {
        depth[v] = d;
        tin[v] = timer;
        flat[timer] = v;
        timer++;
        
        for (int u : adj[v]) {
            if (u != parent) dfs(u, v, d + 1);
        }
        tout[v] = timer - 1; // Last index in subtree
    }
    
    // ==================== SUBTREE QUERIES USING BIT ====================
    // Support: update value of node v, query sum of subtree of v
    
    static long[] bit;
    static int bitSize;
    
    static void initBIT(int n) {
        bitSize = n;
        bit = new long[n + 1];
    }
    
    static void bitUpdate(int i, long delta) {
        for (i++; i <= bitSize; i += i & (-i)) bit[i] += delta;
    }
    
    static long bitQuery(int i) {
        long sum = 0;
        for (i++; i > 0; i -= i & (-i)) sum += bit[i];
        return sum;
    }
    
    static long bitRangeQuery(int l, int r) {
        return bitQuery(r) - (l > 0 ? bitQuery(l - 1) : 0);
    }
    
    // Update node value
    public static void updateNode(int node, long value) {
        bitUpdate(tin[node], value);
    }
    
    // Query subtree sum
    public static long querySubtree(int node) {
        return bitRangeQuery(tin[node], tout[node]);
    }
    
    public static void main(String[] args) {
        //       0
        //      / \\
        //     1   2
        //    / \\   \\
        //   3   4   5
        int n = 6;
        int[][] edges = {{0,1},{0,2},{1,3},{1,4},{2,5}};
        buildTour(n, edges, 0);
        
        System.out.println("Euler Tour (tin): " + Arrays.toString(tin));
        System.out.println("Euler Tour (tout): " + Arrays.toString(tout));
        System.out.println("Flat array: " + Arrays.toString(flat));
        // tin:  [0, 1, 4, 2, 3, 5]
        // tout: [5, 3, 5, 2, 3, 5]
        // Subtree of node 1 = indices [1, 3] = {1, 3, 4}
        
        // Subtree query demo
        initBIT(n);
        int[] values = {10, 20, 30, 40, 50, 60};
        for (int i = 0; i < n; i++) updateNode(i, values[i]);
        
        System.out.println("Sum subtree(0): " + querySubtree(0)); // 210
        System.out.println("Sum subtree(1): " + querySubtree(1)); // 110 (20+40+50)
        System.out.println("Sum subtree(2): " + querySubtree(2)); // 90 (30+60)
    }
}`,
      },
      {
        title: "LCA via Euler Tour + Sparse Table (RMQ)",
        language: "java",
        content: `import java.util.*;

public class LCAEulerTour {
    
    // ==================== LCA VIA RMQ ON EULER TOUR ====================
    // Build: O(n log n) | Query: O(1)
    // Record (depth, node) for each step of DFS (both entry and backtrack)
    
    static int[] first;     // first[v] = first occurrence of v in euler tour
    static int[] eulerTour; // sequence of nodes visited
    static int[] eulerDepth;// depth at each position in tour
    static int[][] sparse;  // sparse table for RMQ
    static int tourLen;
    
    @SuppressWarnings("unchecked")
    public static void build(int n, int[][] edges, int root) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        
        first = new int[n];
        eulerTour = new int[2 * n];
        eulerDepth = new int[2 * n];
        Arrays.fill(first, -1);
        tourLen = 0;
        
        dfs(adj, root, -1, 0);
        buildSparseTable();
    }
    
    private static void dfs(List<Integer>[] adj, int v, int parent, int d) {
        eulerTour[tourLen] = v;
        eulerDepth[tourLen] = d;
        if (first[v] == -1) first[v] = tourLen;
        tourLen++;
        
        for (int u : adj[v]) {
            if (u != parent) {
                dfs(adj, u, v, d + 1);
                eulerTour[tourLen] = v; // Record backtrack
                eulerDepth[tourLen] = d;
                tourLen++;
            }
        }
    }
    
    private static void buildSparseTable() {
        int LOG = (int)(Math.log(tourLen) / Math.log(2)) + 1;
        sparse = new int[LOG][tourLen];
        
        for (int i = 0; i < tourLen; i++) sparse[0][i] = i;
        
        for (int k = 1; k < LOG; k++) {
            for (int i = 0; i + (1 << k) <= tourLen; i++) {
                int l = sparse[k-1][i];
                int r = sparse[k-1][i + (1 << (k-1))];
                sparse[k][i] = eulerDepth[l] < eulerDepth[r] ? l : r;
            }
        }
    }
    
    public static int lca(int u, int v) {
        int l = first[u], r = first[v];
        if (l > r) { int t = l; l = r; r = t; }
        
        int k = (int)(Math.log(r - l + 1) / Math.log(2));
        int left = sparse[k][l];
        int right = sparse[k][r - (1 << k) + 1];
        int minIdx = eulerDepth[left] < eulerDepth[right] ? left : right;
        return eulerTour[minIdx];
    }
    
    public static void main(String[] args) {
        int n = 7;
        int[][] edges = {{0,1},{0,2},{1,3},{1,4},{2,5},{2,6}};
        build(n, edges, 0);
        
        System.out.println("LCA(3,4) = " + lca(3, 4)); // 1
        System.out.println("LCA(3,5) = " + lca(3, 5)); // 0
        System.out.println("LCA(5,6) = " + lca(5, 6)); // 2
        System.out.println("LCA(4,6) = " + lca(4, 6)); // 0
    }
}`,
      },
    ],
  },
  {
    id: "graph-hld",
    title: "Heavy-Light Decomposition",
    difficulty: "Expert",
    timeComplexity: "O(n) build | O(log²n) per path query",
    spaceComplexity: "O(n)",
    theory: [
      "Heavy-Light Decomposition (HLD) decomposes a tree into chains (heavy paths) so that any root-to-leaf path crosses at most O(log n) chains.",
      "Heavy edge: the edge from a node to its child with the largest subtree. All other edges are light edges. Heavy edges form chains.",
      "Key property: any path from u to v passes through at most O(log n) light edges → O(log n) chain switches.",
      "Combined with a segment tree on the flattened chains, HLD supports path queries (sum, max, min) and path updates in O(log² n).",
      "Applications: path sum/max queries, path updates, LCA (as a byproduct), competitive programming tree problems.",
    ],
    keyPoints: [
      "Heavy child = child with largest subtree size",
      "Any root-to-leaf path has ≤ O(log n) light edges",
      "Flatten chains into a segment tree for O(log² n) path queries",
      "head[v] = top node of v's heavy chain (used to 'jump' between chains)",
      "pos[v] = position of v in the segment tree array",
    ],
    code: [
      {
        title: "Heavy-Light Decomposition — Full Implementation",
        language: "java",
        content: `import java.util.*;

public class HLD {
    
    static int[] parent, depth, heavy, head, pos, subSize;
    static List<Integer>[] adj;
    static int curPos;
    
    // Segment tree for path queries
    static long[] seg;
    static int segSize;
    
    @SuppressWarnings("unchecked")
    public static void build(int n, int[][] edges, int root) {
        adj = new ArrayList[n];
        parent = new int[n]; depth = new int[n];
        heavy = new int[n]; head = new int[n];
        pos = new int[n]; subSize = new int[n];
        Arrays.fill(heavy, -1);
        
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        
        // Step 1: Compute subtree sizes and find heavy children
        computeSize(root, -1, 0);
        
        // Step 2: Decompose into chains
        curPos = 0;
        decompose(root, root);
        
        // Step 3: Build segment tree
        segSize = n;
        seg = new long[4 * n];
    }
    
    private static void computeSize(int v, int par, int d) {
        parent[v] = par;
        depth[v] = d;
        subSize[v] = 1;
        int maxChild = 0;
        
        for (int u : adj[v]) {
            if (u == par) continue;
            computeSize(u, v, d + 1);
            subSize[v] += subSize[u];
            if (subSize[u] > maxChild) {
                maxChild = subSize[u];
                heavy[v] = u; // Heavy child = largest subtree
            }
        }
    }
    
    private static void decompose(int v, int h) {
        head[v] = h;    // Top of current chain
        pos[v] = curPos++; // Position in segment tree
        
        // First, continue the heavy chain
        if (heavy[v] != -1) {
            decompose(heavy[v], h); // Same chain head
        }
        
        // Then, start new chains for light children
        for (int u : adj[v]) {
            if (u != parent[v] && u != heavy[v]) {
                decompose(u, u); // New chain starts at u
            }
        }
    }
    
    // ==================== SEGMENT TREE ====================
    
    static void segUpdate(int node, int lo, int hi, int idx, long val) {
        if (lo == hi) { seg[node] = val; return; }
        int mid = (lo + hi) / 2;
        if (idx <= mid) segUpdate(2*node, lo, mid, idx, val);
        else segUpdate(2*node+1, mid+1, hi, idx, val);
        seg[node] = seg[2*node] + seg[2*node+1];
    }
    
    static long segQuery(int node, int lo, int hi, int l, int r) {
        if (r < lo || hi < l) return 0;
        if (l <= lo && hi <= r) return seg[node];
        int mid = (lo + hi) / 2;
        return segQuery(2*node, lo, mid, l, r)
             + segQuery(2*node+1, mid+1, hi, l, r);
    }
    
    // ==================== PATH OPERATIONS ====================
    
    // Update value of node v
    public static void update(int v, long val) {
        segUpdate(1, 0, segSize - 1, pos[v], val);
    }
    
    // Query sum on path from u to v
    public static long pathQuery(int u, int v) {
        long result = 0;
        
        // Move up chain by chain until u and v are on the same chain
        while (head[u] != head[v]) {
            // Always jump the deeper chain
            if (depth[head[u]] < depth[head[v]]) { int t = u; u = v; v = t; }
            
            // Query from u to top of u's chain
            result += segQuery(1, 0, segSize - 1, pos[head[u]], pos[u]);
            u = parent[head[u]]; // Jump to parent of chain head
        }
        
        // Now u and v are on the same chain — query the range between them
        if (depth[u] > depth[v]) { int t = u; u = v; v = t; }
        result += segQuery(1, 0, segSize - 1, pos[u], pos[v]);
        
        return result;
    }
    
    // LCA as a byproduct of HLD
    public static int lca(int u, int v) {
        while (head[u] != head[v]) {
            if (depth[head[u]] < depth[head[v]]) { int t = u; u = v; v = t; }
            u = parent[head[u]];
        }
        return depth[u] < depth[v] ? u : v;
    }
    
    public static void main(String[] args) {
        //       0
        //      / \\
        //     1   2
        //    / \\   \\
        //   3   4   5
        //  /
        // 6
        int n = 7;
        int[][] edges = {{0,1},{0,2},{1,3},{1,4},{2,5},{3,6}};
        build(n, edges, 0);
        
        // Assign values to nodes
        int[] values = {1, 2, 3, 4, 5, 6, 7};
        for (int i = 0; i < n; i++) update(i, values[i]);
        
        System.out.println("Path sum 6→5: " + pathQuery(6, 5));
        // 6→3→1→0→2→5 = 7+4+2+1+3+6 = 23
        System.out.println("Path sum 3→4: " + pathQuery(3, 4));
        // 3→1→4 = 4+2+5 = 11
        System.out.println("LCA(6,4) = " + lca(6, 4)); // 1
        System.out.println("LCA(6,5) = " + lca(6, 5)); // 0
    }
}`,
      },
    ],
    table: {
      headers: ["Operation", "Time Complexity", "Technique"],
      rows: [
        ["Build HLD", "O(n)", "Two DFS passes"],
        ["Path query (sum/max)", "O(log² n)", "O(log n) chains × O(log n) seg tree"],
        ["Path update", "O(log² n)", "Same as query"],
        ["Subtree query", "O(log n)", "Single range in seg tree"],
        ["LCA", "O(log n)", "Chain jumping"],
      ],
    },
  },
  {
    id: "graph-matching",
    title: "Bipartite Matching",
    difficulty: "Expert",
    timeComplexity: "Hopcroft-Karp: O(E√V) | Hungarian: O(n³)",
    spaceComplexity: "O(V + E)",
    theory: [
      "Bipartite Matching: Given a bipartite graph (two disjoint sets L and R with edges only between them), find a maximum matching — largest set of edges with no shared endpoints.",
      "Hungarian Algorithm: Augmenting path-based method. Start with empty matching, repeatedly find augmenting paths (alternating between unmatched and matched edges). O(VE) for simple version.",
      "Hopcroft-Karp: Finds augmenting paths in phases using BFS (to find shortest augmenting paths) then DFS (to find multiple disjoint augmenting paths). O(E√V).",
      "König's Theorem: In bipartite graphs, max matching = min vertex cover. This connects matching to covering problems.",
      "Applications: job assignment, course scheduling, stable matching, network routing, image segmentation.",
    ],
    keyPoints: [
      "Augmenting path: alternating path from unmatched L to unmatched R",
      "Hopcroft-Karp is fastest: O(E√V) using BFS + DFS phases",
      "Max matching = Min vertex cover in bipartite graphs (König's theorem)",
      "Can reduce to max-flow: add source→L edges, R→sink edges, all capacity 1",
      "Hungarian method for weighted matching (assignment problem) in O(n³)",
    ],
    code: [
      {
        title: "Hopcroft-Karp Maximum Bipartite Matching",
        language: "java",
        content: `import java.util.*;

public class HopcroftKarp {
    
    // ==================== HOPCROFT-KARP ====================
    // O(E√V) — fastest bipartite matching algorithm
    // L = left vertices [0, n), R = right vertices [0, m)
    
    static final int INF = Integer.MAX_VALUE;
    static List<Integer>[] adj; // adj[u] = list of right vertices u can match to
    static int[] matchL, matchR; // matchL[u] = right vertex matched to u (-1 if unmatched)
    static int[] dist; // BFS distance of left vertices
    static int n, m; // n = |L|, m = |R|
    
    @SuppressWarnings("unchecked")
    public static int maxMatching(int leftSize, int rightSize, int[][] edges) {
        n = leftSize;
        m = rightSize;
        adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) adj[e[0]].add(e[1]);
        
        matchL = new int[n];
        matchR = new int[m];
        dist = new int[n];
        Arrays.fill(matchL, -1);
        Arrays.fill(matchR, -1);
        
        int matching = 0;
        
        // Repeat: BFS to find shortest augmenting paths, then DFS to augment
        while (bfs()) {
            for (int u = 0; u < n; u++) {
                if (matchL[u] == -1) { // Start from unmatched left vertices
                    if (dfs(u)) matching++;
                }
            }
        }
        return matching;
    }
    
    // BFS: Find shortest augmenting path length
    private static boolean bfs() {
        Queue<Integer> queue = new LinkedList<>();
        
        for (int u = 0; u < n; u++) {
            if (matchL[u] == -1) {
                dist[u] = 0;
                queue.offer(u);
            } else {
                dist[u] = INF;
            }
        }
        
        boolean found = false;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (int v : adj[u]) {
                int next = matchR[v]; // Left vertex matched to right vertex v
                if (next == -1) {
                    found = true; // Found augmenting path
                } else if (dist[next] == INF) {
                    dist[next] = dist[u] + 1;
                    queue.offer(next);
                }
            }
        }
        return found;
    }
    
    // DFS: Augment along shortest paths
    private static boolean dfs(int u) {
        for (int v : adj[u]) {
            int next = matchR[v];
            if (next == -1 || (dist[next] == dist[u] + 1 && dfs(next))) {
                matchL[u] = v;
                matchR[v] = u;
                return true;
            }
        }
        dist[u] = INF; // Remove u from layered graph
        return false;
    }
    
    public static void main(String[] args) {
        // Left: 0,1,2,3 (workers)
        // Right: 0,1,2,3 (jobs)
        // Edges: worker -> jobs they can do
        int[][] edges = {
            {0, 0}, {0, 1},
            {1, 0}, {1, 2},
            {2, 1}, {2, 2},
            {3, 2}, {3, 3}
        };
        
        System.out.println("Max Matching: " + maxMatching(4, 4, edges)); // 4
        System.out.println("Matched pairs:");
        for (int i = 0; i < 4; i++) {
            System.out.println("  Worker " + i + " → Job " + matchL[i]);
        }
    }
}`,
      },
      {
        title: "Hungarian Algorithm — Weighted Bipartite Matching",
        language: "java",
        content: `import java.util.*;

public class Hungarian {
    
    // ==================== HUNGARIAN ALGORITHM ====================
    // O(n³) — Minimum cost perfect matching in weighted bipartite graph
    // Also called Kuhn-Munkres algorithm
    
    // cost[i][j] = cost of assigning worker i to job j
    // Returns minimum total cost and the assignment
    
    public static int[] minCostMatching(int[][] cost) {
        int n = cost.length;
        
        // u[i], v[j] = potentials (dual variables)
        int[] u = new int[n + 1], v = new int[n + 1];
        int[] match = new int[n + 1]; // match[j] = worker assigned to job j
        int[] way = new int[n + 1];   // way[j] = previous job in augmenting path
        Arrays.fill(match, 0);
        
        for (int i = 1; i <= n; i++) {
            int[] minv = new int[n + 1];
            boolean[] used = new boolean[n + 1];
            Arrays.fill(minv, Integer.MAX_VALUE);
            
            match[0] = i;
            int j0 = 0; // Virtual "unmatched" job
            
            do {
                used[j0] = true;
                int i0 = match[j0], j1 = 0;
                int delta = Integer.MAX_VALUE;
                
                for (int j = 1; j <= n; j++) {
                    if (used[j]) continue;
                    int cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
                    if (cur < minv[j]) {
                        minv[j] = cur;
                        way[j] = j0;
                    }
                    if (minv[j] < delta) {
                        delta = minv[j];
                        j1 = j;
                    }
                }
                
                // Update potentials
                for (int j = 0; j <= n; j++) {
                    if (used[j]) { u[match[j]] += delta; v[j] -= delta; }
                    else minv[j] -= delta;
                }
                
                j0 = j1;
            } while (match[j0] != 0);
            
            // Update matching along augmenting path
            do {
                int j1 = way[j0];
                match[j0] = match[j1];
                j0 = j1;
            } while (j0 != 0);
        }
        
        // Build result: result[i] = job assigned to worker i (0-indexed)
        int[] result = new int[n];
        for (int j = 1; j <= n; j++) {
            result[match[j] - 1] = j - 1;
        }
        return result;
    }
    
    public static void main(String[] args) {
        int[][] cost = {
            {9, 2, 7, 8},
            {6, 4, 3, 7},
            {5, 8, 1, 8},
            {7, 6, 9, 4}
        };
        
        int[] assignment = minCostMatching(cost);
        int totalCost = 0;
        System.out.println("Optimal Assignment:");
        for (int i = 0; i < assignment.length; i++) {
            System.out.println("  Worker " + i + " → Job " + assignment[i]
                + " (cost " + cost[i][assignment[i]] + ")");
            totalCost += cost[i][assignment[i]];
        }
        System.out.println("Total cost: " + totalCost); // 13
    }
}`,
      },
    ],
  },
  {
    id: "graph-mcmf",
    title: "Min-Cost Max-Flow",
    difficulty: "Expert",
    timeComplexity: "O(V × E × F) with SPFA | O(V²EF) with Bellman-Ford",
    spaceComplexity: "O(V + E)",
    theory: [
      "Min-Cost Max-Flow (MCMF) finds a maximum flow with minimum total cost in a network where each edge has both capacity and cost per unit of flow.",
      "The algorithm repeatedly finds the shortest (cheapest) augmenting path from source to sink using SPFA (Shortest Path Faster Algorithm) or Bellman-Ford, then pushes maximum flow along it.",
      "Unlike plain max-flow, MCMF considers edge costs — useful when we want the cheapest way to route maximum flow.",
      "Negative costs are supported (the graph may have negative cost edges), which is why SPFA/Bellman-Ford is used instead of Dijkstra.",
      "Applications: assignment problems (generalizes bipartite matching with costs), transportation problems, project selection, network design optimization.",
    ],
    keyPoints: [
      "Each edge has (capacity, cost): flow ≤ capacity, total cost = Σ flow × cost",
      "Residual edges have negative cost (sending flow back reduces cost)",
      "SPFA finds cheapest augmenting path — push max flow along it",
      "Converges when no more augmenting paths exist (max flow reached)",
      "Can solve weighted bipartite matching as a special case",
    ],
    code: [
      {
        title: "Min-Cost Max-Flow — SPFA-based Implementation",
        language: "java",
        content: `import java.util.*;

public class MinCostMaxFlow {
    
    // ==================== MCMF WITH SPFA ====================
    
    static final int INF = Integer.MAX_VALUE;
    
    static class Edge {
        int to, rev;
        int cap, cost;
        Edge(int to, int cap, int cost, int rev) {
            this.to = to; this.cap = cap; this.cost = cost; this.rev = rev;
        }
    }
    
    static List<Edge>[] graph;
    static int N;
    
    @SuppressWarnings("unchecked")
    public static void init(int n) {
        N = n;
        graph = new ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
    }
    
    public static void addEdge(int from, int to, int cap, int cost) {
        graph[from].add(new Edge(to, cap, cost, graph[to].size()));
        graph[to].add(new Edge(from, 0, -cost, graph[from].size() - 1)); // Reverse
    }
    
    // Returns {maxFlow, minCost}
    public static int[] mcmf(int source, int sink) {
        int totalFlow = 0, totalCost = 0;
        
        while (true) {
            // SPFA to find shortest (cheapest) path from source to sink
            int[] dist = new int[N];
            boolean[] inQueue = new boolean[N];
            int[] prevNode = new int[N], prevEdge = new int[N];
            Arrays.fill(dist, INF);
            dist[source] = 0;
            
            Queue<Integer> queue = new LinkedList<>();
            queue.offer(source);
            inQueue[source] = true;
            
            while (!queue.isEmpty()) {
                int u = queue.poll();
                inQueue[u] = false;
                
                for (int i = 0; i < graph[u].size(); i++) {
                    Edge e = graph[u].get(i);
                    if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) {
                        dist[e.to] = dist[u] + e.cost;
                        prevNode[e.to] = u;
                        prevEdge[e.to] = i;
                        if (!inQueue[e.to]) {
                            queue.offer(e.to);
                            inQueue[e.to] = true;
                        }
                    }
                }
            }
            
            if (dist[sink] == INF) break; // No more augmenting paths
            
            // Find bottleneck (max flow we can push)
            int flow = INF;
            for (int v = sink; v != source; v = prevNode[v]) {
                flow = Math.min(flow, graph[prevNode[v]].get(prevEdge[v]).cap);
            }
            
            // Push flow along the path
            for (int v = sink; v != source; v = prevNode[v]) {
                Edge e = graph[prevNode[v]].get(prevEdge[v]);
                e.cap -= flow;
                graph[e.to].get(e.rev).cap += flow;
            }
            
            totalFlow += flow;
            totalCost += flow * dist[sink];
        }
        
        return new int[]{totalFlow, totalCost};
    }
    
    public static void main(String[] args) {
        // Example: 4 nodes, source=0, sink=3
        init(4);
        addEdge(0, 1, 3, 1);  // cap=3, cost=1
        addEdge(0, 2, 2, 5);  // cap=2, cost=5
        addEdge(1, 2, 1, 2);  // cap=1, cost=2
        addEdge(1, 3, 2, 3);  // cap=2, cost=3
        addEdge(2, 3, 3, 1);  // cap=3, cost=1
        
        int[] result = mcmf(0, 3);
        System.out.println("Max Flow: " + result[0]); // 4
        System.out.println("Min Cost: " + result[1]); // 18
        
        // Assignment problem as MCMF:
        // source → workers (cap=1, cost=0)
        // workers → jobs (cap=1, cost=assignment_cost)
        // jobs → sink (cap=1, cost=0)
    }
}`,
      },
    ],
  },
  {
    id: "graph-advanced",
    title: "Advanced Graph Algorithms",
    difficulty: "Expert",
    timeComplexity: "Varies by algorithm",
    spaceComplexity: "Varies by algorithm",
    theory: [
      "Advanced graph algorithms form the backbone of competitive programming. These include network flow, Euler paths, shortest path optimizations, and specialized tree algorithms.",
      "Network Flow (Max-Flow): Find maximum flow from source to sink in a flow network. Ford-Fulkerson (DFS augmenting paths), Edmonds-Karp (BFS, O(VE²)), Dinic's Algorithm (O(V²E)) — fastest in practice.",
      "Euler Path & Circuit: An Euler path visits every EDGE exactly once. An Euler circuit is a closed Euler path. Euler circuit exists iff all vertices have even degree (undirected) or in-degree == out-degree (directed).",
      "LCA (Lowest Common Ancestor): The deepest node that is an ancestor of both u and v. Binary Lifting: precompute 2^k ancestors for each node — O(n log n) build, O(log n) query.",
      "0-1 BFS: When edge weights are only 0 or 1, use a deque instead of a priority queue — O(V+E) instead of O((V+E)log V).",
      "Centroid Decomposition: Decompose tree into centroids. Each node appears in O(log n) centroid subtrees — enables O(n log n) or O(n log² n) tree path queries.",
    ],
    keyPoints: [
      "Max-Flow = Min-Cut (Ford-Fulkerson theorem) — fundamental duality",
      "Dinic's algorithm: O(V²E) general, O(E√V) for unit capacity graphs",
      "Binary lifting for LCA requires O(n log n) space",
      "0-1 BFS: push weight-0 edges to front, weight-1 to back of deque",
      "Centroid decomposition is key for tree path problems with updates",
    ],
    code: [
      {
        title: "Dinic's Max Flow Algorithm",
        language: "java",
        content: `import java.util.*;

public class MaxFlow {
    
    // ==================== DINIC'S ALGORITHM ====================
    // O(V²E) general | O(E√V) for unit capacity | O(E√E) bipartite matching
    
    static final int INF = Integer.MAX_VALUE;
    
    static class Edge {
        int to, rev;
        long cap;
        Edge(int to, long cap, int rev) {
            this.to = to; this.cap = cap; this.rev = rev;
        }
    }
    
    static List<Edge>[] graph;
    static int[] level, iter;
    static int N;
    
    @SuppressWarnings("unchecked")
    public static void init(int n) {
        N = n;
        graph = new ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
        level = new int[n];
        iter = new int[n];
    }
    
    public static void addEdge(int from, int to, long cap) {
        graph[from].add(new Edge(to, cap, graph[to].size()));
        graph[to].add(new Edge(from, 0, graph[from].size() - 1)); // Reverse edge (cap=0)
    }
    
    // BFS to build level graph (layered graph)
    private static boolean bfs(int s, int t) {
        Arrays.fill(level, -1);
        Queue<Integer> q = new LinkedList<>();
        level[s] = 0;
        q.offer(s);
        while (!q.isEmpty()) {
            int v = q.poll();
            for (Edge e : graph[v]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[v] + 1;
                    q.offer(e.to);
                }
            }
        }
        return level[t] >= 0; // Return true if sink is reachable
    }
    
    // DFS to send flow along augmenting paths
    private static long dfs(int v, int t, long f) {
        if (v == t) return f;
        for (; iter[v] < graph[v].size(); iter[v]++) {
            Edge e = graph[v].get(iter[v]);
            if (e.cap > 0 && level[v] < level[e.to]) {
                long d = dfs(e.to, t, Math.min(f, e.cap));
                if (d > 0) {
                    e.cap -= d;
                    graph[e.to].get(e.rev).cap += d; // Update reverse edge
                    return d;
                }
            }
        }
        return 0;
    }
    
    public static long maxflow(int s, int t) {
        long flow = 0;
        while (bfs(s, t)) {          // Build level graph
            Arrays.fill(iter, 0);
            long f;
            while ((f = dfs(s, t, INF)) > 0) flow += f; // Push until no augmenting path
        }
        return flow;
    }
    
    public static void main(String[] args) {
        // Example: source=0, sink=5, 6 nodes
        init(6);
        addEdge(0, 1, 10); addEdge(0, 2, 10);
        addEdge(1, 3, 4);  addEdge(1, 4, 8);  addEdge(1, 2, 2);
        addEdge(2, 4, 9);
        addEdge(3, 5, 10); addEdge(4, 3, 6);  addEdge(4, 5, 10);
        
        System.out.println("Max Flow: " + maxflow(0, 5)); // 19
    }
}`,
      },
      {
        title: "LCA with Binary Lifting",
        language: "java",
        content: `import java.util.*;

public class LCA {
    
    // ==================== BINARY LIFTING LCA ====================
    // Build: O(n log n) | Query: O(log n)
    // up[v][k] = 2^k-th ancestor of v
    
    static final int LOG = 20; // Supports trees with up to 2^20 nodes
    static int[][] up;
    static int[] depth;
    static List<Integer>[] adj;
    
    @SuppressWarnings("unchecked")
    public static void build(int n, int root, int[][] edges) {
        adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        
        up = new int[n][LOG];
        depth = new int[n];
        
        // Initialize: up[v][0] = parent of v (direct parent)
        dfs(root, -1, 0);
        
        // Fill binary lifting table
        for (int k = 1; k < LOG; k++)
            for (int v = 0; v < n; v++)
                up[v][k] = up[up[v][k-1]][k-1]; // 2^k ancestor = 2^(k-1) ancestor of 2^(k-1) ancestor
    }
    
    private static void dfs(int v, int parent, int d) {
        depth[v] = d;
        up[v][0] = (parent == -1) ? v : parent; // Root's parent is itself
        for (int u : adj[v])
            if (u != parent) dfs(u, v, d + 1);
    }
    
    public static int lca(int u, int v) {
        // Bring both nodes to same depth
        if (depth[u] < depth[v]) { int t = u; u = v; v = t; }
        
        int diff = depth[u] - depth[v];
        for (int k = 0; k < LOG; k++)
            if ((diff >> k & 1) == 1) u = up[u][k]; // Jump 2^k levels
        
        if (u == v) return u; // Same node — one is ancestor of other
        
        // Binary search for LCA: highest point where they're still different
        for (int k = LOG - 1; k >= 0; k--)
            if (up[u][k] != up[v][k]) {
                u = up[u][k];
                v = up[v][k];
            }
        
        return up[u][0]; // Parent of u (and v) is the LCA
    }
    
    // ==================== 0-1 BFS ====================
    // Shortest path when edge weights are only 0 or 1
    // Use deque: 0-weight edges → push front | 1-weight edges → push back
    
    public static int[] zeroOneBFS(List<List<int[]>> adj, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        Deque<Integer> deque = new ArrayDeque<>();
        deque.addFirst(src);
        
        while (!deque.isEmpty()) {
            int u = deque.pollFirst();
            
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    if (w == 0) deque.addFirst(v);  // 0-weight: add to front
                    else        deque.addLast(v);   // 1-weight: add to back
                }
            }
        }
        return dist;
    }
    
    public static void main(String[] args) {
        // Tree: 0-1-2-3-4-5 with branching
        int n = 7;
        int[][] edges = {{0,1},{0,2},{1,3},{1,4},{2,5},{2,6}};
        build(n, 0, edges);
        
        System.out.println("LCA(3,4) = " + lca(3, 4)); // 1
        System.out.println("LCA(3,5) = " + lca(3, 5)); // 0
        System.out.println("LCA(4,6) = " + lca(4, 6)); // 0
        System.out.println("depth[3] = " + depth[3]);  // 2
    }
}`,
      },
      {
        title: "Euler Path & Circuit — Hierholzer's Algorithm",
        language: "java",
        content: `import java.util.*;

public class EulerPath {
    
    // ==================== EULER PATH/CIRCUIT (Undirected) ====================
    // Euler Circuit: All vertices have even degree
    // Euler Path: Exactly 2 vertices have odd degree (start and end)
    
    public static List<Integer> eulerPath(int V, List<List<Integer>> adj) {
        int[] degree = new int[V];
        for (int u = 0; u < V; u++) degree[u] = adj.get(u).size();
        
        // Check conditions
        int oddCount = 0, start = 0;
        for (int i = 0; i < V; i++) {
            if (degree[i] % 2 != 0) { oddCount++; start = i; }
        }
        if (oddCount != 0 && oddCount != 2) {
            System.out.println("No Euler path exists");
            return new ArrayList<>();
        }
        
        // Hierholzer's algorithm using iterative DFS
        int[] idx = new int[V]; // Current edge index for each vertex
        List<Integer>[] adjArr = new ArrayList[V];
        for (int i = 0; i < V; i++) adjArr[i] = new ArrayList<>(adj.get(i));
        
        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> path = new ArrayList<>();
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int u = stack.peek();
            if (idx[u] < adjArr[u].size()) {
                int v = adjArr[u].get(idx[u]++);
                // Remove reverse edge (undirected)
                adjArr[v].remove(Integer.valueOf(u));
                stack.push(v);
            } else {
                path.add(stack.pop()); // Dead end — add to path
            }
        }
        
        Collections.reverse(path);
        return path;
    }
    
    // ==================== DIRECTED EULER PATH ====================
    // Euler Circuit: in-degree == out-degree for all vertices
    // Euler Path: Exactly one vertex has out-degree - in-degree = 1 (start)
    //             Exactly one vertex has in-degree - out-degree = 1 (end)
    
    public static List<Integer> directedEulerPath(int V, List<List<Integer>> adj) {
        int[] inDeg = new int[V], outDeg = new int[V];
        for (int u = 0; u < V; u++) {
            outDeg[u] = adj.get(u).size();
            for (int v : adj.get(u)) inDeg[v]++;
        }
        
        int start = 0;
        for (int i = 0; i < V; i++) {
            if (outDeg[i] - inDeg[i] == 1) { start = i; break; }
            if (outDeg[i] > 0) start = i; // Fallback for circuit
        }
        
        int[] idx = new int[V];
        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> path = new ArrayList<>();
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int u = stack.peek();
            if (idx[u] < adj.get(u).size()) {
                stack.push(adj.get(u).get(idx[u]++));
            } else {
                path.add(stack.pop());
            }
        }
        
        Collections.reverse(path);
        return path;
    }
    
    // ==================== CENTROID DECOMPOSITION ====================
    // Preprocessing: O(n log n) | Query per centroid: O(log n)
    
    static int[] subtreeSize2, centroid;
    static boolean[] removed;
    static List<Integer>[] tree2;
    
    @SuppressWarnings("unchecked")
    public static void buildCentroidDecomp(int n, int[][] edges) {
        tree2 = new ArrayList[n];
        for (int i = 0; i < n; i++) tree2[i] = new ArrayList<>();
        for (int[] e : edges) { tree2[e[0]].add(e[1]); tree2[e[1]].add(e[0]); }
        subtreeSize2 = new int[n];
        removed = new boolean[n];
        centroid = new int[n]; // centroid[v] = centroid parent of v
        Arrays.fill(centroid, -1);
        
        decompose(0, -1, n);
    }
    
    private static void computeSize(int v, int p) {
        subtreeSize2[v] = 1;
        for (int u : tree2[v])
            if (u != p && !removed[u]) {
                computeSize(u, v);
                subtreeSize2[v] += subtreeSize2[u];
            }
    }
    
    private static int findCentroid(int v, int p, int treeSize) {
        for (int u : tree2[v])
            if (u != p && !removed[u] && subtreeSize2[u] > treeSize / 2)
                return findCentroid(u, v, treeSize);
        return v;
    }
    
    private static void decompose(int v, int parent, int treeSize) {
        computeSize(v, -1);
        int c = findCentroid(v, -1, treeSize);
        centroid[c] = parent;
        removed[c] = true;
        // Process queries centered at c here...
        for (int u : tree2[c])
            if (!removed[u]) decompose(u, c, subtreeSize2[u]);
    }
    
    public static void main(String[] args) {
        // Undirected graph for Euler circuit
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < 4; i++) adj.add(new ArrayList<>());
        // 0-1-2-3-0, 0-2 (all even degree)
        adj.get(0).add(1); adj.get(1).add(0);
        adj.get(1).add(2); adj.get(2).add(1);
        adj.get(2).add(3); adj.get(3).add(2);
        adj.get(3).add(0); adj.get(0).add(3);
        adj.get(0).add(2); adj.get(2).add(0);
        
        System.out.println("Euler Circuit: " + eulerPath(4, adj));
    }
}`,
      },
    ],
    table: {
      headers: ["Algorithm", "Time Complexity", "Space", "Use Case"],
      rows: [
        ["Dinic's Max Flow", "O(V²E)", "O(V+E)", "Max flow, bipartite matching"],
        ["Ford-Fulkerson (BFS)", "O(VE²)", "O(V+E)", "Simpler max flow"],
        ["Binary Lifting LCA", "O(n log n) build, O(log n) query", "O(n log n)", "LCA, kth ancestor"],
        ["Euler Path (Hierholzer)", "O(V+E)", "O(V+E)", "Route inspection, DNA assembly"],
        ["0-1 BFS", "O(V+E)", "O(V)", "0/1 weighted shortest paths"],
        ["Centroid Decomposition", "O(n log n)", "O(n log n)", "Tree path queries"],
      ],
    },
  },
];
