# CSS Grid Implementation Audit Checklist

Use this checklist to ensure a CSS Grid implementation is performant, accessible, and robust.

## 1. Intrinsic Responsiveness
- [ ] Does the grid use `auto-fit` or `auto-fill` where appropriate to reduce media query count?
- [ ] Are `minmax()` values used to prevent content squishing or overflow?
- [ ] Does the layout handle extremely small viewports (e.g., 320px) without horizontal scrolling?
- [ ] Is `min-width: 0` applied to grid items containing overflowing content (like long strings or large images)?

## 2. Accessibility & Semantics
- [ ] Does the visual order of elements match the DOM order?
- [ ] If the `order` property is used, does it disrupt the logical tab sequence?
- [ ] Are named areas (`grid-template-areas`) used for clarity in complex layouts?
- [ ] Are headings (`h1`-`h6`) in a logical order within the grid structure?

## 3. Modern Features & Performance
- [ ] If using `subgrid`, is there a fallback for older browsers (if required)?
- [ ] Are gaps managed using the `gap` property rather than margins on items?
- [ ] Is the number of grid tracks kept to a reasonable limit (avoiding "deep" grids)?
- [ ] Does the layout avoid "layout thrashing" by not triggering frequent re-calculations via JS?

## 4. Maintenance & Scalability
- [ ] Are CSS variables used for track sizes and gaps to allow easy global updates?
- [ ] Is the grid structure clear and documented (e.g., via named areas)?
- [ ] Are items placed using `grid-area` names rather than fragile line numbers where possible?
- [ ] Is there a clear strategy for handling dynamic content (e.g., varying card lengths)?

## 5. Visual Consistency
- [ ] Do nested elements align across grid cells if required (e.g., via subgrid)?
- [ ] Is vertical rhythm maintained between different grid containers?
- [ ] Are background colors or borders consistent across grid items?
