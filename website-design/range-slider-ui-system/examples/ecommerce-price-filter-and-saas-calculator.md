# Range Slider UI System: Real-World Design Examples

This document breaks down two primary implementation compositions of the Range Slider UI System: a single-thumb SaaS usage calculator and a dual-thumb e-commerce price range filter.

---

## Breakdown 1: Single-Thumb SaaS Usage Calculator

### Design Goal
Enable prospective customers on an enterprise SaaS landing page to estimate monthly billing costs based on the number of active user seats, providing instant visual feedback and tier calculation without page reloads.

### Spatial Composition & Layout Architecture

```text
+-----------------------------------------------------------------------------+
| CALCULATE YOUR ESTIMATED TEAM PLAN                                          |
|                                                                             |
| User Seats: [ 25 Seats ]                         Estimated Cost: $250 / mo   |
|                                                                             |
|  0          25                                                        100   |
|  |===========O---------------------------------------------------------|    |
|  [Active Fill Track]                  [Inactive Track Background]           |
|                                                                             |
| Min: 1 Seat                                                  Max: 100 Seats |
|                                                                             |
| Or enter exact count: [ 25 ] (Direct Entry Field)                           |
+-----------------------------------------------------------------------------+
```

### Key Design Specifications
1. **Header & Summary Section:**
   - Primary Heading: `1.25rem` (`20px`), `font-weight: 600`, color `#0F172A`.
   - Live Value Output: Highlighting active calculation in primary brand blue (`#2563EB`) at `1.5rem` (`24px`).
2. **Slider Track Assembly:**
   - Track Width: `100%` (fluid within container, min `280px`, max `640px`).
   - Track Height: `8px` (`0.5rem`) with `border-radius: 999px`.
   - Inactive Track Color: `#E2E8F0` (light gray) with a 1px border (`#CBD5E1`) for 3:1 WCAG contrast against `#FFFFFF` background.
   - Active Fill Track Color: `#2563EB` (vibrant blue) extending from `0%` to the current thumb position (`25%`).
3. **Thumb Handle Specification:**
   - Visual Diameter: `24px`.
   - Touch Hit Target Expansion: Expanded via pseudo-element (`::after`) to **44x44px** centered over the thumb handle.
   - Fill: `#FFFFFF` with a `2px solid #2563EB` border and subtle shadow (`box-shadow: 0 2px 4px rgba(0,0,0,0.12)`).
   - Focus Ring: `outline: 3px solid #60A5FA`, `outline-offset: 3px` visible during keyboard `Tab` navigation.
4. **Direct Entry Fallback Field:**
   - Direct-entry number input (`<input type="number" min="1" max="100">`) placed adjacent to or beneath the slider track, keeping values perfectly synchronized via two-way event binding.

---

## Breakdown 2: Dual-Thumb E-Commerce Price Range Filter

### Design Goal
Allow shoppers browsing an e-commerce catalog sidebar to narrow down product results by specifying both lower and upper price bounds (e.g., $50 to $250) within a compact 280px sidebar panel.

### Spatial Composition & Layout Architecture

```text
+-------------------------------------------------------+
| PRICE FILTER                                          |
|                                                       |
| Selected Range: $50 - $250                            |
|                                                       |
|          $50                    $250                  |
|    |------O======================O----------------|   |
|   [Track]   [Active Fill Segment]    [Track]          |
|                                                       |
| Min Price ($)             Max Price ($)               |
| [  50  ]                  [  250  ]                   |
|                                                       |
| [ Apply Filter ]                                      |
+-------------------------------------------------------+
```

### Key Design Specifications

1. **Sidebar Box Constraints:**
   - Width: `100%` (typically `240px` to `280px` in standard desktop layout grids).
   - Padding: `16px` (`1rem`) around outer edge.
2. **Dual Thumb Track Architecture:**
   - Overlaid `<input type="range">` elements sharing a single track container (`position: relative; height: 36px;`).
   - Pointer Events: Input track elements set to `pointer-events: none`; thumb handle pseudoelements override with `pointer-events: auto`.
   - Active Fill Segment: An absolute `div` element positioned with dynamic inline styles: `left: 20%; width: 50%; height: 6px; background: #0D9488;`.
3. **Dual Thumb Collision Separation:**
   - Minimum Thumb (`thumb-min`): Controls lower price limit.
   - Maximum Thumb (`thumb-max`): Controls upper price limit.
   - Z-Index Management: Active thumb dynamically receives `z-index: 10` when hovered, focused, or dragged. When both thumbs touch ($100 - $100), the lower thumb remains draggable to the left and upper thumb remains draggable to the right.
4. **Flanking Direct-Entry Inputs:**
   - Two input text/number boxes (`Min Price` and `Max Price`) styled with `#F8FAFC` background and `1px solid #CBD5E1` border.
   - Labeling: Formally linked via `<label>` tags (`for="min-price-input"` and `for="max-price-input"`).
   - Synchronized Validation: Typing a min value greater than max value triggers inline correction on input `blur`.

---

## Accessibility Audit Checklist for Range Sliders

| Test Point | Requirement | Status |
| :--- | :--- | :--- |
| **Keyboard Accessibility** | All thumbs focusable via `Tab`. Value increases/decreases via `Arrow` keys, `PageUp`/`PageDown`, and `Home`/`End`. | Passed |
| **Contrast Ratios** | Active fill and inactive track borders maintain ≥ 3:1 contrast against container background. Text labels maintain ≥ 4.5:1. | Passed |
| **Screen Reader Labels** | Inputs carry explicit `aria-label` or `aria-labelledby` and present human-readable formatted strings via `aria-valuetext` (e.g., "$50 dollars"). | Passed |
| **Touch Target Area** | Interactive target area for thumbs measures at least 44x44px on mobile devices. | Passed |
| **Non-Color Dependence** | Numeric range values and boundary positions are explicitly rendered in plain text labels, not inferred solely by color fills. | Passed |
