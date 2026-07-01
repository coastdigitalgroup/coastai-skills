---
name: interface-motion-system
description:
  Design and implement a systematic framework for functional motion, defining
  durations, easing curves, and choreography to improve usability, feedback, and
  spatial mental models.
---

# Interface Motion System

## Purpose

The Interface Motion System provides a methodology for designing "functional
motion"—movement that serves a specific purpose in the user interface. It moves
beyond decorative animation to establish a system of **durations**, **easing
curves**, and **choreography** that helps users understand spatial
relationships, provides feedback for actions, and reduces cognitive load during
context shifts.

## Use Cases

- Defining standard transition timings and curves for a UI library.
- Designing complex layout shifts (e.g., expanding a card to full-screen).
- Establishing feedback motion for user actions (e.g., success checkmarks,
  loading spinners).
- Choreographing the entry and exit of UI layers (Modals, Drawers, Toasts).
- Using motion to guide attention toward a specific element or change.

## When NOT to Use

- **Static-Only Brand Aesthetics:** Where the visual style intentionally avoids
  motion to convey a specific tone (e.g., minimalist, brutalist, or "paper-like"
  designs).
- **Purely Decorative "Fluff":** Animations that add no functional value and
  distract the user from their primary task (e.g., background elements moving
  without interaction).
- **High-Latency Environments:** Where the performance cost of rendering motion
  outweighs the UX benefit, leading to "jank" or lag.

## Inputs

1. **Brand Personality:** Is the motion "Snappy/Productive" (fast, linear) or
   "Natural/Fluid" (bouncy, soft, organic)?
2. **Interaction Context:** What is moving? (Atomic element, container, or
   entire page).
3. **Trigger Type:** Is the motion triggered by the system (Loading), the user
   (Click/Hover), or the environment (Scroll)?
4. **Platform Capabilities:** Technical constraints of the target browsers or
   devices.

## Outputs

1. **Duration Scale:** A set of standardized timing tokens (e.g., `motion-fast`,
   `motion-standard`, `motion-slow`).
2. **Easing Palette:** A defined set of Bezier curves for different motion
   intents (e.g., `ease-in`, `ease-out`, `emphasized`).
3. **Choreography Rules:** Standards for how elements enter, exit, and move
   relative to each other.
4. **Motion Token Spec:** A documentation of motion variables for developers.

## Workflow

### 1. Establish the Duration Scale

Create a logical progression of timings based on the size of the change:
- **Fast (100–150ms):** For micro-interactions and atomic states (Hover, Toggle,
  Active).
- **Standard (200–300ms):** For medium-sized transitions (Dropdowns, Tooltips,
  Small expansions).
- **Slow (350–500ms):** For large layout shifts or immersive transitions
  (Modals, Page-level changes).

### 2. Define the Easing Curves

Assign semantic meaning to different Bezier curves:
- **Standard (Ease-in-out):** For elements moving from one point to another
  within the viewport.
- **Enter (Ease-out):** For elements appearing or entering the viewport (start
  fast, end slow to feel responsive).
- **Exit (Ease-in):** For elements disappearing or leaving the viewport (start
  slow, end fast to feel purposeful).
- **Emphasized (Complex):** A custom curve (e.g., `cubic-bezier(0.4, 0, 0.2, 1)`)
  for primary transitions that need to feel high-quality.

### 3. Design for Spatial Mental Models

Use motion to explain where an element came from and where it's going:
- **Directional Continuity:** If a drawer slides in from the right, it must
  exit to the right.
- **Parent-Child Relationship:** A child element (like a menu) should ideally
  originate from its parent (the button).

### 4. Choreograph Sequences (Staggering)

When multiple elements appear at once, avoid "The Pop-in" effect:
- **Staggering:** Introduce elements with a slight delay (20–50ms) between each
  to guide the eye in a specific order.
- **Directional Stagger:** Stagger items in the direction of reading (top-to-
  bottom or left-to-right).

### 5. Plan for Accessibility (Reduced Motion)

Motion must be inclusive:
- **The "Pre-flight" Check:** Always define a fallback for users who have
  "Reduce Motion" enabled at the OS level.
- **Alternative Visuals:** Replace motion with opacity fades or no animation at
  all when `prefers-reduced-motion` is active.

## Decision Rules

- **The "Functional First" Rule:** If you can't explain what a motion *tells* the
  user, remove it.
- **Responsive Timing:** Durations should be shorter on small screens (mobile)
  because the physical distance an element travels is smaller.
- **Speed over Fluidity for Action:** Interaction feedback (e.g., a button
  click) should feel instantaneous (<100ms) even if the resulting transition is
  longer.
- **No Infinite Loops:** Avoid non-stop looping animations (spinners, pulses)
  unless they represent an active, background-blocking state.

## Constraints

- **Accessibility:** Must respect `prefers-reduced-motion`. Motion must not
  trigger seizures (avoid rapid flashing or large-scale high-frequency patterns).
- **Performance:** Stick to "Compositor-only" properties (`transform` and
  `opacity`) to ensure 60fps performance. Avoid animating `width`, `height`, or
  `margin`.
- **Consistency:** Use the same duration and easing for the same component type
  across the entire site.

## Common Failure Patterns

- **The "Motion Sickness" Trap:** Using large, sweeping movements (e.g., the
  entire page sliding) that cause vestibular distress.
- **Sluggish Interfaces:** Setting durations too long (e.g., 1 second for a menu),
  making the user wait and the site feel broken.
- **Linear Motion:** Using "linear" easing, which feels mechanical and unnatural
  compared to the acceleration/deceleration found in the physical world.
- **Confusing Direction:** A modal that "grows" from the center but "slides"
  out to the bottom, breaking the user's spatial model.
- **The "Jitter" Effect:** Staggering elements with delays that are too long,
  making the page feel like it's loading slowly.

## Validation Criteria

- [ ] Every transition has a defined Duration and Easing token.
- [ ] Durations are proportional to the size of the transition (Fast for small,
      Slow for large).
- [ ] Motion supports a clear spatial mental model (Logical entry/exit).
- [ ] Staggering is used for multi-element reveals to guide the eye.
- [ ] Accessibility: `prefers-reduced-motion` is addressed with a clear
      simplification strategy.
- [ ] Performance: Only `transform` and `opacity` are used for frequent
      animations.
- [ ] Feedback motion (e.g., button click) starts in <100ms.
