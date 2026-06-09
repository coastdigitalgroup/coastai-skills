# Browser Rendering Pipeline & Animation

To build performant animations, you must understand how the browser turns code
into pixels on the screen. This process is called the "Critical Rendering Path"
or the "Pixel Pipeline."

## The Five Stages

1.  **JavaScript:** Handling logic that triggers visual changes (e.g., adding a
    CSS class).
2.  **Style:** Calculating which CSS rules apply to which elements.
3.  **Layout (Reflow):** Calculating how much space each element takes and where
    it sits on the screen.
4.  **Paint:** Filling in pixels—drawing text, colors, images, borders, and
    shadows.
5.  **Composite:** Drawing layers to the screen in the correct order.

## How Properties Affect the Pipeline

Different CSS properties trigger different stages of the pipeline. High-performance
animations aim to **skip** the Layout and Paint stages entirely.

### 1. Layout Properties (Most Expensive)
Changing these forces the browser to recalculate the geometry of the entire
document (or large parts of it).
- `width`, `height`, `margin`, `padding`
- `top`, `left`, `right`, `bottom`
- `font-size`, `line-height`, `font-weight`
- `display`, `flex-direction`, `grid-template`

### 2. Paint Properties (Expensive)
Changing these doesn't affect geometry, but the browser must still re-draw the
element's pixels.
- `background-color`, `background-image`
- `color`, `text-shadow`
- `box-shadow`, `border-radius`, `border-color`
- `visibility`

### 3. Composite Properties (Cheapest / 60fps)
Changing these allows the browser to simply move or fade existing layers
using the GPU (Compositor thread).
- `transform` (translate, rotate, scale, skew)
- `opacity`
- `filter` (some can be expensive, but they run on the GPU)

## Why the GPU Matters

The **Main Thread** is responsible for JavaScript, Style, Layout, and Paint. If
it's busy running a heavy script, a Layout-triggering animation will stutter.

The **Compositor Thread** (running on the GPU) is responsible for the Composite
stage. If an animation only affects `transform` or `opacity`, it can run on the
Compositor thread even if the Main Thread is blocked.

## Best Practices for 60fps

- **Promote to Layers:** Use `will-change: transform` to move an element to its
  own compositor layer.
- **Use `requestAnimationFrame`:** If you must use JavaScript for animation,
  always wrap it in `requestAnimationFrame` to ensure it runs at the start of
  the frame.
- **Debounce Scroll/Resize:** These events fire frequently and can trigger
  expensive Layout calculations.
