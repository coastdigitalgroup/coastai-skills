# Before & After: Quantity Break & Volume Discount Optimization

## Client Overview
- **Brand:** Apex Nutrition (DTC Electrolyte & Hydration Drink Mixes)
- **Primary Product:** Daily Hydration Electrolyte Powder (30-Serving Tub)
- **Baseline MSRP:** $36.00 per tub
- **Baseline Performance Metrics:**
  - **AOV:** $41.20
  - **Units Per Transaction (UPT):** 1.14 units
  - **PDP-to-Cart Conversion Rate:** 3.82%
  - **Cart-to-Checkout Completion:** 46.5%
  - **Multi-Unit Selection Share:** 11.2% of orders (88.8% single-unit orders)
  - **Net Contribution Margin / Order:** $14.80

---

## BEFORE: The Fragmented Dropdown & Hidden Discount Experience

### The Problem
Apex Nutrition relied on a standard Shopify product layout with a single-unit price header (`$36.00`) and a small native quantity dropdown (`<select name="quantity">`) featuring options 1 through 10. In fine grey text underneath the Add to Cart button, a plain bullet point read: *"Save 10% on 2+ tubs or 20% on 3+ tubs (discount auto-applied in checkout)."*

```text
+-------------------------------------------------------------+
| Daily Hydration Electrolyte Powder                          |
| $36.00                                                      |
|                                                             |
| Flavor: [ Berry Blast v ]                                   |
| Quantity: [ 1 v ]                                           |
|                                                             |
| [ ADD TO CART — $36.00 ]                                    |
|                                                             |
| * Save 10% on 2+ tubs or 20% on 3+ tubs (auto-applied at checkout) |
+-------------------------------------------------------------+
```

### Key Conversion & UX Failures
1. **High Cognitive Load & Friction:** Customers were expected to perform math in their head to understand that buying 3 tubs reduced the cost per tub from $36 to $28.80.
2. **Hidden Value Proposition:** Mobile users rarely noticed the small footnote below the primary CTA button. Over 85% of mobile shoppers added 1 tub without ever realizing multi-buy discounts existed.
3. **Cart & Checkout Uncertainty:** Because the 10% / 20% discount was only calculated at final checkout step 3, users in the cart drawer saw 2 tubs priced at full MSRP ($72.00) + $5.99 shipping, triggering sticker shock and cart abandonment.
4. **Single-Unit Bias:** Defaulting the quantity selector to `1` anchored shoppers to buying a single 30-day supply, forcing repeat acquisition ad spend every month rather than capturing 90-day supply upfront.

---

## AFTER: Interactive Multi-Buy Tier Cards & Dynamic Cart Volume Nudges

### The Solution Strategy
We replaced the hidden quantity dropdown and footnote with **Interactive Quantity Break Tier Cards** pre-selecting the "3-Tub Best Value Tier", combined with per-unit price breakdowns, clear savings badges, mix-and-match flavor selection, and a cart drawer volume progression bar.

```text
+-------------------------------------------------------------+
| Daily Hydration Electrolyte Powder                          |
| ★★★★★ 4.9/5 (1,420 reviews)                                |
|                                                             |
| SELECT YOUR SUPPLY & SAVE:                                   |
|                                                             |
| +---------------------------------------------------------+ |
| | ( ) 1 TUB (30-Day Supply)                    $36.00     | |
| |     $36.00 / tub                                        | |
| +---------------------------------------------------------+ |
|                                                             |
| +---------------------------------------------------------+ |
| | ( ) 2 TUBS (60-Day Supply) -- SAVE 15%       $61.20     | |
| |     $30.60 / tub | Save $10.80                      | |
| +---------------------------------------------------------+ |
|                                                             |
| +---------------------------------------------------------+ |
| | (•) 3 TUBS (90-Day Supply) -- SAVE 25%   [ MOST POPULAR ] |
| |     $27.00 / tub | SAVE $27.00 TODAY        $81.00     | |
| |     ✓ FREE EXPRESS SHIPPING                             | |
| |     Mix & Match Flavors: [Berry v] [Lemon v] [Mango v]  | |
| +---------------------------------------------------------+ |
|                                                             |
| [ ADD 3 TUBS TO CART — $81.00 (SAVE $27.00) ]              |
| 🔒 30-Day Money-Back Guarantee • Fast Free Shipping Over $60 |
+-------------------------------------------------------------+
```

### Cart Drawer Volume Nudge Integration
When a shopper adds 2 Tubs to their cart, the sliding cart drawer displays an animated volume progression bar:

```text
+-------------------------------------------------------------+
| YOUR CART (2 Items)                                         |
| [======================================------] 80%          |
| 🚀 ADD 1 MORE TUB TO UNLOCK 25% OFF + FREE SHIPPING!         |
|                                                             |
| Daily Hydration Powder (2-Pack)                 $61.20      |
| Flavor: Berry Blast                                         |
| Quantity: [-] 2 [+]                              Save $10.80|
|                                                             |
| [ + ADD 3rd TUB FOR JUST $19.80 MORE ]                      |
|                                                             |
| Subtotal: $61.20                                            |
| Estimated Shipping: $5.99                                   |
| [ PROCEED TO CHECKOUT ]                                     |
+-------------------------------------------------------------+
```

---

## MEASURABLE OUTCOMES (30-Day Post-Implementation Audit)

| Performance Metric | BEFORE (Control) | AFTER (Optimized) | Percentage Delta |
| :--- | :--- | :--- | :--- |
| **Average Order Value (AOV)** | $41.20 | $52.90 | **+28.4%** |
| **Units Per Transaction (UPT)** | 1.14 units | 1.62 units | **+42.1%** |
| **Multi-Unit Selection Share** | 11.2% | 44.8% | **+300% (4x increase)** |
| **PDP-to-Cart Conversion Rate** | 3.82% | 4.36% | **+14.1%** |
| **Cart-to-Checkout Completion** | 46.5% | 52.1% | **+12.0%** |
| **Net Contribution Margin / Order** | $14.80 | $18.65 | **+26.0%** |
| **Gross Revenue (Monthly)** | $123,600 | $174,570 | **+41.2%** |

### Key Takeaways
1. **Per-Unit Anchoring Reduces Sticker Shock:** Presenting `$27.00 / tub` in large bold type while keeping the total bundle price (`$81.00`) secondary reduced perceived cost friction.
2. **Pre-selected "3-Tub" Tier Shifted Buying Baseline:** Defaulting to the 3-Tub 90-day supply converted 31% of buyers directly into the highest-value tier.
3. **Cart Volume Progression Bar Rescued 2-Tub Carts:** Over 22% of customers who initially added 2 tubs clicked the inline cart nudge `[ + ADD 3rd TUB FOR JUST $19.80 MORE ]` to unlock 25% off + free shipping, converting 2-packs into 3-packs at zero additional CAC.
