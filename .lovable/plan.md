

# Add "Practice Problems" Tab

## What Changes

1. **ModeContext** — Add a third mode entry `{ id: "practice", label: "Practice Problems", icon: "🏆", description: "Curated Practice Problems" }` to `APP_MODES`.

2. **New data file `src/data/practiceTopics.ts`** — Create a topics list for Practice Problems with categories like Arrays, Strings, DP, Graphs, etc., each containing curated problem sets as subtopics.

3. **New content file `src/data/practiceContent.ts`** — Provide initial content for practice problem sections (problem statements, hints, solution approaches, Java code).

4. **Index.tsx (Home Page)**:
   - Add a third condition for `currentMode.id === "practice"` alongside `isDSMode` checks.
   - Add `practiceStats` (e.g., Categories, Problems, Difficulty Levels).
   - Update hero text and badge for practice mode.

5. **AppSidebar.tsx** — Add practice topics to `activeTopics` when mode is `"practice"`, add icon mapping `practice: <Trophy />`, add topic color vars for practice topic IDs.

6. **App.tsx** — Import `practiceTopics` into `allTopics` so global search covers practice problems.

7. **TopicPage.tsx** — Ensure it can render practice content (will follow existing content-fetching pattern).

## Practice Problem Categories (Initial)

- **Easy Warmups** — Basic array/string problems
- **Arrays & Hashing** — Two Sum, Subarrays, Frequency
- **Strings Practice** — Palindromes, Anagrams, Pattern
- **Recursion & Backtracking** — Subsets, Permutations, N-Queens
- **Dynamic Programming** — Classic DP problems
- **Graph Problems** — BFS/DFS, Shortest Path
- **Trees Practice** — Traversals, BST, LCA
- **Greedy & Sorting** — Interval scheduling, sorting-based

Each category has 5-8 subtopics (specific problems).

## Technical Notes

- The mode toggle pill on the home page and sidebar will automatically show 3 options since they iterate over `modes` from context.
- The sidebar section header will show "Practice Problems" when in practice mode.
- Content rendering reuses the existing `ContentRenderer` + `TopicPage` pattern.

