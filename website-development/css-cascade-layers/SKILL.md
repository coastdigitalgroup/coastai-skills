---
name: css-cascade-layers
description:
  Systematically manage CSS precedence independently of selector specificity
  using the native @layer API to resolve style conflicts and manage large
  codebases.
---

# CSS Cascade Layers

## Purpose

The CSS Cascade Layers skill provides a technical protocol for controlling the
CSS cascade (the "C" in CSS) without relying on selector specificity hacks (like
`!important` or overly long selectors). By organizing styles into layers,
developers can ensure that design system defaults, component styles, and
third-party library overrides interact predictably, regardless of when they are
loaded or how specific their selectors are.

## Use Cases

- **Library Overrides:** Overriding styles from a heavy third-party framework
  (like Bootstrap or Tailwind) with simple selectors.
- **Design Systems:** Establishing a clear hierarchy between "reset" styles,
  "base" typography, and "component" specifics.
- **Theming:** Applying theme-specific overrides that are guaranteed to win over
  default component styles.
- **Micro-Frontends:** Preventing style leakage and conflicts between different
  teams' CSS by isolating them into named layers.

## When NOT to Use

- **Legacy Browser Support:** Projects requiring support for browsers older than
  2022 (e.g., Safari < 15.4, Chrome < 99, Firefox < 97) without a polyfill.
- **Small Projects:** Where specificity is easily managed with standard
  conventions like BEM.
- **Specific Interaction States:** Standard pseudo-classes (like `:hover` or
  `:focus`) should usually remain part of the component's natural specificity
  unless the entire component is layered.

## Inputs

1. **CSS Architecture Plan:** A map of how styles should be prioritized (e.g.,
   Reset > Base > Components > Utilities).
2. **Conflict Inventory:** A list of existing specificity "wars" where
   developers are forced to use `!important` or nested selectors.
3. **Third-Party Styles:** External CSS files that need to be integrated but
   potentially overridden.

## Outputs

1. **Layer Order Declaration:** A centralized `@layer` statement defining the
   priority of all layers.
2. **Layered CSS Blocks:** CSS rules wrapped in `@layer` blocks or imported into
   specific layers.
3. **Clean Selectors:** Simplified CSS selectors that no longer need high
   specificity to function.

## Workflow

### 1. Establish the Layer Hierarchy

At the very top of your main CSS file, declare the order of layers. The **last**
layer in the list has the **highest** priority for normal styles.

```css
@layer reset, base, components, utilities;
```

### 2. Assign Styles to Layers

Wrap your existing CSS in the defined layers.

```css
@layer base {
  a { color: blue; }
}

@layer components {
  .nav-link { color: red; } /* Wins over 'base' even if specificity was equal */
}
```

### 3. Handle External Libraries

Import third-party CSS into a low-priority layer to make them easier to
override.

```css
@import "bootstrap.css" layer(vendor);
```

### 4. Manage Unlayered Styles

Recognize that **unlayered styles** (styles outside any `@layer` block) have the
highest priority for normal declarations. Use this for "one-off" overrides or
styles that haven't been migrated yet.

### 5. Refactor Specificity

Remove redundant IDs or nested selectors (e.g., `.header .nav .item .link`) and
replace them with simple classes, relying on the layer order for precedence.

## Decision Rules

- **Layer Order:** Place "Reset" and "Vendor" layers first. Place "Utilities"
  last.
- **Naming:** Use clear, semantic names for layers. For large teams, consider
  prefixing (e.g., `brand-components`).
- **Nesting:** You can nest layers (e.g., `@layer framework.theme`), but use
  this sparingly to avoid over-complicating the hierarchy.
- **!important:** Avoid using `!important` inside layers if possible. Remember
  that layered `!important` styles override unlayered `!important` styles, and
  **earlier** layers win over **later** layers in the `!important` context.

## Constraints

- **Order Matters:** The order of `@layer` declarations is the single source of
  truth for precedence.
- **Browser Support:** Always check the baseline support for `@layer`.
- **Shadow DOM:** Cascade layers do not cross Shadow DOM boundaries; they must
  be defined within each shadow root if needed.

## Non-Goals

- Replacing CSS Modules or Scoped CSS (layers manage precedence, not scope).
- Replacing CSS Custom Properties (Variables).
- Solving layout issues (Flexbox/Grid).

## Common Failure Patterns

- **Wrong Declaration Order:** Forgetting to declare the `@layer` order at the
  top, leading to layers being prioritized by their first appearance in the
  code.
- **The Unlayered Surprise:** Expecting a layered utility to win over an
  unlayered component style. (Unlayered always wins for normal styles).
- **!important Reversal:** Being confused when an `!important` style in a
  "lower" layer (like `reset`) overrides an `!important` style in a "higher"
  layer (like `utilities`).
- **Mixed Imports:** Mixing layered and unlayered `@import` statements in a
  way that breaks the expected cascade.

## Validation Steps

- [ ] **Cascade Audit:** Use the "Styles" tab in Browser DevTools to verify
      which layer a property is coming from.
- [ ] **Order Test:** Add a test property to the first and last layer for the
      same element and verify the last layer wins.
- [ ] **Unlayered Check:** Ensure that unlayered styles are intentionally
      overriding layered ones where expected.
- [ ] **!important Check:** If using `!important`, verify it behaves correctly
      according to the "reversal" rule.
