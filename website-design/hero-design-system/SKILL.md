---
name: hero-design-system
description:
  Design and implement a systematic framework for the visual and spatial anatomy
  of page introductions, managing layout composition, content hierarchy, and
  visual layering.
---

# Hero Design System

## Purpose

The Hero Design System provides a methodology for designing the "introductory"
section of a page. It establishes the visual and spatial framework for the most
prominent area of a website, ensuring that layout composition, typography
hierarchy, and media integration work together to establish immediate context
and brand authority.

## Use Cases

- Designing homepage introductions for SaaS, E-commerce, or Portfolio sites.
- Creating landing page "Above the Fold" compositions for marketing campaigns.
- Standardizing page-entry patterns across a multi-page web application.
- Managing complex layering of text, imagery, and interactive elements.
- Establishing a consistent "Visual Hook" strategy for various content types.

## When NOT to Use

- **Internal Body Sections:** Use `section-composition-system` for the middle
  of the page.
- **Global Headers:** Use `site-navigation-system` for the persistent site
  header.
- **Conversion Audits:** Use `hero-section-optimization` (in `website-growth`)
  when focusing specifically on conversion metrics and copy optimization.
- **Media-Only Specs:** Use `imagery-and-media-system` for general rules on
  aspect ratios and image treatments.

## Inputs

1. **Brand Visual Strategy:** High-level aesthetic goals (e.g., "Minimalist
   Tech," "High-Energy Retail").
2. **Content Core:** The primary headline (H1), subtext, and primary action.
3. **Primary Asset:** The lead visual (Product shot, Illustration, Video, or
   Abstract background).
4. **Layout Constraints:** Viewport ranges and grid systems (from
   `responsive-grid-system`).
5. **Hierarchy Requirements:** Priority of elements (from
   `visual-hierarchy-system`).

## Outputs

1. **Hero Anatomy Map:** Defined zones for content, media, and supporting
   elements.
2. **Composition Pattern:** Selection of Centered, Split, Layered, or Immersive
   layouts.
3. **Visual Layering Spec:** Rules for background/foreground relationships,
   overlays, and depth.
4. **Responsive Adaptation Strategy:** Defined transitions for mobile and
   tablet viewports.

## Workflow

### 1. Identify the Composition Pattern

Select a structural starting point based on the content-to-media ratio:

- **The Split (50/50):** Content on one side, visual on the other. Best for
  product features and clarity.
- **The Centered Stack:** All content centered vertically and horizontally.
  Best for punchy, headline-driven messages.
- **The Immersive (Full-Bleed):** Content sits directly on top of a full-screen
  visual. Best for brand-heavy, cinematic experiences.
- **The Layered Offset:** Elements (like cards or product UI) overlap the
  boundary between text and media to create depth.

### 2. Define the Spatial Anatomy

Assign clear zones for the three core "Hero Pillars":

- **The Hook (Messaging):** The H1 and supporting subtext. Must have maximum
  visual weight.
- **The Action (CTA):** Primary and optional secondary buttons.
- **The Asset (Media):** The visual that supports or demonstrates the
  messaging.

### 3. Establish Visual Layering

Determine how elements interact in 3D space (z-axis):

- **Background Layer:** Static color, gradient, or immersive media.
- **Midground Layer:** Supporting graphics, secondary UI elements, or
  "floating" assets.
- **Foreground Layer:** Critical text (H1) and primary actions.
- **Layering Rules:** Use shadows and blur (from `imagery-and-media-system`)
  to maintain separation and legibility.

### 4. Apply Type and Rhythm Scales

- **Display Typography:** Use the largest end of the `fluid-typography-system`
  scale for the H1.
- **Vertical Rhythm:** Apply generous padding (from `fluid-spacing-system`) to
  let the hero "breathe" and separate it from the navigation and following
  sections.

### 5. Design Responsive Adaptations

Plan for viewport shifts:

- **Desktop (1440px+):** Utilize wide horizontal space (Split or Offset).
- **Tablet (768px):** Transition Split layouts to a stacked vertical layout if
  content becomes cramped.
- **Mobile (375px):** Always prioritize the "Messaging" and "Action" stack.
  Media often moves below the CTA or becomes a subtle background element.

## Decision Rules

- **The "Context First" Rule:** The Hero must answer "What is this?" within 2
  seconds. The visual asset must support, not distract from, the H1.
- **Hierarchy of One:** There should be exactly one H1 per page, and it belongs
  in the Hero.
- **Legibility over Style:** Never sacrifice text readability for a visual
  effect. If text sits on media, a legibility layer (scrim/gradient) is
  mandatory.
- **Layout Choice:**
  - Use **Split** for high-complexity products that need a visual demo.
  - Use **Centered** for simple, single-service offerings.
  - Use **Immersive** for emotional, brand-driven landing pages.

## Constraints

- **Accessibility:** All text must meet WCAG AA contrast ratios against their
  immediate background. The H1 must be semantically tagged as `<h1>`.
- **Above-the-Fold:** On the most common viewports, the H1 and Primary CTA
  must be visible without scrolling.
- **Layout Shift:** Hero assets (especially images/video) must have defined
  dimensions or aspect ratios to prevent CLS.

## Common Failure Patterns

- **The Busy Background:** Placing small or high-contrast text on a detailed
  photo, making it unreadable.
- **The "Ghost" Hero:** A centered hero with no visual anchor, making the page
  feel empty and uninspired.
- **Scaling Overload:** A headline that becomes so large on desktop that it
  pushes the primary CTA below the fold.
- **Visual Disconnect:** A hero image that has no logical relationship to the
  text (e.g., generic smiling people for a technical API tool).
- **Mobile Squashing:** Trying to maintain a horizontal split on mobile,
  leaving no room for readable text.

## Validation Criteria

- [ ] Hero contains the page's single H1.
- [ ] Text meets WCAG AA contrast (4.5:1) against the hero background.
- [ ] Primary CTA is visible above the fold on mobile and desktop.
- [ ] Visual asset supports the core message of the H1.
- [ ] Responsive behavior (stacking/scaling) is defined and functional.
- [ ] Vertical spacing (padding) is consistent with the `fluid-spacing-system`.
