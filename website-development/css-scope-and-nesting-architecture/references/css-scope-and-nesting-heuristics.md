# CSS Scope and Nesting Technical Reference & Heuristics

## 1. W3C Native CSS `@scope` Fundamentals

Native CSS `@scope` is a W3C Cascading Style Sheets Module Level 6 specification that allows developers to bound style rules to a specific DOM subtree.

### Key Syntax Elements

1. **Scoping Root (`@scope (<root-selector>)`):** Defines the starting DOM element where scoped styles begin to apply.
2. **Scoping Limit (`to (<limit-selector>)`):** Optional parameter defining the boundary where scoped styles STOP applying (creating a "Donut Scope").
3. **The `:scope` Pseudo-Class:** Matches the scoping root element within the `@scope` block.

```css
/* Scopes styles from .media-card down to, but NOT including, .media-card__slot */
@scope (.media-card) to (.media-card__slot) {
  :scope {
    /* Styles for .media-card itself */
    display: flex;
    border: 1px solid #ccc;
  }

  .title {
    /* Styles for .title ONLY inside .media-card, outside .media-card__slot */
    font-size: 1.25rem;
  }
}
```

---

## 2. Specificity and Proximity Mechanics

### Specificity Calculation

Inside a scoped block defined as `@scope (.root-class)`, the selector specificity is calculated as:

$$\text{Total Specificity} = \text{Specificity}(\text{Scoping Root}) + \text{Specificity}(\text{Target Selector})$$

For example, `@scope (.card)` styling `.title` has a specificity equivalent to `.card .title` (`(0, 2, 0)`).

#### Reducing Root Specificity with `:where()`

To create zero-specificity scoping roots, wrap the root selector in `:where()`:

```css
@scope (:where(.card)) {
  .title {
    /* Specificity is (0, 1, 0) - equivalent to just .title */
    color: #2563eb;
  }
}
```

### Proximity-Based Cascade Resolution

When two scoped selectors have **identical specificity**, CSS `@scope` resolves the conflict using **Scope Proximity** (the DOM distance between the scoping root and the matched target element) rather than declaration order.

```css
@scope (.dark-theme) {
  .text { color: #ffffff; }
}

@scope (.light-panel) {
  .text { color: #000000; }
}
```

```html
<div class="dark-theme">
  <!-- .text is inside .light-panel which is inside .dark-theme -->
  <div class="light-panel">
    <p class="text">Scope Proximity renders this TEXT BLACK because .light-panel is closer in the DOM tree!</p>
  </div>
</div>
```

---

## 3. Native CSS Nesting Parser Rules

W3C CSS Nesting Module Level 1 defines native syntax for nesting rules inside parent rules.

### Nesting Operator (`&`)

- The `&` symbol represents the specificity-matched result of the parent selector, wrapped in `:is()`.
- Consequently, `&.active` becomes `:is(.parent).active`.

```css
.card {
  background: white;

  /* Expanded as :is(.card):hover */
  &:hover {
    background: #f8fafc;
  }

  /* Expanded as :is(.card) .card__title */
  .card__title {
    font-weight: bold;
  }
}
```

### Type Selectors and Relaxation Rules

In updated browser implementations (Chrome 120+, Safari 17.2+, Firefox 117+), direct type selectors can be nested without needing an explicit `&`:

```css
/* Valid in modern nesting parser */
.card {
  p {
    margin-bottom: 1rem;
  }
}
```

*Best Practice:* Explicitly using `& p` or class-based selectors improves code readability and eliminates parsing ambiguity across edge-case engines.

---

## 4. Browser Compatibility Matrix

| Feature | Chrome / Edge | Safari | Firefox | Baseline |
| :--- | :--- | :--- | :--- | :--- |
| **Native CSS Nesting (`&`)** | 112+ (Relaxed 120+) | 16.5+ (Relaxed 17.2+) | 117+ | Newly Available |
| **Native CSS `@scope`** | 118+ | 17.4+ | 128+ | Modern |
| **Donut Scoping (`to (...)`)** | 118+ | 17.4+ | 128+ | Modern |
| **Scope Proximity Cascade** | 118+ | 17.4+ | 128+ | Modern |
