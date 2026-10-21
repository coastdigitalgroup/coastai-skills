# CSS Containment & Off-Screen Rendering Audit Checklist

Use this audit checklist to evaluate, debug, and verify CSS Containment (`contain`) and off-screen rendering (`content-visibility`) implementations across frontend components and complex pages.

---

## 1. Structural & Sizing Audits

- [ ] **Zero-Height Collapse Inspection:**
  - Verify that any element declaring `contain: size` or `contain: strict` has an explicit `height` and `width` (or `aspect-ratio`).
  - Confirm in DevTools that the element has non-zero computed dimensions.

- [ ] **Inline-Size Scope Verification:**
  - If using `contain: inline-size` for 1D layout containment, ensure the element's parent container or flex/grid layout constrains its width.
  - Verify that element height remains fluid and auto-expands without clipping text content.

- [ ] **Flex/Grid Intrinsic Basis Check:**
  - Confirm that flex items using `contain: layout` or `contain: size` interact correctly with `flex-basis: auto` or explicit `flex` sizing rules.

---

## 2. Overflow, Clipping & Stacking Context Audits

- [ ] **Child Dropdown & Tooltip Clipping:**
  - Trigger all interactive tooltips, custom context menus, and select dropdowns inside elements with `contain: paint` or `contain: strict`.
  - Confirm no dropdown or action menu is cut off or visually clipped by container borders.
  - *Remediation:* Elevate floating menus to the top-layer using `<div popover>` or `<dialog>`, or use CSS Anchor Positioning with `position: fixed`.

- [ ] **Fixed Position Trapping Audit:**
  - Search child elements for `position: fixed`.
  - Confirm whether the child is intended to position relative to the global viewport or relative to the contained parent.
  - If global viewport positioning is required, verify that the fixed element is rendered outside the contained subtree or uses native top-layer APIs.

- [ ] **Stacking Context Isolation Check:**
  - Inspect `z-index` stacking behavior on child elements within contained components.
  - Confirm that internal child `z-index` values do not inadvertently overlap adjacent sibling cards or global navigation headers.

---

## 3. Off-Screen Rendering & Scroll Performance Audits (`content-visibility`)

- [ ] **`contain-intrinsic-size` Accuracy Test:**
  - Verify that all elements using `content-visibility: auto` define a realistic `contain-intrinsic-size` (e.g., `contain-intrinsic-size: auto 250px`).
  - Scroll rapidly up and down long feeds and monitor the browser scrollbar thumb.
  - Confirm that the scrollbar does not jump, stretch, or jitter abruptly as off-screen elements transition into view.

- [ ] **Keyboard Focus & Off-Screen Navigation:**
  - Press `Tab` through a list containing `content-visibility: auto` items.
  - Confirm that when an off-screen item receives focus, the browser immediately renders the subtree and scrolls it smoothly into view without focus loss.

- [ ] **Search in Page (`Ctrl+F` / `Cmd+F`) Verification:**
  - Use native browser search (`Cmd+F`) to find text located inside off-screen items using `content-visibility: auto`.
  - Confirm that the browser successfully locates the text and expands the off-screen element.

---

## 4. Performance Metrics & DevTools Verification

- [ ] **Layout Invalidation Scope Test:**
  - Open Chrome DevTools Performance panel and record a profile while mutating DOM content inside a contained element.
  - Inspect the "Recalculate Style" and "Layout" events.
  - Confirm that layout invalidation is restricted exclusively to the target element's subtree and does not trigger global document layout.

- [ ] **INP (Interaction to Next Paint) Latency Check:**
  - Measure INP during high-frequency user interactions (e.g., clicking refresh buttons or toggling list filters inside dashboard cards).
  - Confirm INP remains within the "Good" threshold (<= 200ms).

- [ ] **60fps/120fps Scrolling Frame Rate:**
  - Enable Rendering -> "FPS Meter" in Chrome DevTools.
  - Scroll through contained lists/dashboard grids and verify zero frame drops or long frame tasks (>50ms).
