# Quantity Break & Volume Discount Audit Checklist & Pricing Model Template

Use this comprehensive checklist and financial modeling template to audit existing PDP quantity selectors, establish margin-safe volume discount tiers, and verify mobile-first selector UX compliance.

---

## Part 1: Quantity Break Audit Checklist

### 1. PDP Buy Box & Selector Structure

- [ ] **No Native Dropdowns or Numeric Steppers:** Verify that native HTML `<select>` dropdowns and numeric stepper buttons (`[-] 1 [+]`) are NOT the primary quantity selection UI.
- [ ] **Stacked Interactive Tier Cards Used:** Confirm that tier options are presented as distinct visual cards or pill buttons with clear selection outlines.
- [ ] **3-Tier Limit Compliance:** Ensure no more than 3 primary quantity tiers are displayed on the main PDP buy box to avoid choice overload.
- [ ] **Pre-Selected Default State:** Verify that Tier 2 ("Most Popular") is pre-selected by default upon page load.
- [ ] **High-Contrast Header Badges:** Check that Tier 2 and Tier 3 feature distinct, high-contrast badges (`MOST POPULAR`, `BEST VALUE`, `STOCK UP & SAVE`).

### 2. Microcopy & Per-Unit Pricing Hierarchy

- [ ] **Per-Unit Price Dominance:** Confirm that per-unit prices (`$25.00 / ea`) are displayed in larger, bolder typography than total package prices (`Total: $50.00`).
- [ ] **Strikethrough Original Reference Price:** Verify that the baseline full retail price is rendered as a strikethrough (~~`$30.00`~~) next to the discounted per-unit price.
- [ ] **Explicit Dollar & Percentage Savings Display:** Ensure total dollar savings and percentage discounts are clearly articulated (e.g., `Save $10.00 (17% OFF)`).
- [ ] **Dynamic CTA Synchronization:** Confirm that tapping a tier card instantly updates the main Buy Box button text (e.g., `ADD 2-PACK TO CART — $50.00`).

### 3. Cart Drawer & Threshold Gamification

- [ ] **Cart Drawer Volume Progress Bar:** Verify that the mini-cart features a dynamic progress indicator showing proximity to the next discount tier.
- [ ] **1-Click Cart Upgrade CTA:** Ensure line items in the cart drawer contain a prominent inline upgrade button (e.g., `[ + Add 1 More & Save $10 ]`).
- [ ] **Explicit Savings Itemization in Subtotal:** Confirm that volume discount savings are explicitly displayed as a green negative line item in the cart summary (e.g., `Volume Savings: -$10.00`).

### 4. Touch Ergonomics & Mobile UX Compliance

- [ ] **Mobile Touch Target Dimensions:** Verify that all tier cards have a minimum height of 56px and full-width span on mobile viewports (<480px).
- [ ] **Sticky Mobile Buy Bar Synchronization:** Confirm that scrolling past the buy box activates a sticky bottom bar displaying the currently active tier selection and price.
- [ ] **Multi-Variant Option Selectors:** If ordering a multi-pack, ensure individual flavor/shade/size dropdowns appear inside or immediately below the selected tier card without breaking layout responsiveness.

---

## Part 2: Tier Discount & Contribution Margin Calculator Template

Use this mathematical model to ensure volume discount tiers generate higher net contribution margin dollars than single-unit sales.

### Mathematical Formulas

1. **Per-Unit Price:**
   $$\text{Per-Unit Price} = \frac{\text{Tier Total Price}}{\text{Tier Unit Quantity}}$$

2. **Gross Discount Percentage:**
   $$\text{Discount \%} = \left(1 - \frac{\text{Per-Unit Price}}{\text{Base Retail Price}}\right) \times 100$$

3. **Net Contribution Margin ($):**
   $$\text{Net Contribution Margin} = \text{Tier Total Price} - (\text{Unit COGS} \times \text{Quantity}) - \text{Pick/Pack Fee} - \text{Shipping Cost}$$

4. **Incremental Contribution Margin Lift ($):**
   $$\Delta \text{ Margin} = \text{Tier Net Contribution Margin} - \text{Baseline Single-Unit Contribution Margin}$$

---

### Tier Pricing Model Worksheet

Fill in the template values below before launching volume discount tiers:

| Tier Parameter | Tier 1 (1-Pack Anchor) | Tier 2 (2-Pack Sweet Spot) | Tier 3 (3-Pack Value Anchor) |
| :--- | :--- | :--- | :--- |
| **Unit Quantity ($Q$)** | 1 | 2 | 3 |
| **Base Unit Retail Price ($P_{\text{base}}$)** | $30.00 | $30.00 | $30.00 |
| **Tier Discount Percentage** | 0% | 16.7% | 30.0% |
| **Per-Unit Price ($P_{\text{unit}}$)** | **$30.00 / ea** | **$25.00 / ea** | **$21.00 / ea** |
| **Total Tier Selling Price ($P_{\text{tier}}$)** | **$30.00** | **$50.00** | **$63.00** |
| **Unit COGS ($C_{\text{unit}}$)** | $6.00 | $12.00 ($6.00 × 2) | $18.00 ($6.00 × 3) |
| **Fulfillment Pick/Pack Fee** | $2.50 | $3.20 | $3.80 |
| **Shipping Cost** | $5.50 | $6.50 | $7.50 |
| **Total Variable Cost** | **$14.00** | **$21.70** | **$29.30** |
| **Net Contribution Margin ($)** | **$16.00** | **$28.30** | **$33.70** |
| **Incremental Net Profit vs Tier 1 ($)**| **Baseline ($0)** | **+$12.30 / order** | **+$17.70 / order** |
| **Margin Validation Check** | **PASS** | **PASS (+76.8% Profit)**| **PASS (+110.6% Profit)**|

---

## Part 3: Decision Matrix for Tier Selection

| Scenario / Product Profile | Recommended Tier Structure | Target Pre-Selection | Primary Value Badge |
| :--- | :--- | :--- | :--- |
| **Daily Consumable (Supplements, Coffee)** | 1-Pack / 2-Pack / 3-Pack | 2-Pack | `MOST POPULAR (60-Day Supply)` |
| **Basics Apparel (Socks, T-Shirts, Undies)** | 1-Pack / 3-Pack / 6-Pack | 3-Pack | `BEST VALUE (Save 25%)` |
| **Heavy Household Goods (Detergent, Filters)**| 1-Pack / 2-Pack / 4-Pack | 2-Pack | `STOCK UP & SAVE` |
| **B2B / Wholesale Office Supplies** | 10 Units / 50 Units / 100 Units | 50 Units | `WHOLESALE TIER` |
