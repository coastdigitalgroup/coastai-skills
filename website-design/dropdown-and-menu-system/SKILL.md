---
name: dropdown-and-menu-system
description:
  Design and structure popover action menus, contextual menus, overflow menus, and submenus,
  managing item anatomy, spatial positioning, keyboard navigation, and responsive touch adaptation.
---

# Dropdown and Menu System

## Purpose

The Dropdown and Menu System skill provides a standardized framework for designing floating action menus, overflow menus, contextual menus, and cascading submenus across web interfaces. Dropdown menus display an organized list of interactive commands, options, or sub-actions attached to a trigger element (such as an icon button, split button, or context action).

Designing an effective dropdown menu system requires balancing spatial layout, visual hierarchy, item grouping, keyboard navigation semantics, collision handling (viewport boundaries), and responsive adaptation on touch-based mobile viewports without disorienting users or violating WCAG 2.1 AA accessibility guidelines.

## Use Cases

- **Action & Option Menus:** Presenting secondary page or row actions (e.g., "Edit", "Duplicate", "Export", "Delete") attached to a trigger button in data tables, cards, or page headers.
- **Overflow & More Menus:** Housing lower-priority tools or navigation links when container space is constrained (e.g., "..." buttons in toolbars or table headers).
- **Contextual Popup Menus:** Displaying targeted contextual commands triggered by right-click or long-press on specific visual canvas or list items.
- **Cascading Submenus:** Organizing nested actions or multi-level category options within a multi-tiered menu overlay.
- **Selection Action Menus (Checkable & Radio Items):** Toggling view states, column visibility, or sorting preferences inside floating action panels.

## When NOT to Use

- **Form Selection Inputs (Comboboxes & Select Inputs):** For form inputs where users pick one or multiple values to populate a field (e.g., selecting a country or product category), use `custom-select-and-combobox-system`.
- **High-Density Navigation Panels:** For multi-column global site navigation containing structured categories, landing pages, and marketing promos, use `mega-menu-navigation-system`.
- **Large Modal & Task Workspaces:** For complex sub-tasks, multi-field edits, or multi-step wizard forms requiring preserved focus, use `overlay-and-dialog-system` or `bottom-sheet-design-system`.
- **Contextual Help & Tooltips:** For non-interactive, hover/focus text descriptions explaining an element's function, use `tooltip-and-hint-system`.

## Inputs

1. **Trigger Component & Geometry:** Primary trigger element type (standard button, icon button, split button, or right-click target area) and spatial positioning.
2. **Menu Item Inventory & Hierarchy:** List of actions, item types (standard, checkable, radio, destructive), icons, keyboard shortcuts, separators, and group section labels.
3. **Surface & Elevation Tokens:** Background surface colors, border styles, drop-shadow tokens (`--elevation-popover`), and z-index positioning (`--z-popover`) from `elevation-and-depth-system` and `accessible-color-system`.
4. **Viewport & Device Context:** Device orientation, screen width breakpoint, and touch support characteristics.

## Outputs

1. **Menu Anatomy & Layout Blueprint:** CSS and HTML structural specification for menu container sizing, padding, item alignment, trailing shortcut hints, and section divider spacing.
2. **Spatial Positioning & Collision Strategy:** Layout rules for anchor positioning (top/bottom/left/right), alignment, dynamic flip/slide logic, and max-height scrollable bounds.
3. **Responsive Mobile Adaptation Model:** Design specification transforming narrow desktop dropdown popovers into bottom action sheets (`bottom-sheet-design-system`) or full-width touch lists on mobile viewports.
4. **ARIA & Keyboard Navigation Specification:** Programmatic accessibility rules covering ARIA roles (`role="menu"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`), expanded states (`aria-expanded`), and arrow key focus management.

---

## Workflow

### 1. Define Menu Structure and Item Anatomy
Classify the items within the menu into logical functional groups to maximize scannability:
- **Header & Section Labels:** Group related actions using uppercase micro-typography or subtle section headers (`font-size: 0.75rem`, `font-weight: 600`, `letter-spacing: 0.05em`).
- **Standard Item Composition:** Align elements horizontally using flexbox (`gap: 0.75rem`):
  - *Leading Graphic:* 16x16px or 20x20px icon clarifying the action purpose.
  - *Label Text:* Concise, action-oriented verb (e.g., "Download PDF", "Duplicate item").
  - *Trailing Shortcut Hint:* Monospaced keyboard shortcut text (e.g., `⌘E`, `Ctrl+D`) muted visually (`color: var(--text-tertiary)`).
  - *Trailing Chevron:* Indicates a cascading submenu trigger (`>`).
- **Specialized Item Types:**
  - *Checkable Items (`role="menuitemcheckbox"`):* Display leading checkmarks when active.
  - *Radio Items (`role="menuitemradio"`):* Display radio dots when selected within a group.
  - *Destructive Items:* Style negative actions (e.g., "Delete", "Remove") with distinct warning color tokens (`color: var(--color-danger)`), separated from benign actions by a visual divider line.
- **Dividers (`role="separator"`):** Use subtle horizontal rules (`1px solid var(--border-subtle)`) to segment distinct action groups (e.g., grouping view actions separately from edit/delete actions).

### 2. Establish Spatial Positioning & Collision Handling
Configure layout rules so the menu renders cleanly adjacent to its trigger without overflowing screen edges:
- **Anchor Alignment:** Position the menu popover relative to the trigger button boundary:
  - *Bottom-Left / Bottom-Right:* Default positioning below the trigger button. Align to the right edge when the trigger sits near the right screen boundary (e.g., data table row action columns).
  - *Top-Left / Top-Right:* Flip direction above the trigger button when near the bottom of the viewport.
- **Viewport Collision & Flip Rules:**
  - Maintain a minimum **12px margin** from screen edges (`viewport-margin: 12px`).
  - Set a maximum height constraint (`max-height: calc(100vh - 32px)`) with internal vertical scroll (`overflow-y: auto`) for long menus.
- **Elevation Tokens:** Apply top-layer stacking (`z-index: var(--z-popover)`) and drop-shadows (`box-shadow: var(--shadow-popover)`) to separate the floating menu visually from background table rows or cards.

### 3. Configure Interaction & Submenu Dynamics
- **Trigger States:** Ensure trigger buttons indicate active open state using `aria-expanded="true"` and a subtle pressed visual state (`background-color: var(--bg-hover)`).
- **Submenu Hover & Keyboard Delay:**
  - Cascading submenus open on mouse hover with a slight intentional delay (**150–200ms intent timer**) to prevent accidental trigger flashes during pointer movement.
  - Pressing `ArrowRight` on a submenu trigger expands the submenu and moves focus inside; `ArrowLeft` closes the submenu and returns focus to the parent menu item.
- **Dismissal Triggers:** Dismiss the open menu overlay when:
  - The user clicks outside the menu panel (click-outside listener).
  - The user presses the `Escape` key.
  - An active menu item action is executed (unless it is a checkable toggle item).
  - Focus leaves the menu overlay.

### 4. Design Responsive Mobile Adaptation
Desktop floating dropdown popovers (e.g., 220px floating boxes) perform poorly on mobile touch screens due to small tap targets and precise positioning needs:
- **Mobile Touch Transformation (`< 768px`):**
  - Transform desktop popovers into a **Bottom Action Sheet** (`bottom-sheet-design-system`) anchored to the bottom viewport.
  - Increase item row height to a minimum tap target of **44px** (preferably 48px) with full-width horizontal tap zones.
  - Provide an explicit visual drag handle or clear "Cancel" button at the bottom of the sheet for effortless thumb dismissal.
- **Touch Feedback:** Apply distinct active touch background states (`:active`) for immediate tactile feedback.

### 5. Program Accessibility & Keyboard Semantics
- **ARIA Landmark & Role Mapping:**
  - Set trigger button: `aria-haspopup="menu"`, `aria-expanded="true|false"`, `aria-controls="menu-id"`.
  - Set menu container: `role="menu"`, `aria-labelledby="trigger-id"`, `tabindex="-1"`.
  - Set menu items: `role="menuitem"`, `role="menuitemcheckbox"`, or `role="menuitemradio"`.
- **Keyboard Navigation Model:**
  - `Enter` / `Space` / `ArrowDown` on trigger: Opens menu and focuses the first menu item.
  - `ArrowDown` / `ArrowUp`: Navigates focus sequentially through menu items (wrapping around from top to bottom).
  - `Home` / `End`: Moves focus directly to the first or last menu item.
  - `Escape`: Closes the menu immediately and returns focus back to the trigger button.
  - `Tab`: Closes the menu immediately and allows standard document focus progression.
  - *Typeahead Character Search:* Pressing a letter key (e.g., "D") moves focus directly to the next menu item starting with that letter.

---

## Decision Rules

### Menu Type & Context Selection

| Context / Goal | Recommended Pattern | ARIA Structure | Mobile Adaptation |
| :--- | :--- | :--- | :--- |
| **Row / Card Actions** | **Action Dropdown** | `role="menu"` / `role="menuitem"` | Bottom Action Sheet |
| **Toolbar Overflow ("...")** | **Overflow Menu** | `role="menu"` / `role="menuitem"` | Bottom Action Sheet |
| **Right-Click Canvas Tools** | **Context Menu** | `role="menu"` / `role="menuitem"` | Long-press Bottom Sheet |
| **Form Options Selection** | **Combobox Select** | `role="combobox"` / `role="option"` | Native Select / Bottom Sheet |
| **Multi-Tier View / Filter Toggles** | **Checkable Action Panel** | `role="menu"` / `role="menuitemcheckbox"` | Bottom Action Sheet |

### Positioning & Alignment Rules
- **Data Table Row Menus:** Position top-right or bottom-right aligned to the trigger button to prevent horizontal truncation beyond the right table viewport edge.
- **Header / Navigation Actions:** Position bottom-right or bottom-left depending on proximity to the screen edge.
- **Submenus:** Open to the right (`left: 100%`) by default; if space on the right is less than 200px, flip to open to the left (`right: 100%`).

---

## Constraints

- **Accessibility (WCAG 2.1 AA):**
  - **SC 1.4.3 Contrast (Minimum):** Item text, icons, and keyboard hints must maintain at least **4.5:1** contrast ratio against the menu background.
  - **SC 2.1.1 Keyboard:** Every item and action inside the menu must be completely accessible and triggerable via keyboard.
  - **SC 2.4.7 Focus Visible:** Focused menu items must feature distinct visual focus states (e.g., background color shift + contrast-compliant highlight indicator).
  - **SC 2.5.8 Target Size:** Desktop menu items must maintain at least **32px** height; mobile action sheet items must satisfy at least **44x44px** touch targets.
- **Viewport Boundary Constraints:** Open menus must never extend off-screen or create horizontal page scrollbars. Use collision flipping and internal vertical scrolling (`max-height`).
- **Spatial Padding & Density:** Maintain consistent internal horizontal padding (e.g., `padding: 0.5rem 0.75rem`) and vertical container padding (`padding: 0.25rem 0`).

---

## Common Failure Patterns

- **Form Combobox Confusion:** Using `role="menu"` for form select dropdowns instead of `role="combobox"` / `role="listbox"`, confusing screen readers about value selection versus command execution.
- **Focus Disorientation on Close:** Failing to restore keyboard focus back to the trigger button when the menu closes via `Escape` or selection, leaving focus lost at `document.body`.
- **Clipping Container Trap:** Placing dropdown menus inside table cells or containers with `overflow: hidden`, causing the open menu to be cropped visually.
- **Tiny Mobile Tap Targets:** Rendering tiny 24px desktop dropdown items on touch screens without converting them into touch-friendly bottom sheets.
- **Accidental Submenu Dismissal:** Lacking an intent timer delay on cascading submenus, causing submenus to collapse when the mouse moves diagonally toward a sub-item.

---

## Validation Criteria

- [ ] Menu container utilizes appropriate ARIA semantics (`role="menu"`, `role="menuitem"`, `role="separator"`).
- [ ] Keyboard navigation fully supports `ArrowDown`, `ArrowUp`, `Home`, `End`, `Escape`, and letter typeahead.
- [ ] Closing the menu (via `Escape` or item click) programmatically restores focus to the trigger element.
- [ ] Viewport collision rules flip or scroll long menus cleanly without screen overflow.
- [ ] Responsive breakpoint (`< 768px`) transforms desktop dropdown popovers into touch-friendly bottom action sheets.
- [ ] Item text, shortcut hints, and focus indicator backgrounds satisfy WCAG AA contrast (≥4.5:1).
