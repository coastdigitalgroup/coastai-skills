# Browser Rendering Pipeline & CSS Performance

Understanding how the browser renders a frame is critical for implementing high-performance animations. The rendering pipeline consists of several stages; the later in the pipeline a property is handled, the "cheaper" it is to animate.

## 1. The Rendering Pipeline Stages

### Stage 1: Recalculate Style
The browser calculates which CSS rules apply to which elements and determines the final computed styles.

### Stage 2: Layout (Reflow)
The browser calculates the geometry of each element: where it is on the page and how much space it takes up. This is extremely expensive because changing one element's size can affect the positions of all its siblings and parents.

### Stage 3: Paint
The browser fills in the pixels for each element. This includes drawing text, colors, images, borders, and shadows.

### Stage 4: Composite
The browser draws the layers to the screen. Because the layers are already "painted," moving them or changing their transparency is very efficient and can be handled by the GPU (Graphics Processing Unit) instead of the CPU.

---

## 2. Property Performance Matrix

| CSS Property | Triggers Layout? | Triggers Paint? | Composite Only? |
| :--- | :---: | :---: | :---: |
| `transform` | ❌ | ❌ | ✅ |
| `opacity` | ❌ | ❌ | ✅ |
| `top` / `left` / `right` / `bottom` | ✅ | ✅ | ❌ |
| `width` / `height` | ✅ | ✅ | ❌ |
| `margin` / `padding` | ✅ | ✅ | ❌ |
| `font-size` / `line-height` | ✅ | ✅ | ❌ |
| `background-color` | ❌ | ✅ | ❌ |
| `box-shadow` | ❌ | ✅ | ❌ |
| `color` | ❌ | ✅ | ❌ |

---

## 3. Layer Promotion & GPU Acceleration

When an element is "promoted" to its own compositor layer, it is basically turned into a bitmap that the GPU can manipulate.

### How to trigger layer promotion:
- **`will-change`**: The modern, semantic way to signal intended changes (e.g., `will-change: transform`).
- **`transform: translateZ(0)`**: A "hack" often used to force hardware acceleration in older browsers.
- **`backface-visibility: hidden`**: Another common trigger for layer promotion.

### Why not promote everything?
- **Memory Consumption:** Every layer requires memory in the VRAM (Video RAM). Too many layers can lead to "blanking" or browser crashes, especially on mobile.
- **Texture Transfer:** Getting the bitmap data to the GPU takes time. If you promote an element and then immediately change a "Paint" property (like `color`), the browser must repaint the bitmap and re-upload it to the GPU, negating the benefit.

---

## 4. Debugging Tools in Chrome DevTools

1. **Rendering Tab**:
   - **Paint Flashing**: Highlights areas of the page that are being repainted in green.
   - **Layer Borders**: Shows the boundaries of compositor layers (orange) and tiles (cyan).
2. **Layers Panel**:
   - Provides a 3D view of the page's layers and explains *why* each layer was created (e.g., "Has a will-change: transform property").
3. **Performance Tab**:
   - Record a 1-2 second trace of an animation. Look for "Layout" (purple) and "Paint" (green) blocks in the main thread. A performant animation should show almost nothing on the main thread after it starts.
