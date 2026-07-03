# Choreography Breakdown: List Item Entry

This example demonstrates how to apply the **Interface Motion System** to a common UI pattern: revealing a list of items (e.g., search results or dashboard cards).

## The Problem
When a user navigates to a new view, showing all items simultaneously can feel jarring and "heavy." It doesn't guide the eye and can make the page feel like it's "popping" in.

## The Choreographed Solution
Instead of a single simultaneous reveal, we use **staggering** and **directional motion** to create a fluid, high-quality entry.

### 1. Element Specification
- **Container:** The parent wrapper of the list.
- **Items:** Individual cards or list rows.

### 2. Motion Tokens Applied
- **Duration:** `motion-standard` (250ms) per item.
- **Easing:** `ease-out` (Deceleration) to feel responsive.
- **Transition:** `opacity` (0 to 1) and `transform: translateY` (20px to 0).

### 3. Choreography (The Sequence)
1. **Initial State:** All items are at `opacity: 0` and shifted down by `20px`.
2. **Trigger:** The list container enters the viewport or the data finish loading.
3. **Stagger:** Each item starts its transition `30ms` after the previous one.
   - Item 1: Start at 0ms.
   - Item 2: Start at 30ms.
   - Item 3: Start at 60ms.
4. **Result:** A "wave" effect that guides the user's eye from the top of the list to the bottom.

## Why this works
- **Guidance:** The staggered entry creates a clear visual path for the user to follow.
- **Perceived Performance:** The immediate start of the first item makes the app feel faster, even if the total time to reveal all items is slightly longer.
- **Spatial Model:** The slight upward movement (`translateY`) suggests that the items are "rising" onto the page surface, reinforcing the `elevation-and-depth-system`.

## Accessibility Note
For users with `prefers-reduced-motion` enabled:
- **Skip the Transform:** Remove the `translateY` movement.
- **Simplify the Stagger:** Either show all items at once with a simple fade or remove the stagger entirely for an instant reveal.
