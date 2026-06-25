# Logo Normalization Guide: Optical Balancing

This example demonstrates the transition from a "Fixed Bounding Box" approach (which leads to visual imbalance) to an "Optical Normalization" approach for a trust bar.

## The Problem: Mathematical vs. Optical Scaling

When logos are resized to the same maximum width and height, they often appear inconsistent in weight. A square logo will look much larger than a wide, thin logo because its "ink density" or surface area is significantly greater.

### 1. Before: Mathematical Scaling (Failure)
In this scenario, all logos are forced into a `60px x 60px` box and told to fill it.

| Logo Shape | Dimensions | Visual Result | Problem |
| :--- | :--- | :--- | :--- |
| **Wide** (Wordmark) | 120x20 | Tiny and thin | Looks like a caption, not a logo. |
| **Square** (Icon) | 60x60 | Massive and heavy | Dominates the entire row. |
| **Tall** (Stacked) | 30x60 | Medium weight | Feels disconnected from the horizon. |

**The Result:** The grid looks amateurish, and the square logo "screams" while the wide logo is "whispering."

---

### 2. After: Optical Normalization (Success)
In this scenario, we use **Optical Sizing Rules** to adjust the percentage of the bounding box each logo occupies.

#### The "Normalization Matrix"
We set a standard container of `120px x 60px` and apply these scaling rules:

*   **Wide Logos (Aspect Ratio > 3:1):**
    *   Sizing: Width 100%, Height Auto.
    *   Goal: Maximize width to compensate for thinness.
*   **Square/Circle Logos (Aspect Ratio ~ 1:1):**
    *   Sizing: Height 70%, Width Auto.
    *   Goal: Reduce size to prevent the large surface area from overwhelming neighbors.
*   **Tall/Stacked Logos (Aspect Ratio < 1:1):**
    *   Sizing: Height 90%, Width Auto.
    *   Goal: Use almost full height to maintain legibility of stacked text.

---

## Implementation Breakdown

### The HTML Structure
```html
<div class="logo-grid">
  <!-- Wide Logo -->
  <div class="logo-item wide">
    <img src="brand-wide.svg" alt="Wide Brand">
  </div>
  <!-- Square Logo -->
  <div class="logo-item square">
    <img src="brand-square.svg" alt="Square Brand">
  </div>
  <!-- Tall Logo -->
  <div class="logo-item tall">
    <img src="brand-tall.svg" alt="Tall Brand">
  </div>
</div>
```

### The CSS Normalization
```css
.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px; /* Consistent cell width */
  height: 80px;  /* Consistent cell height */
  padding: 10px;
}

.logo-item img {
  max-width: 100%;
  max-height: 100%;
  filter: grayscale(100%); /* Unified visual treatment */
  opacity: 0.7;
}

/* Optical Adjustments */
.logo-item.square img {
  max-height: 65%; /* Shrink the heavy square */
}

.logo-item.wide img {
  max-width: 95%;  /* Maximize the thin wordmark */
}
```

## Key Takeaways
1.  **Don't trust the math:** Use your eyes to verify if the "visual weight" is equal.
2.  **Center Everything:** Always use `align-items: center` and `justify-content: center`.
3.  **Monochrome First:** Use CSS filters (`grayscale`, `brightness`) to create a unified look without editing the original brand assets.
