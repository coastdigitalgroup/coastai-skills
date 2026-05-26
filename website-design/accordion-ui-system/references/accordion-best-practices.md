# Accordion Best Practices & Accessibility

A reference guide for interaction design and WCAG 2.1 compliance for
progressive disclosure components.

## 1. Keyboard Interaction Patterns

| Key | Action |
| :--- | :--- |
| `Tab` | Moves focus to the next accordion header. |
| `Shift + Tab` | Moves focus to the previous accordion header. |
| `Enter` or `Space` | Toggles the expansion state of the focused header. |
| `Arrow Down` | (Optional) Moves focus to the next header. |
| `Arrow Up` | (Optional) Moves focus to the previous header. |
| `Home` / `End` | (Optional) Moves focus to the first or last header. |

## 2. Accessibility Roles and States

To comply with WCAG AA, accordions must provide programmatic feedback:

- **Button Role:** The clickable header must be a `<button>`. If a `<div>` or
  `<h3>` is used, it must have `role="button"` and `tabindex="0"`.
- **Expansion State:** `aria-expanded="true"` when the content is visible;
  `false` when hidden.
- **Relationship:** `aria-controls` on the button must match the `id` of the
  panel it reveals.
- **Region Identification:** The panel should have `role="region"` and an
  `aria-labelledby` attribute pointing to the header ID.

## 3. Motion and Performance

- **Reduce Motion:** Respect the user's system preference by using
  `@media (prefers-reduced-motion: reduce)` to disable or simplify animations.
- **Duration:** Keep expansion transitions between 150ms and 300ms. Anything
  longer feels sluggish; anything shorter feels like a glitch.
- **Easing:** Use `ease-in-out` or `cubic-bezier(0.4, 0, 0.2, 1)` for a
  natural, accelerating feel.

## 4. Design Heuristics

- **Information Density:** Use accordions to manage density, not to hide
  inconvenient content. If a user has to open every single accordion to finish
  a task, the accordion is a barrier, not a tool.
- **The "Find on Page" Problem:** Remember that browsers cannot find text
  inside hidden (e.g., `display: none`) accordion panels. For critical
  searchable content, consider using `height: 0` and `visibility: hidden` (if
  handled carefully) or avoiding accordions.
- **Multi-Open for Comparison:** If the goal is to compare data (e.g.,
  comparing two software plans), allow multiple accordions to stay open
  simultaneously.
