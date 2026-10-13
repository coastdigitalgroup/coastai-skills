# High-Demand Cart Reservation Audit Checklist

Use this checklist to audit, evaluate, and optimize temporary cart holds, inventory reservation timers, checkout queue mechanics, and stock-release recovery flows during high-demand product drops and flash sales.

---

## 1. Backend Inventory Allocation & Lock Mechanics

- [ ] **Atomic Hold Execution:** Are inventory holds created atomically in memory (e.g., Redis Lua script or database transaction) to prevent race conditions during high-concurrency spikes?
- [ ] **Hold Trigger Alignment:** Is the hold trigger explicitly aligned with drop dynamics?
  - *Ultra-limited (< 500 units):* Hold created upon "Add to Cart".
  - *High-demand drop (500–10,000 units):* Hold created upon "Proceed to Checkout".
- [ ] **Guaranteed Reservation Integrity:** Does the backend enforce 100% reservation integrity? (If the UI tells the user items are reserved, are those items strictly excluded from available inventory for other buyers?)
- [ ] **Server Session Binding:** Is the reservation tied to a secure server-side session or JWT token, preventing users from bypassing timers via URL/cookie manipulation?
- [ ] **Cart Limit & Anti-Hoarding Rules:** Are per-customer item quantity limits enforced on holds (e.g., max 2 units per SKU) to prevent bots or bad actors from locking up total inventory?

---

## 2. Timer UX, Microcopy & Positioning

- [ ] **Absolute Timestamp Calculation:** Is the countdown timer calculated against absolute server timestamps (`expiryTimestamp - Date.now()`) rather than client-side `setInterval` decrements?
- [ ] **Background Tab Resiliency:** Does the timer retain perfect time accuracy when the user switches tabs, locks their mobile phone, or experiences brief network toggles?
- [ ] **Persistent Sticky Visibility:** Is the reservation bar prominently sticky at the top or bottom of the viewport across all checkout steps (Cart, Shipping, Payment)?
- [ ] **Reassuring Copy Framing:** Does the microcopy emphasize guarantee and calm progression? (e.g., *"Items locked for [ 07:30 ]. Complete checkout before time expires."*)
- [ ] **No Fake Urgency:** Is the reservation timer strictly disabled when catalog products have unlimited or deep standard inventory?

---

## 3. Expiration Warnings & Extension Mechanics

- [ ] **Low-Time Visual State (< 2 Minutes):** Does the timer visually transition (e.g., shift to amber/warm badge) with a subtle pulse when under 2 minutes remaining?
- [ ] **One-Click Time Extension Option:** Can users request a single time extension (+2 to +3 minutes) directly from the timer bar if actively filling form fields?
- [ ] **Inventory Availability Check on Extension:** Does the extension request verify available unallocated stock or queue depth before granting additional time?
- [ ] **Active Payment Gateway Shield:** Is the reservation automatically shielded/buffered during active payment gateway redirects (e.g., Stripe 3DS, Apple Pay, PayPal popup)?

---

## 4. Stock-Release & Expiration Recovery UX

- [ ] **Soft Stock-Release (Stock Available):** If the timer expires but stock remains available, are cart items preserved and given a 1-click re-lock CTA instead of clearing the cart?
- [ ] **Partial Cart Handling (Stock Partially Depleted):** If only 1 out of 3 cart items sells out upon expiration, does the system remove *only* the depleted SKU while leaving the rest of the cart intact?
- [ ] **Sold-Out SKU Notification:** Does sold-out item messaging clearly explain: *"Size Large sold out while reservation expired"*, with an instant "Notify on Restock" option?
- [ ] **No Forced Homepage Redirects:** Does expiration keep the user inside the cart/checkout context rather than abruptly redirecting them to the homepage or 404 page?

---

## 5. Mobile & Accessibility Compliance (WCAG AA)

- [ ] **Mobile Keyboard Safety:** Does the sticky timer bar accommodate mobile virtual keyboards without obscuring primary inputs or CTA buttons?
- [ ] **Touch Target Size:** Are extension CTAs and notification buttons at least 48px x 48px on touch viewports?
- [ ] **ARIA Live Region:** Is the timer container decorated with `aria-live="polite"`?
- [ ] **Throttled Screen Reader Announcements:** Are screen reader timer announcements throttled (e.g., announcing remaining time at 5 min, 2 min, 1 min, 30 sec) to prevent speech synthesizer overload?
- [ ] **Color Contrast & Motion Safety:** Does the timer text maintain a minimum contrast ratio of 4.5:1, and does timer pulse animation honor `prefers-reduced-motion` settings?

---

## Audit Rating Scale

| Category | Score (1-5) | Action Needed |
| :--- | :--- | :--- |
| **Backend Hold Lock Integrity** | | |
| **Timer UX & Microcopy** | | |
| **Expiration & Extension Logic** | | |
| **Stock-Release Recovery UX** | | |
| **Mobile & Accessibility** | | |

* **Score 22–25:** Highly optimized. Drop-ready with zero phantom cart risk.
* **Score 16–21:** Minor friction. Risk of timer drift or mobile keyboard overlap.
* **Score < 16:** High risk of oversells, cart panic, customer support overload, and drop failure.
