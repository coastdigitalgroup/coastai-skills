# Modern Viewport Units Guide

## The Comparison

When building mobile-first layouts, choosing the right unit for height is
critical for preventing layout shifts and content clipping.

| Unit | Name | Behavior | Ideal Use Case |
| :--- | :--- | :--- | :--- |
| `vh` | Viewport Height | 1% of the viewport height. Often ignores mobile browser chrome (address bar), causing overflow. | Simple desktop layouts. |
| `svh` | Small Viewport Height | 1% of the viewport height when the browser UI is **expanded** (smallest visible area). | Fixed UI elements that must never be covered. |
| `lvh` | Large Viewport Height | 1% of the viewport height when the browser UI is **retracted** (largest possible area). | Background images or sections that should feel expansive. |
| `dvh` | Dynamic Viewport Height | 1% of the viewport height that **updates in real-time** as the UI expands or retracts. | Full-screen app shells and modal overlays. |

## Hardware Safe Areas

Modern mobile devices have hardware features like camera notches and home
indicator bars that can overlap your content.

### The Viewport-Fit Rule

To use the safe area variables, you must first tell the browser that your site
is designed to fill the entire screen:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

Without `viewport-fit=cover`, the browser will "letterbox" your site in
landscape mode, and `env(safe-area-inset-*)` variables will often resolve to `0`.

### Safe Area Variables

| Variable | Description |
| :--- | :--- |
| `env(safe-area-inset-top)` | Distance from the top of the screen to the safe area (Notch/Status Bar). |
| `env(safe-area-inset-bottom)` | Distance from the bottom of the screen to the safe area (Home Indicator). |
| `env(safe-area-inset-left)` | Side buffer for landscape notch (Left side). |
| `env(safe-area-inset-right)` | Side buffer for landscape notch (Right side). |

### Best Practices

1. **Avoid `100vh` on Mobile:** It is notoriously unreliable. Prefer `100dvh` or
   `100svh`.
2. **Combine with Calc:** Don't just set padding to the safe area; add it to
   your design's base spacing:
   `padding-bottom: calc(20px + env(safe-area-inset-bottom));`
3. **Backgrounds vs. Content:** Apply safe area insets as **padding** on the
   container so the background color still flows into the notch area, but the
   text and buttons do not.
