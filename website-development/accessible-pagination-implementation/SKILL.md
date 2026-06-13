---
name: accessible-pagination-implementation
description:
  Implement and debug accessible, responsive pagination systems that manage
  focus, communicate state, and provide efficient navigation for large content
  sets.
---

# Accessible Pagination Implementation

## Purpose

The Accessible Pagination Implementation skill provides a technical protocol for
building and auditing navigational controls that divide large content
collections into discrete pages. It ensures that the pagination is navigable via
keyboard, understandable by screen readers, and maintains user orientation
during both static and dynamic (AJAX) content updates.

## Use Cases

- Implementing pagination for search results, product listings, or blog
  archives.
- Building a "Load More" interface with proper focus management and status
  announcements.
- Auditing existing pagination systems for accessibility gaps (e.g., missing
  labels, lost focus).
- Creating responsive pagination that adapts from full desktop views to
  compact mobile views without losing functionality.

## When NOT to Use

- **Small Datasets:** If all items fit on a single page, pagination is
  unnecessary.
- **Infinite Scroll:** While similar in purpose, infinite scroll has distinct
  implementation and accessibility requirements (see `infinite-scroll-implementation`).
- **In-Page Anchor Links:** Use a Table of Contents (`table-of-contents-implementation`)
  for navigating sections within a single long-form page.

## Inputs

1. **Dataset Metadata:** Total number of items and items per page.
2. **Current State:** The active page number.
3. **Navigation Mode:** Is it standard full-page reloads or asynchronous (AJAX)
   updates?
4. **Display Constraints:** Horizontal space available at different breakpoints.

## Outputs

1. **Semantic HTML Structure:** A `<nav>` landmark containing a list of
   interactive page links/buttons.
2. **ARIA State Management:** Proper use of `aria-label`, `aria-current="page"`,
   and `aria-disabled`.
3. **Focus Management Logic:** Scripts to handle focus placement after dynamic
   content updates.
4. **Responsive Strategy:** CSS and/or JS to handle pagination "trimming"
   (ellipses) for different viewports.

## Workflow

### 1. Establish the Semantic Foundation

- Wrap the navigation in a `<nav>` element with a descriptive `aria-label`
  (e.g., `aria-label="Pagination"`).
- Use a `<ul>` for the page links to provide list context and item counts to
  screen readers.
- Use a `<ol>` if the order of pages is particularly significant for the
  context.

### 2. Implement Navigation Controls

- **Standard Pages:** Use links (`<a>`) if the pagination triggers a full page
  reload.
- **AJAX/Dynamic:** Use buttons (`<button>`) if the pagination updates content
  without a page reload.
- **Previous/Next:** Include "Previous" and "Next" controls for linear
  traversal.

### 3. Apply ARIA States

- **Active Page:** Mark the current page link/button with `aria-current="page"`.
- **Labels:** Provide descriptive labels for numerical links (e.g.,
  `aria-label="Go to page 5"`).
- **Disabled State:** For "Previous" on the first page or "Next" on the last,
  use `aria-disabled="true"` and ensure the element is not reachable via `Tab`
  (or use the `disabled` attribute for `<button>`).

### 4. Manage Focus (for AJAX/Dynamic updates)

- After content is updated, move focus to a logical location:
  - The top of the new content container (e.g., a heading).
  - The pagination container itself (if the user needs to continue navigating).
- Avoid leaving focus on a removed element or letting it reset to the `body`.

### 5. Handle Responsive Trimming

- For large page counts, implement a "sliding window" pattern (e.g.,
  `1 ... 4 5 6 ... 20`).
- Use `aria-hidden="true"` on decorative ellipses to prevent screen reader
  clutter.
- Ensure the "compact" mobile view remains functional (at least Prev, Next, and
  current page).

## Decision Rules

- **Link vs. Button:** Use links for URL changes (SEO friendly). Use buttons for
  SPA/AJAX updates where the URL fragment might not change.
- **Numbers vs. Load More:** Use numbered pagination when users need to
  reference specific positions or need to know the total scope. Use "Load More"
  for exploration-focused discovery.
- **Focus Target:** Move focus to the top of the content if the user needs to
  read the results immediately. Keep focus in pagination if they are likely to
  skip through multiple pages quickly.

## Constraints

- **Touch Targets:** Every interactive element must be at least 44x44px.
- **Keyboard Access:** All controls must be reachable via `Tab` and activatable
  via `Enter`/`Space`.
- **Contrast:** Page numbers and controls must meet WCAG AA (4.5:1) contrast
  requirements.

## Non-Goals

- Implementing backend data fetching or API logic.
- Building a full "Infinite Scroll" solution.
- Styling the specific aesthetic theme (colors, fonts).

## Common Failure Patterns

- **Lost Focus:** After an AJAX update, focus disappears or resets, forcing the
  user to re-navigate the entire page.
- **Invisible Active Page:** Relying only on color to indicate the current page
  without using `aria-current`.
- **The "Tab Trap":** Forgetting to disable the "Previous" link on Page 1,
  causing a "dead" click.
- **Ambiguous Labels:** Screen readers announcing only "1, 2, 3" without
  context that these are page numbers.
- **Missing Landmark:** Placing pagination outside a `<nav>` element, making it
  harder to find via screen reader shortcuts.

## Validation Steps

- [ ] **Keyboard Test:** Can you navigate through all pages and controls using
      only the `Tab` key?
- [ ] **Screen Reader Test:** Verify the pagination landmark is announced.
      Check that `aria-current` identifies the active page.
- [ ] **Focus Audit (AJAX):** If content updates dynamically, verify that
      focus is moved to a sensible location (e.g., the top of the results).
- [ ] **Mobile Touch Test:** Verify that all page numbers are easily tappable
      (44x44px) on a mobile device or simulator.
- [ ] **Reduced Motion Check:** If any animations occur during page transitions,
      ensure they respect `prefers-reduced-motion`.
