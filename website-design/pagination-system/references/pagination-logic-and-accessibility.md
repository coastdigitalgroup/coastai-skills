# Pagination Logic & Accessibility

This reference documents the technical requirements for implementing smart,
accessible pagination.

## Navigational Logic (The Range Algorithm)

To keep the pagination bar clean, use a sliding window logic to determine which
numbers to display.

### The Standard Window (7 slots)
For a large dataset, a 7-slot display is the gold standard for usability:

1. **Slot 1:** Always Page 1.
2. **Slot 2:** Either Page 2 OR an Ellipsis (`...`).
3. **Slot 3:** Current Page - 1.
4. **Slot 4:** Current Page.
5. **Slot 5:** Current Page + 1.
6. **Slot 6:** Either Max - 1 OR an Ellipsis (`...`).
7. **Slot 7:** Always the Max Page.

---

## Accessibility Requirements (WCAG 2.2)

### 1. Semantic Markup
- Use a `<nav>` element as the container.
- Use an unordered list (`<ul>`) to group the links.
- Use `aria-label="pagination"` on the `<nav>` to distinguish it from main
  navigation.

### 2. Identifying the Current State
- Use `aria-current="page"` on the link for the current page.
- Do NOT use `aria-current` on the `<li>` or the parent `<ul>`.

### 3. Descriptive Labels
Numbers alone are often insufficient for screen reader users. Use hidden text
or `aria-labels` to provide context.

```html
<!-- Recommended Pattern -->
<li>
  <a href="/page-5" aria-label="Go to page 5">5</a>
</li>
<li>
  <a href="/page-6" aria-current="page" aria-label="Page 6, current page">6</a>
</li>
```

### 4. Handling Focus
If the page updates via AJAX (without a full page refresh):
1. **Move Focus:** Programmatically move the user's focus to the top of the new
   results (e.g., the `<h1>` or a results container).
2. **ARIA Live:** Use `aria-live="polite"` on the results container to announce
   the update.

---

## Behavioral Heuristics

- **The Zero State:** If a search returns zero results, hide the pagination
  entirely.
- **The One-Page State:** If all results fit on one page, hide the pagination bar
  to reduce visual noise.
- **Button Disabling:**
  - On Page 1, the "Previous" button should be `disabled` (for `<button>`) or
    lack an `href` (for `<a>`).
  - Use `aria-disabled="true"` to ensure screen readers announce the state.
