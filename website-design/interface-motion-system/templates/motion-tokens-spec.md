# Motion Tokens Specification Template

Use this template to define and document the motion tokens for your design system. This ensures consistency between design and development.

## 1. Durations
Standardized timings for all transitions.

| Token | Value | Use Case |
| :--- | :--- | :--- |
| `motion-duration-fast` | 150ms | Atomic states, hover, toggles, icon shifts. |
| `motion-duration-medium` | 250ms | Dropdowns, tooltips, small container expansions. |
| `motion-duration-slow` | 400ms | Modals, drawers, full-page layout transitions. |

## 2. Easing Curves
Semantic Bezier curves for motion behavior.

| Token | Value (Cubic Bezier) | Intent |
| :--- | :--- | :--- |
| `motion-ease-standard` | `0.4, 0, 0.2, 1` | Default movement within the screen. |
| `motion-ease-enter` | `0, 0, 0.2, 1` | Elements entering the viewport (Decelerate). |
| `motion-ease-exit` | `0.4, 0, 1, 1` | Elements leaving the viewport (Accelerate). |
| `motion-ease-linear` | `0, 0, 1, 1` | Only for opacity fades or color shifts. |

## 3. Choreography Tokens
Standard delays for staggered sequences.

| Token | Value | Intent |
| :--- | :--- | :--- |
| `motion-delay-stagger` | 30ms | Delay between sequential items in a list. |
| `motion-delay-wait` | 100ms | Delay before a secondary element enters. |

## 4. CSS Implementation Example

```css
:root {
  --motion-duration-fast: 150ms;
  --motion-duration-medium: 250ms;
  --motion-duration-slow: 400ms;

  --motion-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --motion-ease-exit: cubic-bezier(0.4, 0, 1, 1);
}

/* Example Usage */
.c-modal {
  transition:
    transform var(--motion-duration-medium) var(--motion-ease-enter),
    opacity var(--motion-duration-medium) var(--motion-ease-linear);
}

@media (prefers-reduced-motion: reduce) {
  .c-modal {
    transition: opacity var(--motion-duration-fast) var(--motion-ease-linear);
    transform: none !important;
  }
}
```
