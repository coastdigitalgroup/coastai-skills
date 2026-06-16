---
name: button-ui-system
description:
  Design and implement a systematic framework for action triggers, managing
  visual hierarchy, semantic states, and accessible interactions to ensure clear
  intent and consistent behavior.
---

# Button UI System

## Purpose

The Button UI System provides a methodology for designing and organizing action
triggers—the primary way users interact with and move through a website. It
ensures that buttons are visually prioritized based on their importance,
maintain consistent behavior across different states (hover, focus, disabled),
and provide clear affordances that distinguish them from static content or
navigation links. A systematic approach to buttons reduces cognitive load and
guides users toward desired conversion goals.

## Use Cases

- Defining a primary, secondary, and tertiary action hierarchy for a UI library.
- Designing high-conversion Call-to-Action (CTA) buttons for landing pages.
- Establishing consistent button styles for forms, modals, and toolbars.
- Auditing a website for "action clutter" where too many buttons compete for
  attention.
- Implementing accessible button patterns that meet WCAG 2.1 requirements.

## When NOT to Use

- **External Navigation:** Use standard text links for moving to a different
  website or a purely informational page where no "action" is performed.
- **Deep Hierarchical Navigation:** Use `site-navigation-system` for main menu
  structures.
- **Status Indicators:** Use `badge-and-tag-system` for non-interactive
  information.
- **Complex UI Layers:** Use `overlay-and-dialog-system` to manage the
  containers that buttons might live within.

## Inputs

1. **Action Priority:** Which actions are Primary (Level 1), Secondary
   (Level 2), or Tertiary (Level 3)?
2. **Brand Palette:** Primary and accent colors to define button styles.
3. **Typography Scale:** Established font sizes for button labels.
4. **Context of Use:** Is the button on a dark background, inside a dense table,
   or part of a large hero section?
5. **Interactive Requirements:** Does the action lead to a new page, open a
   modal, or trigger a background process (e.g., "Save")?

## Outputs

1. **Button Anatomy Spec:** Defined properties for padding, border-radius,
   label typography, and icon placement.
2. **Action Hierarchy Map:** Visual definitions for Primary, Secondary, Ghost,
   and Danger button variants.
3. **State Matrix:** Visual treatments for Default, Hover, Focus, Active,
   Loading, and Disabled states.
4. **Size System:** Standardized dimensions (e.g., Small, Medium, Large) for
   different layout contexts.

## Workflow

### 1. Define the Visual Anatomy

Establish the "physical" properties that make an element look like a button:
- **Shape:** Define the border-radius (e.g., Square, Rounded 4px, or Pill).
- **Padding:** Set consistent horizontal and vertical breathing room (e.g.,
  `--space-s` vertical, `--space-m` horizontal).
- **Label:** Use semibold or bold typography to distinguish the label from body
  text.
- **Icons:** Determine if icons are placed on the left (supporting) or right
  (directional/action).

### 2. Establish the Action Hierarchy

Categorize buttons based on their importance to the user's task:
- **Primary (Level 1):** Solid fill, high-contrast. The "one thing" you want
  them to do.
- **Secondary (Level 2):** Outlined or subtle background. For supporting
  actions that aren't the main goal.
- **Tertiary/Ghost (Level 3):** No background or border in default state. For
  low-priority or repetitive actions (e.g., "Cancel").
- **Semantic (Danger):** Usually red. For destructive actions like "Delete."

### 3. Design the State Palette

Apply the `interactive-state-system` to the button system:
- **Hover:** Subtle darken/lighten or elevation change.
- **Focus:** High-contrast ring (3:1 contrast) for keyboard navigation.
- **Active:** A visual "press" (slight scale down or darker shade).
- **Disabled:** Muted colors and `not-allowed` cursor.
- **Loading:** Replace text or add a spinner to prevent double-clicks during
  processing.

### 4. Create a Sizing Scale

Map button sizes to usage contexts:
- **Large (56px+):** Hero sections, main landing page CTAs.
- **Medium (44px-48px):** Standard forms, modal actions.
- **Small (32px-36px):** Toolbars, card actions, dense dashboards.

### 5. Define Icon Logic

- **Leading Icon:** Provides context (e.g., a magnifying glass for "Search").
- **Trailing Icon:** Indicates direction or completion (e.g., an arrow for
  "Next" or a check for "Submit").
- **Icon-Only:** Must include a tooltip or `aria-label` for accessibility.

## Decision Rules

- **The "One Primary" Rule:** There should only be one Primary button visible in
  a single view or component (e.g., one per modal, one per hero).
- **Button vs. Link:** If it triggers a functional change (Submit, Open, Save),
  use a `<button>`. If it navigates the user to a new URL, use an `<a>` styled
  as a button.
- **Verb-First Labels:** Button text should always start with an action verb
  (e.g., "Start," "Download," "Create") to clarify intent.
- **Proximity:** Group related buttons (e.g., Cancel and Save) using small,
  consistent gaps (`--space-s`).
- **Placement:** On desktop, primary actions usually sit on the right in
  horizontal groups. On mobile, they often span the full width.

## Constraints

- **Accessibility:** All buttons must have a minimum contrast ratio of 4.5:1 for
  text labels. Tap targets must be at least 44x44px.
- **Responsiveness:** Buttons should never have fixed pixel widths that cause
  them to overflow their container. Use `width: 100%` on mobile where
  appropriate.
- **Focus Indicators:** Never remove the default focus ring without providing a
  custom, high-contrast alternative.

## Common Failure Patterns

- **The "Twin Primary":** Using two solid-filled buttons of the same color next
  to each other, confusing the user about which is the main action.
- **Vague Labels:** Using "Submit" or "Click Here" instead of benefit-driven
  language like "Get My Free Quote."
- **Inconsistent Radius:** Mixing pill-shaped buttons and square buttons in the
  same interface.
- **The "Invisible" Active State:** Buttons that don't change when clicked,
  leading users to believe the site is frozen.
- **Label Clipping:** Not allowing enough padding for buttons, causing long
  labels in other languages to touch the edges.

## Validation Criteria

- [ ] Every view has a clear hierarchy with only one Primary action.
- [ ] Button labels start with an action-oriented verb.
- [ ] All states (Hover, Focus, Active, Disabled) are defined and accessible.
- [ ] Touch targets meet the 44x44px minimum.
- [ ] Text contrast meets WCAG AA (4.5:1).
- [ ] Semantic buttons (Danger) are visually distinct from the Primary action.
- [ ] Layout handles long labels gracefully without breaking the button shape.
