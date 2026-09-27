---
name: rich-text-editor-ui-system
description:
  Systematic methodology for designing, structuring, and layout-engineering
  WYSIWYG content creation interfaces, document canvases, and inline composers
  with sticky toolbars, floating selection menus, block handles, status bars,
  and WCAG AA keyboard accessibility.
---

# Rich Text Editor UI System

## Purpose

The Rich Text Editor UI System provides a standardized design and layout framework for structuring WYSIWYG (What You See Is What You Get) content authoring interfaces. Whether building full-screen document editors (like Notion or Google Docs), headless CMS canvas interfaces (like Contentful or Sanity), or inline multi-line comment composers (like GitHub or Jira), rich text editors suffer from recurring UX hazards: toolbar clutter, layout shifts during scrolling, ambiguous focus states, poor screen reader feedback, and clipped floating menus. This skill establishes clear spatial hierarchy, sticky/floating toolbar layout rules, block-level drag/hover handle systems, word count/autosave status bars, and accessible ARIA keyboard navigation patterns.

## Use Cases

- **CMS & Publishing Workflows:** Long-form article and blog authoring canvases requiring headings, inline formatting, image embeds, code blocks, and block reordering.
- **SaaS Knowledge Bases & Documentation:** Block-based document editors needing slash commands (`/`), inline block-type selectors, floating text-selection format bars, and nested callout boxes.
- **Collaborative Comment & Feedback Composers:** Inline multi-line text areas with rich formatting, `@mention` user autocompletion, file attachments, and markdown preview toggles.
- **E-commerce Product Description Managers:** Admin forms for formatting product copy, bulleted feature lists, technical specifications tables, and embedded video media.

## When NOT to Use

- **Single-Line or Unformatted Text Inputs:** For standard text fields, search bars, or simple short inputs without formatting, use `form-design-system`.
- **Pure Code or Syntax Authoring:** For code snippet viewers or IDE-like code input without rich text markup, use `code-block-ui-system`.
- **Comment Discussion Feeds:** For laying out existing threads and reply trees rather than authoring content, use `comment-and-discussion-system`.
- **Structured Dynamic Forms:** For filling out structured field data (e.g. multi-step surveys, address forms), use `form-design-system` or `multi-step-form-implementation`.

## Inputs

1. **Editor Scope & Density:** Determining whether the context is a full-bleed document editor (spacious, page-like canvas) or an inline composer (compact, fixed max-height).
2. **Formatting Tool Taxonomy:** Categorized list of required operations:
   - *Text Inline:* Bold, Italic, Strikethrough, Code, Link, Highlight color.
   - *Block Structures:* Headings (H1–H4), Bullet List, Ordered List, Task List, Blockquote, Code Block, Callout, Horizontal Rule.
   - *Media & Embeds:* Images, Video, File Attachments, Tables.
3. **Control Tier Strategy:** Decision on persistent sticky top toolbars vs. floating contextual selection toolbars vs. slash-command menu popovers.
4. **Editor State Tokens:** Visual indicators for Autosaved, Saving, Unsaved Changes, Word/Character Counts, and Selection Ranges.
5. **Brand Design Tokens:** Typography scale (body font, reading line-height, heading sizes), primary control colors, active formatting state colors, and elevation tokens.

## Outputs

1. **Editor Layout Hierarchy Blueprint:** A structured spatial architecture defining top toolbar, content canvas container, block handle gutters, and bottom status bar.
2. **Control Menu Specs:** Layout blueprints and z-index positioning rules for persistent toolbars, floating selection bars (`::selection`), and slash-command drop-downs.
3. **Block Handle Spatial System:** Margins, hover hit zones, and touch target specs for side-gutter block handles (`+` add block, `⋮⋮` drag reorder).
4. **Accessible ARIA & Focus Specification:** ARIA role mappings (`role="application"` or `role="textbox"` with `contenteditable="true"`), toolbar `role="toolbar"`, focus visible rings, and keyboard shortcut guides.

---

## Workflow

### 1. Establish the Main Layout Architecture
Structure the editor into four distinct visual zones:
- **Zone 1: Persistent Header / Main Toolbar:** Sticky top bar (`position: sticky; top: 0; z-index: 10`) containing primary actions (Undo/Redo, Formatting Groups, Block Dropdowns, View Toggles).
- **Zone 2: Document Canvas & Writing Zone:** Center-aligned, maximum-readable-width container (`max-width: 68ch` or `720px–840px`). Uses responsive horizontal padding (`padding: var(--space-m) var(--space-l)`).
- **Zone 3: Side Gutter & Block Controls:** Left-side absolute or relative gutter (`width: 48px`, offset `-48px` on desktop) for block add (`+`) and drag handles (`⋮⋮`).
- **Zone 4: Bottom Status Bar:** Sticky or fixed bottom footer containing word/character counter, autosave state badge, and focus mode toggles.

### 2. Configure Toolbar Layout & Formatting Controls
Organize toolbar buttons into logical button groups using visual dividers (`border-right` or vertical rule):
- **Group A (History):** Undo (`Ctrl+Z`), Redo (`Ctrl+Y`).
- **Group B (Block Style):** Paragraph / Heading Dropdown (`H1`, `H2`, `H3`, `Body`).
- **Group C (Inline Text):** Bold, Italic, Underline, Strikethrough, Inline Code, Text Color.
- **Group D (Lists & Alignment):** Bullet List, Numbered List, Task List, Alignment (Left, Center, Right).
- **Group E (Inserts):** Link, Image, Table, Callout Box, Divider.
- **Button Sizing:** Use minimum touch/click targets (`36x36px` desktop, `44x44px` mobile) with clear active toggle states (`aria-pressed="true"`).

### 3. Implement Contextual Selection & Slash Command Popovers
Provide inline assistance without forcing user eyes to jump to the top bar:
- **Floating Selection Toolbar:** Appears centered above highlighted text selection using absolute positioning or CSS Anchor Positioning. Contains quick inline controls: Bold, Italic, Link, Highlight, Comment.
- **Slash Command Menu (`/`):** Triggered when typing `/` at the start of a blank block line. Presents an accessible combobox list sorted by frequency (Heading, Bullet List, Image, Callout).
- **Z-Index Hierarchy:** Floating selection menu (`z-index: 50`), slash dropdowns (`z-index: 60`), modal media upload dialogs (`z-index: 100`).

### 4. Design Block-Level Controls & Handles
For modern block-based editors (Notion-style):
- **Hover Hit Zone:** Hovering anywhere over a paragraph or heading reveals the left gutter handles without shifting text position.
- **Add Block Button (`+`):** Opens the slash command dropdown for inserting a new block below.
- **Drag Handle (`⋮⋮`):** Affords vertical drag-and-drop reordering. Clicking opens block-level options (Turn into, Duplicate, Delete, Copy link to block).

### 5. Keyboard Navigation & ARIA Accessibility Architecture
Rich text editors require clear keyboard semantics to comply with WCAG 2.1 / 2.2 AA:
- **Contenteditable Canvas:** Set `contenteditable="true"` on the writing canvas, with `role="textbox"`, `aria-multiline="true"`, and `aria-label` or `aria-labelledby`.
- **Toolbar Navigation:** The toolbar MUST have `role="toolbar"` and `aria-label="Formatting options"`. Implement arrow key navigation (`Left`/`Right` arrow keys move focus between toolbar buttons; `Tab` exits the toolbar into the editor canvas).
- **Focus Rings:** Ensure focus is never lost. Custom focus rings (`outline: 2px solid var(--focus-ring-color); outline-offset: 2px`) must outline the active content block or canvas clearly.
- **Live Status Feedback:** Use `aria-live="polite"` on the status bar for autosave status updates ("Saving...", "All changes saved") and word count updates.

---

## Decision Rules

### Choice of Editor Interface Pattern

| Editor Scope | Primary Control Surface | Layout Recommendation | Best Suited For |
| :--- | :--- | :--- | :--- |
| **Full Document Canvas** | Persistent Sticky Header + Floating Selection Bar | `max-width: 768px` centered canvas, sticky top bar, word count footer | Long articles, documentation, blog posts |
| **Block Canvas Editor** | Slash Commands (`/`) + Left Gutter Block Handles | Full-width or constrained page with absolute left handles, clean borderless writing surface | Knowledge bases, wiki pages, modular content design |
| **Inline Composer** | Compact Bottom Toolbar + Tabbed Preview | Fixed or auto-expanding height (`min-height: 120px; max-height: 400px`), inline toolbar underneath or on focus | Comments, chat, support ticket replies |

### Toolbar Button Active State Styling
- **Inactive Control:** Neutral background, subtle icon color (`--color-text-muted`), transparent border.
- **Active / Toggled Format:** Darker neutral fill or subtle primary tint (`--color-primary-subtle`), high-contrast icon (`--color-primary`), `aria-pressed="true"`.
- **Hover / Focus:** Border outline or elevated shadow, with visible keyboard focus ring (`:focus-visible`).

---

## Constraints

- **Contrast Requirements (WCAG 2.1 SC 1.4.3 / 1.4.11):** All toolbar icons, text labels, dropdown items, and block handles must achieve a minimum contrast ratio of `4.5:1` for text and `3:1` for UI icons/borders against background colors.
- **Keyboard Traps (WCAG 2.1 SC 2.1.2):** Users must be able to navigate into and out of the editor canvas, toolbars, modal dialogs, and code blocks using standard `Tab`, `Shift+Tab`, and `Escape` key commands without getting stuck.
- **Mobile Touch Targets (WCAG 2.2 SC 2.5.8):** On mobile viewports, toolbar buttons must meet a minimum hit target of `44x44px` or have a minimum `24x24px` target with `8px` spacing. Sticky toolbars on mobile should pin to the bottom viewport edge above the virtual keyboard.
- **Text Reflow & Zoom (WCAG 2.1 SC 1.4.4 / 1.4.10):** The document canvas must support 200% text zoom without horizontal scrolling or truncation of formatting toolbar icons. Responsive toolbars must overflow gracefully into a "More formatting" (`...`) dropdown.

---

## Common Failure Patterns

- **Clipping Selection Menus:** Floating selection toolbars getting clipped by parent containers with `overflow: hidden`. Fix: Render floating menus via absolute positioning with bounds checking or CSS anchor positioning with top-layer fallback.
- **Focus Disruption:** Clicking a toolbar button causes the editor canvas to lose cursor selection position. Fix: Use `onMouseDown={(e) => e.preventDefault()}` on formatting buttons to preserve text selection in the canvas.
- **Inaccessible Icon Buttons:** Formatting buttons with only visual icons and no `aria-label` or tooltips. Fix: Every icon-only button must have `aria-label="Bold (Ctrl+B)"` and an accessible tooltip.
- **Unbounded Height Stacking:** Inline comment composers expanding endlessly down the page when long text is pasted. Fix: Use `max-height: 360px; overflow-y: auto` for inline composers with visual scroll indicators.
- **No Keyboard Shortcuts Visualized:** Omitting shortcut hints in tooltips or slash commands. Fix: Display shortcut tokens (e.g., `⌘B` or `Ctrl+B`) inside tooltips and dropdown items.

---

## Validation Criteria

- [ ] **Structural Clarity:** The editor clearly separates toolbar, document canvas, block gutter, and status indicators.
- [ ] **Accessible Toolbar Semantics:** The main toolbar uses `role="toolbar"`, and buttons toggle `aria-pressed="true"`/`false` accurately reflecting active text styles.
- [ ] **Keyboard Navigation Pass:** Users can navigate toolbar options using Arrow keys and move between canvas and controls using `Tab`/`Shift+Tab`.
- [ ] **Selection Preserved:** Interacting with formatting buttons does not clear or reset user text selection in the document canvas.
- [ ] **Mobile Responsiveness:** Formatting toolbars wrap or collapse into overflow menus (`...`) without breaking layout or horizontal scroll.
- [ ] **Status Visibility:** Autosave status and word/character count updates are communicated clearly to screen readers via `aria-live` regions.
