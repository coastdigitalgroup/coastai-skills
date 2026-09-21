# Dropdown Menu Anatomy, Spatial Guidelines & WCAG Accessibility Rules

This reference provides technical rules for spatial geometry, z-index elevation tokens, touch target adaptation, and complete WCAG 2.1 AA keyboard/ARIA semantics for dropdown menu systems.

---

## 1. Spatial Layout & Geometry Rules

### A. Dimensional Measure & Spacing Standards
- **Container Min-Width:** `220px` (ensures readability for action verb + shortcut hint).
- **Container Max-Width:** `280px` (prevents awkward horizontal gaps between text and shortcut).
- **Desktop Item Height:** `32px` to `36px` (`padding: 0 8px; font-size: 0.875rem`).
- **Mobile Touch Item Height:** Minimum **`44px`** (recommended **`48px`**) with full-width horizontal hit area.
- **Section Header Height:** `24px` (`padding: 4px 8px 2px 8px; font-size: 0.75rem; text-transform: uppercase`).
- **Separator Rule:** Height `1px`, background `var(--border-subtle)`, margin `4px -4px`.

### B. Viewport Collision & Positioning Rules
- **Default Offset:** `4px` gap between trigger bottom edge and menu top edge.
- **Boundary Margins:** Maintain a minimum **`12px` viewport margin** on all screen edges.
- **Horizontal Flipping:** If space on the right of the trigger button is less than `220px`, right-align the menu panel (`right: 0`) or flip direction.
- **Vertical Flipping:** If space below the trigger button is less than the menu panel height, flip to render above the trigger button (`bottom: 100%`).
- **Scroll Containment:** If menu content exceeds available vertical space, apply `max-height: calc(100vh - 32px)` and enable internal vertical scrolling (`overflow-y: auto`).

---

## 2. Elevation & Z-Index Token Matrix

| Surface Layer | CSS Z-Index Token | Shadow Token | Usage Purpose |
| :--- | :--- | :--- | :--- |
| **Base Page Content** | `z-index: 0` | `none` | Standard page documents & cards |
| **Sticky Header / Rail** | `z-index: 100` (`--z-sticky`) | `var(--shadow-sm)` | Persistent top navigation rails |
| **Dropdown Popover** | **`z-index: 1000` (`--z-popover`)** | **`var(--shadow-popover)`** | Floating action & overflow menus |
| **Modal Backdrop & Sheet**| `z-index: 2000` (`--z-modal`) | `var(--shadow-modal)` | Mobile action sheets & dialogs |
| **Tooltip Overlay** | `z-index: 3000` (`--z-tooltip`) | `var(--shadow-xs)` | Non-interactive micro-help overlays |

---

## 3. Keyboard Interaction & ARIA Semantics Specification

### A. Programmatic ARIA Attribute Mapping

| Element | ARIA Attribute | Required Value / State | Description |
| :--- | :--- | :--- | :--- |
| **Trigger Button** | `aria-haspopup` | `"menu"` | Declares that activating the button expands a menu. |
| | `aria-expanded` | `"true"` \| `"false"` | Programmatically reflects open/closed state of the menu. |
| | `aria-controls` | `"[menu-id]"` | References the unique DOM ID of the controlled menu container. |
| **Menu Container** | `role` | `"menu"` | Identifies the container as an interactive menu widget. |
| | `aria-labelledby` | `"[trigger-id]"` | Associates the menu overlay with its trigger button heading/label. |
| | `tabindex` | `"-1"` | Prevents natural tab key focus on the menu container wrapper itself. |
| **Standard Item** | `role` | `"menuitem"` | Identifies an interactive command within the menu. |
| **Checkable Item** | `role` | `"menuitemcheckbox"`| Identifies a toggle action item. |
| | `aria-checked` | `"true"` \| `"false"` | Programmatically reflects active selection state of the item. |
| **Radio Item** | `role` | `"menuitemradio"` | Identifies a single-select item within a radio group. |
| | `aria-checked` | `"true"` \| `"false"` | Programmatically reflects selected state within the group. |
| **Divider Line** | `role` | `"separator"` | Excludes horizontal rules from screen reader item counts. |

### B. Standard Keyboard Keyboard Shortcut Map

| Key Press | Context | Action / Expected Behavior |
| :--- | :--- | :--- |
| **`Enter` / `Space`** | On Focused Trigger | Opens menu, sets `aria-expanded="true"`, and moves focus to the 1st menu item. |
| **`ArrowDown`** | On Focused Trigger | Opens menu and instantly moves focus to the 1st menu item. |
| | Inside Open Menu | Moves focus sequentially to the next `menuitem` (wraps to 1st item from last). |
| **`ArrowUp`** | Inside Open Menu | Moves focus sequentially to the previous `menuitem` (wraps to last item from 1st). |
| **`Home` / `End`** | Inside Open Menu | Moves focus directly to the very first or very last active `menuitem`. |
| **`ArrowRight`** | On Submenu Item | Opens the cascading submenu and moves focus to its 1st item. |
| **`ArrowLeft`** | Inside Submenu | Closes the current cascading submenu and returns focus to the parent menu trigger item. |
| **`Escape`** | Inside Open Menu | Closes the menu, sets `aria-expanded="false"`, and restores focus to the trigger button. |
| **`Tab`** | Inside Open Menu | Closes the menu immediately and resumes natural document tab progression. |
| **Letter Keys (A–Z)**| Inside Open Menu | **Typeahead search:** Jumps focus directly to the next menu item starting with that letter. |

---

## 4. WCAG 2.1 AA Compliance Checklist

- [ ] **1.4.3 Contrast (Minimum):** Item text, icons, and keyboard hints satisfy at least **4.5:1** contrast ratio against the menu surface color.
- [ ] **2.1.1 Keyboard Accessible:** Every action inside the menu is completely triggerable via keyboard without requiring a mouse.
- [ ] **2.4.3 Focus Order:** Programmatic focus moves cleanly from trigger into menu on open, and returns back to trigger on close (`Escape` or execution).
- [ ] **2.4.7 Focus Visible:** Focused menu items feature visual focus highlights (background tint + outline) with at least 3:1 contrast against adjacent background.
- [ ] **2.5.8 Target Size:** Desktop menu items maintain at least `32px` height; mobile action sheet items satisfy at least **`44x44px`** touch targets.
