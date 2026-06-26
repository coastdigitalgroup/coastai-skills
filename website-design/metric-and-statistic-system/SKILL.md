---
name: metric-and-statistic-system
description:
  Design a systematic framework for displaying high-impact quantitative data,
  ensuring numerical clarity, trend context, and visual hierarchy for KPIs and
  social proof.
---

# Metric and Statistic System

## Purpose

The Metric and Statistic System provides a methodology for visualizing
quantitative data in a way that is instantly understandable and contextually
relevant. It moves beyond simply "displaying a number" by establishing rules for
**numerical hierarchy**, **trend visualization**, and **semantic coloring**,
ensuring that users can grasp the significance of a value (e.g., "Is 42% good or
bad?") without deep analysis.

## Use Cases

- **SaaS Dashboards:** Displaying key performance indicators (KPIs) like MRR,
  Churn, or Active Users.
- **Marketing Social Proof:** Showcasing "By the Numbers" sections (e.g., "10k+
  Customers," "99.9% Uptime").
- **Health & Monitoring:** Visualizing system performance, error rates, or
  resource usage.
- **Personal Analytics:** Showing progress toward goals in fitness, finance, or
  productivity apps.
- **E-commerce:** Displaying review counts, stock levels, or "items sold in the
  last 24 hours."

## When NOT to Use

- **Raw Data Sets:** If the user needs to sort, filter, or compare 10+ rows of
  multi-attribute data, use `data-table-ui-system`.
- **Complex Relationships:** If the primary goal is to show the relationship
  between variables over time, use a full Charting/Graphing library (not covered
  by this atomic system).
- **Narrative Content:** Numbers embedded within sentences should follow
  standard typography; this system is for "Display" metrics.
- **Low-Value Metadata:** Small counts (like notification pings) should use
  `badge-and-tag-system`.

## Inputs

1. **The Value:** The primary number or percentage to be displayed.
2. **The Label:** A clear, concise description of what the value represents.
3. **Context/Trend:** Comparative data (e.g., vs. last month, vs. goal).
4. **Unit/Format:** Currency symbols, percentages, or units (e.g., "ms," "GB").
5. **Hierarchy Priority:** Is this a "Primary KPI" or a "Supporting Stat"?

## Outputs

1. **Stat Card Spec:** The spatial arrangement of value, label, and trend
   within a container.
2. **Typography Scale:** Defined sizes for "Display" numbers vs. labels.
3. **Trend Logic:** Visual rules for Up, Down, and Neutral states (Color +
   Icons).
4. **Responsive Strategy:** How metric grids collapse or scale on mobile.

## Workflow

### 1. Categorize the Metric Type

Determine the visual "gravity" required:
- **Level 1: Hero Metric.** Large, centered, often without a border. Used for
  top-level social proof on landing pages.
- **Level 2: KPI Card.** Contained within a card, often in a grid. Used for
  dashboard summaries.
- **Level 3: Inline Stat.** Small, high-density display. Used within headers or
  sidebars.

### 2. Establish Numerical Hierarchy

Apply the "Display Typography" rules:
- **The Value:** Must be the largest element (usually 200–400% of body size).
- **The Label:** Placed either directly above or below the value. Use a muted
  color or smaller weight to ensure it doesn't compete.
- **The Unit:** Symbols (%, $) should be slightly smaller than the number to
  prevent them from "breaking" the eye's focus on the value.

### 3. Provide Trend and Comparison Context

A number without context is often meaningless. Add a "Comparison Layer":
- **Trend Indicator:** Use an arrow (↑/↓) paired with a percentage or value
  change.
- **Timeframe Label:** Always specify the comparison period (e.g., "vs last 30
  days").
- **Semantic Coloring:** Apply color to the trend, not necessarily the value.
  - _Positive Trend:_ Green (usually).
  - _Negative Trend:_ Red (usually).
  - _Neutral:_ Gray.

### 4. Apply Spatial Rhythm (The Grid)

Metrics are rarely shown in isolation. Group them using `responsive-grid-system`:
- **Grid Layout:** 3 or 4 columns on desktop; 1 or 2 on mobile.
- **Internal Padding:** Ensure generous whitespace (`--space-l` or `--space-xl`)
  around the value to make it "pop."

### 5. Design for Loading and Empty States

- **Skeleton:** Use `skeleton-state-system` for the value and trend while data
  is fetching.
- **Zero States:** If a metric is 0, decide if it should be displayed as "0" or
  a dash (—).

## Decision Rules

- **The "Good/Bad" Rule:** Never use Green/Red for trends if the metric isn't
  inherently positive/negative (e.g., "Temperature" shouldn't be green just
  because it went up). Use Neutral (Gray/Blue) for non-valued changes.
- **Rounding Logic:** For marketing stats, round to the nearest "K" or "M" for
  instant scanning (e.g., "12.4K" vs "12,432"). For dashboards, use the
  precision required for the task.
- **Icon Usage:** Use icons only if they help distinguish between different
  *categories* of metrics (e.g., a "Users" icon vs a "Revenue" icon). Don't use
  icons just for decoration.
- **Label Placement:** Top-aligned labels are better for scanning a grid of
  similar metrics; bottom-aligned labels are better for "Hero" stats where the
  number is the main attraction.

## Constraints

- **Accessibility:** Use `aria-label` to provide the full context (e.g.,
  "Revenue: 12,000 dollars, up 5% from last month"). Ensure color contrast for
  trend indicators meets WCAG AA (4.5:1).
- **Responsiveness:** Metric values must never overflow their containers. Use
  fluid typography or "shrink-to-fit" logic for very large numbers.
- **Consistency:** All metrics in a single group must use the same rounding,
  alignment, and trend style.

## Common Failure Patterns

- **The "Naked Number":** Displaying a value without a label or context,
  leaving the user guessing what it means.
- **Color Over-reliance:** Using only Red/Green to indicate trend without icons
  (↑/↓), making it inaccessible for colorblind users.
- **Hierarchy Flip:** Making the label larger or bolder than the value,
  slowing down the "scan and understand" process.
- **Metric Crowding:** Placing too many metrics in a single row, causing the
  numbers to bleed together.
- **Precision Overload:** Showing 4 decimal places on a marketing landing page,
  creating unnecessary cognitive load.

## Validation Criteria

- [ ] Every metric has a clear, visible label.
- [ ] Values use a distinct "Display" typography size (larger than body text).
- [ ] Trends (Up/Down) are indicated by BOTH color and an icon/symbol.
- [ ] Comparison context (e.g., timeframe) is explicitly stated.
- [ ] Semantic colors (Green/Red) are used only for valued changes.
- [ ] Grid layout maintains readability on mobile (no overflows).
- [ ] Accessibility: full context is available to screen readers via ARIA.
