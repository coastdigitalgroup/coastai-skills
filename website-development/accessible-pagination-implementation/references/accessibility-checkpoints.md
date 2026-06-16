# Pagination Accessibility Checkpoints

Follow these checkpoints to ensure your pagination implementation meets WCAG 2.1
standards.

## 1. Perceivable

- **[ ] Semantic Landmark (WCAG 1.3.1):** Use a `<nav>` element with an
  `aria-label` to identify the pagination block.
- **[ ] Information Relationship (WCAG 1.3.1):** Use a list (`<ul>`, `<li>`) to
  group page links so screen readers can announce "List, 5 items."
- **[ ] Contrast (WCAG 1.4.3):** Ensure all text and the "Current Page"
  indicator meet a minimum contrast ratio of 4.5:1.
- **[ ] Not Color Alone (WCAG 1.4.1):** Do not use color as the only way to
  identify the current page. Use bold text, icons, or borders.

## 2. Operable

- **[ ] Keyboard Access (WCAG 2.1.1):** All pagination items must be reachable
  via the `Tab` key and activatable via `Enter` or `Space`.
- **[ ] Focus Visibility (WCAG 2.4.7):** Ensure there is a highly visible focus
  ring on all links and buttons.
- **[ ] Touch Targets (WCAG 2.5.5):** All interactive items must be at least
  44x44px to accommodate users with limited motor skills.
- **[ ] Meaningful Labels (WCAG 2.4.6):** Use `aria-label` on links to provide
  context (e.g., "Go to Page 4" instead of just "4").

## 3. Understandable

- **[ ] Current State (WCAG 4.1.2):** Apply `aria-current="page"` to the link or
  button for the current page.
- **[ ] Dynamic Feedback (WCAG 4.1.3):** If using AJAX, use an `aria-live`
  region to announce when content has updated (e.g., "Page 2 loaded").

## 4. Robust

- **[ ] Correct Controls:** Use `<a>` tags for navigation that changes the URL
  and `<button>` tags for actions that don't (AJAX updates).
- **[ ] Focus Management:** When content updates via AJAX, move focus to the
  top of the new content container to prevent "focus loss."
