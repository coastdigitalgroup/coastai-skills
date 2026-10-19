# High-Demand Cart Reservation Audit Checklist & Optimization Template

Use this checklist and specification template to evaluate, design, and optimize temporary inventory cart reservations, holds, countdown timers, and stock-release recovery flows during high-demand sales events.

---

## Part 1: High-Demand Cart Reservation Audit Checklist

### 1. Reservation & Lock Architecture Audit

- [ ] **Hard Lock Verification:** Does adding an item to cart or entering checkout create an actual backend reservation lock (e.g., Redis TTL key or DB soft hold)?
- [ ] **Lock Point Evaluation:** Is inventory locked at an appropriate point (recommended: upon passing anti-bot verification at "Begin Checkout") rather than unverified "Add to Cart"?
- [ ] **Duration Adequacy:** Is the hold duration aligned with actual user form completion times (e.g., 5–7 mins for Express Pay; 8–10 mins for full shipping/card entry)?
- [ ] **Multi-Tab Sync:** Are reservation timers synchronized across multiple open browser tabs using `LocalStorage` or `BroadcastChannel` to prevent timer-reset hacks?
- [ ] **Anti-Bot Challenge:** Is anti-bot/CAPTCHA verification positioned *before* reservation key issuance to prevent script bots from exhausting stock?

### 2. User Interface & Visual Reassurance Audit

- [ ] **Authentic Countdown Banner:** Is there a visible, non-panicky sticky banner or badge displaying exact time remaining (e.g., `🔒 Reserved for 08:00`)?
- [ ] **Explicit Guarantee Copy:** Does microcopy explicitly clarify what the timer means (e.g., *"Your items are reserved while you finish checkout"* vs vague *"Hurry, order soon!"*)?
- [ ] **Price & Quantity Lock:** Are item prices, applied discounts, and unit quantities locked during the reservation period?
- [ ] **Mobile Viewport Clarity:** Is the reservation timer clearly visible on mobile screens without obscuring primary CTA buttons or input fields?

### 3. Adaptive Extension & Activity Sensing Audit

- [ ] **Active Typing Sensing:** Does the system monitor user typing/interaction on billing and shipping form fields?
- [ ] **Proactive Grace Extension:** If timer reaches `< 60 seconds` while the user is actively filling out fields, does it grant a one-time 2–3 minute extension?
- [ ] **Inactivity Warning:** If the user is idle for `> 3 minutes`, does an overlay or modal appear prompting them to confirm they are still there?
- [ ] **Single Extension Limit:** Is the extension strictly capped at ONE extension per session to prevent squatting?

### 4. Expiration & Stock-Release Recovery Audit

- [ ] **Transparent Timeout Modal:** When a reservation expires, is a helpful modal presented explaining that stock was released to the next buyer in line?
- [ ] **One-Click Availability Re-Check:** Does the timeout screen offer a primary `"Check Current Availability"` button without forcing the user to rebuild their cart?
- [ ] **Real-Time Secondary Queue:** If inventory is sold out, is there a waiting queue option for shoppers to grab carts freed by other users' expired holds?
- [ ] **Fast Inventory Turnover:** Is expired cart inventory returned to active pool within `< 10 seconds` of expiration?

---

## Part 2: Cart Reservation Specification Template

Use this template to specify engineering and UX requirements for high-demand launch events.

### A. Event & Target Parameters

```text
Event Name: [e.g., Summer Limited Edition Capsule Drop]
Target Launch Date & Time: [e.g., 2026-06-15 12:00:00 EST]
Total Available Units: [e.g., 1,500 units across 4 SKU variants]
Expected Peak Traffic: [e.g., 25,000 concurrent visitors]
Primary Target Metric: [e.g., Checkout Completion Rate > 55%; Phantom Stockouts < 0.5%]
```

### B. Hold Duration Rules Matrix

| User Path / Payment Method | Base Hold Duration | Grace Period Extension | Max Total Hold Limit |
| :--- | :--- | :--- | :--- |
| **Express Pay (Apple Pay / Shop Pay)** | 5 Minutes (300s) | +2 Minutes (120s) | 7 Minutes (420s) |
| **Standard Form Checkout** | 8 Minutes (480s) | +2 Minutes (120s) | 10 Minutes (600s) |
| **High-Ticket / Custom Option Items** | 12 Minutes (720s) | +3 Minutes (180s) | 15 Minutes (900s) |

### C. Recommended Microcopy Matrix

```text
1. Active Hold Banner (Checkout Header):
   "🔒 Inventory Reserved: [MM:SS] — Completing checkout locks your order."

2. Grace Extension Toast Notification:
   "We added +2:00 extra minutes to your hold so you can finish entering payment details safely."

3. Idle Warning Modal (< 01:30 remaining):
   "Still checking out? Your cart reservation expires in 01:30. Click below to keep your items."
   [Button: Keep My Reservation]

4. Timeout & Stock Release Modal:
   "Your 8-minute reservation expired and items were released to the next buyer in line."
   [Button: Re-Check Item Availability]  [Link: Continue Shopping]

5. Secondary Waiting List Alert:
   "Good news! A Size Medium was just freed up from an expired cart. Claim it now!"
   [Button: Claim & Reserve (5:00 Hold)]
```

---

## Part 3: Verification & Test Protocol

Before going live with a high-demand sales drop, run these 4 scenario tests:

1. **The Multi-Tab Stress Test:** Open checkout in Tab A. Note timer at 07:30. Open Tab B. Verify Tab B reads exactly 07:30 and refreshing Tab B does NOT reset timer to 08:00.
2. **The Active Typing Auto-Extension Test:** Allow timer to run down to 00:45. Begin typing in the Credit Card field. Verify grace extension toast triggers and timer updates to 02:45.
3. **The Hard Timeout Stock Return Test:** Allow timer to hit 00:00 without typing. Verify backend lock key expires, cart updates to released state, and secondary queue receives availability event within 5 seconds.
4. **The Bot Challenge Placement Test:** Attempt programmatic POST request to reservation endpoint without valid CAPTCHA token. Verify API returns HTTP 429 / 403 without issuing an inventory lock.
