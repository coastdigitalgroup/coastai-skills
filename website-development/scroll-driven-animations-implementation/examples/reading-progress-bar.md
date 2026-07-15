# Reading Progress Bar Example

This example demonstrates how to implement a reading progress bar at the top of a page that fills as the user scrolls through the content. It replaces the traditional JavaScript scroll listener with the native CSS `scroll()` function.

## Before (JavaScript Approach)

Historically, this required a `scroll` event listener on the `window`, which can impact performance if not throttled or debounced correctly.

```javascript
window.onscroll = function() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
};
```

## After (CSS-Native Approach)

Using the Scroll-Driven Animations API, this is entirely handled in CSS on the compositor thread.

### HTML Structure

```html
<div id="progress-container">
  <div id="progress-bar"></div>
</div>

<article>
  <h1>The Future of Web Performance</h1>
  <p>...</p>
  <!-- Long content here -->
</article>
```

### CSS Implementation

```css
#progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #eee;
  z-index: 100;
}

#progress-bar {
  height: 100%;
  background: #3b82f6;
  width: 100%;
  transform-origin: 0% 50%;

  /* 1. Define the animation */
  animation: grow-progress auto linear;

  /* 2. Link to the scroll position of the root (page) */
  animation-timeline: scroll(root block);
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

## Why this is better

1. **Performant:** The animation runs on the compositor thread, meaning it stays smooth even if the main thread is blocked by heavy JavaScript.
2. **Simple:** No complex math for scroll offsets is needed; the browser handles the mapping from scroll position to animation progress.
3. **Resilient:** It automatically updates when the window is resized or content is added dynamically without requiring additional listeners.
