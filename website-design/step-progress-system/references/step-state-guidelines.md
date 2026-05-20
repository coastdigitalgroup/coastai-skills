# Reference: Step State Guidelines

This reference defines the visual and accessibility requirements for each state
within a **Step & Progress System**.

## 1. Visual Specification

| State | Color/Contrast | Iconography | Typography |
| :--- | :--- | :--- | :--- |
| **Pending** | `var(--grey-300)` | Number (e.g., "3") | `var(--font-weight-normal)` |
| **Active** | `var(--primary-600)` | Number or Glow | `var(--font-weight-bold)` |
| **Completed**| `var(--success-500)`| Checkmark (✓) | `var(--font-weight-medium)` |
| **Error** | `var(--danger-500)` | Alert (!) | `var(--font-weight-bold)` |

## 2. Accessibility (ARIA) Standards

To ensure users with assistive technology can navigate the flow:

- **`aria-current="step"`:** Apply to the `<li>` or `<a>` representing the
  current step.
- **`aria-hidden="true"`:** Apply to decorative connector lines and icons that
  don't convey unique information beyond the labels.
- **`role="list"`:** The group of steps should be wrapped in an `<ol>` or `<ul>`
  within a `<nav aria-label="Progress">`.
- **Keyboard Navigation:** If steps are clickable, they must be focusable
  (`tabindex="0"`) and triggerable via `Enter` or `Space`.

## 3. Responsive Patterns

| Viewport | Pattern | Recommendation |
| :--- | :--- | :--- |
| **Desktop** | Full Stepper | Horizontal, show all labels and icons. |
| **Tablet** | Reduced Stepper | Horizontal, hide secondary labels. |
| **Mobile** | Progress Bar | "Step X of Y" text + thin linear bar at top. |
| **Sidebar** | Vertical Stepper | Best for complex forms with > 6 steps. |

## 4. Spacing Rules (Fluid Spacing System)

- **Gap between steps:** `--space-l` (Desktop), `--space-m` (Tablet).
- **Label to Indicator:** `--space-xs`.
- **Vertical spacing (Vertical Pattern):** `--space-m`.
