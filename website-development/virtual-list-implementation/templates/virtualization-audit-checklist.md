# Virtualization Implementation Audit Checklist

Use this checklist to audit any virtualized list or grid implementation to ensure maximum scroll performance, visual stability, and full keyboard/assistive accessibility.

---

## 1. Performance & Rendering Pipeline
- [ ] **Constant DOM Node Count:** In the DevTools **Elements** panel, verify that the total count of rendered list-item elements remains constant while scrolling from top to bottom (only item properties or innerHTML change).
- [ ] **GPU Compositor Elevation:** Ensure active virtual items utilize `transform: translateY()` or `transform: translate3d()` for positioning instead of traditional `top`/`left` properties.
- [ ] **will-change Hints:** Verify that virtual items have `will-change: transform` declared in CSS to minimize browser repaint cycles.
- [ ] **Layout Containment:** Confirm the scrollable viewport container has `contain: layout size style` or `contain: content` declared to avoid global reflows when items update.
- [ ] **Coalesced DOM Updates:** Verify that scroll event triggers are throttled and batch-written inside `requestAnimationFrame()` calls rather than running layout-thrashing code immediately.
- [ ] **Passive Event Listeners:** Confirm that the scroll event listener is registered as `passive`:
  ```javascript
  element.addEventListener('scroll', handler, { passive: true });
  ```

---

## 2. Mathematical Stability (Visual Polish)
- [ ] **Zero Scrollbar Collapsing:** Ensure there is a robust, full-height "Runway" or spacer element inside the viewport simulating the total height of all items ($N \times \text{height}$) so the scrollbar remains natural and interactive.
- [ ] **Buffer Mitigation:** Verify there is an active off-screen render buffer (e.g., 3–5 items rendered above and below the viewport) to prevent "white flashing" or blank spaces during rapid swipe scrolling.
- [ ] **Smooth Scroll Anchoring:** For dynamic variable height items, confirm that an anchoring algorithm compensates for height discrepancies of off-screen elements. Verify that the scrollbar does not stutter, skip, or jitter during slow scrolls.
- [ ] **Resize Resiliency:** Verify that viewport sizing is monitored via `ResizeObserver` or window handlers, and coordinates are updated immediately when the container changes size.

---

## 3. Keyboard & Screen Reader Accessibility (WCAG Compliance)
- [ ] **Correct Semantic Markup:**
  - Viewport container possesses `role="list"`, `role="grid"`, or `role="feed"`.
  - Active item elements possess `role="listitem"`, `role="row"`, or `role="cell"`.
- [ ] **Position and Size Announcements:** Every rendered item explicitly possesses:
  - `aria-setsize="totalItemCount"`
  - `aria-posinset="1BasedItemIndex"`
- [ ] **Roving Tabindex Integration:** Confirm only the currently active focused item possesses `tabindex="0"`, while all other items have `tabindex="-1"`. This prevents keyboard traps.
- [ ] **Rogue Focus Rescue:** Verify that when a focused item is scrolled out of view and unmounted, programmatic focus is safely handled (e.g., moved to its nearest rendered neighbor or parent viewport) so that focus is never lost to the `body` root.
- [ ] **Arrow Key Navigation:** Keyboard-only users can navigate items using `ArrowDown`, `ArrowUp`, `Home`, and `End` keys.
- [ ] **Viewport Auto-Scroll:** Moving focus with keyboard arrow keys automatically triggers viewport scrolling if the focused element is near or outside the visible window boundaries.

---

## 4. Mobile & Touch Integration
- [ ] **Touch Inertia:** Confirm local scroll containers have `-webkit-overflow-scrolling: touch` declared to ensure fluid inertial scrolling on iOS devices.
- [ ] **Dynamic Virtual Height Resize:** On mobile browsers, test scrolling with virtual keyboards popping up. Verify the container recalculates its active heights correctly.
- [ ] **Minimum Touch Targets:** Verify interactive elements within virtualized items are at least 44x44px (WCAG 2.1 Pointer Target Spacing).
