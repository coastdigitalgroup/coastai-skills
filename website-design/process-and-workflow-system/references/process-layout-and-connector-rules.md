# Process Layout & Connector Rules Reference

This reference guide provides spatial specs, CSS connector formulas, responsive stacking rules, typography scales, and WCAG AA accessibility standards for the **Process & Workflow System**.

---

## 1. Spatial Systems & Grid Ratios

### Horizontal Node Chains (Pattern A)
- **Container Max-Width:** `1200px` (or 75rem).
- **Column Ratios:**
  - 3-Step Process: `grid-template-columns: repeat(3, 1fr)` (Gap: `2rem` / 32px).
  - 4-Step Process: `grid-template-columns: repeat(4, 1fr)` (Gap: `1.5rem` / 24px).
- **Measure Rule:** Step description text measure must not exceed **40ch** per column to maintain high reading velocity.

### Vertical Connector Timelines (Pattern B)
- **Container Max-Width:** `800px` (or 50rem) centered.
- **Trunk Line Offset:** `20px` to `24px` from left padding boundary.
- **Node Spacing:** Vertical gap between steps: `2.5rem` (40px) to `3.5rem` (56px).

---

## 2. Connector Physics & CSS Formulas

### Horizontal Connector Line Formula
When placing connector lines between horizontal nodes, use the following calculation for `width`:

```css
/* Formula: calc(100% + GAP - BADGE_DIAMETER - (NODE_PADDING * 2)) */
.process-chain__item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 22px; /* Vertically centered against a 44px badge */
  left: calc(44px + 16px);
  width: calc(100% + 32px - 44px - 32px);
  height: 2px;
  border-top: 2px dashed var(--color-border);
  z-index: 1;
}
```

### Connector Line Contrast Rules
- **Color Token:** `var(--color-border)` or `var(--color-border-subtle)`.
- **WCAG Graphical Contrast (SC 1.4.11):** Must satisfy at least **3:1 contrast ratio** against the section background surface.
- **Dashed vs. Solid:**
  - Use `dashed` (2px dash, 4px gap) for asynchronous or flexible steps.
  - Use `solid` (2px width) for mandatory, uninterrupted linear sequences.

---

## 3. Responsive Stacking & Breakpoint Matrix

| Viewport Range | Layout Adaptation | Connector Behavior | Step Badge Alignment |
| :--- | :--- | :--- | :--- |
| **Desktop (> 1024px)** | 3 or 4 Column Grid | Horizontal dashed line between badges | Centered or Top-Left above text |
| **Tablet (768px - 1023px)** | 2 Column Grid or 1 Column Stack | Vertical line on left side | Absolute left-anchored (Left: 0) |
| **Mobile (< 767px)** | Single Column Vertical Stack | Vertical dashed/solid trunk line | Left-anchored with text padded right |

---

## 4. Typography Hierarchy & Contrast Ratios

| Component | Font Size | Weight | Line Height | Contrast Ratio (WCAG AA) |
| :--- | :--- | :--- | :--- | :--- |
| **Section Eyebrow** | `0.875rem` (14px) | 700 (Uppercase) | 1.2 | ≥ 4.5:1 |
| **Section Title (H2)** | `2.0rem` - `2.5rem` | 800 | 1.2 | ≥ 4.5:1 |
| **Step Badge Number** | `1.125rem` (18px) | 700 | 1.0 | ≥ 4.5:1 inside badge fill |
| **Step Title (H3)** | `1.125rem` - `1.25rem` | 700 | 1.3 | ≥ 4.5:1 |
| **Step Description** | `0.9375rem` - `1rem` | 400 | 1.6 | ≥ 4.5:1 |

---

## 5. WCAG 2.1 AA Accessibility Checklist

- [ ] **Semantic List Structure:** Sequential processes use `<ol>` and `<li>` elements.
- [ ] **Tab Control ARIA (Interactive Workflows):** Tab triggers use `role="tab"`, `aria-selected="true|false"`, and `aria-controls="panel-id"`. Tabpanels use `role="tabpanel"`.
- [ ] **Keyboard Arrow Navigation:** Tab triggers support `ArrowRight`/`ArrowDown` and `ArrowLeft`/`ArrowUp` cycling.
- [ ] **Focus Ring Visibility:** All focusable interactive step elements feature an explicit `2px` offset focus indicator (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).
- [ ] **Non-Color State Indicators:** Step numbers or badges use explicit numeric text (`1`, `2`, `3`) or text labels, not color alone.
