

# Add Bit Manipulation Topic -- Basics to Advanced

## Overview
Add a comprehensive **Bit Manipulation** topic as the 5th section in the CP Guide, following the same architecture and patterns used by existing topics. The content will be split across multiple subtopics (each rendered as a separate scrollable section on one page), with each section containing focused theory and multiple dedicated code blocks.

## Content Structure (Subtopics)

The Bit Manipulation topic will have **10 subtopics**, progressing from absolute basics to expert-level techniques:

1. **Introduction to Bits & Number Systems** (Easy)
   - Binary representation, decimal-to-binary conversion
   - How integers are stored (32-bit, 64-bit), signed vs unsigned
   - Code: Binary conversion utility, printing binary representation in Java

2. **Basic Bitwise Operators** (Easy)
   - AND, OR, XOR, NOT, Left Shift, Right Shift (arithmetic vs logical)
   - Truth tables, operator precedence
   - Code: Demonstrating each operator with examples, Odd/Even check using AND

3. **Common Bit Tricks & Hacks** (Easy-Medium)
   - Check if number is power of 2
   - Count set bits (Brian Kernighan's algorithm)
   - Toggle, set, clear, check specific bit
   - Swap two numbers without temp variable
   - Code: Each trick as a separate code block with explanation

4. **Bit Masking Fundamentals** (Medium)
   - What is a bitmask, creating and using masks
   - Extracting/setting bit ranges
   - Using bitmasks for subset representation
   - Code: Subset generation using bitmasks, permission flags example

5. **XOR Properties & Problems** (Medium)
   - XOR properties (self-inverse, associativity, commutativity)
   - Find the single non-repeating element
   - Find two non-repeating elements
   - XOR from 1 to N in O(1)
   - Code: Each problem as a separate code block

6. **Counting Bits & Lookups** (Medium)
   - Counting set bits: naive, Kernighan, lookup table, `Integer.bitCount()`
   - Counting bits for all numbers 0 to N (DP approach)
   - Hamming distance, total Hamming distance
   - Code: All approaches compared, DP solution for counting bits

7. **Bit Manipulation in Competitive Programming** (Hard)
   - Maximum XOR subarray (using Trie)
   - Minimum XOR pair
   - XOR queries on arrays (prefix XOR)
   - Bitwise AND/OR of ranges
   - Code: Trie-based max XOR, prefix XOR queries, range AND

8. **Bitmask DP** (Hard)
   - Subset enumeration with bitmask
   - Travelling Salesman Problem (TSP) with bitmask DP
   - Assignment Problem
   - Iterating over all submasks of a mask
   - Code: TSP implementation, assignment problem, submask enumeration

9. **Advanced Bit Techniques** (Expert)
   - Gosper's Hack (iterating subsets of size k)
   - Bit-parallel algorithms
   - Gray Code generation
   - Bitboard representation (chess/game programming)
   - SOS DP (Sum over Subsets)
   - Code: Gosper's Hack, Gray Code, SOS DP

10. **Practice Problems & Patterns** (Expert)
    - Comprehensive problem set with solutions
    - Patterns summary: when to use which technique
    - Complexity reference table for all bit operations
    - Code: Selected hard problems with full Java solutions

## Files to Create / Modify

### 1. Create `src/data/bitManipulationContent.ts`
- Export `bitManipulationContent: ContentSection[]` with all 10 sections
- Each section uses the existing `ContentSection` interface (id, title, difficulty, theory, keyPoints, code blocks, tables, notes, tips, warnings)
- Multiple code blocks per section (not one giant block)

### 2. Modify `src/data/topics.ts`
- Add a new topic entry:
  - id: `"bits"`
  - title: `"Bit Manipulation"`
  - icon: `"⊕"`
  - color: `"info"` (a new color, or reuse an existing one)
  - description: `"Bitwise operations & masking"`
  - subtopics: all 10 subtopic entries with matching IDs

### 3. Modify `src/pages/TopicPage.tsx`
- Import `bitManipulationContent`
- Add `bits: bitManipulationContent` to the `contentMap`
- Add `bits` to `topicColorVars`

### 4. Modify `src/components/AppSidebar.tsx`
- Add `bits` entry to `topicIcons` and `topicColorVars`

### 5. Modify `src/pages/Index.tsx`
- Add `bits` to `topicColors` and `topicIcons` maps
- Update quick stats (Topics: 5, Sections: 45+, Code Examples: 80+)
- Add "Bit Manipulation" to the roadmap steps

### 6. Modify `src/index.css`
- Add an `--info` CSS variable color (e.g., a distinct purple/magenta) for the new topic if needed, or assign an existing color

## Approach
- Follow the exact same `ContentSection` data schema
- Each subtopic gets its own `id` matching the sidebar entry
- Code blocks are split by concept (e.g., "Brian Kernighan's Algorithm" is one block, "Toggle Bit" is another)
- Difficulty progresses: Easy -> Easy -> Medium -> Medium -> Medium -> Medium -> Hard -> Hard -> Expert -> Expert

