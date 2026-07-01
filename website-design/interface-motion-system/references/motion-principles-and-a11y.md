# Motion Principles and Accessibility

This reference covers the core principles of functional motion and the essential accessibility requirements for web interfaces.

## Core Principles

### 1. Motion should be Purposeful
Every animation should answer a question:
- "Where did this come from?" (Context)
- "What did I just click?" (Feedback)
- "What should I look at next?" (Hierarchy)

### 2. Motion should be Natural
In the physical world, objects don't start or stop instantly. Use **Easing** to simulate acceleration and deceleration. Avoid linear motion for spatial movement.

### 3. Motion should be Subordinate
Motion is a supporting element. It should never get in the way of a user completing their task. If an animation feels "slow," it's likely too long.

## Accessibility Guidelines (WCAG 2.1)

### 1. Respect User Preferences
Users may have vestibular disorders where motion causes dizziness or nausea.
- **Requirement:** Support the `prefers-reduced-motion` media query.
- **Action:** Disable large-scale movement, parallax, and "bouncy" effects. Stick to simple fades if necessary.

### 2. Allow Users to Control Motion
- **Auto-playing Content:** Any animation that lasts longer than 5 seconds must have a way for the user to pause, stop, or hide it.
- **Interactions:** Ensure motion doesn't interfere with keyboard navigation or screen reader announcements.

### 3. Avoid Flashing
- **The 3-Flash Rule:** Content must not flash more than three times in any one-second period, as this can trigger seizures.

### 4. Duration and Distance
- Large movements over a long distance are more likely to cause issues than small, localized movements.
- Keep "entry" animations localized to the element's final position.

## Recommended Easing Curves

- **Productive (Snappy):** `cubic-bezier(0.2, 0, 0, 1)`. Use for high-frequency tools.
- **Expressive (Fluid):** `cubic-bezier(0.4, 0, 0.2, 1)`. Use for brand-heavy landing pages.
- **Linear:** `linear`. Use ONLY for opacity and color transitions.
