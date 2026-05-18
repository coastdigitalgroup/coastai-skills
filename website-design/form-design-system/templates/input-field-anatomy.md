# Template: Input Field Anatomy & Spec

Use this template to define the standard visual anatomy for all input fields
within your design system.

## 1. Structural Blueprint (Standard Field)

| Element             | Requirement                    | Spacing (Tokens)     |
| :------------------ | :----------------------------- | :------------------- |
| **Label**           | Semibold, scannable text       | 0                    |
| **Spacing**         | Gap between Label and Input    | `--space-xs` (4-8px) |
| **Input Container** | Min-height 44px (Mobile: 48px) | 0                    |
| **Spacing**         | Gap between Input and Feedback | `--space-xs` (4-8px) |
| **Helper Text**     | Muted, smaller font size       | 0                    |
| **Error Message**   | High-contrast (Red), with Icon | 0                    |

---

## 2. Layout Annotation Template

When handing off designs to development, use this structure to annotate form
sections:

### [Section Title]

- **Grid Pattern:** [Single Column / Multi-Column]
- **Label Alignment:** [Top / Left]
- **Field Gap:** `--space-l` (24-32px)

#### Field: [Field Name]

- **Type:** [Text / Email / Number / Password / Select]
- **Required:** [Yes / No]
- **Helper Text:** "[Insert Text]"
- **Validation Rule:** "[e.g., Must contain @ symbol]"

---

## 3. Interaction State Matrix

| State        | Border      | Background | Shadow / Ring      |
| :----------- | :---------- | :--------- | :----------------- |
| **Default**  | `--border`  | `--white`  | None               |
| **Hover**    | `--active`  | `--hover`  | None               |
| **Focus**    | `--primary` | `--white`  | `0 0 0 3px --halo` |
| **Error**    | `--error`   | `--err-bg` | None               |
| **Disabled** | `--subtle`  | `--muted`  | None               |

---

## 4. Mobile Stacking Rule

```css
/* Ensure the form container follows this responsive pattern */
.form-container {
  display: grid;
  gap: var(--space-l);
}

@media (max-width: 600px) {
  .form-group {
    grid-template-columns: 1fr; /* Force single column */
  }

  .form-label {
    text-align: left; /* Ensure top-alignment on mobile */
  }
}
```
