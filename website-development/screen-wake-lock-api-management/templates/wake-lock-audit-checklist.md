# Screen Wake Lock API Implementation Audit Checklist

Use this step-by-step checklist to verify that your implementation of the W3C Screen Wake Lock API (`navigator.wakeLock`) is production-ready, resilient across document visibility changes, accessible, and battery-friendly.

---

## 1. Feature Detection & Environment Security

- [ ] **Secure Context Check:** Verify that the page is served over `https://` or `http://localhost`. Confirm that no calls to `navigator.wakeLock.request('screen')` occur on unencrypted `http://` pages.
- [ ] **Feature Availability Safeguard:** Ensure code guards calls behind `'wakeLock' in navigator` or `window.isSecureContext` before accessing the API.
- [ ] **Permissions-Policy Verification:** Confirm HTTP response headers do not block the feature (e.g., ensure `Permissions-Policy` does not set `screen-wake-lock=()`).
- [ ] **Cross-Origin iframe Delegation:** If the feature is embedded inside an `<iframe>`, verify that the `allow="screen-wake-lock"` attribute is present on the frame tag.

---

## 2. Request & Acquisition Lifecycle

- [ ] **User Intent Association:** Verify that requesting a wake lock is driven by an explicit user action (e.g., clicking a "Keep Awake" button) or entry into a specialized workflow state (e.g., "Presentation Mode" or "Recipe Cooking Mode").
- [ ] **Async / Await Error Handling:** Ensure all `navigator.wakeLock.request('screen')` calls are wrapped in `try...catch` blocks to catch `NotAllowedError` or `AbortError`.
- [ ] **Sentinel Reference Storage:** Confirm that the resolved `WakeLockSentinel` object is saved to a persistent variable or class property for subsequent explicit releases.
- [ ] **Active Visibility Guard:** Verify that `request('screen')` is never called while `document.visibilityState === 'hidden'`, as hidden tab requests are rejected by browsers.

---

## 3. Page Visibility & Tab Switch Lifecycle

- [ ] **Release Event Listener:** Ensure a listener is attached to `sentinel.addEventListener('release', ...)` to handle system- or browser-initiated lock releases.
- [ ] **Document Visibility Monitor:** Attach a `visibilitychange` event listener to `document`.
- [ ] **Automatic Re-acquisition on Return:** Confirm that when `document.visibilityState` returns to `'visible'`, the code automatically re-requests the wake lock if `userRequestedLock === true`.
- [ ] **Page Unload / Cleanup:** Bind `pagehide` or component unmount handlers to call `sentinel.release()` to prevent memory or resource leaks.

---

## 4. Accessibility & UI State Synchronization

- [ ] **Semantic Native Control:** Ensure the UI toggle control is a native HTML `<button>` (not a `<div>` or `<span>`).
- [ ] **ARIA State Attribute:** Update `aria-pressed="true"` when the wake lock is active and `aria-pressed="false"` when inactive.
- [ ] **Dynamic Live Region Updates:** Provide an `aria-live="polite"` element that announces status changes (e.g., "Screen wake lock enabled. Screen will remain awake.") to screen reader users.
- [ ] **Keyboard Navigability:** Confirm the toggle button can be focused via `Tab` and triggered using `Space` or `Enter`.
- [ ] **Fallback Messaging:** If Screen Wake Lock is unsupported, ensure the UI control is gracefully hidden or disabled with clear explanatory text.

---

## 5. Battery Preservation & Power Conservation

- [ ] **Low Battery Safeguard:** Check battery state via `navigator.getBattery()` (where available).
- [ ] **Auto-Off Threshold:** Automatically release active wake locks when battery level falls below 15% (`battery.level <= 0.15`) and device is not charging.
- [ ] **Low Power Notification:** Announce auto-release due to low battery via `aria-live` status regions.

---

## 6. Verification Test Scenarios

| Test Case | Procedure | Expected Outcome | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **Initial Request** | Click "Keep Awake" button on visible page over HTTPS | `navigator.wakeLock.request('screen')` resolves; button sets `aria-pressed="true"`. | [ ] |
| **Manual Release** | Click "Keep Awake" button a second time | `sentinel.release()` called; button sets `aria-pressed="false"`. | [ ] |
| **Tab Minimization / Switch** | Enable wake lock, switch to another tab, return | Lock releases on switch; lock automatically re-acquired on tab return. | [ ] |
| **Page Unload** | Enable wake lock, close tab or navigate away | `pagehide` fires cleanup; no uncaught exceptions thrown. | [ ] |
| **Insecure Context Degradation** | Load page over unencrypted `http://` | App safely disables toggle without runtime errors. | [ ] |
