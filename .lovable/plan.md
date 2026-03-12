## Plan: Add Draggable "Guru" AI Chatbot

### What We're Building

A floating, draggable AI chatbot icon labeled "Guru" that appears on every page. Clicking it opens a chat panel. It uses NVIDIA's Nemotron model via a backend function with streaming responses and markdown rendering.

### Architecture

```text
[Guru FAB] → click → [Chat Panel (draggable)]
     ↓ send message
[Edge Function: guru-chat] → NVIDIA API (streaming SSE)
     ↓ tokens
[Chat Panel renders markdown in real-time]
```

### Steps

1. **Store NVIDIA API key** as a backend secret using `add_secret` tool
2. **Create edge function** `supabase/functions/guru-chat/index.ts`
  - Proxies to `https://integrate.api.nvidia.com/v1/chat/completions`
  - Model: `nvidia/nemotron-3-super-120b-a12b`
  - Streaming enabled with reasoning support
  - CORS headers included
  - System prompt: "You are Guru, an AI tutor for DSA and competitive programming on AlgoGuru"
3. **Update `supabase/config.toml**` to register the function with `verify_jwt = false`
4. **Create `src/components/GuruBot.tsx**`
  - Floating draggable button (bottom-right corner) with "Guru" sparkle icon
  - Click opens a chat panel that can be dragged around the screen
  - Input field + message list with streaming token-by-token rendering
  - Markdown rendering for AI responses using react-markdown (already have react-syntax-highlighter)
  - Minimize/close button
  - Conversation history maintained in state
  - Handles reasoning_content from the model's thinking tokens (displays or hides them)
5. **Add `<GuruBot />` to `AppLayout**` in `src/App.tsx` so it appears on all authenticated pages

### Technical Details

- **Dragging**: Pure CSS/JS with `mousedown/mousemove/mouseup` events — no extra library needed
- **Streaming**: SSE parsing same pattern as existing AI gateway usage, but pointing to the guru-chat edge function
- **Styling**: Matches existing theme using `hsl(var(--...))` CSS variables
- **State**: Local React state only — no database persistence for chat history
- **Icon**: Sparkles icon from lucide-react with "Guru" label

### Files Changed

- `supabase/functions/guru-chat/index.ts` (new)
- `supabase/config.toml` (add function config)
- `src/components/GuruBot.tsx` (new)
- `src/App.tsx` (add GuruBot to AppLayout)
- Make that icon chatbot such a way can be easily minimize when someone wishes please
- &nbsp;