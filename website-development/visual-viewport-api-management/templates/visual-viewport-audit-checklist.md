# Visual Viewport API Implementation Audit Checklist

Use this checklist to audit and debug mobile Web UIs using `window.visualViewport` to manage soft keyboards, fixed action docks, and pinch-zoom interactions.

---

## 1. Environment & Feature Support

- [ ] **Feature Guarding:** Verify code checks `typeof window !== 'undefined' && 'visualViewport' in window` before attaching listeners.
- [ ] **Fallback Strategy:** Confirm fallback behavior sets default CSS variables (`--vv-height: 100vh`, `--vv-offset-bottom: 0px`) when `visualViewport` is unsupported.
- [ ] **Interactive Widget Meta Tag:** Check whether `<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-visual">` is present in HTML head for Chrome 108+ support.

---

## 2. Event Batching & Performance

- [ ] **`requestAnimationFrame` Batching:** Confirm that both `resize` and `scroll` event listeners on `window.visualViewport` batch DOM reads and CSS updates using `requestAnimationFrame`.
- [ ] **Zero Forced Synchronous Reflows:** Record a DevTools Performance trace during virtual keyboard opening/closing to ensure no style thrashing or long task frame drops occur.
- [ ] **Debounced Thresholds:** Ensure custom keyboard events (`keyboardshow`/`keyboardhide`) use a height threshold (e.g. `150px`) to avoid firing false events during browser URL bar collapse.

---

## 3. Mobile Virtual Keyboard Behavior (iOS Safari & Android Chrome)

- [ ] **Fixed Dock Elevation:** Verify bottom fixed/sticky elements (`.chat-input`, `.checkout-dock`) move up seamlessly above the soft keyboard using `transform: translateY(calc(-1 * var(--vv-offset-bottom)))`.
- [ ] **No Obscured Inputs:** Confirm focusing an active text field near the bottom of the screen keeps the cursor and input field fully visible inside the visual viewport.
- [ ] **iOS Scroll Reset:** Verify that focusing inputs on iOS Safari resets layout viewport scroll drift (`window.scrollTo({ top: 0, left: 0 })`) to prevent off-screen header shifting.
- [ ] **Clean Keyboard Dismissal:** Dismiss the keyboard and confirm the layout returns smoothly to default height without leaving blank white space gaps at the bottom.

---

## 4. Pinch-Zoom & Scale Stability

- [ ] **Scale Factor Tracking:** Pinch-zoom to 2x (scale = 2.0) and inspect `--vv-scale` to confirm scale factor is calculated accurately.
- [ ] **Sub-Pixel Offsets:** Verify `offsetTop` and `offsetLeft` values are converted cleanly to rounded pixel CSS strings or bounds.
- [ ] **Fixed Overlay Anchoring:** Confirm fixed headers, floating tools, or modals remain anchored inside the visible box during pan and zoom gestures.

---

## 5. Lifecycle & Memory Leak Prevention

- [ ] **EventListener Removal:** Verify `visualViewport.removeEventListener('resize', ...)` and `removeEventListener('scroll', ...)` are invoked when single-page application components unmount.
- [ ] **Singleton Controller:** Confirm application uses a shared controller instance rather than creating duplicate `visualViewport` listeners per component.
