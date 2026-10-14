# CSS Logical Property Mapping & Writing Mode Heuristics

This reference guide details the formal W3C specifications, property mapping matrices, writing mode behavior rules, and layout heuristics for CSS Logical Properties and Values.

---

## 1. Core Axis Definitions & Writing Modes

CSS Logical Properties operate relative to two flow axes rather than physical screen edges:

1. **Inline Axis:** The direction in which inline content (text) flows within a line.
   - Horizontal LTR (English, Spanish): Left to Right.
   - Horizontal RTL (Arabic, Hebrew): Right to Left.
   - Vertical RL (Japanese, Korean vertical text): Top to Bottom.
2. **Block Axis:** The direction in which block containers (paragraphs, sections) stack.
   - Horizontal LTR / RTL: Top to Bottom.
   - Vertical RL: Right to Left.
   - Vertical LR: Left to Right.

---

## 2. Exhaustive Physical-to-Logical Property Mapping Matrix

### A. Box Model Dimensions
| Physical Property | Logical Property | Description |
| :--- | :--- | :--- |
| `width` | `inline-size` | Dimension along the inline axis |
| `height` | `block-size` | Dimension along the block axis |
| `min-width` | `min-inline-size` | Minimum inline size |
| `max-width` | `max-inline-size` | Maximum inline size |
| `min-height` | `min-block-size` | Minimum block size |
| `max-height` | `max-block-size` | Maximum block size |

### B. Margins & Padding
| Physical Property | Logical Property | Direction in LTR | Direction in RTL |
| :--- | :--- | :--- | :--- |
| `margin-left` | `margin-inline-start` | Left | Right |
| `margin-right` | `margin-inline-end` | Right | Left |
| `margin-top` | `margin-block-start` | Top | Top |
| `margin-bottom` | `margin-block-end` | Bottom | Bottom |
| `padding-left` | `padding-inline-start` | Left | Right |
| `padding-right` | `padding-inline-end` | Right | Left |
| `padding-top` | `padding-block-start` | Top | Top |
| `padding-bottom` | `padding-block-end` | Bottom | Bottom |

### C. Shorthand Properties
| Physical Shorthand | Logical Shorthand | Values |
| :--- | :--- | :--- |
| `margin: 10px 20px;` (Top/Bottom Left/Right) | `margin-block: 10px; margin-inline: 20px;` | Block / Inline |
| `padding: 10px 15px 20px;` | `padding-block: 10px 20px; padding-inline: 15px;` | `start end` |
| `inset: 0;` | `inset: 0;` | Logical and physical shorthand for 0 top/right/bottom/left |

### D. Borders & Corner Radii
| Physical Property | Logical Property |
| :--- | :--- |
| `border-left` | `border-inline-start` |
| `border-right` | `border-inline-end` |
| `border-top` | `border-block-start` |
| `border-bottom` | `border-block-end` |
| `border-top-left-radius` | `border-start-start-radius` |
| `border-top-right-radius` | `border-start-end-radius` |
| `border-bottom-left-radius` | `border-end-start-radius` |
| `border-bottom-right-radius` | `border-end-end-radius` |

### E. Positioning & Values
| Physical Property / Value | Logical Property / Value |
| :--- | :--- |
| `left: 10px;` | `inset-inline-start: 10px;` |
| `right: 10px;` | `inset-inline-end: 10px;` |
| `top: 10px;` | `inset-block-start: 10px;` |
| `bottom: 10px;` | `inset-block-end: 10px;` |
| `text-align: left;` | `text-align: start;` |
| `text-align: right;` | `text-align: end;` |
| `float: left;` | `float: inline-start;` |
| `float: right;` | `float: inline-end;` |
| `clear: left;` | `clear: inline-start;` |
| `clear: right;` | `clear: inline-end;` |
| `overflow-x: auto;` | `overflow-inline: auto;` |
| `overflow-y: hidden;` | `overflow-block: hidden;` |

---

## 3. Viewport & Container Unit Equivalents

In responsive layouts, standard physical viewport units (`vw`, `vh`) have logical equivalents to maintain flexibility across writing modes:

- **`1vi` (Viewport Inline Unit):** 1% of the viewport's inline size. Equal to `1vw` in horizontal mode, `1vh` in vertical mode.
- **`1vb` (Viewport Block Unit):** 1% of the viewport's block size. Equal to `1vh` in horizontal mode, `1vw` in vertical mode.
- **`1cqw` vs `1cqi`:** Container query width vs. Container query inline size. Always prefer `cqi` (container query inline unit) for responsive components.

---

## 4. Logical Property Best Practices & Heuristics

1. **Prefer Shorthands for Symmetric Spacing:**
   Use `padding-inline: 1.5rem;` instead of specifying both `padding-inline-start: 1.5rem;` and `padding-inline-end: 1.5rem;`.
2. **Never Mix Physical and Logical Properties on the Same Axis:**
   Mixing `margin-left: 1rem;` and `margin-inline-start: 2rem;` causes specificity and cascade confusion across different browser engines.
3. **Use CSS Transforms for Directional Icons:**
   Logical properties adjust box model positions, but SVG icon graphics (like arrows or back chevrons) require explicit mirroring in RTL:
   ```css
   [dir="rtl"] .icon-arrow {
     transform: scaleX(-1);
   }
   ```
4. **Leverage Flexbox and Grid Gap:**
   Flexbox and CSS Grid automatically handle RTL orientation via `gap`, `justify-content`, and `align-items`. Do not manually insert `margin-inline-start` where grid/flex `gap` already manages spacing.
