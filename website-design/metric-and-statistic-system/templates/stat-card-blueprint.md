# Stat Card Blueprint

This template provides a reusable structure for a standard Metric/Stat Card. Use this as a baseline for dashboard KPI grids.

## Anatomy Template

```text
┌──────────────────────────────────────────────────────────┐
│  [A] LABEL (e.g., Active Users)                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [B] $12,000 [C] USD                                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  [D] [↑ 4.2%] [E] since last week                        │
└──────────────────────────────────────────────────────────┘
```

### Element Definitions

- **[A] Label:**
  - *Typography:* Small (12-14px), Medium/Semibold.
  - *Color:* Neutral Muted (e.g., `#6B7280`).
  - *Alignment:* Left (standard) or Centered (Hero).

- **[B] Primary Value:**
  - *Typography:* Display (24-48px), Bold.
  - *Color:* High Contrast (e.g., `#111827` on White).
  - *Spacing:* 4-8px margin from label.

- **[C] Unit/Suffix (Optional):**
  - *Typography:* 50-70% size of Primary Value.
  - *Alignment:* Baseline aligned with Value.

- **[D] Trend Indicator:**
  - *Content:* Icon (↑/↓) + Percentage/Value.
  - *Semantic Color:*
    - Success: `#059669` (Green)
    - Error: `#DC2626` (Red)
    - Neutral: `#4B5563` (Gray)

- **[E] Context/Timeframe:**
  - *Typography:* X-Small (11-12px), Regular.
  - *Color:* Neutral Muted.

---

## Technical Annotation (CSS/Tokens)

| Property | Recommendation | Token Reference |
| :--- | :--- | :--- |
| **Padding** | 24px (1.5rem) all sides | `--space-l` |
| **Border** | 1px solid neutral-200 | `--color-border` |
| **Shadow** | Subtle drop shadow (4px blur) | `--shadow-sm` |
| **Gap** | 8px between elements | `--space-xs` |

---

## Accessibility Specs

1. **Focus State:** If the card is clickable, apply a 2px blue ring (`--color-focus`).
2. **Screen Reader Text:**
   ```html
   <div role="group" aria-label="Active Users: 12,000, up 4.2% since last week">
     <!-- Visual elements here -->
   </div>
   ```
3. **Color Contrast:** Ensure the Red/Green text on White background meets 4.5:1 ratio. (e.g., use a darker shade of green/red for text than for background badges).
