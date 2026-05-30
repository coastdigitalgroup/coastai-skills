# Reference: Color and Accessibility

When designing badges and tags, accessibility is often compromised for the sake of "minimalist" design. Follow these guidelines to ensure compliance with WCAG 2.2 Level AA.

## 1. Contrast Ratios

Small text (below 18pt/24px) requires a higher contrast ratio because it is harder to read at low resolutions.

-   **Minimum Requirement:** 4.5:1 (WCAG AA).
-   **Target Requirement:** 7:1 (WCAG AAA) for critical status information.
-   **Border Contrast:** If the badge background is very light (e.g., `< 1.5:1` against the page background), use a 1px border with a `3:1` contrast ratio to define the shape.

## 2. Non-Color Indicators

Users with Protanopia, Deuteranopia, or Tritanopia may not be able to distinguish between Red/Green or Blue/Yellow states.

-   **Labels:** Use clear text (e.g., "Error: Payment Failed" instead of just "Payment Failed").
-   **Icons:** Always pair a semantic color with a meaningful icon (Check, Warning Triangle, Info Circle).
-   **Patterns:** In extremely dense data visualizations, consider using patterns (dots, stripes) in addition to color.

## 3. Screen Reader Interaction

Interactive tags (like those used in a "Filter" bar) must be understandable by users who cannot see the visual grouping.

-   **Role:** Use `role="button"` for clickable tags.
-   **Aria-Label:** For removable tags, the "X" button must have an `aria-label` like `aria-label="Remove 'Marketing' filter"`.
-   **Focus:** Ensure a visible focus ring (min 2px) is present.

## 4. Touch Targets

Tags are often small, making them difficult to interact with on mobile.

-   **Static Tags:** No minimum size required, but must not overlap interactive elements.
-   **Interactive Tags:** Must have a minimum touch target of 44x44px. If the tag itself is smaller (e.g., 24px tall), the transparent hit area around it must be expanded.
