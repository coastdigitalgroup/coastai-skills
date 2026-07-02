# Motion Tokens Specification

This template provides a set of reusable CSS custom properties (tokens) for
standardizing motion across a project.

## Duration Tokens

Standardized speeds for different types of interactions.

```css
:root {
  /* Micro-interactions (Hover, Toggles) */
  --ms-fast: 150ms;

  /* Small Transitions (Menus, Tooltips) */
  --ms-standard: 250ms;

  /* Large Reveals (Modals, Drawers) */
  --ms-medium: 350ms;

  /* Narrative/Immersive (Hero animations) */
  --ms-slow: 500ms;
}
```

## Easing Tokens

Curvatures that define the "feeling" of the movement.

```css
:root {
  /* Productive: Quick, efficient response */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* Expressive: More character, slight overshoot */
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Entrance: For items coming into view */
  --ease-entrance: cubic-bezier(0, 0, 0.2, 1);

  /* Exit: For items leaving the view */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);

  /* Standard: Best for general purpose move/scale */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Usage Guidelines

- **Use `--ms-fast` + `--ease-out-quad`** for button hover/active states.
- **Use `--ms-standard` + `--ease-entrance`** for dropdown menus appearing.
- **Use `--ms-medium` + `--ease-standard`** for side drawers sliding in.
- **Always pair with reduced motion media query:**

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --ms-fast: 0ms;
    --ms-standard: 0ms;
    --ms-medium: 0ms;
    --ms-slow: 0ms;
  }
}
```
