import { ContentSection } from "./recursionContent";

export const javaCollectionsContent: ContentSection[] = [
  {
    id: "col-intro",
    title: "Collections Overview & Hierarchy",
    difficulty: "Easy",
    theory: [
      "The **Collections Framework** is a unified architecture for representing and manipulating groups of objects in Java",
      "It provides **interfaces**, **implementations**, and **algorithms** — all packaged in `java.util`",
      "The root interface is **Collection<E>** which extends **Iterable<E>**",
      "**Hierarchy:** Collection → List (ordered, duplicates allowed), Set (no duplicates), Queue (FIFO order)",
      "**Map<K,V>** is separate — it does NOT extend Collection, but is part of the framework",
      "**Why use Collections?** Arrays have fixed size, no built-in search/sort. Collections are dynamic, type-safe with generics, and come with powerful utility methods",
      "**Key interfaces:** List (ArrayList, LinkedList), Set (HashSet, TreeSet), Queue (PriorityQueue, ArrayDeque), Map (HashMap, TreeMap)",
      "All collections store **references** (objects), not primitives. Use wrapper classes (Integer, Double, etc.) for primitives"
    ],
    keyPoints: [
      "Collection is the root interface; Map is separate",
      "Use generics (Collection<String>) for type safety",
      "Collections store object references, not primitives",
      "Choose the right implementation based on your access pattern"
    ],
    code: [
      {
        title: "Collections Hierarchy — Basic Usage",
        language: "java",
        content: `import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // List — ordered, allows duplicates
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Apple"); // duplicates OK
        System.out.println("List: " + list); // [Apple, Banana, Apple]

        // Set — no duplicates
        Set<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Banana");
        set.add("Apple"); // ignored
        System.out.println("Set: " + set); // [Apple, Banana]

        // Map — key-value pairs
        Map<String, Integer> map = new HashMap<>();
        map.put("Apple", 3);
        map.put("Banana", 5);
        System.out.println("Map: " + map); // {Apple=3, Banana=5}

        // Queue — FIFO
        Queue<String> queue = new LinkedList<>();
        queue.offer("First");
        queue.offer("Second");
        System.out.println("Poll: " + queue.poll()); // First
    }
}`
      }
    ],
    tip: "When in doubt: **ArrayList** for lists, **HashSet** for unique elements, **HashMap** for key-value, **ArrayDeque** for stacks/queues."
  },
  {
    id: "col-list",
    title: "ArrayList & LinkedList",
    difficulty: "Easy",
    theory: [
      "**ArrayList** is backed by a **dynamic array** — fast random access O(1), slow insert/delete in middle O(n)",
      "**LinkedList** is a **doubly-linked list** — fast insert/delete at ends O(1), slow random access O(n)",
      "Both implement **List<E>** interface, so they share the same API",
      "**ArrayList default capacity** is 10. When full, it grows by ~50% (creates a new larger array and copies elements)",
      "**LinkedList** also implements **Deque**, so it can be used as a stack or queue",
      "**When to use ArrayList:** Most of the time! Random access, iteration, and appending at end are all fast",
      "**When to use LinkedList:** Frequent insertions/deletions at the beginning or middle, or when you need Deque functionality",
      "In competitive programming, **ArrayList** is almost always preferred over LinkedList"
    ],
    code: [
      {
        title: "ArrayList — Common Operations",
        language: "java",
        content: `import java.util.*;

public class ArrayListDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        
        // Add elements
        list.add(10);          // [10]
        list.add(20);          // [10, 20]
        list.add(1, 15);       // [10, 15, 20] — insert at index 1
        
        // Access
        int val = list.get(0);         // 10
        int size = list.size();        // 3
        boolean has = list.contains(15); // true
        int idx = list.indexOf(20);    // 2
        
        // Modify
        list.set(0, 5);               // [5, 15, 20]
        list.remove(Integer.valueOf(15)); // [5, 20] — remove by value
        list.remove(0);                // [20] — remove by index
        
        // Bulk operations
        list.addAll(Arrays.asList(1, 2, 3)); // [20, 1, 2, 3]
        
        // Sort
        Collections.sort(list);       // [1, 2, 3, 20]
        
        // Iterate
        for (int x : list) System.out.print(x + " ");
        
        // Convert to array
        Integer[] arr = list.toArray(new Integer[0]);
    }
}`
      },
      {
        title: "LinkedList — Deque Operations",
        language: "java",
        content: `import java.util.*;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> ll = new LinkedList<>();
        
        // List operations
        ll.add("B");
        ll.add("C");
        
        // Deque operations — add at both ends
        ll.addFirst("A");    // [A, B, C]
        ll.addLast("D");     // [A, B, C, D]
        
        // Peek without removing
        String first = ll.getFirst(); // A
        String last = ll.getLast();   // D
        
        // Remove from ends
        ll.removeFirst();    // [B, C, D]
        ll.removeLast();     // [B, C]
        
        // Stack operations (LIFO)
        ll.push("X");       // [X, B, C]
        String top = ll.pop(); // X, list = [B, C]
        
        // Queue operations (FIFO)
        ll.offer("Y");      // [B, C, Y]
        String head = ll.poll(); // B, list = [C, Y]
        
        System.out.println(ll); // [C, Y]
    }
}`
      }
    ],
    note: "**ArrayList** uses ~40% less memory than LinkedList because LinkedList stores two extra pointers per node."
  },
  {
    id: "col-set",
    title: "HashSet, LinkedHashSet & TreeSet",
    difficulty: "Easy",
    theory: [
      "**Set** stores **unique elements** only — duplicates are silently ignored",
      "**HashSet** — backed by HashMap, O(1) add/remove/contains, **no ordering guarantee**",
      "**LinkedHashSet** — maintains **insertion order**, slightly slower than HashSet",
      "**TreeSet** — backed by Red-Black Tree, elements stored in **sorted order**, O(log n) operations",
      "HashSet uses **hashCode()** and **equals()** to detect duplicates",
      "TreeSet requires elements to be **Comparable** or provide a **Comparator**",
      "**When to use:** HashSet for fastest lookups, LinkedHashSet to preserve order, TreeSet when you need sorted iteration",
      "Sets are perfect for: removing duplicates, membership testing, set operations (union, intersection)"
    ],
    code: [
      {
        title: "HashSet vs LinkedHashSet vs TreeSet",
        language: "java",
        content: `import java.util.*;

public class SetDemo {
    public static void main(String[] args) {
        // HashSet — no order guarantee
        Set<Integer> hashSet = new HashSet<>();
        hashSet.add(30); hashSet.add(10); hashSet.add(20);
        System.out.println("HashSet: " + hashSet); // unpredictable order

        // LinkedHashSet — insertion order
        Set<Integer> linkedSet = new LinkedHashSet<>();
        linkedSet.add(30); linkedSet.add(10); linkedSet.add(20);
        System.out.println("LinkedHashSet: " + linkedSet); // [30, 10, 20]

        // TreeSet — sorted order
        Set<Integer> treeSet = new TreeSet<>();
        treeSet.add(30); treeSet.add(10); treeSet.add(20);
        System.out.println("TreeSet: " + treeSet); // [10, 20, 30]

        // Duplicate handling
        boolean added = hashSet.add(10); // false — already exists
        System.out.println("Added duplicate? " + added);
    }
}`
      },
      {
        title: "Set Operations — Union, Intersection, Difference",
        language: "java",
        content: `import java.util.*;

public class SetOperations {
    public static void main(String[] args) {
        Set<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3, 4));
        Set<Integer> b = new HashSet<>(Arrays.asList(3, 4, 5, 6));

        // Union (A ∪ B)
        Set<Integer> union = new HashSet<>(a);
        union.addAll(b);
        System.out.println("Union: " + union); // [1, 2, 3, 4, 5, 6]

        // Intersection (A ∩ B)
        Set<Integer> intersection = new HashSet<>(a);
        intersection.retainAll(b);
        System.out.println("Intersection: " + intersection); // [3, 4]

        // Difference (A - B)
        Set<Integer> difference = new HashSet<>(a);
        difference.removeAll(b);
        System.out.println("Difference: " + difference); // [1, 2]

        // Check subset
        Set<Integer> sub = new HashSet<>(Arrays.asList(1, 2));
        System.out.println("Is subset? " + a.containsAll(sub)); // true
    }
}`
      }
    ],
    tip: "Always override **hashCode()** when you override **equals()** — otherwise HashSet won't detect duplicates correctly."
  },
  {
    id: "col-map",
    title: "HashMap, LinkedHashMap & TreeMap",
    difficulty: "Medium",
    theory: [
      "**Map<K, V>** stores **key-value pairs** — each key is unique, values can repeat",
      "**HashMap** — O(1) get/put, unordered, allows one null key and multiple null values",
      "**LinkedHashMap** — maintains **insertion order** (or access order if configured)",
      "**TreeMap** — sorted by keys (natural order or custom Comparator), O(log n) operations",
      "HashMap uses **hashing** — key.hashCode() determines the bucket, equals() resolves collisions",
      "**Load factor** (default 0.75) — when 75% full, HashMap doubles its capacity and rehashes",
      "**Collision handling:** Java 8+ uses linked list for ≤8 collisions, converts to **Red-Black Tree** for >8",
      "**getOrDefault**, **putIfAbsent**, **compute**, **merge** are powerful Java 8+ methods"
    ],
    code: [
      {
        title: "HashMap — Essential Operations",
        language: "java",
        content: `import java.util.*;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        
        // Put key-value pairs
        map.put("Alice", 90);
        map.put("Bob", 85);
        map.put("Charlie", 92);
        
        // Get value by key
        int score = map.get("Alice");             // 90
        int def = map.getOrDefault("Dave", 0);    // 0 (key not found)
        
        // Check existence
        boolean hasKey = map.containsKey("Bob");      // true
        boolean hasVal = map.containsValue(85);       // true
        
        // Update
        map.put("Alice", 95);                     // overwrite
        map.putIfAbsent("Alice", 100);            // no change — key exists
        
        // Remove
        map.remove("Charlie");
        
        // Iterate
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
        
        // Keys and values
        Set<String> keys = map.keySet();
        Collection<Integer> values = map.values();
    }
}`
      },
      {
        title: "Frequency Count — Most Common Pattern",
        language: "java",
        content: `import java.util.*;

public class FrequencyCount {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 2, 1, 3, 3, 4};
        
        // Method 1: Traditional
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums) {
            freq.put(n, freq.getOrDefault(n, 0) + 1);
        }
        
        // Method 2: merge (Java 8+)
        Map<Integer, Integer> freq2 = new HashMap<>();
        for (int n : nums) {
            freq2.merge(n, 1, Integer::sum);
        }
        
        // Method 3: compute
        Map<Integer, Integer> freq3 = new HashMap<>();
        for (int n : nums) {
            freq3.compute(n, (k, v) -> v == null ? 1 : v + 1);
        }
        
        System.out.println(freq); // {1=2, 2=2, 3=3, 4=1}
        
        // Find max frequency element
        int maxKey = Collections.max(freq.entrySet(), 
            Map.Entry.comparingByValue()).getKey();
        System.out.println("Most frequent: " + maxKey); // 3
    }
}`
      },
      {
        title: "TreeMap — Sorted Map with Navigation",
        language: "java",
        content: `import java.util.*;

public class TreeMapDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(30, "C"); map.put(10, "A"); map.put(20, "B"); map.put(40, "D");
        
        System.out.println(map);  // {10=A, 20=B, 30=C, 40=D} — sorted by key
        
        // Navigation methods
        System.out.println("First: " + map.firstKey());     // 10
        System.out.println("Last: " + map.lastKey());       // 40
        System.out.println("Floor(25): " + map.floorKey(25));   // 20 (≤ 25)
        System.out.println("Ceiling(25): " + map.ceilingKey(25)); // 30 (≥ 25)
        System.out.println("Lower(20): " + map.lowerKey(20));    // 10 (< 20)
        System.out.println("Higher(20): " + map.higherKey(20));  // 30 (> 20)
        
        // Submaps
        SortedMap<Integer, String> sub = map.subMap(15, 35);
        System.out.println("SubMap [15,35): " + sub); // {20=B, 30=C}
    }
}`
      }
    ],
    warning: "Never modify a map while iterating with a for-each loop — use **Iterator.remove()** or **removeIf()** instead."
  },
  {
    id: "col-queue",
    title: "Queue, Deque & PriorityQueue",
    difficulty: "Medium",
    theory: [
      "**Queue<E>** — FIFO (First-In, First-Out) data structure",
      "**Deque<E>** — Double-ended queue, supports insertion/removal at both ends",
      "**PriorityQueue** — elements are ordered by priority (min-heap by default), NOT FIFO",
      "**Key Queue methods:** offer(e) — add, poll() — remove head, peek() — view head",
      "offer/poll/peek return null on failure. add/remove/element throw exceptions",
      "**PriorityQueue** gives you the **smallest** element first (natural ordering)",
      "For **max-heap**, use `new PriorityQueue<>(Collections.reverseOrder())`",
      "PriorityQueue is essential in competitive programming — Dijkstra, K-th largest, merge K lists"
    ],
    code: [
      {
        title: "Queue & Deque Operations",
        language: "java",
        content: `import java.util.*;

public class QueueDemo {
    public static void main(String[] args) {
        // Queue (FIFO) — use LinkedList or ArrayDeque
        Queue<String> queue = new LinkedList<>();
        queue.offer("A");
        queue.offer("B");
        queue.offer("C");
        System.out.println(queue.poll()); // A (first in, first out)
        System.out.println(queue.peek()); // B (view without removing)
        
        // Deque — double-ended
        Deque<Integer> deque = new ArrayDeque<>();
        deque.offerFirst(1);  // [1]
        deque.offerLast(2);   // [1, 2]
        deque.offerFirst(0);  // [0, 1, 2]
        
        System.out.println(deque.pollFirst()); // 0
        System.out.println(deque.pollLast());  // 2
        System.out.println(deque.peekFirst()); // 1
    }
}`
      },
      {
        title: "PriorityQueue — Min Heap & Max Heap",
        language: "java",
        content: `import java.util.*;

public class PQDemo {
    public static void main(String[] args) {
        // Min-Heap (default)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(30); minHeap.offer(10); minHeap.offer(20);
        System.out.println(minHeap.poll()); // 10 (smallest first)
        System.out.println(minHeap.poll()); // 20
        
        // Max-Heap
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.offer(30); maxHeap.offer(10); maxHeap.offer(20);
        System.out.println(maxHeap.poll()); // 30 (largest first)
        
        // Custom comparator — sort by string length
        PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> a.length() - b.length());
        pq.offer("banana"); pq.offer("fig"); pq.offer("apple");
        System.out.println(pq.poll()); // fig (shortest)
        
        // K-th Largest Element
        int[] nums = {3, 1, 4, 1, 5, 9, 2, 6};
        int k = 3;
        PriorityQueue<Integer> kHeap = new PriorityQueue<>();
        for (int n : nums) {
            kHeap.offer(n);
            if (kHeap.size() > k) kHeap.poll();
        }
        System.out.println("K-th largest: " + kHeap.peek()); // 5
    }
}`
      }
    ],
    tip: "Prefer **ArrayDeque** over LinkedList for stack/queue usage — it's faster and uses less memory."
  },
  {
    id: "col-stack",
    title: "Stack & ArrayDeque",
    difficulty: "Easy",
    theory: [
      "**Stack** class exists in Java but is **legacy** — it extends Vector and is synchronized (slow)",
      "Use **ArrayDeque** as a stack instead — it's faster and not synchronized",
      "**Stack operations:** push(e) → addFirst(e), pop() → removeFirst(), peek() → peekFirst()",
      "ArrayDeque is backed by a **resizable circular array** — very cache-friendly",
      "Common stack problems: balanced parentheses, next greater element, expression evaluation, undo operations",
      "Stack is LIFO — Last In, First Out"
    ],
    code: [
      {
        title: "ArrayDeque as Stack",
        language: "java",
        content: `import java.util.*;

public class StackDemo {
    public static void main(String[] args) {
        // ✅ Recommended — ArrayDeque as Stack
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(1);  // [1]
        stack.push(2);  // [2, 1]
        stack.push(3);  // [3, 2, 1]
        
        System.out.println(stack.peek()); // 3 (top)
        System.out.println(stack.pop());  // 3
        System.out.println(stack.pop());  // 2
        System.out.println(stack.isEmpty()); // false
        
        // ❌ Avoid — Legacy Stack class
        // Stack<Integer> old = new Stack<>(); // synchronized, slow
    }
}`
      },
      {
        title: "Balanced Parentheses — Classic Stack Problem",
        language: "java",
        content: `public class BalancedParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isValid("({[]})")); // true
        System.out.println(isValid("({[}])"));  // false
        System.out.println(isValid("(("));      // false
    }
}`
      }
    ],
    note: "In competitive programming, ArrayDeque is the go-to for both stack and queue operations."
  },
  {
    id: "col-iterator",
    title: "Iterators & ListIterator",
    difficulty: "Medium",
    theory: [
      "**Iterator<E>** provides a standard way to traverse any collection one element at a time",
      "Methods: **hasNext()** — checks if more elements, **next()** — returns next element, **remove()** — removes last returned element",
      "**ListIterator<E>** extends Iterator — supports bidirectional traversal and modification",
      "ListIterator adds: **hasPrevious()**, **previous()**, **add()**, **set()**, **nextIndex()**, **previousIndex()**",
      "**ConcurrentModificationException** — thrown if you modify a collection while iterating with for-each",
      "Safe removal during iteration: use **iterator.remove()** or **collection.removeIf()**",
      "The **for-each loop** internally uses an Iterator — it's syntactic sugar"
    ],
    code: [
      {
        title: "Iterator & Safe Removal",
        language: "java",
        content: `import java.util.*;

public class IteratorDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        
        // Basic iteration
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            int val = it.next();
            System.out.print(val + " "); // 1 2 3 4 5
        }
        System.out.println();
        
        // ✅ Safe removal — remove even numbers
        it = list.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) {
                it.remove(); // safe!
            }
        }
        System.out.println(list); // [1, 3, 5]
        
        // ✅ Even simpler — removeIf (Java 8+)
        List<Integer> list2 = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        list2.removeIf(n -> n % 2 == 0);
        System.out.println(list2); // [1, 3, 5]
        
        // ❌ This throws ConcurrentModificationException!
        // for (int n : list) { if (n == 3) list.remove(n); }
    }
}`
      },
      {
        title: "ListIterator — Bidirectional Traversal",
        language: "java",
        content: `import java.util.*;

public class ListIteratorDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        
        ListIterator<String> lit = list.listIterator();
        
        // Forward
        while (lit.hasNext()) {
            int idx = lit.nextIndex();
            String val = lit.next();
            System.out.println(idx + ": " + val);
        }
        
        // Backward
        System.out.println("--- Reverse ---");
        while (lit.hasPrevious()) {
            String val = lit.previous();
            System.out.print(val + " "); // D C B A
        }
        System.out.println();
        
        // Modify during iteration
        lit = list.listIterator();
        while (lit.hasNext()) {
            String val = lit.next();
            lit.set(val.toLowerCase()); // replace current
        }
        System.out.println(list); // [a, b, c, d]
    }
}`
      }
    ],
    warning: "Never call **iterator.remove()** without first calling **next()** — it throws IllegalStateException."
  },
  {
    id: "col-comparable",
    title: "Comparable & Comparator",
    difficulty: "Medium",
    theory: [
      "**Comparable<T>** — defines the **natural ordering** of a class. Implement `compareTo(T o)` in the class itself",
      "**Comparator<T>** — defines an **external/custom ordering**. Pass it to sort methods or collections",
      "**compareTo contract:** return negative if this < other, 0 if equal, positive if this > other",
      "**Comparable** = single default sorting. **Comparator** = multiple different sortings",
      "Java 8 Comparator helpers: `Comparator.comparing()`, `thenComparing()`, `reversed()`",
      "TreeSet, TreeMap, PriorityQueue, Collections.sort, Arrays.sort all use Comparable/Comparator",
      "If your class implements Comparable, it works with all sorted collections automatically"
    ],
    code: [
      {
        title: "Comparable — Natural Ordering",
        language: "java",
        content: `import java.util.*;

class Student implements Comparable<Student> {
    String name;
    int grade;
    
    Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }
    
    @Override
    public int compareTo(Student other) {
        // Sort by grade ascending
        return Integer.compare(this.grade, other.grade);
    }
    
    @Override
    public String toString() {
        return name + "(" + grade + ")";
    }
}

public class ComparableDemo {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 90));
        students.add(new Student("Bob", 75));
        students.add(new Student("Charlie", 85));
        
        Collections.sort(students); // uses compareTo
        System.out.println(students); // [Bob(75), Charlie(85), Alice(90)]
        
        // Works with TreeSet too
        TreeSet<Student> sorted = new TreeSet<>(students);
        System.out.println(sorted.first()); // Bob(75)
    }
}`
      },
      {
        title: "Comparator — Custom & Multiple Sortings",
        language: "java",
        content: `import java.util.*;

public class ComparatorDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob", "Dave");
        
        // Sort by length
        names.sort(Comparator.comparingInt(String::length));
        System.out.println(names); // [Bob, Dave, Alice, Charlie]
        
        // Sort by length, then alphabetically
        names.sort(Comparator.comparingInt(String::length)
                             .thenComparing(Comparator.naturalOrder()));
        System.out.println(names); // [Bob, Dave, Alice, Charlie]
        
        // Reverse order
        names.sort(Comparator.reverseOrder());
        System.out.println(names); // [Dave, Charlie, Bob, Alice]
        
        // Complex: sort int[][] by first element desc, then second asc
        int[][] intervals = {{3,5}, {1,4}, {3,2}, {1,7}};
        Arrays.sort(intervals, (a, b) -> {
            if (a[0] != b[0]) return b[0] - a[0]; // desc by first
            return a[1] - b[1];                     // asc by second
        });
        // [[3,2], [3,5], [1,4], [1,7]]
        
        // Null-safe comparator
        List<String> withNulls = Arrays.asList("B", null, "A", null, "C");
        withNulls.sort(Comparator.nullsLast(Comparator.naturalOrder()));
        System.out.println(withNulls); // [A, B, C, null, null]
    }
}`
      }
    ],
    tip: "In competitive programming, lambda comparators are the fastest way to define custom sort: `Arrays.sort(arr, (a, b) -> a[0] - b[0])`"
  },
  {
    id: "col-collections",
    title: "Collections Utility Class",
    difficulty: "Easy",
    theory: [
      "**Collections** (with 's') is a utility class with static methods for operating on collections",
      "**Sorting:** `sort()`, `reverseOrder()`, `shuffle()`",
      "**Searching:** `binarySearch()` — list must be sorted first",
      "**Min/Max:** `min()`, `max()` — with natural or custom comparator",
      "**Unmodifiable:** `unmodifiableList()`, `unmodifiableMap()` — returns read-only view",
      "**Synchronized:** `synchronizedList()`, `synchronizedMap()` — thread-safe wrappers",
      "**Fill/Copy/Swap:** `fill()`, `copy()`, `swap()`, `rotate()`, `frequency()`",
      "Java 9+: `List.of()`, `Set.of()`, `Map.of()` create immutable collections directly"
    ],
    code: [
      {
        title: "Collections Utility Methods",
        language: "java",
        content: `import java.util.*;

public class CollectionsUtilDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        
        // Sort & Reverse
        Collections.sort(list);
        System.out.println("Sorted: " + list);     // [1, 2, 3, 5, 8, 9]
        Collections.reverse(list);
        System.out.println("Reversed: " + list);    // [9, 8, 5, 3, 2, 1]
        
        // Min & Max
        Collections.sort(list);
        System.out.println("Min: " + Collections.min(list)); // 1
        System.out.println("Max: " + Collections.max(list)); // 9
        
        // Binary Search (list must be sorted)
        int idx = Collections.binarySearch(list, 5);
        System.out.println("Index of 5: " + idx); // 3
        
        // Frequency
        List<Integer> nums = Arrays.asList(1, 2, 3, 2, 2, 4);
        System.out.println("Freq of 2: " + Collections.frequency(nums, 2)); // 3
        
        // Shuffle
        Collections.shuffle(list);
        System.out.println("Shuffled: " + list);
        
        // Fill & Swap
        Collections.fill(list, 0);
        System.out.println("Filled: " + list); // [0, 0, 0, 0, 0, 0]
        
        // Immutable collections (Java 9+)
        List<String> immutable = List.of("A", "B", "C");
        // immutable.add("D"); // throws UnsupportedOperationException
    }
}`
      }
    ],
    note: "**Collections.unmodifiableList()** returns a view — changes to the original list are reflected. For a true copy, use `List.copyOf()` (Java 10+)."
  },
  {
    id: "col-concurrent",
    title: "Concurrent Collections",
    difficulty: "Hard",
    theory: [
      "Standard collections are **NOT thread-safe** — concurrent access causes data corruption or ConcurrentModificationException",
      "**ConcurrentHashMap** — thread-safe HashMap, uses fine-grained locking (lock striping), much faster than synchronizedMap",
      "**CopyOnWriteArrayList** — thread-safe List, creates a new copy on every write. Great for read-heavy, write-rare scenarios",
      "**ConcurrentLinkedQueue** — non-blocking thread-safe queue using CAS (Compare-And-Swap)",
      "**BlockingQueue** — thread-safe queue that blocks on take() when empty and put() when full. Used in producer-consumer pattern",
      "**ConcurrentSkipListMap** — thread-safe sorted map (like TreeMap but concurrent)",
      "**Collections.synchronizedXxx()** wraps with a single lock — works but has poor performance under contention",
      "Rule: prefer **java.util.concurrent** classes over synchronized wrappers"
    ],
    code: [
      {
        title: "ConcurrentHashMap & Thread-Safe Collections",
        language: "java",
        content: `import java.util.*;
import java.util.concurrent.*;

public class ConcurrentDemo {
    public static void main(String[] args) throws Exception {
        // ConcurrentHashMap — thread-safe, high performance
        ConcurrentHashMap<String, Integer> cmap = new ConcurrentHashMap<>();
        cmap.put("A", 1);
        cmap.put("B", 2);
        
        // Atomic operations
        cmap.putIfAbsent("C", 3);
        cmap.compute("A", (k, v) -> v + 10);      // A=11
        cmap.merge("B", 5, Integer::sum);           // B=7
        
        // CopyOnWriteArrayList — safe for iteration
        CopyOnWriteArrayList<String> cowList = new CopyOnWriteArrayList<>();
        cowList.add("X"); cowList.add("Y"); cowList.add("Z");
        // Safe to iterate while other threads modify
        for (String s : cowList) {
            System.out.print(s + " "); // X Y Z
        }
        System.out.println();
        
        // BlockingQueue — producer/consumer
        BlockingQueue<Integer> bq = new ArrayBlockingQueue<>(5);
        bq.put(1); // blocks if full
        bq.put(2);
        int val = bq.take(); // blocks if empty
        System.out.println("Took: " + val); // 1
    }
}`
      },
      {
        title: "Producer-Consumer with BlockingQueue",
        language: "java",
        content: `import java.util.concurrent.*;

public class ProducerConsumer {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new LinkedBlockingQueue<>(10);
        
        // Producer thread
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    queue.put(i);
                    System.out.println("Produced: " + i);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        // Consumer thread
        Thread consumer = new Thread(() -> {
            try {
                for (int i = 0; i < 5; i++) {
                    int val = queue.take(); // blocks if empty
                    System.out.println("Consumed: " + val);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        producer.start();
        consumer.start();
    }
}`
      }
    ],
    warning: "ConcurrentHashMap does **not** allow null keys or values — unlike HashMap. This prevents ambiguity in concurrent scenarios."
  }
];
