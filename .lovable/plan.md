

## Fix Java Playground -- Compilation + Editor Improvements

### Root Cause of 500 Errors
Wandbox saves uploaded code as `prog.java`, but Java requires `public class Main` to be in a file named `Main.java`. When users write `public class Main`, compilation fails. The fix: automatically strip `public` from the main class declaration before sending to Wandbox.

### Changes to `src/pages/Playground.tsx`

**1. Fix compilation -- strip `public` before sending**
- In `runCode`, transform `public class Main` to `class Main` before posting to Wandbox API
- This is transparent to the user -- they still see proper Java in the editor

**2. Hardcode correct Java compiler IDs**
- Replace the dynamic fetch (which returns unpredictable IDs) with known working Wandbox compiler names
- Based on network logs, the naming pattern is `openjdk-jdk-{version}` 
- Set fallbacks to compilers confirmed available: Java 22, Java 15, Java 14
- Keep the dynamic fetch but filter to only show Java 8, 17, 21, 22 (or closest matches)

**3. Update DEFAULT_CODE**
- Keep `public class Main` in the editor (proper Java style) since we strip it before compile

**4. Add Ctrl+Enter keyboard shortcut**
- Register `Ctrl+Enter` / `Cmd+Enter` in the Monaco editor to trigger `runCode`

**5. Ensure themes, reset, format all work properly**
- Solarized Dark, Dark, Light, High Contrast already defined -- verify theme switching works after mount
- Reset clears code, output, and stdin correctly (already implemented)
- Format uses Monaco's built-in formatter (already implemented)

### Technical Approach
- The `runCode` function will preprocess code: `code.replace(/public\s+class\s+/g, "class ")`
- Fallback compilers updated to IDs that actually exist on Wandbox
- Dynamic fetch kept but with better filtering for user-requested versions (8, 17, 21)
- Keyboard shortcut added via `editor.addCommand` in `handleEditorMount`

