---
name: high-demand-cart-reservation-optimization
description:
  Audit, design, and optimize temporary inventory cart reservations, holds,
  checkout queue countdown timers, expiration warnings, and stock-release recovery
  flows during high-demand product drops, flash sales, ticket releases, and limited-edition launches.
---

# High-Demand Cart Reservation Optimization

## Purpose

During high-demand product drops, flash sales, limited sneaker releases, or event ticket drops, extreme concurrency creates severe conversion friction and buyer anxiety. Customers experience phantom stockouts, cart sniping (items disappearing out of cart while filling payment details), confusing artificial countdown timers, and sudden checkout crashes.

The High-Demand Cart Reservation Optimization skill provides a systematic framework for auditing, designing, and optimizing temporary inventory hold mechanisms, real-time cart reservation state indicators, checkout queue transparency, hold expiration warnings, and stock-release recovery flows. By securing inventory upon cart addition and displaying transparent, non-manipulative countdown and queue feedback, this skill converts high-concurrency traffic spikes into completed orders while reducing cart abandonment, payment failure drops, and support ticket surges.

---

## Use Cases

- **E-Commerce Product Drops & Flash Sales:** Brands launching limited-run apparel, collectibles, electronics, or collaboration merchandise with high concurrent traffic.
- **Ticketing & Live Events:** Primary ticket sellers and venue portals managing limited seats during public on-sales.
- **Hospitality & Experience Bookings:** Time-sensitive reservation platforms holding limited room blocks, workshop slots, or dining reservations during peak booking windows.
- **High-Demand Pre-Orders:** Product launches with limited initial manufacturing batches or allocation caps per customer.

---

## When NOT to Use

- **Evergreen Standard E-Commerce:** Standard retail catalogs with unlimited or deep inventory depth where cart holds lock up available stock needlessly (use `cart-experience-optimization` or `checkout-flow-optimization` instead).
- **Out-of-Stock Lead Generation:** Collecting emails when items are completely sold out before any cart addition (use `stockout-recovery-optimization` or `waitlist-prelaunch-optimization`).
- **Urgency Manipulation:** Creating fake countdown timers or fabricated inventory scarcity badges for evergreen products (violates ethical patterns and causes user distrust).

---

## Inputs

1. **Drop & Release Analytics:** Cart-to-checkout conversion rates during launch windows, cart expiration rates, queue drop-off metrics, and checkout completion time distribution.
2. **Backend Inventory & Lock Architecture:** Knowledge of backend reservation logic (e.g., Redis TTL locks, Shopify line-item reservation APIs, custom database lease duration, inventory release cron schedules).
3. **Queue & Checkout UI Specs:** DOM structure, modal components, sticky banners, and mobile drawer layouts for cart countdowns, queue status displays, and expiration warnings.
4. **Customer Support Logs:** Common buyer complaints during recent drops (e.g., "Item disappeared at payment step", "Timer restarted", "Queue stuck at 1 minute").

---

## Outputs

1. **Cart Reservation Friction Audit:** Diagnostic report evaluating hold duration, queue transparency, visual indicator placement, mobile viewport persistence, and expiration warning UX.
2. **Reservation State Machine Specification:** UX & technical specification for the 5-stage reservation lifecycle (Queueing -> Held/Reserved -> Warning/Extension -> Expired -> Release Recovery).
3. **Checkout Queue & Timer UI Blueprint:** Production-ready UI specs and microcopy for persistent hold banners, progress indicators, auto-extension triggers, and cart release state transitions.
4. **Stock Release Recovery Protocol:** Workflow and messaging design to immediately re-allocate expired reserved items to active waiting customers or queue members.

---

## Workflow

### 1. Audit Reservation Architecture & UX Leakage

Evaluate the end-to-end customer journey during high-concurrency launches:

- **Reservation Trigger Point:** Is inventory reserved upon clicking "Add to Cart", entering checkout, or starting payment? (Reserving upon "Add to Cart" or Queue entry prevents cart sniping).
- **Hold Time Adequacy:** Is the hold timer realistic for completing checkout (e.g., 8–15 minutes), accounting for mobile auto-fill, address validation, and 3DS payment verification?
- **Timer Transparency & Prominence:** Is the countdown clock persistently visible across PDP, cart drawer, and every checkout step without obscuring primary CTAs?
- **Queue Feedback:** Does the waiting queue provide realistic position/wait time estimates, or does it display static spinners that induce bounce behavior?
- **Expiration Grace Period & Warning:** Does the system warn users 2 minutes prior to expiration with an optional single 3-minute extension option if active typing is detected?

### 2. Design the 5-Stage Reservation Lifecycle State Machine

Govern the reservation flow through explicit, accessible visual and behavioral states:

```text
  [ STAGE 1: CHECKOUT QUEUE ]
    │ (Traffic exceeds concurrency threshold)
    ▼ Display: Estimated wait time, position bar, active keep-alive heartbeat
  [ STAGE 2: INVENTORY RESERVED ]
    │ (Items allocated to cart)
    ▼ Display: Persistent top banner "Item Reserved for 10:00 minutes"
  [ STAGE 3: EXPIRATION WARNING ]
    │ (Timer reaches 2:00 remaining)
    ▼ Display: Warning modal/toast + "Extend Hold (+3 mins)" action
  [ STAGE 4: HOLD EXPIRED ]
    │ (Timer hits 0:00 without payment submit)
    ▼ Display: Clear release banner, soft inventory release attempt
  [ STAGE 5: STOCK RELEASE RECOVERY ]
    │ (Item sold to next in queue OR still available)
    ▼ Display: Direct option to re-reserve or notify on secondary drop
```

- **Stage 1 (Queue):** High-concurrency traffic enters a virtual waiting room with a dynamic progress bar, calculated wait time (e.g., "Estimated wait: ~3 mins"), and reassuring messaging ("Do not refresh; your place is secured").
- **Stage 2 (Reserved Hold):** Inventory is locked in DB/cache. Display a persistent, non-intrusive status banner (e.g., "Your item is held for 12:00"). Lock the product variant and price.
- **Stage 3 (Expiration Warning):** When timer reaches **2:00**, trigger a subtle sticky notification or accessible dialog: *"Your reservation expires in 2 minutes. Need more time?"* Allow a one-time 3-minute extension if the customer is actively interacting with form fields.
- **Stage 4 (Expired):** If the timer hits **0:00**, release the hold gracefully. DO NOT clear the cart silently. Show an explicit modal: *"Your reservation timed out. Checking stock availability..."*
- **Stage 5 (Release Recovery):** If stock remains, allow 1-click re-reservation. If stock was claimed by another buyer in queue, seamlessly transition the cart to a "Stock Release Waitlist" or suggest available alternate sizes/variants.

### 3. Implement Persistent Visual Feedback & Accessibility

Ensure reservation state is clear across all screen sizes and device types:

- **Header / Cart Sticky Banner:** A compact, high-contrast banner (`position: sticky; top: 0; z-index: 1000`) displaying: `⏱️ Reserved for 08:45 | Complete purchase to secure`.
- **Keyboard & Screen Reader ARIA Live:** Update reservation countdowns politely using `aria-live="polite"` at 1-minute intervals and at 30/10 second marks to prevent overwhelming screen reader users.
- **Mobile Viewport Optimization:** Ensure timer banners do not cover mobile primary checkout CTA buttons or address input fields (`env(safe-area-inset-bottom)` safety margins).

### 4. Optimize Inventory Release & Re-Allocation Protocols

Eliminate orphaned inventory and maximize drop yield:

- **Instant Un-Hold on Abandonment:** If a user explicitly clicks "Remove from Cart" or navigates away via an "Exit Drop" button, immediately release the inventory lease back into the pool.
- **Second-Chance Queue Push:** When a reservation expires, automatically offer the freed inventory to active users currently sitting in the Stage 1 Queue or viewing the out-of-stock PDP.

---

## Decision Rules

- **The Cart-Lock Timing Rule:** Hold timers MUST be set between **8 and 15 minutes**. Under 8 minutes creates panic and payment failures (e.g., 3DS bank verification timeouts); over 15 minutes locks up inventory from eager buyers needlessly.
- **The Queue Transparency Rule:** Never display an unquantified loading spinner during high-traffic drops. Always show either estimated wait time, queue number position, or a smooth linear progress indicator updated via WebSocket or SSE.
- **The No-Surprise Expiration Rule:** Never wipe a user's filled address or credit card details upon cart expiration. If stock is still available, keep form fields intact so they can re-reserve with 1 click.
- **One-Time Extension Rule:** Allow maximum ONE 3-minute hold extension per session, gated by active form focus, to prevent bot squatting while accommodating human shoppers needing assistance.
- **Transparent Stock Lock Rule:** Reserving an item MUST lock the specific SKU/variant and price at the time of reservation. Price changes or mid-checkout stock updates while a hold is active are prohibited.

---

## Constraints

- **Backend Cache Consistency:** System must use atomic lease locks (e.g., Redis `SET key value NX PX 600000`) to prevent double-allocation under sub-millisecond concurrency.
- **Client Clock Discrepancies:** Countdown timers MUST sync with server timestamps (`server_time_remaining`) rather than relying purely on client `setInterval` or system clock time, which can be manipulated or drift.
- **Payment Gateway Latency:** The hold timer must automatically pause or grant a 3-minute grace period once payment processing (`3D Secure` or bank authorization) has been initiated.

---

## Non-Goals

- Bot prevention, CAPTCHA integration, or IP rate-limiting architecture (handled by edge security tools like Cloudflare Turnstile or Queue-it).
- Payment gateway integration or gateway drop recovery (see `checkout-payment-decline-optimization`).
- Long-term pre-order waitlist management outside launch windows (see `waitlist-prelaunch-optimization`).

---

## Common Failure Patterns

- **Phantom Stockout (Cart Sniping):** Item is added to cart, but when the user reaches the final payment click after typing shipping details, they get an error "Item Sold Out". This destroys brand trust and results in high customer support churn.
- **Timer Reset Loop:** Countdown timer resets back to 10:00 every time the user navigates between cart, shipping, and payment steps, rendering the countdown meaningless.
- **Silent Cart Wiping:** The 10-minute timer expires while the user is looking for their credit card, and the app silently wipes the entire cart and redirects to the homepage without explanation.
- **Mobile Banner Blockade:** Sticky reservation timer banner fixed at the bottom of mobile viewports covers the "Pay Now" button, making purchase completion impossible on smaller screens.
- **Client Clock Manipulation:** Client-side JavaScript timer determines inventory availability; users modify local computer clock to freeze hold timers indefinitely.

---

## Validation Methods

- [ ] **Drop Checkout Completion Rate (Drop CCR):** (Completed Orders / Users Who Added to Cart During Launch Window) * 100. Target: **+12% to +25% relative increase**.
- [ ] **Cart Expiration Rate:** Percentage of held carts that expire without purchase attempt. Target: **< 15% during high-demand drops**.
- [ ] **Stockout Support Ticket Volume:** Count of support tickets reporting "stolen item from cart" or "checkout timer error". Target: **> 70% reduction in drop-related complaints**.
- [ ] **Inventory Release Re-Allocation Yield:** Percentage of expired/released inventory successfully purchased by waitlist or queue buyers within the same drop window. Target: **> 85% re-allocation efficiency**.
