# Accessibility Checkpoints for Pagination

## 1. Nav Landmark (WCAG 1.3.1)
- The pagination controls must be wrapped in a `<nav>` element.
- If there are multiple `<nav>` elements, use `aria-label` or `aria-labelledby` to distinguish them (e.g., `<nav aria-label="Search results pagination">`).

## 2. Current Page (WCAG 4.1.2)
- Use `aria-current="page"` on the link or button for the active page.
- Do not rely solely on color or bold text; screen readers must programmatically identify the current state.

## 3. Keyboard Access (WCAG 2.1.1)
- All page links and "Previous/Next" controls must be reachable via the `Tab` key.
- Custom controls must respond to `Enter` and `Space`.

## 4. Descriptive Labels (WCAG 2.4.4)
- Page numbers should have descriptive labels for screen readers. Instead of "5," use `aria-label="Go to page 5"`.
- This provides context when the user navigates through the links quickly.

## 5. Focus Management (AJAX only)
- When content updates without a page reload, focus must be handled explicitly.
- Move focus to the top of the newly updated content or a container that gives the user context.
- Avoid leaving focus on a button that might disappear or be disabled after the update.

## 6. Contrast (WCAG 1.4.3)
- The "Current Page" indicator must meet a contrast ratio of at least 4.5:1 against the background.
- Interactive elements (links/buttons) should have clear `:focus` and `:hover` indicators.

## 7. Touch Targets (WCAG 2.5.5 - AAA / Success Criterion 2.5.8 - AA)
- Ensure all pagination links and buttons have a minimum size of 44x44px to accommodate touch users and those with motor impairments.
