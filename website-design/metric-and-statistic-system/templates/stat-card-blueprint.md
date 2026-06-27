# Stat Card Blueprint

This blueprint provides a reusable structure and annotation guide for designing and implementing metric cards.

## 1. Component Anatomy

```text
[ (A) ICON/AVATAR ] (Optional)
[ (B) LABEL       ]
[ (C) VALUE       ] [ (D) UNIT ]
[ (E) TREND PILL  ] [ (F) COMPARISON TEXT ]
```

- **(A) Icon/Avatar:** Visual anchor (e.g., 24x24px). Use a muted background circle.
- **(B) Label:** The descriptor (e.g., text-xs, uppercase, tracking-wider).
- **(C) Value:** The hero number (e.g., text-3xl, font-bold, tabular-nums).
- **(D) Unit:** Prefix ($) or Suffix (%). If suffix, consider `opacity: 0.7` and `font-size: 0.8em`.
- **(E) Trend Pill:** Directional indicator. Includes arrow icon + percentage.
- **(F) Comparison Text:** The baseline context (e.g., "vs last week").

---

## 2. Spatial Annotation (Spacing Tokens)

Using `fluid-spacing-system` tokens:

| Element Relationship | Spacing Token | Notes |
| :--- | :--- | :--- |
| Outer Padding | `--space-m` (16-24px) | Space between card edge and content. |
| Label to Value | `--space-3xs` (4-8px) | Tight proximity for relationship. |
| Value to Trend | `--space-xs` (8-12px) | Clear separation of current vs historical. |
| Inside Trend Pill | `--space-4xs` (2-4px) | Space between icon and percentage text. |

---

## 3. Implementation Rules

### Tabular Figures (CSS)
Always use tabular figures for the Primary Value to ensure vertical alignment in grids:
```css
.metric-value {
  font-variant-numeric: tabular-nums;
  /* OR */
  font-feature-settings: "tnum";
}
```

### Sentiment-Based Coloring
Map colors to data *sentiment*, not just direction:
- **Positive Sentiment:** `.text-success` (Green)
- **Negative Sentiment:** `.text-error` (Red)
- **Neutral/Informational:** `.text-info` (Blue)

### Accessibility Checklist
- [ ] Wrapper has `role="region"` and `aria-label="[Label] metric"`.
- [ ] Trend indicator has hidden text: `<span class="sr-only">Increased by</span>`.
- [ ] High contrast (4.5:1) for secondary labels.

---

## 4. Variance Handling Template

| Scenario | Strategy |
| :--- | :--- |
| **Long Label** | Truncate with ellipses at 1 line or wrap and increase card height. |
| **Large Number** | Use "KMB" abbreviation (e.g., 1.5M). |
| **Missing Data** | Display "—" in `neutral-400` color. |
| **Negative Num** | Use a true minus sign (`&minus;` / `−`) instead of a hyphen (`-`). |
