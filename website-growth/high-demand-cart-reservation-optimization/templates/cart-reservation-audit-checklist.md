# High-Demand Cart Reservation Audit & Implementation Checklist

Use this checklist to audit, configure, and evaluate temporary cart holds, countdown timers, inventory lock state machines, and release recovery flows for high-demand drops and flash sales.

---

## 1. Inventory Lock Architecture & Server Synchronization

- [ ] **Server-Authoritative Timestamps:** Reservation expiration is calculated using server epoch timestamps (`expires_at`), not client-side system clocks.
- [ ] **Two-Tier Hold Strategy:**
  - [ ] **Tier 1 (Soft Hold):** Sessions in cart drawer reserve slots in Redis/cache for 10–15 minutes.
  - [ ] **Tier 2 (Hard Lock):** Transitioning to checkout initiates an atomic database/inventory lock for 5–8 minutes.
- [ ] **Atomic Decrement Operations:** Inventory allocation uses atomic decrement calls (e.g., Redis `DECRBY` or SQL `UPDATE inventory SET count = count - 1 WHERE count > 0`) to prevent concurrent race conditions.
- [ ] **Multi-Tab Synchronization:** Active countdown timer state is synchronized across browser tabs using `BroadcastChannel` or `localStorage` storage events.
- [ ] **Bot & Abuse Safeguards:** Cloudflare Turnstile, reCAPTCHA v3, or rate-limiting middleware is enabled on cart reservation endpoints (`/api/cart/hold`).

---

## 2. Reservation UX & Countdown Timer Display

- [ ] **Sticky Visibility:** Reservation countdown status is persistently visible in a fixed header or top checkout banner across all device viewports (desktop, tablet, mobile).
- [ ] **Clear Microcopy:** Banner states explicitly: *"Item(s) reserved for [ mm:ss ]. Finish checkout before stock is released."*
- [ ] **Contextual Visual State Shifts:**
  - [ ] **Normal (> 3 mins):** Subdued, reassure-first visual styling (blue/slate background, steady clock).
  - [ ] **Warning (< 2 mins):** High-visibility warning indicator (amber/orange pulsing badge) with explicit callout to finalize payment.
  - [ ] **Critical (< 30 secs):** Urgent highlight with immediate express payment CTA option.
- [ ] **Non-Intrusive Guidance:** Countdown timer updates smoothly without causing layout shifts (CLS) or jumping layout elements.

---

## 3. Accessibility & Mobile Optimization

- [ ] **Screen Reader ARIA Live Regions:**
  - [ ] Status container uses `aria-live="polite"` updated every 60 seconds during normal duration.
  - [ ] Status switches to `aria-live="assertive"` when remaining duration drops below 1 minute.
  - [ ] Timer clock countdown does NOT spam aria-live updates every single second.
- [ ] **Express Checkout Priority:** Apple Pay, Google Pay, and Shop Pay buttons are rendered above standard address inputs on reserved checkout screens.
- [ ] **Form Autofill Enabled:** Address and payment inputs use standard HTML autocomplete attributes (`autocomplete="shipping street-address"`, `autocomplete="email"`).
- [ ] **Reduced Motion Support:** Respects `prefers-reduced-motion` settings by disabling pulsing animations on warning timers.

---

## 4. Timer Expiration, Grace Period & Stock Recovery

- [ ] **60-Second Grace Period Check:** When timer reaches `00:00`, a background check evaluates real-time stock levels before clearing the cart.
- [ ] **Automatic Extension:** If inventory remains available upon expiration, the system automatically grants +3 minutes and shows a reassuring message: *"Extra time added! Inventory still available."*
- [ ] **Form Data Preservation:** Customer input (shipping address, attendee names) is stored in `sessionStorage` so users do not re-type details if a timeout occurs.
- [ ] **Sold-Out Recovery Flow:** If stock is claimed by another waiter upon expiration, the user is gracefully redirected to a clear recovery view with:
  - [ ] Transparent explanation of stock release.
  - [ ] 1-Click subscription to next batch / restock notification.
  - [ ] Recommended available alternative sizes/colorways.

---

## 5. Quantitative Metric Verification

| Metric | Target Baseline | Post-Optimization Target | Project Result |
| :--- | :--- | :--- | :--- |
| **Drop Launch Checkout Completion Rate** | Baseline % | **+15% to +30% relative** | _____ % |
| **Inventory Oversell Incident Rate** | Current # | **0.0% (Zero oversells)** | _____ % |
| **Cart Timeout Expiration Abandonment** | Baseline % | **> 30% reduction** | _____ % |
| **Mobile Time-to-Checkout Completion** | Baseline Secs | **15–25% faster** | _____ Secs |
| **Support Ticket Volume (Inventory Errors)** | Baseline Tickets | **> 80% reduction** | _____ Tickets |
