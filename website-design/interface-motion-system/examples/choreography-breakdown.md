# Choreography Breakdown: Product Detail Reveal

This example demonstrates the Interface Motion System applied to a common UI
transition: expanding a product card into a full-screen detail view.

## The Problem
Abruptly changing from a list view to a detail page disorients the user. They
lose the context of which item they clicked and how the new view relates to the
previous state.

## The Motion Solution
Use **Spatial Continuity** and **Choreography** to guide the eye through the
transition.

### Phase 1: Interaction Feedback (0-100ms)
- **Action:** User taps the card.
- **Motion:** The card scales down slightly (98%) using `--ms-fast` and
  `--ease-in-out`.
- **Purpose:** Immediate confirmation of the touch intent.

### Phase 2: The Expansion (100-400ms)
- **Action:** Card expands to fill the viewport.
- **Motion:** `transform: scale()` and `translate()` to the center. Use
  `--ms-medium` (300ms) and `--ease-out-expo`.
- **Choreography:**
  1. The background scrim (overlay) fades in simultaneously (`opacity: 0` to `1`).
  2. The card container grows.
- **Purpose:** Establishes spatial relationship (the detail view *is* the card).

### Phase 3: Content Reveal (250-500ms)
- **Action:** Internal details (Description, Price, Buy Button) appear.
- **Motion:** `opacity: 0` to `1` and `translateY(20px)` to `0`.
- **Choreography (The Stagger):**
  - Title: 0ms delay.
  - Description: 50ms delay.
  - Actions (Buttons): 100ms delay.
- **Purpose:** Guides attention from top to bottom, making the content feel
  lighter and more organized.

## Accessibility Fallback
For users with `prefers-reduced-motion: reduce`:
- Skip the scale and translation.
- Use a simple, quick `opacity` fade (200ms) for the entire detail view.
- Maintain the spatial layering but remove the physical travel.
