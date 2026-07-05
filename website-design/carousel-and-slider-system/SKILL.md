---
name: carousel-and-slider-system
description:
  Design and implement a systematic framework for horizontal discovery components,
  managing navigation affordances, scroll behavior, and accessibility to ensure
  effective content density without compromising usability.
---

# Carousel and Slider System

## Purpose

The Carousel and Slider System provides a methodology for designing horizontal
scroll containers that allow users to browse through a collection of related
content (cards, images, testimonials) without consuming excessive vertical space.
While carousels are often criticized for low engagement, a systematic approach
focuses on **affordances**, **perceived performance**, and **user control**,
ensuring that horizontal discovery is intuitive, accessible, and high-impact.

## Use Cases

- **Product Discovery:** Browsing through "Related Products" or "New Arrivals" in
  e-commerce.
- **Social Proof:** Displaying a sequence of customer testimonials or case
  studies.
- **Media Galleries:** High-density photo or video collections within a limited
  viewport.
- **Onboarding/Feature Tours:** Guiding users through a linear sequence of
  value propositions.
- **Dashboard Widgets:** Managing multiple data summaries in a horizontal row
  to preserve page rhythm.

## When NOT to Use

- **Critical Sequential Steps:** If a user *must* see every item to complete a
  task, use a vertical stack or grid to ensure nothing is missed.
- **Small Content Volumes:** If you only have 2 or 3 items, a standard grid is
  more efficient and requires less interaction.
- **Varying Content Types:** Do not mix different card types (e.g., an article
  next to a product) in a single carousel; consistency is key to scannability.
- **Low-Value Marketing Sliders:** Avoid using large "Hero Carousels" for
  unrelated promotions that users typically ignore (Banner Blindness).

## Inputs

1. **Content Archetype:** What is being scrolled? (e.g., `card-ui-system` cards,
   images, or text blocks).
2. **Catalog Size:** How many items are in the total collection?
3. **Container Context:** Is it a full-width section or contained within a grid
   column?
4. **Interaction Requirements:** Does it need auto-play, infinite looping, or
   manual-only scroll?
5. **Brand Tokens:** Spacing, typography, and color systems for controls and
   indicators.

## Outputs

1. **Carousel Anatomy Spec:** Visual definitions for the Container, Track,
   Navigation (Arrows), and Pagination (Bullets).
2. **Reveal Strategy:** Defined "Partial Item Reveal" rules to signal
   horizontally-hidden content.
3. **Responsive Mapping:** Rules for items-per-view across Mobile, Tablet, and
   Desktop.
4. **Accessibility Blueprint:** ARIA labels, focus management, and motion
   control specifications.

## Workflow

### 1. Determine the Discovery Intent

Identify how the user should interact with the items:
- **Linear:** User moves through items one-by-one (e.g., Onboarding).
- **Exploratory:** User can jump around or skim (e.g., Product Grid).
- **Ambient:** Content moves automatically (e.g., Logo marquee).

### 2. Establish the "Reveal Pattern"

Signal to the user that there is more content to the right:
- **Partial Reveal:** Ensure the "next" item is partially visible (usually 10-20%
  overflowing the container edge). This is the strongest visual cue for
  scrollability.
- **Fade Effect:** Apply a subtle gradient fade to the edges of the container.

### 3. Select Navigation Affordances

Provide clear controls for movement:
- **Arrows (Directional):** Place at the vertical center of the track (inside or
  outside the container). Best for high-density browsing.
- **Pagination (Bullets/Dots):** Place below the track. Best for short
  sequences (3-7 items) to show progress.
- **Scrollbar:** A visual progress bar at the bottom. Best for very large
  collections.

### 4. Define Responsive Column Logic

Map how many items are visible at once:
- **Desktop:** 3–5 items per view.
- **Tablet:** 2–3 items per view.
- **Mobile:** 1.2 items per view (1 full item + partial reveal).

### 5. Implement Controls and Accessibility

- **Keyboard Support:** Users must be able to use `ArrowLeft` and `ArrowRight` to
  move between items; `Tab` should move to the next focusable control, not
  between every slide.
- **Motion Control:** If using auto-play, provide a visible "Pause" button and
  stop the animation on hover, focus, and whenever `prefers-reduced-motion:
  reduce` is set (do not rely on hover/focus alone).
- **ARIA Roles:** Follow the ARIA APG carousel pattern — `role="region"` with an
  `aria-label` on the container, `aria-roledescription="carousel"`, and
  `aria-live="polite"` (or `"off"` during auto-play) on the slide track so
  screen readers announce changes without being overwhelmed.
- **Focus Visibility:** Ensure the focus indicator on arrows, dots, and slide
  content is never obscured by adjacent slides or a sticky reveal edge (WCAG
  2.2 SC 2.4.11).

## Decision Rules

- **The "Partial Reveal" Rule:** Always show a sliver of the next item on mobile
  to indicate horizontal scroll without relying on arrows.
- **Arrows vs. Bullets:** Use **Arrows** if you have more than 5 items. Use
  **Bullets** only if the total count is small (3-7) and showing progress is
  valuable.
- **Looping Logic:** Use "Infinite Loop" only for ambient discovery (like
  logos). For functional content (like products), use a "End of Track" state
  where the right arrow becomes disabled.
- **Snap-Scroll:** Always use `scroll-snap-type: x mandatory` to ensure items
  align perfectly to the container edges after a swipe or click.

## Constraints

- **Accessibility:** Must support `prefers-reduced-motion`. All interactive
  controls (arrows/dots) must meet WCAG 2.2 SC 2.5.8 (24x24px minimum target
  size, 44x44px preferred for primary arrows).
- **Responsiveness:** Items must be fluid. The carousel container must never
  cause horizontal page overflow; the overflow must be contained within the
  component. Use `clamp()` for item width/gap so items-per-view scales
  smoothly instead of jumping at fixed breakpoints.
- **Perceived Performance:** Use `skeleton-state-system` for items that are not
  yet loaded or are off-screen.

## Common Failure Patterns

- **The "Invisible" Carousel:** No partial reveal and no arrows, making the
  component look like a static, broken grid.
- **The "Auto-Play Trap":** Rotating content too fast for users to read, or
  providing no way to stop it.
- **Broken Snap:** Items that stop half-way between viewports, cutting off
  content.
- **Missing Interaction States:** Arrows that don't have hover/focus states, or
  don't look disabled when the end of the track is reached.
- **Mobile Overflow:** A carousel that expands the width of the whole page,
  causing users to get "lost" when scrolling horizontally.

## Validation Criteria

- [ ] A "Partial Reveal" or clear visual indicator of hidden content is present.
- [ ] Navigation controls (Arrows/Bullets) meet WCAG 2.2 SC 2.5.8 (24x24px
      minimum touch area).
- [ ] Keyboard navigation (`Arrows`) and focus management are implemented, and
      focus indicators are never obscured (WCAG 2.2 SC 2.4.11).
- [ ] `scroll-snap` is used to ensure items align to the grid.
- [ ] Auto-play (if used) can be paused by the user and stops automatically
      under `prefers-reduced-motion`.
- [ ] Responsive item counts are defined for all major breakpoints.
- [ ] ARIA landmarks and labels are correctly applied for screen readers.
