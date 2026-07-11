---
name: property-and-attribute-system
description:
  Design and implement a systematic framework for structured "Key: Value"
  metadata, ensuring numerical clarity, semantic alignment, and responsive
  scannability for entity attributes.
---

# Property and Attribute System

## Purpose

The Property and Attribute System provides a methodology for designing and
structuring "Key: Value" metadata pairs for a single entity (e.g., product
specifications, real estate features, user details). While `data-table-ui-system`
handles multi-item comparisons, this system focuses on the **internal
hierarchy** and **spatial organization** of attributes belonging to a single
object. It ensures that critical metadata is scannable, visually distinct from
narrative text, and maintains structural integrity across different viewport
widths.

## Use Cases

- **Product Specifications:** Displaying dimensions, materials, and technical
  details on a Product Detail Page (PDP).
- **Real Estate Listings:** Organizing property features (Beds, Baths, Sqft,
  Year Built).
- **User Profiles:** Showing account metadata (Join date, Role, Subscription
  status).
- **Transaction/Audit Logs:** Displaying the specific attributes of a single
  event or order.
- **Project Overheads:** Summarizing project metadata in a header or sidebar.

## When NOT to Use

- **Multi-Item Comparisons:** When users need to compare attributes across
  multiple rows; use `data-table-ui-system`.
- **Narrative Content:** For long-form descriptions or stories; use
  `article-layout-system`.
- **Global Navigation:** For site-wide structure; use `site-navigation-system`.
- **Interactive Forms:** When the primary goal is data entry; use
  `form-design-system`.

## Inputs

1. **Attribute Inventory:** The list of keys (labels) and values (data) to be
   displayed.
2. **Data Type Matrix:** Identifying if values are Strings, Numbers, Booleans,
   Icons, or Links.
3. **Priority Ranking:** Which attributes are "Primary" (high-visibility) vs.
   "Secondary" (detailed/hidden).
4. **Layout Context:** Will this live in a sidebar, a main content column, or a
   modal?

## Outputs

1. **List Anatomy Spec:** Definition of the Label (Key) and Value relationship
   (Size, Weight, Color).
2. **Alignment Matrix:** Rules for horizontal vs. vertical stacking based on
   container width.
3. **Grouping Strategy:** Methodology for categorizing large attribute sets
   into sub-sections.
4. **Semantic Blueprint:** Mapping attributes to the HTML Description List
   (`<dl>`) structure.

## Workflow

### 1. Categorize and Group Attributes

For entities with more than 5-7 attributes, group them into logical categories
(e.g., "Dimensions," "Performance," "Compliance"). This reduces cognitive load
and allows users to jump to relevant details.

### 2. Choose the Layout Pattern

Select a pattern based on available horizontal space and attribute density:

- **Horizontal (Side-by-Side):** Label on left, Value on right. Best for wide
  containers and short labels.
- **Vertical (Stacked):** Label on top, Value on bottom. Best for narrow
  containers (sidebars, mobile) and long values.
- **Grid (Multi-column):** Attributes arranged in a 2 or 3 column grid. Best
  for high-density "quick-glance" stats.

### 3. Establish Visual Hierarchy

Distinguish between the "Key" and the "Value":
- **The Label (Key):** Use a muted color, smaller font size, or all-caps style
  to indicate it is a descriptor.
- **The Value (Data):** Use a higher-contrast color, bolder weight, or larger
  size to ensure the actual data is the primary focal point.
- **Separation:** Use subtle dividers or consistent vertical rhythm
  (`--space-s` to `--space-m`) to separate pairs.

### 4. Define Alignment and Scannability

- **Horizontal Alignment:** For side-by-side layouts, align labels to the left.
  If labels vary significantly in length, consider a fixed-width label column
  to create a clean vertical "axis" for the values.
- **Justification:** Avoid "Extreme Justification" (Label on far left, Value on
  far right) in wide containers, as it makes the eye travel too far. Keep them
  closely paired.

### 5. Plan Responsive Transformations

Attribute lists are the "shape-shifters" of the UI:
- **The Stack Shift:** Transition from Horizontal (Desktop) to Vertical (Mobile)
  to prevent text overlapping or extreme wrapping.
- **The Grid Collapse:** Multi-column grids should collapse into 1 or 2 columns
  on smaller screens.

## Decision Rules

- **The "Axis" Rule:** In a horizontal list, the values should share a vertical
  alignment line (axis) to allow the eye to scan the data without jumping.
- **Empty Values:** Never leave a value blank. Use "—" or "None" to confirm the
  attribute is intentionally empty, not a system error.
- **Icon Usage:** Use icons only if they provide immediate semantic
  differentiation (e.g., a "Ruler" icon for dimensions). Avoid icons if they
  add visual noise without clarity.
- **Density Logic:** Use "Standard" density (16px gap) for general profiles and
  "Compact" density (8px gap) for technical specs and dashboards.

## Constraints

- **Accessibility:** Use the HTML `<dl>` (Description List) element for
  semantic correctness (`<dt>` for labels, `<dd>` for values). This ensures
  screen readers communicate the relationship between the pairs.
- **Contrast:** Both labels and values must meet WCAG AA contrast ratios
  (4.5:1). Even if the label is "muted," it must remain legible.
- **Responsiveness:** Lists must never overflow the viewport. Text-wrapping
  must be handled gracefully without breaking the "axis" of the list.

## Common Failure Patterns

- **The "Value/Label Blur":** Making the label and value look identical in
  weight and color, making it impossible to scan the list.
- **Extreme Justification:** Pushing values to the far right edge of a wide
  screen, separating them from their labels.
- **Table Abuse:** Using a `<table>` for a single-object attribute list, which
  adds unnecessary markup overhead and is harder to style responsively.
- **Inconsistent Alignment:** Mixing horizontal and vertical stacking in the
  same list without a clear logical break.
- **Missing Empty States:** Leaving a property blank, which leaves the user
  wondering if the data is loading or simply missing.

## Validation Criteria

- [ ] Labels and values are visually distinct through weight, size, or color.
- [ ] Attributes are semantically marked up using `<dl>`, `<dt>`, and `<dd>`.
- [ ] Lists transform from horizontal to vertical stacking on mobile viewports.
- [ ] Large attribute sets are grouped into logical sub-categories.
- [ ] Alignment creates a clear vertical "axis" for the data values.
- [ ] Empty states (e.g., "—") are defined for missing properties.
- [ ] Contrast ratios for all text meet WCAG AA standards.
