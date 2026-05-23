# Example: Article Print Optimization

This example demonstrates how to transform a standard, media-rich web article into a clean, printable document using CSS.

## The Problem
Standard web pages often include navigation bars, sticky social share buttons, sidebars with related content, and interactive elements (like video players) that are useless or distracting when printed. Without optimization, these elements waste paper and ink, and can even obscure the main content.

## The Solution
Apply a targeted print stylesheet that hides non-essential elements, flattens the layout, and enhances the readability of the text.

### Before Optimization (Generic Browser Default)
- Navigation and sidebar take up 40% of the first page.
- Images break across pages.
- Links are underlined but their destinations are unknown.
- Gray text on light gray background has poor contrast on paper.

### After Optimization (Applied CSS)

```css
@media print {
  /* 1. Hide Non-Essential Elements */
  nav,
  footer,
  .sidebar,
  .social-share,
  .newsletter-popup,
  .comments-section,
  button {
    display: none !important;
  }

  /* 2. Reset Layout and Colors */
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt;
    line-height: 1.5;
  }

  main {
    margin: 0;
    padding: 0;
    width: 100%;
    float: none !important;
  }

  /* 3. Enhance Typography */
  h1 { font-size: 24pt; margin-top: 0; }
  h2 { font-size: 18pt; break-after: avoid; }

  /* 4. Manage Page Breaks */
  img, table, blockquote, pre {
    break-inside: avoid;
  }

  /* 5. Handle Links */
  a[href^="http"]:not([href*="mysite.com"])::after {
    content: " (" attr(href) ")";
    font-size: 90%;
    font-style: italic;
    color: #666;
  }

  /* 6. Remove 'Sticky' and 'Fixed' issues */
  header {
    position: static !important;
  }
}
```

## Key Changes Explained

1.  **Selective Hiding:** We use `display: none` for everything that isn't the core article content. This ensures the user gets exactly what they wanted.
2.  **Point Sizes:** We switch from `px` or `rem` to `pt` (points), which is a physical unit of measurement designed for print.
3.  **Break Control:** `break-inside: avoid` ensures that a code block or an image doesn't start at the bottom of page 1 and finish at the top of page 2.
4.  **URL Disclosure:** The `::after` selector allows us to print the actual URL next to external links, making the paper document much more useful for research and reference.
5.  **Position Reset:** Sticky headers are great for scrolling but terrible for printing (they can cover the top of every single page). We force them back to `static` positioning.
