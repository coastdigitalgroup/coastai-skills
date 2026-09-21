# Range Slider Anatomy & Accessibility Rules

This reference provides exact geometric parameters, touch target specifications, WCAG AA compliance checklists, and ARIA attribute mapping rules for single-thumb and dual-thumb range sliders.

---

## 1. Visual Anatomy & Spatial Dimensions

```text
  [ Floating Tooltip / Badge ]
          |  ($150)
          v  +-------+
             | $150  |
             +---+---+
                 |
  +--------------v---------------------------------------------------+  <-- Track Container (Height: 44px for touch hit)
  |  ============( O )=======================                        |
  |  (Bg Track)  (Thumb Handle) (Active Fill)                        |
  +------------------------------------------------------------------+
                 ^-- Visual Thumb: 20x20px
                 ^-- Expanded Touch Target: 44x44px (via ::before pseudo-element)
```

| Element | Visual Size | Touch Hit Target | Contrast Standard | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Track Container** | 4px–8px height | 44px vertical height | 3:1 vs surface | Container provides touch clearance without inflating track height |
| **Active Track Fill** | 6px–8px height | N/A | 3:1 vs background | Represents active range selection |
| **Thumb Handle** | 20px–24px circle | **44x44px** hit target | 3:1 handle border contrast | Expanded hit area via invisible pseudo-element (`::before`) |
| **Value Tooltip Badge** | 24px height | N/A | 4.5:1 text contrast | Positioned 8px above thumb handle |
| **Synchronized Text Input** | 40px height | 40px–44px | 4.5:1 text contrast | Monospaced figures (`tabular-nums`) |

---

## 2. Accessibility & ARIA Attribute Checklist

### Role & Value Attributes
- Every slider handle MUST use `role="slider"`.
- `aria-valuenow`: Numeric representation of current thumb position (e.g., `150`).
- `aria-valuemin`: Minimum boundary value (or lower limit for upper thumb).
- `aria-valuemax`: Maximum boundary value (or upper limit for lower thumb).
- `aria-valuetext`: Formatted human-readable string (e.g., `"$150 per month"` or `"150 Gigabytes"`).
- `aria-label` or `aria-labelledby`: Explicit label describing thumb function (e.g., `aria-label="Minimum Price"`).

### Dual-Thumb ARIA Example
```html
<!-- Lower (Min) Thumb -->
<div role="slider"
     tabindex="0"
     id="min-thumb"
     aria-label="Minimum Price"
     aria-valuenow="25"
     aria-valuemin="0"
     aria-valuemax="500"
     aria-valuetext="$25.00"
     aria-controls="min-price-input">
</div>

<!-- Upper (Max) Thumb -->
<div role="slider"
     tabindex="0"
     id="max-thumb"
     aria-label="Maximum Price"
     aria-valuenow="150"
     aria-valuemin="0"
     aria-valuemax="500"
     aria-valuetext="$150.00"
     aria-controls="max-price-input">
</div>
```

---

## 3. Keyboard Navigation Specification

| Key Combination | Action | Focus Behavior |
| :--- | :--- | :--- |
| `ArrowRight` / `ArrowUp` | Increment value by 1 `step` | Stays on active thumb |
| `ArrowLeft` / `ArrowDown` | Decrement value by 1 `step` | Stays on active thumb |
| `PageUp` | Increment value by large step (`step * 10`) | Stays on active thumb |
| `PageDown` | Decrement value by large step (`step * 10`) | Stays on active thumb |
| `Home` | Jump value to `aria-valuemin` limit | Stays on active thumb |
| `End` | Jump value to `aria-valuemax` limit | Stays on active thumb |
| `Tab` / `Shift + Tab` | Move focus between Lower Thumb, Upper Thumb, and Text Fields | Cycles focus in logical DOM order |

---

## 4. Mobile & Touch Screen Rules

1. **Touch Action Disabling:** Apply `touch-action: none;` CSS property to the slider track and thumb handle container to prevent vertical window scrolling while the user drags slider handles.
2. **Hit Area Expansion:** Ensure the invisible `::before` pseudo-element extends hit target bounds to **44x44px** centered around the visual thumb.
3. **Mobile Keyboard Input:** For synchronized numeric inputs, set `inputmode="decimal"` or `inputmode="numeric"` to trigger the numeric keypad on iOS and Android devices.
4. **Layout Stability:** Always apply `font-variant-numeric: tabular-nums;` to summary values and tooltips to avoid width changes when digits change (e.g. `$9` to `$10`).
