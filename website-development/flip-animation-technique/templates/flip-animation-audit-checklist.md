# FLIP Animation Implementation & Performance Audit Checklist

Use this audit checklist when implementing or troubleshooting FLIP (First, Last, Invert, Play) layout animations on grid lists, search filters, detail card expansions, or dynamic DOM reordering.

---

## 1. Batch Geometry & Layout Thrashing
- [ ] **Batched First Reads:** Are all initial geometry reads (`getBoundingClientRect()`) performed for all target elements *before* any DOM mutations occur?
- [ ] **Synchronous Mutation:** Is the DOM mutation (e.g., node reordering, CSS class toggle, unmounting) executed cleanly in a single synchronous pass?
- [ ] **Batched Last Reads:** Are all final geometry reads performed immediately after the DOM mutation in a single pass?
- [ ] **No Interleaved Loops:** Have you verified that `getBoundingClientRect()` and DOM assignments (`appendChild`, `classList.toggle`) are **never** interleaved inside a `forEach` loop?

---

## 2. Transform Integrity & Scale Fixes
- [ ] **Top-Left Origin:** Is `transform-origin: 0 0` (or `top left`) explicitly set on all animating FLIP containers?
- [ ] **Invert Delta Calculation:** Are layout deltas calculated correctly ($\Delta X = First.left - Last.left$, $\Delta Y = First.top - Last.top$)?
- [ ] **Scale Ratio Calculation:** Is scale computed as $scaleX = First.width / Last.width$ and $scaleY = First.height / Last.height$?
- [ ] **Child Counter-Scaling:** If the container changes dimensions during expansion, is an inverse scale (`1 / scaleX`, `1 / scaleY`) applied to child text/image content to prevent aspect ratio distortion?
- [ ] **Hardware Acceleration:** Are position translations using 3D transforms (`translate3d(x, y, 0)`) to ensure compositor thread layer promotion?

---

## 3. WAAPI & Layer Lifecycle
- [ ] **Animation Cleanup:** Are WAAPI player handles cleaned up using `anim.cancel()` or `.onfinish` listeners to prevent player object accumulation?
- [ ] **Temporary Layer Promotion:** Is `will-change: transform` omitted from static CSS and applied only during active FLIP playback?
- [ ] **Clean End State:** After animation completes, is the element left in its natural CSS grid/flex position without persisting inline transform overrides?

---

## 4. Accessibility & User Preferences
- [ ] **`prefers-reduced-motion` Check:** Does the FLIP function check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`?
- [ ] **Instant Fallback:** If reduced motion is preferred, does the implementation skip FLIP motion transforms and apply the DOM state update instantly or with a simple opacity cross-fade?
- [ ] **Focus Preservation:** When reordering interactive list items (buttons, links), is active keyboard focus (`document.activeElement`) preserved across DOM node shifts?

---

## 5. Performance Verification
- [ ] **Single Layout Pass in DevTools:** Does the Chrome DevTools Performance trace show **exactly one** layout pass following the DOM mutation?
- [ ] **Frame Rate Stability:** Is frame execution maintained at 60 FPS / 120 FPS during active reordering or expansion?
- [ ] **Composite-Only Playback:** Are playback frames restricted to green composite tasks on the main thread?
