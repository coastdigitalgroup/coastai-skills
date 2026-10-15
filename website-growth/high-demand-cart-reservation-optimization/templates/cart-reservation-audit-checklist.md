# High-Demand Cart Reservation & Countdown Timer Audit Checklist

Use this audit checklist before launching a high-demand product drop, sneaker launch, flash sale, or ticket release. Evaluate each area to identify conversion friction, race conditions, artificial scarcity vulnerabilities, and accessibility compliance gaps.

---

## 1. Server-Side Inventory Reservation & Locking

- [ ] **True Server Lock Enforcement:** Does clicking "Add to Cart" or entering checkout trigger an immediate server-side inventory lock (e.g., Redis key with TTL) rather than relying on client JS?
- [ ] **Zero Oversell Guarantee:** Is inventory checked atomically at reservation lock creation to ensure stock cannot be oversold when concurrency spikes?
- [ ] **Database Row Lock / Mutex Protection:** Are checkout completion transactions wrapped in database row locks or optimistic concurrency controls to prevent race conditions during final payment processing?
- [ ] **Server Time Synchronization:** Is the reservation expiration timestamp calculated using authoritative server time (`expires_at_timestamp`), rendering client clock manipulation ineffective?
- [ ] **Keep-Alive Heartbeat Safety:** If a keep-alive endpoint is present, does it verify active user interaction (e.g., form input focus or scroll) before extending server TTLs?

---

## 2. Visual Countdown UI & State Feedback

- [ ] **Persistent & Unobtrusive Placement:** Is the reservation timer sticky across PDP, Cart Drawer, and all Checkout funnel steps (Information, Shipping, Payment)?
- [ ] **Positive Framing Copy:** Is the countdown framed around guaranteed reservation (`"🔒 Reserved for 11:42"`) rather than negative loss pressure (`"Hurry! Time running out"`)?
- [ ] **Dynamic Color Taxonomy:** Does the timer background/accent color shift intuitively as time wanes (e.g., Neutral/Green at >5 min -> Amber at 2-5 min -> Red under 2 min)?
- [ ] **Multi-Tab State Synchronization:** Does opening new tabs or refreshing the page maintain exact synchronized countdown time via `BroadcastChannel` or `localStorage` listeners?
- [ ] **Mobile Thumb-Zone Safety:** On mobile viewports, does the sticky reservation banner avoid obscuring native iOS/Android home indicators or fixed sticky ATC buttons?

---

## 3. Pre-Expiration Warnings & Extension Flow

- [ ] **The 2-Minute Pre-Expiration Trigger:** Does a non-modal bottom sheet, toast, or modal trigger when exactly 2:00 remains on the reservation clock?
- [ ] **1-Click Extension CTA:** Does the warning feature an explicit `[ Extend Hold (+5 Min) ]` button that extends both client timer and server TTL seamlessly?
- [ ] **Single Extension Limit:** Is manual time extension strictly capped at 1 extension per user session to prevent perpetual cart hoarding by bots or scalpers?
- [ ] **Form Input Preservation:** When the warning surfaces during checkout, does it preserve all previously entered form fields (address, name, shipping method)?

---

## 4. Graceful Stock Release & Recovery Flow

- [ ] **Non-Destructive Timer Expiration:** When time expires, does the UI retain item details with a "Stock Released" status rather than wiping the cart silently or redirecting to a 404 page?
- [ ] **Instant Stock Re-Check:** Is a `[ Re-Check Availability ]` button presented to immediately issue a fresh reservation if stock remains in pool?
- [ ] **1-Click Waitlist Conversion:** If stock sold out during session expiration, does the empty cart automatically transition into a 1-click SMS/Email restock alert form?
- [ ] **Pre-filled Session Data:** Is the waitlist form automatically populated with any email or phone number captured during the abandoned checkout session?

---

## 5. Anti-Hoarding & Anti-Bot Safeguards

- [ ] **Per-Household Quantity Caps:** Are strict purchase limits (e.g., max 2 units per customer account/IP) enforced at the reservation API layer?
- [ ] **CAPTCHA / Rate-Limiting Protection:** Are Add-To-Cart reservation endpoints protected against rapid automated bot requests via rate-limiting or Cloudflare/reCAPTCHA triggers?
- [ ] **Abandoned Reservation Recycling:** Are expired inventory locks returned back to the available queue pool within < 500ms of TTL expiration?

---

## 6. Accessibility & Technical Performance

- [ ] **ARIA Live Region Management:** Is the countdown display housed inside an `aria-live="polite"` element that updates screen readers periodically (every 60s, then every 10s under 1 minute) without spamming auditory output?
- [ ] **Reduced Motion Compliance:** Do timer visual transitions respect `prefers-reduced-motion: reduce` by turning off pulsating animations or flashing alerts?
- [ ] **High Contrast Ratio:** Does the countdown badge maintain a minimum **4.5:1** contrast ratio against its background across all state color changes (green, amber, red)?
- [ ] **Zero Layout Shift (CLS):** Does injecting or showing the sticky reservation banner preserve page layout without shifting primary CTA buttons or input fields?
