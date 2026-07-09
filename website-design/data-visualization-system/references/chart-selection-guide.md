# Chart Selection & Accessibility Guide

Choosing the right chart type is the first step toward clear data communication. Use this guide to match your data goal to the most effective visual pattern.

## 1. Choosing the Right Chart Type

| Goal | Data Type | Recommended Chart | Why? |
| :--- | :--- | :--- | :--- |
| **Trend over Time** | Continuous (Dates) | **Line Chart** | Shows the "shape" of change and rate of growth. |
| **Ranking** | Categorical | **Horizontal Bar** | Easiest for comparing magnitudes and reading long labels. |
| **Comparison** | Categorical | **Vertical Bar** | Best for fewer categories (< 5) or discrete time units (Years). |
| **Part-to-Whole** | Percentage / Total | **Donut Chart** | Good for high-level distribution (max 5 slices). |
| **Correlation** | Two Variables | **Scatter Plot** | Reveals clusters, outliers, and patterns. |
| **Distribution** | Quantitative | **Histogram** | Shows how often values occur within specific ranges. |

## 2. The Colorblind-Safe Palette

When designing charts, avoid relying on hue alone. Use this high-contrast palette as a starting point for 5-series charts:

1.  **Series 1:** Blue (`#0055FF`) - *High Contrast*
2.  **Series 2:** Orange (`#FF8800`) - *Distinct from Blue*
3.  **Series 3:** Teal/Green (`#00AA88`) - *Cool contrast*
4.  **Series 4:** Purple (`#8800FF`) - *Secondary contrast*
5.  **Series 5:** Dark Gray (`#444444`) - *Neutral anchor*

**Important:** Always verify your palette using a colorblindness simulator (Protanopia/Deuteranopia).

## 3. Redundant Encoding Strategies

Don't let color do all the work. Use these "non-color" cues to distinguish data:

*   **Line Styles:** Solid, Dashed, Dotted.
*   **Marker Shapes:** Circles, Squares, Triangles, Diamonds.
*   **Hatch Patterns:** Diagonal lines, dots, or cross-hatching (especially for bar/area charts).
*   **Direct Labels:** Placing the name of the series directly on the chart rather than a legend.

## 4. Axis and Gridline Best Practices

*   **Gridlines:** Keep them subtle (`#EEEEEE` or 10% opacity). They are for reference, not the primary focus.
*   **Y-Axis Labels:** Use "K," "M," "B" abbreviations for large numbers to keep the chart area clean.
*   **X-Axis Labels:** Avoid 45-degree or 90-degree rotated text. If labels are too long, switch to a horizontal bar chart.
*   **Ticks:** Use fewer ticks. A chart with 4-5 well-spaced gridlines is easier to read than one with 20.

## 5. Accessibility Landmarks

For web implementation, ensure charts are accessible:

*   **Alt Text:** "Bar chart showing revenue by region. North America leads with $5M, followed by Europe with $3M."
*   **Data Table:** Provide a "View as Table" toggle or a visually hidden table for screen readers.
*   **ARIA Roles:** `role="graphics-document" aria-label="[Summary of chart]"`.
