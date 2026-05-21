# Stepper Component Structure Template

Use this template to define the structure and annotations for a reusable stepper
component.

## Component Anatomy

```text
[ Stepper Container ]
  |-- [ Step Item ]
        |-- [ Indicator Zone ] (Circle/Icon/Number)
        |-- [ Label Zone ] (Short Noun)
        |-- [ Connection Line ] (Between Step Items)
```

## State Matrix

| State | Visual Treatment | ARIA Attribute |
| :--- | :--- | :--- |
| **Pending** | Grayscale, low opacity | `aria-disabled="true"` |
| **Active** | Primary color, bold | `aria-current="step"` |
| **Completed** | Success color, checkmark icon | `aria-disabled="false"` |
| **Error** | Danger color, exclamation icon | `aria-invalid="true"` |

## Navigation Template

| Action | Hierarchy | Location | Behavior |
| :--- | :--- | :--- | :--- |
| **Next / Continue** | Primary | Bottom Right | Validate current step, move forward. |
| **Back / Previous** | Secondary | Bottom Left | Save current draft, move back. |
| **Cancel / Exit** | Tertiary | Top Right / Text Link | Confirm data loss if not auto-saved. |

## Responsive Annotations

- **Breakpoint (> 1024px):** Horizontal stepper with full labels.
- **Breakpoint (768px - 1024px):** Horizontal stepper with icons only (labels on
  hover/active).
- **Breakpoint (< 768px):** Sticky progress bar or "Step X of Y" text
  indicator.
