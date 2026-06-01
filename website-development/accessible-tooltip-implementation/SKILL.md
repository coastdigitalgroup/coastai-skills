---
name: accessible-tooltip-implementation
description:
  Implement and debug accessible tooltips that work across hover, focus, and
  touch interactions, ensuring they are correctly communicated to assistive
  technologies.
---

# Accessible Tooltip Implementation

## Purpose

The Accessible Tooltip Implementation skill provides a technical framework for
building non-interactive overlays that provide supplementary information about a
UI element. Tooltips are often implemented in ways that are invisible to screen
readers or impossible to trigger via keyboard; this skill ensures they meet WCAG
standards and provide a robust user experience.

## Use Cases

- Providing brief labels for icon-only buttons.
- Offering additional context or definitions for specific terms or UI labels.
- Displaying formatting requirements for form inputs.
- Auditing existing tooltip implementations for accessibility gaps.

## When NOT to Use

- **Interactive Content:** If the overlay contains links, buttons, or inputs,
  use a **Popover** or **Modal** instead. Tooltips should be plain text or
  non-interactive.
- **Critical Information:** Never put information essential for completing a
  task (like error messages) only in a tooltip.
- **Mobile Primary Navigation:** Do not use tooltips for primary discovery on
  mobile; use visible labels.

## Inputs

1. **Trigger Element:** The element (button, link, or abbreviation) that shows
   the tooltip.
2. **Tooltip Content:** The text or minimal markup to be displayed.
3. **Positioning Requirements:** Where the tooltip should appear relative to the
   trigger (top, bottom, left, right).

## Outputs

1. **Semantic HTML:** Correct use of `role="tooltip"` and `aria-describedby`.
2. **Interaction Logic:** CSS and/or JavaScript to handle visibility on hover
   and focus.
3. **Positioning Implementation:** CSS (Anchored) or JS (Dynamic) positioning
   logic.
4. **Accessibility Metadata:** Ensuring the link between the trigger and the
   content is programmatically established.

## Workflow

### 1. Establish the Programmatic Link

- Assign a unique `id` to the tooltip container.
- Add `aria-describedby="tooltip-id"` to the trigger element.
- Use `role="tooltip"` on the tooltip container itself.

### 2. Implement Visibility Triggers

- **Hover:** Use CSS `:hover` or JS `mouseenter`/`mouseleave` to show/hide.
- **Focus:** Use CSS `:focus-within` or `:focus` to ensure keyboard users see
  the tooltip.
- **Touch:** Tooltips on touch devices usually require a "tap to toggle"
  behavior or are better replaced by persistent text.

### 3. Handle Content Persistence (WCAG 2.2 SC 1.4.13)

- **Dismissible:** Provide a way to dismiss the tooltip without moving focus
  (usually via the `Escape` key).
- **Hoverable:** Ensure the user can move the mouse pointer _over_ the tooltip
  content itself without it disappearing.
- **Persistent:** The tooltip should remain visible until the hover/focus
  trigger is removed or the user dismisses it.

### 4. Manage Positioning and Overflow

- **CSS Anchoring:** For simple layouts, use absolute positioning relative to a
  `position: relative` parent.
- **Dynamic Positioning:** For complex layouts (scrollable containers, edge
  detection), use a library like Floating UI or the native Anchor Positioning
  API.
- **Safety:** Ensure the tooltip doesn't get cut off by `overflow: hidden` on
  parent containers.

## Decision Rules

- **aria-label vs aria-describedby:** Use `aria-label` (on the trigger) if the
  tooltip is the _only_ label for an icon. Use `aria-describedby` if the trigger
  already has a label and the tooltip provides _extra_ info.
- **CSS-only vs JS-enhanced:** Use CSS-only for simple text tooltips with fixed
  positions. Use JS for tooltips that need edge detection or "hover-over-content"
  persistence.
- **Delay:** Add a short delay (e.g., 300ms) before showing on hover to prevent
  "flicker" during rapid mouse movement.

## Constraints

- **Keyboard Accessibility:** Tooltips _must_ appear on keyboard focus.
- **No Hover-only:** Information must be available to users who cannot use a
  mouse.
- **Z-index:** Tooltips must sit above all other content except modals and
  toasts.

## Non-Goals

- Building complex "guided tours" or walkthroughs.
- Implementing rich HTML content inside tooltips (use popovers for that).
- Handling server-side rendering of tooltip content.

## Common Failure Patterns

- **Missing Focus Trigger:** Tooltips that only show on hover, making them
  invisible to keyboard users.
- **The "Mouse Chase":** Tooltips that disappear when you try to move the mouse
  over them, preventing users with low vision from zooming in on the content.
- **Overflow Clipping:** Tooltips hidden inside a container with
  `overflow: hidden`.
- **Silent Tooltips:** Tooltips not linked via `aria-describedby`, so screen
  readers never announce the extra information.
- **Timeout Dismissal:** Tooltips that disappear automatically after a few
  seconds, which violates accessibility for users who need more time to read.

## Validation Criteria

- [ ] **Keyboard Test:** Tab to the trigger. Does the tooltip appear?
- [ ] **Screen Reader Test:** Focus the trigger. Does the screen reader announce
      the tooltip text?
- [ ] **Escape Key Test:** Can you close the tooltip by pressing `Esc`?
- [ ] **Hover Test:** Move the mouse over the trigger, then _onto_ the tooltip.
      Does it stay visible?
- [ ] **Viewport Check:** Resize the window or scroll. Is the tooltip still
      visible and correctly positioned?
