# Chart Specification & Annotation Template

Use this template to document the design requirements for a data visualization component. This ensures that developers implement the chart with full awareness of accessibility, responsiveness, and data integrity.

## 1. General Metadata
- **Chart Name:** [e.g., Annual Revenue Trend]
- **Data Source:** [e.g., Finance API / Monthly Stats]
- **Refresh Frequency:** [e.g., Real-time / Daily / Static]

## 2. Visual Foundation
- **Chart Type:** [Line / Bar / Column / Donut / etc.]
- **Aspect Ratio:** [e.g., 16:9 Desktop / 1:1 Mobile]
- **Baseline:** [Y-axis must start at 0? Yes/No]
- **Gridlines:** [Horizontal / Vertical / None]

## 3. Data Series Specification
| Series Name | Color Token | Secondary Encoding | Label Style |
| :--- | :--- | :--- | :--- |
| [Series A] | [var(--color-viz-1)] | [Solid Line] | [Direct] |
| [Series B] | [var(--color-viz-2)] | [Dashed Line] | [Legend] |

## 4. Axis & Labeling
- **X-Axis Label:** [e.g., Month]
- **X-Axis Range:** [e.g., Last 12 months]
- **Y-Axis Label:** [e.g., USD ($)]
- **Y-Axis Format:** [e.g., Currency, 0 decimals]

## 5. Interaction & Tooltips
- **Hover State:** [e.g., Dim other series to 30% opacity]
- **Tooltip Content:**
    - Line 1: [Series Name]
    - Line 2: [Value] + [Unit]
    - Line 3: [Comparison/Delta]
- **Click Action:** [e.g., Navigate to Detail Page / Filter Dashboard]

## 6. Responsive Adaptation
- **Tablet (768px):** [e.g., Hide gridlines, reduce X-axis tick frequency]
- **Mobile (375px):** [e.g., Convert to Vertical Bar chart / Show only latest 5 data points]

## 7. Accessibility Checklist
- [ ] **Contrast:** All data points meet 3:1 contrast against background.
- [ ] **Alt Text:** `aria-label` provided: "Line chart showing [Data] from [Start] to [End]."
- [ ] **Data Table:** Accessible <table> provided as fallback? [Yes/No]
- [ ] **Focus:** Keyboard navigation allows tabbing through [X] data points.
