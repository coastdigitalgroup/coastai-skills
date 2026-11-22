# CSS Masking & Clipping Heuristics and Browser Behavior Reference

## 1. Browser Engine Rendering Pipeline & Spec Differences

Modern CSS Masking (W3C CSS Masking Module Level 1) is supported across all evergreen browser engines, but implementation history creates key differences between WebKit (Safari/iOS), Blink (Chrome/Edge), and Gecko (Firefox).

| Feature | Blink (Chrome / Edge) | WebKit (Safari / iOS) | Gecko (Firefox) |
| :--- | :--- | :--- | :--- |
| `clip-path: polygon()` | Native | Native | Native |
| `clip-path: path("M...")` | Native | Native (Safari 13.1+) | Native (Firefox 71+) |
| `mask-image` (Unprefixed) | Chrome 120+ | Requires `-webkit-` | Firefox 53+ |
| `-webkit-mask-image` | Full Support | Full Support | Full Support |
| `mask-composite` | Standard Syntax | `-webkit-mask-composite` | Standard Syntax |
| `mask-type` (alpha / luminance) | Native | Native | Native |

### Mandatory Rule
ALWAYS include `-webkit-mask-image`, `-webkit-mask-size`, `-webkit-mask-repeat`, and `-webkit-mask-position` declarations alongside standard CSS properties. iOS Safari and older Android Chromium webviews will fail to render unprefixed `mask-*` properties.

---

## 2. Stacking Contexts and Layer Allocation

Applying `clip-path` (other than `none`) or `mask-image` (other than `none`) forces browser layout engines to create a new **CSS Stacking Context** on the target element, identical to `opacity < 1`, `transform`, or `filter`.

### Architectural Implications
1. **Z-Index Scope Isolation:** Child elements with high `z-index` inside a clipped or masked container CANNOT stack above sibling elements outside that container if the sibling's container has a higher stacking context level.
2. **Fixed Positioning Traps:** Positioned children with `position: fixed` inside a masked/clipped container will be anchored relative to the masked container rather than the viewport in some legacy engines.
3. **Compositor Layer Promotion:** Masked elements are allocated an independent compositing layer. Over-using mask layers on dozens of list items simultaneously can increase VRAM footprint on mobile devices.

---

## 3. Hit-Testing & Pointer Event Behavior

A critical difference between `clip-path` and `mask-image` lies in pointer hit-testing and event bubbling:

### `clip-path`
- **Shrinks Interactive Geometry:** The pointer hit-test region (for `click`, `hover`, `pointermove`, `touchstart`) is clipped strictly to the interior of the vector geometry.
- **Translucent / Transparent Pass-Through:** Clicks on regions outside the `clip-path` polygon immediately hit underlying DOM elements.

### `mask-image`
- **Does NOT Alter Hit-Testing:** `mask-image` changes visual alpha/opacity, but fully transparent pixels (`opacity: 0` in the mask) STILL intercept pointer events by default!
- **Mitigation:** If pointer events must pass through transparent masked areas, apply `pointer-events: none` to decorative overlay elements, or pair `mask-image` with a matching `clip-path`.

---

## 4. Compositing Keyword Equivalences

When combining multiple mask layers via `mask-image: url(mask1.svg), url(mask2.svg)`, standard CSS and WebKit legacy syntax use different composite keyword models:

| Desired Compositing Effect | Standard `mask-composite` | Legacy `-webkit-mask-composite` |
| :--- | :--- | :--- |
| Additive Blend (Union) | `add` | `source-over` |
| Cutout / Subtract (Difference) | `subtract` | `destination-out` |
| Intersect (Overlap Only) | `intersect` | `source-in` |
| Exclusive Or (XOR) | `exclude` | `xor` |

---

## 5. Focus Ring Protection & Accessibility Rules

### The Truncated Focus Ring Bug
When an element with `clip-path` receives keyboard focus (`:focus-visible`), standard browser focus outlines (`outline: 2px solid ...`) extend outside the bounding box of the element. `clip-path` clips all child and outline rendering outside its defined coordinates, resulting in truncated, invisible, or single-sided focus rings.

### Resolution Strategies
1. **Unclipped Focus Wrapper (Recommended):** Place `clip-path` on an inner `<div>` or media element, while setting `:focus-visible` styling on the unclipped outer focusable `<button>` or `<a>` container.
2. **Inset Box-Shadow Ring:** Apply an inset shadow inside the clipped geometry:
   ```css
   .clipped-button:focus-visible {
     outline: none;
     box-shadow: inset 0 0 0 3px var(--focus-ring-color);
   }
   ```

---

## 6. Forced Colors Mode (High Contrast) Integration

Under Windows High Contrast Mode (`@media (forced-colors: active)`), system themes suppress custom background images, CSS linear gradients, and alpha masks to maximize text legibility.

### System Theme Fallback Protocol
Always reset custom masks and declare explicit high-contrast borders:

```css
@media (forced-colors: active) {
  .masked-container {
    -webkit-mask-image: none !important;
    mask-image: none !important;
    border: 2px solid CanvasText !important;
  }
}
```
