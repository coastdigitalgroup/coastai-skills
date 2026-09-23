---
name: range-slider-ui-system
description:
  Design single-thumb and dual-thumb range sliders, track fills, step intervals, value tooltips, and accessible touch controls for filters, calculators, and configuration controls.
---

# Range Slider UI System

## Purpose

The Range Slider UI System provides a standardized framework for designing, structuring, positioning, and styling continuous and discrete numeric range sliders. Range sliders allow users to explore non-discrete dynamic numerical ranges (e.g., price filters, interest rates, volume metrics, seats, or bandwidth usage) visually without forcing manual keyboard entry into numeric text inputs.

Without a dedicated design system for range sliders, interfaces suffer from invisible touch targets on mobile viewports, overlapping dual-thumb hit zones that trap pointer focus, poor WCAG contrast between selected active tracks and unselected background tracks, missing ARIA state synchronization (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`), and layout shift when thumb value tooltips expand.

This system establishes rules for single and dual-thumb geometry, track height and active fill positioning, step density, floating value tooltips, touch hit area expansion (min 44x44px), dual-thumb z-index management, responsive direct-entry number inputs, and keyboard accessibility patterns.

## Use Cases

- **E-Commerce Price Range Filters:** Allowing shoppers to narrow down product catalog search results between minimum and maximum price thresholds (e.g., $25 to $450).
- **SaaS Pricing & Usage Calculators:** Adjusting user seat count, monthly API requests, or cloud storage gigabytes to dynamically update estimated tier pricing.
- **Financial & Loan Calculators:** Setting mortgage payment terms, down payment percentages, and loan duration years on banking and fintech portals.
- **Media & Audio Controllers:** Precision volume, playback position scrubber, or audio equalizer gain adjustments across web media applications.
- **Analytics & Date Range Selectors:** Dragging temporal endpoints to filter timeline charts by days, weeks, or custom metric ranges.

## When NOT to Use

- **Binary On/Off Selections:** For binary state choices, use `toggle-and-switch-system`.
- **Small Discrete Stepped Selections (2–5 Discrete Steps):** For choosing among a small set of distinct predefined options (e.g., "Small", "Medium", "Large"), use `segmented-control-system` or radio groups (`form-design-system`).
- **Unbounded Text/Number Entry:** If the numerical value has no natural upper or lower bound or requires extreme numerical accuracy (e.g., bank transfer amount or exact street numbers), use `numeric-input-and-stepper-system`.
- **Hierarchical Category Filtering:** For non-numeric multi-faceted filtering (e.g., brand, color, rating), use `filter-and-sort-system`.

## Inputs

1. **Value Type & Domain Limits:** Minimum value (`min`), maximum value (`max`), default value(s) (`value` or `min_value` / `max_value`), and step interval (`step`).
2. **Thumb Topology:** Single thumb (single value selection) vs. Dual thumb (min/max range interval selection).
3. **Value Display Pattern:** Floating tooltip follow-thumb, direct-entry synchronized number input fields, or static summary header text.
4. **Step Granularity & Ticks:** Continuous linear sliding vs. snapped step ticks (e.g., multiples of 10, log scale intervals, or custom step markers).
5. **Layout Context & Scale:** Compact filter sidebar (240px wide), full-width hero pricing calculator (600px–800px wide), or responsive modal panel.

## Outputs

1. **Range Slider Geometry Spec:** Track width, height, thumb diameter, focus outline offset, and touch target enclosure padding (`track-height: 6px`, `thumb-size: 24px`, `touch-target: 44px`).
2. **Track Fill & Token Blueprint:** CSS variable specifications for active track fill (`--slider-active-fill`), inactive track background (`--slider-track-bg`), thumb border/fill, and hover/active states meeting WCAG 3:1 graphical contrast.
3. **Dual-Thumb Layering & Hit Protocol:** CSS pointer-events and z-index strategy preventing pointer locking when minimum and maximum thumbs collide at identical values.
4. **Accessible HTML/ARIA Blueprint:** Semantic input structure (`<input type="range">` or `role="slider"`) with synchronized `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` declarations.
5. **Direct Entry Fallback Layout:** Responsive layout grid placing dual direct-entry numeric input fields alongside or beneath the visual range slider.

---

## Workflow

### 1. Determine Thumb Topology and Value Domain
Identify whether the user needs a single point value or a range interval:

- **Single Thumb Slider:**
  - Used when adjusting a single quantity (e.g., 500 GB storage or 15 user seats).
  - Track fill extends from `min` (left edge, 0%) to the thumb position.
- **Dual Thumb Range Slider:**
  - Used when filtering between lower and upper bounds (e.g., $50 to $200).
  - Active track fill is suspended *between* the lower thumb (`thumb-min`) and upper thumb (`thumb-max`).

### 2. Establish Track, Thumb, and Touch Geometry
Range sliders must balance visual subtlety with physical ease of manipulation on desktop and touchscreens:

```text
       [ Value Tooltip: $250 ]
                |
  (Inactive)  [=====================] (Inactive)
  +----------+---------------------+----------+
  |          |  Active Fill Track  |          |
  +----------+---------------------+----------+
             O                     O
         Thumb Min             Thumb Max
```

- **Standard Geometric Dimensions:**
  - **Track Height:** `6px` to `8px` (Pill shape with `border-radius: 999px`).
  - **Thumb Diameter:** `20px` to `24px` circular handle with `box-shadow: 0 2px 4px rgba(0,0,0,0.15)`.
  - **Focus Ring:** `3px` solid high-contrast ring with `3px` offset outside the thumb boundary.
  - **Touch Hit Target Expansion:**
    - The visual thumb may be `20px`, but the interactive touch hit target MUST be expanded to at least **44x44px** using padding or invisible pseudo-elements (`::before` / `::after`).

### 3. Implement Collision-Free Dual-Thumb Stacking
When dual thumbs meet at the same value (e.g., both min and max set to $100), standard CSS pointer events will trap the top thumb, preventing the user from pulling the thumbs apart.

**Z-Index & Pointer Protocol:**
1. Render track and inputs with `pointer-events: none` on the input tracks.
2. Set `pointer-events: auto` explicitly on the thumb handles.
3. Dynamically apply a higher `z-index` to the thumb currently being dragged or focused.
4. When `min_value === max_value`, elevate the `min_value` thumb z-index if pointer approaches from the left, or `max_value` thumb if pointer approaches from the right.

### 4. Color Tokens and WCAG AA Contrast Ratios
Range sliders contain graphical control elements subject to WCAG 2.1 / 2.2 AA non-text contrast rules (SC 1.4.11 - 3:1 minimum contrast):

- **Inactive Track Background:** `#CBD5E1` (Light mode) / `#475569` (Dark mode). Must achieve at least 3:1 contrast against the container background surface.
- **Active Range Fill Track:** High-contrast brand or system color (e.g., `#2563EB` blue or `#0D9488` teal).
- **Thumb Surface & Border:** White thumb (`#FFFFFF`) with a 2px outer border (`#2563EB` or `#1E293B`) to maintain 3:1 contrast against both active fill and inactive track backgrounds.
- **Value Tooltip Bubble:** High-contrast background (`#0F172A` dark slate with `#FFFFFF` text) positioned above the thumb with pointer-events disabled (`pointer-events: none`) to prevent blocking pointer drags.

### 5. Pair with Direct-Entry Numeric Inputs
Sliders provide intuitive high-level exploration, but fine precision requires direct numeric input fields.
- Always offer synchronized dual text/number input boxes (`<input type="number">`) flanking or positioned above/below the slider.
- Updating the slider updates the input fields immediately; typing a valid number into the text field updates the slider thumb position on `blur` or `Enter`.

### 6. Accessibility & ARIA Implementation Specs

#### Native `<input type="range">` Single Thumb Pattern:
```html
<label for="seat-count" class="slider-label">Number of User Seats</label>
<div class="slider-container">
  <input
    type="range"
    id="seat-count"
    min="1"
    max="100"
    step="1"
    value="10"
    aria-valuetext="10 user seats"
    class="range-slider"
  />
  <output for="seat-count" class="slider-output">10 Seats</output>
</div>
```

#### Custom Dual-Thumb Multi-Range Pattern:
```html
<div role="group" aria-labelledby="price-range-heading" class="dual-slider-group">
  <span id="price-range-heading" class="slider-group-title">Price Range</span>

  <div class="dual-slider-track-container">
    <!-- Active track fill dynamically styled via inline CSS percentages -->
    <div class="dual-slider-track-fill" style="left: 20%; width: 60%;"></div>

    <input
      type="range"
      min="0"
      max="500"
      value="100"
      aria-label="Minimum Price"
      aria-valuetext="$100"
      class="range-thumb range-thumb--min"
    />
    <input
      type="range"
      min="0"
      max="500"
      value="400"
      aria-label="Maximum Price"
      aria-valuetext="$400"
      class="range-thumb range-thumb--max"
    />
  </div>
</div>
```

#### Keyboard Navigation Rules:
- `Arrow Right` / `Arrow Up`: Increase value by 1 step.
- `Arrow Left` / `Arrow Down`: Decrease value by 1 step.
- `Page Up`: Increase value by large step (e.g., 10% of total domain).
- `Page Down`: Decrease value by large step.
- `Home`: Jump thumb to `min` value limit.
- `End`: Jump thumb to `max` value limit.

---

## Decision Rules

### Single vs. Dual Thumb Selection Matrix

| User Intent | Recommended Pattern | Reason |
| :--- | :--- | :--- |
| Set a single capacity parameter (e.g., Storage size, user seats, volume) | **Single Thumb Slider** | Point value selection only requires a single endpoint. |
| Filter content between upper and lower boundaries (e.g., Price range $20–$100) | **Dual Thumb Slider** | Allows bounding both minimum and maximum limits. |
| Pick a specific discrete option out of 3–5 items | **Segmented Control** | Sliders add unnecessary dragging overhead for small discrete options. |
| Select precise financial dollar transfers (e.g., $10,452.50) | **Numeric Text Field** | Direct entry is faster and far more accurate than sliding. |

### Tooltip Positioning Matrix

| Layout Space | Tooltip Position | Behavior |
| :--- | :--- | :--- |
| **Standard Desktop PDP/Filter** | Floating Top (`top: -36px`) | Follows thumb horizontally via `left: calc(X% + offset)`. |
| **Dense Mobile Sidebar** | Fixed Header Text / Output Badge | Displayed directly inside section header to prevent clipping off-screen. |
| **Continuous Calculator** | Large Synchronized Text Banner | Displayed prominently in central pricing card summary block. |

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - Track background, track fill, and thumb handle borders MUST satisfy 3:1 contrast against adjacent colors.
  - Focus indicators must be clearly visible (min 3:1 contrast against surrounding surface, min 2px border or 3px ring).
  - All range sliders MUST have accessible labels via `<label>`, `aria-label`, or `aria-labelledby`.
- **Touch Target Area:**
  - Interactive touch area MUST measure at least **44x44px** on touch-enabled viewports (WCAG 2.5.5 / 2.5.8).
- **Responsive Fluidity:**
  - Slider track containers should scale dynamically (`width: 100%`) with container constraints, maintaining minimum readable width of `180px`.
- **Reduced Motion:**
  - Disable smooth transition animations on thumb positioning during manual dragging to avoid drag latency lag (`transition: none` during active drag).

---

## Common Failure Patterns

- **Microscopic Touch Targets:** Styling thumbs as thin 12px dots without expanding the hit target, making mobile adjustments frustrating and unpredictable.
- **Dual-Thumb Trap:** Failing to manage z-index or pointer events when thumbs collide at equal values, trapping one thumb permanently behind the other.
- **Color-Only Selected Range:** Using light gray vs. slightly darker gray without sufficient contrast, making the active range fill invisible to low-vision users.
- **Unlabeled Screen Reader Controls:** Rendering standard range inputs without `aria-label` or `aria-valuetext` formatted values (e.g., screen readers announcing "20" instead of "$20 per month").
- **Missing Direct Entry Alternative:** Forcing users to drag a tiny thumb on a mobile screen to hit an exact value like $375 without providing direct-entry number fields.
- **Layout Shift from Floating Tooltips:** Allowing floating value bubbles to cause scrollbars or overflow clipping when sliding near extreme left (0%) or right (100%) track edges.

---

## Validation Criteria

- [ ] Single and dual thumb sliders use semantic HTML `<input type="range">` or `role="slider"` with appropriate ARIA attributes.
- [ ] Active fill track and thumbs maintain at least 3:1 non-text contrast against container backgrounds in light and dark modes.
- [ ] Mobile touch hit targets for thumbs measure at least 44x44px.
- [ ] Dual thumb sliders support full collision separation without thumb lockups when `min_value === max_value`.
- [ ] Full keyboard support is verified (`Arrow` keys, `PageUp`/`PageDown`, `Home`/`End`).
- [ ] Synchronized direct-entry text/number fields are provided alongside visual sliders for exact numerical precision.
- [ ] Floating tooltips adjust horizontal offsets at boundary extremes (0% and 100%) to prevent layout overflow clipping.
