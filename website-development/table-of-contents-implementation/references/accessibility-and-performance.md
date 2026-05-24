# Table of Contents: Accessibility and Performance

## Accessibility Requirements (WCAG 2.2)

### 1. Navigational Landmarks

The Table of Contents should be wrapped in a `<nav>` element. This allows screen
reader users to quickly jump to it using landmark navigation.

- **Requirement:** Provide an `aria-label="Table of Contents"` if there are
  multiple `<nav>` elements on the page.

### 2. Indicating the Current Location

As the user scrolls or clicks a link, the "active" state must be communicated
programmatically.

- **Requirement:** Use `aria-current="location"` on the link corresponding to the
  visible section.
- **Note:** Avoid using `aria-current="page"` as the user is still on the same
  URL/page; "location" or "true" is more accurate for in-page fragments.

### 3. Keyboard Accessibility

- **Requirement:** All links must be reachable via the `Tab` key.
- **Requirement:** Focus indicators must be clearly visible.
- **Requirement:** Smooth scrolling must be disabled for users who prefer
  reduced motion (`prefers-reduced-motion: reduce`).

### 4. Skip Links

If the Table of Contents is long (e.g., 20+ links), ensure it doesn't block
keyboard users from reaching the main content. Usually, the ToC follows the
introductory paragraph or is in a sidebar, which mitigates this.

## Performance Heuristics

### 1. IntersectionObserver vs. Scroll Event

- **IntersectionObserver (Recommended):** Browser-native, runs on the compositor
  thread where possible, and only fires when an element crosses a threshold.
- **Scroll Event (Legacy):** Fires dozens of times per second. Requires
  throttling/debouncing and manual `getBoundingClientRect()` calls, which
  trigger layout thrashing.

### 2. Layout Thrashing

Avoid reading `offsetTop` or `offsetHeight` of many elements inside a loop
during a scroll event. If you must use scroll listeners, "cache" these values
on page load or resize.

### 3. CSS `scroll-behavior: smooth`

Native CSS smooth scrolling is highly performant as the browser handles the
interpolation. Avoid JavaScript-based smooth scroll libraries unless you need
extremely specific easing functions or support for very old browsers.

## Implementation Gotchas

- **Fragment Identifiers:** Ensure IDs start with a letter (e.g., `id="section1"`
  not `id="1"`) for better compatibility with older browsers and CSS selectors.
- **Dynamic Content:** If your content is loaded via AJAX, remember to
  re-initialize the `IntersectionObserver` or use a `MutationObserver` to track
  new headings.
- **URL Hashes:** When the page loads with a hash (e.g., `site.com/#setup`), the
  `IntersectionObserver` might not trigger immediately. Manually check
  `window.location.hash` on load to set the initial active state.
