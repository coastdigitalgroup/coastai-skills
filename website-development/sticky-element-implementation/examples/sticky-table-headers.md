# Sticky Table Headers

Implementing sticky headers in HTML tables requires specific handling of
borders and layout models to avoid visual glitches.

## Scenario

A data-heavy table where users need to keep track of column headers while
scrolling through hundreds of rows.

## Implementation

### CSS

Sticky positioning works on `<th>` elements within the `<thead>`.

```css
.table-container {
  max-height: 400px;
  overflow: auto;
}

table {
  width: 100%;
  /* CRITICAL: sticky borders fail with collapse */
  border-collapse: separate;
  border-spacing: 0;
}

thead th {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  z-index: 10;
  border-bottom: 2px solid #dee2e6;
}

/* Because border-collapse is separate, we handle borders manually */
th, td {
  border-right: 1px solid #dee2e6;
  padding: 12px;
}

tr td:first-child, tr th:first-child {
  border-left: 1px solid #dee2e6;
}

tbody tr:last-child td {
  border-bottom: 1px solid #dee2e6;
}
```

### HTML

```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Stock Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- Many rows here -->
    </tbody>
  </table>
</div>
```

## Key Considerations

1. **The Border-Collapse Trap:** If `border-collapse: collapse` is used,
   the sticky headers often lose their bottom border or show content through
   the gaps. Using `separate` with `border-spacing: 0` is the robust solution.
2. **Z-Index Management:** The `<thead>` must have a higher `z-index` than the
   `<tbody>` cells to ensure it slides *over* the data rather than under it.
3. **Background Color:** Sticky elements are transparent by default. You must
   apply an opaque background to the `<th>` so the table content isn't visible
   behind the header text.
