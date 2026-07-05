---
name: data-table-ui-system
description:
  Design and implement a systematic framework for data tables that ensures
  readability, scannability, and structural integrity across complex datasets.
---

# Data Table UI System

## Purpose

The Data Table UI System skill provides a methodology for organizing and
presenting structured, multi-attribute data. It ensures that large datasets are
easy to scan, compare, and act upon by establishing clear rules for alignment,
spacing, hierarchy, and interactive elements within a tabular format.

## Use Cases

- Designing SaaS dashboards for inventory, user management, or billing.
- Creating product comparison matrices for e-commerce or marketing sites.
- Implementing log viewers or audit trails for technical applications.
- Organizing financial data or performance metrics in a structured view.
- Establishing a component library standard for "Data Tables" or "Data Grids."

## When NOT to Use

- **Simple Key/Value Pairs:** If you only have two columns (e.g., Label: Value),
  use a Description List (`<dl>`) or a simple list instead.
- **Narrative Content:** Long-form text or stories should use standard typography
  and section structures, not tables.
- **Layout Grids:** Use `responsive-grid-system` for page layout; tables are
  strictly for data.
- **Low-Data Cards:** If the data is highly visual and has few attributes, use
  `card-ui-system` for better engagement.

## Inputs

1. **Data Schema:** The types of data to be displayed (strings, numbers, dates,
   booleans, actions).
2. **Column Priority:** Which attributes are essential for identification vs.
   secondary details.
3. **User Tasks:** Does the user need to find a specific row, compare values
   across rows, or take bulk actions?
4. **Volume Expectations:** How many rows and columns are expected in a
   typical view?

## Outputs

1. **Table Anatomy Spec:** Defined regions (Header, Row, Cell, Footer) and
   their internal spacing.
2. **Alignment Matrix:** Rules for horizontal alignment based on data type.
3. **Density Variants:** Definitions for Compact, Standard, and Relaxed
   row heights.
4. **Interaction Map:** Behavior for sorting, filtering, row selection, and
   inline actions.

## Workflow

### 1. Define Column Types and Alignment

Apply the "Alignment Rule of Thumb" to ensure scannability:
- **Text/Default:** Left-aligned (helps the eye follow the start of the word).
- **Numbers/Metrics:** Right-aligned (aligns decimal points and allows for
  quick magnitude comparison).
- **Dates/Status Labels:** Centered or Left-aligned (depending on column width).
- **Actions:** Right-aligned (usually the final column).

### 2. Establish Visual Hierarchy (The Header)

The table header must clearly distinguish itself from the data:
- **Style:** Use a different background color, bold weight, or all-caps
  treatment for `<th>` elements.
- **Persistence:** For long tables, use a sticky header so users don't lose
  context while scrolling.

### 3. Set Row Density and Rhythm

Choose a density level based on the use case:
- **Compact:** High data density (e.g., 32px height). Best for power users
  and dashboards.
- **Standard:** Balanced (e.g., 48px height). Best for general utility.
- **Relaxed:** Low density (e.g., 64px height). Best for marketing or simple
  lists.
Use zebra-striping or subtle borders to separate rows and reduce "line skipping."

### 4. Design for Interactive Data

Define how users manipulate the data:
- **Sorting:** Add indicators (chevrons) to headers that support sorting.
- **Row States:** Define Hover, Selected, and Focused states for rows.
- **Bulk Actions:** If needed, add a checkbox column on the far left.

### 5. Plan for Content Variance

Handle edge cases in data length:
- **Truncation:** Use ellipses for long text that isn't critical for identification.
- **Wrapping:** Allow wrapping for important descriptive text.
- **Fixed Widths:** Assign fixed widths to stable columns (e.g., Status, Date)
  and fluid widths to primary identifiers (e.g., Name).

## Decision Rules

- **The Scannability Rule:** The first column should always be the most
  important identifier (e.g., Name, ID) to serve as an anchor for the row.
- **Number Alignment:** If comparing values is the primary task, use
  monospaced fonts for numbers to keep digits perfectly aligned.
- **Zebra-Striping vs. Borders:** Use zebra-striping for very wide tables to
  help the eye track horizontally; use borders for shorter, simpler tables.
- **Action Placement:** Group actions together in the final column or use a
  visible "More" menu to keep the interface clean.
- **Empty Cells:** Never leave a cell blank. Use a dash (—) or "N/A" to
  confirm the data is missing, not just a loading error.

## Constraints

- **Accessibility:** Must use semantic `<table>` tags. Headers must have
  `scope="col"`. Captions must be used for context. Sticky headers must not
  obscure the focus indicator of cells or row actions scrolled beneath them
  (WCAG 2.2 SC 2.4.11). Inline action buttons/links must meet the 24x24px
  minimum target size (SC 2.5.8).
- **Responsiveness:** Tables must follow patterns from `responsive-data-tables`
  (Scroll, Stack, or Toggle) when viewports shrink.
- **Contrast:** Header text and status indicators must meet WCAG AA (4.5:1).

## Common Failure Patterns

- **Misaligned Numbers:** Left-aligning numbers makes it impossible to compare
  magnitudes at a glance.
- **The "Wall of Text":** Using high-density rows without zebra-striping or
  clear header distinction, causing "eye fatigue."
- **Invisible Headers:** Headers that look too similar to the data, making
  it hard to know what the columns represent.
- **Missing Action Affordance:** Buttons or links inside cells that are too
  small to tap or don't look interactive.
- **No Empty State:** Showing a blank table without a "No results found"
  message.

## Validation Criteria

- [ ] Column alignment follows data-type rules (Text=Left, Numbers=Right).
- [ ] Table headers are visually distinct from row data.
- [ ] Primary identifier is anchored in the first column.
- [ ] Semantic HTML (`<table>`, `<th>`, `scope`) is used for structure.
- [ ] Empty cells use a placeholder (e.g., —) instead of being blank.
- [ ] Interactive states (Hover/Select) are clearly defined.
- [ ] The design handles long content gracefully (truncation or wrapping).
- [ ] Sticky headers never obscure focus indicators on rows or cell actions
      (WCAG 2.2 SC 2.4.11).
- [ ] Row actions meet the 24x24px minimum target size (WCAG 2.2 SC 2.5.8).
