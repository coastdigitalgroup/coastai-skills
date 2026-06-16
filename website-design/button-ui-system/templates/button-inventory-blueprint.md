# Button Inventory Blueprint

Use this template to define and document the button system for a new project.
This ensures that designers and developers are aligned on the available styles,
sizes, and behaviors.

---

## 1. Core Anatomy Standards

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Font Family** | `var(--font-sans)` | |
| **Font Weight** | `600 (Semibold)` | |
| **Border Radius** | `4px` | Default rounding |
| **Min Tap Target** | `44px x 44px` | WCAG AA requirement |
| **Transition** | `150ms ease-in-out` | Standard state change speed |

---

## 2. Style Tier Definitions

| Tier | Style Name | Visual Treatment | Use Case |
| :--- | :--- | :--- | :--- |
| **Level 1** | `btn--primary` | Solid Background (Primary Color) | Main page goals, CTA |
| **Level 2** | `btn--secondary` | 2px Border (Primary Color), No Fill | Secondary actions, "Learn More" |
| **Level 3** | `btn--ghost` | No Border, No Fill, Text Only | Minor actions, "Cancel," "Dismiss" |
| **Semantic** | `btn--danger` | Solid or Outlined (Red) | Delete, Remove, Revoke |
| **Inverted**| `btn--inverted`| White Background or Border | Use on dark brand backgrounds |

---

## 3. Sizing Matrix

| Size | Height | Padding (V/H) | Font Size | Use Context |
| :--- | :--- | :--- | :--- | :--- |
| **Small** | `32px` | `4px / 12px` | `12px` | Dashboards, Data Tables |
| **Medium**| `48px` | `12px / 24px` | `16px` | **Default size** for all forms |
| **Large** | `64px` | `16px / 32px` | `20px` | Hero sections, Landing pages |

---

## 4. Interaction Logic Check-list

- [ ] **Hover:** Color shifts by +/- 10% brightness.
- [ ] **Focus:** Visible ring with 2px offset.
- [ ] **Active:** 5% scale compression OR darker fill.
- [ ] **Loading:** Spinner replaces text or icon.
- [ ] **Disabled:** Opacity at 40%, cursor set to `not-allowed`.

---

## 5. Implementation Annotation Template

When handing off designs, use the following annotation pattern for every
interactive trigger:

> **Component:** [Name, e.g., "Sign Up Button"]
>
> **Tier:** [Primary / Secondary / Ghost / Danger]
>
> **Size:** [Large / Medium / Small]
>
> **Logic:** [Button vs. Link]
>
> **ARIA Label:** [Required if icon-only or vague text]
