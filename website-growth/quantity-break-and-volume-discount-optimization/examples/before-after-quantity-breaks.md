# Before & After Example: Quantity Break & Volume Discount Optimization

This document illustrates a realistic before-and-after optimization scenario for a Direct-to-Consumer (DTC) wellness & CPG beverage brand ("HydrateDaily") optimizing its Product Detail Page (PDP) quantity selector and cart drawer volume nudges.

---

## Brand Profile & Baseline Context

- **Brand:** HydrateDaily (DTC Electrolyte Powder Mix)
- **Product:** Daily Hydration Tub (30 Servings)
- **Standalone Retail Price:** $38.00 per tub
- **Unit COGS:** $7.20 per tub
- **Base Shipping & Pick/Pack:** $6.50 base order + $1.10 per additional unit
- **Baseline Monthly Traffic:** 65,000 PDP unique visitors
- **Baseline Conversion Rate:** 3.2% (2,080 monthly orders)
- **Baseline Units Per Transaction (UPT):** 1.12 units/order
- **Baseline Average Order Value (AOV):** $42.50 (including shipping revenue)
- **Baseline Net Contribution Margin per Order:** $18.60 profit/order

---

## BEFORE Optimization: Standard Dropdown Quantity Selector

### The Problem
The existing PDP used a standard HTML `<select>` dropdown for quantity choice next to a static "$38.00" price tag. There was no visual communication of multi-buy discounts, no per-unit pricing math, and no cart drawer volume prompts.

```text
+-----------------------------------------------------------------------+
|  [ Product Image ]       HydrateDaily Electrolyte Powder (30 Servings)|
|                          ★ ★ ★ ★ ☆ (1,240 Reviews)                    |
|                                                                       |
|                          $38.00                                       |
|                          Qty: [ 1 v ]                                 |
|                                                                       |
|                          [   ADD TO CART - $38.00   ]                 |
|                          [ Buy with Shop Pay        ]                 |
+-----------------------------------------------------------------------+
```

### Key Friction Points Identified in Audit
1. **Hidden Multi-Buy Option:** To buy 3 tubs, shoppers had to click the small Qty dropdown, select "3", and calculate the total in their heads. No discount was offered.
2. **Missing Per-Unit Anchoring:** The merchant actually had a volume discount rule configured in Shopify (buy 3 get 15% off), but it was hidden in a small bullet point text link under "Promo Details" below the fold.
3. **Default Single-Unit Purchase:** 92% of buyers simply clicked "Add to Cart" at Qty 1 because no alternative volume tier was visually anchored.
4. **Cart Drawer Dead-End:** Adding 1 tub opened a cart drawer showing "Subtotal: $38.00 + $5.99 Shipping". No prompt alerted the buyer that adding 1 or 2 more items would trigger volume savings and free shipping.

### Baseline Performance Metrics (BEFORE)

| Metric | Performance Value |
| :--- | :--- |
| **Units Per Transaction (UPT)** | 1.12 |
| **Average Order Value (AOV)** | $42.50 |
| **Monthly Orders** | 2,080 |
| **Total Units Sold** | 2,330 units |
| **Gross Monthly Revenue** | $88,400 |
| **Net Contribution Margin / Order** | $18.60 |
| **Total Monthly Contribution Profit** | **$38,688** |

---

## AFTER Optimization: 3-Tier Interactive Cards & Cart Volume Nudge

### The Solution Strategy
We replaced the plain dropdown with an interactive 3-Tier Quantity Break Selector on the PDP, featuring per-unit price dominance, pre-selected Tier 2 ("Most Popular"), savings badges, and a sliding volume progress bar in the mini-cart.

```text
+-----------------------------------------------------------------------+
|  [ Product Image ]       HydrateDaily Electrolyte Powder (30 Servings)|
|                          ★ ★ ★ ★ ★ (1,240 Reviews)                    |
|                                                                       |
|  SELECT YOUR QUANTITY & SAVE:                                         |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | ( ) 1 PACK                                   $38.00 / ea        |  |
|  |     30 Servings                              $38.00 Total       |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | [ MOST POPULAR ]                             SAVE 15% ($18)     |  |
|  | (*) 3 PACK                                   $32.30 / ea        |  |
|  |     90 Servings (3 Month Supply)             ~~$114~~ $96.90    |  |
|  |     + FREE SHIPPING UNLOCKED                                    |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | [ BEST VALUE ]                               SAVE 25% ($57)     |  |
|  | ( ) 6 PACK                                   $28.50 / ea        |  |
|  |     180 Servings (6 Month Supply)            ~~$228~~ $171.00   |  |
|  |     + FREE SHIPPING UNLOCKED                                    |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  Flavor Selection for 3-Pack:                                         |
|  Tub 1: [ Lemon Lime v ]  Tub 2: [ Berry Blast v ]  Tub 3: [ Citrus v]|
|                                                                       |
|  [   ADD 3-PACK TO CART - $96.90 (SAVE $17.10)   ]                   |
|                                                                       |
|  🔒 30-Day Money-Back Guarantee  •  🚚 Ships Next Business Day        |
+-----------------------------------------------------------------------+
```

### Dynamic Cart Drawer Progress Bar (AFTER)

When a user adds 1 Pack to the cart, the cart drawer slides out with an inline volume progress bar:

```text
+-----------------------------------------------------------------------+
|  YOUR CART (1 Item)                                               [X] |
|                                                                       |
|  [==================..........] Add 2 more to unlock 15% OFF!          |
|  🎉 You are 2 items away from FREE SHIPPING + 15% SAVINGS!           |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | [Img] HydrateDaily Tub (Lemon Lime)               $38.00        |  |
|  |       Qty: [- 1 +]  |  + Add 1 More & Save 15%                  |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  Subtotal: $38.00                                                     |
|  [   UPGRADE TO 3-PACK & SAVE $17.10 - CLICK HERE   ]               |
|  [   PROCEED TO CHECKOUT - $38.00                   ]               |
+-----------------------------------------------------------------------+
```

---

## Detailed Results & Performance Comparison

After conducting a 30-day split test against 50% of live traffic:

### Key Outcome Metrics Comparison

| Metric | BEFORE (Baseline) | AFTER (Optimized) | Relative Lift |
| :--- | :--- | :--- | :--- |
| **PDP-to-Cart Conversion Rate** | 3.20% | 3.42% | **+6.87%** |
| **Units Per Transaction (UPT)** | 1.12 | **2.28** | **+103.57%** |
| **Tier 1 (1-Pack) Adoption Rate** | 91.5% | 32.0% | -59.5 pts |
| **Tier 2 (3-Pack) Adoption Rate** | 6.5% | **54.0%** | **+47.5 pts** |
| **Tier 3 (6-Pack) Adoption Rate** | 2.0% | **14.0%** | **+12.0 pts** |
| **Average Order Value (AOV)** | $42.50 | **$88.40** | **+108.00%** |
| **Monthly Gross Revenue** | $88,400 | **$196,514** | **+122.30%** |
| **Net Profit / Order (Avg)** | $18.60 | **$38.25** | **+105.65%** |
| **Monthly Net Contribution Profit** | **$38,688** | **$85,029** | **+119.78%** |

---

## Unit Economics & Margin Safety Proof

To prove that the 15% and 25% discounts did not erode profit margins, let's examine the exact unit economics across all three tiers:

### Tier-by-Tier Contribution Profit Breakdown

1. **Tier 1 (1 Pack @ Full Price):**
   - Revenue: $38.00 + $5.99 Shipping = $43.99
   - COGS: $7.20
   - Shipping & Pick/Pack Cost: $6.50
   - **Net Contribution Profit:** $43.99 - $7.20 - $6.50 = **$30.29** (or $24.30 if free shipping promo applied).

2. **Tier 2 (3 Pack @ 15% Off - $96.90):**
   - Revenue: $96.90 (Free Shipping unlocked)
   - COGS ($7.20 x 3): $21.60
   - Shipping & Pick/Pack Cost ($6.50 base + $2.20 incremental pick): $8.70
   - **Net Contribution Profit:** $96.90 - $21.60 - $8.70 = **$66.60**
   - **Margin Safety Check:** Selling 3 units in one order yields **$66.60 profit**, whereas 3 separate 1-pack orders yield $30.29 x 3 = $90.87 gross, but require 3x shipping boxes. The net profit per customer interaction doubled with zero extra customer acquisition cost (CAC).

3. **Tier 3 (6 Pack @ 25% Off - $171.00):**
   - Revenue: $171.00 (Free Shipping unlocked)
   - COGS ($7.20 x 6): $43.20
   - Shipping & Pick/Pack Cost ($6.50 base + $5.50 incremental pick): $12.00
   - **Net Contribution Profit:** $171.00 - $43.20 - $12.00 = **$115.80**
   - **Margin Safety Check:** $115.80 contribution profit per transaction represents a **282% increase in net profit dollars** compared to a single-unit transaction.

---

## Key Takeaways & Lessons Learned

1. **Pre-selecting Tier 2 Drives Behavior:** Defaulting to the 3-Pack on page load anchored customer value at $96.90 rather than $38.00. Over 50% of buyers kept the default selection.
2. **Per-Unit Price Math Eliminates Hesitation:** Highlighting "$32.30 / ea" made the savings feel immediately tangible without forcing the buyer to calculate $114 - $96.90.
3. **Cart Nudge Saved 12% of Single-Unit Buyers:** Adding the dynamic volume bar inside the cart converted single-unit additions into 3-pack upgrades before checkout.
