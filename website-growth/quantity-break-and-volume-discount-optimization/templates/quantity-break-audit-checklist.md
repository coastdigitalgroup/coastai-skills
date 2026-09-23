# Quantity Break & Volume Discount Audit Checklist & Pricing Model

Use this audit checklist and mathematical framework to evaluate existing multi-buy tier structures, quantity selectors, unit price framing, cart drawer volume nudges, and contribution margin guardrails.

---

## Part 1: Quantity Break Audit Checklist (25-Point Checklist)

### 1. Pricing Architecture & Margin Economics (5 Points)
- [ ] **1.1 Unit Cost Profiling:** Are COGS, picking/packing labor fees, and shipping costs explicitly documented for each quantity tier?
- [ ] **1.2 Margin Dollar Expansion:** Does Tier 2 yield at least **1.8x to 2.2x** the net margin dollars of Tier 1 (even with per-unit price reductions)?
- [ ] **1.3 Shipping Threshold Optimization:** Are quantity breaks aligned with shipping rate tiers (e.g., using multi-item orders to cross free shipping thresholds)?
- [ ] **1.4 Discount Floor Guardrails:** Is there a maximum allowable discount ceiling (e.g., capping max volume discount at 40%) to protect brand equity and contribution margin?
- [ ] **1.5 Subscription Compatibility:** Does the volume discount structure cleanly integrate with recurring subscribe-and-save offers without double-discounting?

### 2. PDP Buy Box & Quantity Selection UX (5 Points)
- [ ] **2.1 Visual Tier Cards:** Are quantity breaks rendered as visual, selectable cards rather than hidden dropdowns or passive stepper inputs (`[ - ] 1 [ + ]`)?
- [ ] **2.2 Pre-Selected Tier 2:** Is Tier 2 ("Most Popular") selected by default upon page load to establish a higher price anchor?
- [ ] **2.3 Max 3 Tiers:** Is the PDP buy box limited to 3 distinct quantity options (e.g., 1-Pack, 3-Pack, 6-Pack) to prevent decision paralysis?
- [ ] **2.4 Badge Visual Hierarchy:** Does the target tier feature a prominent highlight badge (e.g., `MOST POPULAR` or `BEST VALUE`) with high-contrast pill styling?
- [ ] **2.5 Dynamic CTA Synchronization:** Does the primary "Add to Cart" CTA button update dynamically with the selected tier package price (e.g., `ADD 3 TUBS TO CART — $91.20`)?

### 3. Price Framing & Value Perception (5 Points)
- [ ] **3.1 Per-Unit Price Prominence:** Is the per-unit price (`$30.40 / bottle`) displayed in larger, bold font than the package total (`$91.20 total`)?
- [ ] **3.2 Dual Discount Framing:** Are savings expressed as both percentage AND total dollar savings (e.g., `SAVE 20% ($22.80 off)`)?
- [ ] **3.3 Strikethrough Reference Anchoring:** Is original non-discounted per-unit price clearly shown in strikethrough styling (`~~$38.00~~ $30.40`)?
- [ ] **3.4 Supply Horizon Mapping:** Is the quantity translated into customer usage timeframes (e.g., `1 Month Supply`, `3 Month Supply`, `6 Month Supply`)?
- [ ] **3.5 Zero Mental Math:** Can a customer understand their exact per-item cost and total savings in under 3 seconds without calculating percentages?

### 4. Variant Selection & Customization Friction (5 Points)
- [ ] **4.1 Mix & Match Variant Selectors:** For multi-unit packs (e.g., 3-pack), can customers select distinct flavors, colors, or sizes for each item in the bundle?
- [ ] **4.2 One-Click "All Same" Shortcut:** Is there an easy "Same Flavor for All" toggle to reduce selection friction for repeat buyers?
- [ ] **4.3 Stock Status Clarity:** Are out-of-stock variants disabled or clearly flagged within individual tier item dropdowns?
- [ ] **4.4 Mobile Touch Target Sizing:** Are selectable quantity cards at least **48px tall** with full-width tapping areas on mobile viewports?
- [ ] **4.5 Smooth State Transition:** Does selecting a new quantity tier update prices instantaneously without layout shifting or page reloads?

### 5. Mini-Cart & Cart Drawer Nudges (5 Points)
- [ ] **5.1 Dynamic Tier Progress Bar:** Does the cart drawer display a visual progress bar indicating closeness to the next discount tier?
- [ ] **5.2 Clear Threshold Microcopy:** Is the microcopy actionable (e.g., `Add 1 more bottle to save $22.80!`) rather than generic?
- [ ] **5.3 1-Click Quantity Upgrade Button:** Can users add the remaining item to reach the next discount tier directly inside the cart drawer with 1 click?
- [ ] **5.4 Cart Line Item Clarity:** Are quantity breaks reflected clearly in the cart line items with applied discount badges?
- [ ] **5.5 No Double Coupon Confusion:** Is the automated volume discount reflected cleanly as a line-item savings rather than requiring promo code input?

---

## Part 2: Quantity Break Pricing & Contribution Margin Calculator

Use these mathematical formulas to calculate discount pricing and verify contribution margin expansion prior to launch.

### Formula 1: Per-Unit Discounted Price
$$\text{Unit Price}_{\text{Tier } n} = \text{Base Price} \times \left(1 - \frac{\text{Discount \%}}{100}\right)$$

### Formula 2: Total Package Price
$$\text{Package Price}_{\text{Tier } n} = \text{Unit Price}_{\text{Tier } n} \times \text{Quantity}_{\text{Tier } n}$$

### Formula 3: Total Dollar Savings
$$\text{Dollar Savings}_{\text{Tier } n} = (\text{Base Price} \times \text{Quantity}_{\text{Tier } n}) - \text{Package Price}_{\text{Tier } n}$$

### Formula 4: Net Contribution Margin Dollars
$$\text{Net Margin Dollars} = \text{Package Price} - (\text{COGS} \times \text{Qty}) - \text{Pick/Pack Fee} - \text{Shipping Cost}$$

---

## Part 3: Tier Pricing & Margin Worked Example Template

| Metric | Tier 1 (1-Pack) | Tier 2 (3-Pack - Target) | Tier 3 (6-Pack - Value) |
| :--- | :--- | :--- | :--- |
| **Quantity** | 1 | 3 | 6 |
| **Base Price / Unit** | $38.00 | $38.00 | $38.00 |
| **Discount Percentage** | 0% | 20% | 35% |
| **Per-Unit Discounted Price** | **$38.00** | **$30.40** | **$24.70** |
| **Total Package Price** | **$38.00** | **$91.20** | **$148.20** |
| **Customer Dollar Savings** | $0.00 | **$22.80** | **$79.80** |
| **COGS / Unit** | $6.00 | $6.00 | $6.00 |
| **Total COGS** | $6.00 | $18.00 | $36.00 |
| **Pick & Pack Labor** | $2.50 | $3.50 | $5.00 |
| **Shipping Cost** | $6.50 | $7.50 | $9.50 |
| **Total Fulfilled COGS** | $15.00 | $29.00 | $50.50 |
| **Net Contribution Margin ($)** | **$23.00** | **$62.20** | **$97.70** |
| **Margin Expansion Factor** | **1.0x (Baseline)** | **2.7x Margin Expansion** | **4.2x Margin Expansion** |

*Verification Check:* Tier 2 yields **$62.20** net margin vs **$23.00** in Tier 1. Selling one 3-pack is **2.7x more profitable** in net dollar terms than selling a single bottle, proving the volume discount structure expands net profit.
