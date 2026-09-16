---
name: dropdown-and-menu-system
description:
  Design floating action menus, overflow menus, contextual menus, and cascading submenus across web interfaces, managing item anatomy, spatial positioning, keyboard navigation, and responsive touch adaptation.
---

# Dropdown and Menu System

## Purpose

The Dropdown and Menu System provides a standardized, accessible design framework for floating action menus, overflow menus (three-dot menus), contextual action menus, user account menus, and cascading submenus across desktop and mobile web applications.

Designers and frontend engineers frequently confuse **Command/Action Menus** (`role="menu"`) with **Selection Inputs** (`role="combobox"` / `<select>`) or **Navigation Links** (`role="navigation"`). This leads to severe accessibility flaws, broken keyboard interaction patterns, clipped popups near viewport edges, and frustrating touch experiences on mobile devices.

This skill establishes clear rules for menu item anatomy, visual state indicators, spatial positioning and collision boundary algorithms, keyboard focus management (roving tabindex and arrow key traversal), and responsive adaptation (converting dense desktop dropdown menus into mobile action sheets or bottom drawers).

## Use Cases

- **SaaS Data Table Row Actions:** Triggering an overflow menu (`...`) on a table row to access actions such as "View Details", "Edit Permissions", "Duplicate", and "Delete".
- **Application Header User Profile:** Displaying user account switcher options, status toggles (Online/Away), workspace preferences, and "Sign Out" actions from a user avatar trigger.
- **Contextual Right-Click Menus:** Providing custom web application context menus on canvas elements, file trees, or rich text selections.
- **Cascading Nested Command Menus:** Presenting nested sub-category command actions (e.g., File > Export As > PDF / PNG / SVG) in design tools or IDEs.
- **Card Overflow & Feed Options:** Offering quick user interactions (Bookmark, Mute Author, Report, Copy Link) on social media cards or content feeds.

## When NOT to Use

- **Form Selection Inputs:** For selecting a value from a set of options into a form field, use `custom-select-and-combobox-system`.
- **Top-Level Site Navigation Structure:** For primary site header navigation, use `site-navigation-system` or `mega-menu-navigation-system`.
- **Modal Workflows & Confirmation Forms:** For complex multi-input forms or destructive confirmation steps that require user focus isolation, use `overlay-and-dialog-system`.
- **In-Page Tab Switching:** For switching between visible content views on a single page, use `tab-ui-system` or `segmented-control-system`.

## Inputs

1. **Trigger Configuration:** Element initiating the menu (Icon Button, Text Button with Chevron, Avatar, or Right-Click Target Pointer coordinates).
2. **Item Taxonomy & Hierarchy:** Structure of menu items including action commands, toggle switches (`menuitemcheckbox`), mutually exclusive groups (`menuitemradio`), section headers, separators, leading icons, trailing shortcut badges, and submenus.
3. **Viewport & Spatial Anchoring:** Anchor edge alignment (bottom-left, bottom-right, top-left, top-right) and collision padding relative to the viewport boundary.
4. **Design System Tokens:** Elevation shadow levels, surface background colors, border radius, item padding, hover/focus state tints, divider colors, and typography tokens.
5. **Responsive Adaptation Rules:** Target transformation for mobile touch screens (<768px): convert to Slide-Up Bottom Sheet, Anchored Popover, or Full-Screen Overlay.

## Outputs

1. **Dropdown Menu Visual Blueprint:** Dimensional spec covering trigger button, menu container, item rows, leading/trailing slots, dividers, and destructive item styling.
2. **Keyboard Navigation & ARIA Mapping Specification:** Roving tabindex protocol, key handler binding table (`ArrowUp`, `ArrowDown`, `ArrowRight`, `ArrowLeft`, `Home`, `End`, `Escape`, Typeahead search), and ARIA markup requirements (`role="menu"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`, `aria-expanded`, `aria-haspopup`).
3. **Spatial Collision & Auto-Flip Matrix:** Algorithmic positioning spec defining flip-over rules when space is restricted near top/bottom/left/right viewport boundaries.
4. **Mobile Touch & Gesture Adaptation Spec:** Blueprint for transforming narrow hover/pointer dropdowns into touch-friendly bottom sheets or action docks with minimum 44x44px touch targets.

---

## Workflow

### 1. Classify Menu Type and Define Item Structure
Determine the semantic role and interaction model based on the target task:
- **Action Menu (`role="menu"`):** Contains executable commands (e.g., "Edit", "Duplicate", "Export").
- **Checkbox / Radio Toggle Group:** Contains setting toggles (e.g., "Show Gridlines" via `role="menuitemcheckbox"`) or selection states (e.g., "Theme: Dark" via `role="menuitemradio"`).
- **Grouped Section Layout:** Group related actions into logical clusters using `role="group"` with explicit section headers (`<span role="presentation">`) and dividers (`<hr role="separator">`).
- **Destructive Separation:** Position destructive commands (e.g., "Delete Account") at the bottom of the menu, separated by a divider line and highlighted with warning semantic color tokens.

### 2. Design Visual Item Anatomy and Slot Alignment
Construct every menu item row using a consistent 4-slot structural grid:
- **Slot 1: Leading Icon (Optional, 16x16px or 20x20px):** Provides quick visual recognition (e.g., Pencil icon for Edit, Trash icon for Delete).
- **Slot 2: Item Label (Required, Left-Aligned):** Concise action label using sentence case ("Export to PDF").
- **Slot 3: State / Submenu Indicator (Optional, Right-Aligned):**
  - Checkmark icon (`✓`) for active `menuitemcheckbox` or `menuitemradio`.
  - Right chevron (`›`) for items opening nested cascading submenus (`aria-haspopup="true"`).
- **Slot 4: Keyboard Shortcut Badge (Optional, Right-Aligned):** Muted monospace text displaying key combos (e.g., `⌘E` or `Ctrl+C`).

```text
+-----------------------------------------------------------------------+
| [Slot 1: Icon]  [Slot 2: Action Label]       [Slot 3/4: Shortcut/›]   |
| (16x16px)       (Flex Grow Text)             (Muted / Right-Aligned)  |
+-----------------------------------------------------------------------+
```

### 3. Establish Spatial Positioning and Viewport Collision Handling
Configure floating positioning mechanics to guarantee the menu never renders outside the visible screen:
- **Default Alignment:** Align menu container to trigger button's start edge (`bottom-left` for LTR) or end edge (`bottom-right` for right-aligned table columns).
- **Vertical Auto-Flip:** If distance from trigger bottom to viewport bottom is less than menu height (`menuHeight + 8px`), flip menu to render above the trigger (`top-left` or `top-right`).
- **Horizontal Clamp:** Maintain at least **12px margin** from screen edges (`viewport-padding`).
- **Z-Index Layering:** Assign elevation z-index token (`var(--z-dropdown, 1000)`) above sticky headers and standard content cards.

### 4. Implement Focus Management and Keyboard Accessibility
Adhere strictly to WAI-ARIA Authoring Practices (APG) for Menu Button patterns:
- **Trigger Key Bindings:**
  - `Enter`, `Space`, or `ArrowDown` opens menu and shifts focus to the **first menu item**.
  - `ArrowUp` opens menu and shifts focus to the **last menu item**.
- **Menu Key Traversal:**
  - `ArrowDown` moves focus to the next visible menu item (wrapping from last to first).
  - `ArrowUp` moves focus to the previous menu item (wrapping from first to last).
  - `Home` jumps focus to the first item; `End` jumps to the last item.
  - Printable Character key triggers **Typeahead Focus** (focuses the next item starting with that letter).
- **Submenu Traversal:**
  - `ArrowRight` on a submenu item opens the nested menu and focuses its first item.
  - `ArrowLeft` or `Escape` inside a nested submenu closes the submenu and returns focus to the parent item.
- **Dismissal Handling:**
  - `Escape` closes the menu immediately and returns focus to the trigger button.
  - Clicking outside or blurring focus closes the open menu.

### 5. Adapt for Mobile and Touch Viewports
Dropdown menus designed for desktop mouse pointers are difficult to interact with on mobile touchscreens. Implement responsive adaptation rules for viewports < 768px:
- **Mobile Action Sheet / Bottom Sheet Transformation:** On touch screens, convert floating dropdown popups into slide-up bottom sheets (`position: fixed; bottom: 0; left: 0; right: 0;`).
- **Touch Hit Target Expansion:** Increase row item padding and height from **32px / 36px** on desktop to **48px** minimum height on mobile.
- **Backdrop Overlay (Scrim):** Introduce a semi-transparent backdrop overlay (`background: rgba(0,0,0,0.4)`) behind mobile bottom sheets to lock scrolling and define tap-to-dismiss behavior.

---

## Decision Rules

### Menu Type & Attribute Matrix

| Attribute / Feature | Command Dropdown Menu (`role="menu"`) | Select Input (`role="combobox"`) | Navigation Menu (`role="navigation"`) |
| :--- | :--- | :--- | :--- |
| **Primary Purpose** | Execute actions / triggers | Pick data value for form | Navigate to URL / route |
| **ARIA Trigger Role** | `<button aria-haspopup="menu">` | `<button aria-haspopup="listbox">` | `<nav>` / `<a>` link |
| **Keyboard Traversal** | `ArrowUp` / `ArrowDown` keys | `ArrowUp` / `ArrowDown` keys | `Tab` key progression |
| **Item Role** | `role="menuitem"` | `role="option"` | `<a>` link / `role="link"` |
| **Value Persistence** | No persistent value stored | Selected value stored in form | Current page URL active state |
| **Submenus Supported** | Yes (`ArrowRight` / `ArrowLeft`) | Rare / Flat list preferred | Yes (Cascading / Mega menu) |

### Responsive Mobile Adaptation Strategy

| Trigger Context | Desktop Behavior (≥768px) | Mobile Behavior (<768px) | Justification |
| :--- | :--- | :--- | :--- |
| **Table Row `...` Button** | Anchored Floating Dropdown | Slide-up Bottom Sheet | Easy thumb reach; avoids screen edge clipping on small phones. |
| **User Avatar / Account** | Top-Right Anchored Dropdown | Full-Width Drawer or Bottom Sheet | Accommodates multi-account lists and logout actions clearly. |
| **Contextual Canvas Menu** | Right-Click Cursor Popover | Long-Press Bottom Action Sheet | Translates right-click gestures into standard touch patterns. |
| **Cascading Submenu** | Hover/Click Flyout Panel | Slide-In Nested Sub-Panel | Prevents multi-level flyouts from overflowing small screens. |

---

## Constraints

- **WCAG 2.1 / 2.2 AA Compliance:**
  - **Touch Target Size:** Mobile menu items must provide a minimum target size of **44x44px** (WCAG 2.5.5 / 2.5.8).
  - **Contrast Ratio:** Text labels and icons must maintain at least **4.5:1** contrast against menu background surface (WCAG 1.4.3). Focus ring indicators must maintain **3:1** contrast.
  - **Focus Restoration:** Closing the dropdown menu via `Escape`, item execution, or backdrop click MUST restore focus to the trigger button.
- **ARIA Semantics:**
  - Do NOT place plain `<a>` links inside a `role="menu"` container unless using `role="menuitem"`. If items navigate, use standard link lists or specify `role="menuitem"` with proper keyboard handlers.
  - Ensure `aria-expanded="true|false"` on the trigger reflects the live visibility state.

---

## Common Failure Patterns

- **Conflating Select Comboboxes with Action Menus:** Using `role="menu"` for a country/state picker form field or using `<select>` for a list of table action buttons.
- **Missing Keyboard Arrow Navigation:** Forcing users to `Tab` through every single item inside a 10-item menu rather than using `ArrowDown` / `ArrowUp` roving focus.
- **Viewport Clipping and Overlap:** Failing to compute boundary collisions, causing the dropdown menu to bleed off the bottom or right side of the browser window.
- **Missing Escape Key Handler:** Forgetting to handle `Escape` key events, trapping keyboard users inside an open floating menu.
- **Tiny Mobile Touch Targets:** Retaining desktop 28px/32px row heights on touch screens, causing frequent mis-taps on adjacent menu items.

---

## Validation Criteria

- [ ] Trigger button explicitly specifies `aria-haspopup="menu"` and `aria-expanded` state.
- [ ] Container uses `role="menu"` and items use `role="menuitem"`, `role="menuitemcheckbox"`, or `role="menuitemradio"`.
- [ ] Keyboard navigation supports `ArrowUp`, `ArrowDown`, `Home`, `End`, `Escape`, and Typeahead character jumping.
- [ ] Submenus support `ArrowRight` to enter and `ArrowLeft` / `Escape` to return to parent menu.
- [ ] Spatial collision logic auto-flips or realigns menu when positioned near viewport edges.
- [ ] Mobile viewports (<768px) cleanly adapt dropdowns to bottom sheets or action docks with ≥44px touch target heights.
- [ ] Color contrast meets WCAG AA (≥4.5:1 text contrast, ≥3:1 focus ring contrast).
