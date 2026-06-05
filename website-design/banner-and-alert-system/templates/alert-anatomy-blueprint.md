# Alert Anatomy & Component Blueprint

This template defines the standard structure for all non-overlay notifications
(Banners and Alerts). Use this as a guide for building components in your UI
library.

## Component Anatomy

```text
+-----------------------------------------------------------+
| (A) ICON  (B) TITLE (Optional)                        (E) |
|           (C) DESCRIPTION                             [X] |
|                                                           |
|           (D) ACTION(S)                                   |
+-----------------------------------------------------------+
```

### (A) Status Icon
- **Size:** 20px - 24px.
- **Alignment:** Top-left of the container.
- **Function:** Immediate visual communication of the alert gravity.

### (B) Title (Optional)
- **Typography:** Bold weight, slightly larger or same size as description.
- **Usage:** Use for multi-line alerts to provide a quick summary.

### (C) Description
- **Typography:** Regular weight.
- **Alignment:** Aligned to the right of the icon.
- **Function:** The core message (limit to 1-2 sentences).

### (D) Actions
- **Styles:** Small buttons or text links.
- **Placement:** Either below the description (mobile/multi-line) or to the right
  of the description (desktop/single-line).

### (E) Dismiss Trigger
- **Style:** Ghost button with an 'X' icon.
- **Size:** Min 44x44px touch target.
- **Placement:** Top-right corner.

---

## Technical Specifications

### Spacing (Tokens)
- **Container Padding:** `var(--space-m)` (usually 16px).
- **Icon-to-Text Gap:** `var(--space-s)` (usually 12px).
- **Stacking Gap (Mobile):** `var(--space-xs)` (usually 8px) between text and actions.

### Borders & Corners
- **Border Radius:** Match your system's card/input radius (e.g., `4px` or `8px`).
- **Border Width:** `1px` or `2px` (solid).
- **Border Color:** Use a darker version of the background state color.

### Stacking Logic (CSS)
```css
.alert-container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-s);
  padding: var(--space-m);
  border: 1px solid var(--state-border);
  background: var(--state-bg);
  border-radius: var(--radius-m);
}

@media (max-width: 600px) {
  .alert-container {
    grid-template-columns: auto 1fr; /* Dismiss moves or takes its own row */
  }
  .alert-actions {
    grid-column: 2; /* Align under the text */
  }
}
```

## Annotation Template
*When handing off a design, use these labels:*

1. **[Role]:** `alert` vs `status`.
2. **[Gravity]:** Info, Success, Warning, or Error.
3. **[Scope]:** Global, Page, or Inline.
4. **[Dismissible]:** Yes/No.
