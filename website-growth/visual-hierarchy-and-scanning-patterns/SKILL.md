---
name: visual-hierarchy-and-scanning-patterns
description:
  Audit and optimize the visual hierarchy and information layout of a page to
  match natural user scanning patterns (F, Z, Layer-cake) and guide attention
  to high-value conversion elements.
---

# Visual Hierarchy and Scanning Pattern Optimization

## Purpose

The Visual Hierarchy and Scanning Pattern Optimization skill provides a
systematic framework for managing user attention. Users do not read web pages
word-for-word; they "scan" them in predictable patterns based on their goals
and the page's visual layout. This skill focuses on using contrast, scale,
whitespace, and directional cues to align the page's structure with these
natural behaviors, ensuring that the most important information (Value
Proposition, Proof, CTA) is seen and processed.

## Use Cases

- **Landing Pages:** Where the primary goal is to guide the user from a hero
  headline to a conversion button.
- **Article/Blog Layouts:** Where long-form content needs to be "skimmable"
  without losing the core message.
- **Pricing Pages:** Where users need to compare options and identify the
  "best value" plan quickly.
- **Feature Lists:** Where technical information needs to be categorized to
  prevent cognitive overload.
- **Mobile Interfaces:** Where limited vertical space requires aggressive
  prioritization of visual elements.

## When NOT to Use

- **Data-Heavy Dashboards:** Where information density is the priority and
  expert users need access to all data simultaneously.
- **Immersive Narrative/Art Sites:** Where the goal is creative expression or
  deliberate "slow" consumption rather than conversion-driven scanning.
- **Interactive Tools:** Where the UI is driven by functional utility (e.g.,
  a code editor or spreadsheet) rather than persuasive hierarchy.

## Inputs

1. **The Page URL or Screenshot:** Current layout in both desktop and mobile
   views.
2. **Attention Heatmaps (Optional):** Eye-tracking or mouse-movement data
   showing where users actually look.
3. **Information Priority List:** A list of the page's content ordered by its
   importance to the conversion goal.
4. **Primary Conversion Goal:** The specific action we want the user to take.

## Outputs

1. **Visual Hierarchy Audit:** Identification of "Attention Leaks" where the
   layout distracts from the primary goal.
2. **Scanning Pattern Recommendation:** Selection of the ideal pattern (F, Z,
   Layer-cake, or Spotted) based on content type.
3. **UI Refinement Spec:** Specific changes to typography (scale/weight),
   contrast, whitespace, and color to enforce the hierarchy.
4. **Directional Cue Plan:** Recommendations for using arrows, gaze direction
   in images, or lines to guide the eye.

## Workflow

### 1. Perform the "Squint Test"

Squint your eyes until the page content becomes a blur of shapes and colors.
- **Identify the 1st, 2nd, and 3rd visual focal points.**
- **Gap Analysis:** If the CTA is not one of the top 3 focal points, the
  hierarchy is broken.

### 2. Identify and Align Scanning Patterns

Choose the pattern that matches the page's goal:
- **The Z-Pattern:** Use for simple landing pages with minimal text. Flow:
  Logo -> Top Nav -> Hero Image -> Headline -> CTA.
- **The F-Pattern:** Use for text-heavy pages (blogs/docs). Ensure the first
  two paragraphs and the left side of the page contain the most critical hooks.
- **The Layer-Cake Pattern:** Use for feature pages or lists. Use clear,
  benefit-driven subheadings (H2s) to allow users to "skip" between layers.
- **The Spotted Pattern:** Use for pages where users search for specific
  data points (specs/prices). Use bolding, colors, and icons to create "spots"
  of attention.

### 3. Enforce the Hierarchy of Scale & Contrast

- **Typography Scale:** Ensure a clear ratio between H1, H2, and body text
  (e.g., a 1.25x or 1.5x scale).
- **The Contrast Rule:** The most important action (CTA) must have the highest
  color contrast on the page.
- **Negative Space (Whitespacing):** Surround high-priority elements with
  empty space to make them "pop" and reduce cognitive friction.

### 4. Implement Directional Cues

Guide the eye toward the "Prize":
- **Explicit Cues:** Use arrows or lines pointing toward the form or button.
- **Implicit Cues:** Use images of people looking or pointing toward the
  primary headline or CTA.
- **Vertical Rhythm:** Use consistent spacing to "pull" the user down the page.

### 5. Review Against Decision Rules

Verify the new layout against the growth heuristics below.

## Decision Rules

- **The "Rule of One":** Each screen-view (at the fold) should have exactly
  ONE primary visual focal point.
- **Left-to-Right Priority:** In Western markets, place the most important
  starting information (Logo/Value Prop) on the top-left and the final action
  (CTA) on the bottom-right or center.
- **The Isolation Effect:** An element that stands out from its peers (via
  color or size) will be remembered best. Use this for the "Recommended"
  pricing plan or the primary CTA.
- **Scanning over Reading:** Design for the user who will only read the
  headlines and the button text.

## Constraints

- **Brand Guidelines:** Visual hierarchy changes must respect the existing
  brand palette, typography, and logo usage.
- **Accessibility (WCAG):** Increasing contrast for hierarchy must maintain
  minimum contrast ratios (4.5:1 for normal text) for readability.
- **Device Responsiveness:** The hierarchy must be re-validated for mobile,
  where the F-pattern often collapses into a simple vertical scan.

## Non-Goals

- Visual design system creation (color palettes, typography scales, component
  libraries) — this skill applies an existing design system, it doesn't build one.
- Copywriting or messaging strategy; this skill governs how content is
  arranged and weighted, not what it says.
- Accessibility auditing beyond contrast ratios (e.g., screen reader order,
  keyboard navigation), which requires a dedicated accessibility review.

## Common Failure Patterns

- **The "Wall of Text":** Uniform blocks of text with no H2s or bolding,
  causing users to abandon the page.
- **Visual Competition:** Multiple "Pop" colors or large images competing for
  attention simultaneously.
- **Burying the prize:** Placing the primary CTA at the bottom of a long page
  without "reminder" CTAs or a sticky header.
- **False Bottoms:** Using horizontal lines or large blocks of color that
  make it look like the page has ended, stopping the scroll.

## Validation Criteria

- [ ] **Squint Test Success:** The primary CTA is clearly visible when
  blurred.
- [ ] **Headlines-Only Test:** The page makes sense and is persuasive if you
  ONLY read the H1 and H2s.
- [ ] **Click-Through Rate (CTR) Lift:** Measure the increase in clicks on
  the primary CTA after refining the hierarchy.
- [ ] **Scroll Depth:** Measure whether users scroll further down the page
  after implementing a "Layer-cake" or "Directional" layout.
- [ ] **First-Click Test:** In user testing, measure how many seconds it
  takes for a user to identify the primary action.
