# Prioritized Task Scheduling Audit Checklist

Use this checklist to audit and evaluate frontend task execution, main-thread blocking behavior, INP resilience, and proper implementation of the Prioritized Task Scheduling API (`scheduler.postTask`, `scheduler.yield`, `TaskController`).

---

## 1. Feature Detection & Fallback Audit

- [ ] **Native `scheduler.postTask` Feature Detection:** Does code verify `('scheduler' in window && 'postTask' in window.scheduler)` before calling native scheduling methods?
- [ ] **Native `scheduler.yield` Feature Detection:** Does code verify `('scheduler' in window && 'yield' in window.scheduler)` before calling native yielding?
- [ ] **Macrotask Fallback Strategy:** In environments without native scheduler support, does fallback logic utilize `MessageChannel` or `requestIdleCallback` rather than unthrottled `setTimeout(0)`?
- [ ] **Graceful Degradation:** Does application functionality remain 100% operational when native scheduler APIs are missing or disabled?

---

## 2. Task Classification & Priority Mapping

- [ ] **`user-blocking` Usage Audit:** Are `user-blocking` tasks reserved exclusively for direct user interactions (clicks, keypresses, tab switches) that require immediate visual updates?
- [ ] **`user-visible` Usage Audit:** Are standard UI rendering, list expansion, and data hydration tasks classified as `user-visible`?
- [ ] **`background` Usage Audit:** Are analytics logging, prefetching, offline sync, and cache warming operations correctly assigned to `background` priority?
- [ ] **Priority Inversion Avoidance:** Are low-priority background tasks prevented from spawning high-priority `user-blocking` chains?

---

## 3. Cooperative Yielding & Loop Chunking

- [ ] **Time Slice Budgeting:** Do long loops (>16ms) evaluate an execution time budget (e.g. 10ms–15ms) before yielding?
- [ ] **`scheduler.yield()` Context Preservation:** Is `scheduler.yield()` used inside long loops to preserve queue priority and continuation state without resetting priority?
- [ ] **Granularity Check:** Are tasks chunked into reasonable units (>1ms) to avoid high scheduler wrapper overhead?
- [ ] **No Monolithic Synchronous Blocks:** Are loops with >1,000 iterations or heavy DOM mutations properly segmented to keep individual tasks < 50ms?

---

## 4. Lifecycle, Escalation & Cancellation

- [ ] **`TaskController` Abort Signal Handling:** Do asynchronous scheduled tasks accept `signal` and check `signal.aborted` prior to executing expensive work?
- [ ] **Unhandled Abort Rejection Handling:** Are `AbortError` rejections caught and handled cleanly (e.g., via `try/catch` or `.catch()`) without logging noisy error exceptions to telemetry?
- [ ] **Dynamic Priority Escalation:** When a user hovers, focuses, or interacts with a queued background operation, is `TaskController.setPriority('user-blocking')` invoked to escalate queue position?
- [ ] **Stale Task Purging:** Are pending tasks automatically aborted when component unmounts or search query updates occur?

---

## 5. DevTools Verification & INP Metrics

- [ ] **Chrome DevTools Performance Trace:** Does recording a trace during heavy operations show zero red-flagged Long Tasks (>50ms)?
- [ ] **Interaction to Next Paint (INP):** Does INP measurement remain under 200ms (Good) under heavy main-thread load during user clicks/keypresses?
- [ ] **Frame Rate Stability:** Does the browser main thread maintain ~60fps rendering without visible animation stutter during chunked data processing?
