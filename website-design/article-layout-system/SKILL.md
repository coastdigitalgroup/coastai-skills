---
name: article-layout-system
description:
  Design and implement a systematic framework for long-form content, managing
  readability, vertical rhythm, and information density to ensure a superior
  reading experience.
---

# Article Layout System

## Purpose

The Article Layout System provides a methodology for designing the "reading
experience"—the specific arrangement of text and supporting media for long-form
content like blogs, documentation, whitepapers, and case studies. While
`section-composition-system` handles page-level flow, this system focuses on
**readability**, **line length (measure)**, **vertical rhythm**, and the
**spatial relationship** between text and editorial elements (images, quotes,
code blocks). It ensures that users can consume large amounts of information
without visual fatigue.

## Use Cases

- Designing blog post templates and article pages.
- Structuring technical documentation and knowledge bases.
- Creating long-form editorial content or digital magazines.
- Developing "Reading Modes" or accessibility-focused text views.
- Organizing educational content where information retention is the goal.

## When NOT to Use

- **High-Impact Landing Pages:** Where the goal is scanning benefits and
  quick CTAs; use `section-composition-system`.
- **Dashboards:** Where data density and comparison are prioritized over
  linear reading; use `data-table-ui-system`.
- **Forms and Input-Heavy Views:** Use `form-design-system`.
- **Single-Viewport "App" Views:** Where content is secondary to functional
  tools.

## Inputs

1. **Content Archetype:** Is this a technical tutorial (code-heavy), a narrative
   story (image-heavy), or a formal whitepaper?
2. **Typography System:** The base font sizes and scales defined in
   `fluid-typography-system`.
3. **Reading Environment:** Will this be read mostly on mobile (distraction-free)
   or desktop (multi-column context)?
4. **Hierarchy Map:** The logical structure of the content (H1, H2, H3, Body,
   Captions).

## Outputs

1. **The "Golden Container" Spec:** Defined max-widths for text to ensure
   optimal line length.
2. **Vertical Rhythm Map:** A system of margins and paddings that creates
   predictable spacing between paragraphs and headings.
3. **Editorial Component Blueprint:** Visual rules for Pull Quotes, Asides,
   Media Callouts, and Table of Contents.
4. **Responsive Reading Map:** How font sizes and line heights adjust to
   maintain legibility on different screen widths.

## Workflow

### 1. Define the "Golden Container" (The Measure)

The most critical factor in readability is the number of characters per line:
- **Optimal Range:** 45 to 75 characters (including spaces).
- **Desktop Implementation:** Usually translates to a `max-width` between
  `600px` and `800px` (or `60ch` to `80ch`).
- **Centering:** Center the container to reduce eye-strain from wide head
  movements.

### 2. Establish Leading and Vertical Rhythm

Line height (leading) and spacing between blocks create "breathing room":
- **Base Leading:** Aim for 1.5 to 1.6 for body text. Increase for smaller or
  more complex fonts.
- **The "Spacing Ratio":** Use a consistent spacing system (e.g., 2x or 3x the
  base margin) for gaps before headings, and a smaller gap (e.g., 1x) after
  headings.
- **Paragraph Spacing:** Use bottom margins (`margin-bottom`) rather than
  indents to separate paragraphs in web layouts.

### 3. Design Editorial "Breaks"

Prevent "Wall of Text" fatigue by introducing visual variety:
- **Pull Quotes:** Larger, styled text that highlights key insights.
- **Asides/Callouts:** Distinctly styled boxes (often with a light background
  or border) for secondary information.
- **Images/Media:** Define rules for "Contained" (inline) vs. "Wide" (breaking
  the container width) vs. "Full-Bleed" media.

### 4. Build Navigation and Wayfinding

Help users manage long content:
- **Table of Contents (ToC):** For articles >1,000 words, provide a sticky ToC
  on desktop or a collapsible one on mobile.
- **Progress Indicator:** A subtle bar or percentage indicator to show how much
  content remains.
- **Reading Time:** Provide an estimated "X min read" at the top to set user
  expectations.

### 5. Plan Responsive Typography Shifts

Maintain legibility as the screen shrinks:
- **Mobile Comfort:** On small screens, reduce the horizontal padding but keep
  the line length comfortable.
- **Contrast Check:** Ensure that background-colored callouts or dark-mode
  switches maintain WCAG AA contrast.

## Decision Rules

- **The Character Rule:** If a line of text exceeds 80 characters, it's too
  wide. If it's less than 40, it's too narrow. Adjust the container.
- **Heading Proximity:** A heading should always be closer to the content it
  introduces than the content that precedes it (Proximity Principle).
- **Media Width Logic:** Use "Contained" images for technical details and
  "Wide" or "Full-Bleed" images for atmospheric or narrative shifts.
- **The "Squint" Test for Rhythm:** Squint at the page; you should see distinct
  "blocks" of text separated by clear, consistent whitespace.

## Constraints

- **Accessibility:** Text must meet WCAG AA (4.5:1) contrast. Font size should
  never be smaller than 16px (1rem) for body copy.
- **Responsiveness:** Containers must be fluid (use `max-width` instead of
  fixed `width`).
- **Hierarchy:** H1 must be the most prominent, but body text must be the
  most comfortable to read.

## Common Failure Patterns

- **The "Desktop Ocean":** Text that spans the full width of a 24-inch monitor,
  making it impossible for the eye to find the next line.
- **Suffocating Text:** Line height that is too tight (e.g., 1.1 or 1.2), causing
  ascenders and descenders to clash.
- **Floating Headings:** Headings with equal spacing above and below, making it
  unclear which section they belong to.
- **Inconsistent Media:** Mixing center-aligned, left-aligned, and wide images
  without a clear logical system.
- **The "Endless Scroll":** No wayfinding or progress indicators in a 5,000-word
  article, leading to user abandonment.

## Validation Criteria

- [ ] Line length (measure) is between 45 and 75 characters on desktop.
- [ ] Line height (leading) is at least 1.5 for body text.
- [ ] Vertical rhythm clearly groups headings with their following content.
- [ ] Editorial elements (quotes, callouts) are visually distinct from body text.
- [ ] Table of Contents or wayfinding is present for long-form content.
- [ ] Reading experience is tested and optimized for mobile viewports.
- [ ] Contrast ratios for all text meet WCAG AA standards.
