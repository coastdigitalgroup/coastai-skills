# CSS Subgrid Audit Checklist

Use this audit checklist when implementing, reviewing, or refactoring CSS Subgrid layouts to ensure cross-browser compatibility, layout stability, responsive behavior, and accessibility.

---

## 1. Parent Grid Architecture

- [ ] **Explicit Track Definitions:** Parent grid defines the expected row or column track count (`grid-template-rows: repeat(N, auto)` or explicit track patterns) required by subgrid children.
- [ ] **Track Span Provision:** Parent grid has enough tracks allocated to handle the full `span N` of all subgrid children without unexpected track overflow or line shifts.
- [ ] **Responsive Breakpoints:** Parent grid adjusts track counts or track sizes across responsive media queries (e.g., changing from a multi-column subgrid card layout on desktop to a single-column stack on mobile).

---

## 2. Subgrid Child Container Configuration

- [ ] **Grid Display Declaration:** The subgrid container explicitly sets `display: grid` or `display: inline-grid`.
- [ ] **Explicit Track Span:** The subgrid container explicitly declares its track range along the subgrid axis (e.g., `grid-row: span 4` or `grid-column: 1 / -1`).
- [ ] **Subgrid Value Keyword:** The subgrid container specifies `grid-template-rows: subgrid` or `grid-template-columns: subgrid` (or both for dual-axis subgrids).
- [ ] **Gap Management:** Gap inheritance is verified. If the subgrid needs custom row or column spacing different from the parent, `row-gap` or `column-gap` is explicitly set on the subgrid container.

---

## 3. Nested Element Placement & Optics

- [ ] **Explicit Track Binding:** Direct child elements within the subgrid container are assigned to explicit track positions (`grid-row: 1`, `grid-row: 2`, etc.) or flow sequentially without line collision.
- [ ] **Content Height Resilience:** Subgrid layout handles extreme content variations (e.g., a 10-line card headline vs. a 1-line headline) gracefully without overlapping text or hiding adjacent content.
- [ ] **Padding & Border Containment:** Container padding (`padding: 1rem`) on the subgrid element is accounted for in visual track alignment (`box-sizing: border-box`).

---

## 4. Progressive Enhancement & Fallbacks

- [ ] **Feature Queries (`@supports`):** Subgrid rules are encapsulated inside `@supports (grid-template-rows: subgrid)` or `@supports (grid-template-columns: subgrid)`.
- [ ] **Legacy Engine Fallback:** A functional Flexbox or standard CSS Grid fallback is provided for legacy engines that do not support CSS Subgrid.
- [ ] **No Layout Collapse:** Unsupporting browsers display clean, non-overlapping cards with acceptable flex-based alignment.

---

## 5. Accessibility & Semantic Quality

- [ ] **Semantic Markup Preservation:** HTML elements retain logical grouping tags (`<article>`, `<form>`, `<fieldset>`, `<section>`) rather than flat visual divs.
- [ ] **DOM vs Visual Order:** Subgrid item placement matches the logical DOM reading order. Focus sequence (`Tab` key) flows predictably without jumping across visual card rows out of order.
- [ ] **Screen Reader Reading Flow:** Screen reader virtual cursor traverses card content logically within each article or fieldset context.
