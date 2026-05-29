---
name: css-cascade-layers
description:
  Manage CSS specificity and source order issues using the native @layer API to
  create predictable, maintainable style architectures.
---

# CSS Cascade Layers

## Purpose

The CSS Cascade Layers skill provides a technical framework for controlling the
CSS cascade independently of selector specificity. It allows developers to
organize styles into explicit layers, ensuring that "Utility" styles always
override "Component" styles, and "Component" styles always override "Base"
styles, regardless of how specific the selectors are.

## Use Cases

- **Third-Party Integration:** Overriding styles from a component library (e.g.,
  Bootstrap, Tailwind, or a proprietary UI kit) without using `!important` or
  fighting high-specificity selectors.
- **Architectural Organization:** Implementing a clear "ITCSS" or "SMACSS"
  inspired hierarchy where layers like `reset`, `base`, `theme`, and `utilities`
  have a guaranteed order of precedence.
- **Micro-Frontends/Legacy Migration:** Protecting new styles from being
  accidentally overridden by legacy "global" CSS by placing them in different
  layers.

## When NOT to Use

- **Very Simple Sites:** For a small site with a single CSS file and low
  selector complexity, layers may add unnecessary abstraction.
- **Legacy Browser Support:** If the project must support browsers older than
  early 2022 (e.g., IE11, Chrome < 99, Safari < 15.4) without a complex build
  step polyfill.

## Inputs

1. **CSS Architecture Plan:** Definition of the required layers (e.g., `reset`,
   `base`, `components`, `utilities`).
2. **Conflict Points:** Identification of selectors that are currently fighting
   for precedence.
3. **Third-Party Assets:** CSS files or libraries that need to be "tamed" by
   placing them in a specific cascade position.

## Outputs

1. **Layer Definition:** A centralized `@layer` statement defining the project's
   precedence order.
2. **Layered CSS:** Refactored CSS blocks wrapped in `@layer` blocks.
3. **Import Strategy:** A method for importing external files into specific
   layers.

## Workflow

### 1. Establish the Order of Precedence

At the very beginning of your main CSS entry point, define your layers in order
of **lowest to highest** priority:

```css
@layer reset, base, library, components, utilities;
```

### 2. Wrap Styles in Layers

Assign existing or new styles to their respective layers:

```css
@layer components {
  .card {
    padding: 1rem;
    border: 1px solid silver;
  }
}

@layer utilities {
  .border-none {
    border: none;
  }
}
```

### 3. Handle Third-Party Styles

Import external libraries into a specific layer to ensure they don't overpower
your custom overrides:

```css
@import "bootstrap.css" layer(library);
```

### 4. Verify the Cascade

Use browser DevTools (Styles pane) to see how layers are being applied. Layer
precedence overrides selector specificity.

## Decision Rules

- **The "Unlayered" Rule:** Styles not in any `@layer` always have the
  **highest** priority (except for `!important` rules). Use this for temporary
  fixes or styles that must absolutely win.
- **Ordering Strategy:** Always define the order explicitly at the top of the
  file using `@layer name1, name2;`. Do not rely on the order in which layers
  first appear in the code.
- **Important Flag:** Be aware that `!important` in an **earlier** (lower
  priority) layer will override `!important` in a **later** (higher priority)
  layer. This is the opposite of standard layer behavior.

## Constraints

- **Browser Support:** Requires modern browser support (Chrome 99+, Firefox 97+,
  Safari 15.4+).
- **Placement:** The `@layer` order definition should ideally be the first
  thing in your CSS, after `@charset` and before any non-layer `@import`
  statements.

## Non-Goals

- Managing Z-index (use `css-stacking-contexts` for that).
- Handling CSS-in-JS specific implementations (though principles apply).
- Detailed styling of specific UI components.

## Common Failure Patterns

- **Implicit Ordering:** Forgetting to define the layer order at the top,
  leading to priority being determined by the file import order.
- **Mixing Layered and Unlayered:** Being surprised when a simple `.btn` selector
  (unlayered) overrides a `#header .nav-item .btn` selector (layered).
- **The `!important` Flip:** Using `!important` inside layers and finding it
  harder to override because layered `!important` precedence is inverted.

## Validation Steps

- [ ] **DevTools Audit:** Inspect an element in Chrome/Firefox and verify the
      "Layers" view shows the expected precedence.
- [ ] **Specificity Test:** Confirm that a utility class (in a high-priority
      layer) overrides a complex ID/Class selector (in a lower-priority layer).
- [ ] **Import Check:** Verify that `@import ... layer(name)` successfully
      constrains the imported library.
