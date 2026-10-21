# Reservation Psychology & Inventory Heuristics

This reference guide provides foundational behavioral psychology principles, inventory mechanics, anti-bot protection heuristics, and WCAG AA accessibility standards for designing high-converting cart reservation systems during high-demand product drops and flash sales.

---

## 1. Behavioral Psychology & Persuasion Principles

### Loss Aversion & Endowment Effect
- **Psychological Principle:** Kahneman and Tversky's Prospect Theory demonstrates that the psychological pain of losing an item is roughly twice as powerful as the pleasure of gaining it.
- **Application in Cart Holds:** The moment an item is added to cart and labeled as `"Reserved for You"`, the user psychologically claims ownership over the item (the Endowment Effect). Displaying a countdown timer reframes checkout completion not as "spending money", but as "protecting my item from being taken away by someone else".

### Urgency vs. Anxiety Curve (The Yerkes-Dodson Law)
- **Optimal Arousal Level:** A moderate level of urgency focuses user attention, accelerates decision-making, and reduces idle hesitation.
- **Over-Arousal (Panic):** If reservation holds are excessively short (< 5 minutes) or timers flash aggressively in bright red numbers, user cognitive load spikes into anxiety. Panic causes typing mistakes, billing zip code errors, 3D Secure failures, and abrupt checkout abandonment.
- **Design Rule:** Keep default cart holds between **10 and 15 minutes**. Use neutral styling during the initial 80% of the duration, reserving high-contrast warning colors strictly for the final 2 minutes.

---

## 2. Inventory Lockup Economics & Hold Heuristics

### The Inventory Lockup Equation
During high-traffic releases, unpurchased active cart holds remove inventory from the purchasable pool:

$$\text{Locked Inventory \%} = \left( \frac{\text{Active Unpurchased Carts} \times \text{Hold Duration (Minutes)}}{\text{Total Inventory Pool} \times \text{Drop Window Duration}} \right) \times 100$$

- **High TTL Hazard (e.g., 30-Minute Holds):** If 3,000 users add items to cart and abandon, 60% of total drop inventory sits locked and unpurchasable for 30 minutes. Real buyers see "Sold Out" on product pages even though thousands of units remain unpaid.
- **Short TTL Hazard (e.g., 3-Minute Holds):** First-time buyers cannot complete guest address entry and credit card verification in 180 seconds. Cart expirations mid-checkout trigger extreme user anger and support backlash.
- **Optimal Balance:** A **12-minute hold TTL** with a **1-click soft extension prompt (+4 minutes)** at the 2-minute mark if checkout interaction is detected.

---

## 3. Anti-Bot & Anti-Hoarding Protection Heuristics

### Common Reseller Bot Strategies
1. **Cart Hoarding (Inventory Denial Attack):** Bot networks spawn hundreds of headless browser sessions to add every available unit to cart, locking up inventory without paying, while secondary reseller markets list items at marked-up prices.
2. **Multi-Tab Session Splitting:** Users open 10 tabs simultaneously to reserve multiple sizes/colors, intending to decide later while blocking other buyers.

### Technical Mitigation Rules
- **Single Active Reservation Rule:** Enforce a strict 1-active-reservation limit per authenticated user session or IP fingerprint. Attempting to hold a second reservation in a new tab auto-releases the previous hold.
- **Proof-of-Work / Turnstile Triggers:** Integrate invisible CAPTCHA or lightweight browser proof-of-work challenges upon clicking "Add to Cart" during traffic spikes above baseline thresholds.
- **Cart API Rate Limiting:** Restrict cart mutation endpoints (`/cart/add.js`, `/graphql`) to maximum 3 requests per 10 seconds per IP address.

---

## 4. WCAG AA Accessibility & Timer Implementation Standards

### Screen Reader Notification (`aria-live`)
Binding screen reader audio output to every second tick of a visual countdown timer renders the web page completely unusable for blind or visually impaired users using NVDA, JAWS, or VoiceOver.

```html
<!-- Correct Accessible Timer Markup -->
<div
  class="reservation-timer-banner"
  role="region"
  aria-label="Cart Reservation Countdown"
>
  <p class="timer-display">
    Items reserved for <span id="visual-countdown">08:45</span>
  </p>

  <!-- Screen Reader Announcements Container -->
  <div
    id="sr-timer-status"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
  >
    <!-- JavaScript dynamically injects milestone text here -->
    Items are reserved for 10 minutes.
  </div>
</div>
```

### Screen Reader Announcement Schedule
Inject textual status updates into the `#sr-timer-status` element ONLY at these exact time milestones:
- **10:00 remaining:** `"Items are reserved for 10 minutes."`
- **05:00 remaining:** `"5 minutes remaining to complete your order."`
- **02:00 remaining:** `"2 minutes remaining. You can extend your hold if you need more time."`
- **01:00 remaining:** `"1 minute remaining. Complete your order before items are released."`
- **00:30 remaining:** `"30 seconds remaining."`
- **00:00 (Expired):** `"Reservation expired. Items have been unreserved."`

### Motion Accessibility (`prefers-reduced-motion`)
Pulsing background colors or flashing warning numbers can trigger disorientation or vestibular distress. Always respect CSS media queries:

```css
@media (prefers-reduced-motion: reduce) {
  .reservation-timer-banner,
  .timer-warning-pulse {
    animation: none !important;
    transition: none !important;
  }
}
```
