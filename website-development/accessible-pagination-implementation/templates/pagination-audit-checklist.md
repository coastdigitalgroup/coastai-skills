# Pagination Accessibility & Usability Audit

Use this checklist to evaluate the accessibility and user experience of a pagination system.

## 1. Semantic Structure
- [ ] Is the pagination wrapped in a `<nav>` element?
- [ ] Does the `<nav>` have a descriptive `aria-label` (e.g., "Pagination")?
- [ ] Are the controls contained within a list (`<ul>` or `<ol>`)?
- [ ] Are numerical links/buttons clearly distinguishable from "Previous/Next" controls?

## 2. ARIA States
- [ ] Is the current page marked with `aria-current="page"`?
- [ ] Do page numbers have descriptive labels (e.g., `aria-label="Go to Page 4"`)?
- [ ] Are disabled controls (like "Previous" on Page 1) marked with `aria-disabled="true"` or the `disabled` attribute?
- [ ] Are decorative elements like ellipses (`...`) hidden from screen readers using `aria-hidden="true"`?

## 3. Keyboard Interaction
- [ ] Can every link/button be reached using the `Tab` key?
- [ ] Is there a clear, high-contrast visual focus indicator for every control?
- [ ] Can controls be activated using `Enter` or `Space`?
- [ ] If pagination uses AJAX, does the focus move to a logical location after the content updates?

## 4. Mobile & Touch
- [ ] Are all touch targets at least 44x44px?
- [ ] Is there sufficient spacing between links to prevent accidental clicks?
- [ ] Does the pagination layout remain functional and overflow-free on small screens (320px)?

## 5. Visual Design
- [ ] Is the contrast ratio for text and icons at least 4.5:1 (WCAG AA)?
- [ ] Is the "Current Page" indicator visually distinct using more than just color (e.g., bold text, border, or background)?
- [ ] If loading states exist, is there a visual and programmatic indicator (e.g., `aria-busy="true"`)?
