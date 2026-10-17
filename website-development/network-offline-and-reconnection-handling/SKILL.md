---
name: network-offline-and-reconnection-handling
description: Detect offline network transitions and 'lie-fi', queue failed user actions, retry operations with exponential backoff and jitter, and notify users accessibly upon reconnection.
---

# Network Offline and Reconnection Handling

## Purpose

The Network Offline and Reconnection Handling skill provides a production-grade, framework-agnostic protocol for managing client-side network connectivity transitions, detecting "lie-fi" (connected to Wi-Fi/cellular without internet reachability), queueing offline mutations, retrying failed network requests using exponential backoff with full jitter, and communicating network status changes accessibly via ARIA live regions.

When network connectivity drops or degrades, unhandled frontend requests fail abruptly, leading to lost form entries, corrupt application states, uninformative UI error bursts, and poor user trust. Relying solely on `navigator.onLine` is insufficient because browsers report `navigator.onLine === true` when connected to a local router or captive portal even if external network traffic is completely blocked.

Implementing this skill ensures web applications remain resilient against intermittent network drops, automatically queue user actions for sync upon connection recovery, and give clear, non-intrusive feedback without blocking the main UI thread.

---

## Use Cases

- **Form and Mutation Resilience:** Retaining user-submitted forms, comments, star ratings, or configuration changes when submitted during temporary network loss or weak connectivity.
- **Dynamic Connection Monitoring:** Real-time visual and auditory status indicators (online banner, offline warning, re-connecting state) that stay synchronized with actual network availability.
- **"Lie-Fi" & Captive Portal Detection:** Proactively validating actual internet reachability via lightweight HTTP HEAD/GET probes when `navigator.onLine` transitions to `true` or requests fail unexpectedly.
- **Exponential Backoff Request Retries:** Automatically retrying transient network errors (HTTP 429, 502, 503, 504, fetch network errors) with randomized jitter to prevent server thundering herd problems upon reconnection.
- **Offline Action Queue Synchronization:** Storing pending mutation payloads in IndexedDB or `localStorage`, processing queued requests sequentially upon connection recovery, and updating local UI state seamlessly.

---

## When NOT to Use

- **Service Worker Caching & Offline Asset Delivery:** For caching static HTML shells, CSS, JS bundles, or images for offline viewing, use `service-worker-offline-and-cache-management`.
- **Pure Local Data Storage:** For persistent offline client storage engines without network synchronization logic, use `client-side-storage-management` or `indexeddb-management`.
- **Concurrency & Race Condition Handling:** For managing multiple in-flight concurrent fetches or canceling outdated fetch requests on user input, use `fetch-race-condition-management`.

---

## Inputs

1. **Connectivity Event Triggers:** Browser `online` and `offline` DOM events on `window`.
2. **Ping Probe Configuration:** An endpoint URL (e.g., `/api/ping` or `/favicon.ico?probe`), check interval, and timeout threshold for active reachability validation.
3. **Mutation Action Payload:** Operation details (URL, HTTP method, headers, body, timestamp, retry count) representing a user action performed while offline or during connection failure.
4. **Retry Parameters:** Base delay, maximum delay, maximum retry attempts, and HTTP status codes eligible for automatic retry (e.g., 408, 429, 502, 503, 504).

---

## Outputs

1. **Network Connectivity Manager (`NetworkConnectivityManager`):** Portable JavaScript controller class managing connection state detection, ping probes, retry loops, and offline event dispatching.
2. **Offline Mutation Queue:** Persistent client-side store (IndexedDB/localStorage) holding pending user actions with replay metadata.
3. **Accessible Status Banner UI:** WCAG AA compliant toast/banner component utilizing `aria-live="polite"` or `aria-live="assertive"` to announce network status changes to screen readers.

---

## Workflow

```text
  +-------------------------------------------------------------------+
  |                  Window 'online' / 'offline' Event               |
  +----------------------------------+--------------------------------+
                                     |
                                     v
  +-------------------------------------------------------------------+
  |               Check navigator.onLine & Execute Ping Probe          |
  |               (Detects "Lie-Fi" / Captive Portals)                |
  +----------------------------------+--------------------------------+
                                     |
                   +-----------------+-----------------+
                   |                                   |
                   v                                   v
          [Connection Verified]                 [Connection Lost]
                   |                                   |
                   v                                   v
  +---------------------------------+  +---------------------------------+
  | 1. Set status = ONLINE          |  | 1. Set status = OFFLINE         |
  | 2. Announce via ARIA live region|  | 2. Announce via ARIA live region|
  | 3. Process Pending Offline Queue|  | 3. Intercept mutation requests  |
  |    with Exponential Backoff     |  | 4. Save actions to Offline Queue|
  +---------------------------------+  +---------------------------------+
```

### 1. Initialize Network Listener & Ping Validation

Listen for `window.addEventListener('online')` and `window.addEventListener('offline')`. Because `navigator.onLine` can return false positives, perform an active probe (lightweight `fetch()` with `Cache-Control: no-cache` and a short timeout) whenever an `online` event fires or an unexpected network error occurs.

```javascript
class NetworkConnectivityManager {
  constructor(options = {}) {
    this.pingUrl = options.pingUrl || '/api/ping';
    this.pingInterval = options.pingInterval || 30000;
    this.timeout = options.timeout || 5000;
    this.isOnline = navigator.onLine;
    this.listeners = new Set();

    this.handleOnline = this.handleOnline.bind(this);
    this.handleOffline = this.handleOffline.bind(this);

    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  async verifyReachability() {
    if (!navigator.onLine) {
      this.updateState(false);
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.pingUrl}?_=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const reachable = response.ok || response.status === 204;
      this.updateState(reachable);
      return reachable;
    } catch {
      this.updateState(false);
      return false;
    }
  }

  handleOnline() {
    this.verifyReachability();
  }

  handleOffline() {
    this.updateState(false);
  }

  updateState(onlineState) {
    if (this.isOnline !== onlineState) {
      this.isOnline = onlineState;
      this.listeners.forEach((callback) => callback(this.isOnline));
    }
  }
}
```

### 2. Implement Exponential Backoff with Jitter for Fetch Retries

When retrying transient server errors or connection glitches, use exponential backoff (`delay = base * 2^attempt`) combined with Full Jitter (`random(0, delay)`) to prevent client synchronization thundering herds.

```javascript
async function fetchWithBackoff(url, options = {}, retryConfig = {}) {
  const {
    maxRetries = 4,
    baseDelay = 1000,
    maxDelay = 16000,
    retryableStatuses = [408, 429, 502, 503, 504],
  } = retryConfig;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok || (!retryableStatuses.includes(response.status) && attempt === maxRetries)) {
        return response;
      }

      if (!retryableStatuses.includes(response.status)) {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (err) {
      if (attempt === maxRetries) throw err;
    }

    // Calculate Exponential Backoff with Full Jitter
    const exponentialDelay = Math.min(maxDelay, baseDelay * Math.pow(2, attempt));
    const jitteredDelay = Math.floor(Math.random() * exponentialDelay);

    await new Promise((resolve) => setTimeout(resolve, jitteredDelay));
  }
}
```

### 3. Queue Offline Mutations in Client Storage

When the user submits a mutation (e.g., POST, PUT, DELETE) while offline, serializing the request metadata into IndexedDB or `localStorage` ensures data is saved locally until the connection is restored.

```javascript
class OfflineQueue {
  constructor(storageKey = 'app_offline_queue') {
    this.storageKey = storageKey;
  }

  enqueue(action) {
    const queue = this.getQueue();
    queue.push({
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      attempts: 0,
      ...action,
    });
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
  }

  getQueue() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  remove(id) {
    const queue = this.getQueue().filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}
```

### 4. Replay Queued Mutations upon Reconnection

When network connectivity is restored and verified, replay queued actions sequentially. If a queued item succeeds, remove it from the queue; if an unrecoverable error occurs (e.g. 400 Bad Request or 409 Conflict), flag it for user resolution.

```javascript
async function flushOfflineQueue(queueManager, connectivityManager) {
  if (!connectivityManager.isOnline) return;

  const queue = queueManager.getQueue();
  if (queue.length === 0) return;

  for (const item of queue) {
    try {
      const response = await fetch(item.url, {
        method: item.method || 'POST',
        headers: item.headers || { 'Content-Type': 'application/json' },
        body: typeof item.body === 'object' ? JSON.stringify(item.body) : item.body,
      });

      if (response.ok) {
        queueManager.remove(item.id);
        window.dispatchEvent(new CustomEvent('offlineItemSynced', { detail: item }));
      } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        // Non-retryable client error; abort item to avoid infinite loop
        queueManager.remove(item.id);
        window.dispatchEvent(new CustomEvent('offlineItemFailed', { detail: { item, status: response.status } }));
      } else {
        // Server error or rate limit; stop flushing until next network event
        break;
      }
    } catch {
      // Network failure during flush; abort remaining processing
      break;
    }
  }
}
```

### 5. Announce Status Accessibly via ARIA Live Regions

Ensure network connectivity changes are communicated visually and read aloud by screen readers without stealing focus.

```html
<!-- Accessible Status Banner -->
<div id="network-status-banner"
     role="status"
     aria-live="polite"
     aria-atomic="true"
     class="network-banner network-banner--hidden">
  <span id="network-status-text"></span>
</div>
```

```javascript
function updateNetworkBanner(isOnline, pendingCount = 0) {
  const banner = document.getElementById('network-status-banner');
  const textContainer = document.getElementById('network-status-text');

  if (!isOnline) {
    banner.className = 'network-banner network-banner--offline';
    textContainer.textContent = 'You are currently offline. Changes will be saved locally and synced when connection is restored.';
  } else if (pendingCount > 0) {
    banner.className = 'network-banner network-banner--syncing';
    textContainer.textContent = `Back online. Syncing ${pendingCount} pending offline action(s)...`;
  } else {
    banner.className = 'network-banner network-banner--online';
    textContainer.textContent = 'Connection restored. All changes are up to date.';

    // Hide banner after 4 seconds when online
    setTimeout(() => {
      banner.className = 'network-banner network-banner--hidden';
    }, 4000);
  }
}
```

---

## Decision Rules

### Network Resilience Matrix

| Situation / Error Type | Detection Signal | Primary Action | UI Communication |
| :--- | :--- | :--- | :--- |
| **Complete Network Disconnect** | `navigator.onLine === false` or `offline` event | Set offline status, route mutations to queue | Show polite offline status banner (`aria-live="polite"`) |
| **"Lie-Fi" / Captive Portal** | `navigator.onLine === true` but ping probe fails | Treat as offline, pause auto-refresh timers | Warn user that internet is unreachable despite active connection |
| **Transient Error (429, 502, 503, 504)** | HTTP status code in retry list | Retry with Exponential Backoff + Jitter | Show subtle inline spinner or "Retrying..." state |
| **Fatal Client Error (400, 401, 403, 422)** | HTTP status 40x | Remove from queue, do not auto-retry | Show targeted inline validation or auth error |
| **Reconnection with Pending Queue** | Ping probe succeeds & `queue.length > 0` | Sequential flush of queued mutations | Show syncing banner, then announce completion |

---

## Constraints

- **Storage Limits for Queues:** `localStorage` is synchronously limited to ~5MB per origin. For large payloads (e.g., file uploads, rich media), store offline queue items in **IndexedDB**.
- **CORS Requirements for Ping Endpoints:** Ping probe requests (`fetch('/api/ping')`) must return clean CORS headers (`Access-Control-Allow-Origin`) if hosted on a separate domain/CDN.
- **Background Sync Limitations:** Pure frontend JavaScript queueing runs only while the web page is open. For background processing after browser tab closure, register a Service Worker `sync` event (`registration.sync.register('sync-mutations')`) where supported.
- **Idempotency Requirements:** Queued mutations replayed upon reconnection MUST be idempotent or include unique request IDs (`X-Request-ID` or `client_mutation_id`) on the backend to avoid duplicate record creation if a previous attempt partially succeeded.

---

## Non-Goals

- Managing static asset caching or offline HTML shell delivery (see `service-worker-offline-and-cache-management`).
- Polyfilling native OS network stack functionality or mobile network interface swapping.
- Resolving complex two-way database merge conflicts automatically without application domain rules.

---

## Common Failure Patterns

- **Relying Exclusively on `navigator.onLine`:** Assuming `navigator.onLine === true` guarantees network access. Users connected to hotel Wi-Fi without logging in will experience silent failures.
- **Thundering Herd Retries:** Retrying failed network requests at fixed intervals (e.g. every 1 second) across thousands of clients, causing a DDoS-like burst on backend services when servers recover.
- **Unbounded Queue Growth:** Failing to cap the number or age of items in the offline queue, leading to browser quota exceptions or sending outdated, stale operations weeks later.
- **Inaccessible Status Notifications:** Using `<div>` elements without `role="status"` or `aria-live` attributes, preventing screen reader users from knowing they are offline or that form submissions failed.
- **Non-Sequential Queue Processing:** Replaying queued mutations concurrently with `Promise.all()`, causing out-of-order execution bugs (e.g., item deletion replayed before item creation).

---

## Validation Steps

### 1. DevTools Network Throttling Test
- [ ] Open Chrome/Firefox DevTools **Network** tab.
- [ ] Change network throttling preset to **Offline**.
- [ ] Submit a form or trigger a network mutation.
- [ ] Verify that the offline status banner appears, `aria-live` reads the status, and the action is saved in the offline queue (`localStorage`/`IndexedDB`).

### 2. "Lie-Fi" Simulation Test
- [ ] Keep network set to **Online**, but mock the ping endpoint to return `504 Gateway Timeout` or simulate blocked traffic using a local proxy.
- [ ] Trigger an action and verify that the application detects lack of reachability despite `navigator.onLine === true`.

### 3. Reconnection & Queue Replay Test
- [ ] With actions queued while offline, switch network throttling back to **Online**.
- [ ] Verify the ping probe passes, the status banner updates to "Syncing...", actions are sent sequentially, and the queue clears upon completion.

### 4. Screen Reader Accessibility Audit
- [ ] Turn on VoiceOver, NVDA, or JAWS.
- [ ] Toggle offline/online states and verify that status announcements are spoken clearly without interrupting focused form controls.
