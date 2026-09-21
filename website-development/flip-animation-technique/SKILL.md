---
name: flip-animation-technique
description: Execute performant 60fps/120fps layout transitions during dynamic DOM reordering, filtering, and expansion using the First-Last-Invert-Play (FLIP) technique with Web Animations API or CSS transforms.
---

# FLIP Animation Technique

## Purpose

The FLIP (First, Last, Invert, Play) Animation Technique provides a production-grade protocol and architectural pattern for smoothly animating DOM elements across layout changes that would otherwise cause expensive recalculations or abrupt visual jump cuts.

Normally, animating layout properties like `top`, `left`, `width`, `height`, `grid-template-columns`, or flex order forces the browser to recalculate layout and paint on every single frame, causing severe frame drops (10-15 FPS), main thread jank, and poor Interaction to Next Paint (INP) scores.

The FLIP technique turns layout-expensive transitions into cheap compositor-only animations (`transform: translate` and `scale`) by pre-calculating element position differences before rendering and animating back to the new natural layout position.

---

## Use Cases

- **Grid/List Reordering & Sorting:** Smoothly moving items to their new visual positions when sorting by price, date, popularity, or user drag handles.
- **Category Filtering & Dynamic Search:** Morphing and repositioning remaining visible items when filtering products, tags, or search results.
- **Card Expansion & Shared Element Transitions:** Expanding a thumbnail or card into a full modal view or detail view while visually morphing its size and coordinate bounds.
- **Layout Switching:** Transitioning smooth element alignment when toggling between Grid View and List View.
- **Drag and Drop Settling:** Animating dragged list items into their final dropped slot without visual layout jumps.

---

## When NOT to Use

- **Fixed-Coordinate / Non-Layout Animations:** Simple state transitions that do not change layout flow, such as opacity fades, icon rotations, or hover button color fills. Use pure CSS keyframes or transitions.
- **Scroll-Linked Animations:** Animating elements based on viewport scroll progress. Use CSS Scroll-Driven Animations (`animation-timeline: scroll()`) or IntersectionObserver.
- **Off-screen or Unmounted Elements:** Animating elements that enter the DOM from off-screen or leave the DOM completely. Combining unmounting with FLIP requires exit placeholder preservation before removing nodes.
- **Pure CSS Layout Transitions without JS State Shifts:** Simple container width changes where `transform-origin` and CSS transitions on `transform` are sufficient without pre-measuring geometry.

---

## Inputs

1. **DOM Elements to Animate:** A collection of element references or containers whose layout positioning will change as a result of a DOM shift or state update.
2. **Layout State Mutator:** A function, event, or state update that alters element positions (e.g., reordering children, toggling CSS classes, changing flex/grid properties, or modifying inline styles).
3. **Animation Configuration:** Key options including duration (typically `250ms` - `400ms`), easing function (e.g., `cubic-bezier(0.2, 0, 0, 1)`), and accessibility preferences (`prefers-reduced-motion`).

---

## Outputs

1. **Jank-Free Layout Transition:** Smooth 60fps/120fps compositor-driven animation of elements transitioning seamlessly from their old layout bounds to their new positions.
2. **Invert Transform Cleanup:** Automatic cleanup of temporary CSS `transform` and `will-change` properties upon animation completion, leaving elements in their clean, natural DOM position.
3. **Scale Content Counter-Distortion:** Adjusted child element scales or inverted bounds for expanded cards to prevent stretched text or distorted child aspect ratios.

---

## Workflow

### 1. First (F): Measure Initial Geometry
Before making any DOM or state changes, measure and record the bounding box coordinates (`getBoundingClientRect()`) for all participating elements.

```javascript
const elements = Array.from(document.querySelectorAll('.item'));
const firstBounds = new Map();

elements.forEach((el) => {
  firstBounds.set(el, el.getBoundingClientRect());
});
```

### 2. Last (L): Apply DOM Changes & Measure Final Geometry
Apply the DOM state update synchronously (e.g., reordering nodes, toggling classes, changing flex/grid container properties). Immediately measure the new ("Last") bounding box coordinates before the browser paints.

```javascript
// Apply DOM mutation (e.g., reverse order)
container.append(...elements.reverse());

const lastBounds = new Map();
elements.forEach((el) => {
  lastBounds.set(el, el.getBoundingClientRect());
});
```

### 3. Invert (I): Calculate Delta and Apply Counter-Transform
Compute the delta between initial and final coordinates ($\Delta X = First.left - Last.left$, $\Delta Y = First.top - Last.top$, $\Delta ScaleX = First.width / Last.width$, $\Delta ScaleY = First.height / Last.height$). Apply an immediate, un-transitioned `transform` so the element appears in its original ("First") position despite already being at its "Last" location in the DOM layout.

```javascript
elements.forEach((el) => {
  const first = firstBounds.get(el);
  const last = lastBounds.get(el);

  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const scaleX = first.width / last.width;
  const scaleY = first.height / last.height;

  // Store deltas on element or animation target
  el._flipDelta = { deltaX, deltaY, scaleX, scaleY };
});
```

### 4. Play (P): Animate Transform Back to Zero Delta
Animate the transform back to `translate(0px, 0px) scale(1, 1)` using the Web Animations API (`element.animate()`) or CSS transition classes. This allows the GPU to handle the movement smoothly via compositor layers without triggering layout recalculations during frames.

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

elements.forEach((el) => {
  const { deltaX, deltaY, scaleX, scaleY } = el._flipDelta;

  if (prefersReducedMotion || (deltaX === 0 && deltaY === 0 && scaleX === 1 && scaleY === 1)) {
    return; // Skip animation if reduced motion preferred or no movement occurred
  }

  el.animate(
    [
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})` },
      { transform: 'translate(0px, 0px) scale(1, 1)' }
    ],
    {
      duration: 300,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      fill: 'both'
    }
  );
});
```

---

## Decision Rules

### Implementation Approach Selection Matrix

| Scenario / Requirement | Recommended FLIP Strategy | Key Mechanics |
| :--- | :--- | :--- |
| **Grid Reordering / List Sorting** | Web Animations API (`el.animate()`) | Position delta calculation (`deltaX`, `deltaY`) without scaling |
| **Expandable Cards / Detail Modals** | Shared Element FLIP + Child Inversion | Position + Scale delta with inverse scaling applied to internal content |
| **Element Removal / Filtering Out** | Cross-fade Exit + Remaining FLIP | Animate exiting elements to `opacity: 0` while FLIP-animating remaining items to new slots |
| **Drag & Drop Reordering** | Continuous FLIP / Pointer Lock | Batch `getBoundingClientRect()` on drop release and FLIP to dropped index |
| **High-Frequency Layout Switches** | Cached Batch FLIP Utility | Microtask or single rAF batch for all reads/writes to prevent forced synchronous reflows |

---

## Constraints

- **Single Synchronous Reflow:** FLIP requires calling `getBoundingClientRect()` before and after the DOM mutation. Ensure both read passes are batched cleanly so only **one** forced layout occurs across all elements.
- **Children Scale Distortion:** Scaling an element with `scale(scaleX, scaleY)` distorts text, border-radius, and child elements. To fix distortion, apply an inverse scale (`scale(1 / scaleX, 1 / scaleY)`) to child content or use clip-path / fixed dimensions where feasible.
- **GPU Memory Management:** Avoid applying `will-change: transform` globally on all items permanently. Promote layers only during the active FLIP frame and remove `will-change` when animation finishes.
- **Accessibility (`prefers-reduced-motion`):** Always query `window.matchMedia('(prefers-reduced-motion: reduce)')`. If enabled, skip the FLIP animation or perform a simple instant opacity cross-fade.

---

## Non-Goals

- Replacing native CSS layout mechanisms (Flexbox, CSS Grid, Container Queries).
- Server-side HTML render optimization or hydration strategies.
- Canvas, WebGL, or SVG path animation implementations.

---

## Common Failure Patterns

- **Layout Thrashing in Read/Write Cycle:** Interleaving `getBoundingClientRect()` and DOM mutations in a `forEach` loop. This causes N reflows for N elements. Always batch all "First" reads first, apply all DOM writes, then batch all "Last" reads.
- **Uncorrected Child Scaling:** Scaling container cards without scaling down child content, causing stretched text, ovalized circular avatars, and fuzzy borders during animation.
- **Ignoring Transform Origin:** Not setting `transform-origin: top left` (or `0 0`) before applying FLIP transforms, resulting in misaligned trajectory paths.
- **Memory Leak in WAAPI Players:** Forgetting to clear finished animation references or leaving `fill: 'forwards'` on WAAPI animations without committing styles, which bloats DOM element animation stacks over time.

---

## Validation Steps

### 1. DevTools Performance Inspection
- [ ] Open Chrome DevTools -> Performance tab and record a layout shift action (e.g., sorting grid items).
- [ ] Confirm that "Recalculate Style" and "Layout" occur **only once** immediately following the DOM mutation.
- [ ] Verify that animation frames consist entirely of cheap "Composite Layers" tasks without "Layout" or "Paint" execution during playback.

### 2. FPS Meter Check
- [ ] Turn on **Show Rendering -> FPS Meter** in DevTools.
- [ ] Trigger continuous reordering/filtering interactions and verify framerate remains locked at **60 FPS / 120 FPS**.

### 3. Reduced Motion Test
- [ ] Emulate `prefers-reduced-motion: reduce` via DevTools Rendering tab.
- [ ] Trigger layout reordering and confirm layout changes immediately without motion, preserving accessibility compliance.
