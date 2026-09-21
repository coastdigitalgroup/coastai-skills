# Quantity Break and Volume Discount Optimization: Before & After Case Study

## Executive Summary

- **Brand:** Apex Nutrition (DTC Daily Electrolyte & Hydration Drink Mix)
- **Problem:** Low Average Order Value ($32.00 baseline) and single-unit order dominance (82% of orders were 1 single tub), resulting in high customer acquisition cost (CAC) payback friction and thin net margins after shipping ($6.50 flat fulfillment fee).
- **Solution:** Replaced a basic numeric `- 1 +` stepper with a high-converting 3-tier quantity break selector on the PDP, pre-selected Tier 2 ("Most Popular"), added bold per-unit price framing, and added a 1-click cart drawer volume upgrade nudge.
- **Key Results:**
  - **AOV Lift:** Increased from **$32.00 to $41.09** (+28.4% relative lift).
  - **Units Per Transaction (UPT):** Increased from **1.22 to 1.64 units** (+34.4% relative lift).
  - **Volume Tier Take Rate:** Multi-unit purchases surged from **18% to 44%** of total orders.
  - **Net Contribution Margin Dollars Per Order:** Increased from **$11.10 to $16.45** (+48.2% net profit dollar growth per order).

---

## Baseline State (Before Optimization)

### The Problem
Apex Nutrition sold a single 30-serving tub of electrolyte powder for $32.00. The PDP featured a standard dropdown quantity picker (`Qty: 1`) placed next to a single "Add to Cart" button.

```text
+-------------------------------------------------------------+
|  APEX ELECTROLYTES - 30 SERVINGS                            |
|  $32.00                                                     |
|                                                             |
|  Flavor: [ Lemon Lime  v ]                                  |
|                                                             |
|  Qty: [ 1 v ]    [ ADD TO CART - $32.00 ]                  |
+-------------------------------------------------------------+
```

### Key Failure Points
1. **Invisible Volume Discount:** Volume discounts were hidden in a text link below the Buy Box: *"Buying in bulk? Email us for wholesale rates."* Standard retail buyers had no idea that buying 2 or 3 tubs provided any savings.
2. **High Shipping Amortization Overhead:** Every single-tub order cost $6.50 to pick, pack, and ship via USPS First Class. On a $32 order with $6.40 COGS, net contribution margin before ad spend was only $11.10 ($32.00 - $6.40 - $6.50 - $1.00 merchant fee - $7.00 ad CAC = $11.10 net profit).
3. **Single-Unit Dominance:** 82% of buyers ordered only 1 tub, assuming 1 tub was the standard single option.

---

## Optimized State (After Optimization)

### The Solution
Reengineered the Buy Box with a high-impact, visual 3-tier quantity break selector, bold per-unit pricing, pre-selected defaults, and a cart drawer upgrade prompt.

#### 1. PDP Quantity Break Selector Interface

```text
+-----------------------------------------------------------------+
|  APEX ELECTROLYTES - DAILY HYDRATION MIX                        |
|                                                                 |
|  SELECT QUANTITY & SAVE:                                        |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  | ( ) 1 BOTTLE                                  $32.00/ea   |  |
|  |     Standard Single Pack - $32.00 Total                   |  |
|  +-----------------------------------------------------------+  |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  | (•) 2 BOTTLES               [ MOST POPULAR ]  $26.00/ea   |  |
|  |     Save 18.7% ($12.00 OFF) - $52.00 Total                |  |
|  |     [ Free Express Shipping Included ]                    |  |
|  +-----------------------------------------------------------+  |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  | ( ) 3 BOTTLES                 [ BEST VALUE ]  $22.00/ea   |  |
|  |     Save 31.2% ($30.00 OFF) - $66.00 Total                |  |
|  |     [ Free Express Shipping + Free Shaker Cup ]           |  |
|  +-----------------------------------------------------------+  |
|                                                                 |
|  Select Flavors for your 2 Bottles:                             |
|  Bottle 1: [ Lemon Lime  v ]   Bottle 2: [ Fruit Punch  v ]    |
|                                                                 |
|  [ ADD 2 BOTTLES TO CART - $52.00 ]                             |
+-----------------------------------------------------------------+
```

#### 2. Cart Drawer Upgrade Nudge
When a customer selects 1 bottle and clicks "Add to Cart", the slide-out cart drawer displays an inline volume upgrade card:

```text
+-----------------------------------------------------------------+
| YOUR CART (1 Item)                                              |
|-----------------------------------------------------------------|
| [PROGRESS BAR: ======>                  ]                       |
| Add 1 more bottle to unlock FREE SHIPPING & 18.7% OFF!         |
|-----------------------------------------------------------------|
| [Image] Apex Electrolytes - Lemon Lime            $32.00        |
|         Qty: [ - 1 + ]                                          |
|                                                                 |
| +-------------------------------------------------------------+ |
| | 🎁 SPECIAL UPGRADE OFFER:                                   | |
| | Add a 2nd bottle for just $20.00 more ($26.00/ea total)     | |
| | [ + ADD 2ND BOTTLE & SAVE $12.00 ]                          | |
| +-------------------------------------------------------------+ |
|                                                                 |
| SUBTOTAL: $32.00                                                |
| [ CHECKOUT ]                                                    |
+-----------------------------------------------------------------+
```

---

## Quantitative Results & Impact

| Metric | Before (Baseline) | After (Optimized) | Absolute Change | Relative Lift |
| :--- | :--- | :--- | :--- | :--- |
| **Average Order Value (AOV)** | $32.00 | $41.09 | +$9.09 | **+28.4%** |
| **Units Per Transaction (UPT)** | 1.22 | 1.64 | +0.42 units | **+34.4%** |
| **Multi-Unit Take Rate** | 18.0% | 44.0% | +26.0% pts | **+144.4%** |
| **Tier 1 (1 Pack) Share** | 82.0% | 56.0% | -26.0% pts | -31.7% |
| **Tier 2 (2 Pack) Share** | 14.0% | 32.0% | +18.0% pts | **+128.6%** |
| **Tier 3 (3 Pack) Share** | 4.0% | 12.0% | +8.0% pts | **+200.0%** |
| **PDP Add-to-Cart Rate** | 6.2% | 6.5% | +0.3% pts | **+4.8%** |
| **Avg Net Profit / Order** | $11.10 | $16.45 | +$5.35 | **+48.2%** |

### Financial & Margin Mechanics
- **Tier 1 (1 Pack):** $32.00 Revenue - $6.40 COGS - $6.50 Shipping = **$19.10 Gross Profit** (59.7% margin)
- **Tier 2 (2 Pack):** $52.00 Revenue - $12.80 COGS - $7.20 Shipping = **$32.00 Gross Profit** (61.5% margin) -> **+$12.90 additional profit dollars!**
- **Tier 3 (3 Pack):** $66.00 Revenue - $19.20 COGS - $8.10 Shipping = **$38.70 Gross Profit** (58.6% margin) -> **+$19.60 additional profit dollars!**

By shifting 26% of buyers from Tier 1 to Tier 2/3, Apex Nutrition increased net profit dollars per order by **48.2%**, allowing them to scale paid ad spend aggressively while increasing customer retention and LTV.
