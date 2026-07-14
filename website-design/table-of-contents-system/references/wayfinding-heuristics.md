# Reference: Wayfinding Heuristics & Scroll-Spy Behavior

This reference defines the technical and behavioral standards for implementing
high-performance in-page navigation.

## 1. The Scroll-Spy Algorithm

A common mistake is triggering the "Active" state based on the exact center of
the viewport. Instead, use these heuristics:

- **The Threshold:** Trigger the active state when a heading is between
  `50px` and `150px` from the top of the viewport.
- **Top Priority:** If the user is at the very top of the page, the first
  item in the ToC must always be active.
- **Bottom Priority:** If the user is at the very bottom of the page (e.g., in
  the footer), the last item in the ToC should remain active.
- **The "IntersectionObserver" Rule:** Use the `IntersectionObserver` API for
  performance. Set a `rootMargin` of `-10% 0px -80% 0px` to create a narrow
  "active band" at the top of the screen.

## 2. Smooth Scrolling & Focus

Jumping to a section can be disorienting. Follow these rules to maintain
spatial awareness:

- **Speed:** The scroll should take between `300ms` and `600ms`. Too fast feels
  like a cut; too slow feels sluggish.
- **Easing:** Use `ease-in-out` or `cubic-bezier(0.42, 0, 0.58, 1)`.
- **Focus Management:** When a user clicks a ToC link, the browser's focus
  should move to the target heading. Use `tabindex="-1"` on headings if
  necessary to ensure they can receive focus programmatically.

## 3. URL Hash and History

ToC navigation should be shareable and "reversible."

- **State Persistence:** Updating the `window.location.hash` allows users to
  bookmark specific sections.
- **The "Back" Button:** Ensure that clicking the browser's "Back" button
  returns the user to the previous section they were viewing or the top of the
  page, rather than exiting the site entirely.

## 4. Accessibility (WCAG 2.2 Standards)

- **2.4.11 Focus Not Obscured:** If the ToC or the page header is sticky, it
  must never obscure the focus indicator of the target heading or the link
  itself.
- **1.3.1 Info and Relationships:** Indentation in the ToC must be
  supplemented by proper list nesting (`<ol>` within `<li>`) so screen readers
  convey the hierarchy.
- **4.1.2 Name, Role, Value:** Use `aria-current="location"` to programmatically
  identify the active section. Do not rely on color/bolding alone.
