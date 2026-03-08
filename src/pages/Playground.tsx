import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  Play, Loader2, Copy, Check, Terminal,
  Code2, RotateCcw, Sun, Moon, Palette,
  AlignLeft, ChevronDown, Keyboard,
} from "lucide-react";
import Editor, { OnMount } from "@monaco-editor/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const FALLBACK_JAVA_COMPILERS = [
  { label: "Java 21", compiler: "openjdk-jdk-21+35" },
  { label: "Java 17", compiler: "openjdk-jdk-17+35" },
  { label: "Java 15", compiler: "openjdk-jdk-15.0.2+7" },
];

const THEMES = [
  { id: "vs-dark", label: "Dark", icon: <Moon size={13} /> },
  { id: "light", label: "Light", icon: <Sun size={13} /> },
  { id: "solarized-dark", label: "Solarized Dark", icon: <Palette size={13} /> },
  { id: "hc-black", label: "High Contrast", icon: <Palette size={13} /> },
];

const DEFAULT_CODE = `import java.util.*;
import java.util.stream.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AlgoGuru! ☕");

        // Array operations
        int[] arr = {5, 3, 8, 1, 9, 2};
        System.out.println("Original: " + Arrays.toString(arr));

        Arrays.sort(arr);
        System.out.println("Sorted:   " + Arrays.toString(arr));

        // Collections
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);

        // Streams
        names.stream()
             .map(String::toUpperCase)
             .forEach(name -> System.out.println("Hello, " + name + "!"));

        // HashMap iteration
        scores.forEach((k, v) -> System.out.println(k + " -> " + v));
    }
}`;

const WANDBOX_API = "https://wandbox.org/api/compile.json";

const JAVA_AUTO_IMPORTS = [
  "import java.util.*;",
  "import java.util.stream.*;",
  "import java.io.*;",
  "import java.math.*;",
];

const addAutoImports = (source: string) => {
  const missingImports = JAVA_AUTO_IMPORTS.filter((statement) => !source.includes(statement));
  if (!missingImports.length) return source;

  const packageMatch = source.match(/^\s*package\s+[\w.]+\s*;\s*/);
  if (packageMatch?.[0]) {
    return `${packageMatch[0]}\n${missingImports.join("\n")}\n${source.slice(packageMatch[0].length)}`;
  }

  return `${missingImports.join("\n")}\n\n${source}`;
};

// Solarized Dark theme definition
const SOLARIZED_DARK_THEME = {
  base: "vs-dark" as const,
  inherit: true,
  rules: [
    { token: "", foreground: "839496", background: "002b36" },
    { token: "comment", foreground: "586e75", fontStyle: "italic" },
    { token: "keyword", foreground: "859900" },
    { token: "string", foreground: "2aa198" },
    { token: "number", foreground: "d33682" },
    { token: "type", foreground: "b58900" },
    { token: "class", foreground: "b58900" },
    { token: "function", foreground: "268bd2" },
    { token: "variable", foreground: "268bd2" },
    { token: "operator", foreground: "859900" },
    { token: "annotation", foreground: "93a1a1" },
  ],
  colors: {
    "editor.background": "#002b36",
    "editor.foreground": "#839496",
    "editor.lineHighlightBackground": "#073642",
    "editor.selectionBackground": "#073642",
    "editorCursor.foreground": "#d30102",
    "editorWhitespace.foreground": "#073642",
    "editorLineNumber.foreground": "#586e75",
    "editorLineNumber.activeForeground": "#93a1a1",
    "editor.selectionHighlightBackground": "#073642aa",
  },
};

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [availableCompilers, setAvailableCompilers] = useState(FALLBACK_JAVA_COMPILERS);
  const [selectedCompiler, setSelectedCompiler] = useState(FALLBACK_JAVA_COMPILERS[0]);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showCompilerMenu, setShowCompilerMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stdin, setStdin] = useState("");
  
  const editorRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCompilers = async () => {
      try {
        const res = await fetch("https://wandbox.org/api/list.json");
        if (!res.ok) return;

        const list = await res.json() as Array<{ language?: string; name?: string }>;
        const javaItems = list
          .filter((item) => item.language === "Java" && item.name?.startsWith("openjdk-jdk-"))
          .map((item) => item.name as string);

        const unique = Array.from(new Set(javaItems));
        if (!unique.length || !isMounted) return;

        const parsed = unique
          .map((compiler) => {
            const match = compiler.match(/openjdk-jdk-(\d+)/);
            const major = match ? Number(match[1]) : 0;
            return {
              label: major ? `Java ${major}` : compiler,
              compiler,
              major,
            };
          })
          .sort((a, b) => b.major - a.major)
          .map(({ label, compiler }) => ({ label, compiler }));

        // Ensure Java 21 & 17 always appear
        const existingIds = new Set(parsed.map((c) => c.compiler));
        for (const fb of FALLBACK_JAVA_COMPILERS) {
          if (!existingIds.has(fb.compiler)) {
            parsed.push(fb);
          }
        }
        // Re-sort: highest version first
        parsed.sort((a, b) => {
          const majA = Number(a.label.replace("Java ", "")) || 0;
          const majB = Number(b.label.replace("Java ", "")) || 0;
          return majB - majA;
        });

        setAvailableCompilers(parsed);
        setSelectedCompiler(parsed[0]);
      } catch {
        // keep fallback compilers
      }
    };

    loadCompilers();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme("solarized-dark", SOLARIZED_DARK_THEME);

    // Register Java snippets & auto-completions
    monaco.languages.registerCompletionItemProvider("java", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const snippets = [
          // === Imports ===
          { label: "impu", detail: "import java.util.*", insertText: "import java.util.*;", documentation: "Import all java.util" },
          { label: "impio", detail: "import java.io.*", insertText: "import java.io.*;", documentation: "Import all java.io" },
          { label: "impstream", detail: "import java.util.stream.*", insertText: "import java.util.stream.*;", documentation: "Import streams" },
          { label: "impmath", detail: "import java.math.*", insertText: "import java.math.*;", documentation: "Import BigInteger/BigDecimal" },
          { label: "impall", detail: "All CP imports", insertText: "import java.util.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.math.*;", documentation: "All competitive programming imports" },

          // === Print ===
          { label: "sout", detail: "System.out.println()", insertText: "System.out.println(${1});", documentation: "Print to console" },
          { label: "souf", detail: "System.out.printf()", insertText: "System.out.printf(${1:\"format\"}, ${2});", documentation: "Formatted print" },
          { label: "serr", detail: "System.err.println()", insertText: "System.err.println(${1});", documentation: "Print to error stream" },
          { label: "soutv", detail: "Print variable", insertText: "System.out.println(\"${1:var} = \" + ${1:var});", documentation: "Print variable with label" },
          { label: "souta", detail: "Print array", insertText: "System.out.println(Arrays.toString(${1:arr}));", documentation: "Print array" },
          { label: "sout2d", detail: "Print 2D array", insertText: "System.out.println(Arrays.deepToString(${1:arr}));", documentation: "Print 2D array" },

          // === Main & Structure ===
          { label: "main", detail: "public static void main", insertText: "public static void main(String[] args) {\n\t${1}\n}", documentation: "Main method" },
          { label: "psvm", detail: "public static void main", insertText: "public static void main(String[] args) {\n\t${1}\n}", documentation: "Main method (alias)" },
          { label: "cls", detail: "Class template", insertText: "public class ${1:ClassName} {\n\t${2}\n}", documentation: "New class" },
          { label: "ctor", detail: "Constructor", insertText: "public ${1:ClassName}(${2}) {\n\t${3}\n}", documentation: "Constructor" },
          { label: "met", detail: "Method template", insertText: "public ${1:void} ${2:methodName}(${3}) {\n\t${4}\n}", documentation: "New method" },
          { label: "smet", detail: "Static method", insertText: "public static ${1:void} ${2:methodName}(${3}) {\n\t${4}\n}", documentation: "Static method" },
          { label: "tostr", detail: "toString override", insertText: "@Override\npublic String toString() {\n\treturn ${1:\"\"};\n}", documentation: "Override toString" },

          // === Loops ===
          { label: "fori", detail: "for (int i = 0; ...)", insertText: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3}\n}", documentation: "Indexed for loop" },
          { label: "forr", detail: "Reverse for loop", insertText: "for (int ${1:i} = ${2:n} - 1; ${1:i} >= 0; ${1:i}--) {\n\t${3}\n}", documentation: "Reverse for loop" },
          { label: "fore", detail: "for-each loop", insertText: "for (${1:Type} ${2:item} : ${3:collection}) {\n\t${4}\n}", documentation: "Enhanced for loop" },
          { label: "while", detail: "while loop", insertText: "while (${1:condition}) {\n\t${2}\n}", documentation: "While loop" },
          { label: "itar", detail: "Iterate array", insertText: "for (int ${1:i} = 0; ${1:i} < ${2:arr}.length; ${1:i}++) {\n\t${3}\n}", documentation: "Iterate over array" },

          // === Control Flow ===
          { label: "ifelse", detail: "if-else block", insertText: "if (${1:condition}) {\n\t${2}\n} else {\n\t${3}\n}", documentation: "If-else statement" },
          { label: "trycatch", detail: "try-catch block", insertText: "try {\n\t${1}\n} catch (${2:Exception} ${3:e}) {\n\t${4:e.printStackTrace();}\n}", documentation: "Try-catch block" },
          { label: "tryf", detail: "try-finally block", insertText: "try {\n\t${1}\n} finally {\n\t${2}\n}", documentation: "Try-finally block" },
          { label: "swtch", detail: "switch statement", insertText: "switch (${1:variable}) {\n\tcase ${2:value}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${4}\n\t\tbreak;\n}", documentation: "Switch statement" },

          // === Collections ===
          { label: "lst", detail: "ArrayList", insertText: "List<${1:Integer}> ${2:list} = new ArrayList<>();", documentation: "New ArrayList" },
          { label: "ArrayList", detail: "ArrayList declaration", insertText: "ArrayList<${1:Integer}> ${2:list} = new ArrayList<>();", documentation: "ArrayList class" },
          { label: "List", detail: "List declaration", insertText: "List<${1:Integer}> ${2:list} = new ArrayList<>();", documentation: "List interface" },
          { label: "ll", detail: "LinkedList", insertText: "LinkedList<${1:Integer}> ${2:list} = new LinkedList<>();", documentation: "New LinkedList" },
          { label: "LinkedList", detail: "LinkedList declaration", insertText: "LinkedList<${1:Integer}> ${2:list} = new LinkedList<>();", documentation: "LinkedList class" },
          { label: "map", detail: "HashMap", insertText: "Map<${1:String}, ${2:Integer}> ${3:map} = new HashMap<>();", documentation: "New HashMap" },
          { label: "HashMap", detail: "HashMap declaration", insertText: "HashMap<${1:String}, ${2:Integer}> ${3:map} = new HashMap<>();", documentation: "HashMap class" },
          { label: "Map", detail: "Map declaration", insertText: "Map<${1:String}, ${2:Integer}> ${3:map} = new HashMap<>();", documentation: "Map interface" },
          { label: "tmap", detail: "TreeMap", insertText: "TreeMap<${1:Integer}, ${2:Integer}> ${3:map} = new TreeMap<>();", documentation: "New TreeMap (sorted)" },
          { label: "TreeMap", detail: "TreeMap declaration", insertText: "TreeMap<${1:Integer}, ${2:Integer}> ${3:map} = new TreeMap<>();", documentation: "TreeMap class" },
          { label: "lhm", detail: "LinkedHashMap", insertText: "LinkedHashMap<${1:String}, ${2:Integer}> ${3:map} = new LinkedHashMap<>();", documentation: "New LinkedHashMap (insertion order)" },
          { label: "set", detail: "HashSet", insertText: "Set<${1:Integer}> ${2:set} = new HashSet<>();", documentation: "New HashSet" },
          { label: "HashSet", detail: "HashSet declaration", insertText: "HashSet<${1:Integer}> ${2:set} = new HashSet<>();", documentation: "HashSet class" },
          { label: "Set", detail: "Set declaration", insertText: "Set<${1:Integer}> ${2:set} = new HashSet<>();", documentation: "Set interface" },
          { label: "tset", detail: "TreeSet", insertText: "TreeSet<${1:Integer}> ${2:set} = new TreeSet<>();", documentation: "New TreeSet (sorted)" },
          { label: "TreeSet", detail: "TreeSet declaration", insertText: "TreeSet<${1:Integer}> ${2:set} = new TreeSet<>();", documentation: "TreeSet class" },
          { label: "lhs", detail: "LinkedHashSet", insertText: "LinkedHashSet<${1:Integer}> ${2:set} = new LinkedHashSet<>();", documentation: "New LinkedHashSet" },
          { label: "st", detail: "Stack", insertText: "Stack<${1:Integer}> ${2:stack} = new Stack<>();", documentation: "New Stack" },
          { label: "Stack", detail: "Stack declaration", insertText: "Stack<${1:Integer}> ${2:stack} = new Stack<>();", documentation: "Stack class" },
          { label: "que", detail: "Queue (LinkedList)", insertText: "Queue<${1:Integer}> ${2:queue} = new LinkedList<>();", documentation: "New Queue" },
          { label: "Queue", detail: "Queue declaration", insertText: "Queue<${1:Integer}> ${2:queue} = new LinkedList<>();", documentation: "Queue interface" },
          { label: "deq", detail: "Deque (ArrayDeque)", insertText: "Deque<${1:Integer}> ${2:deque} = new ArrayDeque<>();", documentation: "New ArrayDeque" },
          { label: "Deque", detail: "Deque declaration", insertText: "Deque<${1:Integer}> ${2:deque} = new ArrayDeque<>();", documentation: "Deque interface" },
          { label: "pq", detail: "PriorityQueue (min)", insertText: "PriorityQueue<${1:Integer}> ${2:pq} = new PriorityQueue<>();", documentation: "Min-heap PriorityQueue" },
          { label: "PriorityQueue", detail: "PriorityQueue declaration", insertText: "PriorityQueue<${1:Integer}> ${2:pq} = new PriorityQueue<>();", documentation: "PriorityQueue class" },
          { label: "pqmax", detail: "PriorityQueue (max)", insertText: "PriorityQueue<${1:Integer}> ${2:pq} = new PriorityQueue<>(Collections.reverseOrder());", documentation: "Max-heap PriorityQueue" },
          { label: "pqcust", detail: "PriorityQueue custom comparator", insertText: "PriorityQueue<${1:int[]}> ${2:pq} = new PriorityQueue<>((a, b) -> ${3:a[0] - b[0]});", documentation: "PriorityQueue with custom comparator" },

          // === Arrays ===
          { label: "arr", detail: "Array declaration", insertText: "${1:int}[] ${2:arr} = new ${1:int}[${3:n}];", documentation: "New array" },
          { label: "arr2d", detail: "2D Array", insertText: "${1:int}[][] ${2:arr} = new ${1:int}[${3:n}][${4:m}];", documentation: "New 2D array" },
          { label: "arrf", detail: "Arrays.fill", insertText: "Arrays.fill(${1:arr}, ${2:value});", documentation: "Fill array" },
          { label: "arrs", detail: "Arrays.sort", insertText: "Arrays.sort(${1:arr});", documentation: "Sort array" },
          { label: "arrsc", detail: "Arrays.sort custom", insertText: "Arrays.sort(${1:arr}, (a, b) -> ${2:a[0] - b[0]});", documentation: "Sort with comparator" },
          { label: "arrcpy", detail: "Arrays.copyOf", insertText: "int[] ${1:copy} = Arrays.copyOf(${2:arr}, ${3:arr.length});", documentation: "Copy array" },
          { label: "arrbs", detail: "Binary search", insertText: "int ${1:idx} = Arrays.binarySearch(${2:arr}, ${3:key});", documentation: "Binary search in sorted array" },

          // === Scanner / IO ===
          { label: "sc", detail: "Scanner", insertText: "Scanner ${1:sc} = new Scanner(System.in);", documentation: "New Scanner" },
          { label: "br", detail: "BufferedReader", insertText: "BufferedReader ${1:br} = new BufferedReader(new InputStreamReader(System.in));", documentation: "BufferedReader for fast input" },
          { label: "pw", detail: "PrintWriter", insertText: "PrintWriter ${1:out} = new PrintWriter(new BufferedOutputStream(System.out));", documentation: "PrintWriter for fast output" },
          { label: "stk", detail: "StringTokenizer", insertText: "StringTokenizer ${1:st} = new StringTokenizer(${2:br.readLine()});", documentation: "StringTokenizer for parsing" },
          { label: "nxi", detail: "nextInt()", insertText: "${1:sc}.nextInt()", documentation: "Read int" },
          { label: "nxl", detail: "nextLong()", insertText: "${1:sc}.nextLong()", documentation: "Read long" },
          { label: "nxd", detail: "nextDouble()", insertText: "${1:sc}.nextDouble()", documentation: "Read double" },
          { label: "nxs", detail: "next()", insertText: "${1:sc}.next()", documentation: "Read string" },
          { label: "nxln", detail: "nextLine()", insertText: "${1:sc}.nextLine()", documentation: "Read line" },

          // === Collections utility ===
          { label: "colsort", detail: "Collections.sort", insertText: "Collections.sort(${1:list});", documentation: "Sort list" },
          { label: "colrev", detail: "Collections.reverse", insertText: "Collections.reverse(${1:list});", documentation: "Reverse list" },
          { label: "colmin", detail: "Collections.min", insertText: "Collections.min(${1:list})", documentation: "Min of collection" },
          { label: "colmax", detail: "Collections.max", insertText: "Collections.max(${1:list})", documentation: "Max of collection" },
          { label: "colfreq", detail: "Collections.frequency", insertText: "Collections.frequency(${1:list}, ${2:element})", documentation: "Count occurrences" },
          { label: "colswap", detail: "Collections.swap", insertText: "Collections.swap(${1:list}, ${2:i}, ${3:j});", documentation: "Swap elements" },

          // === Strings ===
          { label: "sb", detail: "StringBuilder", insertText: "StringBuilder ${1:sb} = new StringBuilder();", documentation: "New StringBuilder" },
          { label: "sba", detail: "sb.append()", insertText: "${1:sb}.append(${2});", documentation: "Append to StringBuilder" },
          { label: "str2arr", detail: "String to char[]", insertText: "char[] ${1:chars} = ${2:str}.toCharArray();", documentation: "String to char array" },
          { label: "str2int", detail: "String to int", insertText: "int ${1:num} = Integer.parseInt(${2:str});", documentation: "Parse string to int" },
          { label: "int2str", detail: "int to String", insertText: "String ${1:str} = String.valueOf(${2:num});", documentation: "Int to string" },

          // === Math ===
          { label: "mathmax", detail: "Math.max", insertText: "Math.max(${1:a}, ${2:b})", documentation: "Maximum of two" },
          { label: "mathmin", detail: "Math.min", insertText: "Math.min(${1:a}, ${2:b})", documentation: "Minimum of two" },
          { label: "mathabs", detail: "Math.abs", insertText: "Math.abs(${1:a})", documentation: "Absolute value" },
          { label: "mathpow", detail: "Math.pow", insertText: "(int) Math.pow(${1:base}, ${2:exp})", documentation: "Power" },
          { label: "mathsqrt", detail: "Math.sqrt", insertText: "Math.sqrt(${1:n})", documentation: "Square root" },
          { label: "intmax", detail: "Integer.MAX_VALUE", insertText: "Integer.MAX_VALUE", documentation: "Int max value" },
          { label: "intmin", detail: "Integer.MIN_VALUE", insertText: "Integer.MIN_VALUE", documentation: "Int min value" },
          { label: "lmax", detail: "Long.MAX_VALUE", insertText: "Long.MAX_VALUE", documentation: "Long max value" },
          { label: "mod", detail: "MOD = 1e9+7", insertText: "static final int MOD = 1_000_000_007;", documentation: "Modular arithmetic constant" },

          // === CP Templates ===
          { label: "cptemplate", detail: "CP boilerplate", insertText: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n\tstatic BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n\tstatic PrintWriter out = new PrintWriter(new BufferedOutputStream(System.out));\n\n\tpublic static void main(String[] args) throws IOException {\n\t\tint t = Integer.parseInt(br.readLine().trim());\n\t\twhile (t-- > 0) {\n\t\t\tsolve();\n\t\t}\n\t\tout.flush();\n\t\tout.close();\n\t}\n\n\tstatic void solve() throws IOException {\n\t\tStringTokenizer st = new StringTokenizer(br.readLine());\n\t\tint n = Integer.parseInt(st.nextToken());\n\t\t${1}\n\t}\n}", documentation: "Full competitive programming template" },
          { label: "pair", detail: "Pair class", insertText: "static class Pair implements Comparable<Pair> {\n\tint first, second;\n\tPair(int f, int s) { first = f; second = s; }\n\tpublic int compareTo(Pair o) { return first != o.first ? first - o.first : second - o.second; }\n}", documentation: "Pair class for CP" },
          { label: "gcd", detail: "GCD function", insertText: "static int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }", documentation: "Greatest common divisor" },
          { label: "lcm", detail: "LCM function", insertText: "static long lcm(long a, long b) { return a / gcd(a, b) * b; }", documentation: "Least common multiple" },
          { label: "modpow", detail: "Modular exponentiation", insertText: "static long modpow(long base, long exp, long mod) {\n\tlong result = 1;\n\tbase %= mod;\n\twhile (exp > 0) {\n\t\tif ((exp & 1) == 1) result = result * base % mod;\n\t\texp >>= 1;\n\t\tbase = base * base % mod;\n\t}\n\treturn result;\n}", documentation: "Fast power with mod" },
          { label: "bsearch", detail: "Binary search template", insertText: "int lo = ${1:0}, hi = ${2:n - 1}, ans = -1;\nwhile (lo <= hi) {\n\tint mid = lo + (hi - lo) / 2;\n\tif (${3:check(mid)}) {\n\t\tans = mid;\n\t\tlo = mid + 1;\n\t} else {\n\t\thi = mid - 1;\n\t}\n}", documentation: "Binary search template" },
        ];

        const priorityLabels = new Set(["main", "psvm", "sout", "ArrayList", "HashMap", "List", "Set", "Map", "Scanner", "PriorityQueue"]);

        return {
          suggestions: snippets.map((s) => ({
            label: s.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: s.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: s.detail,
            documentation: s.documentation,
            filterText: `${s.label} ${s.detail}`,
            sortText: `${priorityLabels.has(s.label) ? "0" : "1"}_${s.label.toLowerCase()}`,
            range,
          })),
        };
      },
    });

    // Ctrl+Enter / Cmd+Enter to run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
  };

  const formatCode = useCallback(() => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }, []);

  const resetCode = useCallback(() => {
    setCode(DEFAULT_CODE);
    setOutput("");
    setStdin("");
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    try {
      // Wandbox saves code as prog.java, so strip 'public' from class declarations
      // and inject common Java imports for CP snippets (Scanner, List, Map, etc.)
      const processedCode = addAutoImports(code).replace(/public\s+class\s+/g, "class ");
      const res = await fetch(WANDBOX_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: processedCode,
          compiler: selectedCompiler.compiler,
          stdin,
          "compiler-option-raw": "",
          "runtime-option-raw": "",
          save: false,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setOutput(`⚠ Compile service error (${res.status}): ${errorText || "Unknown error"}`);
        return;
      }

      const data = await res.json();
      const parts: string[] = [];

      if (data.compiler_error) {
        parts.push(`⚠ Compilation Error:\n${data.compiler_error}`);
      }
      if (data.compiler_message && !data.compiler_error) {
        parts.push(`Compiler: ${data.compiler_message}`);
      }
      if (data.program_output) {
        parts.push(data.program_output);
      }
      if (data.program_error) {
        parts.push(`\n⚠ Runtime Error:\n${data.program_error}`);
      }

      setOutput(parts.join("\n") || "✓ Program executed successfully (no output)");
    } catch (err) {
      setOutput(`⚠ Could not connect to compiler.\n${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, stdin, selectedCompiler]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col" style={{ background: "hsl(var(--background))" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0 gap-2 flex-wrap"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
          >
            <Code2 size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
              Java Playground
            </h1>
            <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
              Write · Compile · Run
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Java version selector */}
          <div className="relative">
            <button
              onClick={() => setShowCompilerMenu(!showCompilerMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={{ background: "hsl(var(--success)/0.1)", color: "hsl(var(--success))", border: "1px solid hsl(var(--success)/0.25)" }}
            >
              ☕ {selectedCompiler.label}
              <ChevronDown size={11} />
            </button>
            {showCompilerMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCompilerMenu(false)} />
                <div
                  className="absolute left-0 top-full mt-1 w-48 rounded-xl overflow-hidden z-50 shadow-lg"
                  style={{ backgroundColor: "hsl(var(--popover))", color: "hsl(var(--popover-foreground))", border: "1px solid hsl(var(--border))" }}
                >
                  {availableCompilers.map((c) => (
                    <button
                      key={c.compiler}
                      onClick={() => { setSelectedCompiler(c); setShowCompilerMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] transition-colors hover:bg-muted"
                      style={{
                        color: selectedCompiler.compiler === c.compiler ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        fontWeight: selectedCompiler.compiler === c.compiler ? 600 : 400,
                      }}
                    >
                      ☕ {c.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }}
            >
              {currentTheme.icon}
              {currentTheme.label}
              <ChevronDown size={11} />
            </button>
            {showThemeMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowThemeMenu(false)} />
                <div
                  className="absolute left-0 top-full mt-1 w-48 rounded-xl overflow-hidden z-50 shadow-lg"
                  style={{ backgroundColor: "hsl(var(--popover))", color: "hsl(var(--popover-foreground))", border: "1px solid hsl(var(--border))" }}
                >
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setCurrentTheme(t); setShowThemeMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] transition-colors hover:bg-muted"
                      style={{
                        color: currentTheme.id === t.id ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        fontWeight: currentTheme.id === t.id ? 600 : 400,
                      }}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Format */}
          <button
            onClick={formatCode}
            title="Format Code"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            <AlignLeft size={13} />
            Format
          </button>

          {/* Copy */}
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>

          {/* Reset */}
          <button
            onClick={resetCode}
            title="Reset to default"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-muted"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            <RotateCcw size={13} />
            Reset
          </button>


          <button
            onClick={runCode}
            disabled={isRunning || !code.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all disabled:opacity-50"
            style={{
              background: "var(--gradient-primary)",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 2px 12px hsl(var(--primary)/0.3)",
            }}
          >
            {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
            {isRunning ? "Running..." : "Run ⌘↵"}
          </button>
        </div>
      </div>

      {/* Editor + Output with resizable panels */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <div className="flex flex-col h-full">
              {/* File tab */}
              <div className="flex items-center gap-2 px-4 py-1.5 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--accent))" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--warning))" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--success))" }} />
                </div>
                <span className="text-[11px] font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>Main.java</span>
                <span className="text-[9px] font-mono ml-auto px-2 py-0.5 rounded" style={{ background: "hsl(var(--success)/0.1)", color: "hsl(var(--success))" }}>
                  {selectedCompiler.label}
                </span>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  language="java"
                  theme={currentTheme.id}
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  onMount={handleEditorMount}
                  options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                    fontLigatures: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: "on",
                    renderLineHighlight: "line",
                    bracketPairColorization: { enabled: true },
                    autoClosingBrackets: "always",
                    autoClosingQuotes: "always",
                    formatOnPaste: true,
                    suggest: { showKeywords: true, showSnippets: true },
                    quickSuggestions: { other: true, comments: false, strings: true },
                    quickSuggestionsDelay: 0,
                    suggestOnTriggerCharacters: true,
                    snippetSuggestions: "top",
                    tabSize: 4,
                    wordWrap: "on",
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                  }}
                />
              </div>

            </div>
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle withHandle />

          {/* Right Panel: Input (top) + Output (bottom) */}
          <ResizablePanel defaultSize={45} minSize={20}>
            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* Input Panel - always visible */}
              <ResizablePanel defaultSize={30} minSize={15}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 px-3 py-1.5 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}>
                    <Keyboard size={12} style={{ color: "hsl(var(--muted-foreground))" }} />
                    <span className="text-[10px] font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Standard Input (stdin)</span>
                  </div>
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Enter input for your program..."
                    className="flex-1 w-full px-4 py-2 font-mono text-xs resize-none outline-none"
                    style={{ background: "hsl(var(--card))", color: "hsl(var(--foreground))", caretColor: "hsl(var(--primary))" }}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Output Panel */}
              <ResizablePanel defaultSize={70} minSize={20}>
                <div className="flex flex-col h-full">
                  <div
                    className="flex items-center gap-2 px-4 py-1.5 border-b"
                    style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}
                  >
                    <Terminal size={12} style={{ color: "hsl(var(--success))" }} />
                    <span className="text-[10px] font-mono font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Output
                    </span>
                    {isRunning && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
                      >
                        compiling...
                      </motion.span>
                    )}
                    {output && !isRunning && (
                      <button
                        onClick={() => setOutput("")}
                        className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded hover:bg-muted"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex-1 min-h-0 overflow-auto">
                    <pre
                      className="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap h-full"
                      style={{
                        background: "hsl(var(--card))",
                        color: output.includes("Error") || output.includes("⚠")
                          ? "hsl(var(--accent))"
                          : "hsl(var(--success))",
                      }}
                    >
                      {output || (
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>
                          Click <strong>Run</strong> or press <kbd className="px-1.5 py-0.5 rounded text-[11px]" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>Ctrl+Enter</kbd> to compile & run...
                        </span>
                      )}
                    </pre>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
