# Action and Overflow Dropdown Menu Breakdown

This document provides realistic layout and spatial breakdowns showing the **Dropdown and Menu System** applied to two core SaaS UI patterns: a **Data Table Row Kebab Overflow Menu** and a **User Account & Workspace Profile Dropdown**.

---

## Pattern 1: Data Table Row Kebab Overflow Menu

### Scenario
An enterprise SaaS administration table displaying customer subscriptions. Each table row features an end-aligned "More Actions" (`...`) 3-dot kebab trigger button. Clicking or pressing `Enter`/`Space` opens a high-density action menu anchored to the bottom-end (`bottom-right`) of the trigger button.

### Visual & Spatial Breakdown

```text
+-----------------------------------------------------------------------------------+
| Customer Name      | Status    | MRR     | Actions                                |
+-----------------------------------------------------------------------------------+
| Acme Corp          | Active    | $1,200  | [ ⋮ ]  <-- Kebab Button (Trigger)       |
+--------------------------------+---------+--- | ----------------------------------+
                                                |
                                                v
                    +-----------------------------------------------+  (top-right origin)
                    |  [✏️]  Edit Subscription           ⌘E         |  role="menuitem"
                    |  [📋]  Copy Customer ID            ⌘C         |  role="menuitem"
                    |  [↗️]  Open Invoice Portal        ⌘O         |  role="menuitem"
                    |-----------------------------------------------|  role="separator"
                    |  [📁]  Move to Workspace           ►          |  role="menuitem" (has submenu)
                    |        |                                      |
                    |        +--------------------------------------+
                    |        |  [🏢] Enterprise US West             |  nested submenu
                    |        |  [🌐] Global EMEA Region             |  role="menu"
                    |        +--------------------------------------+
                    |-----------------------------------------------|  role="separator"
                    |  [🔒]  Suspend Account            --         |  role="menuitem"
                    |  [🗑️]  Delete Customer             ⌘⌫         |  role="menuitem" (danger)
                    +-----------------------------------------------+
```

### Anatomical Specifications

| Zone / Component | DOM Element / Role | CSS Tokens & Styling | Interaction Mechanics |
| :--- | :--- | :--- | :--- |
| **Trigger Button** | `<button aria-haspopup="menu" aria-expanded="true">` | `width: 32px; height: 32px; border-radius: 6px; hover: var(--bg-hover);` | Toggles dropdown menu visibility; receives keyboard focus back when menu closes. |
| **Menu Container** | `<div role="menu" aria-label="Customer Actions">` | `position: absolute; right: 0; top: 100%; min-width: 240px; border-radius: 8px; box-shadow: var(--shadow-elevation-high); z-index: 1000;` | Focus moves automatically to first menu item upon open; handles `ArrowUp/Down` and `Escape`. |
| **Standard Menu Item**| `<button role="menuitem">` | `display: flex; align-items: center; justify-content: space-between; height: 36px; padding: 0 12px; border-radius: 4px;` | Clicking or pressing `Enter`/`Space` fires command and closes menu. |
| **Shortcut Hint** | `<kbd class="shortcut">` | `font-family: monospace; font-size: 11px; color: var(--text-tertiary);` | Displays keyboard shortcut visual reference; non-interactive. |
| **Divider Line** | `<div role="separator">` | `height: 1px; background: var(--border-subtle); margin: 4px 0;` | Non-interactive separator grouping logical command categories. |
| **Submenu Trigger** | `<button role="menuitem" aria-haspopup="menu">` | `display: flex; align-items: center; justify-content: space-between;` | Hover with 200ms delay or pressing `ArrowRight` expands nested submenu. |
| **Danger Item** | `<button role="menuitem" class="danger">` | `color: var(--text-danger); hover: var(--bg-danger-subtle);` | Visually distinct red styling for irreversible destructive actions. |

---

## Pattern 2: User Account & Workspace Profile Dropdown

### Scenario
A top-navigation bar profile avatar dropdown allowing users to view current account details, switch active organization workspaces, toggle application theme preferences, and sign out.

### Visual & Spatial Breakdown

```text
+-----------------------------------------------------------------------------------+
| [Logo] Dashboard    Projects    Team                 [ Search... ]   [ 👤 Jane Doe v ]|
+-----------------------------------------------------------------------------------+
                                                                               |
                                                                               v
                                                    +---------------------------------------+
                                                    | JANE DOE                              | Identity
                                                    | jane.doe@acme.com                     | Section
                                                    | [Pro Plan]  • Active                  | Header
                                                    |---------------------------------------|
                                                    | WORKSPACE                             | Section Title
                                                    |  (•) Acme Enterprise USA              | role="menuitemradio"
                                                    |  ( ) Acme EMEA Operations             | role="menuitemradio"
                                                    |---------------------------------------|
                                                    | PREFERENCES                           |
                                                    |  [⚙️]  Account Settings               | role="menuitem"
                                                    |  [🌙]  Dark Mode          [ [x] ]     | role="menuitemcheckbox"
                                                    |  [🔔]  Notifications                  | role="menuitem"
                                                    |---------------------------------------|
                                                    |  [🚪]  Log Out                        | role="menuitem" (danger)
                                                    +---------------------------------------+
```

### State & Accessibility Matrix

- **Role Structure:** Container uses `role="menu"` labeled by the user button (`aria-labelledby="user-avatar-btn"`).
- **Radio Selection:** Active workspace choices use `role="menuitemradio"` with `aria-checked="true|false"`.
- **Toggle State:** Dark Mode toggle uses `role="menuitemcheckbox"` with `aria-checked="true|false"`.
- **Responsive Mobile Transformation:** On screens `<768px`, this dropdown transforms into a full-width bottom sheet anchored to the bottom of the screen with a top drag handle and 48px minimum hit target rows.

---

## Technical Positioning & Collision Logic

```javascript
/**
 * Calculates positioning for floating dropdown menus with boundary collision auto-flip.
 */
function positionDropdown(triggerEl, menuEl) {
  const triggerRect = triggerEl.getBoundingClientRect();
  const menuRect = menuEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  let top = triggerRect.bottom + 6; // 6px gap below trigger
  let left = triggerRect.right - menuRect.width; // Default right-aligned

  // Flip upward if menu overflows bottom viewport boundary
  if (top + menuRect.height > viewportHeight - 16) {
    top = triggerRect.top - menuRect.height - 6;
  }

  // Shift right if menu overflows left viewport boundary
  if (left < 16) {
    left = triggerRect.left;
  }

  menuEl.style.position = 'fixed';
  menuEl.style.top = `${top}px`;
  menuEl.style.left = `${left}px`;
}
```
