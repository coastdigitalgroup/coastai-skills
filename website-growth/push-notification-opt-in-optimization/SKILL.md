---
name: push-notification-opt-in-optimization
description:
  Audit, time, segment, frame, and implement two-step soft-prompt web push permission requests to maximize subscriber opt-in rates and re-engagement without triggering irreversible native browser permission blocks.
---

# Push Notification Opt-In Optimization

## Purpose

The Push Notification Opt-In Optimization skill provides a systematic framework for auditing, timing, segmenting, framing, and implementing web push notification permission requests across e-commerce, media, SaaS, and marketplace web applications.

Web push notifications represent one of the highest-ROI, lowest-cost direct engagement channels available to website operators, driving repeat visits, cart recovery, price drop alerts, order tracking updates, and breaking feature notifications. However, web push adoption is heavily undermined by poor implementation:
1. **Immediate Page-Load Hard Prompts:** Bombarding first-time site visitors with the browser's native permission modal immediately upon landing, before establishing any brand trust or value proposition.
2. **High Native Block Rates:** Once a user clicks "Block" on a browser's native permission dialog, the browser permanently suppresses future permission requests from that domain. The site cannot trigger native prompts again without requiring the user to manually dive into deep browser settings.
3. **Vague & Self-Serving Value Framing:** Asking users to "Enable notifications" without explaining what specific alerts they will receive, how frequently, or how it benefits them.
4. **Context Collapse:** Triggering opt-in requests at moments of high task friction or unrelated user workflows (e.g., during active form entry or checkout payment input).

By implementing soft-prompt pre-permission dialogs, event-triggered contextual prompts, clear value proposition framing, granular preference controls, and browser permission recovery flows, this skill maximizes subscriber conversion while protecting the website's long-term reachable audience.

---

## Use Cases

- **E-Commerce Order & Shipping Status Updates:** Prompting buyers post-checkout to enable real-time delivery and courier tracking alerts.
- **Back-in-Stock & Price Drop Subscriptions:** Prompting shoppers on out-of-stock PDPs or wishlist items to receive instant alert notifications when prices drop or items restock.
- **SaaS & Web App Workflow Alerts:** Prompting active logged-in users to receive real-time notifications for team comments, mention alerts, document updates, or task approvals.
- **Media, Publishing & Breaking News:** Prompting engaged readers who complete 2+ articles to subscribe to personalized topic digests or breaking news alerts.
- **Marketplace & Live Auction Alerts:** Prompting buyers and sellers for outbid warnings, deal expirations, or message alerts.

---

## When NOT to Use

- **Native Mobile Apps:** For iOS and Android native apps, use native app permission SDKs and mobile OS notification framework guidelines.
- **Transactional Email / SMS Capture:** For collecting email addresses or phone numbers during lead capture or checkout, use `lead-capture-form-optimization` or `checkout-flow-optimization`.
- **In-App Toast & Banner Notifications:** For rendering UI alerts inside the active browser window while the user is currently on the site, use `notification-center-system` or `accessible-toast-implementation`.
- **Desktop System Tray Extensions:** For standalone desktop desktop apps (Electron/PWA installed apps).

---

## Inputs

1. **Push Opt-In Analytics & Telemetry:**
   - Current Web Push Opt-In Rate (`[Opt-In Subscribers / Total Promoted Visitors] * 100`).
   - Browser Native Block Rate (`[Blocked Native Prompts / Total Native Prompts Shown] * 100`).
   - Soft-Prompt Conversion Rate (`[Accepted Soft Prompts / Total Soft Prompts Shown] * 100`).
   - Push Click-Through Rate (CTR) and Unsubscribe / Dismissal Rates.
2. **Traffic & Audience Distribution:**
   - Desktop vs. Mobile web traffic distribution (Safari iOS, Chrome Android, Chrome Desktop, Firefox, Edge).
   - Known vs. Anonymous user percentage.
3. **Current Site Journeys & High-Intent Moments:**
   - Key micro-conversion points (e.g., placing an order, adding to wishlist, saving a search, completing an article, setting an alert).
4. **Push Provider Infrastructure:**
   - Push service provider / Service Worker setup (e.g., OneSignal, WonderPush, PushOwl, custom Web Push API / VAPID implementation).

---

## Outputs

1. **Push Opt-In UX Audit & Friction Diagnostic:** Identification of premature hard prompts, high block rates, untargeted triggers, and missing soft-prompt pre-screens.
2. **Two-Step Soft-Prompt UI & Copy Specifications:** Customizable, brand-aligned pre-permission modal / slide-in banner specs with explicit value propositions and preference toggles.
3. **High-Intent Trigger Rules Matrix:** Event-based firing criteria determining exact timing, user behavior thresholds, and delay logic before presenting soft prompts.
4. **Permission Recovery & Settings Portal Design:** UI workflow for guiding previously blocked or dismissed users through unblocking browser permissions or managing notification categories.
5. **A/B Testing & Measurable Validation Protocol:** Structured test plan tracking Opt-In Rate, Block Rate, Push CTR, and Subscriber LTV.

---

## Workflow

### 1. Audit Current Push Opt-In Mechanics & Block Rates

Analyze how web push requests are currently presented across desktop and mobile browsers:
- **Inspect Initial Landing Behavior:** Visit the homepage, PDPs, and blog posts in an Incognito / Clean Profile browser window.
  - *Does a native browser permission modal pop up automatically within 0–5 seconds?*
  - *Does a hard prompt appear before the user interacts with any content or performs an action?*
- **Check Native Block Rate:** Review analytics to see what percentage of users select "Block".
  - *Red Flag:* A native block rate exceeding **20%** indicates severe permission fatigue and irreversible audience destruction.
- **Evaluate Value Proposition Clarity:** Read the opt-in copy.
  - *Does it say "www.example.com wants to Show Notifications"? Or does it clearly detail the value (e.g., "Get instant tracking alerts for your shipment")?*
- **Audit Soft-Prompt Usage:** Is there an intermediate custom modal or banner before triggering `Notification.requestPermission()`?

### 2. Design Brand-Aligned Two-Step Soft Prompts

Implement a custom, non-blocking soft prompt (pre-permission dialog) as a proxy before invoking native browser permission modals:
- **Choose the Right Soft-Prompt Variant:**
  - *Contextual Slide-In / Toast Banner:* Best for desktop browsing, e-commerce PDPs, and blog posts (top or bottom corner, non-modal).
  - *Centered Value Card Modal:* Best for mobile web and high-intent app workflows (e.g., post-checkout or account creation).
  - *Inline Preference Widget:* Integrated directly into account settings, wishlist buttons, or order success pages.
- **Craft Explicit Value Copy:**
  - *Headline:* Clear, benefit-focused header (e.g., "Never Miss a Shipping Update").
  - *Body Copy:* 1–2 concise sentences explaining exact content, frequency, and control (e.g., "Get real-time delivery notifications for your orders. No spam, disable anytime.").
  - *Category Toggles (Optional):* Allow users to select preferred alerts (e.g., [x] Order Updates, [ ] Price Drops, [ ] Weekly Deals).
- **Dual Action CTAs:**
  - *Primary CTA (Accept):* Benefit-driven label ("Enable Order Alerts" or "Notify Me"). Triggers native `Notification.requestPermission()`.
  - *Secondary CTA (Dismiss):* Low-friction escape label ("Not Now" or "Maybe Later"). Closes soft prompt and sets a snooze cookie (e.g., 7–14 days) *without* triggering native browser prompts or incurring a permanent native block.

### 3. Establish High-Intent Trigger Rules & Behavioral Segmentation

Never prompt cold visitors upon landing. Tie opt-in requests to proven user engagement and intent milestones:
- **E-Commerce High-Intent Triggers:**
  - *Post-Checkout Order Confirmation:* Prompt on the order thank-you page ("Receive instant delivery tracking alerts on this device").
  - *Back-In-Stock / Price Drop Button:* When a user clicks "Notify Me When Restocked" or "Track Price Drop", trigger the soft prompt immediately as a direct response to user request.
  - *Wishlist / Saved Items:* Prompt when a user saves 2+ items to their wishlist.
- **Content & Media Triggers:**
  - *Depth of Engagement:* Trigger after a visitor reads 2+ articles or scrolls >75% on a second article during a session.
  - *Topic Alignment:* Customize prompt copy based on the active content category (e.g., "Get Tech News Alerts" vs. "Get Finance Alerts").
- **SaaS & Web App Triggers:**
  - *Active Collaboration:* Prompt when a user sends their first comment, assigns a task, or sets up a project.
  - *In-App Activity:* Prompt during onboarding step 3 or after 3 minutes of active app usage.
- **Session & Recency Filters:**
  - Enforce a minimum threshold: At least **2 page views** OR **45 seconds of active page time** before showing any general soft prompt.

### 4. Implement Permission Recovery & Re-Engagement Flows

Recover visitors who previously dismissed soft prompts or blocked native permissions:
- **Soft-Prompt Dismissal Snooze Mechanics:**
  - When a user clicks "Not Now" on a soft prompt, set a local storage flag (`push_prompt_snoozed_until`).
  - Do not re-prompt for at least **14 days** (or 30 days for low-engagement visitors).
  - On return visits after the snooze expires, present the soft prompt only if the user shows fresh high-intent behavior.
- **Native Blocked Permission Recovery UI:**
  - If `Notification.permission === 'denied'`, native prompts cannot be programmatically opened.
  - When a user attempts an action that requires notifications (e.g., clicking "Enable Delivery Tracking"), display a helpful recovery guide modal:
    1. Visual screenshot showing browser address bar icon (lock/tune icon).
    2. 2-step instructions: "1. Click the lock icon next to the URL. 2. Toggle Notifications to 'Allow'."
    3. Include a "Re-check Permission" button that refreshes status when updated.
- **In-Page Notification Bell / Floating Launcher:**
  - Provide a persistent, low-profile widget (e.g., bottom-left bell icon or account preferences tab) where users can opt in or manage notification categories at any time on their own terms.

---

## Decision Rules

### Rule 1: Two-Step Soft Prompt Mandatory
- NEVER trigger `Notification.requestPermission()` directly on page load or without prior user interaction.
- ALWAYS route permission requests through a custom HTML/CSS soft prompt first. Only invoke the native browser permission dialog if the user clicks "Allow / Enable" on the soft prompt.

### Rule 2: Snooze vs. Native Block Protection
- If a user dismisses the soft prompt ("Not Now"), suppress the soft prompt for 14–30 days.
- Never force a user into a native browser prompt if they have shown hesitation on the soft prompt, as a native "Block" is permanent and unrecoverable programmatically.

### Rule 3: Contextual Intent Alignment
- **Explicit User Action (Highest Priority):** If a user clicks a button like "Track Order" or "Notify When Restocked", display the soft prompt immediately with 0 delay.
- **Implicit Behavioral Rules (Secondary Priority):** For general site prompts, require at least **2 page views** AND **45 seconds on page**.

### Rule 4: Mobile Web Adaptation
- On mobile web browsers (Chrome Android, Safari iOS 16.4+ PWAs), render soft prompts as bottom-anchored slide-up sheets that match touch-friendly mobile design patterns.

---

## Constraints

- **Browser & OS Compatibility:** Web push requires HTTPS and service worker support. iOS Safari requires iOS 16.4+ and user addition to Home Screen (PWA) for full web push support, or explicit user gesture triggers.
- **Privacy & GDPR Compliance:** Opt-in must be explicit, voluntary, and easily revocable. Soft prompts must clearly disclose what data/topics will be sent.
- **No Deceptive Tricks:** Do not use misleading close buttons, fake system alert icons, or aggressive full-screen overlays that prevent users from reading site content.

---

## Non-Goals

- Setting up server-side VAPID key generation, FCM/APNS payload encryption, or Service Worker JavaScript coding.
- Writing copy for automated push marketing campaigns, drip series, or email marketing newsletters.
- Designing native iOS / Android Swift or Kotlin push notification code.

---

## Common Failure Patterns

- **The Immediate Page-Load Hard Prompt:** Triggering Chrome's native "wants to show notifications" popup 0.5 seconds after a user lands on the site. Result: 85%+ block rate, destroying future reach.
- **Vague / Empty Value Framing:** Prompting with "Enable notifications to stay updated" without specifying what updates will be sent or why the user should care.
- **Lack of Dismissal Snooze:** Re-displaying the soft prompt on every single page turn after a user clicks "Not Now", causing extreme UX frustration and site abandonment.
- **Ignoring Native Block Status:** Failing to detect `Notification.permission === 'denied'` and continuously attempting to call `requestPermission()`, which silently fails and confuses users.
- **Over-Frequency Post-Opt-In:** Sending 5+ generic promotional push messages per day after opt-in, leading to rapid subscriber opt-outs and service worker unregistrations.

---

## Validation Criteria

- [ ] **Push Opt-In Conversion Rate:** Measure `(New Push Subscribers / Total Target Visitors) * 100`. Target: **3x to 5x increase** compared to baseline hard prompts.
- [ ] **Native Block Rate Reduction:** Track percentage of native prompts resulting in "Block". Target: **<5% native block rate**.
- [ ] **Soft-Prompt Acceptance Rate:** Percentage of users who click "Enable" on the custom soft prompt. Target: **>35% for contextual prompts**.
- [ ] **Push Campaign CTR:** Measure click-through rate on sent web push notifications. Target: **>6% average CTR**.
- [ ] **Subscriber Retention Rate:** Percentage of subscribers remaining opted-in after 30 days. Target: **>85% retention**.
