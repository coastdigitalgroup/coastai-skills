# Sample & Try-Before-You-Buy (TBYB) Optimization Checklist & Audit Template

Use this template to audit, structure, and optimize paid sample discovery sets, home try-on (TBYB) programs, and credit bounce-back loops.

---

## Part 1: Funnel & Opportunity Diagnostic

- [ ] **1. Drop-Off Identification**: Have you identified PDPs with high traffic but low conversion (<1.5%) caused by sensory (fragrance/color/texture) or fit hesitation?
- [ ] **2. Return Root-Cause Analysis**: Are return logs audited to quantify the percentage of returns due to "didn't match expectations", "wrong size", or "disliked scent/color"?
- [ ] **3. Unit Economics Feasibility**: Is the maximum allowable sample production and shipping cost calculated against expected full-size conversion margins?
  $$\text{Target Sample COGS + Fulfillment} \le \text{Sample Retail Price} + (\text{Target Conversion Rate} \times \text{Full-Size Gross Margin})$$
- [ ] **4. Program Model Selection**: Is the correct trial model chosen based on price point and category?
  - *Paid Discovery Set with 100% Credit*: Recommended for $30–$120 AOV (Cosmetics, Skincare, Fragrance, Coffee/Food).
  - *Try-Before-You-Buy (TBYB) Card Pre-Auth*: Recommended for $120–$500+ AOV (Apparel, Footwear, Eyewear, Home Goods).
  - *Micro-Swatch / Mini Add-On*: Recommended for custom upholstery, wallpaper, or individual luxury hero SKUs.

---

## Part 2: PDP & Buy-Box Interface Design

- [ ] **5. Dual-CTA Hierarchy**: Is the primary full-size "Add to Cart" CTA visually dominant, with the sample/TBYB option styled as a distinct secondary action?
- [ ] **6. Credit Value Prominence**: Is the 100% full-size credit voucher amount (e.g., *"Includes $25 credit toward full size"*) displayed within 20px of the sample trigger button?
- [ ] **7. Microcopy & Trust Badges**: Are key trust triggers visible near the trial button?
  - `✓ 100% Credit Included`
  - `✓ $0 Upfront / Pay After 7 Days` (for TBYB)
  - `✓ Free Prepaid Return Box Included`
- [ ] **8. Mobile Viewport Optimization**: On mobile devices, does the sample/TBYB secondary CTA remain accessible without obscuring screen real estate or breaking thumb-zone ergonomics?
- [ ] **9. Variant Selector Alignment**: If ordering a shade/size sample, does clicking a variant swatch instantly update the corresponding sample pack selection?

---

## Part 3: Checkout, Authorization & Credit Automation

- [ ] **10. Card Pre-Authorization (TBYB)**: For zero-upfront models, is a valid credit card pre-authorized ($1 temporary hold or AVS verification) to prevent fraud?
- [ ] **11. Automated Credit Code Generation**: Are unique, customer-bound promo codes generated automatically upon sample order fulfillment?
- [ ] **12. One-Click Digital Credit Application**: Do post-delivery emails and SMS contain 1-click magic links (`?discount=VOUCHER30`) that auto-apply the credit to the customer's cart session?
- [ ] **13. Frictionless Cart Credit Display**: Does the cart drawer explicitly display the applied sample credit line item (e.g., `Discovery Set Credit: -$25.00`)?
- [ ] **14. Clear Trial Terms**: For TBYB, are the trial start date (Day of Delivery scan) and auto-billing date (Day 8 post-delivery) clearly displayed in cart and checkout?

---

## Part 4: Post-Sample Conversion & Lifecycle Messaging

- [ ] **15. Day 0 Delivery Trigger**: Is an immediate delivery confirmation sent via SMS/email providing sampling instructions and a link to choose their full-size item?
- [ ] **16. Multi-Touch Nudge Sequence**: Is a 4-part automated email/SMS flow configured?
  - *Day 0*: Delivery notification & sampling guide.
  - *Day 3–5*: First credit redemption prompt ("Found your favorite?").
  - *Day 10–14*: Mid-period urgency reminder ("Your credit expires in 14 days").
  - *Day 28–29*: Final 48-hour expiration warning.
- [ ] **17. Zero-Party Data Capture**: Does the sample follow-up survey ask for preference feedback (e.g., "Which scent was your favorite?") to personalize future recommendations?
- [ ] **18. Frictionless Return Portal**: For TBYB, can customers generate a return QR code or drop off unkept items without needing a home printer?

---

## Part 5: Margin Protection, Fraud & Policy Rules

- [ ] **19. Voucher Stacking Prevention**: Is the sample credit code restricted to 1 redemption per transaction, preventing users from stacking multiple sample credits?
- [ ] **20. Expiration Enforcement**: Is the voucher expiration hard-capped (e.g., 30 days for fragrance, 14 days for apparel)?
- [ ] **21. Household & IP Limits**: Are velocity limits in place to prevent bad actors from repeatedly claiming sample credits from the same address or credit card?
- [ ] **22. Automatic Post-Trial Settlement**: For TBYB, does the billing engine automatically charge the vault-stored card for unreturned items on Day 8 post-delivery?

---

## Part 6: KPI & Performance Audit Scorecard

| Metric | Baseline | Target | Post-Audit Result | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- |
| **PDP Visitor Sample/TBYB Opt-In Rate** | `___%` | 8% – 18% | `___%` | [ ] |
| **Sample-to-Full-Size Conversion Rate (30-Day)** | `___%` | 25% – 42% | `___%` | [ ] |
| **Full-Size Order Return Rate** | `___%` | < 6.0% | `___%` | [ ] |
| **Return on Sampling Investment (ROSI)** | `___x` | > 2.5x | `___x` | [ ] |
| **Blended Customer Acquisition Cost (CAC)** | `$___` | 20–40% drop | `$___` | [ ] |
