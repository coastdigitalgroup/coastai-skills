# Returns & Exchanges Audit Checklist & Decision Framework

This template provides a comprehensive checklist and financial decision matrix for auditing customer return flows, evaluating exchange incentives, and eliminating return friction.

---

## 1. Return Experience Audit Checklist

### A. Portal Accessibility & Self-Service (25 Points)
- [ ] **Direct Access:** Is the return portal easily accessible from the website footer, order confirmation emails, and customer account dashboard?
- [ ] **Low-Friction Authentication:** Can customers initiate a return using only Order # + Zip/Email (without forcing password resets or support logins)?
- [ ] **Self-Service Automation:** Can returns/exchanges be submitted 24/7 without waiting for a customer service agent's approval?
- [ ] **Mobile-Responsive UI:** Is the return submission flow fully optimized for mobile viewports with large touch targets?
- [ ] **Printerless Shipping Options:** Are QR-code carrier drop-off options (e.g., Happy Returns, UPS/FedEx QR codes) supported?

### B. Exchange & Retention Mechanics (30 Points)
- [ ] **1:1 Variant Swaps:** When a user selects "Too Small" or "Too Large", is an instant size exchange recommendation presented immediately?
- [ ] **Real-Time Inventory Sync:** Does the portal query live inventory to ensure recommended exchange sizes are actually in stock?
- [ ] **"Shop Now" Catalog Gateway:** Can customers use their return value to shop the entire catalog instead of being limited to the same item?
- [ ] **Bonus Credit Incentives:** Is extra store credit (e.g., +10-15% bonus credit) offered to choose store credit over a card refund?
- [ ] **Instant Credit Trigger:** Is store credit issued upon carrier package scan rather than waiting for warehouse arrival?

### C. Policy Transparency & Microcopy (25 Points)
- [ ] **PDP Policy Badges:** Do product detail pages feature trust badges emphasizing "Free & Easy Exchanges within X Days"?
- [ ] **Clear Return Policy Page:** Does the policy page use clear visual FAQs, timeline steps, and comparison tables rather than dense legal jargon?
- [ ] **Fee Transparency:** Are return shipping fees or handling charges explicitly declared before the customer submits their request?
- [ ] **Non-Returnable Item Warnings:** Are final-sale or non-returnable items clearly flagged on the PDP and checkout cart?

### D. Operational & Post-Return Re-engagement (20 Points)
- [ ] **Transactional Status Emails:** Do customers receive automated updates when their return is received, processed, and credited?
- [ ] **Unused Credit Reminders:** Are automated email/SMS reminders sent at Day 3, 7, and 14 for unused exchange store credit?
- [ ] **Return Reason Categorization:** Are return reason codes tied to product team feedback loops (e.g., flagging items that run small)?

---

## 2. Store Credit Bonus Incentive Calculator Matrix

Use this decision matrix to determine the optimal bonus credit offer based on product gross margin and average order value (AOV).

| Product Gross Margin % | Recommended Bonus Credit % | Example: $100 Item Return Value | Net Revenue Retained | COGS of Bonus Credit | Net Gain vs. Refund |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **70%+ (High Margin)** | **15% - 20%** | $100 Cash vs $120 Credit | $120 retained sale | $6.00 | **+$94.00** |
| **50% - 69% (Mid Margin)** | **10% - 15%** | $100 Cash vs $110 Credit | $110 retained sale | $4.40 | **+$105.60** |
| **30% - 49% (Low Margin)** | **5% - 10%** | $100 Cash vs $105 Credit | $105 retained sale | $3.15 | **+$101.85** |

*Formula for Net Gain vs Cash Refund:*
$$\text{Net Gain} = \text{Retained Order Value} - \text{COGS of Bonus Credit} - \text{COGS of Base Product}$$

---

## 3. Return Reason & Recovery Action Map

| Tagged Return Reason | Primary Recommended Action | Secondary Fallback Action | Incentive Level |
| :--- | :--- | :--- | :--- |
| **Too Small / Too Big** | 1:1 Size Swap (Same Product) | "Shop Now with Credit" Gateway | Free return shipping |
| **Color / Style Discrepancy** | 1:1 Color Swap or Alternative Style | "Shop Now with Credit" + Bonus | Free return shipping + $10 Bonus |
| **Don't Like / Changed Mind** | "Shop Now with Credit" + Bonus | Original Payment Refund (Minus Fee) | +15% Store Credit Bonus |
| **Defective / Damaged** | Instant Free Replacement (No Return Required for <$30) | Full Cash Refund + Apology Gift | Free expedited shipping |
| **Late Delivery** | "Shop Now with Credit" + $15 Credit | Full Cash Refund | Free return shipping + $15 Credit |

---

## 4. Return Portal Friction Scorecard

Assign scores (1 = High Friction / Poor, 5 = Frictionless / Excellent) to evaluate your current return portal against industry standards:

| Criteria | Score (1-5) | Notes & Action Items |
| :--- | :--- | :--- |
| **Authentication Ease** | | *(Requires password = 1, Order # + Zip = 5)* |
| **Exchange Prominence** | | *(Hidden refund default = 1, Instant size swap shown first = 5)* |
| **Mobile UX & Printerless** | | *(Requires PDF printing = 1, QR-code drop-off = 5)* |
| **Credit Issuance Speed** | | *(10-day warehouse wait = 1, Instant carrier scan = 5)* |
| **Incentive Framing** | | *(Zero incentive = 1, +15% bonus store credit = 5)* |

**Target Total Score:** **22 - 25 Points** (Scores under 18 indicate severe return value leak requiring immediate optimization).
