# Cascade Precedence Rules

Understanding how layers interact with other CSS features is critical for avoiding debugging headaches.

## 1. The Cascade Order (Lowest to Highest)

When a browser decides which style to apply, it checks in this order:

1. User Agent styles (Browser defaults)
2. **Layered styles (in the order they are defined)**
3. **Unlayered styles** (Styles not inside any `@layer` block)
4. Animations (`@keyframes`)
5. **Layered `!important` styles (in REVERSE order of definition)**
6. **Unlayered `!important` styles**
7. Transitions

### The "Unlayered Wins" Rule
Styles that are **not** in a layer always override styles that **are** in a layer (for normal styles). This allows unlayered CSS to act as a "final override" layer.

## 2. The `!important` Inversion

One of the most confusing parts of Cascade Layers is how they handle `!important`.

- For **normal** declarations, **later** layers win over **earlier** layers.
- For **!important** declarations, **earlier** layers win over **later** layers.

| Layer Order | Normal Style Priority | `!important` Style Priority |
| :--- | :--- | :--- |
| `reset` | 1 (Lowest) | 4 (Highest) |
| `base` | 2 | 3 |
| `theme` | 3 | 2 |
| `utilities` | 4 (Highest) | 1 (Lowest) |

**Reasoning:** This allows a "reset" layer to force a style that cannot be easily overridden by later layers, maintaining the integrity of the system.

## 3. Nesting Layers

Layers can be nested to create sub-priorities:

```css
@layer framework {
  @layer components, utilities;
}

/* Accessible via: */
@layer framework.components { ... }
```

## 4. Browser Support

As of 2024, Cascade Layers are widely supported in all major browsers:
- **Chrome:** 99+ (March 2022)
- **Firefox:** 97+ (Feb 2022)
- **Safari:** 15.4+ (March 2022)
- **Edge:** 99+ (March 2022)

### Polyfilling
There is no "perfect" polyfill because layers are a fundamental change to the browser's CSS engine. However, PostCSS plugins like `postcss-cascade-layers` can transpile layers into high-specificity selectors for older browsers.
