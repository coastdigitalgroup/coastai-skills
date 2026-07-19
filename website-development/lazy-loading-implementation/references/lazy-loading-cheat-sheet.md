# Lazy Loading Cheat Sheet & Technical Reference

## 1. Browser Behavior Quirks & Mechanics

### Native `loading="lazy"` Mechanics
When you apply `loading="lazy"` to an `<img>` or `<iframe>` tag, the browser defers fetching the resource until it is close to the viewport.
- **Distance Thresholds:** Browsers do not wait until the element is exactly `0px` from the viewport to start downloading. To ensure a smooth experience, browsers use dynamic distance thresholds that adapt based on the user's connection type (e.g., 4G vs. 3G) and device type.
- **Chrome Distance Thresholds:**
  - **4G / Wi-Fi:** Starts fetching when the image is within `1250px` vertically.
  - **3G:** Starts fetching when within `2500px` vertically to account for high network latency.
  - **Offline/2G:** Throttles even more aggressively or defaults to low-res placeholder images.
- **Hidden Elements:** If an element has `display: none` or `visibility: hidden`, or is structured with `width: 0; height: 0;`, Chrome and Safari may treat it as outside the viewport indefinitely, meaning native lazy loading assets will *never* download until their styles change.

---

## 2. Comparison Matrix: Native vs. Custom Observers

| Feature | Native `loading="lazy"` | Custom `IntersectionObserver` |
| :--- | :--- | :--- |
| **JS Required** | **No** (Fully declarative) | **Yes** (Requires setup and execution) |
| **Element Support** | `<img>`, `<iframe>` only | Any element (`div`, `section`, etc.) |
| **Styling Control** | Harder (Relies on browser-specific classes/events) | **Easy** (JS appends classes on load) |
| **Custom Offsets** | No (Controlled by browser heuristics) | **Yes** (via `rootMargin` config) |
| **Background Images** | No | **Yes** (Perfect for hero or card blocks) |
| **SEO Indexability** | **Excellent** (Built-in search engine support) | Medium (Indexable only if `<noscript>` is present) |
| **Memory Footprint** | Extremely Low (C++ native optimization) | Low to Medium (Depends on handler cleanup) |

---

## 3. Web Vitals & Performance Checklist

### Largest Contentful Paint (LCP) Preservation
- **The LCP Trap:** Applying lazy loading to above-the-fold hero elements slows down their load initiation. The browser must parse the HTML, compute the CSS layout, determine element visibility, and only *then* queue the network fetch.
- **Rule of Thumb:**
  - **First 1-2 images** on any page must be set to `loading="eager"` (or simply have no loading attribute).
  - Add `fetchpriority="high"` to the main hero image.
  - Add `decoding="async"` to all images below the fold, and `decoding="sync"` to the primary LCP image.

### Cumulative Layout Shift (CLS) Prevention
When lazy-loaded images finish downloading, they will push subsequent page text downwards if they do not have a reserved placeholder space.
- **The Modern CSS Solution:** Always pair `loading="lazy"` with explicit `width` and `height` HTML attributes.
  ```html
  <img src="pic.jpg" width="600" height="400" loading="lazy" />
  ```
- **How it works:** The browser reads the `width` and `height` attributes to calculate the image's aspect ratio before downloading the file, reserving a blank placeholder box in the layout flow.
- **The Aspect Ratio Trick:**
  ```css
  img {
    width: 100%;
    height: auto;
    aspect-ratio: attr(width) / attr(height); /* Supported in modern browsers */
  }
  ```

---

## 4. Single Global Observer Pattern
To avoid visual lag and CPU overhead, always register all observed elements to a single shared `IntersectionObserver` instance instead of spinning up dozens of individual observers.

```javascript
// High Performance Singleton Observer Configuration
class GlobalLazyObserver {
  static instance = null;

  static getObserver() {
    if (!this.instance) {
      this.instance = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // Load logic here...
            observer.unobserve(el);
          }
        });
      }, {
        rootMargin: '200px 0px 200px 0px',
        threshold: 0.01
      });
    }
    return this.instance;
  }
}
```

---

## 5. Print Layout Compatibility

Standard lazy-loading patterns utilizing JavaScript `data-` attributes do not resolve when a page is printed because standard print dialogs do not trigger scrolling behaviors to intersect elements.

**The Fix:** Bind a listener to the `beforeprint` event on the window object to force-load all lazy-loading assets immediately before the print rendering engine fires.

```javascript
window.addEventListener('beforeprint', () => {
  // 1. Force load background images
  document.querySelectorAll('[data-bg]').forEach(element => {
    const bgUrl = element.getAttribute('data-bg');
    if (bgUrl) {
      element.style.backgroundImage = `url('${bgUrl}')`;
    }
  });

  // 2. Force load inline images
  document.querySelectorAll('[data-src]').forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = src;
    }
  });
});
```
