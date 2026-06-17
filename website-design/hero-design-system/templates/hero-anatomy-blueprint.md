# Hero Anatomy Blueprint

This blueprint defines the structural zones and spacing requirements for a standard "Split" hero layout, ensuring consistency across a design system.

## 1. Structural Zones

| Zone | Content | Alignment |
| :--- | :--- | :--- |
| **Wayfinding** | Breadcrumbs or Overline Tag | Top-Left |
| **Core Message** | H1 Headline + Subhead | Mid-Left |
| **Action Zone** | Primary & Secondary CTAs | Bottom-Left |
| **Visual Zone** | Primary Image/Video/Graphics | Right (Desktop) / Bottom (Mobile) |

## 2. Spacing Specifications (Desktop)

- **Outer Padding:** `--space-3xl` (Top/Bottom) to create a substantial "stage."
- **Internal Gap (Gutter):** `--space-xl` between the Text and Visual columns.
- **Vertical Rhythm (Content):**
    - H1 to Subhead: `--space-s`
    - Subhead to CTA: `--space-l`
    - Wayfinding to H1: `--space-xs`

## 3. Responsive Stacking Blueprint

```css
/* Pseudo-code for Layout Stacking */
.hero {
  display: grid;
  grid-template-columns: 1fr; /* Mobile First */
  gap: var(--space-xl);
  padding: var(--space-xl);
  align-items: center;
}

@media (min-width: 1024px) {
  .hero {
    grid-template-columns: 1fr 1fr; /* Split Layout */
    padding: var(--space-3xl);
    min-height: 80vh;
  }
}
```

## 4. Visual Layering Template (Centered Hero)

When text is centered over an image, use these layering rules:

1. **Base Layer:** Background Media (Image or Video).
2. **Protection Layer:**
   - `background-color: rgba(0, 0, 0, 0.4);` (for dark mode/white text)
   - OR a radial gradient if the focal point is in the center.
3. **Content Layer:**
   - Text color: `#FFFFFF` (WCAG AA compliant).
   - Max-width: `60ch` (to prevent overly long line lengths).
4. **Interaction Layer:**
   - CTA button with high-contrast color (e.g., Brand Primary).
