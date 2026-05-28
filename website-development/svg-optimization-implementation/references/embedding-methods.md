# Technical Reference: SVG Embedding Methods

Choosing the right way to embed SVGs is a balance between performance (caching), styling flexibility, and HTTP requests.

| Method | Styling | JS Control | Caching | HTTP Requests | Best For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Inline `<svg>`** | Full (internal CSS) | Full | None | 0 | Unique, highly dynamic graphics. |
| **External `<use>`** | Limited (inherited) | Limited | Excellent | 1 per sheet | Standard UI icons. |
| **`<img>` Tag** | None | None | Excellent | 1 per file | Static, decorative illustrations. |
| **`background-image`**| None | None | Excellent | 1 per file | Repeating patterns, decorative icons. |
| **`<iframe>` / `<object>`** | Full | Partial | Excellent | 1 per file | Isolated, complex interactive graphics. |

## Styling Limitations of External Sprites

When using the `<use>` tag with an external file (`icons.svg#id`), the SVG is rendered inside a **Shadow DOM**.

### What you CAN do:
- Change inherited properties like `fill`, `stroke`, `stroke-width` on the `<svg>` or `<use>` tag in your main CSS.
- Use `currentColor` inside the sprite to inherit the text color of the parent.

### What you CANNOT do:
- Select internal paths of the SVG from your main stylesheet (e.g., `.my-btn:hover use .path-1 { fill: red; }` will NOT work).
- Use CSS transitions/animations on internal paths from the external stylesheet.

## Performance Heuristics

1. **The 1KB Rule:** If an icon is under 1KB and used frequently, inlining it or using an internal sprite sheet is often faster than an extra network request.
2. **The "Above the Fold" Rule:** Inline critical icons (like the logo or primary navigation) to ensure they render immediately without waiting for a sprite sheet to download.
3. **HTTP/2 Efficiency:** With HTTP/2, loading a single large sprite sheet is generally more efficient than many small individual SVG files, as it reduces the overhead of multiple requests while still benefiting from caching.

## Accessibility Requirements (WCAG 2.2)

- **Contrast:** Icons used as UI controls must have a 3:1 contrast ratio (SC 1.4.11).
- **Name/Role/Value:** Standalone icons must have an accessible name (usually via `aria-label` on the parent button or `<title>` within the SVG linked by `aria-labelledby`).
- **Focus:** SVGs in Internet Explorer 11 are focusable by default. Always add `focusable="false"` to decorative SVGs to prevent them from "stealing" focus from their parents.
