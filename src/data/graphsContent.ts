import { ContentSection } from "./recursionContent";

export const graphsContent: ContentSection[] = [
  {
    id: "graph-intro",
    title: "Graph Representation",
    difficulty: "Easy",
    theory: [
      "A Graph G = (V, E) consists of a set of Vertices (nodes) V and a set of Edges E connecting pairs of vertices. Graphs model networks, maps, dependencies, and countless real-world problems.",
      "Directed Graph (Digraph): Edges have direction — edge (u,v) goes FROM u TO v. Undirected Graph: Edges have no direction — edge {u,v} connects u and v symmetrically.",
      "Weighted Graph: Edges have associated weights/costs. Unweighted: all edges have equal weight (often 1).",
      "Three primary representations: Adjacency Matrix (O(V²) space, O(1) edge lookup), Adjacency List (O(V+E) space, efficient for sparse graphs), Edge List (O(E) space, simple for edge-centric algorithms).",
    ],
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
      "BFS explores vertices level by level using a queue (FIFO). It visits all neighbors of a vertex before moving to the next level.",
      "BFS guarantees the shortest path (in terms of number of edges) in an unweighted graph.",
      "Applications: Shortest path in unweighted graphs, level order traversal, connected components, bipartite checking, multi-source BFS.",
      "Multi-source BFS: Start BFS from multiple sources simultaneously. Used in problems like 'minimum distance from any 0' or 'rotting oranges'.",
    ],
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
      "DFS explores as deep as possible along each branch before backtracking. Uses a stack (implicit via recursion or explicit).",
      "DFS on a graph tracks: visited (to avoid cycles), discovery time, finish time — used for topological sort and SCC.",
      "Applications: Cycle detection, topological sort, connected/strongly connected components, bridges, articulation points, path finding.",
    ],
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
      "Dijkstra finds shortest paths from a single source to all other vertices in a weighted graph with NON-NEGATIVE edge weights.",
      "Uses a min-heap (priority queue) to always process the vertex with the current minimum distance — greedy approach.",
      "Cannot handle negative weights — use Bellman-Ford for that. Dijkstra with a Fibonacci heap achieves O(E + V log V).",
    ],
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
      "Bellman-Ford handles negative edge weights and detects negative cycles. Relaxes all edges V-1 times.",
      "If any edge can still be relaxed after V-1 iterations, a negative cycle exists.",
      "Floyd-Warshall finds ALL-PAIRS shortest paths in O(V³). Works with negative weights but not negative cycles.",
      "Floyd-Warshall DP: dist[i][j][k] = shortest path from i to j using only vertices 0..k as intermediates.",
    ],
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
      "A Minimum Spanning Tree (MST) of a weighted undirected graph spans all V vertices with V-1 edges having minimum total weight.",
      "Kruskal's Algorithm: Sort edges by weight, greedily add edges that don't form a cycle (use Union-Find to check). Best for sparse graphs.",
      "Prim's Algorithm: Greedily grow the MST from a starting vertex, always adding the minimum weight edge connecting tree to non-tree vertex. Best for dense graphs.",
      "MST applications: Network design, clustering, image segmentation, circuit design.",
    ],
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
      "Topological Sort: Linear ordering of vertices in a DAG (Directed Acyclic Graph) such that for every edge u→v, u appears before v.",
      "Two approaches: Kahn's Algorithm (BFS-based, uses in-degree) and DFS-based (post-order DFS, push to stack on finish).",
      "Strongly Connected Components (SCC): Maximal sets of vertices where every vertex is reachable from every other. Kosaraju's: two DFS passes. Tarjan's: single DFS pass.",
    ],
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
      "Disjoint Set Union (DSU) / Union-Find efficiently handles: finding which component a vertex belongs to, and merging two components.",
      "Two optimizations: Path Compression (make all nodes point directly to root) and Union by Rank/Size (always attach smaller tree under larger). Together give amortized O(α(n)) — essentially O(1).",
      "Applications: Kruskal's MST, detecting cycles, offline connectivity queries, number of components.",
    ],
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
];
