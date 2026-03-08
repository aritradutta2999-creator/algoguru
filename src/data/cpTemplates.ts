export interface CPTemplate {
  name: string;
  prefix: string;
  description: string;
  code: string;
}

export const CP_TEMPLATES: CPTemplate[] = [
  {
    name: "CP Template - Ultimate",
    prefix: "template",
    description: "Aritra Dutta's full CP Template with Fast I/O, utilities & more",
    code: `/*
 * Author  : Aritra Dutta
 * Target  : Codeforces Expert / CSES
 */
import java.io.*;
import java.util.*;

public class Main {
    static BufferedReader br;
    static StringTokenizer st;
    static PrintWriter out;
    static final Random RNG = new Random();
    
    static final int MOD = 1_000_000_007;
    static final int MOD2 = 998244353;
    static final long INF = (long) 1e18;
    
    public static void main(String[] args) throws IOException {
        br = new BufferedReader(new InputStreamReader(System.in));
        out = new PrintWriter(new BufferedOutputStream(System.out));
        
        int t = nextInt();
        while (t-- > 0) solve();
        
        out.flush();
        out.close();
    }
    
    static void solve() throws IOException {
        int n = nextInt();
        // Write your solution here
    }
    
    // ========== FAST I/O ==========
    static String next() throws IOException { while (st == null || !st.hasMoreTokens()) st = new StringTokenizer(br.readLine()); return st.nextToken(); }
    static int nextInt() throws IOException { return Integer.parseInt(next()); }
    static long nextLong() throws IOException { return Long.parseLong(next()); }
    static double nextDouble() throws IOException { return Double.parseDouble(next()); }
    static String nextLine() throws IOException { return br.readLine(); }
    static char nextChar() throws IOException { return next().charAt(0); }
    
    // ========== ARRAY INPUT ==========
    static int[] nextIntArray(int n) throws IOException { int[] arr = new int[n]; for (int i = 0; i < n; i++) arr[i] = nextInt(); return arr; }
    static long[] nextLongArray(int n) throws IOException { long[] arr = new long[n]; for (int i = 0; i < n; i++) arr[i] = nextLong(); return arr; }
    static String[] nextStringArray(int n) throws IOException { String[] arr = new String[n]; for (int i = 0; i < n; i++) arr[i] = next(); return arr; }
    static double[] nextDoubleArray(int n) throws IOException { double[] arr = new double[n]; for (int i = 0; i < n; i++) arr[i] = nextDouble(); return arr; }
    static int[][] nextInt2DArray(int rows, int cols) throws IOException { int[][] arr = new int[rows][cols]; for (int i = 0; i < rows; i++) for (int j = 0; j < cols; j++) arr[i][j] = nextInt(); return arr; }
    
    // ========== ARRAY OUTPUT ==========
    static void printArray(int[] arr) { StringBuilder sb = new StringBuilder(); for (int i = 0; i < arr.length; i++) { if (i > 0) sb.append(' '); sb.append(arr[i]); } out.println(sb); }
    static void printArray(long[] arr) { StringBuilder sb = new StringBuilder(); for (int i = 0; i < arr.length; i++) { if (i > 0) sb.append(' '); sb.append(arr[i]); } out.println(sb); }
    static void printArray(String[] arr) { StringBuilder sb = new StringBuilder(); for (int i = 0; i < arr.length; i++) { if (i > 0) sb.append(' '); sb.append(arr[i]); } out.println(sb); }
    static void yes() { out.println("YES"); }
    static void no() { out.println("NO"); }
    
    // ========== UTILITY ==========
    static long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }
    static long lcm(long a, long b) { return a / gcd(a, b) * b; }
    static long modPow(long x, long y, long mod) { long res = 1; x %= mod; while (y > 0) { if ((y & 1) == 1) res = res * x % mod; x = x * x % mod; y >>= 1; } return res; }
    static long modInv(long a, long mod) { return modPow(a, mod - 2, mod); }
    static void shuffleSort(int[] arr) { for (int i = arr.length - 1; i > 0; i--) { int j = RNG.nextInt(i + 1); int t = arr[i]; arr[i] = arr[j]; arr[j] = t; } Arrays.sort(arr); }
    static void shuffleSort(long[] arr) { for (int i = arr.length - 1; i > 0; i--) { int j = RNG.nextInt(i + 1); long t = arr[i]; arr[i] = arr[j]; arr[j] = t; } Arrays.sort(arr); }
    static long sumArray(int[] arr) { long sum = 0; for (int val : arr) sum += val; return sum; }
    static long sumArray(long[] arr) { long sum = 0; for (long val : arr) sum += val; return sum; }
    static int minArray(int[] arr) { int min = Integer.MAX_VALUE; for (int val : arr) min = Math.min(min, val); return min; }
    static int maxArray(int[] arr) { int max = Integer.MIN_VALUE; for (int val : arr) max = Math.max(max, val); return max; }
    static int lowerBound(int[] arr, int key) { int left = 0, right = arr.length; while (left < right) { int mid = left + (right - left) / 2; if (arr[mid] < key) left = mid + 1; else right = mid; } return left; }
    static int upperBound(int[] arr, int key) { int left = 0, right = arr.length; while (left < right) { int mid = left + (right - left) / 2; if (arr[mid] <= key) left = mid + 1; else right = mid; } return left; }
    static void debug(Object... obj) { System.err.println(Arrays.deepToString(obj)); }
}`,
  },
  {
    name: "Codeforces (FastReader)",
    prefix: "codeforces",
    description: "Codeforces template with FastReader + all utilities",
    code: `/*
 * Author  : Aritra Dutta
 * Platform: Codeforces
 */
import java.io.*;
import java.util.*;

public class Main {
    static final long INF = (long) 1e18;
    static final int MOD = 1_000_000_007;
    static final int MOD2 = 998244353;
    static final Random RNG = new Random();

    static FastReader fr = new FastReader(System.in);
    static PrintWriter out = new PrintWriter(new BufferedOutputStream(System.out));

    public static void main(String[] args) {
        int t = fr.nextInt();
        while (t-- > 0) solve();
        out.flush();
    }

    static void solve() {
        int n = fr.nextInt();
        // Write your solution here
    }

    static void yes() { out.println("YES"); }
    static void no() { out.println("NO"); }
    static long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }
    static long lcm(long a, long b) { return a / gcd(a, b) * b; }
    static long modPow(long x, long y, long m) { long r = 1; x %= m; while (y > 0) { if ((y & 1) == 1) r = r * x % m; x = x * x % m; y >>= 1; } return r; }
    static int[] nextIntArray(int n) { int[] a = new int[n]; for (int i = 0; i < n; i++) a[i] = fr.nextInt(); return a; }
    static long[] nextLongArray(int n) { long[] a = new long[n]; for (int i = 0; i < n; i++) a[i] = fr.nextLong(); return a; }
    static void shuffleSort(int[] a) { for (int i = a.length-1; i > 0; i--) { int j = RNG.nextInt(i+1); int t = a[i]; a[i] = a[j]; a[j] = t; } Arrays.sort(a); }
    static void shuffleSort(long[] a) { for (int i = a.length-1; i > 0; i--) { int j = RNG.nextInt(i+1); long t = a[i]; a[i] = a[j]; a[j] = t; } Arrays.sort(a); }
    static void debug(Object... o) { System.err.println(Arrays.deepToString(o)); }

    static class FastReader {
        private final InputStream in;
        private final byte[] buf = new byte[1 << 16];
        private int ptr = 0, len = 0;
        FastReader(InputStream is) { in = is; }
        private int read() { if (ptr >= len) { ptr = 0; try { len = in.read(buf); } catch (IOException e) { return -1; } if (len <= 0) return -1; } return buf[ptr++]; }
        int nextInt() { int c; do c = read(); while (c <= ' '); int s = 1; if (c == '-') { s = -1; c = read(); } int v = 0; while (c > ' ') { v = v*10+(c-'0'); c = read(); } return v*s; }
        long nextLong() { int c; do c = read(); while (c <= ' '); int s = 1; if (c == '-') { s = -1; c = read(); } long v = 0; while (c > ' ') { v = v*10+(c-'0'); c = read(); } return s == 1 ? v : -v; }
        String next() { int c; do c = read(); while (c <= ' '); StringBuilder sb = new StringBuilder(); while (c > ' ') { sb.append((char)c); c = read(); } return sb.toString(); }
    }
}`,
  },
  {
    name: "CodeChef",
    prefix: "codechef",
    description: "CodeChef template with StringBuilder output",
    code: `/*
 * Author  : Aritra Dutta
 * Platform: CodeChef
 */
import java.io.*;
import java.util.*;

class Codechef {
    static final int MOD = 1_000_000_007;
    static final long INF = (long) 1e18;
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StringTokenizer st;
    static StringBuilder sb = new StringBuilder();

    static String next() throws IOException {
        while (st == null || !st.hasMoreElements()) st = new StringTokenizer(br.readLine());
        return st.nextToken();
    }
    static int nextInt() throws IOException { return Integer.parseInt(next()); }
    static long nextLong() throws IOException { return Long.parseLong(next()); }
    static int[] nextIntArray(int n) throws IOException { int[] a = new int[n]; for (int i = 0; i < n; i++) a[i] = nextInt(); return a; }
    static long[] nextLongArray(int n) throws IOException { long[] a = new long[n]; for (int i = 0; i < n; i++) a[i] = nextLong(); return a; }

    public static void main(String[] args) throws Exception {
        int t = nextInt();
        while (t-- > 0) solve();
        System.out.print(sb);
    }

    static void solve() throws IOException {
        int n = nextInt();
        // Write your solution here
        // sb.append(ans).append('\\n');
    }

    static long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }
    static long modPow(long x, long y, long m) { long r = 1; x %= m; while (y > 0) { if ((y & 1) == 1) r = r * x % m; x = x * x % m; y >>= 1; } return r; }
    static void yes() { sb.append("YES\\n"); }
    static void no() { sb.append("NO\\n"); }
    static void debug(Object... o) { System.err.println(Arrays.deepToString(o)); }
}`,
  },
  {
    name: "LeetCode",
    prefix: "leetcode",
    description: "LeetCode solution + local Main test harness",
    code: `import java.util.*;

class Solution {
    public int solve(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.solve(new int[]{1, 2, 3}));
    }
}`,
  },
  {
    name: "LeetCode Contest",
    prefix: "leetcode-contest",
    description: "LeetCode Contest Template with grid helpers",
    code: `/*
 * Author  : Aritra Dutta
 * Platform: LeetCode Contest
 */
import java.util.*;
import java.util.stream.*;

class Solution {

    public int solve(int[] nums) {
        // Write your solution here
        return 0;
    }

    // ===== Direction Arrays (Grid problems) =====
    int[] dx = {0, 0, 1, -1};
    int[] dy = {1, -1, 0, 0};

    // ===== Helper Methods =====
    long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }
    long lcm(long a, long b) { return a / gcd(a, b) * b; }
    long modPow(long x, long y, long mod) {
        long res = 1; x %= mod;
        while (y > 0) { if ((y & 1) == 1) res = res * x % mod; x = x * x % mod; y >>= 1; }
        return res;
    }
    int lowerBound(int[] arr, int key) { int l = 0, r = arr.length; while (l < r) { int m = l + (r - l) / 2; if (arr[m] < key) l = m + 1; else r = m; } return l; }
    int upperBound(int[] arr, int key) { int l = 0, r = arr.length; while (l < r) { int m = l + (r - l) / 2; if (arr[m] <= key) l = m + 1; else r = m; } return l; }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.solve(new int[]{1, 2, 3}));
    }
}`,
  },
  {
    name: "Codeforces V2 (FastReader + FastIO)",
    prefix: "codeforces-v2",
    description: "Codeforces with FastReader + FastIO + full utilities",
    code: `/*
 * Author  : Aritra Dutta
 * Platform: Codeforces
 */
import java.io.*;
import java.util.*;

public class Main {
    static final long INF = (long) 1e18;
    static final int MOD = 1_000_000_007;
    static final Random RNG = new Random();

    static FastReader fr = new FastReader(System.in);
    static FastIO io = new FastIO(System.out);

    public static void main(String[] args) {
        int t = fr.nextInt();
        while (t-- > 0) solve();
        io.flush();
    }

    static void solve() {
        int n = fr.nextInt();
        int[] a = nextIntArray(n);
        // Write your solution here
    }

    // ===== Fast Reader =====
    static class FastReader {
        private final InputStream in;
        private final byte[] buffer = new byte[1 << 16];
        private int ptr = 0, len = 0;

        FastReader(InputStream is) { in = is; }

        private int read() {
            if (ptr >= len) {
                ptr = 0;
                try { len = in.read(buffer); } catch (IOException e) { return -1; }
                if (len <= 0) return -1;
            }
            return buffer[ptr++];
        }

        int nextInt() {
            int c;
            do c = read(); while (c <= ' ');
            int sign = 1;
            if (c == '-') { sign = -1; c = read(); }
            int val = 0;
            while (c > ' ') { val = val * 10 + (c - '0'); c = read(); }
            return val * sign;
        }

        long nextLong() {
            int c;
            do c = read(); while (c <= ' ');
            int sign = 1;
            if (c == '-') { sign = -1; c = read(); }
            long val = 0;
            while (c > ' ') { val = val * 10 + (c - '0'); c = read(); }
            return sign == 1 ? val : -val;
        }

        String next() {
            int c;
            do c = read(); while (c <= ' ');
            StringBuilder sb = new StringBuilder();
            while (c > ' ') { sb.append((char) c); c = read(); }
            return sb.toString();
        }
    }

    // ===== Fast IO (Output + helpers) =====
    static class FastIO extends PrintWriter {
        FastIO(OutputStream os) { super(new BufferedOutputStream(os)); }
    }

    // ===== Utilities =====
    static int[] nextIntArray(int n) { int[] a = new int[n]; for (int i = 0; i < n; i++) a[i] = fr.nextInt(); return a; }
    static long[] nextLongArray(int n) { long[] a = new long[n]; for (int i = 0; i < n; i++) a[i] = fr.nextLong(); return a; }
    static void yes() { io.println("YES"); }
    static void no() { io.println("NO"); }
    static long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }
    static long lcm(long a, long b) { return a / gcd(a, b) * b; }
    static long modPow(long x, long y, long m) { long r = 1; x %= m; while (y > 0) { if ((y & 1) == 1) r = r * x % m; x = x * x % m; y >>= 1; } return r; }
    static int lowerBound(int[] a, int x) { int l = 0, r = a.length; while (l < r) { int mid = (l + r) >>> 1; if (a[mid] < x) l = mid + 1; else r = mid; } return l; }
    static int upperBound(int[] a, int x) { int l = 0, r = a.length; while (l < r) { int mid = (l + r) >>> 1; if (a[mid] <= x) l = mid + 1; else r = mid; } return l; }
    static void shuffleSort(int[] a) { for (int i = a.length - 1; i > 0; i--) { int j = RNG.nextInt(i + 1); int t = a[i]; a[i] = a[j]; a[j] = t; } Arrays.sort(a); }
    static void debug(Object... o) { System.err.println(Arrays.deepToString(o)); }
}`,
  },
];
