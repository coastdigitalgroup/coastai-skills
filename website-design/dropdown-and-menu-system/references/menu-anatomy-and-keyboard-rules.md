# Reference Specification: Dropdown Menu Anatomy and Keyboard Interaction Rules

This reference document defines exact structural dimensions, ARIA semantic mapping, keyboard event bindings, and viewport positioning collision algorithms for the **Dropdown and Menu System**.

---

## 1. Item Anatomy & Dimensional Grid Tokens

Every dropdown menu item row is structured using a strict 4-slot flex grid:

```text
+---------------------------------------------------------------------------------------------------+
| [Slot 1: Leading Icon] | [Slot 2: Action Label]            | [Slot 3: Trailing State / Submenu] | [Slot 4: Shortcut] |
| Width: 16px - 20px     | Flex Grow: 1                     | Checkmark (✓) or Chevron (›)       | Monospace Badge    |
+---------------------------------------------------------------------------------------------------+
```

### Dimensional Tokens Matrix

| Element | Desktop Size (≥768px) | Mobile Size (<768px) | Design Token CSS Variable |
| :--- | :--- | :--- | :--- |
| **Container Padding** | `6px` vertical & horizontal | `12px` vertical & horizontal | `--dropdown-container-padding` |
| **Row Minimum Height** | `36px` | `48px` (Touch Target) | `--dropdown-item-min-height` |
| **Row Padding** | `8px 10px` | `14px 12px` | `--dropdown-item-padding` |
| **Leading Icon Size** | `16x16px` | `20x20px` | `--dropdown-icon-size` |
| **Item Gap** | `10px` | `12px` | `--dropdown-item-gap` |
| **Label Font Size** | `14px` (`0.875rem`) | `16px` (`1rem`) | `--dropdown-label-font-size` |
| **Shortcut Font Size** | `11px` (`0.6875rem`) | `12px` (`0.75rem`) | `--dropdown-shortcut-font-size` |
| **Divider Margin** | `6px -6px` | `8px -12px` | `--dropdown-divider-margin` |
| **Border Radius** | `8px` (Container), `6px` (Item) | `16px 16px 0 0` (Bottom Sheet) | `--radius-md` / `--radius-sm` |

---

## 2. ARIA Semantic Role & Attribute Mapping

To ensure screen readers (NVDA, JAWS, VoiceOver, TalkBack) correctly announce the dropdown menu states, apply the following roles and attributes:

### Trigger Button Attributes
- `aria-haspopup="menu"`: Informs assistive technology that the button triggers a command menu.
- `aria-expanded="true|false"`: Dynamically updated when the menu opens or closes.
- `aria-controls="<menu-id>"`: References the ID of the floating menu container.

### Menu Container Attributes
- `role="menu"`: Declares the container as a command menu.
- `aria-labelledby="<trigger-id>"`: Links the menu to its trigger button for context.
- `tabindex="-1"`: Keeps the menu container out of sequential tab focus.

### Menu Item Attributes & Roles
- **Standard Command Item:** `role="menuitem"`
- **Checkbox Toggle Item:** `role="menuitemcheckbox"` with `aria-checked="true|false"`.
- **Radio Selection Item:** `role="menuitemradio"` with `aria-checked="true|false"`.
- **Group Container:** `role="group"` with optional `aria-label="<Group Name>"`.
- **Divider Separator:** `<hr role="separator">`.
- **Disabled Item State:** `aria-disabled="true"` with `tabindex="-1"`.

---

## 3. Keyboard Navigation Event Matrix

Dropdown menus MUST implement **Roving Tabindex** focus management rather than relying on standard sequential `Tab` key progression.

### Trigger Button Key Handlers

| Key Event | Action | Focus Target |
| :--- | :--- | :--- |
| `Enter` / `Space` | Open menu | Focus first visible `role="menuitem"` |
| `ArrowDown` | Open menu | Focus first visible `role="menuitem"` |
| `ArrowUp` | Open menu | Focus last visible `role="menuitem"` |

### Open Menu Key Handlers

| Key Event | Action | Focus Traversal Behavior |
| :--- | :--- | :--- |
| `ArrowDown` | Next item | Moves focus to next enabled item (wraps to first item). |
| `ArrowUp` | Previous item | Moves focus to previous enabled item (wraps to last item). |
| `Home` | First item | Moves focus directly to the first enabled menu item. |
| `End` | Last item | Moves focus directly to the last enabled menu item. |
| `Escape` | Dismiss menu | Closes menu, hides backdrop, restores focus to trigger button. |
| `ArrowRight` | Open Submenu | Opens nested submenu (if item has `aria-haspopup="menu"`) and focuses first item. |
| `ArrowLeft` | Close Submenu | Closes nested submenu and returns focus to parent item. |
| `Char Key` (e.g., `E`) | Typeahead Jump | Moves focus to next item whose label starts with the typed character. |
| `Tab` | Dismiss menu | Closes menu immediately and allows standard tab focus to advance. |

---

## 4. Viewport Collision & Positioning Algorithm

When a dropdown menu is triggered, compute its bounding rect to prevent clipping beyond the viewport edge:

```javascript
function computeMenuPosition(triggerEl, menuEl) {
  const triggerRect = triggerEl.getBoundingClientRect();
  const menuRect = menuEl.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = 12; // 12px screen padding edge

  let top = triggerRect.bottom + 4;
  let left = triggerRect.left;

  // Vertical Collision: Flip to top if bottom edge exceeds viewport
  if (top + menuRect.height > viewportHeight - padding && triggerRect.top - menuRect.height > padding) {
    top = triggerRect.top - menuRect.height - 4;
    menuEl.classList.add('dropdown-menu-top');
  } else {
    menuEl.classList.remove('dropdown-menu-top');
  }

  // Horizontal Collision: Align to right edge if right side overflows
  if (left + menuRect.width > viewportWidth - padding) {
    left = triggerRect.right - menuRect.width;
    menuEl.classList.add('dropdown-menu-end');
  }

  return { top, left };
}
```

---

## 5. Accessibility & Contrast Guidelines

- **Text Contrast Ratio:** Menu item text must achieve at least **4.5:1** contrast against `--color-surface-elevated` (WCAG 1.4.3).
- **Icon Contrast Ratio:** Non-text leading icons and state indicators must achieve at least **3:1** contrast against background (WCAG 1.4.11).
- **Focus Ring Visibility:** Focused menu items must display a high-contrast focus indicator (e.g., distinct background hover tint or 2px outline ring with ≥3:1 contrast).
- **Touch Target Padding:** On mobile screens (<768px), each menu item row height MUST measure at least **48px** to satisfy WCAG 2.5.5 / 2.5.8 touch target requirements.
