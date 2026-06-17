---
name: hero-design-system
description:
  Design and implement a systematic framework for high-impact page
  introductions, managing layout composition, content hierarchy, and visual
  layering to ensure clarity and engagement above the fold.
---

# Hero Design System

## Purpose

The Hero Design System provides a methodology for designing the "Hero"
section—the primary introductory block of a webpage. While growth skills focus
on conversion copy, this system focuses on the **visual and spatial anatomy**
of the section. It ensures that the most important content is presented with
maximum clarity, the layout adapts across devices without losing impact, and
visual treatments (like background media) don't compromise legibility or
accessibility.

## Use Cases

- Designing the homepage "hero" for a new brand or product.
- Establishing structural templates for landing page intros.
- Creating "Category Hero" layouts for e-commerce or blogs.
- Redesigning a site's "above-the-fold" experience to improve visual impact.
- Standardizing how text and imagery interact in high-priority sections.

## When NOT to Use

- **Internal Page Content:** For secondary sections below the fold; use
  `section-composition-system`.
- **Text-Only Content Pages:** Like a simple blog article where a standard H1
  header is sufficient.
- **Micro-Interactions:** For individual element behaviors; use
  `interactive-state-system`.
- **Conversion Copywriting:** For the specific wording of headlines and CTAs;
  use `website-growth/hero-section-optimization`.

## Inputs

1. **Content Priority:** The core message (H1), supporting context (Subhead),
   and primary action (CTA).
2. **Visual Assets:** High-resolution photography, video, or illustrations.
3. **Brand Identity:** Typography scale, color palette, and "visual voice"
   (e.g., Minimalist vs. High-Energy).
4. **Fluid Spacing/Typography:** Tokens for consistent scaling.
5. **Responsive Grid:** Guidelines for content alignment and width.

## Outputs

1. **Hero Anatomy Spec:** Definition of zones (Heading, Media, Action,
   Wayfinding).
2. **Composition Blueprint:** Structural rules for alignment (Split, Centered,
   Full-Bleed).
3. **Visual Layering Spec:** Standards for background treatments (scrims,
   gradients) and text legibility.
4. **Responsive Adaptation Map:** Rules for how the layout collapses and how
   media crops for mobile.

## Workflow

### 1. Select the Composition Pattern

Choose a layout based on the relationship between content and media:

- **The Split (50/50):** Text on one side, media on the other. Best for B2B/SaaS
  where clarity of features is key.
- **The Centered Stack:** All content centered, often on top of a background
  image/video. Best for high-impact branding and emotional storytelling.
- **The Inset Media:** Text is prominent, with media floating or contained in a
  smaller frame. Best for product-focused hardware or apps.
- **The Asymmetric Layout:** Using the grid to create dynamic overlap between
  text and visuals. Best for creative or editorial sites.

### 2. Establish Content Hierarchy

Apply `visual-hierarchy-system` to the hero elements:

- **Level 1 (Anchor):** The H1 Headline. The largest, most prominent text.
- **Level 2 (Context):** The Subheadline or value prop description.
- **Level 3 (Action):** The Primary CTA button (usually a high-contrast style).
- **Level 4 (Wayfinding/Trust):** Breadcrumbs above the H1 or small trust
  signals (badges) below the CTA.

### 3. Design the Visual Layering

Manage the relationship between background and foreground:

- **Text Protection:** If using a background image, apply a scrim (overlay) or
  directional gradient to ensure the text meets WCAG contrast.
- **Focal Point Alignment:** Ensure the subject of the image doesn't sit
  directly behind the text (e.g., "Left-aligned text, right-aligned focal
  point").
- **Depth and Shadow:** Use subtle shadows or blurs to separate content layers
  if they overlap.

### 4. Define Spacing and Rhythm

Use the `fluid-spacing-system` to create breathing room:

- **Minimum Height:** Define a `min-height` (e.g., `80vh` or `600px`) to ensure
  the hero feels substantial.
- **Padding:** Use generous vertical padding to keep content centered in the
  viewport.

### 5. Plan Responsive Adaptations

- **Stacking Order:** Split layouts usually stack with Text on top (for
  immediacy) or Media on top (for emotional impact).
- **Media Pivot:** Switch from a horizontal desktop crop (16:9) to a square or
  portrait crop (1:1) on mobile.
- **Typography Scaling:** Ensure the H1 doesn't break into too many lines on
  small screens.

## Decision Rules

- **The Legibility Rule:** Foreground text must have a 4.5:1 contrast against
  any part of the background image/video.
- **The "One CTA" Rule:** Only one primary button should have the "Level 1"
  visual weight.
- **Visual Weight Balance:** If the text block is heavy (long headline), use
  a simpler visual. If the visual is complex, keep the text minimal.
- **Above-the-Fold Constraint:** The H1 and the Primary CTA must be visible
  without scrolling on a standard 13" laptop (768px height) and modern mobile.

## Constraints

- **Accessibility:** Background video must have a "Pause" mechanism or no
  looping if it's distracting. Images must have `alt` text.
- **Responsiveness:** Text must never overflow the viewport horizontally.
- **Performance:** Hero images should be optimized for LCP (Largest Contentful
  Paint).

## Common Failure Patterns

- **The "Deadly Center":** Placing text directly over a busy part of an image,
  making it unreadable.
- **Mobile Decapitation:** Not defining a focal point, resulting in the subject
  of the image being cropped out on vertical mobile screens.
- **CTA Burial:** Placing the primary button so low that it's "below the fold"
  on most devices.
- **Information Overload:** Trying to fit too many features, secondary links,
  or navigation items into the hero space.
- **Pattern Repetition:** Using the same hero layout for every page, losing the
  visual distinction of the homepage.

## Validation Criteria

- [ ] A clear H1 is the most prominent element.
- [ ] Text-to-background contrast meets WCAG AA (4.5:1).
- [ ] The Primary CTA is visible above the fold on mobile and desktop.
- [ ] Mobile stacking and cropping rules are defined.
- [ ] Focal point is preserved across all viewport sizes.
- [ ] Internal spacing uses tokens from the `fluid-spacing-system`.
