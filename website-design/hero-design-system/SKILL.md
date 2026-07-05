---
name: hero-design-system
description:
  Design and implement a systematic framework for the visual and spatial anatomy
  of page introductions, managing layout composition, content hierarchy, and
  visual layering to ensure immediate clarity and engagement.
---

# Hero Design System

## Purpose

The Hero Design System provides a methodology for designing the most critical
spatial area of a webpage: the introductory section. While
`hero-section-optimization` in the Growth category focuses on messaging and
conversion, this design system focuses on the **visual anatomy**, **spatial
composition**, and **layering** of the hero. It ensures that content and visuals
work in harmony to establish brand authority, maintain visual hierarchy, and
guide the eye toward the primary action across all device types.

## Use Cases

- Designing the primary entry point for homepages and landing pages.
- Creating "Sub-Hero" intros for deep-level product or service pages.
- Establishing a consistent introductory pattern across a multi-page site.
- Managing complex layering of text, imagery, and interactive elements.
- Designing responsive adaptations for immersive, media-heavy introductions.

## When NOT to Use

- **Global Site Navigation:** Use `site-navigation-system` for the persistent
  header.
- **Page-Level Wayfinding:** Use `page-header-system` for utility-heavy intros
  (e.g., dashboards or settings) that prioritize metadata over impact.
- **Content Articles:** Where the focus is on a simple headline and byline;
  use standard typography or `page-header-system`.
- **Modals or Overlays:** Use `overlay-and-dialog-system` for temporary
  interface layers.

## Inputs

1. **Content Priority:** The Headline (H1), Subheadline, and Primary CTA.
2. **Visual Assets:** Photography, illustrations, video, or abstract patterns.
3. **Layout Mode:** Is this a Split, Centered, or Full-Bleed composition?
4. **Fluid Spacing System:** For consistent margins, padding, and vertical
   rhythm.
5. **Brand Palette:** For background treatments and overlay legibility.

## Outputs

1. **Hero Anatomy Spec:** Definition of content zones (Intro, Core, Action,
   Visual).
2. **Composition Blueprint:** Rules for alignment (Left vs. Centered) and media
   relationship.
3. **Visual Layering Strategy:** Rules for text overlays, scrims, and depth.
4. **Responsive Transformation Map:** How the hero adapts from landscape to
   portrait viewports.

## Workflow

### 1. Select a Composition Pattern

Choose a pattern based on the relationship between content and media:

- **The Split (50/50):** Text on one side, visual on the other. Best for clarity
  and technical products.
- **The Centered Stack:** All content centered, often with a background image or
  video. Best for punchy, high-impact statements.
- **The Inset Content:** Content sits inside a contained box over a full-bleed
  background. Best for premium or editorial feels.
- **The Offset Overlay:** Text partially overlaps a visual element to create
  depth.

### 2. Define the Spatial Hierarchy (Anatomy)

Apply `visual-hierarchy-system` to the hero zones:

- **Intro/Eyebrow (Optional):** A small tag or label above the H1 for context.
- **The Headline (H1):** The largest text element on the page.
- **The Subheadline:** Supportive text providing detail (max 2-3 lines).
- **The Action Zone:** Primary (and optional secondary) CTA buttons.
- **The Anchor (Visual):** The focal point that supports the narrative.

### 3. Establish the Layering & Legibility

If using background media, ensure text is readable:

- **Scrims & Gradients:** Apply a `Legibility Layer` (from
  `imagery-and-media-system`) to ensure 4.5:1 contrast.
- **Blur Treatments:** Use backdrop-filters to soften busy backgrounds behind
  text.
- **Depth:** Use shadows or subtle offsets to distinguish the content "plane"
  from the background "plane."

### 4. Apply Vertical Rhythm and Spacing

Use the `fluid-spacing-system` to define "breathing room":

- **Top/Bottom Padding:** Ensure the hero has enough vertical height (usually
  60vh to 90vh on desktop).
- **Internal Gaps:** Use consistent spacing between H1, Subhead, and CTAs
  (usually `--space-m` to `--space-xl`).

### 5. Map the Responsive Pivot

Plan how the layout transforms for smaller screens:

- **Stacking:** Split layouts usually stack with the visual on top (for context)
  or bottom (to prioritize the H1).
- **Ratio Shift:** Background images should switch from landscape (16:9) to
  square or portrait (1:1 or 4:5) to maintain focal points.
- **Text Scaling:** Ensure the H1 scales down gracefully using
  `fluid-typography-system`.

## Decision Rules

- **The Single H1 Rule:** The hero MUST contain the page's single H1.
- **Clarity over Complexity:** If the visual asset makes the text even slightly
  difficult to read, prioritize a simpler background or a heavier scrim.
- **The "Thumb" Zone:** On mobile, ensure CTAs are placed in the bottom 2/3 of
   the screen for easy reach.
- **Visual Weight:** The H1 and the Primary CTA should be the two most visually
  distinct elements in the hero.
- **Focal Point Alignment:** In split layouts, the "Subject" of the image should
  face toward the content, not away from it.

## Constraints

- **Accessibility:** Text on images must meet WCAG AA (4.5:1) contrast.
  Headlines must use semantic `<h1>` tags. If the hero includes autoplaying
  background video or animation, provide a visible pause control (WCAG 2.2.2)
  and respect `prefers-reduced-motion`.
- **Responsiveness:** The hero must never cause horizontal overflow. Layouts
  should be fluid, not fixed-height, to accommodate varying text lengths.
  Avoid `100vh` locks on mobile, which misbehave with dynamic browser
  chrome — prefer `100dvh` or a min-height with fluid padding.
- **Performance:** Background videos should be muted and have a "poster" image
  fallback for slow connections.

## Common Failure Patterns

- **The "Contrast Fail":** Placing white text on a busy or light image without
  a scrim, making the headline unreadable.
- **Action Burial:** Putting the CTA too low so it's cut off "below the fold"
  on smaller laptops.
- **Media Overload:** Using a background video that is too distracting and
  prevents the user from reading the value proposition.
- **The "Mobile Squish":** Forcing a desktop split layout on mobile, resulting
  in tiny text and a cramped image.

## Validation Criteria

- [ ] Hero contains a clear H1 that is the most prominent text element.
- [ ] Primary CTA is visually distinct and follows `interactive-state-system`.
- [ ] Text overlays meet WCAG AA contrast requirements (4.5:1).
- [ ] Spatial composition (e.g., Split, Centered) is consistent with brand goals.
- [ ] Vertical spacing (padding/gaps) uses tokens from the fluid spacing system.
- [ ] Layout remains functional and readable on mobile viewports.
- [ ] Focal points in imagery are preserved during responsive stacking.
- [ ] Autoplaying video/animation has a pause control and honors
      `prefers-reduced-motion`.
