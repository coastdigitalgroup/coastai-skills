# Web Push Notification Opt-In Audit & Optimization Checklist

Use this actionable checklist to audit, optimize, and validate web push notification permission requests, two-step soft-prompts, behavioral triggers, and native browser permission health across e-commerce, media, SaaS, and marketplace web applications.

---

## Phase 1: Native Permission Health & Anti-Pattern Diagnostic

### 1.1 Page-Load Execution Diagnostic
- [ ] **Zero Immediate Prompts:** Open a clean incognito window for Chrome, Safari, and Firefox. Navigate to the homepage and key landing pages. Confirm that NO native browser permission dialog (`Notification.requestPermission()`) appears on initial page load.
- [ ] **Audit Script Triggers:** Inspect global JavaScript files and analytics tags (`GTM`, third-party push SDKs like OneSignal, PushOwl, CleverTap, Webpushr). Verify that auto-prompt features on page load/timer are explicitly disabled (`autoRegister: false`).
- [ ] **Check Browser Block Standing:**
  - Execute `Notification.permission` in the browser dev console across key entry pages.
  - Review analytics for the percentage of sessions in `'denied'` vs `'default'` vs `'granted'` status.
  - Target: **<10% total sessions in `'denied'` state**.
- [ ] **Verify Chrome Quieter Messaging Status:** Check if Google Chrome displays a warning or quiet bell icon in the address bar indicating that the domain has been penalized for high block rates.

### 1.2 Value Proposition & Copy Framing Audit
- [ ] **Clear Notification Contents:** Does the permission prompt state *exactly* what information will be delivered? (e.g., "Order shipping updates", "Flash sale alerts", "Breaking tech news").
- [ ] **Explicit Cadence & Frequency Capping:** Does the prompt inform the user how often notifications will be sent? (e.g., "Max 1-2 alerts per week").
- [ ] **Unsubscribe Assurance:** Is there explicit microcopy confirming 1-click unsubscribe capability? (e.g., "Unsubscribe anytime in 1 click").

---

## Phase 2: Two-Step Soft-Prompt (Pre-Prompt) UI Architecture

### 2.1 Soft-Prompt UX & Component Design
- [ ] **Branded Visual Hierarchy:** Is the soft-prompt designed using the site’s native design system (typography, colors, primary/secondary buttons) rather than browser-alert aesthetics?
- [ ] **Mobile Touch Ergonomics:**
  - Desktop: Positioned as a floating slide-in banner (bottom-right or top-right) or centered modal.
  - Mobile (<768px): Positioned as a bottom drawer sheet accessible to thumb interaction without obscuring core page content.
- [ ] **Primary Action CTA:** Uses benefit-driven action verbs (e.g., "Enable Shipping Alerts", "Get Price Drop Alerts", "Subscribe to Updates") rather than generic "Allow" or "OK".
- [ ] **Secondary Dismissal CTA:** Uses low-friction dismissive language (e.g., "Maybe Later", "Not Now", "Skip") that closes the modal without calling native browser permissions.

### 2.2 Granular Topic & Preference Controls
- [ ] **Category Toggles:** Includes selectable checkboxes/switches for multi-topic sites:
  - `[x]` Transactional / Order Updates (Pre-selected)
  - `[ ]` Price Drops & Back-In-Stock
  - `[ ]` Weekly Promotional Deals
- [ ] **Preference Storage:** Saves selected topic preferences in `localStorage` or user profile state to map push subscriber tags in the notification backend.

---

## Phase 3: Behavioral Trigger & Intent Timing Matrix

Verify that soft-prompts are triggered ONLY when specific intent thresholds are reached:

| User Touchpoint | Trigger Condition | Required Soft-Prompt Copy |
| :--- | :--- | :--- |
| **Order Confirmation** | Page load of `/checkout/success` or `/orders/*` | *"Receive real-time delivery tracking alerts for Order #1234."* |
| **Out-of-Stock Item** | User clicks *"Notify Me When Available"* on PDP | *"Get instant push alerts the moment this item is back in stock."* |
| **Wishlist / Favorites** | User clicks heart / add to favorites icon | *"Get notified instantly if favorited items drop in price."* |
| **Article Reading** | Scroll depth >= 60% AND time on page >= 45 seconds | *"Get notified when new articles in [Category] are published."* |
| **SaaS Dashboard** | User receives first in-app comment / mention | *"Enable browser notifications for @mentions and team updates."* |

---

## Phase 4: Cooldown Rules & Permission Recovery Workflows

### 4.1 Re-Prompting Cooldown Rules
- [ ] **14-Day Soft Dismissal Cooldown:** When a user clicks "Maybe Later", set a `push_prompt_dismissed` cookie/localStorage item with an expiration of at least **14 days**.
- [ ] **Maximum Impression Cap:** Cap total soft-prompt impressions to **maximum 3 times per user** across all sessions before moving to passive trigger states.
- [ ] **Passive Widget Fallback:** After 3 soft dismissals, present a persistent, non-modal bell icon in the website footer or user account settings page.

### 4.2 Native Block (`'denied'`) Recovery Experience
- [ ] **Denied State Detection:** Verify JavaScript logic checks `Notification.permission === 'denied'` before opening soft-prompts.
- [ ] **Contextual Unblock Tooltip:** When a user with `'denied'` status clicks an explicit notification CTA (e.g., "Notify Me When Back in Stock"), display an interactive unblock guide:
  - **Chrome/Edge:** Show visual arrow pointing to the browser lock icon 🔒 with text: *"Click 🔒 in address bar -> Change Notifications to 'Allow' -> Refresh Page."*
  - **Safari (Desktop):** Guide user to *Safari -> Settings for This Website -> Notifications -> Allow*.
  - **iOS Safari:** If not in standalone PWA mode, display step-by-step PWA install instructions (*Share -> Add to Home Screen*) required for Web Push on iOS 16.4+.

---

## Phase 5: Technical Implementation & Validation

### 5.1 Service Worker & HTTPS Setup
- [ ] **HTTPS Enforcement:** Verify site is served strictly over `https://` with valid SSL certificates.
- [ ] **Service Worker File Location:** Verify `sw.js` (or custom service worker) is accessible from the root scope (`/sw.js`) and responds with HTTP status `200 OK`.
- [ ] **VAPID Key Verification:** Confirm public VAPID application server key is properly initialized in the push subscription call:
  ```javascript
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });
  ```

### 5.2 Verification Metrics & KPIs
- [ ] **Soft-Prompt Acceptance Rate:** Target **>50%**.
- [ ] **Native Permission Acceptance Rate:** Target **>85%** (of soft-prompt accepts).
- [ ] **Browser Block Rate (`denied` state):** Target **<10%**.
- [ ] **Push Campaign CTR:** Target **>5%**.
