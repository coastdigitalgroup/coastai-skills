---
name: push-notification-opt-in-optimization
description:
  Audit, design, and optimize two-step soft-prompt web push notification permission
  flows to maximize subscriber opt-in rates, eliminate native browser permission
  blocks, and drive high-intent re-engagement. Trigger this skill when facing high
  push permission denial rates, low subscriber capture, or browser permission blocks.
---

# Push Notification Opt-In Optimization

## Purpose

The Push Notification Opt-In Optimization skill provides a systematic framework
for turning web push notifications into a high-converting, user-permissioned
re-engagement channel. Requesting native browser push permission immediately upon
page load results in overwhelming denial rates (often 85-95%) and triggers permanent
"Block" states in Chrome, Safari, and Edge. Once blocked at the browser level,
re-engaging the user requires complex manual browser settings adjustments.

By implementing two-step "soft-prompt" modal wrappers, event-triggered timing
aligned with explicit user intent, value-focused messaging, and preference
granularity, this skill boosts native prompt acceptance rates, prevents browser
permission lockouts, and builds a qualified web push subscriber base.

## Use Cases

- **E-Commerce & Retail:** Price drop alerts, back-in-stock notifications,
  order shipment updates, and cart recovery nudges.
- **SaaS & B2B Web Apps:** Workflow updates, comment mentions, approval task
  alerts, and system status changes.
- **Publishers & Media Outlets:** Breaking news, topic-specific updates, and
  author subscription notifications.
- **Marketplaces & Portals:** Bid updates, new message alerts, candidate application
  status changes, and listing matches.

## When NOT to Use

- **Transactional Email / SMS Workflows:** For critical account security alerts,
  password resets, or legal receipts, use dedicated transactional messaging frameworks.
- **Native Mobile Apps:** Mobile apps utilize OS-level permission dialogs and
  push services (APNs/FCM) managed through native app code; use mobile OS prompt guidelines.
- **Static Content Sites / Portals Without Timely Updates:** If a website does not publish
  time-sensitive information or interactive events, push notifications create negative user perception.
- **Initial Landing Page Acquisition:** Never use web push as a substitute for clear
  on-page value propositions or primary sign-up forms on paid landing pages.

## Inputs

1. **Current Permission Metrics:** Baseline opt-in rate, soft-prompt accept rate,
   native prompt accept rate, and native block rate.
2. **Push Category Offerings:** Time-sensitive value offers (e.g., price drop, shipping updates, breaking news).
3. **User Journey & Intent Triggers:** Key behavioral milestones (e.g., click "Track Order", click "Notify Me When Available", 3rd article read, active workflow creation).
4. **Current Technical Setup:** Push service provider (e.g., OneSignal, PushOwl, WonderPush, or custom Service Worker implementation).

## Outputs

1. **Opt-In Flow Architecture:** Two-step soft-prompt UI specifications, modal copy, and dismiss/accept interaction states.
2. **Trigger Matrix:** Event-driven and session-based rules mapping user actions to soft-prompt displays.
3. **Category Preference Selector:** Granular opt-in options letting users choose specific alert topics.
4. **Unblock / Recovery Guide:** In-app banner and UI instructions for guiding previously blocked users to reset browser permissions.
5. **Validation & Monitoring Plan:** Metrics dashboard tracking soft-prompt CTR, native accept rate, unsubscribe rate, and notification CTR.

## Workflow

### 1. Audit Current Opt-In Health & Permission Block Rate
- **Check Prompt Timing:** Verify whether the native `Notification.requestPermission()` prompt fires on page load or after user interaction.
- **Analyze Browser Block Rate:** Measure the percentage of visitors with `Notification.permission === 'denied'`. A rate >30% indicates aggressive, unprompted permission requests.
- **Inspect Value Framing:** Evaluate if the prompt clearly explains *what* content will be sent and *how often*.

### 2. Implement Two-Step Soft-Prompt Architecture
- **In-App Soft Prompt Layer:** Present a custom HTML/CSS modal, slide-in drawer, or banner prior to invoking native browser APIs.
- **Value-Driven Copy:** Highlight explicit benefits (e.g., "Get instant alerts when this item goes on sale" instead of "Allow notifications").
- **Clear Micro-Actions:** Provide explicit primary ("Enable Alerts") and secondary ("Not Now" or "Maybe Later") choices. Clicking "Not Now" dismisses the soft prompt without triggering the native browser prompt or risking a permanent block.

### 3. Establish Contextual & Event-Based Triggers
- **Action-Triggered Prompts:** Trigger soft prompts immediately after high-intent user actions:
  - Clicking "Save to Wishlist" or "Notify Me on Price Drop"
  - Completing a purchase (Order Status / Delivery Tracking)
  - Starring/following a category, author, or project
  - Reaching a engagement milestone (e.g., reading 3 articles in a single session)
- **Time/Scroll Delays:** If using session-based triggers, require minimum criteria (e.g., >60 seconds on site AND >2 page views) before showing a soft prompt.

### 4. Add Preference Granularity
- **Topic Selection:** Allow users to check specific alert categories in the soft prompt (e.g., "Order Updates", "Exclusive Sales", "Product Restocks").
- **Frequency Control:** Reassure users regarding notification volume (e.g., "Max 1-2 alerts per week. Unsubscribe anytime.").

### 5. Build Blocked-Permission Recovery Flow
- **Detect Blocked State:** For users with `Notification.permission === 'denied'` who click a notification-dependent feature (e.g., "Alert Me"), detect the browser state.
- **Guided Tooltip / Modal:** Show a step-by-step visual tooltip showing how to click the browser lock/settings icon in the address bar to change permissions from "Block" to "Allow".

### 6. Review Against Decision Rules & Deploy
- Verify prompt copy, trigger thresholds, and fallback paths before launching A/B testing.

## Decision Rules

- **The "Never Direct" Rule:** Never call native `Notification.requestPermission()` directly on page load. Always wrap the native call in a soft-prompt agreement or explicit button click.
- **The "Two-No Cooldown" Rule:** If a user clicks "Not Now" on a soft prompt, do not show another soft prompt for at least 14 to 30 days, or until they perform an explicit opt-in action.
- **The "High Intent First" Rule:** Prioritize action-triggered prompts (e.g., post-purchase or bookmarking) over time-based site-wide prompts. Action-triggered prompts achieve 3x-5x higher opt-in conversion.
- **Contextual Placement Rule:**
  - *E-commerce:* Slide-in drawer or sticky top bar after wishlist/cart actions.
  - *SaaS:* In-app notification center bell icon with an inline toggle switch.
  - *Publishing:* Bottom banner or inline card inside content stream after depth scroll.

## Constraints

- **Browser Security Policies:** Browsers enforce strict user gesture requirements for `Notification.requestPermission()`. In Safari and Chrome, native prompts must originate from an explicit user gesture (e.g., click event).
- **Service Worker Requirement:** Web push notifications require HTTPS and a registered Service Worker (`sw.js`). Sites on HTTP or unsupported environments must use HTTPS wrappers or subdomains.
- **Browser Settings Unblocking:** Web applications cannot programmatically clear a native "Denied" permission state. Recovery must rely on user-initiated manual changes in browser settings.

## Non-Goals

- Does not cover transactional email/SMS system setup — see `lead-capture-form-optimization` or dedicated email delivery skills.
- Does not cover mobile app APNs/FCM SDK integrations for iOS/Android native applications.
- Does not design the backend push notification payload scheduling or CRM automation logic.

## Common Failure Patterns

- **Page-Load Native Blast:** Triggering the browser prompt within 0.5 seconds of land. Result: ~90% instant denial and permanent browser lock.
- **Vague "Allow Notifications" Copy:** Using default text without stating the value, frequency, or topics. Result: Low trust and high decline rates.
- **No Secondary "Not Now" Button:** Forcing users to accept or close via 'X'. Users instinctively click 'Block' on browser popups if frustrated.
- **Ignoring Blocked Users:** Attempting to trigger prompts for users who already blocked notifications, leading to silent console errors and broken UI states.
- **Over-Messaging Post-Opt-In:** Sending irrevelant or daily push blasts immediately after opt-in, leading to rapid push unsubscribes or browser-level blocks.

## Validation Criteria

- [ ] **Soft Prompt Acceptance Rate:** (% of users who click "Allow/Enable" on soft prompt) Target: >35%.
- [ ] **Native Prompt Conversion Rate:** (% of soft-prompt accepters who accept native prompt) Target: >85%.
- [ ] **Browser Permission Block Rate:** (% of total visitors in 'denied' state) Target: <10%.
- [ ] **Push Click-Through Rate (CTR):** (% of delivered notifications clicked) Target: >4-8% (industry benchmark).
- [ ] **Opt-Out / Unsubscribe Rate:** (% of subscribers unsubscribing per campaign) Target: <0.5%.
