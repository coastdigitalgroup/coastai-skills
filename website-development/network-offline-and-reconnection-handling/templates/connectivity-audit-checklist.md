# Connectivity & Offline Resilience Audit Checklist

Use this checklist to audit and verify frontend web applications for resilience against network drops, "lie-fi", offline user mutations, and accessibility announcements upon status changes.

---

## 1. Network Detection & "Lie-Fi" Validation

- [ ] **Dual Signal Listener:** Does the application register listeners for both `window.addEventListener('online')` and `window.addEventListener('offline')`?
- [ ] **Active Reachability Probes:** Does the application avoid relying solely on `navigator.onLine` by executing a lightweight HTTP probe (HEAD or GET request with `cache: 'no-store'`)?
- [ ] **Captive Portal Handling:** Is "lie-fi" (connected to Wi-Fi/router but internet blocked or redirected) correctly identified and handled as an offline/degraded state?
- [ ] **Probe Timeout Limits:** Are probe requests bounded by a strict `AbortController` timeout (e.g., <= 4000ms) to prevent hanging UI states?

---

## 2. Offline Action Queueing & Persistence

- [ ] **Mutation Interception:** Are POST/PUT/DELETE user operations safely intercepted and saved when offline instead of throwing uncaught network errors?
- [ ] **Storage Mechanism Selection:** Is `localStorage` used for simple metadata or IndexedDB used for larger payloads (e.g., file attachments or large form objects)?
- [ ] **Idempotency Headers:** Do queued requests include unique request IDs (`X-Request-ID` or client mutation IDs) to avoid creating duplicate records on server replay?
- [ ] **Queue Retention Controls:** Are offline items capped in age or count to prevent storage quota exhaustion and stale data replay?

---

## 3. Reconnection & Backoff Retry Strategy

- [ ] **Sequential Queue Replay:** Are queued actions processed sequentially upon reconnection to preserve operation order?
- [ ] **Exponential Backoff with Jitter:** Do retries for transient HTTP errors (429, 502, 503, 504) incorporate exponential backoff with randomized Full Jitter?
- [ ] **Client Error Fast-Fail:** Are non-retryable 40x errors (e.g., 400 Bad Request, 422 Unprocessable Entity) removed from the queue and surfaced to the user without infinite retry loops?

---

## 4. Accessibility & UI Communication

- [ ] **ARIA Live Region Setup:** Is network status announced via a container with `role="status"` and `aria-live="polite"`?
- [ ] **Non-Intrusive Banner:** Are network warnings displayed clearly without blocking essential keyboard navigation or trapping focus?
- [ ] **Status Auto-Dismissal:** Do success banners ("Back online. All changes synced.") dismiss automatically after a reasonable timeout (e.g., 4 seconds)?
