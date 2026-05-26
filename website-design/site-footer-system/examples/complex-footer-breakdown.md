# Complex SaaS Footer Breakdown

This example demonstrates a "Fat Footer" designed for a B2B SaaS platform with
multiple product lines, a rich resource library, and legal requirements.

## The Design Problem

A rapidly growing SaaS company needs a footer that organizes 30+ links, promotes
their newsletter, and maintains a clean visual hierarchy on both desktop and
mobile.

## The Solution: A Four-Zone "Fat Footer"

### 1. Identity & Social Zone (Left)
- **Content:** Logo, 2-sentence mission statement, and social media icons.
- **Role:** Reaffirms the brand at the end of the user journey.

### 2. Navigation Clusters (Center)
- **Column A (Product):** Features, Pricing, Integrations, Changelog.
- **Column B (Resources):** Documentation, Help Center, Academy, Blog, Community.
- **Column C (Company):** About Us, Careers, Press, Contact.
- **Role:** Provides a structured sitemap for "lost" users or SEO bots.

### 3. Action Zone (Right/Top)
- **Content:** Newsletter signup form ("Join 50,000+ pros").
- **Role:** Captures users who have finished reading a page but aren't ready to
  sign up for the product yet.

### 4. Utility / Sub-footer (Bottom)
- **Content:** Copyright, Terms, Privacy, Cookies, Language Selector.
- **Role:** Houses mandatory legal information without cluttering the main nav.

## Visual Hierarchy & Spacing

| Element | Style | Spacing |
| :--- | :--- | :--- |
| **Cluster Headers** | Bold, Uppercase, Primary Color | `margin-bottom: 1rem` |
| **Nav Links** | Regular weight, Secondary Color | `margin-bottom: 0.75rem` |
| **Newsletter Box** | Bordered, Subtle Background | `padding: 1.5rem` |
| **Utility Bar** | Border-top, Extra Small Text | `padding-top: 1.5rem` |

## Responsive Behavior

- **Desktop (1024px+):** 4 columns + 1 wide CTA column.
- **Tablet (768px):** 2x2 grid for nav clusters, CTA moves to its own row at top.
- **Mobile (320px):** Single-column stack. Clusters are collapsed into
  accordions to prevent "infinite scrolling" to the bottom of the page.

## Accessibility Annotations

- **Landmarks:** The entire section is wrapped in `<footer>`.
- **Navigation:** Each column is a `<nav>` with an `aria-label` matching its
  header (e.g., `aria-label="Product links"`).
- **Forms:** The newsletter input has a visible `<label>` and a clear error
  state.
- **Focus:** Links have a 2px offset outline on focus to ensure visibility on the
  dark footer background.
