# Real-World Layout Breakdowns: Dropdown and Menu System

This document provides spatial and architectural breakdowns for two real-world application menu implementations using the **Dropdown and Menu System**:

1. **SaaS Data Table Row Action Menu** (Overflow `...` trigger in high-density data grid)
2. **Application Header User Profile & Account Menu** (Top-right avatar trigger with user identity, workspace switcher, and settings)

---

## Breakdown 1: SaaS Data Table Row Action Menu

### Problem Context
A SaaS customer management portal displays a high-density data table containing hundreds of client accounts. Each row requires contextual actions (View Details, Edit Permissions, Duplicate Row, Export Data, Delete Account). Placing individual action buttons on every table row creates visual clutter and horizontal overflow. An overflow icon button (`...`) provides a clean trigger for an anchored floating action menu.

### Spatial & Layout Blueprint

```text
+-------------------------------------------------------------------------------------------------------------------+
| TABLE ROW CELL: Account #1042 | Acme Corp | Enterprise Plan | $12,000/yr | [Active] | [ ... ] Actions Button     |
+---------------------------------------------------------------------------------------------------------|---------+
                                                                                                          |
                                                                                                          v
                                                       +--------------------------------------------------+
                                                       | DROPDOWN MENU CONTAINER (Anchored Bottom-Right)  |
                                                       | [Width: 220px | Elevation Shadow Level 3]        |
                                                       |                                                  |
                                                       |  [i]  View Account Details            ⌘D         |
                                                       |  [✏]  Edit Permissions                ⌘E         |
                                                       |  [📋] Duplicate Account                          |
                                                       |  ----------------------------------------------  |
                                                       |  [⚙]  Export Data                 › (Submenu)    |
                                                       |  ----------------------------------------------  |
                                                       |  [🗑] Danger: Delete Account           ⌫          |
                                                       +--------------------------------------------------+
```

### Anatomical & Structural Specifications

```html
<div class="table-cell-actions">
  <button
    type="button"
    id="row-1042-trigger"
    class="icon-button-overflow"
    aria-label="Actions for Acme Corp"
    aria-haspopup="menu"
    aria-expanded="true"
    aria-controls="row-1042-menu"
  >
    <svg aria-hidden="true" class="icon-dots-vertical"><!-- ... icon --></svg>
  </button>

  <div
    id="row-1042-menu"
    class="dropdown-menu dropdown-menu-end"
    role="menu"
    aria-labelledby="row-1042-trigger"
    tabindex="-1"
  >
    <div role="group" aria-label="Primary Actions">
      <button type="button" role="menuitem" class="dropdown-item" tabindex="0">
        <svg aria-hidden="true" class="item-icon"><!-- view icon --></svg>
        <span class="item-label">View Account Details</span>
        <kbd class="item-shortcut">⌘D</kbd>
      </button>

      <button type="button" role="menuitem" class="dropdown-item" tabindex="-1">
        <svg aria-hidden="true" class="item-icon"><!-- edit icon --></svg>
        <span class="item-label">Edit Permissions</span>
        <kbd class="item-shortcut">⌘E</kbd>
      </button>

      <button type="button" role="menuitem" class="dropdown-item" tabindex="-1">
        <svg aria-hidden="true" class="item-icon"><!-- duplicate icon --></svg>
        <span class="item-label">Duplicate Account</span>
      </button>
    </div>

    <hr role="separator" class="dropdown-divider" />

    <div role="group" aria-label="Export Options">
      <button type="button" role="menuitem" class="dropdown-item" aria-haspopup="menu" aria-expanded="false" tabindex="-1">
        <svg aria-hidden="true" class="item-icon"><!-- export icon --></svg>
        <span class="item-label">Export Data</span>
        <svg aria-hidden="true" class="item-chevron-right"><!-- chevron right --></svg>
      </button>
    </div>

    <hr role="separator" class="dropdown-divider" />

    <div role="group" aria-label="Destructive Actions">
      <button type="button" role="menuitem" class="dropdown-item dropdown-item-danger" tabindex="-1">
        <svg aria-hidden="true" class="item-icon"><!-- trash icon --></svg>
        <span class="item-label">Delete Account</span>
        <kbd class="item-shortcut">⌫</kbd>
      </button>
    </div>
  </div>
</div>
```

### Key Design Attributes Applied

1. **Right Edge Alignment:**
   - Positioned using `position: absolute; top: 100%; right: 0; margin-top: 4px; z-index: 1000;`.
   - Ensures the menu opens inward toward the screen center rather than clipping off the right viewport edge.

2. **Visual Hierarchy & Dividers:**
   - Dividers (`<hr role="separator">`) segment actions into 3 distinct functional groups: Primary Read/Write Actions, Data Operations, and Destructive Actions.
   - The "Delete Account" action uses a semantic warning red text tint (`var(--text-danger)`) and icon tint to prevent accidental execution.

3. **Submenu Cascading Pattern:**
   - The "Export Data" item features a right chevron (`›`) indicating a cascading flyout menu containing options: "Export CSV", "Export PDF", "Export JSON".

4. **Mobile Responsive Touch Adaptation:**
   - On screen widths <768px, the floating 220px popup is replaced by a slide-up bottom sheet anchored to the bottom of the device screen with 48px row heights and an explicit "Cancel" action button.

---

## Breakdown 2: Application Header User Profile & Account Menu

### Problem Context
A multi-tenant web application header displays the logged-in user's avatar in the top-right navigation bar. Tapping or clicking the avatar exposes a rich user account menu containing user identity information, active online status toggles, workspace switcher choices, account settings, and logout commands.

### Spatial & Layout Blueprint

```text
+-------------------------------------------------------------------------------------------------------------------+
| HEADER BAR: [Logo]  Search...                              [Notifications] [ (Avatar: Jane Doe) v ]               |
+-----------------------------------------------------------------------------------|-------------------------------+
                                                                                    |
                                                                                    v
                                              +---------------------------------------------------------------------+
                                              | USER PROFILE MENU (Anchored Top-Right)                              |
                                              | [Width: 260px | Surface Elevated]                                   |
                                              |                                                                     |
                                              |  +---------------------------------------------------------------+  |
                                              |  | Jane Doe                                                      |  |
                                              |  | jane.doe@acmecorp.com  * Pro Member                          |  |
                                              |  +---------------------------------------------------------------+  |
                                              |  -----------------------------------------------------------------  |
                                              |  [●] Set Status: Online                   ✓ (Radio Group)          |
                                              |  -----------------------------------------------------------------  |
                                              |  WORKSPACES (Radio Group)                                           |
                                              |  (•) Acme Corp (Primary)                  ✓                         |
                                              |  ( ) Stark Industries Tech                                          |
                                              |  -----------------------------------------------------------------  |
                                              |  [👤] Account Settings                                              |
                                              |  [⚙] Organization Settings                                          |
                                              |  -----------------------------------------------------------------  |
                                              |  [🚪] Sign Out                                                      |
                                              +---------------------------------------------------------------------+
```

### Key Design Attributes Applied

1. **User Identity Header Box:**
   - The topmost container is non-interactive (`role="presentation"` or `class="dropdown-header"`), presenting the user's display name, email address, and account badge ("Pro Member").
   - Uses muted sub-text and strict 12px vertical padding to ground the user's identity.

2. **Selection Toggles via Radio Groups:**
   - Active Workspace uses `role="menuitemradio"` with `aria-checked="true"` for "Acme Corp" and `aria-checked="false"` for "Stark Industries Tech".
   - Provides instant feedback when switching active tenant environments without closing the session.

3. **Keyboard Roving Focus Execution:**
   - Opening the avatar menu via `Space` or `Enter` shifts focus directly to the first interactive menu item ("Set Status: Online").
   - Pressing `ArrowDown` navigates sequentially down through active workspaces, account settings, and terminates at "Sign Out".
   - Pressing `Escape` closes the menu and returns focus back to the avatar trigger button.

4. **Elevation and Visual Separation:**
   - Elevated using `box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);`.
   - Uses a 1px solid border (`var(--border-subtle)`) with `border-radius: 12px` to ensure crisp visual isolation from the underlying header background.
