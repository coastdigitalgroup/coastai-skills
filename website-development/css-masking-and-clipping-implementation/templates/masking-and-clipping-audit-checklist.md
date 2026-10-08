# CSS Masking and Clipping Audit Checklist

Use this diagnostic checklist when auditing or implementing CSS `clip-path`, `mask-image`, `mask-composite`, or edge scroll fades across web projects.

---

## 1. Syntax & Cross-Browser Vendor Prefix Coverage

- [ ] **WebKit Prefix Parity:** Are all `mask-*` declarations accompanied by matching `-webkit-mask-*` declarations?
  ```css
  /* Check for both declarations */
  -webkit-mask-image: linear-gradient(...);
  mask-image: linear-gradient(...);
  ```
- [ ] **Mask Property Match:** Do `-webkit-mask-size`, `-webkit-mask-repeat`, and `-webkit-mask-position` match standard properties?
- [ ] **Compositing Keywords:** If using multi-mask compositing, are standard `mask-composite` (`add`, `subtract`, `intersect`) paired with legacy WebKit equivalents (`-webkit-mask-composite: source-over`, `destination-out`)?
- [ ] **Polygon Coordinate Units:** Are percentage (`%`) or `calc()` units used for responsive polygon coordinates rather than fixed hardware pixels?

---

## 2. Accessibility & Keyboard Focus Management

- [ ] **Focus Ring Preservation:** Is `:focus-visible` outline applied to an unclipped outer wrapper or rendered inside valid bounds via `box-shadow: inset`?
- [ ] **Hit-Testing Bounds:** Has pointer-event hit-testing been verified on clipped geometry? (Confirm that clicks outside `clip-path` boundaries pass through to underlying elements).
- [ ] **Screen Reader Reachability:** Confirm that clipping is NOT being used as a substitute for hiding elements from screen readers. (Clipped content is still rendered in the accessibility tree).
- [ ] **Text Contrast Ratio:** Does text placed over masked/clipped backgrounds maintain WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)?

---

## 3. High Contrast & System Theme Compatibility

- [ ] **Forced Colors Override:** Is there a `@media (forced-colors: active)` media query block resetting custom masks and providing explicit system borders?
  ```css
  @media (forced-colors: active) {
    .masked-element {
      mask-image: none !important;
      -webkit-mask-image: none !important;
      border: 1px solid CanvasText;
    }
  }
  ```
- [ ] **Dark / Light Theme Adaptation:** Do gradient mask stops rely on alpha channels (`transparent` to `black`) rather than hardcoded surface theme colors (`#ffffff` or `#0f172a`)?

---

## 4. Stacking Context & Rendering Performance

- [ ] **Stacking Context Side-Effects:** Has the element's new Stacking Context been checked against sibling `z-index` layering and dropdown popovers?
- [ ] **Compositor Layer Promotion:** Does animating `clip-path` or mask custom properties use `will-change: clip-path` or WAAPI to run smoothly on GPU compositor threads?
- [ ] **Subpixel Anti-Aliasing:** Are clipped vector paths crisp without pixelation or aliasing artifacts across high-DPI (Retina) and standard displays?
- [ ] **Scroll Performance:** Do edge-masked scroll containers maintain 60fps/120fps smooth touch scrolling without frame drops?

---

## 5. Automated / Manual Test Pass

- [ ] Tested on Chrome / Edge (Blink)
- [ ] Tested on Safari / iOS (WebKit)
- [ ] Tested on Firefox (Gecko)
- [ ] Verified Keyboard Focus Tabbing (`Tab` / `Shift+Tab`)
- [ ] Verified Forced Colors Mode Emulation
