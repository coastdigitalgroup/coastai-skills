# WYSIWYG Content Editor and Inline Comment Composer Breakdown

This document provides two realistic design breakdowns for rich text interfaces:
1. **Full WYSIWYG Article & Document Canvas Editor** (CMS / Editorial Publishing)
2. **Compact Inline Discussion & Comment Composer** (SaaS / Discussion Board)

---

## 1. Full WYSIWYG Article & Document Canvas Editor

### Context & Objective
Designed for long-form publishing platforms, editorial CMS tools, and documentation authoring. The user needs to compose long articles, format block structures, insert media embeds, and track word limits while maintaining focus.

### Spatial Breakdown & Component Anatomy

```text
+---------------------------------------------------------------------------------------------------+
|  [Logo] Article Editor  -  "Designing Modern Web Systems"          [Save Draft] [ Publish ] [Avatar]|
+---------------------------------------------------------------------------------------------------+
|  FORMATTING TOOLBAR (Sticky: top: 0px, z-index: 100)                                              |
|  +---------------------------------------------------------------------------------------------+  |
|  | [Heading 2 v] | [B] [I] [U] [S] | [Lists v] | ["] [<>] | [Link] [Img] [Table] | [<-] [->]    |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
|  CANVAS CONTAINER (Centered Max-width: 840px, Margin: 32px auto)                                  |
|                                                                                                   |
|  [::] # Building Adaptable Interface Systems                                                      |
|       ^ Block drag handle (Hover visible)                                                         |
|                                                                                                   |
|  [::] Designing scalable web applications requires a clear separation of design tokens,           |
|       structural layout patterns, and interactive component state machines.                       |
|                                                                                                   |
|  [::] +-----------------------------+  <- Floating Selection Menu (Triggered on text select)      |
|       | [B]  [I]  [Link]  [H2]  ["] |                                                             |
|       +-----------------------------+                                                             |
|       When building rich content editors, spatial composition is just as critical                 |
|       as typography scales and color contrast.                                                    |
|                                                                                                   |
|  [::] /head|                           <- Slash Command Menu (Triggered on typing '/')            |
|       +-------------------------------------------------------------+                             |
|       | [H1] Heading 1            Top-level section heading         |                             |
|       | [H2] Heading 2            Sub-section title heading         |                             |
|       | [List] Bulleted List      Create a simple bulleted list     |                             |
|       | [Quote] Blockquote        Highlight a key quotation         |                             |
|       +-------------------------------------------------------------+                             |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|  STATUS & FOOTER BAR (Docked Bottom)                                                              |
|  Words: 482  |  Characters: 3,120  |  Reading Time: ~2 min                  [Auto-saved at 14:32] |
+---------------------------------------------------------------------------------------------------+
```

### Design Specifications & Token Assignments

| Area | Component / Element | Token / Value | Notes |
| :--- | :--- | :--- | :--- |
| **Toolbar** | Container Height | `52px` | Horizontal flex alignment with `gap: 8px`. |
| | Item Target Size | `36px x 36px` | Minimum touch size on desktop (`44px` on mobile). |
| | Active Tool State | `bg: var(--color-primary-100)` | Border: `1px solid var(--color-primary-300)`, Icon: `var(--color-primary-700)`. |
| **Canvas** | Max Container Width | `840px` | Optimal line length (~75-80 characters per line). |
| | Base Font Size | `1.125rem` (18px) | Line height `1.65` for effortless long-form reading. |
| | Paragraph Spacing | `margin-bottom: 1.5rem` | Clear spatial block separation. |
| **Selection Menu** | Floating Offset | `-42px` above selection | Shadow: `0 10px 15px -3px rgba(0,0,0,0.12)`. |
| **Status Bar** | Bar Padding | `12px 24px` | Border top: `1px solid var(--color-border)`. |

---

## 2. Compact Inline Discussion & Comment Composer

### Context & Objective
Designed for contextual comment threads, feedback modals, and discussion boards where horizontal space is constrained (e.g., sidebars or inline card threads).

### Spatial Breakdown & Component Anatomy

```text
+---------------------------------------------------------------------------------------------------+
|  INLINE COMPOSER CONTAINER (Width: 100%, Max-width: 640px)                                         |
|  +---------------------------------------------------------------------------------------------+  |
|  | EDITABLE CANVAS AREA (Min-height: 110px, Padding: 12px 16px)                                |  |
|  |                                                                                             |  |
|  | Great suggestion! I recommend checking the **accessibility guidelines** for                 |  |
|  | roving tabindex before finalizing the toolbar keyboard spec.                                |  |
|  |                                                                                             |  |
|  +---------------------------------------------------------------------------------------------+  |
|  | BOTTOM ACTION & FORMATTING BAR                                                              |  |
|  | [B] [I] [Code] [Link] [List] [@]                   [ 142/500 Chars ]   [Cancel]  [ Reply ]   |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

### Interaction & Keyboard Accessibility Rules

1. **Expansion on Focus:**
   - In collapsed state, the composer displays a single line (`"Write a comment..."`) with height `44px`.
   - On focus/click, it expands smoothly to `min-height: 120px` revealing the bottom toolbar.
2. **Bottom Toolbar Layout:**
   - Formatting tools (`Bold`, `Italic`, `Code`, `Link`, `Mention @`) sit on the left.
   - Character counter (`142 / 500`) and primary buttons (`Cancel`, `Reply`) sit on the right.
3. **Character Limit Counter Logic:**
   - `< 80% limit` (0 - 400 chars): Text color is muted gray (`var(--color-text-muted)`).
   - `80% - 99% limit` (401 - 499 chars): Text color shifts to amber (`var(--color-warning)`).
   - `>= 100% limit` (500 chars): Text color shifts to bold red (`var(--color-danger)`), border turns red, and `Reply` button is disabled.
4. **Keyboard Shortcuts:**
   - `Cmd + Enter` / `Ctrl + Enter`: Instantly submits the comment without needing mouse interaction.
   - `Escape`: Focuses the `Cancel` button or collapses the composer if empty.
