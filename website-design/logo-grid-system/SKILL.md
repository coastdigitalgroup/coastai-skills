---
name: logo-grid-system
description:
  Design and implement a systematic framework for displaying third-party logos
  (customers, partners, media) that ensures visual balance, optical
  normalization, and brand integrity across all viewports.
---

# Logo Grid System

## Purpose

The Logo Grid System provides a methodology for organizing and presenting
"Social Proof" logos—such as customer brands, technology partners, or media
mentions. Unlike standard image galleries, a logo grid requires **optical
normalization** to ensure that logos of different aspect ratios (tall, wide,
square) and visual densities appear balanced and equal in "weight." This skill
ensures that the brand's secondary trust signals support the primary design
without creating visual clutter or disrespecting the integrity of external
brands.

## Use Cases

- **The "Logo Cloud":** A horizontal row of customer logos below a hero section.
- **The "Press Bar":** Media mentions (e.g., "As seen in...") in a footer or sidebar.
- **Integration/Partner Directories:** Grids showing technology ecosystems.
- **Sponsorship Sections:** Event or project contributors at the bottom of a page.
- **Marquee/Ticker:** Infinite horizontal scrolls of brand marks.

## When NOT to Use

- **Primary Brand Identity:** For the design of the site's own logo (use
  professional branding/identity skills).
- **Iconography:** For small, functional UI symbols (use `iconography-system`).
- **Product Listing Pages (PLP):** Where the primary content is the product
  itself, not its brand mark.
- **Navigational Menus:** Using logos instead of text for primary site navigation.

## Inputs

1.  **Asset Inventory:** A collection of logos in various formats (SVG preferred).
2.  **Brand Integrity Rules:** Knowledge of "Clear Space" and color usage
    requirements for the partner brands.
3.  **Parent Context:** The section width and background color where the grid
    will live.
4.  **Visual Hierarchy Priority:** Should the logos be prominent (full color)
    or subtle (monochrome/muted)?

## Outputs

1.  **Normalization Matrix:** Defined bounding box rules for Square, Wide, and
    Tall logos.
2.  **Visual Treatment Spec:** Rules for color (Grayscale, Knockout, or Original),
    opacity, and hover states.
3.  **Responsive Grid Blueprint:** A plan for column counts (e.g., 2 cols on mobile,
    6 on desktop).
4.  **Optical Sizing Guide:** Specific percentage-based scaling rules for
    balancing visual weight.

## Workflow

### 1. Audit and Standardize Asset Formats

Collect all logos and prioritize **SVG** format. If only raster (PNG/JPG) is
available, ensure they are high-resolution (at least 2x the display size).
Remove unnecessary padding from the source files to ensure the "bounding box"
accurately reflects the logo's dimensions.

### 2. Establish the Normalization Container

Create a "Normalization Container" (a fixed-aspect-ratio box, usually square or
3:2) for each logo.
- Place each logo inside this container using `object-fit: contain`.
- **The Optical Adjustment:** Do not simply fill the box. A wide logo should
  occupy more width but less height; a square logo should occupy less width and
  height than its wide counterpart to maintain equal "ink density."

### 3. Define the Visual Treatment

Choose a style that balances the site's aesthetic with brand recognition:
- **Muted/Monochrome (Standard):** Convert all logos to a single color (usually
  a dark gray or the background color's "knockout"). This prevents a "rainbow
  effect" that distracts from the primary CTA.
- **Hover/Reveal:** Keep logos muted by default and reveal their original brand
  colors only on hover.
- **Full Color:** Only use when the logos themselves are the primary draw (e.g.,
  a high-profile sponsorship page).

### 4. Apply Spacing and Rhythm

Use the `fluid-spacing-system` to define the gap between logos:
- **Gutter Width:** Ensure enough "Clear Space" around each logo to respect
  brand guidelines (usually at least 50% of the logo's height).
- **Alignment:** Align the normalization containers on their center axes
  (both horizontal and vertical) to create a stable horizon line.

### 5. Design for Responsive Reflow

Map how the grid collapses for smaller screens:
- **Desktop:** 5–8 logos per row.
- **Tablet:** 3–4 logos per row.
- **Mobile:** 2 logos per row (or a horizontal "Marquee" scroll if space is
  extremely limited).
- **Scale Down:** Ensure logos remain legible on mobile; if a logo becomes
  a "blur," switch to a "Mark-only" version of that brand's identity.

## Decision Rules

- **The "Ink Density" Rule:** A very "heavy" or solid logo (like a filled circle)
  should be sized 10–15% smaller than a "light" or airy logo (like a thin wordmark)
  to appear equal in weight.
- **The Gray-Scale Default:** Always start with monochrome logos. Only add
  color if the client specifically requires "Brand Authenticity" for all partners.
- **Centered Horizon:** Always center-align logos vertically within their rows.
  Top-aligning logos of different heights creates a "staircase" effect that
  looks unprofessional.
- **Max Width/Height:** Define a `max-height` for the normalization container
  (e.g., `40px` to `60px`) to prevent any single logo from dominating the section.

## Constraints

- **Accessibility:** Every logo must have an `alt` attribute naming the company
  (e.g., `alt="Acme Corp logo"`). If the section has a heading like "Our
  Partners," the logos can be marked as decorative (`alt=""`) to avoid
  redundancy.
- **Brand Integrity:** Never stretch or distort a logo. Never change a logo's
  internal proportions.
- **Responsiveness:** The grid must be fluid. Avoid fixed pixel widths for the
  entire grid; use `100%` width with a `max-width` constraint.

## Common Failure Patterns

- **The "Giant Square":** A square logo taking up the same height as a wide
  logo, making it look 3x larger.
- **Color Chaos:** Mixing colorful logos with different palettes, making the
  site look like a "link farm."
- **Source Padding:** Leaving different amounts of "white space" inside the
  logo files themselves, making automated alignment impossible.
- **Mobile Crowding:** Trying to fit 4 logos in a row on a mobile screen,
  rendering them all unreadable.
- **Staircase Alignment:** Top-aligning logos of different heights, creating
  a jagged and distracting bottom edge.

## Validation Criteria

- [ ] Logos are optically balanced (no single logo looks significantly "heavier").
- [ ] All logos share a consistent visual treatment (e.g., all grayscale).
- [ ] Alignment is centered both horizontally and vertically within cells.
- [ ] Source files are SVGs or high-resolution rasters without internal padding.
- [ ] Mobile view avoids crowding and maintains legibility.
- [ ] Accessibility: All logos have appropriate `alt` text or decorative marks.
- [ ] "Clear Space" requirements for each brand are respected.
