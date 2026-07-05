# Reference: Comparison Matrix UI Patterns

This reference covers common visual patterns used to represent data within comparison matrices, ensuring clarity and consistency across complex datasets.

## 1. Visualizing Feature Inclusion (Booleans)

The most common comparison type is "Does it have this feature?"

| Pattern | Best For | Visual Treatment |
| :--- | :--- | :--- |
| **Checkmark & Empty** | Quick scanning of premium features. | ✓ (Green/High Contrast) vs. [Empty Cell] |
| **Checkmark & Dash** | High-density technical specs. | ✓ vs. — (Neutral/Muted) |
| **Checkmark & Text** | When "No" needs explanation. | ✓ vs. "Optional" or "Add-on" |

## 2. Visualizing Qualitative Data (Ratings)

| Pattern | Best For | Visual Treatment |
| :--- | :--- | :--- |
| **Star Rating** | Consumer-grade sentiment. | 5-star scale, gold active stars. |
| **Numbered Score** | Technical benchmarking (e.g., DxOMark). | Large bold number (e.g., **84/100**) |
| **Semantic Labels** | Simple quality tiers. | "Excellent," "Good," "Basic" |

## 3. Visualizing Capacity and Limits

| Pattern | Best For | Visual Treatment |
| :--- | :--- | :--- |
| **Bar/Progress** | Relative performance (e.g., Battery life). | Horizontal progress bar within the cell. |
| **Comparison Text** | Strict technical limits. | e.g., "Up to 10 Users" vs "Unlimited" |
| **Tiered Badges** | Performance categories. | "Gold," "Silver," "Bronze" badges. |

## 4. Visualizing Action/Conversion

Matrices often end with a call to action.

| Pattern | Best For | Visual Treatment |
| :--- | :--- | :--- |
| **Primary Button** | Direct "Buy Now" conversion. | High-contrast button in the bottom row. |
| **Text Link** | Deep-dive research. | "Full Specs" or "Compare Detail" link. |
| **Icon Link** | Secondary actions. | Shopping cart icon or "Save" heart. |

## 5. Layout and Spacing Heuristics

- **Column Width:** Keep all data columns (Items) the same width to ensure a fair visual comparison.
- **Leading Column Width:** The Attribute column should be ~20–30% wider than data columns to accommodate text labels.
- **Cell Vertical Alignment:** Align all content to the `middle` or `top`. Avoid `bottom` alignment as it makes headers hard to read.
- **Row Separation:** Use subtle borders (`1px solid var(--color-neutral-200)`) between rows to help the eye track horizontally.
