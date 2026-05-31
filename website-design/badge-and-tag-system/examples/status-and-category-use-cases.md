# Badge and Tag Use Cases

This example demonstrates how to apply the `badge-and-tag-system` to common website components: an E-commerce Product Card and a SaaS Dashboard Table.

## 1. E-commerce Product Card (Visual Priority)

In e-commerce, badges are used to trigger urgency or highlight value, while tags provide metadata like size or material.

### The Problem
A product grid where "On Sale," "New," and "Best Seller" items all look the same, forcing the user to read every price to find a deal.

### The Solution (Applied Skill)
- **Overlay Badge:** A "Sale -20%" pill badge in the top-left corner of the product image using `Success` (Green) color logic.
- **Urgency Badge:** A "Only 2 Left" tag below the title using `Error` (Red) color logic to trigger scarcity.
- **Categorization Tags:** Small, neutral (Gray) tags for "Organic Cotton" and "Fair Trade" listed at the bottom of the card.

### Visual Breakdown
```text
[IMAGE] ----------------------------> [ Badge: "Sale -20%" (Green Pill) ]
Product Title
[ Badge: "Only 2 Left" (Red Text) ]
$45.00
------------------------------------
[ Tag: Organic ] [ Tag: Fair Trade ]
```

---

## 2. SaaS Dashboard (Status and Interactivity)

In complex dashboards, badges communicate system state, and tags manage filters or groupings.

### The Problem
A user cannot tell which servers are "Up" or "Down" at a glance because the status is just plain text in a table.

### The Solution (Applied Skill)
- **Status Badge:** The "Status" column uses colored pill badges with icons:
  - **Active:** Green dot + "Active"
  - **Error:** Red X + "Down"
  - **Maintenance:** Yellow clock + "Pending"
- **Interactive Tags:** A "Active Filters" bar above the table allows users to remove categories like "Region: US-East" or "Tier: Enterprise" by clicking an "X" on the tag.

### Interaction Breakdown
- **Status Badge (Static):** High contrast, provides immediate "Wayfinding" for system health.
- **Filter Tag (Interactive):**
  - **Default:** Light blue background with a dark blue "X".
  - **Hover:** Darkens slightly, cursor becomes a pointer.
  - **Action:** Clicking "X" removes the filter and refreshes the data table.

---

## 3. Blog/Content Hub (Categorization)

### The Problem
A blog with 100+ articles but no way to see topics without opening each post.

### The Solution (Applied Skill)
- **Topic Tags:** Each article card displays 1-2 primary tags (e.g., "Design Systems", "Tutorial").
- **Visual Style:** Rounded corners (4px), neutral background, high-contrast text.
- **Logical Rule:** Only the most relevant tag is shown if space is limited on mobile.
