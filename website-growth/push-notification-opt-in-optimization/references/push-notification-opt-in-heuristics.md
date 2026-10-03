# Push Notification Opt-In UX Heuristics & Persuasion Rules

This reference guide outlines the psychological principles, UX heuristics, browser permission behaviors, and trigger mechanics required to maximize web push notification opt-in rates while maintaining user trust.

---

## 1. Browser Permission Mechanics & The "Permanent Block" Hazard

### The Asymmetry of Browser Permission State
Web browsers enforce strict security and privacy controls around the Web Push API (`Notification.requestPermission()`):

1. **Default / Prompt State (`Notification.permission === 'default'`):**
   - The user has not yet made a decision on native permissions.
   - The site can programmatically call `Notification.requestPermission()`.
2. **Granted State (`Notification.permission === 'granted'`):**
   - The user accepted the native prompt. Push messages and service worker registrations are active.
3. **Denied / Blocked State (`Notification.permission === 'denied'`):**
   - The user clicked "Block" or dismissed the native prompt multiple times (Chrome auto-block).
   - **Critical Rule:** The browser PERMANENTLY suppresses further JavaScript calls to `requestPermission()`. The site cannot trigger native popups again.

### Why Soft Prompts Are Mandatory
A custom HTML/CSS soft prompt acts as a protective shield for the website's permission state:
- If a user clicks "No Thanks" on a custom soft prompt, `Notification.requestPermission()` is **never invoked**.
- The browser permission state remains in `default`.
- The site retains the legal and technical ability to present a soft prompt again in the future when the user exhibits higher intent.

---

## 2. Psychological Persuasion Triggers for Web Push Opt-In

### 1. Reciprocal Value Exchange
Users will not grant high-privilege access (interruptive desktop notifications) without an immediate, clear return in value:
- **Weak (Self-Serving):** "Subscribe to our notifications to get our latest news."
- **Strong (Value-First):** "Get instant price-drop alerts when your saved items go on sale."

### 2. Micro-Commitment & Consistency
Requesting permissions after a user has performed an explicit micro-action dramatically increases opt-in conversion:
- **Pattern:** When a user clicks "Track Package", "Save to Wishlist", or "Follow Author", they have expressed explicit intent. Presenting a soft prompt at this exact moment aligns with their desire for consistency.

### 3. Loss Aversion & Urgency
Highlighting real-time risk or perishable information motivates notification enablement:
- **Examples:**
  - "Don't miss flash restocks before items sell out."
  - "Get notified immediately if another user outbids you."

---

## 3. High-Intent Behavioral Trigger Rules

| User Journey / Intent Level | Recommended Trigger Timing | Soft Prompt Variant | Value Copy Focus |
| :--- | :--- | :--- | :--- |
| **Post-Purchase (Highest Intent)** | Immediate on Order Confirmation Page | Centered Value Card Modal | Order delivery & courier tracking updates |
| **Out-of-Stock PDP View** | On "Notify Me" Button Click | Contextual Action Overlay | Variant restock alerts |
| **Wishlist / Saved Search** | On 2nd Item Saved | Corner Slide-In Banner | Price drop & low stock warnings |
| **Engaged Reader (Media)** | After 2 Articles or >75% Scroll on Article 2 | Non-Modal Bottom Toast | Category breaking news & topic digests |
| **Active App User (SaaS)** | On 1st Comment / Task Assignment | In-App Feature Preference Card | Direct @mention & task assignment alerts |
| **General Cold Visitor** | **NEVER** on landing (Wait for 2+ pageviews & >45s active time) | Low-Profile Floating Bell Launcher | Passive preference selection |

---

## 4. Mobile vs. Desktop UX Adaptations

### Desktop Web Browsers (Chrome, Edge, Firefox, Safari macOS)
- Render soft prompts as non-modal slide-in banners in the top-right or bottom-right corner.
- Ensure the soft prompt does not cover primary site navigation or shopping cart buttons.

### Mobile Web Browsers (Chrome Android, Safari iOS 16.4+ PWA)
- Render soft prompts as bottom-anchored slide-up sheets (Sheet Modals) with thumb-friendly touch targets (minimum 48x48px button height).
- Safari iOS requires explicit user interaction to trigger web push capabilities.

---

## 5. Frequency Capping & Snooze Rules

To prevent user annoyance and prompt fatigue, strictly enforce the following timing rules:

1. **Soft-Prompt Dismissal Snooze:**
   - When a user dismisses a soft prompt ("Not Now"), suppress all web push prompts for a minimum of **14 days**.
2. **Repeated Dismissal Escalation:**
   - If a user dismisses a soft prompt 2 consecutive times, increase the snooze duration to **30 days** or shift to a passive floating bell icon.
3. **Post-Opt-In Notification Frequency:**
   - Do not exceed **1–2 promotional push messages per week**. Transactional alerts (order updates, mention alerts) should be delivered instantly as triggered.
