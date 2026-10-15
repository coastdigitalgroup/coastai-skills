# Before & After Scenario: High-Demand Product Drop Cart Reservation Optimization

## Overview & Brand Context

**Brand:** Apex Athletics (DTC performance outerwear & footwear)
**Event:** Limited-Edition "Apex TrailGrip Alpha" Sneaker Drop (1,500 pairs total, high concurrency spike expected)
**Traffic Context:** 22,000 Concurrent Active Users at drop launch (10:00 AM EST)
**Primary Metric:** Checkout Completion Rate (Sessions with ATC that complete purchase)
**Secondary Metrics:** Oversell Error Rate, Support Ticket Rate, Expired Cart Recovery Rate

---

## BEFORE OPTIMIZATION

### The Problem & Bottlenecks

Apex Athletics implemented a basic third-party JavaScript timer widget on their cart drawer during the drop. However, the implementation had critical flaws:

1. **Unenforced Client-Only Timer:** The 10-minute timer was purely visual and ran in client-side JS (`setInterval`). Refreshing the page reset the clock to 10:00, leading users to realize the timer was fake.
2. **No Server-Side Inventory Lock:** Stock was only checked and deducted upon final payment submit (`POST /checkout/orders`). This allowed 4,000 users to add the 1,500 pairs to cart simultaneously.
3. **Abrupt Cart Clearing:** When the server database finally ran out of stock, active buyers in the middle of filling out credit card numbers on Step 3 of checkout were hit with an abrupt error page (`"Item Out of Stock"`), wiping their form inputs completely.
4. **Zero Pre-Expiration Warning or Extension Option:** When the client timer hit 00:00, the JS cleared `localStorage` and emptied the cart without warning, causing intense customer anger and social media backlash.
5. **No Expired Stock Recovery Loop:** Expired sessions were dumped onto an empty cart page (`"Your cart is empty"`), losing all buyer momentum.

### Before Performance Metrics

```text
Add-To-Cart Sessions:            6,420
Completed Orders:                 1,823 (Oversold by 323 units due to race conditions)
Checkout Completion Rate:         28.4%
Oversell Cancel/Refund Rate:      17.7% of total orders (323 canceled orders)
Customer Support Tickets:         1,140 tickets ("Cart wiped", "Card charged but no order")
Expired Session Recovery:         0%
```

---

## AFTER OPTIMIZATION

### The Applied Solution & Engineering Steps

Apex Athletics implemented the **High-Demand Cart Reservation Optimization** framework:

1. **True Redis-Backed Inventory Reservation Locks:**
   - Upon clicking "Add to Cart", a backend API call (`POST /api/cart/reserve`) placed a 12-minute TTL lock on 1 inventory unit in Redis.
   - Exact remaining stock was updated in real-time via WebSocket broadcast.

2. **Server-Synced Sticky Countdown Header:**
   - A high-contrast sticky banner appeared on all PDP, Cart, and Checkout pages:
     `🔒 High Demand: Your size US 10.5 is reserved for 11:42`
   - Clock time was calculated against server UNIX timestamp (`server_now - reservation_expires_at`), making it immune to page refreshes or device clock manipulation.
   - Multi-tab state was synchronized using `BroadcastChannel('apex_cart_reservation')`.

3. **2-Minute Pre-Expiration Warning & 1-Click Extension:**
   - At 02:00 remaining, a non-disruptive bottom drawer appeared:
     `"Your 12-minute reservation is expiring soon. Do you still need your items?"`
   - Included a primary CTA: `[ Keep My Reservation (+5 Min) ]`.
   - Capped at 1 extension per user session to prevent hoarding.

4. **Graceful Stock Release & Instant Restock Recovery:**
   - If the timer expired, the item transitioned from "Reserved" to "Stock Released" with an inline explanation banner.
   - If sold out, the cart drawer automatically converted into a 1-click SMS/Email restock notification form pre-filled with the user's saved email/phone.

---

## AFTER OPTIMIZATION METRICS

```text
Add-To-Cart Sessions:            5,850
Completed Orders:                 1,500 (Exact 100% allocation, zero oversells)
Checkout Completion Rate:         41.8% (+47.1% relative increase in completion rate)
Oversell Cancel/Refund Rate:      0.0% (Zero oversells or duplicate charge refunds)
Customer Support Tickets:         42 tickets (-96.3% decrease in drop-related complaints)
Expired Session Recovery:         22.4% (Converted via 1-click restock waitlist when secondary stock freed)
```

---

## Visual & Code Comparison

### Before (Disruptive / Fake Timer & Sudden Eviction)

```html
<!-- BEFORE: Client-side fake timer that resets on refresh -->
<div id="cart-timer" style="color: red;">
  Hurry! Checkout in <span id="clock">10:00</span> before items sell out!
</div>

<script>
  // Flawed client JS logic
  let sec = 600;
  setInterval(() => {
    sec--;
    document.getElementById('clock').innerText = Math.floor(sec/60) + ":" + (sec%60);
    if (sec <= 0) {
      localStorage.clear();
      window.location.reload(); // Abrupt refresh & cart wipe!
    }
  }, 1000);
</script>
```

### After (Server-Synced Reservation & Accessible State Feedback)

```html
<!-- AFTER: Accessible, server-synced reservation bar with aria-live -->
<div
  class="reservation-bar"
  role="region"
  aria-label="Inventory Reservation Timer"
  data-expires-at="1710000000"
>
  <div class="reservation-badge">
    <svg class="lock-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
      <path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5zm-3 5c0-1.66 1.34-3 3-3s3 1.34 3 3v3H9V7z"/>
    </svg>
    <span>Items Reserved</span>
  </div>

  <div
    class="countdown-display"
    id="reservation-timer"
    aria-live="polite"
    aria-atomic="true"
  >
    11:42
  </div>

  <div class="reservation-subtext">
    Guaranteed allocation while you finish checkout
  </div>
</div>

<!-- Bottom Drawer Pre-Expiration Warning (Triggers at 02:00) -->
<dialog id="expiration-warning-modal" class="reservation-modal" aria-labelledby="modal-title">
  <div class="modal-content">
    <h3 id="modal-title">⏳ Reservation Expiring in 2 Minutes</h3>
    <p>High demand for TrailGrip Alpha. Do you still need more time to complete your order?</p>
    <div class="modal-actions">
      <button id="extend-reservation-btn" class="btn-primary">
        Extend Hold (+5 Min)
      </button>
      <button id="dismiss-modal-btn" class="btn-secondary">
        Continue Checkout
      </button>
    </div>
  </div>
</dialog>
```

---

## Key Lessons Learned

1. **Certainty Eliminates Panic:** Giving users absolute certainty that stock is locked during checkout slows down panic-driven typos and drastically increases payment success rate.
2. **Never Zero Out Carts Without Warning:** Giving users a 2-minute pre-expiration warning with 1-click extension recovers over 80% of near-expired sessions before eviction occurs.
3. **Prevent Overselling at the Lock Level:** True server-side Redis TTL locks eliminate 100% of oversell chargebacks, protecting brand equity during high-visibility product drops.
