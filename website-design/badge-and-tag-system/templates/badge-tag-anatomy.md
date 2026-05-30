# Template: Badge & Tag Anatomy

Use this template to define the structural components of badges and tags in your design system.

## Structural Anatomy

| Component | Specification | Description |
| :--- | :--- | :--- |
| **Height** | 20px - 28px | Small size for metadata, large for overlaid badges. |
| **Padding** | 4px (top/bottom), 8px (left/right) | Standard breathing room. |
| **Border Radius** | 4px (Tag) / 999px (Badge) | Differentiation between categories and status. |
| **Font Size** | 11px - 13px | Must be readable but smaller than body text. |
| **Icon Size** | 12px - 14px | Should not exceed the font's x-height significantly. |
| **Gap** | 4px | Space between icon and text. |

## Variants

### 1. Solid (High Emphasis)
-   **Background:** `--color-brand-primary`
-   **Text:** `--color-white`
-   **Border:** None

### 2. Subtle (Medium Emphasis)
-   **Background:** `--color-brand-light`
-   **Text:** `--color-brand-dark`
-   **Border:** None

### 3. Outline (Low Emphasis)
-   **Background:** Transparent
-   **Text:** `--color-grey-700`
-   **Border:** 1px solid `--color-grey-300`

## Implementation Checklist

- [ ] Is the padding consistent across all variants?
- [ ] Does the "pill" shape maintain its radius when text wraps? (Recommendation: Use `white-space: nowrap` for badges).
- [ ] Is the focus ring visible when an interactive tag is tabbed?
- [ ] Are icons vertically centered with the text?
