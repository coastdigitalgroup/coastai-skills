---
name: page-visibility-api-management
description: Pause resource-heavy operations, sync background state, handle tab freezing/restoration, and eliminate battery/network drain when tabs are hidden using the Page Visibility API (document.visibilityState, visibilitychange).
---

# Page Visibility API Management

## Purpose

The Page Visibility API Management skill provides a standardized architectural protocol, reusable JavaScript lifecycle controllers, and performance diagnostic heuristics for managing application behavior based on document visibility (`document.visibilityState`, `visibilitychange`).

Modern browsers aggressively throttle background tabs, limiting `setInterval`/`setTimeout` timers to 1Hz or delaying them up to several minutes, throttling `requestAnimationFrame` loops completely, and pausing non-active canvas/WebGL rendering contexts. Applications that fail to handle tab visibility changes suffer from:
- **Severe Battery and CPU Drain:** Unnecessary rendering animations, physics calculations, or heavy canvas loops executing invisibly in background tabs.
- **Wasted Network Bandwidth & Server Load:** High-frequency REST or GraphQL polling endpoints continuing to query backends when the user is not actively viewing the page.
- **UI Desynchronization & Stale State Flashes:** Timer drift accumulating during tab backgrounding, leading to rapid, bursty UI updates or stale data flashes when the tab re-gains focus.
- **Analytics & Telemetry Loss:** Relying on unreliable `unload` or `beforeunload` events instead of `visibilitychange` (`document.visibilityState === 'hidden'`) to flush analytics queues and save user work.

---

## Use Cases

- **Auto-Pausing & Resuming Media / Canvas Animations:** Automatically pausing background video elements, WebGL 3D scenes, Canvas animations, dynamic carousels, or audio streams when a tab becomes hidden, and resuming them seamlessly upon re-focus.
- **Intelligent API Polling & SSE / WebSocket Throttling:** Switching background polling intervals from high-frequency (e.g., 3s) to low-frequency or suspended state when hidden, or suspending non-critical WebSocket events to conserve server connections and client memory.
- **Reliable Telemetry & Analytics Beacon Flushing:** Safely flushing telemetry queues, analytics events, and user form drafts via `navigator.sendBeacon()` or `fetch()` with `keepalive: true` when `document.visibilityState` changes to `'hidden'`.
- **Game & Interactive App State Freezing:** Pausing physics engines, game clock loops, and audio synthesis contexts when the user switches tabs or minimizes the browser window.
- **Freshness Verification on Tab Restoration:** Detecting when a tab returns from hidden state after a prolonged period (e.g., > 5 minutes) and re-validating cached data or user authentication tokens before displaying stale UI.

---

## When NOT to Use

- **Critical Real-Time Background Synchronization:** Tasks requiring background execution regardless of window visibility (e.g., background file upload progress, offline data synchronization, Web Push notification handling). Use Web Workers, Service Workers, or the Background Sync API instead.
- **Cross-Tab State Synchronization:** Coordinating actions, locks, or state changes between multiple open tabs. Use the `BroadcastChannel` API or Web Locks API (`navigator.locks`). See `cross-tab-state-synchronization`.
- **In-Viewport Element Tracking:** Detecting whether an element on the active page is currently visible inside the user's scroll viewport. Use the `IntersectionObserver` API instead. See `intersection-observer-implementation`.

---

## Inputs

1. **Visibility Event Source:** The global `document` object listening to `visibilitychange` events and checking `document.visibilityState` (`'visible'` vs. `'hidden'`).
2. **Resource Callbacks:** Application task handles to manage (e.g., `requestAnimationFrame` IDs, `setInterval` timer handles, WebSocket connections, HTML5 `<video>` / `<audio>` DOM references).
3. **Threshold & Delay Configurations:** Time thresholds for background idle duration before triggering heavy resource suspension or data re-validation.

---

## Outputs

1. **Page Visibility State Manager Class (`VisibilityManager`):** Production-grade JavaScript controller regulating execution states across application modules (rendering, polling, media, telemetry).
2. **Resource Auto-Pause & Resume Hooks:** Event listeners and state hooks ensuring zero animation/CPU overhead when hidden and immediate restoration when visible.
3. **Reliable Unload / Hidden Telemetry Transport:** Guaranteed beacon flushing implementation using `navigator.sendBeacon()` or `fetch(..., { keepalive: true })`.

---

## Workflow

### 1. Register the Core Visibility Listener

Attach a single, centralized `visibilitychange` event listener on `document`. Query `document.visibilityState` rather than relying solely on legacy `window.onblur` or `window.onfocus` events, which trigger falsely when clicking child frames or browser developer tools.

```javascript
class VisibilityLifecycleController {
  constructor() {
    this.isHidden = document.visibilityState === 'hidden';
    this.hiddenTimestamp = this.isHidden ? Date.now() : null;
    this.visibleListeners = new Set();
    this.hiddenListeners = new Set();

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.isHidden = true;
      this.hiddenTimestamp = Date.now();
      this.notifyHidden();
    } else {
      const backgroundDuration = this.hiddenTimestamp ? Date.now() - this.hiddenTimestamp : 0;
      this.isHidden = false;
      this.hiddenTimestamp = null;
      this.notifyVisible(backgroundDuration);
    }
  }

  notifyHidden() {
    this.hiddenListeners.forEach(fn => fn());
  }

  notifyVisible(backgroundDuration) {
    this.visibleListeners.forEach(fn => fn(backgroundDuration));
  }
}
```

### 2. Pause and Resume Render Loops (`requestAnimationFrame` & Canvas)

Do not rely on the browser to silently throttle `requestAnimationFrame`. Cancel active animation frame IDs explicitly on tab hide to prevent frame time delta spikes (`dt`) when returning to the visible tab.

```javascript
let animationFrameId = null;
let lastFrameTime = performance.now();

function renderStep(currentTime) {
  const dt = currentTime - lastFrameTime;
  lastFrameTime = currentTime;

  // Perform canvas / webgl update
  updateScene(dt);
  drawScene();

  if (document.visibilityState === 'visible') {
    animationFrameId = requestAnimationFrame(renderStep);
  }
}

visibilityController.onHidden(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
});

visibilityController.onVisible((backgroundDuration) => {
  // Reset last frame time to current time to prevent massive dt jump
  lastFrameTime = performance.now();
  if (animationFrameId === null) {
    animationFrameId = requestAnimationFrame(renderStep);
  }

  // Re-sync or refresh scene if backgrounded for more than 30 seconds
  if (backgroundDuration > 30000) {
    refreshStaleSceneData();
  }
});
```

### 3. Adapt Polling Intervals (Smart Adaptive Fetching)

Slow down or completely halt periodic API background polling when the page is hidden to conserve server infrastructure capacity and client network bandwidth.

```javascript
class AdaptivePoller {
  constructor(pollFn, activeInterval = 5000, backgroundInterval = 60000) {
    this.pollFn = pollFn;
    this.activeInterval = activeInterval;
    this.backgroundInterval = backgroundInterval;
    this.timerId = null;

    document.addEventListener('visibilitychange', () => this.reschedule());
  }

  start() {
    this.reschedule();
  }

  stop() {
    if (this.timerId) clearTimeout(this.timerId);
  }

  async executePoll() {
    await this.pollFn();
    this.reschedule();
  }

  reschedule() {
    this.stop();
    const interval = document.visibilityState === 'hidden'
      ? this.backgroundInterval
      : this.activeInterval;

    if (interval > 0) {
      this.timerId = setTimeout(() => this.executePoll(), interval);
    }
  }
}
```

### 4. Implement Guaranteed Telemetry Flushing on Tab Hide

Standard Chrome/Safari/Firefox web lifecycle guidelines mandate using `visibilitychange` (`document.visibilityState === 'hidden'`) as the single most reliable signal that a session or page view is ending. Replace `unload` and `beforeunload` listeners with `visibilitychange` + `sendBeacon` / `fetch(..., { keepalive: true })`.

```javascript
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    const payload = JSON.stringify({
      sessionTime: getElapsedSessionTime(),
      metrics: getAccumulatedMetrics(),
      timestamp: Date.now()
    });

    // Strategy 1: navigator.sendBeacon (Preferred)
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/telemetry', blob);
    } else {
      // Strategy 2: fetch with keepalive: true fallback
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      });
    }
  }
});
```

---

## Decision Rules

### Visibility Handling Strategy Matrix

| Operation Category | Action when `hidden` | Action when `visible` | Fallback / Alternative |
| :--- | :--- | :--- | :--- |
| **Canvas / WebGL / rAF Animations** | `cancelAnimationFrame()`, pause loop | Reset `lastTime` delta, restart `rAF` | Browser automatic rAF throttling (unreliable for frame delta math) |
| **HTML5 Video / Audio Playback** | `.pause()` (if non-user presentation media) | `.play()` (optional, user preference) | Media Session API for persistent background audio |
| **Background Data Polling (REST/GraphQL)** | Stretch interval (e.g., 5s -> 60s or pause) | Execute immediate fetch if stale, restore 5s interval | Server-Sent Events / WebSockets with idle ping |
| **Analytics & Telemetry Queue** | Flush queue via `sendBeacon` or `keepalive: true` | Resume buffering queue | `pagehide` event as fallback |
| **Authentication & Session Tokens** | Freeze active timer expiration warnings | Re-validate token validity if backgrounded > 5min | Silent iframe/fetch token refresh |

---

## Constraints

- **Browser Lifecycle Differences:** On mobile OS environments (iOS Safari, Android Chrome), background tabs may be silently frozen or terminated by the OS memory manager without firing `pagehide` or `unload`. `visibilitychange` (`document.visibilityState === 'hidden'`) is the **only** reliable event guaranteed to execute before freezing.
- **Timer Throttling Limits:** Browsers clamp `setInterval` and `setTimeout` delays in background tabs to a minimum of 1,000ms (1Hz) or even 1 minute (Chrome Budget-based throttling). Never use background timers for high-precision timekeeping; calculate duration using `performance.now()` or `Date.now()` upon returning to visible state.
- **Audio Autoplay Policies:** Resuming video or audio playback automatically when returning to `visible` state may be blocked by browser Autoplay Policies if the user has not interacted with the document in the active window frame.

---

## Non-Goals

- Managing element-level intersection or scrolling visibility inside the page viewport (use `IntersectionObserver`).
- Handling multi-tab state coordination or single-leader tab election (use `BroadcastChannel` and `navigator.locks`).
- Polyfilling background push notifications when the browser app is completely closed.

---

## Common Failure Patterns

- **Relying on `unload` or `beforeunload` for Data Persistence:** Writing analytics or saving user data in `unload` handlers. Browsers frequently skip `unload` on mobile when swiping away apps or switching tabs.
- **Delta Jump Bugs in Animation Loops:** Failing to reset `lastFrameTime = performance.now()` upon tab re-focus. When `requestAnimationFrame` resumes, `dt = currentTime - lastFrameTime` can equal tens of thousands of milliseconds, causing physics objects to shoot off-screen or animations to glitch violently.
- **Using `blur` / `focus` instead of `visibilitychange`:** Listening to `window.onblur` to stop animations. If a user clicks inside an `<iframe>`, input field, or opens Chrome DevTools, `blur` fires even though the page content is completely visible to the user.
- **Synchronous XHR in Hidden Handlers:** Attempting synchronous `XMLHttpRequest()` on `visibilitychange` or `unload`. Modern browsers prohibit synchronous network requests during page lifecycle transitions.

---

## Validation Steps

### 1. DevTools Rendering & Performance Audit
- [ ] Open Chrome DevTools **Performance** panel or **Rendering** tab ("FPS meter").
- [ ] Switch to another tab or minimize window for 10 seconds, then return.
- [ ] Confirm `requestAnimationFrame` counts drop to zero and CPU usage halts while hidden.

### 2. Network Tab Polling Inspection
- [ ] Observe Network panel with active background polling running.
- [ ] Hide tab (`document.visibilityState === 'hidden'`).
- [ ] Verify background polling requests either cease completely or stretch to the configured background interval (e.g. 60s).

### 3. Telemetry Flush Test
- [ ] Trigger an application state change, then switch tabs or minimize browser.
- [ ] In Network panel (or preserving log), confirm `sendBeacon` or `keepalive` POST request successfully executes upon tab hide.
