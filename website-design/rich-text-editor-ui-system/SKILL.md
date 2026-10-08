---
name: rich-text-editor-ui-system
description:
  Design and implement a systematic framework for WYSIWYG content creation interfaces,
  document canvases, inline composers, sticky and floating action toolbars,
  block handles, and WCAG AA accessibility.
---

# Rich Text Editor UI System

## Purpose

The Rich Text Editor UI System provides a systematic methodology for designing, structuring, and layout-engineering WYSIWYG content creation interfaces, long-form document canvases, and inline comment composers. In modern web applications, content creation ranges from complex multi-block CMS editors to lightweight discussion reply boxes. Without a structured design framework, rich text interfaces suffer from toolbar clutter, lost selection states, jumpy layouts, poor mobile touch targets, and severe keyboard navigation barriers.

This skill ensures that rich text editing components are spatially ergonomic, visually structured to prevent cognitive fatigue, responsive across all screen viewports, and fully compliant with WCAG 2.2 AA accessibility specifications.

## Use Cases

- Designing long-form WYSIWYG article and document editors for Content Management Systems (CMS), knowledge bases, and publishing platforms.
- Creating compact inline comment, chat, or ticket response composers with rich formatting, mention menus, and attachment docks.
- Structuring block-based content creation tools (Notion-style or Gutenberg-style document canvases with hover drag handles and slash command popovers).
- Building lightweight rich text fields in SaaS application settings, email builders, or LMS course material authoring tools.

## When NOT to Use

- **Plain Text or Monospaced Code Editing:** For raw code editing, syntax highlighting, line numbers, or diff views, use `code-block-ui-system`.
- **Global Command Menus:** For `Cmd+K` global action palettes or route search overlays, use `command-palette-system`.
- **Form Selectors or Comboboxes:** For tag token inputs or auto-complete select fields without formatted content creation, use `custom-select-and-combobox-system`.
- **Simple Single-Line Inputs:** For standard text search or single-line form inputs, use `form-design-system`.

## Inputs

1. **Editor Content Schema:** The supported inline elements (bold, italic, strikethrough, code inline, link, text color) and block types (headings H1-H4, blockquotes, code blocks, bullet/numbered lists, callouts, divider, media embeds).
2. **Editor Context & Form Factor:** Long-form canvas (full document editor) vs. compact inline composer (chat box or discussion thread reply).
3. **Toolbar Configuration Strategy:** Fixed top toolbar, sticky scrolling toolbar, floating text selection toolbar, or block hover control bar.
4. **Spacing & Typography Tokens:** Modular font scales, line-height tokens, and spacing variables from `fluid-typography-system` and `fluid-spacing-system`.
5. **Brand Design Tokens:** Surface colors, border states, focus ring tokens, and dark theme variables from `dark-theme-design-system`.

## Outputs

1. **Editor Canvas Layout Specification:** Dimensional rules for line-length limits (60–75 characters per line), reading envelopes, padding, and vertical rhythm.
2. **Toolbar Architecture & Button Grouping Specs:** Visual hierarchy for text formatting, list controls, block transformation, and action utilities with explicit ARIA toolbar specs.
3. **Contextual Menu Overlay Blueprints:** Spatial and positioning rules for floating text-selection menus, block hover handles, and slash command menus (`/`).
4. **Status Bar & Metadata Specifications:** Specs for word/character counters, saving/saved indicators, markdown shortcut hints, and active block type badges.
5. **Accessibility & Keyboard Navigation Specification:** Comprehensive ARIA APG 1.2 `role="textbox"` and `role="toolbar"` attributes, keyboard traversal rules, and live region status announcements.

---

## Workflow

### 1. Establish the Editor Container & Canvas Envelope

Define the spatial boundaries based on the editing context:

- **Long-Form Document Canvas:**
  - Max reading width: Limit content canvas width to **680px – 768px** (60–75 characters per line) to maintain reading ergonomics. Center the canvas within the main viewport container.
  - Padding: Apply fluid inline padding (`var(--space-m)` to `var(--space-xl)`) so content does not touch container edges on mobile devices.
  - Min-Height: Set a minimum canvas height (e.g., `min-height: 400px`) to prevent visual layout shifts as content expands.
- **Compact Inline Composer:**
  - Dynamic Auto-Expand: Set initial min-height (e.g., `80px` or `3 lines of text`) with a max-height (e.g., `280px`) and `overflow-y: auto` to expand naturally without pushing surrounding thread elements off-screen.
  - Attached Action Dock: Anchor the toolbar directly inside or adjacent to the input card (e.g., bottom-aligned with send/save action on the right).

### 2. Design the Primary Toolbar Architecture

Group toolbar tools logically to minimize visual noise and enable rapid scanning:

- **Group 1: Text Style / Block Type Selector:** Dropdown or segmented control showing active block state ("Normal Text", "Heading 1", "Quote").
- **Group 2: Inline Formatting:** Toggle buttons for Bold (`⌘B`), Italic (`⌘I`), Underline (`⌘U`), Strikethrough, Code (`⌘E`), and Text Color.
- **Group 3: Lists & Structure:** Toggle buttons for Bullet List, Numbered List, Task List, and Indent / Outdent.
- **Group 4: Embeds & Links:** Link inserter (`⌘K`), Image upload button, Code block inserter, Table inserter.
- **Group 5: Utilities / Actions:** Clear formatting, Undo / Redo, Fullscreen toggle, Help / Markdown guide.

Use vertical separators (`1px` muted border) between button groups. Every button must feature a high-contrast icon, an explicit `aria-label`, and a tooltipped keyboard shortcut hint.

```
+-----------------------------------------------------------------------------------+
| [H1 v] | [B] [I] [U] [S] [Code] | [List •] [List 1.] [Task] | [Link] [Image] | [↺] [↻] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  Document Title (H1)                                                              |
|                                                                                   |
|  Start typing or press '/' for commands...                                        |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| Words: 342  |  Chars: 2,105  |  Draft Saved  |                      [Publish Button] |
+-----------------------------------------------------------------------------------+
```

### 3. Implement Sticky & Floating Contextual Toolbars

Complement the main toolbar with context-sensitive controls:

- **Sticky Top Toolbar (Document Canvas):** On long scrolling documents, stick the toolbar to the top viewport edge (`position: sticky; top: 0; z-index: 10;`) with a light backdrop blur (`backdrop-filter: blur(8px)`) and a subtle bottom border or elevation shadow.
- **Floating Selection Menu (Bubble Menu):** When a user highlights text within the canvas, display a compact floating formatting bar directly above the selection (positioned with CSS anchor positioning or JavaScript positioning). Include core inline formatting: Bold, Italic, Strikethrough, Link, Highlight, and Comment.
- **Block Hover Control Handle (Gutter Handle):** On block-based editors, display a subtle `+` (add block) and `⋮⋮` (drag / reorder / context menu) handle in the left margin gutter on block hover or focus.

### 4. Structure the Slash Command Menu (`/`)

Provide power-user shortcuts for block creation without leaving the keyboard:

- **Trigger:** Typing `/` at the beginning of an empty paragraph block triggers a floating popover directly beneath the cursor.
- **Layout & Anatomy:** Max height `280px` with vertical overflow scrolling. Group items into clear categories ("Basic blocks", "Media", "Embeds", "Advanced").
- **Command Item Structure:** Each item features a left-aligned icon, a bold title ("Heading 1", "Bullet List", "Callout Box"), and a muted description ("Big section heading").
- **Keyboard Traversal:** `Up` and `Down` arrow keys navigate command options; `Enter` or `Tab` selects the block type; `Escape` closes the menu.

### 5. Design the Footer Status Bar

Anchor a metadata and utility bar at the base of the editor:

- **Left Zone:** Word count, Character count, Reading time estimate.
- **Center Zone:** Document saving state ("Saving...", "Saved to cloud at 10:42 AM", "Offline draft").
- **Right Zone:** Secondary utility triggers (Markdown reference modal trigger, clear canvas, focus mode toggle).

---

## Decision Rules

- **Fixed Top Toolbar vs. Floating Bubble Menu Rule:**
  - Use a **Fixed Top / Sticky Toolbar** when users frequently change block types, insert media, or manage complex layouts (CMS, publishing tools).
  - Use a **Floating Selection Toolbar + Slash Menu** when the editor prioritizes distraction-free writing (medium-style blogs, note-taking apps).
- **Sticky Position Rule:** Always make top toolbars sticky on full-page document editors so users never lose access to formatting tools while scrolling deep articles.
- **Toolbar Responsive Collapse Rule:** On viewports under `640px`, collapse secondary formatting tools (code inline, strikethrough, clear formatting, indent) into a single "More formatting (...) " dropdown button, ensuring primary tools (Bold, Italic, Link, List) remain immediately accessible in a single horizontal row without wrapping onto multiple rows.
- **Inline Comment Composer Rule:** For chat and discussion comment boxes, keep the toolbar collapsed or simplified by default (Bold, Italic, Link, Mention `@`, Attach) to minimize interface bulk until the field receives focus.

---

## Constraints

### 1. Accessibility (WCAG 2.2 AA Minimum)

- **ARIA 1.2 Editor Container Markup:**
  - The content editable canvas must have `role="textbox"`, `aria-multiline="true"`, `aria-label` or `aria-labelledby` referencing the editor label/heading, and `aria-autocomplete="list"` (if slash menu is active).
  - Placeholder text must be rendered via CSS pseudo-elements (`:empty::before`) or `aria-placeholder` rather than inline text nodes to avoid screen readers reading placeholders as editable content.
- **ARIA Toolbar Pattern (`role="toolbar"`):**
  - The formatting bar container must have `role="toolbar"` and `aria-label="Formatting options"`.
  - Formatting toggle buttons must use `aria-pressed="true|false"` to explicitly communicate active formatting states (e.g., whether text at cursor is currently Bold).
  - Dropdown buttons (e.g., block type picker) must use `aria-haspopup="true"` and `aria-expanded="true|false"`.
- **Keyboard Focus & Traversal:**
  - **Tab Key Rule:** Pressing `Tab` while focused inside the document canvas must insert a tab space / indent list item or move focus out of the editor to the next focusable form field. It must NEVER get trapped in the toolbar.
  - **Toolbar Traversal:** Pressing `Alt+F10` or `Escape` while in the canvas moves focus directly to the first button in the toolbar. Once in the toolbar, users navigate between buttons using `Left` and `Right` arrow keys (or `Tab` if standard toolbar controls apply).
  - **Formatting Hotkeys:** Support standard OS keyboard shortcuts (`⌘B` / `Ctrl+B` for bold, `⌘I` / `Ctrl+I` for italic, `⌘K` / `Ctrl+K` for link dialog).
- **Status & Saving Announcements:**
  - Use an invisible `div` with `aria-live="polite"` and `aria-atomic="true"` to announce status changes (e.g., "Draft saved successfully", "Heading 2 applied").

### 2. Responsiveness & Touch Viewport Adaptations

- **Touch Target Sizing:** Every toolbar button and slash menu item must maintain a minimum touch target area of **44×44px** on touch devices.
- **Mobile Keyboard Sticky Docking:** On mobile devices, dock the rich text toolbar directly above the native virtual keyboard using CSS visual viewport positioning or sticky bottom alignment, preventing the toolbar from being hidden under the virtual keyboard.
- **Horizontal Overflow Prevention:** Use `flex-wrap: nowrap; overflow-x: auto;` with hidden scrollbars for mobile toolbars, allowing swipe scrolling across tool groups while keeping them on a single row.

---

## Common Failure Patterns

- **The "Tab Key Trap":** Overriding `Tab` key behavior inside the editor without providing a way for keyboard users to navigate past the editor field on the web page.
- **Missing Active State Indicators:** Failing to update button states (`aria-pressed="true"` or active background colors) when the text cursor moves into bold, italic, or link content.
- **Layout Jitter on Auto-Expand:** Causing the surrounding page content to jump jarringly on every keystroke when an inline composer auto-expands height without smooth CSS transitions.
- **Unreachable Mobile Formatting:** Floating selection menus appearing underneath native browser text selection popups or outside the touch viewport bounds on mobile devices.
- **Placeholder Text Node Confusion:** Rendering placeholder text ("Type here...") as real text inside contenteditable, causing screen readers to read placeholder text as user input.

---

## Validation Criteria

- [ ] Document canvas has `role="textbox"`, `aria-multiline="true"`, and accessible label.
- [ ] Toolbar container uses `role="toolbar"` with `aria-label` and toggle buttons using `aria-pressed="true|false"`.
- [ ] Keyboard users can navigate into and out of the editor using standard key navigation without keyboard traps.
- [ ] `Alt+F10` moves focus directly from contenteditable canvas to the formatting toolbar.
- [ ] Inline formatting shortcuts (`⌘B`, `⌘I`, `⌘K`) function as expected.
- [ ] Line-length envelope on long-form document editor is clamped between 60–75 characters (max-width 680–768px).
- [ ] Slash command menu (`/`) responds to `Up`/`Down` arrow keys, `Enter`, and `Escape`.
- [ ] Status bar features an `aria-live="polite"` region for announcing document save status and word counts.
- [ ] Mobile viewports maintain 44px minimum touch targets and prevent multi-row toolbar clutter.
