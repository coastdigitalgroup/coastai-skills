---
name: data-visualization-system
description:
  Design a systematic framework for charts and graphs, focusing on chart
  selection, optical normalization, accessible color coding, and responsive
  reflow to ensure data clarity and integrity.
---

# Data Visualization System

## Purpose

The Data Visualization System provides a methodology for designing charts,
graphs, and complex data displays that are accurate, accessible, and easy to
interpret. It moves beyond "making charts pretty" by establishing rules for
**chart selection**, **optical normalization**, **accessible color coding**,
and **interaction patterns**, ensuring that data tells a clear, honest story
across all devices.

## Use Cases

- **SaaS Analytics Dashboards:** Visualizing user growth, revenue trends, or
  system performance.
- **Financial Reporting:** Showing portfolio performance, market trends, or
  spending breakdowns.
- **Health & Fitness Apps:** Tracking heart rate, sleep patterns, or workout
  consistency over time.
- **Public Data Portals:** Visualizing census data, environmental metrics, or
  economic indicators.
- **E-commerce Insights:** Displaying sales by category, peak shopping times, or
  customer demographics.

## When NOT to Use

- **Single Metrics:** If only a single value or KPI needs to be shown, use
  `metric-and-statistic-system`.
- **Raw Data Exploration:** If the primary goal is for users to sort, filter,
  and inspect hundreds of individual rows, use `data-table-ui-system`.
- **Purely Decorative Graphics:** If the "chart" is just for visual flair and
  doesn't represent actual data, it should be treated as an illustration under
  `imagery-and-media-system`.
- **Static Infographics:** Highly customized, one-off narrative graphics often
  require more illustrative freedom than a systematic UI framework provides.

## Inputs

1. **Data Relationship:** What is the core question? (e.g., Comparison,
   Composition, Distribution, or Relationship).
2. **Data Dimensions:** How many variables are being tracked? (e.g., Time vs.
   Value, Category vs. Percentage).
3. **User Intent:** Is the user searching for a specific value or looking for a
   general trend?
4. **Platform/Context:** Where will the chart be viewed? (e.g., Mobile app vs.
   Desktop report).

## Outputs

1. **Chart Selection:** The most effective chart type for the given data
   relationship.
2. **Visual Spec:** Definitions for axes, gridlines, data points, and labels.
3. **Color & Legend Strategy:** Accessible color palettes and clear data
   identifiers.
4. **Responsive Strategy:** Rules for how charts scale, truncate, or transform
   on small screens.
5. **Interactive Patterns:** Specs for tooltips, hover states, and data
   filtering.

## Workflow

### 1. Select the Right Chart Type

Match the chart to the data relationship:
- **Comparison (Over Time):** Line Chart (for trends), Bar Chart (for discrete
  periods).
- **Comparison (Between Categories):** Horizontal Bar Chart (if labels are
  long), Column Chart.
- **Composition:** Stacked Bar Chart, Waterfall Chart. (Avoid Pie Charts for
  more than 3 categories).
- **Distribution:** Histogram, Scatter Plot.
- **Relationship:** Bubble Chart, Radar Chart.

### 2. Establish Optical Normalization & Accuracy

Ensure the visual representation is honest:
- **Zero-Baseline Rule:** Bar and Column charts must almost always start at a
  zero baseline to avoid magnifying small differences.
- **Aspect Ratio:** Keep a 16:9 or 3:2 ratio for most line charts to avoid
  exaggerating trends through extreme slopes.
- **Labeling:** Prioritize direct labeling (placing labels next to data points)
  over legends to reduce cognitive load.

### 3. Design the Content Layer (Data & Axes)

- **Gridlines:** Use subtle, light-gray lines. Horizontal lines for line/column
  charts; vertical lines for horizontal bars.
- **Axes:** Labels should be concise. For time-series, use consistent intervals
  (e.g., Days, Months, Quarters).
- **Data Points:** In line charts, use distinct markers (dots, squares) if data
  points are sparse; use simple lines if data is high-density.

### 4. Apply Accessible Color & Texture

- **Contrast:** Ensure all data colors have a 3:1 contrast ratio against the
  background.
- **Double Encoding:** Never rely on color alone. Use symbols (dots vs.
  dashes), textures (hatched patterns), or direct labels to distinguish
  categories.
- **Colorblind Safety:** Use palettes optimized for Protanopia, Deuteranopia,
  and Tritanopia.

### 5. Define Responsive Reflow

Charts must remain legible on mobile:
- **Truncation:** Reduce the number of X-axis labels on mobile (e.g., show every
  other month).
- **Horizontal Scrolling:** For dense bar charts, allow the chart to scroll
  horizontally while keeping the Y-axis fixed.
- **Transformation:** A complex multi-series line chart on desktop might become
  a series of small "sparklines" on mobile.

### 6. Design Interactive Feedback

- **Tooltips:** Provide specific values on hover/tap. Tooltips should follow
  `overlay-and-dialog-system` logic for placement.
- **Highlighting:** When hovering over a category in a legend, dim other data
  series to emphasize the selection.

## Decision Rules

- **The "Pie Chart" Rule:** Use Pie or Donut charts only for 2–3 categories
  representing a "part-to-whole" relationship. For more categories, use a
  Horizontal Bar chart.
- **The "High-Density" Rule:** If you have more than 5 line series, use "Small
  Multiples" (multiple small charts) instead of one "Spaghetti Chart."
- **Sorting Logic:** In category-based bar charts, sort data from largest to
  smallest unless there is a natural order (e.g., chronological).
- **Maximum Categories:** Limit line charts to 4–5 series for maximum
  readability.

## Constraints

- **Accessibility:** Charts must be accompanied by an accessible data table or
  a detailed `aria-label` description. Focus management for interactive data
  points is required.
- **Responsiveness:** Charts must use fluid containers and avoid fixed pixel
  widths.
- **Integrity:** Y-axis scales must be consistent across compared charts.

## Common Failure Patterns

- **The "Spaghetti" Chart:** Crowding too many lines into a single view, making
  it impossible to distinguish trends.
- **Truncated Baselines:** Starting a bar chart axis at a non-zero value, which
  visually lies about the magnitude of difference.
- **Legend Overload:** Forcing the user to look back and forth between a color
  key and the data points.
- **Poor Contrast:** Using pastel colors that are indistinguishable from the
  background or each other.
- **Lack of Precision:** Providing a general shape without tooltips or labels
  to show the actual values.

## Validation Criteria

- [ ] The chart type correctly matches the data relationship (e.g., Line for
      Trend).
- [ ] Bar/Column charts use a zero-baseline Y-axis.
- [ ] Direct labeling or high-contrast legends are used for categorization.
- [ ] Colorblind-safe palettes are used, or double-encoding (symbols/texture)
      is applied.
- [ ] Responsive behavior (truncation or transformation) is defined for mobile.
- [ ] Interactive tooltips provide precise values.
- [ ] Accessibility: An alternative data table or descriptive ARIA label is
      provided.
