# Motion Principles and Accessibility

A reference guide for designing motion that is both functional and inclusive.

## Core Motion Principles (Disney's 12 adjusted for UI)

1.  **Timing and Spacing:** Proper duration determines the "weight" of a UI
    element.
2.  **Ease In/Out:** Objects in nature don't start or stop instantly; UI
    elements shouldn't either.
3.  **Staging (Choreography):** Use motion to direct the user's eye to the
    most important action.
4.  **Anticipation:** Provide a subtle hint *before* a major movement (e.g.,
    button press before expansion).
5.  **Exaggeration:** Use sparingly to highlight success or error states
    (e.g., a "shake" for a wrong password).

## WCAG Accessibility Standards

### 1. SC 2.3.1: Three Flashes or Below
Ensure that no motion or animation flashes more than three times per second.
Failure can cause seizures.

### 2. SC 2.2.2: Pause, Stop, Hide
For any moving, blinking, or scrolling information that (1) starts automatically,
(2) lasts more than five seconds, and (3) is presented in parallel with other
content, there must be a mechanism for the user to pause, stop, or hide it.

### 3. SC 2.3.3: Animation from Interactions (Level AAA)
Motion animation triggered by interaction can be disabled, unless the animation
is essential to the functionality or the information being conveyed.

## Best Practices for "Safe" Motion

- **Avoid the "Vestibular Trigger":** Large-scale motion, especially parallax
  effects, zooming, and horizontal sliding that covers more than 30% of the
  viewport, can cause dizziness/nausea.
- **Opacity is your friend:** When in doubt, a quick `opacity` fade is the
  safest, most accessible way to transition content.
- **Keep it short:** Most functional motion should finish in under 300ms to
  ensure the interface feels responsive and doesn't annoy the user.

## Reference Links
- [WCAG 2.1 Motion Standards](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Val Head: Designing Safer Web Animation](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)
- [Material Design: Motion System](https://m3.material.io/styles/motion/overview)
