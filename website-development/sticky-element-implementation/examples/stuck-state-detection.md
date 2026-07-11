# Stuck-State Detection

This example demonstrates how to use the `IntersectionObserver` API to detect
when a sticky element becomes "stuck" at its threshold. This allows you to
apply dynamic styling, such as adding a box-shadow or shrinking the height,
when the element is pinned to the viewport.

## Scenario

A website header that is transparent initially but gains a background color and
shadow once the user scrolls past the hero section and the header "sticks" to
the top.

## Implementation

### HTML

We use a "sentinel" element placed just above the sticky header. When this
sentinel moves out of view, we know the header is stuck.

```html
<div class="sentinel"></div>
<header class="sticky-header">
  <nav>...</nav>
</header>
```

### CSS

```css
.sticky-header {
  position: sticky;
  top: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  background: transparent;
  padding: 2rem 0;
}

/* Styles applied when stuck */
.sticky-header.is-stuck {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

/* The sentinel is invisible and positioned where the "stick" happens */
.sentinel {
  height: 0;
  visibility: hidden;
}
```

### JavaScript

```javascript
const header = document.querySelector('.sticky-header');
const sentinel = document.querySelector('.sentinel');

const observer = new IntersectionObserver((entries) => {
  // if the sentinel is NOT intersecting the top of the viewport,
  // it means we have scrolled past it and the header is now stuck.
  entries.forEach(entry => {
    header.classList.toggle('is-stuck', !entry.isIntersecting);
  });
}, {
  // Use a small negative rootMargin if you want to trigger
  // slightly before or after the physical edge.
  threshold: [0]
});

observer.observe(sentinel);
```

## Why this works

- **Native Performance:** `IntersectionObserver` is significantly more
  performant than listening to the `scroll` event.
- **Reliability:** By observing a sentinel rather than the sticky element
  itself, we avoid "feedback loops" where changing the sticky element's
  dimensions triggers more scroll events.
