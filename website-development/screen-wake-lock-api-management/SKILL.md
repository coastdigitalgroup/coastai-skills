---
name: screen-wake-lock-api-management
description: Request, release, re-acquire, and manage Screen Wake Locks using the W3C Screen Wake Lock API (navigator.wakeLock) with automatic document visibility lifecycle handling, battery preservation, UI toggle synchronization, and WCAG AA accessibility.
---

# Screen Wake Lock API Management

## Purpose

The Screen Wake Lock API Management skill provides a standardized engineering methodology, lifecycle controller architecture, and auditing protocol for keeping device screens awake during uninterrupted visual user tasks using the W3C Screen Wake Lock API (`navigator.wakeLock`).

Modern mobile and desktop operating systems automatically dim or turn off device displays after brief periods of user inactivity (typically 30 seconds to 2 minutes) to conserve battery power. However, many web applications—such as cooking recipe guides, presentation slideshows, teleprompters, interactive workout routines, live telemetry dashboards, step-by-step assembly manuals, and video/audio tools—require the user's continuous visual attention without requiring ongoing physical touch or keyboard input.

When the display turns off unexpectedly, user workflow is interrupted, forcing users to repeatedly tap the screen with dirty or busy hands, re-authenticate, or lose context. Conversely, naively requesting wake locks without proper lifecycle management causes rapid battery drain, leaks memory across tab switches, fails on visibility loss, and violates accessibility standards.

This skill equips frontend developers to reliably request, manage, release, and re-acquire screen wake locks while accounting for document visibility changes, page lifecycle states, battery level thresholds, security permissions policies, fallback modes, and WCAG AA compliant user controls.

---

## Use Cases

- **Interactive Cooking & Recipe Portals:** Preventing screen dimming during step-by-step cooking instructions when users' hands are covered in food or ingredients.
- **Presentation Slideshows & Teleprompters:** Maintaining active displays for speakers, presenters, or performers who read content continuously without mouse/touch movement.
- **Fitness & Workout Applications:** Keeping workout instructions, exercise timers, and posture demonstration animations visible throughout workout sets.
- **Live Telemetry & Monitoring Dashboards:** Ensuring real-time operations, server metrics, manufacturing status monitors, or financial trading screens remain illuminated on wall displays or desk monitors.
- **Interactive Technical Manuals & Assembly Guides:** Assisting field technicians, mechanics, or DIY users assembling hardware or performing repairs with hands-on tools.
- **Web-Based Media & Audio Players:** Preserving display state during custom web audio playback, podcast listening with lyrics/notes, or custom HTML video compositions without native browser fullscreen controls.

---

## When NOT to Use

- **Background Data Processing or API Syncing:** If the application is performing background network requests, worker computations, or file uploads that do not require visual display, do not use Screen Wake Lock. Use Service Worker background sync or the Web Locks API instead.
- **Long-Form Reading (Standard Articles/Blogs):** For standard blogs, news articles, or documentation where users read at their own pace, do not force the screen to stay awake indefinitely. Let standard system display sleep timeouts apply.
- **Native HTML5 `<video>` Fullscreen Playback:** Default browser media players automatically manage display power during video playback. Re-implementing a wake lock on standard video elements is redundant unless custom overlay/canvas compositions override default media controls.
- **Unattended / Idle Applications:** Do not keep the screen awake when user activity has ceased or when the user navigates away from the active workflow.

---

## Inputs

1. **Feature Capability:** Browser availability of `navigator.wakeLock` in secure contexts (`https://` or `localhost`).
2. **User Interaction Intent:** Explicit toggle button activation (`click` event) or explicit workflow state initiation (e.g., entering "Presentation Mode" or "Recipe Cooking Mode").
3. **Document Visibility State:** Real-time monitoring of `document.visibilityState` (`visible` vs `hidden`) via the `visibilitychange` event.
4. **Permissions Policy:** Document headers or iframe `allow="screen-wake-lock"` attributes permitting wake lock acquisition.
5. **Battery Status (Optional):** Device battery level and charging status via `navigator.getBattery()` to prevent depleting low battery reserves.

---

## Outputs

1. **`WakeLockSentinel` Reference:** Active handle to the acquired screen wake lock object.
2. **Synchronized UI Toggle State:** Dynamic updating of DOM button attributes (`aria-pressed="true|false"`, icon state, CSS status classes).
3. **Accessible Screen Reader Announcements:** Dynamic text messages updated in an `aria-live="polite"` region informing assistive technology users of screen lock state changes.
4. **Lifecycle Event Subscriptions:** Robust bindings for `release` events, page `visibilitychange`, page `pagehide` / `unload`, and battery level changes.
5. **Error & Permission Callbacks:** Controlled error reporting when requests are denied (`NotAllowedError`), aborted (`AbortError`), or blocked by security policies.

---

## Workflow

### 1. Feature Detection and Secure Context Check
Verify that the browser supports `navigator.wakeLock` and that the application is executing in a secure context (`isSecureContext === true`).

```javascript
function isWakeLockSupported() {
  return window.isSecureContext && 'wakeLock' in navigator;
}
```

### 2. Implement the Acquisition Logic
Request a `'screen'` wake lock inside an `async` function, wrapping the call in a `try...catch` block to handle potential permission rejections or browser restrictions.

```javascript
let wakeLockSentinel = null;

async function requestScreenWakeLock() {
  if (!isWakeLockSupported()) {
    console.warn('Screen Wake Lock API is not supported in this environment.');
    return false;
  }

  try {
    wakeLockSentinel = await navigator.wakeLock.request('screen');

    // Bind release listener to capture system-initiated releases
    wakeLockSentinel.addEventListener('release', () => {
      console.log('Screen Wake Lock was released.');
      updateUIState(false);
    });

    updateUIState(true);
    announceToScreenReader('Screen wake lock enabled. Screen will remain awake.');
    return true;
  } catch (err) {
    // Handle error (e.g., NotAllowedError if page is hidden or blocked by policy)
    console.error(`Screen Wake Lock request failed: ${err.name}, ${err.message}`);
    updateUIState(false);
    announceToScreenReader('Unable to activate screen wake lock.');
    return false;
  }
}
```

### 3. Implement Explicit Release Logic
Provide a clean mechanism for users or application triggers to release the lock explicitly.

```javascript
async function releaseScreenWakeLock() {
  if (wakeLockSentinel !== null) {
    try {
      await wakeLockSentinel.release();
      wakeLockSentinel = null;
      updateUIState(false);
      announceToScreenReader('Screen wake lock disabled.');
    } catch (err) {
      console.error(`Failed to release Screen Wake Lock: ${err.message}`);
    }
  }
}
```

### 4. Handle Document Visibility Lifecycle (`visibilitychange`)
The browser **automatically releases** any active screen wake lock whenever the tab becomes hidden (user switches tabs, minimizes window, or locks device). When the user returns to the tab (`document.visibilityState === 'visible'`), the wake lock **must be re-requested** if the user's intent was still active.

```javascript
let isWakeLockRequestedByUser = false;

document.addEventListener('visibilitychange', async () => {
  if (wakeLockSentinel !== null && document.visibilityState === 'hidden') {
    // Note: Browser automatically releases lock on hidden, but we track intent
    console.log('Tab hidden: Wake lock released automatically by browser.');
  } else if (document.visibilityState === 'visible' && isWakeLockRequestedByUser) {
    // Re-acquire lock when returning to visible tab if user intent is still active
    console.log('Tab visible again: Re-acquiring Screen Wake Lock...');
    await requestScreenWakeLock();
  }
});
```

### 5. Integrate Battery Preservation Safeguards
Check device battery state using the Battery Status API (where supported) to prevent draining low battery reserves.

```javascript
async function setupBatterySafeguard() {
  if ('getBattery' in navigator) {
    try {
      const battery = await navigator.getBattery();

      const checkBattery = () => {
        // Auto-release wake lock if battery drops below 15% and is not charging
        if (battery.level <= 0.15 && !battery.charging && wakeLockSentinel !== null) {
          console.warn('Low battery detected. Auto-releasing Screen Wake Lock to conserve power.');
          releaseScreenWakeLock();
          announceToScreenReader('Screen wake lock turned off automatically due to low battery.');
        }
      };

      battery.addEventListener('levelchange', checkBattery);
      battery.addEventListener('chargingchange', checkBattery);
      checkBattery();
    } catch (e) {
      // Battery API unavailable or blocked
    }
  }
}
```

### 6. Synchronize WCAG AA Compliant UI Controls
Bind wake lock state to accessible toggle buttons using `aria-pressed` and dynamic `aria-live` status regions.

```html
<button
  id="wakeLockToggle"
  type="button"
  class="wake-lock-btn"
  aria-pressed="false"
  aria-describedby="wakeLockStatus"
>
  <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><!-- Sun / Lock Icon --></svg>
  <span>Keep Screen Awake</span>
</button>

<div id="wakeLockStatus" class="sr-only" aria-live="polite">
  Screen wake lock is currently inactive.
</div>
```

---

## Decision Rules

| Operating Condition | Recommended Strategy | Action / Pattern |
| :--- | :--- | :--- |
| **User Explicit Interaction (Button Toggle)** | Manual Control Mode | Toggle lock on click, update `aria-pressed`, persist user preference state (`isWakeLockRequestedByUser`). |
| **Workflow State Entry (e.g., Cooking Mode / Slideshow)** | Session-Bound Control Mode | Request wake lock automatically on workflow enter; release lock on workflow exit. |
| **Tab Minimization or Tab Switching** | Auto-Release & Auto-Reacquire | Browser releases lock on `hidden`. Re-request lock on `visibilitychange` -> `visible` if `isWakeLockRequestedByUser` is `true`. |
| **Low Battery (< 15% Unplugged)** | Power Conservation Off-Switch | Auto-release active lock, notify user via `aria-live`, disable toggle until charging or explicit override. |
| **Unsecure Context (`http://`) or Unsupported Browser** | Feature Degradation | Hide or disable toggle button, show non-intrusive message informing user that auto-sleep prevention is unsupported. |
| **Embedded inside `<iframe>`** | Cross-Origin Permission Delegation | Add `allow="screen-wake-lock"` attribute to the container `<iframe>` element. |

---

## Constraints

- **Secure Context Requirement:** The Screen Wake Lock API is only available in secure contexts (`https://` or `http://localhost`). It will throw a `TypeError` or be `undefined` in insecure `http://` pages.
- **Document Focus & Visibility Restrictions:** `navigator.wakeLock.request('screen')` will fail with a `NotAllowedError` if the document is not visible (`document.visibilityState !== 'visible'`) or does not currently have window focus.
- **Permissions-Policy Header:** If the HTTP response headers specify `Permissions-Policy: screen-wake-lock=()`, the API will be blocked. In subframes, `allow="screen-wake-lock"` is mandatory.
- **System Power Manager Superiority:** System-level OS power overrides (such as forced battery saver modes or hardware power button presses) supersede web wake locks.

---

## Non-Goals

- **CPU Wake Locks (`'system'` type):** The W3C specification reserves `'system'` wake locks for OS-level background execution, but current web browsers only support `'screen'` wake locks.
- **Preventing Hardware Screen Off / Lid Closure:** Closing a laptop lid or pressing a mobile power button will turn off the screen regardless of web wake locks.
- **Overriding Operating System Battery Saver Modes:** Web applications cannot bypass OS-enforced power saving limits when critical battery thresholds are reached.

---

## Common Failure Patterns

- **Orphaned Sentinel References:** Retaining a reference to a `WakeLockSentinel` object after the browser has automatically released it upon tab hidden, causing subsequent release calls to throw errors or leak state.
- **Failing to Re-Acquire on Visibility Change:** Requesting a wake lock once on page load, switching tabs, and assuming the screen is still locked when returning to the tab.
- **Requesting Lock on Hidden Pages:** Calling `request('screen')` during initial page load before the document becomes fully visible, causing an immediate `NotAllowedError`.
- **Inaccessible UI Controls:** Using a non-interactive `<div>` or omitting `aria-pressed` / `aria-live` status indicators, leaving screen reader users unaware of the display state.
- **Missing `iframe` Delegation:** Embedding a presentation widget or recipe card inside an `<iframe>` without adding `allow="screen-wake-lock"`, causing permission failures in cross-origin embeds.

---

## Validation Steps

### 1. Verification of Capability Detection
- Load the application over `http://` and verify that the wake lock manager safely reports unsupported status without throwing unhandled exceptions.
- Load the application over `https://` in Chrome, Safari 16.4+, or Edge and verify that feature detection succeeds.

### 2. Request & Release Functional Test
- Click the "Keep Screen Awake" button.
- Inspect console logs to verify `navigator.wakeLock.request('screen')` resolves with a valid `WakeLockSentinel`.
- Verify button `aria-pressed` updates to `"true"`.
- Click again to release and verify `sentinel.release()` executes and `aria-pressed` becomes `"false"`.

### 3. Visibility Cycle Test
- Activate the screen wake lock.
- Switch to another tab or minimize the browser window.
- Verify in console that the browser releases the lock automatically.
- Switch back to the application tab.
- Confirm that the `visibilitychange` handler re-acquires the wake lock automatically and restores active UI status.

### 4. Accessibility Audit
- Navigate to the wake lock control using keyboard only (`Tab` / `Space` / `Enter`).
- Activate screen reader (e.g., VoiceOver or NVDA).
- Verify that toggling the button announces "Screen wake lock enabled" or "Screen wake lock disabled" via the `aria-live="polite"` region.
