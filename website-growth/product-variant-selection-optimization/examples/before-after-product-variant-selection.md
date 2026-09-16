# Before-and-After Optimization Example: Product Variant Selection

## Context & Baseline Scenario

An online premium outerwear brand (*Summit Outfitters*) selling technical waterproof jackets ($280 MSRP) was experiencing high PDP bounce rates, low Add-to-Cart progression, and an elevated return rate. The flagship product page featured a 3-dimensional variant matrix:
- **Color:** 5 technical colors (Obsidian, Alpine Blue, Timber Pine, Slate Grey, Solar Flare).
- **Size:** 6 sizes (XS, S, M, L, XL, XXL).
- **Fit:** 2 fits (Standard Fit, Tall Fit).

### Baseline UX Problems Identified

1. **Native Dropdown Navigation:** The PDP relied on three stacked, native HTML `<select>` dropdown menus for Color, Size, and Fit. Shoppers had to tap three separate dropdowns to see if their combination was available.
2. **Hidden Available Stock & Dead-End Selections:** 40% of size/fit combinations in popular colors were temporarily out of stock. When a shopper selected an OOS combination from the dropdowns, the primary "Add to Cart" button became disabled grey text (`Unavailable`), with zero explanation, no restock alert form, and no alternative recommendations.
3. **Unlinked Media Gallery:** Tapping a color from the dropdown did not filter or update the 8-photo product image carousel. The carousel continuously displayed the hero model in "Alpine Blue", even when the user selected "Timber Pine".
4. **Surprise Pricing Surcharges:** XXL and Tall Fit variants carried a +$25 material surcharge. This surcharge was unannounced on the dropdown menu item and only updated the main headline price *after* selection, causing price shock.
5. **Ambiguous Cart Drawer Line Items:** Cart drawer line items displayed only `"Alpine Waterproof Shell - Standard"`. It omitted specific color and size attributes, causing anxious shoppers to re-visit the PDP to double-check their order before checking out.

---

## The Optimization Intervention

The brand applied the **Product Variant Selection Optimization** framework to overhaul the PDP and cart drawer choice architecture.

### Key Changes Implemented

```
BEFORE (Unoptimized Dropdowns & Dead Ends)
┌─────────────────────────────────────────────────────────────┐
│ Color:  [ Select Color ▼ ] (Dropdown hides options)         │
│ Size:   [ Select Size  ▼ ]                                  │
│ Fit:    [ Select Fit   ▼ ]                                  │
│ Price:  $280.00                                             │
│                                                             │
│ [ UNAVAILABLE - OUT OF STOCK ]  (Dead-end disabled CTA)     │
└─────────────────────────────────────────────────────────────┘

AFTER (Optimized Visual Swatches, Pills & Transparent States)
┌─────────────────────────────────────────────────────────────┐
│ Color: Timber Pine  [ 5 Colors Available ]                  │
│ [● Obsidian] [● Alpine Blue] [● Timber Pine] [● Slate] [●]  │
│ (Interactive visual swatches with active ring indicator)    │
│                                                             │
│ Size: L  [ Size & Fit Guide ]                               │
│ [ XS ]  [ S ]  [ M ]  [ L ]  [ XL (+$25) ]  [ XXL (+$25) ]  │
│ (Text pills with explicit price deltas for surcharges)      │
│                                                             │
│ Fit: Standard Fit                                           │
│ (•) Standard Fit    ( ) Tall Fit (+$25)                      │
│                                                             │
│ ⚡ Low Stock: Only 2 left in Timber Pine / L                │
│                                                             │
│ [ ADD TO CART — $280.00 ]                                   │
│ 🔒 Free Express Shipping & Free 30-Day Fit Returns          │
└─────────────────────────────────────────────────────────────┘
```

1. **Visual Color Swatches with Dynamic Labeling:**
   - Replaced the Color dropdown with 32px circular visual swatches showing exact jacket fabric colors.
   - Added an active text label above the swatches: `Color: Timber Pine`.
   - Connected swatches to the media gallery: Tapping "Timber Pine" instantly swiped the hero carousel to photos of the jacket in Timber Pine.

2. **Interactive Size & Fit Pills with Price Delta Transparency:**
   - Replaced Size and Fit dropdowns with touch-friendly segmented pills (48px height for effortless mobile tapping).
   - Displayed explicit surcharge indicators on applicable pills: `XL (+$25)` and `Tall Fit (+$25)`.
   - Placed a prominent `[ 📐 Size & Fit Assistant ]` link directly next to the Size label, opening an interactive modal with chest measurements and model fit references.

3. **Out-of-Stock Demand Capture & Alternative Routing:**
   - Visualized OOS combinations with a clean diagonal strikethrough and 50% opacity on size pills, while keeping them clickable.
   - When an OOS pill was tapped, the primary CTA changed to `"Notify Me When Restocked"`, opening an instant inline SMS/Email capture form.
   - Added smart alternative routing: *"Size L in Timber Pine is out of stock. Also available in Slate Grey (In Stock)."*

4. **Cart Drawer Line Item Detail Enhancement:**
   - Updated cart drawer items to explicitly display all selected attributes along with a color-matched thumbnail:
     `Alpine Waterproof Shell`
     `Color: Timber Pine | Size: L | Fit: Standard`
   - Added an inline `[ Edit Options ]` button in the cart so users could change size or color without leaving the cart drawer.

---

## Measurable Outcomes & Business Impact

After running a 30-day split test (50/50 traffic split on 120,000 unique PDP sessions), the optimized variant selection flow produced dramatic gains:

| Performance Metric | Baseline (Control) | Optimized (Treatment) | Relative Impact |
| :--- | :--- | :--- | :--- |
| **PDP Add-to-Cart (ATC) Rate** | 6.2% | 8.1% | **+30.6% lift** |
| **Variant Interaction Rate** | 38.4% | 71.2% | **+85.4% increase** |
| **Out-of-Stock Demand Capture Rate** | 0.0% (Dead-end) | 21.4% restock sign-ups | **+21.4 pts recovery** |
| **Cart Drawer Abandonment Rate** | 42.1% | 34.8% | **-17.3% reduction** |
| **Variant Misorder Return Rate** | 8.4% of orders | 5.2% of orders | **-38.1% drop in returns** |
| **Overall PDP Conversion Rate** | 2.15% | 2.82% | **+31.1% lift in sales** |

### Key Strategic Learnings

- **Eliminating Dropdown Obscurity Drives Intent:** Moving options out of buried select menus into visible swatches and pills increased total user interaction with variant choices by over 85%.
- **Price Delta Transparency Builds Trust:** Disclosing the +$25 surcharge directly on the `XL (+$25)` pill eliminated cart drop-off at checkout caused by unexpected price increases.
- **Synchronized Media Reduces Return Rates:** Ensuring the photo carousel updated to match the selected swatch color reduced "wrong color delivered" return complaints by 38%.
