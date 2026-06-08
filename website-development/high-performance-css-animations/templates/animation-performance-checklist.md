# Animation Performance Audit Checklist

Use this template to evaluate and optimize CSS animations and transitions for frontend performance and accessibility.

## 1. Property Audit
- [ ] **Compositor Check:** Are animations using only `transform`, `opacity`, or `filter`?
- [ ] **Layout Trigger Check:** Are any animations using properties that trigger "Layout" (e.g., `width`, `height`, `top`, `left`, `margin`, `flex`)?
- [ ] **Paint Trigger Check:** Are any animations using properties that trigger "Paint" (e.g., `background-color`, `box-shadow`, `color`)?
- [ ] **Alternative Identified:** If layout/paint triggers exist, can they be replaced with `transform` (e.g., `scale` instead of `width`)?

## 2. Layer Management
- [ ] **Promotion Check:** Are complex or frequent animations promoted to their own layer via `will-change` or `transform: translateZ(0)`?
- [ ] **Over-Promotion Check:** Is `will-change` used sparingly? (Avoid applying to more than 5-10 concurrent elements on mobile).
- [ ] **Cleanup Check:** Is `will-change` applied only when needed (e.g., via JS on hover) or on elements that are permanently "active"?

## 3. Rendering Pipeline Validation
- [ ] **Paint Flashing:** With "Paint flashing" enabled in DevTools, do animated elements remain clear (no green highlights)?
- [ ] **Layer Borders:** With "Layer borders" enabled, is the animated element in its own orange-bordered compositor layer?
- [ ] **FPS Check:** Under CPU throttling (4x/6x), does the animation maintain a stable 60fps?
- [ ] **Jank Audit:** In a Performance profile, are there "Long Tasks" or "Layout/Style" recalculations overlapping with the animation?

## 4. UX & Accessibility
- [ ] **Duration Check:** Are UI transitions between 150ms and 400ms?
- [ ] **Easing Check:** Do animations use natural-feeling `cubic-bezier` curves rather than `linear`?
- [ ] **Reduced Motion:** Is the `prefers-reduced-motion` media query implemented to disable or simplify motion?
- [ ] **Distraction Check:** Can auto-playing animations (like carousels) be paused by the user?

## 5. Refactoring Plan (if needed)
| Current Property | Performance Impact | Recommended Property |
| :--- | :--- | :--- |
| `left` / `top` | High (Layout) | `transform: translate()` |
| `width` / `height` | High (Layout) | `transform: scale()` |
| `margin-top` | High (Layout) | `transform: translateY()` |
| `background-color` | Medium (Paint) | Cross-fade with `opacity` |
| `box-shadow` | Medium (Paint) | Animate `opacity` of a pseudo-element |
