# Discrete Property Transitions Heuristics & Browser Behavior

## Pipeline Mechanics of Discrete Transitions

Understanding how modern browser rendering engines (Chromium Blink, Gecko, WebKit) handle discrete property transitions is critical for debugging and optimizing entry/exit animations.

### 1. The Traditional Layout Pipeline Problem

When an element has `display: none`, it is completely absent from the Render Tree. Changing `display: none` to `display: block` causes the rendering engine to compute layout and paint styles for the newly visible element in a single frame.

In standard CSS transitions:
- Transitioning requires a **before-change style** and an **after-change style** present in two consecutive animation frames.
- Setting `display: block` and `opacity: 1` simultaneously in JS or CSS classes meant the engine saw the initial style as `display: block, opacity: 1` at the moment of render tree insertion, skipping the transition entirely.
- Setting `display: none` immediately removed the element from the render tree, aborting any ongoing `opacity: 0` exit transitions instantly.

---

### 2. Modern Engine Solution: `@starting-style`, `allow-discrete`, and `overlay`

Modern CSS specifications introduce three distinct capabilities that modify rendering lifecycle behavior:

#### A. `@starting-style`
`@starting-style` defines property values applied to an element **before** its first style recalculation when it is:
1. Rendered for the first time after being inserted into the DOM.
2. Switched from `display: none` to any visible `display` value.
3. Added to the top-layer stack (e.g., via `showModal()` or `popover="auto"`).

When the browser detects an element changing from `display: none` to `display: block`, it uses the `@starting-style` values as the "before-change" state and immediately schedules a transition to the target state values.

#### B. `transition-behavior: allow-discrete`
The `allow-discrete` value (or `transition: display 0.3s allow-discrete`) changes the transition behavior of discrete properties (`display`, `visibility`, `content-visibility`, `overlay`).

- **Entry Transition (`display: none` -> `display: block`):** `display` switches to `block` **instantaneously at 0%** of the transition duration, allowing continuous properties (`opacity`, `transform`) to animate visually.
- **Exit Transition (`display: block` -> `display: none`):** `display` remains `block` throughout the transition duration, and switches to `none` **at 100%** when the exit animation completes.

#### C. Top-Layer `overlay` Property
The top-layer is a special rendering layer managed by the browser for `<dialog>` modals, popovers, and fullscreen elements, sitting above all standard z-index stacking contexts.

When a modal closes, it is removed from the top layer. The CSS `overlay` property controls whether an element remains in the top-layer stack:
- `overlay: auto`: Element is in the top-layer stack.
- `overlay: none`: Element is removed from top-layer.
- **With `overlay 0.3s allow-discrete`:** The element remains in the top-layer stack (`overlay: auto`) until the 100% mark of the exit transition, preventing other elements from rendering over it mid-exit animation.

---

## Performance & Optimization Rules

1. **Composite-Thread Animation Targets:**
   - Always animate GPU-composited properties (`opacity`, `transform`, `filter`) alongside discrete property transitions.
   - Avoid animating continuous layout properties like `height` or `width` from `0px` to `auto` directly; prefer `grid-template-rows: 0fr` to `1fr` or `transform: scaleY()` to prevent main-thread layout thrashing during exit transitions.

2. **`prefers-reduced-motion` Safety:**
   - Users with vestibular motion sensitivities must receive reduced or instantaneous transitions.
   - Setting `transition-duration: 0.01ms !important;` for `prefers-reduced-motion: reduce` ensures accessibility compliance while still firing `transitionend` events gracefully for any listening JS routines.

3. **Memory & Accessibility Isolation:**
   - Keeping elements in `display: none` when closed guarantees they are pruned from the accessibility tree, eliminating aria tab-stop leaks and off-screen screen-reader focus traps without requiring manual `tabindex="-1"` toggles.

---

## Engine Compatibility Matrix (as of 2024/2025)

| Feature | Chromium (Chrome/Edge) | Gecko (Firefox) | WebKit (Safari) |
| :--- | :--- | :--- | :--- |
| `transition-behavior: allow-discrete` | Version 117+ | Version 129+ | Version 17.4+ |
| `@starting-style` | Version 117+ | Version 129+ | Version 17.4+ |
| `overlay` Transition | Version 117+ | Version 129+ | Version 17.4+ |
