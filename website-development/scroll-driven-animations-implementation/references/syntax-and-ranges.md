# Syntax and Ranges Reference

The Scroll-Driven Animations API uses a specialized syntax for defining when animations start and end. Understanding these ranges is key to precise motion control.

## 1. Animation Timeline Syntax

### Anonymous Scroll Timelines
Directly link to a container's scroll.
- `scroll(root block)`: The main viewport scroll.
- `scroll(nearest block)`: The nearest scrollable parent.
- `scroll(self block)`: The element's own internal scroll.

### Anonymous View Timelines
Directly link to an element's visibility in its container.
- `view(block)`: The visibility of the element in its nearest scroll container.
- `view(inline)`: Horizontal visibility.

## 2. Animation Range Syntax

The `animation-range` property determines the active window of the animation.

| Range | Definition | Common Use |
| :--- | :--- | :--- |
| `entry` | Starts when the first pixel of the element enters the bottom of the viewport. Ends when the last pixel of the element has entered. | Entrance reveals, fade-ins. |
| `exit` | Starts when the first pixel of the element hits the top of the viewport. Ends when the last pixel leaves. | Fading out as you scroll past. |
| `cover` | Starts when the first pixel enters the bottom. Ends when the last pixel leaves the top. | Parallax backgrounds, scrubbers. |
| `contain` | Starts when the element is fully inside the viewport. Ends when it starts leaving. | Highlighting an element while it's fully visible. |

### Syntax for Start and End
`animation-range: <start-range> <percentage> <end-range> <percentage>;`

**Example:**
`animation-range: entry 20% entry 80%;`
Starts when 20% of the element's "entry" phase has passed, and ends when 80% is finished.

## 3. Named Timelines

Used when one element's scroll position drives an animation on a distant element.

```css
/* Container defining the timeline */
.article-scroller {
  scroll-timeline: --my-article block;
}

/* Distant element consuming it */
.progress-bar {
  animation-timeline: --my-article;
}
```

## 4. Hardware Acceleration

The browser automatically attempts to run these animations on the compositor thread. To ensure this:
- **Avoid** animating: `width`, `height`, `margin`, `padding`, `top`, `left`, `right`, `bottom`.
- **Prefer** animating: `transform`, `opacity`.

Animations on layout-triggering properties will be demoted to the main thread, causing jank during scroll.
