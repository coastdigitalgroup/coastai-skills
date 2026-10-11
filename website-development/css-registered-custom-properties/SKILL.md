---
name: css-registered-custom-properties
description:
  Architect, type-check, and animate CSS custom properties using W3C CSS @property rules and JavaScript CSS.registerProperty() to enable smooth gradient transitions, typed token cascades, and fallback resilience.
---

# CSS Registered Custom Properties

## Purpose

The CSS Registered Custom Properties skill provides a standardized engineering methodology for declaring, typing, encapsulating, and animating CSS variables using the W3C CSS Properties and Values API (`@property` in CSS and `CSS.registerProperty()` in JavaScript). Standard CSS custom properties (`--my-var: 10px`) are treated as untyped token streams by browser rendering engines. Consequently, browsers cannot interpolate or animate standard CSS variables when used inside gradients, clip paths, angles, or numeric counters, resulting in abrupt, jarring UI state changes. Furthermore, untyped variables inherit unconditionally down the DOM tree, causing CSS token leakage and unpredictable component styling. Registering custom properties with explicit types (`<color>`, `<length>`, `<percentage>`, `<angle>`, `<number>`, `<transform-function>`), inheritance flags (`inherits: false`), and initial values unlocks smooth 60fps native CSS transitions, strong runtime type safety, and robust component encapsulation without JavaScript animation loops.

## Use Cases

- **Smooth Gradient Animations:** Interpolating color stops, stop percentages, or gradient angles in `linear-gradient()`, `radial-gradient()`, or `conic-gradient()` using standard CSS `:hover`, `:focus`, or `@keyframes` transitions.
- **Animated Conic Progress Rings & Timers:** Driving smooth 360-degree radial or conic progress indicators by animating a typed `<angle>` or `<percentage>` variable.
- **Spinning Gradient Borders:** Creating high-performance animated border glow effects using an animated `<angle>` token inside `conic-gradient()` borders.
- **Component Token Encapsulation:** Preventing scoped CSS variable tokens (e.g., `--card-bg`, `--button-border-width`) from unintentionally leaking into nested child components by setting `inherits: false`.
- **CSS-Driven Numeric Counters:** Interpolating numeric values (`syntax: "<integer>"`) for animated statistics or counter badges without relying on RequestAnimationFrame JS render loops.
- **Dynamic Clip-Path Morphing:** Smoothly morphing geometric masks or clip paths by animating typed `<percentage>` or `<length>` coordinates.

## When NOT to Use

- **Static Token Collections:** Do not register static design tokens (e.g., static brand colors, typography stacks) that never animate and require default DOM cascade inheritance across the entire document tree, unless explicit scope isolation is required.
- **Non-Animatable Untyped Values:** If a custom property stores arbitrary string tokens, multi-part shorthand values (e.g., `1px solid red`), or CSS keyword lists (e.g., `space-between flex-start`), do not use explicit syntax types; use universal syntax `syntax: "*"` or standard CSS variable declarations.
- **Legacy Browser Support Environments (< Baseline 2024):** If supporting obsolete browsers (such as Chrome < 85, Safari < 16.4, or Firefox < 128) without JavaScript fallback feature detection, avoid relying exclusively on `@property` for critical functional transitions without static fallback styles.

## Inputs

1. **Custom Property Name:** Standard CSS variable identifier starting with `--` (e.g., `--gradient-angle`, `--stop-color-1`, `--progress-percent`).
2. **Syntax Descriptor (`syntax`):** W3C data type string defining the property value type (e.g., `"<angle>"`, `"<color>"`, `"<percentage>"`, `"<length>"`, `"<number>"`, `"<integer>"`, `"<transform-function>"`).
3. **Inheritance Flag (`inherits`):** Boolean indicating whether child DOM elements inherit the custom property value from parent containers (`true` or `false`).
4. **Initial Value (`initial-value`):** Guaranteed fallback value matching the declared `syntax` type, required whenever `inherits` is explicitly set or when using typed syntax.

## Outputs

1. **Declarative CSS `@property` Blocks:** Production-ready CSS syntax rules declaring typed custom properties with guaranteed initial values and inheritance control.
2. **Imperative JS `CSS.registerProperty()` Fallbacks:** Feature-detected JavaScript registration code for dynamic or runtime property registration using `'registerProperty' in CSS`.
3. **Hardware-Accelerated CSS Transitions/Keyframes:** CSS rules binding typed variables to transition properties (`transition: --gradient-angle 0.5s ease`) for hardware-accelerated 60fps compositor thread execution.
4. **Accessible Reduced-Motion Overrides:** `@media (prefers-reduced-motion: reduce)` rules that disable or simplify variable transitions for users with vestibular sensitivity.

## Workflow

### 1. Identify Variable Typing and Animation Requirements

Determine if the target custom property requires smooth CSS interpolation or scope encapsulation. Identify its exact W3C data type:

| Animation Target | Recommended Syntax Descriptor | Example Value |
| :--- | :--- | :--- |
| Gradient Angles & Rotations | `"<angle>"` | `0deg`, `1turn`, `3.14rad` |
| Color Stops & Background Shifts | `"<color>"` | `#3b82f6`, `hsl(210 100% 50%)` |
| Progress & Scale Percentages | `"<percentage>"` | `0%`, `75%`, `100%` |
| Dimensions & Offsets | `"<length>"` | `0px`, `1.5rem`, `10vw` |
| Numeric Counters & Alpha Scale | `"<number>"` or `"<integer>"` | `0`, `42`, `0.85` |

### 2. Declare Declarative CSS `@property` Rules

Define the custom property at the root or component level using standard CSS `@property` syntax.

```css
/* Declare typed angle token for gradient rotations */
@property --gradient-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

/* Declare typed color token for smooth background transitions */
@property --glow-color {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(59, 130, 246, 0);
}

/* Declare typed percentage token for conic progress charts */
@property --progress-val {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}
```

### 3. Implement Imperative JS Registration (Optional / Dynamic Scenarios)

When custom properties are defined dynamically at runtime or in JS-driven design system modules, use feature-detected `CSS.registerProperty()`. Wrap in `try...catch` to handle duplicate registration gracefully.

```javascript
if ('registerProperty' in CSS) {
  try {
    CSS.registerProperty({
      name: '--gradient-angle',
      syntax: '<angle>',
      inherits: false,
      initialValue: '0deg',
    });
  } catch (err) {
    // Property already registered or invalid definition
    console.warn('CSS.registerProperty warning:', err.message);
  }
}
```

### 4. Bind Registered Custom Properties to CSS Transitions and Keyframes

Apply the registered property within CSS selectors and specify it directly in `transition` or `@keyframes` declarations.

```css
.card-glow-wrapper {
  /* Initialize local custom variable values */
  --gradient-angle: 0deg;
  --glow-color: rgba(59, 130, 246, 0.4);

  background: conic-gradient(
    from var(--gradient-angle),
    var(--glow-color),
    #8b5cf6,
    var(--glow-color)
  );

  /* Direct transition on registered custom properties */
  transition:
    --gradient-angle 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    --glow-color 0.4s ease;
}

.card-glow-wrapper:hover {
  --gradient-angle: 180deg;
  --glow-color: rgba(236, 72, 153, 0.9);
}
```

### 5. Configure Reduced Motion Accessibility

Users with vestibular disorders or motion sensitivity must not be subjected to continuous spinning gradients or rapid variable shifts. Wrap variable transitions or keyframe animations in `@media (prefers-reduced-motion)`.

```css
@media (prefers-reduced-motion: reduce) {
  .card-glow-wrapper {
    transition: none !important;
    animation: none !important;
  }
}
```

## Decision Rules

- **Syntax Selection (`syntax` descriptor):**
  - Use `"<color>"` when interpolating background colors, borders, shadows, or gradient color stops.
  - Use `"<angle>"` for conic gradients, rotational transforms, or direction vectors (`deg`, `grad`, `rad`, `turn`).
  - Use `"<percentage>"` or `"<length>"` when animating progress bars, clip paths, sizes, or positioning offsets.
  - Use `"<number>"` or `"<integer>"` for scale factors, opacities, or numeric counter badge increments.
  - Use universal `"*"` only when variable typing/interpolation is explicitly unwanted and arbitrary tokens are stored.
- **Inheritance (`inherits` descriptor):**
  - Set `inherits: false` for component-level private variables (e.g., `--card-angle`, `--button-glow-x`) to prevent unexpected style leaks into nested elements and improve browser style calculation efficiency.
  - Set `inherits: true` for design-system global themes (e.g., `--brand-primary`, `--text-main`) where cascading throughout the DOM tree is required.
- **Initial Value Requirement (`initial-value`):**
  - An `initial-value` is **mandatory** whenever `syntax` is anything other than `"*"` or when `inherits` is set.
  - The `initial-value` string must strictly match the declared `syntax` type syntax (e.g., `0deg` for `<angle>`, `0px` for `<length>`, `#000000` or `transparent` for `<color>`). Declarations with mismatched initial values are discarded as invalid by the browser parser.

## Constraints

- **Syntax Strictness:** Misspelled syntax strings (e.g., `syntax: "color"` without angle brackets, or `syntax: "<number>"` given `10px`) cause the entire `@property` block to be ignored by the browser parser.
- **Re-Registration Immutability:** Once a property is registered via `@property` or `CSS.registerProperty()`, its descriptor (`syntax`, `inherits`, `initial-value`) cannot be altered or re-registered at runtime. Attempting to call `CSS.registerProperty()` with a different syntax for an already registered property throws a DOMException `InvalidModificationError`.
- **Compositor Acceleration:** Animating custom properties driving paint-heavy operations (e.g., `background-image` or `clip-path`) triggers main-thread or paint-stage rasterization on each frame. Optimize container dimensions and avoid animating large full-screen radial/conic gradients continuously on low-power mobile devices.

## Non-Goals

- Replacing standard CSS utility variables that do not require transition interpolation or scope isolation.
- Building custom JavaScript animation loops or canvas rendering engines (use WAAPI or CSS keyframes instead).
- Providing backward compatibility Polyfills for IE11 or ancient non-evergreen browser engines.

## Common Failure Patterns

- **Missing Angle Brackets in Syntax:** Writing `syntax: "color"` or `syntax: "length"` instead of `syntax: "<color>"` or `syntax: "<length>"`. The browser discards the rule as invalid CSS syntax.
- **Mismatched Initial Value:** Setting `syntax: "<length>"` with `initial-value: 0` (lacking unit). Non-zero length requires explicit units (`0px`, `0rem`), whereas `<number>` accepts unitless `0`.
- **Forgetting `inherits` Descriptor:** Omitting `inherits` in `@property` declarations. Both `syntax`, `inherits`, and `initial-value` descriptors are mandatory in CSS `@property` blocks.
- **Duplicate Registration Crash:** Calling `CSS.registerProperty()` in JavaScript on a property already declared in CSS without a `try...catch` block, resulting in unhandled JS errors.
- **Missing Reduced Motion Overrides:** Animating gradient rotation custom variables infinitely without checking `prefers-reduced-motion`, causing physical discomfort or motion sickness for sensitive users.

## Validation Steps

- [ ] **Type & Syntax Syntax Audit:** Verify that all `@property` blocks include `syntax`, `inherits`, and `initial-value` with valid angle-bracket syntax descriptors (`"<color>"`, `"<angle>"`, etc.).
- [ ] **Transition Smoothness Check:** In Chrome DevTools / Safari Web Inspector, trigger state change (e.g., hover) on the target element. Confirm in the Animations panel that the custom property smoothly interpolates across intermediate frames rather than snapping instantly.
- [ ] **Encapsulation Verification:** Create a nested child element inside a container with `inherits: false`. Verify that child elements do not inherit parent custom property overrides unless explicitly passed.
- [ ] **Reduced Motion Test:** Enable `prefers-reduced-motion: reduce` in browser emulator settings and confirm custom property animations halt or simplify gracefully.
- [ ] **Format Validation:** Run `node scripts/check-skills.mjs` to ensure zero structure or frontmatter errors.
