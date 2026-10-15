# CSS Relational Selector (`:has()`) Performance, Specificity & Engine Heuristics

This reference guide details browser engine implementation mechanics, style invalidation algorithms, specificity calculations, and architectural heuristics for the CSS `:has()` relational selector.

---

## 1. Browser Engine Mechanics & Invalidation Costs

### Style Invalidation Mechanics
When a DOM mutation occurs (e.g., a element class changes, an input gets checked, or a node is inserted), browser rendering engines (Blink, Gecko, WebKit) must invalidate and recalculate styles for affected elements.

- **Standard Ancestor/Descendant Selectors (`.parent .child`):**
  Style invalidation flows **top-down**. When `.parent` changes, the engine inspects its descendants.
- **Relational Selectors (`.parent:has(.child)`):**
  Style invalidation flows **bottom-up / bidirectional**. When `.child` mutates (e.g., receives `:focus` or `:checked`), the engine must walk up the ancestor tree and inspect adjacent sibling subtrees to determine if any `.parent:has(...)` rules are matched.

### Invalidation Cost Heuristics

1. **Scoped Component Boundary (Low Cost - O(1) / O(depth)):**
   ```css
   /* FAST: Engine only checks immediate parent wrapper */
   .card-wrapper:has(input:checked) { ... }
   ```
   *Engine Behavior:* Direct parent node lookup. Invalidation scope is tightly constrained to `.card-wrapper`.

2. **Broad Unscoped Selector (High Cost - O(N) DOM Tree Traversal):**
   ```css
   /* SLOW: Engine must traverse every ancestor up to <body> on every input state change */
   body:has(.is-active) .navigation-link { ... }
   ```
   *Engine Behavior:* Mutating any element with class `.is-active` forces style invalidation checks across the entire document body.

3. **Universal / Disjunction Queries (Severe Invalidation Penalty):**
   ```css
   /* NEVER USE: Forces global subtree style invalidation */
   *:has(:focus) { ... }
   ```

---

## 2. Specificity Calculation Rules

According to the W3C Selectors Level 4 specification, the specificity of `:has()` is **NOT** zero. Instead, its specificity is equal to the **most specific selector in its argument list**.

### Specificity Examples

| Selector | Specificity Tuple `(A, B, C)` | Explanation |
| :--- | :--- | :--- |
| `.card:has(input)` | `(0, 1, 1)` | `(0, 1, 0)` for `.card` + `(0, 0, 1)` for `input` |
| `.card:has(input[type="checkbox"])` | `(0, 2, 1)` | `(0, 1, 0)` for `.card` + `(0, 1, 1)` for `input[type="checkbox"]` |
| `.card:has(#submit-btn)` | `(1, 1, 0)` | `(0, 1, 0)` for `.card` + `(1, 0, 0)` for `#submit-btn` |
| `.card:has(:where(#submit-btn))` | `(0, 1, 0)` | `:where()` neutralizes specificity of inside argument to `(0, 0, 0)`. |

### Specificity Management Strategy
When building reusable component libraries, avoid using high-specificity IDs or complex compound selectors inside `:has()`. Wrap arguments in `:where()` if you want to query descendant elements without inflating the parent rule's specificity:

```css
/* Keeps parent specificity strictly at (0, 1, 0) */
.component-card:has(:where(.primary-button:hover)) {
  border-color: var(--color-active);
}
```

---

## 3. Combinator Mapping & Relative Selector Logic

Inside `:has()`, relative selector combinators (`>`, `+`, `~`) evaluate relative to the **subject element** (the element attached to `:has()`).

```css
/* 1. Direct Child Combinator (>) */
/* Styles .parent ONLY if .child is an immediate direct child */
.parent:has(> .child) { ... }

/* 2. Direct Adjacent Sibling Combinator (+) */
/* Styles .element-A ONLY if .element-B immediately follows it */
.element-A:has(+ .element-B) { ... }

/* 3. General Subsequent Sibling Combinator (~) */
/* Styles .element-A if .element-B appears anywhere AFTER it in the same parent */
.element-A:has(~ .element-B) { ... }

/* 4. Descendant Combinator (space) */
/* Styles .parent if .child exists anywhere in its subtree */
.parent:has(.child) { ... }
```

---

## 4. Browser Engine Support Matrix & Fallback Protocols

### Baseline Support
- **Chromium / Blink (Chrome, Edge, Opera, Brave):** Version 105+ (Released Sept 2022)
- **WebKit (Safari iOS & macOS):** Version 15.4+ (Released March 2022)
- **Gecko (Firefox):** Version 121+ (Released Dec 2023)

### `@supports` Feature Detection Query

```css
/* Fallback protocol for progressive enhancement */
@supports not selector(:has(*)) {
  /* Legacy JS-assisted fallback styling */
  .card-wrapper.is-selected {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
  }
}

@supports selector(:has(*)) {
  /* Native pure CSS relational styling */
  .card-wrapper:has(input:checked) {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
  }
}
```
