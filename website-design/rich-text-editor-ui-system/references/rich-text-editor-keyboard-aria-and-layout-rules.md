# Rich Text Editor Keyboard, ARIA, and Layout Rules

This reference guide provides technical layout formulas, keyboard shortcut mappings, ARIA accessibility semantics, and mobile virtual keyboard adaptation rules for WYSIWYG rich text editors.

---

## 1. Keyboard Shortcuts & Auto-Formatting Triggers

To support high-velocity drafting without forcing users to reach for the mouse, implement standard operating system shortcuts and Markdown-style inline text triggers.

### A. Standard Operating System Shortcuts

| Action | macOS Shortcut | Windows / Linux Shortcut | Target Element / Effect |
| :--- | :--- | :--- | :--- |
| **Toggle Bold** | `Cmd + B` | `Ctrl + B` | Active text selection or cursor formatting state |
| **Toggle Italic** | `Cmd + I` | `Ctrl + I` | Active text selection or cursor formatting state |
| **Toggle Underline** | `Cmd + U` | `Ctrl + U` | Active text selection or cursor formatting state |
| **Toggle Strikethrough**| `Cmd + Shift + X` | `Ctrl + Shift + X` | Active text selection |
| **Insert Hyperlink** | `Cmd + K` | `Ctrl + K` | Opens inline link popover modal or input field |
| **Toggle Inline Code** | `Cmd + E` | `Ctrl + E` | Wraps selection in `<code>` block |
| **Clear Formatting** | `Cmd + \` | `Ctrl + \` | Removes all inline styles from active selection |
| **Undo Last Edit** | `Cmd + Z` | `Ctrl + Z` | Restores prior canvas state from undo stack |
| **Redo Edit** | `Cmd + Shift + Z` | `Ctrl + Shift + Z` | Re-applies popped undo stack state |
| **Submit / Post** | `Cmd + Enter` | `Ctrl + Enter` | Submits comment composer or primary form action |

### B. Markdown Auto-Formatting Input Rules

When a user types these characters followed by `Space` or `Enter` at the start of a paragraph block, convert the block automatically:

- `# ` + `Space` → Convert line to **Heading 1 (`<h1>`)**
- `## ` + `Space` → Convert line to **Heading 2 (`<h2>`)**
- `### ` + `Space` → Convert line to **Heading 3 (`<h3>`)**
- `* ` or `- ` + `Space` → Convert line to **Unordered Bullet List (`<ul><li>`)**
- `1. ` + `Space` → Convert line to **Ordered Numbered List (`<ol><li>`)**
- `[] ` + `Space` → Convert line to **Interactive Task Checkbox (`<ul class="task-list">`)**
- `> ` + `Space` → Convert line to **Blockquote (`<blockquote>`)**
- ``` + `Enter` → Convert block to **Syntax Highlighted Code Block (`<pre><code>`)**
- `---` + `Enter` → Insert **Horizontal Divider (`<hr>`)**

---

## 2. ARIA Semantics & Accessibility Specification

To comply with **WCAG 2.2 AA**, rich text editor components must expose clear screen reader roles, states, and keyboard focus delegation.

### A. Document Canvas Semantics

```html
<div
  id="editor-canvas"
  contenteditable="true"
  role="textbox"
  aria-multiline="true"
  aria-label="Article content editor"
  aria-describedby="editor-shortcut-hint"
  tabindex="0"
>
  <p>Editable content paragraph...</p>
</div>
<span id="editor-shortcut-hint" class="sr-only">
  Press Alt+F10 to focus the formatting toolbar.
</span>
```

### B. Toolbar Semantics & Roving Tabindex

Toolbar buttons must not overload page tab order. Use composite toolbar navigation:

```html
<div role="toolbar" aria-label="Text formatting options" aria-controls="editor-canvas">
  <button type="button" role="button" aria-label="Bold text" aria-pressed="true" tabindex="0">
    Bold
  </button>
  <button type="button" role="button" aria-label="Italic text" aria-pressed="false" tabindex="-1">
    Italic
  </button>
</div>
```

- **Toolbar Focus Shortcut:** Allow users to jump focus directly from the editor canvas into the toolbar using `Alt + F10` (or `F10`).
- **Arrow Key Traversal:** Pressing `Right Arrow` / `Left Arrow` within the toolbar moves focus between toolbar buttons without using `Tab`.
- **`aria-pressed` State:** Stateful toggle buttons (Bold, Italic, Strikethrough, Bullet List) MUST dynamically toggle `aria-pressed="true"` and `aria-pressed="false"` based on cursor position.

---

## 3. Mobile Virtual Keyboard & Viewport Rules

Mobile touch devices present unique spatial challenges due to dynamic virtual keyboard overlays.

### A. Dynamic Viewport Height & Action Bar Pinning

Bottom-anchored formatting toolbars must attach to the browser's `visualViewport` rather than fixed layout viewports:

```css
/* Sticky Mobile Action Dock */
.mobile-editor-dock {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-surface-elevated);
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
```

```javascript
// Keep mobile toolbar anchored above the soft keyboard
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const dock = document.querySelector('.mobile-editor-dock');
    if (dock) {
      const offset = window.innerHeight - window.visualViewport.height;
      dock.style.transform = `translateY(-${offset}px)`;
    }
  });
}
```

---

## 4. Spatial & Contrast Standards Summary

| Metric / Attribute | Value / Constraint | Rationale |
| :--- | :--- | :--- |
| **Canvas Max Width** | `680px` – `768px` | Maintains 65–75 characters per line for optimal reading ergonomics |
| **Body Line Height** | `1.6` (16px text = 25.6px line box) | Prevents line overlap and improves editing precision |
| **Mobile Touch Target** | Minimum `44px × 44px` | Complies with WCAG 2.2 SC 2.5.8 Target Size |
| **Desktop Button Sizing**| `32px × 32px` | High-density toolbars with 4px hit padding |
| **Text Contrast** | `4.5:1` minimum against background | WCAG AA legibility for canvas and toolbar text |
| **Active Toggle Contrast**| `3:1` minimum UI state change | Clearly highlights toggled formatting buttons |
