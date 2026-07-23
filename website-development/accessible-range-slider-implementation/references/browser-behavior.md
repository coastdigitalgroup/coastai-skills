# Range Slider Browser Behavior & Specifications

This reference document outlines key technical guidelines, browser gotchas, and accessibility specifications for single-thumb and multi-thumb (dual) range sliders.

---

## 1. Browser Styling & Pseudo-Elements

Styling the HTML5 `<input type="range">` requires targeting separate vendor-specific pseudo-elements because there is no standardized cross-browser standard for styling range elements yet.

### Webkit/Blink Browsers (Chrome, Safari, Edge, Opera)
- Track selector: `::-webkit-slider-runnable-track`
- Thumb selector: `::-webkit-slider-thumb`
- Reset requirement: Set `-webkit-appearance: none;` on both the input element and the thumb selector to override native OS styling.

### Firefox (Gecko)
- Track selector: `::-moz-range-track`
- Thumb selector: `::-moz-range-thumb`
- Progress fill (native single slider only): `::-moz-range-progress`

### Crucial Styling Rule: Separated Selectors
You **must never group vendor-specific pseudo-elements into a single comma-separated rule**, like this:
```css
/* INVALID - DO NOT DO THIS */
input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb {
  background: blue;
}
```
**Why:** Browsers are strictly specified to discard an entire CSS rule block if they encounter any pseudo-element selector they do not recognize. Thus, Safari/Chrome will discard this entire block because they don't understand `::-moz-range-thumb`, and Firefox will discard it because it doesn't understand `::-webkit-slider-thumb`. You must write separate CSS rule blocks for each pseudo-element.

---

## 2. Keyboard Interaction Specs (WAI-ARIA APG)

When focusing a native `<input type="range">` (or custom elements with `role="slider"`), standard platforms expect the following interactive behaviors:

| Key | Expected Action |
|---|---|
| `ArrowRight` / `ArrowUp` | Increase the slider value by one step. |
| `ArrowLeft` / `ArrowDown` | Decrease the slider value by one step. |
| `PageUp` | Increase the slider value by a larger increment (typically 10% of the slider range, or custom step value multiplier). |
| `PageDown` | Decrease the slider value by a larger increment. |
| `Home` | Move the slider value immediately to its defined `min` boundary. |
| `End` | Move the slider value immediately to its defined `max` boundary. |

Native `<input type="range">` implements all of these keyboard events natively, which is why overlapping native range inputs is such a powerful pattern.

---

## 3. WCAG 2.2 Accessibility Criteria

When building or reviewing range sliders, ensure complete compliance with the following Web Content Accessibility Guidelines (WCAG) criteria:

### SC 1.4.11 - Non-Text Contrast (Level AA)
The visual boundaries of the slider track and thumb handle must have at least a **3:1 contrast ratio** against the background color on which they sit. This applies to:
- The inactive background track.
- The active range fill.
- The thumb handle borders and inner shapes.

### SC 2.5.8 - Target Size (Minimum) (Level AA)
Any interactive control, including the slider thumb handle and clickable track, must have a target size of at least **24x24 CSS pixels**, unless an equivalent target is available or the target is in a sentence. (Note: A touch target size of **44x44 CSS pixels** or larger is highly recommended for standard mobile layouts to maximize ease of use).

### SC 2.4.11 - Focus Appearance (Level AA)
The keyboard focus indicator (focus ring) must:
- Have a contrast ratio of at least **3:1** against the background.
- Not be obscured or clipped by the parent container's `overflow: hidden` boundaries, which commonly occurs with custom absolute-positioned slider layouts.
