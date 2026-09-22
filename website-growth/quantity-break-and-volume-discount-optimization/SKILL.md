---
name: quantity-break-and-volume-discount-optimization
description:
  Audit, structure, price, frame, and merchandise multi-buy tier discounts, quantity break selectors, per-unit price calculations, and cart drawer volume nudges across e-commerce, DTC, CPG, wholesale, and B2B ordering portals to maximize Average Order Value (AOV), Units Per Transaction (UPT), and Net Contribution Margin Dollars.
---

# Quantity Break and Volume Discount Optimization

## Purpose

The Quantity Break and Volume Discount Optimization skill provides a systematic framework for structuring, pricing, framing, and merchandising multi-buy tier discounts (e.g., "Buy 1 for $30, Buy 2 for $50 [$25/ea], Buy 3 for $63 [$21/ea]") on Product Detail Pages (PDPs), cart drawers, quick-view modals, and B2B order forms.

Volume discounting is one of the most effective levers for expanding Average Order Value (AOV) and Units Per Transaction (UPT). However, poorly designed quantity breaks frequently fail due to high cognitive friction (forcing shoppers to calculate per-unit math), aggressive over-discounting that erodes net profit margins, confusing selector interfaces (hidden dropdowns instead of explicit tier cards), or invisible tier incentives in the cart drawer.

This skill solves these failure modes by applying behavioral economics (per-unit price framing, default anchoring, badge highlighting), margin-protected tier discount formulas, and frictionless UI components. By making volume savings visually undeniable and seamless to select, this skill increases AOV, elevates UPT, improves Gross Profit Dollars per order, and boosts PDP-to-Checkout conversion rates.

---

## Use Cases

- **Consumable & CPG DTC Brands:** Health supplements, skincare, beverages, coffee beans, personal care, and pet food brands where customers reorder regularly and benefit from stocking up.
- **Apparel Basics & Household Goods:** Basics retailers (t-shirts, socks, underwear, towels, candles, air filters) selling high-repeat items where multi-packs drive massive AOV expansion.
- **B2B & Wholesale E-Commerce Portals:** Distributors, office suppliers, packaging manufacturers, and corporate gift portals requiring tier-based volume pricing matrix structures (e.g., 10+ units, 50+ units, 100+ units).
- **Digital Goods & Software Licenses:** SaaS companies, digital asset marketplaces, or event ticket platforms selling multi-seat, multi-license, or multi-ticket volume packages.
- **Cart Drawer Threshold Gamification:** E-commerce stores using dynamic progress bars in cart drawers to nudge shoppers from a 1-pack to a 2-pack or 3-pack with 1-click upgrades.

---

## When NOT to Use

- **Single-Unit Specialty / High-Ticket Luxury Items:** Fine jewelry, high-end art, bespoke furniture, or luxury watches where buying in bulk degrades brand prestige and multi-unit demand is zero.
- **Multi-SKU Bundling of Different Complementary Items:** If the goal is pairing a core item with complementary accessories (e.g., Camera + Lens + Case), use `bundle-optimization`.
- **Subscription Billing Interval Discounting:** If the primary discount incentive is tied to recurring delivery frequency (e.g., One-time $30 vs. Subscribe every 30 days for $24), use `subscribe-and-save-optimization`.
- **Trade-In Valuation Workflows:** If discounting is based on customer equipment turn-ins or trade-in credit, use `trade-in-and-trade-up-optimization`.

---

## Inputs

1. **Unit Economics & Margin Data:** Base Retail Price, Unit COGS, variable pick/pack fulfillment fees, and shipping costs across 1-unit, 2-unit, 3-unit, and 5-unit order weights.
2. **Historical Order Volume Data:** Baseline AOV, baseline Units Per Transaction (UPT), distribution of units per order (e.g., 75% 1-pack, 18% 2-pack, 7% 3-pack+), and cart drawer drop-off rate.
3. **Product Reorder Cycle & Shelf Life:** Customer consumption rate (e.g., 30-day supply) and product expiration/shelf-life bounds to ensure tier quantities align with real customer usage.
4. **Current PDP & Cart UX Assets:** Mobile and desktop screenshots of the current buy box, variant/quantity selectors, mini-cart/cart drawer, and checkout price display.

---

## Outputs

1. **Quantity Break Diagnostic Audit:** Evaluation of tier clarity, per-unit price visibility, margin protection, mobile touch target sizes, and default option anchoring.
2. **Margin-Protected Tier Discount Model:** Mathematical pricing matrix specifying tier breaks (e.g., Tier 1: 1-pack @ $30; Tier 2: 2-pack @ $25/ea [17% off]; Tier 3: 3-pack @ $21/ea [30% off]) calibrated against incremental gross profit contribution.
3. **Quantity Break Buy Box Component Specification:** Visual wireframe and interactive UI spec featuring stacked tier cards, "Most Popular" and "Best Value" badges, per-unit breakdown labels, total dollar savings microcopy, and dynamic radio/button state transitions.
4. **Cart Drawer Tier Nudge & Progress Bar Spec:** Specifications for real-time mini-cart alerts (e.g., *"Add 1 more to unlock $15 volume savings!"*) with 1-click quantity upgrade buttons.

---

## Workflow

### Step 1: Audit Baseline Volume & Margin Performance

Analyze order history and existing PDP buy box interactions to pinpoint volume expansion opportunities.

- **UPT & Distribution Analysis:** Calculate the current UPT (Units Per Transaction). Determine the exact percentage of orders purchasing single units vs. multi-units.
- **Margin Threshold Calculation:** Establish the maximum allowable discount percentage per tier using the Net Contribution Margin Formula:
  $$\text{Net Contribution Margin} = (\text{Tier Revenue} - \text{Total Tier COGS} - \text{Pick/Pack Fee} - \text{Shipping Cost})$$
  Ensure that Net Contribution Margin Dollars increase with each quantity step, even as discount percentages grow.
- **Cognitive Friction Audit:** Check whether current quantity selectors force shoppers to calculate per-unit prices manually. If a user sees "Buy 3 for $63", do they immediately know they are paying $21 each, or do they hesitate?

### Step 2: Structure the Optimal Tier Model (The 3-Tier Rule)

Structure tier options based on customer consumption rates and behavioral anchoring principles.

- **Tier 1 (Anchor / Baseline):** 1 Unit @ Full Retail Price (e.g., $30.00 / $30.00 each). Establishes reference value.
- **Tier 2 (Sweet Spot / Target):** 2 Units @ 12%–18% Discount (e.g., $50.00 total / $25.00 each — Save $10). Pre-select this tier by default with a `"MOST POPULAR"` badge.
- **Tier 3 (High-Volume / Value Anchor):** 3 or 4 Units @ 25%–33% Discount (e.g., $63.00 total / $21.00 each — Save $27). Highlight with a `"BEST VALUE"` badge to anchor buyer expectations upward.
- **Avoid Tier Overload:** Limit primary PDP options to 3 tiers maximum. (For B2B/Wholesale, use a structured matrix table with explicit bulk inputs for 10+, 50+, 100+).

### Step 3: Design High-Clarity PDP Buy Box Selector Cards

Transform standard quantity number inputs (`<input type="number">`) or native `<select>` dropdowns into interactive stacked tier cards.

- **Card Anatomy & Microcopy Rules:**
  - **Header Badge:** `"MOST POPULAR"` (high-contrast background color, e.g., deep navy or vibrant accent) or `"BEST VALUE"`.
  - **Quantity Label:** `"BUY 2 PACK"` or `"3 BOTTLES"`.
  - **Primary Per-Unit Price:** Display the per-unit price prominently in bold, large typography (e.g., **`$25.00 / ea`**). Research shows shoppers compare per-unit prices faster than total cart amounts.
  - **Strikethrough Baseline & Savings:** Show the original per-unit price strikethrough next to total savings: ~~`$30.00`~~ `Save $10.00 (17% OFF)`.
  - **Radio / Selection State:** Clear visual outline (2px solid primary color), subtle fill background shift, and active radio checkmark.
- **Variant Selection Synchronization:** If the item comes in multiple flavors, shades, or sizes, allow multi-flavor selection within the tier card (e.g., "Select 2 Flavors: [ Chocolate ▼ ] [ Vanilla ▼ ]") without breaking the tier layout.

### Step 4: Implement Cart Drawer Dynamic Tier Nudges

Re-engage shoppers in the cart drawer to push orders across volume discount thresholds.

- **Dynamic Tier Progress Bar:** Display a visual progress bar in the mini-cart showing proximity to the next quantity discount:
  - *Example:* *"You are 1 item away from unlocking 25% OFF (Save $27)!"*
- **1-Click Quantity Upgrade Button:** Provide an inline, high-visibility CTA inside the cart drawer line item: `[ + Add 1 More & Save $10 ]`.
- **Strikethrough Savings Display in Cart:** Display original price strikethrough and explicit dollar savings in the cart summary:
  - Subtotal: ~~`$90.00`~~ **`$63.00`**
  - Volume Discount Applied: **`- $27.00 (3-Pack Tier)`**

### Step 5: Mobile Ergonomics & Speed Optimization

Ensure tier selectors perform flawlessly on mobile touchscreens.

- **Touch Target Sizing:** Ensure every tier card has a minimum touch height of 56px and full-width mobile screen span to eliminate mis-taps.
- **Sticky Buy Bar Synchronization:** When scrolling past the main buy box on mobile, ensure the sticky bottom bar retains the active tier choice (e.g., `"Add 2-Pack ($50.00) to Cart"`).

---

## Decision Rules

- **Default Pre-Selection Rule:** Always pre-select Tier 2 ("Most Popular") on page load. Never leave quantity selectors unselected or defaulted to Tier 1 when multi-unit conversion is the primary goal. Pre-selecting Tier 2 anchors buyer perception and lifts AOV by 14%–22%.
- **Per-Unit Pricing Rule:** Always display the per-unit price (`$21/ea`) as the largest numerical figure on tier cards, with the total package price (`Total $63.00`) rendered in secondary microcopy.
- **Margin Delta Guardrail:** Never increase tier discount percentages unless the incremental gross contribution dollars are positive:
  $$\text{Contribution Margin Dollars}_{\text{Tier 3}} > \text{Contribution Margin Dollars}_{\text{Tier 2}} > \text{Contribution Margin Dollars}_{\text{Tier 1}}$$
- **Dropdown Exclusion Rule:** Native `<select>` dropdowns and numeric step buttons (`[-] 1 [+]`) are strictly prohibited as the primary mechanism for quantity breaks on PDPs. Stacked interactive cards must be used.

---

## Common Failure Patterns

- **The Math Homework Trap:** Displaying only the total package price (e.g., "Buy 3 for $63") without doing the per-unit math ("$21/ea - Save $27"). Forcing mental arithmetic creates immediate cognitive drop-off.
- **Margin Erosion via Over-Discounting:** Offering aggressive discounts (e.g., 40%+ off) on multi-packs that erode contribution margin dollars after accounting for shipping and pick/pack costs.
- **Hidden Cart Drawer Discounts:** Discounting volume on the PDP but showing un-discounted line items or generic coupon codes in the cart drawer, confusing the customer.
- **Complex Multi-Variant Matrix Collapse:** Failing to provide individual variant selectors when a customer selects a 3-pack of t-shirts, forcing them to order 3 identical colors instead of mixing and matching sizes/colors.
- **The Invisible Tier Nudge:** Allowing a customer with 2 items in their cart drawer to proceed to checkout without notifying them that adding a 3rd item unlocks a significantly higher discount tier.

---

## Validation Methods

- **Average Order Value (AOV):** Measure total revenue divided by total orders. Target: **+12% to +28% lift** post-implementation.
- **Units Per Transaction (UPT):** Measure total units sold divided by total orders. Target: **+0.3 to +0.8 units per order**.
- **Net Contribution Margin Dollars per Order:** Verify that total gross profit dollars (after COGS, discounts, and fulfillment) increase per order.
- **PDP-to-Cart Conversion Rate:** Track percentage of PDP visitors adding to cart. Ensure quantity break options do not lower baseline add-to-cart rates.
- **Cart Drawer Tier Upgrade Rate:** Track percentage of cart drawer sessions where users click the 1-click tier nudge upgrade. Target: **15% to 30% conversion on tier nudges**.
