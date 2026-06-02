# Template: Breadcrumb Blueprint

Use this template to define and annotate the breadcrumb system for your project.

## Anatomy Blueprint

| Component | Role | Visual Treatment | Interaction |
| :--- | :--- | :--- | :--- |
| **Root Node** | Functional Home | Icon or "Home" label | Clickable link |
| **Parent Nodes** | Ancestor Levels | Text Label | Clickable link |
| **Separators** | Visual Logic | Symbol (>, /, →) | Non-interactive |
| **Current Node** | Orientation | Bold or Default text | **Non-clickable** |

## Truncation Logic

Apply these rules when the trail exceeds `100%` of the container width:

1. **The "Bookend" Rule:** Always keep the Root Node and the Current Node visible.
2. **Intermediate Collapse:** Collapse the 2nd and 3rd levels into a single `...` dropdown or static indicator.
3. **Responsive Pivot:** Below `600px`, switch to the **Parent Link** pattern.

## Layout Annotation Template

```text
[ Container: Max-width 1200px ]
[ Margin-bottom: --space-m ]

( Home ) [ / ] ( Parent Level ) [ / ] ( Current Page )
  ^              ^                      ^
  Link           Link                   Static Text
  (Color A)      (Color A)              (Color B)
```

## Accessibility Checklist

- [ ] Wrapped in `<nav aria-label="Breadcrumb">`.
- [ ] List markup used (`<ol>` or `<ul>`).
- [ ] Separators hidden from screen readers (`aria-hidden="true"`).
- [ ] Current page marked with `aria-current="page"`.
- [ ] Minimum contrast ratio 4.5:1 for all text.
