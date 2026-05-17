---
name: accessible-carousel-implementation
description:
  Implement and debug accessible, high-performance carousel and slider
  components using CSS Scroll Snap and WAI-ARIA patterns.
---

# Accessible Carousel Implementation

## Purpose

The Accessible Carousel Implementation skill provides a technical framework for
building and auditing content sliders and carousels. It prioritizes native
browser performance (CSS Scroll Snap) while ensuring the component is fully
navigable and understandable by users of assistive technologies.

## Use Cases

- Implementing a homepage hero slider with multiple featured items.
- Building a responsive product gallery for mobile and desktop.
- Creating a "featured testimonials" slider with auto-playing (and pausable)
  content.
- Auditing existing carousels for WCAG compliance (keyboard access, focus
  management, screen reader labels).

## When NOT to Use

- **Static Content Grids:** If content can be displayed in a standard grid
  without hiding items, prefer a grid for better discoverability.
- **Critical Linear Content:** Do not hide essential information (like legal
  terms or primary CTA) inside a carousel where it might be missed.
- **Simple Image Lists:** A standard vertically scrolling list is often more
  usable on mobile than a horizontal carousel.

## Inputs

1. **Carousel Items:** The list of content blocks (images, text, cards) to be
   displayed.
2. **Behavior Requirements:** Should it auto-play? Should it loop infinitely?
3. **Control Preferences:** Arrows, pagination dots, or just swipe gestures?
4. **Responsive Strategy:** How many items should be visible at different
   breakpoints?

## Outputs

1. **Semantic HTML:** Structure using `<section>`, `<ul>`, and `<button>`
   elements with appropriate ARIA roles.
2. **CSS Scroll Snap Implementation:** High-performance horizontal scrolling
   with touch-friendly snapping.
3. **Accessibility Script:** Logic for live regions, focus management, and
   play/pause controls.
4. **ARIA Metadata:** Use of `role="region"`, `aria-roledescription="carousel"`,
   and `aria-label`.

## Workflow

### 1. Establish the Container Structure

- Wrap the carousel in a `<section>` or `<aside>` with
  `aria-roledescription="carousel"` and a descriptive `aria-label`.
- Use a `<ul>` for the items container to allow screen readers to announce the
  item count.
- Each item (`<li>`) should have `role="group"` and
  `aria-roledescription="slide"`.

### 2. Implement CSS Scroll Snap

- Apply `overflow-x: auto` and `scroll-snap-type: x mandatory` to the items
  container.
- Apply `scroll-snap-align: start` (or `center`) to the individual items.
- Use `scrollbar-width: none` (and WebKit equivalent) if custom navigation is
  the primary interaction method.

### 3. Add Navigation Controls

- Use `<button>` elements for "Previous" and "Next" controls.
- Ensure buttons have clear `aria-label` or hidden text.
- If using pagination dots, they must be buttons and indicate the current state
  with `aria-current="true"`.

### 4. Implement Focus and Visibility Management

- For "hidden" slides (those off-screen), ensure they are not focusable until
  they are brought into view.
- _Tip:_ Use `IntersectionObserver` to toggle `tabindex="-1"` and
  `aria-hidden="true"` on slides as they enter/exit the viewport.

### 5. Handle Auto-play (if required)

- **Mandatory Pause Button:** Any auto-playing carousel must have a visible
  "Pause" button.
- **Hover/Focus Pause:** Auto-play must stop when the user hovers over the
  carousel or focuses any element within it.
- **Prefers-Reduced-Motion:** Respect system settings by disabling auto-play if
  `prefers-reduced-motion: reduce` is detected.

### 6. Live Regions for Status

- Use an `aria-live="polite"` region to announce the current slide (e.g., "Slide
  2 of 5") when the user interacts with the controls.

## Decision Rules

- **CSS vs. JS for Movement:** Always use CSS Scroll Snap for the actual
  movement. Use JS only for accessibility state, navigation triggers, and status
  announcements.
- **Infinite Looping:** Avoid infinite looping where possible as it complicates
  keyboard navigation and focus management. If required, ensure the DOM order
  remains logical.
- **Pagination vs. Arrows:** Use arrows for small numbers of items. Use
  pagination dots (or a "1 of X" counter) when there are more than 3-4 slides.

## Constraints

- **Keyboard Support:** Users must be able to navigate through slides using
  `Tab` or arrow keys.
- **Focus Indicator:** All controls (arrows, dots) must have high-contrast focus
  indicators.
- **Contrast:** Text on slides must meet WCAG AA (4.5:1) contrast against the
  slide background.

## Non-Goals

- Building complex 3D transition effects.
- Handling vertical carousels (this skill focuses on horizontal discovery).
- Integrating with specific third-party slider libraries (though the principles
  apply to their configuration).

## Common Failure Patterns

- **The "Mystery Slider":** A carousel with no labels, making it appear as a
  single image or broken content to screen readers.
- **Focus Trap/Leak:** Allowing keyboard focus to move to off-screen slides,
  causing the page to jump unexpectedly.
- **Missing Pause Button:** Forcing users with ADHD or motion sensitivity to
  endure constant movement.
- **Gesture-Only:** Carousels that can only be scrolled via swipe, leaving mouse
  and keyboard users unable to see hidden items.
- **Stale Live Regions:** Forgetting to update the "Slide X of Y" announcement
  when the slide changes.

## Validation Steps

- [ ] **Keyboard Navigation:** Can I navigate to every slide and use every
      control using only the `Tab` and `Enter` keys?
- [ ] **Screen Reader Audit:** Does the screen reader announce "Carousel", the
      item count, and the "Slide" role for each item?
- [ ] **Auto-play Check:** Does auto-play stop on hover and focus? Is there a
      pause button?
- [ ] **Reduced Motion Test:** Does the carousel respect the
      `prefers-reduced-motion` system setting?
- [ ] **Visibility Check:** Are off-screen slides hidden from the accessibility
      tree and tab order?
