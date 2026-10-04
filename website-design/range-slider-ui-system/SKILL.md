---
name: range-slider-ui-system
description:
  Design and structure accessible single-thumb and dual-thumb range sliders,
  value track fills, touch targets, and step increments for price filters,
  budget selectors, and interactive calculators.
---

# Range Slider UI System

## Purpose

The Range Slider UI System provides a methodology for designing, structuring,
and laying out range sliders—interactive controls that allow users to select a
single numeric value or a range between a minimum and maximum threshold. Range
sliders provide immediate visual feedback for fluid numerical selection (such as
price filters, loan calculators, distance radius, or volumetric metrics)
without requiring manual keyboard entry, while maintaining strict fallback text
inputs and WCAG AA accessibility.

## Use Cases

- **E-Commerce Price Filtering:** Selecting minimum and maximum price bounds on
  Product Listing Pages (PLPs) or Search Results.
- **SaaS Pricing & ROI Calculators:** Dynamically scaling seats, monthly active
  users (MAUs), bandwidth, or storage tiers to update real-time pricing quote
  cards.
- **Financial & Loan Calculators:** Setting mortgage amounts, repayment terms, or
  interest rate estimates on banking or fintech portals.
- **Geographic Search Radius:** Selecting a distance radius (e.g., "Within 15
  miles") on store locators or service availability maps.
- **Media & Audio Controls:** Adjusting volume levels, playback scrubbing positions,
  or equalizer frequency bands.

## When NOT to Use

- **Categorical or Discrete Non-Numeric Options:** When selecting from named options
  (e.g., "Basic", "Pro", "Enterprise" or sizes "S", "M", "L"); use
  `segmented-control-system` or `radio-button-system` instead.
- **Unbounded or Highly Precise Numerical Inputs:** When exact, floating-point
  precision is required (e.g., entering exact wire transfer amounts like
  `$1,245.87`); use standard text inputs with `numeric-input-and-stepper-system`.
- **Small Binary or Ternary Choices:** Choosing between 2 or 3 fixed steps (e.g.,
  "Low", "Medium", "High"); use a toggle, tab, or radio group for faster, clearer
  choice architecture.

## Inputs

1. **Selection Type:** Single-thumb (point value) vs. Dual-thumb (bounded range with
   min/max).
2. **Domain Range & Scale:** Minimum value, maximum value, default value(s), and scale
   type (linear vs. logarithmic/exponential for wide value distributions like $10 to
   $100,000).
3. **Step Granularity:** Numeric increment per step (e.g., step of 1, 5, 50, 100, or
   dynamic steps).
4. **Unit Formatting:** Currency symbols ($), suffixes (e.g., "km", "GB", "users"),
   or localized numeric separators.
5. **Coupled Input Requirements:** Whether direct numeric text inputs, editable badges,
   or instant summary text nodes accompany the visual slider track.

## Outputs

1. **Range Slider Specification:** Visual anatomy defining Track, Highlight Bar
   (Active Fill), Thumb (Handle), Value Tooltip/Badge, Tick Marks, and Minimum/Maximum
   labels.
2. **Layout & Grid Blueprint:** Container structure linking the slider track with
   paired numeric text inputs or live summary displays.
3. **Interactive State Matrix:** Visual specs for Idle, Hover, Focus-Visible, Dragging/Active,
   Disabled, and Out-of-Bounds states.
4. **Accessibility & ARIA Blueprint:** Dual-thumb keyboard interaction mapping (`ArrowLeft`,
   `ArrowRight`, `PageUp`, `PageDown`, `Home`, `End`), `role="slider"`, `aria-valuenow`,
   `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` formatting strings.

## Workflow

### 1. Select the Slider Topology & Scale Type

Determine whether the user is choosing a single point or a bounded interval:

- **Single-Thumb Slider:** Best for target value selection (e.g., loan amount, team
  size, volume). Uses one handle and a track filled from the minimum bound (or center zero)
  to the thumb position.
- **Dual-Thumb Range Slider:** Best for interval filtering (e.g., $25 to $150 price
  filter). Uses lower and upper handles with an active track fill spanning between the two
  thumbs.

Choose the scale mapping:
- **Linear Scale:** Standard uniform distribution. Use when min and max are within 1-2
  orders of magnitude (e.g., 0 to 100%).
- **Logarithmic / Tiered Scale:** Non-linear distribution. Use when min and max span
  huge ranges (e.g., 10 users to 1,000,000 users) so lower, high-frequency ranges have
  generous physical drag distance on the slider track.

### 2. Establish Spatial Layout & Component Anatomy

Structure the slider stack into four distinct vertical layers:

1. **Header Row:** Section label (e.g., "Price Range") and live value readout (e.g.,
   "$50 — $250").
2. **Track Container:**
   - **Inactive Track:** The background line (minimum height 4px, maximum 8px).
   - **Active Fill Track:** Colored bar visually connecting min-to-thumb or thumb-to-thumb.
   - **Thumb Handle(s):** Circular or rounded-rect target (minimum 24x24px physical,
     preferably 44x44px touch area via pseudo-element padding).
   - **Floating Value Tooltip (Optional):** Attached to the thumb during drag/hover states.
3. **Tick Marks & Scale Labels (Optional):** Major division labels placed below the track
   (e.g., "$0", "$500", "$1,000+").
4. **Coupled Manual Text Inputs (Dual-Thumb/Filter Contexts):** Two numeric `<input>` fields
   ("Min Price", "Max Price") providing typing access for precise control.

### 3. Design Interactive States & Ergonomics

Define high-contrast visual cues for every interaction phase:

- **Idle:** Thumb has crisp border or shadow against track; active track fill uses brand
  accent color with minimum 3:1 contrast against page background.
- **Hover:** Pointer cursor; thumb scales slightly (e.g., `transform: scale(1.1)`) or displays
  a subtle halo ring.
- **Focus-Visible:** Prominent outer focus ring (minimum 2px width, 2px offset) surrounding
  the active thumb handle. Must achieve 4.5:1 contrast against adjacent track and background.
- **Active / Dragging:** Thumb scales up or changes fill color; tooltip becomes visible; cursor
  changes to `grabbing`.
- **Disabled:** Muted track fill and thumb (minimum 30% opacity reduction), `cursor: not-allowed`,
  and `aria-disabled="true"`.

### 4. Implement Dual-Thumb Collision & Overlap Logic

Prevent thumb crossing and visual occlusion in dual-thumb sliders:

- **Minimum Gap Constraint:** Maintain a minimum distance step (e.g., `minRange = step * 1`)
  so lower thumb cannot exceed upper thumb minus the minimum gap.
- **Z-Index Layering:** Automatically bump the `z-index` of the active/focused thumb so that
  when thumbs meet at extreme bounds, the user can still click or drag the upper thumb back
  up or lower thumb back down.
- **Click-on-Track Routing:** Clicking the track outside the thumbs moves the nearest thumb
  to the clicked position while observing min/max bounds.

### 5. Validate Keyboard & Screen Reader Accessibility

Ensure complete WCAG AA compliance:

- **Dual Native Inputs vs Custom ARIA:** Embed native `<input type="range">` elements or
  custom elements with `role="slider"`.
- **ARIA Attributes:**
  - `aria-valuemin`: Minimum allowable value.
  - `aria-valuemax`: Maximum allowable value.
  - `aria-valuenow`: Current numeric value.
  - `aria-valuetext`: Human-readable label (e.g., "$150 dollars", "50 Gigabytes").
  - `aria-label` or `aria-labelledby`: Expressive name (e.g., "Minimum price filter").
- **Keyboard Navigation:**
  - `ArrowRight` / `ArrowUp`: Increase by 1 step.
  - `ArrowLeft` / `ArrowDown`: Decrease by 1 step.
  - `PageUp`: Increase by larger step (e.g., 10x step).
  - `PageDown`: Decrease by larger step (e.g., 10x step).
  - `Home`: Move to `aria-valuemin` (or minimum allowed threshold).
  - `End`: Move to `aria-valuemax` (or maximum allowed threshold).

## Decision Rules

- **The "Coupled Input" Rule:** In filter or financial contexts where precision matters,
  *always* pair range sliders with editable numeric text inputs. Never rely solely on a drag track.
- **The Touch Target Rule:** Slider thumb physical interactive hit area must be at least
  24x24px (WCAG 2.2 SC 2.5.8), with a recommended 44x44px touch area on mobile viewports.
- **Thumb Separation Rule:** In dual-thumb sliders, enforce `maxThumbValue >= minThumbValue + minStep`
  in state logic to prevent negative range overlapping or stuck zero-width selections.
- **Scale Selection Rule:** If `maxValue / minValue > 100` (e.g., $10 to $50,000), use a
  logarithmic or non-linear step scale so users can easily select $50 or $100 without 1-pixel
  sensitivity.
- **Visible Value Rule:** Always render the current numerical selection in clean, static text
  outside of the interactive thumb so screen reader users and non-dragging sighted users can read
  the selection without interacting.

## Constraints

- **Accessibility:** Must support standard keyboard navigation (`Arrows`, `PageUp/Down`, `Home`, `End`).
  Thumb and active track fill must achieve at least 3:1 contrast against inactive track/background;
  focus indicator must achieve at least 4.5:1 contrast against adjacent surfaces.
- **Responsiveness:** Slider track container must span 100% width of its parent grid column or sidebar;
  it must not overflow or rely on fixed pixel container widths. Touch handles must maintain full drag
  sensitivity without triggering vertical page scrolling during horizontal dragging (`touch-action: pan-y`).
- **High Contrast / Windows Forced Colors Mode:** Thumbs and track borders must utilize native CSS
  system colors (`ButtonText`, `Highlight`, `CanvasText`) or `currentColor` so they remain visible when
  custom backgrounds and shadows are stripped by OS high contrast modes.

## Common Failure Patterns

- **The "Unreachable Precision" Bug:** Setting a continuous scale (e.g., min 0, max 100,000) on a 300px
  wide track without dynamic stepping, making it physically impossible to hit common round numbers.
- **Tiny Touch Targets:** Designing slider thumbs as 8px or 12px small dots, causing high frustration
  on touch screens and failing WCAG 2.2 touch target size criteria.
- **Missing Keyboard Support:** Implementing custom canvas or `<div>` range sliders with custom mouse
  drag listeners that fail to handle `Tab` key focus, ARIA attributes, or arrow key controls.
- **Zero-Contrast Drag Handles:** Using light grey thumb handles on white backgrounds without border outlines
  or high-contrast fill, rendering the control invisible to low-vision users.
- **Dual-Thumb Stack Lock:** Failing to swap `z-index` when thumbs overlap, causing one thumb to become
  permanently unclickable when both thumbs are pushed to $0 or maximum bounds.

## Validation Criteria

- [ ] Single-thumb or dual-thumb slider clearly communicates current value via text and visual fill.
- [ ] Slider thumb hit areas meet WCAG 2.2 SC 2.5.8 (24x24px minimum, 44x44px recommended on mobile).
- [ ] Keyboard navigation (`Arrow keys`, `PageUp/PageDown`, `Home`, `End`) works on all thumbs.
- [ ] ARIA attributes (`role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`)
      are properly applied and update dynamically during drag/key events.
- [ ] Dual-thumb sliders enforce min/max separation logic and manage `z-index` on hover/focus.
- [ ] High contrast / Windows Forced Colors Mode retains visible track and thumb borders.
- [ ] Coupled numeric inputs (if present) synchronize bidirectionally with slider track values.
