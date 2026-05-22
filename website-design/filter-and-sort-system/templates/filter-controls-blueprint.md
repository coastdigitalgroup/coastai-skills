# Filter Controls Blueprint

Use this blueprint to define the internal structure and visual properties of
discovery components.

## 1. Filter Sidebar Structure (Desktop)

| Region | Component | Requirement |
| :--- | :--- | :--- |
| **Top** | `Header` | Title ("Filters") + "Clear All" link. |
| **Middle** | `Facet List` | Stacked list of collapsible groups. |
| **Bottom** | `Ad/Promo` | (Optional) Contextual CTA based on selection. |

### Visual Tokens (Sidebar)
- **Group Margin:** `--space-l` (Bottom)
- **Option Margin:** `--space-xs` (Vertical)
- **Indent:** 0 (Align labels with headers for maximum scan path)

---

## 2. Active Filter Chips (Toolbar)

The chip bar should sit between the page header and the results grid.

```text
[ (Icon) Filter Name: Value (X) ]  [ Filter Name: Value (X) ]  [ Clear All ]
```

### Properties
- **Padding:** `--space-xs` (Vertical) / `--space-s` (Horizontal)
- **Border Radius:** `100px` (Pill shape)
- **Text:** 12px-14px
- **Hover State:** Background darken 10%

---

## 3. Mobile Discovery Drawer

| Stage | Content | Purpose |
| :--- | :--- | :--- |
| **Header** | "Filter & Sort" + Close (X) | Orient the user. |
| **Body** | Scrollable list of Facets | Main discovery interaction. |
| **Footer** | Sticky "Apply" Button | Commit the selection. |

### Drawer Constraints
- **Touch Target:** Minimum 44px height for every filter option.
- **Scroll:** Body must be independently scrollable if facets exceed viewport.

---

## 4. Control Type Selection Matrix

Use this to choose the right visual control for your data type.

| Data Type | Recommended Control | Why? |
| :--- | :--- | :--- |
| **Category** | Checkbox | Allows multiple inclusion. |
| **Price / Spec** | Range Slider | Best for continuous numeric data. |
| **Color** | Visual Swatch | Visual recognition is faster than reading. |
| **Rating** | Star Row + Checkbox | Matches mental model of quality. |
| **Availability** | Toggle / Switch | Indicates a binary state. |
