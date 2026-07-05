---
name: comparison-matrix-system
description:
  Design and implement a systematic framework for side-by-side comparison
  interfaces, managing high attribute density and responsive complexity to
  support informed decision-making.
---

# Comparison and Matrix System

## Purpose

The Comparison and Matrix System provides a methodology for designing detailed
discovery and evaluation interfaces. While `pricing-table-ui-system` handles
high-level plan tiers and `data-table-ui-system` manages large datasets, this
system focuses on the **attribute-dense comparison** of a few specific items
(usually 2–5). It ensures that users can evaluate complex products or services
across dozens of dimensions without losing their place, feeling overwhelmed by
data, or struggling with unresponsive layouts.

## Use Cases

- **E-commerce Product Comparison:** Comparing technical specs for electronics,
  appliances, or vehicles.
- **SaaS Feature Matrices:** Detailed breakdown of platform capabilities
  beyond the high-level pricing cards.
- **Service Comparison:** Evaluating different insurance plans, travel
  packages, or educational courses.
- **Internal Tools:** Auditing different system versions or configurations
  side-by-side.

## When NOT to Use

- **High-Level Pricing:** For simple 3-tier subscription summaries, use
  `pricing-table-ui-system`.
- **Large Dataset Exploration:** If the user needs to sort and filter through
  hundreds of items, use `data-table-ui-system`.
- **Single Item Details:** Use `article-layout-system` or `card-ui-system` for
  individual product pages.
- **Linear Progress:** For step-by-step flows, use `step-progress-system`.

## Inputs

1. **Comparison Set:** The 2–5 items selected for evaluation.
2. **Attribute Taxonomy:** A categorized list of all features, specs, and
   data points to be compared.
3. **Data Types:** A mapping of attributes to UI types (e.g., Boolean/Checkmark,
   Numerical, Rating, Text Description).
4. **Context of Selection:** Is this a persistent page or a temporary overlay
   triggered from a product listing page?

## Outputs

1. **Matrix Anatomy Spec:** Definitions for Row Headers (attributes), Column
   Headers (items), and Data Cells.
2. **Categorization Framework:** Rules for grouping attributes into logical
   sections with collapsible headers.
3. **Sticky Navigation Plan:** Behavioral rules for maintaining context during
   vertical and horizontal scrolling.
4. **Responsive Transition Map:** A strategy for adapting the matrix to mobile
   (e.g., Item Swapping vs. Vertical Stacking).

## Workflow

### 1. Structure the Grid Framework

Define the primary axis of the matrix:
- **Columns:** Represent the items being compared.
- **Rows:** Represent the attributes or features.
- **Leading Column:** The first column on the left contains the attribute
  labels/headers.

### 2. Categorize and Group Attributes

Prevent "Comparison Fatigue" by organizing rows into logical clusters:
- **Sections:** Group related attributes (e.g., "Performance," "Connectivity,"
  "Warranty").
- **Collapsibility:** Allow users to collapse/expand sections to focus on
  specific criteria.
- **Visual Distinction:** Use subtle background shifts or borders to separate
  sections.

### 3. Standardize Data Visualization

Apply a consistent visual language to different data types:
- **Booleans:** Use high-contrast checkmarks (✓) for inclusion and a dash (—)
  or empty state for exclusion.
- **Ratings:** Use consistent icon scales (e.g., 5 stars).
- **Nuanced Text:** Use a smaller, readable font size for descriptions,
  ensuring line-length is managed within the cell.
- **Highlights:** Visually distinguish cells where one item clearly outperforms
  others (use with caution to maintain neutrality).

### 4. Implement Sticky Context (Wayfinding)

Ensure the user never loses track of what they are looking at:
- **Sticky Column Headers:** Keep the item names and photos visible at the top
  of the viewport as the user scrolls down through the rows.
- **Sticky Row Headers:** For wide matrices on desktop, keep the attribute
  labels visible on the left as the user scrolls horizontally.

### 5. Plan for Mobile Adaptation

Matrices are inherently horizontal; adapt them for vertical screens:
- **The "Selector" Pattern:** Show the attribute list and 1–2 items at a time,
  using a dropdown or swipe interaction to switch which items are visible.
- **The "Vertical Card" Pattern:** Transform the matrix into a sequence of
  cards, repeating attribute labels for each card (only recommended for
  very simple comparisons).

## Decision Rules

- **The Rule of Five:** Limit the maximum number of items in a side-by-side
  matrix to 5 on desktop to prevent horizontal overwhelm.
- **Attribute Relevancy:** Only include attributes that differ between at
  least two items in the set. If every item has the same value, consider
  moving that info to a shared "Global Features" section.
- **Header Prominence:** Item headers (Column 1, 2, etc.) should include a
  small image of the product to provide instant visual recognition.
- **Row Hover States:** Use a distinct hover background for the entire row to
  help the eye track across columns.

## Constraints

- **Accessibility:** Row headers must be properly associated with cells using
  `scope="row"` and `scope="col"`. Ensure high contrast for checkmarks and
  icons. Sticky column/row headers must not obscure the keyboard focus
  indicator of cells or controls beneath them (WCAG 2.2 SC 2.4.11). Any
  item-switcher or dropdown control on mobile must meet the 24x24px minimum
  target size (SC 2.5.8).
- **Responsiveness:** Horizontal scrolling must be intentional (e.g., within a
  container) and not break the global page layout.
- **Visual Weight:** The "Lead Column" (attributes) should have a slightly
  different visual treatment (e.g., light gray background or bold text) to
  distinguish it from the data.

## Common Failure Patterns

- **The "Lost Header" Problem:** Scrolling down a long matrix and forgetting
   which item is which.
- **Attribute Overload:** Displaying 50+ rows without categorization, making it
  impossible to find specific info.
- **Mobile Compression:** Trying to squeeze 4 columns into a mobile screen,
  rendering the text unreadable.
- **Ambiguous Symbols:** Using custom icons for "Yes/No" that users don't
  immediately understand.
- **Inconsistent Alignment:** Mixing centered icons with left-aligned text
  within the same column.

## Validation Criteria

- [ ] Item headers remain sticky at the top of the viewport during vertical
      scrolling.
- [ ] Attributes are grouped into logical, collapsible sections.
- [ ] Data types (Boolean, Rating, Text) use a consistent visual language.
- [ ] The "Lead Column" is visually distinct from the data columns.
- [ ] Mobile view provides a clear mechanism for comparing items (e.g., item
      switching).
- [ ] Row hover states are implemented to assist horizontal tracking.
- [ ] All icons and text meet WCAG AA (4.5:1) contrast requirements.
- [ ] Sticky headers do not obscure focus indicators on cells or controls
      (WCAG 2.2 SC 2.4.11).
- [ ] Mobile item-switcher controls meet the 24x24px minimum target size
      (WCAG 2.2 SC 2.5.8).
