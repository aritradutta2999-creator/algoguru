import { ContentSection } from "./recursionContent";
import { javaCollectionsContent } from "./javaCollectionsContent";
import { javaGenericsContent } from "./javaGenericsContent";
import { javaStreamsContent } from "./javaStreamsContent";
import { javaMultithreadingContent } from "./javaMultithreadingContent";
import { javaIOContent } from "./javaIOContent";
import { javaAdvancedContent } from "./javaAdvancedContent";

// Java Fundamentals content
export const javaBasicsContent: ContentSection[] = [
  {
    id: "java-intro",
    title: "Introduction to Java",
    difficulty: "Easy",
    theory: [
      "Java is a **high-level, class-based, object-oriented** programming language designed to have as few implementation dependencies as possible. It was developed by **James Gosling** at Sun Microsystems (now owned by Oracle) and released in **1995**. Java follows the principle of **WORA** — Write Once, Run Anywhere.",
      "Java is one of the most popular programming languages in the world, used for building enterprise applications, Android apps, web servers, big data processing, and much more.",
      "**Key Features of Java:** Platform Independent (bytecode runs on any JVM), Object-Oriented (everything is an object), Strongly Typed (variables must be declared with types), Automatic Memory Management (Garbage Collector), Multithreaded (built-in concurrency support), Secure (no pointers, security manager), Rich Standard Library.",
      "**Java Editions:** Java SE (Standard Edition) — Core language, collections, I/O, concurrency. Java EE (Enterprise Edition) — Now Jakarta EE, Servlets, JPA, EJB. Java ME (Micro Edition) — For embedded/mobile devices."
    ],
    note: "Java code is compiled into **bytecode** that runs on the **JVM (Java Virtual Machine)**, making it platform-independent."
  },
  {
    id: "java-setup",
    title: "JDK Setup & First Program",
    difficulty: "Easy",
    theory: [
      "To start coding in Java, you need the **JDK (Java Development Kit)** which includes the compiler (`javac`), the runtime (`java`), and standard libraries.",
      "**JDK vs JRE vs JVM:** JVM — Executes bytecode (platform-specific). JRE — JVM + core libraries (runs Java programs). JDK — JRE + development tools like compiler and debugger (develops & runs Java programs).",
      "**Anatomy of a Java Program:** `public class HelloWorld` — Class declaration. `public static void main(String[] args)` — Program entry point. `System.out.println(...)` — Prints to console. Every statement ends with `;`. Code blocks use `{}`.",
      "The file name **must match** the public class name. The compilation flow is: Source (.java) → javac → Bytecode (.class) → JVM → Machine Code."
    ],
    code: [
      {
        title: "Hello World — Your First Java Program",
        language: "java",
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
        title: "Compilation & Execution Flow",
        language: "java",
        content: `// Source Code (.java)
//     ↓ javac (compiler)
// Bytecode (.class)
//     ↓ java (JVM)
// Machine Code (execution)

// The JVM interprets bytecode OR uses JIT (Just-In-Time)
// compilation to convert hot bytecode to native machine code.`
      }
    ],
    note: "The file name **must match** the public class name. `HelloWorld.java` contains `public class HelloWorld`."
  },
  {
    id: "java-variables",
    title: "Variables & Data Types",
    difficulty: "Easy",
    theory: [
      "Java is a **statically typed** language — every variable must be declared with a type before use. Java has **8 primitive types** and **reference types** (objects).",
      "**Integer types:** byte (8-bit, -128 to 127), short (16-bit), int (32-bit, most common), long (64-bit, suffix L).",
      "**Floating-point:** float (32-bit, suffix f), double (64-bit, default for decimals). **char** (16-bit Unicode). **boolean** (true/false).",
      "**Reference types** include String, arrays, and all objects. Wrapper classes (Integer, Double, Boolean) provide object versions of primitives with autoboxing/unboxing.",
      "**Variable scopes:** Instance variables (belong to object), static variables (belong to class), local variables (must be initialized before use), constants (final keyword)."
    ],
    code: [
      {
        title: "Primitive Data Types",
        language: "java",
        content: `public class DataTypes {
    public static void main(String[] args) {
        // Integer types
        byte   b = 127;            // 8-bit,  -128 to 127
        short  s = 32767;          // 16-bit, -32,768 to 32,767
        int    i = 2_147_483_647;  // 32-bit (most common)
        long   l = 9_223_372_036_854_775_807L; // 64-bit (note L suffix)

        // Floating-point types
        float  f = 3.14f;          // 32-bit (note f suffix)
        double d = 3.141592653589; // 64-bit (default for decimals)

        // Character type
        char   c = 'A';            // 16-bit Unicode character

        // Boolean type
        boolean flag = true;       // true or false

        System.out.println("int max: " + Integer.MAX_VALUE);
        System.out.println("long max: " + Long.MAX_VALUE);
    }
}`
      },
      {
        title: "Reference Types, Wrappers & var",
        language: "java",
        content: `public class ReferenceTypes {
    // Instance variable
    int instanceVar = 10;
    // Static variable
    static int staticVar = 20;
    // Constant
    static final double PI = 3.14159265358979;

    public static void main(String[] args) {
        // String (immutable reference type)
        String name = "AlgoGuru";

        // Wrapper classes (autoboxing/unboxing)
        Integer num = 42;          // int → Integer (autoboxing)
        int val = num;             // Integer → int (unboxing)

        // Useful conversions
        int parsed = Integer.parseInt("123");
        String str = String.valueOf(456);

        // null — only for reference types
        String s = null;   // Valid
        // int x = null;   // ❌ Compile error

        // var keyword (Java 10+)
        var list = new java.util.ArrayList<String>();
        var count = 100;   // inferred as int
    }
}`
      }
    ],
    tip: "Use `int` for most integers, `long` for large numbers (like in CP), `double` for decimals, and `boolean` for flags."
  },
  {
    id: "java-operators",
    title: "Operators & Expressions",
    difficulty: "Easy",
    theory: [
      "Java provides a rich set of operators for arithmetic, comparison, logical, bitwise, and assignment operations.",
      "**Operator Precedence** (high → low): Unary (++, --, !) → Arithmetic (*, /, % → +, -) → Shift → Comparison → Bitwise → Logical → Ternary → Assignment. Use **parentheses** to make precedence explicit."
    ],
    code: [
      {
        title: "All Java Operators",
        language: "java",
        content: `public class Operators {
    public static void main(String[] args) {
        // ── Arithmetic ──
        int a = 10, b = 3;
        System.out.println(a + b);   // 13
        System.out.println(a - b);   // 7
        System.out.println(a * b);   // 30
        System.out.println(a / b);   // 3  (integer division)
        System.out.println(a % b);   // 1  (remainder)

        // ── Increment / Decrement ──
        int x = 5;
        System.out.println(x++);     // 5  (post-increment)
        System.out.println(++x);     // 7  (pre-increment)

        // ── Comparison ──
        System.out.println(10 > 5);   // true
        System.out.println(10 == 10); // true
        System.out.println(10 != 5);  // true

        // ── Logical (short-circuit) ──
        boolean p = true, q = false;
        System.out.println(p && q);   // false (AND)
        System.out.println(p || q);   // true  (OR)
        System.out.println(!p);       // false (NOT)

        // ── Assignment ──
        int n = 10;
        n += 5; n -= 3; n *= 2; n /= 4; n %= 4;

        // ── Ternary ──
        int max = (a > b) ? a : b;

        // ── instanceof ──
        String s = "hello";
        System.out.println(s instanceof String); // true

        // ── Bitwise ──
        System.out.println(5 & 3);   // 1  AND
        System.out.println(5 | 3);   // 7  OR
        System.out.println(5 ^ 3);   // 6  XOR
        System.out.println(~5);      // -6 NOT
        System.out.println(5 << 1);  // 10 Left shift
        System.out.println(5 >> 1);  // 2  Right shift
    }
}`
      }
    ],
    note: "Use **parentheses** to make operator precedence explicit and avoid bugs."
  },
  {
    id: "java-control",
    title: "Control Flow (if/else, switch)",
    difficulty: "Easy",
    theory: [
      "Control flow statements determine execution order. Java supports **if-else**, **switch** (including enhanced switch expressions in Java 14+), and **ternary** operators."
    ],
    code: [
      {
        title: "If-Else & Nested Conditions",
        language: "java",
        content: `public class ControlFlow {
    public static void main(String[] args) {
        int score = 85;

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
    }
}`
      },
      {
        title: "Switch Statement & Switch Expressions (Java 14+)",
        language: "java",
        content: `public class SwitchDemo {
    public static void main(String[] args) {
        int day = 3;

        // Traditional switch
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
            case 6, 7 -> "Weekend";
            default -> "Other";
        };

        // Switch with String
        String cmd = "start";
        switch (cmd) {
            case "start" -> System.out.println("Starting...");
            case "stop"  -> System.out.println("Stopping...");
            default      -> System.out.println("Unknown");
        }
    }
}`
      }
    ]
  },
  {
    id: "java-loops",
    title: "Loops (for, while, do-while)",
    difficulty: "Easy",
    theory: [
      "Java supports **for**, **enhanced for-each**, **while**, and **do-while** loops, along with **break**, **continue**, and **labeled** loop control."
    ],
    code: [
      {
        title: "All Loop Types with Break & Continue",
        language: "java",
        content: `public class Loops {
    public static void main(String[] args) {
        // Standard for loop
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " "); // 0 1 2 3 4
        }

        // Enhanced for-each
        int[] arr = {10, 20, 30, 40, 50};
        for (int val : arr) {
            System.out.print(val + " ");
        }

        // While loop
        int n = 5;
        while (n > 0) {
            System.out.print(n-- + " "); // 5 4 3 2 1
        }

        // Do-While (executes at least once)
        int x = 0;
        do {
            System.out.print(x + " "); // 0
            x++;
        } while (x < 0);

        // Break & Continue
        for (int i = 0; i < 10; i++) {
            if (i == 3) continue;  // Skip 3
            if (i == 7) break;     // Stop at 7
            System.out.print(i + " "); // 0 1 2 4 5 6
        }

        // Labeled break (nested loops)
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i == 1 && j == 1) break outer;
                System.out.print("[" + i + "," + j + "] ");
            }
        }
    }
}`
      }
    ],
    tip: "In CP, use `for` loops for known iterations and `while` for condition-based. **Labeled breaks** are handy for nested loops."
  },
  {
    id: "java-arrays",
    title: "Arrays & Multi-dimensional Arrays",
    difficulty: "Easy",
    theory: [
      "An **array** is a fixed-size, indexed collection of elements of the same type. Java arrays are **objects** stored on the heap with a fixed `.length` property."
    ],
    code: [
      {
        title: "1D Arrays — Declaration, Initialization & Utility Methods",
        language: "java",
        content: `import java.util.Arrays;

public class ArrayDemo {
    public static void main(String[] args) {
        int[] arr1 = new int[5];              // [0, 0, 0, 0, 0]
        int[] arr2 = {10, 20, 30, 40, 50};
        int[] arr3 = new int[]{1, 2, 3};

        arr1[0] = 100;
        System.out.println(arr2[2]);           // 30
        System.out.println(arr2.length);       // 5

        // Arrays utility class
        Arrays.sort(arr2);                          // Sort ascending
        System.out.println(Arrays.toString(arr2));
        int idx = Arrays.binarySearch(arr2, 30);
        Arrays.fill(arr1, 7);
        int[] copy = Arrays.copyOf(arr2, 3);
        boolean eq = Arrays.equals(arr2, copy);
    }
}`
      },
      {
        title: "2D Arrays (Matrix) & Jagged Arrays",
        language: "java",
        content: `public class Matrix {
    public static void main(String[] args) {
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println(grid[1][2]); // 6

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                System.out.print(grid[i][j] + " ");
            }
            System.out.println();
        }

        // Jagged array (different row lengths)
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
    difficulty: "Easy",
    theory: [
      "Strings in Java are **immutable** reference types. Any modification creates a **new** String object. For mutable strings, use **StringBuilder** (not thread-safe, faster) or **StringBuffer** (thread-safe)."
    ],
    code: [
      {
        title: "String Methods & Comparison",
        language: "java",
        content: `public class StringDemo {
    public static void main(String[] args) {
        String s = "Hello, World!";

        s.length();              // 13
        s.charAt(0);             // 'H'
        s.substring(7);          // "World!"
        s.substring(0, 5);       // "Hello"
        s.indexOf("World");      // 7
        s.contains("World");     // true
        s.toUpperCase();         // "HELLO, WORLD!"
        s.replace("World", "Java"); // "Hello, Java!"
        s.trim();                // Remove whitespace
        s.startsWith("Hello");   // true
        s.isEmpty();             // false

        // ⚠️ Comparison
        String a = "hello", b = "hello";
        a == b;              // true  (string pool)
        a.equals(b);         // true  (ALWAYS use this!)

        String c = new String("hello");
        a == c;              // false!
        a.equals(c);         // true

        // Split & Join
        String[] parts = "a,b,c".split(",");
        String joined = String.join("-", parts); // "a-b-c"

        // char[] ↔ String
        char[] chars = s.toCharArray();
        String fromChars = new String(chars);
    }
}`
      },
      {
        title: "StringBuilder — Mutable Strings",
        language: "java",
        content: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" World");
        sb.insert(5, ",");       // "Hello, World"
        sb.delete(5, 6);         // "Hello World"
        sb.reverse();            // "dlroW olleH"

        // ❌ Slow — O(n²) total
        String result = "";
        for (int i = 0; i < 10000; i++) result += i;

        // ✅ Fast — O(n) total
        StringBuilder fast = new StringBuilder();
        for (int i = 0; i < 10000; i++) fast.append(i);
    }
}`
      }
    ],
    warning: "**Never** use `==` to compare Strings! Always use `.equals()`. The `==` operator compares **references**, not content."
  },
  {
    id: "java-input",
    title: "Scanner & User Input",
    difficulty: "Easy",
    theory: [
      "The `Scanner` class reads user input. For competitive programming, `BufferedReader` + `PrintWriter` is 5-10x faster."
    ],
    code: [
      {
        title: "Scanner & BufferedReader for CP",
        language: "java",
        content: `import java.util.Scanner;
import java.io.*;

public class InputDemo {
    public static void main(String[] args) throws IOException {
        // ── Scanner (simple, slower) ──
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        double d = sc.nextDouble();
        sc.nextLine(); // consume leftover newline!
        String line = sc.nextLine();
        sc.close();

        // ── BufferedReader (fast, preferred for CP) ──
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        int x = Integer.parseInt(br.readLine());

        // Multiple integers from one line
        String[] tokens = br.readLine().split(" ");
        int a = Integer.parseInt(tokens[0]);
        int b = Integer.parseInt(tokens[1]);

        // Fast output
        PrintWriter pw = new PrintWriter(new BufferedOutputStream(System.out));
        pw.println("Result: " + (a + b));
        pw.flush();
    }
}`
      }
    ],
    tip: "In competitive programming, always use **BufferedReader + PrintWriter** instead of Scanner + System.out.println for faster I/O."
  },
  {
    id: "java-typecasting",
    title: "Type Casting & Conversion",
    difficulty: "Easy",
    theory: [
      "Type casting converts a value from one type to another. **Widening** (implicit): smaller → larger, no data loss. **Narrowing** (explicit): larger → smaller, possible data loss.",
      "Widening path: byte → short → int → long → float → double."
    ],
    code: [
      {
        title: "Type Casting in Java",
        language: "java",
        content: `public class TypeCasting {
    public static void main(String[] args) {
        // Widening (Implicit)
        int i = 100;
        long l = i;        // int → long (automatic)
        double d = l;      // long → double (automatic)

        // Narrowing (Explicit)
        double pi = 3.14159;
        int truncated = (int) pi;     // 3 (decimal lost!)

        // char ↔ int
        char c = 'A';
        int ascii = c;         // 65
        char back = (char) 65; // 'A'

        // String conversions
        String s1 = String.valueOf(42);
        int n = Integer.parseInt("123");
        double f = Double.parseDouble("3.14");

        // Safe casting with instanceof (Java 16+)
        Object obj = "Hello";
        if (obj instanceof String str) {
            System.out.println(str.toUpperCase());
        }
    }
}`
      }
    ],
    warning: "Be careful with **narrowing casts** — they can silently overflow or lose precision."
  }
];

// OOP content
export const javaOOPContent: ContentSection[] = [
  {
    id: "oop-classes",
    title: "Classes & Objects",
    difficulty: "Easy",
    theory: [
      "A **class** is a blueprint for creating objects. An **object** is an instance of a class that holds its own copy of instance variables.",
      "By default, `equals()` compares references. Override it (along with `hashCode()`) for meaningful content-based equality."
    ],
    code: [{
      title: "Defining & Using Classes",
      language: "java",
      content: `public class Student {
    String name;
    int age;
    double gpa;

    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    public void display() {
        System.out.println(name + " | Age: " + age + " | GPA: " + gpa);
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", gpa=" + gpa + "}";
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 20, 3.8);
        Student s2 = new Student("Bob", 22, 3.5);
        s1.display();
        System.out.println(s2);
    }
}`
    }]
  },
  {
    id: "oop-constructors",
    title: "Constructors & this Keyword",
    difficulty: "Easy",
    theory: [
      "A **constructor** initializes an object. Java supports **default**, **parameterized**, and **copy** constructors, plus **constructor chaining** with `this()`."
    ],
    code: [{
      title: "Constructor Types & Chaining",
      language: "java",
      content: `public class Rectangle {
    double width, height;

    public Rectangle() { this(1.0, 1.0); }

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public Rectangle(Rectangle other) {
        this(other.width, other.height);
    }

    public double area() { return width * height; }

    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();         // 1×1
        Rectangle r2 = new Rectangle(5, 3);     // 5×3
        Rectangle r3 = new Rectangle(r2);       // Copy of r2
        System.out.println(r2.area());           // 15.0
    }
}`
    }]
  },
  {
    id: "oop-encapsulation",
    title: "Encapsulation & Access Modifiers",
    difficulty: "Medium",
    theory: [
      "**Encapsulation** bundles data and methods into a class, restricting direct access. **Access Modifiers:** public (anywhere), private (class only), protected (package + subclasses), default/package-private (package only)."
    ],
    code: [{
      title: "Encapsulation with Getters/Setters",
      language: "java",
      content: `public class BankAccount {
    private double balance;
    private String owner;

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }
}`
    }],
    tip: "Always make fields **private** and provide **public getters/setters** with validation."
  },
  {
    id: "oop-inheritance",
    title: "Inheritance & super Keyword",
    difficulty: "Medium",
    theory: [
      "**Inheritance** lets a class acquire properties and methods of another using `extends`. Java supports **single inheritance** but a class can implement **multiple interfaces**."
    ],
    code: [{
      title: "Inheritance, super & Method Overriding",
      language: "java",
      content: `class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void speak() { System.out.println(name + " makes a sound"); }
    void eat() { System.out.println(name + " is eating"); }
}

class Dog extends Animal {
    String breed;
    Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    @Override
    void speak() { System.out.println(name + " barks!"); }
    void fetch() { System.out.println(name + " fetches the ball"); }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Dog d = new Dog("Buddy", "Golden Retriever");
        d.speak();   // Buddy barks!
        d.eat();     // Buddy is eating (inherited)

        Animal a = new Dog("Rex", "German Shepherd");
        a.speak();   // Rex barks! (dynamic dispatch)
    }
}`
    }]
  },
  {
    id: "oop-polymorphism",
    title: "Polymorphism (Overloading/Overriding)",
    difficulty: "Medium",
    theory: [
      "**Compile-time** polymorphism → Method **Overloading** (same name, different params). **Runtime** polymorphism → Method **Overriding** (subclass redefines parent method)."
    ],
    code: [{
      title: "Overloading & Overriding with Dynamic Dispatch",
      language: "java",
      content: `class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

class Shape {
    double area() { return 0; }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    @Override double area() { return Math.PI * radius * radius; }
}

class Square extends Shape {
    double side;
    Square(double s) { this.side = s; }
    @Override double area() { return side * side; }
}

public class PolymorphismDemo {
    static void printArea(Shape s) {
        System.out.printf("Area: %.2f%n", s.area());
    }
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(5), new Square(4) };
        for (Shape s : shapes) printArea(s);
    }
}`
    }]
  },
  {
    id: "oop-abstraction",
    title: "Abstract Classes & Interfaces",
    difficulty: "Medium",
    theory: [
      "**Abstract class** — Can have abstract + concrete methods, fields, constructors. Single inheritance only.",
      "**Interface** — Pure contract. Java 8+ allows default/static methods. Supports multiple inheritance."
    ],
    code: [{
      title: "Abstract Class + Multiple Interfaces",
      language: "java",
      content: `abstract class Vehicle {
    String brand;
    Vehicle(String brand) { this.brand = brand; }
    abstract void start();
    void stop() { System.out.println(brand + " stopped"); }
}

interface Electric {
    void charge();
    default void batteryStatus() { System.out.println("Battery OK"); }
}

interface GPS {
    void navigate(String destination);
}

class Tesla extends Vehicle implements Electric, GPS {
    Tesla() { super("Tesla"); }
    @Override void start() { System.out.println("Tesla silently starts"); }
    @Override public void charge() { System.out.println("Supercharging..."); }
    @Override public void navigate(String dest) {
        System.out.println("Navigating to " + dest);
    }
}`
    }]
  },
  {
    id: "oop-static",
    title: "Static Members & Methods",
    difficulty: "Easy",
    theory: [
      "**Static** members belong to the **class itself**, shared across all instances. Static methods can only access static members directly."
    ],
    code: [{
      title: "Static Fields, Methods & Blocks",
      language: "java",
      content: `public class Counter {
    private static int count = 0;
    private int id;

    static { System.out.println("Counter class loaded!"); }

    public Counter() { count++; this.id = count; }

    public static int getCount() { return count; }
    public int getId() { return id; }

    public static void main(String[] args) {
        System.out.println(Counter.getCount()); // 0
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.println(Counter.getCount()); // 2
        System.out.println(c1.getId());          // 1
    }
}`
    }]
  },
  {
    id: "oop-inner",
    title: "Inner & Anonymous Classes",
    difficulty: "Medium",
    theory: [
      "Java supports **inner classes** (access outer's private members), **static nested classes**, **local classes**, and **anonymous classes** (inline implementations, often replaced by lambdas)."
    ],
    code: [{
      title: "Inner & Anonymous Classes",
      language: "java",
      content: `import java.util.*;

public class OuterClass {
    private int x = 10;

    class Inner {
        void show() { System.out.println("Outer x = " + x); }
    }

    static class StaticNested {
        void show() { System.out.println("I'm static nested"); }
    }

    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        Inner inner = outer.new Inner();
        inner.show();

        // Anonymous class → Lambda
        Comparator<String> comp = (a, b) -> a.length() - b.length();
        List<String> words = Arrays.asList("banana", "fig", "apple");
        words.sort(comp);
        System.out.println(words); // [fig, apple, banana]
    }
}`
    }]
  },
  {
    id: "oop-enums",
    title: "Enums & Annotations",
    difficulty: "Medium",
    theory: [
      "**Enums** represent a fixed set of constants. They can have fields, methods, and constructors."
    ],
    code: [{
      title: "Enum with Fields & Methods",
      language: "java",
      content: `enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);

    private final double mass, radius;
    static final double G = 6.67300E-11;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() { return G * mass / (radius * radius); }
    double surfaceWeight(double otherMass) { return otherMass * surfaceGravity(); }
}

public class EnumDemo {
    public static void main(String[] args) {
        for (Planet p : Planet.values()) {
            System.out.printf("Weight on %s: %.2f N%n",
                p, p.surfaceWeight(75.0));
        }
        Planet p = Planet.valueOf("MARS");
        System.out.println(p.ordinal()); // 3
    }
}`
    }]
  },
  {
    id: "oop-solid",
    title: "SOLID Principles",
    difficulty: "Hard",
    theory: [
      "**S — Single Responsibility**: A class should have only one reason to change.",
      "**O — Open/Closed**: Open for extension, closed for modification.",
      "**L — Liskov Substitution**: Subtypes must be substitutable for their base types.",
      "**I — Interface Segregation**: Many specific interfaces > one general interface.",
      "**D — Dependency Inversion**: Depend on abstractions, not concrete implementations."
    ],
    code: [{
      title: "SOLID in Practice — Open/Closed + Dependency Inversion",
      language: "java",
      content: `// Open/Closed: add new strategies without modifying existing code
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

// Dependency Inversion: depends on abstraction, not concrete class
class OrderService {
    private final DiscountStrategy strategy;
    OrderService(DiscountStrategy strategy) { this.strategy = strategy; }
    double calculateTotal(double price) { return strategy.apply(price); }
}`
    }],
    tip: "SOLID principles are essential for interviews and real-world software engineering."
  }
];

// Exception Handling content
export const javaExceptionsContent: ContentSection[] = [
  {
    id: "exc-intro",
    title: "Exception Hierarchy",
    difficulty: "Easy",
    theory: [
      "Java's exception hierarchy: **Throwable** → **Error** (unrecoverable: OutOfMemoryError, StackOverflowError) and **Exception** (recoverable).",
      "Exceptions divide into **Checked** (must handle: IOException, SQLException) and **Unchecked** (RuntimeException: NullPointerException, ArrayIndexOutOfBoundsException)."
    ],
    code: [{
      title: "Exception Hierarchy Overview",
      language: "java",
      content: `/*
    Throwable
    ├── Error (DON'T catch!)
    │   ├── OutOfMemoryError
    │   ├── StackOverflowError
    │   └── VirtualMachineError
    └── Exception
        ├── Checked (MUST handle)
        │   ├── IOException
        │   ├── SQLException
        │   └── FileNotFoundException
        └── RuntimeException (Unchecked)
            ├── NullPointerException
            ├── ArrayIndexOutOfBoundsException
            ├── ArithmeticException
            └── IllegalArgumentException
*/`
    }]
  },
  {
    id: "exc-trycatch",
    title: "Try-Catch-Finally",
    difficulty: "Easy",
    theory: ["The `try` block contains risky code. `catch` handles specific exceptions. `finally` always executes (cleanup). Multi-catch (Java 7+) handles multiple exception types in one catch."],
    code: [{
      title: "Try-Catch-Finally & Multi-Catch",
      language: "java",
      content: `public class TryCatchDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Always executes");
        }

        // Multi-catch (Java 7+)
        try {
            String s = null;
            s.length();
        } catch (NullPointerException | IllegalArgumentException e) {
            System.out.println("Caught: " + e.getClass().getSimpleName());
        }
    }
}`
    }]
  },
  {
    id: "exc-checked",
    title: "Checked vs Unchecked Exceptions",
    difficulty: "Medium",
    theory: ["**Checked** must be caught or declared with `throws`. They represent expected failures. **Unchecked** (RuntimeException) represent programming bugs."],
    code: [{
      title: "Checked vs Unchecked",
      language: "java",
      content: `import java.io.*;

public class CheckedUnchecked {
    // Checked — must declare
    static String readFile(String path) throws IOException {
        return new BufferedReader(new FileReader(path)).readLine();
    }

    // Unchecked — no declaration needed
    static int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }

    public static void main(String[] args) {
        try {
            readFile("test.txt");
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }
    }
}`
    }]
  },
  {
    id: "exc-throw",
    title: "Throw & Throws",
    difficulty: "Easy",
    theory: ["`throw` creates and throws an exception. `throws` declares that a method may throw an exception."],
    code: [{
      title: "Throw & Throws",
      language: "java",
      content: `public class ThrowDemo {
    static void validateAge(int age) {
        if (age < 0 || age > 150)
            throw new IllegalArgumentException("Invalid age: " + age);
        System.out.println("Valid age: " + age);
    }

    public static void main(String[] args) {
        validateAge(25);
        try { validateAge(-5); }
        catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`
    }]
  },
  {
    id: "exc-custom",
    title: "Custom Exception Classes",
    difficulty: "Medium",
    theory: ["Create custom exceptions by extending `Exception` (checked) or `RuntimeException` (unchecked)."],
    code: [{
      title: "Custom Exceptions",
      language: "java",
      content: `class InsufficientFundsException extends Exception {
    private double amount;
    InsufficientFundsException(double amount) {
        super("Short by: $" + String.format("%.2f", amount));
        this.amount = amount;
    }
    public double getAmount() { return amount; }
}

class Account {
    private double balance;
    Account(double balance) { this.balance = balance; }

    void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) throw new RuntimeException("Negative amount");
        if (amount > balance)
            throw new InsufficientFundsException(amount - balance);
        balance -= amount;
    }
}`
    }]
  },
  {
    id: "exc-trywith",
    title: "Try-With-Resources",
    difficulty: "Medium",
    theory: ["**Try-with-resources** (Java 7+) auto-closes resources implementing `AutoCloseable`. No explicit `finally` needed."],
    code: [{
      title: "Try-With-Resources",
      language: "java",
      content: `import java.io.*;

public class TryWithResources {
    public static void main(String[] args) {
        // Auto-closes reader when done
        try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Multiple resources
        try (
            BufferedReader in = new BufferedReader(new FileReader("input.txt"));
            BufferedWriter out = new BufferedWriter(new FileWriter("output.txt"))
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
}`
    }]
  },
  {
    id: "exc-best",
    title: "Best Practices & Anti-patterns",
    difficulty: "Medium",
    theory: [
      "**DO:** Catch specific exceptions, use try-with-resources, include meaningful messages, throw early & catch late, use custom exceptions.",
      "**DON'T:** Catch generic Exception, swallow exceptions (empty catch), use exceptions for flow control, log AND rethrow."
    ],
    code: [{
      title: "Anti-patterns to Avoid",
      language: "java",
      content: `// ❌ Empty catch (swallowing exception)
try { riskyMethod(); }
catch (Exception e) { } // NEVER!

// ❌ Exceptions for flow control
try {
    int i = 0;
    while (true) array[i++]++;
} catch (ArrayIndexOutOfBoundsException e) { }

// ✅ Specific catch + meaningful handling
try {
    connection.execute(query);
} catch (SQLException e) {
    logger.error("Query failed: " + query, e);
    throw new DataAccessException("Failed to execute", e);
}`
    }],
    warning: "Empty catch blocks silently hide bugs. **Always** handle or propagate exceptions."
  }
];

// Content map for all Java topics
export const javaContentMap: Record<string, ContentSection[]> = {
  "java-basics": javaBasicsContent,
  "java-oop": javaOOPContent,
  "java-exceptions": javaExceptionsContent,
  "java-collections": javaCollectionsContent,
  "java-generics": javaGenericsContent,
  "java-streams": javaStreamsContent,
  "java-multithreading": javaMultithreadingContent,
  "java-io": javaIOContent,
  "java-advanced": javaAdvancedContent,
};
