# Rich Text Editor Keyboard, ARIA, and Layout Reference Guide

This reference guide documents WCAG 2.2 AA accessibility requirements, ARIA roles, roving `tabindex` focus models, keyboard shortcuts, and spatial layout rules for WYSIWYG rich text content editors.

---

## 1. WAI-ARIA Role & Attribute Structure

A compliant rich text editor uses the following semantic ARIA structure to ensure assistive technologies (screen readers like NVDA, JAWS, and VoiceOver) correctly announce toolbar states and editable regions:

```html
<!-- Master Editor Container -->
<div class="editor-container">

  <!-- 1. Formatting Toolbar -->
  <div
    class="editor-toolbar"
    role="toolbar"
    aria-label="Formatting options"
    aria-controls="editor-canvas-1"
  >
    <div class="toolbar-group">
      <button
        type="button"
        class="toolbar-btn"
        aria-label="Bold"
        aria-pressed="true"
        tabindex="0"
      >
        Bold
      </button>
      <button
        type="button"
        class="toolbar-btn"
        aria-label="Italic"
        aria-pressed="false"
        tabindex="-1"
      >
        Italic
      </button>
    </div>

    <div class="toolbar-separator" role="separator" aria-orientation="vertical"></div>

    <div class="toolbar-group">
      <select class="toolbar-select" aria-label="Text block type" tabindex="-1">
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
      </select>
    </div>
  </div>

  <!-- 2. Content Editable Canvas -->
  <div
    id="editor-canvas-1"
    class="editor-canvas"
    contenteditable="true"
    role="textbox"
    aria-multiline="true"
    aria-label="Document content canvas"
    aria-describedby="editor-status-counter"
  >
    <p>Sample editable paragraph text...</p>
  </div>

  <!-- 3. Status Bar -->
  <div id="editor-status-counter" class="editor-status-bar" aria-live="polite">
    142 words | 890 characters
  </div>

</div>
```

---

## 2. Keyboard Focus & Roving Tabindex Pattern

To prevent screen reader and keyboard users from having to press `Tab` through 30+ individual toolbar buttons before reaching the document text, implement the **Roving `tabindex` Pattern**:

1. **Entering the Toolbar:** Pressing `Tab` from outside the component focuses the *currently active* or *first* toolbar button (`tabindex="0"`). All other buttons in the toolbar carry `tabindex="-1"`.
2. **Horizontal Toolbar Arrow Navigation:**
   - `Right Arrow`: Moves focus to the next button in the toolbar.
   - `Left Arrow`: Moves focus to the previous button in the toolbar.
   - `Home`: Moves focus directly to the first button in the toolbar.
   - `End`: Moves focus directly to the last button in the toolbar.
   - *Note:* Updating focus dynamically updates `tabindex="0"` on the newly focused button and sets `tabindex="-1"` on the previous button.
3. **Leaving the Toolbar:** Pressing `Tab` from any toolbar button bypasses the rest of the toolbar and lands directly inside the editable content canvas (`role="textbox"`).
4. **Exiting Content Canvas:** Pressing `Tab` inside the canvas advances to the next focusable interactive element outside the editor (unless inside a table cell, where `Tab` moves to the next cell and `Escape` then `Tab` exits the editor).

---

## 3. Standard Editor Keyboard Shortcuts

| Shortcut (macOS) | Shortcut (Windows/Linux) | Action / Function |
| :--- | :--- | :--- |
| `Cmd + B` | `Ctrl + B` | Toggle Bold inline style |
| `Cmd + I` | `Ctrl + I` | Toggle Italic inline style |
| `Cmd + U` | `Ctrl + U` | Toggle Underline inline style |
| `Cmd + Shift + X` | `Ctrl + Shift + X` | Toggle Strikethrough style |
| `Cmd + E` | `Ctrl + E` | Toggle Inline Code style |
| `Cmd + K` | `Ctrl + K` | Open insert link modal or floating popover |
| `Cmd + Shift + 7` | `Ctrl + Shift + 7` | Toggle Bulleted List |
| `Cmd + Shift + 8` | `Ctrl + Shift + 8` | Toggle Numbered List |
| `Cmd + Alt + 1` | `Ctrl + Alt + 1` | Apply Heading 1 block type |
| `Cmd + Alt + 2` | `Ctrl + Alt + 2` | Apply Heading 2 block type |
| `Cmd + Alt + 0` | `Ctrl + Alt + 0` | Convert current block back to Paragraph |
| `Cmd + Z` | `Ctrl + Z` | Undo last edit action |
| `Cmd + Shift + Z` | `Ctrl + Y` / `Ctrl + Shift + Z` | Redo last reverted action |
| `Cmd + Enter` | `Ctrl + Enter` | Submit inline comment/composer |

---

## 4. Touch Target & Spatial Contrast Rules

- **Minimum Touch Target:** All interactive controls (buttons, selects, popover triggers) must occupy at least **36px x 36px** on desktop and **44px x 44px** on touch devices.
- **Icon Contrast Ratio:** Icons inside buttons must maintain a minimum contrast ratio of **4.5:1** against the button background in resting, hover, and active states.
- **Focus Ring Visibility:** Focused elements must display a high-contrast focus indicator (minimum 3:1 contrast against surrounding canvas background, minimum 2px thickness). Never set `outline: none` without providing an equivalent focus ring indicator.
