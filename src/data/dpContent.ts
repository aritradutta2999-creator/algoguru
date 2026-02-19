import { ContentSection } from "./recursionContent";

export const dpContent: ContentSection[] = [
  {
    id: "dp-intro",
    title: "DP Fundamentals",
    difficulty: "Medium",
    theory: [
      "Dynamic Programming is an optimization technique for problems with two key properties: (1) Optimal Substructure — optimal solution to the problem contains optimal solutions to subproblems; (2) Overlapping Subproblems — the same subproblems are solved multiple times.",
      "DP is NOT just about filling a table — it's about recognizing that the brute-force recursive solution recomputes the same states. DP eliminates this redundancy.",
      "Two approaches: Top-Down (Memoization) — start from the original problem, recurse, cache results; Bottom-Up (Tabulation) — solve smallest subproblems first, build up to the original problem.",
      "The DP thought process: (1) Define the state (what does dp[i] or dp[i][j] represent?), (2) Write the recurrence relation, (3) Identify base cases, (4) Determine iteration order.",
      "State definition is the hardest part. A good state captures everything needed to solve the subproblem without knowing how you got there (optimal substructure).",
    ],
    keyPoints: [
      "DP = Recursion + Memoization (or equivalently, smart iteration order)",
      "Define the state clearly: dp[i] = 'minimum cost to reach position i'",
      "Recurrence relation comes from the recursive solution",
      "Bottom-up avoids recursion overhead and stack overflow for large inputs",
      "Space optimization: often only the last 1-2 rows of the DP table are needed",
    ],
    code: [
      {
        title: "DP Thought Process — Step by Step",
        language: "java",
        content: `/**
 * PROBLEM: Climbing Stairs
 * You are climbing a staircase with n steps.
 * Each time you can either climb 1 or 2 steps.
 * In how many distinct ways can you climb to the top?
 */
public class ClimbingStairs {
    
    // STEP 1: Identify the state
    // dp[i] = number of distinct ways to climb to step i
    
    // STEP 2: Recurrence relation
    // To reach step i, you either came from step i-1 (1 step) or step i-2 (2 steps)
    // dp[i] = dp[i-1] + dp[i-2]
    
    // STEP 3: Base cases
    // dp[1] = 1 (only one way: take 1 step)
    // dp[2] = 2 (two ways: 1+1 or 2)
    
    // ---- APPROACH 1: Naive Recursion (Exponential - BAD) ----
    public static int climbNaive(int n) {
        if (n <= 2) return n;
        return climbNaive(n-1) + climbNaive(n-2); // OVERLAPPING SUBPROBLEMS!
    }
    
    // ---- APPROACH 2: Top-Down Memoization ----
    private static int[] memo;
    
    public static int climbMemo(int n) {
        memo = new int[n + 1];
        return solve(n);
    }
    
    private static int solve(int n) {
        if (n <= 2) return n;
        if (memo[n] != 0) return memo[n];    // Cache hit!
        memo[n] = solve(n-1) + solve(n-2);   // Cache miss — compute and store
        return memo[n];
    }
    
    // ---- APPROACH 3: Bottom-Up Tabulation ----
    public static int climbDP(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];  // Build up from base cases
        }
        return dp[n];
    }
    
    // ---- APPROACH 4: Space Optimized (only need last 2 values) ----
    public static int climbOptimal(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    public static void main(String[] args) {
        for (int n = 1; n <= 10; n++) {
            System.out.printf("n=%-2d → %d ways%n", n, climbOptimal(n));
        }
        /* Output: 1,2,3,5,8,13,21,34,55,89 — Fibonacci sequence! */
    }
}`,
      },
    ],
    table: {
      headers: ["Approach", "Time", "Space", "Overhead", "Best For"],
      rows: [
        ["Naive Recursion", "O(2^n)", "O(n) stack", "None", "Understanding only"],
        ["Memoization (Top-Down)", "O(n)", "O(n)", "Recursion overhead", "When order is complex"],
        ["Tabulation (Bottom-Up)", "O(n)", "O(n)", "Minimal", "Most DP problems"],
        ["Space Optimized", "O(n)", "O(1)", "Minimal", "When space matters"],
      ],
    },
  },
  {
    id: "dp-memoization",
    title: "Memoization (Top-Down)",
    difficulty: "Medium",
    timeComplexity: "O(n) — each state computed once",
    spaceComplexity: "O(n) for memo + O(n) recursion stack",
    theory: [
      "Memoization = Recursion + Caching. Write the natural recursive solution, then add a cache (HashMap or array) to store already-computed results.",
      "When the recursive function is called with the same parameters, return the cached result immediately — no recomputation.",
      "Top-down is often easier to write because you follow the problem's natural recursive structure without determining explicit iteration order.",
      "Use HashMap when the state space is sparse or keys are complex (strings, tuples). Use arrays when state is bounded integers (index, weight, etc.).",
      "Stack overflow risk: Java's default stack is limited. For very deep recursion or large inputs, prefer bottom-up tabulation.",
    ],
    keyPoints: [
      "memo[state] = -1 (or null) means 'not yet computed'",
      "Always check the cache before computing: if memo[i] != -1 return memo[i]",
      "Number of distinct states × work per state = total time complexity",
      "HashMap<String, Integer> for complex states, int[] for simple integer states",
    ],
    tip: "Convert any recursive solution to memoized in 3 steps: (1) Add a memo array, (2) Check cache at top, (3) Store result before returning.",
    code: [
      {
        title: "Top-Down Memoization — All Key Patterns",
        language: "java",
        content: `import java.util.*;

public class Memoization {
    
    // ==================== PATTERN 1: 1D MEMO ====================
    // Fibonacci — the textbook memoization example
    
    private static long[] fib_memo;
    
    public static long fib(int n) {
        fib_memo = new long[n + 1];
        Arrays.fill(fib_memo, -1);
        return fibHelper(n);
    }
    
    private static long fibHelper(int n) {
        if (n <= 1) return n;
        if (fib_memo[n] != -1) return fib_memo[n]; // Cache hit!
        fib_memo[n] = fibHelper(n - 1) + fibHelper(n - 2);
        return fib_memo[n];
    }
    
    // ==================== PATTERN 2: 2D MEMO ====================
    // Unique paths in grid — memo[row][col] = ways to reach (m-1, n-1)
    
    private static int[][] grid_memo;
    
    public static int uniquePaths(int m, int n) {
        grid_memo = new int[m][n];
        for (int[] row : grid_memo) Arrays.fill(row, -1);
        return pathsHelper(0, 0, m, n);
    }
    
    private static int pathsHelper(int r, int c, int m, int n) {
        if (r == m - 1 && c == n - 1) return 1;
        if (r >= m || c >= n) return 0;
        if (grid_memo[r][c] != -1) return grid_memo[r][c];
        grid_memo[r][c] = pathsHelper(r + 1, c, m, n)
                        + pathsHelper(r, c + 1, m, n);
        return grid_memo[r][c];
    }
    
    // ==================== PATTERN 3: HashMap MEMO ====================
    // Word Break: Can s be segmented using wordDict?
    
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        Map<Integer, Boolean> memo = new HashMap<>();
        return wbHelper(s, 0, dict, memo);
    }
    
    private static boolean wbHelper(String s, int start,
                                     Set<String> dict, Map<Integer, Boolean> memo) {
        if (start == s.length()) return true;
        if (memo.containsKey(start)) return memo.get(start);
        for (int end = start + 1; end <= s.length(); end++) {
            if (dict.contains(s.substring(start, end)) && wbHelper(s, end, dict, memo)) {
                return memo.put(start, true) != null || true;
            }
        }
        memo.put(start, false);
        return false;
    }
    
    // ==================== PATTERN 4: INTERVAL MEMO ====================
    // Burst Balloons — choose last balloon to burst in each interval
    
    private static int[][] balloon_memo;
    private static int[] b;
    
    public static int maxCoins(int[] nums) {
        int n = nums.length;
        b = new int[n + 2];
        b[0] = b[n + 1] = 1;
        for (int i = 0; i < n; i++) b[i + 1] = nums[i];
        balloon_memo = new int[n + 2][n + 2];
        for (int[] row : balloon_memo) Arrays.fill(row, -1);
        return burst(1, n);
    }
    
    private static int burst(int l, int r) {
        if (l > r) return 0;
        if (balloon_memo[l][r] != -1) return balloon_memo[l][r];
        int max = 0;
        for (int k = l; k <= r; k++) {
            int coins = b[l-1] * b[k] * b[r+1] + burst(l, k-1) + burst(k+1, r);
            max = Math.max(max, coins);
        }
        return balloon_memo[l][r] = max;
    }
    
    public static void main(String[] args) {
        System.out.println("Fib(50): " + fib(50));                    // 12586269025
        System.out.println("Unique paths 3x7: " + uniquePaths(3,7)); // 28
        System.out.println("Word break 'leetcode': " + wordBreak("leetcode", List.of("leet","code"))); // true
        System.out.println("Burst Balloons [3,1,5,8]: " + maxCoins(new int[]{3,1,5,8})); // 167
    }
}`,
      },
    ],
  },
  {
    id: "dp-tabulation",
    title: "Tabulation (Bottom-Up)",
    difficulty: "Medium",
    timeComplexity: "O(n) — same states, no recursion overhead",
    spaceComplexity: "O(n) → often reducible to O(1) or O(k)",
    theory: [
      "Tabulation fills the DP table iteratively starting from base cases and building up to the answer. No recursion — avoids stack overflow and has lower constant factor.",
      "The key challenge: determine the correct fill order so that whenever you compute dp[i], all values it depends on are already computed.",
      "For 1D DP: usually left-to-right. For 2D DP: row by row. For interval DP: by increasing interval length.",
      "Space optimization is much easier with tabulation — identify which previous values are needed and only keep those (rolling array technique).",
      "When converting from memoization: recursion parameters become table dimensions, base cases become initial values, recursive calls determine iteration order.",
    ],
    keyPoints: [
      "Tabulation order: always fill dependencies before dependents",
      "Rolling array: if dp[i] only depends on dp[i-1], use a single variable",
      "2D rolling array: if dp[i][j] only needs row i-1, use 2 rows instead of full table",
      "Tabulation preferred in production: no recursion overhead, easier to space-optimize",
    ],
    warning: "Common mistake: wrong iteration order — computing dp[i] before its dependencies are ready.",
    code: [
      {
        title: "Tabulation Patterns & Space Optimization",
        language: "java",
        content: `import java.util.*;

public class Tabulation {
    
    // ==================== PATTERN 1: GRID (forward fill) ====================
    // Min Path Sum — move right or down only
    
    public static int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dp = new int[m][n];
        dp[0][0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
        for (int i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        return dp[m-1][n-1];
    }
    
    // Space Optimized O(n): only keep one row at a time
    public static int minPathSumO1(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j-1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++)
                dp[j] = Math.min(dp[j], dp[j-1]) + grid[i][j];
        }
        return dp[n-1];
    }
    
    // ==================== PATTERN 2: INTERVAL DP ====================
    // Fill in order of increasing interval length
    // Palindromic Partitioning — min cuts to make all parts palindromes
    
    public static int minCutPalindrome(String s) {
        int n = s.length();
        boolean[][] isPalin = new boolean[n][n];
        for (int i = n-1; i >= 0; i--)
            for (int j = i; j < n; j++)
                isPalin[i][j] = s.charAt(i) == s.charAt(j)
                                && (j - i <= 2 || isPalin[i+1][j-1]);
        
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            if (isPalin[0][i]) { dp[i] = 0; continue; }
            dp[i] = i;
            for (int j = 1; j <= i; j++)
                if (isPalin[j][i]) dp[i] = Math.min(dp[i], dp[j-1] + 1);
        }
        return dp[n-1];
    }
    
    // ==================== PATTERN 3: STATE MACHINE ====================
    // Best Time to Buy/Sell Stock — at most k transactions
    
    public static int maxProfitK(int k, int[] prices) {
        int n = prices.length;
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++)
                if (prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];
            return profit;
        }
        int[] buy = new int[k + 1], sell = new int[k + 1];
        Arrays.fill(buy, Integer.MIN_VALUE);
        for (int price : prices)
            for (int t = k; t >= 1; t--) {
                sell[t] = Math.max(sell[t], buy[t] + price);
                buy[t]  = Math.max(buy[t], sell[t-1] - price);
            }
        return sell[k];
    }
    
    public static void main(String[] args) {
        int[][] grid = {{1,3,1},{1,5,1},{4,2,1}};
        System.out.println("Min path sum:  " + minPathSum(grid));  // 7
        System.out.println("Optimized:     " + minPathSumO1(grid)); // 7
        System.out.println("Min cuts 'aab': " + minCutPalindrome("aab")); // 1
        System.out.println("Max profit k=2 [2,4,1,7]: " + maxProfitK(2, new int[]{2,4,1,7})); // 7
    }
}`,
      },
    ],
  },
  {
    id: "dp-2d",
    title: "2D DP Problems",
    difficulty: "Hard",
    timeComplexity: "O(m × n) per problem",
    spaceComplexity: "O(m × n) → O(n) with rolling array",
    theory: [
      "2D DP uses a table where dp[i][j] represents the optimal value for a subproblem defined by two parameters — grid coordinates, indices into two strings, or item + capacity.",
      "Grid DP: dp[i][j] = optimal at cell (i,j). Transitions from adjacent cells. Common in path-finding, flood-fill, dungeon problems.",
      "Two-string DP: dp[i][j] = optimal for first i chars of s1 and first j chars of s2. Used in LCS, Edit Distance, pattern matching.",
      "Key insight: if dp[i][j] only depends on dp[i-1][*], keep only one row — O(n) instead of O(mn) space.",
    ],
    keyPoints: [
      "Initialize borders carefully: dp[0][j] and dp[i][0] are base cases",
      "Fill direction must match transition dependencies",
      "Dungeon-style: fill backwards when the answer depends on future cells",
      "Rolling array: save memory when only the previous row is needed",
    ],
    code: [
      {
        title: "Essential 2D DP Problems",
        language: "java",
        content: `import java.util.*;

public class TwoDDP {
    
    // ==================== UNIQUE PATHS WITH OBSTACLES ====================
    
    public static int uniquePathsObstacles(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        if (grid[0][0] == 1 || grid[m-1][n-1] == 1) return 0;
        int[][] dp = new int[m][n];
        dp[0][0] = 1;
        for (int i = 1; i < m; i++) dp[i][0] = (grid[i][0]==1) ? 0 : dp[i-1][0];
        for (int j = 1; j < n; j++) dp[0][j] = (grid[0][j]==1) ? 0 : dp[0][j-1];
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[i][j] = (grid[i][j]==1) ? 0 : dp[i-1][j] + dp[i][j-1];
        return dp[m-1][n-1];
    }
    
    // ==================== MAXIMAL SQUARE ====================
    // Largest square of all 1s
    // dp[i][j] = side of largest square ending at (i,j)
    // KEY: dp[i][j] = min(top, left, top-left) + 1
    
    public static int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length, maxSide = 0;
        int[][] dp = new int[m+1][n+1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                if (matrix[i-1][j-1] == '1') {
                    dp[i][j] = Math.min(dp[i-1][j],
                                Math.min(dp[i][j-1], dp[i-1][j-1])) + 1;
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
        return maxSide * maxSide;
    }
    
    // ==================== DUNGEON GAME ====================
    // Fill BACKWARDS — min health to traverse dungeon alive
    
    public static int calculateMinimumHP(int[][] dungeon) {
        int m = dungeon.length, n = dungeon[0].length;
        int[][] dp = new int[m+1][n+1];
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE);
        dp[m][n-1] = dp[m-1][n] = 1; // Sentinels
        for (int i = m-1; i >= 0; i--)
            for (int j = n-1; j >= 0; j--) {
                int need = Math.min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j];
                dp[i][j] = Math.max(need, 1);
            }
        return dp[0][0];
    }
    
    // ==================== WILDCARD MATCHING ====================
    // '?' = any single char, '*' = any sequence (including empty)
    
    public static boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m+1][n+1];
        dp[0][0] = true;
        for (int j = 1; j <= n; j++)
            if (p.charAt(j-1) == '*') dp[0][j] = dp[0][j-1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                char pc = p.charAt(j-1);
                if (pc == '*') dp[i][j] = dp[i][j-1] || dp[i-1][j];
                else dp[i][j] = (pc == '?' || pc == s.charAt(i-1)) && dp[i-1][j-1];
            }
        return dp[m][n];
    }
    
    // ==================== REGEX MATCHING ====================
    // '.' = any single char, '*' = zero or more of preceding element
    
    public static boolean regexMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m+1][n+1];
        dp[0][0] = true;
        for (int j = 2; j <= n; j += 2)
            if (p.charAt(j-1) == '*') dp[0][j] = dp[0][j-2];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                char sc = s.charAt(i-1), pc = p.charAt(j-1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j-2]; // Zero occurrences
                    if (p.charAt(j-2)=='.' || p.charAt(j-2)==sc)
                        dp[i][j] = dp[i][j] || dp[i-1][j];
                } else dp[i][j] = (pc=='.' || pc==sc) && dp[i-1][j-1];
            }
        return dp[m][n];
    }
    
    public static void main(String[] args) {
        System.out.println("Maximal Square: " + maximalSquare(new char[][]{
            {'1','0','1','0','0'},{'1','0','1','1','1'},
            {'1','1','1','1','1'},{'1','0','0','1','0'}})); // 4
        System.out.println("Dungeon min HP: " + calculateMinimumHP(
            new int[][]{{-2,-3,3},{-5,-10,1},{10,30,-5}})); // 7
        System.out.println("Wildcard 'aa','*': " + isMatch("aa","*")); // true
        System.out.println("Regex 'aab','c*a*b': " + regexMatch("aab","c*a*b")); // true
    }
}`,
      },
    ],
  },
  {
    id: "dp-trees",
    title: "DP on Trees",
    difficulty: "Hard",
    timeComplexity: "O(n) for most tree DP problems",
    spaceComplexity: "O(n) for recursion stack and DP arrays",
    theory: [
      "Tree DP computes optimal values using post-order DFS (children before parent). Each node's value depends only on its subtree — this gives optimal substructure.",
      "Standard pattern: dp[v][0] = optimal NOT including v; dp[v][1] = optimal INCLUDING v. Process all children first, then decide for v.",
      "Rerooting technique: Compute answers for ALL possible roots in O(n). Pass 1 (bottom-up) builds subtree answers. Pass 2 (top-down) adds parent's contribution to each child.",
      "Tree diameter: The longest path may not pass through the root. For each node, track its two longest downward paths and update a global maximum.",
      "Heavy-Light Decomposition: Decompose tree into O(log n) chains. Allows path queries in O(log² n) using segment trees on each chain.",
    ],
    keyPoints: [
      "Post-order DFS: process all children before computing current node's DP value",
      "dp[v][0/1] = exclude/include — the binary state pattern",
      "Rerooting: Pass 1 bottom-up, Pass 2 top-down with parent's contribution",
      "For diameter: track two longest depths at each node, update global answer",
    ],
    code: [
      {
        title: "Tree DP — MIS, Diameter & Rerooting",
        language: "java",
        content: `import java.util.*;

public class TreeDP {
    
    static List<Integer>[] adj;
    static int[][] dp;
    
    // ==================== MAX INDEPENDENT SET ON TREE ====================
    // dp[v][0] = max set WITHOUT v | dp[v][1] = max set WITH v
    
    public static int maxIndependentSet(int n, int[][] edges) {
        adj = new ArrayList[n];
        dp = new int[n][2];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        misDP(0, -1);
        return Math.max(dp[0][0], dp[0][1]);
    }
    
    private static void misDP(int v, int par) {
        dp[v][1] = 1; dp[v][0] = 0;
        for (int u : adj[v]) {
            if (u == par) continue;
            misDP(u, v);
            dp[v][1] += dp[u][0];                     // Include v → exclude children
            dp[v][0] += Math.max(dp[u][0], dp[u][1]); // Exclude v → best for children
        }
    }
    
    // ==================== TREE DIAMETER ====================
    // Longest path between any two nodes
    
    static int diameter;
    
    public static int treeDiameter(int n, int[][] edges) {
        adj = new ArrayList[n];
        diameter = 0;
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        diameterDFS(0, -1);
        return diameter;
    }
    
    private static int diameterDFS(int v, int par) {
        int max1 = 0, max2 = 0;
        for (int u : adj[v]) {
            if (u == par) continue;
            int d = diameterDFS(u, v) + 1;
            if (d > max1) { max2 = max1; max1 = d; }
            else if (d > max2) max2 = d;
        }
        diameter = Math.max(diameter, max1 + max2);
        return max1;
    }
    
    // ==================== REROOTING: SUM OF DISTANCES ====================
    
    static int[] subSize, down;
    static long[] answer;
    
    public static long[] sumOfDistances(int n, int[][] edges) {
        adj = new ArrayList[n];
        subSize = new int[n]; down = new int[n]; answer = new long[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        dfsDown(0, -1);
        answer[0] = down[0];
        dfsUp(0, -1, n);
        return answer;
    }
    
    private static void dfsDown(int v, int p) {
        subSize[v] = 1;
        for (int u : adj[v]) {
            if (u == p) continue;
            dfsDown(u, v);
            subSize[v] += subSize[u];
            down[v] += down[u] + subSize[u];
        }
    }
    
    private static void dfsUp(int v, int p, int total) {
        for (int u : adj[v]) {
            if (u == p) continue;
            // u's subtree: nodes 1 closer; rest: 1 farther
            answer[u] = answer[v] - subSize[u] + (total - subSize[u]);
            dfsUp(u, v, total);
        }
    }
    
    public static void main(String[] args) {
        int n = 7;
        int[][] edges = {{0,1},{0,2},{1,3},{1,4},{2,5},{2,6}};
        System.out.println("Max Independent Set: " + maxIndependentSet(n, edges)); // 4
        System.out.println("Tree Diameter:       " + treeDiameter(n, edges));      // 4
        System.out.println("Sum of Distances:    "
            + Arrays.toString(sumOfDistances(n, edges)));
    }
}`,
      },
    ],
    table: {
      headers: ["Problem", "DP State", "Transition", "Time"],
      rows: [
        ["Max Independent Set", "dp[v][0/1]", "Children contribute post-order", "O(n)"],
        ["Tree Diameter", "maxDepth[v]", "Two longest child depths", "O(n)"],
        ["Sum of Distances", "down[v], answer[v]", "Rerooting formula", "O(n)"],
        ["Min Vertex Cover", "n − MIS", "Complement of MIS", "O(n)"],
        ["Max Root→Leaf Path", "running sum in DFS", "Accumulate down", "O(n)"],
      ],
    },
  },
  {
    id: "dp-1d",
    title: "1D DP Problems",
    theory: [
      "1D DP problems have a single dimensional state: dp[i] represents some optimal value for the first i elements.",
      "Classic examples: Climbing Stairs, House Robber, Jump Game, Maximum Subarray (Kadane's), Coin Change, Decode Ways.",
      "The recurrence often looks back at dp[i-1], dp[i-2], or dp[i-j] for some j. Identify the transitions from state to state.",
    ],
    code: [
      {
        title: "Essential 1D DP Problems",
        language: "java",
        content: `import java.util.Arrays;

public class OneDDP {
    
    // ==================== HOUSE ROBBER ====================
    // Rob houses in a row, cannot rob adjacent houses
    // dp[i] = max money robbing from houses 0..i
    // dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    
    public static int houseRobber(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        int prev2 = nums[0];
        int prev1 = Math.max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    // House Robber II — circular arrangement
    public static int houseRobberII(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        // Either rob 0..n-2 or rob 1..n-1 (can't rob both 0 and n-1)
        return Math.max(rob(nums, 0, n-2), rob(nums, 1, n-1));
    }
    
    private static int rob(int[] nums, int lo, int hi) {
        int prev2 = 0, prev1 = 0;
        for (int i = lo; i <= hi; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    // ==================== JUMP GAME ====================
    // Can you reach the last index from index 0?
    // nums[i] = max jump length from position i
    
    public static boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false; // Can't reach index i
            maxReach = Math.max(maxReach, i + nums[i]);
        }
        return true;
    }
    
    // Jump Game II — minimum jumps to reach end
    public static int minJumps(int[] nums) {
        int jumps = 0, currEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currEnd) {    // We must jump from current range
                jumps++;
                currEnd = farthest;
            }
        }
        return jumps;
    }
    
    // ==================== MAXIMUM SUBARRAY (KADANE'S) ====================
    // Find the contiguous subarray with the largest sum
    // dp[i] = max subarray sum ending at index i
    // dp[i] = max(nums[i], dp[i-1] + nums[i])
    
    public static int maxSubarray(int[] nums) {
        int maxSum = nums[0], currSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currSum = Math.max(nums[i], currSum + nums[i]); // Extend or restart
            maxSum = Math.max(maxSum, currSum);
        }
        return maxSum;
    }
    
    // Return the actual subarray indices
    public static int[] maxSubarrayIndices(int[] nums) {
        int maxSum = nums[0], currSum = nums[0];
        int start = 0, end = 0, tempStart = 0;
        for (int i = 1; i < nums.length; i++) {
            if (currSum + nums[i] < nums[i]) {
                currSum = nums[i];
                tempStart = i;           // Potential new start
            } else {
                currSum += nums[i];
            }
            if (currSum > maxSum) {
                maxSum = currSum;
                start = tempStart;
                end = i;
            }
        }
        return new int[]{start, end, maxSum};
    }
    
    // ==================== COIN CHANGE ====================
    // Minimum coins to make amount (unlimited coins of each denomination)
    // dp[i] = min coins to make amount i
    // dp[i] = min(dp[i - coin] + 1) for each coin
    
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Initialize to "infinity"
        dp[0] = 0;                   // Base case: 0 coins to make amount 0
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // Coin Change 2 — number of WAYS to make amount
    public static int coinChangeWays(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1; // One way to make 0: use no coins
        
        for (int coin : coins) {             // Iterate coins (avoids duplicate combos)
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }
    
    // ==================== DECODE WAYS ====================
    // A='1', B='2', ..., Z='26'. Count ways to decode a digit string.
    
    public static int numDecodings(String s) {
        int n = s.length();
        if (s.charAt(0) == '0') return 0;
        
        int prev2 = 1, prev1 = 1; // dp[0] = 1 (empty string), dp[1] = 1 if s[0] != '0'
        for (int i = 2; i <= n; i++) {
            int curr = 0;
            int oneDigit = Integer.parseInt(s.substring(i-1, i));
            int twoDigit = Integer.parseInt(s.substring(i-2, i));
            
            if (oneDigit >= 1) curr += prev1;      // Decode s[i-1] alone
            if (twoDigit >= 10 && twoDigit <= 26) curr += prev2; // Decode s[i-2..i-1]
            
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    public static void main(String[] args) {
        System.out.println("House Robber [2,7,9,3,1]: " + houseRobber(new int[]{2,7,9,3,1})); // 12
        System.out.println("Max Subarray [-2,1,-3,4,-1,2,1,-5,4]: " + maxSubarray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // 6
        System.out.println("Coin Change [1,5,6,9], 11: " + coinChange(new int[]{1,5,6,9}, 11)); // 2
        System.out.println("Coin Ways [1,2,5], 5: " + coinChangeWays(new int[]{1,2,5}, 5)); // 4
        System.out.println("Decode '226': " + numDecodings("226")); // 3
    }
}`,
      },
    ],
  },
  {
    id: "dp-knapsack",
    title: "0/1 Knapsack",
    difficulty: "Hard",
    timeComplexity: "O(n × W) where W = capacity",
    spaceComplexity: "O(n × W) → O(W) optimized",
    theory: [
      "0/1 Knapsack: Given n items each with weight[i] and value[i], and a knapsack of capacity W, find maximum value achievable without exceeding W. Each item can be taken at most once (0/1).",
      "State: dp[i][w] = maximum value using first i items with weight capacity w.",
      "Recurrence: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]) — either skip item i, or include it.",
      "Space optimization: iterate weights in reverse when using 1D dp to prevent using the same item twice.",
      "Variants: Unbounded Knapsack (unlimited items), Fractional Knapsack (Greedy), Subset Sum, Partition Equal Subset Sum.",
    ],
    code: [
      {
        title: "0/1 Knapsack — All Variants",
        language: "java",
        content: `import java.util.*;

public class Knapsack {
    
    // ==================== 0/1 KNAPSACK ====================
    
    // 2D DP — O(nW) time, O(nW) space
    public static int knapsack01(int[] weight, int[] value, int capacity) {
        int n = weight.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                // Option 1: Skip item i
                dp[i][w] = dp[i-1][w];
                // Option 2: Take item i (if it fits)
                if (weight[i-1] <= w) {
                    dp[i][w] = Math.max(dp[i][w],
                        dp[i-1][w - weight[i-1]] + value[i-1]);
                }
            }
        }
        return dp[n][capacity];
    }
    
    // 1D Space Optimized — O(nW) time, O(W) space
    public static int knapsack01Optimized(int[] weight, int[] value, int capacity) {
        int[] dp = new int[capacity + 1];
        
        for (int i = 0; i < weight.length; i++) {
            // CRITICAL: Iterate in REVERSE to avoid using item i twice
            for (int w = capacity; w >= weight[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weight[i]] + value[i]);
            }
        }
        return dp[capacity];
    }
    
    // Reconstruct which items were selected
    public static List<Integer> knapsackItems(int[] weight, int[] value, int capacity) {
        int n = weight.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i-1][w];
                if (weight[i-1] <= w)
                    dp[i][w] = Math.max(dp[i][w], dp[i-1][w-weight[i-1]] + value[i-1]);
            }
        }
        
        // Trace back to find selected items
        List<Integer> selected = new ArrayList<>();
        int w = capacity;
        for (int i = n; i >= 1; i--) {
            if (dp[i][w] != dp[i-1][w]) { // Item i was included
                selected.add(i - 1);       // 0-indexed
                w -= weight[i-1];
            }
        }
        return selected;
    }
    
    // ==================== UNBOUNDED KNAPSACK ====================
    // Each item can be used unlimited times
    // Iterate weights FORWARD (allowing reuse)
    
    public static int unboundedKnapsack(int[] weight, int[] value, int capacity) {
        int[] dp = new int[capacity + 1];
        for (int w = 1; w <= capacity; w++) {
            for (int i = 0; i < weight.length; i++) {
                if (weight[i] <= w) {
                    dp[w] = Math.max(dp[w], dp[w - weight[i]] + value[i]);
                }
            }
        }
        return dp[capacity];
    }
    
    // ==================== SUBSET SUM ====================
    // Can we achieve exactly a target sum using a subset of nums?
    
    public static boolean subsetSum(int[] nums, int target) {
        boolean[] dp = new boolean[target + 1];
        dp[0] = true; // Empty subset sums to 0
        
        for (int num : nums) {
            for (int j = target; j >= num; j--) { // Reverse order (0/1)
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }
    
    // Count number of subsets with given sum
    public static int countSubsets(int[] nums, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[target];
    }
    
    // ==================== PARTITION EQUAL SUBSET SUM ====================
    // Can array be partitioned into two equal-sum subsets?
    
    public static boolean canPartition(int[] nums) {
        int total = Arrays.stream(nums).sum();
        if (total % 2 != 0) return false;     // Odd total can't split evenly
        return subsetSum(nums, total / 2);     // Find subset with sum = total/2
    }
    
    // ==================== TARGET SUM (+/- Assignment) ====================
    // Assign + or - to each num such that the sum equals target
    // Math reduction: if P = set of + elements, N = set of - elements
    // P - N = target, P + N = total → P = (total + target) / 2
    // Count subsets with sum = (total + target) / 2
    
    public static int findTargetSumWays(int[] nums, int target) {
        int total = Arrays.stream(nums).sum();
        if (Math.abs(target) > total) return 0;
        if ((total + target) % 2 != 0) return 0;
        return countSubsets(nums, (total + target) / 2);
    }
    
    // ==================== ROD CUTTING ====================
    // Cut rod of length n into pieces to maximize profit
    // price[i] = price of rod of length i
    
    public static int rodCutting(int[] price, int n) {
        int[] dp = new int[n + 1];
        for (int len = 1; len <= n; len++) {
            for (int cut = 1; cut <= len; cut++) {
                dp[len] = Math.max(dp[len], price[cut-1] + dp[len - cut]);
            }
        }
        return dp[n];
    }
    
    public static void main(String[] args) {
        int[] weight = {1, 3, 4, 5};
        int[] value  = {1, 4, 5, 7};
        int capacity = 7;
        
        System.out.println("0/1 Knapsack: " + knapsack01(weight, value, capacity)); // 9
        System.out.println("Selected items: " + knapsackItems(weight, value, capacity));
        System.out.println("Unbounded Knapsack: " + unboundedKnapsack(weight, value, capacity)); // 11
        
        int[] nums = {1, 2, 3, 4};
        System.out.println("Subset Sum (target=6): " + subsetSum(nums, 6)); // true
        System.out.println("Can Partition {1,5,11,5}: " + canPartition(new int[]{1,5,11,5})); // true
        System.out.println("Target Sum {1,1,1,1,1}, target=3: " + findTargetSumWays(new int[]{1,1,1,1,1}, 3)); // 5
    }
}`,
      },
    ],
  },
  {
    id: "dp-lcs",
    title: "LCS & Edit Distance",
    difficulty: "Hard",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n) → O(min(m,n)) optimized",
    theory: [
      "Longest Common Subsequence (LCS): Find the longest subsequence present in both strings. A subsequence maintains relative order but doesn't need to be contiguous.",
      "LCS State: dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1].",
      "LCS Recurrence: if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1; else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      "Edit Distance (Levenshtein): Minimum operations (insert, delete, replace) to convert one string to another. Foundation for spell checkers, diff tools, DNA alignment.",
      "LCS applications: diff/patch tools, DNA sequence alignment, version control systems.",
    ],
    code: [
      {
        title: "LCS, Edit Distance & Variants",
        language: "java",
        content: `public class StringDP {
    
    // ==================== LCS ====================
    
    // Length of LCS
    public static int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m+1][n+1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1))
                    dp[i][j] = dp[i-1][j-1] + 1;         // Characters match
                else
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); // Take best
            }
        }
        return dp[m][n];
    }
    
    // Reconstruct the actual LCS string
    public static String lcsString(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m+1][n+1];
        
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                if (s1.charAt(i-1) == s2.charAt(j-1))
                    dp[i][j] = dp[i-1][j-1] + 1;
                else
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        
        // Backtrack to find the actual LCS
        StringBuilder sb = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                sb.append(s1.charAt(i-1));
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) i--;
            else j--;
        }
        return sb.reverse().toString();
    }
    
    // ==================== LCS VARIANTS ====================
    
    // Longest Common Substring (CONTIGUOUS, different from subsequence!)
    public static int longestCommonSubstring(String s1, String s2) {
        int m = s1.length(), n = s2.length(), maxLen = 0;
        int[][] dp = new int[m+1][n+1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1; // Must continue match
                    maxLen = Math.max(maxLen, dp[i][j]);
                }
                // else dp[i][j] = 0 (reset — must be contiguous)
            }
        }
        return maxLen;
    }
    
    // Shortest Common Supersequence — shortest string containing both s1 and s2
    // Length = |s1| + |s2| - LCS(s1, s2)
    public static String shortestCommonSupersequence(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = s1.charAt(i-1) == s2.charAt(j-1)
                    ? dp[i-1][j-1] + 1
                    : Math.max(dp[i-1][j], dp[i][j-1]);
        
        StringBuilder sb = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                sb.append(s1.charAt(i-1)); i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) {
                sb.append(s1.charAt(i-1)); i--;
            } else {
                sb.append(s2.charAt(j-1)); j--;
            }
        }
        while (i > 0) { sb.append(s1.charAt(i-1)); i--; }
        while (j > 0) { sb.append(s2.charAt(j-1)); j--; }
        return sb.reverse().toString();
    }
    
    // ==================== EDIT DISTANCE ====================
    // Min operations (insert, delete, replace) to convert s1 to s2
    
    public static int editDistance(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        // dp[i][j] = edit distance between s1[0..i-1] and s2[0..j-1]
        int[][] dp = new int[m+1][n+1];
        
        // Base cases: converting to/from empty string
        for (int i = 0; i <= m; i++) dp[i][0] = i; // Delete i chars
        for (int j = 0; j <= n; j++) dp[0][j] = j; // Insert j chars
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1]; // No operation needed
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i-1][j-1],          // Replace
                        Math.min(
                            dp[i-1][j],        // Delete from s1
                            dp[i][j-1]         // Insert into s1
                        )
                    );
                }
            }
        }
        return dp[m][n];
    }
    
    // ==================== PALINDROME DP ====================
    
    // Longest Palindromic Subsequence
    // LPS(s) = LCS(s, reverse(s))
    public static int longestPalindromicSubseq(String s) {
        return lcs(s, new StringBuilder(s).reverse().toString());
    }
    
    // Minimum insertions to make string a palindrome
    // = length - LPS(s)
    public static int minInsertionsPalindrome(String s) {
        return s.length() - longestPalindromicSubseq(s);
    }
    
    // Minimum deletions to make string a palindrome
    // = length - LPS(s)  (same as insertions!)
    public static int minDeletionsPalindrome(String s) {
        return s.length() - longestPalindromicSubseq(s);
    }
    
    public static void main(String[] args) {
        String s1 = "AGGTAB", s2 = "GXTXAYB";
        System.out.println("LCS length: " + lcs(s1, s2));         // 4
        System.out.println("LCS string: " + lcsString(s1, s2));   // GTAB
        
        System.out.println("Edit distance 'horse' → 'ros': " + editDistance("horse", "ros")); // 3
        System.out.println("LPS of 'bbbab': " + longestPalindromicSubseq("bbbab")); // 4
        System.out.println("Min cuts for palindrome 'aab': " + minInsertionsPalindrome("aab")); // 1
        System.out.println("SCS of 'AGGT' and 'GXTXAYB': " + shortestCommonSupersequence("AGGT", "GXTXAYB"));
    }
}`,
      },
    ],
  },
  {
    id: "dp-lis",
    title: "LIS & Variants",
    difficulty: "Hard",
    timeComplexity: "O(n²) DP | O(n log n) Binary Search",
    spaceComplexity: "O(n)",
    theory: [
      "Longest Increasing Subsequence (LIS): Find the longest subsequence of a given sequence such that all elements are in strictly increasing order.",
      "O(n²) DP approach: dp[i] = length of LIS ending at index i. For each i, check all j < i where nums[j] < nums[i].",
      "O(n log n) approach using patience sorting and binary search: maintain a 'tails' array where tails[i] = smallest tail element of all increasing subsequences of length i+1.",
      "The binary search approach doesn't give the actual LIS but gives its length. To reconstruct, use a parent array with the O(n²) approach.",
    ],
    code: [
      {
        title: "LIS — O(n²) and O(n log n)",
        language: "java",
        content: `import java.util.*;

public class LIS {
    
    // ==================== O(n²) DP ====================
    
    public static int lisDP(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1); // Each element is an LIS of length 1 by itself
        int maxLen = 1;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {                     // Strictly increasing
                    dp[i] = Math.max(dp[i], dp[j] + 1);     // Extend LIS ending at j
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        return maxLen;
    }
    
    // Reconstruct actual LIS
    public static List<Integer> lisActual(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        int[] parent = new int[n];
        Arrays.fill(dp, 1);
        Arrays.fill(parent, -1);
        int maxLen = 1, endIdx = 0;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j; // Track where we came from
                }
            }
            if (dp[i] > maxLen) { maxLen = dp[i]; endIdx = i; }
        }
        
        // Backtrack through parent array
        List<Integer> lis = new ArrayList<>();
        for (int i = endIdx; i != -1; i = parent[i]) lis.add(nums[i]);
        Collections.reverse(lis);
        return lis;
    }
    
    // ==================== O(n log n) using Patience Sort ====================
    // tails[i] = smallest tail of all increasing subsequences of length i+1
    
    public static int lisBinarySearch(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0; // Length of current LIS
        
        for (int num : nums) {
            // Binary search: find first tail >= num (lower bound)
            int lo = 0, hi = size;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (tails[mid] < num) lo = mid + 1;
                else hi = mid;
            }
            tails[lo] = num; // Replace or extend
            if (lo == size) size++; // Extended the LIS
        }
        return size;
    }
    
    // ==================== LIS VARIANTS ====================
    
    // Number of LIS sequences
    public static int numberOfLIS(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];   // dp[i] = LIS length ending at i
        int[] cnt = new int[n];  // cnt[i] = number of LIS ending at i
        Arrays.fill(dp, 1);
        Arrays.fill(cnt, 1);
        int maxLen = 1;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (dp[j] + 1 > dp[i]) {
                        dp[i] = dp[j] + 1;
                        cnt[i] = cnt[j]; // Start fresh count
                    } else if (dp[j] + 1 == dp[i]) {
                        cnt[i] += cnt[j]; // Another way to achieve same length
                    }
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        
        int result = 0;
        for (int i = 0; i < n; i++) if (dp[i] == maxLen) result += cnt[i];
        return result;
    }
    
    // Longest Bitonic Subsequence
    // Increases then decreases
    public static int longestBitonic(int[] nums) {
        int n = nums.length;
        int[] lis = new int[n]; // LIS ending at i (left to right)
        int[] lds = new int[n]; // LDS starting at i (left to right = LIS right to left)
        Arrays.fill(lis, 1);
        Arrays.fill(lds, 1);
        
        for (int i = 1; i < n; i++)
            for (int j = 0; j < i; j++)
                if (nums[j] < nums[i]) lis[i] = Math.max(lis[i], lis[j] + 1);
        
        for (int i = n-2; i >= 0; i--)
            for (int j = i+1; j < n; j++)
                if (nums[j] < nums[i]) lds[i] = Math.max(lds[i], lds[j] + 1);
        
        int maxBitonic = 1;
        for (int i = 0; i < n; i++)
            maxBitonic = Math.max(maxBitonic, lis[i] + lds[i] - 1);
        return maxBitonic;
    }
    
    // Russian Doll Envelopes — 2D LIS
    // Sort by width ascending, height DESCENDING (to avoid using same width)
    // Then find LIS on heights
    public static int maxEnvelopes(int[][] envelopes) {
        Arrays.sort(envelopes, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        int[] heights = Arrays.stream(envelopes).mapToInt(e -> e[1]).toArray();
        return lisBinarySearch(heights);
    }
    
    public static void main(String[] args) {
        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS length (DP): " + lisDP(nums));              // 4
        System.out.println("LIS length (BSearch): " + lisBinarySearch(nums)); // 4
        System.out.println("Actual LIS: " + lisActual(nums));               // [2,3,7,18] or [2,5,7,18]
        System.out.println("Number of LIS: " + numberOfLIS(new int[]{1,3,5,4,7})); // 2
    }
}`,
      },
    ],
  },
  {
    id: "dp-matrix",
    title: "Matrix Chain Multiplication",
    difficulty: "Expert",
    timeComplexity: "O(n³)",
    spaceComplexity: "O(n²)",
    theory: [
      "Given a sequence of matrices, find the most efficient way to multiply them (minimize scalar multiplications). Matrix multiplication is associative — the ORDER of multiplication matters for efficiency, not the result.",
      "For matrices A(p×q) × B(q×r), cost = p×q×r scalar multiplications. The result is p×r.",
      "State: dp[i][j] = minimum cost to multiply matrices i through j.",
      "Recurrence: dp[i][j] = min over all k (i ≤ k < j) of (dp[i][k] + dp[k+1][j] + dims[i-1] × dims[k] × dims[j]).",
      "This is an interval DP problem — we solve for subintervals of increasing length.",
    ],
    code: [
      {
        title: "Matrix Chain Multiplication & Interval DP",
        language: "java",
        content: `public class MatrixChain {
    
    // dims[] represents matrix dimensions:
    // Matrix i has dimensions dims[i-1] × dims[i]
    // For 4 matrices: A(30×35), B(35×15), C(15×5), D(5×10)
    // dims = {30, 35, 15, 5, 10}
    
    public static int matrixChainOrder(int[] dims) {
        int n = dims.length - 1; // Number of matrices
        int[][] dp = new int[n+1][n+1]; // dp[i][j] = min cost for matrices i..j
        
        // Fill by increasing chain length (l = chain length)
        for (int len = 2; len <= n; len++) {           // Length of subchain
            for (int i = 1; i <= n - len + 1; i++) {  // Start of subchain
                int j = i + len - 1;                   // End of subchain
                dp[i][j] = Integer.MAX_VALUE;
                
                for (int k = i; k < j; k++) {          // Split point
                    // Cost = cost(i..k) + cost(k+1..j) + cost to multiply result matrices
                    int cost = dp[i][k] + dp[k+1][j]
                             + dims[i-1] * dims[k] * dims[j];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        return dp[1][n];
    }
    
    // With parenthesization reconstruction
    public static String parenthesize(int[] dims) {
        int n = dims.length - 1;
        int[][] dp = new int[n+1][n+1];
        int[][] split = new int[n+1][n+1]; // Stores optimal k
        
        for (int len = 2; len <= n; len++) {
            for (int i = 1; i <= n - len + 1; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j] + dims[i-1] * dims[k] * dims[j];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        split[i][j] = k; // Remember where we split
                    }
                }
            }
        }
        return buildParens(split, 1, n);
    }
    
    private static String buildParens(int[][] split, int i, int j) {
        if (i == j) return "M" + i;
        int k = split[i][j];
        return "(" + buildParens(split, i, k) + " × " + buildParens(split, k+1, j) + ")";
    }
    
    // ==================== BURST BALLOONS (Advanced Interval DP) ====================
    // Given balloons with values, burst them all. Bursting balloon i gives
    // nums[left] * nums[i] * nums[right] coins. Maximize total coins.
    // Key trick: think LAST balloon to burst, not first
    
    public static int maxCoins(int[] nums) {
        int n = nums.length;
        // Pad with 1s at both ends
        int[] padded = new int[n + 2];
        padded[0] = padded[n+1] = 1;
        for (int i = 0; i < n; i++) padded[i+1] = nums[i];
        
        int m = padded.length;
        int[][] dp = new int[m][m]; // dp[i][j] = max coins from bursting balloons strictly between i and j
        
        for (int len = 2; len < m; len++) {          // Window size
            for (int left = 0; left < m - len; left++) {
                int right = left + len;
                for (int k = left + 1; k < right; k++) {
                    // k is the LAST balloon in range (left,right) to be burst
                    dp[left][right] = Math.max(dp[left][right],
                        dp[left][k] + padded[left] * padded[k] * padded[right] + dp[k][right]);
                }
            }
        }
        return dp[0][m-1];
    }
    
    // ==================== PALINDROME PARTITIONING II ====================
    // Min cuts to partition string into palindromes
    
    public static int minCutPalindrome(String s) {
        int n = s.length();
        // Precompute isPalin[i][j]
        boolean[][] isPalin = new boolean[n][n];
        for (int i = n-1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    isPalin[i][j] = (j - i <= 2) || isPalin[i+1][j-1];
                }
            }
        }
        
        // dp[i] = min cuts for s[0..i]
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            if (isPalin[0][i]) { dp[i] = 0; continue; }
            dp[i] = i; // Max cuts = i (cut each char separately)
            for (int j = 1; j <= i; j++) {
                if (isPalin[j][i]) {
                    dp[i] = Math.min(dp[i], dp[j-1] + 1);
                }
            }
        }
        return dp[n-1];
    }
    
    public static void main(String[] args) {
        int[] dims = {30, 35, 15, 5, 10, 25}; // 5 matrices
        System.out.println("Min multiplications: " + matrixChainOrder(dims)); // 15125
        System.out.println("Optimal order: " + parenthesize(dims));
        
        System.out.println("Burst Balloons [3,1,5,8]: " + maxCoins(new int[]{3,1,5,8})); // 167
        System.out.println("Min Palindrome Cuts 'aab': " + minCutPalindrome("aab")); // 1
    }
}`,
      },
    ],
  },
  {
    id: "dp-bitmask",
    title: "Bitmask DP",
    difficulty: "Expert",
    timeComplexity: "O(2^n × n) typical",
    spaceComplexity: "O(2^n × n)",
    theory: [
      "Bitmask DP is used when the state includes a subset of elements, typically for problems involving visiting all nodes or assigning tasks.",
      "A bitmask of n bits represents a subset of n elements. Bit i is set (1) if element i is in the subset.",
      "Key operations: Check if element i is in mask: (mask >> i) & 1; Add element i: mask | (1 << i); Remove element i: mask & ~(1 << i); Iterate over all submasks of mask.",
      "Classic problem: Traveling Salesman Problem (TSP) — O(2^n × n²) instead of O(n!) brute force.",
    ],
    code: [
      {
        title: "Bitmask DP — TSP & Assignments",
        language: "java",
        content: `import java.util.*;

public class BitmaskDP {
    
    // ==================== TRAVELING SALESMAN PROBLEM ====================
    // Find shortest Hamiltonian cycle through all cities
    // dp[mask][i] = min cost to visit all cities in 'mask', ending at city i
    
    public static int tsp(int[][] dist) {
        int n = dist.length;
        int FULL = (1 << n) - 1; // All cities visited
        int[][] dp = new int[1 << n][n];
        
        // Initialize with infinity
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE / 2);
        dp[1][0] = 0; // Start at city 0 (bit 0 set in mask)
        
        for (int mask = 1; mask <= FULL; mask++) {
            for (int last = 0; last < n; last++) {
                if ((mask >> last & 1) == 0) continue; // last must be in mask
                if (dp[mask][last] == Integer.MAX_VALUE / 2) continue;
                
                // Try going to each unvisited city
                for (int next = 0; next < n; next++) {
                    if ((mask >> next & 1) == 1) continue; // Already visited
                    int newMask = mask | (1 << next);
                    dp[newMask][next] = Math.min(dp[newMask][next],
                        dp[mask][last] + dist[last][next]);
                }
            }
        }
        
        // Find minimum cost to return to city 0 after visiting all cities
        int ans = Integer.MAX_VALUE;
        for (int last = 1; last < n; last++) {
            ans = Math.min(ans, dp[FULL][last] + dist[last][0]);
        }
        return ans;
    }
    
    // Reconstruct TSP path
    public static List<Integer> tspPath(int[][] dist) {
        int n = dist.length;
        int FULL = (1 << n) - 1;
        int[][] dp = new int[1 << n][n];
        int[][] parent = new int[1 << n][n];
        
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE / 2);
        for (int[] row : parent) Arrays.fill(row, -1);
        dp[1][0] = 0;
        
        for (int mask = 1; mask <= FULL; mask++) {
            for (int last = 0; last < n; last++) {
                if ((mask >> last & 1) == 0 || dp[mask][last] >= Integer.MAX_VALUE / 2) continue;
                for (int next = 0; next < n; next++) {
                    if ((mask >> next & 1) == 1) continue;
                    int newMask = mask | (1 << next);
                    int newCost = dp[mask][last] + dist[last][next];
                    if (newCost < dp[newMask][next]) {
                        dp[newMask][next] = newCost;
                        parent[newMask][next] = last;
                    }
                }
            }
        }
        
        // Reconstruct path
        int last = 0, minCost = Integer.MAX_VALUE;
        for (int i = 1; i < n; i++) {
            if (dp[FULL][i] + dist[i][0] < minCost) {
                minCost = dp[FULL][i] + dist[i][0];
                last = i;
            }
        }
        
        List<Integer> path = new ArrayList<>();
        int mask = FULL;
        while (last != -1) {
            path.add(last);
            int prev = parent[mask][last];
            mask ^= (1 << last);
            last = prev;
        }
        Collections.reverse(path);
        path.add(path.get(0)); // Return to start
        return path;
    }
    
    // ==================== ASSIGNMENT PROBLEM ====================
    // Assign n workers to n jobs to minimize cost
    // dp[mask] = min cost to assign jobs in 'mask' to first popcount(mask) workers
    
    public static int assignmentProblem(int[][] cost) {
        int n = cost.length;
        int[] dp = new int[1 << n];
        Arrays.fill(dp, Integer.MAX_VALUE / 2);
        dp[0] = 0;
        
        for (int mask = 0; mask < (1 << n); mask++) {
            if (dp[mask] == Integer.MAX_VALUE / 2) continue;
            int worker = Integer.bitCount(mask); // Next worker to assign
            if (worker == n) continue;
            
            for (int job = 0; job < n; job++) {
                if ((mask >> job & 1) == 0) { // Job not yet assigned
                    dp[mask | (1 << job)] = Math.min(
                        dp[mask | (1 << job)],
                        dp[mask] + cost[worker][job]
                    );
                }
            }
        }
        return dp[(1 << n) - 1];
    }
    
    // ==================== COUNTING PATHS WITH STATE ====================
    // Count ways to cover an N×M grid with 1×2 dominoes
    // Classic profile DP (bitmask DP on grid rows)
    
    // ==================== BROKEN PROFILE DP ====================
    // dp[col][mask] = number of ways to tile cols 0..col-1 fully,
    // with mask representing overhanging dominoes into column col
    
    public static long dominoTiling(int n, int m) {
        if (n > m) { int t = n; n = m; m = t; } // Ensure n <= m for efficiency
        int states = 1 << n;
        long[] dp = new long[states];
        dp[0] = 1;
        
        for (int col = 0; col < m; col++) {
            for (int row = 0; row < n; row++) {
                long[] newDp = new long[states];
                fillVertical(dp, newDp, n, 0, 0, 0);
                dp = newDp;
            }
        }
        return dp[0];
    }
    
    private static void fillVertical(long[] dp, long[] newDp, int n,
                                      int row, int oldMask, int newMask) {
        if (row == n) {
            newDp[newMask] += dp[oldMask];
            return;
        }
        // Place horizontal domino (occupies (row) in this col and next col)
        if ((oldMask >> row & 1) == 1) { // Cell already filled by prev column
            fillVertical(dp, newDp, n, row + 1, oldMask, newMask);
        } else {
            // Place horizontal domino protruding into next column
            fillVertical(dp, newDp, n, row + 1, oldMask, newMask | (1 << row));
            // Place vertical domino (if next row is also empty)
            if (row + 1 < n && (oldMask >> (row+1) & 1) == 0) {
                fillVertical(dp, newDp, n, row + 2, oldMask, newMask);
            }
        }
    }
    
    public static void main(String[] args) {
        // TSP with 4 cities
        int[][] dist = {
            {0, 10, 15, 20},
            {10, 0, 35, 25},
            {15, 35, 0, 30},
            {20, 25, 30, 0}
        };
        System.out.println("TSP min cost: " + tsp(dist));     // 80
        System.out.println("TSP path: " + tspPath(dist));
        
        // Assignment problem
        int[][] cost = {{9,2,7,8},{6,4,3,7},{5,8,1,8},{7,6,9,4}};
        System.out.println("Assignment min cost: " + assignmentProblem(cost));
    }
}`,
      },
    ],
  },
  {
    id: "dp-advanced",
    title: "Advanced DP Patterns",
    difficulty: "Expert",
    theory: [
      "Divide and Conquer DP Optimization: When dp[i][j] depends on dp[i-1][k] and the optimal k is monotonically increasing, reduce O(n³) to O(n² log n) or O(n²).",
      "Convex Hull Trick (CHT): Optimize DP recurrences of the form dp[i] = min over j < i of (dp[j] + m[j] × x[i] + b[j]). Reduces O(n²) to O(n) using a convex hull of lines.",
      "Knuth's Optimization: For interval DP where cost is 'concave' (satisfies the quadrangle inequality), optimal split point is monotone — reduces O(n³) to O(n²).",
      "DP on Digits (Digit DP): Count numbers in range [L, R] satisfying certain digit-based properties without iterating each number.",
    ],
    code: [
      {
        title: "Digit DP & DP on Trees",
        language: "java",
        content: `import java.util.*;

public class AdvancedDP {
    
    // ==================== DIGIT DP ====================
    // Count numbers in [1, N] with no two adjacent same digits
    
    private static int[][][] digitMemo;
    private static String num;
    
    public static int countDistinctDigitNumbers(int N) {
        num = String.valueOf(N);
        int n = num.length();
        // memo[pos][lastDigit][tight]
        digitMemo = new int[n][11][2];
        for (int[][] a : digitMemo) for (int[] b : a) Arrays.fill(b, -1);
        return digitDP(0, 10, true) - 1; // Subtract 1 to exclude 0
    }
    
    // pos: current digit position
    // last: last digit placed (-1 or 10 if no digit yet)
    // tight: whether we're still bounded by N's digits
    private static int digitDP(int pos, int last, boolean tight) {
        if (pos == num.length()) return 1;
        
        int t = tight ? 1 : 0;
        if (digitMemo[pos][last == 10 ? 10 : last][t] != -1)
            return digitMemo[pos][last == 10 ? 10 : last][t];
        
        int limit = tight ? (num.charAt(pos) - '0') : 9;
        int count = 0;
        
        for (int d = (pos == 0 ? 0 : 0); d <= limit; d++) {
            if (d == last) continue; // No two adjacent same digits
            boolean newTight = tight && (d == limit);
            count += digitDP(pos + 1, d, newTight);
        }
        
        return digitMemo[pos][last == 10 ? 10 : last][t] = count;
    }
    
    // ==================== DP ON TREES ====================
    // Maximum Independent Set on a Tree
    // For each node: either include it OR include any subset of its children
    
    static Map<Integer, List<Integer>> tree;
    static int[] dpInclude, dpExclude; // dpInclude[v] = max set including v
    
    public static int maxIndependentSet(Map<Integer, List<Integer>> adjList, int n) {
        tree = adjList;
        dpInclude = new int[n + 1];
        dpExclude = new int[n + 1];
        dfs(1, -1);
        return Math.max(dpInclude[1], dpExclude[1]);
    }
    
    private static void dfs(int node, int parent) {
        dpInclude[node] = 1; // Include this node (value = 1)
        dpExclude[node] = 0; // Don't include this node
        
        for (int child : tree.getOrDefault(node, new ArrayList<>())) {
            if (child == parent) continue;
            dfs(child, node);
            
            // If we include node, we CANNOT include its children
            dpInclude[node] += dpExclude[child];
            // If we exclude node, we take the BEST option for each child
            dpExclude[node] += Math.max(dpInclude[child], dpExclude[child]);
        }
    }
    
    // Tree DP: Rerooting technique
    // Compute dp value for ALL possible roots in O(n)
    // Example: sum of distances from every node to all other nodes
    
    static int[] subtreeSize, downSum;
    static long[] answer;
    
    public static long[] sumOfDistances(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        
        subtreeSize = new int[n];
        downSum = new int[n]; // Sum of distances to descendants
        answer = new long[n];
        
        // Pass 1: Compute subtree sizes and sum of distances from root (0)
        dfsDown(adj, 0, -1, n);
        
        // Pass 2: Reroot — propagate answer from parent to children
        answer[0] = downSum[0];
        dfsUp(adj, 0, -1, n);
        
        return answer;
    }
    
    private static void dfsDown(List<List<Integer>> adj, int u, int parent, int n) {
        subtreeSize[u] = 1;
        downSum[u] = 0;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            dfsDown(adj, v, u, n);
            subtreeSize[u] += subtreeSize[v];
            downSum[u] += downSum[v] + subtreeSize[v]; // Each node in subtree contributes 1
        }
    }
    
    private static void dfsUp(List<List<Integer>> adj, int u, int parent, int n) {
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            // answer[v] = answer[u] - subtreeSize[v] (nodes in v's subtree get 1 closer)
            //                       + (n - subtreeSize[v]) (other nodes get 1 farther)
            answer[v] = answer[u] - subtreeSize[v] + (n - subtreeSize[v]);
            dfsUp(adj, v, u, n);
        }
    }
    
    // ==================== STOCK BUY SELL WITH COOLDOWN ====================
    // Complex state machine DP
    
    public static int maxProfitCooldown(int[] prices) {
        int n = prices.length;
        if (n <= 1) return 0;
        
        // States: hold (own stock), sold (just sold, in cooldown), rest (no stock, not cooldown)
        int hold = -prices[0]; // Bought on day 0
        int sold = 0;
        int rest = 0;
        
        for (int i = 1; i < prices.length; i++) {
            int prevHold = hold, prevSold = sold, prevRest = rest;
            
            hold = Math.max(prevHold, prevRest - prices[i]); // Keep or buy (from rest state)
            sold = prevHold + prices[i];                      // Sell held stock
            rest = Math.max(prevRest, prevSold);              // Do nothing or come out of cooldown
        }
        return Math.max(sold, rest);
    }
    
    public static void main(String[] args) {
        // Digit DP
        System.out.println("Distinct digit numbers up to 100: " + countDistinctDigitNumbers(100));
        
        // Sum of distances
        int n = 6;
        int[][] edges = {{0,1},{0,2},{2,3},{2,4},{2,5}};
        System.out.println("Sum of distances: " + Arrays.toString(sumOfDistances(n, edges)));
        
        // Stock cooldown
        System.out.println("Max profit with cooldown [1,2,3,0,2]: " + maxProfitCooldown(new int[]{1,2,3,0,2})); // 3
    }
}`,
      },
    ],
  },
];
