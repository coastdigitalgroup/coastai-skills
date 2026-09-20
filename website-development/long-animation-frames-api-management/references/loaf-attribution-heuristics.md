# Long Animation Frames (LoAF) API Technical Reference & Attribution Heuristics

This reference guide provides a deep dive into the W3C Long Animation Frames (LoAF) specification, API properties, frame timing breakdowns, invoker types, cross-origin CORS heuristics, and diagnostic strategies for Interaction to Next Paint (INP) optimization.

---

## 1. Frame Execution Anatomy: Long Task vs Long Animation Frame

### Legacy Long Task API (`PerformanceLongTaskTiming`)
- Measures individual tasks taking > 50ms.
- **Limitation:** Blind to render time, style/layout recalculations, and presentation delays.
- **Limitation:** Provides zero script attribution or function-level invoker details.

### Long Animation Frame API (`PerformanceLongAnimationFrameTiming`)
- Measures the entire rendering frame loop taking > 50ms from start of task execution through frame presentation to screen.
- Exposes full frame pipeline phase timestamps (`startTime`, `desiredExecutionStart`, `renderStart`, `styleAndLayoutStart`).
- Exposes `blockingDuration` (total main-thread time exceeding the 50ms frame budget).
- Contains an array of `PerformanceScriptTiming` entries detailing every script executed during the frame.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Long Animation Frame (> 50ms)                                        │
├──────────────────────────────┬───────────────────────────────┬─────────────────────────┬───────────────┤
│ Input / Queue Delay          │ Script Execution Phase        │ Style & Layout Phase    │ Paint         │
│ (desiredExecutionStart ->    │ (PerformanceScriptTiming)     │ (styleAndLayoutStart -> │ (renderStart  │
│  startTime)                  │                               │  renderStart)           │  -> end)      │
└──────────────────────────────┴───────────────────────────────┴─────────────────────────┴───────────────┤
                                ▲                                                        ▲
                                50ms Budget Threshold                                    Frame Presented
```

---

## 2. API Interface Specification

### `PerformanceLongAnimationFrameTiming` Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `duration` | `DOMHighResTimeStamp` | Total duration of the animation frame in milliseconds. |
| `blockingDuration` | `DOMHighResTimeStamp` | Cumulative time spent executing tasks in excess of 50ms. |
| `startTime` | `DOMHighResTimeStamp` | Timestamp when the frame execution started. |
| `desiredExecutionStart` | `DOMHighResTimeStamp` | Timestamp when the frame was scheduled to start (reveals main-thread queue delay). |
| `renderStart` | `DOMHighResTimeStamp` | Timestamp when the rendering pipeline (style, layout, paint) began. |
| `styleAndLayoutStart` | `DOMHighResTimeStamp` | Timestamp when style recalculation and layout computation began. |
| `scripts` | `Array<PerformanceScriptTiming>` | Array of script entries executed within this frame. |

### `PerformanceScriptTiming` Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `invoker` | `string` | Entry point trigger description (e.g., `'BUTTON#submit.onclick'`, `'a.href'`, `'TimerHandler'`). |
| `invokerType` | `string` | Categorical classification of how the script was invoked (see table below). |
| `sourceURL` | `string` | Absolute URL of the script file where execution originated. |
| `sourceFunctionName` | `string` | Name of the JavaScript function executed (or empty string if anonymous). |
| `sourceCharPosition` | `number` | Character offset in the script file where function definition starts. |
| `executionStart` | `DOMHighResTimeStamp` | Timestamp when this specific script execution began. |
| `forcedStyleAndLayoutDuration` | `DOMHighResTimeStamp` | Time spent executing forced synchronous reflows inside this script. |
| `pauseDuration` | `DOMHighResTimeStamp` | Time spent paused in synchronous browser blocks (e.g. `alert()`, `prompt()`, sync XHR). |

---

## 3. Invoker Types Reference

| `invokerType` | Description | Typical Cause | Recommended Action |
| :--- | :--- | :--- | :--- |
| `user-callback` | Native event listener callback attached via `addEventListener`. | Click, pointer, or keypress handler performing heavy work. | Defer heavy work using `scheduler.yield()` or microtask/rAF chunking. |
| `event-listener` | Inline HTML event attribute (e.g., `onclick="..."`). | Legacy inline event handlers. | Migrate to delegated passive event listeners. |
| `promise-resolve` | Promise `.then()`, `.catch()`, or `async/await` microtask continuation. | Heavy data transformation or VDOM reconciliation after `fetch()`. | Split microtask chain across event loop turns using `setTimeout(0)`. |
| `base-render` | Browser intrinsic rendering routine (`ResizeObserver`, `IntersectionObserver`). | Heavy layout calculations inside observer callbacks. | Batch DOM writes inside `requestAnimationFrame`. |
| `classic-script` | Top-level execution of a standard `<script>` element. | Synchronous third-party SDK or bundle initialization during page load. | Add `async` or `defer` attributes to script tag. |
| `module-script` | Top-level execution of an ES Module (`<script type="module">`). | Large module bundle execution during page boot. | Code-split modules into dynamic `import()` chunks. |

---

## 4. Cross-Origin CORS Masking Rules

To protect user privacy and prevent cross-site timing attacks, the browser masks script details for cross-origin scripts unless explicitly permitted via CORS headers.

### Unmasked Condition (Full Details Visible)
- 1st-party scripts matching the origin of the document.
- Cross-origin scripts loaded with the `crossorigin="anonymous"` (or `use-credentials`) attribute **AND** served by the CDN with:
  ```http
  Access-Control-Allow-Origin: *
  Timing-Allow-Origin: *
  ```

### Masked Condition (Opaque Attribution)
If a cross-origin script lacks CORS/Timing headers:
- `sourceURL` will be reported as an empty string (`""`) or truncated origin.
- `sourceFunctionName` will be reported as `""`.
- `sourceCharPosition` will be reported as `-1`.
- **Note:** The total `duration`, `blockingDuration`, and `forcedStyleAndLayoutDuration` metrics are still accurately recorded!

---

## 5. Diagnostic Heuristics Matrix

```text
+---------------------------------------------------+---------------------------------------------------+
| Metric Signature                                  | Diagnosis & Solution                              |
+---------------------------------------------------+---------------------------------------------------+
| blockingDuration > 100ms                          | Heavy Main-Thread Computation                     |
| invokerType == 'user-callback'                    | Split long loops using scheduler.yield()          |
+---------------------------------------------------+---------------------------------------------------+
| forcedStyleAndLayoutDuration > 20ms               | Synchronous Layout Thrashing                      |
| script.sourceFunctionName identified              | Separate DOM geometric reads from style writes    |
+---------------------------------------------------+---------------------------------------------------+
| styleAndLayoutStart -> renderStart > 50ms         | CSS Engine / Large DOM Tree Bottleneck            |
| scripts array is empty or short                   | Simplify CSS selectors; use content-visibility    |
+---------------------------------------------------+---------------------------------------------------+
| desiredExecutionStart -> startTime > 30ms         | Main-Thread Scheduling Delay                      |
| high Input Delay before handler run               | Clear main thread queue; eliminate background tasks|
+---------------------------------------------------+---------------------------------------------------+
```
