---
name: cross-tab-state-synchronization
description:
  Synchronize application state, user authentication sessions, shopping cart actions, and background tasks across multiple open browser tabs using BroadcastChannel, StorageEvent fallbacks, and Web Locks API leader election.
---

# Cross-Tab State Synchronization

## Purpose

The Cross-Tab State Synchronization skill provides a production-grade frontend architecture, JavaScript state controller, fallback protocol, and coordination strategy for sharing state and coordinating operations across multiple browser tabs or windows under the same origin.

It solves critical multi-tab web application problems including:
- **Silent Session Mismatches & Security Drift:** User logs out or changes accounts in Tab A, but Tab B remains silently active with stale tokens or sensitive account data.
- **Duplicate Execution & Race Conditions:** Multiple open tabs simultaneously initiating identical API network requests, background polling, or WebSocket connections.
- **Cart & Form Desynchronization:** User adds or updates an item in a shopping cart or multi-step form in Tab A, but Tab B displays outdated totals, leading to checkout errors or inventory conflicts.
- **Uncoordinated Background Processing:** Redundant offline queue syncing, audio/video playback conflicts, or local database migrations executing concurrently in multiple tabs.

---

## Use Cases

- **Authentication Session Management:** Immediately logging out, refreshing tokens, or displaying session expiration alerts across all open tabs when an auth state change occurs in any single tab.
- **Real-Time E-Commerce Cart & Wishlist Sync:** Updating cart item counts, total prices, and promo code applications instantly across all open tabs without full page reloads.
- **Single Leader Tab Election:** Electing a single "primary" or "leader" tab using the Web Locks API or heartbeat mechanism to manage single-instance tasks like WebSocket connections, SSE event streams, or background timer polling.
- **Draft & Multi-Step Form Syncing:** Syncing auto-saved form fields or multi-step progress state across tabs so users can seamlessly switch windows.
- **Cross-Tab Audio/Video Coordination:** Automatically pausing media playback in inactive tabs when the user starts playing media in another tab.

---

## When NOT to Use

- **Cross-Origin Contexts:** Attempting to communicate between different origins (e.g., `app.example.com` and `store.anotherdomain.com`). `BroadcastChannel`, `localStorage`, and Web Locks are strictly bound by the Same-Origin Policy. Use `window.postMessage()` with explicit target origin validation for cross-origin iframe communication.
- **High-Frequency Binary / Frame Data Streams:** Transmitting heavy binary blobs, video frame buffers, or 60fps animations across tabs. `BroadcastChannel` serializes messages via the Structured Clone Algorithm; high-rate streaming will freeze the main thread. Use Web Workers or SharedArrayBuffer instead.
- **Server-Authoritative Real-Time Data:** Relying solely on client-side cross-tab messaging for critical financial transactions or inventory reservation without backend validation. Client state sync enhances UX, but the server remains the single source of truth.

---

## Inputs

1. **Channel Name:** Unique same-origin identifier string for the communication channel (e.g., `app_state_sync_v1`).
2. **Event Payload Schema:** Message structure containing event type, payload data, timestamp, sender tab ID, and sequence number.
3. **Fallback Options:** Configuration for supporting browsers without `BroadcastChannel` or `navigator.locks` (e.g., `localStorage` `storage` events and `localStorage` timestamp locks).
4. **Leader Election Settings:** Lock duration, renewal intervals, and leader state change callbacks.

---

## Outputs

1. **Framework-Agnostic Sync Controller (`CrossTabStateManager`):** Robust JavaScript instance managing channel setup, message dispatching, fallback routing, and message deduplication.
2. **Leader Election Mechanism:** Guaranteed single-tab leader designation for managing shared singletons (e.g., WebSocket master tab).
3. **Reactive Event Bus:** Event emitter interfaces for UI components to listen and react to cross-tab state changes without direct DOM coupling.

---

## Workflow

### 1. Initialize Dual-Channel Transport (BroadcastChannel + StorageEvent Fallback)
Establish a reliable communication channel that defaults to the high-performance `BroadcastChannel` API and seamlessly degrades to `localStorage` `storage` event listener for legacy environments or restricted container webviews.

```javascript
// Check native BroadcastChannel support
const HAS_BROADCAST_CHANNEL = typeof window !== 'undefined' && 'BroadcastChannel' in window;

class CrossTabBus {
  constructor(channelName) {
    this.channelName = channelName;
    this.tabId = `tab_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
    this.listeners = new Set();

    if (HAS_BROADCAST_CHANNEL) {
      this.channel = new BroadcastChannel(this.channelName);
      this.channel.onmessage = (event) => this._handleIncoming(event.data);
    } else {
      window.addEventListener('storage', this._handleStorageEvent.bind(this));
    }
  }

  _handleIncoming(message) {
    // Ignore self-emitted messages
    if (!message || message.senderId === this.tabId) return;
    this.listeners.forEach((callback) => callback(message));
  }

  _handleStorageEvent(event) {
    if (event.key !== `__xtab_msg_${this.channelName}__` || !event.newValue) return;
    try {
      const message = JSON.parse(event.newValue);
      this._handleIncoming(message);
    } catch (e) {
      // Ignore parse errors
    }
  }
}
```

### 2. Format Structured & Sequenced Messages
Prevent message echo, race conditions, and out-of-order processing by enriching every payload with standard metadata: sender tab ID, high-resolution timestamp, sequence counter, and event name.

```javascript
// Payload structure standard
const message = {
  type: 'CART_UPDATED',
  senderId: this.tabId,
  timestamp: Date.now(),
  seq: ++this.sequenceNumber,
  payload: {
    itemCount: 4,
    total: 129.99,
    updatedItemId: 'prod_987'
  }
};
```

### 3. Implement Single-Tab Leader Election (Web Locks API + Heartbeat Fallback)
When multiple tabs are open, designate exactly one tab as the "Leader" to handle shared background operations (WebSocket connections, SSE streams, periodic polling).

- Primary: Use `navigator.locks.request()` with `{ ifAvailable: true }` or a persistent async lock loop.
- Fallback: Use `localStorage` timestamp heartbeats when `navigator.locks` is unavailable.

```javascript
async function acquireLeaderRole(onLeaderStatusChange) {
  if ('locks' in navigator) {
    navigator.locks.request('app_primary_leader_lock', async (lock) => {
      // Lock acquired — this tab is now the leader
      onLeaderStatusChange(true);

      // Hold the lock indefinitely until tab closes or reloads
      await new Promise(() => {});
    }).catch(() => {
      onLeaderStatusChange(false);
    });
  } else {
    // Legacy fallback using localStorage heartbeat
    startHeartbeatLeaderElection(onLeaderStatusChange);
  }
}
```

### 4. Wire UI State Reconciliation & Teardown
Bind UI components or state managers (e.g., Redux, Pinia, Zustand, dynamic DOM components) to cross-tab event listeners. Ensure proper unregistering of listeners and channel closure on tab unload to prevent memory leaks and dangling locks.

```javascript
// Unload cleanup
window.addEventListener('pagehide', () => {
  if (this.channel) {
    this.channel.close();
  }
  window.removeEventListener('storage', this._handleStorageEvent);
});
```

---

## Decision Rules

### Communication & Coordination Strategy Matrix

| Use Case | Recommended Transport | Synchronization Pattern | Fallback Mechanism |
| :--- | :--- | :--- | :--- |
| **Auth Logout / Token Invalidation** | `BroadcastChannel` | Immediate Broadcast | `localStorage` trigger key update (`__auth_logout__`) |
| **Cart / Order State Update** | `BroadcastChannel` | State Merge / Delta Sync | `localStorage` item write + `storage` event |
| **WebSocket Single Connection** | Web Locks API (`navigator.locks`) | Leader Election | `localStorage` Heartbeat (5000ms TTL, 2000ms ping) |
| **Draft Form Input Synchronization** | `BroadcastChannel` | Debounced Broadcast (300ms) | `localStorage` key overwrite |
| **Cross-Tab Media Pause (Audio/Video)** | `BroadcastChannel` | Notification Broadcast | `localStorage` ephemeral key write |

---

## Constraints

- **Same-Origin Boundary:** Strictly operates only within identical origin schemes (protocol + domain + port). Cross-subdomain or cross-domain communication cannot use this mechanism directly.
- **Structured Clone Limitations:** Data payloads sent via `BroadcastChannel` must be serializable by the Structured Clone Algorithm. Functions, DOM nodes, Symbol instances, and non-serializable objects cannot be transmitted.
- **Browser Lifecycle & Background Throttling:** Background tabs in desktop browsers and background pages on iOS Safari/Chrome Android undergo heavy CPU and timer throttling. Leader election and heartbeats must account for delayed timer firing (e.g., using `Page Visibility API` state checks).
- **Storage Quota & StorageEvent Quirks:** The `storage` event ONLY fires in other open tabs, NEVER in the tab that modified `localStorage`. Furthermore, frequent writes to `localStorage` write to physical disk/flash storage and can cause UI stutter if overused.

---

## Non-Goals

- Replacing backend database persistence or server websocket architectures.
- Cross-origin messaging between untrusted third-party domains.
- Complex conflict-free replicated data types (CRDTs) for multi-user collaborative editors (e.g., Yjs/Automerge).
- Bypassing browser-enforced background tab throttling limits.

---

## Common Failure Patterns

- **Self-Echo Infinite Loops:** Processing incoming cross-tab messages without checking `senderId === currentTabId`. If a handler re-emits a broadcast upon receiving one, tabs enter an infinite broadcast loop.
- **Relying on StorageEvent in the Sender Tab:** Expecting `window.addEventListener('storage')` to fire in the tab that wrote the value to `localStorage`. `storage` events ONLY fire in secondary tabs.
- **Uncleaned Storage Garbage:** Writing temporary broadcast messages to `localStorage` without deleting or overwriting them, eventually filling the 5MB domain storage quota.
- **Stale Leader Deadlocks:** Implementing custom leader election with `localStorage` without timeout expiration or `pagehide`/`beforeunload` teardown, leaving secondary tabs stuck in non-leader state when the leader tab crashes or is force-killed.
- **Ignoring Structured Clone Errors:** Attempting to pass complex object graphs containing class instances, methods, or cyclic references through `BroadcastChannel.postMessage()`, causing uncaught `DataCloneError` exceptions.

---

## Validation Steps

### 1. Multi-Tab Manual Verification
- [ ] Open two or more browser windows/tabs to the same origin URL.
- [ ] Trigger an action in Tab A (e.g., click "Log Out" or "Add to Cart").
- [ ] Confirm Tab B immediately updates its UI state (e.g., redirects to login or updates cart badge) within < 50ms.
- [ ] Verify Tab A does NOT process its own broadcast or trigger redundant UI state resets.

### 2. Leader Election Resilience Test
- [ ] Open 3 tabs simultaneously. Confirm exactly ONE tab acquires leader status (e.g., inspect console output or leader indicator badge).
- [ ] Close the leader tab. Confirm one of the remaining two tabs automatically inherits leader status within 2 seconds.
- [ ] Re-open a new tab. Confirm it assumes non-leader follower status without interrupting the active leader.

### 3. Fallback Compatibility Test
- [ ] Disable or mock `BroadcastChannel` (`window.BroadcastChannel = undefined`).
- [ ] Verify the application seamlessly falls back to `localStorage` `storage` events without throwing runtime errors or missing state updates.
