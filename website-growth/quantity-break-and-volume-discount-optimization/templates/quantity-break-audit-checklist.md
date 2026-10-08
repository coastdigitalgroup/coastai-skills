# Quantity Break & Volume Discount Optimization Checklist

Use this audit and implementation template to inspect, redesign, and launch high-converting volume discount programs across Product Detail Pages (PDP), Cart Drawers, and B2B ordering portals.

---

## Part 1: Financial & Margin Health Audit

- [ ] **Baseline Unit Economics Mapped:** Record baseline MSRP, COGS, variable shipping cost, pick/pack fees, and blended CAC for single-unit purchases.
- [ ] **Marginal Fulfillment Savings Calculated:** Determine exact fulfillment cost savings when shipping 2, 3, and 5 units in a single package.
- [ ] **Breakeven Discount Rates Established:** Ensure max percentage discount at the highest tier does not erode net contribution margin dollars relative to single-unit orders.
- [ ] **Tier Spacing Aligned with Consumer Usage:** Verify volume tiers reflect realistic consumer usage cycles (e.g., 30-day supply vs 60-day supply vs 90-day supply) rather than arbitrary bulk numbers.
- [ ] **Discount Stacking Protection:** Configure rules preventing stacking volume discount tiers with site-wide promo codes, influencer codes, or clearance markdowns unless explicitly budgeted.

---

## Part 2: PDP Quantity Break Merchandising Audit

- [ ] **Visual Option Cards Implemented:** Replace standard native dropdowns (`<select>`) or plain steppers with distinct, selectable quantity cards.
- [ ] **Per-Unit Rate Prominence:** Ensure per-unit breakdown (e.g., `$20.00 / ea`) is formatted in larger font weight/size than total order price (`Total $60.00`).
- [ ] **Explicit Savings Callouts:** Display total dollar savings or percentage savings badges on multi-unit cards (e.g., `SAVE 25%` or `SAVE $15.00`).
- [ ] **Behavioral Anchor Badges:** Apply `MOST POPULAR` or `BEST VALUE` pill badges to the target volume tier (usually Tier 2).
- [ ] **Default Selection Active:** Pre-select the target volume card (Tier 2) upon page load to capitalize on default bias.
- [ ] **Mix-and-Match Variant Selection:** Allow shoppers to select different colors, sizes, or flavors for each unit in multi-pack cards without leaving the card UI.
- [ ] **Strike-Through Price Anchoring:** Display original single-unit MSRP with strikethrough styling next to discounted per-unit rate.
- [ ] **Dynamic Add-To-Cart CTA Text:** Update primary button text dynamically based on selected tier (e.g., `ADD 2 BAGS TO CART — $54.40 (SAVE $13.60)`).

---

## Part 3: Cart Drawer & In-Funnel Volume Nudges

- [ ] **Dynamic Volume Progress Bar:** Render an active progress bar at the top of the slide-out cart showing proximity to the next discount tier.
- [ ] **Explicit Savings Messaging:** Display exact dollar amount needed to reach the next tier (e.g., `Add 1 more item to save $12.00!`).
- [ ] **1-Click Cart Upgrade CTA:** Include a direct `+ Add 1 More` button inside the progress banner to allow instant upgrading without returning to PDP.
- [ ] **Unlocked Savings Celebration:** Display green success badge and itemized discount callout once volume threshold is crossed (`🎉 Tier 2 Unlocked — You saved $12.00`).
- [ ] **Quantity Adjustment Responsiveness:** Update volume discounts and progress bars instantaneously (<100ms) when quantity steppers (`+` / `-`) are clicked in cart.

---

## Part 4: B2B & High-Volume Matrix Portal Audit

- [ ] **Tier Matrix Visibility:** Display clear step tables showing quantity ranges (e.g., `1–49`, `50–199`, `200+`) and corresponding unit rates.
- [ ] **Active Tier Row Highlighting:** Dynamically highlight the active pricing row in the matrix table based on current typed quantity.
- [ ] **Proximity Warning Alerts:** Show an inline notification when entered quantity is within 10% of a cheaper volume tier (e.g., `Order 5 more units to drop unit price to $8.50`).
- [ ] **Instant Subtotal & Unit Recalculation:** Ensure total price, unit price, and savings update in real time as values change in quantity fields.
- [ ] **MOQ (Minimum Order Quantity) Validation:** Provide clear, inline messaging if quantity falls below MOQ, indicating exact units needed to proceed.

---

## Part 5: Validation & Performance Metrics Tracking

- [ ] **AOV Tracking Configured:** Monitor overall Average Order Value (AOV) pre- and post-launch in analytics platform.
- [ ] **Units Per Transaction (UPT) Monitored:** Track average item count per completed order.
- [ ] **Tier Selection Share Measured:** Track percentage of orders originating from Tier 1 vs Tier 2 vs Tier 3 cards.
- [ ] **Cart Progress Nudge Click-Through Rate:** Track interaction rate on cart drawer `+ Add 1 More` upgrade buttons.
- [ ] **Net Contribution Margin Dollars Verified:** Confirm net dollar profitability per order increases alongside revenue expansion.
