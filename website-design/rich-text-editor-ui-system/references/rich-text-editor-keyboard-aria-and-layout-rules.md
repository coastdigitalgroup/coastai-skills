# Rich Text Editor Keyboard, ARIA, and Layout Rules Reference

This reference guide establishes the formal accessibility, keyboard navigation, and spatial layout rules for implementing rich text editing interfaces under the **Rich Text Editor UI System**.

---

## 1. ARIA 1.2 Specifications & State Management

Rich text editors built with HTML `contenteditable` elements or custom block engines must explicitly expose semantic structure to assistive technologies (AT).

### ContentEditable Canvas Attributes

| Attribute | Value | Purpose |
| :--- | :--- | :--- |
| `role` | `"textbox"` | Declares the editable region as an ARIA text input to screen readers. |
| `aria-multiline` | `"true"` | Informs screen readers that the text field accepts multi-line paragraph content. |
| `aria-label` / `aria-labelledby` | String / Element ID | Connects the editor field with a visible label or accessible document title. |
| `aria-autocomplete` | `"list"` | Set when slash command menus (`/`) or `@` mention popovers are actively querying choices. |
| `aria-controls` | Toolbar Element ID | Links the editable canvas to its controlling formatting toolbar. |
| `data-placeholder` | String | Rendered via CSS `:empty::before` to avoid exposing placeholder text as editable nodes. |

### Formatting Toolbar Attributes (`role="toolbar"`)

| Element | ARIA Attributes | Expected State Management |
| :--- | :--- | :--- |
| **Toolbar Container** | `role="toolbar"`<br>`aria-label="Formatting options"` | Wraps formatting control buttons and declares a unified toolbar region for screen readers. |
| **Formatting Toggles** | `type="button"`<br>`aria-pressed="true\|false"` | Must dynamically update `aria-pressed` based on cursor selection state (e.g., cursor inside bold text). |
| **Dropdown Triggers** | `type="button"`<br>`aria-haspopup="true"`<br>`aria-expanded="true\|false"` | Indicates whether block selector or color popovers are currently open. |
| **Group Separators** | `role="separator"`<br>`aria-orientation="vertical"` | Separates logical button groups for screen reader exploration. |

### Live Region Status Announcements

Include an off-screen live region element adjacent to the editor canvas:

```html
<div class="sr-only" aria-live="polite" aria-atomic="true" id="editor-status-announcer"></div>
```

**Status Events to Announce:**
- Draft auto-saved updates ("Draft saved successfully at 10:45 AM").
- Applied block format changes ("Heading 2 applied").
- Character/word limit warnings ("Warning: Maximum character limit reached").

---

## 2. Keyboard Navigation Architecture & Event Handling

A primary requirement of WCAG 2.2 SC 2.1.1 (Keyboard) is that all functionality must be operable via a keyboard interface without requiring specific timings for individual keystrokes.

### Key Navigation Matrix

| Context | Key Combination | Action |
| :--- | :--- | :--- |
| **Inside Canvas** | `Tab` | Moves focus to the next focusable form element on the page (or indents list item if inside `<ul>`/`<ol>`). **Never traps focus!** |
| **Inside Canvas** | `Shift + Tab` | Moves focus to the previous focusable form element (or outdents list item). |
| **Canvas -> Toolbar** | `Alt + F10` (or `Escape`) | Direct focus shortcut that jumps focus from inside the canvas directly to the active toolbar button. |
| **Inside Toolbar** | `Left Arrow` / `Right Arrow` | Navigates between formatting buttons in the toolbar (`roving tabindex` or standard arrow navigation). |
| **Inside Toolbar** | `Home` / `End` | Jumps focus to the first or last button in the toolbar row. |
| **Inline Formatting** | `⌘ + B` / `Ctrl + B` | Toggles Bold style on active selection or cursor position. |
| **Inline Formatting** | `⌘ + I` / `Ctrl + I` | Toggles Italic style on active selection or cursor position. |
| **Inline Formatting** | `⌘ + U` / `Ctrl + U` | Toggles Underline style on active selection or cursor position. |
| **Link Dialog** | `⌘ + K` / `Ctrl + K` | Opens inline link inserter popover. |
| **Slash Menu Trigger** | `/` (At start of block) | Opens the floating slash command block selection menu. |
| **Slash Menu Navigation** | `Up Arrow` / `Down Arrow` | Moves active highlight through command choices. |
| **Slash Menu Select** | `Enter` or `Tab` | Applies highlighted block type and closes slash popover. |
| **Slash Menu Close** | `Escape` | Dismisses slash popover and returns focus to canvas text. |
| **Composer Submit** | `⌘ + Enter` / `Ctrl + Enter` | Triggers primary submit/send action in compact inline comment composers. |

---

## 3. Spatial Layout, Reading Envelopes, and Typography Ratios

### Reading Line-Length Envelope
- **Optimal Line-Length:** 60 to 75 characters per line (approx. 10 to 12 words per line).
- **Canvas Max-Width Bounds:**
  - For `18px` body text font size: Set `max-width: 720px`.
  - For `16px` body text font size: Set `max-width: 680px`.
- **Vertical Rhythm & Paragraph Gaps:**
  - Paragraph bottom margin: `1.25rem` (`20px`).
  - Heading 1 (H1) top margin: `2.25rem`, bottom margin: `1.0rem`.
  - Heading 2 (H2) top margin: `1.75rem`, bottom margin: `0.75rem`.
  - Line height: `1.65` for body text, `1.25` for titles and headings.

### Button & Target Sizing
- **Desktop Toolbar Buttons:** Minimum size `32×32px` with `4px` padding and `4px` border-radius.
- **Mobile Touch Target Bounds:** Minimum touch target size **44×44px** on viewports `< 768px` (WCAG 2.2 SC 2.5.8 Target Size).
- **Separator Dividers:** Height `16px`–`20px`, width `1px`, color `#E2E8F0` (light) / `#334155` (dark).

---

## 4. Responsive & Mobile Touch Viewport Adaptations

1. **Virtual Keyboard Docking:** On mobile devices (`< 768px`), dock the primary rich text formatting toolbar directly above the native virtual keyboard using CSS fixed positioning or Visual Viewport API alignment (`window.visualViewport`).
2. **Horizontal Overflow Swipe:** On narrow viewports, display toolbar button groups in a single non-wrapping row with `overflow-x: auto; flex-wrap: nowrap;` and hidden scrollbars, allowing touch swipe traversal across tools.
3. **Hide Hover Gutters:** Hide left margin gutter hover handles (`+` and `⋮⋮`) on touch viewports, replacing them with tap-based block menus or inline slash commands.
4. **Touch Selection Bubble Offset:** Position floating selection bubble toolbars at least `12px` clear of native mobile text selection handles to prevent touch collision.
