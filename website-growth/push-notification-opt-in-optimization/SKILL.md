---
name: push-notification-opt-in-optimization
description:
  Audit and optimize two-step soft-prompt web push permission requests, contextual value propositions, trigger timing, topic segmentation, and re-engagement opt-in flows to maximize subscriber capture rates without triggering native browser permission blocks.
---

# Push Notification Opt-In Optimization

## Purpose

The Push Notification Opt-In Optimization skill provides a systematic framework for auditing, timing, segmenting, framing, and implementing two-step soft-prompt web push permission requests across e-commerce, media, SaaS, and marketplace websites.

Web push notifications offer a direct, high-engagement re-engagement channel that bypasses noisy email inboxes and algorithmically restricted social feeds. However, most websites destroy this channel by firing immediate, contextless native browser permission prompts (`Notification.requestPermission()`) upon initial page load.

Triggering native prompts prematurely produces critical conversion and engagement failures:
1. **Permanent Browser Hard Blocks:** When a user clicks "Block" or "Don't Allow" on a native browser prompt, the decision is permanently cached in the browser. Future programmatic permission prompts are silently suppressed, locking the site out of re-engaging that user indefinitely.
2. **Zero Value Context:** Asking visitors for notification permissions before they have consumed content, added an item to a cart, or experienced core value leads to immediate rejection (>85% block/dismissal rates).
3. **Notification Fatigue & Bounce Rates:** Intrusive permission modals immediately upon arrival degrade user trust, increasing bounce rates and interrupting critical purchase or signup funnels.

By implementing value-driven soft-prompts (pre-prompts), behavioral trigger rules, granular preference centers, and contextual re-engagement flows, this skill converts anonymous site traffic into high-value push subscribers while protecting browser permission standing.

---

## Use Cases

- **E-Commerce Order & Back-in-Stock Alerts:** Opting users into real-time order tracking updates, back-in-stock alerts, price drop notifications, and flash sale alerts.
- **Content & Media Publishing Subscriptions:** Inviting readers to subscribe to breaking news alerts, specific author updates, or daily digest roundups after reading an article.
- **SaaS & Web Application Activity Alerts:** Prompting active application users for browser notifications regarding team mentions, task approvals, system alerts, or workflow completions.
- **Marketplace & B2B Bid/Quote Updates:** Capturing buyer and seller opt-ins for immediate quote responses, new message alerts, and auction outbid warnings.
- **Recovering Blocked/Dismissed Audiences:** Designing soft re-engagement banners for returning users who previously dismissed soft-prompts or whose native permissions are blocked.

---

## When NOT to Use

- **Mobile Native Apps (iOS / Android Native):** For native mobile applications using APNs (Apple Push Notification service) or FCM (Firebase Cloud Messaging) mobile SDKs, use mobile-specific app onboarding skills.
- **Transactional Email / SMS Capture:** For collecting email addresses or phone numbers for marketing channels, use `lead-capture-form-optimization` or `welcome-popup-optimization`.
- **In-App Toast/Banner Notifications:** For displaying non-intrusive status updates to users currently active on the site, use `toast-and-snackbar-system`.
- **Cookie & Privacy Consents:** For managing GDPR/CCPA cookie banner consents, use `cookie-consent-optimization`.

---

## Inputs

1. **Push & Web Analytics Data:**
   - Soft-Prompt Impression Rate (% of unique sessions shown a soft permission prompt).
   - Soft-Prompt Acceptance Rate (% of users clicking "Allow" on the soft-prompt).
   - Native Prompt Acceptance Rate (% of users clicking "Allow" on the native browser prompt).
   - Net Subscriber Capture Rate (`[Native Opt-Ins / Total Sessions] * 100`).
   - Browser Block Rate (% of sessions where native permission is set to `'denied'`).
   - Notification Click-Through Rate (CTR) and Conversion Rate from push campaigns.
2. **Current Opt-In Code & Modal Assets:**
   - Code snippets showing how and when `Notification.requestPermission()` is currently invoked.
   - Design assets and UI copy of current popups, banners, or slide-ins requesting notification access.
3. **Audience Intent & Entry Pages:**
   - Key landing page types (e.g., Blog Post, Product Detail Page, Order Confirmation, User Dashboard).
   - Session depth metrics (e.g., scroll depth, time on page, pages per session).

---

## Outputs

1. **Push Opt-In Audit & Diagnostic Report:** Quantification of current permission drop-offs, native block rates, timing friction, and value proposition gaps.
2. **Two-Step Soft-Prompt UI & Architecture Specs:** Wireframes and UX specifications for custom, brand-aligned pre-prompt modals, slide-ins, and contextual bell widgets.
3. **Behavioral Trigger & Delay Rule Ruleset:** Exact conditions (scroll depth, time delay, high-intent action events) required before surfacing a soft-prompt.
4. **Preference & Topic Center Spec:** UI layout allowing users to select granular notification topics (e.g., "Order Updates Only" vs. "Promotions & Discounts").
5. **Native Permission Recovery Workflow:** UX guide for detecting `'denied'` permission states and guiding interested users through unblocking notifications in Chrome, Safari, and Firefox.

---

## Workflow

### 1. Audit Permission Health & Prompt Timing

Conduct a full diagnostic of the website's push opt-in architecture across browsers (Chrome, Safari, Firefox, Edge) and devices (Desktop, Mobile Web):
- **Inspect Initial Page Load Behavior:** Open a fresh incognito window and land on the homepage and top landing pages.
  - *Does a native browser permission dialog pop up immediately on page load?*
  - *If yes, calculate the native block risk.* Note: Modern browsers (Chrome 80+, Firefox 72+) automatically quieten or block automatic native prompts on page load.
- **Check Permission State Programmatically:** Evaluate current browser permission status:
  ```javascript
  console.log(Notification.permission); // 'default', 'granted', or 'denied'
  ```
- **Audit Trigger Conditions:** Determine whether soft-prompts are tied to meaningful user intent (e.g., clicking "Track Order", "Notify Me When Back in Stock", or reaching 70% scroll depth on an article) or arbitrary timers (e.g., 3-second delay).
- **Evaluate Soft-Prompt Copy:** Assess whether the prompt explains *what* notifications will contain, *how frequently* they will arrive, and *why* they benefit the user.

### 2. Implement the Two-Step Soft-Prompt Pattern

Never call `Notification.requestPermission()` directly without a user-initiated interaction on a branded soft-prompt:
- **Design the Custom Soft-Prompt UI:** Build an accessible, branded UI component (slide-in modal, subtle banner, or inline action) that mimics native UI quality without using browser alert styles.
- **Incorporate Clear Value Propositions:**
  - *Weak:* "Example.com would like to send you notifications. [Allow] [Block]"
  - *Strong:* "Get instant price drop alerts for items in your wishlist. We send max 2 alerts per week. [Enable Alerts] [Not Now]"
- **Dual Action Button Hierarchy:**
  - **Primary CTA:** Explicit benefit statement, e.g., "Enable Flash Sale Alerts" or "Notify Me". On click, trigger `Notification.requestPermission()`.
  - **Secondary CTA:** Low-friction dismissal, e.g., "Maybe Later" or "Not Now". On click, hide the soft-prompt and set a re-prompt cooldown timer (e.g., 7 to 14 days) without triggering the native browser prompt.

### 3. Establish High-Intent Behavioral Triggers

Replace blanket page-load triggers with high-intent behavioral gates:
- **E-Commerce Trigger Rules:**
  - *Post-Purchase:* Present "Enable Real-Time Delivery Tracking Notifications" on the Order Confirmation page.
  - *Back-In-Stock / Pre-Order:* Trigger opt-in modal directly when a user clicks "Notify Me When Available" on an out-of-stock SKU.
  - *Wishlist / Price Drop:* Present "Get Price Drop Alerts" when a user adds an item to their favorites/wishlist.
- **Content & Media Trigger Rules:**
  - *Article Completion:* Trigger a subtle bottom-right slide-in after a reader reaches 60%+ scroll depth AND spends >45 seconds on an article.
  - *Category Subscription:* Present "Subscribe to Breaking Tech News" when reading 2+ articles in a single category.
- **SaaS & Web App Trigger Rules:**
  - *First Task Assignment / Mention:* Surface a banner after a user receives their first team comment or task assignment inside the web application.

### 4. Provide Topic & Category Preference Controls

Prevent notification fatigue and unsubscribes by giving users granular control over notification channels:
- **Multi-Topic Opt-In Selectors:** Inside the soft-prompt or user settings center, display toggleable categories:
  - `[x]` Order & Shipping Status (High Intent)
  - `[ ]` Weekly Exclusive Offers (Promotional)
  - `[ ]` New Product Drops (Product)
- **Frequency Capping Transparency:** State maximum notification limits directly in the UI (e.g., "Maximum 1 message per week. Unsubscribe anytime in 1 click.").

### 5. Build Native Block Recovery Guidance

When `Notification.permission === 'denied'`, standard prompt triggers fail silently. Implement a recovery path for users who want to re-enable notifications:
- **Detect Denied State:** Identify users who attempt to perform a notification action (e.g., clicking "Notify Me") while native permissions are blocked.
- **Render Contextual Tooltip / Modal Guide:** Display browser-specific step-by-step visual instructions:
  - *Chrome/Edge:* "Click the Lock icon 🔒 next to the URL in your browser bar -> Toggle 'Notifications' to 'Allow' -> Refresh page."
  - *Safari:* "Open Safari Preferences -> Websites -> Notifications -> Change Example.com to 'Allow'."
- **Provide Direct Re-Test Button:** Include a "I've Updated My Settings" button that re-checks `Notification.permission` and updates the UI state immediately.

---

## Decision Rules

### Rule 1: Soft-Prompt Requirement
- **NEVER** call `Notification.requestPermission()` directly on page load or without prior user interaction on a soft-prompt.
- **ALWAYS** route permission requests through a custom soft-prompt or explicit button click.

### Rule 2: Re-Prompting Frequency & Cooldowns
- If a user clicks "Not Now" / "Maybe Later" on a soft-prompt:
  - Set a cooldown cookie/localStorage flag suppressing the soft-prompt for **at least 14 days**.
  - Limit total soft-prompt impressions to **maximum 3 times per user** unless explicitly triggered by an action (e.g., clicking a bell icon or stock alert button).

### Rule 3: Native Block Prevention
- If the user has dismissed the soft-prompt twice without accepting, move them to a passive trigger state (e.g., persistent floating bell widget in the footer or account settings toggle) rather than surfacing modal popups.

### Rule 4: Mobile Web Optimization
- On mobile viewports (<768px), use bottom slide-up sheets (drawer pattern) instead of center overlay modals to align with thumb ergonomics and prevent content obscuration.

---

## Constraints

- **HTTPS Protocol Required:** Web Push API and Service Workers strictly require HTTPS connections (or `localhost` during development).
- **Service Worker Dependency:** Push notifications require an active, registered Service Worker (`sw.js`). Ensure Service Worker registration precedes permission requests.
- **Browser Compatibility Differences:** Safari on iOS (iOS 16.4+) requires the web application to be added to the user's Home Screen (PWA) before push notifications can be requested. Design explicit PWA installation banners prior to push prompts on iOS Safari.

---

## Non-Goals

- Writing backend push payload dispatch scripts (e.g., Web Push protocol, VAPID key generation, or Node.js `web-push` library code).
- Building email or SMS marketing automation campaigns.
- Designing native iOS / Android app push notification payloads.

---

## Common Failure Patterns

- **The Immediate Page-Load Popup:** Fire-and-forget `Notification.requestPermission()` on index page load, resulting in 90%+ block rates and browser quiet permission UI flags.
- **Vague "Don't Miss Out" Copy:** Generic headlines like "Stay Updated!" that fail to explain what specific value, frequency, or content the user will receive.
- **Dead-End Denied State:** Failing to detect when `Notification.permission === 'denied'`, leaving users who click "Notify Me" confused when nothing happens.
- **Aggressive Re-Prompting:** Showing a soft-prompt on every single page view immediately after the user clicked "Not Now," driving users to permanently block notifications via browser settings.
- **Ignoring Mobile PWA Constraints:** Triggering push permission prompts on iOS Safari web browsers without checking for standalone PWA mode, leading to silent API failures on iOS.

---

## Validation Criteria

- [ ] **Native Opt-In Rate Lift:** Measure `(Native Opt-Ins / Soft-Prompt Impressions) * 100`. Target: **>45% acceptance rate on soft-prompts**.
- [ ] **Net Subscriber Capture Rate:** Percentage of unique sessions converted into active push subscribers. Target: **+200% to +400% relative lift** over immediate native prompt baselines.
- [ ] **Browser Block Rate Reduction:** Percentage of total users with native permission set to `'denied'`. Target: **<10% total denied rate** (down from typical 50%+ baselines).
- [ ] **Push Campaign CTR & Conversion:** Click-through rate and revenue conversion from push notification broadcasts. Target: **>5% average CTR** due to higher subscriber quality and intent.
- [ ] **Bounce Rate Reduction:** Monitor entry page bounce rates after removing immediate page-load native prompts. Target: **5% to 12% drop in bounce rate**.
