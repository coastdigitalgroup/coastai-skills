---
name: hero-design-system
description:
  Design and implement a systematic framework for hero sections, managing
  visual hierarchy, content layering, and spatial composition to create
  high-impact page introductions.
---

# Hero Design System

## Purpose

The Hero Design System provides a methodology for designing the most critical
visual area of a webpage: the introductory section (Hero). It ensures that the
brand's primary message and call-to-action (CTA) are presented with maximum
impact, clarity, and structural integrity across all devices. This system
manages the relationship between typography, visual assets (images/video), and
interactive elements to guide the user's first impression and initiate their
journey.

## Use Cases

- Designing introductory sections for landing pages and homepages.
- Creating high-impact headers for product launch or announcement pages.
- Standardizing hero patterns across a multi-page website or SaaS product.
- Managing the composition of text-on-image layouts for readability.
- Designing responsive hero sections that maintain hierarchy from mobile to
  desktop.

## When NOT to Use

- **Global Site Navigation:** Use `site-navigation-system` for the persistent
  header.
- **Internal Dashboard Pages:** Where the "Hero" pattern is replaced by a
  functional `page-header-system`.
- **Informational/Article Headers:** Where the focus is on content metadata;
  use `page-header-system` or standard typography.
- **Micro-Interactions:** Use `interactive-state-system` for the behavior of
  buttons within the hero.

## Inputs

1. **Information Hierarchy:** The primary Headline (H1), Subheadline, and
   Primary CTA.
2. **Visual Anchor:** The primary asset (Photography, Illustration, Product UI,
   or Video).
3. **Brand Personality:** Determines the layout style (e.g., Bold/Centered vs.
   Precise/Split).
4. **Device Breakpoints:** Responsive requirements from the
   `responsive-grid-system`.
5. **System Tokens:** Typography scales and spacing from the broader system.

## Outputs

1. **Hero Anatomy Spec:** Definition of zones (Copy Area, Visual Area, Action
   Area).
2. **Layout Blueprint:** Chosen pattern (Centered, Split, or Layered Overlay).
3. **Contrast & Readability Plan:** Treatment for text-on-visual scenarios
   (scrims, overlays, or layout separation).
4. **Responsive Stacking Logic:** How the hero transforms for mobile viewports.

## Workflow

### 1. Define Content Priority

Assign weights to the core elements:
- **Headline (H1):** The largest typographic element.
- **Visual Asset:** The element that provides the emotional or functional hook.
- **CTA:** The high-contrast interaction point.

### 2. Select a Composition Pattern

Choose a spatial arrangement based on the content and asset type:

- **Split Layout (50/50):** Text on one side, visual on the other. Best for
  clarity and showing product UIs or complex illustrations.
- **Centered Stack:** All content centered vertically and horizontally. Best
  for punchy, emotional messaging and high-quality photography.
- **Layered Overlay:** Text sits directly over a full-width visual. Best for
  immersive experiences, requiring careful contrast management.

### 3. Establish Visual Layering (Depth)

Apply depth to separate the copy from the visual:

- **The Scrim:** Use a subtle gradient or solid overlay (usually 20-50% opacity)
  behind text when using the "Layered Overlay" pattern.
- **Container Isolation:** Place text in a semi-opaque card or container to
  ensure 100% legibility regardless of the background image.
- **Background Positioning:** Define the "focal point" of the background image
  to ensure it doesn't collide with the text on different screen sizes.

### 4. Optimize Spatial Rhythm

Use the `fluid-spacing-system` to define the hero's scale:

- **Vertical Padding:** Ensure the hero has enough "breathing room" (usually
  `--space-3xl` to `--space-5xl`) to feel significant.
- **Internal Gaps:** Maintain a clear relationship between Headline,
  Subheadline, and CTA using proximity (e.g., small gap between H1 and Subhead,
  larger gap before CTA).

### 5. Define Responsive Transformation

Plan the "mobile shift":

- **Natural Stack:** Split layouts should stack with the visual on top (for
  context) or bottom (for immediate reading).
- **Text Re-alignment:** Centered desktop layouts often remain centered on
  mobile, while split layouts usually switch to center-aligned or left-aligned
  stacks.
- **Asset Resizing:** Determine if the desktop image needs to be swapped for a
  differently cropped mobile version.

## Decision Rules

- **The 5-Second Clarity Rule:** The Headline and CTA must be the first things
  seen and understood.
- **The Contrast Mandate:** Text-on-image must maintain at least 4.5:1 contrast
  (WCAG AA). If the image is "busy," use a solid background for the text area.
- **Primary vs. Secondary:** Limit to ONE primary CTA. Any secondary action
  (e.g., "Watch Video") must be visually subordinate (ghost or text button).
- **Above-the-Fold:** The primary headline and CTA should be visible in the
  initial viewport on standard devices (e.g., 800px height for desktop).

## Constraints

- **Accessibility:** The hero must contain one `<h1>`. Alt text for visual
  assets is mandatory unless purely decorative.
- **Responsiveness:** No fixed heights. Use `min-height` (e.g., `min-height:
  70vh` or `min-height: 500px`) to ensure the hero adapts to content length.
- **Performance:** Hero images are usually the Largest Contentful Paint (LCP)
  element. Optimize asset size and use appropriate formats (WebP/AVIF).

## Common Failure Patterns

- **The Legibility Nightmare:** White text on a light/busy image with no scrim
  or overlay.
- **The CTA Bury:** Placing the CTA so far down that it's cut off by the
  viewport bottom.
- **Visual Competition:** The background image is so complex or vibrant that it
  distracts from the headline.
- **The Mobile Smash:** Not allowing enough vertical padding on mobile, making
  the hero feel cramped and unimportant.
- **The Vague Headline:** Using a generic "Welcome" or "Hero Title Here" that
  doesn't convey value.

## Validation Criteria

- [ ] Hero contains a clear H1 and a primary CTA.
- [ ] Text-on-image contrast meets WCAG AA (4.5:1).
- [ ] Layout uses a defined pattern (Split, Centered, or Layered).
- [ ] Mobile stacking order is logical and preserves hierarchy.
- [ ] Focal point of the image does not interfere with text legibility.
- [ ] Primary CTA is the most visually prominent interactive element.
