# Web Push Notification Opt-In Audit Checklist & Implementation Specification

Use this comprehensive checklist and specification template to audit, design, and deploy high-converting web push opt-in flows that eliminate browser blocks and build a highly engaged subscriber list.

---

## Part 1: Current State Audit Checklist

### 1. Trigger Mechanics & Timing
- [ ] **Native Prompt Execution:** Is `Notification.requestPermission()` called immediately on page load (`DOMContentLoaded` / `window.onload`)?
  *(If YES: Priority 1 Fix. Change to two-step soft-prompt flow immediately.)*
- [ ] **Delay Threshold:** Is the permission prompt triggered within <10 seconds of initial landing?
- [ ] **Interaction Prerequisite:** Does the prompt require a user click (e.g., clicking a button, bell icon, or wishlist item) prior to firing?
- [ ] **Mobile Touch Safety:** On mobile devices, is the native prompt triggered by a clear tap event to meet browser user gesture requirements?

### 2. Value Proposition & Messaging Clarity
- [ ] **Explicit Benefits:** Does the prompt copy clearly state *what* the user will receive (e.g., "Get price drop alerts" vs "Receive notifications")?
- [ ] **Frequency Expectation:** Is notification frequency explicitly stated (e.g., "1-2 updates per week")?
- [ ] **No-Spam Reassurance:** Does the prompt include an explicit privacy reassurance (e.g., "No spam. Unsubscribe anytime in 1 click")?
- [ ] **Brand Alignment:** Does the soft prompt match the website's design system, typography, primary colors, and brand tone?

### 3. User Control & Granularity
- [ ] **Explicit Secondary Action:** Is there a prominent "Not Now" or "Maybe Later" button equal in size/accessibility to the primary CTA?
- [ ] **Category Preferences:** Can users check/uncheck specific notification topics (e.g., Order Updates, Price Drops, Weekly Digest)?
- [ ] **Dismissal Cooldown:** Is a suppression cookie/localStorage key set when a user clicks "Not Now" (recommended: 14 to 30 days)?
- [ ] **Preference Center Access:** Can users access notification settings in their account/footer after opting in?

### 4. Technical Infrastructure & Permission States
- [ ] **HTTPS Protocol Verification:** Is the application served strictly over HTTPS with valid SSL certificates?
- [ ] **Service Worker File:** Is `sw.js` registered correctly in the root directory with scope covering the full domain?
- [ ] **Blocked State Detection:** Does the application check `Notification.permission === 'denied'` before showing push triggers?
- [ ] **Unblock Instructions:** Is an in-app unblock banner/modal available for users who previously blocked notifications?

---

## Part 2: Two-Step Soft-Prompt Specifications

### UI Layout & Placement Rules

| Device | Soft-Prompt Type | Recommended Placement | Animation / Transition |
| :--- | :--- | :--- | :--- |
| **Desktop** | Slide-In Card / Top Drawer | Top-right corner or center-bottom sticky card | Slide-down or Fade-in (300ms) |
| **Mobile** | Bottom Sheet Modal | Fixed bottom drawer (`bottom: 0`, full width) | Slide-up from bottom (350ms) |
| **In-App (SaaS)** | Bell Popover / Banner | Header bell icon dropdown or top alert bar | Expand from icon |

### Component Architecture & Sample HTML Structure

```html
<!-- Web Push Soft Prompt Component -->
<div id="push-soft-prompt" class="push-drawer-container hidden" role="dialog" aria-labelledby="push-title" aria-describedby="push-desc">
  <div class="push-drawer-content">
    <div class="push-drawer-header">
      <span class="push-icon" aria-hidden="true">🔔</span>
      <h3 id="push-title" class="push-heading">Enable Price Drop & Order Alerts</h3>
      <button id="push-close-btn" class="push-close" aria-label="Close modal">&times;</button>
    </div>

    <p id="push-desc" class="push-body">
      Get instant browser alerts when items in your cart go on sale or restock. No spam, max 2 alerts per week.
    </p>

    <!-- Category Preferences -->
    <fieldset class="push-preferences">
      <legend class="sr-only">Select Notification Topics</legend>
      <label class="push-checkbox-label">
        <input type="checkbox" name="push-topic" value="price_drops" checked>
        Price Drop & Restock Alerts
      </label>
      <label class="push-checkbox-label">
        <input type="checkbox" name="push-topic" value="order_status" checked>
        Order & Delivery Tracking
      </label>
    </fieldset>

    <!-- Action Buttons -->
    <div class="push-actions">
      <button id="push-deny-btn" class="btn btn-secondary">Maybe Later</button>
      <button id="push-allow-btn" class="btn btn-primary">Enable Notifications</button>
    </div>
  </div>
</div>
```

---

## Part 3: Event Trigger Rules Matrix

| Trigger Name | Event / Condition | Delay / Threshold | Target Audience | Soft Prompt Action |
| :--- | :--- | :--- | :--- | :--- |
| **Wishlist / Price Alert** | User clicks "Alert Me On Price Drop" or "Notify Me" | Immediate (0s post-click) | All visitors | Show Soft Prompt customized to product |
| **Order Confirmation** | Order completion page loaded (`/checkout/success`) | 3s post-load | Purchasing Customers | Show Soft Prompt focused on Order Delivery tracking |
| **Content Engagement** | Reading article/guide | >60s on page + >75% scroll depth | Returning Visitors | Show Soft Prompt focused on New Topic Releases |
| **High Intent Session** | PDP Views >= 3 in single session | 15s after 3rd PDP load | Unsubscribed Visitors | Show Soft Prompt with discount/sale focus |

---

## Part 4: Blocked Permission Recovery Guide Specification

When `Notification.permission === 'denied'`, native browser dialogs will not open. Use this UI guidance component when a user clicks a notification feature while blocked:

```html
<!-- Blocked Permission Recovery Help Modal -->
<div id="push-unblock-modal" class="unblock-guide-container hidden">
  <div class="unblock-guide-card">
    <h4>Notifications Are Blocked in Your Browser</h4>
    <p>To receive instant price drop alerts, please enable permissions in your browser bar:</p>

    <ol class="unblock-steps">
      <li>Click the <strong>Lock / Settings icon</strong> 🔒 on the left side of your browser address bar.</li>
      <li>Find <strong>Notifications</strong> in the dropdown menu.</li>
      <li>Change the setting from <strong>Block</strong> to <strong>Allow</strong>.</li>
      <li>Refresh this page.</li>
    </ol>

    <button id="unblock-dismiss-btn" class="btn btn-outline">Got It</button>
  </div>
</div>
```

---

## Part 5: Success KPI Scorecard

| Metric | Target Goal | Red Flag / Problem Area |
| :--- | :--- | :--- |
| **Soft-Prompt Opt-In Rate** | >35% | <15% (Fix value proposition / copy) |
| **Native Permission Conversion** | >85% | <60% (Check trigger gesture timing) |
| **Browser Permission Block Rate** | <10% | >25% (Remove unprompted page-load calls) |
| **Notification Click-Through Rate** | 4.0% - 8.0% | <1.5% (Improve segmentation & timing) |
| **Unsubscribe Rate per Send** | <0.3% | >1.0% (Reduce frequency or check relevancy) |
