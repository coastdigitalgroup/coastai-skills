# Push Notification Opt-In Optimization Audit & Implementation Checklist

Use this actionable checklist to audit, design, time, and optimize web push notification permission workflows across desktop and mobile web applications.

---

## Part 1: Current Implementation & Friction Audit

### 1. Initial Prompt Timing & Native Block Risk
- [ ] **Check 0-Second Page-Load Prompts:** Verify that the native browser permission dialog (`Notification.requestPermission()`) is **NEVER** called automatically on page load or within 0–5 seconds of initial landing.
- [ ] **Calculate Native Block Rate:** Inspect analytics data for native permission responses. Is the Native Block Rate > 15%? (If yes, immediate remediation is required).
- [ ] **Identify Cold Visitor Exposure:** Ensure first-time anonymous visitors are not exposed to native permission requests before viewing site content or establishing brand trust.

### 2. Value Proposition & Copy Audit
- [ ] **Clear Value Exchange:** Does the opt-in copy explicitly state **what** notifications the user will receive (e.g., shipping tracking, back-in-stock, @mentions)?
- [ ] **Frequency & Control Disclosures:** Does the copy reassure users about frequency (e.g., "No spam, 1-click unsubscribe anytime")?
- [ ] **Benefit-Driven CTAs:** Are CTA buttons labeled with clear actions (e.g., "Enable Shipping Alerts" or "Notify Me") rather than generic labels ("Yes" / "Allow")?

---

## Part 2: Two-Step Soft-Prompt UI Design

### 1. Soft-Prompt UI Pattern Selection
- [ ] **Desktop Browsing Pattern:** Selected a non-blocking slide-in banner or bottom-corner toast modal that allows users to continue reading content.
- [ ] **Mobile Web Pattern:** Selected a touch-friendly bottom sheet or centered value card modal optimized for mobile screen dimensions.
- [ ] **In-Flow Action Pattern:** Integrated inline soft-prompt triggers directly onto action buttons (e.g., "Notify When Restocked", "Track Price Drop", "Enable Order Tracking").

### 2. Dual-Button Action Logic
- [ ] **Primary Action (Accept):** Clicking the primary CTA executes `Notification.requestPermission()`. If accepted natively, register the Service Worker subscription.
- [ ] **Secondary Action (Dismiss):** Clicking "Not Now" or "Maybe Later" closes the soft prompt **WITHOUT** triggering native browser permission dialogs.
- [ ] **Snooze Cookie / Local Storage:** Dismissing the soft prompt sets a snooze timestamp (14–30 days) to prevent prompt fatigue.

---

## Part 3: High-Intent Trigger Rules & Behavioral Segmentation

### 1. Event-Driven E-Commerce Triggers
- [ ] **Post-Checkout Thank You Page:** Trigger soft prompt for order and shipping tracking alerts immediately after purchase.
- [ ] **Out-of-Stock PDP Button:** Trigger soft prompt when a user requests back-in-stock alerts for a specific variant.
- [ ] **Wishlist & Saved Items:** Trigger soft prompt when a user saves 2+ products to a wishlist or favorites list.

### 2. Event-Driven Media & Content Triggers
- [ ] **Depth of Engagement Threshold:** Trigger soft prompt only after a reader completes 2+ articles or scrolls >75% on a second article during a session.
- [ ] **Topic Category Alignment:** Match opt-in copy to the current content category (e.g., "Get Tech News Alerts").

### 3. Event-Driven SaaS & Web App Triggers
- [ ] **Interactive Collaboration Action:** Trigger soft prompt when a user sends a comment, assigns a task, or sets up a workspace project.
- [ ] **In-App Preferences Integration:** Provide an in-app settings tab where users can toggle notification categories independently.

---

## Part 4: Permission Recovery & Edge Case Management

### 1. Handling Previously Blocked Permissions (`Notification.permission === 'denied'`)
- [ ] **Blocked State Detection:** Check `Notification.permission` status before attempting to show soft prompts or notification buttons.
- [ ] **Visual Permission Recovery Guide:** If a user clicks an in-app button that requires notifications but permissions are blocked, render a visual modal guiding them to click the browser address bar icon (lock/tune) to unblock.
- [ ] **Permission Status Listener:** Include a "Re-check Permission" or auto-listener to detect when the user updates browser settings.

### 2. Persistent Low-Profile Opt-In Widget
- [ ] **Floating Bell / Header Widget:** Provide a subtle bell icon or account menu item allowing users to opt in or adjust preferences on their own terms at any time.

---

## Part 5: Measurement & Outcome Validation Protocol

| Performance Metric | Baseline Pre-Audit | Target Goal | Post-Optimization Result |
| :--- | :--- | :--- | :--- |
| **Web Push Opt-In Rate** | ______ % | **> 5.0%** | ______ % |
| **Native Permission Block Rate** | ______ % | **< 5.0%** | ______ % |
| **Soft-Prompt Acceptance Rate** | ______ % | **> 35.0%** | ______ % |
| **Push Notification Campaign CTR** | ______ % | **> 6.0%** | ______ % |
| **30-Day Subscriber Retention Rate** | ______ % | **> 85.0%** | ______ % |
