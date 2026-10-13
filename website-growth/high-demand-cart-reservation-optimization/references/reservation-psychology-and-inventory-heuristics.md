# Reservation Psychology & Inventory Heuristics Reference

This guide outlines the behavioral psychology, technical allocation heuristics, and accessibility considerations for designing high-converting temporary cart reservations and inventory holds during high-demand product drops.

---

## 1. Behavioral Psychology of Cart Holds

### Loss Aversion & Ownership Effect
- **Psychological Principle:** According to Prospect Theory (Kahneman & Tversky), people feel the pain of losing something roughly twice as strongly as the pleasure of gaining it.
- **Application in Holds:** Placing items into a reserved state activates the *Psychological Ownership Effect*. The buyer shifts from evaluating *whether* to buy to protecting *what is already theirs*.
- **Impact:** When buyers believe an item is locked exclusively for them, conversion rate increases by 20–35% compared to unreserved carts where items can be snapped away at payment.

### Acute Urgency vs. Artificial Panic
- **Constructive Urgency:** Transparent, predictable countdown timers backed by actual inventory holds reduce panic and increase deliberate completion speed.
- **Destructive Panic:** Short, unbacked, or fake timers create anxiety, induce form input errors (typos in credit card numbers or shipping addresses), and trigger aggressive customer complaints if stock vanishes mid-checkout.

---

## 2. Inventory Allocation Models

```text
  [ MODEL 1: Hard Hold on Add-To-Cart ]
  User Clicks "Add to Cart" ──> Decrement Available Inventory in Redis
                               ──> Start 8-Min Session Timer
                               ──> Stock Guaranteed

  [ MODEL 2: Hybrid Hold on Checkout Initiation ]
  User Browses / Adds to Cart ──> Soft Stock Gauge Displayed
  User Clicks "Checkout"     ──> Lock Inventory for 8 Mins
                               ──> Stock Guaranteed
```

| Allocation Model | Best Used For | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Hard Hold on Cart Add** | Ultra-limited drops (< 500 units), high-value items, single-item drops. | Maximum buyer confidence; guaranteed stock from moment of click. | Inventory locked by casual clickers; requires shorter hold duration (5–7 mins). |
| **Hybrid Hold on Checkout** | Flash sales, multi-SKU apparel drops (500–10,000 units), catalog drops. | Prevents casual window shoppers from hoarding stock; locks inventory for high-intent buyers. | Small risk of stockout while browsing PDP before clicking checkout. |
| **Virtual Waiting Room / Queue** | Extremely high concurrency (> 50,000 visitors), ticket releases. | Prevents backend server collapse; smoothly queues users into batch holds. | Adds initial queue delay before cart access. |

---

## 3. Hold Duration Optimization Formula

Calculating the optimal reservation time balances buyer completion success against inventory turnover efficiency:

$$\text{Ideal Hold Duration} = T_{\text{P95}} + T_{\text{Payment}} + T_{\text{Buffer}}$$

Where:
- $T_{\text{P95}}$ = 95th percentile completion time for your checkout flow (typically 240–360 seconds).
- $T_{\text{Payment}}$ = 3D Secure / SMS OTP verification buffer (60–90 seconds).
- $T_{\text{Buffer}}$ = Form retry allowance for address autocomplete or payment re-entries (60 seconds).

**Rule of Thumb:**
- Standard Mobile Drops: **7 to 10 minutes**
- Complex Ticket / Seat Selection Drops: **10 to 12 minutes**
- Simple 1-Click Express Checkout Drops: **5 to 6 minutes**

---

## 4. Technical Architecture for High Concurrency Locks

1. **Distributed Memory Locks (Redis Lua):**
   - Use atomic decrement operations (`DECRBY`) or Lua scripts to ensure inventory counts cannot drop below zero across concurrent web workers.
2. **Absolute Server Timestamps:**
   - Store expiration timestamps as UTC milliseconds (`expiry = now + 480,000`).
   - Deliver `expiryTimestamp` in JSON payloads. Client UI computes:
     $$\text{Seconds Remaining} = \max\left(0, \left\lfloor \frac{\text{expiryTimestamp} - \text{Date.now}()}{1000} \right\rfloor\right)$$
3. **Background Job Garbage Collection:**
   - Run automated Redis key expiration listeners or scheduled queue workers to immediately release expired holds back into the available pool within < 1 second of expiry.

---

## 5. WCAG AA Accessible Countdown Timers

1. **Screen Reader Announcement Frequency:**
   - **Do NOT** update `aria-live` containers every second. Doing so interrupts screen readers continuously and makes checkout unusable.
   - **Recommended Interval:**
     - 5 minutes remaining: Polite announcement (*"5 minutes remaining on your item reservation"*)
     - 2 minutes remaining: Polite announcement
     - 1 minute remaining: Assertive announcement
     - Final 30 seconds: Assertive announcement
2. **Color Contrast & Focus:**
   - Ensure timer text maintains at least 4.5:1 contrast against background in normal and warning states.
   - Ensure the "Extend Reservation" button receives clear keyboard focus indicator styling.
