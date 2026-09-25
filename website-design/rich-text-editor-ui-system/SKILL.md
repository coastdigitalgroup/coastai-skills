---
name: rich-text-editor-ui-system
description: Design, structure, and specify WYSIWYG content creation interfaces, document canvases, and inline composers with sticky toolbars, floating selection menus, block handles, status bars, and WCAG AA accessibility.
---

# Rich Text Editor UI System

## Purpose

The Rich Text Editor UI System provides a systematic methodology for designing, structuring, and layout-engineering WYSIWYG (What You See Is What You Get) content creation interfaces, document canvases, and inline composers. Rich text editing is a core interaction across web applications—powering CMS publishing canvases, collaborative document editors, support ticketing reply boxes, product review fields, and threaded discussion composers.

Designing a rich text editor requires balancing dense formatting controls with clean, distraction-free writing canvases, responsive spatial constraints, floating selection menus, block-level drag handles, status bars, and strict keyboard/screen reader accessibility (WCAG 2.2 AA). Native HTML `<textarea>` elements cannot support inline styles or block media, while unconstrained `contenteditable` elements frequently suffer from layout shifts, ambiguous focus states, illegible line lengths, and inaccessible toolbar popovers. This skill defines explicit structural UI patterns, spatial layout rules, formatting toolbar hierarchies, interaction states, and accessibility standards for modern web text editing interfaces.

## Use Cases

- **Document & CMS Article Canvases:** Full-page or multi-pane document creation (e.g., Notion, Medium, WordPress Gutenberg) with block-level drag handles, slash command menus (`/`), sticky top toolbars, and reading column max-widths (680px–768px).
- **Inline Discussion & Comment Composers:** Compact, collapsible text creation areas in forum threads, code pull requests, Jira tickets, or support dashboards featuring quick formatting bars, media attachments, and action buttons.
- **Email & Marketing Message Builders:** Multi-section composition surfaces with rich text formatting, merge tags, preview modes, and layout templates.
- **Customer Support & CRM Ticket Notes:** High-density internal notes and external response composers with canned responses, internal mention triggers (`@`), and formatting toggles.

## When NOT to Use

- **Plain Single-Line or Multiline Inputs:** For standard text entries, search inputs, or unformatted text fields without bolding/lists, use `form-design-system` or `<textarea>`.
- **Specialized Code Editors:** For syntax-highlighted code editing with line numbers, AST parsing, and autocomplete trees, use `code-block-ui-system` or embed Monaco/CodeMirror.
- **Lightweight Search & Autocomplete:** For quick filter bars or query inputs with popovers, use `search-interface-system` or `custom-select-and-combobox-system`.
- **Structured Data Entry Tables:** For grid-based data entry with formulas and locked columns, use `data-table-ui-system`.

## Inputs

1. **Editor Surface Archetype:** Document Canvas (full workspace, line-bounded max-width) vs. Compact Inline Composer (card/box-constrained, expand-on-focus).
2. **Formatting Scope & Feature Matrix:**
   - Text Formatting: Inline styles (bold, italic, underline, strikethrough, code, link).
   - Structural Formatting: Headings (H1–H3), blockquotes, bullet lists, ordered lists, task checkboxes.
   - Embeds & Media: Images, video embeds, code blocks, tables, horizontal dividers.
   - Productivity Triggers: Slash command menu (`/`), mention autocomplete (`@`), tag triggers (`#`).
3. **Spatial & Responsive Constraints:** Container max-width, viewport breakpoints (mobile vs. tablet vs. desktop), and virtual keyboard height handling on touch devices.
4. **Theme & Palette Tokens:** Light/dark mode surface colors, active button toggle fills, border colors, focus rings, and selection highlight tokens.

## Outputs

1. **Editor Layout Blueprint:** Spatial layout specification defining toolbar placements (Fixed Sticky Top, Floating Contextual Selection, or Bottom Action Dock), canvas padding, reading column width, and status/word count bar.
2. **Formatting Toolbar & Menu Spec:** Grouped control anatomy with explicit button order, icons, toggle states (default, hover, active/pressed, disabled), divider rules, and popover menus.
3. **Interactive Overlay Spec:** Visual and spatial specifications for Floating Text-Selection Formatting Bars, Slash Command Dropdowns (`/`), and Block Drag/Reorder Handles.
4. **Accessibility & Keyboard Mapping:** ARIA roles (`role="textbox"`, `role="toolbar"`, `role="menu"`), keyboard shortcuts (`Cmd/Ctrl+B`, `Cmd/Ctrl+K`), tab index management, and live region announcements for status changes.

---

## Workflow

### 1. Select the Editor Layout Archetype

Choose the structural layout model based on user intent and interface context:

| Archetype | Typical Container | Primary Toolbar Pattern | Secondary Overlays |
| :--- | :--- | :--- | :--- |
| **Document Canvas** | Full-width container with centered 680px–768px reading column | Sticky Top Header Bar | Slash Command Menu (`/`), Floating Selection Bar, Block Handles |
| **Inline Composer** | Card or box container (min-height 120px–200px) | Fixed Bottom Action Bar or Collapsible Top Bar | Dropzone overlay, Mention autocomplete (`@`) |
| **Split Preview Canvas** | Dual-pane 50/50 or 60/40 layout (Editor left, Live Preview right) | Sticky Top Header Bar | Viewport toggle, sync scroll locks |

### 2. Establish Canvas Typography & Reading Spatial Grid

To optimize legibility during extended drafting, structure the editing canvas around optimal line length and vertical rhythm:

- **Optimal Reading Column Width:** Limit content max-width to `680px` (standard) or `768px` (wide canvas with side gutters). Never let body copy stretch across full 1400px viewports (aim for 65–75 characters per line).
- **Typographic Scale & Line Height:**
  - H1: `28px`–`32px` / Line-height `1.25` / Margin-bottom `16px`
  - H2: `22px`–`24px` / Line-height `1.3` / Margin-top `24px` / Margin-bottom `12px`
  - H3: `18px`–`20px` / Line-height `1.35` / Margin-top `20px` / Margin-bottom `8px`
  - Body Copy: `16px` / Line-height `1.6` (25.6px) / Paragraph gap `16px`
- **Canvas Vertical Padding:** `32px` desktop, `20px` mobile, ensuring content never clips against toolbars.

### 3. Design the Toolbar Architecture & Action Docks

Toolbars organize content manipulation controls into distinct visual functional groups separated by 1px vertical dividers:

```text
+-----------------------------------------------------------------------------------------------------------------------------------+
| [H1 v] | [ B ] [ I ] [ U ] [ S ] | [ Link ] [ Code ] | [ UL ] [ OL ] [ Task ] | [ Quote ] [ Image ] | [ AI Assist ] | [ Undo ] [ Redo ] |
+-----------------------------------------------------------------------------------------------------------------------------------+
```

- **Functional Group 1: Text Structure Dropdown** (Normal Text, Heading 1, Heading 2, Heading 3, Code Block).
- **Functional Group 2: Inline Formatting** (Bold, Italic, Underline, Strikethrough).
- **Functional Group 3: Semantic Embeds** (Hyperlink, Inline Code).
- **Functional Group 4: Lists & Tasks** (Unordered List, Ordered List, Checkbox Task List).
- **Functional Group 5: Block Inserts** (Blockquote, Image Upload, Table Insert, Divider).
- **Functional Group 6: System Controls** (Undo, Redo, Clear Formatting, Expand Canvas).

### 4. Design Contextual & Floating Overlays

#### A. Floating Text-Selection Formatting Bar
When a user selects text within the document canvas, display a compact floating popover toolbar directly above the selection:
- **Placement:** Centered horizontally over the selection range, `8px` above the top edge.
- **Controls:** Bold, Italic, Link, Inline Code, Comment, Highlight Color.
- **Animation:** Discrete transform and opacity entry (`fade-in 150ms ease-out`).
- **Dismissal:** Dismiss automatically on cursor click outside or press of `Escape`.

#### B. Slash Command Menu (`/`)
When the user types `/` on an empty line or after a space:
- **Placement:** Anchored directly beneath the active cursor line.
- **Max Height & Scroll:** `280px` max height with vertical auto-scroll for filtered items.
- **Item Anatomy:** Icon (`20x20px`), Command Title (`14px medium`), Subtitle Description (`12px muted`), Shortcut Hint (`11px mono`).
- **Keyboard Navigation:** `Up`/`Down` arrow key loop, `Enter` to insert block, `Escape` to close.

#### C. Block Drag & Reorder Handles
In block-based document canvases, display hover handles in the left gutter (`24px` left of the paragraph text line):
- **Gutter Width:** `32px` left gutter.
- **Icons:** `+` (Add block menu), `⋮⋮` (Six-dot drag handle for reordering and block action menu).
- **Touch Target:** Minimum `32x32px` hover region on desktop, persistent handle on mobile tap.

### 5. Integrate Status Bar & Metadata Indicators

Position a subtle status bar at the bottom edge of the editor container or canvas:
- **Left Side:** Auto-save indicator (`"Saved to cloud 2m ago"` or spinner `"Saving draft..."`), active block path (`"Document > Section 2 > Paragraph"`).
- **Right Side:** Live metrics: Character Count, Word Count, Estimated Read Time (`"420 words | 2 min read"`).

### 6. Specify Interactive States & Theme Tokens

Ensure high contrast and distinct visual cues across all interactive editor surfaces:

- **Editor Focus Border:** `2px solid var(--color-brand-primary)` with `3px` focus ring glow (`rgba(37, 99, 235, 0.2)`).
- **Toolbar Button Default State:** Transparent background, `var(--color-text-secondary)` icon/text color.
- **Toolbar Button Hover State:** `var(--color-surface-hover)` background (`#F1F5F9` light / `#334155` dark).
- **Toolbar Button Active/Pressed State:** `var(--color-brand-subtle)` background (`#EFF6FF` light / `#1E293B` dark), `var(--color-brand-primary)` icon color, `aria-pressed="true"`.
- **Disabled State:** 40% opacity, `cursor: not-allowed`, `aria-disabled="true"`.

---

## Decision Rules

### Toolbar Placement & Selection Matrix

```text
                                [ Is Editor Context Full Page or Inline? ]
                                            /                \
                             Full Page Canvas                 Inline Box
                                   /                             \
                [ Block-Based or Freeform? ]               [ Single or Multi-Line? ]
                     /                \                          /            \
             Block-Based            Freeform               Multi-Line       Single-Line
                 |                      |                      |                 |
          Sticky Top Bar +      Sticky Top Bar +      Fixed Bottom Bar     Inline Formatting
       Floating Selection +     Floating Link Popup    (Action Dock)        Popup on Select
       Slash Command Menu
```

1. **Use Sticky Top Toolbar when:** The editor is the primary focus of the page (blog post editor, document app, email builder), and users frequently switch between headings, alignment, and media insertion.
2. **Use Floating Selection Bar when:** Content is block-based or distraction-free (Medium/Notion style), keeping the canvas clean until text is actively highlighted.
3. **Use Slash Command Menu (`/`) when:** Fast, keyboard-first block creation (headings, callouts, tables, images) is critical to the user workflow.
4. **Use Fixed Bottom Action Bar when:** Space is constrained in an inline comment thread, modal drawer, or support panel, keeping submit actions adjacent to the formatting toggles.

---

## Constraints

### 1. Accessibility (WCAG 2.2 AA Minimum)
- **Role Specs:** The main editable canvas must have `role="textbox"`, `aria-multiline="true"`, `aria-label` or `aria-labelledby`, and `contenteditable="true"`.
- **Toolbar ARIA:** Toolbars must use `role="toolbar"` with `aria-label="Formatting options"`. Buttons must use `aria-pressed="true|false"` for stateful toggles (bold, italic, list).
- **Keyboard Navigation:**
  - `Tab` key must move focus INTO the editor canvas, NOT step through every toolbar button individually.
  - Arrow keys (`Left`/`Right`) navigate between buttons within a toolbar group when toolbar focus is active.
  - Standard shortcuts (`Cmd+B`, `Cmd+I`, `Cmd+U`, `Cmd+K`, `Cmd+Z`) must execute natively without focus loss.
- **Contrast Ratios:** Text formatting icons must achieve at least 4.5:1 contrast against toolbar background. Active toggle background states must achieve at least 3:1 contrast against neutral background.

### 2. Responsiveness & Touch Rules
- **Mobile Touch Targets:** Toolbar icon buttons on screens `<768px` must maintain a minimum touch target of `44x44px` (or `38x38px` with `6px` hit padding).
- **Virtual Keyboard Safe Area:** Bottom-anchored toolbars must adjust position using `env(safe-area-inset-bottom)` and track `visualViewport` resize events to remain pinned directly above the mobile keyboard.
- **Horizontal Overflow:** Mobile toolbars must allow smooth horizontal scrolling (`overflow-x: auto` with touch momentum `-webkit-overflow-scrolling: touch`) without breaking layout or clipping drop-down menus.

---

## Common Failure Patterns

1. **Unconstrained Reading Column Width:**
   - *Problem:* Allowing text to stretch across 1400px wide screens makes reading and editing exhausting due to long line return paths.
   - *Fix:* Enforce `max-width: 680px` or `768px` on the contenteditable canvas container with `margin: 0 auto`.

2. **Cluttered, Wall-of-Buttons Toolbar:**
   - *Problem:* Presenting 30 unorganized icons without visual dividers causes cognitive overload and slow feature discovery.
   - *Fix:* Group icons logically into 4–6 clusters separated by vertical dividers, and collapse advanced features into dropdown menus.

3. **Trapping Focus in Toolbars:**
   - *Problem:* Requiring users to tab through 25 toolbar buttons before reaching the writing canvas or page submit button.
   - *Fix:* Implement composite toolbar keyboard navigation (Roving `tabindex` or single tab stop for toolbar with Arrow key traversal).

4. **Missing Visual Feedback for Formatting Toggles:**
   - *Problem:* Users cannot tell if the cursor is currently inside a bold, italic, or link element because button styles do not update.
   - *Fix:* Dynamically query selection states and apply active fill colors (`--color-brand-subtle`) and `aria-pressed="true"` to active formatting buttons.

5. **Mobile Virtual Keyboard Occlusion:**
   - *Problem:* The mobile soft keyboard pops up and covers the bottom action bar or current typing line.
   - *Fix:* Use CSS `position: sticky` or dynamic `visualViewport` height offset handling to keep the active toolbar anchored above the keyboard.

---

## Validation Criteria

- [ ] **Canvas Layout:** Document canvas enforces a max-width of `680px`–`768px` for reading legibility.
- [ ] **Toolbar Organization:** Toolbar buttons are grouped logically with dividers and clear visual separation.
- [ ] **Active Toggle States:** Formatting buttons visually reflect active selection state (bold, italic, lists) with distinct background fills and `aria-pressed="true"`.
- [ ] **Touch Target Compliance:** Mobile toolbar buttons achieve minimum 44x44px touch areas with horizontal scroll overflow support.
- [ ] **Keyboard Accessibility:** `Tab` key enters/exits canvas cleanly without getting trapped in toolbar buttons; standard formatting shortcuts (`Cmd+B`, `Cmd+I`, `Cmd+K`) function correctly.
- [ ] **Overlay Navigation:** Floating selection popups, slash menus (`/`), and block handles dismiss gracefully on `Escape` or focus loss.
- [ ] **Dark Mode Parity:** All editor surfaces, toolbars, focus rings, hover fills, and status bars maintain WCAG 4.5:1 contrast in dark theme.
