# Digital Gift Card and Store Credit Audit & Optimization Checklist

Use this checklist to systematically evaluate and optimize your website's digital gift card purchasing flow, gifting personalization, cart cross-sells, corporate bulk order capabilities, and recipient redemption experience.

---

## Section 1: Discoverability & Strategic Entry Points

- [ ] **Main Navigation Visibility:** Is there an explicit "Gift Cards" link in the primary header navigation menu during peak gifting seasons (Q4, Mother's Day, Graduation)?
- [ ] **Footer Link Accessibility:** Is "Digital Gift Cards" clearly listed under primary shopping/help links in the site footer?
- [ ] **Search Engine Indexing & On-Site Search:** Does searching for "gift card", "e-gift card", "voucher", or "gift credit" in site search return the digital gift card PDP as the #1 result?
- [ ] **Post-Shipping Cutoff Banners:** Is there an automated rule that updates global top banners to promote instant e-gift cards the moment physical shipping deadlines pass?
- [ ] **Out-of-Stock PDP Fallback:** Do sold-out product variant pages display a secondary prompt offering an instant digital gift card as an alternative?

---

## Section 2: Gift Card PDP & Personalization Controls

- [ ] **Denomination Preset Cards:** Are price options presented as clear button cards ($25, $50, $100, $150, $200) with a pre-selected popular default that matches core product AOV?
- [ ] **Custom Amount Input:** Can buyers enter a custom dollar amount between allowable minimums ($10) and maximums ($1,000)?
- [ ] **Card Artwork / Theme Switcher:** Does the buyer have visual options to select themed card artwork (Birthday, Thank You, Holiday, Graduation, Minimalist)?
- [ ] **Delivery Method Selection:** Can the buyer choose between "Send via Email", "Send via SMS / Messaging", and "Print at Home (PDF)"?
- [ ] **Future Date Scheduling:** Is there an interactive date picker allowing senders to schedule gift delivery for a future date (e.g., birthday morning)?
- [ ] **Sender & Recipient Fields:** Are explicit text inputs provided for Recipient Name, Recipient Contact, Sender Name, and Personal Message?
- [ ] **Message Character Counter:** Is the personal message textarea bounded with a helpful character counter (e.g., max 300 characters)?
- [ ] **Video / Audio Message Attachment:** Is there an option for senders to attach a personalized 30-second video or voice greeting?
- [ ] **Live Interactive Recipient Preview:** Is there a real-time preview component on the PDP showing the exact visual layout the recipient will see in their inbox?

---

## Section 3: Cart Drawer & Contextual Gifting Cross-Sells

- [ ] **Inline Cart Gifting Nudge:** Does the slide-out cart drawer feature a subtle 1-click nudge: *"Shopping for someone else? [Add a Digital Gift Card]"*?
- [ ] **Order-Level Gifting Checkbox:** Can buyers mark an order as a gift directly in the cart drawer or checkout?
- [ ] **Cart Threshold Progress Bar:** Does the cart drawer show progress toward free shipping or bonus gift credits when a gift card is added?

---

## Section 4: Corporate / B2B Bulk Gifting Portal

- [ ] **Dedicated B2B Landing Page:** Is there a dedicated `/pages/corporate-gift-cards` landing page accessible from the main gift card PDP?
- [ ] **CSV Recipient Upload:** Can corporate buyers upload a CSV spreadsheet containing recipient names, emails, denominations, and custom messages?
- [ ] **Bulk Volume Discounts / Bonus Credits:** Are clear volume tiers displayed (e.g., "5% bonus credit on orders over $2,500; 10% on orders over $10,000")?
- [ ] **Corporate Branding Upload:** Can enterprise buyers upload their company logo to appear alongside the brand's gift card artwork?
- [ ] **Flexible B2B Payment Terms:** Does the portal support credit card payment alongside instant pro-forma invoice issuance for wire/ACH payment?

---

## Section 5: Recipient Onboarding & Dual-Tender Checkout

- [ ] **Delight-First Recipient Email:** Does the email notification prominently display the sender's name, personalized message, card artwork, and gift balance?
- [ ] **1-Click Auto-Application Claim Link:** Does the "Claim Gift Credit" button in the email redirect to a landing page that automatically attaches the credit balance to the user's active session?
- [ ] **Sticky Top-Bar Balance Indicator:** Does a persistent banner display during browsing: *"🎁 $100.00 Gift Credit applied to your order!"*?
- [ ] **Dual-Tender Checkout Logic:** Is store credit / gift card balance processed as **Payment Tender**, allowing recipients to stack their credit with promotional discount codes?
- [ ] **Pre-Filled Checkout Code Field:** Is the gift card field automatically populated at checkout when a claim link was clicked or when a user is logged in?
- [ ] **Zero Code-Copy Pain:** Can recipients apply their balance with a single checkbox click without manually copy-pasting alphanumeric string codes?

---

## Section 6: Balance Tracking, Retention & Overspend Loops

- [ ] **Automatic Account Credit Saving:** Is any remaining unspent gift card balance ($4.50) automatically attached to the recipient's customer account for future use?
- [ ] **Account Dashboard Balance Widget:** Can logged-in users view their active store credit balance anytime in their customer account dashboard?
- [ ] **Goal-Gradient Overspend Nudges:** Does the cart drawer encourage overspend by showing how little additional cash is needed to complete an upgraded purchase?
- [ ] **Automated Unredeemed Balance Reminders:** Are automated email/SMS win-back sequences triggered at 30, 60, and 90 days for unredeemed gift balances?

---

## Scoring & Prioritization Scorecard

Evaluate each item on a scale of **0 (Missing / Broken)**, **1 (Partially Implemented)**, or **2 (Optimized)**.

| Category | Max Score | Current Score | Priority Level |
| :--- | :---: | :---: | :---: |
| **1. Site Discoverability & Cutoffs** | 10 | _____ | High |
| **2. Gift Card PDP & Personalization** | 18 | _____ | Critical |
| **3. Cart Cross-Sells & Nudges** | 6 | _____ | Medium |
| **4. Corporate B2B Bulk Portal** | 10 | _____ | High |
| **5. Recipient Onboarding & Dual-Tender Checkout** | 12 | _____ | Critical |
| **6. Balance Tracking & Retention** | 8 | _____ | Medium |
| **TOTAL SCORE** | **64** | _____ | |

- **Score 0–25 (Critical Risk):** Major revenue leakage. Recipient redemption friction is causing high cart abandonment and lost Q4 sales.
- **Score 26–45 (Moderate Performance):** Basic gift card SKU exists, but lacks personalization, date scheduling, corporate bulk features, and dual-tender checkout.
- **Score 46–64 (High-Converting):** Fully optimized digital gift card program driving high GMV, corporate orders, and recipient overspend.
