---
name: step-progress-system
description:
  Design and implement structured progress indicators and multi-step sequences
  that guide users through complex tasks, providing clear feedback on their
  current position and remaining effort.
---

# Step & Progress System

## Purpose

The Step & Progress System skill provides a methodology for designing and
documenting how users move through multi-step processes or wait for background
tasks. It ensures that complex workflows (like checkouts or onboarding) are
broken down into manageable chunks, reducing cognitive load by communicating
where the user is, what they have completed, and what is left to do.

## Use Cases

- **E-commerce Checkouts:** Guiding users through shipping, payment, and review.
- **Multi-step Forms:** Breaking long data-entry tasks into logical sections.
- **User Onboarding:** Visualizing the setup process for a new account.
- **Loading/Upload States:** Communicating the status of long-running operations.
- **Learning Pathways:** Showing progress through a course or curriculum.

## When NOT to Use

- **Single-View Tasks:** If a task can be completed in one view without context
  switching, a progress system adds unnecessary noise.
- **Infinite Feeds:** Scrolling through content where there is no defined "end"
  to the progress.
- **Critical High-Speed Interactions:** Where the delay of showing progress
  indicators would hinder a time-sensitive task (e.g., real-time gaming UI).

## Inputs

1. **Step Inventory:** A list of the discrete stages required to complete the
   task.
2. **Task Type:** Is it a user-driven sequence (Steppers) or a system-driven
   process (Progress Bars)?
3. **Linearity:** Must the steps be completed in order, or can the user jump
   between them?
4. **Content Constraints:** Labels, descriptions, and icons for each step.

## Outputs

1. **Progress Framework:** A definition of the component type (Horizontal,
   Vertical, or Circular).
2. **State Matrix:** Visual specs for Pending, Active, Completed, and Error
   states.
3. **Responsive Strategy:** How the indicator adapts to mobile viewports
   (e.g., hiding labels, switching to numeric).
4. **Accessibility Specs:** ARIA roles, live regions, and keyboard interaction
   rules.

## Workflow

### 1. Categorize the Progress Type

Determine the most appropriate visual pattern:

- **Horizontal Stepper:** Best for linear processes with 3–5 steps on desktop.
- **Vertical Stepper:** Best for non-linear processes, steps with varying
  content lengths, or mobile-first flows.
- **Continuous Progress Bar:** Best for system-driven tasks (uploads, loading)
  or processes with a high number of micro-steps.
- **Progress Circle:** Best for dashboard widgets or when space is extremely
  limited.

### 2. Define Step Hierarchy and Labels

- **Primary Label:** Concise name of the step (e.g., "Shipping").
- **Secondary Label (Optional):** Short description or status (e.g., "In
  Progress").
- **Visual Indicator:** Numbers (for order), Icons (for context), or Dots (for
  minimalist design).

### 3. Establish State Visualization

Define clear visual distinctions for each state:

- **Pending:** Low contrast, typically greyed out.
- **Active:** High contrast, often using the primary brand color or a "glow"
  effect.
- **Completed:** Use a "check" icon and a distinct color (often green or a muted
  version of the active color).
- **Error:** Use a "warning" icon and a semantic error color (red).

### 4. Design for Movement and Feedback

- **Transitions:** Use subtle animations when moving between steps to reinforce
  progression.
- **Clickability:** Determine if users can click previous steps to go back.
- **Validation:** Visualizing that a step is valid/complete before allowing
  progression.

### 5. Plan Responsive Adaptations

Multi-step indicators are notorious for breaking on mobile:

- **Label Paring:** On mobile, hide text labels and show only numbers or icons.
- **Transition to "Step X of Y":** Replace the full visual bar with a simple
  textual or numeric summary.
- **Vertical Shift:** Convert horizontal bars to vertical lists on small
  screens.

## Decision Rules

- **The 5-Step Rule:** If a horizontal stepper has more than 5 steps, switch to
  a vertical stepper or a simple "Step X of Y" text indicator to avoid clutter.
- **Icon vs. Number:** Use numbers if the sequence order is critical; use icons
  only if they provide immediate semantic value (e.g., a "Credit Card" icon for
  payment).
- **Linearity:** If users must complete steps in order, disable clicks on
  "future" steps. If it's a flexible setup, allow jumping.
- **Context Preservation:** Always show the labels of the *current*, *previous*,
  and *next* step. Others can be truncated if necessary.

## Constraints

- **Accessibility:**
  - Use `role="progressbar"` for continuous bars.
  - Use `aria-current="step"` to identify the active step in a sequence.
  - Ensure contrast ratios for active vs. inactive steps meet WCAG AA (4.5:1).
- **Hierarchy:** The progress indicator should be a guide, not the main focus.
  It usually sits at the top (horizontal) or left (vertical) of the content.
- **Responsiveness:** Must not cause horizontal overflow.

## Common Failure Patterns

- **The "Mystery Progress":** Showing a bar without a label or percentage,
  leaving the user wondering "how much longer?"
- **Inaccessible States:** Using only color (e.g., green vs. grey) to indicate
  completion without icons or text.
- **Crowded Horizontals:** Forcing too many steps into a horizontal layout,
  causing overlapping text or tiny tap targets on mobile.
- **Lack of Persistence:** Hiding the progress indicator on some pages of a
  multi-step flow, causing users to lose their sense of place.

## Validation Criteria

- [ ] Current step is clearly distinguished from completed and upcoming steps.
- [ ] Completed steps use a non-color indicator (like a checkmark).
- [ ] Mobile view is functional and does not overflow or clutter.
- [ ] ARIA roles and `aria-current` are correctly applied.
- [ ] The system handles "Error" states for individual steps.
- [ ] The indicator is consistently placed across all steps of the flow.
