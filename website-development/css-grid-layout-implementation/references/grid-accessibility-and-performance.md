# CSS Grid: Accessibility and Performance Reference

## Accessibility: The "Visual vs. Source" Gap

One of the most powerful features of CSS Grid is the ability to move items around regardless of their position in the HTML source. However, this power comes with significant accessibility risks.

### The Rule of Thumb
**The visual order should match the tab order.**

Screen readers and keyboard users navigate the page based on the DOM (Document Object Model) order. If you use `order` or explicit `grid-column` / `grid-row` placement to move a footer to the top of the page, a screen reader will still read it last, and a keyboard user will still tab to it last.

### Pitfalls to Avoid
1. **The "Submit" Button Swap:** Placing a form's submit button at the top of the grid visually while keeping it at the bottom of the DOM.
2. **Reversed Columns:** Using `grid-auto-flow: dense` or explicit placement to reverse the reading order of articles.
3. **Logical Focus:** Ensure that as a user tabs through the grid, the focus "jumps" make sense spatially.

---

## Performance: Layout Calculations

While CSS Grid is highly optimized in modern browsers, complex grid definitions can still impact performance, particularly on low-powered devices.

### Track Count
Avoid "Explicit Overload." Defining a grid with hundreds of small tracks (e.g., `repeat(100, 1fr)`) forces the browser to perform significantly more calculations than a simpler 12-column grid.

### Intrinsic Sizing Costs
Properties like `grid-template-columns: repeat(auto-fit, minmax(max-content, 1fr))` require the browser to measure every single item in the grid before it can determine the track sizes. This can lead to "Layout Thrashing" if the content changes frequently.

### The `min-width: 0` Gotcha
By default, grid items have `min-width: auto` (which resolves to `min-content`). If an item contains a very long word or a large image, it will refuse to shrink, causing the entire grid track to expand and potentially break the layout. Always use `min-width: 0` (or `min-height: 0` for rows) on grid items that might contain overflowing content.

---

## Subgrid: The Holy Grail of Alignment

`subgrid` allows a nested grid container to inherit the tracks defined on its parent.

### Why it matters
Before subgrid, cards in a grid could not easily align their internal headers and footers with each other unless you used fixed heights. With subgrid, the card's internal rows can "latch onto" the parent's row definitions.

### Support Note
As of late 2023, `subgrid` is supported in all major evergreen browsers (Chrome, Firefox, Safari, Edge). For older browsers, use a "Progressive Enhancement" approach:
1. Define a standard grid for all browsers.
2. Wrap the `subgrid` properties in an `@supports (grid-template-columns: subgrid)` block.

---

## Browser Rendering Behavior

- **Stacking Contexts:** Grid items (like Flex items) can create stacking contexts when `z-index` is applied, even without `position: relative`.
- **Gaps vs. Margins:** `gap` is generally preferred over `margin` because it only applies *between* items, avoiding the need for `last-child` overrides.
- **Percentage Units:** Be careful with `%` in grid tracks; unlike `fr`, percentages do not account for the `gap` size, which can lead to overflow.
