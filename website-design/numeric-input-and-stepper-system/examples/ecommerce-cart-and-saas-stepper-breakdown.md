# E-Commerce Cart & SaaS Seat Stepper Breakdown

This document provides visual architectural breakdowns, spatial geometry specs, and accessibility mappings for three distinct numeric input/stepper implementations:

1. **E-Commerce Cart Quantity Selector** (Inline Horizontal Stepper with Trash Transition)
2. **SaaS Workspace Seat Allocation Modifier** (Inline Stepper with Price Impact & Minimum Boundary Guard)
3. **Financial / Budget Currency Input** (Unit-Affixed Input with Micro-Stepper Controls)

---

## 1. E-Commerce Cart Quantity Selector

In e-commerce cart drawers and Product Detail Pages (PDPs), users typically make small increment/decrement adjustments (e.g., from 1 to 2 items). When quantity is reduced to 1, the decrement button transitions visually or semantically into a removal/trash action.

### Visual ASCII Anatomy

```text
+-----------------------------------------------------------------------+
|  [Item Thumbnail]   Premium Wireless Headphones                       |
|                     Color: Space Gray | SKU: WH-1000XM5               |
|                     $349.00                                           |
|                                                                       |
|                     Quantity:                                         |
|                     +----------------------------------+              |
|                     | [ 🗑️ ] |       1        | [ + ]  |              |
|                     +----------------------------------+              |
|                       (44px)   (Width: 56px)    (44px)                |
|                       Button     Input Field    Button                |
+-----------------------------------------------------------------------+
```

### Layout & Sizing Specs

- **Container Dimensions:** Height `44px`, Total Width `144px`.
- **Decrement Button (`value === 1`):** Width `44px`, Height `44px`. Displays a trash can icon (`aria-label="Remove item"`).
- **Decrement Button (`value > 1`):** Width `44px`, Height `44px`. Displays a minus icon (`aria-label="Decrease quantity"`).
- **Central Numeric Input:** Width `56px`, Height `44px`. Text aligned `center`, font size `16px` (prevents auto-zoom on iOS Safari), font-weight `600`.
- **Increment Button (`value < max`):** Width `44px`, Height `44px`. Displays a plus icon (`aria-label="Increase quantity"`).
- **Border & Radius:** `1px solid var(--border-neutral-subtle)`, border-radius `8px`. Inter-element dividers `1px solid var(--border-neutral-subtle)`.

### State Matrix

| State | Visual Feedback | ARIA / DOM State |
| :--- | :--- | :--- |
| **Default (`qty = 1`)** | Trash icon on left button, disabled state if minimum forced without delete. | `aria-valuenow="1"`, `aria-valuemin="1"` |
| **Hover (Increment)** | Left button hover background `var(--bg-neutral-hover)`. | Cursor `pointer` |
| **Active / Pressed** | Button background `var(--bg-neutral-active)`, slight down-scale transform. | Active button pseudo-class |
| **Max Quantity Reached (`qty = 10`)** | Plus button background muted (`opacity: 0.4`), cursor `not-allowed`. | Plus button `disabled`, `aria-disabled="true"` |
| **Focus-Visible** | 2px solid ring `var(--color-focus-ring)` around the active button or input field. | `:focus-visible` offset 2px |

---

## 2. SaaS Workspace Seat Allocation Control

In SaaS billing dashboards, seat modification impacts monthly recurring revenue (MRR) and active user licenses. Seat counts often have a hard minimum (e.g., minimum 3 required seats for Team Tier) and an account maximum.

### Visual ASCII Anatomy

```text
+-----------------------------------------------------------------------+
|  Team Seat Allocation                                                 |
|  Manage active licenses for your organization ($15/seat/month).       |
|                                                                       |
|  Seats:                                                               |
|  +------------------------------------+  Total Monthly Cost:          |
|  | [ - ]  |          5         | [ + ]|  $75.00 / mo                  |
|  +------------------------------------+  (Includes 5 active seats)    |
|    (40px)    (Width: 72px)      (40px)                                |
|    Disabled     Numeric Input    Active                               |
|    at Min (5)                                                         |
|                                                                       |
|  ⚠️ Minimum requirement: Team plan requires at least 5 seats.         |
+-----------------------------------------------------------------------+
```

### Layout & Sizing Specs

- **Container Dimensions:** Height `40px`, Total Width `152px`.
- **Decrement Button (`seats = min_seats`):** Width `40px`, Height `40px`. Background `var(--bg-disabled)`, icon color `var(--text-disabled)`. `cursor: not-allowed`.
- **Central Numeric Input:** Width `72px`, Height `40px`. Text centered, font size `15px`, font weight `600`.
- **Increment Button:** Width `40px`, Height `40px`. Background `var(--bg-surface-elevated)`, icon color `var(--text-primary)`.
- **Live Price Label:** Synchronized `aria-live="polite"` container announcing total cost updates when seat numbers change.

### Behavior & Boundary Enforcement

1. **Minimum Boundary (5 seats):**
   - Attempting to click `-` when seat count is 5 is blocked.
   - Micro-copy beneath control highlights minimum constraint: *"Minimum requirement: Team plan requires at least 5 seats."*
2. **Direct Entry Handling:**
   - If user types `2` manually and presses `Tab` or `Enter`, input sanitizes on `blur` to `5` and displays a temporary notification tooltip: *"Seats adjusted to plan minimum (5)."*

---

## 3. Financial / Budget Currency Input with Micro-Stepper Controls

For financial forms, expense tracking, or budget allocations, users need to type specific dollar amounts directly (e.g., `$1,250.00`) while also having micro-steppers for `$1.00` or `$10.00` adjustments.

### Visual ASCII Anatomy

```text
+-----------------------------------------------------------------------+
|  Monthly Marketing Budget                                             |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |  $  |  1,250.00                   | [ ▲ ] ($10)                  |  |
|  |     |                           | [ ▼ ] ($10)                  |  |
|  +-----------------------------------------------------------------+  |
|  (Prefix)  (Numeric Input Field)         (Stacked Micro-Stepper)      |
+-----------------------------------------------------------------------+
```

### Layout & Sizing Specs

- **Container Dimensions:** Height `48px`, Width `100%` (responsive max-width `320px`).
- **Currency Prefix:** Positioned absolute left inside container, `padding-left: 12px`, color `var(--text-secondary)`, font weight `600`.
- **Numeric Input Field:** `padding-left: 28px`, `padding-right: 40px`. Align text `right` or `left` depending on currency locale guidelines. `inputmode="decimal"`.
- **Stacked Stepper Controls:**
  - Placed on the far right inside the input field bounding box.
  - Total Width `36px`, Height `100%`.
  - Top Button (`▲` Increment): Height `22px`, Width `36px`.
  - Bottom Button (`▼` Decrement): Height `22px`, Width `36px`.
  - Border divider between top and bottom stepper buttons.

### Key Accessibility & Interaction Rules

- **Role Setup:** Input uses `role="spinbutton"` with `aria-valuenow="1250.00"`, `aria-valuemin="0.00"`, `aria-step="10.00"`.
- **Keyboard Shortcuts:**
  - `ArrowUp`: Adds `$10.00`.
  - `Shift + ArrowUp`: Adds `$100.00`.
  - `ArrowDown`: Subtracts `$10.00`.
  - `Shift + ArrowDown`: Subtracts `$100.00`.
