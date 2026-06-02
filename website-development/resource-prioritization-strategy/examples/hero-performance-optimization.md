# Example: Hero Performance Optimization

This example demonstrates how to use resource prioritization hints to fix a slow Largest Contentful Paint (LCP) caused by late discovery and default browser priority.

## Scenario
A travel website has a large hero image that is defined in an external CSS file as a background image. Because the browser has to download the HTML, then the CSS, and then parse the CSS to find the image URL, the hero image starts loading very late in the waterfall.

### Before (Slow LCP)

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="styles.css">
  <script src="analytics.js"></script> <!-- Blocks parser -->
</head>
<body>
  <section class="hero">
    <h1>Adventure Awaits</h1>
  </section>
</body>
```

```css
/* styles.css */
.hero {
  background-image: url("hero-high-res.jpg"); /* Hidden from scanner */
  background-size: cover;
  height: 80vh;
}
```

**Issues:**
1. **Late Discovery:** The browser doesn't know about `hero-high-res.jpg` until `styles.css` is parsed.
2. **Parser Blocking:** `analytics.js` is at the top without `async` or `defer`, delaying the discovery of the CSS.
3. **Default Priority:** The background image is treated with "Low" priority by default in many browsers.

---

### After (Optimized LCP)

```html
<!-- index.html -->
<head>
  <!-- 1. Warm up the CDN connection -->
  <link rel="preconnect" href="https://cdn.example.com">

  <!-- 2. Preload the hidden critical asset -->
  <link rel="preload"
        as="image"
        href="hero-high-res.jpg"
        fetchpriority="high">

  <!-- 3. Preload critical font to prevent FOUT -->
  <link rel="preload"
        href="/fonts/brand-bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin>

  <link rel="stylesheet" href="styles.css">

  <!-- 4. Defer non-critical scripts -->
  <script src="analytics.js" defer></script>
</head>
<body>
  <section class="hero">
    <h1>Adventure Awaits</h1>
  </section>
</body>
```

## Impact
- **LCP Discovery Delay:** Reduced from ~1.5s to ~200ms because the browser sees the `preload` tag immediately in the HTML.
- **Priority:** The image is promoted from `Low` to `High` priority, ensuring it doesn't compete for bandwidth with smaller, less important images.
- **Visual Stability:** The critical font arrives earlier, reducing the time the user sees a fallback font.
- **TBT Improvement:** Moving `analytics.js` to `defer` frees up the main thread during the critical initial render phase.
