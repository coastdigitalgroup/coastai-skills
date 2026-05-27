# Example: Hero Background Video Implementation

This example demonstrates how to replace a heavy, non-accessible hero GIF with
an optimized, accessible native video background.

## The Problem (Before)

The website used a 12MB animated GIF for the hero background.

- **Performance:** 12MB download on every page load.
- **Accessibility:** No way to pause the motion for users with vestibular
  disorders.
- **Visuals:** Poor color depth and "dithering" artifacts.

```html
<!-- BAD: High bandwidth, no control -->
<section class="hero">
  <img src="hero-background.gif" alt="Abstract background animation" />
  <h1>Welcome to our Product</h1>
</section>
```

## The Solution (After)

Using the Native Video Implementation skill, we replace the GIF with a muted,
looping `<video>` element.

### Optimized Markup

```html
<section class="hero">
  <video
    autoplay
    muted
    loop
    playsinline
    fetchpriority="high"
    poster="hero-poster.jpg"
    class="hero-video"
    aria-hidden="true"
  >
    <source src="hero-background.webm" type="video/webm" />
    <source src="hero-background.mp4" type="video/mp4" />
  </video>

  <div class="hero-content">
    <h1>Welcome to our Product</h1>
    <!-- A button to pause motion is an accessibility best practice -->
    <button id="pause-button" aria-label="Pause background video">Pause</button>
  </div>
</section>

<script>
  const video = document.querySelector('.hero-video');
  const pauseButton = document.querySelector('#pause-button');

  pauseButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      pauseButton.textContent = 'Pause';
      pauseButton.setAttribute('aria-label', 'Pause background video');
    } else {
      video.pause();
      pauseButton.textContent = 'Play';
      pauseButton.setAttribute('aria-label', 'Play background video');
    }
  });
</script>
```

### Optimized CSS

```css
.hero {
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  /* Prevent layout shift by providing an aspect ratio */
  aspect-ratio: 16 / 9;
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* Accessibility: Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .hero-video {
    display: none;
  }
  .hero {
    background-image: url('hero-poster.jpg');
    background-size: cover;
  }
}
```

## Implementation Key Gains

1.  **Bandwidth:** The WebM file is only 1.2MB (a 90% reduction from the GIF).
2.  **LCP:** The `poster` image appears immediately, while the video loads
    asynchronously.
3.  **Accessibility:**
    - The video is hidden from screen readers (`aria-hidden="true"`) as it is
      purely decorative.
    - Motion is disabled automatically for users with `prefers-reduced-motion`.
    - `playsinline` ensures it doesn't hijack the screen on mobile.
