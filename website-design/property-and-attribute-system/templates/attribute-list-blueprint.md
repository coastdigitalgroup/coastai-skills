# Attribute List Blueprint

Use this blueprint to structure and annotate "Key: Value" attribute lists within
your designs. This template ensures consistency in hierarchy and responsive
behavior.

## 1. Structural Component Specs

### Anatomy (The "Pair" Component)
- **Container:** Flex or Grid layout.
- **Key (dt):**
  - Font: Primary Sans, 0.875rem (14px).
  - Weight: 500 (Medium).
  - Color: `--color-text-muted` (e.g., #64748b).
- **Value (dd):**
  - Font: Primary Sans, 1rem (16px).
  - Weight: 400 (Regular).
  - Color: `--color-text-primary` (e.g., #1e293b).
- **Divider:** 1px border-bottom (optional, `--color-border-subtle`).

### Spatial Rules (Desktop)
- **Layout:** `display: flex; justify-content: flex-start;`
- **Key Width:** Fixed min-width (e.g., 120px) or percentage (e.g., 30%).
- **Gap:** `--space-s` (8px-12px) between Key and Value.
- **Vertical Rhythm:** `--space-xs` (4px-8px) padding-block for compact views;
  `--space-m` (16px-20px) for standard views.

---

## 2. Responsive Annotation Template

Copy and adapt these notes for your developer handoff:

| Screen Size | Pattern | Rule |
| :--- | :--- | :--- |
| **Desktop (>1024px)** | Horizontal | Labels on left, Values on right. Fixed axis at 140px. |
| **Tablet (768px-1024px)** | Horizontal | Same as desktop, or 2-column grid if space allows. |
| **Mobile (<768px)** | Vertical | Stack Label on top of Value. 100% width. |

---

## 3. Implementation Checklist (Accessibility & SEO)

- [ ] Use semantic `<dl>`, `<dt>`, and `<dd>` tags.
- [ ] If using a grid, wrap each pair in a `<div>` for styling stability.
- [ ] Ensure `:focus-within` on the row provides a visual cue if data is
      interactive (e.g., links).
- [ ] Use `<time>` for date values and `<address>` for locations within `<dd>`.
- [ ] Verify that all text passes 4.5:1 contrast check.

---

## 4. Grouping Template (CSS Example)

```css
/* Grouped attribute list with headers */
.attribute-group {
  margin-bottom: var(--space-l);
}

.attribute-group-header {
  font-size: 1.125rem;
  font-weight: 600;
  border-bottom: 2px solid var(--color-border-primary);
  margin-bottom: var(--space-m);
  padding-bottom: var(--space-xs);
}

.attribute-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.attribute-pair {
  display: flex;
  flex-direction: row; /* Desktop default */
  border-bottom: 1px solid var(--color-border-muted);
  padding-bottom: var(--space-xs);
}

@media (max-width: 768px) {
  .attribute-pair {
    flex-direction: column; /* Mobile stack */
    gap: 2px;
  }
}
```
