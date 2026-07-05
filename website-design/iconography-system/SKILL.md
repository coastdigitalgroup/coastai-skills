---
name: iconography-system
description:
  Design and implement a systematic iconography framework that ensures visual
  consistency, semantic clarity, and technical accessibility across a website.
---

# Iconography System

## Purpose

The Iconography System skill provides a methodology for selecting, sizing, and
implementing icons as functional UI elements. It moves beyond "choosing pretty
pictures" to a structured system that ensures icons are used consistently to
reduce cognitive load, reinforce brand identity, and remain fully accessible to
all users. A robust iconography system ensures that icons serve as clear
signposts rather than visual clutter.

## Use Cases

- Defining the icon style (outline, filled, duo-tone) for a new website.
- Establishing standard sizing and spacing scales for icons in different
  contexts (buttons, navigation, feature grids).
- Auditing a website for "icon bloat" or inconsistent visual metaphors.
- Implementing an accessible SVG or icon font workflow for developers.
- Selecting icons that align with specific brand attributes (e.g., "friendly"
  rounded icons vs. "technical" sharp-edged icons).

## When NOT to Use

- **Illustrations and Hero Graphics:** Large, complex narrative images that
  convey a story rather than a single functional concept. Use general layout or
  hero optimization skills instead.
- **Logos and Branding:** The primary brand identity usually has its own
  non-negotiable rules; icons support the UI, they don't replace the brand logo.
- **Purely Decorative Background Patterns:** When icons are used as wallpaper
  without semantic meaning.

## Inputs

1. **Brand Voice & Style:** Is the brand minimal, technical, playful, or
   corporate?
2. **Technical Environment:** Is the site built with a framework that prefers
   SVG components, sprites, or icon fonts?
3. **Usage Contexts:** Where will icons appear? (e.g., Primary Nav, CTA buttons,
   Feature lists, Dashboard status).
4. **Existing Design Tokens:** Fluid spacing and color systems to ensure
   alignment.

## Outputs

1. **Icon Style Guide:** Defined rules for stroke weight, corner radius, and
   fill types.
2. **Icon Sizing Scale:** A set of tokens (e.g., `icon-sm`, `icon-md`, `icon-lg`)
   mapped to specific pixel or rem values.
3. **Semantic Library:** A curated set of icons mapped to specific actions or
   concepts (e.g., "Chevron-down" for Dropdowns).
4. **Accessibility Specification:** Rules for ARIA labels, `role="img"`, and
   `aria-hidden` attributes.

## Workflow

### 1. Establish the Visual Metaphor

Choose icons that use universally understood symbols.

- **Search:** Magnifying glass.
- **Settings:** Cog or Sliders.
- **User:** Silhouette or Circle-user.
  Avoid "clever" metaphors that require users to guess the icon's meaning.

### 2. Define the Visual Style

Ensure all icons in the system share the same DNA:

- **Stroke Weight:** Use consistent line thickness (e.g., 2px for all 24px
  icons).
- **Corner Treatment:** Rounded corners feel more approachable; sharp corners
  feel more technical/precise.
- **Level of Detail:** Simplify icons as they get smaller to maintain legibility.

### 3. Build a Sizing and Spacing Scale

Apply the `fluid-spacing-system` to icon containers:

- **Small (16px):** Inline with text, breadcrumbs.
- **Medium (24px):** Standard buttons, primary navigation.
- **Large (48px+):** Feature cards, hero highlights.
- **Optical Centering:** Manually adjust icons that look off-center due to their
  shape (e.g., a "Play" triangle).

### 4. Implement Color and State Logic

Link icons to the `interactive-state-system`:

- **Active/Hover:** Icons should change color or weight alongside their
  parent element.
- **Semantic Color:** Use Red for delete/error icons, Green for success.
- **Contrast:** Icons must meet WCAG AA (3:1 for graphical objects).

### 5. Technical Delivery and Accessibility

- **SVG vs. Icon Font:** Prefer SVGs for better performance, accessibility, and
  rendering quality.
- **Aria Roles:**
  - If decorative: Use `aria-hidden="true"`.
  - If functional (e.g., an icon-only button): Use `role="img"` and a clear
    `aria-label`.

## Decision Rules

- **The "Label First" Rule:** Icons should almost always be accompanied by text
  labels. Only use "standalone" icons for universally recognized actions
  (Search, Close, Menu) and only if they have accessible labels.
- **Consistency over Variety:** Use one single icon library (e.g., Lucide, Heroicons)
  rather than mixing styles from multiple sources.
- **Stroke-Weight Scaling:** If an icon is scaled up, its stroke weight should
  ideally remain proportional to its size to maintain visual "weight" across
  the layout.
- **Optical Balance:** Not all icons are created equal. A square icon looks
  larger than a circular one of the same width. Use a "bounding box" approach but
  manually tweak the visual size for balance.

## Constraints

- **Accessibility:** Icons used as links or buttons MUST have a text alternative
  for screen readers.
- **Touch Targets:** Icons inside buttons must not reduce the hit area below
  24x24px (WCAG 2.2 SC 2.5.8 minimum); 44x44px is preferred for primary
  icon-only actions.
- **Responsiveness:** On small screens, icons may need to be simplified or
  removed if they crowd the text, though often they help mobile scanning.

## Common Failure Patterns

- **The "Mystery Meat" Icon:** Using an icon without a label that users don't
  recognize.
- **Inconsistent Weights:** Mixing a 1px outline icon with a 3px bold icon in
  the same row.
- **Over-Complexity:** Using icons with too many fine lines that "blur" or
  disappear on low-resolution screens or small sizes.
- **Missing Accessibility:** Using SVG icons without titles or ARIA labels,
  leaving screen reader users blind to the action.
- **Broken Optical Alignment:** A "Play" button that looks like it's sliding off
  the left side of its circle because it's mathematically centered but not
  optically centered.

## Validation Criteria

- [ ] All icons belong to a single, cohesive visual style.
- [ ] Icons have a defined sizing scale (e.g., 16, 24, 32, 48).
- [ ] Standalone icons (if any) have `aria-label` or equivalent text
      alternatives.
- [ ] Decorative icons are marked with `aria-hidden="true"`.
- [ ] Icons maintain a 3:1 contrast ratio against their background.
- [ ] Icon-only interactive elements meet the WCAG 2.2 24x24px touch target
      minimum (44x44px preferred).
- [ ] Visual metaphors are clear and standard (no "guessing").
