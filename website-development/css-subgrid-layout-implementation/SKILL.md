---
name: css-subgrid-layout-implementation
description:
  Implement CSS Subgrid (grid-template-rows: subgrid / grid-template-columns: subgrid) to align nested component elements—such as card headers, body text, footers, form labels, and pricing tiers—across parent grid tracks without DOM flattening or JavaScript layout listeners.
---

# CSS Subgrid Layout Implementation

## Purpose

The CSS Subgrid Layout Implementation skill provides a technical protocol, CSS architecture, alignment patterns, and fallback strategies for aligning nested component elements directly to a parent container's CSS Grid tracks.

Before CSS Subgrid, nested components inside a CSS Grid container (such as cards with variable title lengths, action footers, pricing feature rows, or form field labels) maintained independent internal layouts (typically Flexbox or nested Grid). When content length varied across cards in the same row, child elements like buttons, badges, or subtitles misaligned horizontally across adjacent cards unless developers enforced hardcoded minimum heights, flattened semantic HTML markup, or added JavaScript `ResizeObserver` layout height equalizers.

CSS Subgrid solves this by allowing nested child elements to opt into their parent grid's track definitions using `grid-template-rows: subgrid` or `grid-template-columns: subgrid`. This aligns internal component segments perfectly across independent cards or rows on the compositor thread without breaking semantic DOM nesting or triggering layout thrashing.

---

## Use Cases

- **Multi-Card Grid Alignment:** Synchronizing internal elements (badge tag, headline, variable body copy, author metadata, action button footer) across cards in a grid so that every card's footer aligns perfectly at the bottom across all cards in a row.
- **Pricing Comparison Tables & Matrix Cards:** Aligning feature bullet rows, plan tier titles, pricing values, and signup CTAs across multi-column pricing cards without hardcoded row heights.
- **Form Fieldsets & Multi-Column Forms:** Aligning form field labels, input controls, help text, and validation error messages across adjacent input columns without wrapping each row in unnecessary extra `<div>` containers.
- **Bento Grids & Dashboard Tile Components:** Aligning multi-span dashboard widgets to master column and row layout lines while preserving component encapsulation.
- **Media Object Lists & Timeline Views:** Aligning avatar icons, timestamp headers, body text, and comment action buttons across multi-line comment threads or feeds.

---

## When NOT to Use

- **Independent Components Without Row/Column Alignment Needs:** Standard card grids where content length is predictable or cards do not need cross-card row synchronization (standard CSS Flexbox or standard CSS Grid is sufficient).
- **1D Single-Direction Layouts:** Simple stacked lists or single-row flex rows where internal children do not need to share track boundaries with sibling containers.
- **Legacy Browser Support Environments Without Fallbacks:** Production targets requiring strict rendering compatibility for legacy browsers (e.g., Internet Explorer or Chrome < 117 / Safari < 16 / Firefox < 71) where progressive enhancement fallbacks are prohibited by design constraints.
- **Dynamic Variable-Count Nested Grids:** Situations where nested subgrid items dynamically introduce unpredictable row counts that exceed the parent grid's explicit row span allocation without auto-row handling.

---

## Inputs

1. **Parent Grid Container Definition:** Master grid container specifying column tracks (`grid-template-columns`), explicit row track patterns (`grid-template-rows`), and grid gaps (`gap` / `row-gap` / `column-gap`).
2. **Child Component Markup:** Semantic HTML elements containing nested child nodes (e.g., `<article class="card">` containing `header`, `p`, `footer`).
3. **Subgrid Axis Selection:** Identification of track axis to inherit: row axis (`grid-template-rows: subgrid`), column axis (`grid-template-columns: subgrid`), or both axes.
4. **Parent Span Allocation:** Explicit row or column span assigned to the subgrid element (e.g., `grid-row: span 4` or `grid-column: 1 / -1`).
5. **Fallback Strategy:** Baseline CSS layout rules (using Flexbox or standard Grid) served via `@supports not (grid-template-rows: subgrid)` for non-supporting legacy environments.

---

## Outputs

1. **Parent Grid Track Allocation:** Declarative master grid container with explicit row and column track sizing (e.g., `grid-template-rows: repeat(auto-fill, minmax(...))`).
2. **Subgrid Component Ruleset:** Nested component rules configuring `grid-row: span N` (or `grid-column: span N`) and `display: grid; grid-template-rows: subgrid`.
3. **Subgrid Child Placement:** Declarative placement of internal child nodes across inherited subgrid tracks (`grid-row: 1`, `grid-row: 2`, etc.).
4. **Subgrid Gap & Padding Overrides:** Customized subgrid gap rules (`gap: 0` or custom spacing) and margin/padding adjustments to prevent double-gap accumulation.
5. **Progressive Enhancement Layer:** Clean `@supports (grid-template-rows: subgrid)` enhancement block providing fallback behavior for un-supporting user agents.

---

## Workflow

### 1. Establish Parent Grid Track Structure

Define the master grid container with explicit track definitions for both columns and rows. When using subgrid for row alignment, define how rows repeat per card or item.

```css
/* Master Grid Container */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  /* Define explicit row tracks for card sub-sections:
     Row 1: Category Badge / Tag (auto)
     Row 2: Card Title (auto-sized to fit longest title in row)
     Row 3: Body Copy (1fr - absorbs remaining height)
     Row 4: Card Footer / CTA (auto) */
  grid-template-rows: repeat(auto-fill, auto auto 1fr auto);
  gap: 1.5rem;
}
```

---

### 2. Spanning Subgrid Elements Across Parent Tracks

Assign the child component (`.card`) to span the exact number of parent tracks corresponding to its internal child elements.

```css
/* Component Container acting as Subgrid */
.card {
  /* Span exactly 4 row tracks from the parent grid */
  grid-row: span 4;

  /* Enable grid layout on child container */
  display: grid;

  /* Inherit row track definitions from parent grid */
  grid-template-rows: subgrid;
}
```

---

### 3. Place Internal Subgrid Children Into Inherited Tracks

Assign internal component children to their respective inherited subgrid tracks. Line numbers inside a subgrid start at 1 relative to the subgrid container itself.

```html
<div class="card-grid">
  <article class="card">
    <span class="card-tag">Engineering</span>
    <h3 class="card-title">Building Resilient Systems with Modern CSS Subgrid</h3>
    <p class="card-body">CSS Subgrid allows nested components to participate directly in parent layout tracks without layout thrashing.</p>
    <footer class="card-footer">
      <a href="#" class="btn">Read Article</a>
    </footer>
  </article>

  <article class="card">
    <span class="card-tag">Design</span>
    <h3 class="card-title">Short Title</h3>
    <p class="card-body">A shorter card body example.</p>
    <footer class="card-footer">
      <a href="#" class="btn">Read Article</a>
    </footer>
  </article>
</div>
```

```css
/* Internal Card Children automatically adopt subgrid track lines 1 through 4 */
.card-tag {
  grid-row: 1;
}

.card-title {
  grid-row: 2;
  margin: 0;
}

.card-body {
  grid-row: 3;
  margin: 0;
}

.card-footer {
  grid-row: 4;
}
```

---

### 4. Manage Subgrid Gaps and Padding

By default, a subgrid inherits its parent container's `gap` settings. If the subgrid component has internal padding or requires custom child spacing, override `gap` on the subgrid or account for subgrid gap behavior.

```css
.card {
  grid-row: span 4;
  display: grid;
  grid-template-rows: subgrid;

  /* Override inherited gap if internal component spacing should differ from card-to-card gap */
  row-gap: 0.75rem;

  /* Optional internal card padding */
  padding: 1.25rem;
  background: var(--surface-color, #ffffff);
  border-radius: 8px;
}
```

---

### 5. Column-Axis Subgrid Implementation

Subgrid works on columns as well as rows. Use `grid-template-columns: subgrid` for multi-column form fieldsets or pricing matrix columns where label columns and input columns need synchronized alignment across fieldsets.

```css
/* Form Layout with Synchronized Label and Input Columns */
.form-grid {
  display: grid;
  grid-template-columns: minmax(120px, max-content) 1fr;
  gap: 1rem 1.5rem;
}

.form-fieldset {
  /* Span both parent grid columns */
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
}

.form-label {
  grid-column: 1;
}

.form-input {
  grid-column: 2;
}
```

---

### 6. Add Progressive Enhancement Fallbacks

Ensure browsers that do not support CSS Subgrid degrade gracefully to a functional Flexbox or standard Grid layout using `@supports`.

```css
/* 1. Baseline Fallback for Non-Subgrid Browsers */
.card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
}

.card-body {
  /* Flex grow pushes footer to bottom in fallback */
  flex-grow: 1;
}

/* 2. Enhanced Subgrid Implementation */
@supports (grid-template-rows: subgrid) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* Explicit 4-row track structure for subgrid alignment */
    grid-template-rows: repeat(auto-fill, auto auto 1fr auto);
  }

  .card {
    grid-row: span 4;
    display: grid;
    grid-template-rows: subgrid;
    row-gap: 0.75rem;
  }

  .card-body {
    flex-grow: auto;
  }
}
```

---

## Decision Rules

### Subgrid vs. Alternative Alignment Techniques

| Layout Requirement | Recommended Approach | Why |
| :--- | :--- | :--- |
| Align nested card segments (headers, body, footers) across adjacent cards in a row | **CSS Subgrid (`grid-template-rows: subgrid`)** | Native, non-destructive, zero JS, operates on compositor thread, respects variable content height. |
| Multi-column form fieldsets requiring uniform label column width without wrapper `<div>`s | **CSS Subgrid (`grid-template-columns: subgrid`)** | Eliminates table markup hacks while keeping labels perfectly aligned across independent fieldsets. |
| Independent cards where footers only need to stick to card bottom without aligning to adjacent cards | **CSS Flexbox (`display: flex; flex-direction: column;`)** | Simpler declaration (`margin-top: auto` or `flex-grow: 1` on body) without requiring explicit track spans. |
| Component layout dependent on individual component width, independent of parent grid | **CSS Container Queries (`@container`)** | Responsive styling scoped to component width rather than grid track lines. |
| Legacy browser target with zero polyfill capability and strict visual pixel-parity requirement | **Standard CSS Grid with fixed heights or Flexbox baseline** | Ensures identical cross-browser fallback when subgrid cannot be selectively enhanced. |

---

## Constraints

- **Span Declaration Mandatory:** A subgrid element MUST specify an explicit line span (`grid-row: span N` or `grid-column: span N`) or explicit line boundaries matching the number of tracks it occupies in the parent grid. If `span N` is omitted, the subgrid defaults to spanning 1 track, collapsing nested children.
- **Line Indexing Localized:** Line numbers inside a subgrid (`grid-row: 1`, `grid-row: 2`) are relative to the subgrid container, NOT the parent grid's global line numbers.
- **Parent Track Availability:** The parent grid must provide enough explicit tracks for the subgrid's items. In dynamic auto-generated rows, ensure parent grid track definitions (`grid-template-rows`) accommodate the subgrid span pattern.
- **Gap Inheritance & Accumulation:** Subgrids inherit the parent grid's `gap` properties unless explicitly overridden (`gap: 0` or custom length). Padding on a subgrid element adds to gaps, which can cause unexpected layout offsets if uncalculated.
- **Accessibility & Tab Order Integrity:** Using subgrid for visual alignment MUST NOT violate logical DOM order or keyboard focus navigation sequences (WCAG 2.4.3). Never use subgrid grid line placement to visually shuffle interactive elements out of their source DOM tab order.

---

## Non-Goals

- Replacing general CSS Grid fundamentals (covered in `css-grid-layout-implementation`).
- Implementing JavaScript-based layout listeners or DOM element height calculation scripts (`ResizeObserver` equalizers).
- Managing overall page shell layouts or global site headers/footers.
- Polyfilling CSS Subgrid through heavy runtime JavaScript DOM manipulations.

---

## Common Failure Patterns

- **Omission of `grid-row: span N`:** Defining `grid-template-rows: subgrid` on a child element without specifying `grid-row: span 4` (or equivalent). Result: The child element spans only 1 parent track, squishing all internal subgrid children into a single track.
- **Parent Track Definition Mismatch:** Defining `grid-row: span 4` on subgrid children when the parent container lacks explicit track patterns or auto-row definitions matching 4 tracks. Result: Subgrid items spill into implicitly created 0-height tracks or misalign across rows.
- **Double Gap Offset Bug:** Adding internal `padding` to a subgrid container while retaining inherited parent `gap` settings without adjusting margins, leading to uneven vertical spacing between subgrid rows.
- **Broken Keyboard Focus Flow:** Re-ordering interactive buttons or links across subgrid rows using `grid-row: N` line numbers in a way that diverges from natural DOM source order, causing screen reader and keyboard focus jumpiness.
- **Implicit Subgrid Overflows:** Inserting 5 child elements into a subgrid declared with `grid-row: span 4`. Result: The 5th element falls into an implicit track outside the subgrid's inherited track allocation.

---

## Validation Steps

- [ ] **Cross-Card Alignment Check:** Verify in browser DevTools that card headers, titles, bodies, and footers align on identical horizontal layout lines across all cards in the same row regardless of title or body text length variations.
- [ ] **Subgrid DevTools Overlay Audit:** Enable CSS Grid Inspector in Chrome/Firefox/Safari DevTools. Confirm that subgrid track lines overlay and lock directly onto parent grid track lines.
- [ ] **Responsive Breakpoint Test:** Resize viewport across mobile, tablet, and desktop breakpoints. Confirm that when cards stack into a single column on mobile (`grid-template-columns: 1fr`), subgrid rows collapse cleanly or revert gracefully without unexpected whitespace.
- [ ] **Subgrid Support Fallback Audit:** Disable CSS Subgrid support in browser flags or test in an un-supporting browser environment. Confirm that `@supports not (grid-template-rows: subgrid)` fallback styles maintain a clean, usable Flexbox/Grid layout.
- [ ] **DOM & Keyboard Navigation Sequence Test:** Tab through all interactive controls (links, buttons, form inputs) inside subgrid components using the `Tab` key. Verify that focus movement strictly follows visual top-to-bottom, left-to-right reading order.
