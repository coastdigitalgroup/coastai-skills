# Multi-Select Tag Input Anatomy & Accessibility Guidelines

This reference document defines spatial proportions, touch target dimensions, keyboard shortcuts, and WCAG AA accessibility requirements for multi-select tag input controls.

---

## Component Visual Anatomy

```text
+-----------------------------------------------------------------------------------------+
|  Label: Assign Project Members                                                          |
|  Hint: Press Enter or comma to create.                                                  |
| +-------------------------------------------------------------------------------------+ |
| |  +--------------------+  +--------------------+                                     | |
| |  | [Avatar] Alex  [x] |  | [Avatar] Sarah [x] |  | Search or type member... |         | |
| |  +--------------------+  +--------------------+  +--------------------------+         | |
| +-------------------------------------------------------------------------------------+ |
|    |                        |                       |                                   |
|    +-- Tag Chip 1           +-- Tag Chip 2          +-- Combobox Input Field            |
|                                                                                         |
| +-------------------------------------------------------------------------------------+ |
| | Marcus Vance            Engineering                                                 | |
| | Elena Rostova           Product Design                                              | |
| +-------------------------------------------------------------------------------------+ |
|   ^-- Floating Suggestion Listbox (role="listbox")                                      |
+-----------------------------------------------------------------------------------------+
```

---

## Spatial Sizing Standards & Metrics

| Element | Specification | Design Value |
| :--- | :--- | :--- |
| **Container Padding** | Top / Bottom: 6px, Left / Right: 8px | `padding: 0.375rem 0.5rem` |
| **Container Min-Height** | Touch target comfort threshold | `min-height: 44px` |
| **Chip Gap** | Row and column spacing between tags | `gap: 0.375rem` (6px) |
| **Tag Chip Padding** | Inline padding for token pills | `padding: 0.25rem 0.5rem` |
| **Tag Chip Height** | Visual pill height | `height: 26px - 28px` |
| **Tag Remove Button Target** | Minimum touch target area (WCAG 2.5.8) | Visual: `18px`, Touch Hit: `32px - 44px` |
| **Tag Text Max Width** | Ellipsis truncation constraint | `max-width: 160px - 200px` |
| **Input Flex Growth** | Minimum width before line wrapping | `flex: 1 1 120px` |
| **Dropdown Max-Height** | Vertical scroll boundary | `max-height: 200px - 240px` |

---

## Keyboard Interaction Matrix

| Key | Context | Action |
| :--- | :--- | :--- |
| **`Enter`** | Text typed in input | Creates tag chip from current text string, clears input. |
| **`,` (Comma)** | Text typed in input | Creates tag chip from current text string (stripping comma), clears input. |
| **`Backspace`** | Input is empty, tag not selected | Focuses and visually selects the preceding tag chip (`.is-selected`). |
| **`Backspace` / `Delete`** | Tag chip is currently selected | Deletes the selected tag chip, shifts focus to adjacent tag chip or input. |
| **`ArrowLeft`** | Cursor at index 0 of input | Moves selection focus leftward to the last tag chip in the sequence. |
| **`ArrowRight`** | Tag chip selected | Moves selection focus rightward to adjacent tag chip or back to input field. |
| **`ArrowDown`** | Focus on input field | Opens suggestion listbox and moves active descendant highlight down. |
| **`ArrowUp`** | Focus on input field | Moves active descendant highlight up within suggestion listbox. |
| **`Escape`** | Suggestion listbox open | Closes suggestion listbox without making a selection. |

---

## WCAG AA Accessibility Checklist

### 1. WCAG 1.4.3 Contrast (Minimum)
- Chip text against chip background surface must be at least **4.5:1** contrast ratio.
- Removal icon `×` against chip surface must be at least **3.0:1** (graphical objects & user interface components).
- Input focus ring against surrounding background surface must satisfy **3.0:1** contrast ratio.

### 2. WCAG 2.1.1 Keyboard & SC 2.1.2 No Keyboard Trap
- All operations—creating tags, searching suggestions, highlighting chips, deleting tags, closing popovers—must be achievable purely via keyboard without mouse dependency.

### 3. WCAG 2.5.8 Target Size (Minimum)
- The removal button hit area must provide at least **24×24 CSS pixels** (or **44×44 CSS pixels** for AAA compliance) to prevent misclicks on touch devices.

### 4. WCAG 4.1.2 Name, Role, Value (Combobox ARIA Pattern)
- The text input must explicitly specify `role="combobox"`.
- Dynamic attributes must be managed via JavaScript:
  - `aria-expanded="true|false"` when suggestion popup visibility changes.
  - `aria-haspopup="listbox"` indicating available option list.
  - `aria-controls="[listbox-id]"` establishing relationship to options container.
  - `aria-activedescendant="[option-id]"` for active option keyboard navigation.
- The tag chip removal buttons must include descriptive aria labels: `aria-label="Remove [Tag Name]"`.

### 5. Screen Reader Live Announcements (`aria-live`)
- Dynamic DOM additions and removals must update an offscreen polite live region (`aria-live="polite"`):
  - Example: *"Added tag UI Design. 3 tags selected."*
  - Example: *"Removed tag Engineering. 2 tags remaining."*
