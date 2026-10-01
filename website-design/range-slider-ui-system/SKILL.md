---
name: range-slider-ui-system
description:
  Design and implement accessible single-thumb and dual-thumb range sliders, track fills, numeric value sync, touch targets, and visual feedback for continuous and stepped value inputs.
---

# Range Slider UI System

## Purpose

The Range Slider UI System provides a standardized framework for designing, structuring, and implementing single-thumb and dual-thumb range sliders across web interfaces. Range sliders allow users to explore and select numeric values or numeric intervals (e.g., price boundaries, time ranges, capacity thresholds, or volume multipliers) along a continuous or stepped visual continuum.

A systematic approach to range sliders ensures that thumb touch targets remain usable across screen sizes, active ranges maintain high visual contrast, dynamic value labels update clearly, and keyboard/screen reader users enjoy full accessibility parity without relying on mouse dragging.

## Use Cases

- **E-Commerce Price & Attribute Filters:** Selecting minimum and maximum bounds for product pricing, dimensions, ratings, or specifications in filter sidebars or drawers.
- **SaaS Pricing & Usage Calculators:** Adjusting user seat counts, monthly storage limits, active API calls, or bandwidth quotas to dynamically update plan tier costs.
- **Audio/Video & Media Controls:** Adjusting playback volume, scrubbing timelines, or tweaking equalizer settings.
- **Financial & Loan Estimators:** Selecting loan amounts, repayment terms, or interest rate thresholds on mortgage or credit card applications.
- **Settings & Preference Panels:** Fine-tuning UI opacity, font sizes, display brightness, or notification quiet hours.

## When NOT to Use

- **Discrete Small Choice Sets (≤ 5 Options):** If choices are limited (e.g., selecting S, M, L, XL or choosing 1, 2, 3, 4, 5 seats), use `segmented-control-system` or radio groups instead. Range sliders introduce unnecessary motor precision overhead when choices are few.
- **Exact High-Precision Numerical Entry:** If the user must enter an exact non-standard number (e.g., entering an exact bank transfer amount like $1,247.83), use `numeric-input-and-stepper-system` with an explicit text field. Range sliders make fine-grained single-digit precision difficult.
- **Binary Toggles:** For binary true/false, on/off, or enable/disable decisions, use `toggle-and-switch-system`.
- **Unordered Categorical Selections:** For non-numeric or non-sequential categories (e.g., selecting user roles or industry types), use `custom-select-and-combobox-system`.

## Inputs

1. **Value Boundaries & Step Increments:** Minimum value (`min`), maximum value (`max`), step increment (`step`), and default initial value(s).
2. **Selection Topology:** Single-thumb slider (one value) vs. dual-thumb slider (minimum and maximum interval range).
3. **Value Scale Type:** Linear scale vs. logarithmic/exponential scale (for wide ranges like $10 to $1,000,000 where low-end granularity matters).
4. **Synchronized Controls:** Accompanying direct-entry numeric input fields or text badges.
5. **Tick Marks & Milestones:** Optional key value indicators or label markers along the slider track.
6. **Design System Tokens:** Color tokens for unselected track, active fill track, draggable thumb, focus rings, hover states, typography scale, and fluid spacing tokens.

## Outputs

1. **Range Slider Anatomy Spec:** Detailed visual definition of Unselected Track, Active Range Fill Track, Drag Thumbs, Tooltips/Badges, Tick Marks, and Synchronized Inputs.
2. **Interaction & State Blueprint:** Specifications for default, hover, active/dragging, keyboard focus (`:focus-visible`), disabled, and invalid states.
3. **Accessibility Blueprint:** ARIA role assignments (`role="slider"`), range attributes (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`), accessible naming (`aria-label` / `aria-labelledby`), and keyboard mapping.
4. **Responsive Layout Strategy:** Rules for responsive touch target sizing (expanding hit areas beyond visual thumbs), stacked vs. inline layout adaptation, and mobile fallback behavior.

---

## Workflow

### 1. Determine Selection Topology and Scale Mechanics
First, establish whether the user is choosing a single point value or a bounded interval:
- **Single-Thumb Slider:** Used when setting a single magnitude value (e.g., seat count, volume level, distance radius). Represents `valuenow` along a `min` to `max` continuum.
- **Dual-Thumb Slider:** Used when setting lower and upper boundaries simultaneously (e.g., minimum price $50 to maximum price $350). Requires two interactive thumbs on a shared track segment, ensuring `min_thumb_value <= max_thumb_value`.
- **Scale Functionality:** Evaluate if the range spans orders of magnitude. For linear distributions (e.g., 0 to 100%), use uniform spacing. For heavy right-skewed ranges (e.g., $10 to $10,000), consider logarithmic step scaling so the lower end of the slider remains granular and usable.

### 2. Define Spatial Anatomy and Touch Hit Target
A slider is composed of several nested structural layers:
- **Track Rail (Unselected):** The full horizontal (or vertical) background bar. Minimum thickness: `4px` to `8px` with rounded end caps (`border-radius: 9999px`).
- **Active Range Track (Fill):** High-contrast filled segment indicating the selected value or interval. For single thumb, it spans from `min` (or 0) to `current_thumb`. For dual thumb, it spans between `thumb_min` and `thumb_max`.
- **Thumb Controls:** The circular or rounded handle that users grab or navigate. Visual thumb size should be `20px` to `28px` in diameter.
- **Hit Target Expansion:** Web Accessibility guidelines require touch target sizes to meet at least `24x24px` (WCAG 2.2 SC 2.5.8), with `44x44px` preferred for touch viewports. Expand the invisible hit area around the thumb using transparent pseudo-elements (`::before` / `::after`) or padded wrappers so finger taps register reliably.

### 3. Integrate Synchronized Direct-Entry Inputs
Never force users to rely solely on thumb dragging:
- **Dual Numerical Inputs:** Position direct-entry `<input type="number">` fields alongside or above the slider track (e.g., "Min Price" and "Max Price" boxes).
- **Two-Way Synchronization:** Typing a number into the input updates the slider thumb position immediately; dragging the slider thumb updates the input text in real time.
- **Validation Fallback:** If a user types a number out of bounds in the text field (e.g., min price higher than max price), validate on input blur or submit and snap the slider thumb to the closest valid bound.

### 4. Provide Dynamic Value Badges and Tick Mark Milestones
Give real-time visual feedback:
- **Value Tooltips / Floating Badges:** Render a live badge above or inside the thumb indicating the active formatted value (e.g., "$120", "250 GB", "4.5 Stars"). Badges must remain visible during drag and keyboard interaction.
- **Tick Marks & Legend Markers:** For stepped sliders, place subtle vertical tick marks along the track rail at increment intervals. For long scales, provide static labels below key milestones (e.g., "$0", "$500", "$1,000+").

### 5. Establish Keyboard, ARIA, and Screen Reader Interaction
Ensure keyboard users and assistive technologies have full parity with mouse/touch users:
- **Keyboard Navigation:**
  - `Arrow Right` / `Arrow Up`: Increase value by 1 step.
  - `Arrow Left` / `Arrow Down`: Decrease value by 1 step.
  - `Page Up`: Increase value by a larger step (e.g., 10% of total range).
  - `Page Down`: Decrease value by a larger step (e.g., 10% of total range).
  - `Home`: Jump thumb to `aria-valuemin`.
  - `End`: Jump thumb to `aria-valuemax`.
- **ARIA Attributes:**
  - Assign `role="slider"` to each interactive thumb element (or use native `<input type="range">`).
  - Set `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
  - Provide human-readable text via `aria-valuetext` when numeric values represent complex units (e.g., `aria-valuetext="$150 per month"` or `aria-valuetext="3 Hours 30 Minutes"`).
  - Label thumbs distinctly: for dual sliders, set `aria-label="Minimum price"` on the lower thumb and `aria-label="Maximum price"` on the upper thumb.

---

## Decision Rules

### Topology Selection Matrix

| User Goal | Recommended Topology | Direct Input Requirement | Track Style |
| :--- | :--- | :--- | :--- |
| **Set single quantity/budget limit** | Single-Thumb Slider | Single Numeric Input / Dynamic Badge | Fill from left `min` to thumb |
| **Filter bounded price/year range** | Dual-Thumb Slider | Dual "Min" and "Max" Number Inputs | Fill segment between Min & Max thumbs |
| **Adjust audio volume / display setting** | Single-Thumb Slider | Dynamic Percentage/Value Badge | Fill from left `0` to thumb |
| **Select discrete stepped plan tier** | Stepped Single-Thumb Slider | Tier Label Badge + Tick Marks | Snap to defined tick increments |

### Continuous vs. Stepped Sliders
- **Use Continuous Sliders (`step="any"` or `step="1"`):** When values flow smoothly and any point in the spectrum is valid (e.g., image brightness, volume, smooth price range filtering).
- **Use Stepped Sliders (`step="N"`):** When selection is strictly bound to fixed increments (e.g., step increments of 5 seats, 25 GB storage blocks, or 15-minute time intervals).

### Mobile & Responsive Layout Adaptation
- **Desktop (≥ 1024px):** Render slider track alongside synchronized numeric input boxes in a horizontal row or compact sidebar widget.
- **Tablet (768px - 1023px):** Keep slider track full-width with numeric inputs positioned directly above the track to prevent squeezing.
- **Mobile (< 768px):** Ensure touch hit targets expand to at least `44x44px`. Increase track rail thickness to `8px` for easier finger placement. Ensure dynamic value tooltips sit clearly above the user's thumb so the finger does not obscure the value while dragging.

---

## Constraints

- **WCAG Target Size (WCAG 2.2 SC 2.5.8):** Slider handles must have an interactive hit area of at least `24x24px` on desktop and `44x44px` on touch devices, even if the visible thumb graphic is smaller (e.g., `20px` circle).
- **Visual Contrast (WCAG AA SC 1.4.11 / 1.4.3):**
  - Active fill track vs. unselected track background: Minimum `3:1` contrast ratio.
  - Thumb handle boundary vs. background: Minimum `3:1` contrast ratio.
  - Value text labels & tooltips vs. background: Minimum `4.5:1` contrast ratio.
- **Focus Ring Visibility (WCAG 2.2 SC 2.4.13):** Focused slider handles must display a prominent, high-contrast focus indicator (`:focus-visible`) with at least `2px` offset or outline that is never clipped by `overflow: hidden` parent containers.
- **Screen Reader Announcement Rate:** Debounce or limit continuous `aria-valuenow` live announcements during rapid dragging to prevent screen reader audio stuttering.

---

## Common Failure Patterns

- **Tiny Finger-Trap Thumbs:** Designing small visual thumbs (`12px` - `16px`) without expanding the invisible touch hit target, causing frustrating drag slips on mobile screens.
- **Finger Obscuration:** Placing value labels directly inside or under the thumb handle, causing the user's finger to block the value while dragging on touchscreens. (Value badges must float *above* the thumb).
- **Dual-Thumb Crossover Glitch:** Failing to prevent lower and upper thumbs from crossing over each other, causing negative range intervals or broken layout states.
- **Mouse-Only Dependency:** Relying entirely on JavaScript mouse drag events without implementing native `<input type="range">` or ARIA keyboard navigation handlers (`Arrow` keys, `PageUp`/`PageDown`).
- **Missing Direct Numeric Fallback:** Forcing users to painfully drag a slider to hit an exact value like `$150` when precise numeric input fields would allow instant typing.
- **Lack of Disabled State Contrast:** Making disabled sliders indistinguishable from active sliders or rendering disabled slider text with unreadable contrast (< 3:1).

---

## Validation Criteria

- [ ] **Dual Input Synchronization:** Typing into text inputs immediately updates slider thumbs, and dragging slider thumbs updates text inputs in real time.
- [ ] **Expanded Touch Targets:** Thumb hit targets measure at least `24x24px` on desktop and `44x44px` on touch viewports (verified via element inspection).
- [ ] **Contrast Verification:** Active fill track, track background, thumb borders, and tooltips meet WCAG AA contrast rules (≥ 3:1 graphical, ≥ 4.5:1 text).
- [ ] **Keyboard Accessibility:** All thumbs are focusable via `Tab` key and operable using `Arrow`, `PageUp`, `PageDown`, `Home`, and `End` keys.
- [ ] **ARIA Parity:** Slider elements feature `role="slider"`, accurate `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, dynamic `aria-valuetext`, and descriptive `aria-label`.
- [ ] **Mobile Usability:** Value tooltips remain visible above the user's finger during touch drags without causing horizontal page scrolling.
