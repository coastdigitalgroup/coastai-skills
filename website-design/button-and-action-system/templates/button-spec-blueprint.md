# Button Spec Blueprint

Use this blueprint to define the visual and structural anatomy of buttons within your design system.

## 1. Anatomy Specification

| Element | Specification | Design Token |
| :--- | :--- | :--- |
| **Font Family** | Sans-serif / UI | `--font-sans` |
| **Font Weight** | Medium / Semibold | `--font-weight-medium` |
| **Corner Radius**| 4px / 8px / Pill | `--radius-button` |
| **Border Width** | 1px / 2px | `--border-width-s` |
| **H-Padding** | 2x Vertical Padding | `--space-m` |
| **V-Padding** | Base Unit | `--space-s` |
| **Icon Gap** | Smallest Unit | `--space-xs` |

## 2. Variant Matrix (Tokens)

| Variant | Background | Border | Text/Icon |
| :--- | :--- | :--- | :--- |
| **Primary** | `--color-primary` | None | `--color-white` |
| **Secondary** | Transparent | `--color-primary` | `--color-primary` |
| **Ghost** | Transparent | None | `--color-primary` |
| **Danger** | `--color-danger` | None | `--color-white` |
| **Disabled** | `--color-grey-light`| None | `--color-grey-dark` |

## 3. Sizing Scale

| Size | Height | Font Size | Icon Size | Context |
| :--- | :--- | :--- | :--- | :--- |
| **Large** | 56px | 18px | 24px | Hero, Landing Pages |
| **Medium** | 44px | 16px | 20px | Standard (Forms, Modals) |
| **Small** | 32px | 14px | 16px | Compact (Sidebars, Tables)|

## 4. Grouping & Alignment Rules

### Vertical Stacking (Mobile)
- **Rule:** Primary action on Top.
- **Spacing:** Use `--space-s` between buttons.
- **Affordance:** Stretch to 100% width (Full-width).

### Horizontal Grouping (Desktop)
- **Order (Standard):** [Tertiary] ... [Secondary] [Primary]
- **Alignment:**
  - **Headers/Modals:** Right-aligned.
  - **Forms:** Left-aligned (aligned with input labels).
  - **Marketing Sections:** Center-aligned.

## 5. Interaction Checklist (State Guide)

- [ ] **Default:** Meets brand standards.
- [ ] **Hover:** Color shift (usually 10% darker/lighter) + cursor change.
- [ ] **Focus:** 2px high-contrast ring with 2px offset.
- [ ] **Active:** Slight "depress" effect (scale 0.98 or darker background).
- [ ] **Loading:** Replace text with spinner or "Loading..." label (maintain width).
- [ ] **Aria-Label:** Required for all icon-only buttons.
