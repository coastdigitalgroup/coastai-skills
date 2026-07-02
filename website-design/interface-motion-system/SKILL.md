---
name: interface-motion-system
description:
  Design and document functional motion and transitions to communicate
  spatial relationships, provide interaction feedback, and guide user
  attention.
---

# Interface Motion System

## Purpose

The Interface Motion System provides a methodology for designing functional
motion that enhances the user experience. It moves beyond "decoration" to a
structured application of movement that helps users understand spatial
relationships, provides feedback for interactions, and guides attention to
priority elements. By defining consistent durations, easing curves, and
choreography, this system ensures that motion is purposeful, predictable, and
accessible.

## Use Cases

- Defining transition patterns for page navigations or route changes.
- Designing the choreography for complex UI reveals (e.g., expanding cards,
  opening drawers).
- Establishing a standard for micro-interactions (e.g., button feedback,
  loading states).
- Managing spatial continuity when elements move between different locations
  in a layout.
- Designing motion-based focus indicators for high-performance interfaces.

## When NOT to Use

- **Static-First Sites:** Minimalist or text-heavy sites where motion would
  distract from reading (e.g., documentation or legal sites).
- **Decorative Animation:** For purely aesthetic "eye-candy" or branding
  animations that do not serve a functional purpose.
- **Narrative Storytelling:** For linear, non-interactive motion sequences (like
  a video intro or cinematic scroll-telling).
- **Low-Performance Environments:** Where the target hardware or network
  constraints make smooth 60fps motion unattainable.

## Inputs

1. **Information Architecture (IA):** To understand the spatial relationship
   between pages and components.
2. **Component Inventory:** The list of elements that require interaction
   feedback or transition logic.
3. **Brand Identity:** To determine the "flavor" of motion (e.g., snappy/technical
   vs. smooth/elegant).
4. **Platform Constraints:** Browser support and performance requirements for
   animation engines (CSS vs. JS).

## Outputs

1. **Motion Token Spec:** Defined durations and easing curves (e.g., `--ms-fast`,
   `--ease-out-back`).
2. **Transition Blueprint:** Rules for how elements enter, exit, and move
   within the viewport.
3. **Choreography Map:** Sequential timing for multi-element reveals (stagger
   logic).
4. **Accessibility Strategy:** Guidelines for respecting user motion preferences
   (e.g., `prefers-reduced-motion`).

## Workflow

### 1. Define Motion Tokens

Establish a consistent foundation of timing and easing:
- **Duration:** Define a scale (e.g., 100ms for micro-feedback, 200ms for small
  reveals, 400ms for large transitions).
- **Easing:** Select standard curves.
  - _Productive (Linear/Standard):_ For functional, quick responses.
  - _Expressive (Back/Elastic):_ For brand-focused, playful interactions.
  - _Entrance (Ease-out):_ For items appearing in the view.
  - _Exit (Ease-in):_ For items leaving the view.

### 2. Map Spatial Metaphors

Determine how motion reflects the structure of the app:
- **Depth (Z-axis):** Items "rising" toward the user or "dropping" into the page.
- **Direction (X/Y-axis):** Sidebars sliding from the edge, content shifting
  horizontally to show progress.
- **Scale:** Elements expanding from their trigger point (e.g., a card
  growing to fill the screen).

### 3. Establish Choreography

Coordinate the movement of multiple elements to avoid visual noise:
- **Staggering:** Introduce elements with a slight delay (e.g., 20-50ms) to create
  a sense of flow and direction.
- **Dominance:** Ensure the most important element (Level 1 hierarchy) moves
  first or most prominently.
- **Sequencing:** Define the order: Exit old content -> Move container ->
  Enter new content.

### 4. Design Interaction Feedback

Apply motion to `interactive-state-system` elements:
- **Press State:** A subtle scale-down or shift to indicate physical contact.
- **Success/Error:** Visual pulses or "shakes" to communicate state change.
- **Loading:** Rhythmic, non-distracting movement (e.g., pulsing or skeleton
  shimmers).

### 5. Implement Motion Accessibility

Motion should be inclusive and never cause physical discomfort:
- **Reduced Motion:** Provide a fallback (e.g., simple opacity fade) for users
  with `prefers-reduced-motion: reduce`.
- **Control:** Avoid auto-playing animations that last longer than 5 seconds
  without a pause/stop mechanism.
- **Speed:** Keep durations short enough to avoid "waiting for the UI."

## Decision Rules

- **The "Purpose" Rule:** Every motion must answer one of three questions:
  1. Where did this come from? (Context)
  2. Did my action work? (Feedback)
  3. What should I look at next? (Hierarchy)
- **The "Wait" Rule:** Total transition duration should rarely exceed 500ms.
  If it does, it's an animation, not an interface transition.
- **Ease-Out by Default:** For items moving onto the screen, use an "ease-out"
  curve to mimic natural deceleration.
- **Match the Mass:** Smaller objects move faster and can be more "bouncy";
  larger containers move slower and more smoothly.

## Constraints

- **Accessibility:** Motion must comply with WCAG 2.1 Success Criterion 2.3.3
  (Animation from Interactions) and 2.2.2 (Pause, Stop, Hide).
- **Performance:** Prioritize "Cheap" properties (Transform and Opacity) to
  ensure 60fps and avoid layout thrashing (Reflow).
- **Responsiveness:** Motion paths must adapt to screen size (e.g., a drawer
  that slides 300px on desktop might slide full-screen on mobile).

## Common Failure Patterns

- **The "Motion Sickness" Trap:** Using large, sweeping movements or rapid
  flashing that can trigger vestibular issues.
- **Too Slow:** Designing transitions that make the app feel "heavy" or laggy
  because the user is waiting for an animation to finish.
- **Visual Noise:** Animating too many elements at once without choreography,
  leading to cognitive overload.
- **Lack of Continuity:** Elements "teleporting" or appearing from nowhere,
  breaking the user's mental model of the spatial layout.

## Validation Criteria

- [ ] Every transition has a defined purpose (Feedback, Context, or Hierarchy).
- [ ] Motion tokens (duration and easing) are consistently applied.
- [ ] A `prefers-reduced-motion` strategy is defined and functional.
- [ ] Multi-element reveals use staggered choreography to guide the eye.
- [ ] Animation is restricted to high-performance properties (Opacity, Transform).
- [ ] Total duration for functional transitions is under 500ms.
