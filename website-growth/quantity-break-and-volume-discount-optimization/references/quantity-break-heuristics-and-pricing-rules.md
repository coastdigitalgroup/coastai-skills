# Quantity Break UX Heuristics & Pricing Psychology Reference

This reference guide outlines the core behavioral economics principles, pricing psychology heuristics, and design rules that drive high-converting volume discount and quantity break selectors.

---

## 1. Behavioral Economics Principles for Multi-Unit Purchasing

### A. Price Anchoring & Preference Framing
When consumers view a single price point (e.g., `$38.00`), their decision framework is binary: *"Do I buy this or not?"*

When presented with 3 quantity break options (`1 for $38`, `3 for $91.20`, `6 for $148.20`), the decision framework transforms from binary purchasing to **comparative value optimization**: *"Which option offers the best deal?"*

- **The Goldilocks Effect (Center-Stage Attraction):** When 3 tiers are displayed, consumers naturally gravitated toward the middle tier (Tier 2). Pre-selecting Tier 2 with a `MOST POPULAR` badge captures **35%–50% of total conversions**.
- **Per-Unit Price Priming:** Consumers naturally compare single-unit utility. Highlighting the per-unit price (`$30.40 / bottle`) rather than package total (`$91.20`) reduces perceived price friction by replacing large absolute numbers with small, relatable unit costs.

### B. Unit Price vs. Percentage Savings Framing

| Discount Magnitude | Recommended Framing Strategy | Psychological Mechanism | Example |
| :--- | :--- | :--- | :--- |
| **Small Discount (<15%)** | Dollar Savings + Free Shipping | Small percentage figures (e.g., "10% off") feel negligible to buyers. Dollar savings feel tangible. | *"Save $8.00 + Free Shipping"* |
| **Moderate Discount (15% - 30%)** | Per-Unit Price + Percentage Badge | Per-unit price demonstrates clear item value; percentage badge validates the tier choice. | **"$30.40 / ea — Save 20%"** |
| **Deep Discount (30%+)** | Total Dollar Savings in High Contrast | Large absolute dollar savings trigger strong loss-aversion fear of missing out. | **"SAVE $79.80 TOTAL"** |

---

## 2. Supply Horizon Translation Heuristic

Consumers struggle to estimate how many units they need over time. Translating raw item counts into **usage timeframes** lowers hesitation and builds trust.

### Recommended Horizon Microcopy Mappings:

- **1 Unit:** `30-Day Supply` or `Single Pack (Trial)`
- **3 Units:** `90-Day Supply` or `3-Month Stockup`
- **6 Units:** `180-Day Supply` or `6-Month Family Value Pack`

*Rule:* Always place the supply horizon descriptor in secondary text directly alongside or under the quantity title (e.g., `3 Tubs — 90-Day Supply`).

---

## 3. Cart Drawer & Mini-Cart Nudge Heuristics

### A. The "Goal-Gradient" Effect
In behavioral science, the **Goal-Gradient Effect** states that humans accelerate their effort as they get closer to completing a goal.

- Displaying a progress bar at **66% completion** (e.g., *"2 of 3 items added — Add 1 more to unlock 20% off!"*) triggers a strong psychological urge to complete the progress bar.

### B. The Single-Click Upgrade Rule
Never force a user to close the cart drawer, navigate back to the PDP, and re-add a higher quantity tier.

- The cart drawer progress banner MUST feature an inline **`[ + Add 1 More ]`** button that dynamically updates the cart state in-place using AJAX/Fetch without triggering a page reload.

---

## 4. Margin Guardrails & Pricing Math Rules

### The Contribution Margin Expansion Check
Volume discounting must always protect or expand total net profit dollars. Follow this mathematical rule when setting tier prices:

$$\text{Net Margin Dollars}_{\text{Tier 2}} \ge 1.8 \times \text{Net Margin Dollars}_{\text{Tier 1}}$$

$$\text{Net Margin Dollars}_{\text{Tier 3}} \ge 1.5 \times \text{Net Margin Dollars}_{\text{Tier 2}}$$

### Fixed vs. Variable Fulfillment Logistics
A major source of profit expansion in volume discounts comes from **logistics efficiencies**:

1. **Fixed Pick & Pack Overhead:** Packing 3 bottles into a single box takes almost the same warehouse labor time as packing 1 bottle.
2. **Dimensional Weight Brackets:** Carrier shipping rates (USPS, FedEx, UPS) operate on weight brackets (e.g., 0–1 lb, 1–3 lbs). Moving from 1 unit (0.8 lbs) to 3 units (2.4 lbs) increases shipping cost by only 15–25%, while revenue increases by 200%+.
3. **CAC Amortization:** The customer acquisition cost (CAC) spent to acquire the customer session is fixed regardless of order size. Higher AOV directly increases Return on Ad Spend (ROAS).
