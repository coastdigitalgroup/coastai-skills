---
name: interaction-performance-optimization
description:
  Improve Interaction to Next Paint (INP) by breaking up long tasks, yielding
  to the main thread, and optimizing the interaction lifecycle phases.
---

# Interaction Performance Optimization

## Purpose

The Interaction Performance Optimization skill provides a technical protocol for
minimizing the latency between a user's action (click, tap, keypress) and the
resulting visual update on the screen. It specifically targets the **Interaction
to Next Paint (INP)** metric, solving the problem of "frozen" or sluggish UIs
caused by long-running JavaScript tasks that block the main thread.

## Use Cases

- Reducing input lag on complex forms or interactive data visualizations.
- Optimizing "heavy" UI transitions (e.g., opening a large menu or filtering a
  long list).
- Fixing sluggishness in single-page applications (SPAs) during navigation or
  state updates.
- Auditing and improving Lighthouse/Core Web Vitals scores for INP.
- Handling high-frequency events (scroll, resize, mousemove) without dropping
  frames.

## When NOT to Use

- **Static Content:** Pages with no interactivity do not have INP issues.
- **Server Latency:** If the delay is caused by waiting for a network response,
  use loading states or optimistic UI patterns instead of task chunking.
- **Initial Load Performance:** Use `resource-prioritization-strategy` for LCP
  and FCP improvements. INP is a lifecycle metric, not a load metric.

## Inputs

1. **Performance Trace:** A Chrome DevTools Performance recording showing long
   tasks (red bars) during an interaction.
2. **Field Data:** INP scores from real users (e.g., via Search Console or
   PageSpeed Insights).
3. **Target Interaction:** The specific user action that feels slow or has high
   latency.

## Outputs

1. **Optimized Event Handlers:** Code that yields control back to the browser
   to allow for paint operations.
2. **Task Scheduler:** Implementation of patterns like `scheduler.yield()` or
   `setTimeout` to chunk heavy logic.
3. **Interaction Audit:** Breakdown of latency into Input Delay, Processing
   Time, and Presentation Delay.

## Workflow

### 1. Identify the Interaction Bottleneck
Record a Performance trace while performing the slow interaction. Look for:
- **Long Tasks:** Tasks exceeding 50ms.
- **Interaction Segment:** The "Interactions" track in DevTools will highlight
  the specific latency breakdown.

### 2. Deconstruct Interaction Latency
Analyze which phase is contributing most to the delay:
- **Input Delay:** Waiting for the main thread to become free.
- **Processing Time:** Time spent executing the event handler's JavaScript.
- **Presentation Delay:** Time spent calculating layout, painting, and
  compositing the frame.

### 3. Yield to the Main Thread
If **Processing Time** is high, break up the work.
- Use `scheduler.yield()` (where supported) or `await new Promise(r => setTimeout(r, 0))`
  to allow the browser to paint a frame before continuing heavy logic.
- Move non-critical work (like analytics or background data syncing) out of
  the immediate interaction handler.

### 4. Minimize Presentation Delay
- Avoid **Layout Thrashing:** Don't read layout properties (e.g., `offsetHeight`)
  after writing them in the same task.
- Simplify DOM updates: Batch changes or use document fragments.
- Avoid complex CSS filters or heavy paint operations during transitions.

### 5. Reduce Input Delay
- Remove unnecessary "Idle" work that blocks the main thread when the user
  tries to interact.
- Use `requestIdleCallback` for low-priority background tasks.
- Avoid long-running third-party scripts that execute during user interaction
  windows.

## Decision Rules

- **Is the task > 50ms?**
  - YES: It must be broken up or moved to a Web Worker.
- **Does the UI need to show an immediate state change?**
  - YES: Update the state (e.g., show a loading spinner), then yield before
    running the expensive logic.
- **Is the work purely computational?**
  - YES: Offload it to a **Web Worker** to keep the main thread free for
    interactions.

## Constraints

- **Yielding overhead:** Yielding too frequently can increase total execution
  time. Aim for chunks that take 10-30ms.
- **State Consistency:** Ensure that yielding doesn't lead to "torn" UI states
  where some data is updated and some is not.
- **Browser Support:** `scheduler.yield()` is a modern API; always provide a
  `setTimeout` fallback for older browsers.

## Non-Goals

- Optimizing TTFB or initial download speed.
- Implementing general UI animations (unless they impact INP).
- Backend or database performance tuning.

## Common Failure Patterns

- **Over-chunking:** Yielding after every minor operation, causing the total
  task to take significantly longer due to overhead.
- **Forgetting the Fallback:** Using `scheduler.yield()` without checking for
  support, breaking the site in older browsers.
- **Ignoring Layout Thrashing:** Optimizing JS logic but still causing the
  browser to re-calculate layout multiple times, keeping Presentation Delay high.
- **Blocking the Main Thread with Analytics:** Running heavy tracking scripts
  synchronously inside a click handler.

## Validation Steps

- [ ] **DevTools Interaction Track:** Verify that the "Interaction" bar is
      green and below the 200ms threshold (Good).
- [ ] **No Long Tasks:** Confirm that no single task in the interaction
      lifecycle exceeds 50ms.
- [ ] **Visual Feedback:** Confirm that the UI responds (e.g., a button state
      change or spinner) immediately (< 100ms) even if the final result
      takes longer.
- [ ] **Lighthouse INP Audit:** Verify improved INP scores in local testing or
      simulated environments.
