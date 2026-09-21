# BOPIS UX, Geo-Location & Fulfillment Heuristics

This reference guide provides technical heuristics, behavioral psychology principles, inventory safety buffer strategies, and mobile UX guidelines for Buy Online, Pick Up In Store (BOPIS) and Curbside Pickup optimization.

---

## 1. Geo-Location & Store Selection Heuristics

### Browser Geo-Location vs. IP Lookup Fallback
- **IP Resolution (Silent First Pass):** Always resolve client IP address server-side or via edge function to establish an initial coarse location (City / State / ZIP) without blocking DOM rendering or prompting intrusive permission dialogs immediately.
- **Browser HTML5 Geolocation API (Action-Triggered):** Request high-accuracy geolocation permission *only* when the user explicitly clicks "Use My Current Location" inside a store locator modal or PDP widget. Requesting permission immediately upon landing causes browser prompt fatigue and high denial rates (>65%).
- **Store Radius Thresholds:**
  - Urban Markets: Default search radius should cap at **10 miles**.
  - Suburban Markets: Default search radius should set to **25 miles**.
  - Rural Markets: Extend search radius to **50 miles**.

### Preference Persistence Rules
- Save the selected store ID in `localStorage` under key `preferred_bopis_store` and sync to customer account profile upon login.
- If a returning customer visits with a saved preferred store, prioritize displaying inventory for *that specific store*, even if IP location indicates they are travelling, but display a subtle banner: *"Viewing stock for your preferred store: North Austin (Change location)"*.

---

## 2. Inventory Safety Stock Buffers & SLA Rules

### Preventing "Pick Decline" Order Cancellations
A "Pick Decline" occurs when an online customer places a BOPIS order, but store associates cannot find the item on shelves (due to shoplifting, misplaced stock, or real-time in-store POS checkout). Pick declines create extreme customer dissatisfaction.

- **The Buffer Matrix Rule:**
  - **Store Stock == 1 Unit:** Flag as **BOPIS Unavailable** on website (or force "Ship to Home" only), UNLESS real-time POS shelf-reservation locking is active.
  - **Store Stock == 2-3 Units:** Flag as **"Limited Stock — Call Store or Reserve Fast"**.
  - **Store Stock >= 4 Units:** Flag as **"In Stock — Ready for Pickup Today"**.
- **Sync Latency Adjustments:**
  - If inventory feed updates every 15 minutes: Apply a **-1 unit** buffer.
  - If inventory feed updates hourly or nightly: Apply a **-3 unit** buffer.

### Dynamic Readiness SLA Calculation
Never display generic static text like "Ready in 2 Hours" if the store is about to close.
- **Formula:**
  $$\text{Cutoff Time} = \text{Store Closing Hour} - \text{SLA Buffer (e.g., 2 Hours)}$$
- **If Order Time < Cutoff Time:** Display *"Ready for pickup today by [Order Time + 2 Hours]"*.
- **If Order Time >= Cutoff Time:** Display *"Ready tomorrow morning by 10:00 AM"*.
- **During Closed Hours (Night Time):** Display *"Order now for morning pickup — Ready tomorrow by 10:00 AM"*.

---

## 3. Cart & Checkout UX Heuristics

### Cognitive Friction Reduction
- **Bypass Shipping Address:** Pickup orders do NOT require last-mile carrier logistics. Forcing street address entry introduces 45-60 seconds of unnecessary cognitive friction.
- **Dedicated Field Architecture for BOPIS Checkout:**
  1. Pickup Location Summary (Store Name, Address, Hours, Map link).
  2. Pickup Contact (First Name, Last Name, Mobile Phone for SMS).
  3. Alternate Pickup Person (Optional Checkbox -> Proxy Name + Proxy Phone).
  4. Payment Details (Credit Card, Express Mobile Wallet).
  5. Billing Address (Checkbox: "Same as Payment Method").

### Express Payment Integration (Apple Pay / Google Pay / Shop Pay)
- When Apple Pay / Google Pay is triggered from a BOPIS-configured PDP or Cart, pass `shippingType: 'PICKUP'` in the payment request payload.
- Ensure the payment sheet displays the Store Address in place of shipping address fields to prevent user confusion during fingerprint/FaceID confirmation.

---

## 4. Post-Purchase Curbside Arrival & Check-In Mechanics

### No-App Mobile Web Check-In Architecture
Do not force customers to download a 100MB mobile app just to notify store staff they have arrived in the parking lot.
- **SMS Trigger:** When store associate marks order as "Picked & Packed", send automated SMS:
  > *"Apex Tools: Order #12345 is READY! Pick up inside at Service Desk, or for Curbside Park in Spots 1-5 & tap here to check in: https://apex.tech/c/12345"*
- **Web Check-In Micro-App:**
  - **Screen 1:** "I've Arrived at the Store" (1 Large Button).
  - **Screen 2:** Select Parking Spot Number (1-10) AND Vehicle Color/Type (e.g., "Silver SUV").
  - **Screen 3:** Confirmation screen with real-time status: *"Associate Sarah is bringing your order out now!"* and direct store phone call button fallback.

---

## 5. Omnichannel In-Store Attachment Sales Strategies

Transforming online pickup shoppers into physical store foot traffic provides a unique opportunity to capture additional impulse revenue:

- **The Bounceback Paper/Digital Voucher:** Include an exclusive, time-sensitive in-store offer printed on the physical pickup receipt attachment or embedded in the digital pickup QR code pass.
  - *Example Copy:* *"Thanks for picking up your order! Enjoy $10 off any additional $40 in-store purchase today only. Show this barcode to any cashier."*
- **Aisle-Specific Complementary Suggestions:** On the order pickup readiness page, display high-margin accessory items located directly adjacent to the pickup counter (e.g., batteries, cables, protective gloves, paint brushes).
- **Fast-Track Returns & Exchanges:** Explicitly state on the digital receipt: *"Need a different size or color? Exchange instantly right here at the counter — no repacking or shipping labels required."*
