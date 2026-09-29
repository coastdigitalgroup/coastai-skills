# CSS Subgrid Heuristics & Browser Rendering Reference

This reference document outlines the technical mechanics, rendering engine heuristics, line numbering rules, gap inheritance logic, and cross-browser support baseline for CSS Subgrid (`grid-template-rows: subgrid` and `grid-template-columns: subgrid`).

---

## 1. Browser Support Baseline

As of late 2023 / early 2024, CSS Subgrid is supported across all major evergreen browser rendering engines:

| Browser Engine | First Native Version | Support Baseline |
| :--- | :--- | :--- |
| **Mozilla Firefox (Gecko)** | Firefox 71 (Dec 2019) | Full Support |
| **Apple Safari (WebKit)** | Safari 16.0 (Sep 2022) | Full Support |
| **Google Chrome (Blink)** | Chrome 117 (Sep 2023) | Full Support |
| **Microsoft Edge (Blink)** | Edge 117 (Sep 2023) | Full Support |

### Progressive Enhancement Detection

To detect native Subgrid support, use the standard CSS `@supports` feature query:

```css
@supports (grid-template-rows: subgrid) {
  /* Subgrid rules */
}

@supports (grid-template-columns: subgrid) {
  /* Column Subgrid rules */
}
```

---

## 2. Subgrid Line Numbering Mechanics

One of the key technical details of CSS Subgrid is how line numbering operates relative to the parent grid vs. the subgrid container.

### Local Line Indexing Rules

1. **Subgrid Lines Reset to Line 1:** Inside a subgrid element, grid line indexing starts at `1` relative to the subgrid container's start edge.
2. **Span Mapping:** If a subgrid spans parent rows 3 through 7 (a span of 4 tracks), the subgrid's internal lines are numbered `1, 2, 3, 4, 5`.
3. **Negative Indexing Supported:** Negative line numbers (`-1`, `-2`) work relative to the subgrid's own spanned track boundaries, where `-1` represents the trailing edge of the subgrid span.

```
Parent Grid Tracks: [1]-----[2]-----[3]-----[4]-----[5]-----[6]
                                      |       |       |       |
Subgrid Spanning Tracks 3-6:         [1]-----[2]-----[3]-----[4]
Subgrid Negative Lines:              [-4]    [-3]    [-2]    [-1]
```

### Named Grid Lines Inheritance

- If the parent grid defines named grid lines (e.g., `grid-template-rows: [header-start] auto [header-end body-start] 1fr [body-end]`), those line names pass through to the subgrid.
- Subgrid elements can also append local named grid lines using the subgrid syntax:
  ```css
  grid-template-rows: subgrid [local-card-top] [local-card-title] [local-card-body] [local-card-bottom];
  ```

---

## 3. Gap Inheritance & Overriding Rules

### Default Inherited Behavior
By default, a subgrid inherits its parent grid container's `gap`, `row-gap`, and `column-gap` properties for the tracks it adopts.

### Overriding Subgrid Gaps
A subgrid element can explicitly declare its own `gap` rules without affecting sibling tracks in the parent grid:

```css
.subgrid-card {
  display: grid;
  grid-template-rows: subgrid;

  /* Overrides inherited parent row gap specifically for this subgrid */
  row-gap: 0.5rem;
}
```

### Padding Accumulation Gotcha
Adding `padding` to a subgrid container pushes child elements inward from the parent track boundaries. When combined with inherited `gap` values, this can lead to larger-than-expected visual gutters between adjacent subgrid tracks. Always audit subgrid padding alongside row/column gap settings.

---

## 4. Subgrid Performance Heuristics

1. **Compositor Engine Threading:** CSS Subgrid layout calculations occur natively within the browser rendering engine's layout phase. Unlike JavaScript height-matching scripts (`ResizeObserver`), Subgrid avoids DOM mutation, main-thread blocking, and layout thrashing.
2. **Reflow Containment:** When content changes size inside a subgrid track (e.g., dynamic text insertion), the parent grid recalculates track dimensions for that row/column. All participating subgrids in the same row/column adjust layout atomically in a single browser paint pass.
