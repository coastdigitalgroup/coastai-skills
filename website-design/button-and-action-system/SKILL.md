---
name: button-and-action-system
description:
  Design and implement a systematic framework for buttons and interactive
  triggers, managing visual hierarchy, variant logic, and action grouping to
  ensure clear intent and accessible interaction.
---

# Button and Action System

## Purpose

The Button and Action System provides a methodology for designing the primary
drivers of user interaction. Buttons are the fundamental link between a user's
intent and a system's response. This system ensures that every action is
visually prioritized (Hierarchy), consistently styled (Cohesion), and easy to
interact with across all devices (Usability). It moves beyond "making a button"
to defining a logical framework for how different types of actions relate to
each other within a layout.

## Use Cases

- Defining a button component library for a design system.
- Establishing a hierarchy of actions in a Hero section or Page Header.
- Organizing groups of related actions (e.g., Save, Cancel, Delete).
- Designing specialized triggers like icon-only buttons or floating action
  buttons (FABs).
- Standardizing the relationship between button sizes and layout density.

## When NOT to Use

- **Global Navigation Links:** For moving between major site sections, use
  `site-navigation-system`.
- **In-Text Hyperlinks:** For links embedded within a paragraph of text that
  lead to more information, use standard typography treatments.
- **Purely Decorative Elements:** Do not use button styles for elements that
  cannot be clicked or tapped.
- **Complex Form Inputs:** For selecting options (Checkboxes, Radios, Selects),
  use `form-design-system`.

## Inputs

1. **Action Priority:** Is the task Primary (Level 1), Secondary (Level 2), or
   Tertiary (Level 3)?
2. **Action Gravity:** Is the action "Positive" (Submit), "Neutral" (Cancel), or
   "Destructive" (Delete)?
3. **Contextual Density:** Where does the button live? (e.g., a spacious Hero vs.
   a compact Data Table row).
4. **Brand Tokens:** Color palette, typography scale, and corner radius
   preferences.

## Outputs

1. **Button Variant Matrix:** Defined styles for Primary, Secondary, Ghost, and
   Danger variants.
2. **Sizing Scale:** A range of heights and paddings (e.g., Small, Medium,
   Large).
3. **Anatomy Spec:** Internal spacing rules for text, icons, and containers.
4. **Action Grouping Rules:** Guidelines for alignment, order, and spacing
   between multiple buttons.

## Workflow

### 1. Establish the Variant Hierarchy

Assign visual weights to buttons based on their importance to the user goal:

- **Primary (Level 1):** High-contrast, filled background. Usually the "main"
  goal of the page. Only one per view.
- **Secondary (Level 2):** Outlined or low-contrast background. Used for
  alternative or supporting actions.
- **Tertiary/Ghost (Level 3):** No background or border in its default state.
  Used for low-priority tasks or within dense UI (like tables).
- **Danger:** High-contrast color (usually Red). Used strictly for destructive,
  permanent actions.

### 2. Define the Sizing Scale

Map button dimensions to the layout context using the `fluid-spacing-system`:

- **Large (Hero/Landing):** Max prominence. High vertical padding.
- **Medium (Default):** The standard for forms, modals, and headers.
- **Small (Compact):** Used in sidebars, cards, and data tables where space is
  at a premium.

### 3. Design the Internal Anatomy

Standardize the structure of the button container:

- **Padding:** Maintain a consistent horizontal vs. vertical ratio (usually
  horizontal = 1.5x to 2x vertical).
- **Icon Integration:** Define the gap between an icon and text (e.g.,
  `--space-xs`).
- **Corner Radius:** Determine the "roundness" (Sharp, Rounded, or Pill) to
  match the brand's visual tone.

### 4. Create Button Groups

When placing multiple actions together, follow a logical order:

- **Order:** Place the Primary action in the "conclusion" position (Right on
  desktop, Top in a vertical mobile stack).
- **Spacing:** Use a consistent gap (e.g., `--space-s`) between buttons in a
  group.
- **Alignment:** Right-align actions in modals/headers; Left-align in forms;
  Center-align in Heroes.

### 5. Define Responsive Behavior

Ensure actions remain usable on all viewports:

- **Full-Width (Block) Buttons:** On mobile, small buttons often expand to fill
  the width of the container for easier thumb reach.
- **Icon-Only Fallback:** In extremely tight headers, text labels may be hidden
  in favor of icons (ensure `aria-label` is present).

## Decision Rules

- **The "One Primary" Rule:** There should only be one Primary (Level 1) button
  visible in any single viewport/context to avoid "choice paralysis."
- **Ghost vs. Link:** Use a Ghost button when the action is functional (e.g.,
  "Close," "Cancel"); use a text link when the action is navigational (e.g.,
  "Learn more about our policy").
- **Icon Placement:** Use a **leading icon** (Left) to clarify the action (e.g.,
  a Search icon); use a **trailing icon** (Right) to indicate direction (e.g.,
  an Arrow for "Next Step").
- **Contrast for Danger:** Destructive buttons must look significantly
  different from Primary buttons to prevent accidental clicks.

## Constraints

- **Accessibility:** Text must meet WCAG AA contrast (4.5:1). Interactive
  elements must have a clear `focus` state (see `interactive-state-system`).
- **Touch Targets:** All buttons must have a minimum interactive area of
  24x24px (WCAG 2.2 SC 2.5.8), even if the visual element is smaller; use
  44x44px as the comfortable default for primary actions and mobile layouts.
- **Truncation:** Button text should never truncate. If the label is too long,
  re-evaluate the copy or allow the button to wrap/expand.

## Common Failure Patterns

- **Button Soup:** Using 3-4 Primary buttons on one page, which dilutes the
  importance of the main CTA.
- **The "Grey Zone":** Making buttons look like disabled elements because they
  lack enough contrast or color.
- **Missing Interaction:** Failing to define `hover` or `active` states,
  leaving the user unsure if their click was registered.
- **Tiny Targets:** Designing small, text-only ghost buttons that are nearly
  impossible to hit on a mobile screen.
- **Confusing Alignment:** Mixing different button alignments in the same flow,
  forcing the user to "hunt" for the next action.

## Validation Criteria

- [ ] Every page/view has a clear Primary action.
- [ ] Button variants (Primary, Secondary, Ghost, Danger) are used consistently.
- [ ] Buttons meet the WCAG 2.2 24x24px minimum touch target (2.5.8), with
      44x44px used for primary and mobile actions.
- [ ] Visual hierarchy is maintained when buttons are grouped together.
- [ ] Focus states are distinct and high-contrast.
- [ ] Button labels are concise and use "Action Verbs" (e.g., "Save," "Create,"
      "Join").
- [ ] Mobile viewports use full-width buttons where appropriate for reachability.
