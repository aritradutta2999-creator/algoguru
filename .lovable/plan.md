

# Add 5-6 Problems Per Difficulty Per Category from CSES & LeetCode

## Current State
- 8 practice categories, each with ~3 Easy, 3 Medium, 2-3 Hard problems (~60 total in 1710 lines)
- All in one file `src/data/practiceContent.ts`

## Problem
Adding ~130 new problems to a single file would make it ~8000+ lines — unmaintainable. Need to split into separate files per category.

## Plan

### Step 1: Split into 8 category-specific files
Create separate data files to keep each manageable (~800-1000 lines each):

- `src/data/practice/arraysProblems.ts`
- `src/data/practice/stringsProblems.ts`
- `src/data/practice/recursionProblems.ts`
- `src/data/practice/dpProblems.ts`
- `src/data/practice/graphsProblems.ts`
- `src/data/practice/treesProblems.ts`
- `src/data/practice/greedyProblems.ts`
- `src/data/practice/stackQueueProblems.ts`

Each file exports its Easy/Medium/Hard arrays with existing + new problems.

### Step 2: Update `practiceContent.ts` to import from split files
Becomes a thin aggregator — imports all category arrays, exports `practiceContentMap`.

### Step 3: New Problems (5-6 per difficulty per category)

**Arrays & Hashing** (currently 3+3+3 → 8+8+8):
- Easy: Contains Duplicate, Missing Number, Single Number, Majority Element, Intersection of Two Arrays (LC 217, 268, 136, 169, 349)
- Medium: 4Sum, Next Permutation, Sort Colors, Merge Intervals, Spiral Matrix (LC 18, 31, 75, 56, 54)
- Hard: Sliding Window Maximum, Count of Smaller Numbers After Self, Max Points on a Line, Minimum Number of Arrows, Candy (LC 239, 315, 149, 452, 135)

**Strings Practice** (currently 3+3+2 → 8+8+8):
- Easy: First Unique Character, Longest Common Prefix, Roman to Integer, Is Subsequence, Count & Say (LC 387, 14, 13, 392, 38)
- Medium: String to Integer (atoi), Decode Ways, Palindrome Partitioning, Repeated DNA Sequences, Compare Version Numbers (LC 8, 91, 131, 187, 165)
- Hard: Wildcard Matching, Palindrome Pairs, Shortest Palindrome, Distinct Subsequences, Regular Expression Matching, Word Break II (LC 44, 336, 214, 115, 10, 140)

**Recursion & Backtracking** (currently 3+3+2 → 8+8+8):
- Easy: Fibonacci Number, Climbing Stairs, Sum of Digits, Count Good Numbers, Letter Case Permutation (LC 509, 70, CSES, LC 1922, LC 784)
- Medium: Combination Sum, Word Search, Sudoku Validator, Letter Combinations of Phone, Generate Parentheses (LC 39, 79, CSES, LC 17, LC 22)
- Hard: N-Queens, Word Break, Palindrome Partitioning II, Expression Add Operators, Stickers to Spell Word, Chessboard & Queens-CSES (LC 51, 139, 132, 282, 691, CSES)

**Dynamic Programming** (currently 3+3+2 → 8+8+8):
- Easy: House Robber, Min Cost Climbing Stairs, Pascal's Triangle, Divisible Sum Pairs, Counting Bits (LC 198, 746, 118, CSES, LC 338)
- Medium: Coin Change, Longest Increasing Subsequence, Unique Paths, Partition Equal Subset Sum, Longest Common Subsequence (LC 322, 300, 62, 416, 1143; CSES: Dice Combinations, Grid Paths)
- Hard: Burst Balloons, Longest Valid Parentheses, Interleaving String, Palindrome Partitioning II, Edit Distance, CSES: Elevator Rides (LC 312, 32, 97, 132, 72, CSES)

**Graph Problems** (currently 3+3+2 → 8+8+8):
- Easy: Find if Path Exists, Find the Town Judge, Island Perimeter, Flood Fill, Find Center of Star Graph (LC 1971, 997, 463, 733, 1791)
- Medium: Course Schedule, Rotting Oranges, Clone Graph, Pacific Atlantic Water Flow, Cheapest Flights Within K Stops (LC 207, 994, 133, 417, 787; CSES: Building Roads, Message Route)
- Hard: Word Ladder, Alien Dictionary, Swim in Rising Water, Critical Connections, Network Delay Time, CSES: Shortest Routes I (LC 127, 269, 778, 1192, 743, CSES)

**Trees Practice** (currently 3+3+2 → 8+8+8):
- Easy: Maximum Depth of Binary Tree, Symmetric Tree, Path Sum, Invert Binary Tree, Same Tree (LC 104, 101, 112, 226, 100)
- Medium: Binary Tree Right Side View, Construct BT from Preorder+Inorder, Kth Smallest in BST, Validate BST, Count Good Nodes (LC 199, 105, 230, 98, 1448)
- Hard: Serialize & Deserialize BT, Binary Tree Maximum Path Sum, Vertical Order Traversal, Binary Tree Cameras, Count Complete Tree Nodes, Recover BST (LC 297, 124, 987, 968, 222, 99)

**Greedy & Sorting** (currently 3+3+2 → 8+8+8):
- Easy: Assign Cookies, Lemonade Change, Best Time to Buy/Sell Stock, Maximum Units on Truck, Partition Labels (LC 455, 860, 121, 1710, 763)
- Medium: Jump Game, Gas Station, Task Scheduler, Reorganize String, Minimum Platforms (LC 55, 134, 621, 767, CSES: Movie Festival)
- Hard: Candy, IPO, Minimum Cost to Hire K Workers, Job Scheduling, Course Schedule III, CSES: Movie Festival II (LC 135, 502, 857, 1235, 630, CSES)

**Stack & Queue** (currently 3+3+2 → 8+8+8):
- Easy: Valid Parentheses, Min Stack, Implement Queue using Stacks, Baseball Game, Next Greater Element I (LC 20, 155, 232, 682, 496)
- Medium: Daily Temperatures, Evaluate Reverse Polish Notation, Decode String, Online Stock Span, Asteroid Collision (LC 739, 150, 394, 901, 735)
- Hard: Largest Rectangle in Histogram, Maximal Rectangle, Trapping Rain Water (stack), Basic Calculator, Longest Valid Parentheses, CSES: Maximum Building I (LC 84, 85, 42, 224, 32, CSES)

### Problem Format
Each problem includes:
- Problem statement with source attribution (LeetCode #/CSES name)
- 2 example inputs/outputs with clear explanation
- Approach description
- Key points
- Full Java solution with `main()` and test cases

### File Changes Summary
- **Create** 8 new files in `src/data/practice/`
- **Rewrite** `src/data/practiceContent.ts` as thin aggregator importing from split files

