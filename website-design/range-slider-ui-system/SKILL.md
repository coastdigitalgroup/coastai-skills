---
name: range-slider-ui-system
description:
  Design and document a systematic framework for single-thumb and dual-thumb range sliders, value track fills, touch targets, and accessibility patterns across web interfaces.
---

# Range Slider UI System

## Purpose

The Range Slider UI System provides a standardized framework for designing, structuring, and implementing controls used to adjust continuous values or select bounded numeric ranges (min/max). Selecting numerical ranges—such as price bounds in e-commerce filters, credit limits in loan calculators, storage allocations in SaaS plans, or playback timestamps in media scrubbers—requires balancing fluid pointer dragging with direct text input, clear min/max boundary feedback, touch-friendly tap targets, and full keyboard/screen reader accessibility.

Standard HTML `<input type="range">` controls render inconsistently across browser engines, lack native dual-thumb capability for range selection, present tiny default thumb handles (12–16px) that violate touch target guidelines (WCAG 2.2 SC 2.5.8), and offer no built-in value tooltip or histogram integration. This skill defines explicit UI patterns, spatial layout rules, interaction states, dual-thumb collision mechanics, and accessibility standards for single-thumb and dual-thumb range sliders.

## Use Cases

- **E-Commerce Price & Attribute Filtering:** Allowing shoppers to narrow down product collections using dual-thumb minimum and maximum price range sliders (e.g., $25 to $150) synchronized with manual number inputs and product density histograms.
- **Financial & Loan Calculators:** Setting borrow amounts, down payment percentages, or repayment terms using single-thumb sliders with dynamic monthly estimate recalculations.
- **SaaS Resource Allocation Controls:** Selecting storage volume (GB/TB), API request limits, or user seat thresholds with stepped tick marks and tier boundaries.
- **Media & Timeline Scrubbing:** Adjusting playback positions in video/audio players, audio volume levels, or temporal range selections in video editing interfaces.
- **Dashboard Metric Thresholds:** Adjusting analytics timeframes, confidence intervals, or alerting thresholds across data visualizations.

## When NOT to Use

- **Exact Micro-Adjustments (Unit Quantities):** When users need precise, low-integer adjustments (e.g., ordering 1 to 5 items in a cart drawer), use `numeric-input-and-stepper-system`.
- **Large Categorical Selection:** When selecting among pre-configured non-numeric options (e.g., "Monthly," "Annual," "Custom"), use `segmented-control-system` or `tab-ui-system`.
- **Date & Calendar Selection:** When selecting calendar days or date ranges, use `calendar-and-date-system`.
- **Multi-Option Categorical Filtering:** When filtering by discrete brand names or categories, use `badge-and-tag-system` or `filter-and-sort-system`.

## Inputs

1. **Range Boundaries & Scale:** Minimum (`min`), maximum (`max`), step size (`step`), and scale type (linear vs. logarithmic/exponential for high-span currency ranges).
2. **Slider Type:** Single-Thumb (point value selection) vs. Dual-Thumb (min/max range selection).
3. **Visual Context & Density:** Available layout space (e.g., narrow sidebar filter vs. wide calculator card), background surface, and density constraints.
4. **Associated Controls:** Presence of synchronized manual text input fields, floating value tooltips/badges, step tick marks, or background distribution histograms.
5. **Brand & Surface Tokens:** Palette tokens for track background, active fill track, thumb handles (idle, hover, active, focus), focus rings, and boundary typography.

## Outputs

1. **Range Slider Visual Anatomy Spec:** Structural blueprint defining track container, background track, active track fill, thumb handles, value badges, and tick mark/histogram layout.
2. **Interaction & Boundary State Matrix:** Visual and behavioral specifications for Idle, Hover, Active/Dragging, Focus, Disabled, and Dual-Thumb Collision states.
3. **Responsive Spatial Layout Spec:** Minimum touch target specifications (44x44px hit area for touch viewports, 24x24px for desktop compact UIs) using invisible padding/pseudo-elements without inflating track height.
4. **Accessibility & Keyboard Mapping:** ARIA attribute structures (`role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`), keyboard interaction rules (Arrow keys, PageUp/PageDown, Home/End), and screen reader live region announcement specs.

---

## Workflow

### 1. Select the Range Slider Variant

Determine the appropriate structural variant based on task requirements and data characteristics:

- **Single-Thumb Slider (Continuous / Stepped):** A single draggable thumb moving along a horizontal track from `min` to `max`. Best for financial loan calculators, volume controls, and SaaS capacity selectors.
- **Dual-Thumb Range Slider (Min/Max Boundary):** Two independent thumbs (Lower/Min and Upper/Max) operating on a shared track. The active fill bar sits between the two thumbs. Best for e-commerce price filters, salary filters, and age range filters.
- **Slider with Synchronized Manual Inputs:** Slider combined with two explicit numeric `<input>` fields (Min Price / Max Price) above or below the track. Editing either the slider or the inputs updates the opposing control instantly. Best for desktop and mobile e-commerce filter panels.
- **Histogram-Integrated Range Slider:** A dual-thumb slider positioned directly beneath a bar chart histogram representing product frequency distribution across price buckets. Best for search and booking platforms (e.g., hotel/flight price range selection).

### 2. Establish Visual Anatomy and Spatial Hierarchy

Construct the slider assembly using precise visual tokens and proportional dimensions:

- **Background Track:**
  - Height: `4px` to `8px`.
  - Border Radius: Full pill (`9999px`) or `4px`.
  - Color: Low-contrast neutral (e.g., `var(--neutral-200, #E5E7EB)`).
- **Active Track Fill:**
  - Position: Extends from `0%` to current value (Single-Thumb) OR spans from Min Thumb `%` to Max Thumb `%` (Dual-Thumb).
  - Height: Equal to or slightly thicker than the background track (e.g., `6px` or `8px`).
  - Color: High-contrast primary brand color (e.g., `var(--primary-600, #2563EB)`).
- **Thumb Handles (Knobs):**
  - Visual Dimensions: `20px` to `24px` circular diameter.
  - Elevation & Border: `2px solid var(--surface-bg)` with `1px solid var(--border-neutral)` and elevation shadow (`box-shadow: 0 2px 4px rgba(0,0,0,0.15)`).
  - Hover / Active Expansion: Scale handle up by `10–20%` (e.g., `transform: scale(1.15)`) on hover/drag.
- **Expanded Touch Target Padding (Critical):**
  - While the visual knob is `20px`, the **touch hit target must be expanded to at least 44x44px** on mobile/touch interfaces (WCAG 2.2 SC 2.5.8).
  - Accomplish this using an invisible pseudo-element (`::before`) or padded container around the thumb (`width: 44px; height: 44px; background: transparent; position: absolute; margin-top: -22px; margin-left: -22px;`).
- **Value Tooltips / Badges:**
  - Positioned above the thumb (`margin-bottom: 8px`).
  - Contains active formatted value (e.g., `$150`).
  - Toggle visibility: Permanently visible OR revealed on hover/drag/focus.

### 3. Design Dual-Thumb Collision and Overlap Mechanics

Prevent thumb locking and visual confusion when lower and upper thumbs meet:

- **Minimum Separation Delta (`minRange`):**
  - Establish a non-zero minimum distance between thumbs (e.g., `minRange = step * 1` or `$10`).
  - Lower thumb cannot exceed `upperValue - minRange`; Upper thumb cannot drop below `lowerValue + minRange`.
- **Z-Index Stacking Rules:**
  - Whichever thumb is currently focused or actively dragged gets `z-index: 10` to sit above the opposing handle.
  - When thumbs touch at the minimum boundary, clicking or dragging from the right side activates the Upper thumb, while clicking/dragging from the left side activates the Lower thumb.
- **Keyboard Trapping Prevention:**
  - Ensure left/right arrow key navigation on the Min thumb stops at the Max thumb boundary without transferring focus unexpectedly to the Max thumb.

### 4. Direct Manual Entry Synchronization & Non-Linear Scales

Enhance usability across diverse value distributions:

- **Dual-Control Synchronization:**
  - When text inputs are provided alongside the slider, typing into the "Min" input auto-updates the lower slider handle on `input` or `blur`.
  - Validate and clamp typed values: If typed Min exceeds Max, clamp Min to `Max - minRange`.
- **Logarithmic & Exponential Scales (For Wide Spans):**
  - For currency ranges spanning orders of magnitude (e.g., $10 to $10,000), linear slider tracks dedicate 90% of visual track space to high values where few items exist.
  - Apply a logarithmic transformation mapping slider position (0–100%) to logarithmic value increments, giving users finer spatial control over low-to-mid range prices.

### 5. Configure Accessibility and Keyboard Semantics

Deliver full WCAG 2.1 / 2.2 AA compliance:

- **ARIA Role Structure:**
  - Single-thumb or Dual-thumb handles MUST expose `role="slider"`.
  - Attributes required on EACH thumb element:
    - `aria-valuenow="50"` (Current numeric value).
    - `aria-valuemin="0"` (Absolute minimum OR lower boundary limit).
    - `aria-valuemax="500"` (Absolute maximum OR upper boundary limit).
    - `aria-valuetext="$50 per month"` (Human-readable string formatted with currency/unit).
    - `aria-label="Minimum Price"` (Lower thumb label) / `aria-label="Maximum Price"` (Upper thumb label).
- **Keyboard Navigation Mapping:**
  - `ArrowRight` / `ArrowUp`: Increment value by `step`.
  - `ArrowLeft` / `ArrowDown`: Decrement value by `step`.
  - `PageUp`: Increment value by large step (`step * 10`).
  - `PageDown`: Decrement value by large step (`step * 10`).
  - `Home`: Jump thumb to `min` boundary.
  - `End`: Jump thumb to `max` boundary.
- **High-Contrast Focus Indicators:**
  - Maintain a prominent focus ring (`outline: 2px solid var(--focus-ring); outline-offset: 3px;`) around active thumb handles. Never hide focus rings.
- **Screen Reader Announcements:**
  - Use `aria-live="polite"` on summary text or update `aria-valuetext` dynamically so screen readers announce human-readable updates on change without repeating raw decimals.

---

## Decision Rules

### Slider Pattern Matrix

| Use Case | Recommended Variant | Value Display | Boundary Control |
| :--- | :--- | :--- | :--- |
| **E-Commerce Price Filter** | Dual-Thumb Range Slider | Synchronized Min/Max Number Inputs | Min/Max absolute limits + `minRange` gap |
| **Loan / Mortgage Calculator** | Single-Thumb Continuous Slider | Live Floating Tooltip + Large Summary Metric | Fixed Min/Max with step ticks |
| **SaaS Storage / Seat Plan** | Single-Thumb Stepped Slider | Fixed Labels at Tick Marks | Discrete Tier Steps (e.g., 10, 25, 50, 100) |
| **Media Player Scrubber** | Single-Thumb Continuous | Timestamp Badge on Hover/Drag | 0:00 to Track Duration |
| **Hotel / Flight Price Filter** | Dual-Thumb + Histogram | Histogram Bars + Dual Text Inputs | Dynamic Min/Max based on search results |

### Linear vs. Logarithmic Scale Rule
- **Use Linear Scale (Default):** When `max / min < 100` (e.g., $10 to $500) and data is evenly distributed across the numeric scale.
- **Use Logarithmic Scale:** When `max / min >= 100` (e.g., $10 to $10,000) and 80%+ of items fall within the bottom 20% of the price range.

### Tooltip Display Rule
- **Always Visible:** Use permanently visible value badges when the slider is a primary configuration tool (e.g., loan calculator).
- **Reveal on Interaction:** Show floating value tooltips on hover/focus/drag when space is constrained (e.g., sidebar catalog filters).

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - Thumb handles must maintain minimum touch target of **44x44px** on touch viewports (SC 2.5.8).
  - Active track fill and thumb borders must maintain at least **3:1 contrast ratio** against the background surface (SC 1.4.11 Non-Text Contrast).
  - Text labels and value badges must maintain **4.5:1 contrast ratio** (SC 1.4.3).
  - Active focus indicators must satisfy WCAG 2.4.11 (Focus Not Obscured) and SC 2.4.13 (Focus Appearance).
- **Touch & Drag Performance:**
  - Use CSS `touch-action: none;` on slider track and thumbs to prevent full-page vertical scrolling while dragging on mobile touchscreens.
- **Mobile Soft Keyboard Handling:**
  - When synchronized numeric inputs are used, set `inputmode="numeric"` or `inputmode="decimal"` to open the numeric keypad without triggering browser scroll jumps.

---

## Common Failure Patterns

- **Tiny Un-hit-testable Handles:** Designing 12px or 16px thumb knobs without expanding the touch hit area to 44x44px, causing finger slipping and mobile user drop-off.
- **Relying on Unstyled Browser `<input type="range">`:** Using browser-native sliders for dual-thumb selection, leading to broken mobile UX and layout inconsistencies.
- **Dual-Thumb Lockup / Collision Stacking:** Failing to set `z-index` management or `minRange` gaps, causing lower and upper thumbs to overlap completely and trap pointer focus.
- **Missing Keyboard Support & ARIA Labels:** Building custom `<div>` slider controls without `role="slider"`, `tabindex="0"`, or arrow key handlers, rendering sliders invisible to assistive tech.
- **Jittery Layouts from Variable Text Lengths:** Placing value badges inline next to track titles where number changes (e.g., `$9` -> `$100`) cause surrounding page elements to reflow continuously during drag.

---

## Validation Criteria

- [ ] Thumb handles meet minimum 44x44px touch target on touch viewports via expanded hit area padding.
- [ ] Active track and thumb controls satisfy 3:1 non-text contrast against background surface.
- [ ] Dual-thumb controls enforce a minimum separation gap (`minRange`) and manage `z-index` to prevent handle trapping.
- [ ] Slider supports `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home`, and `End` keys.
- [ ] Programmatic ARIA attributes (`role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, `aria-label`) are assigned to handles.
- [ ] Mobile input controls use `touch-action: none;` to prevent drag-scroll conflicts.
- [ ] Synchronized numeric text fields auto-clamp out-of-bounds typed entries on `blur`.
- [ ] High-contrast focus indicators are visible and unobscured.
