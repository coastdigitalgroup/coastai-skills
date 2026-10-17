# Network Heuristics and "Lie-Fi" Technical Reference

## The Limitations of `navigator.onLine`

The W3C HTML specification defines `navigator.onLine` as a boolean indicating whether the browser is currently connected to a network interface. However, its implementation in modern browsers introduces critical edge cases that frontends must account for:

1. **False Positives (The "Lie-Fi" Problem):** `navigator.onLine` returns `true` if the device is connected to a local area network (LAN), Wi-Fi router, or cellular tower, even if the upstream Internet connection is completely severed, captive portal throttled, or DNS resolution is failing.
2. **False Negatives:** In certain desktop configurations with virtualization software or VPN adapters, `navigator.onLine` may incorrectly report `false` even though internet access is fully functional.

---

## Active Probe Strategies for Reachability Detection

To accurately determine internet reachability, combine event-driven listeners with active HTTP HEAD probes.

### Active Ping Probe Heuristics

- **Method:** `HEAD` request (minimizes transfer size by returning headers only with zero body).
- **URL Target:** A lightweight, highly available endpoint hosted on the same origin (e.g., `/api/ping` or `/favicon.ico`). Avoid cross-origin probes without CORS headers.
- **Cache Busting:** Append a unique timestamp query parameter (`?_=${Date.now()}`) and include `cache: 'no-store'` or `Cache-Control: no-cache` headers to prevent browser HTTP cache interception.
- **Timeout Management:** Enforce an `AbortController` timeout of 3,000ms to 5,000ms. If the network probe hangs past 5 seconds, classify the connection as degraded or offline.

---

## Exponential Backoff with Full Jitter Algorithm

When retrying requests after connection recovery or receiving 429 / 5xx HTTP responses, simple fixed-interval retries create a "thundering herd" effect across active clients.

### AWS/Standard Recommended Formula

$$\text{Sleep Delay} = \text{random}(0, \min(\text{max\_delay}, \text{base\_delay} \times 2^{\text{attempt}}))$$

```javascript
function getJitteredDelay(attempt, baseDelay = 1000, maxDelay = 16000) {
  const exponentialDelay = Math.min(maxDelay, baseDelay * Math.pow(2, attempt));
  // Full Jitter randomizes delay between 0 and exponentialDelay
  return Math.floor(Math.random() * exponentialDelay);
}
```

### Delay Distribution Table (Base = 1000ms, Max = 16000ms)

| Attempt # | Exponential Cap | Jittered Delay Range | Expected Average Delay |
| :--- | :--- | :--- | :--- |
| **0** | $1000\text{ms}$ | $0 - 1000\text{ms}$ | $500\text{ms}$ |
| **1** | $2000\text{ms}$ | $0 - 2000\text{ms}$ | $1000\text{ms}$ |
| **2** | $4000\text{ms}$ | $0 - 4000\text{ms}$ | $2000\text{ms}$ |
| **3** | $8000\text{ms}$ | $0 - 8000\text{ms}$ | $4000\text{ms}$ |
| **4** | $16000\text{ms}$ | $0 - 16000\text{ms}$ | $8000\text{ms}$ |

---

## Integration with Service Worker Background Sync API

For applications requiring queue replays even when the user closes the browser tab or navigates away, delegate the offline queue replay to the Service Worker `sync` event.

```javascript
// Register Background Sync in Main Thread
async function registerMutationSync(tag = 'sync-offline-mutations') {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register(tag);
  }
}

// In Service Worker (sw.js)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-mutations') {
    event.waitUntil(replayQueuedMutationsInWorker());
  }
});
```
