

# Playground UI Improvements

## Changes

### 1. Move Download to Settings Only
Remove the standalone "Download" button from both the normal header toolbar (line 767-775) and fullscreen bar (line 932-940). It already exists inside the Settings dropdown (line 892-899), so no duplication needed.

### 2. Run Button — LeetCode-style Triangle Icon
Replace the current `<Play>` icon + "Run ⌘↵" text with a compact green play triangle button, similar to LeetCode's design:
- Filled triangle play icon (using `Play` with `fill="currentColor"`)
- Green accent color background
- Compact, icon-forward design with just "Run" text
- Apply to both normal and fullscreen Run buttons

### 3. Settings Menu — Collapsible Sub-sections
Restructure the Settings dropdown to use collapsible sub-dropdowns:
- **Compiler** section with a chevron toggle — expands to show Java version options
- **Editor Theme** section with a chevron toggle — expands to show theme options  
- **Actions** section stays flat (Copy, Download, Reset)

This keeps the menu clean by default and lets users expand what they need.

### 4. Java Debugger
A true step-through debugger requires a debug protocol server (like JDWP), which Wandbox does not support. What IS feasible:
- **Debug Mode Run**: Inject `System.out.println` trace statements at key points, or run with verbose exception output
- **Breakpoint Markers**: Let users click line numbers to set visual breakpoints, then on "Debug Run" the code gets instrumented to print variable state at those lines before compilation

This would be a **simulated debugger** — it instruments the code with print statements at marked breakpoint lines, compiles via Wandbox, and shows the trace output. Not a real step debugger, but practically useful.

**Scope for this implementation**: Add visual breakpoint toggling on line gutters + a "Debug" run mode that auto-instruments print statements at breakpoint lines showing local variable values.

### File Changes
- **Edit**: `src/pages/Playground.tsx` — all changes in one file

