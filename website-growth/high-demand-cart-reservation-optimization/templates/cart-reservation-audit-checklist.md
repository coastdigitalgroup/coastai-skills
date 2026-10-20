# High-Demand Cart Reservation Audit Checklist

Use this checklist to audit high-demand product drops, ticket launches, flash sales, and limited inventory checkout flows.

---

## 1. Inventory Holding Logic & Lock Triggers

- [ ] **Lock Trigger Point Clarified:** Is inventory locked on "Add to Cart", "Begin Checkout", or "Submit Payment"?
- [ ] **Zero Stock-Snipe Guarantee:** Are items guaranteed not to sell out while the user is actively completing fields within their valid reservation window?
- [ ] **Phantom Lock Prevention:** Are holds capped between 8 and 15 minutes to prevent abandoned carts from freezing inventory indefinitely?
- [ ] **Server-Side State Enforcement:** Is the hold timer backed by server-side TTL (e.g., Redis / Database locks) rather than client-side JavaScript alone?

---

## 2. Timer Presentation & Reassurance UX

- [ ] **Persistent Status Visibility:** Is the reservation timer clearly visible across cart drawers, checkout step headers, and mobile views?
- [ ] **Reassuring Copy:** Does the UI explicitly state: *"Reserved for [MM:SS] • Stock guaranteed while timer is active"*?
- [ ] **Non-Panic Styling:** Does the timer use clear, authoritative branding rather than hostile, flashing red animations that induce false panic?
- [ ] **Mobile Responsiveness:** Is the sticky reservation header responsive and non-intrusive on small viewports?

---

## 3. Extension Mechanics & Active Progress Detection

- [ ] **Active Progress Extension:** Does typing shipping details or interacting with checkout fields grant a subtle +3 to +5 minute hold extension?
- [ ] **1-Click Manual Extension Option:** Does an inline prompt appear at 2 minutes remaining offering a single `[Extend Reservation (+5 Min)]` action?
- [ ] **Single Extension Rule:** Is manual extension capped at a maximum of 1 time per session to prevent infinite cart hoarding?
- [ ] **Express Checkout Integrity:** Do Apple Pay, Shop Pay, and PayPal modals preserve active reservation status during payment authentication?

---

## 4. Expiration & Stock-Release Recovery

- [ ] **Clear Expiration Feedback:** If the timer reaches 00:00 and stock is exhausted, is the user shown an explicit explanatory message instead of a silent cart wipe?
- [ ] **Soft Refresh Behavior:** If stock remains available when the timer expires, does the system automatically refresh the hold for an additional 5 minutes?
- [ ] **Instant Release Notifications:** When expired holds release stock, are waiting buyers on the product page notified instantly via web socket or real-time UI badges?
- [ ] **Waitlist / Back-in-Stock Trigger:** Does an expired item in cart offer a 1-click option to join an instant SMS/Push release alert queue?

---

## 5. Key Metrics Tracking

- [ ] **Cart-to-Checkout Completion Rate:** Tracked before and after reservation optimization.
- [ ] **Mid-Checkout Out-of-Stock Error Rate:** Target <1%.
- [ ] **Inventory Turnover Velocity:** Total duration to sell through allocated drop inventory.
- [ ] **Support Ticket Volume:** Drop-day complaints regarding checkout stockout errors.
