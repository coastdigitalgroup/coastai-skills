# Range Slider Anatomy & Accessibility Rules

This reference provides technical specifications, math formulas, and WCAG AA accessibility compliance requirements for implementing range sliders across web interfaces.

---

## 1. Visual Anatomy & Spatial Ratios

```text
[Header Label]                                            [Live Value Readout]
+----------------------------------------------------------------------------+
| Price Range                                                    $100 — $400 |
+----------------------------------------------------------------------------+
| Track Height: 6px - 8px                                                    |
|                                                                            |
| Inactive Track (3:1 contrast)        Active Track Fill (3:1 contrast)      |
| [========================[ Min Thumb ]==================[ Max Thumb ]====] |
|                           24x24px Circle                 24x24px Circle    |
+----------------------------------------------------------------------------+
| [ Minimum Text Input ]                       [ Maximum Text Input ]        |
+----------------------------------------------------------------------------+
```

### Component Dimensions & Metrics
- **Inactive Track Height:** 6px (mobile) to 8px (desktop).
- **Active Track Fill Height:** Matches inactive track height (6px–8px).
- **Physical Thumb Handle:** 24px x 24px circular or rounded target.
- **Interactive Touch Target:** Expanded to **44px x 44px** via CSS pseudo-element (`::after` with negative margins/padding) to satisfy WCAG 2.2 SC 2.5.8 and mobile finger ergonomics.
- **Focus Ring Offset:** 2px or 3px offset surrounding the thumb, with minimum 4.5:1 contrast against adjacent background colors.

---

## 2. Percentage Positioning & Track Math Formulas

To accurately calculate track fill offsets in JavaScript or CSS custom properties:

### Single-Thumb Slider Fill Width:
$$\text{Fill Width (\%)} = \left( \frac{\text{Current Value} - \text{Min Value}}{\text{Max Value} - \text{Min Value}} \right) \times 100$$

### Dual-Thumb Slider Fill Offset & Width:
$$\text{Fill Left (\%)} = \left( \frac{\text{Min Thumb Value} - \text{Min Bound}}{\text{Max Bound} - \text{Min Bound}} \right) \times 100$$

$$\text{Fill Width (\%)} = \left( \frac{\text{Max Thumb Value} - \text{Min Thumb Value}}{\text{Max Bound} - \text{Min Bound}} \right) \times 100$$

---

## 3. Keyboard Interaction Rules

Range sliders must support standard ARIA APG keyboard navigation semantics when focused:

| Key | Expected Action |
| :--- | :--- |
| `ArrowRight` / `ArrowUp` | Increments thumb value by 1 `step`. |
| `ArrowLeft` / `ArrowDown` | Decrements thumb value by 1 `step`. |
| `PageUp` | Increments thumb value by a larger step (e.g., 10x `step` or 10% of total range). |
| `PageDown` | Decrements thumb value by a larger step (e.g., 10x `step` or 10% of total range). |
| `Home` | Moves lower thumb to `aria-valuemin` (or minimum allowed gap limit). |
| `End` | Moves upper thumb to `aria-valuemax` (or maximum allowed gap limit). |

---

## 4. Screen Reader ARIA Mapping

Native `<input type="range">` elements provide built-in accessibility. When using custom DOM controls, the following ARIA attributes are mandatory:

```html
<div
  role="slider"
  tabindex="0"
  aria-label="Minimum price filter"
  aria-valuemin="0"
  aria-valuemax="1000"
  aria-valuenow="100"
  aria-valuetext="$100 dollars"
></div>
```

- `aria-label`: Unique descriptive text identifying which threshold this thumb controls (e.g., "Minimum price filter" vs. "Maximum price filter").
- `aria-valuenow`: Raw numeric state value used by screen reader engines.
- `aria-valuemin`: The absolute minimum allowable value for this handle.
- `aria-valuemax`: The absolute maximum allowable value for this handle.
- `aria-valuetext`: Expressive human-formatted string (e.g., "$100 dollars" or "25 Workspace Seats") announced during slider manipulation.

---

## 5. High Contrast / Windows Forced Colors Mode

When OS High Contrast or Forced Colors mode is enabled, background colors and custom drop shadows are removed by the browser. To keep slider components usable:

```css
@media (forced-colors: active) {
  .dual-range-input::-webkit-slider-thumb,
  .single-range-input::-webkit-slider-thumb {
    border: 2px solid CanvasText;
    background-color: Highlight;
  }

  .dual-slider-track,
  .dual-slider-fill {
    border: 1px solid CanvasText;
    background-color: Canvas;
  }

  .dual-slider-fill {
    background-color: Highlight;
  }
}
```

This guarantees that:
1. Thumb handles render with high-contrast system borders (`CanvasText`).
2. The active track fill is rendered using system `Highlight` color.
