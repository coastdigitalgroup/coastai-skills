# Scroll-Driven Animations: Syntax and Ranges

## Timeline Syntax

### Anonymous Timelines
The quickest way to link an animation is using the `scroll()` and `view()` functions.

- **`scroll(axis, root)`**:
  - `axis`: `block` (default), `inline`, `x`, `y`.
  - `root`: `nearest` (default), `root`, `self`.
- **`view(axis, inset)`**:
  - `axis`: `block` (default), `inline`.
  - `inset`: Viewport offsets (similar to `scroll-margin` or `rootMargin`).

### Named Timelines
Useful for cross-element animation or complex nesting.

```css
.scroller {
  scroll-timeline-name: --nav-scroll;
}

.nav-item {
  animation-timeline: --nav-scroll;
}
```

## Animation Ranges

The `animation-range` property is a shorthand for `animation-range-start` and
`animation-range-end`. It defines the window of scroll progress during which
the animation plays.

| Range Name | Start Point | End Point |
| :--- | :--- | :--- |
| `cover` | Top of element enters viewport bottom | Bottom of element leaves viewport top |
| `entry` | Top of element enters viewport bottom | Bottom of element enters viewport bottom |
| `exit` | Top of element leaves viewport top | Bottom of element leaves viewport top |
| `contain` | Bottom of element enters viewport bottom | Top of element leaves viewport top |

## Performance and Constraints

- **Main Thread Offloading:** Unlike JavaScript `scroll` listeners, native
  SDA runs on the compositor thread (for supported properties).
- **Properties:** Stick to `transform`, `opacity`, and `filter` for the best
  performance. Avoid `width`, `height`, `left`, `top`, etc.
- **Browser Support:**
  - Chrome / Edge: 115+
  - Firefox: 114+ (Partial, check `layout.css.scroll-driven-animations.enabled`)
  - Safari: In development (TP 171+)
