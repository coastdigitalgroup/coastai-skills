# Quantity Break Heuristics & Volume Discount Pricing Rules

This reference guide details behavioral economics, psychological pricing heuristics, discount framing rules, and cart drawer threshold UX principles for optimizing quantity breaks and volume discounts on e-commerce websites.

---

## 1. Behavioral Economics & Cognitive Framing Heuristics

### 1.1 The Per-Unit Price Anchoring Principle

When consumers evaluate multi-pack or bulk purchase options, their primary cognitive benchmark is the **per-unit price**, not the total package price.

- **Cognitive Load Reduction:** Presenting a total price of `$63.00` for a 3-pack forces the customer's brain to divide $63 by 3 to evaluate fairness ($21.00 each). This micro-calculation creates hesitation and cart abandonment.
- **Visual Dominance:** By rendering **`$21.00 / ea`** in bold 24px font and placing `Total: $63.00` in smaller 13px muted font, the brain evaluates `$21.00` against the single-unit anchor of `$30.00`. The perceived savings are immediate and effortless.

### 1.2 Default Choice Architecture (The Compromise Effect)

The "Compromise Effect" in behavioral economics states that when consumers are presented with three options, they tend to avoid extremes (the lowest and highest quantities) and select the middle option.

- **Pre-Selecting Tier 2:** Loading the PDP with Tier 2 (the 2-pack) pre-selected harnesses the compromise effect and default bias.
- **Anchoring Upward:** Because Tier 1 ($30) feels like a missed savings opportunity and Tier 3 ($78) feels like a higher upfront commitment, Tier 2 ($50) is perceived as the logical, optimal choice.
- **AOV Impact:** Pre-selecting Tier 2 shifts baseline single-unit order share from ~85% down to ~45%, immediately lifting Average Order Value by 15%–25%.

### 1.3 Badge Microcopy & Social Proof Heuristics

- **`MOST POPULAR` Badge:** Taps into social proof ("other people choose this"). Best applied to Tier 2 (the middle tier).
- **`BEST VALUE` Badge:** Taps into rational economic optimization ("this maximizes savings per dollar"). Best applied to Tier 3 (the highest quantity tier).
- **`STOCK UP & SAVE` Badge:** Taps into utility and replenishment framing. Effective for consumable, non-perishable goods.

---

## 2. Quantity Break Tier Pricing & Margin Rules

### 2.1 The Discount Decay Curve

Volume discount percentages should follow a diminishing marginal return curve rather than a linear increase:

| Quantity Step | Discount % | Per-Unit Price ($30 Base) | Marginal Discount Increment |
| :--- | :--- | :--- | :--- |
| **Tier 1 (1 Unit)** | 0% | $30.00 / ea | Baseline |
| **Tier 2 (2 Units)** | 16.7% | $25.00 / ea | +16.7% discount step |
| **Tier 3 (3 Units)** | 30.0% | $21.00 / ea | +13.3% additional discount step |
| **Tier 4 (5 Units)** | 36.7% | $19.00 / ea | +6.7% additional discount step |

- **Why Discount Decay Matters:** Increasing discounts linearly (0% → 20% → 40% → 60%) destroys gross contribution margins at higher volumes. The largest percentage jump must occur between Tier 1 and Tier 2 to motivate the initial multi-unit upgrade.

### 2.2 Fulfillment Efficiency & Margin Offsets

A common mistake in volume discounting is treating multi-packs as a pure price cut. In reality, multi-packs generate significant fulfillment cost savings that offset discount dollars:

1. **Pick & Pack Labor Savings:** Packing 3 units into a single shipping box requires 1 picking session and 1 box, whereas shipping 3 individual orders requires 3 pick sessions, 3 boxes, and 3 label creations.
2. **Base Postage Savings:** Shipping a 2lb box once costs significantly less than shipping three 0.7lb packages separately.
3. **Payment Processing Fee Offset:** Credit card transactions charge a fixed fee (e.g., $0.30) plus percentage (2.9%). One $63 transaction incurs $2.13 in fees; three $30 transactions incur $3.51 in fees.

---

## 3. Selector UI & Cart Integration Mechanics

### 3.1 Stacked Cards vs. Horizontal Pills

- **Desktop Viewports (>1024px):** Stacked vertical cards or horizontal 3-column pill cards work equally well.
- **Mobile Viewports (<768px):** **Stacked vertical cards** are strongly mandatory. Horizontal pills on mobile compress text, hide savings microcopy, and create cramped 30px touch targets.

### 3.2 Dynamic Cart Drawer Progression Nudges

The cart drawer is the final high-intent touchpoint before checkout.

- **Threshold Mechanics:** If a customer adds a 1-pack to their cart drawer, calculate their distance to Tier 2:
  $$\text{Distance to Next Tier} = \text{Tier 2 Quantity} - \text{Current Cart Quantity}$$
- **Microcopy Template:** `"Add 1 more pouch to unlock 17% OFF (Save $13.00)!"`
- **1-Click Action:** Never force the customer to navigate back to the PDP. Provide an inline button inside the cart drawer line item (`[ + Upgrade to 2-Pack ]`) that updates line-item quantity via AJAX/cart API instantly.

### 3.3 Multi-Variant Selection Rules (Flavor/Size Mixing)

When a quantity break tier allows purchasing 2, 3, or 5 units of a multi-variant product (e.g., t-shirts in 4 colors or supplements in 3 flavors):

- **Default State:** Pre-fill sub-variant selectors with the PDP's currently active flavor/color.
- **Mix & Match Controls:** Reveal clean nested dropdowns or swatches inside the active tier card:
  - *Tier 2 Selected:*
    - Item 1 Flavor: `[ Chocolate ▼ ]`
    - Item 2 Flavor: `[ Vanilla ▼ ]`
- **Avoid Friction:** Do not require sub-variant selection before a user can see the tier price. Default the selections so the "Add to Cart" button remains actionable immediately.
