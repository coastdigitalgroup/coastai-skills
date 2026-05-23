# Example: Search Results Pagination Breakdown

This example demonstrates the application of the Pagination System to a high-volume
e-commerce search results page.

## The Scenario

An electronics retailer has 1,200 products in the "Laptops" category. At 24
items per page, the site requires 50 pages of results.

## Desktop Composition (1200px+)

On desktop, we show a full range of controls to allow for quick jumps between
the beginning, middle, and end of the results.

### Visual Breakdown
`[ < Prev ] [ 1 ] [ ... ] [ 24 ] [ 25 ] [ 26 ] [ ... ] [ 50 ] [ Next > ]`

- **Anchor:** The "Previous" and "Next" buttons provide the primary navigation
  path.
- **Context:** The current page (25) is highlighted with a primary color
  background and white text.
- **Range:** Ellipses are used to hide pages 2-23 and 27-49, keeping the
  navigational bar compact.

### Implementation Logic
- **Interaction:** Hovering over any number adds a subtle background tint
  (from `interactive-state-system`).
- **Accessibility:**
  - `<nav aria-label="Product results pagination">`
  - Current link: `<a href="..." aria-current="page">25</a>`
  - Next link: `<a href="..." aria-label="Go to next page">Next</a>`

## Mobile Composition (320px - 599px)

On mobile, horizontal space is limited. We switch to a "Status + Control"
pattern to ensure large tap targets and zero overflow.

### Visual Breakdown
`[ < Prev ]  Page 25 of 50  [ Next > ]`

- **Simplification:** All individual page numbers are removed from the view.
- **Status:** The text "Page 25 of 50" provides immediate orientation without
  requiring complex interactions.
- **Tap Targets:** The "Prev" and "Next" buttons are expanded to 48px height
  and roughly 25% of the screen width each, ensuring easy thumb access.

## Success Metrics

1. **Orientation:** 100% of tested users can identify which page they are on
   within 2 seconds.
2. **Accessibility:** Navigable by keyboard and screen readers without
   repetitive announcements.
3. **Performance:** No layout shifts occur when the pagination bar is rendered.
