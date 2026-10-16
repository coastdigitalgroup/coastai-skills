# Reservation Psychology & Inventory Heuristics Reference Guide

This reference guide provides psychological frameworks, timing benchmarks, anti-hoarding heuristics, and recovery state patterns for managing temporary cart reservations during high-demand product drops and limited inventory sales.

---

## 1. The Psychology of Temporary Inventory Holds

### Loss Aversion & Endowment Effect
When a shopper sees a confirmation that an item is **"Reserved for You for 08:00 Minutes"**, psychological ownership shifts. According to the *Endowment Effect* (Thaler, 1980), people value items more once they feel ownership over them.
- **Soft Cart (No Reservation):** "I am considering buying this." -> High hesitation, high rate of abandonment or cart comparison.
- **Hard Reserved Cart:** "This is mine, but I will lose it if I don't pay in 7 minutes." -> *Loss Aversion* (Kahneman & Tversky) triggers immediate action, accelerating decision velocity and suppressing coupon hunting behavior.

### Certainty vs. Friction Trade-off
Under drop conditions, the primary driver of checkout drop-off is **Anxiety of Loss** (fear that stock will be sniped during form entry).
- Eliminating uncertainty by guaranteeing inventory allocation increases form completion velocity by up to **2x**.
- However, if the countdown timer creates panic rather than certainty (e.g., a 2-minute timer for a complex 12-field form), buyers panic, make typographical errors in payment info, and experience high transaction failure rates.

---

## 2. Timing Benchmarks Matrix

Recommended hold durations vary by channel, checkout mechanism, and product complexity:

| Channel / Context | Recommended Hold Duration | Max Extensions Allowed | Justification |
| :--- | :---: | :---: | :--- |
| **Express Mobile Pay (Apple Pay, Shop Pay, Google Pay)** | **5 – 7 Minutes** | 1 extension (+2 min) | Express biometric checkout takes <30 seconds. Short hold frees unused inventory fast. |
| **Standard Mobile Web (Manual Card Input)** | **7 – 9 Minutes** | 1 extension (+3 min) | Account for 2FA/3DS bank SMS codes, address autocomplete, and small touchscreens. |
| **Desktop Multistep Checkout (B2C)** | **8 – 10 Minutes** | 1 extension (+3 min) | Standard checkout velocity allowance under high traffic conditions. |
| **Ticketing / Reserved Seating (Concerts, Sports)** | **10 – 15 Minutes** | 1 extension (+5 min) | Includes seat map rendering, ticket tier comparison, and group allocation time. |
| **B2B Wholesale / High-Ticket Flash Sale** | **15 – 20 Minutes** | 2 extensions (+5 min) | High average order values (AOV) require verification of corporate cards or purchase orders. |

---

## 3. Anti-Hoarding & Bot Mitigation Heuristics

High-demand drops attract automated bots and opportunistic resellers who attempt to lock up inventory in parallel carts. Implement these defensive heuristics:

### 1. Atomic IP & Account Lock Caps
- **Rule:** Max 1 active inventory hold per SKU per authenticated account ID or IP address hash.
- **Behavior:** If a user attempts to add a second size or duplicate SKU to a new tab under the same IP/Session, reject the hold with:
  `"Maximum 1 reservation allowed per customer during this drop."`

### 2. Device Fingerprint Rate-Limiting
- Fingerprint client sessions using TLS signatures, browser headers, and canvas parameters.
- If a single fingerprint initiates >3 cart holds within 60 seconds, flag session as suspicious and require a fast turnstile/CAPTCHA challenge before reserving stock.

### 3. Expiration Release Velocity
- Upon hold expiration, returned inventory MUST NOT be immediately visible on the public PDP if a queue/waitlist exists.
- Route released stock directly to the first active waiting session in the Redis queue to prevent bot API polling from snatching released units.

---

## 4. Multi-Stage Warning & Recovery State Taxonomy

When designing UI states for cart reservations, maintain clear visual distinction between states:

```text
[State 1: Active Guaranteed Hold]
  ├── Visual: Green status badge + calm countdown timer
  └── Copy: "✓ Item reserved for 07:15. Guaranteed available for your order."

[State 2: Near Expiration (2 Min Left)]
  ├── Visual: Yellow/Amber banner pulse + prominent "Extend" button
  └── Copy: "⚠️ Reservation expiring in 01:58! Need more time to finish?"
  └── Action: User clicks [Extend Hold (+3 Min)] -> Re-verifies live stock server-side.

[State 3: Payment Gateway Processing (Crosses 00:00)]
  ├── Visual: Lock status retained in background during 3DS / bank check
  └── Copy: "Processing payment authorization... Your stock remains locked."

[State 4: Expired - Stock Available]
  ├── Visual: Soft recovery modal
  └── Copy: "Your hold timed out, but good news — stock is still available! We refreshed your hold for 3 minutes."

[State 5: Expired - Stock Sold Out]
  ├── Visual: High-value stock-out transition
  └── Copy: "Your hold expired and this item just sold out. Join the Instant Release Waitlist to be notified if another cart expires."
  └── Action: Instant 1-tap [Notify Me via SMS/Push] button.
```

---

## 5. Technical Architecture Rules for Developers

1. **Redis Atomic Operations:** Use Redis `Lua` scripts or `MULTI/EXEC` transactions with key TTLs (Time-To-Live) for reserving and releasing stock:
   ```lua
   -- Decrement inventory and set session lock atomically
   if redis.call('get', KEYS[1]) > '0' then
       redis.call('decr', KEYS[1])
       redis.call('setex', KEYS[2], ARGV[1], 'locked')
       return 1
   else
       return 0
   end
   ```
2. **UTC Synchronization:** Always pass ISO 8601 UTC timestamps (`expires_at: "2026-03-30T14:15:00Z"`) to client browsers. Never calculate expiration by adding seconds in local client time, which breaks across time zones or system clock drift.
3. **Websocket / Server-Sent Events (SSE) Sync:** For high-volume drops, push real-time queue position and inventory updates over SSE rather than letting thousands of client tabs poll `/api/cart/status` every second.
