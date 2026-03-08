

# Upgrade Content Renderer UI — Theory & Non-Code Blocks

## Problem
The theory block, key points, notes, tips, warnings, and other non-code content blocks look flat and need a premium visual upgrade throughout the application.

## Changes

### 1. Theory Block Redesign (`ContentRenderer.tsx`)
- Add a labeled header with icon ("📖 Theory" or "Understanding the Problem") like other boxes
- Replace plain bullet dots with numbered step indicators (gradient-styled circles)
- Add subtle left accent border like highlight-box
- Increase padding, add inner spacing between paragraphs
- Add a subtle gradient background instead of flat card color

### 2. Key Points Block Upgrade
- Replace plain dots with checkmark icons or numbered badges
- Add alternating subtle backgrounds per item for scanability
- Make the header more prominent with a gradient underline

### 3. Note / Tip / Warning Boxes
- Add subtle inner glow/gradient backgrounds
- Improve icon styling (use Lucide icons instead of emoji: `Lightbulb`, `CheckCircle`, `AlertTriangle`)
- Add a colored top-bar accent in addition to left border

### 4. Section Header Upgrade
- Add a subtle gradient underline below the title
- Make difficulty badge slightly larger with a glow effect
- Add a small decorative element (e.g., colored line) before the title

### 5. Complexity Badges
- Add subtle icon (Clock for Time, Database for Space) before labels
- Slightly larger with more prominent styling

### 6. Table Styling
- Add rounded corners to header cells
- Subtle row hover effect
- Better header gradient

### 7. CSS Updates (`index.css`)
- New `.theory-block` class with gradient background + left accent
- Updated `.highlight-box`, `.tip-box`, `.warning-box` with improved gradients and inner glow
- New `.theory-step` class for numbered theory items

### Files to Edit
- `src/components/ContentRenderer.tsx` — Main rendering upgrades
- `src/index.css` — New/updated CSS classes

