# Rich Text & Bulk Action Toolbar Examples

This document demonstrates two production-grade toolbar compositions applied to real-world software design problems:
1. **WYSIWYG Rich Text Editor Sticky Formatting Toolbar**
2. **Data Table Multi-Select Floating Bulk Action Dock**

---

## Example 1: Rich Text Editor Sticky Formatting Toolbar

### Design Context
A content management system (CMS) blog post editor requiring dense inline styling controls. The toolbar remains sticky at the top of the viewport when scrolling through long articles.

### Visual & Spatial Composition Breakdown

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [Paragraph ▾] │ [B] [I] [U] [S] │ [≡] [equiv] [≡] │ [1.] [•] │ [🔗] [📷] [<code>] │ [↺] [↻] │ [ Fullscreen ] │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
  Group 1         Group 2          Group 3         Group 4     Group 5          Group 6     Group 7
  (Format)        (Text Style)     (Alignment)     (Lists)     (Embeds)         (History)   (View Mode)
```

### Logical Grouping Architecture

1. **Format Selector Dropdown (Group 1):**
   - Control: Native/Custom Select or Menu Button (`Paragraph`, `Heading 1`, `Heading 2`, `Heading 3`, `Quote`).
   - Sizing: Width `130px`, height `36px`.
2. **Text Formatting Toggles (Group 2):**
   - Controls: Bold, Italic, Underline, Strikethrough icon buttons (`36×36px` target).
   - Toggles: Independent states using `aria-pressed="true|false"`.
3. **Alignment Mutual Exclusion Group (Group 3):**
   - Controls: Align Left, Align Center, Align Right (`36×36px`).
   - Grouping: Wrapped in `<div role="radiogroup" aria-label="Text alignment">`.
   - Toggles: `role="radio"` with `aria-checked="true|false"`.
4. **List Controls (Group 4):**
   - Controls: Numbered List, Bulleted List (`aria-pressed="true|false"`).
5. **Media & Insert Tools (Group 5):**
   - Controls: Hyperlink (`Ctrl+K`), Image Upload (`Ctrl+Shift+I`), Code Block (`Ctrl+Alt+C`).
6. **History Controls (Group 6):**
   - Controls: Undo (`Ctrl+Z`), Redo (`Ctrl+Y`). Stateful buttons disabled when stack is empty (`disabled` attribute).
7. **View Mode Utility (Group 7):**
   - Controls: Fullscreen focus mode (`aria-pressed="true|false"`).

### Divider & Spacing Rules
- **Vertical Separators:** 1px wide, 20px tall lines (`background: var(--border-subtle)`) with 8px horizontal margin separating each group (`<div role="separator" aria-orientation="vertical"></div>`).
- **Control Gap:** 2px gap between sibling buttons inside a group; 8px padding inside the outer toolbar container.
- **Sticky Anchor:** `position: sticky; top: 0; z-index: 20; background: var(--surface-card); border-bottom: 1px solid var(--border-subtle); shadow: var(--shadow-sm);`.

---

## Example 2: Data Table Multi-Select Floating Bulk Action Dock

### Design Context
An enterprise SaaS order management dashboard where admins select multiple row checkboxes across a data grid to execute batch status changes, exports, or deletions.

### Visual & Spatial Composition Breakdown

```text
                               ┌───────────────────────────────────────────────────────────────┐
                               │ █ 14 Selected  │  [✓ Mark Paid]  [📦 Ship]  [🗑 Delete]  │ ✕ │
                               └───────────────────────────────────────────────────────────────┘
                                                  Floating Pill Action Dock
```

### Layout Anatomy & Spatial Tokens

- **Positioning:** Fixed at bottom center of screen:
  `position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); z-index: 100;`
- **Container Geometry:**
  - `height: 52px;`
  - `padding: 0 12px 0 16px;`
  - `border-radius: 9999px;` (Pill silhouette)
  - `background: var(--surface-dark, #111827);`
  - `color: var(--text-inverse, #FFFFFF);`
  - `box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.2);`
- **Selected Count Indicator:**
  - Badge text: `14 Selected` (`font-weight: 600; font-size: 14px;`).
  - Screen reader announcement: Triggered via `aria-live="polite"` region when count changes.
- **Bulk Action Buttons:**
  - Buttons styled with dark mode surface variants (`background: rgba(255,255,255,0.12); color: #FFF; hover: rgba(255,255,255,0.2);`).
  - Destructive Action ("Delete"): Distinct red warning state (`background: #EF4444; color: #FFF; hover: #DC2626;`).
- **Dismiss / Deselect All Button:**
  - Icon-only "✕" button at the far right with `aria-label="Deselect all rows"`.

---

## Responsive & Touch Device Adaptations

### Mobile Viewport Behavior (<640px)
- **Rich Text Editor:**
  - Collapses secondary formatting (Alignment, History, Fullscreen) into a "••• More" menu button.
  - Controls scale from `36×36px` to `44×44px` touch targets.
  - Toolbar moves from sticky top header to pinned bottom toolbar directly above the mobile virtual keyboard.
- **Bulk Action Dock:**
  - Shrinks width to `calc(100vw - 32px)`.
  - Icon-only buttons replace text labels (e.g., Checkmark icon for "Mark Paid", Box icon for "Ship", Trash icon for "Delete") while preserving `aria-label` attribute values.
