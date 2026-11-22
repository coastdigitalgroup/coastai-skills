# Quantity Break & Volume Discount Heuristics & Behavioral Rules

A reference guide on behavioral pricing psychology, framing heuristics, tier architecture principles, and margin optimization rules for volume discount systems.

---

## 1. Behavioral Economics & Persuasion Principles

### A. The Unit Price Effect & Mental Math Reduction
- **Heuristic:** Consumers struggle with complex division during online shopping. When presented with `3 for $75`, shoppers estimate per-unit cost slowly and inaccurately.
- **Action:** Always calculate and display the per-unit price (`$25.00 / ea`) as the primary visual hero text. Display the gross total (`Total $75.00`) in smaller, secondary font.

### B. Default Bias & Option Anchoring
- **Heuristic:** Shoppers default to pre-selected UI options. A blank quantity dropdown yields single-unit defaults (1 unit).
- **Action:** Pre-select Tier 2 (the 2-unit target tier) by default on PDP load, accompanied by a visual anchor pill badge (`MOST POPULAR` or `CUSTOMER FAVORITE`).

### C. The Paradox of Choice & Cognitive Load
- **Heuristic:** Presenting more than 3–4 price choices causes decision paralysis, reducing overall Add-To-Cart conversion rate.
- **Action:** Cap PDP quantity break option cards at **3 tiers maximum**:
  - *Tier 1:* Single Unit (Baseline / Anchor)
  - *Tier 2:* Double Unit (Target / Most Popular)
  - *Tier 3:* Triple/Quad Unit + Perk (Best Value / Free Gift)

### D. Goal Gradient Effect (Cart Drawer Nudges)
- **Heuristic:** Humans accelerate effort as they approach a goal or reward threshold.
- **Action:** Display a visual progress bar in the cart showing exact distance to the next unlocked tier (e.g., `You are 1 item away from 20% OFF!`).

---

## 2. Quantity Tier Architecture & Spacing Rules

| Product Price Range | Ideal Tier Spacing | Example Tiers | Per-Unit Savings Target |
| :--- | :--- | :--- | :--- |
| **Low-Ticket (<$25 MSRP)** | 1, 3, 5 Units | 1 Box, 3 Boxes, 5 Boxes | Tier 2: 15% off / Tier 3: 25% off |
| **Mid-Ticket ($25–$75 MSRP)** | 1, 2, 3 Units | 1 Unit, 2 Units, 3 Units | Tier 2: 20% off / Tier 3: 30% off |
| **High-Ticket ($75–$200 MSRP)** | 1, 2 Units | 1 Unit, 2 Units (+ Gift) | Tier 2: 15% off + Free Express Shipping |
| **B2B / Bulk Wholesale** | Tier Ranges | 1–49, 50–199, 200+ Units | Step-down matrix: 10%, 20%, 35% off |

---

## 3. Contribution Margin Protection Rules

To prevent volume discounts from eroding net profit dollars:

1. **Fulfillment Cost Dilution Floor:**
   - Total volume discount dollars granted at Tier $N$ must be $\le$ (Fulfillment savings of shipping $N$ units together + $0.5 \times \text{Gross Margin Expansion Dollars}$).
2. **Never Discount Gross Margin Below 50%:**
   - If single-unit gross margin is 70%, the max allowable discount across all volume tiers is 35% off MSRP.
3. **Avoid Over-Discounting Low Quantities:**
   - Never offer a 20%+ discount on Tier 1 (1 unit). Tier 1 must remain full MSRP to preserve the anchor ratio.

---

## 4. UI/UX Hierarchy Matrix for Quantity Break Cards

```text
+-----------------------------------------------------------------------+
|  [BAD] Lump-Sum Display              [GOOD] Per-Unit Hero Display     |
+-----------------------------------------------------------------------+
|  Buy 3 for $60.00                    $20.00 / ea  (SAVE 33%)          |
|  (User must divide 60 by 3)          Total: $60.00  Was $90.00         |
|                                      [ BEST VALUE BADGE ]             |
+-----------------------------------------------------------------------+
```

### Visual Priority Rules
1. **Primary Focus (20pt+ Bold):** Discounted Per-Unit Rate (`$20.00 / ea`).
2. **Badge Callout (12pt Bold Pill):** Percentage Savings (`SAVE 33%` or `SAVE $30`).
3. **Secondary Detail (14pt Regular):** Total Price (`Total: $60.00`) and Strikethrough MSRP (`Was $90.00`).
4. **Tertiary Bonus (12pt Italic):** Add-on incentives (`+ Free Shipping & Shaker`).
