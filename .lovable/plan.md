## Plan: Add User-Defined Symbol Autocomplete (IntelliSense) to Playground

### Problem

When you type a variable name, method name, or class name in the editor, Monaco doesn't remember it for reuse. Platforms like CodeChef/Codeforces show your own defined symbols in the autocomplete dropdown because they parse your code in real-time.

### Solution

Add a **4th completion provider** that parses the current editor code on every keystroke and extracts user-defined symbols (variables, methods, classes, constants), then offers them as autocomplete suggestions — just like CodeChef/VS Code IntelliSense.

### How It Works

1. **Register a new `CompletionItemProvider**` in `handleEditorMount` that:
  - Reads the full editor text via `model.getValue()`
  - Runs regex-based extraction to find:
    - **Variables**: `int count = ...`, `String name = ...`, `var x = ...`
    - **Methods**: `void solve(...)`, `int dfs(...)`, `static long modPow(...)`
    - **Classes**: `class Solution`, `class Main`
    - **Constants**: `static final int MOD = ...`
    - **Parameters**: method parameters like `(int[] nums, int target)`
  - Deduplicates symbols and excludes Java keywords
  - Returns them as `CompletionItemKind.Variable` / `.Method` / `.Class` suggestions with appropriate icons
2. **Symbol detail annotations**: Each suggestion shows context like `"variable (line 12)"` or `"method"` so the user knows what it is.
3. **Priority**: User-defined symbols get `sortText: "0_..."` so they appear at the top of the dropdown, above keywords and snippets — matching CodeChef/VS Code behavior.

### Technical Details

**File**: `src/pages/Playground.tsx`

A new completion provider will be registered after the existing 3 providers in `handleEditorMount`. The parser uses regex patterns to extract symbols from the current document text:

```text
Patterns:
  Variables:  /(?:int|long|double|String|boolean|...)\s+(\w+)\s*[=;,)]/
  Methods:    /(?:void|int|long|...)\s+(\w+)\s*\(/
  Classes:    /class\s+(\w+)/
  For-loops:  /for\s*\([^)]*?(\w+)\s*[;:]/
  Parameters: method signature params
for anything writes in the editor should option in drop down nexttime reuse please
```

No database changes needed. No new files — just an addition to the existing editor mount logic.