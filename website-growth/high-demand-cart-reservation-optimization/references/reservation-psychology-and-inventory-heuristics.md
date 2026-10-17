# Reservation Psychology and Inventory Holding Heuristics

This reference guide details psychological principles, inventory hold duration heuristics, state machine designs, and anti-scalping protocols for high-demand product drops and limited-edition sales.

---

## 1. Psychological Principles of Cart Reservations

### A. The Endowment Effect & Psychological Ownership
When a shopper adds a high-demand item to their cart and sees a clear reservation badge (*"🔒 Held in your cart for 09:59"*), they experience immediate psychological ownership. They feel the product is already theirs.
- **UX Implication:** Clearly framing the cart timer as a **guarantee of ownership** increases checkout completion velocity because buyers act to protect what they already consider "theirs" rather than contemplating whether to purchase.

### B. Loss Aversion vs. Anxiety-Inducing Urgency
Loss aversion dictates that the pain of losing an item is twice as powerful as the pleasure of gaining it. However, artificial or aggressive countdown timers (flashing red, sirens, aggressive modal popups) induce decision paralysis and panic.
- **Calm Security Design Rule:** Present the countdown timer in reassuring, monochrome tones with supportive copy (*"We've secured your item so you can take your time entering your shipping details"*). Switch to visual urgency (amber/amber-red) only in the final 60 seconds.

### C. The Reciprocity of Fairness
Shoppers understand that limited-edition items are scarce. When a brand enforces a transparent, fair 10-minute hold window for everyone, shoppers perceive the brand as equitable. Conversely, when users spend 10 minutes filling out forms only to be told the item sold out mid-payment, they perceive the brand as deceitful.

---

## 2. Inventory Hold Duration Heuristics Matrix

Choosing the correct hold duration requires balancing **Buyer Checkout Completeness** against **Inventory Liquidity**.

| Product Category / Context | Recommended Hold Duration | Max Extensions Allowed | Rationale |
| :--- | :--- | :--- | :--- |
| **Single SKU Flash Sale (Sneakers, Apparel)** | **8 - 10 Minutes** | 1 Extension (+3 mins) | Fast checkout with Express Payment (Apple Pay / Shop Pay). 8 mins is ample for manual address entry. |
| **Event / Concert Ticketing (Seat Selection)** | **12 - 15 Minutes** | 1 Extension (+3 mins) | Requires ticket tier selection, seat map rendering, and attendee name assignment. |
| **Cohort / Live Course Registration** | **15 - 20 Minutes** | 1 Extension (+5 mins) | Requires entering organization details, VAT numbers, or custom intake questions. |
| **High-Demand Luxury / Collectibles** | **10 - 12 Minutes** | 1 Extension (+3 mins) | Allows high-intent buyers time to verify sizing, materials, or shipping insurance choices. |

---

## 3. Cart Reservation State Machine Architecture

A robust cart reservation system operates on a 5-state lifecycle:

```
[ Unreserved Cart ] ---> (User clicks Add to Cart)
       |
       v
[ State 1: ACTIVE HOLD ] (Redis TTL: 600s)
       |
       +---> (User completes payment) -------------> [ State 2: PURCHASED ]
       |
       +---> (Timer reaches 02:00 & user clicks) --> [ State 3: EXTENDED HOLD ] (Redis TTL: +180s)
       |
       +---> (Timer reaches 00:00 & no extension) -> [ State 4: EXPIRED / RE-CHECK ]
                                                             |
                                                             +-> Stock available? -> Re-Lock (+300s)
                                                             +-> Sold out? ------> [ State 5: RELEASED TO WAITLIST ]
```

### State Definitions:
1. **ACTIVE HOLD:** Inventory key is soft-locked in Redis (`SET cart:session_id SKU_1 1 EX 600`). Available public pool decremented by 1.
2. **PURCHASED:** Payment authorization confirmed via webhook. Inventory key converted to permanent order record.
3. **EXTENDED HOLD:** Session requested a 3-minute extension during the T-2 minute window. TTL increased by 180 seconds.
4. **EXPIRED / RE-CHECK:** Timer reached 0. System performs atomic check: if public pool $>0$, automatically grant 5-minute grace re-lock.
5. **RELEASED TO WAITLIST:** Hold destroyed. Item returned to public pool or assigned to top waitlist queue entry via WebSocket notification.

---

## 4. Bot Mitigation & Anti-Scalping Rules

High-demand drops attract automated checkout bots that attempt to hoard 100% of reserved carts within milliseconds. Implement these safeguards:

1. **Proof-of-Work / Captcha Challenge on Hold Creation:** Enforce invisible CAPTCHA (e.g., Cloudflare Turnstile or reCAPTCHA v3) on the POST request that creates the cart reservation key.
2. **Per-Customer Reservation Caps:** Enforce strict limits per IP address, credit card fingerprint, and shipping address combination (e.g., maximum 2 reserved units per household).
3. **Honeypot Session Elimination:** Detect rapid programmatic session creation ($>3$ cart hold requests per second per IP) and immediately invalidate held keys without serving warning UI.
4. **JWT-Signed Reservation Tokens:** Client receives an encrypted JWT token containing `session_id`, `sku_id`, `expires_at`, and `signature`. When submitting payment, backend validates signature to prevent client-side timer manipulation.
