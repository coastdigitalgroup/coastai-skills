# CSS Custom Highlight API: Technical Reference & Browser Heuristics

This reference document details the internal browser mechanics, rendering pipeline behavior, CSS specification constraints, and performance heuristics for working with the W3C CSS Custom Highlight API (`CSS.highlights`, `Highlight`, `Range`, `::highlight()`).

---

## 1. Specification & Browser Engine Support

The CSS Custom Highlight API Module Level 1 specifies a mechanism for styling arbitrary text ranges without altering the document structure.

### Browser Baseline Engine Support

| Engine | Minimum Version | Native Support Status |
| :--- | :--- | :--- |
| **Blink (Chrome, Edge, Opera, Brave)** | Chrome 105+ (Sep 2022) | Full native support |
| **WebKit (Safari, iOS Safari)** | Safari 17.2+ (Dec 2023) | Full native support |
| **Gecko (Firefox)** | Firefox 127+ (June 2024) | Full native support |

*Current Baseline Status:* As of 2024, the CSS Custom Highlight API is available across all major browser engines in modern versions.

---

## 2. Rendering Pipeline & Paint Mechanics

Understanding how browser engines render custom highlights explains why the Highlight API outperforms traditional DOM element wrapping (`<mark>`).

### The Rendering Pipeline Stages

1. **DOM Tree Construction:** HTML nodes are parsed into the DOM tree.
2. **Style Recalculation:** CSS rules are matched to DOM nodes to generate computed styles.
3. **Layout Phase (Reflow):** Geometry (x, y, width, height) of every box on screen is calculated.
4. **Paint Phase:** Pixels are filled on display surfaces (backgrounds, text glyphs, borders).
5. **Compositing:** Layers are assembled and shipped to the GPU for rasterization.

### Why DOM Wrapping (`<mark>`) Triggers Layout Thrashing

When wrapping matching text in `<mark>` elements:
- Inserting HTML elements alters the DOM tree structure.
- The engine must invalidate computed styles for parent containers.
- The layout phase MUST re-evaluate text flow, line breaking, inline box bounds, and surrounding sibling positions.
- In long documents with thousands of matches, DOM wrapping causes noticeable main-thread jank, long tasks (>50ms), and cumulative layout shifts (CLS).

### How CSS Custom Highlight API Operates

When using `CSS.highlights.set(name, new Highlight(...ranges))`:
- The DOM tree structure remains 100% UNCHANGED.
- The browser skips the Layout Phase entirely during highlight updates.
- During the **Paint Phase**, when drawing text glyphs, the browser intersects active `Text` node glyph bounds with registered `Range` boundary offsets.
- Highlight background fills and text decorations are painted directly behind/over text glyphs in a single paint pass.
- **Performance Impact:** Instantaneous (sub-millisecond) render times regardless of document size or match count.

---

## 3. Allowed vs Ignored CSS Properties

To maintain zero-layout guarantees, the W3C specification strictly limits which CSS properties can be applied inside `::highlight()` pseudo-element selectors.

### Allowed Paint-Only Properties

```css
::highlight(example-highlight) {
  /* Text and background colors */
  color: #0f172a;
  background-color: #fef08a;
  -webkit-text-fill-color: #0f172a;

  /* Text decoration sub-properties */
  text-decoration-line: underline;
  text-decoration-color: #ca8a04;
  text-decoration-style: wavy;
  text-decoration-thickness: 2px;

  /* Text shadows */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  /* SVG text stroke and fill */
  fill: #2563eb;
  stroke: #1d4ed8;
  stroke-width: 1px;
}
```

### Ignored Box Model & Layout Properties

The following properties are **explicitly ignored** by browser engines inside `::highlight()` pseudo-elements:
- `display`, `position`, `float`, `clear`
- `margin`, `padding`, `border`, `border-radius`
- `width`, `height`, `min-width`, `max-width`
- `font-size`, `font-family`, `font-weight`, `line-height`, `letter-spacing`
- `transform`, `opacity`, `filter`

*Attempting to add rounded pill borders or padding to a `::highlight()` background will be silently ignored by the browser layout engine.*

---

## 4. Range Object Dynamics & Mutation Mechanics

A DOM `Range` object tracks boundary offsets (`startContainer`, `startOffset`, `endContainer`, `endOffset`).

### Live Boundary Tracking

- A `Range` maintains live references to DOM nodes.
- If text *before* a range is edited or inserted *within the same text node*, the browser automatically adjusts character offsets in the live `Range`.
- However, if the text node containing the range is split, removed, or replaced (e.g. via `element.innerHTML = ...` or framework virtual DOM updates), the `Range` points to a detached node and becomes invalid.

### Best Practices for Range Management

1. **Re-index on DOM Content Changes:** Always observe container mutations (`MutationObserver`) and re-run search indexing to build fresh `Range` objects when text content is modified.
2. **Clear Stale Highlights on Unmount:** Call `CSS.highlights.delete(name)` when destroying view components to allow garbage collection of associated `Range` and `Text` node references.

---

## 5. Accessibility & Screen Reader Considerations

Because the CSS Custom Highlight API operates strictly during the visual paint phase:
- It does **NOT** alter the DOM accessibility tree (`AXTree`).
- Screen readers (NVDA, JAWS, VoiceOver, TalkBack) will NOT announce custom highlights as `<mark>` elements or verbalize "highlighted".
- The plain-text reading flow for screen reader users remains identical to un-highlighted text.

### Required Accessibility Patterns

1. **Provide ARIA Live Regions:** Always maintain an explicit `aria-live="polite"` element that announces match status:
   ```html
   <div id="search-status" class="sr-only" aria-live="polite">
     3 matches found for "performance". Match 1 active.
   </div>
   ```
2. **Ensure WCAG Color Contrast:** Check that `color` and `background-color` inside `::highlight()` meet WCAG AA contrast standards (minimum 4.5:1 ratio).
3. **Support High Contrast Mode (`forced-colors`):**
   ```css
   @media (forced-colors: active) {
     ::highlight(search-results) {
       background-color: Highlight;
       color: HighlightText;
     }
   }
   ```
