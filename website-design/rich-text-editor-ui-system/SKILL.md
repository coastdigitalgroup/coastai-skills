---
name: rich-text-editor-ui-system
description: Design and structure WYSIWYG rich text content editors, document canvases, and inline composers with sticky toolbars, floating selection menus, block handles, status bars, and WCAG AA keyboard accessibility.
---

# Rich Text Editor UI System

## Purpose

The Rich Text Editor UI System provides a systematic methodology for designing, structuring, and layout-engineering WYSIWYG (What You See Is What You Get) content creation interfaces. Standard text inputs (`<input>`, `<textarea>`) lack structural formatting capabilities, while poorly engineered rich-text editors suffer from cluttered toolbars, chaotic focus trapping, inconsistent block spacing, floating menu clipping, and severe keyboard/screen-reader accessibility barriers.

This system establishes spatial hierarchy, content canvas typography, fixed and floating formatting toolbars, slash-command menus, block handle controls, and status/counter bars. It ensures that content composition feels smooth, scannable, visually uncluttered, and completely accessible across desktop, tablet, and mobile touch devices.

## Use Cases

- **CMS & Content Management Systems:** Building editorial interfaces for blog posts, news articles, documentation hubs, and landing page body copy.
- **SaaS Knowledge Bases & Documents:** Designing collaborative document canvases (e.g., Notion, Coda, Google Docs, or Confluence-style editors).
- **Inline Comment & Support Composers:** Structuring rich-text reply boxes in discussion forums, ticketing systems, pull-request code reviews, or CRM activity feeds.
- **E-learning & Quiz Builders:** Designing question and essay submission fields with math, code, and formatting options.
- **Email Campaign & Newsletter Builders:** Structuring drag-and-drop or block-based email template text editing canvases.

## When NOT to Use

- **Plain Text / Monospaced Code Editors:** For raw code editing (JSON, SQL, Python, JavaScript) with syntax highlighting, line numbers, and diff views, use `code-block-ui-system`.
- **Short Structured Inputs:** For single-line text (names, titles, emails, passwords), use standard HTML form inputs or `form-design-system`.
- **Numeric & Stepper Inputs:** For pure quantity or numeric entry, use `numeric-input-and-stepper-system`.
- **Option & Multi-Tag Selection:** For tagging or multi-select dropdowns, use `multi-select-tag-input-system` or `custom-select-and-combobox-system`.

## Inputs

1. **Composition Scope & Mode:** Full-page document/article canvas (e.g., long-form blog post) vs. compact inline composer (e.g., comment/reply box).
2. **Formatting Tool Set:** The required capabilities (e.g., inline styles like bold/italic/underline/link; block types like H1-H3, quote, code block; media embeds like image, video, table).
3. **Container & Layout Context:** Viewport allocation (full height/page canvas, fixed drawer, or embedded card widget).
4. **Interactive Feature Flags:** Presence of floating selection bubble menus, slash commands (`/`), block drag-and-drop handles, or word/character counter status bars.

## Outputs

1. **Toolbar Architecture & Anatomy:** Grouped layout specifications for primary actions, text block selectors, inline formatters, link/media triggers, and mode toggles.
2. **Content Canvas Typography Scale:** CSS custom properties for headings, line heights, paragraph margins, list indentations, blockquotes, and placeholder states.
3. **Contextual & Floating UI Layering:** Specifications for selection-based bubble menus, slash-command popup menus, and block handle controls.
4. **Status Bar & Counter Specification:** Layout rules for bottom bar meta-information (word/character counts, saving indicator, draft status).
5. **Accessibility & Keyboard Standard:** Complete ARIA, roving `tabindex`, and keyboard navigation specification complying with WCAG 2.2 AA.

---

## Workflow

### 1. Establish the Editor Layout Framework

Select the appropriate structural layout pattern based on the composition scope:

#### Pattern A: Classic Fixed-Toolbar Canvas (Standard CMS / Blog Editor)
```text
+--------------------------------------------------------------------------+
| [B][I][U] | [H1][H2][Quote] | [List][Link] | [Image][Table] | [Undo][Redo] | <- Sticky Formatting Toolbar
+--------------------------------------------------------------------------+
|                                                                          |
|  Document Title (H1)                                                     |
|                                                                          |
|  Start writing your article...                                           | <- Content Canvas
|                                                                          |
|  - Bullet item 1                                                         |
|  - Bullet item 2                                                         |
|                                                                          |
+--------------------------------------------------------------------------+
| 342 words | 2,150 characters                         [Draft Saved 10:42] | <- Status / Counter Bar
+--------------------------------------------------------------------------+
```

#### Pattern B: Modern Block-Based Canvas with Floating Bubble Menu & Slash Commands
```text
+--------------------------------------------------------------------------+
|                                                                          |
|  Document Title (H1)                                                     |
|                                                                          |
|  [::] Highlighted text in canvas  +---------------------+                 |
|                                   | [B] [I] [Link] [H2] |                | <- Floating Bubble Menu
|                                   +---------------------+                |
|                                                                          |
|  [::] /head|                                                             |
|       +------------------------------------+                             |
|       | Heading 1     Large section header |                             | <- Slash Command Menu
|       | Heading 2     Medium section header|                             |
|       | Bullet List   Create a simple list |                             |
|       +------------------------------------+                             |
|                                                                          |
+--------------------------------------------------------------------------+
| 120 words                                                    [Auto-saved] |
+--------------------------------------------------------------------------+
```

#### Pattern C: Compact Inline Composer (Comment / Discussion Box)
```text
+--------------------------------------------------------------------------+
| Write a reply...                                                         | <- Collapsed / Expanded Field
|                                                                          |
+--------------------------------------------------------------------------+
| [B][I][Code][Link]                                   [Cancel]  [ Submit ]| <- Bottom Action Toolbar
+--------------------------------------------------------------------------+
```

### 2. Layout the Formatting Toolbar

Group toolbar items into distinct, logical visual clusters separated by vertical dividers (`role="separator"`):

1. **Text Style Group:** Bold, Italic, Underline, Strikethrough, Inline Code.
2. **Block Format Selector:** Paragraph / Heading dropdown or toggle group (`<select>` or custom combobox for H1, H2, H3, Quote).
3. **List & Alignment Group:** Bulleted list, Numbered list, Indent, Outdent, Text align (Left, Center, Right).
4. **Insert / Media Group:** Link insertion, Image upload, Media embed, Table insertion, Horizontal rule.
5. **History & Utility Group:** Undo, Redo, Clear formatting, Fullscreen toggle.

**Toolbar Design Tokens:**
- Minimum touch/click target: **36px x 36px** (desktop), **44px x 44px** (mobile).
- Icon sizing: **18px - 20px** centered within the button.
- Active state: Distinct background tint (e.g., primary-100 or neutral-200) + high contrast icon color shift + `aria-pressed="true"`.
- Sticky behavior: On long document canvases, apply `position: sticky; top: 0; z-index: 10;` to keep the toolbar accessible during scrolling.

### 3. Style the Content Canvas Typography

The editor content area (`[contenteditable="true"]` or framework wrapper) must mirror the public display output:

```css
.editor-canvas {
  min-height: 320px;
  padding: 24px 32px;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 1.125rem; /* 18px body text for optimal readability */
  line-height: 1.65;
  color: var(--color-text-main, #1e293b);
  background-color: var(--color-bg-surface, #ffffff);
  outline: none;
}

/* Placeholder Styling */
.editor-canvas:empty::before {
  content: attr(data-placeholder);
  color: var(--color-text-placeholder, #94a3b8);
  pointer-events: none;
  display: block;
}

/* Internal Block Rhythm */
.editor-canvas h1 { font-size: 2.25rem; line-height: 1.25; margin: 1.5em 0 0.5em; }
.editor-canvas h2 { font-size: 1.75rem; line-height: 1.3;  margin: 1.4em 0 0.5em; }
.editor-canvas h3 { font-size: 1.35rem; line-height: 1.35; margin: 1.2em 0 0.4em; }
.editor-canvas p  { margin: 0 0 1.25em 0; }
.editor-canvas blockquote {
  border-left: 4px solid var(--color-primary, #2563eb);
  padding-left: 16px;
  margin: 1.5em 0;
  font-style: italic;
  color: var(--color-text-muted, #475569);
}
```

### 4. Implement Floating Selection Menus & Slash Command Overlays

- **Bubble Menu Positioning:**
  - Appear upon text selection inside the canvas.
  - Position horizontally centered above the selection range using viewport collision detection.
  - Require a subtle shadow (`box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)`) and border (`1px solid var(--color-border)`).
- **Slash Menu (`/` trigger):**
  - Triggers when user types `/` at the beginning of an empty line.
  - Render as a dropdown list with live keyboard search filtering (ArrowUp/ArrowDown, Enter to select, Escape to close).
  - Each option includes an icon, primary title, and secondary description.

### 5. Design the Status & Counter Bar

Place meta information in a footer bar docked below the canvas:

- **Left Alignment:** Word count, character count, estimated reading time.
- **Right Alignment:** Draft save state (`"Saving..."`, `"Draft saved at 14:02"`, or `"Unsaved changes"`), format mode toggle (e.g., Markdown vs Visual).
- **Limit Warnings:** When a character limit exists (e.g., comment composer 500 max chars):
  - Normal state (> 20% remaining): Neutral text (`var(--color-text-muted)`).
  - Warning state (< 10% remaining): Amber text (`var(--color-warning)`).
  - Exceeded state (0 remaining): Red text (`var(--color-danger)`) + disable submit action.

---

## Decision Rules

### Toolbar Positioning Rule
- **Long-form Document Canvas (> 500 words):** Use a Sticky Top Toolbar (`position: sticky; top: 0;`) or Block Handles + Slash Commands.
- **Short Inline Composers (< 200 words):** Use a Bottom Formatting Toolbar placed adjacent to the submit button.
- **Mobile Viewports (< 640px):** Always anchor formatting tools to a Fixed Bottom Action Bar above the software keyboard.

### Selection Menu vs Sticky Toolbar Rule
- **High-frequency formatting (CMS editors):** Retain the primary fixed/sticky top toolbar to ensure discoverability for non-technical users.
- **Distraction-free / Minimalist editors:** Rely on Floating Selection Bubble Menus + Slash Commands to keep the editing canvas clean.

---

## Constraints

### Accessibility (WCAG 2.2 AA)

- **Toolbar Keyboard Navigation (Roving `tabindex`):**
  - The main toolbar container must carry `role="toolbar"` and `aria-label="Formatting options"`.
  - Pressing `Tab` from outside the editor enters the active toolbar button or moves directly into the editable canvas.
  - `Left Arrow` / `Right Arrow` moves focus between buttons inside the toolbar.
  - `Home` moves focus to the first toolbar button; `End` moves to the last toolbar button.
  - Active toggle states (e.g., Bold activated) MUST set `aria-pressed="true"`.
- **Content editable Canvas Role:**
  - The content editable canvas must carry `role="textbox"`, `aria-multiline="true"`, `aria-label="Document content"`, and a visible focus indicator (e.g., `2px solid var(--color-focus-ring)`) when active.
- **Standard Formatting Shortcuts:**
  - `Ctrl+B` / `Cmd+B`: Bold toggle.
  - `Ctrl+I` / `Cmd+I`: Italic toggle.
  - `Ctrl+U` / `Cmd+U`: Underline toggle.
  - `Ctrl+K` / `Cmd+K`: Open insert link modal/popover.
  - `Ctrl+Z` / `Cmd+Z`: Undo.
  - `Ctrl+Shift+Z` / `Cmd+Y`: Redo.

### Responsiveness & Touch Target Sizing

- On mobile viewports, wrap or horizontally scroll overflow toolbar items with smooth touch scrolling (`-webkit-overflow-scrolling: touch`).
- Hide secondary formatting tools (e.g., strikethrough, quote, indent) behind a `"More formatting"` (`...`) overflow menu button on screens under **480px**.

---

## Common Failure Patterns

- **Trapping Focus in Canvas:** Allowing `Tab` inside the canvas to generate indents without providing a keyboard shortcut (`Escape` then `Tab`) to navigate out of the editor.
- **Toolbar Clipping:** Floating selection menus or slash command popovers hiding behind sticky headers or clipping outside viewport boundaries.
- **Content Layout Shift on Sticky Toolbar:** Toggling toolbar sticky state causing page jump due to missing wrapper height reservation.
- **Missing Focus Rings:** Removing outline/focus indicators on `[contenteditable="true"]`, leaving keyboard users unaware of focus state.
- **Invisible Active States:** Using faint color changes for active formatting toggles (e.g., light gray vs lighter gray) that fail WCAG contrast ratios (< 3:1).

---

## Validation Criteria

- [ ] **Visual Hierarchy & Layout:** Toolbar, canvas, and status/counter bar are visually distinct with consistent padding and borders.
- [ ] **Sticky Toolbar Resilience:** Long document scrolling keeps the main toolbar fixed at top without obscuring canvas text.
- [ ] **Canvas Typography:** Headings, blockquotes, code blocks, and list items display distinct, high-legibility typographic scales.
- [ ] **Floating Overlay Collision Handling:** Bubble menus and slash-command popovers remain fully visible within viewport boundaries.
- [ ] **WCAG AA ARIA & Keyboard Navigation:** Toolbar implements `role="toolbar"`, arrow key navigation, `aria-pressed` states, and standard shortcuts (`Cmd+B`, `Cmd+I`, `Cmd+K`).
- [ ] **Status Bar Functionality:** Live word/character counts update without layout jumps, and limit warnings trigger clear visual feedback.
- [ ] **Mobile Touch Adaptation:** Touch targets meet 44px minimum and formatting controls dock cleanly on narrow viewports.
