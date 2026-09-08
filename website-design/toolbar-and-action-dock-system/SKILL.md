---
name: toolbar-and-action-dock-system
description:
  Design application toolbars, rich text editor controls, canvas tool rails, and floating bulk action docks with logical control grouping, optical density, roving tabindex keyboard accessibility, and responsive overflow strategies.
---

# Toolbar and Action Dock System

## Purpose

The Toolbar and Action Dock System provides a standardized, accessible design framework for structuring application toolbars, formatting action bars, floating bulk selection docks, and canvas control rails. Modern web applications require dense, high-frequency control interfaces—ranging from rich text and markdown editors to data table row actions and design canvas tools.

Designing an effective toolbar system requires balancing visual hierarchy, spatial density, icon-to-label clarity, control grouping with dividers, keyboard focus management (`role="toolbar"` with roving `tabindex`), active toggle state feedback (`aria-pressed`, `aria-checked`), and responsive overflow behavior across desktop and touch screens. This skill establishes UI layout patterns and accessibility rules for application control bars.

## Use Cases

- **Rich Text & Content Editors:** Formatting toolbars for WYSIWYG, Markdown, or CMS block editors (Text Style, Bold/Italic/Code, Lists, Alignment, Links/Media inserts).
- **Data Table Bulk Action Docks:** Floating selection action bars anchored at the bottom or top of data tables when items are selected (e.g., "12 items selected" → Delete, Export, Tag, Change Status, Cancel).
- **Creative Canvas & Media Tools:** Fixed or floating tool rails for vector graphics, image annotation, or diagramming tools (Select, Hand, Shape, Brush, Zoom, History undo/redo).
- **PDF & Document Viewers:** Header or floating control docks containing page navigation, zoom controls, rotation, print, download, and annotation tools.
- **Code & Query Workspaces:** Header action toolbars for IDEs or SQL consoles (Run Query, Format Code, Copy, Environment Selector, View Settings).

## When NOT to Use

- **Primary Application Destination Navigation:** For persistent top-level site navigation (e.g., Home, Features, Pricing, Settings), use `site-navigation-system`, `mega-menu-navigation-system`, or `sidebar-navigation-system`.
- **Primary Mobile Tab Bars:** For fixed mobile bottom navigation anchored across main screens, use `bottom-navigation-system`.
- **Standalone Action Buttons:** For single primary or secondary call-to-action buttons inside cards or forms, use `button-and-action-system`.
- **Filter and Sort Controls:** For search, faceted filtering, and sorting dropdowns above list views, use `filter-and-sort-system`.

## Inputs

1. **Control Inventory & Semantics:** Categorized list of actions, toggles, select inputs, and menus (e.g., Single-action buttons, Toggle switches, Single-select radio button groups, Dropdown menus).
2. **Context & Container Anchor:** Attachment model (Fixed top header bar, Sticky top editor bar, Floating bottom selection dock, Floating canvas tool rail).
3. **Density & Dimension Requirements:** Workspace density mode (Compact 32px, Standard 40px, Touch/Coarse 48px height).
4. **Design System Tokens:** Color palettes, elevation/shadow tokens, border radiuses, iconography, and focus ring styling (from `accessible-color-system`, `elevation-and-depth-system`, and `iconography-system`).
5. **Responsive & Overflow Strategy:** Rules for how controls wrap, hide into an overflow menu ("..."), or collapse into icons on smaller viewports.

## Outputs

1. **Toolbar Architecture & Layout Spec:** Grid/Flexbox layout blueprint defining control item grouping, vertical dividers, spatial padding, elevation shadows, and z-index stacking context.
2. **Interactive Control State Matrix:** Visual and ARIA attribute mapping for Default, Hover, Focus-Visible, Active/Pressed (`aria-pressed="true"`), Selected (`aria-checked="true"`), and Disabled states.
3. **ARIA Keyboard Accessibility Blueprint:** Specification for `role="toolbar"`, `aria-orientation`, and roving `tabindex` keyboard navigation (Arrow keys, Home, End).
4. **Responsive Overflow Strategy:** Media query rules and collapse logic for managing dense control rows on narrow viewports.

---

## Workflow

### 1. Categorize Controls and Group into Logical Clusters
Group actions by function to minimize cognitive load and allow users to chunk related tools visually:
- **Primary Actions:** High-frequency tools or operations (e.g., Bold, Italic, Underline).
- **Property Selectors:** Dropdown pickers or segmented popovers (e.g., Font Family, Paragraph Format / Heading level).
- **Insert / Media Controls:** Actions that inject external objects (e.g., Insert Link, Image, Table, Code Block).
- **Utility / History Actions:** Non-destructive workspace operations (e.g., Undo, Redo, Clear Formatting, Fullscreen).
- **Separation Pattern:** Insert vertical dividers (`<div role="separator" aria-orientation="vertical">`) between logical clusters.

### 2. Define Density Tokens and Spatial Sizing
Select an optical density scale aligned with the application's workspace:

| Density Tier | Container Height | Target Size | Icon Size | Gap / Spacing | Best For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Compact** | 32px - 36px | 28px × 28px | 16px × 16px | 2px - 4px | Code editors, CAD/Canvas tools, dense desktop dashboards. |
| **Standard** | 40px - 44px | 36px × 36px | 20px × 20px | 4px - 6px | Rich text editors, document viewers, admin table action bars. |
| **Coarse / Touch** | 48px - 56px | 44px × 44px | 24px × 24px | 8px - 12px | Mobile web apps, tablet touch interfaces, field inspection toolbars. |

### 3. Establish Elevation, Surfaces, and Positioning
Determine the container anchor type:
- **Sticky Header Toolbar:** Positioned above an editable content area (`position: sticky; top: 0; z-index: 20;`). Features a subtle bottom border (`1px solid var(--border-subtle)`) and background blur or solid surface (`var(--bg-surface)`).
- **Floating Bulk Action Dock:** Positioned horizontally centered at the bottom of the viewport (`position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 100;`). Features rounded pill geometry (`border-radius: 9999px`), strong shadow (`var(--shadow-lg)`), and vibrant surface or dark backdrop.
- **Canvas Tool Rail:** Positioned vertically on the left or right edge (`position: absolute; top: 16px; left: 16px; z-index: 30; flex-direction: column;`).

### 4. Implement ARIA Semantics and Keyboard Navigation
Ensure screen readers and keyboard users can navigate dense button bars efficiently without pushing Tab dozens of times:
- **Toolbar Container:** Assign `role="toolbar"` and `aria-label="Formatting options"` (or `aria-label="Bulk actions"`). Set `aria-orientation="horizontal"` (or `"vertical"`).
- **Roving `tabindex` Strategy:**
  - Only **one** control in the toolbar has `tabindex="0"` (the currently active or first item).
  - All other controls have `tabindex="-1"`.
  - Pressing `Tab` enters or exits the toolbar as a single tab stop.
  - Pressing `Left Arrow` / `Right Arrow` (or `Up`/`Down` for vertical toolbars) moves focus between items inside the toolbar, dynamically updating `tabindex="0"`.
  - Pressing `Home` jumps focus to the first control; `End` jumps to the last control.
- **Toggle Button States:**
  - Independent toggle buttons (e.g., Bold): Use `<button aria-pressed="true|false">`.
  - Grouped single-select toggles (e.g., Text Alignment Left/Center/Right): Use `<div role="group" aria-label="Text alignment">` containing `<button aria-checked="true|false" role="radio">` or a custom segmented control.

### 5. Build Responsive Overflow Strategies
When the toolbar width exceeds the screen width:
- **Priority Ranking:** Assign high, medium, and low priority to controls.
- **Primary Grouping (Always Visible):** Essential actions (e.g., Bold, Italic, Link, Undo).
- **Secondary Grouping (Collapsible):** Secondary tools collapse into a "More actions" dropdown menu (`<button aria-haspopup="menu" aria-expanded="false" aria-label="More formatting options">...</button>`).
- **Responsive Flex Wrapping:** Alternatively, allow non-fixed toolbars to wrap smoothly (`flex-wrap: wrap; gap: 4px;`) on tablet screens, keeping control clusters intact.

---

## Decision Rules

### Toolbar Layout Pattern Selection

| Pattern | Anchor & Structure | Primary Mechanism | Best Use Case |
| :--- | :--- | :--- | :--- |
| **Sticky Editor Bar** | Fixed at top of scrollable text box. | Horizontal flex row with vertical separators. | WYSIWYG / Markdown editors, CMS posts. |
| **Floating Action Dock** | Floating at bottom center (`fixed`). | Pill container with count badge + bulk action buttons. | Data table row selections, batch file managers. |
| **Canvas Control Rail** | Vertical dock pinned left/right (`absolute`). | Vertical stack with tool selection + popup tool options. | Figma-like design canvas, map controls. |
| **Inline Selection Menu** | Contextual popover anchored to text selection. | Micro toolbar positioned above text caret. | Notion-style highlight menus, inline commenting. |

### Control Type Selection

- **Single Action (Push Button):** Use `<button type="button">` for instant execution (e.g., Undo, Redo, Delete, Export).
- **Stateful Toggle:** Use `<button type="button" aria-pressed="true|false">` for independent state toggles (e.g., Bold, Italic, Code block).
- **Mutual Exclusion Group:** Use `role="radiogroup"` or `role="group"` with `aria-checked="true|false"` for single-choice sets (e.g., Left, Center, Right align).
- **Value Picker Dropdown:** Use custom combobox or menu button for multi-option selection (e.g., Heading 1, Heading 2, Paragraph).

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 2.1.1 Keyboard Accessibility:** Entire toolbar must be navigable via keyboard arrows using roving `tabindex`.
  - **SC 2.4.7 Focus Visible:** Focused controls must display an unclipped focus indicator with at least 3:1 contrast against the toolbar background.
  - **SC 2.5.8 Target Size (Minimum):** Control touch target must measure at least **24×24px** (with surrounding spacing total 48×48px) or **44×44px** on touch devices.
  - **SC 1.4.3 Visual Contrast:** Icon strokes and text labels must maintain a 4.5:1 contrast ratio against default and active state backgrounds.
- **Tooltip Requirements:** Icon-only toolbar buttons MUST have an associated accessible label (`aria-label` or visible text) AND visible hover/focus tooltips (`tooltip-and-hint-system`) describing the action and keyboard shortcut (e.g., "Bold (Ctrl+B)").
- **Touch Safety:** On coarse pointer devices (`@media (pointer: coarse)`), touch targets must scale to at least 44×44px with touch spacing.

---

## Common Failure Patterns

- **The Tab-Stop Nightmare:** Setting `tabindex="0"` on all 30 toolbar buttons, requiring screen reader and keyboard users to press Tab 30 times just to bypass the editor header.
- **Unlabeled Icon Buttons:** Using ambiguous SVG icons without `aria-label` or visible tooltips, leaving vision-impaired and novice users guessing what buttons do.
- **Missing Pressed Feedback:** Changing only the text/icon color subtly on active toggles without updating `aria-pressed="true"`, breaking screen reader state awareness.
- **Truncated Floating Docks:** Allowing floating bulk action docks to get cut off off-screen on mobile devices due to missing `max-width` and viewport padding.
- **Focus Loss on Action:** Moving focus into the editor content or losing focus entirely when a toolbar button is clicked, breaking keyboard navigation flow.

---

## Validation Criteria

- [ ] Container includes `role="toolbar"` and an explicit `aria-label`.
- [ ] Roving `tabindex` is implemented so only one item has `tabindex="0"` at a time and Arrow keys cycle focus.
- [ ] Toggle controls correctly report state using `aria-pressed="true|false"` or `aria-checked="true|false"`.
- [ ] Logical clusters are separated by `<div role="separator" aria-orientation="vertical">`.
- [ ] Every icon-only button has a descriptive `aria-label` and visual tooltip.
- [ ] Touch targets on coarse pointers scale to at least 44x44px.
- [ ] Floating action docks maintain viewport safe margins and clear z-index stacking.
