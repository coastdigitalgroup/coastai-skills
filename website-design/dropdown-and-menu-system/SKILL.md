---
name: dropdown-and-menu-system
description:
  Design and implement floating action menus, overflow menus, contextual menus, profile dropdowns, and cascading submenus across web interfaces, managing item anatomy, spatial positioning, keyboard navigation, and responsive touch adaptation.
---

# Dropdown and Menu System

## Purpose

The Dropdown and Menu System provides a standardized, accessible design framework for floating action menus, overflow menus (kebab/meatball triggers), user profile menus, contextual menus, and multi-level submenus. Web applications frequently require compact, floating surfaces to house contextual actions, account controls, and row-level operations without cluttering the primary interface layout.

Designing an effective dropdown menu system requires establishing precise item anatomy (icons, labels, shortcut hints, badges, section headers, dividers, danger states), viewport spatial positioning (auto-placement, flip-on-overflow, clipping prevention), WAI-ARIA roles (`role="menu"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`), roving focus keyboard navigation (`ArrowUp`/`ArrowDown`, `Home`/`End`, character typeahead), and responsive touch adaptation (transforming complex dropdowns into bottom action sheets on mobile viewports).

## Use Cases

- **Data Table Row Action Menus:** Providing row-level operations (Edit, Duplicate, Share, Export, Delete) behind a 3-dot kebab/meatball overflow button in admin tables or inbox listings.
- **User Profile & Account Dropdowns:** Grouping account switching, workspace selection, preference settings, status badges, and logout actions under a persistent top-navigation user avatar.
- **Header & Workspace Overflow Menus:** Consolidating secondary view controls, filter presets, and export utilities into a single "More Actions" (`...`) dropdown when toolbar width is constrained.
- **Contextual Right-Click Menus:** Triggering desktop-style contextual menus on canvas objects, file trees, or data rows via right-click or long-press interactions.
- **Cascading Submenu Hierarchies:** Organizing nested action hierarchies (e.g., "Move to > Workspace A / Workspace B") with hover/focus intent delays and keyboard expansion.

## When NOT to Use

- **Form Input Value Selection:** For selecting form input values or filtering options where values are submitted in forms, use `custom-select-and-combobox-system` (`role="combobox"` / `role="listbox"`).
- **Primary Top-Level Navigation:** For main website section navigation links, use `site-navigation-system` or `mega-menu-navigation-system`.
- **Complex In-Context Workflows or Forms:** For multi-step tasks, multi-field forms, or heavy settings editing, use `overlay-and-dialog-system` (Modal) or `bottom-sheet-design-system` (Drawer).
- **Passive Tooltips & Hints:** For informative non-interactive hover hints, use `tooltip-and-hint-system`.

## Inputs

1. **Trigger Context & Entity:** The element initiating the menu (e.g., Kebab button, Avatar, Secondary CTA button, Canvas right-click event).
2. **Action Item Inventory & Taxonomy:** Categorized list of menu items:
   - *Direct Command Actions* (Edit, Share, Export)
   - *Destructive / Danger Actions* (Delete, Revoke)
   - *Stateful Toggles* (Show Grid, Enable Notifications)
   - *Radio Choice Groups* (View mode: Grid vs. List)
   - *Submenu Containers* (Move to...)
3. **Spatial Anchor & Constraint Bounds:** Desired placement anchor (`bottom-start`, `bottom-end`, `top-start`, `right-start`) and viewport boundary container.
4. **Mobile Touch Strategy:** Target screen breakpoint (e.g., `<768px`) for transitioning floating dropdown menus into mobile bottom action sheets.

## Outputs

1. **Dropdown Menu Anatomy Spec:** Blueprint defining Menu Container, Section Headers, Item Tokens (Icon, Label, Shortcut, Badge, Chevron), Dividers, and Danger States.
2. **WAI-ARIA & Keyboard Traversal Matrix:** Complete markup specification using `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-haspopup`, and roving focus keyboard event mappings.
3. **Spatial Positioning & Collision Blueprint:** CSS/JS spatial alignment rules covering anchor placement, offset margin, collision flipping (top/bottom/left/right), and `z-index` layering.
4. **Responsive Mobile Bottom Sheet Transformation Spec:** Media query adaptation converting floating desktop menus into thumb-accessible mobile bottom action sheets with safe-area insets.

---

## Workflow

### 1. Categorize Menu Type and Select Functional ARIA Role
Select the proper ARIA pattern based on whether the dropdown performs actions vs. selects form data:
- **Action Menu / Command Dropdown (`role="menu"`):** Contains action triggers (`role="menuitem"`), toggles (`role="menuitemcheckbox"`), or radio choices (`role="menuitemradio"`).
- **User Account Menu (`role="menu"`):** Combines action links (`role="menuitem"`), user identity headers, status badges, and logout commands.
- **Context / Overflow Menu (`role="menu"`):** Activated via kebab button or right-click context event. Contains quick actions relevant to the selected target.

### 2. Standardize Visual Anatomy and Item Hierarchy
Construct menu items using standard optical density tiers and alignment rules:
- **Container Surfaces:** Surface background (`var(--surface-overlay)`), 8px border-radius, subtle border stroke (`1px solid var(--border-subtle)`), and deep elevation shadow (`box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35)`).
- **Item Grid Layout:** Horizontal flex/grid row (`min-height: 36px` desktop, `44px` touch) with 5 structural slots:
  1. *Lead Icon / Checkbox Slot:* 16x16px or 20x20px icon aligned left.
  2. *Primary Action Label:* High-contrast text (`var(--text-primary)`), truncated with ellipsis if long.
  3. *Badge / Meta Tag:* Optional status chip (e.g., "New", "Pro", count badge).
  4. *Keyboard Shortcut Hint:* Muted monospace text (`⌘E`, `Ctrl+Del`) aligned right.
  5. *Submenu Chevron:* Chevron right icon indicating a nested submenu.
- **Section Headers & Dividers:** Visual grouping using uppercase 11px muted section headers (`var(--text-tertiary)`) and horizontal rules (`<div role="separator">`).
- **Destructive Actions:** Position destructive commands (Delete, Revoke) at the bottom of the menu group, separated by a divider, with distinct danger tokens (`color: var(--text-danger)`).

### 3. Implement Spatial Positioning and Boundary Collision Handling
Ensure floating dropdown menus remain fully visible regardless of trigger placement near viewport edges:
- **Anchor Alignment:** Align menu edge to trigger edge (`bottom-start` for left navigation, `bottom-end` for right-aligned table columns).
- **Offset Spacing:** Maintain a 4px–8px vertical gap between trigger button and menu popover.
- **Collision Flipping (Auto-Flip):**
  - If vertical space below trigger is less than menu height, flip placement to `top-start` or `top-end`.
  - If horizontal space is restricted, shift horizontal alignment inward or switch from right-start submenu to left-start.
- **Clipping Prevention:** Render dropdown overlays using CSS Anchor Positioning or a portal at `document.body` level (`position: fixed` or `position: absolute`) to prevent truncation by `overflow: hidden` parent containers (such as data table rows).

### 4. Configure WAI-ARIA and Roving Focus Keyboard Mechanics
Implement standard desktop desktop menu keyboard controls per WAI-ARIA Authoring Practices:
- **Trigger Markup:** `<button aria-haspopup="menu" aria-expanded="false" aria-controls="menu-id">`
- **Menu Container Markup:** `<div id="menu-id" role="menu" aria-label="Row Actions">`
- **Keyboard Navigation Flow:**
  - `Enter` / `Space` / `ArrowDown` on trigger opens menu and focuses first enabled `role="menuitem"`.
  - `ArrowUp` on trigger opens menu and focuses the *last* enabled `role="menuitem"`.
  - `ArrowDown` / `ArrowUp` inside menu moves focus sequentially between enabled menu items (wrapping around from last to first).
  - `Home` / `End` jumps focus directly to first / last menu item.
  - Printable character keys trigger **typeahead search**, focusing the next menu item starting with that character.
  - `Escape` closes menu immediately and restores focus to the trigger button.
  - `Tab` closes menu and allows focus to move naturally to the next focusable page element.

### 5. Manage Cascading Submenu Interaction Delays
Submenus require precise timing heuristics to prevent accidental closure when moving the pointer across item boundaries:
- **Submenu Trigger:** Item configured with `aria-haspopup="menu"`, `aria-expanded="false"`, and chevron icon.
- **Intent Delay (Hover Tunnel):** Apply a `150ms–300ms` hover intent delay before opening/closing a submenu on mouseover, preventing premature closing when the user moves diagonally toward the submenu popover.
- **Submenu Keyboard Control:**
  - `ArrowRight` or `Enter` on a submenu item opens the nested submenu and shifts focus to its first item.
  - `ArrowLeft` or `Escape` inside a nested submenu closes the submenu and returns focus to its parent trigger item.

### 6. Design Responsive Mobile Touch Adaptation
Floating menus with tiny 32px targets and hover interactions degrade severely on mobile touch viewports (<768px):
- **Desktop (≥768px):** Floating dropdown popover anchored to trigger button.
- **Mobile (<768px):** Automatically convert dropdown menus into a bottom action sheet sliding up from the screen base with full-width touch rows (`min-height: 48px`), drag handle, dim backdrop, and iOS safe-area bottom padding (`padding-bottom: env(safe-area-inset-bottom)`).

---

## Decision Rules

### Menu Pattern & ARIA Selection Matrix

| Pattern Type | ARIA Container Role | Item Role | Key Interactions | Ideal Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Action Dropdown** | `role="menu"` | `role="menuitem"` | ArrowUp/Down roving focus, Enter/Space execute | Data table row actions, quick commands |
| **Toggle Menu** | `role="menu"` | `role="menuitemcheckbox"` | ArrowUp/Down roving focus, Space toggles checked | View options (Show Grid, Dark Mode) |
| **Radio Group Menu**| `role="menu"` | `role="menuitemradio"` | ArrowUp/Down roving focus, Space selects radio | Sort order, view density switch |
| **Profile Menu** | `role="menu"` | `role="menuitem"` + Header | ArrowUp/Down roving focus, Tab exits | Nav avatar account & workspace switcher |
| **Form Select** | `role="listbox"` *(Not menu)* | `role="option"` | Typeahead, Enter selects value | Form field country/state selector |

### Spatial Placement & Flip Logic

- **Use `bottom-end` (Right-aligned):** For triggers positioned on the right side of screens, such as table column action buttons or header profile avatars.
- **Use `bottom-start` (Left-aligned):** For triggers positioned on the left side, such as navigation sidebars or table primary column triggers.
- **Flip to `top-start` / `top-end`:** Automatically whenever `viewport_bottom - trigger_bottom < menu_height`.

---

## Constraints

- **Accessibility (WCAG 2.2 AA Minimum):**
  - **SC 2.1.1 Keyboard Nav:** All menu items navigable via Arrow keys, `Home`, `End`, and `Escape`.
  - **SC 2.4.7 Focus Visible:** Focus indicator on active menu item must be sharp and distinct (`outline: 2px solid var(--focus-ring)`).
  - **SC 2.5.8 Target Size:** Minimum 24x24px target footprint on desktop, 44x44px minimum touch target on mobile viewports.
  - **SC 4.1.2 Name, Role, Value:** Menu container must have an accessible label (`aria-label` or `aria-labelledby`).
- **Parent Clipping Avoidance:**
  - Floating menus must never be rendered inside containers with `overflow: hidden` or `overflow: auto` without absolute/fixed top-layer positioning or CSS anchor positioning.
- **Focus Restoration:**
  - Closing a menu via `Escape`, item selection, or backdrop click MUST restore focus to the trigger button that opened it.

---

## Common Failure Patterns

- **Select / Listbox Misuse:** Using `role="menu"` for form value selectors (like selecting a billing state), breaking screen reader form submission patterns.
- **The Tab-Key Trap:** Requiring users to press `Tab` 10 times to traverse a menu instead of implementing `ArrowUp`/`ArrowDown` roving focus.
- **Container Overflow Clipping:** Rendering a table row dropdown inside a `div` with `overflow: hidden`, causing the menu to be truncated at the row boundary.
- **Missing Focus Restoration:** Closing a menu and dropping keyboard focus onto `document.body`, forcing keyboard users to re-tab through the entire page.
- **Unreachable Diagonal Submenus:** Closing a cascading submenu immediately when the mouse pointer leaves the parent item, making it impossible to move diagonally into the submenu.

---

## Validation Criteria

- [ ] Menu trigger uses `aria-haspopup="menu"` and dynamically updates `aria-expanded="true|false"`.
- [ ] Dropdown container uses `role="menu"` with `aria-label` or `aria-labelledby`.
- [ ] Internal items use `role="menuitem"`, `role="menuitemcheckbox"`, or `role="menuitemradio"`.
- [ ] Keyboard navigation supports `ArrowUp`/`ArrowDown` roving focus, `Home`/`End`, character typeahead, and `Escape` to close.
- [ ] Closing the menu restores focus directly to the trigger button.
- [ ] Menu popover handles boundary collision with auto-flip logic (`bottom` to `top` when near viewport floor).
- [ ] Dropdown is not clipped by parent containers with `overflow: hidden`.
- [ ] Mobile viewports (<768px) cleanly adapt dropdown into a bottom action sheet with safe-area padding.
