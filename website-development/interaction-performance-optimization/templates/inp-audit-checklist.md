# Interaction Performance (INP) Audit Checklist

Use this checklist to identify and resolve interaction latency issues on any
frontend project.

## 1. Discovery & Measurement
- [ ] **Run Lighthouse:** Check the "Interaction to Next Paint" metric in the
      Performance category.
- [ ] **Field Data Check:** Look at Search Console (Core Web Vitals report) or
      PageSpeed Insights for real-world INP data.
- [ ] **Console Logging:** Use the `web-vitals` library to log INP values
      locally during development.
      ```javascript
      import { onINP } from 'web-vitals';
      onINP(console.log);
      ```

## 2. Chrome DevTools Profiling
- [ ] **Record Interaction:** Open the Performance panel, click record, perform
      the slow interaction, and stop.
- [ ] **Identify the Interaction:** Find the "Interactions" row. Is there a long
      bar (Yellow/Red)?
- [ ] **Find Long Tasks:** Look for the red crosshatched patterns in the "Main"
      thread track.
- [ ] **Breakdown the Time:**
    - [ ] **Input Delay:** Is the main thread busy with other tasks (e.g.,
          third-party scripts)?
    - [ ] **Processing Time:** Which specific function or event handler is
          taking the most time?
    - [ ] **Presentation Delay:** Is the browser struggling with "Recalculate
          Style" or "Layout"?

## 3. Optimization Techniques
- [ ] **Event Handler Yielding:** Are event handlers yielding the main thread
      for non-essential work?
- [ ] **Debouncing/Throttling:** Are frequent events (scroll, resize, input)
      restricted to prevent excessive firing?
- [ ] **Web Workers:** Can heavy calculations be moved off the main thread
      entirely?
- [ ] **Optimistic UI:** Does the UI update immediately to acknowledge input
      before the task completes?
- [ ] **Abort Controller:** Are previous, stale tasks (like an old fetch or
      search) being cancelled?

## 4. Common Culprits
- [ ] **Third-Party Scripts:** Are analytics, chat widgets, or ads blocking the
      main thread? (Try `fetchpriority="low"` or moving them to a Web Worker).
- [ ] **Large DOM Updates:** Is the interaction triggering a re-render of
      thousands of DOM nodes? (Consider virtualization).
- [ ] **Layout Thrashing:** Are there repeated reads/writes to the DOM in the
      same task?

## 5. Verification
- [ ] **CPU Throttling:** Re-test with "6x CPU slowdown" enabled.
- [ ] **Visual Confirmation:** Does every interaction provide feedback within
      100ms?
- [ ] **No Regression:** Ensure that breaking up tasks didn't introduce race
      conditions or UI flickering.
