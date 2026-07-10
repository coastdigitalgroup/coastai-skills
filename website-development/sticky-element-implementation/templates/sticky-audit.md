# Sticky Implementation Audit

Use this checklist to verify that a sticky element implementation is robust,
accessible, and bug-free.

## 1. Technical Correctness
- [ ] **Threshold set:** Does the element have a `top`, `bottom`, `left`, or `right` value?
- [ ] **Parent Height:** Does the parent container have more height than the sticky element?
- [ ] **Background Opaque:** Does the sticky element have a background color (to prevent content bleed-through)?
- [ ] **Stacking Context:** Does the element have a `z-index` sufficient to stay above scrolling content?

## 2. Overflow Trap Audit
- [ ] **Ancestor Check:** Use the following snippet in the console to find ancestors that might break stickiness:
  ```javascript
  let el = document.querySelector('.your-sticky-element');
  while (el) {
    const overflow = getComputedStyle(el).overflow;
    if (overflow !== 'visible') console.log('Potential trap:', el, overflow);
    el = el.parentElement;
  }
  ```
- [ ] **Body/HTML:** Ensure `overflow: hidden` is not set on the `body` or `html` unless intended.

## 3. Accessibility
- [ ] **Jump-Link Offset:** Does the page use `scroll-margin-top` to account for the sticky element's height when jumping to internal anchors?
- [ ] **Focus Ring Visibility:** Is the focus ring visible when tabbing through items inside the sticky element?
- [ ] **Content Obscuring:** Does the sticky element cover up important focusable content when stuck?

## 4. Performance & Responsiveness
- [ ] **Mobile Space:** On small screens, does the sticky element take up more than 20% of the viewport height? (If so, consider disabling stickiness).
- [ ] **Layout Jank:** If using JS for "stuck" detection, is it using `IntersectionObserver` instead of `scroll` events?
- [ ] **Table Borders:** If it's a sticky table header, are the borders correctly aligned and visible?
