---
name: container-queries-implementation
description:
  Implement and debug layout-aware components that respond to their container's
  dimensions rather than the viewport size.
---

# Container Queries Implementation

## Purpose

The Container Queries Implementation skill provides a technical framework for building truly modular and portable components. By allowing elements to style themselves based on the size of their parent container (rather than the global viewport), developers can create components that work seamlessly across different layout contexts—such as sidebars, main content areas, and multi-column grids—without writing fragile, context-specific CSS overrides.

## Use Cases

- Building a "Card" component that switches from vertical to horizontal layout when placed in a wide container, regardless of the device size.
- Designing complex UI widgets (like calendars or data visualizations) that need to adapt their internal density based on the space allocated to them.
- Creating "layout-agnostic" design systems where components are guaranteed to look correct in any slot.
- Replacing complex, viewport-based media query hacks that break when a component is moved into a narrow sidebar on a large screen.

## When NOT to Use

- **Global Layout Changes:** For changes that affect the entire page structure (e.g., hiding a sidebar), standard `@media` queries remain the correct tool.
- **Legacy Browser Support:** If the project requires support for browsers older than 2022 (e.g., Safari < 16, Chrome < 105) without a robust polyfill strategy.
- **Simple Fluidity:** If standard Flexbox/Grid "wrapping" or percentage widths achieve the desired result, container queries might add unnecessary complexity.

## Inputs

1. **Target Component:** The UI element that needs to adapt its layout.
2. **Container Context:** The parent element that will define the queryable bounds.
3. **Breakpoints (Container-Relative):** The widths at which the component's internal styles should change.
4. **Layout Requirements:** How the component should transform (e.g., typography scaling, grid layout shifts).

## Outputs

1. **Container Definition:** CSS establishing the `container-type` on a parent element.
2. **Container Queries:** `@container` rules that apply styles based on the parent's dimensions.
3. **Container Units:** Use of `cqw`, `cqh`, `cqi`, etc., for responsive internal sizing.
4. **Fallback Strategy:** Ensuring the component remains functional in non-supporting browsers.

## Workflow

### 1. Identify and Define the Container

Choose the parent element that should act as the boundary for the component. Apply `container-type: inline-size` to allow queries based on the width.

```css
.card-wrapper {
  container-type: inline-size;
  /* Optional: Name the container to avoid conflicts in nested scenarios */
  container-name: card-container;
}
```

### 2. Determine Local Breakpoints

Instead of thinking "on mobile, do X," think "when I have less than 400px of space, do X." Define logical thresholds for the component's layout shifts.

### 3. Write Container Queries

Use the `@container` rule to apply styles. If you named your container in step 1, reference it.

```css
@container (min-width: 450px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### 4. Apply Container-Relative Units

Use units like `cqw` (1% of container width) for internal spacing or typography to create perfectly proportional scaling.

```css
.card-title {
  font-size: clamp(1rem, 5cqw, 2rem);
}
```

### 5. Handle Nested Containers

If components are nested, use `container-name` to ensure a child query targets the specific parent intended rather than the closest ancestor container.

### 6. Implement Fallbacks

Provide a sensible default style (usually the mobile/narrow view) that works if the browser doesn't support container queries.

## Decision Rules

- **inline-size vs. size:** Use `inline-size` (width) for 95% of use cases. Only use `size` (width + height) if you need to query the container's height, which requires the container to have a fixed height or a defined aspect ratio to avoid infinite loops.
- **Naming Containers:** Always name your containers (`container-name`) if you are building a component library or dealing with nested components to prevent unexpected query targeting.
- **Units selection:** Use `cqi` (container inline size) instead of `cqw` if you want to be future-proof for vertical writing modes.

## Constraints

- **No Self-Querying:** An element cannot query its own size. It must query an ancestor that has been defined as a container.
- **Layout Loops:** Avoid styles inside a container query that change the size of the container itself, as this can lead to layout thrashing or "infinite loops" where the browser stops rendering the query.
- **Containment Overhead:** Browsers must perform extra layout calculations for containers; avoid marking every single `div` on a page as a container.

## Non-Goals

- Replacing all media queries (viewport-level layout is still relevant).
- Handling JavaScript-based resize observers (this is a CSS-native skill).
- Creating complex 3D or animation logic (unless triggered by size changes).

## Common Failure Patterns

- **Querying a Non-Container:** Writing `@container` but forgetting to set `container-type` on any ancestor.
- **Infinite Layout Loops:** Changing the container's width from *inside* a query that triggers on that width.
- **Missing Container Name:** In complex apps, a component mistakenly queries a distant global container instead of its immediate wrapper because names weren't used.
- **Fixed Units in Fluid Containers:** Using fixed `px` values inside a container query when `cqw` would provide a smoother transition.

## Validation Steps

- [ ] **Context Swap Test:** Place the component in a wide main area and a narrow sidebar on the same screen. Verify they both render correctly for their specific width.
- [ ] **Resize Test:** Use DevTools to resize the *parent container* (not the whole window) and observe the layout shift.
- [ ] **No-JS Test:** Verify the component's layout works without JavaScript, as container queries are native CSS.
- [ ] **Fallback Check:** Verify the component is readable/functional in a browser that doesn't support container queries (e.g., by temporarily commenting out the `container-type` line).
