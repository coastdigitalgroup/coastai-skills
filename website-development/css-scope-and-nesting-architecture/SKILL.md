---
name: css-scope-and-nesting-architecture
description:
  Architect, encapsulate, and structure frontend component styles using W3C native CSS @scope (including donut-scoped boundaries) and native CSS Nesting to prevent global style leakage and eliminate preprocessor dependencies.
---

# CSS Scope and Nesting Architecture

## Purpose

The CSS Scope and Nesting Architecture skill provides a technical protocol, CSS architecture, audit checklist, and heuristics reference for encapsulating component styles using native W3C CSS `@scope` and native CSS Nesting.

Historically, preventing CSS style leakage across components required CSS-in-JS abstractions, heavy preprocessors (SASS/LESS), Shadow DOM encapsulation, or strict BEM naming conventions (e.g., `.media-card__title--active`). Native CSS `@scope` solves cascade pollution at the browser level by creating explicit scoping roots and "donut scopes" (scoping boundaries that exclude nested child containers). Native CSS Nesting allows hierarchical rule grouping directly in vanilla CSS without build steps.

---

## Use Cases

- **Component Encapsulation without Shadow DOM:** Styling Web Components, React, Vue, Svelte, or server-rendered HTML components without risking global selector leaks.
- **Donut Scoping for Slot/Content Containers:** Styling a card, modal, or layout container while explicitly excluding user-injected slotted content or rich-text editor body areas (`@scope (.card) to (.card__content)`).
- **Proximity-Based Cascade Resolution:** Resolving specificity ties using proximity-based cascade rules rather than specificity escalation (`!important` or artificially inflated selector chains).
- **Design System Token Nesting:** Grouping component variants, pseudo-classes, and media queries cleanly under a single selector hierarchy.
- **Legacy Micro-Frontend Isolation:** Isolating CSS for legacy micro-apps or third-party widgets embedded within a larger application host without breaking global utility classes.

---

## When NOT to Use

- **Global Utility Classes:** Atomic CSS libraries or global helper classes (e.g., `.hidden`, `.flex`, `.text-center`) that must apply uniformly across all DOM subtrees regardless of scope boundaries.
- **Legacy Browser Requirements Without Progressive Enhancement:** Applications strictly requiring legacy browser support (e.g., Safari < 17.4 or Chrome < 118) where `@scope` cannot be polyfilled efficiently without Shadow DOM or preprocessors.
- **Global Theme Foundations:** CSS Custom Property definitions on `:root` or global reset stylesheets (`* { box-sizing: border-box; }`).

---

## Inputs

1. **Target Component Markup:** HTML structure of the component and its potential slot/content insertion points.
2. **Scoping Boundary (`@scope (root) to (limit)`):** Definition of where styles begin and where they MUST stop applying (donut boundary).
3. **Selector Hierarchy:** Component sub-elements, states (`:hover`, `:focus-visible`, `[aria-expanded="true"]`), and media/container queries.
4. **Fallback Strategy:** CSS `@supports` blocks or cascade fallback rules for non-supporting browsers.

---

## Outputs

1. **Scoped CSS Module:** Native `@scope` declarations encapsulating component selectors.
2. **Donut Scope Boundaries:** Clean exclusion zones preserving child component autonomy.
3. **Nested Hierarchy:** Legible, performant CSS Nesting using `&` and native relative selectors.
4. **Audit Checklist & Validation Rules:** Specificity and scope sanity checks.

---

## Workflow

### 1. Identify Scoping Root and Donut Limits

Determine the component's outer root element and any inner regions that host dynamic child components or slotted markup.

```html
<!-- Component HTML Structure -->
<article class="media-card">
  <header class="media-card__header">
    <h3 class="title">Article Title</h3>
  </header>

  <!-- Donut Limit: The content area should NOT inherit media-card internal styles -->
  <div class="media-card__content">
    <div class="nested-widget">
      <h3 class="title">Widget Title (Must remain unaffected by media-card)</h3>
    </div>
  </div>
</article>
```

---

### 2. Formulate Native `@scope` Rules

Use `@scope (<scoping-root>) to (<scoping-limit>)` to declare styles that apply exclusively to elements inside the root up to the limit boundary.

```css
/* Baseline / Fallback Styles */
.media-card {
  border: 1fr solid #e2e8f0;
  border-radius: 0.5rem;
}

/* Native @scope declaration */
@scope (.media-card) to (.media-card__content) {
  /* :scope targets the scoping root (.media-card) itself */
  :scope {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 1.5rem;
  }

  /* Direct sub-element styling within scope */
  .title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.5rem 0;
  }

  .media-card__header {
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 0.75rem;
  }
}
```

---

### 3. Integrate Native CSS Nesting

Group states, pseudo-elements, child selectors, and media/container queries using native CSS Nesting rules (`&`).

```css
@scope (.button-group) {
  :scope {
    display: inline-flex;
    gap: 0.5rem;

    /* Nested state query using & */
    &:hover {
      background-color: #f8fafc;
    }

    /* Nested media query */
    @media (max-width: 640px) {
      flex-direction: column;
      width: 100%;
    }
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;

    /* Nested state matching */
    &:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    &.primary {
      background-color: #2563eb;
      color: #ffffff;

      &:hover {
        background-color: #1d4ed8;
      }
    }
  }
}
```

---

### 4. Leverage Proximity-Based Specificity

Understand that `@scope` resolves specificity ties based on proximity to the scoping root rather than selector weight.

```css
/* Dark theme wrapper scope */
@scope (.dark-theme) {
  .text {
    color: #f8fafc;
  }
}

/* Light sidebar wrapper scope */
@scope (.light-sidebar) {
  .text {
    color: #0f172a;
  }
}

/*
If <div class="dark-theme"><aside class="light-sidebar"><p class="text">
The paragraph is closer to .light-sidebar than .dark-theme.
Native @scope selects .light-sidebar color (#0f172a) due to scoping proximity!
*/
```

---

### 5. Provide Fallbacks with `@supports`

Maintain support for browsers lacking native `@scope` support while progressively enhancing modern browsers.

```css
/* Fallback using standard class scoping */
.media-card .title {
  font-size: 1.25rem;
  color: #0f172a;
}

/* Progressive enhancement with native @scope */
@supports (scope: (.test)) {
  @scope (.media-card) to (.media-card__content) {
    .title {
      font-size: 1.25rem;
      color: #0f172a;
    }
  }
}
```

---

## Decision Rules

### Selector Architecture Selection

| Scenario | Recommended Approach | Key Benefit |
| :--- | :--- | :--- |
| Standard UI Component (Card, Nav, Hero) | `@scope (.component-root)` | Prevents styles from leaking outside the component tree. |
| Container with dynamic user/slotted content | Donut Scope: `@scope (.root) to (.slot-container)` | Protects child/slotted components from parent style bleed. |
| Nested component state variations | Native CSS Nesting (`&.state`, `&:hover`) | Clean, readable hierarchy matching DOM structure without preprocessors. |
| Nested element media/container adaptations | `@container` / `@media` inside `@scope` / nesting | Modular layout rules colocated with component definition. |

---

## Constraints

- **Specificity Mechanics:** Specificity within `@scope` rules includes the specificity of the scoping root selector, UNLESS written with inline `<style @scope>` HTML elements or `:where()` wrapping.
- **Nesting Specificity:** Native CSS Nesting evaluates `&` as if wrapped in `:is()`. Consequently, `& .child` matches the highest specificity of any compound selector in the parent rule.
- **DOM Proximity Priority:** Scope proximity takes precedence over declaration order when selectors have identical specificity.
- **No Style Isolation from Above:** Native `@scope` prevents styles from leaking *out* of the scoping root, but it does NOT block global styles from leaking *in* (unlike Shadow DOM). Use CSS Cascade Layers (`@layer`) alongside `@scope` for full incoming/outgoing protection.

---

## Non-Goals

- Replacing Shadow DOM encapsulated web components when full DOM/event isolation is required.
- Replacing utility-first CSS frameworks if atomic CSS is the explicit architecture.
- Building custom JS-based scoping or CSS-in-JS compilation pipelines.

---

## Common Failure Patterns

- **Over-Nesting (`> 3` Levels Deep):** Creating deeply nested CSS rules (`.a { & .b { & .c { & .d { ... } } } }`) which increases compiled selector length and degrades developer readability.
- **Forgetting Donut Limits on Slot Wrappers:** Defining `@scope (.modal)` without excluding `.modal-body-slot`, causing global paragraph or button styles inside the modal slot to inherit unintended modal-specific overrides.
- **Confusing `:scope` with `&`:** Using `&` inside `@scope` when referring to the scoping root instead of `:scope`. (`:scope` specifically references the scoping root element).
- **Broken Nesting Syntax with Type Selectors:** Writing `div { p { ... } }` without understanding browser parser differences across early CSS Nesting specification revisions (always test or use `& p` / direct element tags cleanly).

---

## Validation Steps

- [ ] **Scope Leakage Test:** Inspect DOM elements outside `.scoping-root`. Confirm zero scoped properties are applied to external siblings or parents.
- [ ] **Donut Boundary Audit:** Inspect child components located inside `.scoping-limit`. Verify they do NOT inherit styles declared in the parent's `@scope` block.
- [ ] **Proximity Test:** Nest scoping roots (`.light-theme` inside `.dark-theme`). Confirm elements resolve styles matching their nearest scoping root.
- [ ] **DevTools Inspection:** Open Browser DevTools (Chrome 118+, Safari 17.4+, Firefox 128+) and verify rules appear under `@scope` groupings in the Styles pane.
- [ ] **Syntax & Validation Pass:** Validate CSS through `node scripts/check-skills.mjs` to confirm skill structural completeness.
