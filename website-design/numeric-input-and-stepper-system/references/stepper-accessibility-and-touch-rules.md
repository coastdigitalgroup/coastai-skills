# Stepper Accessibility, Touch, and Precision Technical Reference

This technical reference provides developer specifications and accessibility rules for implementing custom numeric inputs and stepper controls across web platforms.

---

## 1. ARIA Roles, States, and Live Regions

Custom steppers wrapping native text or number inputs require explicit ARIA attributes to ensure screen reader users receive real-time feedback when values change.

### Required ARIA Attributes on Input

```html
<input
  type="text"
  role="spinbutton"
  id="quantity-field"
  aria-valuenow="3"
  aria-valuemin="1"
  aria-valuemax="20"
  aria-valuetext="3 items in cart"
  aria-label="Select quantity for Ergonomic Chair"
  inputmode="numeric"
  pattern="[0-9]*"
>
```

- **`role="spinbutton"`**: Identifies the control as an adjustable numeric range control.
- **`aria-valuenow`**: Reflects the current numerical value as a valid floating-point number or integer. Must update synchronously on value change.
- **`aria-valuemin`**: Specifies the lowest acceptable value (`min`).
- **`aria-valuemax`**: Specifies the highest acceptable value (`max`).
- **`aria-valuetext`** *(Optional but recommended)*: Human-readable text string for complex unit steppers (e.g., `"3 licenses ($45/mo)"` or `"1.5 kilograms"`).
- **`aria-label` or `aria-labelledby`**: Ensures screen readers announce the exact purpose of the input control.

### Stepper Action Buttons (`<button>`)

```html
<button
  type="button"
  aria-label="Decrease quantity for Ergonomic Chair"
  aria-controls="quantity-field"
  disabled
>
  <svg aria-hidden="true" ...></svg>
</button>
```

- **Native `<button type="button">`**: Always use native button elements rather than `<div>` or `<span>` to gain default keyboard focus and click handlers.
- **`aria-label` Context**: Do not use vague labels like `"Minus"` or `"Plus"`. Provide full context: `"Decrease quantity"` or `"Add 1 seat"`.
- **`aria-controls`**: Points to the `id` of the numeric input field modified by the button.
- **`aria-hidden="true"`**: Hide decorative SVG icons inside the buttons from screen readers.
- **`disabled` Attribute**: Set native `disabled` on increment/decrement buttons when boundaries are hit. When `disabled` is set, screen readers announce the button state as unavailable.

---

## 2. Keyboard Navigation Rules

When the numeric input or spinbutton control receives focus, it must respond to standard keyboard controls:

| Key Command | Action | Behavior Detail |
| :--- | :--- | :--- |
| **`ArrowUp`** | Increment value by `step` | Clamped at `max`. |
| **`ArrowDown`** | Decrement value by `step` | Clamped at `min`. |
| **`Shift + ArrowUp`** | Page Increment (e.g., `step * 10`) | Accelerates adjustments in large ranges. |
| **`Shift + ArrowDown`** | Page Decrement (e.g., `step * 10`) | Accelerates adjustments in large ranges. |
| **`Home`** | Jump to Minimum (`min`) | Immediately sets `aria-valuenow` to `aria-valuemin`. |
| **`End`** | Jump to Maximum (`max`) | Immediately sets `aria-valuenow` to `aria-valuemax`. |
| **`Tab` / `Shift + Tab`** | Blur / Move Focus | Triggers input sanitization and boundary checks. |

---

## 3. Touch Target Guidelines (WCAG 2.2 SC 2.5.8)

Mobile devices require hit areas large enough to avoid mis-taps:

1. **Target Size Thresholds:**
   - **Minimum Bounding Box:** 24×24 CSS pixels.
   - **Recommended Target Area:** 44×44 CSS pixels (Apple iOS Human Interface Guidelines) or 48×48 CSS pixels (Android Material Design).
2. **Hit Area Extension:**
   - If the visual icon or button container is compact (e.g., 32×32px in a dense table), extend the touch target using pseudo-elements:

```css
.stepper-btn-compact {
  position: relative;
  width: 32px;
  height: 32px;
}

/* Extends hit target to 48x48px without altering visual layout */
.stepper-btn-compact::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
}
```

3. **Touch Action:**
   - Apply `touch-action: manipulation;` on increment and decrement buttons to eliminate the 300ms double-tap zoom delay on mobile web browsers.

---

## 4. Mobile Keypad Optimization (`inputmode`)

To ensure mobile browsers display the optimal touch keyboard layout without requiring manual keyboard switches:

- **For Positive Integers (Quantities, Seat Counts, Guest Counts):**
  ```html
  <input type="text" inputmode="numeric" pattern="[0-9]*">
  ```
  *Renders a 10-key numeric keypad on iOS and Android.*

- **For Currency, Decimal Metrics, or Percentages:**
  ```html
  <input type="text" inputmode="decimal">
  ```
  *Renders a numeric keypad with a decimal point button (`.` or `,` depending on system locale).*

- **Why Avoid Native `type="number"` Alone?**
  - Native `type="number"` in HTML5 forces native browser spin buttons, allows scroll wheel changes that can accidentally alter form values, and behaves inconsistently with localized decimal separators (comma vs period).

---

## 5. CSS Reset for Custom Stepper Inputs

To prevent native browser spin arrows from cluttering custom UI steppers:

```css
/* Hide native spin buttons across Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide native spin buttons in Firefox */
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
```

---

## 6. Floating-Point Precision Mitigation

When handling decimal increments (e.g., `step = 0.1` or `0.01`), standard JavaScript floating-point arithmetic introduces rounding errors (e.g., `0.1 + 0.2 === 0.30000000000000004`).

### Precision Handler Algorithm

```javascript
function safeStepIncrement(currentVal, step, precision = 2) {
  const factor = Math.pow(10, precision);
  const currentInt = Math.round(currentVal * factor);
  const stepInt = Math.round(step * factor);
  return (currentInt + stepInt) / factor;
}

// Example usage:
// safeStepIncrement(0.1, 0.2, 2) -> 0.3
```

---

## 7. High-Contrast & Forced Colors Support

For Windows High Contrast Mode / Forced Colors Mode:

```css
@media (forced-colors: active) {
  .stepper-inline,
  .stepper-unit {
    border: 2px solid ButtonText;
  }

  .stepper-btn:disabled {
    color: GrayText;
    border-color: GrayText;
  }

  .stepper-btn:focus-visible {
    outline: 3px solid Highlight;
  }
}
```
