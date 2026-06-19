# Hero Layout Breakdown: SaaS Platform

This example demonstrates the application of the **Hero Design System** to a
typical B2B SaaS landing page, focusing on the "Split" layout pattern.

## 1. Composition Pattern: The Split (50/50)

For a technical product, we use a split layout to balance a feature-rich visual
with clear, readable text.

- **Desktop Layout:** Text on the left (reading start), High-fidelity product
  dashboard on the right.
- **Visual Anchor:** 4:3 aspect ratio dashboard screenshot with subtle drop
  shadow to create depth.
- **Alignment:** Left-aligned text creates a strong vertical axis for scanning.

## 2. Spatial Hierarchy (Anatomy)

- **Eyebrow (Priority 3):** `.text-accent` "New: AI-Powered Workflows" (Level 3
  Hierarchy).
- **Headline (Priority 1):** `<h1>` "Manage your team's output without the
  overhead." (Level 1 Hierarchy).
- **Subheadline (Priority 2):** `<p>` "The all-in-one platform for engineering
  teams to track, ship, and celebrate every commit." (Level 2 Hierarchy).
- **Action Zone:**
  - **Primary CTA:** High-contrast "Start Free Trial" button.
  - **Secondary CTA:** Ghost button "Watch Demo".

## 3. Layering & Legibility

Since this is a split layout on a neutral background, legibility is high.
However, we apply the following layering rules:

- **Depth:** The dashboard visual uses a `20px` blur shadow to "lift" it off the
  white background.
- **Whitespace:** 80px (`--space-3xl`) of padding between the text column and
  the visual column to prevent crowding.

## 4. Vertical Rhythm (Spacing)

Using the `fluid-spacing-system`:
- **Top Padding:** `--space-3xl` (80px) below the site navigation.
- **Bottom Padding:** `--space-3xl` (80px) above the next section (Social
  Proof).
- **Internal Gaps:**
  - Eyebrow to H1: `--space-xs` (12px).
  - H1 to Subhead: `--space-m` (24px).
  - Subhead to Buttons: `--space-l` (32px).

## 5. Responsive Pivot

- **Breakpoint (768px):** The 50/50 split collapses into a single column.
- **Stacking Order:**
  1. Eyebrow
  2. Headline (H1)
  3. Visual (Dashboard screenshot moves above the subhead to provide context).
  4. Subheadline
  5. Action Zone (Full-width buttons on mobile).
- **Typography:** The H1 scales from `64px` on desktop to `32px` on mobile using
  `clamp()`.
