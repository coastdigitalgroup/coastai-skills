# E-Commerce Price Filter & SaaS Calculator Range Slider Layout Breakdown

This example breaks down two real-world implementation contexts for the **Range Slider UI System**:
1. **E-Commerce Catalog Sidebar Dual-Thumb Price Range Filter** (Dual-thumb min/max range slider with synchronized numeric text inputs, price distribution histogram, and expanded touch targets).
2. **SaaS Interactive Plan & Credit Estimator Calculator** (Single-thumb continuous slider with value badges, stepped tier ticks, live price recalculation, and keyboard shortcut accessibility).

---

## 1. E-Commerce Catalog Dual-Thumb Price Range Filter

### Context & Goal
Provide shoppers browsing a high-volume e-commerce store with a responsive, thumb-friendly price filter. Shoppers can narrow down catalog products by dragging upper and lower price thumbs or entering exact values into synchronized numeric input fields. A price frequency histogram above the track gives visual feedback on item density across price buckets.

### Visual & Spatial Layout Blueprint

```text
+-------------------------------------------------------------------------+
| E-Commerce Sidebar Filter: Price Range                                  |
|                                                                         |
|  Price Frequency Histogram:                                             |
|   |  █  ▄  █  ▇  █  ▅  ▃  ▂  ░  ░  |  <-- Bar Distribution Heights     |
|  -+--------------------------------+-                                   |
|                                                                         |
|  Dual-Thumb Slider Track:                                               |
|  ================[=================]======================              |
|  (Track)         O=================O                      (Track)       |
|                  ^-- Min Thumb     ^-- Max Thumb                        |
|                  ($25.00)          ($150.00)                            |
|                  Touch: 44x44px    Touch: 44x44px                       |
|                                                                         |
|  Synchronized Numeric Input Fields:                                     |
|  +------------------------+      +------------------------+             |
|  | Min: $ [ 25.00     ]   |  to  | Max: $ [ 150.00    ]   |             |
|  +------------------------+      +------------------------+             |
|     ^-- inputmode="decimal"         ^-- inputmode="decimal"             |
|                                                                         |
|  Filter Status & Action:                                                |
|  Showing 142 of 850 products (Price: $25 - $150)                       |
+-------------------------------------------------------------------------+
```

### Detailed Component Specs

- **Histogram Distribution Container:**
  - Height: `40px`
  - Columns: `12 to 16` vertical bars representing price distribution buckets.
  - Bar Styling: `background: var(--neutral-300)`; Active highlighted bars between Min/Max handles use `background: var(--primary-200)`.
- **Background Track (`div.range-slider-track`):**
  - Height: `6px`
  - Border Radius: `9999px` (Pill)
  - Color: `var(--neutral-200, #E5E7EB)`
- **Active Range Fill (`div.range-slider-fill`):**
  - Height: `6px`
  - Color: `var(--primary-600, #2563EB)`
  - Dynamic Position: `left: calc((25 - 0) / (500 - 0) * 100%); right: calc(100% - ((150 - 0) / (500 - 0) * 100%));`
- **Lower & Upper Thumb Handles (`button.range-thumb`):**
  - Visual Handle Dimensions: `22px x 22px`
  - Expanded Touch Target: `44px x 44px` hit area via invisible pseudo-element (`::before`).
  - Styling: `background: #FFFFFF; border: 2px solid var(--primary-600); box-shadow: 0 2px 4px rgba(0,0,0,0.15); border-radius: 50%;`
  - Focus Ring: `outline: 2px solid var(--primary-600); outline-offset: 3px;`
- **Synchronized Numeric Text Inputs (`input.price-input`):**
  - Input Attributes: `type="text" inputmode="decimal" pattern="[0-9]*"`
  - Sizing: `height: 40px; font-variant-numeric: tabular-nums;`
  - Behavior: Typing `$30` into Min input immediately pushes the Min Thumb handle to `$30`.

### Interaction & Collision Annotations

1. **Min/Max Collision Management:**
   - Minimum separation gap: `minRange = 10` ($10 minimum span).
   - If user drags Min Thumb to `$140` while Max Thumb sits at `$150`, dragging further right is blocked.
2. **Overlapping Focus Stacking:**
   - Whichever thumb is currently active or focused receives `z-index: 10`, ensuring the active handle sits above the static handle.
3. **Manual Keyboard Clamping:**
   - User types `$600` into Max Input when catalog max is `$500`.
   - On `blur`, input auto-clamps to `$500`, and slider handle updates to absolute right boundary.

---

## 2. SaaS Interactive Plan & Credit Estimator Calculator

### Context & Goal
Allow prospective SaaS customers to estimate monthly subscription costs based on expected monthly active users (MAU) or API credit consumption. The slider features single-thumb interaction, stepped tier ticks, a floating value badge, and dynamic price summary feedback.

### Visual & Spatial Layout Blueprint

```text
+-------------------------------------------------------------------------+
| Enterprise API Usage & Pricing Estimator                                |
|                                                                         |
|  Active Value Badge:                                                    |
|                   [ 250,000 API Requests / mo ]                         |
|                                 | (Badge Tail)                          |
|  Single-Thumb Slider Track:     v                                       |
|  =============================O======================================   |
|  (Track Fill: Blue)           ^-- Single Thumb Handle                   |
|                                                                         |
|  Stepped Tier Ticks & Labels:                                           |
|  |-----------|-----------|-----------|-----------|-----------|          |
|  10k         50k        100k        250k        500k        1M          |
|  (Free)      (Starter)  (Growth)    (Pro)       (Scale)     (Enterprise)|
|                                                                         |
|  Estimated Cost Breakdown:                                              |
|  Pro Plan Base ($199/mo) + 150k Extra Calls ($75/mo) = $274.00 / mo     |
|                                                                         |
|  [ Call to Action: Upgrade to Pro Plan ]                                |
+-------------------------------------------------------------------------+
```

### Accessibility & ARIA Structural Mapping

```html
<div class="pricing-calculator-card" role="region" aria-labelledby="calc-title">
  <h2 id="calc-title" class="calc-heading">Estimate Your Monthly API Plan</h2>

  <div class="slider-control-group">
    <!-- Floating Value Badge -->
    <div id="thumb-badge" class="slider-badge" aria-hidden="true">
      250,000 Requests / mo
    </div>

    <!-- Single Thumb Range Control -->
    <div class="range-slider-wrapper">
      <div class="range-track-background"></div>
      <div class="range-track-fill" style="width: 60%;"></div>

      <div role="slider"
           tabindex="0"
           id="api-usage-thumb"
           class="range-thumb"
           aria-labelledby="calc-title"
           aria-valuenow="250000"
           aria-valuemin="10000"
           aria-valuemax="1000000"
           aria-valuetext="250,000 API requests per month, Pro Tier, $274 per month"
           aria-describedby="price-calculation-summary">
      </div>
    </div>

    <!-- Stepped Tier Labels -->
    <div class="slider-ticks-container" aria-hidden="true">
      <span class="tick-mark active" style="left: 0%;"><em>10k</em><small>Free</small></span>
      <span class="tick-mark active" style="left: 20%;"><em>50k</em><small>Starter</small></span>
      <span class="tick-mark active" style="left: 40%;"><em>100k</em><small>Growth</small></span>
      <span class="tick-mark active" style="left: 60%;"><em>250k</em><small>Pro</small></span>
      <span class="tick-mark" style="left: 80%;"><em>500k</em><small>Scale</small></span>
      <span class="tick-mark" style="left: 100%;"><em>1M</em><small>Enterprise</small></span>
    </div>
  </div>

  <!-- Dynamic Summary Region -->
  <div id="price-calculation-summary" class="price-summary-box" aria-live="polite">
    <div class="summary-plan-tier">Selected Tier: <strong>Pro Plan</strong></div>
    <div class="summary-cost-total">
      <span class="cost-amount">$274.00</span>
      <span class="cost-period">/ month</span>
    </div>
  </div>
</div>
```

---

## Key Behaviors & Edge Cases

- **Touch Drag Handling:** Setting `touch-action: none;` on the slider track prevents vertical page scrolling while the user drags handles on touchscreen viewports.
- **Monospaced Value Stability:** All live currency and numerical displays use `font-variant-numeric: tabular-nums;` to eliminate horizontal layout jitter as values shift during rapid dragging.
- **Screen Reader Live Announcements:** When adjusting values via keyboard arrow keys, `aria-valuetext` updates dynamically, causing assistive technology to announce formatted summaries (e.g. "250,000 requests per month, $274 per month").
