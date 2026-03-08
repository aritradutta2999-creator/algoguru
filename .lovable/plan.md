

## Best Reading Experience — LeetCode-quality Content Layout

### Problem
Currently, all content (problem statement, examples, approach) is dumped into a single bullet-point list. There's no visual hierarchy — everything looks the same, making it hard to scan and read.

### Goal
Every section follows a clear, visually distinct order:
**Question → Theory → Example → Approach → Key Points → Code**

Each block gets its own styling — like LeetCode's problem pages with distinct sections for description, examples, and solution.

### Approach

**Smart parsing in ContentRenderer** — detect patterns in the existing `theory[]` strings to auto-separate content into styled blocks, avoiding changes to dozens of data files.

Detection rules:
- Lines starting with `**Example:**` or containing `Input:` / `Output:` → render in an **Example box** (bordered, distinct background, monospace for I/O)
- Lines starting with `**Approach:**` → render in an **Approach section** (highlighted left-border box)
- Lines containing `Explanation:` → group with the example above
- Everything else → normal theory bullets

### Visual Design

```text
┌─────────────────────────────────────────┐
│  Problem Title                    Easy  │
│  Time: O(n) · Space: O(n)              │
├─────────────────────────────────────────┤
│                                         │
│  ● Theory bullet 1                      │
│  ● Theory bullet 2                      │
│                                         │
│  ┌─ Example ──────────────────────────┐ │
│  │  Input:  nums = [2,7,11,15]        │ │
│  │  Output: [0, 1]                    │ │
│  │  Explanation: nums[0]+nums[1]=9    │ │
│  └────────────────────────────────────┘ │
│                                         │
│  ┌─ Approach ─────────────────────────┐ │
│  │  Use a HashMap to store each...    │ │
│  └────────────────────────────────────┘ │
│                                         │
│  Key Points                             │
│  ● HashMap lookup is O(1) average       │
│  ● Check complement before inserting    │
│                                         │
│  ┌─ Code ─────────────────────────────┐ │
│  │  [syntax highlighted code block]   │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Changes

**1. `src/components/ContentRenderer.tsx`** — Major refactor:
- Add `classifyTheoryLines()` function that splits `theory[]` into `{ normal, examples, approach }` groups
- Render normal theory as bullets
- Render examples in a styled card with green left border, monospace I/O lines, proper `Input:/Output:/Explanation:` formatting
- Render approach in a highlighted box with purple left border
- Enforce strict order: Title → Difficulty → Complexity → Theory → Example → Approach → Diagram → Key Points → Note/Tip/Warning → Table → Code → Playground button

**2. `src/index.css`** — New component classes:
- `.cr-example-box` — Subtle background, green/teal left border, rounded, monospace-friendly
- `.cr-approach-box` — Purple left border, slightly different background
- `.cr-example-label` / `.cr-approach-label` — Small uppercase label badges
- `.cr-io-line` — Monospace styling for Input/Output lines
- Light mode variants for all new classes

**3. Typography & spacing refinements:**
- Tighter title with difficulty badge inline (not on separate line)
- Complexity as subtle inline pills
- Increased spacing between major sections for breathing room
- Slightly larger theory text for readability

