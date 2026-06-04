# Browser Event Loop and Interaction Lifecycle

Understanding how the browser processes tasks is critical for optimizing
Interaction to Next Paint (INP).

## The Event Loop and Tasks

The browser's main thread runs an **Event Loop**. It processes a queue of
**Tasks** (JavaScript execution, event handling, parsing).

1.  **Task Execution:** The browser picks a task from the queue and runs it
    to completion. *The browser cannot do anything else (like painting) while
    a task is running.*
2.  **Microtasks:** After a task, the browser executes all pending microtasks
    (e.g., Promise callbacks).
3.  **Rendering:** If it's time for a frame (usually every 16.7ms), the
    browser performs the **Rendering Pipeline**:
    - **Style:** Calculate CSS styles for elements.
    - **Layout:** Determine the geometry of elements.
    - **Paint:** Determine the pixels for each element.
    - **Composite:** Layer the elements together for the screen.

## Why Interactions Get Slow

If a single Task takes 200ms, the browser is "locked." If a user clicks during
that 200ms window:
1.  **Input Delay:** The click event sits in the queue until the 200ms task
    finishes.
2.  **Processing Time:** The click handler finally runs (let's say it takes
    50ms).
3.  **Presentation Delay:** After the click handler finishes, the browser
    must still run the Rendering Pipeline (let's say 30ms).

**Total INP = 200ms (Delay) + 50ms (Processing) + 30ms (Presentation) = 280ms.**

## The Power of Yielding

When you "yield" (via `setTimeout` or `scheduler.yield`), you are essentially
breaking one giant task into multiple smaller tasks.

- **Giant Task (300ms):** No paint can happen for 300ms.
- **Three Small Tasks (100ms each) + Yielding:** The browser can sneak in
  a **Rendering Pipeline** pass between each task. This ensures the user
  sees visual updates and the main thread stays responsive to new inputs.

## Interaction Lifecycle Phases

### 1. Input Delay
- **Cause:** Main thread is busy with other work (long tasks).
- **Optimization:** Reduce "Total Blocking Time" (TBT) during the page
  lifecycle. Use `requestIdleCallback` for non-essential work.

### 2. Processing Time
- **Cause:** Heavy JavaScript in event listeners.
- **Optimization:** Break up loops, offload to Web Workers, or use
  `scheduler.yield()`.

### 3. Presentation Delay
- **Cause:** Large DOM updates, complex CSS, or "Layout Thrashing."
- **Optimization:** Avoid forced synchronous layouts. Read layout properties
  first, then write them. Keep the DOM shallow.
