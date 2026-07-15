# Parallax and Reveal Example

This example demonstrates how to use `view-timeline` to create parallax backgrounds and element entrance animations that are controlled by their visibility in the viewport.

## Before (Intersection Observer Approach)

Entrance animations are often handled using Intersection Observer, which works well but can't "scrub" an animation frame-by-frame as the user scrolls.

```javascript
let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

observer.observe(document.querySelector('.reveal-item'));
```

## After (View-Timeline Approach)

With `view-timeline`, the animation is linked directly to the element's position relative to the viewport.

### HTML Structure

```html
<section class="spacer"></section>

<section class="reveal-container">
  <div class="reveal-item">
    <h1>Reveal on Scroll</h1>
    <p>This item fades in and scales as it enters the view.</p>
  </div>
</section>

<section class="parallax-section">
  <div class="parallax-bg"></div>
  <div class="parallax-content">
    <h2>Smooth Parallax</h2>
  </div>
</section>

<section class="spacer"></section>
```

### CSS Implementation

```css
/* 1. Element Reveal Pattern */
.reveal-item {
  opacity: 0;
  transform: translateY(50px) scale(0.9);

  /* Link to its own visibility in the viewport */
  animation: reveal linear both;
  animation-timeline: view();

  /* Start when it enters from bottom, finish when it's fully in view */
  animation-range: entry 10% entry 60%;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 2. Parallax Background Pattern */
.parallax-section {
  height: 60vh;
  position: relative;
  overflow: hidden;
  container-type: inline-size;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%; /* Taller than container to allow movement */
  background-image: url('landscape.jpg');
  background-size: cover;

  /* Create a parallax effect by shifting the background as it passes the view */
  animation: parallax linear both;
  animation-timeline: view();

  /* Full range from entering at bottom to leaving at top */
  animation-range: cover 0% cover 100%;
}

@keyframes parallax {
  from { transform: translateY(-10%); }
  to { transform: translateY(10%); }
}

.spacer { height: 100vh; }
```

## Why this is better

1. **Precision:** You can define exactly where the animation starts and ends (e.g., "when the top of the element hits 50% of the viewport").
2. **Scrubbing:** The animation "scrubs" back and forth as you scroll up and down, which is difficult and expensive to do in pure JavaScript.
3. **Compositor Efficiency:** Like `scroll()`, `view()` runs on the compositor thread for maximum smoothness.
