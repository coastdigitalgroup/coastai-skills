# Accordion Structural Blueprint

Use this template to structure the layers and attributes of a new accordion
system.

## 1. Structural Map

| Layer | Component | Attributes |
| :--- | :--- | :--- |
| **Container** | `.accordion-group` | `width: 100%`, `display: flex`, `flex-direction: column` |
| **Item** | `.accordion-item` | `border-bottom: 1px solid var(--neutral-200)` |
| **Header** | `button.accordion-trigger` | `display: flex`, `justify-content: space-between`, `align-items: center` |
| **Icon** | `.accordion-icon` | `transition: transform 0.3s ease`, `pointer-events: none` |
| **Panel** | `.accordion-panel` | `overflow: hidden`, `max-height: 0` (closed) / `max-height: none` (open) |

## 2. Spacing Annotation Template

Apply these tokens from the `fluid-spacing-system`:

- **External Margin:** `--space-m` between the accordion group and other page
  sections.
- **Header Padding:**
  - Desktop: `--space-s` (V) / `--space-m` (H)
  - Mobile: `--space-m` (V) / `--space-m` (H) (Increased for tap targets)
- **Internal Gap:** `--space-xs` between the text label and the chevron icon.
- **Panel Padding:** `--space-m` on all sides to prevent text from touching
  borders.

## 3. State Definitions

| State | Visual Change | Accessibility Attribute |
| :--- | :--- | :--- |
| **Closed** | Chevron points down (0deg) | `aria-expanded="false"` |
| **Open** | Chevron points up (180deg) | `aria-expanded="true"` |
| **Hover** | Background-color change | N/A |
| **Focus** | Visible outline/ring (3px) | `:focus-visible` |
| **Disabled** | Opacity: 0.5, `cursor: not-allowed` | `disabled` |

## 4. Implementation Checklist

- [ ] Wrap the trigger in a semantic Heading (`h2`, `h3`, `h4`).
- [ ] Ensure the trigger is a `<button>`, not a `<div>` or `<a>`.
- [ ] Link the button to the panel using `aria-controls="panel-id"`.
- [ ] Link the panel to the button using `aria-labelledby="button-id"`.
- [ ] Set `role="region"` on the panel for screen reader orientation.
