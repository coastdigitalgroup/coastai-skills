---
name: form-design-system
description:
  Design and document a systematic framework for form interfaces, defining
  anatomy, spatial organization, and visual affordances to ensure consistency,
  usability, and accessibility.
---

# Form Design System

## Purpose

The Form Design System skill provides a methodology for designing the visual and
spatial framework of web forms. While technical implementation handles the "how"
and growth optimization handles the "why," the design system defines the "what"
and "where." It ensures that form elements—labels, inputs, choices, and
actions—are organized into a predictable, accessible, and high-trust interface
that reduces cognitive load and prevents user error.

## Use Cases

- Designing a UI kit or design system component library for forms.
- Establishing visual standards for complex, multi-step data entry interfaces.
- Auditing existing forms for visual inconsistency or spatial friction.
- Designing responsive form layouts that maintain hierarchy across devices.
- Standardizing error and validation visualization patterns.

## When NOT to Use

- **Generic Search Bars:** Simple, single-input search fields rarely need the
  full design system treatment.
- **Experimental Interactive Media:** Where the form-like interaction is
  secondary to a narrative or artistic experience.
- **Low-Stakes Micro-interactions:** Like a "Thumbs Up/Down" or a simple toggle
  without accompanying data entry.

## Inputs

1. **Information Anatomy:** The specific data points to be collected and their
   relationships.
2. **Device Breakpoints:** Responsive requirements from the
   `responsive-grid-system`.
3. **Brand Styles:** Typography scales, color palettes, and spacing tokens (from
   `fluid-spacing-system`).
4. **Interaction Requirements:** Whether the form requires real-time validation,
   file uploads, or complex choice selections.

## Outputs

1. **Input Anatomy Spec:** Visual definitions for labels, inputs, help text,
   icons, and error messages.
2. **Layout Blueprint:** Spatial rules for field grouping, alignment (top vs.
   left), and action placement.
3. **Choice Component Map:** Definitions for when to use Radio, Checkbox,
   Switch, or Select.
4. **Feedback & State Matrix:** Visual treatments for Hover, Focus, Disabled,
   Success, and Error states.

## Workflow

### 1. Define the Component Anatomy

Establish a consistent structure for every "Field Group." A field should consist
of:

- **The Label:** Clear, concise text identifying the field.
- **The Input:** The interactive container (text, select, etc.).
- **Helper/Instructional Text:** Persistent guidance (e.g., "Password must be 8
  characters").
- **Error Message:** Contextual feedback that appears only when validation
  fails.

### 2. Establish Spatial Layout and Alignment

Determine the relationship between labels and inputs:

- **Top-Aligned Labels (Recommended):** Best for scannability and mobile
  responsiveness.
- **Left-Aligned Labels:** Only for data-heavy desktop interfaces where vertical
  space is critical.
- **Grouping:** Use logical spacing (e.g., `--space-l`) between groups and
  smaller spacing (e.g., `--space-s`) within groups.

### 3. Select Interaction Patterns

Assign UI patterns to data types:

- **Binary Choices:** Use Checkboxes for "Yes/No" or multiple-select.
- **Mutual Exclusivity:** Use Radio buttons for 2–5 options; use Select for 6+
  options.
- **Immediate Toggles:** Use Switches for settings that take effect immediately
  without a "Submit" action.

### 4. Design the Feedback Loop

Create a visual hierarchy for validation:

- **Focus State:** Use a high-contrast ring to indicate the active field.
- **Error State:** Use color (usually Red), icons, and border thickness to
  signal errors.
- **Success State:** Use subtle cues (like a green checkmark) for high-stakes
  fields (e.g., Username availability).

### 5. Plan Responsive Adaptations

Map how the form survives smaller viewports:

- **Stacking:** Multi-column layouts on desktop must stack into a single column
  on mobile.
- **Touch Targets:** Ensure all interactive zones (radios, checkboxes, buttons)
  are at least 24x24px (WCAG 2.2 SC 2.5.8 minimum); 44x44px is preferred and
  should be the default for primary submit actions.

## Decision Rules

- **The Single Column Rule:** Use a single-column layout for the majority of
  forms to maintain a clear vertical scan path and reduce eye-tracking fatigue.
- **Label Alignment:** Default to top-aligned labels. They reduce the number of
  eye fixations required to process the form.
- **Placeholders vs. Labels:** Never use placeholders as labels. Labels must
  remain visible even after the user starts typing.
- **Button Hierarchy:** The primary "Submit" action should be the most visually
  prominent. Secondary actions (e.g., "Cancel") should be text links or
  low-contrast buttons.
- **Proximity:** Place helper text and error messages as close to the input as
  possible (usually directly below).

## Constraints

- **Accessibility:** Labels must be programmatically linked to inputs (`<label
  for>` or wrapping). Contrast ratios for text and borders must meet WCAG AA
  (4.5:1 for text, 3:1 for UI components). Error messages must be
  programmatically associated with their input via `aria-describedby`, and
  invalid fields must set `aria-invalid="true"`. Focus indicators must not be
  hidden behind sticky headers, toasts, or overlays (WCAG 2.4.11 Focus Not
  Obscured).
- **Responsiveness:** Form fields must never overflow their container or have
  fixed widths that exceed mobile viewports.
- **Visual Hierarchy:** Error messages must be visually distinct from helper
  text to ensure they aren't missed.

## Common Failure Patterns

- **The "Placeholder Label" Trap:** Using placeholders instead of labels,
  causing users to lose context as they type.
- **Overwhelming Columns:** Using multi-column layouts that confuse the user's
  natural top-to-bottom scan path.
- **Vague Errors:** Visualizing an error with color alone (e.g., just turning
  the border red) without an icon or text message.
- **Small Touch Targets:** Designing radios or checkboxes that are too small for
  thumb interaction on mobile.
- **The "Invisible" Focus:** Failing to provide a clear focus ring, making
  navigation impossible for keyboard users.

## Validation Criteria

- [ ] Every input has a persistent, visible label.
- [ ] Form follows a logical, single-column vertical scan path.
- [ ] Error states use a combination of color, icons, and text.
- [ ] Focus indicators are high-contrast and clearly visible.
- [ ] Interactive elements (inputs, buttons) meet the WCAG 2.2 24x24px touch
      target minimum (44x44px preferred).
- [ ] Layout transitions gracefully to a single column on mobile viewports.
- [ ] Primary, secondary, and tertiary actions have a clear visual hierarchy.
