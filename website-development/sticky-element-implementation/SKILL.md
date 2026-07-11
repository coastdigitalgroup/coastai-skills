---
name: sticky-element-implementation
description:
  Implement and debug elements that stick to the viewport during scroll.
  Includes "stuck" state detection, fixing the overflow trap, and managing
  stacking contexts for sticky headers, sidebars, and footers.
---

# Sticky Element Implementation

## Purpose

The Sticky Element Implementation skill provides a technical protocol for
building and debugging elements that remain visible within the viewport as the
user scrolls. It addresses common hurdles like the "overflow trap," stacking
context conflicts, and the lack of a native "is-stuck" CSS state.

## Use Cases

- Implementing sticky site headers that remain at the top of the viewport.
- Creating sticky sidebars for navigation or Table of Contents that follow
  long-form content.
- Building sticky table headers or columns for large data sets.
- Implementing "sticky footers" for primary actions (CTAs) on mobile.
- Debugging why `position: sticky` is failing to work in a complex layout.

## When NOT to Use

- **Fixed Overlays:** Use `position: fixed` for elements that should be removed
  from the document flow entirely and fixed relative to the viewport (like
  modals or cookie banners).
- **Infinite Scroll Containers:** `position: sticky` can be unpredictable
  inside containers with virtualized scrolling or complex dynamic heights.
- **Critical Content on Small Viewports:** Avoid sticky elements that consume
  significant vertical space on mobile devices, as they reduce the usable reading
  area.

## Inputs

1. **Target Element:** The DOM element to be made sticky.
2. **Sticky Boundary:** The container that defines the start and end points of
   the stickiness (the parent element).
3. **Thresholds:** The offset from the viewport edge (e.g., `top: 0` or
   `bottom: 20px`).
4. **Ancestor Styles:** The `overflow` and `display` properties of all parent
   elements.

## Outputs

1. **Declarative CSS:** Implementation using `position: sticky` and positioning
   properties.
2. **Stuck-State Logic:** JavaScript (using `IntersectionObserver`) to toggle
   classes when the element enters its sticky state.
3. **Layout Fixes:** Adjustments to ancestor elements to resolve "overflow
   traps."

## Workflow

### 1. Apply Basic Stickiness

- Apply `position: sticky` to the target element.
- Set at least one threshold property (`top`, `bottom`, `left`, or `right`).
- _Note:_ For a sticky header, use `top: 0`.

### 2. Verify the Container Height

- Ensure the parent container is taller than the sticky element. A sticky
  element cannot stick if its parent is the same height as itself.
- Verify that the parent doesn't have `display: flex` or `grid` in a way that
  collapses the child's height unless `align-self: flex-start` (or similar) is
  used.

### 3. Check for the "Overflow Trap"

- Inspect every ancestor of the sticky element.
- If any ancestor has `overflow: hidden`, `overflow: auto`, or `overflow: scroll`
  (other than the document/scrolling container), `position: sticky` will likely
  fail.
- _Fix:_ Remove the overflow property or move the sticky element outside the
  restrictive ancestor.

### 4. Implement "Stuck" State Detection (Optional)

- Since CSS has no `:stuck` pseudo-class, use the "Sentinel Pattern."
- Place a 0-height element (the sentinel) immediately before the sticky element.
- Use `IntersectionObserver` to monitor the sentinel. When the sentinel exits
   the top of the viewport, the element is "stuck."

### 5. Manage Stacking Contexts

- Assign a `z-index` to the sticky element to ensure it stays above other
  content.
- Verify that no parent stacking context is "trapping" the sticky element behind
  other page elements.

## Decision Rules

- **Sticky vs. Fixed:** Use `sticky` when the element should scroll with its
  parent but stop at a viewport edge. Use `fixed` when the element should ignore
  its parent's scroll and stay at a viewport position relative to the window.
- **Top vs. Bottom:** Use `top` for headers and navigation. Use `bottom` for
  mobile CTAs or status bars.
- **IntersectionObserver vs. Scroll Event:** Always prefer `IntersectionObserver`
  for state detection to avoid main-thread performance issues associated with
  scroll listeners.

## Constraints

- **Accessibility:** Sticky headers must not obscure focused elements. Use
  `scroll-margin-top` on anchor targets to prevent the header from covering the
  content.
- **Browser Support:** `position: sticky` is widely supported, but check for
  table-specific issues in older versions of Safari and Firefox.
- **Performance:** Avoid placing complex animations or heavy shadows on elements
  that are currently in a "stuck" state to maintain 60fps scrolling.

## Non-Goals

- General CSS layout (Flexbox/Grid) beyond what is needed for stickiness.
- Building parallax scrolling effects.
- Managing "fixed" position modals.

## Common Failure Patterns

- **The Overflow Trap:** An ancestor has `overflow: hidden`, killing the sticky
  behavior.
- **Missing Threshold:** Forgetting to set `top: 0` or similar; `position: sticky`
  does nothing without a threshold.
- **Parent Height Match:** The parent is the same height as the sticky element,
  leaving no room for the element to "slide."
- **Stacking Conflict:** The sticky element has a high `z-index` but is inside
  a parent with a lower `z-index` stacking context, causing it to hide behind
  other content.
- **Table Collapse:** Using `border-collapse: collapse` on a table can cause
  sticky headers to lose their borders.

## Validation Steps

- [ ] **Scroll Test:** Manually scroll the page and confirm the element sticks
      and un-sticks at the correct boundaries.
- [ ] **Overflow Audit:** Check DevTools for any ancestor with `overflow: hidden`.
- [ ] **"Stuck" Class Verification:** If using the sentinel pattern, verify the
      CSS class is added/removed exactly when the element hits the threshold.
- [ ] **Focus Management:** Tab through the page and ensure the sticky element
      doesn't obscure the currently focused element (test with `scroll-margin-top`).
- [ ] **Table Border Check:** If sticky table headers are used, verify that
      borders remain visible during scroll.
