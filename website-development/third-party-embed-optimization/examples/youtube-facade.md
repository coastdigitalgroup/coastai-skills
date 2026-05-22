# YouTube Facade Implementation

This example demonstrates how to replace a standard, heavy YouTube iFrame with a high-performance facade that only loads the full player when the user clicks.

## Before (Standard Embed)

This version downloads over 600KB of JavaScript and multiple images immediately on page load, even if the user never watches the video.

```html
<!-- index.html -->
<div class="video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>
```

## After (Optimized Facade)

The optimized version loads a single ~20KB image and a small bit of CSS/JS. The full YouTube player is only requested when the user interacts.

### HTML

```html
<div class="video-wrapper">
  <!-- The button serves as the facade and the trigger -->
  <button
    class="youtube-facade"
    data-video-id="dQw4w9WgXcQ"
    aria-label="Play Video"
    style="background-image: url('https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');"
  >
    <div class="play-button"></div>
  </button>
</div>
```

### CSS

```css
.youtube-facade {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 560px; /* Match iFrame width */
  height: 315px; /* Match iFrame height */
  background-size: cover;
  background-position: center;
  border: none;
  cursor: pointer;
  position: relative;
}

.play-button {
  width: 68px;
  height: 48px;
  background-color: rgba(33, 33, 33, 0.8);
  border-radius: 12% / 17%;
  position: relative;
  transition: background-color 0.2s;
}

.play-button::before {
  content: '';
  border-style: solid;
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
}

.youtube-facade:hover .play-button {
  background-color: #ff0000;
}
```

### JavaScript

```javascript
document.querySelectorAll('.youtube-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const videoId = facade.getAttribute('data-video-id');
    const iframe = document.createElement('iframe');

    iframe.setAttribute('width', '560');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', 'true');

    // Replace facade with the iframe
    facade.parentNode.replaceChild(iframe, facade);
  });
});
```

## Performance Comparison

| Metric | Before | After (Initial Load) |
| :--- | :--- | :--- |
| **JS Weight** | ~620 KB | < 1 KB |
| **Requests** | 20+ | 2 |
| **LCP** | Delayed by JS | Immediate (Image) |
| **TBT** | 200ms+ | 0ms |
