---
name: imagery-and-media-system
description:
  Design and implement a systematic framework for visual assets (photography,
  illustration, and video) that ensures visual consistency, art direction
  integrity, and text legibility across all viewports.
---

# Imagery and Media System

## Purpose

The Imagery and Media System provides a methodology for managing how visual
assets are integrated into a website's design. It ensures that images,
illustrations, and videos aren't just "decorations" but functional parts of the
user experience. This system establishes rules for **aspect ratios**,
**responsive art direction**, and **text legibility** (overlays), ensuring that
media remains high-impact and accessible regardless of screen size or content
complexity.

## Use Cases

- Establishing art direction and visual style standards for a new website.
- Defining a consistent aspect ratio matrix for a UI component library (e.g.,
  cards, heroes).
- Designing high-contrast text overlays for background images and videos.
- Managing responsive cropping and focal point preservation for "art-directed"
  media.
- Standardizing the composition of media-heavy sections like galleries,
  feature highlights, and case studies.

## When NOT to Use

- **Technical Asset Optimization:** Use `responsive-images` in
  `website-development` for technical concerns like compression, file formats,
  and lazy loading.
- **Logo and Branding Design:** For the design of the primary brand identity
  itself (logos, marks), which is usually established outside of web design.
- **Iconography:** Use `iconography-system` for small, functional UI symbols.
- **Decorative-only Patterns:** For purely abstract, non-semantic background
  textures that don't interact with content.

## Inputs

1.  **Brand Art Direction:** The intended visual "voice" (e.g., Candid,
    Technical, High-Contrast, Minimalist).
2.  **Content Inventory:** The types of media needed (e.g., Product shots,
    Portraits, Abstract backgrounds).
3.  **Responsive Grid System:** The layout context where the media will live.
4.  **Typography System:** The text styles that will interact with or sit on top
    of the media.

## Outputs

1.  **Aspect Ratio Matrix:** A defined set of ratios (e.g., 16:9, 1:1, 4:3)
    mapped to specific component types.
2.  **Overlay Legibility Spec:** Standards for scrims, gradients, and blur
    treatments to ensure text contrast.
3.  **Art Direction Map:** Defined focal point rules and cropping strategies for
    mobile, tablet, and desktop.
4.  **Composition Blueprints:** Rules for how media relates to adjacent content
    (e.g., 50/50 splits, inset media, full-bleed).

## Workflow

### 1. Define the Visual Language

Establish a consistent "filter" or style for all media to ensure cohesion:
- **Treatment:** Define rules for saturation, temperature, and contrast.
- **Density:** Determine if images should be busy/detailed or minimal/spacious.
- **Composition:** Set standards for "white space" within the imagery (e.g.,
  "All product shots must have a 10% margin of negative space").

### 2. Establish Aspect Ratio Standards

Use a consistent set of ratios to prevent layout "jumping" and maintain rhythm:
- **Cinematic (16:9 / 21:9):** Best for Hero sections and immersive video.
- **Standard (4:3 / 3:2):** Best for article previews and general photography.
- **Square (1:1):** Best for product listings, avatars, and social grids.
- **Portrait (3:4 / 9:16):** Best for mobile-first content and tall feature
  highlights.

### 3. Design for Text Legibility (Overlays)

When placing text on top of media, use a "Legibility Layer":
- **The Scrim:** A subtle, semi-transparent black or white overlay (usually
  10-40% opacity).
- **The Gradient:** A directional fade (e.g., bottom-to-top) that darkens the
  area behind the text while keeping the rest of the image clear.
- **The Blur:** Applying a backdrop-filter blur to the area behind the text
  to reduce visual noise.
- **Text Placement:** Align text to the "quietest" part of the image.

### 4. Set Responsive Art Direction

Images must change their "crop" to fit different screen shapes:
- **Focal Point Preservation:** Identify the "Subject" of the image and ensure
  it remains visible as the container changes shape (e.g., `object-position`
  settings).
- **The Mobile Pivot:** Switch from a horizontal desktop crop (16:9) to a square
  or portrait crop (1:1 or 4:5) on mobile to maximize viewport usage.
- **Scale over Stretch:** Never allow an image to lose its aspect ratio; use
  `object-fit: cover` to maintain proportions while filling the container, and
  reserve space with the CSS `aspect-ratio` property so the layout doesn't shift
  before the asset loads.
- **Art-Directed Crops:** Use the `<picture>` element with multiple `<source>`
  breakpoints when a different crop (not just a different size) is needed per
  viewport; use `srcset`/`sizes` on a single `<img>` when only resolution
  changes, not composition.

### 5. Define Composition Patterns

Determine how media interacts with the surrounding layout:
- **Full Bleed:** Media extends to the edges of the viewport. Best for high-impact
  intro sections.
- **Inset / Contained:** Media stays within the grid columns. Best for
  supporting imagery.
- **The Layered Effect:** Media overlaps with other elements (like cards or
  text) to create depth.

## Decision Rules

- **The Legibility Rule:** If text is placed on an image, it MUST meet WCAG AA
  contrast (4.5:1). If it doesn't, apply a darker scrim or move the text.
- **Ratio Consistency:** All cards in a single row or grid MUST use the same
  aspect ratio to ensure alignment.
- **Subject-First Cropping:** Always prioritize the subject of the image (e.g.,
  a person's face or a product) when the aspect ratio changes for mobile.
- **Empty State Fallback:** Define a "Placeholder Style" for when an image
  fails to load or isn't provided, using a brand-colored brand-neutral graphic.
- **Video Interaction:** Always provide a "Play/Pause" control and never
  auto-play video with sound.
- **Reserve Space:** Every media container must have a defined `aspect-ratio`
  or explicit `width`/`height` so the browser can reserve layout space before
  the asset downloads.

## Constraints

- **Accessibility:** Text on images must be readable by screen readers (not
  flattened into the image). All semantic images must have `alt` text.
- **Performance (Design Side):** Avoid requiring ultra-high resolution for
  elements that will only ever be small (like avatars).
- **Responsiveness:** Media must never cause horizontal scrolling. The aspect
  ratio should remain stable to prevent Layout Shift (CLS).

## Common Failure Patterns

- **The "Contrast Fail":** White text on a light/busy image with no scrim,
  making the text unreadable.
- **The "Decapitation":** Improper responsive cropping that cuts off heads or
  primary subjects on mobile.
- **Ratio Soup:** Using 5 different aspect ratios on the same page, creating a
  fragmented and messy visual rhythm.
- **Asset Mismatch:** Mixing high-quality photography with "clip-art" style
  illustrations, breaking brand cohesion.
- **The "Stretch":** Forcing an image into a container that doesn't match its
  proportions, leading to distortion.

## Validation Criteria

- [ ] Every image with text overlay meets WCAG AA (4.5:1) contrast.
- [ ] Aspect ratios are consistent within similar component types (e.g., all
      blog cards are 4:3).
- [ ] Focal points are preserved across Mobile, Tablet, and Desktop viewports.
- [ ] All semantic images have descriptive `alt` text defined.
- [ ] Media does not cause horizontal overflow or layout distortion.
- [ ] A clear visual style (art direction) is maintained across all assets.
- [ ] Every media container reserves space via `aspect-ratio` or explicit
      dimensions to prevent Cumulative Layout Shift (CLS).
