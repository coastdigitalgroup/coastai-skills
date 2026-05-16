# Container Queries Technical Reference

## Container Types

| Property Value | Description | Use Case |
| :--- | :--- | :--- |
| `inline-size` | Queries based on the **width** of the container. | Most common; used for layout shifts and typography. |
| `size` | Queries based on **width AND height**. | Rare; used for components that need to respond to their vertical space. |
| `normal` | The element is not a query container, but remains a container for container-relative units. | Default state. |

## Container-Relative Units

These units represent a percentage of the query container's dimensions.

| Unit | Description | Comparison |
| :--- | :--- | :--- |
| `cqw` | 1% of the query container's **width**. | Like `vw` but local. |
| `cqh` | 1% of the query container's **height**. | Like `vh` but local. |
| `cqi` | 1% of the query container's **inline size** (width in horizontal mode). | Logical version of `cqw`. |
| `cqb` | 1% of the query container's **block size** (height in horizontal mode). | Logical version of `cqh`. |
| `cqmin` | The smaller value of `cqi` or `cqb`. | Like `vmin` but local. |
| `cqmax` | The larger value of `cqi` or `cqb`. | Like `vmax` but local. |

## Browser Support (Baseline 2023)

Container queries are part of the "Interop 2023" focus and are widely supported in modern browsers:

- **Chrome:** 105+ (Aug 2022)
- **Safari:** 16+ (Sep 2022)
- **Firefox:** 110+ (Feb 2023)
- **Edge:** 105+ (Aug 2022)

### Polyfill Strategy
For projects requiring support for older browsers, the Google Chrome Labs **Container Query Polyfill** is the industry standard. It uses `ResizeObserver` to mimic container query behavior in non-supporting browsers.

## Key Syntax Rules

### The "Self-Query" Limitation
An element **cannot** query itself.
```css
/* This DOES NOT work */
.my-card {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .my-card { background: red; }
}
```
You must always have a wrapper:
```html
<div class="card-wrapper">
  <div class="my-card">...</div>
</div>
```

### Logical Queries
You can combine queries using `and`, `or`, and `not`:
```css
@container (min-width: 400px) and (max-width: 800px) { ... }
```

### Naming and Specificity
Explicitly naming containers avoids "leaky" styles in nested architectures:
```css
.sidebar { container: sidebar-area / inline-size; }
@container sidebar-area (width > 200px) { ... }
```
