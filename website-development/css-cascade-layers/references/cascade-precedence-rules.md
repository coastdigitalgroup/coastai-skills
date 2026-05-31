# Cascade Precedence Rules

Understanding how CSS Cascade Layers interact with existing cascade rules is
critical for successful implementation.

## The Hierarchy of Precedence

When multiple declarations target the same element and property, the browser
resolves the conflict using the following order of importance (from highest
priority to lowest):

1.  **Transitioned Styles:** Active CSS transitions.
2.  **!important (Important) Styles:**
    *   **Layered !important:** Interestingly, **earlier** layers win over
        **later** layers for `!important` declarations.
    *   **Unlayered !important:** Overridden by any layered `!important` style.
3.  **Normal Styles:**
    *   **Unlayered Normal:** Styles defined outside of any `@layer` block.
    *   **Layered Normal:** Styles defined inside `@layer`. The **last** defined
        layer wins.
4.  **Animations:** CSS `@keyframes` animations.

---

## The "Normal" Rule: Unlayered Wins

For standard declarations (not `!important`), unlayered styles always override
layered styles, regardless of selector specificity.

*   **Logic:** The browser treats all layered styles as a block that comes
    *before* all unlayered styles.

```css
@layer components {
  .btn { background: blue; }
}

/* Unlayered style wins even with the same specificity */
.btn { background: red; }
```

---

## The "!important" Reversal

The precedence of `!important` declarations in layers is the **opposite** of
normal declarations. This is to allow low-level layers (like a reset) to enforce
certain rules that cannot be easily overridden even by utilities.

1.  `@layer reset { color: red !important; }` **(WINS)**
2.  `@layer utilities { color: blue !important; }`
3.  `color: green !important;` (Unlayered)

---

## Summary Table

| Source Category | Normal Priority | !important Priority |
| :--- | :--- | :--- |
| **Unlayered** | Highest (Wins) | Lowest (Loses to layers) |
| **Last Layer** | High | Low |
| **First Layer** | Lowest | Highest |

## Best Practices

*   **Declare Order Early:** Use `@layer layer1, layer2;` at the top of your
    stylesheet to avoid relying on the order of implementation.
*   **Avoid !important in Layers:** Only use `!important` in layers for truly
    enforced "system" rules (like accessibility overrides) due to the reversal
    logic.
*   **Migrate Gradually:** You can safely start using layers for new components
    while legacy unlayered CSS continues to function (and override layered
    components).
