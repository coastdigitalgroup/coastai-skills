---
name: numeric-input-and-stepper-system
description:
  Design and document a systematic framework for numeric inputs, quantity selectors, and stepper controls, defining touch targets, boundary constraints, and WCAG AA accessible patterns across web interfaces.
---

# Numeric Input & Stepper System

## Purpose

The Numeric Input & Stepper System provides a standardized framework for designing, structuring, and implementing controls used to select, adjust, or enter discrete numerical values. Precise numeric entry—such as cart item quantities, SaaS seat allocations, pricing tier units, budget ranges, or dimension specifications—requires balancing rapid micro-adjustments with direct text editing, clear min/max boundary states, touch-friendly tap targets, and full keyboard/screen reader accessibility.

Standard HTML `<input type="number">` controls render inconsistently across browsers, often featuring tiny, non-customizable native spinner arrows that violate touch target guidelines (WCAG 2.2 SC 2.5.8) and trigger accidental scroll adjustments. This skill defines explicit UI patterns, spatial layout rules, interaction states, and accessibility standards for custom numeric steppers and unit-bounded fields.

## Use Cases

- **E-Commerce Cart Quantity Selectors:** Allowing shoppers to easily increment, decrement, or type product item quantities within PDPs, cart drawers, and checkout summary tables.
- **SaaS Plan Seat & License Controls:** Provisioning user seats, server instances, or storage gigabytes on pricing pages or subscription management settings.
- **Form Bounded Unit Inputs:** Capturing constrained metrics like percentage values (0–100%), age limits, item dimensions (length/width/height), or currency amounts.
- **Financial & Calculator Controls:** Selecting loan durations, deposit amounts, or investment increments within interactive calculators.
- **Dashboard & Filter Controls:** Adjusting numerical thresholds, pagination row limits, or metric range filters in data-dense desktop environments.

## When NOT to Use

- **Continuous Range Selection:** For broad, non-specific numerical range exploration where exact values are secondary to relative positions, use `accessible-range-slider-implementation` or dual-thumb sliders instead.
- **Large Arbitrary Numbers:** For entering credit card numbers, phone numbers, ZIP codes, or Social Security numbers where increment/decrement operations make no sense, use standard `<input type="text" inputmode="numeric">` with `form-design-system`.
- **Date & Time Picking:** For selecting calendar days, months, or clock times, use `calendar-and-date-system`.
- **Large Discrete Option Sets:** When selecting among pre-configured bulk quantities (e.g., 25, 50, 100, 500), use `segmented-control-system` or `custom-select-and-combobox-system`.

## Inputs

1. **Value Boundaries:** Minimum (`min`), maximum (`max`), and step increment (`step`) constraints.
2. **Context & Density:** Available layout space (compact inline table row vs. prominent PDP buying block).
3. **Input Format & Unit:** Associated physical or monetary unit (e.g., `$`, `%`, `items`, `kg`, `seats`).
4. **Interaction Mode:** Whether direct manual text typing is permitted or if adjustment is restricted to stepper buttons only.
5. **Brand & Surface Tokens:** Palette tokens for surface background, active borders, disabled states, focus rings, and icon glyphs.

## Outputs

1. **Stepper Component Specification:** Visual anatomy defining the Decrement Button, Numeric Display/Input, Increment Button, and Unit Label.
2. **Boundary & State Matrix:** Visual treatments for Default, Hover, Focus, Disabled (at Min/Max limits), Loading, and Error states.
3. **Responsive Spatial Layout Spec:** Touch target dimensions (minimum 44x44px for touch, 24x24px for compact desktop), spacing, and font metrics across breakpoints.
4. **Accessibility & Keyboard Mapping:** ARIA attributes (`role="spinbutton"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`), live region configurations, and keyboard shortcut handler specs.

---

## Workflow

### 1. Select the Stepper Variant

Choose the appropriate structural variant based on context and interaction intent:

- **Standard Horizontal Stepper (3-Piece Segmented):** Decrement button (`-`) on the left, central text input, Increment button (`+`) on the right. Best for e-commerce PDPs, cart items, and SaaS seat counters.
- **Compact Inline Stepper (Stacked Arrows):** Text input with vertically stacked micro-buttons on the trailing side. Best for high-density desktop data tables, toolbars, and SaaS settings sidebar panels.
- **Unit-Affixed Input:** Text field with a fixed prefix/suffix unit label (e.g., `$`, `USD`, `px`, `%`) and optional stepper buttons. Best for financial inputs and system configuration forms.
- **Standalone Button Counter:** Fully clickable pill where tapping opens an inline modal/popover or transforms into an active stepper upon focus.

### 2. Establish Visual Anatomy and Touch Target Rules

Structure the component using clear geometric parameters:

- **Touch Target Dimensions:** Ensure all interactive increment/decrement buttons feature a minimum hit target of **44x44px** on mobile/touch interfaces (WCAG 2.5.5 / 2.5.8). On desktop-only compact UIs, maintain at least **24x24px** with adequate hit padding.
- **Input Field Sizing:** Set width dynamically using CSS `ch` units based on expected max digit length (e.g., `width: calc(3ch + 2rem)` for 2-digit quantities).
- **Typography & Alignment:** Center-align the numeric value within the input field. Use tabular monospaced numbers (`font-variant-numeric: tabular-nums;`) to prevent layout shifts during rapid value transitions.
- **Visual Grouping:** Enclose buttons and input within a shared border container or contiguous segmented pill to signal unified functionality.

### 3. Define Boundary Behaviors and Disabled States

Communicate minimum and maximum limits clearly to avoid user frustration:

- **At Minimum Bound (`value <= min`):**
  - Disable the Decrement button (`disabled` attribute and `aria-disabled="true"`).
  - Apply low-contrast disabled styling (e.g., `opacity: 0.4; cursor: not-allowed;`).
  - If `min === 1` in an e-commerce cart context, optionally transform the Decrement button into a "Trash / Delete" icon when value is 1 to permit line item removal.
- **At Maximum Bound (`value >= max`):**
  - Disable the Increment button (`disabled` attribute and `aria-disabled="true"`).
  - Provide inline helper text (e.g., "Maximum 10 items per order") or a subtle tooltip if the user attempts to increment further.
- **Direct Input Validation:**
  - On input `blur`, automatically clamp out-of-bounds typed entries to nearest valid limit (e.g., typing `99` into a max-10 field clamps to `10`).
  - If a step increment is non-integer (e.g., `step="0.5"`), round typed values to nearest valid step increment on blur.

### 4. Implement Keyboard Navigation & Touch Feedback

Ensure seamless control across input devices:

- **Key Bindings:**
  - `ArrowUp` / `ArrowRight`: Increment value by `step`.
  - `ArrowDown` / `ArrowLeft`: Decrement value by `step`.
  - `PageUp`: Increment value by `step * 10` (or larger step delta).
  - `PageDown`: Decrement value by `step * 10`.
  - `Home`: Set value to `min` (if defined).
  - `End`: Set value to `max` (if defined).
- **Press & Hold Auto-Repeat:** When user holds down an increment/decrement button (via pointer or keyboard), initiate value auto-repeat after a 500ms initial delay, cycling every 100ms.
- **Touch / Mobile Keyboard:** Set `inputmode="numeric"` or `inputmode="decimal"` and `pattern="[0-9]*"` on the `<input>` element to trigger the numeric keypad on mobile devices without forcing standard native browser spinners.

### 5. Configure Accessibility and Screen Reader Semantics

Deliver a WCAG 2.1 / 2.2 AA compliant experience:

- **Semantic HTML Options:**
  - **Option A (Native Input with Stepper Buttons):** Use `<input type="text" inputmode="numeric">` associated with explicit `<label>`. Accent decrement/increment buttons with `<button type="button" aria-label="Decrease quantity">` and `aria-controls="input-id"`.
  - **Option B (ARIA Spinbutton Role):** Apply `role="spinbutton"`, `aria-valuenow="3"`, `aria-valuemin="1"`, `aria-valuemax="10"`, `aria-valuetext="3 seats"`, and `aria-label="Select number of seats"` to the container or input.
- **Focus Ring Management:** Maintain visible, high-contrast focus rings (`outline: 2px solid var(--focus-ring); outline-offset: 2px;`) around active buttons and text inputs. Focus rings must never be hidden or clipped by parent container boundaries.
- **Live Region Announcements:** Use `aria-live="polite"` or update `aria-valuenow` dynamically so assistive technologies immediately announce value changes upon button press.

---

## Decision Rules

### Component Pattern Matrix

| Use Case | Recommended Variant | Button Placement | Min/Max Strategy |
| :--- | :--- | :--- | :--- |
| **E-Commerce PDP** | Standard Horizontal | Flanking (`-` Left, `+` Right) | Min = 1 (or Trash at 1), Max = Stock limit |
| **Cart Line Item** | Compact Horizontal / Trash hybrid | Flanking (`-`/Trash Left, `+` Right) | Min = 0 (removes item), Max = Available stock |
| **SaaS Billing Seats** | Horizontal with Unit Suffix | Flanking (`-` Left, `+` Right) | Min = Minimum plan tier, Max = Account cap |
| **Desktop Data Table** | Stacked Inline Stepper | Trailing Stacked (`▲` Top, `▼` Bottom) | Min/Max clamped on blur |
| **Financial Amount** | Unit-Affixed Input (`$`) | Optional Flanking or Manual-only | Min = 0, Max = Limit with validation message |

### Direct Typing vs. Button-Only Rule
- **Allow Direct Typing (Default):** For quantities > 5 or where users may enter large numbers directly (e.g., ordering 50 items or setting a $500 budget).
- **Restrict to Buttons Only (`readonly` input):** Only when value range is extremely small (e.g., 1 to 5) and freeform text typing introduces unnecessary validation overhead on small touch devices.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - Buttons must provide explicit `aria-label` attribute describing action (e.g., "Decrease item quantity").
  - Increment and decrement buttons must maintain minimum touch target of **44x44px** on touch viewports (SC 2.5.8).
  - Active focus indicators must satisfy WCAG 2.4.11 (Focus Not Obscured) and SC 2.4.13 (Focus Appearance).
- **Number Formatting:**
  - Never allow blank or `NaN` values to remain in input on blur. Fallback to `min` or previous valid value.
  - Numbers must be rendered using `font-variant-numeric: tabular-nums;` to prevent layout reflow during increments.
- **Mobile Soft Keyboards:**
  - Always set `inputmode="numeric"` (or `decimal`) to open standard number keypad on iOS/Android. Avoid native `<input type="number">` default arrow styling by disabling native spinners in CSS (`::-webkit-inner-spin-button`).

---

## Common Failure Patterns

- **Tiny Non-Standard Touch Targets:** Using 18x18px chevron buttons on mobile, causing mis-taps and user frustration.
- **Relying on Native Browser `<input type="number">`:** Allowing browser-default spinners to render inconsistently, overlap custom text padding, or trigger unintended scroll adjustments.
- **Missing Boundary Disable Cues:** Leaving the Decrement button visually active when `value === min`, leading users to click without feedback.
- **Unclamped Freeform Entry:** Allowing users to type invalid values (e.g., `-5` or `999999`) without clamping or error feedback on blur.
- **Missing Keyboard Support:** Designing custom `<div>` buttons that lack `Tab` focusability and `ArrowUp`/`ArrowDown` event handling.

---

## Validation Criteria

- [ ] Decrement and increment buttons meet minimum 44x44px touch target on touch viewports.
- [ ] Tabular monospaced typography (`tabular-nums`) is used to prevent layout jitter during updates.
- [ ] At minimum and maximum limits, respective buttons transition to disabled states (`aria-disabled="true"`).
- [ ] Mobile input utilizes `inputmode="numeric"` or `inputmode="decimal"`.
- [ ] Component handles `ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home`, and `End` keys correctly.
- [ ] Programmatic labels (`aria-label` or `<label>`) and ARIA roles (`role="spinbutton"` or explicit `aria-controls` buttons) are configured.
- [ ] Out-of-bounds typed values auto-clamp or trigger validation error messages on `blur`.
- [ ] High-contrast focus indicators are visible and unobscured.
