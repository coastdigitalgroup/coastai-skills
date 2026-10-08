# Quantity Break Optimization: Before-and-After Case Study

## Executive Summary

- **Client Category:** DTC Hydration & Electrolyte Supplement Brand (*HydroPulse*)
- **Core Challenge:** High paid acquisition costs ($38 CAC) resulted in slim net profitability on single-bag orders ($34 MSRP). Over 78% of customers purchased only 1 bag per transaction, yielding an Average Order Value (AOV) of $38.50 (after shipping).
- **Optimization Strategy:** Implemented a 3-tier PDP quantity break selector with per-unit price framing, default tier anchoring ("Most Popular"), mix-and-match flavor selection, and a dynamic cart drawer progress nudge.
- **Key Outcome:**
  - **AOV:** Increased from **$38.50** to **$52.10** (**+35.3% lift**).
  - **Units Per Transaction (UPT):** Increased from **1.18 units** to **1.82 units** (**+54.2% lift**).
  - **Contribution Margin Per Order:** Expanded from **$8.20** to **$17.40** (**+112.2% net profit growth**).

---

## Before: Standard Quantity Dropdown (Control)

### PDP Layout
- **Price Display:** `$34.00`
- **Quantity Selector:** Standard native `<select>` HTML dropdown (`1`, `2`, `3`, `4`, `5`).
- **Cart Experience:** Adding 2 bags showed `$68.00` in the slide-out cart. No bulk discount or multi-buy savings were advertised or calculated anywhere on the PDP or in the cart drawer.

```text
[ Product Image ]        HydroPulse Electrolyte Mix - 30 Servings
                         $34.00

                         Flavor: [ Lemon Lime  v ]
                         Quantity: [ 1  v ]

                         [ ADD TO CART - $34.00 ]
```

### Conversion & Profitability Bottlenecks
1. **Zero Multi-Unit Incentive:** Customers had no financial reason to purchase more than 1 bag per order.
2. **Fulfillment Cost Inefficiency:** Shipping 1 bag cost HydroPulse $5.80 in postage + $2.10 in pick/pack fees ($7.90 total fulfillment). On a $34 order with $38 CAC (blended across organic/paid), 1-unit orders lost money on first transaction.
3. **High Friction Multi-Selection:** Changing flavor required adding 1 Lemon Lime bag, navigating back, selecting Berry, and adding a second bag.

---

## After: Optimized 3-Tier Quantity Break Experience (Treatment)

### PDP Merchandising & Option Cards

Implemented 3 interactive visual cards placed directly above the Add-To-Cart button:

```text
[ Product Image ]        HydroPulse Electrolyte Mix - 30 Servings

                         SELECT QUANTITY & SAVE
                         +---------------------------------------------------+
                         | [ ] 1 BAG (30 Servings)                           |
                         |     $34.00 / bag ($1.13/serving)                 |
                         +---------------------------------------------------+
                         | [*] 2 BAGS (60 Servings)      [ MOST POPULAR ]    |
                         |     $27.20 / bag ($0.90/serving)  -- SAVE 20%     |
                         |     Total: $54.40  (Was $68.00)                    |
                         |     Select Flavors: [ Lemon Lime ] [ Berry ]      |
                         +---------------------------------------------------+
                         | [ ] 3 BAGS + FREE SHAKER      [ BEST VALUE ]      |
                         |     $23.80 / bag ($0.79/serving)  -- SAVE 30%     |
                         |     Total: $71.40  (Was $102.00)                   |
                         |     + FREE HydroBottle ($15 Value)                |
                         +---------------------------------------------------+

                         [ ADD 2 BAGS TO CART - $54.40 (SAVE $13.60) ]
```

### Cart Drawer Progress Nudge Integration

When a customer selected Tier 1 (1 Bag) on PDP, the Cart Drawer displayed an interactive progress banner:

```text
+-------------------------------------------------------------------+
| CART DRAWER                                                       |
|                                                                   |
| [========================......] 1/2 Bags                         |
| ADD 1 MORE BAG TO UNLOCK 20% OFF YOUR ORDER! (SAVES $13.60)       |
| [+ Add 2nd Bag for $20.40]                                        |
|                                                                   |
| HydroPulse - Lemon Lime (x1)                          $34.00      |
| Subtotal:                                             $34.00      |
|                                                                   |
| [ CHECKOUT - $34.00 ]                                             |
+-------------------------------------------------------------------+
```

---

## Quantitative Results & Impact Breakdown

| Metric | Before (Control) | After (Treatment) | Improvement |
| :--- | :---: | :---: | :---: |
| **Average Order Value (AOV)** | $38.50 | $52.10 | **+35.3%** |
| **Units Per Transaction (UPT)** | 1.18 units | 1.82 units | **+54.2%** |
| **Multi-Unit Selection Share** | 12.4% of orders | 51.6% of orders | **+316.1%** |
| **Cart Drawer Upgrade Rate** | N/A (No nudge) | 18.4% of 1-unit carts | **+18.4% conversion** |
| **PDP Add-to-Cart Rate** | 4.8% | 5.2% | **+8.3%** |
| **Net Contribution Margin / Order** | $8.20 | $17.40 | **+112.2%** |

### Why Contribution Margin More Than Doubled
- **Fulfillment Cost Dilution:** Shipping 2 bags in one poly-mailer cost $6.40 postage + $2.40 pick/pack ($8.80 total fulfillment vs $15.80 for 2 separate 1-bag orders).
- **Payment Processing Efficiency:** Merchant gateway fees dropped from 3.2% per unit revenue down to 2.4% due to higher ticket size.
- **CAC Leverage:** Ad spend required to acquire the customer remained constant ($38 CAC), but total order gross margin grew from $22.10 to $33.80, swinging net unit economics from marginally negative to highly profitable on first purchase.
