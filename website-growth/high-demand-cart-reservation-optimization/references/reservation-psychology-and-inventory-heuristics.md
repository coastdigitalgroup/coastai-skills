# Reservation Psychology & Inventory Lock Heuristics

This reference guide details behavioral psychology, optimal hold duration formulas, queue management heuristics, and technical locking patterns for high-demand cart reservation systems.

---

## 1. Behavioral Psychology & Loss Aversion Mechanics

### A. Framing: Reassurance vs. Artificial Threat
Behavioral economics demonstrates that humans experience **loss aversion**—the pain of losing something is psychologically twice as powerful as the pleasure of gaining it.

- **Negative Threat Framing (Pushes Panic):**
  *"Hurry! Buy now or you will lose your item in 08:30!"*
  *Impact:* Causes cognitive overload, increases form input errors (zip code/card number typos), and triggers skepticism when buyers feel manipulated by artificial countdowns.
- **Positive Reassurance Framing (Builds Confidence):**
  *"🔒 Stock Reserved: Your size is held for 08:30 while you complete checkout."*
  *Impact:* Creates a sense of temporary ownership (Endowment Effect). The buyer feels secure that no one can "snipe" the item out of their cart while they search for their credit card.

### B. The Endowment Effect in Virtual Cart Holds
Once an item is marked as "Reserved for You", the buyer's mental state shifts from *evaluating a potential purchase* to *protecting an existing possession*. This shift significantly decreases cart abandonment during multi-step checkout procedures.

---

## 2. Optimal Hold Duration Formulas

The optimal cart reservation hold window depends on product complexity, checkout form friction, and secondary queue depth.

### Hold Duration Heuristics Matrix

| Product Type | Average Checkout Time (P75) | Recommended Hold Window | Extension Allowance |
| :--- | :--- | :--- | :--- |
| **Apparel / Footwear Drop** | 2 min 45 sec | **10 to 12 Minutes** | +5 Min (Max 1) |
| **High-Ticket Luxury / Collectible** | 4 min 15 sec | **15 Minutes** | +5 Min (Max 1) |
| **Concert / Event Ticketing** | 5 min 30 sec | **12 to 15 Minutes** | +3 Min (Max 1) |
| **Travel / Hotel Reservation** | 7 min 00 sec | **15 to 20 Minutes** | +5 Min (Max 1) |

$$\text{Optimal Hold Duration} = \text{P75 Checkout Time} + \text{Payment Auth Buffer (2 min)} + \text{Safety Margin (3 min)}$$

*Rule of Thumb:* Never set initial hold duration under **8 minutes** (causes excessive eviction during credit card verification) or over **20 minutes** (starves waiting buyers and enables cart hoarding).

---

## 3. Queue Management & Waitlist Psychology

When traffic concurrency exceeds available stock or checkout throughput limits, users must enter a **Virtual Waiting Room / Queue**.

### Queue Heuristics

1. **Occupied Time vs. Unoccupied Time:** Unoccupied time feels significantly longer than occupied time. Always provide dynamic queue progress updates:
   - Position in line (`"You are #142 in queue"`)
   - Estimated wait time (`"Estimated wait: 2 minutes"`)
   - Live inventory status (`"Stock remaining: 34%"`)
2. **Deterministic FIFO Queueing:** Process reservations strictly First-In, First-Out (FIFO) using tokenized admission tickets (`queue_token`).
3. **Queue Completion Handshake:** When a user exits the queue to enter checkout, automatically grant them a fresh 12-minute reservation lock associated with their `queue_token`.

---

## 4. Multi-Tab & Cross-Device Locking Architecture

### A. Client Synchronization via `BroadcastChannel`
To prevent users from opening 5 browser tabs to spawn 5 independent countdown timers:

```javascript
// Sync reservation timer across all tabs of the same origin
const reservationChannel = new BroadcastChannel('cart_reservation_sync');

// Broadcast expiration state update
function broadcastTimerState(expiresAtTimestamp) {
  reservationChannel.postMessage({
    type: 'RESERVATION_SYNC',
    expiresAt: expiresAtTimestamp
  });
}

// Listen for updates from other tabs
reservationChannel.onmessage = (event) => {
  if (event.data.type === 'RESERVATION_SYNC') {
    updateClientTimerDisplay(event.data.expiresAt);
  }
};
```

### B. Redis TTL Server Lock Protocol

```text
[ Client ATC Click ]
        │
        ▼
  POST /api/cart/reserve
  { sku: "SNKR-105", qty: 1, session_id: "sess_987" }
        │
        ▼
[ Redis Evaluation ]
  1. INCRBY "stock:SNKR-105:allocated" 1
  2. IF allocated <= total_stock THEN
       SETEX "lock:SNKR-105:sess_987" 720 "reserved"  (720s = 12 min)
       RETURN 200 OK { expires_at: 1710000720 }
     ELSE
       DECRBY "stock:SNKR-105:allocated" 1
       RETURN 409 OUT_OF_STOCK
```

---

## 5. Anti-Hoarding & Bot Throttling Protocols

1. **IP + Account Rate Limits:** Max 3 reservation creation requests per IP per 5-minute window during drop launches.
2. **Single Extension Cap:** Manual time extensions MUST be capped at **1 extension per session** and require active user confirmation via captcha or button click.
3. **Instant Expired Stock Recycling:** Expired Redis keys must trigger an `EXPIRED` event listener that immediately increments available stock back into the active pool within < 100ms.
