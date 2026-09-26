---
name: css-scope-and-nesting-architecture
description: Architect, encapsulate, and structure modular component styles using W3C native CSS @scope and CSS Nesting. Implement donut-scoped style boundaries, scoping proximity resolution, and nested pseudo-selectors without build-step preprocessors or BEM naming bloat.
---

# CSS Scope and Nesting Architecture

## Purpose

The CSS Scope and Nesting Architecture skill provides a standardized framework and architectural rules for modularizing component styles natively in modern browsers using W3C CSS `@scope` and native CSS Nesting.

Historically, CSS component encapsulation required build-step preprocessors (Sass, Less), heavy utility frameworks, complex BEM naming conventions (`.article-card__header--active`), CSS Modules, or Shadow DOM boundaries. While Shadow DOM provides strict encapsulation, it also isolates elements from document-level typography, global custom properties, and native light-DOM accessibility relationships.

Native CSS `@scope` and CSS Nesting solve style isolation directly in CSS:
1. **Scoped Selector Isolation (`@scope`):** Restricts CSS selector targeting to a specific DOM subtree root without mutating global specificity or relying on arbitrary class name hashing.
2. **"Donut Scoping" (`to (...)`):** Excludes nested sub-containers or child component slots from parent component styles, preventing unwanted style leaking into slotted content.
3. **Scoping Proximity:** Resolves cascade conflicts between overlapping scopes based on DOM proximity (closer ancestor root wins) rather than source order or inflated specificity.
4. **Native CSS Nesting:** Organizes component state variants (`:hover`, `:focus-visible`, `&[data-state="active"]`), media queries (`@media`), and child elements in clear, hierarchical code blocks natively parsed by modern browser engines.

---

## Use Cases

- **Design System Component Libraries:** Encapsulating UI components (cards, accordions, modals, navigation drawers) so parent styles do not leak into child sub-trees.
- **CMS & Rich-Text Content Containers:** Applying editorial card or callout block styling (`@scope (.callout-box)`) while excluding dynamic user-generated HTML injected into a nested slotted body (`to (.user-content)`).
- **Eliminating Build-Step Preprocessors:** Replacing Sass/SCSS nesting and CSS Modules with pure W3C standards that run directly in modern browser engines without compilation overhead.
- **Nested Layout & State Management:** Structuring component interactive states (`:hover`, `:has()`, `:focus-within`, `[aria-expanded="true"]`) and media queries in cohesive visual blocks.
- **Micro-Frontend Component Boundaries:** Isolating styles across independently deployed frontend modules without forcing web components onto standard light-DOM HTML structures.

---

## When NOT to Use

- **Global Utility & Atomic CSS Systems:** Utility-first class frameworks (e.g., global `.flex`, `.p-4`, `.text-center`) that are designed to apply globally across all components without scoping boundaries.
- **Legacy Browser Engines Requiring No Fallback:** Legacy browser deployments (e.g., Safari < 17.4 or Chrome < 118) where polyfilling CSS `@scope` is impractical and graceful degradation is not permitted.
- **Shadow DOM Web Components:** When components require hard web component isolation (where host page global styles must be completely blocked from reaching internal shadow roots).
- **Global Design Tokens & Reset Styles:** Document-root CSS variables (`:root`), base element resets (`body`, `*, *::before`), and global typography rules that must apply across all DOM subtrees without scope boundaries.

---

## Inputs

1. **Target Component Markup:** HTML structure defining component boundaries, scope roots (e.g., `<article class="media-card">`), and any internal slots or nested sub-components.
2. **Boundary Requirements:** Identification of sub-elements that should be excluded from parent styling ("donut slots", e.g., `to (.card-slot)`).
3. **Interactive & Responsive States:** Visual design requirements for hover, focus, disabled, theme variations (`[data-theme="dark"]`), and viewport or container query adaptations.

---

## Outputs

1. **Modular Native Scoped Stylesheet:** Clean, native CSS utilizing `@scope (<root>) to (<limit>)` blocks and nested rule sets (`&`).
2. **Proximity & Cascade Architecture:** Specificity-calibrated rules leveraging `:scope` pseudo-class references and scope proximity rules.
3. **Progressive Degradation Layer:** Fallback rules (`@supports (@scope (a) to (b))`) ensuring readable, un-broken layout in browsers lacking `@scope` support.

---

## Workflow

### 1. Identify Component Scope Root and Donut Boundaries

Analyze the HTML structure. Determine the scope root selector (e.g., `.product-card`) and identify any child slots or nested sub-components that must be protected from parent styles (e.g., `.product-reviews` or `.slot-content`).

```html
<div class="product-card">
  <header class="card-header">
    <h3 class="title">Premium Headphones</h3>
  </header>
  <div class="card-body">
    <p class="description">High-fidelity sound with active noise cancellation.</p>
    <!-- Donut Hole: Nested slot where user content or nested cards reside -->
    <div class="card-slot">
      <article class="nested-review">
        <h4 class="title">Customer Review</h4> <!-- Must NOT be styled by card header title rules -->
      </article>
    </div>
  </div>
</div>
```

### 2. Formulate `@scope` Rule with Donut Limits

Write the `@scope` block. Set the scope root inside `@scope (<root>)`. To prevent style leakage into nested content slots, append `to (<limit>)`.

```css
/* Base component scope with donut limit */
@scope (.product-card) to (.card-slot) {
  /* Targets .product-card root itself */
  :scope {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 12px;
    background-color: var(--card-bg, #ffffff);
    padding: 1.5rem;
  }

  /* Direct child elements inside scope but outside .card-slot */
  .title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary, #0f172a);
    margin: 0 0 0.5rem 0;
  }

  .description {
    color: var(--text-muted, #64748b);
    line-height: 1.5;
  }
}
```

### 3. Apply Native CSS Nesting for States and Media Queries

Inside the `@scope` block (or inside stand-alone component rules), use native CSS Nesting to group interactive pseudo-classes (`:hover`, `:focus-visible`), attribute selectors (`&[aria-expanded="true"]`), descendant selectors, and media/container queries.

```css
@scope (.product-card) to (.card-slot) {
  :scope {
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    /* Interactive state nesting with & */
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }

    &:focus-within {
      outline: 2px solid var(--focus-ring, #2563eb);
      outline-offset: 4px;
    }

    /* Nested media and container queries */
    @container (min-width: 400px) {
      flex-direction: row;
      align-items: center;
    }
  }

  /* Nested sub-element styling */
  .card-header {
    border-bottom: 1px solid var(--divider-color, #f1f5f9);
    padding-bottom: 0.75rem;

    /* Nested pseudo-element */
    &::after {
      content: "";
      display: block;
      width: 2rem;
      height: 2px;
      background: var(--accent-color, #2563eb);
      margin-top: 0.5rem;
    }
  }
}
```

### 4. Leverage Scoping Proximity for Overlapping Scopes

When components are nested inside other components of the same or different type, `@scope` resolves cascade conflicts using **Scoping Proximity**. The scope root closest to the target element in the DOM tree wins over more distant ancestor scope roots, regardless of source order in the CSS stylesheet.

```html
<div class="theme-panel" data-theme="light">
  <p class="text">Light panel text</p>
  <div class="theme-panel" data-theme="dark">
    <p class="text">Dark panel text (Closer scope root wins!)</p>
  </div>
</div>
```

```css
/* Source order 1 */
@scope ([data-theme="dark"]) {
  .text {
    color: #f8fafc;
  }
}

/* Source order 2 */
@scope ([data-theme="light"]) {
  .text {
    color: #0f172a;
  }
}
/* Scoping proximity guarantees that the dark nested panel's .text gets #f8fafc,
   even though [data-theme="light"] appears second in the stylesheet! */
```

### 5. Implement Progressive Enhancement Fallbacks

Provide fallback styles for browsers that do not yet support native `@scope` using `@supports`.

```css
/* Modern browsers with @scope support */
@supports (@scope (.a) to (.b)) {
  @scope (.product-card) to (.card-slot) {
    .title {
      color: #0f172a;
    }
  }
}

/* Fallback for legacy browsers using standard descendant scoping */
@supports not (@scope (.a) to (.b)) {
  .product-card .title {
    color: #0f172a;
  }
}
```

---

## Decision Rules

### Architecture Selection Matrix

| Design Requirement | Use `@scope` | Use CSS Nesting (`&`) | Use Donut Limit `to (...)` | Use `:scope` |
| :--- | :--- | :--- | :--- | :--- |
| **Isolate component styles from page leakage** | **Yes** | Optional | Optional | Optional |
| **Prevent parent styles from overriding slotted children** | **Yes** | Optional | **Yes** | Optional |
| **Group button `:hover`, `:active`, and `:focus-visible` states** | Optional | **Yes** | No | Optional |
| **Style the root container element inside a scope** | **Yes** | Optional | No | **Yes** (`:scope`) |
| **Resolve nested component theme conflicts by DOM proximity** | **Yes** | Optional | Optional | Optional |

---

## Constraints

- **Nesting Specificity Standard:** Native CSS Nesting evaluates the parent selector in a nested block as if wrapped in `:is(...)`. This means nested rules take on the specificity of the *most specific* selector in a group (e.g., `header, #main-header { .title { ... } }` gives `.title` the specificity of `#main-header` + `.title`).
- **Nesting Selector Syntax:** Native CSS Nesting allows direct element selectors (e.g. `div { span { color: red; } }`), but starting nested selectors with `&`, `.`, `#`, or `:` improves code readability and prevents syntax confusion with CSS properties.
- **Scope Limit Exclusions:** Elements matching the donut boundary (`to (<limit>)`) and all of their descendants are excluded from the scope. If you need to style the limit boundary element itself, target it from the outer scope before the limit threshold.
- **Browser Compatibility:**
  - Native CSS Nesting: Supported in Chrome 112+, Edge 112+, Firefox 117+, Safari 16.5+.
  - Native CSS `@scope`: Supported in Chrome 118+, Edge 118+, Safari 17.4+, Firefox 128+.
  - Always provide `@supports` queries or standard CSS fallbacks where broad legacy browser support is strictly required.

---

## Non-Goals

- Replacing global CSS custom properties (`:root`) or theme design tokens.
- Providing JS runtime CSS-in-JS emulation or DOM hashing libraries.
- Polyfilling native Shadow DOM slot projection mechanisms in JavaScript.

---

## Common Failure Patterns

- **Over-nesting Depth (The "Sass Pyramid of Doom"):** Nesting selectors 4+ levels deep (e.g., `.card { .body { .content { .button { span { ... } } } } }`). Result: Hard-to-override rules and brittle, tight coupling to exact DOM structure. Keep nesting to a maximum of 2-3 levels.
- **Confusing `:scope` with `:root` or `&`:** Using `&` inside `@scope` without understanding that `&` in `@scope` refers to the scope root selector, while `:scope` represents the matched scope root element.
- **Forgetting Donut Limits on Content Slots:** Writing `@scope (.article-card)` without `to (.slot)` when the card contains arbitrary user HTML. Result: Paragraphs and titles inside user-generated blog comments accidentally inherit card header styles.
- **Misunderstanding Scoping Proximity vs. Specificity:** Assuming `@scope` inflates specificity. `@scope` does NOT add specificity to selectors inside it unless `:scope` is explicitly included in the selector chain. Scoping proximity only acts as a tie-breaker when selector specificity is equal.
- **Invalid Nesting Syntax:** Placing CSS properties *below* nested rule blocks in the same declaration block in engines using older nesting syntax revisions. Best practice: Always declare property declarations at the top of a selector block before writing nested child rules.

---

## Validation Steps

### 1. Scope Boundary & Donut Isolation Test
- [ ] Inspect the component in browser DevTools.
- [ ] Verify that styles inside `@scope (.card) to (.slot)` apply to `.card` children.
- [ ] Verify that elements inside `.slot` do NOT inherit rules declared within the card scope.

### 2. Scoping Proximity Cascade Check
- [ ] Nest a dark-themed component scope inside a light-themed component scope.
- [ ] Verify that text inside the dark-themed inner scope receives dark theme styling due to proximity, regardless of stylesheet rule order.

### 3. Nesting Syntax & Specificity Audit
- [ ] Verify that nested selectors do not exceed 3 levels of depth.
- [ ] Ensure all CSS property declarations are positioned at the top of declaration blocks before nested rules.
- [ ] Check computed specificity in DevTools to confirm `:is()` wrapping from nested selectors has not created unintended specificity spikes.

### 4. Progressive Fallback Test
- [ ] Test the stylesheet in an engine without `@scope` support or toggle `@supports` rules in DevTools.
- [ ] Confirm layout remains readable and functional with basic CSS fallbacks.
