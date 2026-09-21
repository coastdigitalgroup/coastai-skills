# Quantity Break and Volume Discount Audit Checklist & Optimization Template

This template provides a comprehensive diagnostic audit checklist, pricing margin safety calculator, and UX implementation specification for optimizing quantity breaks and volume discounts on e-commerce websites.

---

## Part 1: Diagnostic Audit Checklist

Score each item as **PASS**, **FAIL**, or **NEEDS IMPROVEMENT**.

### 1. Buy Box & Visual Selector Architecture
- [ ] **Upfront Visibility:** Are quantity discount tiers visible immediately upon landing on the PDP without requiring clicks on dropdown menus or accordion toggles?
- [ ] **Tier Pill Layout:** Are quantity tiers presented as distinct, clickable cards/pills rather than a standard numeric `- 1 +` stepper?
- [ ] **Pre-Selected Default:** Is Tier 2 ("Most Popular") pre-selected by default when the PDP loads?
- [ ] **Visual Badging:** Are high-converting tiers clearly tagged with visual badges such as `"MOST POPULAR"` or `"BEST VALUE"`?
- [ ] **Limit Cognitive Load:** Is the total number of quantity break tiers capped at 3 tiers for B2C consumer products?

### 2. Price Framing & Typographic Hierarchy
- [ ] **Per-Unit Dominance:** Is the **per-unit price** (e.g., `$24.00/unit`) displayed as the primary bold typographic callout?
- [ ] **Total Tier Price Display:** Is the total tier subtotal (e.g., `$72.00 total`) displayed clearly as secondary supporting text?
- [ ] **Savings Transparency:** Is the explicit dollar amount saved (e.g., `Save $18.00 (20% OFF)`) displayed prominently on each tier card?
- [ ] **Strikethrough Original Pricing:** Does the multi-unit tier display original non-discounted strikethrough pricing (e.g., ~~$90.00~~ `$72.00`)?

### 3. Variant & Flavor Selection UX
- [ ] **Mix-and-Match Support:** For multi-variant products (flavors, colors, scents), can customers select different variants for each unit in a multi-pack?
- [ ] **Frictionless Selector Dropdowns:** Are variant dropdowns cleanly rendered within or immediately below the selected tier card without cluttering the viewport?
- [ ] **Default Variant Sync:** Do variant selectors inherit smart default choices to avoid forcing repetitive selections?

### 4. Cart Drawer & Upsell Nudges
- [ ] **Volume Progress Bar:** Does the cart drawer display a dynamic visual progress bar indicating how many additional units are required to unlock the next volume discount threshold?
- [ ] **1-Click Cart Upgrade:** Can single-unit buyers upgrade to a multi-unit tier directly inside the cart drawer with a single click?
- [ ] **Cart Line Item Breakdown:** Does the cart drawer line item clearly show the applied volume discount badge (e.g., `15% Volume Savings Applied`)?

### 5. Financial Margin Safety & Platform Integration
- [ ] **Incremental Margin Protection:** Does every higher quantity tier produce higher net contribution profit dollars than the lower tier?
- [ ] **Automatic Script Execution:** Are volume discounts calculated automatically via backend cart scripts without requiring promo code inputs?
- [ ] **Promo Code Stacking Safeguards:** Are automatic volume discounts protected against unauthorized double-discounting with external coupon codes?

---

## Part 2: Quantity Tier Pricing & Profitability Calculator

Use this framework to establish margin-safe volume discount pricing tiers.

### Input Variables
- **Standalone Retail Price ($):** `[ P_1 ]`
- **Unit COGS ($):** `[ COGS ]`
- **Base Shipping & Fulfillment Cost (1 Unit) ($):** `[ Ship_1 ]`
- **Incremental Fulfillment Cost per Additional Unit ($):** `[ Inc_Ship ]`
- **Merchant Payment Fee (% + $):** `[ Fee_Pct + Fee_Fixed ]`

### Calculation Formulas

#### Tier 1 (1 Pack - Standalone)
- **Revenue ($):** $R_1 = P_1$
- **Total Cost ($):** $C_1 = \text{COGS} + \text{Ship\_1} + (R_1 \times \text{Fee\_Pct} + \text{Fee\_Fixed})$
- **Net Contribution Dollars ($):** $M_1 = R_1 - C_1$

#### Tier 2 (2 Pack - Target 15% Discount)
- **Proposed Tier Price ($):** $R_2 = P_1 \times 2 \times (1 - D_2)$  *(where $D_2$ is discount %, e.g., 0.15)*
- **Total Cost ($):** $C_2 = (\text{COGS} \times 2) + \text{Ship\_1} + \text{Inc\_Ship} + (R_2 \times \text{Fee\_Pct} + \text{Fee\_Fixed})$
- **Net Contribution Dollars ($):** $M_2 = R_2 - C_2$
- **Margin Safety Test:** $M_2$ MUST BE $> M_1$. If $M_2 \le M_1$, reduce discount $D_2$.

#### Tier 3 (3 Pack - Target 25% Discount)
- **Proposed Tier Price ($):** $R_3 = P_1 \times 3 \times (1 - D_3)$ *(where $D_3$ is discount %, e.g., 0.25)*
- **Total Cost ($):** $C_3 = (\text{COGS} \times 3) + \text{Ship\_1} + (\text{Inc\_Ship} \times 2) + (R_3 \times \text{Fee\_Pct} + \text{Fee\_Fixed})$
- **Net Contribution Dollars ($):** $M_3 = R_3 - C_3$
- **Margin Safety Test:** $M_3$ MUST BE $> M_2$. If $M_3 \le M_2$, reduce discount $D_3$.

---

## Part 3: Quantity Break Specification Sheet (Project Handoff Template)

```markdown
### Project: Quantity Break Implementation Specification

#### 1. PDP Buy Box Configuration
- **Product Target:** [ Product Name / SKU Category ]
- **Default Selected Tier:** Tier 2 (2-Pack)
- **Tier 1 Specs:**
  - Unit Qty: 1
  - Badge: None
  - Headline: "1 Unit"
  - Subtext: "Standard Single Unit"
  - Price Display: "$[ Price ] / ea"
- **Tier 2 Specs:**
  - Unit Qty: 2
  - Badge: "MOST POPULAR" (Color: Primary Accent)
  - Headline: "2 Units (Save [ X ]%)"
  - Subtext: "Free Express Shipping Included"
  - Price Display: "$[ Discounted Per Unit Price ] / ea"
- **Tier 3 Specs:**
  - Unit Qty: 3
  - Badge: "BEST VALUE" (Color: Secondary Highlight)
  - Headline: "3 Units (Save [ Y ]%)"
  - Subtext: "Free Shipping + Free Gift Included"
  - Price Display: "$[ Lowest Per Unit Price ] / ea"

#### 2. Cart Drawer Upsell Configuration
- **Threshold Rule:** If Cart Quantity == 1, display Cart Upgrade Card.
- **Upgrade Headline:** "Add 1 more to unlock 15% OFF & FREE SHIPPING!"
- **Button CTA:** "[ + Add 2nd Unit for $[ Delta Price ] ]"
- **Behavior:** 1-Click dynamic cart update via Cart API without page reload.
```
