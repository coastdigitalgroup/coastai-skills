# Page Visibility API Heuristics & Lifecycle Reference

This document provides technical heuristics, browser lifecycle model mappings, timer behavior notes, and performance characteristics for working with the W3C Page Visibility API (`document.visibilityState`, `visibilitychange`).

---

## 1. W3C Page Lifecycle States

Modern browsers (Chrome 68+, Safari 12+, Firefox 62+, Edge) implement a formal Page Lifecycle State Machine. Understanding these states is critical for knowing when code can execute and when background resources are frozen.

```
       [ Active ] <-------> [ Passive ]
           |                   |
           v                   v
      [ Hidden ] <---------------------> [ Frozen ]
           |                                  |
           v                                  v
     [ Terminated ]                   [ Discarded ]
```

### Lifecycle State Definitions

| Lifecycle State | Description | `document.visibilityState` | Event Triggered |
| :--- | :--- | :--- | :--- |
| **Active** | Page is in frontmost tab of active window and has user focus. | `'visible'` | `focus` |
| **Passive** | Page is visible in active window, but user is interacting with devtools or non-browser window. | `'visible'` | `blur` |
| **Hidden** | Page is completely obscured by another window or tab is backgrounded. | `'hidden'` | `visibilitychange` |
| **Frozen** | Browser OS freezes CPU execution to preserve battery/memory. No JS executes. | `'hidden'` | `freeze` (W3C Page Lifecycle API) |
| **Terminated** | Unloaded or killed by OS/browser memory manager. | `'hidden'` | `pagehide` |
| **Discarded** | Tab remains in tab bar, but process memory freed by OS. Reloaded on click. | N/A | None (silent) |

---

## 2. Timer Throttling & Browser Clamping Rules

Browsers apply progressive CPU and timer throttling to non-visible tabs to reduce power consumption.

### Standard Background Timer Clamping
- **`setInterval` / `setTimeout` Clamping:** In background tabs (`visibilityState === 'hidden'`), timer callbacks are throttled to execute **no more than once per second (1,000ms / 1Hz)**.
- **Intensive / Budget-Based Throttling:** After a tab has been backgrounded for more than **5 minutes**, browsers like Chrome clamp timers even further to **once per 1 minute (60,000ms)** unless the page is playing audio or holding an active WebRTC stream.

### `requestAnimationFrame` Behavior
- When a tab becomes hidden, browsers stop invoking `requestAnimationFrame` callbacks entirely (0 FPS).
- **The Frame Delta Trap:** If an animation loop calculates step distance using `dt = currentTime - lastFrameTime`, `dt` will equal the total duration the tab was hidden (e.g., 30,000ms). Without resetting `lastFrameTime` on restore, animated elements will warp across the screen instantly or trigger `NaN`/infinity physics errors.

---

## 3. `visibilitychange` vs Legacy Unload Events

Historically, applications used `unload` or `beforeunload` to flush analytics and save state. On modern mobile and desktop browsers, **`unload` is deprecated and unreliable**.

### Why `unload` Fails:
1. **Skipped on Mobile:** iOS Safari and Android Chrome frequently kill background processes directly without firing `unload` or `beforeunload`.
2. **Breaks BFcache:** Adding an `unload` event listener prevents pages from entering the Back-Forward Cache (BFcache), causing slow page restores.
3. **Synchronous Requests Blocked:** Modern browsers reject synchronous `XMLHttpRequest` calls in `unload` handlers.

### The Modern Standard Pattern:
To reliably persist data when a user navigates away or closes a tab:
1. Listen for `visibilitychange` where `document.visibilityState === 'hidden'`.
2. Transmit data asynchronously using `navigator.sendBeacon(url, data)` or `fetch(url, { keepalive: true, body: data })`.

---

## 4. `navigator.sendBeacon` vs `fetch(..., { keepalive: true })`

| Feature | `navigator.sendBeacon()` | `fetch(..., { keepalive: true })` |
| :--- | :--- | :--- |
| **Execution Timing** | Queued asynchronously by OS networking stack | Maintained across frame unload |
| **HTTP Method** | Always `POST` | Supports `POST`, `PUT`, `DELETE` |
| **Payload Size Limit** | 64 KB total queued limit | 64 KB total queued limit |
| **Headers Customization** | Limited (`Blob` content-type required for JSON) | Custom HTTP headers supported |
| **Browser Compatibility** | Chrome 39+, Safari 11.1+, Firefox 31+ | Chrome 66+, Safari 13+, Firefox 112+ |

### Recommendation Heuristic
- For basic analytics telemetry flushes, prefer `navigator.sendBeacon()`.
- For REST API updates requiring custom auth headers or non-POST methods, use `fetch()` with `keepalive: true`.

---

## 5. Media & Autoplay Policy Interaction

When resuming audio or video elements on tab return (`visibilityState` changes to `'visible'`):
- Browsers may reject `.play()` promises if the document lacks user gesture engagement.
- Always handle rejection promises cleanly:
```javascript
const playPromise = videoElement.play();
if (playPromise !== undefined) {
  playPromise.catch(error => {
    // Autoplay prevented by browser policy
    console.warn('Playback resume blocked on tab restore:', error);
  });
}
```
