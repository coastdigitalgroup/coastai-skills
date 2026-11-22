# Multi-Select Tag Input Layout Breakdown

This breakdown illustrates a production-grade implementation of a multi-select tag input (tokenized combobox) applied to a SaaS Project Assignment and Tagging Interface.

---

## 1. Visual Anatomy & Spatial Grid Layout

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ FIELD LABEL: Assign Team Roles & Skill Tags                             │
│ (Optional Helper: Type to filter or add custom tags)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ CONTAINER (Flex wrap, row-gap: 6px, col-gap: 6px, padding: 8px 12px)  │ │
│ │                                                                         │ │
│ │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │ │
│ │  │ 🔵 Design × │  │ 🟢 React  × │  │ 👤 Sarah  × │                   │ │
│ │  └──────────────┘  └──────────────┘  └──────────────┘                   │ │
│ │                                                                         │ │
│ │  ┌──────────────┐  ┌──────────────────────────────────────────────────┐ │ │
│ │  │ 🟡 UX Res ×  │  │ Type team member or skill...|                    │ │ │
│ │  └──────────────┘  └──────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ AUTOCOMPLETE DROPDOWN POPOVER (position: absolute; top: 100%; z-index:) │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │  ✔ Design System (Selected)                                            │ │
│ │  ○ DevOps Engineer                                                      │ │
│ │  ○ Data Analyst                                                         │ │
│ │  ○ Product Management                                                   │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Chip Anatomy & Measurement Specs

- **Chip Height:** `32px` (`2rem`) for standard forms; `28px` for compact table filters.
- **Chip Padding:** `4px 8px 4px 10px` (extended left padding for visual balance with trailing close button).
- **Border Radius:** `16px` (Pill shape) or `6px` (Rounded rectangle) for clear distinction from standard rectangular buttons.
- **Close Button (`×`):**
  - Dimensions: `20x20px` visual icon area centered in a `24x24px` interactive hit area.
  - Margin Left: `4px` separating label text from close icon.
  - Hover Effect: Background changes to `rgba(0, 0, 0, 0.12)` or `var(--chip-remove-hover)` with a `100ms` ease transition.
  - Accessibility Label: `<button aria-label="Remove tag React">×</button>`.

---

## 3. Micro-Interaction & State Flow

1. **Initial Unfocused State:**
   - Container has standard input border (`1px solid var(--border-neutral)`).
   - Input shows placeholder "Add tags or members..." when zero chips exist.

2. **Focused & Typing State:**
   - Container highlights with `2px solid var(--brand-primary)` and focus outline ring.
   - Dropdown listbox opens (`aria-expanded="true"`), highlighting options matching the typed string.

3. **Chip Creation (Click or Enter Key):**
   - Option is added as a chip preceding the active cursor.
   - Text field resets to empty string (`value=""`).
   - `aria-live="polite"` region announces: `"Added tag React. 4 tags selected."`

4. **Keyboard Chip Deletion (`Backspace` key):**
   - Pressing `Backspace` when text input is empty highlights the last chip (`React`) with a high-contrast danger/active focus outline.
   - Pressing `Backspace` a second time removes the chip and shifts focus to `Design` chip.
   - `aria-live="polite"` region announces: `"Removed tag React. 3 tags left."`

---

## 4. Accessibility Checklist

- [x] **WCAG 2.2 SC 2.5.8 (Target Size Minimum):** Chip close buttons provide `24x24px` minimum hit area; on touch viewports, target expands to `44x44px`.
- [x] **WCAG 2.1 SC 1.4.3 (Contrast Minimum):** Chip text (`#1f2937`) on chip background (`#f3f4f6`) satisfies `7.2:1` contrast ratio.
- [x] **ARIA 1.2 Combobox Pattern:** Uses `role="combobox"`, `role="listbox"`, `aria-expanded`, and `aria-multiselectable="true"`.
