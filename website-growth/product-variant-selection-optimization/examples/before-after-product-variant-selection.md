# Before vs. After Case Study: Product Variant Selection Optimization

## Overview

- **Brand / Store Type:** Outdoor Apparel & Performance Outerwear Merchant ("Apex Trailwear")
- **Product Tested:** Waterproof All-Weather Technical Jacket (available in 5 Colors, 6 Sizes S–XXL, and 2 Fit Types: Slim vs. Relaxed)
- **Primary Optimization Goal:** Increase PDP Add-to-Cart (ATC) conversion rate and eliminate high variant selection drop-off caused by confusing multi-axis dropdowns.
- **Test Period:** 30-day split A/B test (50/50 traffic split, 42,000 total unique PDP visits per variation).

---

## The Baseline Scenario (BEFORE)

### UX Description & Friction Points

The baseline PDP utilized standard, unstyled HTML `<select>` dropdown menus for variant selection:

1. **Unselected Default State:**
   - On page load, all 3 variant dropdowns defaulted to blank choices: `-- Select Color --`, `-- Select Size --`, and `-- Select Fit --`.
   - The primary CTA button ("Add to Cart") was visually disabled and unclickable until all three dropdowns were manually selected by the user.
2. **Hidden Stock Status & Out-of-Stock Dead Ends:**
   - Users could not tell which sizes or colors were in stock without clicking into the dropdown and attempting combinations.
   - If a user selected `Color: Slate Gray` and `Size: Medium`, but `Medium` was out of stock in `Slate Gray`, the page threw a generic error alert: *"Selected combination unavailable"*, resetting all dropdown selections back to blank.
3. **Price Jump Shock:**
   - Outerwear in sizes XL and XXL carried a $20 material surcharge ($199 base price vs. $219 for XL/XXL).
   - This price increase was not stated anywhere in the dropdown menu. When users selected XXL, the price in the buy box quietly changed from $199 to $219 without any visual highlight, causing confusion and cart abandonment at checkout.
4. **Disconnected Image Gallery:**
   - Selecting `Color: Forest Green` in the dropdown did not update the main photo gallery. The gallery continued displaying the default red jacket photos unless the user manually swiped through 8 gallery thumbnails to find a green photo.

### Baseline Metrics (30-Day Period)

- **Unique PDP Visits:** 42,100
- **Variant Selector Interaction Rate:** 68.4% (28,796 users interacted with at least 1 dropdown)
- **Selection-to-ATC Drop-off Rate:** 41.2% (11,863 users interacted with selectors but abandoned without adding to cart)
- **PDP Add-to-Cart (ATC) Rate:** 6.85% (2,883 Add-to-Carts)
- **Average Time to Complete Variant Selection:** 18.4 seconds
- **Customer Returns (Wrong Size/Color):** 8.2% of completed orders

---

## The Optimized Scenario (AFTER)

### UX Implementation & Key Interventions

The optimized PDP replaced native dropdowns with a multi-axis visual choice architecture designed around the `product-variant-selection-optimization` framework:

1. **Visual Swatches & Touch-Friendly Pills:**
   - **Color Axis:** Converted to 36x36px circular visual swatches displaying actual fabric color textures, with active hover/tap tooltips and the selected color name explicitly called out above the row (`Color: Midnight Obsidian`).
   - **Size Axis:** Converted to interactive horizontal pill buttons (`S`, `M`, `L`, `XL`, `XXL`) with a 44x44px touch target on mobile viewports.
   - **Fit Axis:** Converted to a 2-option segmented toggle (`Slim Fit` vs. `Relaxed Fit`) with instant microcopy explanations ("Slim: Form-fitting layer" vs. "Relaxed: Room for heavy underlayers").
2. **Smart Default Pre-Selection:**
   - Page load automatically pre-selected the top-selling in-stock combination (`Midnight Obsidian` / `Large` / `Relaxed Fit`).
   - The "Add to Cart" CTA was 100% active and clickable immediately upon landing on the PDP.
3. **Diagonal Strike-Through & Restock Trigger for Out-of-Stock Variants:**
   - Unavailable size/color combinations were displayed with a subtle 50% opacity and a crisp diagonal strike-through line (`/`).
   - Tapping an out-of-stock pill (e.g., `Slate Gray` in `Medium`) opened an inline 1-click modal: *"Size Medium in Slate Gray is sold out. Enter your email/SMS to get notified when restocked."*
4. **Explicit Price Surcharge Badges:**
   - Surcharge sizes clearly displayed the differential on the pill option: `XL (+$20)` and `XXL (+$20)`.
   - Selecting an XL pill animated the buy box price tag with a subtle flash from `$199` to `$219` alongside a breakdown badge (`Includes +$20 Heavy Duty Tech Fabric Surcharge`).
5. **Instant Gallery Media Synchronization & URL Parameter State:**
   - Tapping `Forest Green` immediately updated the main gallery carousel to show all 4 high-res photos of the jacket in Forest Green.
   - Updated browser URL state to `?color=forest-green&size=l&fit=relaxed` for seamless link sharing.

---

## Results & Measurable Impact

| Metric | Baseline (Before) | Optimized (After) | Absolute Lift | Relative Lift / Impact |
| :--- | :--- | :--- | :--- | :--- |
| **PDP Add-to-Cart (ATC) Rate** | 6.85% | 8.55% | +1.70% | **+24.8% relative lift** |
| **Selection-to-ATC Drop-off Rate** | 41.2% | 25.5% | -15.7% | **-38.1% reduction in friction** |
| **Average Time to Select Variant** | 18.4s | 7.2s | -11.2s | **60.8% faster selection** |
| **Restock Leads Captured (OOS)** | 0 (Dead end) | 1,420 contacts | +1,420 leads | **New revenue recovery channel** |
| **Misorder Return Rate (Size/Color)**| 8.2% | 3.8% | -4.4% | **53.6% reduction in returns** |
| **Total Add-to-Cart Conversions** | 2,883 | 3,607 | +724 ATCs | **+724 incremental cart additions** |

---

## Key Takeaways

1. **Pre-selection drives momentum:** Eliminating the requirement for buyers to click three separate blank dropdowns before enabling the ATC button removed the single largest drop-off barrier on mobile screens.
2. **Visual swatches build confidence:** Seeing actual fabric textures and instant gallery synchronization eliminated doubt about true product appearance, cutting color/size return rates in half.
3. **Surprises kill conversion:** Badging price surcharges directly on option pills (`XL (+$20)`) eliminated price jump shock and boosted checkout progression for larger sizes.
