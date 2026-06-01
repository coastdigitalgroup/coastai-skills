---
name: svg-optimization-implementation
description:
  Implement high-performance, accessible, and styleable SVG systems using
  optimization tools, efficient embedding methods, and robust accessibility patterns.
---

# SVG Optimization and Implementation

## Purpose

The SVG Optimization and Implementation skill provides a technical protocol for
delivering vector graphics that are lightweight, accessible, and easily
customized via CSS. It solves the problems of bloated SVG code, inconsistent
rendering across browsers, and "black box" graphics that cannot be styled or
interacted with programmatically.

## Use Cases

- Implementing a sitewide icon system using SVG sprites for performance.
- Optimizing complex vector illustrations to reduce DOM weight and payload size.
- Creating "theme-aware" graphics that change color based on CSS variables or
  system dark mode.
- Auditing existing SVG implementations for accessibility gaps or performance bottlenecks.
- Integrating third-party icons (e.g., from Figma or icon libraries) into a clean production codebase.

## When NOT to Use

- **Photographic Content:** Use the `responsive-images` skill for raster formats
  (WebP, AVIF, JPEG) when dealing with photos or complex gradients that SVGs
  cannot efficiently represent.
- **Extremely Complex Data Visualizations:** For thousands of data points,
  `<canvas>` is often more performant than SVG to avoid DOM bloat.
- **Simple CSS Shapes:** Use native CSS (borders, border-radius, clip-path) for
  basic geometric shapes to avoid unnecessary network requests or markup.

## Inputs

1. **Source SVG Assets:** Raw exports from design tools (Figma, Illustrator).
2. **Usage Context:** Is the SVG decorative, functional (icon-only button), or
   informational (illustration)?
3. **Styling Requirements:** Does the SVG need to change color, size, or
   animation state via CSS?
4. **Performance Targets:** Budget for DOM node count and initial page load.

## Outputs

1. **Optimized SVG Code:** Clean, minified markup stripped of editor metadata.
2. **Implementation Strategy:** Choice of embedding method (Inline, External
   Sprite, or `<img>` tag).
3. **Styling Hooks:** Use of `currentColor` and CSS variables for flexible
   theming.
4. **Accessibility Metadata:** Proper use of ARIA roles and labeling elements.

## Workflow

### 1. Optimize the Source

Raw SVG exports often contain 50-80% "junk" data (metadata, editor comments,
unused groups).
- **Tooling:** Use SVGO (SVG Optimizer) via CLI or web interface.
- **Key Plugins:** `removeViewBox: false` (keep for scaling), `removeUselessDefs`,
  `cleanupIds`, `convertColors`.
- **Manual Cleanup:** Ensure `fill` and `stroke` attributes are removed or
  replaced with `currentColor` if the SVG needs to be styled.

### 2. Choose Embedding Method

- **Inline SVG:** Best for unique, highly interactive, or theme-dependent
  graphics. Allows full CSS/JS control. *Caution: Increases HTML size.*
- **SVG Symbols (Sprite):** Best for repeated icons. Uses `<use xlink:href="#id">`.
  Can be inline in the HTML or loaded from an external file.
- **External `<img>` / `background-image`:** Best for purely decorative graphics
  that don't need CSS customization. Browsers cache these efficiently.

### 3. Implement Styling Hooks

- Replace hardcoded hex colors with `fill="currentColor"` or `stroke="currentColor"`.
- Use CSS variables for multi-color SVGs: `fill="var(--icon-primary)"`.
- Ensure the `viewBox` is present and `width`/`height` are set via CSS for
  responsive scaling.

### 4. Apply Accessibility Patterns

- **Decorative:** Add `aria-hidden="true"` and `focusable="false"` (for IE).
- **Functional:** Add `role="img"`, a `<title>` as the first child, and link it
  using `aria-labelledby="unique-id"`.
- **Complex:** Use `<desc>` for longer descriptions of illustrations.

### 5. Performance Orchestration

- For sprites, use an external sprite sheet (`icons.svg#name`) to leverage
  browser caching and keep HTML clean.
- Use `loading="lazy"` on `<img>` tags for SVGs below the fold.

## Decision Rules

- **Need CSS Control?**
  - YES: Inline SVG or `<use>` with a sprite.
  - NO: `<img>` or `background-image`.
- **Repeated on Page?**
  - YES: SVG Sprite (Symbol pattern).
  - NO: Inline SVG (if small) or `<img>`.
- **Is it an Icon?**
  - Set `fill="currentColor"` so it inherits text color.

## Constraints

- **Shadow DOM Limits:** When using `<use>` with external sprites, you cannot
  style *internal* parts of the SVG from the main page CSS (except for
  inherited properties like `fill`).
- **IE Support:** If legacy support is required, avoid advanced features like
  CSS variables inside SVGs or complex filter effects.
- **DOM Size:** Excessive inline SVGs can drastically increase the DOM node
  count, impacting lighthouse scores and interaction latency.

## Non-Goals

- Creating complex SVG animations (e.g., GSAP or Lottie).
- Generating SVGs dynamically from data (see D3.js or similar).
- Design-side creation of vector assets.

## Common Failure Patterns

- **Missing `viewBox`:** Causes the SVG to be "clipped" or fail to scale
  responsively in some browsers.
- **Duplicate IDs:** When inlining multiple SVGs or using sprites, duplicate
  IDs for gradients or masks will cause rendering bugs.
- **Hardcoded Colors:** Preventing the SVG from adapting to dark mode or
  hover states.
- **Accessibility Silence:** Using an SVG as a button without a label, leaving
  screen reader users with "Button, Unlabeled."
- **Blob Exports:** Exporting "outlined" text or complex paths that could be
  represented as simple shapes, leading to unnecessarily large files.

## Validation Criteria

- [ ] **Optimization Check:** Compare raw vs. optimized file size (aim for >50%
      reduction).
- [ ] **Responsiveness Test:** Verify the SVG scales correctly when its
      container changes size.
- [ ] **Styling Test:** Toggle CSS `color` or `fill` and verify the SVG updates.
- [ ] **Accessibility Audit:** Verify that `aria-hidden` is present for
      decorative icons and `<title>` is announced for functional ones.
- [ ] **Cache Test:** If using an external sprite/image, verify the browser
      receives a 304 or 200 (from cache) on subsequent loads.
