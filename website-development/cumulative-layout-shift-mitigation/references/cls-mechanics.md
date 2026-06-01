# Cumulative Layout Shift (CLS) References

## Browser Behavior & Layout Mechanics

- **Layout Instability API:** Browsers use this API to track layout shifts. A shift is only counted if the element's start position changes. Changes in size (if the top/left stays the same) usually don't trigger CLS for that element, but may shift elements *below* it.
- **500ms Grace Period:** Any shift that happens within 500ms of a "discrete user input" (like a click) is excluded from the CLS score. This allows for interactive menus and modals without penalty.
- **The "Pre-paint" Phase:** Modern browsers (Chrome 100+) attempt to "infer" aspect ratios from `width` and `height` attributes before any CSS is loaded. This is why these attributes are critical even if you use CSS for sizing.

## Web Vitals Specification

- **Impact Fraction:** The measure of how much space an unstable element takes up in the viewport.
- **Distance Fraction:** The measure of how far the element moved relative to the viewport.
- **CLS Formula:** `Layout Shift Score = Impact Fraction * Distance Fraction`.

## High-Impact Mitigation Strategies

### 1. Aspect Ratio Inference
Since 2020, all major browsers support "automatic aspect ratio" calculation.
```html
<!-- Browser sees this and reserves a 1.5:1 space immediately -->
<img src="photo.jpg" width="600" height="400">
```

### 2. bfcache (Back/Forward Cache)
Layout shifts can occur when a user navigates back to a page. Ensuring your site is bfcache-eligible prevents the "re-execution" of scripts that might inject content late, thus avoiding shifts on return visits.

### 3. Font Metric Overrides
Calculated by comparing the x-height and cap-height of your custom font vs. a system font.
- **Tool Recommendation:** [Font-style-matcher](https://meowni.ca/font-style-matcher/) or [Capsize](https://seek-oss.github.io/capsize/) can help generate the exact CSS overrides needed.

## Performance vs. Stability
Note that CLS mitigation sometimes involves a trade-off with Largest Contentful Paint (LCP). For example, preloading many fonts might improve CLS (by ensuring they are ready) but could delay the image that constitutes your LCP. Always measure both.
