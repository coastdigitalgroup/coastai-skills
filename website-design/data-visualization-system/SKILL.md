---
name: data-visualization-system
description:
  Design and implement a systematic framework for charts and graphs, managing
  visual hierarchy, accessible color theory, and responsive behavior to
  transform complex data into actionable insights.
---

# Data Visualization System

## Purpose

The Data Visualization System provides a methodology for designing charts and
graphs that sit above the level of individual metrics. It ensures that
quantitative relationships—such as trends over time, comparisons between
categories, and distributions of values—are communicated clearly, accurately,
and accessibly. This system prevents "visual noise" and cognitive overload by
establishing rules for **chart selection**, **optical normalization**,
**accessible color coding**, and **responsive reflow**.

## Use Cases

- **SaaS Dashboards:** Visualizing user growth, revenue trends, or system
  performance.
- **Financial Reports:** Showing portfolio distributions, expense categories, or
  market fluctuations.
- **Analytics Platforms:** Displaying traffic sources, conversion funnels, or
  behavioral cohorts.
- **Impact & Sustainability Reports:** Visualizing environmental metrics or
  social impact data over time.
- **Health & Fitness Apps:** Tracking vitals, activity levels, or progress
  toward goals.

## When NOT to Use

- **Single High-Impact Numbers:** For isolated KPIs (e.g., "Total Revenue:
  $10k"), use `metric-and-statistic-system`.
- **Raw Multi-Attribute Data:** If the user needs to read specific values for 20+
  items across multiple columns, use `data-table-ui-system`.
- **Purely Decorative Infographics:** Where the goal is artistic expression or
  narrative storytelling with non-dynamic, non-data-driven graphics.
- **Step-by-Step Status:** For linear processes (e.g., "Step 2 of 4"), use
  `step-progress-system`.

## Inputs

1. **User Goal:** What is the user trying to understand? (Comparison, Trend,
   Distribution, or Part-to-Whole).
2. **Data Type:** Is the data categorical (e.g., "Browser Type"), temporal (e.g.,
   "Sales by Month"), or quantitative (e.g., "Price vs. Quality")?
3. **Cardinality:** How many items or series need to be displayed simultaneously?
4. **Device Constraints:** Target viewports and interaction modes (Touch vs.
   Mouse).
5. **Brand Tokens:** Palette, typography, and spacing from the parent design
   system.

## Outputs

1. **Chart Selection Map:** The chosen chart type (Line, Bar, Pie, Scatter)
   based on the goal and data.
2. **Accessible Color Spec:** A palette that remains distinguishable for users
   with colorblindness (Protanopia, Deuteranopia, Tritanopia).
3. **Anatomy & Labeling Spec:** Rules for axis titles, legends, tooltips, and
   data markers.
4. **Responsive Transition Map:** How the chart adapts from desktop to mobile
   (e.g., orientation shifts, data simplification).

## Workflow

### 1. Identify the Communication Goal

Before choosing a chart, define what the data should "say":
- **Trend over Time:** Use a **Line Chart** or **Area Chart**.
- **Comparison of Categories:** Use a **Bar Chart** (Vertical or Horizontal).
- **Part-to-Whole Relationship:** Use a **Donut Chart** or **Treemap** (Avoid
  standard Pie charts for >3 categories).
- **Correlation/Distribution:** Use a **Scatter Plot** or **Histogram**.

### 2. Select and Normalize the Chart Type

Apply the "Truth in Data" rules to ensure accuracy:
- **The Zero-Baseline Rule:** Bar charts MUST start at a zero baseline on the
  value axis to avoid exaggerating differences.
- **The "Aspect Ratio" Rule:** For line charts, maintain a balanced aspect ratio
  (usually 2:1 or 3:2) so slopes aren't artificially steepened or flattened.
- **Minimalist Geometry:** Remove non-essential "chart junk" like 3D effects,
  heavy gridlines, or shadows that don't convey data.

### 3. Establish Visual Hierarchy and Labeling

Apply `visual-hierarchy-system` to the chart components:
- **Direct Labeling:** Whenever possible, label data series directly next to
  the lines/bars instead of using a separate legend to reduce eye-tracking
  fatigue.
- **Emphasis:** Use a high-contrast color for the "Current" or "Target" data
  series and muted neutrals for historical or benchmark data.
- **Hierarchy of Context:** Axis titles should be present but subordinated
  (smaller/lighter) to the primary data and chart title.

### 4. Apply Accessible Color and Pattern

Ensure the data is perceivable by everyone:
- **Colorblind-Safe Palettes:** Use distinct hues and varying lightness steps.
  Avoid pairing only Red and Green to indicate "Bad" vs. "Good"; use Red/Blue or
  add icons/symbols.
- **Redundant Encoding:** Use more than just color. Add dashed lines, different
  marker shapes (circles, squares, triangles), or distinct patterns/textures to
  differentiate series.
- **Contrast:** Ensure all text (labels, axes) meets WCAG AA (4.5:1) contrast
  against the background.

### 5. Design for Interaction and Responsiveness

- **Progressive Disclosure:** Use tooltips to show exact values on hover/touch
  so the chart remains clean and scannable.
- **Responsive Reflow:**
  - **Horizontal to Vertical:** A wide vertical bar chart on desktop should
    switch to a horizontal bar chart on mobile to avoid horizontal scrolling.
  - **Data Paring:** On mobile, reduce the number of X-axis labels (e.g., show
    every other month) or aggregate data points.
  - **Aspect Ratio Locking:** Ensure the chart maintains its readability; use
    `aspect-ratio` in CSS to reserve space and prevent CLS.

## Decision Rules

- **The "No Pie" Rule:** Avoid Pie/Donut charts if you have more than 5
  categories or if the differences between categories are small. Use a
  Horizontal Bar chart instead.
- **Labeling over Legends:** If a legend is needed, place it as close as
  possible to the data (e.g., above the chart or right-aligned) rather than at
  the absolute bottom.
- **Monochromatic Success:** A good chart should still be understandable if
  printed in grayscale. If it isn't, the color choices or markers are too
  dependent on hue alone.
- **Precision vs. Scanning:** On dashboards, round values (e.g., 1.2M vs.
  1,242,301) for instant scanning. Keep the high precision for the tooltips.

## Constraints

- **Accessibility:** Charts must have an accompanying data table or a
  descriptive `aria-label` summarizing the key insight. Use `role="graphics-document"`
  or `role="img"` with an `aria-label`. Ensure all interactive elements
  (markers) meet the 24x24px minimum target size.
- **Responsiveness:** Charts must never have a fixed pixel width; they must
  be fluid. For complex SVG charts, use `viewBox` for scaling.
- **Hierarchy:** The chart's title should be the most prominent text,
  followed by the data itself.

## Common Failure Patterns

- **Pie Chart Overload:** Trying to show 10 slices in a pie chart, making the
  smaller ones impossible to distinguish.
- **The Truncated Axis:** Starting a bar chart at a non-zero value to make
  a small difference look massive (deceptive design).
- **Color-Only Dependency:** Differentiating 5 lines in a line chart using only
  similar shades of blue, making it inaccessible to colorblind users.
- **Legend Fatigue:** Forcing the user to look back and forth between a color
  key and the data 10 times to understand the chart.
- **Overflowing Mobile Charts:** Not adjusting the chart type or labeling for
  mobile, resulting in tiny, unreadable text or broken layouts.

## Validation Criteria

- [ ] Chart type selection matches the communication goal (e.g., Line for
      Trend).
- [ ] Bar charts start at a zero baseline.
- [ ] Color palette is colorblind-safe and uses redundant encoding (markers/patterns).
- [ ] Direct labeling is used where space allows; legends are placed in close
      proximity.
- [ ] Chart is fluid and adapts correctly to mobile (e.g., horizontal reflow).
- [ ] Accessibility: `aria-label` provides a summary of the data/insight.
- [ ] Interaction: Tooltips provide precise data on hover/touch.
- [ ] All text meets WCAG AA contrast (4.5:1).
