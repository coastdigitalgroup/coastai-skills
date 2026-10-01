# Example: Range Slider UI System Applied

This document illustrates how to apply the **Range Slider UI System** to solve two distinct real-world design problems:
1. **Dual-Thumb E-Commerce Price Range Filter:** A bounded interval selector for filtering products by minimum and maximum price in a filter drawer.
2. **Single-Thumb SaaS Plan Tier & Storage Calculator:** A stepped volume selector that dynamically calculates monthly billing based on storage and seat allocation.

---

## Breakdown 1: Dual-Thumb E-Commerce Price Range Filter

### Context
An e-commerce clothing marketplace needs a price filter inside a narrow slide-over drawer (320px wide on mobile, 280px wide in desktop sidebar). Users need to narrow down product price ranges anywhere from **$0** to **$1,000**, with frequent filtering around the **$50–$250** sweet spot.

```text
+-------------------------------------------------------------+
| FILTER PRODUCTS                                         [X] |
+-------------------------------------------------------------+
| Price Range                                                 |
|                                                             |
|   Min Price ($)                Max Price ($)                |
|   +-------------------+        +-------------------+        |
|   | $ 50              |   to   | $ 250             |        |
|   +-------------------+        +-------------------+        |
|                                                             |
|   Track Rail & Dual Thumbs:                                 |
|   $0          Thumb1=========Thumb2               $1,000+   |
|   o------------O=============O-----------------------o      |
|               |              |                              |
|             $50            $250                             |
|                                                             |
|   Active Track: High contrast ($50 to $250 filled)          |
|   Histogram: [|||||||||||||||||.....................]       |
|                                                             |
| [ Reset Price ]                          [ Apply Filter ]   |
+-------------------------------------------------------------+
```

---

### Spatial & Layout Blueprint

1. **Dual Direct Numeric Inputs (Top):**
   - Two `<input type="number">` fields positioned side-by-side above the range slider track.
   - Left input: `Min Price`, value `$50`. Right input: `Max Price`, value `$250`.
   - Visual separator: `to` or `—` centered between inputs.
   - Input containers use `height: 40px`, `border: 1px solid var(--border-neutral)`, and `border-radius: 6px` for comfortable typing.

2. **Price Distribution Histogram (Background Backdrop):**
   - A subtle bar chart (histogram) rendered immediately above the slider track showing product density across price buckets.
   - Bars inside the active range ($50 to $250) are highlighted with `var(--color-primary-500)`; bars outside are dimmed (`var(--color-neutral-300)`).
   - Gives users immediate visual feedback on how many products fall within their selected price filter.

3. **Dual-Thumb Slider Rail:**
   - **Unselected Track Rail:** `height: 6px`, `background: var(--color-neutral-200)`, `border-radius: 9999px`. Full width (`100%`).
   - **Active Fill Segment:** Spans from `5%` ($50) to `25%` ($250). `height: 6px`, `background: var(--color-primary-600)`.
   - **Min Thumb (Lower Bound):** Circular handle at `5%` mark. Visual diameter: `22px`, `background: #FFFFFF`, `border: 2px solid var(--color-primary-600)`, `box-shadow: 0 2px 4px rgba(0,0,0,0.15)`.
   - **Max Thumb (Upper Bound):** Circular handle at `25%` mark. Same visual styling.
   - **Hit Area Expansion:** Transparent hit wrappers around both thumbs measure `44x44px` to meet WCAG 2.2 SC 2.5.8 touch target rules.

4. **Milestone Legend Labels (Bottom):**
   - Static text labels positioned below the track at `$0` (far left) and `$1,000+` (far right).
   - Typography: `font-size: 0.75rem (12px)`, `color: var(--color-text-muted)`.

---

### Accessibility & Interaction Mapping

| Element | ARIA Attributes & Markup | Keyboard Behavior |
| :--- | :--- | :--- |
| **Min Thumb** | `role="slider"`<br>`aria-label="Minimum price"`<br>`aria-valuemin="0"`<br>`aria-valuemax="1000"`<br>`aria-valuenow="50"`<br>`aria-valuetext="$50 USD"` | `ArrowRight`: +$10<br>`ArrowLeft`: -$10<br>`PageUp`: +$100<br>`PageDown`: -$100<br>`Home`: Snap to $0 |
| **Max Thumb** | `role="slider"`<br>`aria-label="Maximum price"`<br>`aria-valuemin="0"`<br>`aria-valuemax="1000"`<br>`aria-valuenow="250"`<br>`aria-valuetext="$250 USD"` | `ArrowRight`: +$10<br>`ArrowLeft`: -$10<br>`PageUp`: +$100<br>`PageDown`: -$100<br>`End`: Snap to $1,000 |
| **Min Input** | `<input type="number" aria-label="Minimum price input">` | Standard numeric text editing; syncing updates Min Thumb immediately |
| **Max Input** | `<input type="number" aria-label="Maximum price input">` | Standard numeric text editing; syncing updates Max Thumb immediately |

---

## Breakdown 2: Single-Thumb SaaS Plan Tier & Storage Calculator

### Context
A cloud storage B2B SaaS platform needs an interactive pricing calculator on their public website. Prospects want to estimate their monthly invoice by adjusting cloud storage capacity from **100 GB** to **10 TB (10,000 GB)** in fixed stepped increments.

```text
+-------------------------------------------------------------+
| ESTIMATE YOUR STORAGE PLAN                                  |
+-------------------------------------------------------------+
| Selected Capacity:                                          |
|                                                             |
|               +----------------------------+                |
|               |  1,000 GB (1 TB) - $80/mo  |  <-- Floating  |
|               +-------------+--------------+      Badge     |
|                             |                               |
|   Track Rail & Single Thumb:|                               |
|   100 GB                  Thumb                    10 TB    |
|   o===============[====]====O-----------------------o       |
|                   Tick Marks:                               |
|                   |    |    |    |    |    |                |
|                 100   500  1TB  2.5T 5TB  10TB              |
|                                                             |
|   Estimated Monthly Cost:                                   |
|   $80 / month  (Includes 24/7 Support & 99.99% SLA)         |
|                                                             |
|   [ Start 14-Day Free Trial ]   [ Contact Enterprise Sales ] |
+-------------------------------------------------------------+
```

---

### Spatial & Layout Blueprint

1. **Floating Live Value Badge (Above Thumb):**
   - Positioned dynamically directly above the active thumb handle.
   - Badge styling: `background: var(--color-neutral-900)`, `color: #FFFFFF`, `padding: 6px 12px`, `border-radius: 6px`, `font-weight: 600`.
   - Content: Shows active selection formatted clearly (e.g., `1,000 GB (1 TB) — $80/mo`).
   - Attached arrow pointer (`::after`) points directly down to the thumb handle. Moves in sync with the thumb during dragging or arrow key presses.

2. **Single-Thumb Stepped Track Rail:**
   - **Step Increments:** Stepped snapping points at `100 GB`, `250 GB`, `500 GB`, `1,000 GB (1 TB)`, `2,500 GB`, `5,000 GB`, and `10,000 GB (10 TB)`.
   - **Track Rail:** `height: 8px`, `background: var(--color-neutral-200)`, `border-radius: 9999px`.
   - **Active Fill Track:** Spans from `0%` (100 GB) to the active thumb position (`1 TB` = ~40% position). `background: var(--color-accent-600)`.
   - **Interactive Thumb:** Circular thumb with `28px` diameter. Includes an inner accent icon or dot to signal interactivity. `border: 3px solid var(--color-accent-600)`.
   - **Hover / Active Ring:** On hover or active drag, displays an expanded semi-transparent focus halo (`box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.15)`).

3. **Stepped Tick Marks & Milestone Legend:**
   - Vertical tick lines (`width: 2px`, `height: 6px`, `background: var(--color-neutral-400)`) placed along the track rail at each stepped capacity increment.
   - Corresponding text legend below each tick mark displaying capacity labels (`100 GB`, `500 GB`, `1 TB`, `2.5 TB`, `5 TB`, `10 TB`).
   - Active ticks within the filled track shift color to match the primary active accent.

4. **Dynamic Price Display Summary Box (Bottom):**
   - Prominent price text block (`font-size: 2.25rem (36px)`, `font-weight: 700`) displaying calculated cost (`$80 / month`).
   - Includes contextual feature subtext: `"Includes automated backups, unlimited API calls, and 99.99% uptime SLA."`
   - Primary Call To Action (CTA) button (`"Start 14-Day Free Trial"`) positioned next to the calculated price summary.

---

### Key Design System Token Mappings

| UI Component | Token Variable | Value / Spec | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| **Unselected Track** | `var(--color-bg-neutral-muted)` | `#E5E7EB` (Light Gray) | 3.2:1 against white page |
| **Active Track Fill** | `var(--color-primary-main)` | `#2563EB` (Royal Blue) | 4.6:1 against track & page |
| **Thumb Boundary** | `var(--color-primary-main)` | `#2563EB` (Solid Ring) | 4.6:1 against page |
| **Floating Badge BG** | `var(--color-surface-dark)` | `#111827` (Dark Neutral) | 14.5:1 text contrast |
| **Focus Ring** | `var(--color-focus-ring)` | `#3B82F6` (2px solid + 2px offset) | Exceeds 3:1 indicator rule |
