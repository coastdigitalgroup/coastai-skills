# Technical Reference: Fluid Scaling Math and Accessibility

## The Linear Interpolation Formula

To calculate the "preferred" value for `clamp()`, we use a linear function ($y = mx + b$).

### Variables:
- $V_{min}$: Minimum viewport width (e.g., 320px)
- $V_{max}$: Maximum viewport width (e.g., 1280px)
- $S_{min}$: Font size at minimum viewport (e.g., 16px)
- $S_{max}$: Font size at maximum viewport (e.g., 24px)

### 1. Calculate the Slope ($m$):
The slope represents how much the font size grows per pixel of viewport width.
$$m = \frac{S_{max} - S_{min}}{V_{max} - V_{min}}$$
To convert this to `vw` (viewport width percentage):
$$m_{vw} = m \times 100$$

### 2. Calculate the Intercept ($b$):
The intercept is the value when the viewport is at 0.
$$b = S_{min} - (m \times V_{min})$$
To maintain accessibility, convert $b$ to `rem`:
$$b_{rem} = \frac{b}{16}$$ (assuming 16px base)

### 3. Final CSS:
`clamp(S_{min}rem, b_{rem} + m_{vw}vw, S_{max}rem)`

---

## Accessibility Considerations (WCAG)

### 1. User Zoom
WCAG 1.4.4 requires that content can be zoomed to 200%. If you use `clamp()` with only `vw` units (e.g., `font-size: clamp(1rem, 5vw, 3rem)`), the text might not grow when the user zooms in some older browsers, or it might grow too slowly.

**Solution:** Always include a `rem` or `em` component in the middle "preferred" value calculation. This ensures that the base font size is tied to the user's browser settings.

### 2. Minimum Legibility
Never set the $S_{min}$ of body text below `1rem` (16px). Fluid typography should enhance the experience on larger screens, not degrade it on smaller ones.

---

## Browser Support

`clamp()` is widely supported in all modern browsers (95%+ global support).

| Browser | Version |
|---------|---------|
| Chrome  | 79+     |
| Safari  | 13.1+   |
| Firefox | 75+     |
| Edge    | 79+     |

### Fallback Strategy
If you must support IE11 or older browsers, provide a static value before the `clamp()` declaration:

```css
h1 {
  font-size: 2.5rem; /* Fallback */
  font-size: clamp(2rem, 1rem + 5vw, 5rem);
}
```

---

## Container Queries (The Next Level)

With the introduction of Container Query Units, you can swap `vw` for `cqw` (container width percentage). This allows a component to be fluid based on its **parent's** size, making it truly modular.

```css
.card h2 {
  /* Scales based on the .card width, not the whole screen */
  font-size: clamp(1rem, 0.5rem + 2cqw, 2rem);
}
```
