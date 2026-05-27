# Alignment and Density Guidelines

## Horizontal Alignment Rules

Proper alignment is the difference between a table that is "read" and a table
that is "scanned."

### Left Alignment (Standard)
- **Used for:** Names, Descriptions, Categories, IDs, and general text.
- **Why:** The eye follows the vertical line at the start of words. Left
  alignment creates a consistent anchor point.

### Right Alignment (Numeric)
- **Used for:** Prices, Quantities, Percentages, and Dates (if using a
  fixed-width format like YYYY-MM-DD).
- **Why:** Aligning numbers on the right ensures that decimal points and
  commas line up vertically. This allows the user to compare magnitudes
  (e.g., $10.00 vs $1,000.00) instantly without reading.

### Center Alignment (Secondary)
- **Used for:** Short badges, status icons, or single-character indicators.
- **Why:** Used sparingly to balance a column that is much wider than its content.
  Avoid using for text or numbers.

---

## Row Density Scale

Density should be chosen based on the primary user task and the device.

| Level    | Row Height | Font Size | Best For...                               |
| -------- | ---------- | --------- | ----------------------------------------- |
| Compact  | 32-40px    | 12-13px   | Power users, data-heavy dashboards, logs. |
| Standard | 48-56px    | 14-16px   | General utility, settings, file lists.    |
| Relaxed  | 64-80px    | 16px+     | Marketing comparison, simple mobile lists.|

---

## Visual Rhythm Patterns

### Zebra-Striping
- **When:** Table has 4+ columns or is extremely wide.
- **Effect:** Helps the eye track across a single row without jumping to the one
  above or below.

### Horizontal Borders
- **When:** Table is narrow or has few columns.
- **Effect:** Provides a cleaner, more minimalist look than zebra-striping.

### Column Dividers (Vertical Borders)
- **When:** Rarely. Only use when data is extremely dense and headers are
  insufficient to separate concepts.
- **Effect:** Can make a table feel "caged" and harder to scan. Use whitespace
  instead of lines whenever possible.
