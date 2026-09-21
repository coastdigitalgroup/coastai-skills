# Long Animation Frames (LoAF) API Audit & Implementation Checklist

Use this checklist to audit, verify, and debug Long Animation Frames (LoAF) API implementations across production web applications.

---

## 1. Feature Support & Initial Setup

- [ ] **Feature Detection Check:** Ensure the code checks `PerformanceObserver.supportedEntryTypes?.includes('long-animation-frame')` before instantiating the observer.
- [ ] **Buffered History Handled:** Is `observer.observe({ type: 'long-animation-frame', buffered: true })` enabled so that early boot/hydration long frames are captured?
- [ ] **Cross-Origin CORS Headers Verified:** For 1st-party scripts hosted on CDNs or subdomains, are `<script crossorigin="anonymous">` attributes and `Access-Control-Allow-Origin` headers set so `sourceURL` and function names are not masked?
- [ ] **Non-Blocking Callback Execution:** Is the observer callback lightweight (< 1ms execution time) to prevent causing secondary LoAF entries?

---

## 2. Metric Parsing & Script Attribution

- [ ] **Primary Frame Metrics Calculated:**
  - [ ] `duration` (Total frame time in ms)
  - [ ] `blockingDuration` (Time spent > 50ms threshold)
  - [ ] `renderDelay` (`entry.duration - (entry.renderStart - entry.startTime)`)
  - [ ] `styleAndLayoutDuration` (`entry.duration - (entry.styleAndLayoutStart - entry.startTime)`)
- [ ] **Script Attribution Parsing:**
  - [ ] Are `entry.scripts` array items iterated?
  - [ ] Is `script.invokerType` (`user-callback`, `event-listener`, `promise-resolve`, `base-render`) checked?
  - [ ] Is `script.sourceURL` extracted and parsed?
  - [ ] Is `script.sourceFunctionName` handled with an `'(anonymous)'` fallback?
- [ ] **Forced Synchronous Layout Detection:**
  - [ ] Is `script.forcedStyleAndLayoutDuration` checked for non-zero values to pinpoint layout thrashing?
- [ ] **Pause Duration Identified:**
  - [ ] Is `script.pauseDuration` monitored to catch synchronous `alert()`, `prompt()`, or synchronous `XMLHttpRequest` calls?

---

## 3. Interaction Correlation (INP Matching)

- [ ] **Event Listener Correlator Active:** Are `pointerdown`, `keydown`, and `click` listeners attached with `{ capture: true, passive: true }` to capture user input timestamps?
- [ ] **Timestamp Matching Logic:** Are LoAF entries correlated with user interactions occurring within `[startTime - 16ms, startTime + duration]`?
- [ ] **Target Element Context Captured:** Are `event.target.tagName` and `id` included in telemetry to know which UI button/input triggered the frame?

---

## 4. Telemetry Batching & Performance Overhead

- [ ] **Batching Strategy Active:** Are LoAF entries buffered locally and transmitted in periodic batches (e.g., every 10 seconds) rather than sending 1 HTTP request per frame?
- [ ] **Unload Flushing Guard:** Is a `visibilitychange` listener configured to flush remaining buffered records via `navigator.sendBeacon` when the tab is hidden?
- [ ] **Payload Size Limit:** Is the telemetry payload kept < 64KB (the browser limit for `sendBeacon`)?
- [ ] **Sampling Rate Configured:** On high-traffic production sites, is sampling applied (e.g., 5-10% of sessions) to control telemetry bandwidth costs?

---

## 5. Security, Privacy & PII Compliance

- [ ] **URL Parameter Stripping:** Are sensitive query parameters (tokens, emails, session IDs) sanitized from `sourceURL` and page location before sending telemetry?
- [ ] **Input Value Safeguards:** Confirm that user keystrokes or sensitive input field values are NEVER included in script invoker strings.
- [ ] **Third-Party Classification:** Are script origins classified into `first-party`, `known-third-party`, or `browser-extension` to prevent misattributing internal bugs to third parties or browser extensions.

---

## 6. Optimization Verification

- [ ] **DevTools Performance Panel Verification:** Do recorded red-cornered frames in Chrome DevTools match the LoAF entries logged by the observer manager?
- [ ] **Refactoring Validation:** After applying main-thread yielding (`scheduler.yield()`) or batching DOM reads/writes, confirm that subsequent user interactions no longer emit `long-animation-frame` entries.
