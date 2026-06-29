# Modal Scroll Lock Stability

This example demonstrates how to prevent the common "layout jump" that occurs
when opening a modal and locking the body scroll.

## The Problem

When a modal opens, developers often set `document.body.style.overflow = 'hidden'`
to prevent the background from scrolling. On systems with "Classic" scrollbars
(like Windows or Linux with a mouse), the scrollbar is part of the layout.
Removing it causes the entire page content to shift to the right to fill the
newly available space.

## Implementation

### Before (Jumpy)

```javascript
// Opening the modal
function openModal() {
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden'; // Scrollbar disappears, layout jumps!
}
```

### After (Stable)

```javascript
/**
 * A robust modal toggle that prevents layout shift
 */
function toggleModal(isOpen) {
  const modal = document.getElementById('modal');
  const fixedElements = document.querySelectorAll('.fixed-header, .fixed-cta');

  if (isOpen) {
    // 1. Calculate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // 2. Lock body scroll and compensate with padding
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // 3. Compensate fixed elements (they don't inherit body padding)
    fixedElements.forEach(el => {
      el.style.paddingRight = `${scrollbarWidth}px`;
    });

    modal.classList.add('open');
  } else {
    // 4. Restore everything
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    fixedElements.forEach(el => {
      el.style.paddingRight = '';
    });

    modal.classList.remove('open');
  }
}
```

## CSS Optimization

In modern browsers, you can reduce the jumpiness of content growth (before the
modal is even opened) by reserving the gutter.

```css
/* Global CSS */
html {
  /* Reserves space for the scrollbar if it will eventually appear */
  scrollbar-gutter: stable;
}

/* Ensure fixed elements don't shift when body padding is applied */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Use box-sizing to ensure padding doesn't affect width calculations */
  box-sizing: border-box;
}
```
