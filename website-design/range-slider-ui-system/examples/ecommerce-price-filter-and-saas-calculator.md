# Range Slider UI System Examples

This document demonstrates real-world applications of the **Range Slider UI System** in two distinct contexts:
1. **Dual-Thumb E-Commerce Price Range Filter** (Sidebar / Filter Drawer)
2. **Single-Thumb SaaS Tier & ROI Calculator** (Pricing Page Interactive Widget)

---

## Example 1: E-Commerce Dual-Thumb Price Range Filter

### Scenario
An e-commerce catalog featuring products ranging from $10 to $1,000. Shoppers need to narrow down product listings by setting a lower bound and upper bound price threshold simultaneously.

### Layout & Component Architecture

```text
+-------------------------------------------------------------+
| Filter: Price Range                                         |
| Current Range: $50 - $350                                   |
+-------------------------------------------------------------+
|                                                             |
|           [Min Thumb]==============[Max Thumb]              |
|   |-----------O=======================O-----------------|   |
|  $0         $50                      $350            $1,000 |
|                                                             |
+-------------------------------------------------------------+
|  [ Min Price ($) ]                 [ Max Price ($) ]        |
|  [ 50            ]                 [ 350           ]        |
+-------------------------------------------------------------+
| [ Reset Filter ]                             [ Apply (142) ]|
+-------------------------------------------------------------+
```

### Key Design Specs

1. **Active Track Fill:**
   - Background Track: `#e2e8f0` (height: 6px, border-radius: 3px).
   - Range Highlight Bar: `#0284c7` (spans horizontally from `minThumbPercent` to `maxThumbPercent`).

2. **Thumb Ergonomics & Hit Targets:**
   - Physical Thumb Size: 20px x 20px circle with a `#0284c7` fill and `#ffffff` 2px inner border.
   - Touch Target Expansion: `padding: 12px` via CSS `::after` pseudo-element, expanding hit zone to 44px x 44px.
   - Hover Effect: `transform: scale(1.15)` with `box-shadow: 0 0 0 6px rgba(2, 132, 199, 0.15)`.
   - Focus State: `outline: 3px solid #0284c7; outline-offset: 3px;`.

3. **Z-Index Layering Rule:**
   - Lower Thumb Z-Index: Default `10`. Elevated to `20` when focused or dragged.
   - Upper Thumb Z-Index: Default `11`. Elevated to `20` when focused or dragged.
   - Edge Lock Prevention: When both thumbs hit $0 or $1,000, setting focus or hovering automatically pulls the targeted thumb to the top z-index layer.

4. **Coupled Text Inputs:**
   - Number inputs are bound bidirectionally to slider values.
   - Blur/Submit validation prevents `minPrice > maxPrice - minStep` or negative values.

---

## Example 2: Single-Thumb SaaS Interactive Pricing Tier Calculator

### Scenario
A B2B SaaS pricing page where prospective buyers adjust their team size (seats) to see their monthly bill and volume discount percentage update in real time.

### Layout & Component Architecture

```text
+-----------------------------------------------------------------------+
|  Calculate Your Team Workspace Plan                                   |
+-----------------------------------------------------------------------+
|  Active Seats: 45 Members                  [ Volume Discount: 15% OFF ]|
|                                                                       |
|  |=========================O--------------------------------------|   |
|  1 Seat                   45 Seats                             500+   |
|                                                                       |
+-----------------------------------------------------------------------+
|  ESTIMATED MONTHLY TOTAL                                              |
|  $612 / month  ($13.60/seat/mo)                                       |
|  [ Start 14-Day Free Trial ]                                          |
+-----------------------------------------------------------------------+
```

### Scale & Stepping Logic

| Range Interval | Step Size | Rationale |
| :--- | :--- | :--- |
| **1 – 10 Seats** | 1 Seat | High granular sensitivity for small teams and startups. |
| **10 – 50 Seats** | 5 Seats | Standard team scaling increments. |
| **50 – 200 Seats** | 10 Seats | Mid-market department tier growth. |
| **200 – 500+ Seats** | 50 Seats | Enterprise-scale volume increments; values above 500 trigger "Contact Sales". |

### Key Design Specs

1. **Dynamic Value Tooltip:**
   - Attached above the single thumb handle, moving in tandem with `left: calc(percent)`.
   - Reads: `"45 Seats"`.
   - Hidden for reduced motion if preferred, or permanently rendered in static sub-header text.

2. **Price Card Synchronicity:**
   - As the slider is dragged, the monthly total text updates smoothly without page re-render.
   - ARIA live region (`aria-live="polite"`) announces rate changes upon drag release or keyboard step.

---

## Accessibility Audit Checklist for Both Examples

| Requirement | Implementation Detail | WCAG Success Criterion |
| :--- | :--- | :--- |
| **Touch Target Size** | Thumbs possess min 44x44px target area via CSS `::after` hit zones. | 2.2 SC 2.5.8 (Target Size) |
| **Color Contrast** | Active track fill (3.8:1) and thumb border (4.6:1) pass non-text contrast against background. | 2.1 SC 1.4.11 (Non-text Contrast) |
| **Focus-Visible** | 3px offset focus ring clearly indicates active handle when navigating via Tab key. | 2.2 SC 2.4.7 / 2.4.13 |
| **Keyboard Operability** | Full `Arrow`, `PageUp/Down`, `Home/End` support on native or ARIA sliders. | 2.1 SC 2.1.1 (Keyboard) |
| **Screen Reader Labels** | `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` provided. | 2.1 SC 4.1.2 (Name, Role, Value) |
| **Forced Colors Mode** | Borders use `border: 2px solid CanvasText` so handles remain visible when shadows vanish. | 2.1 SC 1.4.1 (Use of Color) |
