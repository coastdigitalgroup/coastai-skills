---
name: section-composition-system
description:
  Design and implement a systematic framework for page body sections, managing
  spatial rhythm, layout patterns, and transitions to ensure a logical and
  engaging content flow.
---

# Section Composition System

## Purpose

The Section Composition System provides a methodology for designing the "middle"
of the page—the sequence of sections that sit between the global header and
footer. While atomic components (cards, buttons) live within sections, this
system focuses on the **spatial rhythm**, **layout patterns**, and
**transitions** between those sections. It ensures that content is grouped
logically, visual fatigue is minimized through layout variation, and the user
is guided through a coherent narrative or task flow.

## Use Cases

- Designing long-form landing pages with multiple feature and benefit sections.
- Structuring product detail pages (PDPs) that require technical specs, social
  proof, and usage guides.
- Organizing "About Us" or "How it Works" pages into digestible content blocks.
- Establishing a consistent "Page Body" rhythm across a multi-page website.
- Managing vertical spacing and background shifts to indicate shifts in topic
  or priority.

## When NOT to Use

- **Single-Section Views:** Where the entire experience fits within the hero or
  a single viewport (e.g., a simple login page or a splash screen).
- **Global Navigation/Footer:** Use `site-navigation-system` or
  `site-footer-system` for the persistent site frame.
- **Micro-Interactions:** For individual element behaviors within a section;
  use `interactive-state-system`.
- **Pure Data Displays:** Where content is a continuous stream of uniform items
  (e.g., a large data table or an infinite feed).

## Inputs

1. **Content Sequence:** The prioritized list of page sections (from the
   Information Architecture).
2. **Section Priority:** Which sections are "High-Impact" (Benefit-driven) vs.
   "Supporting" (Technical specs/Social proof).
3. **Brand Palette:** To define background alternating patterns.
4. **Fluid Spacing System:** For consistent vertical margins and section
   padding.
5. **Responsive Grid System:** To define the maximum content width and column
   behavior.

## Outputs

1. **Section Sequence Map:** A blueprint showing the order and layout pattern of
   each section.
2. **Transition Strategy:** Defined rules for background shifts (e.g., Light ->
   Dark -> Light) and vertical spacing.
3. **Layout Blueprints:** Annotated wireframes for common section patterns
   (Zig-zag, Grids, 50/50 Splits).
4. **Responsive Stacking Rules:** How complex section layouts collapse on
   mobile.

## Workflow

### 1. Map the Narrative Flow

Arrange content into a logical sequence based on user intent. A common landing
page flow includes:
- **Awareness:** Hero / Problem Statement.
- **Education:** How it Works / Core Features.
- **Validation:** Social Proof / Case Studies.
- **Detail:** Secondary Features / Pricing / FAQ.
- **Conversion:** Final CTA.

### 2. Select Section Layout Patterns

Avoid repetition by alternating between layout patterns:

- **The Split (50/50):** Content on one side, visual on the other. Best for
  high-impact benefits.
- **The Zig-Zag:** Alternating the "Split" pattern (e.g., Visual Left, then
  Visual Right). Best for storytelling and reducing scanning fatigue.
- **The Feature Grid:** 3 or 4 columns of cards/icons. Best for secondary
  features or services.
- **The Centered Stack:** All content centered vertically and horizontally.
  Best for punchy statements or final CTAs.

### 3. Design the Transition System

Use visual cues to signal a change in topic:

- **Background Alternating:** Switch between White, Light Gray, or Brand
  colors to "bucket" sections. Derive tinted backgrounds from a single brand
  token with `color-mix()` (e.g., `color-mix(in oklch, var(--brand) 6%, white)`)
  instead of hand-picking a separate gray/tint per section, so the palette
  stays consistent as the brand color changes.
- **Vertical Spacing:** Use consistent top/bottom padding (from the
  `fluid-spacing-system`), ideally with `clamp()` so section padding scales
  smoothly between mobile and desktop instead of jumping at breakpoints.
- **Dividers:** Use subtle lines or angled SVG transitions for a more modern
  or dynamic feel.

### 4. Establish Content "Breaks"

Introduce "breaker sections" to stop the user from scrolling too fast:
- **Quotes/Testimonials:** Large-text centered sections.
- **Full-Width Imagery:** Immersive visuals that provide a mental reset.
- **Stats/Impact:** High-contrast blocks with large numbers.

### 5. Define Responsive Stacking

Plan how sections collapse:
- **Natural Stack:** Split layouts usually stack with the visual on top or bottom
  (usually top for context).
- **Zig-Zag Reversal:** Ensure that in a zig-zag layout, the "Media" doesn't
  end up stacked sequentially on mobile (e.g., Text-Media-Media-Text). Adjust
  the order so it remains consistent (e.g., Media-Text-Media-Text).

## Decision Rules

- **The "Fatigue" Rule:** Never use the same layout pattern for three sections
  in a row. Rotate between Split, Grid, and Centered layouts.
- **The "Visual Anchor" Rule:** Every high-impact section should have a visual
  anchor (Image, Video, or Icon) to support the text.
- **Contrast for Focus:** Use a dark background section for the most important
  message or the final CTA to create high contrast with the rest of the page.
- **Text Width Constraint:** Limit the width of text blocks (usually max-width:
  60ch) to ensure readability, even if the section container is wider.

## Constraints

- **Accessibility:** Background color shifts must maintain WCAG AA contrast
  ratios for all text within that section.
- **Heading Hierarchy:** Each major section should start with an `<h2-h6>`
  that follows the logical document outline.
- **Responsiveness:** Section padding should scale down on mobile (e.g.,
  `--space-3xl` on desktop becomes `--space-xl` on mobile); prefer a `clamp()`
  expression over discrete breakpoint overrides.
- **Spacing Consistency:** The space *between* sections should be consistent
  unless a shift in topic requires a larger "break."

## Common Failure Patterns

- **The "Wall of Text":** Sections with too much copy and no visual breaks or
  subheadings.
- **Pattern Repetition:** Using the same 50/50 split layout for 5 sections in a
  row, making the page feel monotonous.
- **The "Mobile Sandwich":** In a Zig-Zag layout, failing to adjust stacking
  order on mobile, resulting in two images or two text blocks sitting directly
  on top of each other.
- **Lack of Whitespace:** Cramming sections together without enough vertical
  padding, making the content feel suffocating.
- **Inconsistent Alignment:** Mixing centered headlines with left-aligned
  headlines in the same sequence without a clear logic.

## Validation Criteria

- [ ] Page layout alternates between at least two different patterns (e.g.,
      Split and Grid).
- [ ] Section transitions (background shifts) are used to group related content.
- [ ] Vertical spacing (padding) is consistent across similar section types.
- [ ] All sections follow the correct heading hierarchy (`h2` for major
      sections).
- [ ] Mobile stacking order for Zig-Zag layouts is logically defined.
- [ ] Text-heavy sections maintain a readable line length (max-width: 60-80ch).
- [ ] Contrast ratios for background-colored sections meet WCAG AA.
