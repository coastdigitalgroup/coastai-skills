# Screen Wake Lock API Technical Heuristics & Browser Behavior

This reference guide details browser support, security context requirements, permissions policies, operating system interaction rules, accessibility standards, and power consumption heuristics for the W3C Screen Wake Lock API (`navigator.wakeLock`).

---

## 1. Browser Matrix & Specification Status

The W3C Screen Wake Lock API is a W3C Recommendation-track standard implemented across all major modern browser engines.

| Browser Engine | Desktop Support | Mobile Support | Min Version | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Chromium** (Chrome, Edge, Opera, Brave) | ✅ Supported | ✅ Supported | Chrome 84+ | Full support in HTTPS contexts. |
| **WebKit** (Safari, iOS Safari) | ✅ Supported | ✅ Supported | Safari 16.4+ | Supported on macOS and iOS/iPadOS 16.4+. |
| **Gecko** (Firefox, Firefox Android) | ✅ Supported | ✅ Supported | Firefox 126+ | Fully enabled by default in modern releases. |

---

## 2. Security & Context Requirements

### Secure Context (`window.isSecureContext`)
The Screen Wake Lock API is classified as a powerful feature. Browsers strictly restrict `navigator.wakeLock` to **secure contexts**:
- `https://` origin schemes.
- `http://localhost` or `127.0.0.1` development loops.
- Insecure origins (`http://domain.com`) will leave `navigator.wakeLock` `undefined` or throw a `TypeError`.

### Document Visibility & Focus Restrictions
Calls to `navigator.wakeLock.request('screen')` are subject to strict browser page state constraints:
1. **Visibility Constraint:** If `document.visibilityState === 'hidden'`, the request promise will immediately reject with a `NotAllowedError`.
2. **Focus Constraint:** Browsers may reject wake lock requests if the window or top-level browsing context does not currently have active window focus or recent user interaction.

### Permissions Policy Delegation
Access to the Screen Wake Lock API can be controlled or restricted by HTTP response headers or `<iframe>` frame container attributes:

```http
Permissions-Policy: screen-wake-lock=(self "https://trusted-domain.com")
```

For cross-origin `<iframe>` embeds, explicit permission must be delegated:

```html
<iframe src="https://recipe-widget.com/embed" allow="screen-wake-lock"></iframe>
```

---

## 3. Browser & OS Power Management Behavior

### Automatic Release Triggers
The browser engine will automatically fire the `release` event and invalidate a `WakeLockSentinel` in the following scenarios:
- **Tab Minimization or Tab Switching:** As soon as the document becomes hidden (`document.visibilityState === 'hidden'`).
- **Device Lock or Screen Saver:** When the operating system enters sleep mode or the user manually presses the hardware power button.
- **Page Navigation or Reload:** When the document unloads or navigates away.
- **Power Saver Override:** When OS-level battery saver modes enforce strict system power capping.

### Auto-Reacquisition Pattern
Because browsers release screen wake locks automatically on tab hidden, web applications that require ongoing wake lock protection (e.g., presentation slides or active cooking recipes) **must re-acquire** the lock upon regaining visibility:

```javascript
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && userWantsWakeLockActive) {
    await wakeLockManager.request();
  }
});
```

---

## 4. Accessibility Requirements (WCAG 2.1 AA)

When implementing Screen Wake Lock controls, applications must satisfy key WCAG guidelines to ensure compatibility with screen readers and switch devices:

1. **Explicit Semantic Control (WCAG 4.1.2 Name, Role, Value):**
   Use a native `<button type="button">` element rather than a `<div>` or `<span>`.
2. **Accessible Toggle State (`aria-pressed`):**
   Set `aria-pressed="true"` when the screen wake lock is active, and `aria-pressed="false"` when inactive.
3. **Dynamic State Announcement (WCAG 4.1.3 Status Messages):**
   Maintain a screen-reader-only `aria-live="polite"` status region to announce state changes (e.g., "Screen wake lock enabled", "Screen wake lock auto-released due to low battery").
4. **Contrast Ratios (WCAG 1.4.3 Contrast Minimum):**
   Ensure active vs inactive button visual states satisfy a minimum 4.5:1 text color contrast and 3:1 graphical component boundary contrast.

---

## 5. Battery Preservation Heuristics

Continuous display illumination is one of the highest consumers of battery power on mobile devices. Adhere to these engineering heuristics:

1. **Low Battery Threshold Off-Switch:** Automatically release screen wake locks if device battery drops below **15%** unplugged.
2. **Session-Bound Scope:** Automatically release wake locks when a user completes or exits the primary visual task (e.g., leaving "Cooking Mode" or ending a slideshow presentation).
3. **Inactivity Timeout Safety:** If user activity indicates the user has abandoned the device (e.g., no motion or interaction for > 30 minutes in a non-timer app), offer an interactive prompt before auto-releasing the lock.
