import { ContentSection } from "./recursionContent";

// Java Fundamentals content
export const javaBasicsContent: ContentSection[] = [
  {
    id: "java-intro",
    title: "Introduction to Java",
    content: [
      {
        type: "text",
        content: "Java is a **high-level, class-based, object-oriented** programming language designed to have as few implementation dependencies as possible. It was developed by **James Gosling** at Sun Microsystems (now owned by Oracle) and released in **1995**. Java follows the principle of **WORA** — Write Once, Run Anywhere."
      },
      {
        type: "text",
        content: "Java is one of the most popular programming languages in the world, used for building enterprise applications, Android apps, web servers, big data processing, and much more."
      },
      {
        type: "note",
        content: "Java code is compiled into **bytecode** that runs on the **JVM (Java Virtual Machine)**, making it platform-independent."
      },
      {
        type: "text",
        content: "**Key Features of Java:**"
      },
      {
        type: "text",
        content: "• **Platform Independent** — Compiled bytecode runs on any JVM\n• **Object-Oriented** — Everything is an object (almost)\n• **Strongly Typed** — Variables must be declared with types\n• **Automatic Memory Management** — Garbage Collector handles memory\n• **Multithreaded** — Built-in support for concurrent programming\n• **Secure** — No explicit pointer manipulation, built-in security manager\n• **Rich Standard Library** — Huge collections, I/O, networking, concurrency APIs"
      },
      {
        type: "text",
        content: "**Java Editions:**"
      },
      {
        type: "text",
        content: "• **Java SE (Standard Edition)** — Core language, collections, I/O, concurrency\n• **Java EE (Enterprise Edition)** — Now Jakarta EE. Servlets, JPA, EJB\n• **Java ME (Micro Edition)** — For embedded/mobile devices"
      }
    ]
  },
  {
    id: "java-setup",
    title: "JDK Setup & First Program",
    content: [
      {
        type: "text",
        content: "To start coding in Java, you need the **JDK (Java Development Kit)** which includes the compiler (`javac`), the runtime (`java`), and standard libraries."
      },
      {
        type: "text",
        content: "**JDK vs JRE vs JVM:**"
      },
      {
        type: "text",
        content: "• **JVM** — Executes bytecode. Platform-specific.\n• **JRE** — JVM + core libraries. Runs Java programs.\n• **JDK** — JRE + development tools (compiler, debugger). Develops & runs Java programs."
      },
      {
        type: "code",
        language: "java",
        title: "Hello World — Your First Java Program",
        content: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Compile: javac HelloWorld.java
// Run:     java HelloWorld
// Output:  Hello, World!`
      },
      {
        type: "note",
        content: "The file name **must match** the public class name. `HelloWorld.java` contains `public class HelloWorld`."
      },
      {
        type: "text",
        content: "**Anatomy of a Java Program:**"
      },
      {
        type: "text",
        content: "• `public class HelloWorld` — Class declaration (entry point container)\n• `public static void main(String[] args)` — Main method (program entry point)\n• `System.out.println(...)` — Prints to console with newline\n• Every statement ends with a **semicolon** `;`\n• Code blocks are enclosed in **curly braces** `{}`"
      },
      {
        type: "code",
        language: "java",
        title: "Compilation & Execution Flow",
        content: `// Source Code (.java)
//     ↓ javac (compiler)
// Bytecode (.class)
//     ↓ java (JVM)
// Machine Code (execution)

// The JVM interprets bytecode OR uses JIT (Just-In-Time)
// compilation to convert hot bytecode to native machine code
// for better performance.`
      }
    ]
  },
  {
    id: "java-variables",
    title: "Variables & Data Types",
    content: [
      {
        type: "text",
        content: "Java is a **statically typed** language — every variable must be declared with a type before use. Java has **8 primitive types** and **reference types** (objects)."
      },
      {
        type: "code",
        language: "java",
        title: "Primitive Data Types",
        content: `public class DataTypes {
    public static void main(String[] args) {
        // Integer types
        byte   b = 127;            // 8-bit,  -128 to 127
        short  s = 32767;          // 16-bit, -32,768 to 32,767
        int    i = 2_147_483_647;  // 32-bit (most common)
        long   l = 9_223_372_036_854_775_807L; // 64-bit (note the L suffix)

        // Floating-point types
        float  f = 3.14f;          // 32-bit (note the f suffix)
        double d = 3.141592653589; // 64-bit (default for decimals)

        // Character type
        char   c = 'A';            // 16-bit Unicode character

        // Boolean type
        boolean flag = true;       // true or false

        // Print sizes
        System.out.println("int max: " + Integer.MAX_VALUE);
        System.out.println("long max: " + Long.MAX_VALUE);
        System.out.println("double max: " + Double.MAX_VALUE);
    }
}`
      },
      {
        type: "tip",
        content: "Use `int` for most integers, `long` for large numbers (like in CP), `double` for decimals, and `boolean` for flags."
      },
      {
        type: "code",
        language: "java",
        title: "Reference Types & Wrapper Classes",
        content: `public class ReferenceTypes {
    public static void main(String[] args) {
        // String (immutable reference type)
        String name = "AlgoGuru";
        String greeting = "Hello " + name;    // Concatenation

        // Wrapper classes (object versions of primitives)
        Integer  num  = 42;          // Autoboxing: int → Integer
        int      val  = num;         // Unboxing:   Integer → int
        Double   pi   = 3.14;
        Boolean  ok   = true;

        // Useful methods
        int parsed = Integer.parseInt("123");   // String → int
        String str = String.valueOf(456);       // int → String

        // null — reference types can be null
        String s = null;   // Valid
        // int x = null;   // ❌ Compile error: primitives can't be null

        // Default values (for class fields, NOT local variables)
        // int → 0, double → 0.0, boolean → false, Object → null
    }
}`
      },
      {
        type: "code",
        language: "java",
        title: "Variable Declaration & Scope",
        content: `public class Variables {
    // Instance variable (belongs to object)
    int instanceVar = 10;

    // Static variable (belongs to class)
    static int staticVar = 20;

    // Constant (final = cannot be reassigned)
    static final double PI = 3.14159265358979;

    public static void main(String[] args) {
        // Local variable (must be initialized before use)
        int localVar = 30;

        // var keyword (Java 10+) — type inference
        var list = new java.util.ArrayList<String>(); // inferred as ArrayList<String>
        var count = 100;                               // inferred as int

        // Multiple declarations
        int a = 1, b = 2, c = 3;

        System.out.println("local: " + localVar);
        System.out.println("static: " + staticVar);
        System.out.println("PI: " + PI);
    }
}`
      }
    ]
  },
  {
    id: "java-operators",
    title: "Operators & Expressions",
    content: [
      {
        type: "text",
        content: "Java provides a rich set of operators for arithmetic, comparison, logical, bitwise, and assignment operations."
      },
      {
        type: "code",
        language: "java",
        title: "All Java Operators",
        content: `public class Operators {
    public static void main(String[] args) {
        // ── Arithmetic Operators ──
        int a = 10, b = 3;
        System.out.println(a + b);   // 13   Addition
        System.out.println(a - b);   // 7    Subtraction
        System.out.println(a * b);   // 30   Multiplication
        System.out.println(a / b);   // 3    Integer division (truncates)
        System.out.println(a % b);   // 1    Modulus (remainder)

        // ── Increment / Decrement ──
        int x = 5;
        System.out.println(x++);     // 5  (post-increment: use then increment)
        System.out.println(x);       // 6
        System.out.println(++x);     // 7  (pre-increment: increment then use)

        // ── Comparison Operators ──
        System.out.println(10 > 5);   // true
        System.out.println(10 >= 10); // true
        System.out.println(10 == 10); // true
        System.out.println(10 != 5);  // true

        // ── Logical Operators ──
        boolean p = true, q = false;
        System.out.println(p && q);   // false  (AND — short-circuit)
        System.out.println(p || q);   // true   (OR  — short-circuit)
        System.out.println(!p);       // false  (NOT)

        // ── Assignment Operators ──
        int n = 10;
        n += 5;   // n = n + 5 → 15
        n -= 3;   // n = n - 3 → 12
        n *= 2;   // n = n * 2 → 24
        n /= 4;   // n = n / 4 → 6
        n %= 4;   // n = n % 4 → 2

        // ── Ternary Operator ──
        int max = (a > b) ? a : b;   // if a > b then a, else b

        // ── instanceof Operator ──
        String s = "hello";
        System.out.println(s instanceof String);  // true

        // ── Bitwise Operators (covered in Bit Manipulation topic) ──
        System.out.println(5 & 3);    // 1   AND
        System.out.println(5 | 3);    // 7   OR
        System.out.println(5 ^ 3);    // 6   XOR
        System.out.println(~5);       // -6  NOT
        System.out.println(5 << 1);   // 10  Left shift
        System.out.println(5 >> 1);   // 2   Right shift
    }
}`
      },
      {
        type: "note",
        content: "**Operator Precedence** (high → low): Unary (`++`, `--`, `!`) → Arithmetic (`*`, `/`, `%` → `+`, `-`) → Shift → Comparison → Bitwise → Logical → Ternary → Assignment. Use **parentheses** to make precedence explicit."
      }
    ]
  },
  {
    id: "java-control",
    title: "Control Flow (if/else, switch)",
    content: [
      {
        type: "text",
        content: "Control flow statements determine the order in which instructions are executed. Java supports **if-else**, **switch** (including enhanced switch expressions in Java 14+), and **ternary** operators."
      },
      {
        type: "code",
        language: "java",
        title: "If-Else & Nested Conditions",
        content: `public class ControlFlow {
    public static void main(String[] args) {
        int score = 85;

        // Simple if-else
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }
        // Output: Grade: B

        // Nested if
        int age = 25;
        boolean hasLicense = true;
        if (age >= 18) {
            if (hasLicense) {
                System.out.println("Can drive");
            } else {
                System.out.println("Get a license first");
            }
        }
    }
}`
      },
      {
        type: "code",
        language: "java",
        title: "Switch Statement & Switch Expressions (Java 14+)",
        content: `public class SwitchDemo {
    public static void main(String[] args) {
        // Traditional switch
        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other");
        }

        // Enhanced switch expression (Java 14+)
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6, 7 -> "Weekend";
            default -> "Invalid";
        };
        System.out.println(dayName); // Wednesday

        // Switch with String (Java 7+)
        String command = "start";
        switch (command) {
            case "start" -> System.out.println("Starting...");
            case "stop"  -> System.out.println("Stopping...");
            case "reset" -> System.out.println("Resetting...");
            default      -> System.out.println("Unknown command");
        }
    }
}`
      }
    ]
  },
  {
    id: "java-loops",
    title: "Loops (for, while, do-while)",
    content: [
      {
        type: "text",
        content: "Loops allow repeating a block of code. Java supports **for**, **enhanced for-each**, **while**, and **do-while** loops, along with **break**, **continue**, and **labeled** loop control."
      },
      {
        type: "code",
        language: "java",
        title: "All Loop Types",
        content: `public class Loops {
    public static void main(String[] args) {
        // ── Standard for loop ──
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " "); // 0 1 2 3 4
        }
        System.out.println();

        // ── Enhanced for-each loop ──
        int[] arr = {10, 20, 30, 40, 50};
        for (int val : arr) {
            System.out.print(val + " "); // 10 20 30 40 50
        }
        System.out.println();

        // ── While loop ──
        int n = 5;
        while (n > 0) {
            System.out.print(n + " "); // 5 4 3 2 1
            n--;
        }
        System.out.println();

        // ── Do-While loop (executes at least once) ──
        int x = 0;
        do {
            System.out.print(x + " "); // 0
            x++;
        } while (x < 0); // condition false, but body ran once
        System.out.println();

        // ── Break & Continue ──
        for (int i = 0; i < 10; i++) {
            if (i == 3) continue;  // Skip 3
            if (i == 7) break;     // Stop at 7
            System.out.print(i + " "); // 0 1 2 4 5 6
        }
        System.out.println();

        // ── Labeled Break (useful in nested loops) ──
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i == 1 && j == 1) break outer;
                System.out.print("[" + i + "," + j + "] ");
            }
        }
        // [0,0] [0,1] [0,2] [1,0]
    }
}`
      },
      {
        type: "tip",
        content: "In competitive programming, use `for` loops for known iterations and `while` loops for condition-based iterations. **Labeled breaks** are handy for breaking out of nested loops cleanly."
      }
    ]
  },
  {
    id: "java-arrays",
    title: "Arrays & Multi-dimensional Arrays",
    content: [
      {
        type: "text",
        content: "An **array** is a fixed-size, indexed collection of elements of the same type. Java arrays are **objects** and are stored on the heap. They have a fixed `.length` property."
      },
      {
        type: "code",
        language: "java",
        title: "1D Arrays — Declaration, Initialization & Operations",
        content: `import java.util.Arrays;

public class ArrayDemo {
    public static void main(String[] args) {
        // Declaration + initialization
        int[] arr1 = new int[5];              // [0, 0, 0, 0, 0]
        int[] arr2 = {10, 20, 30, 40, 50};   // Literal initialization
        int[] arr3 = new int[]{1, 2, 3};      // Another form

        // Access & modify
        arr1[0] = 100;
        System.out.println(arr2[2]);   // 30
        System.out.println(arr2.length); // 5

        // Iterate
        for (int i = 0; i < arr2.length; i++) {
            System.out.print(arr2[i] + " ");
        }

        // Arrays utility class
        Arrays.sort(arr2);                          // Sort ascending
        System.out.println(Arrays.toString(arr2));   // [10, 20, 30, 40, 50]
        int idx = Arrays.binarySearch(arr2, 30);     // Binary search (sorted array)
        Arrays.fill(arr1, 7);                        // Fill all elements with 7
        int[] copy = Arrays.copyOf(arr2, 3);         // Copy first 3 elements
        boolean eq = Arrays.equals(arr2, copy);      // Compare arrays
    }
}`
      },
      {
        type: "code",
        language: "java",
        title: "2D Arrays (Matrix)",
        content: `public class Matrix {
    public static void main(String[] args) {
        // 2D array (3 rows × 4 columns)
        int[][] matrix = new int[3][4];

        // Literal initialization
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Access
        System.out.println(grid[1][2]); // 6 (row 1, col 2)

        // Iterate 2D array
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                System.out.print(grid[i][j] + " ");
            }
            System.out.println();
        }

        // Jagged array (rows of different lengths)
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1, 2};
        jagged[1] = new int[]{3, 4, 5};
        jagged[2] = new int[]{6};
    }
}`
      }
    ]
  },
  {
    id: "java-strings",
    title: "Strings & String Methods",
    content: [
      {
        type: "text",
        content: "Strings in Java are **immutable** reference types. Once created, a String's value cannot be changed — any modification creates a **new** String object. For mutable strings, use **StringBuilder** or **StringBuffer**."
      },
      {
        type: "code",
        language: "java",
        title: "String Methods & Operations",
        content: `public class StringDemo {
    public static void main(String[] args) {
        String s = "Hello, World!";

        // Basic methods
        System.out.println(s.length());          // 13
        System.out.println(s.charAt(0));         // 'H'
        System.out.println(s.substring(7));      // "World!"
        System.out.println(s.substring(0, 5));   // "Hello"
        System.out.println(s.indexOf("World"));  // 7
        System.out.println(s.contains("World")); // true
        System.out.println(s.toUpperCase());     // "HELLO, WORLD!"
        System.out.println(s.toLowerCase());     // "hello, world!"
        System.out.println(s.trim());            // Remove leading/trailing spaces
        System.out.println(s.replace("World", "Java")); // "Hello, Java!"
        System.out.println(s.startsWith("Hello"));       // true
        System.out.println(s.isEmpty());                  // false

        // String comparison
        String a = "hello", b = "hello";
        System.out.println(a == b);        // true  (string pool)
        System.out.println(a.equals(b));   // true  (ALWAYS use this!)

        String c = new String("hello");
        System.out.println(a == c);        // false (different objects!)
        System.out.println(a.equals(c));   // true

        // Split & Join
        String csv = "a,b,c,d";
        String[] parts = csv.split(",");        // ["a", "b", "c", "d"]
        String joined = String.join("-", parts); // "a-b-c-d"

        // char[] ↔ String
        char[] chars = s.toCharArray();
        String fromChars = new String(chars);
    }
}`
      },
      {
        type: "code",
        language: "java",
        title: "StringBuilder — Mutable Strings",
        content: `public class StringBuilderDemo {
    public static void main(String[] args) {
        // StringBuilder is mutable and much faster for concatenation
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        System.out.println(sb.toString()); // "Hello World"

        sb.insert(5, ",");       // "Hello, World"
        sb.delete(5, 6);         // "Hello World"
        sb.reverse();            // "dlroW olleH"
        sb.setCharAt(0, 'D');    // "DlroW olleH"

        // Why StringBuilder matters:
        // ❌ Slow — creates n new String objects
        String result = "";
        for (int i = 0; i < 10000; i++) {
            result += i;  // O(n²) total
        }

        // ✅ Fast — modifies in-place
        StringBuilder fast = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            fast.append(i);  // O(n) total
        }
    }
}`
      },
      {
        type: "warning",
        content: "**Never** use `==` to compare Strings! Always use `.equals()`. The `==` operator compares **references** (memory addresses), not content."
      }
    ]
  },
  {
    id: "java-input",
    title: "Scanner & User Input",
    content: [
      {
        type: "text",
        content: "The `Scanner` class is the most common way to read user input in Java. For competitive programming, `BufferedReader` is faster."
      },
      {
        type: "code",
        language: "java",
        title: "Scanner Usage & BufferedReader for CP",
        content: `import java.util.Scanner;
import java.io.*;

public class InputDemo {
    public static void main(String[] args) throws IOException {
        // ── Scanner (simple, slower) ──
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter an integer: ");
        int n = sc.nextInt();

        System.out.print("Enter a double: ");
        double d = sc.nextDouble();

        sc.nextLine(); // consume leftover newline!

        System.out.print("Enter a line: ");
        String line = sc.nextLine();

        System.out.print("Enter a word: ");
        String word = sc.next();

        sc.close();

        // ── BufferedReader (fast, preferred for CP) ──
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();              // Read full line
        int x = Integer.parseInt(br.readLine()); // Read integer

        // Read multiple integers from one line
        String[] tokens = br.readLine().split(" ");
        int a = Integer.parseInt(tokens[0]);
        int b = Integer.parseInt(tokens[1]);

        // Fast output
        PrintWriter pw = new PrintWriter(new BufferedOutputStream(System.out));
        pw.println("Result: " + (a + b));
        pw.flush();
    }
}`
      },
      {
        type: "tip",
        content: "In competitive programming, always use **BufferedReader + PrintWriter** instead of Scanner + System.out.println for 5-10x faster I/O."
      }
    ]
  },
  {
    id: "java-typecasting",
    title: "Type Casting & Conversion",
    content: [
      {
        type: "text",
        content: "Type casting is converting a value from one type to another. Java supports **implicit (widening)** and **explicit (narrowing)** casting."
      },
      {
        type: "code",
        language: "java",
        title: "Type Casting in Java",
        content: `public class TypeCasting {
    public static void main(String[] args) {
        // ── Widening (Implicit) — smaller → larger, no data loss ──
        // byte → short → int → long → float → double
        int i = 100;
        long l = i;        // int → long (automatic)
        double d = l;      // long → double (automatic)

        // ── Narrowing (Explicit) — larger → smaller, possible data loss ──
        double pi = 3.14159;
        int truncated = (int) pi;     // 3 (decimal part lost!)

        long big = 1_000_000_000_000L;
        int overflow = (int) big;     // Overflow! Unexpected value

        // ── char ↔ int ──
        char c = 'A';
        int ascii = c;         // 65
        char back = (char) 65; // 'A'

        // ── String conversions ──
        // Primitive → String
        String s1 = String.valueOf(42);
        String s2 = Integer.toString(42);
        String s3 = "" + 42;    // Concatenation trick

        // String → Primitive
        int n    = Integer.parseInt("123");
        double f = Double.parseDouble("3.14");
        long ll  = Long.parseLong("9876543210");

        // ── Object casting ──
        Object obj = "Hello";         // Upcasting (implicit)
        String str = (String) obj;    // Downcasting (explicit)

        // Safe casting with instanceof
        if (obj instanceof String s) {  // Pattern matching (Java 16+)
            System.out.println(s.toUpperCase());
        }
    }
}`
      },
      {
        type: "warning",
        content: "Be careful with **narrowing casts** — they can silently overflow or lose precision. Always check ranges when casting `long` → `int` or `double` → `int`."
      }
    ]
  }
];

// Placeholder content maps for other Java topics
export const javaOOPContent: ContentSection[] = [
  {
    id: "oop-classes",
    title: "Classes & Objects",
    content: [
      { type: "text", content: "A **class** is a blueprint for creating objects. An **object** is an instance of a class that holds its own copy of instance variables." },
      { type: "code", language: "java", title: "Defining & Using Classes", content: `public class Student {
    // Instance variables (fields)
    String name;
    int age;
    double gpa;

    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    // Method
    public void display() {
        System.out.println(name + " | Age: " + age + " | GPA: " + gpa);
    }

    // toString override
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", gpa=" + gpa + "}";
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 20, 3.8);
        Student s2 = new Student("Bob", 22, 3.5);

        s1.display();        // Alice | Age: 20 | GPA: 3.8
        System.out.println(s2); // Student{name='Bob', age=22, gpa=3.5}

        // Object comparison
        System.out.println(s1 == s2);      // false (different references)
        System.out.println(s1.equals(s2)); // false (default: reference equality)
    }
}` },
      { type: "note", content: "By default, `equals()` compares references. Override it (along with `hashCode()`) for meaningful content-based equality." }
    ]
  },
  {
    id: "oop-constructors",
    title: "Constructors & this Keyword",
    content: [
      { type: "text", content: "A **constructor** is a special method called when an object is created. It initializes the object. Java supports **default**, **parameterized**, and **copy** constructors, as well as **constructor chaining** using `this()`." },
      { type: "code", language: "java", title: "Constructor Types & Chaining", content: `public class Rectangle {
    double width, height;

    // Default constructor
    public Rectangle() {
        this(1.0, 1.0); // Chain to parameterized constructor
    }

    // Parameterized constructor
    public Rectangle(double width, double height) {
        this.width = width;   // 'this' distinguishes field from parameter
        this.height = height;
    }

    // Copy constructor
    public Rectangle(Rectangle other) {
        this(other.width, other.height);
    }

    public double area() {
        return width * height;
    }

    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();         // 1×1
        Rectangle r2 = new Rectangle(5, 3);     // 5×3
        Rectangle r3 = new Rectangle(r2);       // Copy of r2

        System.out.println(r1.area()); // 1.0
        System.out.println(r2.area()); // 15.0
        System.out.println(r3.area()); // 15.0
    }
}` }
    ]
  },
  {
    id: "oop-encapsulation",
    title: "Encapsulation & Access Modifiers",
    content: [
      { type: "text", content: "**Encapsulation** means bundling data (fields) and methods that operate on the data into a single unit (class), and restricting direct access to some of the object's components." },
      { type: "code", language: "java", title: "Access Modifiers & Getters/Setters", content: `public class BankAccount {
    // private — only accessible within this class
    private double balance;
    private String owner;

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    // public getter
    public double getBalance() {
        return balance;
    }

    // public setter with validation
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }

    // Access Modifier Summary:
    // public    — accessible from anywhere
    // private   — accessible only within the class
    // protected — accessible within package + subclasses
    // (default) — accessible within the package only (no keyword)
}` },
      { type: "tip", content: "Always make fields **private** and provide **public getters/setters** with validation. This is the cornerstone of encapsulation." }
    ]
  },
  {
    id: "oop-inheritance",
    title: "Inheritance & super Keyword",
    content: [
      { type: "text", content: "**Inheritance** allows a class to acquire properties and methods of another class using the `extends` keyword. Java supports **single inheritance** (one parent class) but a class can implement **multiple interfaces**." },
      { type: "code", language: "java", title: "Inheritance, super & Method Overriding", content: `// Parent class
class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println(name + " makes a sound");
    }

    void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class
class Dog extends Animal {
    String breed;

    Dog(String name, String breed) {
        super(name);          // Call parent constructor
        this.breed = breed;
    }

    @Override                  // Method overriding
    void speak() {
        System.out.println(name + " barks! (Breed: " + breed + ")");
    }

    void fetch() {             // New method in child
        System.out.println(name + " fetches the ball");
    }
}

// Main
public class InheritanceDemo {
    public static void main(String[] args) {
        Dog d = new Dog("Buddy", "Golden Retriever");
        d.speak();   // Buddy barks! (Breed: Golden Retriever)
        d.eat();     // Buddy is eating (inherited)
        d.fetch();   // Buddy fetches the ball

        // Polymorphic reference
        Animal a = new Dog("Rex", "German Shepherd");
        a.speak();   // Rex barks! (dynamic dispatch)
        // a.fetch(); // ❌ Compile error — Animal doesn't have fetch()
    }
}` }
    ]
  },
  {
    id: "oop-polymorphism",
    title: "Polymorphism (Overloading/Overriding)",
    content: [
      { type: "text", content: "**Polymorphism** means \"many forms\". In Java:\n• **Compile-time** (static) polymorphism → Method **Overloading**\n• **Runtime** (dynamic) polymorphism → Method **Overriding**" },
      { type: "code", language: "java", title: "Method Overloading & Overriding", content: `class Calculator {
    // Method Overloading — same name, different parameters
    int add(int a, int b)           { return a + b; }
    double add(double a, double b)  { return a + b; }
    int add(int a, int b, int c)    { return a + b + c; }
}

class Shape {
    double area() { return 0; }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }

    @Override
    double area() { return Math.PI * radius * radius; }
}

class Square extends Shape {
    double side;
    Square(double s) { this.side = s; }

    @Override
    double area() { return side * side; }
}

public class PolymorphismDemo {
    // Polymorphic method — works with any Shape
    static void printArea(Shape s) {
        System.out.printf("Area: %.2f%n", s.area());
    }

    public static void main(String[] args) {
        // Compile-time polymorphism
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));       // 5
        System.out.println(calc.add(2.5, 3.5));   // 6.0
        System.out.println(calc.add(1, 2, 3));    // 6

        // Runtime polymorphism
        Shape[] shapes = { new Circle(5), new Square(4) };
        for (Shape s : shapes) {
            printArea(s); // Dynamic dispatch — calls correct area()
        }
        // Area: 78.54
        // Area: 16.00
    }
}` }
    ]
  },
  {
    id: "oop-abstraction",
    title: "Abstract Classes & Interfaces",
    content: [
      { type: "text", content: "**Abstraction** hides implementation details and shows only functionality.\n• **Abstract class** — Can have abstract + concrete methods, fields, constructors. Supports single inheritance.\n• **Interface** — Pure contract (all methods abstract by default, Java 8+ allows default/static methods). Supports multiple inheritance." },
      { type: "code", language: "java", title: "Abstract Class vs Interface", content: `// Abstract class
abstract class Vehicle {
    String brand;

    Vehicle(String brand) { this.brand = brand; }

    abstract void start();    // Must be implemented by subclass

    void stop() {             // Concrete method
        System.out.println(brand + " stopped");
    }
}

// Interface
interface Electric {
    void charge();                          // abstract (implicit)
    default void batteryStatus() {          // default method (Java 8+)
        System.out.println("Battery OK");
    }
    static int maxVoltage() { return 400; } // static method
}

interface GPS {
    void navigate(String destination);
}

// Class can extend ONE abstract class + implement MULTIPLE interfaces
class Tesla extends Vehicle implements Electric, GPS {
    Tesla() { super("Tesla"); }

    @Override
    void start() { System.out.println("Tesla silently starts"); }

    @Override
    public void charge() { System.out.println("Supercharging..."); }

    @Override
    public void navigate(String dest) {
        System.out.println("Navigating to " + dest);
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        Tesla t = new Tesla();
        t.start();                  // Tesla silently starts
        t.stop();                   // Tesla stopped
        t.charge();                 // Supercharging...
        t.batteryStatus();          // Battery OK
        t.navigate("San Francisco");// Navigating to San Francisco
    }
}` }
    ]
  },
  {
    id: "oop-static",
    title: "Static Members & Methods",
    content: [
      { type: "text", content: "**Static** members belong to the **class itself**, not to any instance. They're shared across all objects of the class." },
      { type: "code", language: "java", title: "Static Fields, Methods & Blocks", content: `public class Counter {
    private static int count = 0; // Shared across all instances
    private int id;

    // Static block — runs once when class is loaded
    static {
        System.out.println("Counter class loaded!");
    }

    public Counter() {
        count++;
        this.id = count;
    }

    // Static method — can only access static members
    public static int getCount() {
        return count;
        // return id; // ❌ Cannot access instance var from static method
    }

    public int getId() { return id; }

    public static void main(String[] args) {
        System.out.println(Counter.getCount()); // 0

        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();

        System.out.println(Counter.getCount()); // 3
        System.out.println(c1.getId());         // 1
        System.out.println(c2.getId());         // 2

        // Static import
        // import static java.lang.Math.*;
        // double r = sqrt(25); // Instead of Math.sqrt(25)
    }
}` }
    ]
  },
  {
    id: "oop-inner",
    title: "Inner & Anonymous Classes",
    content: [
      { type: "text", content: "Java supports **inner classes** (non-static nested), **static nested classes**, **local classes** (inside methods), and **anonymous classes** (unnamed inline implementations)." },
      { type: "code", language: "java", title: "Inner & Anonymous Classes", content: `import java.util.*;

public class OuterClass {
    private int x = 10;

    // Inner class — has access to outer's private members
    class Inner {
        void show() {
            System.out.println("Outer x = " + x);
        }
    }

    // Static nested class — no access to instance members
    static class StaticNested {
        void show() {
            System.out.println("I'm static nested");
            // System.out.println(x); // ❌ Can't access instance var
        }
    }

    public static void main(String[] args) {
        // Inner class usage
        OuterClass outer = new OuterClass();
        OuterClass.Inner inner = outer.new Inner();
        inner.show(); // Outer x = 10

        // Static nested class
        OuterClass.StaticNested sn = new OuterClass.StaticNested();
        sn.show();

        // Anonymous class — implements interface inline
        Comparator<String> comp = new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.length() - b.length();
            }
        };

        // Same thing with lambda (Java 8+)
        Comparator<String> lambdaComp = (a, b) -> a.length() - b.length();

        List<String> words = Arrays.asList("banana", "fig", "apple");
        words.sort(lambdaComp);
        System.out.println(words); // [fig, apple, banana]
    }
}` }
    ]
  },
  {
    id: "oop-enums",
    title: "Enums & Annotations",
    content: [
      { type: "text", content: "**Enums** are special classes that represent a fixed set of constants. They can have fields, methods, and constructors." },
      { type: "code", language: "java", title: "Enum with Methods & Fields", content: `enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6),
    MARS   (6.421e+23, 3.3972e6);

    private final double mass;    // in kg
    private final double radius;  // in meters

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    // Gravitational constant
    static final double G = 6.67300E-11;

    double surfaceGravity() {
        return G * mass / (radius * radius);
    }

    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        double earthWeight = 75.0;
        double mass = earthWeight / Planet.EARTH.surfaceGravity();

        for (Planet p : Planet.values()) {
            System.out.printf("Your weight on %s is %.2f N%n",
                p, p.surfaceWeight(mass));
        }

        // Enum methods
        Planet p = Planet.valueOf("MARS"); // String → Enum
        System.out.println(p.ordinal());   // 3 (index)
        System.out.println(p.name());      // "MARS"

        // Enum in switch
        switch (p) {
            case EARTH -> System.out.println("Home!");
            case MARS  -> System.out.println("The Red Planet");
            default    -> System.out.println("Far away...");
        }
    }
}` }
    ]
  },
  {
    id: "oop-solid",
    title: "SOLID Principles",
    content: [
      { type: "text", content: "**SOLID** is a set of five design principles for writing maintainable, scalable object-oriented code:" },
      { type: "text", content: "• **S — Single Responsibility**: A class should have only one reason to change\n• **O — Open/Closed**: Open for extension, closed for modification\n• **L — Liskov Substitution**: Subtypes must be substitutable for their base types\n• **I — Interface Segregation**: Many specific interfaces > one general interface\n• **D — Dependency Inversion**: Depend on abstractions, not concrete implementations" },
      { type: "code", language: "java", title: "SOLID in Practice", content: `// ── S: Single Responsibility ──
// BAD: UserService handles user logic AND email sending
// GOOD: Separate UserService and EmailService

// ── O: Open/Closed ──
interface DiscountStrategy {
    double apply(double price);
}
class NoDiscount implements DiscountStrategy {
    public double apply(double price) { return price; }
}
class PercentDiscount implements DiscountStrategy {
    double percent;
    PercentDiscount(double p) { this.percent = p; }
    public double apply(double price) { return price * (1 - percent / 100); }
}
// Adding a new discount type = new class, no modification to existing code!

// ── L: Liskov Substitution ──
// If Bird has fly(), Penguin extends Bird is a violation
// Solution: Separate FlyingBird interface

// ── I: Interface Segregation ──
interface Printable { void print(); }
interface Scannable { void scan(); }
// A simple printer implements only Printable, not a bloated Machine interface

// ── D: Dependency Inversion ──
class OrderService {
    private final DiscountStrategy strategy; // Depends on abstraction!

    OrderService(DiscountStrategy strategy) {
        this.strategy = strategy;
    }

    double calculateTotal(double price) {
        return strategy.apply(price);
    }
}` },
      { type: "tip", content: "SOLID principles make code easier to test, extend, and maintain. They're essential for interviews and real-world software engineering." }
    ]
  }
];

// Exception Handling content
export const javaExceptionsContent: ContentSection[] = [
  {
    id: "exc-intro",
    title: "Exception Hierarchy",
    content: [
      { type: "text", content: "Java's exception hierarchy starts from **Throwable**, which has two main subclasses: **Error** (unrecoverable, e.g., OutOfMemoryError) and **Exception** (recoverable). Exceptions are further divided into **checked** (must handle) and **unchecked** (RuntimeException subclasses)." },
      { type: "code", language: "java", title: "Exception Hierarchy", content: `/*
    Throwable
    ├── Error (DON'T catch these!)
    │   ├── OutOfMemoryError
    │   ├── StackOverflowError
    │   └── VirtualMachineError
    │
    └── Exception
        ├── Checked Exceptions (MUST handle)
        │   ├── IOException
        │   ├── SQLException
        │   ├── FileNotFoundException
        │   └── ClassNotFoundException
        │
        └── RuntimeException (Unchecked — optional to handle)
            ├── NullPointerException
            ├── ArrayIndexOutOfBoundsException
            ├── ArithmeticException
            ├── IllegalArgumentException
            ├── ClassCastException
            └── NumberFormatException
*/` }
    ]
  },
  {
    id: "exc-trycatch",
    title: "Try-Catch-Finally",
    content: [
      { type: "code", language: "java", title: "Try-Catch-Finally", content: `public class TryCatchDemo {
    public static void main(String[] args) {
        // Basic try-catch
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Multiple catch blocks
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("General error: " + e.getMessage());
        } finally {
            // ALWAYS executes (even if exception or return)
            System.out.println("Finally block executed");
        }

        // Multi-catch (Java 7+)
        try {
            String s = null;
            s.length();
        } catch (NullPointerException | IllegalArgumentException e) {
            System.out.println("Caught: " + e.getClass().getSimpleName());
        }
    }
}` }
    ]
  },
  {
    id: "exc-checked",
    title: "Checked vs Unchecked Exceptions",
    content: [
      { type: "text", content: "**Checked exceptions** must be caught or declared in the method signature with `throws`. They represent expected failure conditions (file not found, network error). **Unchecked exceptions** (RuntimeException) don't need explicit handling — they represent programming bugs." },
      { type: "code", language: "java", title: "Checked vs Unchecked", content: `import java.io.*;

public class CheckedUnchecked {
    // Checked — must declare or handle
    static String readFile(String path) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader(path));
        return br.readLine();
    }

    // Unchecked — no declaration needed
    static int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }

    public static void main(String[] args) {
        // Must handle checked exception
        try {
            String content = readFile("test.txt");
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }

        // Unchecked — can crash if not handled
        System.out.println(divide(10, 2)); // Works
        // divide(10, 0); // Throws ArithmeticException
    }
}` }
    ]
  },
  {
    id: "exc-throw",
    title: "Throw & Throws",
    content: [
      { type: "code", language: "java", title: "Throw & Throws", content: `public class ThrowDemo {
    // throws — declares that method MAY throw this exception
    static void validateAge(int age) throws IllegalArgumentException {
        if (age < 0 || age > 150) {
            // throw — actually throws the exception
            throw new IllegalArgumentException("Invalid age: " + age);
        }
        System.out.println("Valid age: " + age);
    }

    public static void main(String[] args) {
        validateAge(25);   // Valid age: 25
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage()); // Invalid age: -5
        }
    }
}` }
    ]
  },
  {
    id: "exc-custom",
    title: "Custom Exception Classes",
    content: [
      { type: "code", language: "java", title: "Custom Exceptions", content: `// Checked custom exception
class InsufficientFundsException extends Exception {
    private double amount;

    InsufficientFundsException(double amount) {
        super("Insufficient funds. Short by: $" + String.format("%.2f", amount));
        this.amount = amount;
    }

    public double getAmount() { return amount; }
}

// Unchecked custom exception
class InvalidTransactionException extends RuntimeException {
    InvalidTransactionException(String msg) { super(msg); }
}

class Account {
    private double balance;

    Account(double balance) { this.balance = balance; }

    void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) throw new InvalidTransactionException("Negative amount");
        if (amount > balance) throw new InsufficientFundsException(amount - balance);
        balance -= amount;
        System.out.printf("Withdrawn $%.2f. Balance: $%.2f%n", amount, balance);
    }
}` }
    ]
  },
  {
    id: "exc-trywith",
    title: "Try-With-Resources",
    content: [
      { type: "text", content: "**Try-with-resources** (Java 7+) automatically closes resources that implement `AutoCloseable`. No need for explicit `finally` blocks to close streams/connections." },
      { type: "code", language: "java", title: "Try-With-Resources", content: `import java.io.*;

public class TryWithResources {
    public static void main(String[] args) {
        // ❌ Old way — verbose and error-prone
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader("data.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try { if (br != null) br.close(); }
            catch (IOException e) { e.printStackTrace(); }
        }

        // ✅ Try-with-resources — auto-closes!
        try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader.close() called automatically!

        // Multiple resources
        try (
            FileReader fr = new FileReader("input.txt");
            BufferedReader in = new BufferedReader(fr);
            FileWriter fw = new FileWriter("output.txt");
            BufferedWriter out = new BufferedWriter(fw)
        ) {
            String line;
            while ((line = in.readLine()) != null) {
                out.write(line);
                out.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}` }
    ]
  },
  {
    id: "exc-best",
    title: "Best Practices & Anti-patterns",
    content: [
      { type: "text", content: "**DO ✅:**\n• Catch specific exceptions, not generic `Exception`\n• Use try-with-resources for closeable resources\n• Include meaningful messages in exceptions\n• Log exceptions properly\n• Throw early, catch late\n• Use custom exceptions for domain-specific errors" },
      { type: "text", content: "**DON'T ❌:**\n• Don't catch `Exception` or `Throwable` broadly\n• Don't swallow exceptions (empty catch blocks)\n• Don't use exceptions for flow control\n• Don't throw exceptions in `finally` blocks\n• Don't log and rethrow (pick one)" },
      { type: "code", language: "java", title: "Anti-patterns to Avoid", content: `// ❌ ANTI-PATTERN: Empty catch (swallowing exception)
try {
    riskyMethod();
} catch (Exception e) {
    // NEVER do this! Silently hides bugs
}

// ❌ ANTI-PATTERN: Using exceptions for flow control
try {
    int i = 0;
    while (true) {
        array[i++]++; // Throws ArrayIndexOutOfBoundsException
    }
} catch (ArrayIndexOutOfBoundsException e) { }
// Use: for (int i = 0; i < array.length; i++) instead!

// ✅ GOOD: Specific catch with meaningful handling
try {
    connection.execute(query);
} catch (SQLException e) {
    logger.error("Query failed: " + query, e);
    throw new DataAccessException("Failed to execute query", e);
}` }
    ]
  }
];

// Content map for all Java topics
export const javaContentMap: Record<string, ContentSection[]> = {
  "java-basics": javaBasicsContent,
  "java-oop": javaOOPContent,
  "java-exceptions": javaExceptionsContent,
  // More content will be added as you request
  "java-collections": [{ id: "col-intro", title: "Collections Overview & Hierarchy", content: [{ type: "text", content: "🚧 **Coming Soon** — Full Collections Framework content with ArrayList, LinkedList, HashMap, TreeMap, HashSet, PriorityQueue, Comparable, Comparator, and concurrent collections with detailed Java examples." }] }],
  "java-generics": [{ id: "gen-intro", title: "Why Generics?", content: [{ type: "text", content: "🚧 **Coming Soon** — Complete Generics content with type parameters, bounded types, wildcards, type erasure, and practical patterns." }] }],
  "java-streams": [{ id: "stream-lambda", title: "Lambda Expressions", content: [{ type: "text", content: "🚧 **Coming Soon** — Full Streams & Lambdas content with functional interfaces, method references, Stream API operations, collectors, parallel streams, and Optional." }] }],
  "java-multithreading": [{ id: "mt-intro", title: "Threads & Runnable", content: [{ type: "text", content: "🚧 **Coming Soon** — Complete Multithreading content with Thread lifecycle, synchronization, locks, executors, CompletableFuture, and concurrency patterns." }] }],
  "java-io": [{ id: "io-streams", title: "Byte & Character Streams", content: [{ type: "text", content: "🚧 **Coming Soon** — Full I/O content with byte/character streams, NIO, serialization, and file operations." }] }],
  "java-advanced": [{ id: "adv-reflection", title: "Reflection API", content: [{ type: "text", content: "🚧 **Coming Soon** — Advanced Java content with Reflection, JVM internals, Garbage Collection, Design Patterns, Records, Sealed Classes, and Modules." }] }],
};
