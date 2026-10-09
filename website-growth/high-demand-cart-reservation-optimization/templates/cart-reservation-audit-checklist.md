# High-Demand Cart Reservation Audit Checklist & Optimization Template

This template provides an actionable diagnostic checklist and design specification framework for auditing and deploying high-demand cart reservation holds, countdown timers, gentle expiration warnings, and stock-release recovery flows.

---

## Part 1: High-Demand Cart Reservation Audit Checklist

### Section 1: Inventory Lock & Trigger Architecture
- [ ] **Lock Trigger Timing:** Is inventory locked upon **Checkout Initiation** or **Add to Cart** (rather than late payment submission)?
- [ ] **Lock Uniqueness:** Is the reservation tied to a unique session token or authenticated user ID to prevent multi-tab stock duplication?
- [ ] **Lock Backend Storage:** Is the reservation backed by a fast key-value store (e.g., Redis TTL / WebSockets) rather than blocking database table locks?
- [ ] **Oversell Protection:** Does the backend perform atomic decrement operations (`DECR` or Lua scripts) to guarantee zero overselling under high concurrency?
- [ ] **Cart Expiration Sync:** Is client-side timer expiration synchronized with backend TTL cleanup (preventing UI/server drift)?

### Section 2: Countdown Banner & Visual UX
- [ ] **Sticky Visibility:** Is the hold banner persistently visible at the top of the checkout header across all steps (Information, Shipping, Payment)?
- [ ] **Clarity of Information:** Does the banner explicitly state the exact item held, selected variant (size/color/tier), and remaining hold time?
- [ ] **Non-Stressful Visual Palette:** Does the timer use neutral or warm theme colors during early checkout, reserving red/amber highlights for the final minute?
- [ ] **Mobile Responsiveness:** Does the sticky banner render cleanly on narrow mobile viewports (<375px) without obscuring form fields or primary CTAs?
- [ ] **Form State Preservation:** If the hold expires while the user is typing, are form inputs (name, address, email) preserved locally so the user does not have to re-type?

### Section 3: Expiration Warnings & Time Extensions
- [ ] **Soft Expiration Alert:** Is a soft notification presented at T-minus 2:00 minutes before hold expiration?
- [ ] **1-Click Time Extension:** Can the user extend their hold by 3 minutes with a single tap if stock is available?
- [ ] **Extension Cap:** Is time extension restricted to a maximum of 1 extension per user session to prevent hoarding?
- [ ] **3D Secure / OTP Buffer:** Is extra hold buffer automatically applied when a user enters 3D Secure / bank SMS OTP payment verification?

### Section 4: Accessibility & Motion (WCAG AA Compliance)
- [ ] **Screen Reader Live Region (`aria-live`):** Is timer updates communicated via `aria-live="polite"` only at key milestones (entry, 5m, 2m, 1m) rather than every second?
- [ ] **Color Contrast:** Does timer text and background badge meet WCAG AA minimum contrast ratio (4.5:1)?
- [ ] **Reduced Motion Support:** Does the timer disable pulsing animations when `prefers-reduced-motion: reduce` is detected?
- [ ] **Keyboard Navigability:** Is the "Extend Reservation" button fully focusable and operable via Keyboard (`Tab` + `Enter`/`Space`)?

### Section 5: Stock-Release & Waitlist Recovery
- [ ] **Instant Secondary Allocation:** When a cart expires, is the released inventory immediately offered to active users in the queue or product page?
- [ ] **Waitlist Position Transparency:** If a returning user's hold expired, are they shown their exact position in line (e.g., "#3 in line for released stock")?
- [ ] **1-Tap Back-in-Stock Alert:** Can users opt-in to instant SMS/Email notifications if a reserved cart drops during the event?

---

## Part 2: Reservation Banner & Timer Component Specification Template

Use this HTML/CSS/JS structural template to implement a responsive, accessible cart reservation banner in checkout headers.

```html
<!-- High-Demand Cart Reservation Sticky Banner Component -->
<div
  id="cart-reservation-banner"
  class="reservation-banner reservation-banner--active"
  role="region"
  aria-label="Inventory Reservation Status"
>
  <div class="reservation-banner__container">
    <div class="reservation-banner__status">
      <span class="reservation-banner__icon" aria-hidden="true">🔒</span>
      <p class="reservation-banner__text">
        <strong id="reservation-item-label">Size 10.5</strong> reserved in your cart!
        We are holding your stock for
        <time id="reservation-timer-display" class="reservation-banner__timer" datetime="PT10M00S">10:00</time>
      </p>
    </div>

    <!-- Soft Warning Extension Button (Hidden by default, shown at T-minus 2:00) -->
    <button
      id="reservation-extend-btn"
      class="reservation-banner__extend-btn"
      type="button"
      style="display: none;"
      aria-label="Extend inventory hold by 3 minutes"
    >
      Extend Hold (+3 mins)
    </button>
  </div>

  <!-- Screen Reader Milestone Announcer (Polite aria-live region) -->
  <div
    id="reservation-sr-announcer"
    class="sr-only"
    aria-live="polite"
    aria-atomic="true"
  >
    Item reserved for 10 minutes. Complete checkout to guarantee your order.
  </div>
</div>

<style>
.reservation-banner {
  background-color: #0f172a; /* Slate 900 - calm, neutral background */
  color: #f8fafc;
  padding: 0.75rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.875rem;
  border-bottom: 2px solid #334155;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Warning State at T-minus 2:00 */
.reservation-banner--warning {
  background-color: #7c2d12; /* Warm Amber/Brown 900 */
  border-bottom-color: #f97316;
}

/* Critical State at T-minus 0:59 */
.reservation-banner--critical {
  background-color: #7f1d1d; /* Deep Red 900 */
  border-bottom-color: #ef4444;
}

.reservation-banner__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.reservation-banner__status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reservation-banner__timer {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  padding: 0.125rem 0.375rem;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 0.25rem;
}

.reservation-banner__extend-btn {
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.reservation-banner__extend-btn:hover,
.reservation-banner__extend-btn:focus-visible {
  background-color: #1d4ed8;
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

---

## Part 3: Reservation State Logic Implementation Template

```javascript
// High-Demand Cart Reservation Controller (Client-Side)
class CartReservationManager {
  constructor(options = {}) {
    this.totalSeconds = options.initialDurationSeconds || 600; // 10 minutes default
    this.remainingSeconds = this.totalSeconds;
    this.hasExtended = false;
    this.timerInterval = null;

    this.bannerEl = document.getElementById('cart-reservation-banner');
    this.timerDisplayEl = document.getElementById('reservation-timer-display');
    this.extendBtnEl = document.getElementById('reservation-extend-btn');
    this.srAnnouncerEl = document.getElementById('reservation-sr-announcer');

    this.init();
  }

  init() {
    this.updateDisplay();
    this.startTimer();

    if (this.extendBtnEl) {
      this.extendBtnEl.addEventListener('click', () => this.requestTimeExtension());
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      this.updateDisplay();
      this.checkMilestones();

      if (this.remainingSeconds <= 0) {
        this.handleExpiration();
      }
    }, 1000);
  }

  updateDisplay() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');

    if (this.timerDisplayEl) {
      this.timerDisplayEl.textContent = `${formattedMins}:${formattedSecs}`;
      this.timerDisplayEl.setAttribute('datetime', `PT${mins}M${secs}S`);
    }

    // Apply visual gradient states
    if (this.remainingSeconds <= 60) {
      this.bannerEl.className = 'reservation-banner reservation-banner--critical';
    } else if (this.remainingSeconds <= 120) {
      this.bannerEl.className = 'reservation-banner reservation-banner--warning';
      if (!this.hasExtended && this.extendBtnEl) {
        this.extendBtnEl.style.display = 'inline-block';
      }
    }
  }

  checkMilestones() {
    // Screen Reader updates only at key milestones to prevent audio flooding
    if (this.remainingSeconds === 300) {
      this.announceSR('5 minutes remaining on your inventory hold.');
    } else if (this.remainingSeconds === 120) {
      this.announceSR('2 minutes remaining. You may click extend hold if you need extra time.');
    } else if (this.remainingSeconds === 60) {
      this.announceSR('1 minute remaining to complete your order.');
    }
  }

  announceSR(message) {
    if (this.srAnnouncerEl) {
      this.srAnnouncerEl.textContent = message;
    }
  }

  async requestTimeExtension() {
    try {
      // Call backend API to extend Redis key TTL by 180 seconds
      const response = await fetch('/api/cart/reservation/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        this.remainingSeconds += 180;
        this.hasExtended = true;
        if (this.extendBtnEl) {
          this.extendBtnEl.style.display = 'none';
        }
        this.bannerEl.className = 'reservation-banner';
        this.announceSR('Hold extended by 3 minutes.');
      }
    } catch (err) {
      console.error('Failed to extend reservation:', err);
    }
  }

  handleExpiration() {
    clearInterval(this.timerInterval);
    this.announceSR('Your inventory hold has expired.');

    // Trigger soft release check or show waitlist recovery modal
    window.location.reload();
  }
}

// Initialize on checkout page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-reservation-banner')) {
    new CartReservationManager({ initialDurationSeconds: 600 });
  }
});
```
