# Carousel Accessibility & Performance Guide

## The ARIA Pattern

According to the WAI-ARIA Authoring Practices (APG), a carousel should be
identified as a landmark region.

### Essential Roles

- **`aria-roledescription="carousel"`**: Tells the screen reader this is a
  carousel, not just a generic section.
- **`aria-roledescription="slide"`**: Tells the screen reader each item is a
  slide.

### Live Regions

A common mistake is making the entire carousel an `aria-live` region. This
causes the screen reader to announce _everything_ in the slide every time it
changes, which is overwhelming. **Better approach:** Use a dedicated, visually
hidden live region that only announces the status (e.g., "Slide 2 of 5").

## Focus Management with IntersectionObserver

Traditional carousels often leave links inside off-screen slides in the tab
order. This means a keyboard user might have to press `Tab` 10 times to get
through a 3-item carousel if each slide has multiple links, even if the slides
aren't visible.

**The Solution:** Use `IntersectionObserver` to detect when a slide is fully (or
mostly) visible.

- **Visible:** Set `aria-hidden="false"` and remove `tabindex="-1"` from
  internal links.
- **Hidden:** Set `aria-hidden="true"` and add `tabindex="-1"` to internal
  links.

## Performance: Scroll Snap vs. JS Animation

### Why CSS Scroll Snap?

1. **Main Thread Freedom:** Scroll snap is handled by the browser's compositor
   thread, making it buttery smooth even if the main thread is busy.
2. **Touch Native:** It respects the user's native touch physics (momentum,
   friction).
3. **No Junk:** It prevents the "stutter" often seen in JS-driven animations on
   low-powered devices.

### Lazy Loading

Only the first visible slide(s) should have high-priority images.

- Slide 1: `<img src="..." fetchpriority="high">`
- Slide 2+: `<img src="..." loading="lazy">`

## Accessibility of Pagination Dots

Pagination dots are often implemented as small divs or spans. To be accessible:

1. They **must** be `<button>` elements.
2. They **must** have a label (e.g., `aria-label="Go to slide 1"`).
3. The active dot **must** be identified with `aria-current="true"`.
4. They should be large enough to be easily clickable/tappable (min 24px,
   ideally 44px with padding).
