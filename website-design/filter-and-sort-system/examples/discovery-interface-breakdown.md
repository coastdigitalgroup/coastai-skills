# Discovery Interface Breakdown

This example demonstrates the Filter and Sort System applied to a complex
e-commerce Product Listing Page (PLP). It highlights how spatial composition
and visual hierarchy guide the user from broad exploration to specific
selection.

## The Scenario

An electronics retailer has a "Laptops" category with over 400 items. Users
frequently filter by Brand, Price, RAM, and Screen Size.

## Spatial Composition

### 1. The Persistent Sidebar (Desktop)
The layout uses a **Left Sidebar** for discovery tools, occupying 25% of the
available horizontal space. This allows for many facets without vertical
overcrowding.

- **Width:** 280px fixed width.
- **Behavior:** Sticky positioning, ensuring filters remain accessible even as
  the user scrolls through the results grid.

### 2. The Interaction Header
Located above the results grid, this area handles transient states and
prioritization.

- **Active Filter Bar:** A horizontal row of "Chips" (e.g., `Brand: Apple [x]`,
  `RAM: 16GB [x]`).
- **Counter:** "Showing 42 of 418 laptops."
- **Sorting Dropdown:** Positioned top-right for easy access (Defaults to "Best
  Match").

---

## Visual Hierarchy Breakdown

### Facet Groups
Each group (e.g., "Price Range") uses a consistent visual structure:

| Element | Visual Treatment | Reason |
| :--- | :--- | :--- |
| **Header** | 14px, Bold, All Caps | Clearly separates categories. |
| **Options** | 14px, Regular, 32px height | Provides comfortable tap/click area. |
| **Selection** | Accent Color Checkbox | Immediate visual confirmation. |
| **Counts** | 12px, Muted Gray | Provides "Information Scent" without clutter. |

### Active Chips
- **Background:** Subtle light gray or brand secondary color.
- **Interaction:** Includes a clear "X" icon for removal.
- **Proximity:** Placed directly above results to show the causal link between
  filters and content.

---

## Responsive Adaptation (Mobile)

On screens smaller than 768px, the sidebar is replaced by a **Discovery
Trigger**:

1. **The Trigger:** A sticky "Filter & Sort" button appears at the bottom-center
   of the viewport.
2. **The Drawer:** Tapping the trigger slides up a full-screen drawer.
3. **Internal Hierarchy:** Sorting is placed at the top of the drawer, followed
   by collapsible filter facets.
4. **The Apply Action:** A persistent footer in the drawer says "Show 42
   Results."

---

## Key Design Decisions

- **Range Sliders for Price:** Used to allow granular control without a long
  list of checkboxes.
- **Color Swatches:** For "Color" filters, visual circles are used instead of
  text labels to speed up recognition.
- **Skeleton Loading:** When a filter is clicked, the results grid items are
  replaced by gray blocks for 300ms to indicate that the content is being
  fetched.
