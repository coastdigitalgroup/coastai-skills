# Reservation Psychology & Inventory Heuristics Reference

This reference guide details behavioral psychology principles, inventory hold duration heuristics, anti-hoarding strategies, and queue design rules for high-demand sales drops.

---

## 1. Behavioral Psychology of Cart Holds & Drop Scarcity

During limited drops and high-demand flash sales, user decision-making shifts from standard deliberate evaluation to high-arousal stress states. Understanding these behavioral mechanics helps design fair, conversion-maximizing flows.

### Loss Aversion & Endowment Effect
- **The Psychological Mechanism:** When a buyer adds a scarce item to their cart and sees a guaranteed reservation timer (e.g., *"Item Locked for 8:00"*), psychological ownership is established immediately (the Endowment Effect).
- **Impact on Conversion:** Loss aversion dictates that losing an item already perceived as "yours" hurts twice as much as not finding it initially. Clear reservation guarantees leverage loss aversion to drive fast checkout completion without causing anger.
- **The Threat of Phantom Loss:** If the system breaks this implicit promise by showing "Sold Out" at payment submission, the buyer experiences extreme frustration, feeling their "property" was stolen by system incompetence.

### Cognitive Overload & Panic Errors
- **The Problem:** Flashing red timers, siren icons, and aggressive warning overlays create acute cognitive anxiety. Stressed users make input errors (typos in email, mistyped credit card numbers, wrong zip codes).
- **The Design Solution:** Timers should communicate **reassurance**, not panicky threat.
  - *Bad Copy:* `"HURRY! YOUR CART IS ABOUT TO BE DELETED IN 02:00!"`
  - *Good Copy:* `"🔒 Guaranteed Reservation: Your stock is locked for 02:00 while you complete payment."`

---

## 2. Inventory Reservation Duration Heuristics

Selecting the optimal reservation hold window requires balancing **Human Form Speed** against **Inventory Lock Velocity**.

```text
[Too Short: < 4 Mins]  ---> High drop-off due to human typing errors & payment 3DS friction
[Optimal: 5–10 Mins]   ---> Balances human completion needs with high inventory turnover
[Too Long: > 15 Mins]  ---> Inventory squatted by indecisive buyers & bots; high artificial stockout
```

### Strategic Duration Recommendations Matrix

1. **Express Payment Flow (5–7 Minutes Hold):**
   - *Target Audience:* Mobile shoppers using Apple Pay, Shop Pay, Google Pay, or PayPal One-Click.
   - *Rationale:* Address and payment data are pre-populated. Average completion time is 30–60 seconds. A 5-minute hold accommodates biometric validation delays and network latency easily.

2. **Standard Multi-Step Form (8–10 Minutes Hold):**
   - *Target Audience:* Desktop or guest shoppers typing shipping address, email, discount code, and 16-digit credit card number manually.
   - *Rationale:* Average human completion time is 180–240 seconds. An 8-minute hold accounts for 3D Secure bank OTP verification text messages and address verification checks.

3. **High-Ticket / Customizable Releases (12–15 Minutes Hold):**
   - *Target Audience:* Luxury goods, custom configuration gear, or high-cost event passes ($500+).
   - *Rationale:* High monetary stakes require buyers to double-check sizing, terms, or financing options (e.g., Klarna/Afterpay approval).

---

## 3. Anti-Hoarding & Fair-Inventory Rules

To prevent malicious bots and bad-actor shoppers from locking up entire inventory drops, enforce these 4 architectural safeguards:

### 1. CAPTCHA / Proof-of-Work Prior to Lock Issuance
- Never issue a backend inventory hold key on simple `ADD_TO_CART` HTTP requests.
- Require passing a light bot challenge (e.g., Cloudflare Turnstile, reCAPTCHA v3 score > 0.7, or cryptographic proof-of-work) prior to locking a stock reservation key in Redis/DB.

### 2. Tab Synchronization via Client APIs
- Users often open 10 tabs to bypass limits or reset timers.
- Use `LocalStorage` shared timestamp and `BroadcastChannel` API events across browser tabs:
  ```javascript
  // Example tab sync concept
  const channel = new BroadcastChannel('cart_reservation_channel');
  channel.postMessage({ type: 'SYNC_HOLD', expireAt: 1776595200 });
  ```
- Opening new tabs must read the existing `expireAt` timestamp rather than creating new holds or resetting the timer.

### 3. IP & Account Quantity Caps
- Enforce strict unit caps per customer ID, credit card fingerprint, and shipping address (e.g., `Max 2 units per order`).
- If an account attempts to place multiple orders exceeding the cap, return an explicit policy message: `"Order cap reached: Maximum 2 units per customer during launch events."`

### 4. Single Grace Extension Rule
- Auto-extending hold times for users actively typing in payment fields converts genuine buyers. However, auto-extensions must be hard-capped at **one extension per session** (+2 or +3 minutes max) to prevent squatting.

---

## 4. Secondary Queue & Stock-Release Recovery Rules

When an 8-minute hold expires without payment, that inventory unit must immediately generate value for waiting shoppers.

### Real-Time Socket Re-Allocation
1. **Immediate Lock Release:** The moment the TTL expires, the backend background worker publishes a Redis `EXPIRE` event to a WebSocket/Server-Sent Events (SSE) queue.
2. **Waiting Queue Prompt:** Shoppers on sold-out product pages receive a non-intrusive drawer alert:
   `"A size 10 sneaker was just released from an expired cart! [Claim & Reserve (5:00)]"`
3. **High Re-Sale Velocity:** Over 80% of expired cart inventory can be re-sold within 2 minutes if the secondary queue notification is real-time and frictionless.
