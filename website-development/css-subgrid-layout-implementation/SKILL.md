---
name: css-subgrid-layout-implementation
description: Align nested component elements directly to a parent container's CSS Grid tracks using CSS Subgrid (`grid-template-rows: subgrid` / `grid-template-columns: subgrid`), ensuring cross-card section alignment, form field consistency, and progressive enhancement fallbacks without breaking HTML semantics or introducing extra DOM wrappers.
---

# CSS Subgrid Layout Implementation

## Purpose

The CSS Subgrid Layout Implementation skill provides a technical protocol, CSS architecture, alignment patterns, and fallback strategies for aligning nested component elements directly to a parent container's CSS Grid tracks using CSS Subgrid (`subgrid`).

Before CSS Subgrid, nested HTML elements inside grid items (such as card headers, badges, content paragraphs, price tags, and footers) calculated their grid sizing independently from neighboring cards. This caused uneven section heights and misalignment across multi-card grids unless rigid fixed heights or flat DOM structures were forced, breaking semantic grouping (`<article>`, `<form>`, `<fieldset>`).

CSS Subgrid solves this by allowing a child container that spans multiple parent grid tracks to inherit those exact track definitions along its column or row axis (`grid-template-rows: subgrid` or `grid-template-columns: subgrid`). This enables cross-card row alignment, multi-column form alignments, and nested layout continuity while preserving semantic, accessible HTML nesting.

---

## Use Cases

- **Multi-Card Product & Editorial Grids:** Aligning headlines, subheadings, badges, pricing, and action buttons perfectly across horizontally adjacent cards regardless of variable text length.
- **Complex Multi-Column Forms:** Aligning form labels, input fields, help text, and validation error messages across multiple semantic `<fieldset>` or `<form>` child rows without table markup or fixed-width label wrappers.
- **Nested Layout Continuity:** Extending page-level layout tracks (e.g., 12-column page grid or sidebar layout) down into complex nested sub-components without losing track alignment.
- **Dashboard Widget Layouts:** Synchronizing row boundaries across unequal multi-row widget cards in analytics dashboards.

---

## When NOT to Use

- **Independent Component Content:** When child elements inside a card should size fluidly based solely on their own internal content without needing to line up with neighboring sibling cards.
- **1D Single-Axis Flow:** Simple single-row or single-column lists where CSS Flexbox provides cleaner, content-driven distribution (`gap`, `flex: 1`, `align-items: center`).
- **Legacy Browser Strict Requirement (Without Fallback):** When target environments include legacy browser engines (e.g., Chrome < 117, Safari < 16.0, Firefox < 71) AND progressive enhancement fallbacks (Flexbox or standard CSS Grid) are strictly prohibited by business requirements.
- **Tabular Data Tables:** Native HTML `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>` elements must be used for semantic data tables rather than overriding semantic table roles with CSS Grid/Subgrid.

---

## Inputs

1. **Parent Grid Container Definition:** Track dimensions, gap values, and track counts defined on the parent element (`grid-template-columns`, `grid-template-rows`, `gap`).
2. **Child Item Track Spanning:** Explicit track range or row/column span assigned to the nested child container (`grid-row: span 4` or `grid-column: 1 / -1`).
3. **Semantic HTML Structure:** Nested markup hierarchy (`<main>` -> `<article>` -> `<h3>`, `<p>`, `<footer>`) requiring visual alignment across card boundaries.
4. **Fallback Layout Strategy:** Baseline CSS rules for engines that do not support `@supports (grid-template-rows: subgrid)`.

---

## Outputs

1. **Parent CSS Grid Rules:** Multi-track grid definitions designed to accommodate subgrid-item row or column spans.
2. **Subgrid Child Container Styles:** CSS rules setting `display: grid` and `grid-template-rows: subgrid` / `grid-template-columns: subgrid`.
3. **Nested Item Track Placement:** Child element assignments mapping individual sub-elements to inherited subgrid tracks.
4. **Progressive Enhancement Fallback Modules:** `@supports` block wrappers providing acceptable, non-broken Flexbox or CSS Grid layout fallbacks for legacy browsers.

---

## Workflow

### 1. Establish the Parent Grid Tracks
Define explicit or auto-repeating row or column tracks on the primary grid container. For cross-card row alignment, set `grid-template-rows: repeat(N, auto)` or rely on auto-generated row tracks that subgrid items can span across.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  /* Allocate explicit row tracks per card row if card internal section count is fixed */
  grid-template-rows: repeat(4, auto);
  gap: 1.5rem;
}
```

### 2. Define Child Container Track Spans
Assign each nested child container (e.g., `.card` or `.form-group`) to span the exact number of parent tracks needed for its child elements.

```css
.card {
  display: grid;
  /* Span 4 parent row tracks: Badge/Header, Body Text, Price/Metadata, Action Button */
  grid-row: span 4;
  grid-template-rows: subgrid;
  /* Subgrid inherits parent gap by default, or can override gap */
  gap: 0.75rem;
}
```

### 3. Bind Nested Elements to Inherited Tracks
Place internal child elements inside the subgrid container. By default, direct children flow sequentially into the inherited subgrid tracks, or can be placed explicitly with `grid-row`.

```css
.card-header { grid-row: 1; }
.card-body   { grid-row: 2; }
.card-meta   { grid-row: 3; }
.card-footer { grid-row: 4; }
```

### 4. Manage Gaps and Padding Optics
Be aware that subgrid child containers inherit the parent's `gap`. If padding is added to `.card`, the padding boundary extends outside the track lines unless managed carefully with `box-sizing` or explicit margin adjustments.

```css
.card {
  background-color: var(--color-surface);
  border-radius: 0.5rem;
  padding: 1.25rem;
  /* Adjust subgrid gap if tighter internal spacing is required */
  row-gap: 0.5rem;
}
```

### 5. Implement Progressive Enhancement Fallbacks
Wrap subgrid-specific rules inside `@supports (grid-template-rows: subgrid)` or `@supports (grid-template-columns: subgrid)`. Provide a Flexbox fallback for unsupported browsers so cards render cleanly even if horizontal section synchronization is unavailable.

```css
/* Fallback for legacy browsers */
.card {
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1 1 auto; /* Push footer down in fallback mode */
}

/* Progressive enhancement with CSS Subgrid */
@supports (grid-template-rows: subgrid) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-template-rows: repeat(4, auto);
  }

  .card {
    display: grid;
    grid-row: span 4;
    grid-template-rows: subgrid;
  }
}
```

---

## Decision Rules

| Layout Problem | Recommended Subgrid Strategy | Syntax Pattern |
| :--- | :--- | :--- |
| **Multi-Card Horizontal Alignment** | Row Subgrid across card rows | Parent: `grid-template-rows: repeat(N, auto)`<br>Child: `grid-row: span N; grid-template-rows: subgrid;` |
| **Form Label & Input Alignment** | Column Subgrid across form rows | Parent: `grid-template-columns: max-content 1fr min-content`<br>Row: `grid-column: 1 / -1; grid-template-columns: subgrid;` |
| **Nested 12-Column Layout Extension** | Column Subgrid inside nested sections | Child: `grid-column: span 6; grid-template-columns: subgrid;` |
| **Bi-Directional Subgrid Alignment** | Dual-axis Subgrid | Child: `grid-template-columns: subgrid; grid-template-rows: subgrid;` |

---

## Constraints

- **Track Span Requirement:** A subgrid container *must* explicitly span two or more tracks in the parent grid (`grid-row: span N` or `grid-column: X / Y`). If a child only spans 1 track, subgrid has no additional tracks to inherit along that axis.
- **Browser Support:** Native CSS Subgrid is supported in all major evergreen browsers (Firefox 71+, Safari 16.0+, Chrome 117+, Edge 117+). Progressive enhancement (`@supports`) must be provided for older clients.
- **Named Line Scoping:** Named grid lines defined in the parent grid are inherited by the subgrid, but local named lines defined within the subgrid take precedence within the subgrid context.
- **Fragmented Track Allocation:** When auto-placement is used on a parent grid with subgrid items, parent auto-rows must be sized to accommodate subgrid track spans without collapsing.

---

## Non-Goals

- Replacing standard 1D flexbox alignment where cross-card track synchronization is unnecessary.
- Dynamically altering HTML structure via JavaScript to force grid placement.
- Replacing semantic HTML table tags for tabular datasets.

---

## Common Failure Patterns

- **Missing `span N` on Subgrid Container:** Defining `grid-template-rows: subgrid` on a child without specifying `grid-row: span 4`, causing the child to collapse into a single track where subgrid cannot function.
- **Parent Auto-Row Collapsing:** Failing to set explicit auto-row sizes or track definitions on the parent grid, leading to zero-height subgrid tracks.
- **Forgetting `@supports` Fallback:** Relying exclusively on `subgrid` syntax without providing a Flexbox fallback, causing broken card layouts in legacy browser engines.
- **Subgrid Gap Inheritance Shift:** Expecting subgrid containers to ignore parent gap settings. Subgrid inherits parent gap values unless explicitly overridden (`row-gap: 0.5rem`).
- **DOM Reordering Accessibility Mismatch:** Arbitrarily placing subgrid child elements using `grid-row: 4` or `grid-row: 1` in ways that contradict the logical reading and focus order (`DOM order`) for screen readers and keyboard users.

---

## Validation Steps

### 1. Visual Alignment Inspection
- Open the application in a browser and inspect a multi-card grid with varying headline and body lengths.
- Open Chrome or Firefox DevTools -> **Grid Overlay Inspector**.
- Enable grid lines on both parent container and subgrid elements.
- Verify that headlines, badges, body paragraphs, price tags, and footers line up perfectly on the exact same horizontal grid line across all cards in a row.

### 2. Browser Compatibility Testing
- Test in Chromium 117+, Safari 16+, and Firefox.
- Simulate an unsupported engine or disable subgrid support to verify that the `@supports` Flexbox fallback renders a clean, readable layout without overlapping text or broken boundaries.

### 3. Keyboard & Screen Reader Reading Order Audit
- Navigate through the subgrid component using `Tab` key.
- Verify focus moves logically through the DOM sequence without jumping across visual card rows out of order.
