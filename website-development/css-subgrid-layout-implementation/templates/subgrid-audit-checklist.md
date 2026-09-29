# CSS Subgrid Implementation Audit Checklist

Use this checklist to evaluate, verify, and debug CSS Subgrid implementations across component cards, form layouts, dashboard grids, and pricing tables.

---

## 1. Structure & Track Span Allocation

- [ ] **Explicit Line Span Configured:** Every subgrid container has an explicit line span declared (e.g., `grid-row: span N` or `grid-column: span N` or explicit grid line boundaries like `grid-column: 1 / -1`).
- [ ] **Track Count Parity:** The span number (`span N`) matches the exact number of subgrid child elements or track slots declared inside the subgrid component.
- [ ] **Parent Grid Explicit Tracks:** The parent grid defines explicit tracks (e.g., `grid-template-rows: repeat(auto-fill, auto auto 1fr auto)`) that accommodate the subgrid's span pattern.
- [ ] **Subgrid Keyword Declaration:** The subgrid component correctly declares `display: grid;` alongside `grid-template-rows: subgrid` (for row axis) or `grid-template-columns: subgrid` (for column axis).

---

## 2. Gap, Padding, & Spacing Management

- [ ] **No Unintended Double Gapting:** Subgrid inherits parent `gap` settings. If internal component padding or custom `row-gap` / `column-gap` is applied, verify that gaps do not create visually awkward double-margin gaps.
- [ ] **Sizing Track Flexibility:** Flexible tracks (`1fr`) are assigned to the primary content wrapper (e.g., card body text) so that extra vertical space is absorbed uniformly across cards in the same row.

---

## 3. Accessibility & DOM Ordering

- [ ] **DOM Source Order Preserved:** Placing elements in subgrid track lines (`grid-row: 1`, `grid-row: 2`) strictly matches the visual and semantic reading order in the DOM source HTML.
- [ ] **Keyboard Tab Sequence Audit:** Pressing `Tab` key through interactive elements (buttons, links, form inputs) inside subgrid cards moves logically top-to-bottom and left-to-right without unexpected focus jumps.
- [ ] **Screen Reader Structure:** Headings (`<h1>`-`<h6>`), lists (`<ul>`/`<ol>`), and fieldsets (`<fieldset>`) retain valid semantic markup regardless of subgrid track assignment.

---

## 4. Cross-Browser & Responsive Degradation

- [ ] **Progressive Enhancement (`@supports`):** Layout includes a functional Flexbox or standard CSS Grid fallback wrapped in `@supports not (grid-template-rows: subgrid)`.
- [ ] **Mobile Breakpoint Behavior:** On small viewport widths where grid columns collapse to a single column (`grid-template-columns: 1fr`), subgrid rows collapse cleanly without orphan gaps or excessive whitespace.
- [ ] **DevTools Grid Line Verification:** Opening Browser DevTools Grid Overlay confirms that subgrid track lines align 1:1 with master parent grid track lines.
