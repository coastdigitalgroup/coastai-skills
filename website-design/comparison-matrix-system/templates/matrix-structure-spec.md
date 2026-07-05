# Template: Comparison Matrix Structure Spec

Use this template to define the anatomy, behaviors, and data rules for a new Comparison Matrix. This ensures consistency between design handoff and implementation.

---

## 1. Matrix Anatomy

| Component | Visual Rule (Token/Style) | Behavior |
| :--- | :--- | :--- |
| **Lead Column (Row Headers)** | e.g., Font: Bold, Width: 200px | Sticky on Horizontal Scroll (Desktop) |
| **Column Headers (Item Cards)** | e.g., Bg: White, Border: 1px Gray | Sticky on Vertical Scroll |
| **Section Headers** | e.g., Bg: Light Gray, Height: 48px | Collapsible (Toggle on Click) |
| **Data Cells** | e.g., Align: Center, Padding: 16px | Row Hover State Highlight |
| **Visual Scrim/Gradient** | e.g., Bottom fade on Sticky Header | Appears when user scrolls down |

## 2. Data Type Definitions

| Data Type | UI Element | Inclusion Rule |
| :--- | :--- | :--- |
| **Boolean (True)** | ✓ (Icon: Check-Bold) | Color: --color-success-600 |
| **Boolean (False)** | — (Em-dash) | Color: --color-neutral-400 |
| **Numerical** | Text + Unit (e.g., "12 GB") | Tabular Figures (Monospace) |
| **Rating** | ★ (Scale of 5) | Active Color: Gold, Muted: Gray |
| **Link/Action** | "View Details" Text Link | Primary Brand Color |

## 3. Responsive Map (Mobile Strategy)

- **Default State:** Leading Column + [Item 1] visible.
- **Selector Mechanism:** [Dropdown/Tabs] to switch between Item 2, 3, 4.
- **Header Behavior:** Condensed Item Header (Text Only, no image) on mobile to save vertical space.
- **Attribute Stacking:** If an attribute description is > 2 lines, expand row height or use "Truncate + Read More."

## 4. Interaction Rules

- **Row Hover:** Apply `background-color: var(--color-neutral-50)` to the entire `<tr>`.
- **Column Highlight:** If a user clicks a "Focus" button on a specific column, apply a subtle border or glow to that column.
- **Empty Cells:** Never leave a cell blank. Use "N/A" or "—" to confirm data was checked.

## 5. Accessibility Checklist

- [ ] `<table>` uses `<thead>`, `<tbody>`, and `<tfoot>`.
- [ ] Row headers use `<th scope="row">`.
- [ ] Column headers use `<th scope="col">`.
- [ ] Checkmark icons have `aria-label="Yes"` or equivalent.
- [ ] Sticky headers maintain a z-index that doesn't overlap global navigation.
- [ ] Contrast ratio for all data text is at least 4.5:1.
