# Dashboard Analytics Breakdown: Sales & User Growth

This example demonstrates how to apply the **Data Visualization System** to a realistic SaaS analytics dashboard, focusing on trend analysis, categorical comparison, and responsive adaptation.

## 1. Primary Trend: Monthly Active Users (Line Chart)

### The Design Problem
Show the growth of Monthly Active Users (MAU) over the last 12 months, distinguishing between "Current Year" and "Previous Year" (Benchmark).

### Applied Principles
*   **Chart Type:** Line Chart (Best for temporal trends).
*   **Direct Labeling:** Instead of a bottom legend, the labels "2023" and "2024" are placed at the end of each line.
*   **Redundant Encoding:**
    *   **2024 (Primary):** Solid, thick blue line with circular data markers.
    *   **2023 (Benchmark):** Dashed, thinner gray line with no markers.
*   **Visual Hierarchy:** The 2024 line is the most prominent element.
*   **Responsive Adaptation:** On mobile, the chart shows only 6 months of data (every other month) to prevent X-axis crowding.

## 2. Category Comparison: Sales by Region (Horizontal Bar Chart)

### The Design Problem
Compare sales performance across five global regions.

### Applied Principles
*   **Chart Type:** Horizontal Bar Chart.
    *   *Why?* Regional names (e.g., "North America", "Asia Pacific") are long. Horizontal bars provide more room for labels without rotating text (which is hard to read).
*   **Zero-Baseline:** The value axis starts at 0.
*   **Sorting:** Regions are sorted from "Highest Sales" to "Lowest Sales" to allow for instant ranking.
*   **Color Strategy:** A single color (Teal) is used for all bars. A slightly darker tint is used for the user's "Own Region" to provide context.
*   **Responsive Adaptation:** The chart maintains its horizontal orientation but the bar labels move from "Inside the bar" to "Above the bar" to ensure legibility on narrow screens.

## 3. Part-to-Whole: Traffic Sources (Donut Chart)

### The Design Problem
Visualize the distribution of traffic sources (Search, Social, Direct, Referral).

### Applied Principles
*   **Chart Type:** Donut Chart.
    *   *Why?* Only 4 categories. The center "hole" is used to display the "Total Sessions" metric (Metric + Chart integration).
*   **Colorblind Safety:** Colors are chosen from a high-contrast palette (Blue, Orange, Green, Purple).
*   **Direct Labeling:** Labels and percentages are placed next to the slices with thin leader lines. No legend is used.
*   **Responsive Adaptation:** On mobile, the chart moves into a "Stacked Bar" format (a single horizontal bar showing the 4 segments) to save vertical space.

---

## Technical Spec Summary

| Component | Color Token | Typography | Interaction |
| :--- | :--- | :--- | :--- |
| **Grid Lines** | `--color-neutral-100` | N/A | Static |
| **Axis Labels** | `--color-neutral-600` | 12px / Medium | Static |
| **Tooltips** | `--color-surface-elevated` | 14px / Bold | Popover on Hover/Touch |
| **Primary Data**| `--color-primary-500` | N/A | Emphasis on Hover |
| **Benchmark** | `--color-neutral-400` | N/A | Muted |

## Validation Checklist
- [x] Bar chart starts at 0.
- [x] Line chart uses different stroke styles (Solid vs Dashed).
- [x] No rotated text on axes.
- [x] All colors meet 3:1 contrast for graphics, 4.5:1 for labels.
- [x] "Total" value included in the Donut Chart center.
