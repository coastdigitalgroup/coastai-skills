# Before & After: High-Demand Cart Reservation Optimization

This document demonstrates realistic before-and-after scenarios applying high-demand cart reservation optimization during limited-edition product launches and ticket drops.

---

## Scenario 1: Streetwear & Sneaker Brand Limited Drop ("Apex Runner OG")

### Context
An urban streetwear DTC brand launched a limited batch of 2,500 pairs of "Apex Runner OG" sneakers at $210 USD. High organic traffic led to 18,000 concurrent site visitors at drop time.

### Before Optimization (Naive Inventory Locking)

- **UX / Technical Setup:** No reservation timer on PDP or cart drawer. Items were assigned to cart without locking database rows. Inventory was checked only at the final step ("Pay Now").
- **Buyer Experience:**
  - Customers added size 10 to cart successfully.
  - Filled out address and credit card details over 3.5 minutes.
  - Clicked "Pay Now", only to encounter an inline alert: *"Error: Item Apex Runner OG (Size 10) is out of stock."*
  - Session recordings showed intense frustration, rage clicks on payment CTA, and social media complaints about "inventory sniping" and "ghost carts".
- **Performance Metrics:**
  - **Cart-to-Checkout Completion Rate:** 22.4%
  - **Checkout Payment Step Drop-off Rate:** 48.1% (driven by oversell failures at click)
  - **Oversell Incident Rate:** 3.8% (95 customer orders accepted for non-existent stock, requiring manual cancellation emails and refund processing)
  - **Customer Support Ticket Volume (Launch Day):** 640+ tickets regarding inventory errors.

---

### Optimization Implementation

1. **Two-Tier Reservation System:**
   - **Soft Hold (Cart Drawer):** Adding item to cart creates a 10-minute session hold stored in Redis key-value with TTL.
   - **Hard Lock (Checkout Start):** Clicking "Proceed to Checkout" locks the specific SKU database row for 7 minutes, starting a synced server-backed countdown timer.
2. **Persistent Sticky Countdown Bar:**
   - Displayed at the top of cart drawer and all checkout screens:
     > ⏱️ **Size 10 Reserved:** Your pair is guaranteed for **[ 06:42 ]**. Finish checkout to secure order.
3. **Grace Period & Express Payment Surface:**
   - Placed Apple Pay and Shop Pay buttons above contact forms for 1-tap checkout.
   - Implemented a 60-second grace period at `00:00`: If overall product stock remains, the hold automatically auto-renews for +3 minutes without kicking the user out.

---

### After Optimization

- **Buyer Experience:**
  - Customers saw immediate confirmation: *"Size 10 is held for you!"*
  - Express payment allowed 42% of mobile buyers to complete checkout in under 30 seconds.
  - No oversell errors occurred; buyers knew exactly how much time remained without rushing frantically.
- **Performance Metrics:**
  - **Cart-to-Checkout Completion Rate:** 58.7% (**+162% relative improvement**)
  - **Checkout Payment Step Drop-off Rate:** 11.2% (**-76.7% reduction**)
  - **Oversell Incident Rate:** 0.0% (Zero inventory oversells)
  - **Customer Support Ticket Volume (Launch Day):** 28 tickets (a **95.6% drop** in tickets).

---

## Scenario 2: Boutique Conference & Workshop Ticket Release ("DevCon 2025")

### Context
A developer conference selling 500 VIP All-Access passes ($899) with high demand from company engineering leads buying multi-seat tickets.

### Before Optimization (Overly Aggressive 3-Minute Timer)

- **UX Setup:** Hard 3-minute countdown timer triggered immediately on adding ticket to cart. Timer wiped the cart clean at 00:00 with no warning or extension option.
- **Buyer Experience:**
  - Managers filling out attendee badge details (Name, Role, T-Shirt Size, Dietary Restrictions for 3 seats) took an average of 4.5 minutes.
  - At minute 3:00, while typing seat #3's details, the screen abruptly refreshed, displaying an empty cart and a notification: *"Your session expired. Tickets released."*
  - Angry buyers abandoned the purchase rather than re-entering all ticket details.
- **Performance Metrics:**
  - **Cart Hold Expiration Abandonment Rate:** 54.2%
  - **Seat Allocation Sell-Through Efficiency:** 68% sold out after 1 hour (leaving 32% inventory locked in abandoned cycle loops).

---

### Optimization Implementation

1. **Calibrated 10-Minute Reservation Timer:**
   - Re-calibrated timer duration from 3 minutes to 10 minutes based on form field friction analysis (average completion time: 4 min 12 sec).
2. **Low-Time Warning Overlay with 1-Click Extension:**
   - At 2:00 remaining, a non-intrusive bottom banner appeared:
     > ⚠️ **Need more time?** You have 2 minutes remaining on your VIP Pass hold.
     > `[ Extend Reservation (+5 Mins) ]`
3. **Form Data Persistence:**
   - Saved form inputs locally in `sessionStorage` so if a user accidentally refreshed or timed out, their attendee names and details remained pre-filled upon re-adding a pass.

---

### After Optimization

- **Buyer Experience:**
  - Team managers filled out detailed attendee badges calmly without fear of losing tickets.
  - 28% of buyers clicked "Extend Reservation" to verify company billing addresses with finance.
- **Performance Metrics:**
  - **Cart Hold Expiration Abandonment Rate:** 12.8% (**-76.3% drop**)
  - **Seat Allocation Sell-Through Efficiency:** 100% VIP passes sold out in 18 minutes.
  - **Total GMV Generated:** $449,500 USD within 20 minutes of drop window opening.
