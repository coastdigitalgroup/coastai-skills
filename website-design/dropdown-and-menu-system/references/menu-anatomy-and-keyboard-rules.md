# Dropdown Menu Anatomy and WAI-ARIA Keyboard Rules

This reference guide outlines exact spatial anatomy tokens, WAI-ARIA accessibility semantics, and keyboard navigation rules for the `dropdown-and-menu-system`.

---

## 1. Menu Spatial Anatomy & Spacing Tokens

| Spatial Layer | Standard Token Size | CSS Variable / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Trigger Height (Desktop)** | `40px` | `min-height: 40px;` | Aligns with standard text inputs. |
| **Trigger Height (Mobile)** | `44px`–`48px` | `min-height: 44px;` | Touch target compliance (WCAG 2.2 SC 2.5.8). |
| **Menu Outer Padding** | `6px` | `padding: 6px;` | Distance between menu edge and item highlight fills. |
| **Menu Border Radius** | `8px` | `border-radius: 8px;` | Elevation container smoothing. |
| **Menu Item Height (Desktop)**| `36px` | `min-height: 36px;` | Comfortable mouse hover and focus target. |
| **Menu Item Height (Mobile)** | `44px` | `min-height: 44px;` | Mobile touch hit target minimum. |
| **Item Internal Padding** | `8px 10px` | `padding: 8px 10px;` | Horizontal alignment for icon + text + accelerator. |
| **Leading Icon Size** | `16px x 16px` | `width: 16px; height: 16px;` | Uniform alignment along left margin. |
| **Icon-to-Text Gap** | `10px` | `gap: 10px;` | Prevents visual clutter between icon and label. |
| **Group Divider Margin** | `6px 0` | `margin: 6px 0;` | Vertical separation around 1px rule. |
| **Max Panel Height** | `320px` | `max-height: 320px;` | Scroll threshold (~6.5 visible items). |

---

## 2. WAI-ARIA Semantic Role Hierarchy

```text
[Trigger Button]
  ├── role="button" (or native <button>)
  ├── aria-haspopup="menu"
  ├── aria-expanded="true | false"
  └── aria-controls="menu-id"

[Menu Panel]
  ├── id="menu-id"
  ├── role="menu"
  ├── aria-labelledby="trigger-id"
  └── overscroll-behavior: contain

      ├── [Group Header] -> role="presentation" or aria-hidden="true"
      ├── [Menu Item]    -> role="menuitem" (tabindex="-1")
      ├── [Check Item]   -> role="menuitemcheckbox" (aria-checked="true|false")
      ├── [Radio Item]   -> role="menuitemradio" (aria-checked="true|false")
      ├── [Submenu Item] -> role="menuitem", aria-haspopup="menu", aria-expanded="true|false"
      └── [Divider]      -> role="separator"
```

---

## 3. Keyboard Navigation Interaction Matrix

| Key Press | Trigger Focus State | Menu Active Focus State | Expected Action |
| :--- | :--- | :--- | :--- |
| **`Enter` / `Space`** | Focused | — | Opens menu, places DOM focus on first active `role="menuitem"`. |
| **`ArrowDown`** | Focused | Focused on Item | Moves focus to next non-disabled `role="menuitem"`. Loops to top if at bottom. |
| **`ArrowUp`** | Focused | Focused on Item | Moves focus to previous non-disabled `role="menuitem"`. Loops to bottom if at top. |
| **`ArrowRight`** | — | Focused on Submenu Item | Opens child flyout submenu, places focus on first child `role="menuitem"`. |
| **`ArrowLeft`** | — | Focused in Submenu | Closes child flyout submenu, returns focus to parent submenu trigger item. |
| **`Home`** | — | Focused on Item | Moves focus immediately to first non-disabled `role="menuitem"`. |
| **`End`** | — | Focused on Item | Moves focus immediately to last non-disabled `role="menuitem"`. |
| **`Escape`** | — | Focused on Item | Closes menu, immediately restores focus back to Trigger button. |
| **`Tab`** | — | Focused on Item | Closes menu, advances focus to next focusable element on page. |
| **Character Key (A–Z)**| — | Focused on Item | Focus jumps to next menu item starting with typed letter. |
