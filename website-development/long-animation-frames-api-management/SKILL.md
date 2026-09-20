---
name: long-animation-frames-api-management
description: Capture, parse, attribute, and report main-thread blocking frames (>50ms) using the W3C Long Animation Frames (LoAF) API to diagnose Interaction to Next Paint (INP) bottlenecks and script attributions in production.
---

# Long Animation Frames (LoAF) API Management

## Purpose

The Long Animation Frames (LoAF) API Management skill provides a production-grade framework, JavaScript observer controller, and diagnostic protocol for capturing, parsing, and attributing main-thread rendering delays (>50ms) using the W3C Long Animation Frames API (`PerformanceLongAnimationFrameTiming`).

While the legacy Long Tasks API only identified *that* a task exceeded 50ms without context, the LoAF API (supported in Chrome/Edge 123+) exposes full frame pipeline breakdown metrics—including main-thread delay, style/layout recalcs, render presentation time, and fine-grained `PerformanceScriptTiming` attributions. This includes exact script source URLs, function names, character positions, invoker types (`user-callback`, `event-listener`, `promise-resolve`), and forced synchronous reflow indicators.

This skill enables frontend engineers to diagnose real-user Interaction to Next Paint (INP) regressions in production, isolate 1st-party vs 3rd-party script culpability, and stream structured diagnostic telemetry without introducing main-thread overhead.

---

## Use Cases

- **Production INP Bottleneck Diagnosis:** Pinpointing the exact script, event listener, or microtask causing INP failures (>200ms) on real user devices.
- **Third-Party Script Culpability Auditing:** Attributing UI freezes and dropped frames to specific analytics, ad tags, chat widgets, or A/B testing scripts.
- **Framework Hydration & Render Pass Profiling:** Identifying heavy component re-renders, virtual DOM reconciliation bottlenecks, or unbatched state updates during initial hydration.
- **Forced Synchronous Layout Detection:** Identifying scripts that trigger layout thrashing (`styleAndLayoutStart` and `forcedStyleAndLayoutDuration`) during user interactions.
- **Real User Monitoring (RUM) Telemetry Pipelines:** Capturing structured, rate-limited LoAF records and beaconing them to monitoring services (e.g., Datadog, Sentry, OpenTelemetry) alongside Web Vitals metrics.

---

## When NOT to Use

- **Core Web Vitals Aggregation Only:** If you only need macro-level INP scores (e.g., "INP was 240ms on click") without detailed script-level attribution, use standard `web-vitals` library tracking instead of full LoAF parsing.
- **Off-Main-Thread Calculations:** Computational tasks already running inside Web Workers do not block the main-thread animation loop and will not produce LoAF entries.
- **Network Request Latency Debugging:** LoAF measures main-thread execution and rendering presentation delay, not HTTP network transfer time or TTFB delays.
- **Unsupported Browsers Without Polyfill Fallbacks:** Browsers without LoAF support (e.g., Safari/Firefox as of early 2025) will not generate `long-animation-frame` entries. Fallback logic must degrade gracefully to Long Tasks or standard event listener timing.

---

## Inputs

1. **`PerformanceObserver` Execution Context:** Access to the global `window.PerformanceObserver` API in the browser main thread.
2. **User Interaction Correlators:** Active event listeners for user input (`pointerdown`, `keydown`, `click`) to map LoAF entries directly to user-initiated interactions.
3. **Domain Classification Rules:** Pattern rules (URL regexes or origin arrays) to categorize script sources into `first-party`, `third-party`, `framework`, or `browser-extension`.
4. **Telemetry Endpoint Configuration:** Beacon URL (`navigator.sendBeacon`) or batch callback function for streaming LoAF performance records.

---

## Outputs

1. **Parsed LoAF Performance Entries:** Normalized JavaScript objects containing frame timing breakdowns (`duration`, `blockingDuration`, `renderStart`, `styleAndLayoutDuration`) and script attributions (`sourceURL`, `sourceFunctionName`, `sourceCharPosition`, `invokerType`, `forcedStyleAndLayoutDuration`).
2. **Script Attribution Summary:** Quantified attribution metrics detailing which domain or script contributed the highest blocking duration during user interactions.
3. **Telemetry Payloads:** Compact, JSON-serializable payloads formatted for RUM ingestion without telemetry overhead.
4. **Diagnostic Console Alerts:** Optional developer-mode console warnings highlighting long animation frames with direct links to offending script source locations.

---

## Workflow

### 1. Feature Detection and Observer Initialization
Verify browser support for `long-animation-frame` before instantiating the `PerformanceObserver`. Enable `buffered: true` to capture frames that occurred before script initialization.

```javascript
if (PerformanceObserver.supportedEntryTypes?.includes('long-animation-frame')) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      processLoAFEntry(entry);
    }
  });

  observer.observe({ type: 'long-animation-frame', buffered: true });
} else {
  console.warn('LoAF API not supported in this browser. Falling back to Long Tasks.');
}
```

### 2. Extract Frame Pipeline Timing Metrics
Parse the primary timing properties from `PerformanceLongAnimationFrameTiming`:

```javascript
function processLoAFEntry(entry) {
  const frameDuration = entry.duration; // Total frame time (>50ms)
  const blockingDuration = entry.blockingDuration; // Time spent over 50ms threshold
  const mainThreadDelay = entry.desiredExecutionStart
    ? Math.max(0, entry.startTime - entry.desiredExecutionStart)
    : 0;

  // Calculate style and layout duration
  const styleAndLayoutDuration = (entry.styleAndLayoutStart && entry.renderStart)
    ? entry.duration - (entry.styleAndLayoutStart - entry.startTime)
    : 0;

  console.log(`[LoAF Detected] Duration: ${frameDuration.toFixed(1)}ms | Blocking: ${blockingDuration.toFixed(1)}ms`);
}
```

### 3. Parse Script Attributions (`scripts` Array)
Iterate through the `entry.scripts` array (`PerformanceScriptTiming`) to identify the exact script execution responsible for the frame delay:

```javascript
const scriptAttributions = entry.scripts.map(script => {
  return {
    invoker: script.invoker, // e.g., 'BUTTON.onclick' or 'a.href'
    invokerType: script.invokerType, // 'user-callback', 'event-listener', 'promise-resolve', etc.
    sourceURL: script.sourceURL, // URL of script file
    functionName: script.sourceFunctionName || '(anonymous)',
    charPosition: script.sourceCharPosition,
    executionDuration: script.executionStart ? entry.duration - (script.executionStart - entry.startTime) : script.duration,
    forcedReflowDuration: script.forcedStyleAndLayoutDuration || 0,
    pauseDuration: script.pauseDuration || 0 // Time spent in alert/prompt/sync-XHR
  };
});
```

### 4. Categorize Script Ownership (1st Party vs 3rd Party)
Filter script sources to attribute blame accurately:

```javascript
function categorizeScript(sourceURL) {
  if (!sourceURL) return 'inline-or-eval';
  const currentOrigin = window.location.origin;
  if (sourceURL.startsWith(currentOrigin)) return 'first-party';
  if (sourceURL.includes('googletagmanager.com') || sourceURL.includes('analytics')) return 'analytics-3rd-party';
  if (sourceURL.includes('chrome-extension://')) return 'browser-extension';
  return 'third-party';
}
```

### 5. Correlate LoAF with User Interactions (INP Matching)
Maintain a rolling buffer of user interaction events (`pointerdown`, `keydown`) and match their timestamp with the `startTime` and `duration` of recorded LoAF entries:

```javascript
let lastInteraction = null;

['pointerdown', 'keydown'].forEach(type => {
  window.addEventListener(type, (e) => {
    lastInteraction = {
      type: e.type,
      target: e.target.tagName,
      timeStamp: performance.now()
    };
  }, { capture: true, passive: true });
});

function isInteractionRelated(loafEntry, interaction) {
  if (!interaction) return false;
  const loafEnd = loafEntry.startTime + loafEntry.duration;
  return interaction.timeStamp >= loafEntry.startTime - 16 && interaction.timeStamp <= loafEnd;
}
```

### 6. Flush Telemetry via `sendBeacon`
Package the structured LoAF report and transmit it safely when the page unloads or during idle frames:

```javascript
function transmitLoAFReport(report) {
  const payload = JSON.stringify(report);
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/telemetry/loaf', payload);
  } else {
    fetch('/api/telemetry/loaf', { method: 'POST', body: payload, keepalive: true });
  }
}
```

---

## Decision Rules

| Diagnostic Objective | Primary LoAF Metric to Inspect | Recommended Action |
| :--- | :--- | :--- |
| **Fixing High INP Processing Time** | `script.invokerType === 'event-listener'` and `script.sourceFunctionName` | Yield main thread using `scheduler.yield()` or chunk loops into `requestAnimationFrame`. |
| **Fixing Forced Synchronous Layout** | `script.forcedStyleAndLayoutDuration > 0` | Separate DOM geometric reads (`offsetHeight`) from DOM writes (`style.width`). |
| **Addressing Heavy Re-renders / Hydration** | `script.invokerType === 'user-callback'` / `promise-resolve` with long `duration` | Memoize component renders, defer non-critical state updates, or split bundles. |
| **Identifying Unresponsive Third-Party SDKs** | `script.sourceURL` matching external domains | Defer loading script with `async`/`defer`, load via Web Worker (Partytown), or remove. |
| **Fixing Presentation Delay** | `entry.renderStart` vs `entry.styleAndLayoutStart` (high layout/paint time) | Simplify CSS selectors, reduce DOM node count, use `content-visibility: auto`. |

---

## Constraints

- **Browser Support Requirements:** LoAF is supported natively in Chromium 123+ (Chrome, Edge, Opera, Brave). Always wrap in feature detection (`PerformanceObserver.supportedEntryTypes?.includes('long-animation-frame')`).
- **Cross-Origin Script Masking:** Cross-origin scripts loaded without Cross-Origin Resource Sharing (CORS) headers will have their `sourceURL` truncated or obscured (e.g., reported as empty string or opaque domain) due to security policies. Use `crossorigin="anonymous"` on `<script>` tags where possible.
- **Observer Overhead:** Keep processing inside the `PerformanceObserver` callback minimal (< 1ms). Avoid heavy string manipulation or DOM creation inside the observer callback itself to prevent recursive LoAF triggers.
- **Privacy & PII Protection:** Ensure script URLs or invoker strings do not log sensitive user URL parameters or input field values before sending telemetry payloads.

---

## Non-Goals

- Replacing Core Web Vitals standard measurement libraries (`web-vitals.js`).
- Automatic self-healing or automated rewriting of bad JavaScript code.
- Network bandwidth profiling or server response time monitoring.

---

## Common Failure Patterns

- **Observer-Induced Layout Thrashing:** Calling `getBoundingClientRect()` or reading layout inside the LoAF observer callback, causing an immediate forced reflow and triggering a secondary LoAF entry.
- **Ignoring Opaque Script Sources:** Misinterpreting an empty `sourceURL` as a bug rather than recognizing cross-origin script restriction without CORS headers.
- **Telemetry Flooding:** Sending an individual HTTP request for every single LoAF entry without batching or sampling, crippling client network bandwidth on slow connections.
- **Failing to Buffer Past Entries:** Initializing `PerformanceObserver` late in page lifecycle without `buffered: true`, missing critical LoAF entries generated during page load and initial JS hydration.

---

## Validation Steps

### 1. DevTools Performance & Console Verification
- Open Chrome DevTools -> **Performance** panel.
- Record a trace while performing heavy UI actions (e.g., sorting a large list or clicking a heavy button).
- Confirm that red-cornered Long Animation Frames match the entries logged by your LoAF `PerformanceObserver`.

### 2. Script Attribution Accuracy Check
- Inspect logged `PerformanceScriptTiming` entries.
- Verify that `sourceURL`, `sourceFunctionName`, and `invokerType` accurately identify the file and function executed during the user interaction.

### 3. Forced Reflow Detection Test
- Execute code with deliberate layout thrashing (e.g., reading `offsetHeight` right after changing `style.height`).
- Verify that `forcedStyleAndLayoutDuration` reports a non-zero millisecond value.

### 4. Telemetry Payload Audit
- Trigger page hidden (`visibilitychange`) or navigation.
- Verify in **DevTools Network Panel** that a single, compact JSON payload was transmitted via `sendBeacon` containing aggregated LoAF timing and attribution details.
