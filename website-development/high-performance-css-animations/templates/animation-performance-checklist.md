# Animation Performance Audit Checklist

Use this template to evaluate the performance and accessibility of animations
on a frontend project.

## 1. Property Audit
- [ ] **Are all animations limited to `transform` and `opacity`?**
  - *Fail:* Animating `width`, `height`, `top`, `left`, `margin`, `padding`.
  - *Fail:* Animating `background-color`, `box-shadow`, `border-radius`.
- [ ] **Are there any expensive filters in use?**
  - *Note:* `blur()`, `drop-shadow()`, and `backdrop-filter` can be costly even
    on the GPU.

## 2. Rendering Pipeline Check
- [ ] **Paint Flashing:** Enable "Paint Flashing" in DevTools. Does the animated
      element stay "green" (repainting) or does it remain clear (compositing)?
- [ ] **Layout Shifts:** Use the "Experience" section in the Performance tab.
      Does the animation trigger any Cumulative Layout Shift (CLS)?
- [ ] **Layer Count:** Check the "Layers" panel. Are we creating an excessive
      number of layers (e.g., hundreds of small animated icons)?

## 3. Resource Management
- [ ] **`will-change` Usage:**
  - [ ] Is it used for elements that stutter?
  - [ ] Is it *removed* when the animation is finished (if dynamic)?
  - [ ] Is it avoided for large numbers of elements?
- [ ] **Off-screen Handling:** Are looping animations paused or hidden when
      not in the viewport?

## 4. Accessibility
- [ ] **`prefers-reduced-motion` Support:**
  - [ ] Does the UI remain functional if animations are disabled?
  - [ ] Are fast-moving or large-scale animations stopped for the `reduce` setting?
- [ ] **Seizure Safety:** Does any element flash or pulse more than 3 times
      per second?
- [ ] **Timing:** Are essential transitions fast enough (under 300ms) to not
      obstruct the user's flow?

## 5. Mobile & Low-End Device Verification
- [ ] **CPU Throttling:** Test with 4x or 6x CPU slowdown in DevTools. Does the
      animation remain smooth?
- [ ] **Interaction Latency:** Does the animation delay the "Interaction to Next
      Paint" (INP)? Use the "Interactions" track in the Performance panel.
