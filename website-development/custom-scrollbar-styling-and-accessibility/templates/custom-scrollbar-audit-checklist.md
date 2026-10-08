# Custom Scrollbar Accessibility & Styling Audit Checklist

Use this checklist to systematically evaluate custom scrollbars on websites and web applications for WCAG AA compliance, cross-browser compatibility, keyboard accessibility, and OS integration.

## 1. Visual & Non-Text Contrast Compliance (WCAG 2.1 SC 1.4.11)

- [ ] **Thumb vs Track Contrast Ratio:** Calculate contrast ratio between scroll thumb color and scroll track color. Is it **≥ 3:1**?
- [ ] **Thumb vs Adjacent Background Ratio:** Calculate contrast ratio between scroll thumb color and container background. Is it **≥ 3:1**?
- [ ] **Hover State Increment:** Does the thumb visually change state on mouse hover with an increased contrast delta (≥ 1.5:1 brighter/darker)?
- [ ] **Active State Indicator:** Does the thumb visibly indicate an active drag state on mouse press (`:active`)?
- [ ] **No Hidden Scrollbars:** Verify scrollbars are NOT hidden using `scrollbar-width: none` or `::-webkit-scrollbar { display: none; }` without accessible on-screen replacement controls.

## 2. Keyboard Navigation & Focusability (WCAG 2.1 SC 2.1.1 & SC 2.4.7)

- [ ] **Keyboard Discoverability (`tabindex="0"`):** Does every scrollable container (`overflow: auto` / `scroll`) with overflowing content have `tabindex="0"`?
- [ ] **Semantic Region Role:** Is the scroll container annotated with `role="region"` and `aria-label` or `aria-labelledby` describing its contents?
- [ ] **Visible Focus Ring:** When navigating with the `Tab` key, does a clear `:focus-visible` outline appear around the scroll container?
- [ ] **Directional Scroll Operability:** When focused, do `ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home`, and `End` keys scroll the container content smoothly?

## 3. Ergonomics & Target Sizing

- [ ] **Minimum Track Width/Height:** Is the scrollbar width/height at least **8px** (thin) or **10px - 16px** (default) on pointer interfaces?
- [ ] **Minimum Thumb Grab Height:** Does the WebKit thumb specify a `min-height` / `min-width` of at least **32px** so short scrollbars remain grabbable?
- [ ] **Touch Gesture Compatibility:** Verify touch scrolling (swipe/drag) works smoothly on mobile/tablet screens without interfering with native inertial scrolling.

## 4. Forced Colors & High Contrast Mode

- [ ] **Windows High Contrast Test:** Enable Windows Forced Colors Mode (or simulate `forced-colors: active` in Chrome DevTools Rendering tab).
- [ ] **System Token Adaptation:** Are scrollbar tracks and thumbs using system color tokens (`ButtonText`, `Canvas`, `Highlight`)?
- [ ] **Visible Boundaries:** Are scrollbar thumbs and container boundaries clearly visible against the system high contrast canvas?

## 5. Cross-Browser Engine Validation

- [ ] **Chromium (Blink Engine):** Verified in Chrome / Edge. Both W3C standard `scrollbar-color` and WebKit rules render accurately.
- [ ] **Firefox (Gecko Engine):** Verified in Firefox. `scrollbar-width` and `scrollbar-color` apply correctly.
- [ ] **Safari (WebKit Engine):** Verified on macOS / iOS Safari. Native smooth overlay or standard WebKit scrollbars render cleanly.
