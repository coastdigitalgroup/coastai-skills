---
name: site-footer-system
description:
  Design and implement a structured, scalable, and accessible site footer that
  handles global navigation, secondary information, and legal requirements.
---

# Site Footer System

## Purpose

The Site Footer System provides a methodology for designing the bottom-level
anchor of a website. It serves as a safety net for users who haven't found what
they need, a directory for SEO-critical links, and a container for mandatory
legal, brand, and social information. A well-designed footer provides closure
to the page experience without creating cognitive overload.

## Use Cases

- Designing the global footer for multi-page websites.
- Organizing complex sitemaps into manageable navigation clusters.
- Standardizing the placement of utility links (Terms, Privacy, Copyright).
- Integrating global calls-to-action (Newsletters, Contact) into the page end.
- Establishing a responsive strategy for multi-column link lists.

## When NOT to Use

- **Single-Page Mini-sites:** Where a simple "Copyright" line is sufficient.
- **Progressive Web Apps (PWA) with Bottom Tabs:** Where persistent app-like
  navigation replaces the need for a traditional footer.
- **Conversion-Only Landing Pages:** Where a footer might provide "leaks" or
  distractions that take the user away from the primary CTA (though a minimal
  footer with legal links is usually still required).

## Inputs

1. **Information Architecture (IA):** All links not included in the primary
   header.
2. **Legal & Compliance Requirements:** Privacy Policy, Terms of Service, etc.
3. **Brand Identity:** Logo, social media profiles, and company mission
   statement.
4. **Global Actions:** Secondary conversion goals like Newsletter signup.
5. **Device Breakpoints:** Grid system definitions for responsive column
   stacking.

## Outputs

1. **Footer Anatomy Map:** Visual or structural definition of zones (Identity,
   Links, Utility, CTA).
2. **Link Hierarchy:** Categorized clusters of secondary navigation.
3. **Responsive Blueprint:** Rules for how columns stack or collapse on mobile.
4. **Accessibility Landmarks:** Semantic tags (`<footer>`, `<nav>`) and labels.

## Workflow

### 1. Categorize Footer Content

Divide your content into logical zones:

- **Identity Zone:** Logo, description, and social icons.
- **Navigation Zone:** Link clusters grouped by theme (Products, Company,
  Resources).
- **Action Zone:** Newsletter signup or primary contact info.
- **Utility Zone:** Copyright, legal links, and language selector.

### 2. Select a Structural Pattern

Choose a pattern based on site complexity:

- **The Slim Footer:** A single row for minimal sites.
- **The Fat Footer (Sitemap):** Multi-column layout for enterprise/e-commerce.
- **The Action-Oriented Footer:** Focuses on a large CTA before the link lists.

### 3. Establish Visual Hierarchy

Apply `visual-hierarchy-system` to the footer:

- Use bold headers for link clusters.
- Ensure text size is readable but slightly smaller than body text (e.g., 14px).
- Create high contrast between the footer background and link colors.

### 4. Define Mobile Adaptation

Map the transition from Desktop to Mobile:

- **Stacking:** Multi-column layouts should stack into a single column.
- **Accordion Pattern:** For very "fat" footers, consider collapsing link groups
  into accordions on mobile to reduce page length.
- **Touch Targets:** Ensure all links are easy to tap (min 44px height).

### 5. Add Semantic & Accessibility Layers

- Wrap the section in a `<footer>` tag.
- Use `<nav>` elements for link clusters with unique `aria-labels` (e.g., "Footer
  Resources").
- Ensure the contrast ratio meets WCAG AA (4.5:1).

## Decision Rules

- **The Sitemap Rule:** If the site has more than 15 pages, use a multi-column
  "Fat Footer" to aid discovery.
- **External Links:** Social media and external resources should open in new
  tabs (`target="_blank"`) to keep users on your site.
- **Copyright Placement:** Always place the copyright and legal links at the
  absolute bottom (the "Sub-footer").
- **CTA Priority:** If the footer includes a newsletter signup, it should be the
  most visually distinct element in the footer.

## Constraints

- **Accessibility:** Must be reachable via keyboard Tab order. All links must
  have visible focus states.
- **Responsiveness:** Columns must not overflow or become too narrow
  (min-width).
- **Legality:** Must include mandatory links required by local regulations
  (GDPR, CCPA, etc.).

## Common Failure Patterns

- **Link Overload:** Including every single page on the site, creating a wall of
  text that users ignore.
- **Poor Contrast:** Using light gray text on dark backgrounds that fails
  accessibility standards.
- **The "Dead End":** A footer that is too small or missing, leaving users who
  scroll to the bottom with nowhere to go.
- **Non-Standard Grouping:** Mixing unrelated links (e.g., "Careers" under
  "Products").

## Validation Criteria

- [ ] Footer uses semantic `<footer>` and `<nav>` tags.
- [ ] Link clusters have clear, descriptive headers.
- [ ] Mobile view stacks columns correctly and maintains touch targets.
- [ ] Contrast ratio for all footer text meets WCAG AA (4.5:1).
- [ ] Legal links and copyright are present and correctly placed.
- [ ] Social links use recognizable icons with accessible text labels.
