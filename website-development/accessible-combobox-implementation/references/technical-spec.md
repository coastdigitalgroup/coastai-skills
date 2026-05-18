# Combobox Technical Reference

## Required ARIA Roles and Attributes

| Element     | Role                              | Attributes                                                                     |
| :---------- | :-------------------------------- | :----------------------------------------------------------------------------- |
| **Wrapper** | `combobox` (ARIA 1.2)             | `aria-expanded`, `aria-owns` (fallback)                                        |
| **Input**   | `combobox` (ARIA 1.2 alternative) | `aria-autocomplete`, `aria-controls`, `aria-activedescendant`, `aria-expanded` |
| **Listbox** | `listbox`                         | `aria-labelledby`, `id`                                                        |
| **Option**  | `option`                          | `aria-selected`, `id`                                                          |
| **Status**  | (none)                            | `aria-live="polite"`                                                           |

## Keyboard Interaction Pattern

Following the WAI-ARIA Authoring Practices for Combobox:

| Key                   | Function                                                                                           |
| :-------------------- | :------------------------------------------------------------------------------------------------- |
| `ArrowDown`           | If closed, opens the listbox and highlights the first option. If open, highlights the next option. |
| `ArrowUp`             | Highlights the previous option. If at the first option, may loop to the last or clear highlight.   |
| `Enter`               | Selects the highlighted option, closes the listbox, and moves focus back to/stays on input.        |
| `Escape`              | Closes the listbox. If the listbox is already closed, may clear the input content.                 |
| `Tab`                 | Closes the listbox and moves focus to the next focusable element.                                  |
| `Home` / `End`        | Moves highlight to the first or last option in the list.                                           |
| `PageUp` / `PageDown` | (Optional) Moves highlight by a set number of items (e.g., 10).                                    |

## State Management Rules

1. **`aria-expanded`:**
   - MUST be `true` when the listbox is visible.
   - MUST be `false` when the listbox is hidden.
2. **`aria-activedescendant`:**
   - MUST match the `id` of the visually highlighted option.
   - MUST be removed when no option is highlighted or the listbox is closed.
3. **`aria-selected`:**
   - SHOULD be `true` for the item that matches the current input value.
   - Multiple items can have `aria-selected="true"` in a multi-select combobox.

## Accessibility Heuristics

- **Visual Highlight vs. Selection:** Distinguish between "highlighted for
  navigation" and "actually selected."
- **Scroll Management:** When navigating via keyboard, the highlighted item must
  be visible in the listbox viewport.
- **Filtering Announcement:** Use an `aria-live` region to announce how many
  results are available after a user types. This prevents the user from having
  to arrow down just to see if results exist.
