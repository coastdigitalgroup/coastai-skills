# CSS Registered Custom Properties Audit Checklist

Use this checklist to audit, verify, and debug CSS custom property declarations using the W3C CSS Properties and Values API (`@property` in CSS and `CSS.registerProperty()` in JavaScript).

---

## 1. Syntax & Descriptor Compliance

- [ ] **Angle Brackets Included:** Every explicit `syntax` descriptor uses valid angle brackets (e.g., `syntax: "<color>"`, `syntax: "<angle>"`, `syntax: "<length>"`) unless using universal `syntax: "*"`.
- [ ] **Valid Data Type String:** Property syntax string matches standard W3C types:
  - `<color>`
  - `<length>`
  - `<percentage>`
  - `<angle>`
  - `<time>`
  - `<number>`
  - `<integer>`
  - `<transform-function>`
  - `<custom-ident>`
- [ ] **Mandatory Descriptors Present:** CSS `@property` blocks include all three required descriptors: `syntax`, `inherits`, and `initial-value`.
- [ ] **Initial Value Compatibility:** The `initial-value` strictly conforms to the declared `syntax` type (e.g., `0px` for `<length>`, `0deg` for `<angle>`, `#000000` or `transparent` for `<color>`).
- [ ] **No Unitless Zero for Lengths:** If `syntax: "<length>"`, `initial-value` is declared as `0px` or `0rem`, NOT unitless `0`.

---

## 2. Animation & Interpolation Functionality

- [ ] **Transition Target Binding:** Custom property names (`--my-prop`) are explicitly listed in `transition-property` or `transition` shorthands (e.g., `transition: --my-angle 0.5s ease`).
- [ ] **Keyframe Animation Validation:** When using `@keyframes`, custom properties update across keyframe steps (e.g., `0% { --my-angle: 0deg; } 100% { --my-angle: 360deg; }`).
- [ ] **No Instant Snapping:** Hovering or toggling UI states results in smooth 60fps frame interpolation rather than an instantaneous state jump.
- [ ] **Performance Profile:** Animated custom properties do not trigger excessive main-thread layout thrashing (inspect in Chrome DevTools Performance panel).

---

## 3. Encapsulation & Cascading Controls

- [ ] **Inheritance Isolated:** Private or component-scoped variables set `inherits: false` to prevent accidental property leakage into nested child DOM elements.
- [ ] **Global Tokens Inherit:** Global design system variables intended to cascade set `inherits: true`.
- [ ] **Duplicate Registration Guard:** JavaScript calls to `CSS.registerProperty()` are wrapped in `try...catch` blocks or feature-checks to prevent unhandled `InvalidModificationError` exceptions when properties are registered in both CSS and JS.

---

## 4. Accessibility & Responsive Safety

- [ ] **Reduced Motion Support:** `@media (prefers-reduced-motion: reduce)` rules disable or neutralize variable transitions/animations for users with motion sensitivity.
- [ ] **Forced Colors Compatibility:** Custom properties driving colors or backgrounds gracefully adapt in `@media (forced-colors: active)` mode using system color keywords (`Canvas`, `CanvasText`, `Highlight`).
- [ ] **Contrast Verification:** Animated color properties maintain minimum WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large text/UI components) throughout the entire animation sequence.
