# CSS Scope & Nesting Architecture Audit Checklist

Use this checklist to review component stylesheets for proper W3C `@scope` encapsulation, donut boundaries, native CSS nesting structure, specificity management, and progressive degradation fallbacks.

---

## 1. Scope Boundary & Donut Isolation

- [ ] **Scope Root Definition:** Every component stylesheet defines a clear `@scope (<root-selector>)` targeting a specific component root.
- [ ] **Donut Limit Specification:** Content containers accepting arbitrary child markup or nested component slots specify a limit boundary using `to (<limit-selector>)` (e.g. `@scope (.card) to (.slot)`).
- [ ] **Slotted Content Protection:** Verified via DevTools that elements inside slotted content do NOT inherit parent component styles (e.g. `.card .title` does not affect `.slot .title`).
- [ ] **Root Targeting:** Component container root styles use `:scope` inside `@scope` blocks rather than repeating class names unnecessarily.

---

## 2. Native CSS Nesting Rules

- [ ] **Property Precedence:** All CSS property declarations on a selector are placed at the **top** of the declaration block *before* any nested child rules.
- [ ] **Nesting Depth Limit:** Nesting depth is kept to a maximum of 2–3 levels (avoiding 4+ level "Sass Pyramid of Doom" structures).
- [ ] **Explicit Nesting Syntax:** Nested pseudo-classes (`:hover`, `:focus-visible`), attribute selectors (`&[data-state="active"]`), and variants start explicitly with `&` or pseudo-class prefixes (`:`) for clarity.
- [ ] **Specificity Verification:** Verified that nested rules using group parent selectors (e.g., `header, #main { .title { ... } }`) do not unexpectedly inflate specificity due to native `:is()` parent wrapping.

---

## 3. Cascade & Scoping Proximity

- [ ] **Scoping Proximity Resolution:** Overlapping themed scopes (e.g. dark theme nested inside light theme) resolve styles based on DOM proximity rather than source order.
- [ ] **Global Token Integration:** Scoped rules consume global CSS custom properties (`var(--token)`) rather than hardcoding static color values where design tokens exist.
- [ ] **No Artificial Specificity Inflation:** Specificity is kept low (0,1,0 for single class rules inside scope) without relying on `!important` or chaining multiple class names (`.card.card.card`).

---

## 4. Performance & Browser Compatibility

- [ ] **Progressive Degradation Fallback:** `@supports (@scope (a) to (b))` block is provided with graceful fallback descendant selectors for older browsers.
- [ ] **No Layout Thrashing:** Scope boundaries do not contain invalid properties or cause unexpected layout loops with container queries.
- [ ] **DevTools Verification:** Checked computed styles in Chrome DevTools / Safari Web Inspector to confirm `@scope` blocks are recognized and active.
