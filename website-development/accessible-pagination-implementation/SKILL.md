---
name: accessible-pagination-implementation
description:
  Implement and debug accessible, responsive pagination systems that manage
  focus, communicate state to assistive technology, and handle AJAX updates.
---

# Accessible Pagination Implementation

## Purpose

The Accessible Pagination Implementation skill provides a technical framework for
building pagination controls that are usable by everyone. It ensures that
keyboard users and screen reader users can navigate through large datasets
without losing their place, especially when content updates dynamically via AJAX.

## Use Cases

- **Product Listing Pages (PLP):** Navigating through e-commerce catalogs.
- **Search Results:** Traversing through multi-page search outcomes.
- **Data Tables:** Managing large sets of tabular data.
- **Blog Archives:** Paginating through historical posts.

## When NOT to Use

- **Infinite Scroll:** If the UX pattern is to append content as the user scrolls
  (see `infinite-scroll-implementation`).
- **Small Datasets (<12 items):** If all content fits on one or two viewports,
  pagination adds unnecessary friction.
- **Multi-step Forms:** Use the `multi-step-form-implementation` skill for
  sequential data entry flows.

## Inputs

1. **Current Page:** The page index the user is currently viewing.
2. **Total Pages:** The total number of available pages.
3. **Data Fetching Method:** Static (page reload) vs. Dynamic (AJAX/Fetch).
4. **Viewport Width:** To determine how many page numbers to display.

## Outputs

1. **Semantic HTML:** Correct use of `<nav>`, `<ul>`, and `aria-current`.
2. **Focus Management Logic:** Scripts to move focus when AJAX content updates.
3. **ARIA Metadata:** Descriptive labels for links and navigation landmarks.
4. **Responsive Styling Hooks:** CSS for handling collapsed states on mobile.

## Workflow

### 1. Define the Semantic Landmark

- Wrap the pagination controls in a `<nav>` element.
- Provide a unique `aria-label` (e.g., `aria-label="Pagination"` or `aria-label="Search results pagination"`) to distinguish it from main navigation.

### 2. Structure the Navigation List

- Use a `<ul>` and `<li>` for the page links to allow screen readers to announce the number of items.
- Use `<a>` tags for static pagination (reloading the page).
- Use `<button>` tags for AJAX-based pagination (changing state without navigation).

### 3. Communicate Current State

- Apply `aria-current="page"` to the link or button representing the active page.
- Visually distinguish the active page (e.g., with a background color and bold text).
- Ensure the "Previous" and "Next" buttons are programmatically disabled (`aria-disabled="true"` or `disabled` for buttons) when on the first or last page.

### 4. Implement Focus Management (for AJAX)

- **Scenario:** User clicks "Page 2" and the list updates via AJAX.
- **Problem:** Focus remains on the "Page 2" button, but the content below it changed, or the button itself might be recreated/moved.
- **Solution:** After the content updates, move focus to the top of the new content (e.g., a heading with `tabindex="-1"`) or the pagination container itself.

### 5. Handle Responsive Behavior

- On mobile, reduce the number of visible page numbers (e.g., show only Current, Previous, and Next).
- Ensure all tap targets remain at least 44x44px.

## Decision Rules

- **Link (`<a>`) vs. Button (`<button>`):**
  - Use `<a>` if the pagination triggers a full page reload or a URL hash change.
  - Use `<button>` if the pagination is handled entirely by JavaScript without changing the URL.
- **Static vs. AJAX:**
  - Use **Static** for SEO-critical content and simple architectures.
  - Use **AJAX** for app-like experiences and to preserve state (like scroll position) during navigation.
- **Number of Pages to Show:**
  - Use a "Sliding Window" (e.g., 2 pages before and after current) for lists with 10+ pages to avoid layout overflow.

## Constraints

- **Labeling:** Every page link must have an accessible name (e.g., `aria-label="Go to page 5"`).
- **Keyboard Navigation:** All elements must be reachable via `Tab` and activatable via `Enter`/`Space`.
- **Visibility:** Current page indicator must be high-contrast (4.5:1 minimum).

## Non-Goals

- Implementing the backend API for data fetching.
- Designing the specific visual aesthetic (branding).
- Handling "Load More" patterns (see `infinite-scroll-implementation`).

## Common Failure Patterns

- **Missing `aria-label` on Nav:** Screen readers just say "Navigation," which is ambiguous.
- **Focus Loss on AJAX:** The user clicks "Next," the content updates, and the focus disappears to the top of the `<body>`.
- **Silent Errors:** AJAX failure happens but is not announced to the user (use `aria-live`).
- **Tiny Click Targets:** Small numbers that are hard to hit on mobile.
- **Implicit "Current" State:** Only using color to indicate the current page without `aria-current`.

## Validation Steps

- [ ] **Keyboard Test:** Can I navigate and activate all links using only the keyboard?
- [ ] **Focus Management Check (AJAX):** Does focus move to a logical location after the content updates?
- [ ] **Screen Reader Test:** Does it announce "Current Page" for the active item? Is the navigation landmark labeled?
- [ ] **Tap Target Check:** Are all links/buttons at least 44x44px?
- [ ] **Disabled State Check:** Are "Previous/Next" correctly disabled on the first/last pages?
