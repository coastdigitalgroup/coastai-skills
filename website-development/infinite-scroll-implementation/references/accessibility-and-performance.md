# Accessibility & Performance Notes

## Performance: Why Intersection Observer?

Using `window.addEventListener('scroll', ...)` runs on every single pixel movement. Even with throttling or debouncing, the browser still has to execute code on the main thread frequently.

`IntersectionObserver` offloads this to the browser's internal optimizations. It only notifies your JavaScript when a specific element (the "sentinel") crosses a threshold.

### Optimization Tip: `rootMargin`
Don't wait for the user to see the sentinel. Use `rootMargin: '400px'` to trigger the load when the user is 400 pixels away from the bottom. This creates a "seamless" feel.

---

## Accessibility: The "Silent" UI Problem

Most infinite scroll implementations are completely invisible to screen reader users. When a sighted user scrolls, they see new items appear. A screen reader user, however, might be focused on an item in the middle of the list and have no idea that the list just grew by 20 items.

### The Solution: `aria-live`
1. Create a visually hidden element: `.sr-only { position: absolute; left: -10000px; ... }`.
2. Add `aria-live="polite"`.
3. Update the text:
   - When fetch starts: "Loading more products..."
   - When fetch ends: "20 more products added. 60 products total."

### The "Unreachable Footer" Problem
If you have a global footer with links like "Contact Us" or "Shipping Policy", a standard infinite scroll makes them impossible to click because every time the user nears the footer, more content is injected, pushing the footer further down.

**Fix:** Use a "Load More" button after the first 2 or 3 pages of results. This gives the user a "landing spot" to either continue loading or skip past the grid to the footer.

---

## SEO: The Crawler Perspective

Search engine crawlers (like Googlebot) may not scroll your page or trigger your JavaScript observers.

**Guidelines:**
- **SSR:** Always render the first 10-20 items on the server.
- **Fallbacks:** Provide a standard `<nav>` with pagination links wrapped in a `<noscript>` tag for environments where JS is disabled or for simpler crawlers.
- **Rel Next/Prev:** Use these in the `<head>` to indicate the relationship between pages.
