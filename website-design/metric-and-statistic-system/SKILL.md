---
name: metric-and-statistic-system
description:
  Design and implement a systematic framework for visualizing quantitative data,
  including KPIs, social proof, and dashboard summaries, with rules for
  numerical hierarchy and trend visualization.
---

# Metric and Statistic System

## Purpose

The Metric and Statistic System provides a methodology for designing the visual
and spatial organization of quantitative data. It ensures that critical numbers
(KPIs, social proof stats, performance metrics) are scannable, trustworthy, and
semantically clear. This system moves beyond simple text to establish a
hierarchy between the **Primary Value**, its **Label/Context**, and any
**Trend Indicators**, allowing users to process "at-a-glance" insights without
cognitive overload.

## Use Cases

- **SaaS Dashboards:** Visualizing key performance indicators (KPIs) like MRR,
  Active Users, or Churn.
- **Marketing Landing Pages:** Displaying social proof stats (e.g., "10k+
  Customers," "99.9% Uptime").
- **E-commerce Analytics:** Showing sales trends, conversion rates, and
  inventory levels.
- **Impact Reports:** Visualizing the results of a service or non-profit's work.
- **Financial Interfaces:** Displaying balances, stock movements, and portfolio
  performance.

## When NOT to Use

- **Dense Data Tables:** When users need to compare specific attributes across
  dozens of rows; use `data-table-ui-system` instead.
- **Narrative Content:** If the number is just part of a standard paragraph and
  doesn't need to stand out as a discrete data point.
- **Complex Charts:** For multi-dimensional data trends over time (e.g., line
  charts, heatmaps), though this system can provide the "Summary" stat that sits
  above such charts.
- **Purely Decorative Numbers:** If the number has no real data backing it (e.g.,
  a "Step 1" indicator in a process), use `step-progress-system`.

## Inputs

1. **The Primary Value:** The core number or data point (e.g., "1,240," "$4.2k").
2. **The Label:** Concise text describing what the value represents (e.g.,
   "Active Subscriptions").
3. **Trend Data (Optional):** Comparison to a previous period (e.g., "+12% vs
   last month").
4. **Contextual Metadata (Optional):** Units, timeframes, or tooltips for further
   clarification.
5. **Visual Context:** Is this a standalone "Big Number" or part of a grid of
   cards?

## Outputs

1. **Numerical Hierarchy Spec:** Defined styles for the Value (Size/Weight) vs.
   the Label (Secondary Typography).
2. **Trend Visualization Pattern:** Standards for color (Success/Error) and
   iconography (Arrows/Indicators).
3. **Stat Card Anatomy:** A structural layout grouping the value, label, and
   trend indicator within a container.
4. **Formatting Rules:** Guidelines for rounding, abbreviation (k, M, B), and
   unit placement (Prefix vs. Suffix).

## Workflow

### 1. Establish Numerical Hierarchy

Apply `visual-hierarchy-system` to prioritize the value:
- **The Value:** Use a large, high-weight font (e.g., Display or Heading style).
  It should be the first thing the eye hits.
- **The Label:** Use a smaller, medium-weight font (often all-caps or muted color)
  placed immediately above or below the value.
- **The Unit:** If using currency symbols or percentages, decide if they share
  the value's size or are slightly "shrunk" (superscript style) to keep the focus
  on the digits.

### 2. Design the Trend Indicator

Communicate change or comparison clearly:
- **Directionality:** Use icons (Up/Down arrows, Carets) to indicate movement.
- **Semantic Coloring:** Use Green for "Good" change and Red for "Bad" change.
  *Note:* High Churn (Red) might be an upward trend (+5%), so color should map
  to the *sentiment*, not just the direction.
- **The Baseline:** Always state the comparison point (e.g., "vs last 7 days").

### 3. Define Formatting and Abbreviation

Ensure numbers don't break the layout as they grow:
- **The "KMB" Rule:** Abbreviate large numbers (e.g., 10,000 -> 10k, 1,000,000 ->
  1.2M) to maintain spatial consistency.
- **Precision:** Round to the nearest whole number or one decimal place for high-
  level summaries. Keep high precision (e.g., $1,240.52) only for financial or
  audit tasks.
- **Monospacing:** Use tabular figures (monospaced numbers) in grids so that
  digits align vertically for easier comparison.

### 4. Create the Layout Composition

Choose a pattern based on density:
- **The Centered Hero Stat:** One large number, centered. Best for landing page
  impact.
- **The KPI Card:** A contained box with a label (top-left), value (center),
  and trend (bottom). Best for dashboards.
- **The Inline Stat Row:** A horizontal row of labels and values. Best for
  supporting metadata under a header.

### 5. Plan for State and Empty Data

- **Loading State:** Use `skeleton-state-system` circles or bars for the value.
- **No Data:** Use a dash (—) or "0" instead of leaving the space blank.
- **Negative Values:** Clearly distinguish negative values with a minus sign (-)
  and appropriate semantic coloring if applicable.

## Decision Rules

- **The "Squint" Test:** If you squint at the screen, the number should be visible,
  but the label should be readable once you focus.
- **Prefix vs. Suffix:** Place universal symbols ($, £) as prefixes. Place
  measurements (kg, %, ms) as suffixes.
- **Color Over-reliance:** Never use color alone to indicate a trend. Always
  pair it with an icon or "+" / "-" sign for accessibility.
- **Density vs. Clarity:** In a grid of stats, limit each card to one primary
  metric. Don't bury secondary metrics in a way that competes with the main
  value.

## Constraints

- **Accessibility:** Ensure a 4.5:1 contrast ratio for all text, including the
  muted labels and trend indicators. Use `aria-label` to provide context for
  icons (e.g., "Increased by 12%").
- **Responsiveness:** On mobile, stack grids of stats vertically. If using an
  inline row, allow it to wrap or switch to a 2x2 grid.
- **Hierarchy:** The Metric Value must be at least 2x the size of the Label text
  to create a distinct "Display" level.

## Common Failure Patterns

- **Ambiguous Labels:** Using "Growth" without saying what is growing or what
  it's being compared to.
- **Scaling Failures:** A design that looks great with "12" but breaks when the
  number becomes "1,240,500."
- **Misleading Trends:** Using Green for an upward trend in something negative
  (like "Error Rate").
- **Tiny Units:** Making the "%" or "$" symbol so small it's unreadable or
  misinterpreted.
- **Lack of Monospacing:** Numbers "jittering" or misaligning in a grid because
  the font uses proportional widths for digits (e.g., '1' is narrower than '8').

## Validation Criteria

- [ ] Numerical hierarchy is clear (Value is significantly larger/bolder than Label).
- [ ] Trend indicators use both color and iconography for accessibility.
- [ ] Large numbers are abbreviated consistently (k, M, B).
- [ ] Semantic coloring correctly reflects the "Good/Bad" sentiment of the data.
- [ ] Layout is responsive, stacking logically on mobile.
- [ ] Formatting (prefixes, suffixes, rounding) is consistent across all stats.
- [ ] Accessibility: Contrast ratios for all elements meet WCAG AA.
