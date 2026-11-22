# Pointer Events and Hit-Testing Audit Checklist

Use this checklist during development, QA testing, and accessibility code reviews to verify correct hit-testing pass-throughs, continuous pointer capture, touch target accessibility, and hit-stack hierarchy.

---

## 1. Floating Overlays & Pass-Through Layers

- [ ] **Full-Bleed Overlay Pass-Through:**
  - [ ] Are fixed/absolute full-bleed containers (HUDs, floating action wrappers, toast containers) configured with `pointer-events: none`?
  - [ ] Can users hover, click, select text, and scroll content directly beneath transparent regions of the overlay?

- [ ] **Child Control Interactivity:**
  - [ ] Are buttons, links, search inputs, and close controls inside `pointer-events: none` containers explicitly restored using `pointer-events: auto`?
  - [ ] Do tooltips or hover previews anchored within floating overlays register mouse entrance and exit events cleanly?

- [ ] **Keyboard & Focus Parity:**
  - [ ] Does `pointer-events: none` avoid being used as a substitute for `disabled` or `inert`?
  - [ ] Confirm that controls inside `pointer-events: none` layers are either reachable by `Tab` (if interactive) or marked `tabindex="-1"` / `inert` (if visually hidden/disabled).

---

## 2. Continuous Pointer Capture (`setPointerCapture`)

- [ ] **Pointer ID Registration:**
  - [ ] Does the `pointerdown` listener capture the pointer using `element.setPointerCapture(event.pointerId)`?
  - [ ] Is `hasPointerCapture(event.pointerId)` checked during `pointermove` callbacks before performing physics or slider calculations?

- [ ] **Clean Pointer Release Lifecycle:**
  - [ ] Does `element.releasePointerCapture(event.pointerId)` execute reliably on both `pointerup` AND `pointercancel`?
  - [ ] Does pointer capture release cleanly if the window loses focus, an alert opens, or a modal interrupts the gesture?

- [ ] **Out-of-Bounds Movement Integrity:**
  - [ ] Test rapid dragging of custom sliders, splitters, or color picker thumbs far outside the window or iframe boundary.
  - [ ] Verify that `pointermove` events continue firing without cursor dropping, visual jumps, or text selection flickering.

---

## 3. Touch Targets & Gesture Prevention (`touch-action`)

- [ ] **WCAG Target Size Compliance:**
  - [ ] Are all touch targets on mobile/tablet viewports at least 24×24px (WCAG 2.2 AAA Target Size)?
  - [ ] Are primary navigation items and call-to-action buttons sized to at least 44×44px (iOS) or 48×48px (Android)?
  - [ ] If CSS layout constraints require small visual icons (e.g., 16px), is an invisible pseudo-element (`::before`) used to expand the hit zone?

- [ ] **Gesture Interference Prevention:**
  - [ ] Are custom canvas drawing pads, signature inputs, or 2D pan/zoom surfaces styled with `touch-action: none`?
  - [ ] Does touch interaction on drawing or drag surfaces avoid triggering native browser page scrolling or pull-to-refresh?
  - [ ] Are horizontal carousels or swipe tables styled with `touch-action: pan-y` to allow vertical page scrolling while enabling horizontal drag?

---

## 4. Diagnostic Hit-Test Audit (`elementFromPoint`)

- [ ] **Click Blocker Detection:**
  - [ ] If a button or link appears unclickable, run `document.elementsFromPoint(x, y)` at its bounding box center.
  - [ ] Inspect the returned element array to locate any unintended top-layer overlays, invisible wrappers, or pseudo-elements capturing clicks.

- [ ] **Shadow DOM Inspection:**
  - [ ] When auditing Web Components, verify that `document.elementFromPoint()` is supplemented by `shadowRoot.elementFromPoint()` to penetrate shadow boundaries.

- [ ] **Z-Index & Stacking Context Audit:**
  - [ ] Verify that sibling elements with higher `z-index` do not create invisible hit-box boxes over adjacent controls.
