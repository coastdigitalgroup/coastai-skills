# High-Demand Cart Reservation Audit Checklist

Use this audit checklist before, during, and after high-demand product launches, flash sales, ticket drops, or limited-edition releases to evaluate cart reservation integrity, visual timer usability, queue performance, and stock-release recovery flows.

---

## Section 1: Inventory Hold Timing & Architecture

- [ ] **Exact Reservation Trigger Step**
  - [ ] Inventory is reserved exclusively in the database/cache upon clicking **"Add to Cart"** or entering the cart drawer (NOT deferred to final payment submit).
  - [ ] Reservation holds reflect exact SKU variant locks (size, color, style) in backend inventory tables.
- [ ] **Optimal Hold Duration Window**
  - [ ] Active cart hold TTL (Time-To-Live) is configured between **10 and 15 minutes**.
  - [ ] Hold lifetime provides sufficient time for new guest user checkout completion without forcing rushed entry errors.
  - [ ] Hold duration does NOT exceed 20 minutes (prevents inventory lockup by abandoned carts).
- [ ] **Anti-Overselling Concurrency Protection**
  - [ ] Inventory reservation API utilizes atomic transaction locks or Redis TTL locks to prevent race condition overselling.
  - [ ] Post-purchase order cancellation rate due to stockout is verified at **0.0%**.

---

## Section 2: Visual Countdown Timer & Accessibility

- [ ] **Sticky Timer Viewport Visibility**
  - [ ] Visual reservation timer banner is anchored to the top of the viewport on both cart drawer and checkout screens.
  - [ ] Timer banner consumes maximum **48px height** on mobile viewports, preserving primary form field visibility.
  - [ ] Banner copy explicitly confirms reservation status: e.g., `"🔥 Items Reserved for 09:45 • Complete your order before timer expires"`.
- [ ] **Dynamic Visual State Shifts**
  - [ ] Timer display maintains neutral color scheme (e.g., navy/dark gray background) from start down to 3:00 remaining.
  - [ ] Timer shifts to warning color (e.g., amber background with dark text) between 2:59 and 1:00 remaining.
  - [ ] Timer shifts to high-urgency color (e.g., crimson background with bold white text) under 0:59 remaining.
- [ ] **Accessibility & Assistive Technology Rules**
  - [ ] Screen readers utilize `aria-live="polite"` status announcements triggered ONLY at key time milestones (10m, 5m, 2m, 1m, 30s) rather than every second tick.
  - [ ] Timer text maintains WCAG AA contrast ratio (minimum 4.5:1 for standard text, 3:1 for large bold text).
  - [ ] Pulsing or flashing animations respect `prefers-reduced-motion: reduce` system settings.

---

## Section 3: Virtual Queue & Anti-Hoarding Rules

- [ ] **Virtual Waiting Room (Queue) Triggers**
  - [ ] FIFO (First-In, First-Out) virtual queue engages automatically when concurrent traffic exceeds gateway connection thresholds.
  - [ ] Waiting room screen displays real-time position number (e.g., `#420 in line`) and estimated wait time (e.g., `2 mins`).
  - [ ] Passing through the queue seamlessly transfers the user directly to the active cart with reservation hold enabled.
- [ ] **Bot & Hoarding Safeguards**
  - [ ] Hard quantity caps (e.g., max 1 or 2 units per SKU per order/customer) are enforced at API level.
  - [ ] CAPTCHA or proof-of-work challenges trigger dynamically on suspicious add-to-cart velocity.
  - [ ] Opening multiple browser tabs under a single session/account terminates older unconfirmed cart holds.

---

## Section 4: Soft Expiration & 1-Click Extension Flow

- [ ] **Active Checkout Extension Prompt**
  - [ ] Soft expiration warning modal/toast triggers at **2:00 remaining**.
  - [ ] Extension prompt is offered ONLY if user has interacted with checkout fields within the last 60 seconds.
  - [ ] Prominent 1-click button allows adding **+3 to +5 minutes** to hold duration if stock remains available.
- [ ] **Grace Period Handling**
  - [ ] 60-second hidden grace period is granted if timer reaches 0:00 while payment gateway processing is actively in flight (e.g., 3D Secure bank auth).
  - [ ] Checkout form fields (address, name, email) are saved in local session storage to avoid requiring manual re-entry if hold expires.

---

## Section 5: Stock-Release Recovery & Re-Engagement

- [ ] **Expired Cart Claim-Back UI**
  - [ ] Returning to an expired cart displays clear status: `"Your reservation expired, but items are still available! [Re-Reserve Now]"`.
  - [ ] 1-click button re-applies active hold without forcing user to re-navigate product listing pages.
- [ ] **Waitlist Automated Stock Notifications**
  - [ ] Out-of-stock PDPs and expired cart pages offer a 1-field modal: `"Notify me instantly via SMS if reserved items are released"`.
  - [ ] Expired hold stock released back to warehouse pool automatically triggers priority deep-linked SMS/web push alerts within 60 seconds.
  - [ ] Stock recovery conversion metrics are tracked independently in analytics dashboard.
