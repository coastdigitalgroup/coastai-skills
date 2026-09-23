# Before-and-After Scenario: Quantity Break & Volume Discount Optimization

## Client Overview: NutraGlow Daily Electrolytes (DTC Beverage Brand)

**NutraGlow** sells premium daily hydration electrolyte powders in single 30-serving tubs ($38.00 retail). They had a loyal customer base, but **88% of all purchases were for a single tub**, resulting in an Average Order Value (AOV) of $38.00 and high shipping customer acquisition costs (CAC) relative to order size.

---

## Baseline "Before" Experience

### PDP Buy Box & Quantity Mechanics
- **Price Callout:** Flat `$38.00`
- **Quantity Selector:** Standard `[ - ] 1 [ + ]` quantity stepper input.
- **Volume Promo Text:** Small grey microcopy under the CTA button: *"Save 10% when you buy 2, save 20% when you buy 3+"*.
- **Cart Drawer Behavior:** Adding 2 tubs showed a cart subtotal of `$68.40` with no visual progress bar or indication that adding a 3rd tub would unlock 20% off ($30.40/tub).

```text
┌────────────────────────────────────────────────────────┐
│ NutraGlow Hydration Electrolyte Powder                 │
│ $38.00                                                 │
│                                                        │
│ Flavor: [ Lemon Lime ▼ ]                               │
│                                                        │
│ Quantity: [ - ]  1  [ + ]                              │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │                  ADD TO CART                       │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ * Save 10% when you buy 2, save 20% when you buy 3+    │
└────────────────────────────────────────────────────────┘
```

### Key Performance Issues Identified
1. **High Friction Mental Math:** Customers had to increment the stepper to `3` to see what the actual package price and savings would be.
2. **Hidden Savings:** "Save 20%" felt abstract and failed to communicate the per-unit savings ($30.40 vs $38.00 per tub).
3. **Defaulting to Single Unit:** Because `1` was the default and only visible option, 88% of shoppers clicked Add to Cart without testing higher quantities.
4. **Cart Disconnection:** No threshold nudge in mini-cart meant users buying 2 tubs were unaware they were just $2.40 away from a cheaper per-tub price on 3.

---

## Optimized "After" Experience

### 1. PDP Interactive Quantity Break Selector
Replaced the stepper input with 3 full-width horizontal selector cards. Defaulted the selection to **Tier 2 ("3 Tubs — Most Popular")**.

```text
┌────────────────────────────────────────────────────────┐
│ NutraGlow Hydration Electrolyte Powder                 │
│                                                        │
│ SELECT YOUR QUANTITY & SAVE:                           │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ 🔘 1 Tub (30-Day Supply)                           │ │
│ │    $38.00 / tub                  Total: $38.00    │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ 🟢 3 Tubs (90-Day Supply)    [ MOST POPULAR ]      │ │
│ │    $30.40 / tub ($38.00)        SAVE 20% ($22.80) │ │
│ │    Total: $91.20                                   │ │
│ │    Flavor Selection:                               │ │
│ │    Tub 1: [ Lemon Lime ▼ ]                         │ │
│ │    Tub 2: [ Watermelon ▼ ]                         │ │
│ │    Tub 3: [ Mixed Berry ▼ ]                        │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ⚪ 6 Tubs (180-Day Supply)   [ BEST VALUE ]        │ │
│ │    $24.70 / tub ($38.00)        SAVE 35% ($79.80) │ │
│ │    Total: $148.20                                  │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │          ADD 3 TUBS TO CART — $91.20               │ │
│ │               (Free Express Shipping)              │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 2. Cart Drawer Volume Nudge & Progress Bar
When a user added 2 tubs to cart, the cart drawer displayed a dynamic progress banner at the top:

```text
┌────────────────────────────────────────────────────────┐
│ YOUR CART (2 ITEMS)                                    │
│ ────────────────────────────────────────────────────── │
│ ⚡ YOU ARE 1 TUB AWAY FROM UNLOCKING 20% OFF!          │
│ [██████████████████████░░░░] 66% Complete              │
│                                                        │
│ 🎁 Add 1 more tub to SAVE $22.80 instantly!            │
│ [ + ADD 3RD TUB FOR ONLY $22.80 MORE ]                │
│ ────────────────────────────────────────────────────── │
│ NutraGlow Hydration - Lemon Lime (x2)        $68.40    │
│                                                        │
│ Subtotal:                                    $68.40    │
│ ┌────────────────────────────────────────────────────┐ │
│ │               PROCEED TO CHECKOUT                  │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## Measurable Results (30-Day A/B Test)

The optimized experience was tested against the control over a 30-day period across 45,000 unique PDP sessions.

| Metric | Before (Control) | After (Optimized) | Relative Lift |
| :--- | :--- | :--- | :--- |
| **Average Order Value (AOV)** | $38.00 | $52.60 | **+38.4%** |
| **Units Per Transaction (UPT)** | 1.18 units | 2.05 units | **+73.7%** |
| **Tier 2 (3-Pack) Selection Share** | 7.2% | 41.5% | **+476.3%** |
| **Tier 3 (6-Pack) Selection Share** | 2.1% | 12.8% | **+509.5%** |
| **PDP Overall Conversion Rate** | 3.20% | 3.65% | **+14.0%** |
| **Cart Drawer Upgrade Rate** | N/A | 16.4% | **+16.4% new conversion** |
| **Net Profit Dollars / Session** | $1.15 | $1.68 | **+46.1% profit expansion** |

---

## Key Lessons Learned

1. **Pre-Selection Impact:** Defaulting the PDP selection to the 3-Tub ("Most Popular") card immediately shifted customer anchor perception from $38 to $91.20 without increasing bounce rate.
2. **Flavor Customization:** Adding mix-and-match flavor dropdowns inside the 3-Tub card eliminated "flavor boredom" objections, driving an additional 12% conversion lift for multi-packs.
3. **Cart Drawer Nudge Conversion:** 16.4% of users who initially selected 1 or 2 tubs converted via the single-click cart drawer progress bar upgrade button.
