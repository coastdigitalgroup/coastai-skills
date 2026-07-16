# Scroll-Linked Reveal

An element that scales up and fades in as it enters the viewport.

## Implementation

```html
<div class="reveal-box">
  <h2>Watch me grow</h2>
  <p>I animate as you scroll me into view.</p>
</div>
```

```css
@keyframes reveal-in {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.reveal-box {
  /* 1. Create a view timeline for this element */
  view-timeline-name: --box-reveal;
  view-timeline-axis: block;

  /* 2. Attach the animation */
  animation-name: reveal-in;
  animation-timeline: --box-reveal;

  /* 3. Define the range */
  /* entry 0%   = element top touches viewport bottom */
  /* entry 100% = element bottom touches viewport bottom */
  animation-range: entry 10% entry 80%;

  animation-fill-mode: both;
}
```
