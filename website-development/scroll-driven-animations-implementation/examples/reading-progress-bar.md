# Reading Progress Bar

A common use case for `scroll-timeline` is a reading progress bar that fills
as the user scrolls down a page.

## Implementation

```html
<!-- The progress bar element -->
<div class="progress-bar"></div>

<article>
  <h1>The Future of Web Animations</h1>
  <p>Long content goes here...</p>
</article>
```

```css
/* 1. Define the filling animation */
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: #3498db;
  transform-origin: 0 50%;
  z-index: 1000;

  /* 2. Link the animation to the document scroll */
  animation-name: grow-progress;
  animation-timeline: scroll();
  animation-timing-function: linear;
}

/* 3. Handle Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .progress-bar {
    animation: none;
    transform: scaleX(1); /* Full bar as a fallback or hide it */
    opacity: 0.5;
  }
}
```

---

# Parallax Hero Reveal

Using `view-timeline` to create a parallax effect as a hero image enters or
leaves the viewport.

## Implementation

```html
<section class="hero-container">
  <img src="hero.jpg" class="parallax-bg" alt="Mountain Landscape">
  <div class="hero-content">
    <h1>Explore the Peaks</h1>
  </div>
</section>

<section class="content">
  <p>Scroll down to see the effect...</p>
</section>
```

```css
.hero-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  /* Define the view timeline on the container */
  view-timeline-name: --hero-scroll;
}

.parallax-bg {
  width: 100%;
  height: 120%; /* Extra height for the travel distance */
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  /* Link the movement to the container's visibility */
  animation-name: parallax-up;
  animation-timeline: --hero-scroll;
  animation-range: exit; /* Only animate as the hero is leaving */
  animation-timing-function: linear;
}

@keyframes parallax-up {
  from { transform: translateY(0); }
  to { transform: translateY(-20%); }
}
```
