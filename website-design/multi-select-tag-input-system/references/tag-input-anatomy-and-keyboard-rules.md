# Multi-Select Tag Input Reference Guide

This reference provides precise spatial metrics, color contrast guidelines, ARIA attribute maps, and keyboard handling rules for implementing accessible multi-select tag inputs.

---

## 1. Spatial Tokens & Dimensions

| Parameter | Standard Form Value | Compact Table Toolbar Value | Notes / Mobile Rule |
| :--- | :--- | :--- | :--- |
| **Container Min-Height** | `44px` (`2.75rem`) | `36px` (`2.25rem`) | Satisfies WCAG touch target guideline |
| **Container Padding** | `6px 12px` | `4px 8px` | Vertical expansion maintains balanced padding |
| **Row Gap & Column Gap** | `6px` (`0.375rem`) | `4px` (`0.25rem`) | Flexbox gap between wrapped chips |
| **Chip Height** | `28px` (`1.75rem`) | `24px` (`1.5rem`) | Includes 1px border |
| **Chip Padding** | `2px 4px 2px 10px` | `1px 4px 1px 8px` | Trailing side padded for close button |
| **Chip Label Max-Width**| `180px` | `120px` | Truncated with CSS `text-overflow: ellipsis` |
| **Close Button Target** | `24x24px` | `20x20px` | Minimum hit area (WCAG 2.2 SC 2.5.8) |
| **Dropdown Max-Height** | `240px` | `180px` | Scrollable overflow for option lists |

---

## 2. Color Contrast & Visual States (WCAG AA)

- **Chip Background (Default):** `#f3f4f6` (Light neutral)
- **Chip Text (Default):** `#1f2937` (Dark neutral)
  - *Contrast Ratio:* **7.2:1** (Exceeds WCAG AA 4.5:1 requirement)
- **Chip Focus / Highlighted State (Deletion pending):**
  - Background: `#dbeafe` (Light blue tint)
  - Text: `#1e40af` (Dark blue)
  - Border: `#3b82f6` (Active primary outline)
- **Container Focus Ring:**
  - `outline: 2px solid #2563eb; outline-offset: 2px;`
  - High-contrast visual focus boundary required for keyboard users (WCAG SC 2.4.11 / 2.4.13).

---

## 3. Keyboard Navigation Logic

| Input State | Key Pressed | Target / Action Result |
| :--- | :--- | :--- |
| **Text Input Focused** | `ArrowDown` | Opens listbox dropdown; moves focus to 1st option |
| **Text Input Focused** | `ArrowUp` | Opens listbox dropdown; moves focus to last option |
| **Text Input Focused** | `Enter` | Selects highlighted dropdown option -> converts to chip -> resets input |
| **Text Input Focused** | `Comma` (`,`) | (If freeform tagging enabled) Converts typed string to tag chip |
| **Text Input Empty** | `Backspace` | Shifts focus from text cursor to last inline chip (`chip-n`) |
| **Chip Focused (`chip-n`)**| `Backspace` / `Delete` | Removes focused chip -> shifts focus to `chip-n-1` (or text input) |
| **Chip Focused (`chip-n`)**| `ArrowLeft` | Moves focus to preceding chip (`chip-n-1`) |
| **Chip Focused (`chip-n`)**| `ArrowRight` | Moves focus to next chip (`chip-n+1`) or text field |
| **Listbox Open** | `Escape` | Closes listbox dropdown without clearing existing chips; retains input focus |

---

## 4. ARIA Attributes & Live Region Mapping

```text
[div.tag-input-container]
   |
   ├── [input#combobox-id]
   │     role="combobox"
   │     aria-expanded="true | false"
   │     aria-haspopup="listbox"
   │     aria-controls="listbox-id"
   │     aria-labelledby="label-id"
   │     aria-autocomplete="list"
   │
   ├── [span.tag-chip]
   │     └── [button.tag-chip__remove-btn]
   │           aria-label="Remove tag [Tag Name]"
   │
   └── [ul#listbox-id]
         role="listbox"
         aria-multiselectable="true"
         aria-labelledby="label-id"
         └── [li.tag-dropdown-option]
               role="option"
               aria-selected="true | false"

[div.sr-only]
   aria-live="polite"
   (Dynamic content: "Added tag React. 3 tags selected.")
```
