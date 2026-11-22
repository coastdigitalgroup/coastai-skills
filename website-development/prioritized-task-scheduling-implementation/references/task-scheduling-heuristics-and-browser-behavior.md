# Task Scheduling Heuristics and Browser Behavior

This reference guide details browser event loop scheduling mechanics, the W3C Prioritized Task Scheduling API spec (`scheduler.postTask`, `scheduler.yield`, `TaskController`), priority queue behavior, and INP performance impact.

---

## 1. Event Loop Mechanics: Macro vs Microtasks vs Scheduler Queues

Understanding browser task queue execution order is critical for scheduling tasks effectively without introducing input lag or starvation.

```
       ┌─────────────────────────────────────────────────────────────┐
       │                   Browser Event Loop                        │
       └──────────────────────────────┬──────────────────────────────┘
                                      │
         ┌────────────────────────────┴──────────────────────────┐
         │                                                       │
  ┌──────▼────────┐                                     ┌────────▼────────┐
  │ Microtasks    │                                     │ Macrotasks      │
  │ - Promises    │                                     │ - setTimeout    │
  │ - queueMicro- │                                     │ - MessageChannel│
  │   task        │                                     │ - Events        │
  └──────┬────────┘                                     └────────┬────────┘
         │ Executed continuously until empty                     │
         │                                                       │
         └────────────────────────────┬──────────────────────────┘
                                      │
                       ┌──────────────▼──────────────┐
                       │  Prioritized Task Queue     │
                       │  (scheduler.postTask)       │
                       └──────────────┬──────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
 ┌───────▼────────┐           ┌───────▼────────┐           ┌───────▼────────┐
 │ user-blocking  │           │  user-visible  │           │   background   │
 │ (Highest)      │           │  (Default)     │           │   (Lowest)     │
 └────────────────┘           └────────────────┘           └────────────────┘
```

### Queue Drain Priority

1. **Microtasks (`Promise.then`, `queueMicrotask`):** Microtasks execute immediately after the current task finishes and before returning to the event loop. Continuous microtask recursion will starve rendering and freeze the browser UI completely.
2. **`user-blocking` Queue:** High-priority macrotasks triggered by direct user interactions (clicks, keypresses). Executed before standard macrotasks and render frames.
3. **`user-visible` Queue:** Standard default priority for layout updates, data rendering, and non-blocking state updates. Executed before background tasks.
4. **`background` Queue:** Low-priority background tasks (analytics, prefetching, off-screen prep). Executed when the main thread has no `user-blocking` or `user-visible` tasks pending.
5. **Standard Macrotasks (`setTimeout(0)`, `MessageChannel`):** Processed per standard event loop queue logic.

---

## 2. Priority Levels & Usage Heuristics

| Priority | Intent | Max Execution Budget | Typical Use Cases |
| :--- | :--- | :--- | :--- |
| **`user-blocking`** | Work essential to responding to user input immediately | 16ms per frame batch | Modal dialog toggles, active tab switching, input field sync, immediate tap state |
| **`user-visible`** | Work visible on screen, but not blocking immediate tap response | 10ms–15ms per chunk | List filtering, search result rendering, chart redraw, progressive hydration |
| **`background`** | Work invisible or non-urgent to immediate user workflow | Flexible (yields on input) | Telemetry logging, prefetching next page assets, warming cache, offline sync |

---

## 3. `scheduler.yield()` vs `setTimeout(fn, 0)`

`scheduler.yield()` provides a major architectural upgrade over legacy yielding techniques like `setTimeout(0)` or `MessageChannel`.

| Characteristic | `scheduler.yield()` | `setTimeout(fn, 0)` | `MessageChannel` |
| :--- | :--- | :--- | :--- |
| **Priority Preservation** | Preserves parent task priority (`user-blocking` stays `user-blocking`) | Resets priority to generic lowest macrotask level | Resets priority to generic macrotask level |
| **Continuation Execution** | Continues execution immediately after current frame/input phase | Subject to 4ms timer clamping after 5 nested calls | Immediate macrotask (no 4ms clamp), but loses priority |
| **Context Retention** | Retains task continuation context and abort signals | Disconnects task context | Disconnects task context |
| **INP Impact** | **Optimal:** Allows render/input pass and resumes cleanly | **Suboptimal:** Can cause unnecessary multi-frame latency | **Good:** Better than setTimeout, but lacks priority control |

---

## 4. Browser Support & Polyfill Fallbacks

- **`scheduler.postTask`:**
  - Chrome / Edge: Supported natively (v94+)
  - Firefox: Supported behind flag (v101+)
  - Safari: Supported natively (v18.2+)
- **`scheduler.yield`:**
  - Chrome / Edge: Supported natively (v129+)
  - Firefox / Safari: In development / Origin trial
- **Recommended Polyfill Policy:** Use feature detection with `MessageChannel` or `requestIdleCallback` fallbacks rather than heavy global monkey-patching.
