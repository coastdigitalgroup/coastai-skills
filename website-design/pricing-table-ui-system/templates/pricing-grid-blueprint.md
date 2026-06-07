# Template: Pricing Grid Blueprint

Use this structural blueprint to organize the elements of a tiered pricing
interface. This template ensures that all critical components are accounted for
and follow the recommended visual hierarchy.

## 1. Global Controls (Above the Grid)

- **Headline:** e.g., "Plans for every stage of growth." (H2)
- **Subheadline:** e.g., "Choose a plan that fits your needs. Scale as you go."
- **Billing Switch:**
  - Label Left: "Monthly"
  - Input: Toggle Switch / Segmented Control
  - Label Right: "Yearly"
  - Discount Badge: "(Save 20%)"

## 2. Pricing Card Anatomy (The Tier)

Apply this structure to each card in the grid:

| Zone | Element | Description |
| :--- | :--- | :--- |
| **Top** | Badge | Optional: "Most Popular," "New," or "Best Value." |
| **Header** | Tier Name | e.g., "Starter," "Professional," "Enterprise." (H3) |
| | Description | 1-2 sentences on who this plan is for. |
| **Price** | Currency | e.g., "$" or "€" |
| | Amount | Large, bold numeric value (H2/H1 scale). |
| | Interval | e.g., "/mo" or "/year" |
| | Billing Detail | e.g., "Billed annually" (Muted text). |
| **CTA** | Action Button | e.g., "Get Started," "Start Free Trial," "Contact Us." |
| **Features** | List Header | e.g., "Everything in [Previous Plan], plus:" |
| | Feature Items | 5-7 bullet points with checkmark icons. |
| **Footer** | Secondary Link | Optional: "See all features" link to comparison table. |

## 3. The Comparison Matrix (Below the Grid)

For complex products, follow the grid with a detailed comparison table:

- **Rows:** Grouped by feature category (e.g., "Security," "Support," "Usage").
- **Columns:** Plan names (Sticky headers for long tables).
- **Cells:** Use clear "Yes/No" icons or specific numeric limits.

## 4. Annotation Key for Designers/Developers

- **`[A]` Highlighted Tier:** Apply border-color: `--color-primary` and
  box-shadow: `--shadow-lg`.
- **`[B]` CTA Alignment:** Use `margin-top: auto` on the CTA container to
  align all buttons to the bottom of the grid row.
- **`[C]` Price Transition:** Use CSS `transition` or a library like Framer
  Motion to animate price changes when the toggle is clicked.
- **`[D]` Mobile Stacking:** Use `flex-direction: column` at the `--breakpoint-sm`
  media query.
