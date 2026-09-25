# Quantity Break & Volume Discount Audit Checklist & Template

Use this template to audit, calculate, design, and verify multi-buy volume discount implementations on e-commerce, DTC, CPG, and B2B ordering portals.

---

## 1. Baseline Metrics & Margin Safety Worksheet

Before modifying PDP quantity controls or discount rules, document baseline unit economics and calculate profit floors.

### Baseline Data Collection
- [ ] **Current Average Order Value (AOV):** `$_______`
- [ ] **Current Units Per Transaction (UPT):** `_______` units/order
- [ ] **Order Quantity Distribution:**
  - % Orders at $Q = 1$: `_______%`
  - % Orders at $Q = 2$: `_______%`
  - % Orders at $Q = 3$: `_______%`
  - % Orders at $Q \ge 4$: `_______%`
- [ ] **Unit Cost of Goods Sold (COGS):** `$_______` / unit
- [ ] **Base Fulfillment & Shipping Cost (1 Unit):** `$_______`
- [ ] **Incremental Pick/Pack Fee per Additional Unit:** `$_______` / unit
- [ ] **Store Free Shipping Threshold:** `$_______`

---

### Tier Pricing & Margin Safety Calculator

Fill out this calculator matrix to ensure every volume tier yields positive net contribution profit dollars.

$$\text{Net Margin Dollars} = (Q \times \text{Tier Price}) - (Q \times \text{COGS}) - \text{Base Shipping} - ((Q - 1) \times \text{Pick Fee})$$

| Tier Level | Unit Qty ($Q$) | Discount Off MSRP | Retail Price / Unit | Total Package Price | Effective Per-Unit Price | Total COGS ($Q \times \text{COGS}$) | Total Fulfillment Cost | Net Contribution Margin ($) | Margin Dollars > Tier 1? (YES/NO) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Tier 1 (Standard)** | 1 | 0% | `$______` | `$______` | `$______` | `$______` | `$______` | `$______` | **BASELINE** |
| **Tier 2 (Target)** | 2 or 3 | 10% - 15% | `$______` | `$______` | `$______` | `$______` | `$______` | `$______` | `[  ]` PASS |
| **Tier 3 (Max Volume)** | 4 to 6 | 20% - 25% | `$______` | `$______` | `$______` | `$______` | `$______` | `$______` | `[  ]` PASS |

*Guardrail Rule: If Net Contribution Margin ($) for Tier 2 or Tier 3 is LESS than Tier 1, reduce the discount percentage immediately.*

---

## 2. Quantity Break PDP UX & Component Checklist

Audit the Product Detail Page (PDP) quantity selector layout and interactive elements against high-conversion design patterns.

### Tier Architecture & Framing
- [ ] **3-Tier Maximum Limit:** No more than 3 quantity break cards are presented on consumer PDPs (4 max for B2B portals).
- [ ] **Pre-Selected Default Tier:** Tier 2 ("Most Popular") is automatically pre-selected on initial page load. The user is not forced to make a choice before clicking "Add to Cart".
- [ ] **Per-Unit Price Dominance:** The calculated per-unit price (e.g., "$32.00 / ea") is displayed as the largest, boldest text inside each tier card.
- [ ] **Package Total Subordination:** Total package price (e.g., "$96.00 Total") is displayed in smaller, secondary neutral text.
- [ ] **Strikethrough Original MSRP:** Original non-discounted MSRP is displayed with strikethrough (e.g., ~~$114.00~~) adjacent to the discounted price.
- [ ] **Explicit Savings Badges:** Total dollar savings or percentage savings badges (e.g., `SAVE $18 (15% OFF)`) are displayed in high-contrast callout pills.
- [ ] **Badge Callouts:**
  - Tier 2 includes a `MOST POPULAR` or `BEST SELLER` pill badge.
  - Tier 3 includes a `BEST VALUE` pill badge.

### Variant & Customization Controls
- [ ] **Inline Variant Dropdowns:** When a multi-item tier (e.g., 3-pack) is selected, flavor/size/color variant selectors for each unit appear smoothly beneath the tier card.
- [ ] **Default Variant Population:** Multi-unit variant dropdowns are pre-populated with popular default combinations so the user can purchase in 1 click without manually tweaking every dropdown.
- [ ] **Stock & Inventory Validation:** If a specific variant is out of stock, selecting it gracefully disables the affected tier or shows an inline "Out of Stock" warning before cart submission.

---

## 3. Cart Drawer Volume Progress Nudge Checklist

Audit the mini-cart / cart drawer experience to ensure volume incentives continue beyond the PDP.

- [ ] **Dynamic Progress Bar:** A prominent progress bar sits at the top of the cart drawer indicating progress toward the next volume discount tier.
- [ ] **Dynamic Micro-Copy:** Progress bar copy updates dynamically based on cart quantity:
  - 1 Item in Cart: *"Add 1 more item to unlock 15% OFF!"*
  - 2 Items in Cart: *"Add 1 more item to unlock 25% OFF!"*
  - Tier Unlocked: *"🎉 You've unlocked 25% Volume Savings!"*
- [ ] **1-Click Quantity Increment Button:** A quick-action button (e.g., `+ Add 1 More & Save`) is positioned adjacent to cart line items or directly on the progress bar widget.
- [ ] **Free Shipping Threshold Sync:** Volume discount tiers are aligned so that Tier 2 or Tier 3 automatically crosses the store's Free Shipping threshold, unlocking dual benefits.
- [ ] **No Subtotal Drop Disqualification:** The cart recalculates discount thresholds in real time to prevent applying volume discounts that silently strip free shipping eligibility without user notice.

---

## 4. Mobile Responsiveness & Touch UX Checklist

Audit the mobile viewport ($375\text{px} - 430\text{px}$) for thumb-friendly interaction and screen space efficiency.

- [ ] **Above-The-Fold CTA:** The "Add to Cart" button and selected tier card remain visible or accessible within 1 swipe on mobile viewports.
- [ ] **Touch Target Sizing:** Every tier card container and variant dropdown meets minimum touch target guidelines ($\ge 48\text{px} \times 48\text{px}$).
- [ ] **Card Vertical Padding Efficiency:** Tier cards use compact horizontal layouts on mobile to prevent excessive vertical scrolling space.
- [ ] **Sticky Mobile Bottom Bar:** When scrolling down long product description pages, a sticky bottom bar displays the selected tier summary (e.g., `3-Pack ($32.30/ea) [ADD TO CART]`).

---

## 5. Pre-Launch Quality Assurance & Validation Plan

- [ ] **Cross-Browser Verification:** Test tier selector cards on Safari iOS, Chrome Android, Chrome Desktop, Safari macOS, and Firefox.
- [ ] **Cart API & Script Validation:** Confirm that the discount script or cart API applies the exact line-item discount rules without rounding errors.
- [ ] **Strikethrough Advertising Compliance:** Verify that advertised original MSRPs reflect actual historical standalone prices to comply with FTC guidelines.
- [ ] **Analytics Event Tracking:** Verify custom analytics event triggers:
  - `quantity_break_tier_selected` (attributes: `tier_id`, `quantity`, `unit_price`, `savings_amount`)
  - `cart_volume_nudge_clicked` (attributes: `source_tier`, `target_tier`)
- [ ] **A/B Test Guardrail Metrics:** Establish automated tracking for:
  - Primary Metric: Average Order Value (AOV)
  - Secondary Metric: Units Per Transaction (UPT)
  - Guardrail Metric: Net Contribution Margin Dollars per Order
