# Discrete Property Transition Audit Checklist

Use this checklist when auditing or debugging DOM elements (modals, popovers, accordions, tooltips, drawers) that experience abrupt visual pops, missing exit animations, top-layer dropouts, or accessibility issues when toggling `display: none` or `visibility: hidden`.

---

## 1. CSS Syntax & Rule Configuration

- [ ] **`allow-discrete` Keyword Present:** Does the `transition` property or `transition-behavior` declaration include `allow-discrete` for discrete properties (`display`, `visibility`, `overlay`)?
  - *Example:* `transition: display 0.3s allow-discrete, opacity 0.3s;`
- [ ] **Top-Layer `overlay` Property Included:** For `<dialog>` (`showModal()`) and Popover API (`[popover]`) elements, is the `overlay` property specified with `allow-discrete`?
  - *Rule:* Without `overlay 0.3s allow-discrete`, top-layer elements immediately exit the top-layer stack on close, causing z-index clipping during exit transitions.
- [ ] **`@starting-style` Rule Defined:** Is an `@starting-style` block established to define initial "before-render" state properties for entry transitions?
  - *Check:* Does `@starting-style` match the target selector (e.g., `dialog[open]` or `[aria-expanded="true"]`)?
- [ ] **`::backdrop` Starting Style:** Is `@starting-style` also defined specifically for `dialog[open]::backdrop` if the backdrop has entry transitions?

---

## 2. Rendering & Execution Behavior

- [ ] **Entry Animation Verification:** Does the element smoothly animate from its starting style (`opacity: 0`, `transform: translateY(-8px)`) into its open state upon insertion or class/attribute toggle?
- [ ] **Exit Animation Verification:** When closed, does the exit animation run completely before `display: none` takes effect?
- [ ] **No Flashes or Janks:** Is there any single-frame "flash" of fully visible content prior to entry animation?
  - *Fix:* Ensure starting styles in `@starting-style` match the closed state defaults.
- [ ] **No JS Timer Dependencies:** Has all `setTimeout` or `transitionend` removal logic been removed from JS handlers in favor of standard declarative `element.close()` or attribute toggling?

---

## 3. Accessibility & Media Preferences

- [ ] **Keyboard Nav & Tab Stop Removal:** When closed (`display: none`), confirm the element is completely unreachable via Tab navigation and hidden from screen readers.
- [ ] **`prefers-reduced-motion` Handling:** Is a media query present setting `transition-duration: 0.01ms` (or `none`) for users requesting reduced motion?
- [ ] **Focus Management:** Upon opening modal dialogs, is focus trapped within the dialog, and restored to the trigger button upon close completion?

---

## 4. Fallback & Cross-Browser Verification

- [ ] **Older Browser Degradation:** Test in browsers without `@starting-style` or `allow-discrete` support (e.g., Chrome < 117 or Safari < 17.4). Does the element fall back gracefully to instant display toggling without remaining stuck invisible?
- [ ] **Feature Queries:** Are `@supports (transition-behavior: allow-discrete)` rules used if customized fallback styles are required?
