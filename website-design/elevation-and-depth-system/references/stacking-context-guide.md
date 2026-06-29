# Stacking Context & Accessibility Guide

Designing for the Z-axis requires an understanding of how browsers calculate
layering (Stacking Contexts) and how users perceive depth.

## 1. Understanding Stacking Contexts

A "Stacking Context" is a three-dimensional conceptualization of HTML elements.
Elements within a stacking context are moved together up or down the Z-axis.

### Common Stacking Context Triggers
An element becomes a "root" for its own stacking context when:
- It has a `z-index` value other than `auto` and a `position` of `absolute`,
  `relative`, or `fixed`.
- It has a `position: sticky`.
- It has an `opacity` less than 1.
- It has a `transform`, `filter`, or `perspective` value other than `none`.
- It has `will-change` set to any property that triggers a context.

**The Trap:** If you have a Modal inside a container that has its own
stacking context (e.g., a transformed div), the Modal's `z-index: 9999` will
only apply *inside* that container. It will not sit above other elements on the
page if the container itself has a low z-index.

**Solution:** Always teleport or mount global overlays (Modals, Toasts) to the
end of the `<body>` to ensure they are children of the root stacking context.

---

## 2. Accessibility & Depth

Shadows are "non-essential" visual cues. Your interface must remain functional
and clear even if a user cannot perceive shadows.

### Contrast vs. Depth
- **Rule:** Never rely on a shadow as the only way to distinguish an element
  from its background.
- **Test:** If you remove the shadow, can you still see where the element ends?
- **Correction:** Use a subtle border (`1px solid`) or a slight background color
  shift (`surface-muted`) in addition to the shadow.

### Focus Indicators
- Elements with high elevation should not "swallow" the focus ring.
- Ensure that `outline` or `box-shadow` focus indicators are not clipped by the
  container's `overflow: hidden` or hidden behind the shadow of an adjacent
  elevated element.

### Motion Sensitivity
- Moving elements on the Z-axis (e.g., "lifting" a card on hover) should be
  handled with care.
- Use `transition: transform 0.2s cubic-bezier(...)` to ensure motion is smooth.
- **Respect Preferences:** Always wrap elevation animations in a
  `prefers-reduced-motion` media query.

```css
@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none; /* Only change shadow, not position */
  }
}
```

---

## 3. Best Practices for Depth Logic

1. **Physical Intuition:** Smaller objects can lift higher than large objects.
   A Modal (large) should have a soft, wide shadow. A Button (small) should
   have a tighter, sharper shadow.
2. **Environmental Consistency:** If the light source is top-down, the Y-offset
   of your shadows should always be positive (`box-shadow: 0 4px ...`). Mixing
   negative and positive Y-offsets on the same page breaks the user's mental
   model of the space.
3. **The "Occlusion" Principle:** When one layer covers another, it must provide
   sufficient contrast. Use a backdrop (scrim) for high-elevation layers to
   artificially increase the contrast between the elevated layer and the base
   layer.
