# BroadcastChannel, Web Locks & Storage Heuristics

## Overview

Modern web applications frequently run across multiple simultaneous tabs or windows. Coordinating state between these contexts is essential for maintaining session integrity, avoiding duplicate API calls, and delivering seamless user experiences.

This reference guide documents browser specifications, execution behaviors, performance characteristics, and edge cases for cross-tab synchronization APIs.

---

## 1. Transport Mechanisms Comparison

| Transport | Latency | Scope | Serialization | Storage Impact | Primary Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`BroadcastChannel`** | Sub-millisecond (~0.5ms - 2ms) | Same-Origin | Structured Clone Algorithm | None (in-memory IPC) | Primary messaging transport for modern browsers. |
| **`StorageEvent` (`localStorage`)** | Low-Medium (~5ms - 25ms) | Same-Origin | JSON string (Strings only) | Synchronous disk write (quota limit 5MB) | Automatic fallback for legacy environments. |
| **`Web Locks API` (`navigator.locks`)** | Low (~1ms - 5ms) | Same-Origin | Lock names / string identifiers | None | Single-tab Leader election & resource locking. |
| **`SharedWorker`** | Low (~1ms - 3ms) | Same-Origin | Structured Clone Algorithm | None | Complex shared state processing (limited iOS Safari support). |

---

## 2. BroadcastChannel API Specifics

### Browser Support
`BroadcastChannel` is supported across all evergreen browsers:
- Chrome 54+
- Firefox 38+
- Safari 15.4+ (iOS & macOS)
- Edge 79+

### Serialization & Structured Clone
Messages sent via `postMessage()` are copied using the **Structured Clone Algorithm**.

- **Supported Types:** Primitives, Arrays, Plain Objects, `Date`, `RegExp`, `Blob`, `File`, `ArrayBuffer`, `Map`, `Set`.
- **Unsupported Types:** Functions, DOM elements, Error objects (in older specs), class instances with methods (methods are stripped), Symbol keys.
- **Error Handling:** Attempting to post non-cloneable objects throws a DOMException `DataCloneError`.

### Life Cycle & Garbge Collection
- Opening a channel binds an IPC port.
- Failing to call `channel.close()` when components unmount or windows unload can cause memory leaks in single-page applications (SPAs).
- `BroadcastChannel` instances automatically close when their owning `window` document is unloaded.

---

## 3. StorageEvent Fallback Mechanics

When `BroadcastChannel` is unavailable (or in restricted webview containers), `localStorage` combined with the `storage` event provides a universal fallback.

### Key Rules & Quirks
1. **No Self-Notification:** Writing to `localStorage` fires the `window.addEventListener('storage')` event **only in other tabs**, never in the tab that executed `localStorage.setItem()`.
2. **Identical Value Suppress:** If `localStorage.setItem('key', 'value')` is called with the exact same value currently in storage, the browser **will not fire** a `storage` event.
   - *Workaround:* Append a high-resolution timestamp or random nonce to the serialized JSON payload so every broadcast write produces a unique string.
3. **Storage Quota:** `localStorage` has a strict per-origin quota (~5MB). Temporary cross-tab messages must be lightweight and cleared or overwritten promptly to prevent storage exhaustion.
4. **Synchronous I/O:** `localStorage` calls execute synchronously on the main thread. Frequent rapid writes can cause UI main-thread layout or paint stutter.

---

## 4. Web Locks API Leader Election Strategy

The Web Locks API (`navigator.locks`) allows code running in one tab or worker to request an asynchronous lock on a named resource while work is in progress.

### How Leader Election Works
To elect a single primary tab:
1. Every tab requests an exclusive lock with a well-known name (e.g., `app_primary_leader_lock`).
2. The browser grants the lock to the **first tab** that requested it.
3. The leader tab returns an unresolved `Promise` within the lock request callback, keeping the lock active for the entire duration of the tab's lifetime.
4. If the leader tab closes, crashes, or navigates away, the browser automatically releases the lock.
5. The browser immediately grants the lock to the next tab waiting in the lock queue, electing it as the new leader seamlessly without polling.

```javascript
// Single Leader Election Pattern
navigator.locks.request('app_primary_leader_lock', async (lock) => {
  // Lock acquired: This tab is now the LEADER
  notifyLeaderState(true);

  // Hold the lock until tab unloads or crashes
  await new Promise((resolve) => {
    window.addEventListener('pagehide', resolve, { once: true });
  });

  notifyLeaderState(false);
});
```

---

## 5. Security & Isolation Guidelines

1. **Same-Origin Policy Enforcement:** Cross-tab state synchronization strictly respects the Same-Origin Policy (`protocol://domain:port`). Tabs on `https://example.com` cannot broadcast to or receive messages from `https://sub.example.com` or `http://example.com`.
2. **Sensitive Data Exposure:** Avoid broadcasting raw secrets, private tokens, or sensitive PII directly over channels if the payload might be logged in non-volatile storage or inspected by malicious browser extensions.
3. **Input Sanitization:** Treat cross-tab message payloads as untrusted user input before rendering them into the DOM or passing them into unsafe evaluation functions. Always sanitize HTML strings or use safe DOM node assignment (`element.textContent = ...`).
