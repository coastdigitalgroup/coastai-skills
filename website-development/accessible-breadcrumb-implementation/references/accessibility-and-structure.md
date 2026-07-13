# Accessibility and Structure for Breadcrumbs

## W3C/WAI-ARIA Pattern
Breadcrumbs follow a specific pattern to ensure they are useful to assistive technology:

1.  **Landmark:** The trail must be contained within a `<nav>` element. This allows users to jump to the navigation trail using landmark shortcuts.
2.  **Labeling:** Since a page usually has multiple `<nav>` elements (main, footer, etc.), the breadcrumb nav must have a label.
    - `aria-label="Breadcrumb"` is the standard.
3.  **List Structure:** An ordered list (`<ol>`) is preferred over a `<ul>`. This informs the screen reader of the number of items in the trail and the user's specific position (e.g., "Item 2 of 4").
4.  **Current Item:** The last item (the current page) must be identifiable.
    - Use `aria-current="page"` on the link or the text element that represents the current page.
    - If the current page is not a link (recommended), `aria-current` still helps confirm to the user that this is indeed their current location.

## Separators and the "Double Announcement" Problem
A common mistake is putting separators (like `/` or `>`) directly in the HTML without hiding them:

```html
<!-- BAD: Screen reader reads "Home slash Products slash Shoes" -->
<li><a href="/">Home</a> / </li>

<!-- GOOD: Screen reader reads "Home, Products, Shoes" -->
<li><a href="/">Home</a> <span aria-hidden="true">/</span></li>
```

Using CSS `::after` or `content` is also a good approach, as many screen readers skip CSS-injected content, but explicitly using `aria-hidden` in the HTML is the most robust way to ensure a clean experience.

## WCAG 2.2 Touch Targets
Breadcrumb links are often small. To comply with WCAG 2.2 Success Criterion 2.5.8 (Target Size - Minimum), ensure that the target size is at least 24x24 CSS pixels. You can achieve this by adding padding to the links even if the text itself is smaller.

## Logical Hierarchy vs. History
Breadcrumbs should **never** be based on the user's history (i.e., how they got there). They should always represent the site's logical structure.
- **Correct:** Home > Men's Shoes > Boots > [Product]
- **Incorrect:** Home > Search Results > [Product] (If "Search Results" isn't a parent in the IA).
