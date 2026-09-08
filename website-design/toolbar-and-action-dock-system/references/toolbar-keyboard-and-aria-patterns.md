# Toolbar Keyboard & ARIA Patterns Reference

This reference provides technical specifications for ARIA attributes, roving `tabindex` keyboard interaction models, touch target heuristics, and responsive overflow strategies when building toolbar and floating action dock systems.

---

## 1. ARIA Toolbar Semantics

The ARIA `toolbar` role specifies a container for a collection of commonly used function buttons or controls presented in a compact horizontal or vertical layout.

### Container Attributes

| Attribute | Value | Requirement | Description |
| :--- | :--- | :--- | :--- |
| `role` | `"toolbar"` | **Required** | Identifies the container as an ARIA toolbar widget. |
| `aria-label` | `string` (e.g. `"Formatting options"`) | **Required** | Provides an accessible name describing the toolbar's purpose. |
| `aria-labelledby` | `ID reference` | Alternative | References an external label heading element if `aria-label` is not used. |
| `aria-orientation` | `"horizontal"` \| `"vertical"` | Optional (Default: `"horizontal"`) | Defines the primary layout direction for arrow key navigation. |

### Control Item Attributes & Roles

- **Push Buttons (Instant Action):**
  - HTML: `<button type="button" aria-label="Undo">`
  - Purpose: Triggers immediate action (e.g., Save, Undo, Delete, Export).
- **Toggle Buttons (Independent State):**
  - HTML: `<button type="button" aria-pressed="true|false" aria-label="Bold">`
  - Purpose: Maintains binary active/inactive state (e.g., Bold, Italic, Pin).
- **Mutual Exclusion Sets (Radio Group):**
  - HTML Container: `<div role="radiogroup" aria-label="Text alignment">`
  - HTML Items: `<button role="radio" aria-checked="true|false" aria-label="Align left">`
  - Purpose: Group of controls where only one item can be selected at a time (e.g., Left/Center/Right alignment).
- **Separators:**
  - HTML: `<div role="separator" aria-orientation="vertical"></div>`
  - Purpose: Indicates a visual and structural boundary between logical control groups.

---

## 2. Roving Tabindex Keyboard Navigation Protocol

By default, an application toolbar containing 20+ buttons should NOT create 20 individual tab stops in the web page. Instead, it must implement the **Roving Tabindex** pattern:

1. The toolbar container is treated as a **single tab stop** in the page focus order.
2. The currently active control item has `tabindex="0"`.
3. All other control items have `tabindex="-1"`.
4. When focus enters the toolbar via `Tab`, focus settles on the control with `tabindex="0"`.
5. Arrow keys move focus internally between controls inside the toolbar, dynamically moving `tabindex="0"` to the focused element and updating previous elements to `tabindex="-1"`.

### Keyboard Navigation Mapping

| Key Input | Action / Behavior |
| :--- | :--- |
| `Tab` | Focuses the toolbar's active item (`tabindex="0"`). Pressing `Tab` again exits the entire toolbar to the next focusable page element. |
| `Shift + Tab` | Focuses the toolbar's active item when navigating backward. |
| `Right Arrow` / `Down Arrow` | Moves focus to the next enabled control in the toolbar. Wraps to the first item if at the end. |
| `Left Arrow` / `Up Arrow` | Moves focus to the previous enabled control in the toolbar. Wraps to the last item if at the beginning. |
| `Home` | Moves focus directly to the first enabled control in the toolbar. |
| `End` | Moves focus directly to the last enabled control in the toolbar. |
| `Space` / `Enter` | Activates the focused button or toggles state (`aria-pressed` / `aria-checked`). |

---

## 3. Density & Touch Sizing Heuristics

Toolbar controls must be optically compact while remaining usable across diverse input methods (mouse, stylus, touch).

```text
Density Level      Control Target Size      Icon Dimension      Min Touch Target (@media coarse)
────────────────────────────────────────────────────────────────────────────────────────
Compact            28px × 28px               16px × 16px         44px × 44px
Standard           34px × 34px - 36px × 36px  18px × 18px         44px × 44px
Coarse / Touch     44px × 44px - 48px × 48px  22px × 22px         48px × 48px
```

### Pointer Type Adaptation CSS Rule
```css
/* Ensure touch screens provide WCAG 2.2 SC 2.5.8 compliant target sizing */
@media (pointer: coarse) {
  .toolbar-btn,
  .toolbar-select,
  .dock-btn {
    min-width: 44px;
    min-height: 44px;
  }
}
```

---

## 4. Floating Action Dock Positioning & Z-Index Stacking

Floating docks (e.g., bulk table row actions, media playback docks) float over main page content and require precise viewport pinning and stacking isolation.

```css
.floating-action-dock {
  position: fixed;
  bottom: clamp(16px, 4vh, 32px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100; /* Above regular page content and sticky headers */
  max-width: calc(100vw - 32px);
}
```

### Viewport Safe Areas
On mobile devices with gesture bars (iOS Home Indicator), ensure bottom clearance:
```css
.floating-action-dock {
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
}
```
