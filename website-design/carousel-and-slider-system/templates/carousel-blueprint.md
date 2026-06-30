# Template: Carousel Anatomy Blueprint

This blueprint defines the structural requirements for a standard, reusable carousel component. Use these specifications to ensure consistency across different implementations.

## 1. Structural Layers (CSS/HTML)

```text
[Carousel Container] (overflow-x: hidden; position: relative;)
  ├── [Navigation: Prev Arrow] (position: absolute; left: 0; z-index: 10;)
  ├── [Navigation: Next Arrow] (position: absolute; right: 0; z-index: 10;)
  ├── [Scroll Track] (display: flex; overflow-x: auto; scroll-snap-type: x mandatory;)
  │     ├── [Carousel Item 1] (flex: 0 0 auto; scroll-snap-align: start;)
  │     ├── [Carousel Item 2] (flex: 0 0 auto; scroll-snap-align: start;)
  │     └── [Carousel Item N] (flex: 0 0 auto; scroll-snap-align: start;)
  └── [Pagination Bar] (display: flex; justify-content: center;)
        └── [Indicator Dots]
```

## 2. Spacing and Alignment Specs

| Element | Spacing Token | Desktop (1440px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| **Outer Margin** | `--space-m` | 40px | 20px |
| **Gutter (Between Items)** | `--space-s` | 24px | 16px |
| **Controls Padding** | `--space-xs` | 16px | 12px |
| **Pagination Top Margin**| `--space-l` | 32px | 24px |

## 3. Responsive Item Counts

Define the `flex-basis` of items to achieve the "Partial Reveal":

- **Desktop (L):** `flex-basis: calc(25% - (gutter * 0.75))` (4.2 items visible)
- **Tablet (M):** `flex-basis: calc(50% - (gutter * 0.5))` (2.1 items visible)
- **Mobile (S):** `flex-basis: calc(85% - (gutter * 0.15))` (1.1 items visible)

## 4. Interaction Requirements

- **Transition:** `cubic-bezier(0.4, 0, 0.2, 1)` with a duration of `400ms`.
- **Snap Point:** `scroll-snap-align: start`.
- **Hover State (Controls):** Scale `1.1` + transition.
- **Active State (Indicators):** Background color shift + width expansion (pill effect).

## 5. Accessibility Checklist

- [ ] Container has `role="region"` and `aria-label`.
- [ ] Track has `aria-live="polite"` (if auto-playing).
- [ ] Each item has `role="group"` and `aria-roledescription="slide"`.
- [ ] Arrows are `<button>` elements with `aria-label="Previous/Next slide"`.
- [ ] Dots are `<button>` elements with `aria-label="Go to slide X"` and `aria-current="true"` for the active dot.
- [ ] Hidden items (off-screen) are marked with `aria-hidden="true"` or `inert` to prevent focus-trapping.
