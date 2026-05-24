# Print CSS Reference Guide

This reference covers key CSS properties and browser behaviors specifically relevant to print stylesheets.

## Page Break Properties

Controlling where content splits across physical pages is critical for professional-looking documents.

| Property | Value | Description |
| :--- | :--- | :--- |
| `break-inside` | `auto`, `avoid` | Prevents an element (like a table or image) from being split across two pages. |
| `break-before` | `auto`, `always`, `page` | Forces a page break *before* the element (e.g., start a new chapter). |
| `break-after` | `auto`, `always`, `page` | Forces a page break *after* the element. |
| `orphans` | `<integer>` | Minimum number of lines of a paragraph that must be left at the bottom of a page. |
| `widows` | `<integer>` | Minimum number of lines of a paragraph that must be left at the top of a page. |

*Note: Older browsers use `page-break-*` properties. For maximum compatibility, include both.*

## The `@page` Rule

The `@page` rule allows you to define dimensions, orientation, and margins for the entire document.

```css
@page {
  size: A4; /* auto, portrait, landscape, or 210mm 297mm */
  margin: 1.5cm;
}

/* Target specific pages */
@page :first {
  margin-top: 5cm; /* Extra space for a cover page */
}

@page :left {
  margin-right: 2cm; /* Gutter for binding */
}

@page :right {
  margin-left: 2cm;
}
```

## Content Manipulation

You can use the `content` property with `attr()` to reveal information hidden behind attributes.

```css
/* Show URL after links */
a::after {
  content: " [" attr(href) "]";
}

/* Show abbreviated text */
abbr::after {
  content: " (" attr(title) ")";
}
```

## Color Adjustments

Browsers often ignore background colors to save ink. You can override this if necessary.

```css
.chart-bar {
  background-color: blue;
  /* Use 'exact' to force background graphics */
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
```

## Units for Print

While `rem` and `em` are great for the web, physical units are often better for print.

- `pt` (Points): 1pt = 1/72 of an inch. Standard for typography.
- `in` (Inches), `cm` (Centimeters), `mm` (Millimeters): Useful for margins and absolute positioning.

## Browser Support & Gotchas

- **Chrome/Edge:** Excellent support for most properties including `@page` and `break-*`.
- **Safari:** Good support, but sometimes requires `-webkit-` prefixes for `color-adjust`.
- **Firefox:** Good support, though `@page` margins can sometimes behave inconsistently with user settings in the print dialog.
- **Overflow:** `overflow: hidden` on a parent element can stop printing entirely on subsequent pages in some browsers. Always check that the main content container is `overflow: visible` for print.
