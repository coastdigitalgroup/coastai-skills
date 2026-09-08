# Visual Viewport API Browser Heuristics & Quirks Reference

## Mental Model: Layout Viewport vs. Visual Viewport

To build reliable mobile layouts with `window.visualViewport`, it is critical to understand the separation between the **Layout Viewport** and the **Visual Viewport**:

```text
+-------------------------------------------------------------+
| Layout Viewport (window.innerWidth x window.innerHeight)    |
| Fixed background, full page size baseline                  |
|                                                             |
|    +---------------------------------------------------+    |
|    | Visual Viewport (visualViewport.width/height)     |    |
|    | What the user actually sees on screen             |    |
|    | Affected by pinch-zoom & soft keyboards           |    |
|    +---------------------------------------------------+    |
|                                                             |
+-------------------------------------------------------------+
```

1. **Layout Viewport:** The container against which `position: fixed` CSS rules are evaluated by default. Its size matches `window.innerWidth` and `window.innerHeight`. On iOS Safari, **the Layout Viewport height does NOT change when the soft keyboard appears**.
2. **Visual Viewport:** The portion of the screen currently visible to the user. On soft keyboard open or pinch-zoom, the visual viewport shrinks and/or translates relative to the layout viewport.

---

## iOS Safari vs. Android Chrome Virtual Keyboard Quirks

### 1. iOS Safari Behavior
- **Layout Viewport Resize:** iOS Safari does **not** resize `window.innerHeight` when the virtual keyboard pops up. Instead, the soft keyboard overlays the layout viewport, shrinking `window.visualViewport.height`.
- **Layout Viewport Scroll Drift:** When an input receives focus near the bottom of the page, WebKit automatically scrolls the layout viewport vertically (`window.scrollY` increases). This causes fixed header bars (`top: 0`) to slide up off-screen.
- **Fix:** Intercept `focusin` on form inputs and reset layout scroll drift with `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })` after a short delay (300ms).

### 2. Android Chrome Behavior
- **Layout Viewport Resize:** Chrome historically resized the layout viewport (`window.innerHeight`) on virtual keyboard open.
- **`interactive-widget` Meta Tag:** Chrome 108+ added the `interactive-widget` viewport meta tag option:
  - `interactive-widget=resizes-visual`: Keyboard resizes only the visual viewport (matches iOS model).
  - `interactive-widget=resizes-content`: Keyboard resizes both layout and visual viewports.
  - `interactive-widget=overlays-content`: Keyboard overlays content without resizing either viewport.
- **Fix:** Declare `<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-visual">` to unify Android Chrome's behavior with iOS Safari.

---

## Performance Rules & `requestAnimationFrame` Batching

- **High Event Frequency:** During pinch-zooming and virtual keyboard slide animations, `window.visualViewport` fires both `resize` and `scroll` events at 60fps–120fps.
- **Synchronous Style Reads & Writes:** Querying `visualViewport.height` and setting `element.style.transform` directly inside an unbatched event handler forces synchronous layout recalculation on every frame.
- **Batching Pattern:** Always wrap reads and CSS variable writes in a `requestAnimationFrame` flag lock:

```javascript
let rafId = null;

function onViewportEvent() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    // Perform reads & writes here
  });
}

window.visualViewport.addEventListener('resize', onViewportEvent);
window.visualViewport.addEventListener('scroll', onViewportEvent);
```

---

## CSS Variable Integration Matrix

When sync JavaScript sets CSS variables on `:root`, use these dynamic properties in CSS rules:

| CSS Variable | Formula | Description / Primary Usage |
| :--- | :--- | :--- |
| `--vv-height` | `vv.height + 'px'` | Set modal container heights or mobile screen outer boundaries. |
| `--vv-width` | `vv.width + 'px'` | Set full visual width during pinch-zoom. |
| `--vv-offset-top` | `vv.offsetTop + 'px'` | Set `top:` position for fixed overlays during scroll drift. |
| `--vv-offset-bottom` | `Math.max(0, innerHeight - (vv.height + vv.offsetTop)) + 'px'` | Primary virtual keyboard offset. Used with `transform: translateY(calc(-1 * var(--vv-offset-bottom)))`. |
| `--vv-scale` | `vv.scale` | Inverse scale toolbars or badges during pinch-zoom: `transform: scale(calc(1 / var(--vv-scale)))`. |
