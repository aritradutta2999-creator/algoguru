

## Plan: Consolidate to 4 Optimized Contest Templates

Currently there are 6 templates with overlap (2 Codeforces variants, 2 LeetCode variants). The goal is to merge them into 4 best-in-class templates, each optimized for its platform's contest format.

### The 4 Templates

1. **CP Template (Ultimate)** -- General-purpose, works anywhere. Keep the existing one mostly as-is since it already has BufferedReader + PrintWriter + full utilities. Best for CSES, AtCoder, general practice.

2. **Codeforces** -- Merge the two CF templates. Use the FastReader (byte-level) for maximum speed (critical for CF's tight TLEs), FastIO output, plus all utilities (shuffleSort to avoid quicksort hack, modPow, gcd/lcm, lowerBound/upperBound, array I/O, debug). Single consolidated template.

3. **CodeChef** -- Keep StringBuilder-based output (CC's judge benefits from batch output). Add missing utilities from the ultimate template: shuffleSort, lowerBound/upperBound, modInv, sumArray, min/maxArray, array output helpers. Add `nextStringArray` and `nextDoubleArray`.

4. **LeetCode** -- Merge the two LC templates. Solution class with local `main` test harness, plus contest helpers: direction arrays, gcd/lcm, modPow, lowerBound/upperBound. Import `java.util.*` and `java.util.stream.*`.

### File Change

**`src/data/cpTemplates.ts`** -- Replace the entire `CP_TEMPLATES` array with the 4 new consolidated templates. No other files need changes since the Playground already reads from this array.

### Analysis of What Each Platform Needs

| Feature | CF | CC | LC | CP General |
|---------|----|----|----|----|
| Fast byte-level I/O | Yes (TLE-critical) | No (BufferedReader OK) | No (no stdin) | BufferedReader |
| StringBuilder output | No (PrintWriter) | Yes (batch print) | No | PrintWriter |
| shuffleSort | Yes (anti-hack) | Yes | No | Yes |
| Multi-test-case | Yes | Yes | No | Yes |
| Direction arrays | No | No | Yes (grid) | No |
| Local test main | No | No | Yes | No |
| modInv | Yes | Yes | Yes | Yes |

