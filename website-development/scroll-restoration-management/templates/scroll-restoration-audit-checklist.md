# Scroll Restoration Audit & Verification Checklist

Use this audit checklist to inspect, verify, and debug scroll restoration behavior across client-side SPAs, dynamic content hydration, and mobile web browsers.

---

## 1. Native Configuration & Setup

- [ ] **Manual Scroll Restoration Mode Enabled:** Is `history.scrollRestoration` explicitly set to `'manual'` during application initialization?
- [ ] **History Key Association:** Does every `window.history` state entry contain a unique, non-colliding `key` property (e.g. `history.state.key`)?
- [ ] **Session Storage Prefixing:** Are stored scroll positions namespaced in `sessionStorage` with a clean prefix (e.g. `spa_scroll_key_123`) to prevent key collisions?
- [ ] **Quota Management:** Is there an entry pruning routine to keep total stored history scroll keys under 50 items?

---

## 2. History Traversal & Popstate Behavior

- [ ] **Push Navigation Reset:** Does clicking a new link or triggering `router.push()` correctly scroll the viewport to the top `(0, 0)`?
- [ ] **Popstate Restoration:** Does triggering browser "Back" or "Forward" restore the exact previous scroll coordinates?
- [ ] **No Top-Flash:** Does back navigation avoid flashing at `(0, 0)` before jumping down to target coordinates?
- [ ] **No Clamping On Reduced Height:** If target scroll target is `Y = 2200px`, does the manager defer `window.scrollTo()` until the dynamic DOM has finished hydrating and expanding?

---

## 3. Sub-Container & Layout Support

- [ ] **Sub-Container Tracking:** Are scrollable sidebars, filter drawers, or tab panels marked with `data-scroll-container` and `data-scroll-id`?
- [ ] **Sub-Container Restoration:** On back-navigation, do nested containers return to their exact `scrollTop` and `scrollLeft` positions?
- [ ] **Sticky Header Offset:** If a fixed or sticky header is present, is the restored target element visible below the header clearance area?
- [ ] **Reduced Motion Support:** Does scroll restoration respect `prefers-reduced-motion: reduce` by using instant scroll instead of smooth animations?

---

## 4. Mobile & Touch Viewport Rules

- [ ] **iOS Safari Address Bar Shift:** Does restoring scroll on iOS Safari account for dynamic address bar expanding/collapsing?
- [ ] **Virtual Keyboard Inertia:** Is scroll restoration delayed or bypassed when an active input field triggers the soft keyboard?
- [ ] **Touch Drag Stability:** Does restoring scroll avoid triggering accidental touch gesture events on interactive elements?

---

## 5. Console & Diagnostic Rules

- [ ] **Zero Unhandled Promise Rejections:** Does `waitForTargetHeight()` resolve cleanly even if network timeout is reached?
- [ ] **No Forced Reflow Loops:** Are DOM reads (`scrollX`, `scrollY`, `offsetHeight`) decoupled from writes during passive scroll event listeners?
- [ ] **Clean Destruction:** Does calling `scrollManager.destroy()` clean up listeners and revert `history.scrollRestoration` to `'auto'`?
