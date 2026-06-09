---
name: high-performance-css-animations
description:
  Implement and debug smooth, 60fps CSS animations by leveraging the compositor
  thread, avoiding layout thrashing, and respecting user motion preferences.
---

# High-Performance CSS Animations

## Purpose

The High-Performance CSS Animations skill provides a technical framework for
building UI transitions and animations that run at a consistent 60 frames per
second (fps). It focuses on offloading animation work to the browser's
compositor thread, minimizing "jank" caused by main-thread bottlenecks, and
ensuring accessibility for users with motion sensitivities.

## Use Cases

- Implementing smooth UI transitions (modals, dropdowns, sidebars).
- Creating interactive state changes (hover effects, button presses).
- Building lightweight loading indicators and skeleton screens.
- Auditing existing animations for performance bottlenecks (layout/paint
  triggers).
- Implementing entrance animations (scroll reveal, page transitions).

## When NOT to Use

- **Data-Driven Visualizations:** For thousands of moving parts, `<canvas>` or
  WebGL is often more performant than DOM-based CSS animations.
- **Complex Sequential Logic:** If an animation requires heavy coordination with
  complex application state or data fetching, a JS-based library (like GSAP or
  Framer Motion) might be more manageable.
- **Purely Functional Transitions:** If a state change should be instantaneous
  for usability (e.g., a "Delete" confirmation), avoid delaying the user with
  unnecessary animation.

## Inputs

1. **Target Elements:** The DOM elements to be animated.
2. **Animation Parameters:** Duration, easing function (timing), and delay.
3. **Trigger:** User interaction (hover, click), state change, or page load.
4. **Performance Target:** Maintain 60fps even on lower-end devices.

## Outputs

1. **Optimized CSS Rules:** Using `transform` and `opacity` for animation.
2. **Hardware Acceleration Hooks:** Proper use of `will-change` where necessary.
3. **Accessibility Overrides:** Implementation of `prefers-reduced-motion`
   media queries.
4. **Clean Keyframes:** Performant `@keyframes` definitions.

## Workflow

### 1. Select the Right Properties

Stick to the "Big Two" properties that only trigger **Composition** (not Layout
or Paint):
- **`transform`:** For moving (`translate`), scaling (`scale`), and rotating
  (`rotate`).
- **`opacity`:** For fading elements in and out.

### 2. Avoid Layout and Paint Triggers

Do not animate properties that force the browser to recalculate the page layout
or repaint pixels:
- **Avoid (Layout):** `width`, `height`, `margin`, `padding`, `top`, `left`,
  `bottom`, `right`, `font-size`, `display`.
- **Avoid (Paint):** `background-color`, `box-shadow`, `border-color`, `color`.

### 3. Implement Hardware Acceleration

For complex animations or elements that stutter:
- Use `will-change: transform` or `will-change: opacity` to signal the browser
  to promote the element to its own compositor layer.
- *Caution:* Use sparingly to avoid excessive memory consumption.

### 4. Choose Easing Wisely

- Use standard curves for natural movement: `ease-out` for entrances,
  `ease-in` for exits.
- For custom brand feel, use `cubic-bezier()` functions (e.g.,
  `cubic-bezier(0.34, 1.56, 0.64, 1)` for a "bouncy" effect).

### 5. Respect User Motion Preferences

Always wrap non-essential animations in a `prefers-reduced-motion` check:
```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}
```

### 6. Debug with DevTools

- Use the **Rendering** tab in Chrome DevTools to enable "Frame Rendering Stats"
  and "Paint Flashing."
- Check the **Performance** tab for "Long Tasks" and verify the animation is
  running on the "Compositor" thread.

## Decision Rules

- **Transition vs. Animation:** Use `transition` for simple A-to-B state
  changes (e.g., hover). Use `animation` (`@keyframes`) for complex, multi-step,
  or looping movements.
- **GPU Promotion:** Only use `will-change` if you observe actual performance
  issues; over-using it can lead to "blurry" text and high memory usage.
- **Duration:** Aim for 200ms–300ms for small UI interactions. Anything over
  500ms often feels sluggish to users.

## Constraints

- **Accessibility:** Animations must not flash more than three times per second
  (seizure prevention).
- **Battery Life:** Looping animations should be paused when the element is off-screen
  using `IntersectionObserver`.
- **Text Rendering:** Elements on their own compositor layers can sometimes
  suffer from subpixel anti-aliasing issues (blurry text). Use
  `backface-visibility: hidden;` as a potential fix.

## Non-Goals

- Building complex SVG path animations (see `svg-optimization-implementation`).
- Designing the visual "look and feel" or art direction of the animation.
- Handling data-fetching or backend state synchronization.

## Common Failure Patterns

- **Animating Physical Properties:** Using `top: 10px` to `top: 20px` which
  causes a layout reflow on every single frame.
- **Forced Synchronous Layout:** Reading a layout property (like `offsetHeight`)
  inside a loop that also updates styles, causing "layout thrashing."
- **The "will-change" Trap:** Applying `will-change` to everything, which
  exhausts GPU memory and crashes mobile browsers.
- **Ignoring Reduced Motion:** Creating high-motion effects that cause nausea or
  disorientation for sensitive users without a way to disable them.
- **Hidden Cost of Filters:** Animating `filter: blur()` or `backdrop-filter`
  is extremely expensive for the GPU and often drops frames.

## Validation Steps

- [ ] **Frame Rate Check:** Verify the animation hits ~60fps using the DevTools
      Rendering panel.
- [ ] **Paint Audit:** Ensure "Paint Flashing" is not triggered during the
      animation loop.
- [ ] **Reduced Motion Test:** Toggle "Reduced Motion" in system settings or
      emulate it in DevTools; verify the animation stops or simplifies.
- [ ] **Device Scaling Test:** Test on a low-powered mobile device to ensure
      smoothness.
- [ ] **Layout Shift Check:** Ensure the animation does not trigger Cumulative
      Layout Shift (CLS).
