# FLIP Performance and Rendering Heuristics

## Browser Rendering Pipeline & FLIP Mechanics

Understanding how the browser rendering pipeline processes DOM shifts is critical to executing performant FLIP animations.

### The Rendering Pipeline Stages

1. **JavaScript:** DOM modifications, style changes, or class toggles occur.
2. **Style Recalculation:** The browser calculates computed styles for affected DOM elements.
3. **Layout (Reflow):** The browser computes geometric position and bounds (`width`, `height`, `top`, `left`) for elements in the document flow.
4. **Paint:** Text, colors, borders, and shadows are rasterized into bitmap layers.
5. **Composite:** Individual bitmap layers are sent to the GPU, where transforms (`translate`, `scale`, `rotate`) and `opacity` are combined into final screen pixels.

---

## Why Traditional Layout Animations Fail

When animating properties like `height`, `width`, `top`, `left`, `margin`, or CSS Grid properties (`grid-template-columns`), the browser must execute **JavaScript -> Style -> Layout -> Paint -> Composite** on **every single 16.6ms frame** (at 60 Hz).

Because layout calculations involve calculating child and sibling geometry down the DOM tree, animating layout properties blocks the main thread, drops frames, and causes jank.

---

## How FLIP Bypasses the Pipeline

The FLIP (First, Last, Invert, Play) technique converts expensive layout animations into cheap compositor-driven transform animations:

1. **First (Read):** Query initial bounding boxes (`getBoundingClientRect()`).
2. **Last (Read/Write):** Execute DOM mutations (reordering, class toggles). Query final bounding boxes.
3. **Invert (Write):** Apply an instantaneous transform (`translate` and `scale`) that visually moves the element back to its "First" position.
4. **Play (Animate):** Animate `transform` back to `translate(0, 0) scale(1, 1)`.

During **Play**, the browser skips **Layout** and **Paint** entirely for each frame, running purely on the **Compositor thread (GPU)**.

---

## Counter-Scale Distortion Heuristics

When applying FLIP to elements that expand or shrink in size, scaling the parent element with `scale(scaleX, scaleY)` distorts child content (e.g., text stretches, rounded corners distort into ellipses).

### The Inversion Formula

To keep child content visually undistorted while the parent container scales:

$$\text{Parent Scale}: \quad S_{\text{parent}} = \frac{W_{\text{first}}}{W_{\text{last}}}$$

$$\text{Child Inverse Scale}: \quad S_{\text{child}} = \frac{1}{S_{\text{parent}}} = \frac{W_{\text{last}}}{W_{\text{first}}}$$

### Scaling Rules
1. Always set `transform-origin: 0 0` (or `top left`) on both the parent container and child wrapper.
2. Ensure child content is wrapped in a dedicated container (`.flip-content` or `.card-content`).
3. Animate the child wrapper's scale in parallel with the parent container's FLIP animation using WAAPI.

---

## Performance Heuristics & Golden Rules

1. **Batch All Reads Before Writes:**
   Never interleave `getBoundingClientRect()` and DOM mutations in a loop.
   *Bad:* `items.forEach(item => { item.style.top = item.getBoundingClientRect().top + 'px'; })`
   *Good:* Read all bounds first $\rightarrow$ Modify DOM $\rightarrow$ Read all new bounds $\rightarrow$ Animate.

2. **Prefer WAAPI over CSS Class Toggles for Dynamic FLIP:**
   Generating dynamic CSS keyframe stylesheets on the fly introduces style invalidation overhead. The Web Animations API (`element.animate()`) allows direct passing of calculated transform values.

3. **Layer Promotion Lifecycle:**
   Do not apply `will-change: transform` permanently to hundreds of list elements. Promote elements to GPU layers immediately before FLIP playback and let WAAPI handle layer release upon completion.

4. **Hardware Acceleration:**
   Use 3D transforms (`translate3d(x, y, 0)`) in keyframes to enforce GPU compositor layer execution across mobile browsers (iOS Safari, Android Chrome).
