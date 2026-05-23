---
name: pagination-system
description:
  Design and implement a systematic framework for navigating large collections of
  content, ensuring clear orientation, accessibility, and efficient traversal.
---

# Pagination System

## Purpose

The Pagination System skill provides a methodology for designing the interface
that divides large datasets into discrete pages. It ensures that users can
traverse long lists of items (products, search results, articles) while
maintaining a clear sense of "where they are" and "how much content remains." A
robust pagination system balances navigational precision with simplicity,
minimizing cognitive load and preventing user disorientation.

## Use Cases

- Designing search results pages for e-commerce or directory sites.
- Organizing long blog or news archives.
- Implementing "Load More" vs. traditional numbered pagination for content hubs.
- Creating navigation for data-heavy dashboard tables or logs.
- Optimizing multi-page forms or step-based wizards where individual sections
  are treated as distinct views.

## When NOT to Use

- **Small Datasets (<12 items):** If all content fits comfortably on one or two
  screens, pagination adds unnecessary clicks and friction.
- **Infinite Scroll Contexts:** Where the user is exploring discovery-heavy
  social feeds or news streams where specific page addresses aren't important
  (use `infinite-scroll-implementation` instead).
- **Single narrative Content:** For articles or stories that follow a linear
  flow where "Previous/Next" links are sufficient.

## Inputs

1. **Total Item Count:** How many total items are in the collection?
2. **Items Per Page:** What is the standard density (e.g., 12, 24, 48 items)?
3. **Current Page Context:** Which page is the user currently viewing?
4. **Display Constraints:** How much horizontal space is available for the
   pagination bar (from `responsive-grid-system`)?

## Outputs

1. **Pagination Anatomy Spec:** Defined visual styles for Page Numbers,
   Previous/Next buttons, and "Jump" controls (ellipses).
2. **State Matrix:** Visual treatments for Default, Current, Hover, Focus, and
   Disabled (e.g., "Previous" button on Page 1) states.
3. **Responsive Strategy:** A plan for how the pagination bar collapses from
   Desktop (full range) to Mobile (compact view).
4. **Accessibility Map:** Explicit definitions for ARIA roles, labels, and
   keyboard interaction patterns.

## Workflow

### 1. Define the Range Strategy

Determine how many page numbers to show at once based on total volume:

- **Simple (3-5 Pages):** Show all page numbers.
- **Moderate (6-10 Pages):** Show first, last, and a window around the current
  page.
- **Complex (10+ Pages):** Use ellipses (`...`) to represent skipped ranges
  (e.g., `1 ... 4 5 6 ... 20`).

### 2. Design the Navigation Controls

Establish the visual hierarchy of the pagination bar:

- **Primary Actions:** Previous and Next buttons should be clearly visible and
  situated at the ends of the bar.
- **Current Page Indicator:** Use a high-contrast style (background color or
  heavy border) to make the current page immediately obvious.
- **Page Numbers:** Ensure they look like interactive elements (e.g., using the
  `interactive-state-system`).

### 3. Apply Fluid Spacing and Sizing

Use the `fluid-spacing-system` to ensure targets are usable:

- **Tap Targets:** Every page number and button must be at least 44x44px.
- **Internal Gaps:** Use consistent spacing (e.g., `--space-xs`) between page
  numbers to avoid misclicks.

### 4. Establish Accessibility (WCAG AA)

- **Landmark:** Wrap the pagination in a `<nav>` element with
  `aria-label="pagination"`.
- **Current Page:** Use `aria-current="page"` on the active page link.
- **Disabled States:** Ensure the "Previous" button is visually and
  programmatically disabled (e.g., `aria-disabled="true"`) when on the first
  page.
- **Keyboard Path:** Users must be able to `Tab` through each page number and
  control.

### 5. Plan Responsive Adaptations

Map the transition from desktop to mobile:

- **The Paring Rule:** On mobile, hide most page numbers and only show
  "Previous", "Next", and the current status (e.g., "Page 4 of 20").
- **Visual Scale:** If page numbers must remain, reduce the "window" to just
  the current page and its immediate neighbors (e.g., `1 ... 4 ... 20`).

## Decision Rules

- **Numbers vs. Load More:** Use numbers when users need to bookmark or share
  specific results (e.g., "Check page 4"). Use "Load More" when the goal is
  prolonged discovery and comparison.
- **The "7-Item" Max:** On desktop, avoid showing more than 7-9 items in the
  pagination bar (including ellipses and buttons) to keep the layout clean.
- **Predictability:** Always keep "Previous" on the left and "Next" on the
  right. Never hide these buttons; just disable them when they are not
  applicable.
- **Immediate Feedback:** Clicking a page number should immediately scroll the
  user to the top of the content list or provide a clear "loading" state.

## Constraints

- **Accessibility:** Pagination must be keyboard navigable and screen-reader
  friendly. Labels must be descriptive (e.g., "Go to page 5" instead of just
  "5").
- **Responsiveness:** The pagination bar must never cause horizontal overflow
  or overlap other UI elements.
- **Visual Hierarchy:** The pagination should be visually distinct from the
  content but not more prominent than the content itself.

## Common Failure Patterns

- **Tiny Tap Targets:** Small, clustered numbers that are impossible to tap
  accurately on mobile.
- **Invisible Active State:** Users not knowing which page they are on because
  the "Active" style is too subtle.
- **Broken Keyboard Loop:** Forgetting to handle focus when the page content
  updates via AJAX (the user should be moved to the top of the results).
- **The "Mobile Explosion":** Trying to show 10 page numbers on a mobile screen,
  causing horizontal scrolling or layout breakage.
- **Vague Labels:** Only using numbers without `aria-labels`, making it hard for
  screen reader users to understand the context.

## Validation Criteria

- [ ] Current page is visually distinct and has `aria-current="page"`.
- [ ] Navigation is wrapped in a `<nav>` with a descriptive `aria-label`.
- [ ] Tap targets are at least 44x44px.
- [ ] Disabled states (Previous on Page 1, Next on Last Page) are clear and
      programmatically defined.
- [ ] Responsive behavior is defined (compact view for mobile).
- [ ] Keyboard users can navigate the entire pagination bar.
- [ ] Ellipses are used correctly for large ranges.
