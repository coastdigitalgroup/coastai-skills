# Rich Text Editor UI System — Real-World Application Breakdown

This document demonstrates two primary implementations of the **Rich Text Editor UI System**:
1. **Full-Featured WYSIWYG Document Editor Canvas** (suited for long-form publishing, documentation, and CMS environments).
2. **Compact Inline Comment Composer** (suited for feedback tools, pull request discussions, support tickets, and chat threads).

---

## 1. Full-Featured WYSIWYG Document Editor Canvas

### Visual Layout Diagram

```text
+-----------------------------------------------------------------------------------------+
| HEADER TOOLBAR (position: sticky; top: 0; z-index: 10; role="toolbar")                   |
| [Undo] [Redo] | [Paragraph H1 v] | [B] [I] [U] [S] [</>] [A v] | [List v] [Align v] | [Link] |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  GUTTER (-48px)  WRITING CANVAS (max-width: 720px; contenteditable="true")              |
|  +-------+                                                                              |
|  | [+]   |       # Designing Modern Editor Interfaces                                   |
|  | [⋮⋮]   |                                                                              |
|  +-------+       Rich text editors require a strict separation between toolbar controls |
|                  and the content canvas. When designing a canvas...                     |
|                                                                                         |
|                  +---------------------------------------------------+                  |
|                  | FLOATING SELECTION MENU (z-index: 50)             |                  |
|                  | [ B ] [ I ] [ Link ] [ Highlight ] [ Comment ]    |                  |
|                  +---------------------------------------------------+                  |
|                  | ... highlighted text range in content ...         |                  |
|                                                                                         |
|                  /|                                                                     |
|                  +---------------------------------------------------+                  |
|                  | SLASH COMMAND MENU (z-index: 60)                  |                  |
|                  | 📝 Heading 1          Large section heading       |                  |
|                  | 📄 Heading 2          Medium section heading      |                  |
|                  | 📋 Bulleted List      Create a simple bullet list |                  |
|                  | 🖼️ Image              Upload or embed image       |                  |
|                  +---------------------------------------------------+                  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
| FOOTER STATUS BAR (position: sticky; bottom: 0; aria-live="polite")                      |
| 🟢 All changes saved to cloud    |   482 words   |   3,120 characters   |   Markdown Mode |
+-----------------------------------------------------------------------------------------+
```

### Spatial & Typography Token Mapping

| Zone | CSS Selector / Element | Width / Height Rules | Padding / Spacing | Typography / Colors |
| :--- | :--- | :--- | :--- | :--- |
| **Sticky Header** | `.editor-toolbar` | `width: 100%`, `min-height: 48px` | `padding: 8px 16px` | `background: var(--color-surface)`, `border-bottom: 1fr solid var(--color-border)` |
| **Document Canvas** | `.editor-canvas` | `max-width: 720px`, `margin: 0 auto` | `padding: 40px 24px` | `font-size: 1.125rem`, `line-height: 1.7`, `color: var(--color-text-main)` |
| **Side Gutter** | `.block-gutter` | `width: 48px`, `left: -48px` | `gap: 4px` | `color: var(--color-text-muted)`, `opacity: 0` (shows on line hover) |
| **Floating Menu** | `.selection-menu` | `height: 36px`, `position: absolute` | `padding: 4px 8px` | `background: var(--color-bg-inverse)`, `border-radius: 8px`, `box-shadow: elevation-high` |
| **Status Bar** | `.editor-status-bar` | `width: 100%`, `height: 32px` | `padding: 0 16px` | `font-size: 0.8125rem`, `color: var(--color-text-subtle)`, `border-top: 1px solid var(--color-border)` |

---

## 2. Compact Inline Comment Composer

### Visual Layout Diagram

```text
+-----------------------------------------------------------------------------------------+
| INLINE COMMENT COMPOSER (min-height: 120px; max-height: 360px)                          |
| +-------------------------------------------------------------------------------------+ |
| | [ Write ]  [ Preview ]                                                              | |
| +-------------------------------------------------------------------------------------+ |
| | Leave a comment...                                                                  | |
| |                                                                                     | |
| |                                                                                     | |
| +-------------------------------------------------------------------------------------+ |
| | ACTION DOCK & TOOLBAR                                                               | |
| | [B] [I] [</>] [Link] [List] [Mention @]  |  Attach files   |  [Cancel]  [ Comment ] | |
+-----------------------------------------------------------------------------------------+
```

### Key Differences & Design Adaptation Rules

1. **Toolbar Placement:** Unlike document editors where toolbars sit at the top, compact inline composers place formatting buttons along the **bottom action dock** adjacent to the Submit button.
2. **Height Constraints:** Uses `min-height: 120px` and `max-height: 360px` with `overflow-y: auto`. This prevents long content from taking over the parent feed page.
3. **Tabbed Modes:** Offers a "Write / Preview" segmented tab header to render Markdown output on demand without layout distortion.
4. **Target Sizing:** Action buttons retain `36x36px` minimum touch targets on desktop and expand to `44x44px` on mobile screens.

---

## 3. Step-by-Step Selection Handling Strategy

To prevent user text selections from clearing when formatting buttons are clicked:

```javascript
// Example behavior specification for Toolbar Buttons
const boldButton = document.querySelector('[data-action="bold"]');

boldButton.addEventListener('mousedown', (event) => {
  // Prevent button from stealing focus from the contenteditable canvas
  event.preventDefault();
});

boldButton.addEventListener('click', () => {
  // Execute formatting while text selection is preserved
  document.execCommand('bold', false, null);

  // Update button ARIA state
  const isBold = document.queryCommandState('bold');
  boldButton.setAttribute('aria-pressed', isBold ? 'true' : 'false');
});
```

---

## 4. Accessibility Checklist for Editors

- [x] Canvas element has `contenteditable="true"`, `role="textbox"`, and `aria-multiline="true"`.
- [x] Primary formatting bar uses `role="toolbar"` with `aria-label="Document formatting"`.
- [x] Arrow keys (`Left`/`Right`) cycle focus between buttons inside the toolbar; `Tab` exits into canvas.
- [x] All icon buttons possess explicit `aria-label` text describing action and keyboard shortcut (e.g., `aria-label="Bold (Ctrl+B)"`).
- [x] Active text formatting states reflect dynamically on toolbar buttons via `aria-pressed="true"`.
- [x] Autosave updates and word counts trigger announcements using an `aria-live="polite"` region.
