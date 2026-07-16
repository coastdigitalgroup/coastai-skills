---
name: scroll-driven-animations-implementation
description:
  Implement and debug performant, scroll-linked animations using native CSS
  scroll-timeline and view-timeline APIs, replacing high-overhead JavaScript-based solutions.
---

# Scroll-Driven Animations Implementation

## Purpose

The Scroll-Driven Animations Implementation skill provides a technical protocol
for implementing performant, scroll-linked animations using native CSS APIs.
By leveraging `scroll-timeline` and `view-timeline`, it allows developers to
link animation progress directly to the scroll position of a container or the
visibility of an element in the viewport, bypassing the performance bottlenecks
and complexity of JavaScript scroll listeners.

## Use Cases

- **Reading Progress Indicators:** Bars or counters that fill as the user
  scrolls through an article.
- **Parallax Effects:** Background or foreground elements that move at
  different speeds relative to the scroll.
- **Reveal-on-Scroll (Scroll-Linked):** Elements that fade in, scale, or
  transform as they move through the viewport.
- **Scroll-Linked Image Sequences:** Creating "scrubbable" animations or
  product reveals.
- **Fixed Header Transitions:** Shrinking or styling a header based on scroll
  progress.

## When NOT to Use

- **Simple Entrance Animations:** If an animation only needs to trigger once
  when an element enters the viewport, use `scroll-reveal-implementation`
  (Intersection Observer) for better browser support and less complexity.
- **Critical Functional Feedback:** Do not use scroll-driven animations for
  critical UI feedback that must be instantaneous and independent of scroll.
- **Legacy Browser Support:** If the project requires support for browsers
  older than Chrome 115 or Firefox 114 without polyfills, use a JavaScript-based
  alternative.

## Inputs

1. **Animation Definition:** The CSS `@keyframes` that define the visual
   transition.
2. **Scroll Container:** The element providing the scroll progress (usually
   `root` or a specific container).
3. **Trigger Element:** (For `view-timeline`) The element whose visibility in
   the viewport drives the animation.
4. **Animation Range:** The start and end points of the animation relative to
   the scroll or visibility (e.g., `entry 0%`, `exit 100%`).

## Outputs

1. **CSS Scroll Timeline:** Implementation of `scroll-timeline` or
   `view-timeline` on the target element.
2. **Linked Keyframes:** `@keyframes` specifically optimized for 0% to 100%
   progress mapping.
3. **Performance-Optimized CSS:** Use of compositor-only properties
   (`transform`, `opacity`) for smooth 60fps motion.
4. **Accessible Fallbacks:** Strategies for `prefers-reduced-motion` and
   unsupported browsers.

## Workflow

### 1. Define the Keyframes

Create `@keyframes` that represent the animation from start to finish.
Unlike time-based animations, these will be "scrubbed" by the scroll position.
```css
@keyframes progress-grow {
  from { scale: 0 1; }
  to { scale: 1 1; }
}
```

### 2. Establish the Timeline

- **For Page Progress:** Use the anonymous `scroll()` function or a named
  `scroll-timeline`.
- **For Element Visibility:** Use the anonymous `view()` function or a named
  `view-timeline`.

### 3. Attach the Animation

Link the keyframes to the timeline using the `animation-timeline` property.
Set `animation-duration: auto` (or a placeholder value) as the timeline
controls the progress.
```css
.progress-bar {
  animation-name: progress-grow;
  animation-timeline: scroll();
}
```

### 4. Configure Ranges (for View Timelines)

Use `animation-range` to define exactly when the animation should start and
end relative to the element entering/leaving the viewport.
- **`entry`:** From when the element first touches the viewport until it's
  fully inside.
- **`exit`:** From when the element starts to leave until it's fully gone.
- **`cover`:** (Default) From the very start of entry to the very end of exit.

### 5. Ensure Performance

Only animate compositor-friendly properties: `transform`, `opacity`, and
`filter`. Avoid properties that trigger layout (reflow) like `width`, `height`,
or `top`.

### 6. Implement Progressive Enhancement

- Wrap scroll-driven styles in a `@supports (animation-timeline: scroll())`
  block.
- Provide a static or Intersection Observer-based fallback for older browsers.
- Respect `prefers-reduced-motion` by disabling or simplifying animations.

## Decision Rules

- **`scroll()` vs. `view()`:** Use `scroll()` when the animation is tied to the
  overall scroll progress of a container. Use `view()` when the animation is
  tied to a specific element's position within the viewport.
- **Anonymous vs. Named Timelines:** Use anonymous functions (`scroll()`,
  `view()`) for simple, direct relationships. Use named timelines
  (`scroll-timeline-name`, `view-timeline-name`) when the animation and the
  trigger element are in different parts of the DOM tree.
- **Compositor Only:** If the animation stutters, check if you are animating
  layout properties. Switch to `transform` equivalents.

## Constraints

- **Browser Support:** Native support is currently best in Chromium-based
  browsers. Firefox support is behind a flag or in nightly. Safari support is
  in development.
- **Nesting:** Scroll timelines on nested containers require careful
  management of the `scroll-timeline-axis`.
- **Interactivity:** Elements being animated may have their hit areas moved;
  ensure buttons and links remain clickable.

## Non-Goals

- Building complex scroll-triggered logic that requires conditional branching
  (use JavaScript).
- Managing scroll-jacking or custom scrollbar styling.
- Implementing parallax for 1,000+ elements (consider Canvas or WebGL).

## Common Failure Patterns

- **Missing `animation-duration`:** Although the timeline controls the speed,
  failing to set an animation name or timeline correctly results in no motion.
- **Wrong Axis:** Forgetting that `scroll()` defaults to the vertical axis; if
  animating a horizontal slider, use `scroll(horizontal)`.
- **Layout Shift:** Animating `height` or `margin` in a scroll-timeline,
  causing the browser to re-calculate the entire page layout on every pixel
  scrolled.
- **Invisible Triggers:** Setting a `view-timeline` on an element that is
  `display: none`, which prevents the timeline from ever advancing.
- **Range Confusion:** Using `entry 100%` when you meant `exit 0%`, leading to
  animations that jump or end prematurely.

## Validation Steps

- [ ] **Feature Detection Test:** Verify the animation only runs in supporting
      browsers and doesn't break the layout in others.
- [ ] **Performance Audit:** Use the DevTools Performance panel to ensure no
      "Long Tasks" or "Layout" events are triggered by the scroll.
- [ ] **Range Accuracy:** Verify the animation starts and ends at the exact
      scroll points intended using the `animation-range` property.
- [ ] **Reduced Motion Test:** Enable "Reduce Motion" and verify the animation
      is disabled or replaced with a safe alternative.
- [ ] **Device Orientation Test:** Ensure the animation handles orientation
      changes (resizing of the viewport) correctly.
