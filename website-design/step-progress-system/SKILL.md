---
name: step-progress-system
description:
  Design a framework for multi-step sequences and progress indicators that
  provide clear wayfinding, manage user expectations, and reduce abandonment in
  complex tasks.
---

# Step Progress System

## Purpose

The Step Progress System skill provides a methodology for designing linear and
non-linear multi-step processes. It ensures that users understand the scope of a
task, their current position within it, and the effort required to complete it.
By providing clear visual feedback and navigation, it reduces cognitive load and
mitigates the "are we there yet?" frustration that leads to drop-offs.

## Use Cases

- Designing multi-page checkout flows for e-commerce.
- Creating onboarding sequences for SaaS platforms.
- Structuring complex, multi-part forms (e.g., loan applications, tax filings).
- Implementing setup wizards for hardware or software configuration.
- Designing progress tracking for long-running background tasks.

## When NOT to Use

- **Single-Step Tasks:** If a task can be completed on one screen without
  scrolling or excessive complexity, a progress system adds unnecessary noise.
- **Indeterminate Wait Times:** For backend processes where the remaining time
  is unknown, use a loading spinner or indeterminate progress bar instead of a
  step-based system.
- **Branching Logic with Unknown Total Steps:** If the number of steps changes
  drastically based on user input, a traditional fixed-step indicator may be
  misleading.

## Inputs

1. **Task Map:** A breakdown of the entire process into logical, digestible
   steps.
2. **Step States:** Definitions for Pending, Active, Completed, and Error
   states.
3. **Linearity Requirements:** Whether the user must follow a strict order or
   can jump between steps.
4. **Platform/Viewport:** Mobile vs. Desktop constraints for indicator
   orientation.

## Outputs

1. **Progress Indicator Pattern:** Selection of Horizontal Stepper, Vertical
   Stepper, or Progress Bar.
2. **Step Taxonomy:** Clear, action-oriented labels for each stage.
3. **State Visualization Spec:** Visual definitions for how each step state is
   represented (color, icons, typography).
4. **Navigation Logic:** Defined rules for "Back," "Next," and "Save & Exit"
   actions.

## Workflow

### 1. Group and Chunk Content

Divide the total task into 3–5 logical chunks. If a process has more than 5
steps, consider if some can be combined or if the task is too complex for a
single flow.

### 2. Choose the Progress Pattern

- **Horizontal Stepper:** Best for desktop with 3–5 steps. Provides a clear
  sense of "beginning-to-end."
- **Vertical Stepper:** Best for mobile or sidebars with 5+ steps. Scales
  better for long labels.
- **Progress Bar:** Best for very long flows (10+ steps) where individual step
  names are less important than the overall percentage of completion.

### 3. Define the Visual States

Apply `interactive-state-system` principles to the steps:

- **Completed:** Use a "success" color (e.g., Green) or a checkmark icon.
- **Active:** High contrast and bold typography to indicate "You are here."
- **Pending/Inactive:** Low contrast or grayscale to indicate "Future work."
- **Error:** High-visibility color (e.g., Red) to indicate a blocker that must
  be addressed.

### 4. Establish Navigation and Persistence

- **Primary Action:** The "Next" button should always be the most prominent.
- **Secondary Action:** Provide a "Back" button to allow users to correct
  errors without losing data.
- **Auto-Save:** Ensure data is saved at the transition of every step to
  prevent loss if the user abandons or the session times out.

### 5. Design for Mobile Adaptation

- **Condensed View:** On mobile, horizontal steppers often become simple "Step 2
  of 5" text indicators to save space.
- **Sticky Navigation:** Consider a sticky footer for "Back/Next" buttons to
  ensure they are always reachable.

## Decision Rules

- **The "3-5 Step" Rule:** Aim for 3 to 5 steps. Fewer feels trivial; more feels
  daunting.
- **Labeling:** Use short, noun-based labels (e.g., "Shipping," "Payment,"
  "Review") rather than long sentences.
- **Clickable Steps:** Only make steps clickable if the user is allowed to jump
  back and forth. In strict linear flows, steps should be indicators only.
- **Completion Gratification:** Always include a "Success/Confirmation" screen
  at the end of the flow that is distinct from the final step.

## Constraints

- **Accessibility:** Use `aria-current="step"` on the active step. Ensure labels
  are descriptive for screen readers. Contrast for all states must meet WCAG AA.
- **Responsiveness:** Horizontal steppers must not overflow. Transition to a
  vertical layout or a simplified numeric indicator on small screens.
- **Visual Hierarchy:** The current step must be the most visually distinct
  element in the progress indicator.

## Common Failure Patterns

- **The "Dead End" Stepper:** A progress indicator that isn't clickable, but
  the user has no other way to go back (no "Back" button).
- **Label Overlap:** Using horizontal steppers with long labels on small
  screens, causing text to truncate or overlap.
- **Mismatching Progress:** Showing "Step 3" but the URL or Page Title says
  something else.
- **Hidden Requirements:** Progressing to a new step only to find out you missed
  a field on a previous step without clear error indication on the stepper
  itself.

## Validation Criteria

- [ ] Progress indicator clearly shows "You are here," "What's done," and
      "What's left."
- [ ] Steps are logically grouped and have concise, accurate labels.
- [ ] Mobile view handles the indicator gracefully (no overflow).
- [ ] Navigation (Back/Next) is consistent and maintains visual hierarchy.
- [ ] All step states (Completed, Active, Pending, Error) are visually distinct.
- [ ] Accessibility markers (`aria-current`, `aria-label`) are present.
- [ ] A final "Confirmation" screen is defined outside the step sequence.
