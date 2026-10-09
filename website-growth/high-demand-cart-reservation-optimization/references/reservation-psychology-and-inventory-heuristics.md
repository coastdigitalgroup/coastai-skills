# Reservation Psychology & Technical Inventory Heuristics

This reference guide provides foundational principles in behavioral economics, consumer psychology, technical distributed locking, and WCAG AA accessibility for high-demand inventory cart reservations.

---

## 1. Behavioral Economics & Reservation Psychology

During high-concurrency product drops and flash sales, buyers experience heightened emotional arousal, competition anxiety, and Loss Aversion (Kahneman & Tversky). How an e-commerce platform structures the cart hold directly dictates whether this mental state produces focused conversion or frustration-induced abandonment.

### The Urgency vs. Anxiety Paradox
- **Uncontrolled Urgency (Anxiety Trap):** Aggressive, flashing red countdown timers without guaranteed inventory holds trigger "Panic Friction". Users rush through form fields, miskey shipping details, trigger payment fraud filters, or abandon the purchase due to perceived manipulation.
- **Controlled Urgency (Reassurance Engine):** A clear, time-bound reservation banner (*"Item Held Guaranteed for 10:00"*) shifts user psychology from *fear of missing out* to *empowered completion*. The timer acts as a contract: as long as the user stays within the boundary, the stock is exclusively theirs.

### Perceived Fairness & Procedural Justice
In high-demand environments, buyers evaluate platforms based on **Procedural Fairness**:
1. **First-Come, First-Served Certainty:** Locking inventory upon checkout entry (rather than post-credit-card processing) respects the user's effort and time investment.
2. **Transparent Queue Rules:** Displaying live queue position or reservation hold state eliminates "Black Box" suspicion (the belief that bots or insiders took stock unfairly).
3. **Frictionless Extension Grace:** Offering a single 3-minute extension when payments hit bank verification delays (3D Secure SMS OTPs) preserves trust and rescues valid sales.

---

## 2. Technical Inventory Locking Heuristics

Handling 50,000+ concurrent requests attempting to purchase 500 units requires atomic distributed lock architecture to avoid database table locks and race conditions.

### Trigger Point Comparison Matrix

| Lock Trigger Point | Overselling Risk | Cart Hoarding Risk | Tech Complexity | Recommended Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **On Add-to-Cart (ATC)** | Low | High (Users hold stock in 5 tabs) | Medium | Ultra-limited drops (< 500 units) with strict 5–8 min TTL |
| **On Checkout Initiation** | **Zero (Optimal)** | **Balanced** | **Medium** | **High-demand drops (500–10,000 units), ticket releases** |
| **On Final Payment Submit** | High (Oversells stock) | Low | Low | NOT RECOMMENDED for high-demand drops |

### Distributed Lock Architecture Patterns (Redis + Lua Scripting)

To execute atomic inventory deduction without race conditions, use Redis with Lua scripts:

```lua
-- Redis Lua Script for Atomic Inventory Reservation Hold
-- KEYS[1]: Stock Key (e.g., "inventory:sku_123:available")
-- KEYS[2]: Reservation Key (e.g., "reservation:session_abc:sku_123")
-- ARGV[1]: Lock Duration TTL in seconds (e.g., 600)

local current_stock = tonumber(redis.call('GET', KEYS[1]))

if current_stock and current_stock > 0 then
    -- Atomically decrement available stock
    redis.call('DECR', KEYS[1])
    -- Create reservation hold key with TTL
    redis.call('SETEX', KEYS[2], ARGV[1], "RESERVED")
    return 1 -- Success: Hold granted
else
    return 0 -- Failure: Sold out
end
```

### Expiration & Background Cleanup Mechanics
- **Key-Space Notifications:** Configure Redis `notify-keyspace-events Ex` so that when a reservation TTL expires (`expired` event), a background worker immediately returns the stock unit to the available pool or assigns it to the top socket connection in the virtual waitlist.
- **Grace Period Reconciliation:** Perform a 30-second silent background stock re-check before wiping user checkout forms. If general drop stock remains, auto-renew the user's hold transparently.

---

## 3. WCAG AA Accessibility & Timer Heuristics

Countdown timers present significant accessibility challenges for visually impaired users, keyboard-only navigators, and neurodivergent individuals who process information at different speeds.

### Screen Reader Live Region (`aria-live`)
- **DO NOT** make live regions update every second (`aria-live="assertive"`). Updating speech output every second completely blocks screen reader users from reading form labels or typing shipping addresses.
- **DO** use `aria-live="polite"` updated only at designated milestone triggers:
  1. *On Page Load / Entry:* "Size 10.5 reserved for 10 minutes."
  2. *5 Minutes Remaining:* "5 minutes remaining on your inventory hold."
  3. *2 Minutes Remaining (Warning):* "2 minutes remaining. Click extend hold if extra time is needed."
  4. *1 Minute Remaining (Critical):* "1 minute remaining to complete order."

### Reduced Motion & High Contrast
- **`prefers-reduced-motion`:** Disable pulsing, flashing, or scale-transform animations on the timer badge when `prefers-reduced-motion: reduce` is detected.
- **Color Contrast:** Never rely *only* on color (e.g., turning green text red) to signal urgency. Always pair color shifts with distinct icon changes and explicit microcopy (e.g., "Warning: 2 Minutes Remaining").
