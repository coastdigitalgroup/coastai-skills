# E-Commerce Cart & SaaS Stepper Layout Breakdown

This example breaks down three real-world implementation contexts for the **Numeric Input & Stepper System**:
1. **E-Commerce Product Detail Page (PDP) & Cart Drawer Stepper** (Prominent touch-first horizontal segmented stepper with min/max stock limits and Trash icon transition at min value).
2. **SaaS Enterprise Tier License Allocation Stepper** (Horizontal stepper with unit-affixed suffix, live price recalculation, and keyboard shortcut accessibility).
3. **Data-Dense SaaS Settings Table Inline Stepper** (Compact stacked stepper for high-density tabular environments).

---

## 1. E-Commerce PDP & Cart Drawer Quantity Stepper

### Context & Goal
Provide e-commerce shoppers with an effortless, thumb-friendly quantity adjustment control. The control must prevent out-of-stock ordering, maintain minimum touch targets on mobile devices, and seamlessly convert to a "Remove Item" trash affordance when quantity reaches `1` inside a cart drawer.

### Visual & Spatial Layout Blueprint

```text
+-------------------------------------------------------------------------+
| PDP Buying Block / Cart Drawer Item                                      |
|                                                                         |
|  Item: Premium Ergonomic Desk Chair ($349.00)                           |
|  Stock: Only 5 remaining in stock                                       |
|                                                                         |
|  Quantity Label:                                                        |
|  +-------------------------------------------------------------------+  |
|  |  [ <button: Decrement / Trash > ] [ <input: 2 > ] [ <button: + > ]  |  |
|  +-------------------------------------------------------------------+  |
|     ^-- Touch Target: 44x44px       ^-- Tabular Nums  ^-- Touch: 44x44px|
|     ^-- SVG Minus or Trash Icon     ^-- 3ch Width     ^-- SVG Plus      |
|                                                                         |
|  Helper Text / Limit Warning:                                           |
|  "Maximum 5 chairs per customer order"                                  |
+-------------------------------------------------------------------------+
```

### Detailed Component Specs

- **Container Styling:**
  - Border: `1px solid var(--border-subtle, #D1D5DB)`
  - Border Radius: `8px`
  - Display: `inline-flex; align-items: center;`
  - Height: `44px` (touch viewport standard)
  - Background: `var(--surface-primary, #FFFFFF)`
- **Decrement / Trash Button (`button.stepper-btn--decrement`):**
  - Dimensions: `44px x 44px` (Width x Height)
  - Icon State: Displays SVG Minus (`-`) when `value > 1`. Displays SVG Trash Can when `value === 1` in Cart Drawer context.
  - Disabled State: When `min === 1` (PDP context), sets `disabled`, `aria-disabled="true"`, `opacity: 0.38; cursor: not-allowed;`.
- **Numeric Text Input (`input.stepper-input`):**
  - Dimensions: `min-width: 48px; height: 100%;`
  - Alignment: `text-align: center;`
  - Font Styling: `font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-weight: 600; font-size: 1rem;`
  - Attributes: `type="text" inputmode="numeric" pattern="[0-9]*" aria-label="Item quantity" min="1" max="5" value="2"`
- **Increment Button (`button.stepper-btn--increment`):**
  - Dimensions: `44px x 44px`
  - Icon State: Displays SVG Plus (`+`).
  - Disabled State: When `value >= max` (e.g. `value === 5`), sets `disabled`, `aria-disabled="true"`, `opacity: 0.38; cursor: not-allowed;`.

### Interaction & Boundary Annotations

1. **Tap / Click Increment (+):**
   - Increases `value` from `2` to `3`.
   - Screen reader live region announces: `"Quantity updated to 3"`.
   - Decrement button switches from disabled to active state.
2. **Reaching Maximum Stock Limit (`value = 5`):**
   - Increment button becomes visually disabled (`opacity: 0.38`) and non-interactive (`disabled`).
   - Helper text appears: `"Maximum stock limit reached (5 items)"`.
3. **Manual Typing & Blur Clamping:**
   - User clicks text input and types `99`.
   - On `blur` (or `Enter` key), system detects `99 > max (5)`.
   - Input value immediately clamps to `5`.
   - Inline message alerts user: `"Value clamped to maximum available quantity of 5"`.

---

## 2. SaaS Enterprise License Seat Allocation Stepper

### Context & Goal
Allow enterprise SaaS administrators to adjust team seat allocations during plan upgrade or renewal. Requires unit-affixed display (`seats`), immediate subtotal price calculation, and clear minimum seat thresholds based on plan tier requirements.

### Visual & Spatial Layout Blueprint

```text
+-------------------------------------------------------------------------+
| SaaS Team Plan Configuration                                            |
|                                                                         |
|  Select Team Seats (Minimum 10 seats required for Pro Plan)             |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |  [ - ]  |  25  |  seats  |  [ + ]                                 |  |
|  +-------------------------------------------------------------------+  |
|     ^-- 44px   ^-- Mono  ^-- Suffix  ^-- 44px                           |
|                                                                         |
|  Pricing Summary:                                                       |
|  25 seats × $12.00 / seat / mo = $300.00 / month                        |
|                                                                         |
|  Shortcut Hint: Use Up/Down arrow keys while focused to adjust          |
+-------------------------------------------------------------------------+
```

### Accessibility & ARIA Structural Mapping

```html
<div class="saas-seat-stepper" role="group" aria-labelledby="seat-stepper-label">
  <label id="seat-stepper-label" class="stepper-label">
    Team Seats (<span class="stepper-min-notice">Min 10 seats</span>)
  </label>

  <div class="stepper-segmented-control">
    <button type="button"
            class="stepper-btn stepper-btn--decrement"
            aria-label="Decrease seat count by 1"
            aria-controls="team-seats-input">
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
    </button>

    <div class="stepper-input-wrapper">
      <input type="text"
             id="team-seats-input"
             class="stepper-input"
             inputmode="numeric"
             pattern="[0-9]*"
             role="spinbutton"
             aria-valuenow="25"
             aria-valuemin="10"
             aria-valuemax="200"
             aria-valuetext="25 seats"
             aria-describedby="seat-pricing-summary"
             value="25">
      <span class="stepper-unit-suffix" aria-hidden="true">seats</span>
    </div>

    <button type="button"
            class="stepper-btn stepper-btn--increment"
            aria-label="Increase seat count by 1"
            aria-controls="team-seats-input">
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
    </button>
  </div>

  <div id="seat-pricing-summary" class="stepper-price-summary" aria-live="polite">
    25 seats × $12.00 / seat = <strong>$300.00 / month</strong>
  </div>
</div>
```

---

## 3. High-Density SaaS Settings Table Inline Stepper

### Context & Goal
Used inside a compact administrative data table where users adjust numeric thresholds (e.g., API Rate Limits per minute) across multiple client accounts. Space is tight, so vertical stacked chevron buttons are used alongside keyboard shortcuts.

### Layout Spec & Micro-Dimensions

- **Overall Height:** `32px` (Compact desktop density)
- **Input Width:** `60px`
- **Stacked Arrow Column Width:** `20px`
- **Touch & Pointer Target Padding:** Invisible hit area expanded to `24px` height per arrow button via CSS pseudo-elements (`::before`).

```text
+-------------------------------------------------------------------+
| Account Name     | Tier       | API Rate Limit (req/min)          |
+-------------------------------------------------------------------+
| Acme Corp        | Enterprise | +-----------------------+         |
|                  |            | |  1000  | [ ▲ ]        |         |
|                  |            | |        | [ ▼ ]        |         |
|                  |            | +-----------------------+         |
+-------------------------------------------------------------------+
```

### Key Behaviors & Edge Cases

- **Press & Hold Auto-Repeat:** Pressing and holding the Up Arrow (`▲`) button continuously increments the value every 100ms after an initial 500ms delay.
- **Keyboard Increments:** When input is focused, pressing `PageUp` jumps rate limit by `+100` (e.g., `1000` -> `1100`). Pressing `PageDown` decreases by `-100`.
- **Monospaced Digit Stability:** Monospaced tabular figures ensure that as numbers expand from `999` to `1000`, adjacent table columns undergo zero width jitter.
