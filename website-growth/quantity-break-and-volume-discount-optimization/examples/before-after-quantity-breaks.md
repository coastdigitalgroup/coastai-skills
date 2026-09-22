# Quantity Break and Volume Discount Optimization: Before and After Case Study

## Executive Summary

- **Brand:** Apex Hydration (DTC Electrolyte & Hydration Powder Brand)
- **Primary Objective:** Increase Average Order Value (AOV) and Units Per Transaction (UPT) on hero product PDP ("Hydration Multiplier 30-Pouch Pack") without eroding net contribution margin dollars.
- **Intervention:** Replaced native quantity stepper input (`[-] 1 [+]`) with interactive 3-tier quantity break selector cards, pre-selected 2-pack default ("Most Popular"), per-unit price breakdown microcopy, and a dynamic cart drawer tier progress bar.
- **Key Outcome:**
  - **AOV Lift:** **+24.6%** ($38.50 → $47.97)
  - **Units Per Transaction (UPT):** **+41.2%** (1.18 units → 1.67 units)
  - **Net Contribution Margin Dollars per Order:** **+$3.42 / order** ($18.15 → $21.57)
  - **PDP Add-to-Cart Conversion Rate:** **+3.8%** (8.2% → 8.5%)

---

## Before Optimization

### Initial PDP & Cart State

Apex Hydration sold a single 30-pouch pouch pack of electrolyte mix for $38.00.
The PDP buy box contained:
1. A single price tag: `$38.00`.
2. A generic HTML numeric quantity stepper: `[-] 1 [+]`.
3. A small text link below the CTA: *"Buy in bulk and save — contact support"*.
4. Cart drawer displayed standard item list without volume threshold nudges or savings calculations.

```text
[ PDP Buy Box - BEFORE ]

Apex Electrolyte Powder (30 Servings)
Price: $38.00

Quantity: [ - ]  1  [ + ]

[ ADD TO CART ]

* Buy in bulk and save — contact support
```

### Conversion & Profitability Bottlenecks

1. **High Cognitive Load:** Customers wanting to order multiple packs had to tap `[+]` manually and calculate total savings in their head.
2. **Invisible Volume Discounting:** Shoppers were unaware that ordering 2 or 3 pouches saved significant shipping and per-unit costs because no tier pricing was shown.
3. **Default Anchoring at 1 Unit:** The default quantity state (`1`) anchored customer expectation at a single unit, leading to 86% of orders containing only 1 pouch.
4. **Missed Cart Upsell:** Customers adding 1 pouch to the cart drawer saw no incentive to add a 2nd pouch to reach a volume discount threshold.

### Baseline Performance Metrics (30-Day Pre-Test)

- **Total PDP Visitors:** 84,000
- **Add-to-Cart Rate:** 8.2% (6,888 ATCs)
- **Completed Orders:** 4,120
- **Units Per Transaction (UPT):** 1.18
- **Average Order Value (AOV):** $38.50
- **Single-Unit Order Share:** 85.8%
- **Net Contribution Margin per Order:** $18.15

---

## After Optimization

### Optimized PDP & Cart Implementation

Apex Hydration implemented the 3-Tier Quantity Break Selector System with Cart Drawer Integration:

1. **Tier 1 Card (Single Pack):**
   - Title: `1 POUCH (30 SERVINGS)`
   - Per-Unit Price: **`$38.00 / ea`**
   - Subtext: `Standard Single Order`

2. **Tier 2 Card (2-Pack - Pre-Selected Default):**
   - Header Badge: `MOST POPULAR` (Vibrant Teal Highlight)
   - Title: `2 POUCH PACK (60 SERVINGS)`
   - Per-Unit Price: **`$31.50 / ea`**
   - Total & Savings: `$63.00 total` · ~~`$76.00`~~ `Save $13.00 (17% OFF)`

3. **Tier 3 Card (3-Pack - Value Anchor):**
   - Header Badge: `BEST VALUE` (Gold Badge)
   - Title: `3 POUCH PACK (90 SERVINGS)`
   - Per-Unit Price: **`$26.00 / ea`**
   - Total & Savings: `$78.00 total` · ~~`$114.00`~~ `Save $36.00 (32% OFF)`

4. **Cart Drawer Tier Nudge:**
   - Dynamic progress bar: *"Add 1 more pouch to unlock 32% OFF (Save $36.00)!"*
   - Inline 1-click CTA button: `[ + Upgrade to 3-Pack & Save $23 ]`.

```text
[ PDP Buy Box - AFTER ]

Apex Electrolyte Powder (30 Servings)

┌────────────────────────────────────────────────────────┐
│  1 POUCH PACK                                          │
│  $38.00 / ea                        Total: $38.00      │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  ★ MOST POPULAR                                        │
│  2 POUCH PACK                                          │
│  $31.50 / ea                        Save $13.00 (17%)  │
│  ~~$38.00/ea~~                      Total: $63.00      │
└────────────────────────────────────────────────────────┘ [PRE-SELECTED]

┌────────────────────────────────────────────────────────┐
│  ★ BEST VALUE                                          │
│  3 POUCH PACK                                          │
│  $26.00 / ea                        Save $36.00 (32%)  │
│  ~~$38.00/ea~~                      Total: $78.00      │
└────────────────────────────────────────────────────────┘

[ ADD 2-PACK TO CART - $63.00 ]
```

---

## Measurable Results (30-Day Post-Test Comparison)

| Metric | Before Optimization | After Optimization | Delta / Impact |
| :--- | :--- | :--- | :--- |
| **PDP Add-to-Cart Rate** | 8.2% | 8.5% | **+3.7% relative lift** |
| **Completed Orders** | 4,120 | 4,386 | **+6.5% order volume** |
| **Average Order Value (AOV)** | $38.50 | $47.97 | **+24.6% ($+9.47/order)** |
| **Units Per Transaction (UPT)**| 1.18 units | 1.67 units | **+41.2% (+0.49 units)** |
| **Single-Unit Order Share** | 85.8% | 46.2% | **-39.6% shift to multi-pack** |
| **2-Pack Tier Share** | 10.4% | 38.5% | **+28.1% adoption** |
| **3-Pack Tier Share** | 3.8% | 15.3% | **+11.5% adoption** |
| **Cart Drawer Nudge Upgrade Rate**| N/A | 22.4% | **22.4% completed upgrade** |
| **Gross Revenue** | $158,620 | $210,396 | **+32.6% gross revenue** |
| **Net Contribution Margin / Order** | $18.15 | $21.57 | **+$3.42 net profit / order** |
| **Total Net Margin Dollars** | $74,778 | $94,606 | **+$19,828 net profit** |

---

## Key Takeaways & Operational Rules

1. **Pre-Selection Anchoring Drives the Volume Shift:** Pre-selecting the 2-pack tier default immediately shifted buyer perception from "Should I buy 1?" to "Should I get 2 or 3?".
2. **Per-Unit Pricing Eliminates Calculation Hesitation:** Displaying `$31.50 / ea` prominently allowed customers to grasp savings instantly compared to `$38.00 / ea`.
3. **Fulfillment Savings Offset Multi-Pack Discounts:** Although the 3-pack offered a 32% discount, picking/packing 1 box containing 3 units cost $2.80 instead of 3 separate shipments ($11.40 total shipping/handling), resulting in higher net contribution margin dollars per order.
