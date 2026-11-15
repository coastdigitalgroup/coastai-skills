# CSS `:has()` Relational Selector Implementation & Performance Audit Checklist

Use this checklist to verify CSS `:has()` implementation quality, performance impact, accessibility compliance, and browser engine compatibility.

---

## 1. Scoping & Performance Invalidation Check

- [ ] **No Unscoped Root Selectors:** Confirm `:has()` is NOT attached directly to universal selectors (`*`), root element (`html`), or broad wrappers without scoping (e.g., avoid `* :has(.foo)` or `body :has(.bar)` in dynamic pages).
- [ ] **Component Boundary Scoping:** Ensure `:has()` is scoped directly to a specific component container (e.g., `.card:has(...)`, `.form-field:has(...)`).
- [ ] **Recalculate Style Budget:** Run Chrome DevTools Performance trace during rapid interaction. Confirm **Recalculate Style** phase completes in `< 2ms` per frame.
- [ ] **No Nested `:has()` Selectors:** Verify no CSS rules contain nested relational selectors like `:has(:has(...))` (which are invalid according to W3C specs).

---

## 2. Specificity & Cascade Management

- [ ] **Specificity Calculation Review:** Check that selectors inside `:has()` do not inadvertently inflate specificity and prevent lower-layer overrides.
- [ ] **Specificity Neutralization (`:where()`):** Use `:where()` inside `:has()` if you need to query an element by ID or class without increasing parent specificity (e.g., `.card:has(:where(#unique-id))`).
- [ ] **Cascade Layer Integration:** Place `:has()` rules in appropriate `@layer` boundaries (e.g., `@layer components`) so utility overrides function as intended.

---

## 3. Keyboard & Screen Reader Accessibility Audit

- [ ] **Keyboard Focus Viability:** Verify focus ring styles on parent elements using `.parent:has(:focus-visible)` execute correctly when navigating via `Tab` key.
- [ ] **Semantic ARIA Preservation:** Ensure `:has()` is used purely for visual presentation and layout adaptation, NOT as a replacement for necessary ARIA state attributes (`aria-expanded`, `aria-checked`, `aria-invalid`).
- [ ] **Natural DOM Order Maintained:** Confirm preceding sibling patterns (`.item:has(~ .item:checked)`) preserve natural forward DOM order for screen reader navigation.

---

## 4. Cross-Browser & Progressive Enhancement Audit

- [ ] **Browser Baseline Support:** Tested in Chromium 105+, Safari 15.4+, and Firefox 121+.
- [ ] **Graceful Degradation / Feature Query:** If supporting legacy targets, verify `@supports selector(:has(*))` fallback styles prevent invisible or un-styled components.
- [ ] **Shadow DOM Boundaries:** Confirm no `:has()` selector attempts to cross web component Shadow Root DOM encapsulation boundaries.

---

## 5. Visual State Verification

- [ ] **Parent Container Toggles:** Parent element styles (border, shadow, background) update immediately when child radio or checkbox states change.
- [ ] **Form Validation Toggles:** Parent field wrapper transitions smoothly to error styling when nested inputs switch to `:user-invalid` state.
- [ ] **Layout Grid Adaptation:** Container grid/flexbox columns adapt dynamically when internal slot elements are empty or populated.
