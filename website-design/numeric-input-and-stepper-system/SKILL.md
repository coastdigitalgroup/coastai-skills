---
name: numeric-input-and-stepper-system
description:
  Standardized framework for designing, structuring, and implementing controls
  used to select, adjust, or enter discrete numerical values with touch targets,
  boundary constraints, and WCAG AA accessibility patterns.
---

# Numeric Input and Stepper System

## Purpose

The Numeric Input and Stepper System provides a structured framework for designing and specifying controls that allow users to enter, increment, or decrement discrete numerical values. Numerical input in web interfaces—such as product quantities in e-commerce, user seat allocation in SaaS billing, currency inputs, or reservation party sizes—frequently suffers from sub-optimal touch targets, missing boundary feedback, poor mobile keypad triggering, and screen reader disconnects.

This skill establishes clear standards for stepper architecture, layout geometry, touch target sizing, state transitions, boundary enforcement, and keyboard/screen reader accessibility.

---

## Use Cases

- **E-commerce Quantity Selectors:** Product detail page (PDP) add-to-cart quantities, mini-cart adjustments, and cart checkout line items.
- **SaaS Seat & Resource Allocation:** Adjusting active user seats, storage quotas, API rate limits, or billing tiers.
- **Booking & Reservations:** Selecting guest counts, room counts, ticket quantities, or duration slots.
- **Financial & Unit Inputs:** Currency inputs with micro-stepper increments, percentage adjustments, and custom measurement units (e.g., kg, lbs, hours).
- **Form Parameters:** Setting numerical configuration parameters, table pagination row limits, or time duration thresholds.

---

## When NOT to Use

- **Continuous Range Selections:** For estimating values within an approximate continuous gradient (e.g., audio volume, price filter range, distance radius), use a **Range Slider** or dual-thumb range control instead.
- **Rating Inputs:** For scoring items (e.g., 1 to 5 stars), use a dedicated **Rating Component**.
- **Long Un-stepped Identifiers:** For multi-digit identification codes, credit card numbers, phone numbers, or zip codes, use standard text inputs with appropriate `autocomplete` and `inputmode` settings without increment buttons.
- **Binary / Discrete Choice Toggles:** For choosing between two states (e.g., On/Off or Monthly/Annual), use a **Switch** or **Segmented Control**.

---

## Inputs

When designing or configuring a numeric input or stepper system, gather the following requirements:

1. **Numeric Range Parameters:**
   - Minimum value (`min`, e.g., `1` or `0`).
   - Maximum value (`max`, e.g., `99` or `1000`).
   - Increment step size (`step`, e.g., `1`, `5`, `0.5`, or `0.01`).
   - Default value (`defaultValue`).
2. **Input Archetype & Context:**
   - *Inline Stepper:* Compact `-` / `+` buttons flanking a central numeric input field (e.g., cart quantity).
   - *Stacked Stepper:* Vertical `▲` / `▼` buttons integrated inside or beside a numeric input field (e.g., table density, financial input).
   - *Unit Stepper:* Input field with embedded currency/unit prefix or suffix (e.g., `$150.00`, `12 GB`).
   - *Segmented Numeric Pill:* Fully enclosed button group for small bounded ranges (e.g., 1–5 guests).
3. **Viewport & Device Target:**
   - Desktop cursor interaction vs. mobile touch targets.
   - On-screen touch keypad requirements (`inputmode="numeric"` vs `inputmode="decimal"`).
4. **Precision & Formatting Rules:**
   - Integer vs. floating-point decimal precision.
   - Currency or unit locale formatting requirements.

---

## Outputs

1. **Visual & Layout Specifications:**
   - Component dimensions, touch target padding, border radii, optical alignments, and typography hierarchy.
2. **State & Boundary Rules:**
   - Visual states for Default, Hover, Focus-Visible, Active/Pressed, Disabled, Min/Max Boundary Reached, and Invalid Input.
3. **Responsive Adaptation Protocols:**
   - Mobile touch target expansion guidelines and virtual keypad trigger rules.
4. **Accessibility Specification:**
   - ARIA roles, states, live region announcements, keyboard shortcuts, and contrast verifications.

---

## Workflow

### Step 1: Select the Control Archetype

Select the component structure based on expected user behavior and range boundaries:

| Archetype | Range / Nature | Best Used For |
| :--- | :--- | :--- |
| **Inline Stepper** | Small integer steps (1 to 20) | Cart quantity, ticket counters, item count |
| **Stacked Micro-Stepper** | Wide numeric ranges or decimals | Financial fields, unit settings, row height |
| **Segmented Numeric Pills** | Very small bounded set (1 to 6) | Hotel guest count, option rating |
| **Dropdown / Direct Input Hybrid** | Large range with common values | Bulk ordering (1–10 via buttons, 10+ via input) |

### Step 2: Establish Layout & Touch Target Geometry

- **Minimum Touch Target:** Ensure increment (`+`) and decrement (`-`) button hit areas satisfy WCAG 2.2 SC 2.5.8 (minimum 24×24px, recommended 44×44px or 48×48px for mobile).
- **Field Width Alignment:** Set the input width based on maximum expected character count plus internal padding. Do not let input fields dynamically stretch or shrink as numbers change.
- **Button Alignment:**
  - *Inline:* Place Decrement (`-`) on the left, Numeric Input in the center, Increment (`+`) on the right.
  - *Icons:* Use clear, bold SVG symbols (`minus` / `plus` or `chevron-down` / `chevron-up`) with explicit `aria-hidden="true"`.

### Step 3: Configure Mobile Virtual Keypad

- Set `type="text"` or `type="number"` with appropriate `inputmode` and `pattern` attributes:
  - For integers: `inputmode="numeric" pattern="[0-9]*"`
  - For decimals: `inputmode="decimal"`
- Disable native browser spin buttons via CSS when custom UI steppers are present to prevent duplicate visual controls and layout shifting.

### Step 4: Map Boundary & Validation States

- **Minimum Boundary (`val <= min`):**
  - Disable Decrement button (`disabled` attribute, `opacity: 0.4`, `cursor: not-allowed`).
  - Keep Increment button active.
- **Maximum Boundary (`val >= max`):**
  - Disable Increment button (`disabled` attribute, `opacity: 0.4`, `cursor: not-allowed`).
  - Keep Decrement button active.
- **Manual Input Beyond Boundaries:**
  - If user types a value `< min` or `> max`, show inline warning on blur or value change and clamp value or apply an error border.
- **Non-Numeric Entry:**
  - Strip or reject invalid non-numeric characters immediately, or mark field invalid with `aria-invalid="true"`.

### Step 5: Implement Keyboard & ARIA Semantics

- Render increment and decrement controls as native `<button type="button">`.
- Apply `role="spinbutton"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` or `aria-labelledby` to the input control or container.
- Map standard keyboard shortcuts when input is focused:
  - `ArrowUp`: Increment by `step`.
  - `ArrowDown`: Decrement by `step`.
  - `PageUp`: Increment by `step * 10` (or larger step).
  - `PageDown`: Decrement by `step * 10`.
  - `Home`: Set to `min`.
  - `End`: Set to `max`.

---

## Decision Rules

### 1. Stepper Buttons vs. Plain Input vs. Select Dropdown

- Use **Inline Stepper Buttons** when 80%+ of users adjust values by 1–3 increments.
- Use **Direct Input with Stacked Stepper** when users need to enter exact arbitrary numbers (e.g., `$1,250`) but benefit from fine tuning.
- Use **Select Dropdown** when inventory or business rules restrict quantities to specific non-linear thresholds (e.g., 5, 10, 25, 50, 100).

### 2. Sizing & Density Guidelines

```text
Compact / Table Dense:
[ (-) |  12  | (+) ]  ->  Height: 32px | Input Width: 48px | Button Width: 32px

Standard Desktop:
[  (-)  |   12   |  (+)  ]  ->  Height: 40px | Input Width: 64px | Button Width: 40px

Touch-First / Mobile:
[   (-)   |    12    |   (+)   ]  ->  Height: 48px | Input Width: 80px | Button Width: 48px
```

### 3. Boundary Reached Action Rules

- **Cart Quantity At Minimum (1):**
  - *Option A (Default):* Disable `-` button.
  - *Option B (Trash Icon):* Replace `-` icon with a trash/delete icon when `value === 1` to indicate clicking will remove item from cart.

---

## Constraints

### Accessibility (WCAG 2.1 AA / WCAG 2.2)

- **Contrast:** Button borders and text/icon colors must achieve a minimum contrast ratio of **4.5:1** against backgrounds for normal text/icons, and **3:1** for UI control borders (WCAG SC 1.4.11 Non-text Contrast).
- **Focus Indicators:** Interactive buttons and input must display a highly visible focus indicator (`:focus-visible`) with at least **3:1** contrast and 2px stroke width.
- **Screen Reader Announcements:** When values change via button clicks, ensure the value change is communicated via `role="spinbutton"` updates or an `aria-live="polite"` status region.
- **Touch Targets:** Minimum 24×24px bounding box, minimum 44×44px interactive tap area on touch viewports (WCAG 2.2 SC 2.5.8 Target Size).

### Layout & Responsiveness

- Input fields must align text to center or right depending on whether units are present.
- Prevent layout shift when numbers grow from single digit (e.g., `9`) to double/triple digits (e.g., `10`, `100`).

---

## Common Failure Patterns

1. **Native Spin Button Overlap:** Failing to hide native `<input type="number">` spin controls with CSS (`-webkit-appearance: none; appearance: textfield;`), causing native browser arrows to overlap custom styled buttons.
2. **Missing Touch Padding:** Making `-` and `+` buttons 24px wide on mobile without adequate hit padding, leading to accidental mis-taps.
3. **Dead-End Manual Typing:** Allowing users to type invalid strings (e.g., `"abc"` or `"-5"`) without validation, sanitization, or feedback on blur.
4. **Color-Only Boundary Indication:** Relying solely on color (e.g., turning a button light grey) without setting `disabled` or `aria-disabled="true"`, leaving screen readers unaware that the control is inactive.
5. **Virtual Keyboard Blockage:** Using standard `type="text"` without `inputmode="numeric"`, forcing mobile users to manually switch keypads to enter digits.

---

## Validation Criteria

Use this checklist to verify correct implementation:

- [ ] Native browser spin buttons are hidden cleanly across Chrome, Safari, Firefox, and Edge.
- [ ] Decrement (`-`) button is properly disabled when value equals `min`.
- [ ] Increment (`+`) button is properly disabled when value equals `max`.
- [ ] Mobile virtual keyboard opens in numeric mode (`inputmode="numeric"` or `"decimal"`).
- [ ] Input field does not shift layout when value length increases.
- [ ] Keyboard navigation (`ArrowUp`, `ArrowDown`, `Home`, `End`) works seamlessly when input is focused.
- [ ] Tap targets meet WCAG 2.2 SC 2.5.8 (min 24×24px, 44×44px touch area).
- [ ] High-contrast focus indicators appear on keyboard navigation (`:focus-visible`).
- [ ] Screen readers announce value changes via `role="spinbutton"` or live region.
