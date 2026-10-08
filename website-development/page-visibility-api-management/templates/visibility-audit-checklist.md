# Page Visibility API Audit Checklist

Use this checklist to audit and verify that frontend applications properly manage execution state, render loops, network polling, and telemetry persistence during document visibility changes.

---

## 1. Core Event & Listener Compliance

- [ ] **Uses `visibilitychange` for Visibility State:** Does the application rely on `document.addEventListener('visibilitychange', ...)` and `document.visibilityState` rather than `window.onblur` or `window.onfocus`?
- [ ] **Avoids `unload` / `beforeunload` for Data Saving:** Are analytics events, session logs, or form draft states saved on `visibilitychange` (`document.visibilityState === 'hidden'`) instead of relying on legacy `unload` listeners?
- [ ] **Uses `sendBeacon` or `keepalive: true`:** Does telemetry transmission on tab backgrounding use `navigator.sendBeacon()` or `fetch(..., { keepalive: true })` to prevent dropped requests?
- [ ] **Clean Listener Cleanup:** Are `visibilitychange` listeners properly removed on component unmount to prevent memory leaks?

---

## 2. Animation & Render Loop Optimization

- [ ] **Explicit Animation Frame Cancellation:** Are active `requestAnimationFrame` IDs explicitly cancelled on `visibilityState === 'hidden'` rather than relying solely on browser background frame rate throttling?
- [ ] **Time Delta Reset on Restore:** Does the animation loop reset its `lastFrameTime` reference (`lastFrameTime = performance.now()`) immediately upon returning to `'visible'` state to avoid physics/delta jump glitches (`dt` spikes)?
- [ ] **Canvas / WebGL Context Protection:** Are WebGL/Canvas rendering tasks completely suspended when hidden to eliminate background GPU/CPU overhead?

---

## 3. Network & API Polling Management

- [ ] **Adaptive Polling Intervals:** Are periodic background HTTP/GraphQL polling loops stretched out (e.g. from 3s to 30s+) or suspended when `document.visibilityState === 'hidden'`?
- [ ] **Stale Data Refresh on Return:** Does the application detect if the tab was backgrounded for an extended period (e.g., > 5 minutes) and re-validate stale UI data or auth tokens upon re-focus?
- [ ] **WebSocket / SSE Heartbeat Throttling:** Are non-essential real-time streams or ping heartbeats slowed down during prolonged tab backgrounding to conserve server resources?

---

## 4. Media & Audio Management

- [ ] **Presentation Video Auto-Pause:** Do non-user-interactive background presentation videos pause playback when the tab is hidden?
- [ ] **Autoplay Error Handling:** Is `.play()` calls wrapped in promise rejection handlers (`.catch(...)`) to handle browser Autoplay Policy restrictions when restoring media on tab return?

---

## 5. Verification & Testing Steps

- [ ] **Chrome DevTools Performance Inspection:** Record a trace while switching tabs for 10 seconds. Verify JS execution and main-thread task activity drops to zero while hidden.
- [ ] **Network Panel Verification:** Verify network requests decrease or halt during background state and resume upon returning to active state.
- [ ] **Beacon Network Log Test:** Trigger a state update, switch tabs, and verify POST requests appear in the Network tab with `type: ping` or `beacon`.
