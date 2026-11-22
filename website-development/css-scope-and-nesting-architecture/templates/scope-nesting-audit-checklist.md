# CSS Scope and Nesting Audit Checklist

Use this checklist to audit and validate frontend component stylesheets using native W3C CSS `@scope` and native CSS Nesting.

---

## 1. Scope Root & Donut Boundary Sanity

- [ ] **Explicit Scoping Root Defined:** Every `@scope` block targets a well-defined root element (e.g., `@scope (.card)` or `@scope (#nav-menu)`).
- [ ] **Donut Limit Configuration:** Any component that accepts dynamic, slotted, or child user content specifies an explicit donut limit (e.g., `@scope (.card) to (.card__body)`).
- [ ] **No Unbound Descendant Bleed:** Verify that rules inside the `@scope` block do not alter styles for nested elements beyond the donut boundary.
- [ ] **Valid Scoping Root Referencing:** The scoping root element itself is referenced using `:scope` (e.g., `:scope { display: flex; }`) rather than duplicate class declarations inside the scope block.

---

## 2. CSS Nesting Syntax & Hierarchy

- [ ] **Max Nesting Depth Limit:** Nesting depth is kept to 3 levels or fewer (`.parent { .child { .grandchild { ... } } }`) to maintain readability and avoid excessive specificity.
- [ ] **Proper `&` Selector Usage:** The parent referencing operator `&` is used correctly for pseudo-classes (`&:hover`, `&:focus-visible`), pseudo-elements (`&::before`), and compound classes (`&.is-active`).
- [ ] **Type Selector Nesting Check:** Direct element nesting without `&` (e.g., `.card { p { ... } }`) compiles cleanly in target browser engines (Chrome 120+, Safari 17.2+, Firefox 117+).
- [ ] **At-Rule Nesting Co-location:** Media queries (`@media`), container queries (`@container`), and state supports (`@supports`) are nested directly inside component definitions rather than fragmented across external blocks.

---

## 3. Specificity & Proximity Mechanics

- [ ] **Root Specificity Awareness:** Team is aware that selectors inside `@scope (.my-root)` carry the specificity of `.my-root` + target selector (unless wrapped in `:where()` or defined via inline HTML `<style @scope>`).
- [ ] **Proximity Cascade Verification:** In nested scope scenarios (e.g., `.light-theme` inside `.dark-theme`), verify that style conflicts resolve by proximity to the nearest scoping root as expected.
- [ ] **No `!important` Escalation:** Ensure `@scope` proximity resolution eliminates the need for `!important` overrides across component themes or variants.

---

## 4. Progressive Enhancement & Cross-Browser Resilience

- [ ] **Feature Queries in Place:** `@supports (scope: (.test))` is used to encapsulate native `@scope` rules where legacy browser support is necessary.
- [ ] **Fallback Styles Provided:** Standard BEM or descendant class selectors provide a functional baseline layout for non-supporting browsers.
- [ ] **No Build-Step Lock-in:** Vanilla CSS stylesheets process cleanly in native browser engines without requiring PostCSS pre-compilation unless explicitly configured for legacy transformations.

---

## 5. Automated Skill Validation

- [ ] Run repo skill validator:
  ```bash
  node scripts/check-skills.mjs
  ```
  Ensure 0 validation errors are returned.
