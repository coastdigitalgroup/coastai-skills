# Metric Composition Breakdown

This example demonstrates the application of the **Metric and Statistic System** to two common scenarios: a high-density SaaS dashboard KPI and a high-impact marketing social proof stat.

---

## 1. SaaS Dashboard KPI (The Performance Metric)

In this scenario, a user needs to quickly assess the health of their business. The design prioritizes the current value while providing context for trend and comparison.

### Layout Breakdown

- **Container:** A 1:1 or 4:3 ratio card with subtle borders (from `card-ui-system`).
- **Header:** The Label ("Monthly Recurring Revenue") in `neutral-500`, 12px, Uppercase.
- **Primary Value:** The metric ("$42,850") in `neutral-900`, 32px, Bold, using Tabular Figures (monospaced digits).
- **Trend Indicator:** A "Success" pill containing a "Up Arrow" icon and "+12.4%" text in `green-700` background.
- **Comparison Text:** Muted text ("vs. last month") sitting next to the trend pill.

### Design Decisions

- **Precision:** Dollars are shown with commas but no decimals to reduce visual noise in a high-level summary.
- **Color Logic:** The trend is green because revenue growth is positive sentiment.
- **Proximity:** The Label is at the top left, and the Value is centered vertically to anchor the card.

---

## 2. Marketing Social Proof (The Impact Metric)

In this scenario, the goal is to build trust with a prospective customer. The design uses scale and simplicity to convey a sense of magnitude.

### Layout Breakdown

- **Context:** A full-width section with three centered columns (from `section-composition-system`).
- **Primary Value:** A massive number ("10k+") in the brand's primary color, 64px, Extra Bold.
- **Label:** Large, readable text ("Active Customers") in `neutral-700`, 20px, Medium.
- **Supporting Detail:** A smaller line below ("Across 40+ countries") to add depth to the claim.

### Design Decisions

- **Abbreviation:** "10,000" is converted to "10k+" to make the number feel more like a milestone and less like a precise (and potentially stale) count.
- **Hierarchy:** The number is 3x the size of the label, ensuring it is the first thing a user sees while scanning.
- **No Trend:** For social proof, the absolute magnitude is more important than the week-over-week change, so trend indicators are omitted to keep the focus on the total.

---

## Responsive Adaptation

- **Desktop:** Stats are arranged in a 3-column or 4-column grid.
- **Tablet:** Stats shift to a 2-column grid.
- **Mobile:** Stats stack vertically. The font size of the "Impact Metric" (Scenario 2) scales down from 64px to 48px to fit the narrower viewport without wrapping.
