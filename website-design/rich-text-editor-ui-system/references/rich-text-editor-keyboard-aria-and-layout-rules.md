# Rich Text Editor — Design Tokens, Keyboard & ARIA Reference

This reference guide establishes rules for floating selection popovers, toolbar button design tokens, keyboard short-cuts, ARIA roles, and WCAG AA compliance in rich text editor interfaces.

---

## 1. Design Tokens for Editor Components

### Colors & Elevation Tokens
```css
:root {
  /* Surface Tokens */
  --rte-bg-canvas: #ffffff;
  --rte-bg-toolbar: #f8fafc;
  --rte-bg-button-hover: #f1f5f9;
  --rte-bg-button-active: #eff6ff;
  --rte-border-subtle: #e2e8f0;
  --rte-border-strong: #cbd5e1;

  /* Floating Popover Surface */
  --rte-floating-bg: #0f172a;
  --rte-floating-text: #f8fafc;
  --rte-floating-hover: #1e293b;

  /* Primary Active Format */
  --rte-primary-brand: #2563eb;
  --rte-primary-ring: rgba(37, 99, 235, 0.35);

  /* Elevation Shadows */
  --rte-shadow-toolbar: 0 2px 4px rgba(0, 0, 0, 0.04);
  --rte-shadow-floating: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}
```

### Control Dimensions & Sizing
- **Toolbar Height:** `44px` on desktop, `48px` on mobile/touch.
- **Icon Button Target Size:** `34x34px` (desktop), `44x44px` (mobile).
- **Canvas Max Width:** `68ch` to `75ch` (~720px to 800px) for optimal reading line length.
- **Canvas Line Height:** `1.65` for body text, `1.25` for headings.
- **Gutter Block Handle Size:** `24x24px` buttons, offset `-48px` from canvas edge.

---

## 2. Floating Selection Menu & Anchor Positioning

When floating a contextual menu above selected text, use JavaScript's `Range.getBoundingClientRect()` or CSS Anchor Positioning:

```javascript
function positionFloatingMenu(menuElement, selection) {
  if (selection.isCollapsed) {
    menuElement.style.display = 'none';
    return;
  }

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Position 8px above selection center
  const top = rect.top + window.scrollY - menuElement.offsetHeight - 8;
  const left = rect.left + window.scrollX + (rect.width / 2) - (menuElement.offsetWidth / 2);

  menuElement.style.position = 'absolute';
  menuElement.style.top = `${Math.max(10, top)}px`;
  menuElement.style.left = `${Math.max(10, left)}px`;
  menuElement.style.display = 'flex';
}
```

---

## 3. ARIA Roles and Attributes Map

| Element / Zone | Required ARIA Role | Key ARIA Attributes | Description |
| :--- | :--- | :--- | :--- |
| **Canvas** | `role="textbox"` | `contenteditable="true"`, `aria-multiline="true"`, `aria-labelledby="[id]"` | Primary editable canvas. |
| **Main Toolbar** | `role="toolbar"` | `aria-label="Formatting options"`, `aria-orientation="horizontal"` | Container grouping editor action buttons. |
| **Toolbar Button** | Default `<button>` | `aria-pressed="true|false"`, `aria-label="Bold (Ctrl+B)"` | Toggable formatting button. |
| **Format Selector**| `<select>` or `role="combobox"` | `aria-label="Text block style"` | Dropdown selecting block format (H1, H2, P). |
| **Status Bar** | `<footer>` | `aria-live="polite"` | Dynamic updates for autosave state and word count. |
| **Slash Menu** | `role="listbox"` | `role="option"`, `aria-selected="true"` | Accessible dropdown for slash commands (`/`). |

---

## 4. Standard Keyboard Shortcuts Reference

| Formatting Action | Windows / Linux Shortcut | macOS Shortcut | Keyboard Focus Action |
| :--- | :--- | :--- | :--- |
| **Bold** | `Ctrl + B` | `⌘ + B` | Toggles bold on selection |
| **Italic** | `Ctrl + I` | `⌘ + I` | Toggles italic on selection |
| **Underline** | `Ctrl + U` | `⌘ + U` | Toggles underline on selection |
| **Inline Code** | `Ctrl + E` | `⌘ + E` | Wraps selection in code tag |
| **Insert Link** | `Ctrl + K` | `⌘ + K` | Opens inline link dialog |
| **Slash Menu** | `/` (at start of line) | `/` (at start of line) | Focuses slash command dropdown |
| **Exit Toolbar** | `Tab` / `Esc` | `Tab` / `Esc` | Returns focus to canvas |
| **Toolbar Nav** | `Left / Right Arrow` | `Left / Right Arrow` | Cycles focus across toolbar controls |

---

## 5. WCAG AA Accessibility Rules for Editors

1. **Focus Trap Prevention (WCAG 2.1 SC 2.1.2):** Pressing `Tab` inside a code block or table within the editor canvas MUST NOT trap keyboard focus. Provide an explicit shortcut (e.g., `Esc` then `Tab`) or button to exit the sub-container.
2. **Text Contrast (WCAG 2.1 SC 1.4.3):** Editor placeholder text (e.g. "Type '/' for commands...") must meet a minimum `4.5:1` contrast ratio against the canvas background. Standard `--color-text-muted` (#64748b) meets contrast rules on white.
3. **Status Region Announcements (WCAG 2.1 SC 4.1.3):** Background saving events must update screen reader users silently via `aria-live="polite"` without grabbing keyboard focus.
