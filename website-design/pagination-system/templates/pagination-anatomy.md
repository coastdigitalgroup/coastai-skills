# Pagination Anatomy Template

Use this template to define the structural and visual specifications for a
pagination component.

## 1. Structural Blueprint

```text
[CONTAINER: <nav>]
  ├── [BUTTON: Previous] (Icon + Text)
  ├── [LIST: Pages]
  │     ├── [ITEM: First Page (1)]
  │     ├── [ITEM: Ellipsis (...)]
  │     ├── [ITEM: Page (N-1)]
  │     ├── [ITEM: CURRENT PAGE (N)]
  │     ├── [ITEM: Page (N+1)]
  │     ├── [ITEM: Ellipsis (...)]
  │     └── [ITEM: Last Page (Max)]
  └── [BUTTON: Next] (Text + Icon)
```

## 2. Visual State Matrix

| State    | Background | Border         | Text Color | Accessibility Requirement |
| :------- | :--------- | :------------- | :--------- | :------------------------ |
| Default  | Transparent| 1px Solid Gray | Brand Link | `aria-label="Go to page X"`|
| Current  | Brand Prim.| 1px Solid Prim.| White      | `aria-current="page"`     |
| Hover    | Brand Light| 1px Solid Prim.| Brand Dark | --                        |
| Focus    | Brand Light| 2px Solid Ring | Brand Link | Visible 3:1 Contrast Ring |
| Disabled | Gray Light | 1px Solid Gray | Gray Dark  | `aria-disabled="true"`    |

## 3. Spatial Rules (Tokens)

- **Container Padding:** `--space-s` (vertical), `0` (horizontal)
- **Item Min-Width:** `44px`
- **Item Height:** `44px`
- **Gap between Items:** `--space-xs`
- **Border Radius:** `4px` (or brand standard)

## 4. Mobile Configuration

```css
/* Responsive adjustments */
@media (max-width: 600px) {
  .pagination-item--number {
    display: none; /* Hide individual numbers */
  }
  .pagination-status {
    display: block; /* Show "Page X of Y" */
  }
}
```

## 5. Implementation Annotation Example

- **Annotation:** "Pagination bar wraps in a `<nav>` element. The 'Next' button
  shifts to the bottom on very small screens (<360px)."
- **Logic:** "Show 1 page on either side of the current page. Always show first
  and last page."
