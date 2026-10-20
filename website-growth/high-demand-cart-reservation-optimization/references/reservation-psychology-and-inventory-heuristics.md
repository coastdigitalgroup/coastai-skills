# Reservation Psychology & Inventory Heuristics

## 1. Behavioral Psychology & Persuasion Principles

### Loss Aversion & Psychological Ownership
When a buyer adds a limited item to their cart and receives an explicit reservation guarantee (`[🔒 Item Held for 10:00]`), psychological ownership transfers immediately. The user views the item as *theirs*. Threatening to revoke that ownership upon timer expiration activates **Loss Aversion** (Kahneman & Tversky), significantly raising completion motivation compared to an unreserved item.

### The Certainty Effect
Shoppers during high-demand drops experience intense anxiety about whether their order will go through. Unreserved carts force buyers to rush frantically through forms, increasing form mistakes and stress. Providing a **guaranteed reservation window** creates absolute certainty during checkout, lowering cognitive friction and increasing successful payment completion rates.

---

## 2. Timer Clarity & Micro-Copy Rules

| Element | Hostile / Anti-Pattern | Reassuring / High-Converting Pattern |
| :--- | :--- | :--- |
| **Header Badge** | ⚠️ *Hurry! Cart expires in 10:00 or items will be sold!* | 🔒 *Reserved for 09:42 • Guaranteed stock while timer is active.* |
| **Timer Visuals** | Flashing red background, shaking icons, aggressive popups. | Subtle neutral badge, calm countdown font, persistent top-bar anchor. |
| **2-Min Warning** | 🚨 *LAST CHANCE! Your items are about to be deleted!* | ⏱️ *Your hold expires in 2 minutes. Need more time? [Extend Hold (+5 Min)]* |
| **Expiration State** | *Cart cleared! You missed out.* | *Your 10-minute hold window expired and stock was released. [Re-Add if Available] or [Join Waitlist]* |

---

## 3. Inventory Hold Sizing Heuristics

| Event Type | Recommended Initial Hold | Max Hold (with extensions) | Lock Trigger Point |
| :--- | :--- | :--- | :--- |
| **High-Scarcity E-Commerce Drop** | 8 – 10 Minutes | 15 Minutes | Add to Cart |
| **Event Ticketing / Seat Selection** | 12 – 15 Minutes | 20 Minutes | Add to Cart / Select Seats |
| **Flash Sale Doorbusters** | 10 Minutes | 15 Minutes | Begin Checkout |
| **Limited Cohort SaaS / Travel** | 15 Minutes | 25 Minutes | Begin Checkout |

---

## 4. Technical Inventory Release Rules

1. **Redis Key TTL (Time-To-Live):** Store reservation keys with exact TTL corresponding to the client-facing timer + 30-second buffer to absorb network latency.
2. **Atomic Release:** When TTL expires without order completion, atomically decrement reserved counters and fire a pub/sub event to notify waiting client web sockets.
3. **Optimistic Locking:** Validate reservation token validity at order submission to prevent double-selling under high concurrency.
