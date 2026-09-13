# Menu Anatomy and Keyboard Rules Reference

This reference provides technical heuristics, WAI-ARIA specifications, spatial collision rules, and keyboard interaction standards for implementing accessible **Dropdown and Action Menus** across web interfaces.

---

## 1. WAI-ARIA Role Selection Guide

Choosing the correct ARIA pattern prevents critical screen reader navigation failures. Use this matrix to determine whether `role="menu"` is appropriate:

| Pattern | Container ARIA Role | Item ARIA Role | Focus Management | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Action Dropdown** | `role="menu"` | `role="menuitem"` | Roving focus (`ArrowUp/Down`) | Performing immediate commands / operations. |
| **Toggle Action Menu**| `role="menu"` | `role="menuitemcheckbox"` | Roving focus (`ArrowUp/Down`) | Toggling stateful view settings. |
| **Single-Choice Menu** | `role="menu"` | `role="menuitemradio"` | Roving focus (`ArrowUp/Down`) | Selecting active view modes / density options. |
| **Form Value Selector**| `role="listbox"` | `role="option"` | Active descendant or focus list | Selecting form input values (e.g. state/country). |
| **Combobox / Search** | `role="combobox"` | `role="option"` | Active descendant (`aria-activedescendant`) | Filtering dynamic input options while typing. |
| **Generic Popover** | `role="dialog"` or none | Standard interactive DOM | Standard `Tab` key traversal | Content overlay containing links, text, and inputs. |

---

## 2. Keyboard Navigation Standards (WAI-ARIA Menu Pattern)

Dropdown menus with `role="menu"` must **not** require pressing `Tab` to navigate between items. Implement roving focus controlled by directional arrow keys:

### Trigger Button Interactions

- **`Enter` / `Space` / `ArrowDown`:** Opens the dropdown menu and sets focus to the **first** enabled `role="menuitem"`.
- **`ArrowUp`:** Opens the dropdown menu and sets focus to the **last** enabled `role="menuitem"`.

### Inside Menu Container Interactions

- **`ArrowDown`:** Moves focus to the next enabled menu item. If focus is on the last item, wraps around to the first item.
- **`ArrowUp`:** Moves focus to the previous enabled menu item. If focus is on the first item, wraps around to the last item.
- **`Home`:** Jumps focus directly to the first enabled menu item.
- **`End`:** Jumps focus directly to the last enabled menu item.
- **`Escape`:** Immediately closes the menu popover and restores focus to the trigger button.
- **`Tab`:** Closes the menu popover and allows focus to advance naturally to the next tabbable element on the page.
- **Printable Characters (Typeahead):** Pressing a letter key (e.g., `D`) moves focus to the next enabled menu item whose label starts with that letter.

### Cascading Submenu Interactions

- **`ArrowRight` / `Enter`:** When focused on a submenu trigger item (`aria-haspopup="menu"`), opens the child submenu and focuses its first item.
- **`ArrowLeft` / `Escape`:** Inside a child submenu, closes the child submenu and restores focus to the parent submenu trigger item.

---

## 3. Structural Anatomy & Slot Geometry

Standardize menu items across design systems using a 5-slot flexbox grid container:

```text
+-------------------------------------------------------------------------------+
| Slot 1    | Slot 2                  | Slot 3     | Slot 4        | Slot 5     |
| Icon/Check| Primary Text Label      | Badge Chip | Key Shortcut  | Sub Chevron|
| 16x16px   | Flex-1 (Truncate)       | Opt Badge  | Monospace kbd | 16x16px    |
+-------------------------------------------------------------------------------+
```

### Height and Spacing Tokens

- **Desktop Density (`Compact`):** Container height `32px`, item height `32px`, padding `4px 8px`, font size `12px`.
- **Desktop Density (`Default`):** Container height `36px`, item height `36px`, padding `6px 12px`, font size `13px/14px`.
- **Touch / Mobile Density:** Container height `48px`, item height `48px`, padding `12px 16px`, font size `15px/16px`.

---

## 4. Spatial Collision & Auto-Placement Heuristics

To prevent floating menus from being cut off by screen boundaries or parent `overflow: hidden` containers:

1. **Calculate Available Viewport Space:**
   $$\text{Space Below} = \text{Viewport Height} - \text{Trigger Rect Bottom}$$
   $$\text{Space Above} = \text{Trigger Rect Top}$$

2. **Auto-Flip Condition:**
   If $\text{Space Below} < \text{Menu Height}$ AND $\text{Space Above} > \text{Space Below}$, set placement to `top-start` or `top-end`.

3. **Portal Elevation:**
   Render the floating menu container as a direct child of `document.body` or use CSS Anchor Positioning (`position: fixed`) with `z-index: 1000` to prevent parent container clipping in data tables.

---

## 5. Touch Adaptation & Mobile Bottom Action Sheets

When viewports measure `<768px`, adapt floating dropdowns to mobile bottom action sheets:
- Transform fixed positioning to `bottom: 0; left: 0; right: 0;`.
- Add a centered top drag handle pill (`width: 36px; height: 4px; border-radius: 999px;`).
- Add bottom safe-area inset padding: `padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px))`.
- Render a dim backdrop (`rgba(0,0,0,0.4)`) that closes the sheet when tapped.
