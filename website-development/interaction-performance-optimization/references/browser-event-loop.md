# Browser Event Loop and Rendering Pipeline

Understanding how the browser processes tasks and renders updates is crucial
for optimizing Interaction to Next Paint (INP).

## The Event Loop

The browser's main thread runs a loop that executes tasks from multiple queues.
For INP, the most important concepts are:

1.  **Task (Macrotask):** Includes event handlers, timeouts, and network
    callbacks. Only one task runs at a time. A "Long Task" is any task that
    takes more than 50ms.
2.  **Microtask:** Includes promise resolutions (`.then`, `await`). Microtasks
    run immediately after the current task finishes and before the next task
    starts.
3.  **The Rendering Pipeline:** The browser attempts to update the screen
    (Paint) at regular intervals (usually every 16.7ms for 60fps).

## The Interaction Lifecycle

An interaction (e.g., a click) follows this path:

### Phase 1: Input Delay
The user clicks a button. If the main thread is already busy running a long
script (e.g., parsing a large JSON file or processing an old interaction), the
new click event is queued and waits.

### Phase 2: Processing Time
The main thread becomes free and starts executing your event handlers (click,
mousedown, etc.). If these handlers run for 200ms without yielding, the browser
cannot do anything else during this time.

### Phase 3: Presentation Delay
Your event handlers finish, and you've updated the DOM. Now the browser must:
1.  **Recalculate Styles:** Determine which CSS rules apply.
2.  **Layout:** Calculate the geometry of elements.
3.  **Paint:** Create the visual layers.
4.  **Composite:** Draw the layers to the screen.

INP measures the **total time** from the start of Phase 1 to the end of Phase 3.

## Why `setTimeout(0)` or `scheduler.yield()` works

When you `await` a `setTimeout` or `scheduler.yield`, you are explicitly
breaking your code into two separate **Tasks**.

- **Task A:** Updates the UI (e.g., shows a spinner) and then yields.
- **Between Tasks:** The browser is now free. It looks at its queues and sees:
    - "Oh, the UI changed! Let me run the **Rendering Pipeline** to show that
      spinner."
    - "Hey, the user clicked another button! Let me process that **Input**."
- **Task B:** Your code resumes and performs the heavy calculation.

By yielding, you allow the browser to interleave critical work (rendering and
user input) with your long-running logic.

## Key Heuristics
- **50ms Task Limit:** Stay under 50ms to keep the browser responsive.
- **100ms Response Target:** Users perceive interactions under 100ms as
  instant.
- **Avoid Layout Thrashing:** Forced Synchronous Layout happens when you
  request geometric information (like `offsetWidth`) after changing the DOM in
  the same task. This forces the browser to run the "Layout" phase prematurely
  and often multiple times.
