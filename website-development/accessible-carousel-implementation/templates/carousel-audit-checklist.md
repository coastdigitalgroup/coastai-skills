# Carousel Accessibility Audit Checklist

Use this checklist to evaluate if a carousel meets accessibility and performance
standards.

## 1. Semantics & Labeling

- [ ] The carousel container has `role="region"` or a sectioning element
      (`<section>`, `<aside>`).
- [ ] The carousel has an `aria-label` or `aria-labelledby`.
- [ ] The carousel has `aria-roledescription="carousel"`.
- [ ] Each slide has `role="group"` and `aria-roledescription="slide"`.
- [ ] Each slide has a unique label (e.g., `aria-label="3 of 10"`).

## 2. Keyboard & Interaction

- [ ] All controls (Next/Prev, Dots) are keyboard focusable (`<button>` or
      `tabindex="0"`).
- [ ] Interactive elements _inside_ off-screen slides are NOT focusable
      (`tabindex="-1"`).
- [ ] The carousel can be operated entirely with the keyboard.
- [ ] Focus indicators are clearly visible on all controls.

## 3. Motion & Auto-play

- [ ] If the carousel auto-plays, there is a visible **Pause** button.
- [ ] Auto-play stops on `mouseenter` (hover) and `focusin` (keyboard focus).
- [ ] Auto-play remains stopped while focus is inside the carousel.
- [ ] The carousel respects `prefers-reduced-motion: reduce`.

## 4. Screen Reader Support

- [ ] A live region (`aria-live="polite"`) announces slide changes.
- [ ] Off-screen slides are hidden from screen readers (`aria-hidden="true"` or
      `display: none`).
- [ ] Controls describe their action (e.g., "Next Slide" instead of just
      "Next").

## 5. Performance (UX)

- [ ] The carousel uses `scroll-snap-type` for smooth, native-feeling movement.
- [ ] Images inside slides use `loading="lazy"` (except for the first visible
      slide).
- [ ] No layout shifts occur when the carousel initializes or slides change.
