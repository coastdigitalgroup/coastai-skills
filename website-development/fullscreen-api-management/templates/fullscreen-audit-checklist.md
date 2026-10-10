# Fullscreen API Management Audit Checklist

This audit checklist evaluates frontend web application full-screen implementations against W3C Fullscreen API standards, cross-browser vendor prefix compatibility, top-layer styling rules, transient user activation requirements, and WCAG AA accessibility compliance.

---

## 1. Transient User Activation & Security Protocol

- [ ] **Direct User Gesture Triggering:** Is `requestFullscreen()` called directly inside a synchronous user event handler (`click`, `touchend`, or `keydown`)?
- [ ] **No Async Execution Delays:** Are full-screen requests free from execution delays caused by `setTimeout()`, `setInterval()`, or un-chained network `fetch()` promises?
- [ ] **Rejection & Exception Catching:** Are all calls to `requestFullscreen()` wrapped in `try...catch` blocks or Promise `.catch()` handlers to handle `NotAllowedError` gracefully?
- [ ] **Cross-Origin `<iframe>` Delegation:** If full-screen mode is requested inside an `<iframe>`, does the `<iframe>` tag include BOTH `allowfullscreen="true"` and `allow="fullscreen *"` policy attributes?

---

## 2. Top-Layer Stacking & CSS Styling (`:fullscreen`)

- [ ] **Container Wrapper Promotion:** Is full-screen requested on a wrapper container `<div>` containing both the media/canvas AND overlay controls (rather than raw `<video>` or `<canvas>` directly)?
- [ ] **Top-Layer `:fullscreen` CSS Rules:** Does the container stylesheet define `:fullscreen` (and `-webkit-full-screen` fallbacks) with explicit `width: 100vw; height: 100vh;` and flex/grid alignment?
- [ ] **Backdrop Styling (`::backdrop`):** Is `::backdrop` configured with a solid or semi-transparent background color (e.g. `background-color: #000000;`) to prevent desktop bleed-through?
- [ ] **Control Dock Visibility:** Are interactive control bars, close buttons, and toolbars positioned with absolute or fixed coordinates relative to the full-screen container?
- [ ] **Aspect Ratio Preservation:** Do video or canvas child elements specify `object-fit: contain;` or dynamic scale recalculations to prevent stretched raster graphics?

---

## 3. Cross-Browser & Mobile Safari (iOS) Compatibility

- [ ] **Vendor Prefix Fallbacks:** Does the implementation support `webkitRequestFullscreen`, `mozRequestFullScreen`, and `msRequestFullscreen` for legacy browsers?
- [ ] **iOS Safari iPhone Fallback:** Does the code detect iOS iPhone limitations on arbitrary `<div>` elements and gracefully utilize `video.webkitSetPresentationMode('fullscreen')` or `webkitEnterFullscreen()`?
- [ ] **Document-Level State Monitoring:** Are `fullscreenchange` and `fullscreenerror` event listeners attached to `document` rather than individual sub-elements?
- [ ] **Single Element Tracking:** Does state tracking verify whether `document.fullscreenElement` matches the specific managed container?

---

## 4. Keyboard Navigation & WCAG AA Accessibility

- [ ] **Native Escape Key Handling:** Does pressing the `Escape` key exit full-screen mode cleanly without blocking default browser behavior?
- [ ] **Custom Hotkey Support:** If keyboard shortcuts (e.g. `F` or `Space`) toggle full-screen, are hotkeys disabled when the user is typing inside text inputs, textareas, or select dropdowns?
- [ ] **Focus Management & Focus Indicators:** Does focus remain inside the full-screen container upon expansion, and is a clear focus outline visible (`:focus-visible`)?
- [ ] **Accessible Button Attributes:** Does the toggle button dynamically update `aria-pressed="true|false"` and `aria-label="Enter fullscreen" | "Exit fullscreen"`?
- [ ] **Screen Reader Announcements:** Does an `aria-live="polite"` region inform assistive technology users when full-screen presentation mode is entered or exited?
