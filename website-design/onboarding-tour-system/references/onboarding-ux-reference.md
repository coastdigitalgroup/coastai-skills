# Guided Onboarding UX Design Reference

This reference document outlines the exact spatial layout, accessibility, and interaction constraints required when implementing multi-step guided tours on websites and web applications.

---

## 1. Spatial Layout and Positioning Logic

To prevent tour bubbles from clipping or obscuring critical content, implement a dynamic placement matrix based on anchor coordinates.

| Anchor Region | Recommended Popover Position | Arrow Direction | Alternative Placement (Collision) |
| :--- | :--- | :--- | :--- |
| **Top-Left** | Bottom-Right / Bottom-Center | Top / Top-Left | Left-Center (if space exists) |
| **Top-Right** | Bottom-Left / Bottom-Center | Top / Top-Right | Right-Center |
| **Bottom-Left**| Top-Right / Top-Center | Bottom / Bottom-Left | Left-Center |
| **Bottom-Right**| Top-Left / Top-Center | Bottom / Bottom-Right | Right-Center |
| **Center Workspace**| Right-Center or Left-Center | Left or Right | Top-Center |

### Collision Detection Offset Rule
Maintain a minimum of **16px gutter gap** between the popover edge and the viewport boundary. If the target placement would violate this gutter, flip the popover 180 degrees along its positioning axis.

---

## 2. Keyboard Navigation and Interaction Contract

Guided tours behave as modal overlays and must conform to WCAG 2.1 / 2.2 accessibility standards to ensure they are fully operable for assistive technology and keyboard-only users.

```text
[Tab] -> Cycle focus: [CloseBtn] -> [SkipLink] -> [BackBtn] -> [NextBtn] --+
  ^                                                                       |
  +-------------------------- focus remains trapped ---------------------+
```

- **Focus Trap:** Tab order MUST cycle strictly within the active popover container. Keyboard focus must never escape to background elements while the tour is running.
- **Escape Key:** Pressing `Escape` on any step must immediately trigger the "Skip Tour" or exit routine.
- **Arrow Keys:** Support `ArrowRight` to simulate clicking "Next" and `ArrowLeft` to simulate clicking "Back".
- **Visual Focus Outline:** All interactive elements must exhibit a high-contrast focus outline (e.g., `outline: 2px solid var(--tour-primary-cta); outline-offset: 2px`) when focused.

---

## 3. Screen Reader (ARIA) Specification

Do not make background content entirely invisible to assistive devices, but ensure the tour dialogue is clear and predictable.

- **`role="dialog"`**: The active tour card must carry this role.
- **`aria-modal="false"`**: Since the background is visually visible but muted, do not declare it as a strict hardware modal; this tells the screen reader that the page content is still active.
- **`aria-labelledby`**: Programmatically link to the `<h3>` or `<h2>` title element of the card.
- **`aria-describedby`**: Programmatically link to the primary paragraph description.
- **`aria-hidden="true"`**: The dark background overlay (backdrop) must be ignored by screen readers to avoid reading out an empty layout element.

---

## 4. Backdrop Isolation (Cutout Mechanics)

When creating the dark overlay with the isolated "light hole" highlighting the anchor element, follow these padding and styling guidelines:

- **Cutout Padding Buffer:** Apply a `6px` to `12px` padding border around the target anchor inside your SVG path or CSS masking box. This prevents the cutout from shaving off element borders or clipping box-shadows.
- **Transition Smoothness:** Fade-in the backdrop and popover over a duration of `200ms` using `ease-out`. Avoid sharp, instant pop-ins which feel jarring and trigger cognitive disorientation.
- **Prevent Scroll-Jank:** If the target element is off-screen, scroll the element into center-view smoothly using `.scrollIntoView({ behavior: 'smooth', block: 'center' })` **before** the backdrop cutout or tour card is rendered.
