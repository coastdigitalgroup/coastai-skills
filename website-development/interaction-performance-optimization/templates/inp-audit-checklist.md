# Interaction to Next Paint (INP) Audit Checklist

Use this checklist to identify and resolve interaction latency issues on your
website.

## 1. Measurement & Identification
- [ ] **Field Data Check:** Check Chrome User Experience Report (CrUX) or
      Search Console for "Poor" or "Needs Improvement" INP values (> 200ms).
- [ ] **Identify "Hot" Interactions:** Which actions (Menu toggle, Add to Cart,
      Filter) are users reporting as slow?
- [ ] **Reproduce Locally:** Use the "Performance" tab in DevTools with
      "CPU Throttling" (4x or 6x) to simulate mobile devices.

## 2. Analysis (The 3 Phases of Latency)
- [ ] **Input Delay:**
    - Is the main thread busy when the user clicks? (Look for long tasks
      before the interaction).
    - Are there heavy third-party scripts (ads, analytics) running?
- [ ] **Processing Time:**
    - Is the event handler itself slow?
    - Are there multiple event listeners for the same action?
    - Is there heavy framework overhead (e.g., massive React re-renders)?
- [ ] **Presentation Delay:**
    - Is the browser spending > 50ms on "Recalculate Style" or "Layout"?
    - Are you triggering layout thrashing (forced synchronous layout)?
    - Is the DOM too large (> 1,500 nodes)?

## 3. Implementation of Fixes
- [ ] **Yielding:** Have you introduced `scheduler.yield()` or `setTimeout`
      fallbacks in loops or heavy logic?
- [ ] **Offloading:** Can heavy computations be moved to a Web Worker?
- [ ] **Debouncing/Throttling:** Are high-frequency events (scroll/resize)
      properly throttled?
- [ ] **Optimistic UI:** Does the UI update immediately (even if it's just a
      spinner) before starting heavy work?
- [ ] **Batching:** Are DOM updates batched to avoid multiple layout passes?

## 4. Verification
- [ ] **Interaction Track:** Does the DevTools "Interactions" track show
      "Good" (green) for the optimized action?
- [ ] **No More Long Tasks:** Are all tasks during the interaction
      lifecycle under 50ms?
- [ ] **Low-End Device Test:** Does it still feel snappy on a throttled
      CPU or actual budget mobile device?
