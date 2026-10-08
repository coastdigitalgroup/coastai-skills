---
name: high-demand-cart-reservation-optimization
description:
  Audit, design, and optimize temporary inventory cart reservations, holds,
  checkout queue countdown timers, expiration warnings, and stock-release recovery
  flows during high-demand product drops, flash sales, ticket releases, and limited-edition launches.
---

# High-Demand Cart Reservation Optimization

## Purpose

High-demand product drops, flash sales, ticket releases, and limited-edition product launches frequently suffer from severe checkout friction and buyer panic. Without explicit inventory reservations, prospective buyers encounter race conditions where items are abruptly stripped from their cart during payment submission—causing extreme buyer frustration, abandoned checkout funnels, and negative social feedback. Conversely, unconstrained inventory holds allow cart hoarders or bots to lock up stock indefinitely, leaving genuine buyers unable to purchase.

This skill provides a systematic framework for auditing, engineering, and optimizing temporary inventory cart holds, visible reservation countdown timers, grace-period expiration warnings, soft cart extensions, and instant stock-release backfill queues. By establishing transparent, time-bound inventory reservations during high-demand events, this skill eliminates race-condition drops, increases Flash-Sale Checkout Completion Rates, and maximizes inventory turnover velocity without triggering buyer anxiety.

---

## Use Cases

- **Limited-Edition Product Drops & Flash Sales:** Merchandising hype releases (sneakers, streetwear, collectibles, hardware) with high concurrent visitor spikes and limited stock.
- **Event & Concert Ticketing Portals:** Securing reserved seats or general admission tickets for a defined window while buyers enter billing and attendee details.
- **High-Demand Seasonal & BFCM Sales:** Regulating inventory holds for doorbuster discounts during holiday peak traffic.
- **VIP & Early-Access Member Sales:** Providing dedicated holding windows for loyalty members or password-protected drop access.
- **Restock & Low-Stock Variant Alerts:** Granting temporary reserved checkout windows to buyers clicking SMS/Email back-in-stock notification links.

---

## When NOT to Use

- **Evergreen / High-Inventory Catalog Items:** For standard products with persistent stock where cart urgency timers create artificial, deceitful pressure, use `urgency-and-scarcity-optimization`.
- **Standard Cart & Drawer Merchandising:** For adding free shipping progress bars, cross-sells, or order notes to everyday shopping carts, use `cart-experience-optimization`.
- **Out-of-Stock Subscription Signup:** For collecting emails on completely depleted SKUs without active holds, use `stockout-recovery-optimization`.
- **Pre-Order & Backorder Bookings:** For items scheduled to ship in the future without immediate physical inventory allocation, use `pre-order-and-backorder-optimization`.

---

## Inputs

1. **Inventory & Drop Metrics:** Total unit allocation per SKU/variant, anticipated concurrent visitor peak, average checkout completion duration (seconds), and historical flash-sale bounce rates.
2. **Current Cart Hold Architecture:** Database or Redis session TTL for inventory reservations, checkout queue mechanisms, and payment gateway latency.
3. **Checkout & Cart UI Templates:** DOM structures for cart drawers, sticky banners, checkout header bars, and modal dialogs.
4. **Customer Support Logs:** Complaints regarding items disappearing mid-checkout, timer panic, or failed payment retries during flash drops.

---

## Outputs

1. **Cart Reservation Audit Report:** Diagnosis of inventory race conditions, fake vs. real timer discrepancies, hoard-lock vulnerabilities, and drop-off points.
2. **Reservation State Machine Specification:** Deterministic design governing initial hold claim, countdown display, warning threshold, extension triggers, and expired stock release.
3. **Accessible Live Timer & Banner Component Specs:** Touch-friendly, WCAG AA compliant sticky reservation bar specs with screen-reader live region announcements.
4. **Stock-Release & Queue Recovery Blueprint:** Micro-interaction design for notifying waiting buyers the instant an expired cart releases inventory back into the pool.

---

## Workflow

### 1. Audit High-Demand Bottlenecks & Hold Rules

Evaluate current drop mechanics under simulated peak concurrency:

- **Reservation Reality:** Is the cart timer backed by an actual database/redis inventory lock, or is it a visual-only countdown that resets on page refresh? (Fake timers destroy trust during genuine hype drops).
- **Hold Duration Calibration:** Is the reservation duration matched to average user checkout velocity? (Too short, e.g., < 3 mins, panics buyers; too long, e.g., > 15 mins, locks inventory unnecessarily).
- **Concurrency & Payment Gateway Bottlenecks:** Does the hold persist throughout 3D-Secure authentication and external payment redirects (Apple Pay, PayPal, Klarna)?

### 2. Establish the Cart Reservation State Machine

Implement a robust multi-stage state machine to manage inventory claims across the user session:

```text
  [ STATE 1: UNRESERVED / PDP ]
    │ (User clicks "Claim & Add to Cart")
    ▼
  [ STATE 2: ACTIVE RESERVATION ] ──> Lock inventory unit in DB/Redis for 7-10 mins
    │                                 Display sticky banner: "Reserved for 08:45"
    │                                 Start subtle countdown timer
    │
    ├── (Proceeds to Checkout) ───────> Maintain hold through payment completion
    │                                   [ STATE 3: ORDER COMPLETED ]
    │
    ├── (Approaches Expiration: 120s) ─> [ STATE 4: SOFT WARNING ]
    │                                   Display toast/modal: "Cart expiring soon!"
    │                                   Offer 1-click extension if stock available
    │
    └── (Timer Expires / Abandoned) ──> [ STATE 5: EXPIRED & RELEASED ]
                                        Release inventory back to active drop pool
                                        Show user clear notice + "Re-enter Queue" button
```

### 3. Design Sticky Reservation Bars & Subtle Timers

Integrate persistent, non-intrusive reservation indicators across cart and checkout stages:

- **Placement:** Position a full-width sticky top bar above the navigation on PDP/Cart and across the top of checkout steps.
- **Microcopy:** Use transparent, reassuring language:
  - *Good:* "✓ Stock reserved for 08:30 while you complete checkout."
  - *Bad:* "Hurry! 100 people are viewing this! Buy NOW!"
- **Visual Feedback:** Use neutral or brand accent colors during active holds. Transition to warm yellow/amber during the final 2 minutes. Reserve red strictly for actual expiration.
- **Accessibility:** Ensure timer numeric updates use `aria-live="polite"` updated at discrete intervals (e.g., every 60 seconds and final 10-second countdown) to prevent screen reader audio thrashing.

### 4. Implement Grace-Period Expiration Warnings & Soft Extensions

Prevent buyer abandonment caused by unexpected expiration:

1. **Trigger Warning:** When reservation time drops below **120 seconds**, display a non-blocking toast or banner with a clear countdown and an "Extend Hold (+3 mins)" action button.
2. **Conditional Extension:** If remaining unallocated inventory exists, allow a one-time extension. If the product is fully claimed by queue waiters, inform the buyer: "High demand: 2 minutes left to finish checkout before stock releases to next buyer."
3. **Session Continuity:** Preserve user-entered shipping address and form fields even if the hold expires, so re-entry into the checkout queue does not require re-typing.

### 5. Engineer Stock-Release Backfill & Re-Entry Queue Micro-Interactions

Capitalize on released stock when abandoned carts expire:

- **Instant Queue Backfill:** When an active reservation expires in State 5, immediately return the unit to the available drop pool or assign it to the next buyer in line.
- **User Expiration Notice:** Replace the checkout form with an empathetic, clear overlay: "Your reservation time expired and this item was released to the next buyer in line."
- **Re-Claim Trigger:** Provide an instant "Check for Released Stock" CTA button that re-polls availability without requiring a full page refresh.

---

## Decision Rules

- **The Real Lock Imperative:** NEVER show a countdown timer unless backend inventory is strictly locked for that user session. Displaying a fake timer that fails to protect the buyer from "out of stock" payment errors destroys brand credibility.
- **The Hold Duration Formula:** Set baseline hold duration to **Average Checkout Time + 3 Minutes** (typically **7 to 10 minutes** total). For complex multi-step corporate or custom order forms, expand to 12 minutes.
- **The Single-Extension Cap:** Limit user-initiated hold extensions to a single +3 minute grant. Uncapped extensions permit manual cart hoarding.
- **Mobile Safe Area Rule:** Mobile sticky reservation banners MUST respect `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` to avoid obscuring sticky purchase buttons or browser controls.
- **Form Persistence Guarantee:** If a hold expires during checkout, always cache user input locally (`sessionStorage`). Never force an expired buyer to re-type address or billing details.

---

## Common Failure Patterns

- **Fake Countdown Resets:** Implementing a JavaScript-only timer that resets back to 10:00 every time the user refreshes or navigates pages, destroying authenticity.
- **Abrupt Mid-Payment Invalidation:** Releasing stock while a customer is mid-transaction inside 3D-Secure authentication or PayPal popups, resulting in charged cards without generated orders.
- **Aggressive Flashing Red Timers:** Flashing red countdown banners from minute 10:00, inducing anxiety and causing mis-typed checkout fields and payment declines.
- **Cart Hoarder Exploits:** Allowing buyers to open multiple browser tabs or scripts to refresh holds infinitely, locking up entire drop allocations.
- **Screen Reader Annoyance:** Updating `aria-live` containers every single second, causing screen readers to constantly read "9 minutes 59 seconds, 9 minutes 58 seconds..." and rendering the site unusable for visually impaired users.

---

## Validation Methods

- [ ] **Flash-Sale Checkout Completion Rate:** Measure (Completed Orders) / (Users who entered Checkout with Reserved Stock). Target: **+15% to +30% relative increase**.
- [ ] **Mid-Payment Out-of-Stock Errors:** Track percentage of payment submissions that fail due to zero inventory. Target: **< 0.1% error rate**.
- [ ] **Cart Abandonment Rate During Drops:** Measure percentage of claimed holds that expire without checkout attempt. Target: **15–25% reduction in hoarded drop abandonment**.
- [ ] **Support Ticket Volume (Drop Day):** Measure CS tickets regarding "item disappeared from cart". Target: **> 50% decrease in stock-loss complaints**.
