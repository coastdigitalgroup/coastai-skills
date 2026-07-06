# Chart Design Specification Template

Use this template to document the design requirements for a specific chart or graph to ensure consistent implementation by engineering teams.

## 1. Metadata
*   **Chart Title:** [e.g., Annual Revenue Growth]
*   **Goal:** [e.g., Show Year-over-Year trend]
*   **Data Source:** [e.g., Sales API / `v1/reports/revenue`]

## 2. Geometric Blueprint
*   **Chart Type:** [Line / Vertical Bar / Horizontal Bar / Donut / Scatter]
*   **Aspect Ratio:** [e.g., 16:9 Desktop, 1:1 Mobile]
*   **Primary Axis (X):** [e.g., Time / Month]
*   **Value Axis (Y):** [e.g., Currency / USD]
    *   **Baseline:** [Must be 0 for Bar Charts]
    *   **Scale:** [Linear / Logarithmic]

## 3. Visual Tokens
*   **Primary Series:**
    *   **Color:** `var(--color-primary-500)`
    *   **Stroke/Marker:** [e.g., Solid, 2px / 6px Circle]
*   **Secondary/Benchmark:**
    *   **Color:** `var(--color-neutral-400)`
    *   **Stroke/Marker:** [e.g., Dashed / None]
*   **Thresholds/Goals:**
    *   **Color:** `var(--color-success-600)`
    *   **Style:** [e.g., Horizontal dotted line]

## 4. Labeling & Typography
*   **Title:** `var(--text-lg)` / Bold / `--color-neutral-900`
*   **Labels:** `var(--text-xs)` / Medium / `--color-neutral-600`
*   **Number Formatting:** [e.g., "$1.2k" (Compact) vs "$1,200.00" (Full)]
*   **Legend Type:** [Direct Labeling / Top Legend / None]

## 5. Interaction Model
*   **Hover State:** [e.g., Increase line thickness + Show Tooltip]
*   **Tooltip Content:**
    *   [Header: Date]
    *   [Body: Series Name + Exact Value]
*   **Touch Action:** [e.g., Tap to lock tooltip / Swipe to scrub timeline]

## 6. Responsive Adaptation
*   **Breakpoint < 768px:**
    *   **Layout:** [e.g., Change Vertical Bar to Horizontal Bar]
    *   **Aggregation:** [e.g., Sum daily data into weekly buckets]
    *   **Labels:** [e.g., Hide every other Y-axis gridline]

## 7. Accessibility Layer
*   **`aria-label`:** "[Chart Title]: Showing a [positive/negative] trend in [Goal] from [Start] to [End]."
*   **Redundancy:** [e.g., Series 1 uses solid line, Series 2 uses dots]
*   **Contrast Check:** [ ] All labels pass 4.5:1.
