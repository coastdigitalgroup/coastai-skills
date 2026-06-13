# Accessibility Checkpoints for Pagination

A summary of WCAG 2.1/2.2 requirements and WAI-ARIA best practices for implementing accessible pagination.

## WCAG Success Criteria

### 1. 2.1.1 Keyboard (Level A)
All functionality must be available using a keyboard. Users must be able to `Tab` through page links and activate them.

### 2. 2.4.3 Focus Order (Level A)
When navigating sequentially, focusable components must receive focus in an order that preserves meaning and operability. This is critical for AJAX pagination where the focus should be moved to the new content or back to the top.

### 3. 2.4.4 Link Purpose (Level A)
The purpose of each link must be clear. Instead of just "1", use `aria-label="Page 1"` or `aria-label="Go to Page 1"`.

### 4. 2.4.7 Focus Visible (Level AA)
Any keyboard-operable user interface must have a mode of operation where the keyboard focus indicator is visible. Never use `outline: none` without providing a clear alternative.

### 5. 2.5.5 Target Size (Level AAA / Enhanced)
The size of the target for pointer inputs should be at least 44 by 44 CSS pixels. While Level AAA, this is a standard best practice for mobile usability (Level AA requires 24x24).

### 6. 4.1.2 Name, Role, Value (Level A)
The current page must be programmatically determinable. Use `aria-current="page"` on the active link.

## ARIA Implementation Notes

| Attribute | Purpose |
| :--- | :--- |
| `role="navigation"` | Implicitly applied by `<nav>`. Identifies the block as a navigation landmark. |
| `aria-label` | Distinguishes the pagination landmark from other navigation on the page. |
| `aria-current="page"` | Indicates the element represents the current page within a set. |
| `aria-disabled` | Signals that a control is present but not currently functional (e.g., "Prev" on first page). |
| `aria-hidden="true"` | Removes decorative elements like ellipses from the accessibility tree. |

## Focus Management Strategy (AJAX)

1. **The "Results Header" Pattern:** Move focus to the heading of the results section. This is the most standard approach as it places the user at the start of the new content.
2. **The "Container" Pattern:** Move focus to the wrapper of the results. Useful if the results are very long and you want the screen reader to announce the entire region.
3. **The "Stay in Place" Pattern:** If the user is likely to "rapid-fire" through pages, keep focus on the pagination but ensure an `aria-live` region announces "Page X loaded".
