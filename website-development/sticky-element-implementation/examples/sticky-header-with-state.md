# Detecting "Stuck" State with IntersectionObserver

CSS does not provide a native `:stuck` pseudo-class. To style an element
differently when it becomes sticky (e.g., adding a shadow or reducing height),
we use a "sentinel" element and the `IntersectionObserver` API.

## The Problem
You want to add a `is-stuck` class to a navigation bar when it hits the top of
the screen so you can apply a shadow.

## The Solution: Sentinel Pattern

### HTML Structure
Place a sentinel element immediately above the sticky header.

```html
<!-- The sentinel is a 0-height element used to trigger the observer -->
<div id="header-sentinel"></div>
<header class="sticky-header">
  <nav>...</nav>
</header>
```

### CSS
```css
.sticky-header {
  position: sticky;
  top: 0;
  transition: box-shadow 0.3s ease;
}

/* Styles applied only when the header is stuck */
.sticky-header.is-stuck {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
}

#header-sentinel {
  height: 0;
  visibility: hidden;
}
```

### JavaScript Implementation
```javascript
const header = document.querySelector('.sticky-header');
const sentinel = document.querySelector('#header-sentinel');

const observer = new IntersectionObserver((entries) => {
  // If the sentinel is NOT intersecting, it means it has scrolled
  // out of view at the top, and the header is now "stuck".
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add('is-stuck');
    } else {
      header.classList.remove('is-stuck');
    }
  });
}, {
  // root: null defaults to the viewport
  threshold: [0]
});

observer.observe(sentinel);
```

## Why this works
1. When the page is at the top, the sentinel is visible (intersecting).
2. As soon as the user scrolls down even 1px, the 0-height sentinel moves
   out of the viewport.
3. The observer fires, `entry.isIntersecting` becomes `false`, and we add
   the class.
4. When the user scrolls back to the very top, the sentinel enters the
   viewport again, and we remove the class.
