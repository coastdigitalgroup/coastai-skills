# Numerical Visual Standards

This reference defines the visual and accessibility standards for formatting and presenting numerical data within the **Metric and Statistic System**.

---

## 1. Unit Alignment and Placement

Consistency in unit placement reduces cognitive load and ensures that numbers are compared accurately.

| Data Type | Symbol | Position | Example |
| :--- | :--- | :--- | :--- |
| **Currency** | $, £, € | Prefix | $1,200 |
| **Percentage** | % | Suffix | 42% |
| **Time (ms)** | ms | Suffix | 120ms |
| **Weight/Measure** | kg, m, lb | Suffix | 15kg |
| **Counts** | - | - | 1,240 |

**Rule:** Prefixes ($) should usually be the same size and weight as the digits. Suffixes (%) may be slightly smaller (e.g., 80% of the value font size) to emphasize the primary number.

---

## 2. Abbreviation and Rounding Matrix

Use abbreviations to maintain layout integrity in high-density views.

| Value Range | Format | Example | Use Case |
| :--- | :--- | :--- | :--- |
| **< 1,000** | Raw | 842 | Precise counts. |
| **1,000 - 999,999** | "k" | 12.5k | Standard summaries. |
| **1,000,000+** | "M" | 1.2M | Large scale impact. |
| **1,000,000,000+** | "B" | 4.2B | Market scale. |

**Rounding Guidelines:**
- **High-Level Summaries:** Round to the nearest whole number or 1 decimal place (e.g., 4.2k).
- **Financial Balances:** Show 2 decimal places ($1,240.50).
- **Growth/Trends:** Always show at least 1 decimal place (+12.4%) to show movement.

---

## 3. Semantic Color Mapping

Color should always reflect the **Sentiment** of the data, not just the direction of change.

| Sentiment | Color Token | Context Examples |
| :--- | :--- | :--- |
| **Positive** | `success-700` | Revenue Increase, Churn Decrease, Speed Increase. |
| **Negative** | `error-700` | Revenue Decrease, Churn Increase, Error Rate Increase. |
| **Informational** | `info-700` | New Registrations (Neutral), Current Inventory. |
| **Warning** | `warning-700` | Nearing Limit, Moderate Latency. |

---

## 4. Accessibility Checkpoints

1. **Non-Color Indicators:** Never rely on color alone (Red/Green) to indicate a trend. Always include an icon (Arrow Up/Down) or a plus/minus sign.
2. **Tabular Figures:** Use `font-variant-numeric: tabular-nums` to ensure that numbers don't "jump" or misalign when values change (e.g., '1' and '8' should occupy the same width).
3. **Screen Reader Context:** Use `aria-label` or `sr-only` text for trend indicators.
   - *Bad:* `+12%` (Screen reader says "plus twelve percent").
   - *Good:* `+12% <span class="sr-only">increase from last month</span>`.
4. **Contrast:** Trend pills with light backgrounds must ensure the text inside meets the 4.5:1 ratio against the pill color.
