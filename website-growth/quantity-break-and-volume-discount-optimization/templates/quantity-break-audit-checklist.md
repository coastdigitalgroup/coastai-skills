# Quantity Break & Volume Discount Audit Checklist & Spec Template

Use this comprehensive checklist and specification framework to evaluate existing multi-unit pricing setups, identify conversion leaks, and design high-converting quantity break tier interfaces across DTC, CPG, and B2B e-commerce stores.

---

## Part 1: Strategic & Financial Margin Safety Audit

- [ ] **Unit Economic Margin Floor Verified:**
  - [ ] COGS per unit, pick/pack fees, base shipping rates, and payment processing fees documented.
  - [ ] Calculated Net Contribution Margin Dollar for Tier 1, Tier 2, Tier 3, and Tier 4+.
  - [ ] Confirmed higher volume tiers deliver equal or higher *total dollar contribution* than single-unit orders.
- [ ] **Tier Gap Pricing Logic Validated:**
  - [ ] Tier gaps reflect meaningful incentive jumps (e.g., Tier 1: MSRP, Tier 2: 15% Off, Tier 3: 25% Off + Free Shipping).
  - [ ] Discount jumps avoid diminishing returns (e.g., jump from 15% to 25% drives tier upgrades; jump from 10% to 12% fails to motivate buyers).
- [ ] **Promo Code Stacking Prevention:**
  - [ ] Verified platform logic prevents generic percentage coupons (e.g., `WELCOME10`) from double-discounting volume tier pricing unless margin permits.
  - [ ] Clear user feedback displayed when promo code conflict occurs: *"Best volume discount already applied."*

---

## Part 2: Product Detail Page (PDP) UI & UX Checklist

- [ ] **Interactive Card Layout vs Native Select Dropdown:**
  - [ ] Native HTML `<select>` quantity dropdowns replaced with touch-friendly radio-button card tiles.
  - [ ] Visual hierarchy clearly distinguishes single-unit purchasing from multi-unit volume tiers.
- [ ] **Per-Unit Cost Prominence:**
  - [ ] Per-unit price (e.g., `$27 / bottle`) rendered in bold, dominant typography.
  - [ ] Comparative MSRP crossed out (e.g., `~~$36.00~~`) to anchor original single-unit value.
  - [ ] Absolute dollar savings highlighted in high-contrast badges (e.g., `SAVE $27.00 TODAY`).
- [ ] **Pre-Selected Default Tier:**
  - [ ] Middle or top volume tier pre-selected by default on page load (e.g., Tier 2 or Tier 3 "Best Value").
  - [ ] Pre-selected card framed with a prominent badge (`MOST POPULAR`, `BEST VALUE`, or `RECOMMENDED`).
- [ ] **Mix-and-Match Variant Selectors:**
  - [ ] Multi-pack tiers allow customers to select individual variant attributes (flavor, color, shade, scent) per unit.
  - [ ] Variant dropdowns inside the tier card react dynamically to quantity changes without breaking layout.
- [ ] **Dynamic Primary CTA Button:**
  - [ ] Primary Add-to-Cart button text updates in real time to reflect chosen quantity, total price, and savings.
  - [ ] Example CTA: `ADD 3 BOTTLES TO CART — $81.00 (SAVE $27.00)`.

---

## Part 3: Cart Drawer & Progress Nudge Checklist

- [ ] **Dynamic Tier Progress Bar:**
  - [ ] Sliding cart drawer features a visual progression indicator showing distance to the next volume discount threshold.
  - [ ] Example Banner: *"Add 1 more item to unlock 20% OFF + FREE SHIPPING!"*
- [ ] **Inline One-Click Quick-Add:**
  - [ ] Cart drawer includes a dedicated one-click upgrade button (e.g., `[ + Add 3rd Bottle for $19.80 More ]`).
  - [ ] Clicking the upgrade button instantly updates cart totals, applies tier discounts, and recalculates shipping without page refresh.
- [ ] **Cart Quantity Stepper Synchronization:**
  - [ ] Changing item quantity via `+` / `-` steppers in the cart automatically recalculates the applied volume discount tier.
  - [ ] Explicit discount line-item row displayed in order summary (e.g., `Volume Tier Savings: -$27.00`).

---

## Part 4: B2B & Wholesale Tier Matrix Checklist

- [ ] **Bulk Volume Table/Matrix:**
  - [ ] Dedicated B2B volume pricing table displayed on PDP for enterprise buyers.
  - [ ] Clear unit range buckets (e.g., `1-9 units`, `10-49 units`, `50-99 units`, `100+ units`).
- [ ] **Tier Threshold Lock Indicators:**
  - [ ] Current quantity selection highlighted in real time within the B2B matrix table.
  - [ ] Automatic unit pricing adjustment applied when customer enters raw number into numeric quantity input field.
- [ ] **Custom Quote Fallback for High Volumes:**
  - [ ] Clear callout for order quantities exceeding maximum web tier (e.g., *"Ordering 500+ units? Request a Custom Wholesale Quote"*).

---

## Part 5: Technical & Cross-Device QA Protocol

- [ ] **Mobile Touch Target & Viewport Audit:**
  - [ ] Minimum tap target size of 48x48px maintained for all volume tier cards and radio buttons.
  - [ ] Tier cards stack vertically on screens < 768px without horizontal clipping or scrollbar artifacts.
  - [ ] Sticky bottom buy bar on mobile displays updated multi-buy price and savings badge when user scrolls.
- [ ] **Out-of-Stock / Inventory Edge-Case QA:**
  - [ ] If a selected variant has insufficient stock for a 3-pack, system gracefully disables the 3-pack card or adjusts available quantity limits.
  - [ ] Helpful message displayed if partial stock available: *"Only 2 units remaining in Berry Blast. Select mix-and-match variants for 3-pack discount."*
- [ ] **Analytics & Tracking Telemetry:**
  - [ ] Analytics events track `quantity_break_tier_selected` (label, tier_id, quantity, savings_amount).
  - [ ] Cart events pass breakdown of base price vs volume discount dollar value.

---

## Volume Tier Specification Sheet (Fillable Project Spec)

| Field / Parameter | Configuration / Value |
| :--- | :--- |
| **Product Name / SKU Category:** | |
| **Single-Unit MSRP ($):** | |
| **Unit COGS ($):** | |
| **Target Contribution Margin Floor (%):** | |
| **Tier 1 (Single Unit):** | Qty: 1 \| Price/Unit: $____ \| Total: $____ \| Savings: 0% |
| **Tier 2 (Upgrade):** | Qty: __ \| Price/Unit: $____ \| Total: $____ \| Savings: ____% |
| **Tier 3 (Best Value Anchor):** | Qty: __ \| Price/Unit: $____ \| Total: $____ \| Savings: ____% |
| **Pre-Selected Default Tier:** | [ ] Tier 1 [ ] Tier 2 [ ] Tier 3 |
| **Primary Badge Text:** | (e.g., "MOST POPULAR - SAVE 25%") |
| **Mix & Match Allowed?** | [ ] Yes [ ] No (Identical variant only) |
| **Cart Nudge Threshold Text:** | "Add __ more to unlock ____!" |
