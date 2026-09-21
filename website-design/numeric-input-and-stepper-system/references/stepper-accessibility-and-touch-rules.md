# Numeric Stepper Accessibility & Touch Guidelines

This reference document outlines accessibility standards, keyboard interaction rules, touch target guidelines (WCAG 2.2 SC 2.5.8), and ARIA semantics for custom numeric steppers and unit-affixed fields.

---

## 1. Touch Target & Spatial Guidelines (WCAG 2.2 SC 2.5.8 & SC 2.5.5)

- **Mobile & Touch Interfaces (Target Size - Level AA):**
  - Minimum hit area for increment and decrement buttons must be **44x44px** (or 24x24px with 10px perimeter spacing to achieve 44px total spacing under SC 2.5.8).
  - Recommended default button size: `44px x 44px`.
- **Desktop Compact UIs:**
  - In data tables or high-density toolbars, buttons may shrink visually to 24px height, provided invisible touch padding (`::before` pseudo-element) extends the hit target to at least 24x24px without overlapping neighboring actions.

---

## 2. Keyboard Interaction Rules

When focus is placed on either the text input or the custom stepper container, the following standard key bindings must be handled:

| Key | Action |
| :--- | :--- |
| `ArrowUp` or `ArrowRight` | Increments current value by `step` delta (default `+1`). |
| `ArrowDown` or `ArrowLeft` | Decrements current value by `step` delta (default `-1`). |
| `PageUp` | Increments value by large step (e.g. `step * 10`). |
| `PageDown` | Decrements value by large step (e.g. `step * 10`). |
| `Home` | Sets value directly to `aria-valuemin` (if defined). |
| `End` | Sets value directly to `aria-valuemax` (if defined). |
| `Tab` | Shifts focus cleanly out of the stepper to the next focusable interactive control. |

---

## 3. ARIA Roles & State Semantics

To ensure full compatibility with screen readers (NVDA, JAWS, VoiceOver, TalkBack):

- **Role:** Apply `role="spinbutton"` to the numerical `<input>` element or container.
- **Value Properties:**
  - `aria-valuenow`: Current numeric value (e.g., `aria-valuenow="5"`). Must update synchronously on state change.
  - `aria-valuemin`: Minimum allowed numerical boundary (e.g., `aria-valuemin="1"`).
  - `aria-valuemax`: Maximum allowed numerical boundary (e.g., `aria-valuemax="10"`).
  - `aria-valuetext`: Human-readable text representation (e.g., `aria-valuetext="5 seats"` or `aria-valuetext="$150 dollars"`).
- **Labeling:**
  - `<label for="input-id">`: Standard HTML programmatic label linkage.
  - Buttons must include `aria-label="Increase quantity"` and `aria-label="Decrease quantity"`.
- **Live Announcements:**
  - For steppers operating via buttons only (where input is non-editable), use an offscreen `aria-live="polite"` region to announce value updates (e.g. `"Quantity updated to 4"`).

---

## 4. Mobile Soft Keyboards & CSS Quirks

- **Opening Numeric Keypad:**
  - Set `inputmode="numeric"` on text inputs for integers.
  - Set `inputmode="decimal"` for float inputs (e.g. price or weight).
  - Set `pattern="[0-9]*"` for older iOS Safari compatibility.
- **Suppressing Native Spin Buttons:**
  - Native browser `<input type="number">` spinner arrows interfere with custom button layouts and cause scroll jitter. Suppress them using CSS:

```css
/* Disable native WebKit & Firefox spinner arrows */
input.stepper-input::-webkit-outer-spin-button,
input.stepper-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.stepper-input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
```

---

## 5. High-Contrast Focus & Disabled State Requirements

- **Focus Ring (WCAG 2.4.11 / 2.4.13):**
  - High contrast focus indicator must surround active element: `outline: 2px solid var(--color-brand-primary); outline-offset: 2px;`.
  - Focus ring must not be clipped by `overflow: hidden` on parent containers.
- **Disabled State Contrast (At Boundaries):**
  - When `value === min`, Decrement button must set `disabled` and `aria-disabled="true"`. Visual opacity drops to `0.38-0.40` with `cursor: not-allowed`.
