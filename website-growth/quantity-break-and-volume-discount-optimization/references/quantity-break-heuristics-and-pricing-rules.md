# Quantity Break & Volume Discount Heuristics & Pricing Rules

A reference guide on behavioural psychology, unit economic modeling, tier interval rules, framing heuristics, and UX principles for multi-buy volume optimization.

---

## 1. Behavioral Psychology & Pricing Framing

### A. Per-Unit Cost vs. Total Bundle Cost Framing
- **The Rule:** Always lead with the broken-down **Per-Unit Price** (e.g., `$18 / bottle`) in primary, bold typography while rendering the total bundle price (e.g., `$54 total`) in secondary typography.
- **Why It Works:** Cognitive friction increases proportionally with price magnitude. High total prices (e.g., `$108`) trigger spending pain centers in the brain. Breaking down the cost to per-unit equivalents taps into the single-unit mental anchor, making the multi-unit purchase feel like an extraordinary bargain.

### B. The Decoy Effect & Tier Positioning
- **The Rule:** Structure three distinct pricing tiers where Tier 2 (e.g., Buy 2 / Save 10%) acts as a psychological decoy designed to make Tier 3 (e.g., Buy 3 / Save 25% + Free Shipping) appear overwhelmingly superior in value.
- **Why It Works:** Consumers struggle to evaluate value in isolation. By introducing a middle tier with modest savings, Tier 3 becomes an obvious "no-brainer" upgrade choice.

### C. Absolute Dollar Savings vs. Percentage Off
- **The Rule of 100:**
  - For items/bundles under $100 total, **Percentage Off** framing (`SAVE 25%`) drives stronger perceived value.
  - For items/bundles over $100 total, **Absolute Dollar Savings** framing (`SAVE $45 TODAY`) drives stronger perceived value.
- **Hybrid Framing:** Whenever space permits on PDP quantity break cards, combine percentage and dollar savings badges (e.g., `SAVE 25% ($27 OFF)`).

### D. Default Pre-Selection Bias
- **The Rule:** Never default a quantity break selector to Tier 1 (Single Unit). Always pre-select Tier 2 ("Most Popular") or Tier 3 ("Best Value").
- **Why It Works:** Choice architecture heavily influences decisions. Users perceive pre-selected options as expert recommendations, creating positive friction against downgrading to single units.

---

## 2. Unit Economic Modeling & Margin Protection Rules

### A. Contribution Margin Safety Formula
Before launching volume discounts, model the net contribution margin dollar across all volume tiers to ensure multi-unit orders never dilute profitability.

$$\text{Net Contribution Margin (\$)} = \text{Order Revenue} - \text{COGS} - \text{Fulfillment Costs} - \text{Gateway Fees} - \text{Discount Amount}$$

Where:
- $\text{Order Revenue} = \text{Tier Price}$.
- $\text{Fulfillment Costs} = \text{Base Pick/Pack/Shipping Fee} + (\text{Additional Unit Fee} \times (\text{Quantity} - 1))$.
- $\text{Gateway Fees} = (\text{Order Revenue} \times \text{Processing Rate}) + \text{Fixed Transaction Fee}$.

### B. The Equal-or-Greater Margin Dollar Rule
**Rule:** A 3-unit volume order MUST produce equal or higher net contribution margin dollars than a single-unit order, even if the net contribution margin percentage drops.

*Example:*
- **Single Unit:** $36 Revenue - $6 COGS - $7 Shipping - $1 Gateway = **$22 Net Margin $** (61% margin).
- **3-Unit Bundle (25% Off):** $81 Revenue - $18 COGS - $9 Shipping - $2.40 Gateway = **$51.60 Net Margin $** (63.7% margin).
- *Result:* Total contribution dollars increase from $22 to $51.60 per transaction (+134.5%).

---

## 3. Tier Interval & Gap Guidelines

### Recommended Tier Intervals by Category

| Category | Recommended Tier Structure | Target Savings Gap | Primary Incentive Badge |
| :--- | :--- | :--- | :--- |
| **Consumables / Supplements** | 1 Bottle / 2 Bottles / 3 Bottles | Tier 1: 0% \| Tier 2: 15% \| Tier 3: 25% | Free Shipping + Best Value Badge |
| **Food & Beverage (Canned/Packaged)** | 6-Pack / 12-Pack / 24-Pack | Tier 1: 0% \| Tier 2: 12% \| Tier 3: 20% | Per-Can Price Breakdown |
| **Apparel & Basics (Socks, Tees)** | 1 Pair / 3-Pack / 6-Pack | Tier 1: 0% \| Tier 2: 15% \| Tier 3: 30% | "Stock Up & Save" Badge |
| **B2B Wholesale / Office Supplies** | 1-9 Units / 10-49 Units / 50-99 Units / 100+ Units | Tier 1: 0% \| Tier 2: 10% \| Tier 3: 18% \| Tier 4: 25% | Commercial Volume Matrix Grid |

---

## 4. Mobile Responsiveness & UX Heuristics

1. **Touch-Target Proportions:** Ensure each tier card has a minimum height of 64px and full-width tapping bounds across screen viewports < 768px.
2. **Visual Hierarchy Stack:**
   - Top Right: Highlight Badge (`MOST POPULAR`).
   - Left: Radio Button + Tier Name + Quantity Label.
   - Right Top: Calculated Per-Unit Price (`$27.00/ea`).
   - Right Bottom: Total Bundle Price + Savings Badge (`$81.00 - SAVE $27`).
3. **Cart Drawer Nudge Microcopy:** Use urgency-free, value-focused nudges in cart drawer progress bars:
   - *Good:* "Add 1 more to unlock 25% OFF + FREE SHIPPING!"
   - *Bad:* "Hurry! Add 1 more before stock runs out!" (creates anxiety instead of value perception).
