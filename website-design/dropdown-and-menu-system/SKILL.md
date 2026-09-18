---
name: dropdown-and-menu-system
description:
  Design floating action menus, overflow menus, contextual menus, and cascading submenus with strict keyboard navigation, WAI-ARIA menu roles, adaptive mobile touch targets, and collision-aware positioning.
---

# Dropdown and Menu System

## Purpose

The Dropdown and Menu System provides a standardized framework for designing, structuring, and specifying floating action menus, overflow menus (`...`), contextual right-click menus, and cascading submenus across web applications.

While custom select inputs (`custom-select-and-combobox-system`) are form controls used to choose data values, **menus** execute commands, trigger actions, navigate users to distinct views, or reveal contextual sub-tools. Designing robust dropdown menus requires establishing clean item anatomy, spatial collision awareness (flip/shift positioning), non-ambiguous visual hierarchy for destructive vs. default actions, touch-friendly mobile adaptations, and strict WCAG 2.2 AA keyboard navigation (WAI-ARIA `role="menu"`, `role="menuitem"`).

---

## Use Cases

- **Row Action Menus:** Table row or card list overflow actions (`More options` icon button) offering commands like "Edit", "Duplicate", "Export", and "Delete".
- **User Account & Profile Dropdowns:** Header navigation menus presenting profile management, workspace switching, dark mode toggles, and "Log Out" actions.
- **Contextual Right-Click / Canvas Menus:** Desktop web applications (design tools, file managers) requiring context-sensitive right-click popup menus.
- **Split Button Actions:** Primary action buttons paired with a dropdown toggle for secondary variants (e.g., "Save & Publish" with secondary options "Save as Draft", "Schedule").
- **Cascading Nested Submenus:** Complex application toolbars or file browser menus requiring multi-level flyout submenus.

---

## When NOT to Use

- **Selecting Form Values:** If the user is choosing an option to fill or update a form field (e.g., selecting a state, picking a category), use `custom-select-and-combobox-system`.
- **Primary Site Navigation:** For top-level page site navigation with multi-column categorizations, use `mega-menu-navigation-system` or `site-navigation-system`.
- **Primary Application Tabs:** For switching between parallel views within the same page content box, use `tab-ui-system`.
- **Mobile Mobile-First Bottom Actions:** On small mobile screens, deep cascading floating menus should adapt to `bottom-sheet-design-system` rather than floating multi-level overlays.

---

## Inputs

1. **Menu Type & Hierarchy:** Overflow action list, profile dropdown, split button dropdown, or cascading contextual menu.
2. **Action Inventory:** List of menu items, icons, keyboard shortcut accelerators (e.g., `⌘E`), item grouping separators, and state indicators (disabled, active, destructive).
3. **Trigger Container:** Button element type (icon button, text + chevron button, split button, or right-click pointer event target).
4. **Spatial Context:** Screen location of the trigger (top-right header, table cell fold, bottom sticky bar, boundary margins).
5. **Brand Design Tokens:** Surface elevation shadow (`elevation-and-depth-system`), spacing scale (`fluid-spacing-system`), focus rings (`focus-indicator-design-system`), and color contrast tokens.

---

## Outputs

1. **Menu Anatomy Specification:** Dimensional layout detailing padding, min/max widths, leading icons, trailing shortcut badges, item heights, and group divider spacing.
2. **Interactive State Matrix:** Defined visual styles for Default, Hover, Focused/Highlighted, Active, Disabled, and Destructive item states across Light and Dark themes.
3. **Collision & Placement Strategy:** Collision fallback rules (auto-flip top/bottom, auto-shift left/right) and Z-index layering spec.
4. **Mobile Responsive Blueprint:** Touch target scaling specifications and viewport transformation rules (e.g., converting flyouts to bottom action sheets).
5. **WAI-ARIA & Keyboard Architecture:** Spec for `role="menu"`, `role="menuitem"`, `aria-haspopup="true"`, `aria-expanded`, focus-looping, and arrow-key trapping.

---

## Workflow

### 1. Structure Item Anatomy and Grouping
Design every menu item using a consistent horizontal grid layout:
- **Leading Visual (16–20px):** Optional icon aligned left. Enhances scanning speed when used consistently across all items in a group.
- **Action Label:** Clear, verb-first text ("Edit item", "Download PDF", "Delete workspace"). Left-aligned, minimum 4.5:1 color contrast.
- **Trailing Accelerator / Indicator:** Right-aligned keyboard shortcut text (e.g., `⌘N`) or sub-menu expansion indicator (`▸`).
- **Group Dividers:** 1px horizontal rule (`var(--border-subtle)`) with 4px to 8px vertical margin separating distinct functional groups (e.g., navigation vs. destructive actions).

```text
+------------------------------------------+
|  [Icon] Edit Item                 ⌘E     |  <-- Default Item
|  [Icon] Duplicate                 ⌘D     |  <-- Default Item
|  --------------------------------------  |  <-- Group Divider
|  [Icon] Delete Workspace          ⌦      |  <-- Destructive Item (Red)
+------------------------------------------+
```

### 2. Establish Spatial Positioning and Collision Awareness
Floating menus must dynamically adjust alignment based on viewport space:
- **Default Anchor:** Position the top edge of the dropdown panel `4px` or `8px` below the trigger button, aligned to the trigger's leading edge (left) or trailing edge (right, for right-aligned UI elements).
- **Collision Detection (Flip/Shift):**
  - **Vertical Flip:** If space below the trigger is less than menu height, flip the menu to open above the trigger.
  - **Horizontal Shift:** If the menu overflows the right edge of the viewport, snap the menu's right edge to the trigger's right edge.
- **Scroll Container Containment:** Use `overscroll-behavior: contain;` and set a `max-height` (typically `320px` or `~6.5 items`) with standard custom scrollbar styling if the item list exceeds available height.

### 3. Define Visual States and Destructive Warnings
Ensure actions communicate intent clearly to prevent user error:
- **Default / Normal Items:** Neutral high-contrast text (`var(--text-primary)`) on neutral surface background.
- **Hover / Keyboard Active State:** Highlight active row with neutral background fill shift (e.g., `var(--surface-hover)`), preserving 4.5:1 text contrast.
- **Destructive Items ("Delete", "Remove"):**
  - Text and leading icon rendered in high-contrast danger red (`var(--text-danger)`, min 4.5:1 contrast).
  - Hover / Focus state uses subtle red background tint (`var(--surface-danger-subtle)`) with high-contrast dark red text.
  - Position destructive items at the absolute bottom of the menu, separated by a distinct divider line.
- **Disabled Items:** Opacity reduced to 40%–50%, `cursor: not-allowed`, excluded from keyboard highlighting or arrow navigation.

### 4. Implement Mobile Responsive Adaptation
Desktop flyout menus fail on touchscreens if hit targets are too small:
- **Touch Target Scaling:** Enforce minimum hit target height of **44px** (preferably 48px) on mobile viewports.
- **Pattern Shift (Bottom Action Sheet):** On screens `<640px`, transform multi-item or cascading dropdowns into a mobile `bottom-sheet-design-system` action sheet with an overlay backdrop and explicit "Cancel" button.

### 5. Enforce WAI-ARIA and Keyboard Accessibility
Dropdown action menus require strict WAI-ARIA menu semantics distinct from comboboxes:
- **Trigger Button:** Must use `aria-haspopup="menu"` (or `"true"`), `aria-expanded="true/false"`, and `aria-controls="menu-id"`.
- **Menu Container:** Must use `role="menu"` or `role="menubar"` (for application toolbars) with an `aria-labelledby` referencing the trigger ID.
- **Menu Items:** Must use `role="menuitem"`, `role="menuitemcheckbox"`, or `role="menuitemradio"`.
- **Submenus:** Submenu items have `aria-haspopup="menu"` and `aria-expanded="true/false"`.
- **Focus Management:**
  - Opening the menu moves DOM focus to the first active menu item (or currently selected item).
  - Pressing `ArrowDown` / `ArrowUp` cycles focus strictly within menu items.
  - Pressing `Escape` closes the menu and immediately returns focus back to the Trigger button.
  - Pressing `Tab` closes the menu and advances focus to the next focusable page element.

---

## Decision Rules

### Menu Type Selection Matrix

| Requirement | Recommended Menu Pattern | Trigger Type | ARIA Pattern |
| :--- | :--- | :--- | :--- |
| Row level secondary actions | **Overflow Action Menu** | Icon button (`...` or `⋮`) | `role="menu"` + `role="menuitem"` |
| Primary action + secondary choices | **Split Button Dropdown** | Dual button (Main action + Chevron) | `role="menu"` for chevron flyout |
| User profile & account controls | **Profile Header Menu** | Avatar / User Button | `role="menu"` + group dividers |
| Deep multi-level desktop tools | **Cascading Submenu** | Toolbar item with flyout arrow | `role="menu"` with nested `role="menu"` |
| Selection of a single form choice | **DO NOT USE MENU** | Form trigger | Use `custom-select-and-combobox-system` |

---

## Constraints

- **WCAG 2.2 AA Contrast:** Item text and shortcut labels must maintain a minimum contrast ratio of `4.5:1` against default and hovered item backgrounds.
- **Touch Target Size (WCAG 2.2 SC 2.5.8):** All interactive menu items must meet at least `24x24px` physical target size on desktop and `44x44px` on mobile.
- **Viewport Clipping (Z-Index):** Menu containers must be positioned in a top-level stacking context or body portal (or use CSS `position: fixed` / Popover API) to prevent clipping inside parent cards with `overflow: hidden`.
- **No Reliance on Hover Alone:** Submenus must open via click, tap, or `ArrowRight` / `Space` / `Enter` keyboard events. Hover-only opening leads to accidental closure and mouse-path traps.

---

## Common Failure Patterns

- **Confusing Menus with Select Inputs:** Using `role="menu"` for a dropdown that edits a form value instead of using `role="listbox"`.
- **Mouse Path Nesting Traps:** Cascading submenus that instantly close if the user's mouse cursor drifts a few pixels outside the item boundary while moving toward the flyout menu.
- **Z-Index Boundary Clipping:** Overflow menus inside table cells being cut off by the table container's scrollbar (`overflow: auto`).
- **Focus Disappearance on Escape:** Closing the menu with `Escape` key without returning focus to the trigger button, leaving keyboard users lost at the top of the document.
- **Invisible Focus Indicators:** Overriding native outline styles without providing a high-contrast visual focus highlight on active menu items.

---

## Validation Criteria

- [ ] Menu trigger includes `aria-haspopup="menu"`, `aria-expanded="true/false"`, and `aria-controls`.
- [ ] Dropdown container uses `role="menu"` and items use `role="menuitem"`.
- [ ] Opening menu moves focus to first active `role="menuitem"`.
- [ ] `ArrowDown` and `ArrowUp` cycle focus strictly among menu items; `Escape` closes menu and restores focus to trigger button.
- [ ] Destructive actions use distinct high-contrast red text/icons and sit below a group divider line.
- [ ] Mobile viewports (<640px) enforce min 44px hit targets or adapt to a bottom action sheet.
- [ ] Menu positioning handles viewport edge collisions gracefully (flips vertically, shifts horizontally).
- [ ] `overscroll-behavior: contain` is applied to scrollable menu panels to prevent background page scroll-chaining.
