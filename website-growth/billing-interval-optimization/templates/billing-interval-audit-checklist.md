# Billing Interval Optimization Audit Checklist

Use this checklist to audit and optimize the billing interval selectors, toggle logic, price framing, and checkout alignment of subscription-based platforms.

---

## 1. Visual Selector & Toggle Presentation

- [ ] **Proximity:** Is the monthly/annual switch positioned centrally directly above the main pricing cards?
- [ ] **Interactive Responsiveness:** When a user clicks the toggle, do the numbers on the pricing cards update instantly without layout shifts or noticeable lag?
- [ ] **Mobile Sticky Behavior:** On mobile screens, does the toggle button remain visible (sticky header) or is there an easy way to change the interval without scrolling back to the top?
- [ ] **Minimum Tap Target:** Is the interactive tap target of the toggle switch at least $44\text{px} \times 80\text{px}$ to accommodate mobile touch inputs?
- [ ] **Selected State Prominence:** Is the active interval option clearly highlighted using contrasting colors, while the inactive option is visibly faded or secondary?

---

## 2. Savings Framing & Value Copywriting

- [ ] **tangible Value Highlight:** Is there a visual pill badge or callout next to the Annual toggle switch (e.g., `SAVE 20%` or `GET 2 MONTHS FREE`)?
- [ ] **Double-Price Transparency:** Does the annual pricing card explicitly show both the equivalent monthly rate (for easy comparison) and the actual upfront single payment?
  - *Example:* "$15/mo (Billed annually at $180/yr)"
- [ ] **Absence of Mental Math:** Is the exact absolute yearly savings displayed clearly? (e.g., "Save $60/year" rather than just a percentage).
- [ ] **Dynamic Savings Messages:** Does the copy near the pricing card update based on the selection to reinforce the benefits of switching to the annual plan? (e.g., showing "You are saving $40/yr! 🎉" only when "Annual" is selected).

---

## 3. Choice Defaults & Behavioral Nudges

- [ ] **Data-Driven Initial State:** Does the page load in the optimal default state based on churn metrics? (e.g., defaulting to "Annual" if monthly retention is low, or defaulting to "Monthly" if absolute signup volume is the priority).
- [ ] **"Best Value" Accentuation:** Is the annual version of the target plan visually accented? (e.g., a special border, contrasting CTA, or crown icon that glows when "Annual" is selected).
- [ ] **Implicit Anchoring:** If showcasing multiple plans, does the highest plan utilize its annual discount to make its monthly equivalent feel closer to the mid-tier monthly rate?

---

## 4. Checkout Alignment & State Synchronization

- [ ] **State Preservation:** When a user selects "Annual" on the pricing page and clicks the CTA, does the checkout page open pre-configured in the **Annual** state?
- [ ] **Parameter Tracking:** Are UTM or URL parameters (e.g., `?billing=annual` or `?interval=year`) passed cleanly through custom signup/redirect scripts?
- [ ] **Zero Sticker Shock:** Does the first screen of the checkout flow clearly display the exact single upfront transaction amount?
- [ ] **Automatic Coupon Mapping:** If the annual discount is powered by a promo code, is that discount coupon applied automatically in the checkout cart without requiring the user to type it?

---

## 5. Commitment Anxiety & Risk Reversal

- [ ] **The 30-Day Escape Hatch:** Is there a clear risk-reversal guarantee shown directly below the annual checkout button? (e.g., "30-Day Money-Back Guarantee").
- [ ] **Pro-Rated Refund Policy:** Is there an accessible link or hover tooltip clarifying how unused subscription time is refunded if they downgrade early?
- [ ] **Pre-Renewal Notification:** Is there a reassuring micro-copy promise to send an email reminder 7 days before the annual renewal date?
- [ ] **Self-Serve Cancellation:** Does the FAQ or trust block assure the user that they can easily turn off auto-renewal via their account dashboard without needing to call support?

---

## Audit Scoring Card

Evaluate the subscription interface by assigning points (0 = No, 1 = Partial, 2 = Yes) to the five categories above:

| Category | Score (0-10) | Priority Fixes |
| :--- | :--- | :--- |
| **1. Visual Selector & Toggle** | / 10 | |
| **2. Savings Framing & Copy** | / 10 | |
| **3. Choice Defaults & Nudges** | / 10 | |
| **4. Checkout Alignment** | / 10 | |
| **5. Commitment Anxiety** | / 10 | |
| **TOTAL SCORE** | **/ 50** | **Critical threshold: < 35 requires immediate optimization** |
