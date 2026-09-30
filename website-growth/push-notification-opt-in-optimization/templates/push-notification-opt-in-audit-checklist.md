# Web Push Notification Opt-In Audit & Optimization Checklist

Use this reusable audit checklist to evaluate, diagnose, and optimize web push notification permission requests across e-commerce, publishing, SaaS, and marketplace websites.

---

## 1. Technical Baseline & Permission State Audit

- [ ] **Check Native Prompt Timing:** Verify that `Notification.requestPermission()` is **NEVER** called on initial page load, DOM ready, or within the first 10 seconds of a cold visitor session.
- [ ] **Audit `Notification.permission` Ratio:** Query site analytics or execute browser console diagnostics to determine current permission states:
  - Total Visitors in `default` state (unprompted / eligible): Target **>70%**.
  - Total Visitors in `granted` state (active subscribers): Target **>15%**.
  - Total Visitors in `denied` state (permanently blocked): Target **<15%**.
- [ ] **Verify HTTPS & Service Worker Setup:** Ensure web push is running over valid HTTPS with an active, root-scoped Service Worker (`/sw.js` or `/service-worker.js`) capable of handling `push` and `notificationclick` events.
- [ ] **Cross-Browser Capability Check:** Verify push implementation compatibility across Chrome (Desktop/Android), Edge, Firefox, Safari (macOS), and iOS Safari (iOS 16.4+ Web Push).

---

## 2. Trigger Timing & User Intent Alignment

- [ ] **Action-Driven Triggers Implemented:**
  - [ ] E-Commerce: Out-of-Stock size/color selection ("Notify Me When Restocked").
  - [ ] E-Commerce: Wishlist / Favorite item addition ("Alert Me on Price Drops").
  - [ ] E-Commerce / SaaS: Order completion / Delivery tracking ("Get Shipment Updates").
  - [ ] SaaS / App: Mentioned in comment, task assigned, or project state change.
  - [ ] Media / Publishing: Following a specific author, topic tag, or breaking news category.
- [ ] **Engagement Thresholds Configured (For General Traffic):**
  - [ ] Minimum Page Depth: Visitor has viewed at least **2+ pages** in the current session.
  - [ ] Minimum Time on Site: Visitor has actively browsed for at least **45+ seconds**.
  - [ ] Scroll Depth: Visitor has scrolled at least **60%** down the current page content.

---

## 3. Two-Step Soft Prompt UI & Copy Design

- [ ] **Two-Step Architecture:** Soft prompt is rendered as a non-blocking HTML/CSS element that precedes the native browser permission request.
- [ ] **Clear Iconography & Visual Anchor:** Prominently features a recognizable icon (bell, package tracker, price badge, or lightning bolt) matching the notification category.
- [ ] **Value-Driven Headline:** Uses benefit-focused headline microcopy rather than system terminology:
  - *Poor:* "Allow Notifications" / "Example.com Wants to Send Messages"
  - *Strong:* "Get Instant Price Drop Alerts" / "Track Your Delivery in Real-Time"
- [ ] **Explicit Value Proposition Body Copy:** Articulates exact frequency, content type, and spam protection:
  - *Example:* "We'll notify you when items in your cart go on sale. Maximum 1 alert per week. Unsubscribe anytime."
- [ ] **Action-Oriented Primary CTA:** Uses explicit action verbs:
  - *Example:* `[Enable Price Alerts]`, `[Notify Me]`, `[Turn On Updates]`
- [ ] **Frictionless Secondary CTA / Dismiss Link:** Includes a low-contrast dismiss button (`[Not Now]`, `[Maybe Later]`) that closes the soft prompt smoothly without triggering native permissions.

---

## 4. Mobile Viewport & Ergonomics Audit

- [ ] **Height Limitation:** Soft prompt on mobile devices (<768px) consumes **<25% of vertical viewport height** (e.g., top or bottom slide-in card).
- [ ] **No Primary CTA Overlap:** Soft prompt does not obscure primary page actions, such as "Add to Cart", "Checkout", main navigation bars, or mobile sticky footers.
- [ ] **Touch Target Sizing:** All tap targets (Enable button, Dismiss link, Close "X") satisfy minimum WCAG AA sizing requirements (**at least 44x44px** with 8px separation).
- [ ] **PWA / Standalone Support:** For iOS web push, verify PWA manifest (`manifest.json`) and "Add to Home Screen" prompt guidance where applicable.

---

## 5. Dismissal, Cooldown & Permission Recovery

- [ ] **Local Cooldown Persistence:** Clicking "Not Now" or dismissing the soft prompt sets a local cookie/`localStorage` key (e.g., `push_prompt_cooldown`).
- [ ] **Minimum Cooldown Interval:** Soft prompts are suppressed for a minimum of **7 days** (general visitors) to **14 days** (e-commerce) after dismissal.
- [ ] **Persistent Secondary Opt-In Widget:** A subtle floating widget (e.g., small bottom-left Bell Icon) or account settings toggle remains available for users who previously clicked "Not Now".
- [ ] **Denied State Handling (Permission Recovery):**
  - [ ] System checks `Notification.permission === 'denied'` before rendering soft prompts.
  - [ ] If status is `denied`, soft prompt is replaced with an address-bar unblock guide: *"Click the padlock icon 🔒 in your address bar and set Notifications to Allow."*

---

## 6. Analytics, Tracking & Experimentation

- [ ] **Event Telemetry Configured:**
  - [ ] `push_soft_prompt_impression`: Tracked when soft prompt renders.
  - [ ] `push_soft_prompt_accepted`: Tracked when user clicks primary CTA on soft prompt.
  - [ ] `push_soft_prompt_dismissed`: Tracked when user clicks "Not Now" or closes soft prompt.
  - [ ] `push_native_prompt_granted`: Tracked when browser native permission returns `granted`.
  - [ ] `push_native_prompt_denied`: Tracked when browser native permission returns `denied`.
- [ ] **Key Performance Indicators (KPIs) Monitored:**
  - [ ] **Push Opt-In Rate:** Target **>10%**.
  - [ ] **Native Block Rate:** Target **<10%**.
  - [ ] **Soft Prompt Conversion Rate:** Target **>30%**.
  - [ ] **Push Campaign Click-Through Rate (CTR):** Target **>5%**.
- [ ] **A/B Testing Framework Active:** Soft prompt copy, icon styles, trigger delays, and placement positions tested in structured experiments.
