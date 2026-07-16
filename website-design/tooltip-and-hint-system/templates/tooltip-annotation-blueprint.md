# Tooltip Annotation Blueprint

Use this blueprint when documenting tooltip and hint behaviors for developers or stakeholders.

## 1. Tooltip Specification

| Property | Value / Requirement |
| :--- | :--- |
| **Trigger** | [Hover (300ms delay) \| Focus \| Tap] |
| **Position** | [Top-Center (Primary) \| Bottom-Center (Fallback)] |
| **Offset** | 8px from anchor |
| **Dismissal** | [Escape key \| Click outside \| Mouse leave] |
| **ARIA Role** | `role="tooltip"` |
| **ARIA Link** | `aria-describedby="[tooltip-id]"` on Anchor |

## 2. Visual Style Tokens

- **Background:** `var(--color-neutral-900)`
- **Text:** `var(--color-neutral-50)`
- **Typography:** `var(--font-size-xs)` / `var(--font-weight-medium)`
- **Border Radius:** `4px`
- **Shadow:** `var(--shadow-lg)` (to indicate elevation above base UI)
- **Arrow Size:** `6px` equilateral triangle

## 3. Inline Hint Specification

| Property | Value / Requirement |
| :--- | :--- |
| **Placement** | Directly below Label or Input |
| **Visibility** | Persistent |
| **Contrast** | Min 4.5:1 against background |
| **Icon** | (Optional) `info-circle` at 14px size |

## 4. Interaction Behavior

- **Auto-Flip:** If tooltip would overflow the viewport top, flip to the bottom.
- **Mouse Safety:** The tooltip must remain visible if the user moves the cursor *onto* the tooltip (to allow selecting text or clicking links within).
- **Focus Management:** Tooltip must disappear when the anchor loses focus (`blur`).
