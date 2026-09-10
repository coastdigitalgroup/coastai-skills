# Loyalty & Rewards Program Audit Checklist & Optimization Template

This template provides a systematic audit framework to evaluate, diagnose, and optimize e-commerce customer loyalty programs, rewards currencies, and VIP tier structures.

---

## 1. Executive Program Health Scorecard

Calculate baseline performance across core retention metrics before initiating program redesign.

| Metric | Benchmark / Healthy Target | Current Baseline | Status (Pass/Fail/Warning) |
| :--- | :--- | :--- | :--- |
| **Loyalty Enrollment Rate (at Checkout)** | >50% of purchasing customers | | |
| **Point Redemption Rate** | 30% to 50% of issued points | | |
| **Code / Voucher Abandonment Rate** | <15% of claimed rewards | | |
| **90-Day Repeat Purchase Rate (Members)** | >30% repeat conversion | | |
| **Time Between 1st and 2nd Purchase** | <60 days (consumable DTC) | | |
| **Member vs. Non-Member LTV Delta** | +25% higher LTV for members | | |

---

## 2. Loyalty Audit Checklist

### Section 1: Program Economics & Point Currency Clarity

- [ ] **Standardized Conversion Math:** Does the program use simple decimal math (e.g., 100 Points = $1.00 USD)?
- [ ] **Effective Giveback Percentage:** Is the default earn rate structured between **3% and 7%** of net spend (e.g., spend $100 -> earn $5.00 reward value)?
- [ ] **Monetary Value Framing:** Are point balances everywhere displayed alongside their cash value equivalent (e.g., `450 Points ($4.50 Value)`)?
- [ ] **PDP Point Calculator:** Does the Product Detail Page (PDP) display earned reward points directly under or adjacent to the item price?
- [ ] **Margin Protection Caps:** Are point redemptions capped per order (e.g., max $20 point discount per cart) to protect unit gross margins?

---

### Section 2: Onboarding & Enrollment Friction

- [ ] **Auto-Enrollment at Checkout:** Are guest buyers automatically enrolled when they create an account during checkout or place an order?
- [ ] **Zero-Click Welcome Bonus:** Do new members receive an instant welcome bonus (e.g., 200 points = $2.00) upon account creation to leverage the Endowed Progress Effect?
- [ ] **Header / Navigation Visibility:** Is the customer's point balance visible in the main header bar or user account menu when logged in?
- [ ] **Explicit Member Benefits Table:** Is there a simple 3-column benefit table on the `/rewards` page clearly explaining how to earn and redeem?

---

### Section 3: Cart Drawer & Checkout 1-Click Point Redemption

- [ ] **In-Cart Redemption UI:** Can logged-in members select and apply point rewards directly inside the slide-out cart drawer without navigating to a separate page?
- [ ] **Zero Copy-Paste Code Wall:** Does redeeming points apply an automatic cart/checkout order discount instead of forcing users to copy and paste a coupon code?
- [ ] **1-Click Dropdown / Range Slider:** Is the redemption control designed as a pre-set dropdown ($2, $5, $10 off) or continuous slider optimized for mobile touch targets?
- [ ] **Stackability Protection:** Can point discounts be combined with site-wide sales or express payment methods (Apple Pay, Shop Pay)?
- [ ] **Goal-Gradient Nudge:** Does the cart display a dynamic micro-progress bar showing how close the user is to their next point redemption threshold or VIP tier perk?

---

### Section 4: VIP Tiers & Retention Lifecycle

- [ ] **3-Tier Structure:** Are VIP tiers limited to 3 distinct levels (e.g., Silver / Gold / Platinum) with meaningful, escalating perks?
- [ ] **Tier Earning Multipliers:** Do higher tiers offer accelerated point earning rates (e.g., 1.5x or 2x points per dollar)?
- [ ] **Visual Tier Progress Bar:** Is a progress bar displayed in the customer dashboard showing dollars needed to reach the next tier?
- [ ] **Automated Loss-Aversion Triggers:** Are automated email and SMS workflows active to warn members 30 days and 7 days before point expirations or tier status resets?
- [ ] **Exclusive Non-Monetary Perks:** Do top-tier VIPs receive non-discount perks such as early access to new product drops or free express shipping?

---

## 3. UI/UX Specification & Microcopy Template

Use this ready-to-deploy copy spec for PDPs, cart drawers, and email notifications.

### A. Product Detail Page (PDP) Earn Badge
> **Microcopy:** `🎁 Earn {points_earned} Rewards Points (${dollar_value} value) with this purchase.`
> **Placement:** Directly below the product price or Buy Box CTA.

### B. Cart Drawer 1-Click Redemption Widget
> **Header:** `🎁 Glow Rewards: You have {user_points} Points (${user_dollar_value} Value)`
> **Dropdown Label:** `Select Reward to Apply`
> **Option 1:** `Apply $2.00 Off ({tier_1_pts} pts)`
> **Option 2:** `Apply $5.00 Off ({tier_2_pts} pts)`
> **Confirmation:** `✓ ${applied_amount} instant discount applied!`

### C. Goal-Gradient Cart Progress Bar
> **State A (Incomplete):** `Add ${dollars_remaining} more to unlock FREE Express Shipping & 2x Points!`
> **State B (Unlocked):** `🎉 VIP Gold Perk Unlocked: You earned Free Express Shipping!`

### D. Automated Expiration / Loss-Aversion Email
> **Subject Line:** `⚠️ Don't let your ${dollar_value} reward expire!`
> **Body:** `Hi {first_name}, you currently have {user_points} Glow Points (${dollar_value} value) waiting in your account. Your points expire in 7 days! Click below to apply your points instantly to your next order.`
> **CTA Button:** `[ Redeem My ${dollar_value} Reward Now ]`

---

## 4. Scoring & Prioritization Matrix

Assign 1–5 points per category to prioritize engineering and design effort:

- **17–20 Points:** Optimized Loyalty Ecosystem (Maintain and test incremental tier perks).
- **12–16 Points:** Moderate Friction (Focus immediately on 1-click in-cart redemption).
- **<12 Points:** Severe Loyalty Leakage (Full program overhaul required; simplify currency and automate enrollment).
