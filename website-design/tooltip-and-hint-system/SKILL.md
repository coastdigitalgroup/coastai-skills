---
name: tooltip-and-hint-system
description:
  Design and implement a systematic framework for contextual micro-help,
  managing triggers, content density, and placement to provide just-in-time
  guidance without cluttering the interface.
---

# Tooltip and Hint System

## Purpose

The Tooltip and Hint System provides a methodology for designing contextual
micro-help. It ensures that users receive the right amount of guidance exactly
when they need it, without overwhelming the primary interface with persistent
instructional text. This system establishes rules for **trigger mechanisms**,
**content hierarchy**, and **spatial positioning** to improve user confidence
and reduce errors in complex or unfamiliar environments.

## Use Cases

- **Explaining Abstract Icons:** Providing labels for icon-only buttons in
  toolbars or navigation rails.
- **Defining Technical Terms:** Offering tooltips for industry jargon or
  internal acronyms.
- **Complex Form Guidance:** Explaining the "Why" or "How" behind specific
  input requirements (e.g., "Why do we need your SSN?").
- **Feature Discovery:** Highlighting new or underutilized features with
  unobtrusive hints.
- **Data Point Precision:** Showing exact values on data visualization points
  (e.g., hover states in a line chart).

## When NOT to Use

- **Critical Information:** If the information is essential for completing a
  task safely or correctly, it should be persistent on the page, not hidden
  behind a tooltip.
- **Redundant Labels:** Do not use tooltips to repeat text that is already
  visible (e.g., a tooltip saying "Save" on a button labeled "Save").
- **Mobile-Only Workflows:** Since tooltips rely on hover, avoid using them as
  the *only* way to access critical info on touch devices. Use inline hints or
  modals instead.
- **Large Content Blocks:** If the explanation requires more than 2-3 sentences
  or complex formatting, use a Modal or a dedicated Help page.

## Inputs

1. **Trigger Element:** The UI element that the help is attached to (Button,
   Icon, Text Link, Input).
2. **Help Content:** The text or rich media to be displayed.
3. **Contextual Urgency:** Is this help requested (user-triggered) or
   suggested (system-triggered)?
4. **Interaction Mode:** Hover, Focus, Tap, or Persistent (inline).

## Outputs

1. **Pattern Selection:** A choice between a Tooltip (text-only), Infotip
   (rich content), or Inline Hint (persistent).
2. **Anatomy Spec:** Definition of the bubble/container, arrow/pointer, and
   internal content layout.
3. **Behavioral Logic:** Rules for appearance delay, disappearance, and
   collision detection (positioning).
4. **Accessibility Specification:** ARIA attributes (`aria-describedby` vs
   `aria-label`) and focus management.

## Workflow

### 1. Categorize the Help Type

Select the appropriate pattern based on the content and urgency:

- **Tooltip (Micro):** Short, text-only labels for icons or simple definitions.
  Non-interactive.
- **Infotip (Rich):** Contains text, images, or even small actions (e.g., a "Learn
  More" link). Usually triggered by a "Help" icon (?) or specific term.
- **Inline Hint:** Small, persistent text sitting directly below an input or
  heading. Best for "just-in-time" guidance that shouldn't be hidden.

### 2. Establish Trigger & Timing

Define how and when the help appears:
- **Hover Delay:** Tooltips should have a slight delay (300–500ms) before
  appearing to prevent visual "jitter" when moving the mouse across the page.
- **Focus Trigger:** Help MUST appear on keyboard focus to ensure parity
  with mouse hover.
- **Dismissal:** Help should disappear when the mouse leaves the trigger,
  the `Escape` key is pressed, or focus moves away.

### 3. Design the Spatial Positioning

Manage where the bubble appears relative to the trigger:
- **Preference:** Default to "Top-Center" to avoid obscuring content below.
- **Collision Detection:** If the tooltip would go off-screen, it should
  automatically flip to the opposite side (e.g., Top to Bottom).
- **The "Arrow" Anchor:** Use a small pointer (the arrow) to clearly link the
  bubble to its trigger element.

### 4. Optimize Content Density

Keep it micro:
- **Tooltips:** Max 120 characters. No formatting.
- **Infotips:** Max 250 characters. Simple bolding and a single link allowed.
- **Clarity:** Use active voice and direct instructions (e.g., "Upload a CSV
  file" instead of "CSV files can be uploaded here").

### 5. Plan for Touch Adaptation

Since hover doesn't exist on touch:
- **Tap-to-Toggle:** Infotips should open/close on tap.
- **Conversion to Inline:** For critical guidance, convert tooltips into
  persistent inline hints on small viewports.
- **Target Size:** Ensure the trigger (e.g., a (?) icon) is at least 24x24px
  (WCAG 2.2 2.5.8), preferred 44x44px.

## Decision Rules

- **The "Persistence" Rule:** If >50% of users will need to read the info every
  time, make it an **Inline Hint**. If <10%, make it a **Tooltip/Infotip**.
- **The "Interactive" Rule:** If the help bubble contains a link or button, it
  MUST be an **Infotip** (which allows the mouse to enter the bubble without it
  disappearing). Tooltips should never contain interactive elements.
- **Naming vs. Describing:** Use `aria-label` if the tooltip *is* the name of the
  element (e.g., icon button). Use `aria-describedby` if the tooltip provides
  *additional* description.
- **Pointer Logic:** Always include a visual arrow/pointer unless the trigger
  is an underline or a highlight that clearly defines the origin.

## Constraints

- **Accessibility:** Content must be readable by screen readers. Triggers must
  be keyboard focusable. Tooltips must follow WCAG 2.2 SC 1.4.13 (Content on
  Hover or Focus): it must be dismissible, hoverable (the mouse can move over the
  content), and persistent (it stays until the trigger is removed or user
  dismisses it).
- **Z-Index:** Tooltips must sit at the highest stacking level (System level,
  z-index 1000+) to ensure they aren't clipped by containers with
  `overflow: hidden`.
- **Contrast:** Bubble backgrounds and text must meet WCAG AA (4.5:1).

## Common Failure Patterns

- **The "Flicker" Trap:** No delay on hover, causing bubbles to pop in and out
  violently as the user moves the mouse.
- **Obscuring the Content:** Tooltips that cover the very thing they are
  explaining or the input field the user is typing in.
- **Hover-Only Logic:** Forgetting to show tooltips on keyboard focus,
  making them invisible to non-mouse users.
- **The "Deadly" Tooltip:** Hiding a critical error or a "destructive action"
  warning inside a tooltip.
- **Unreachable Content:** Using a tooltip for a link but not allowing the
  user to move their mouse into the tooltip to click it (fails WCAG 1.4.13).

## Validation Criteria

- [ ] Help content is categorized (Tooltip/Infotip/Inline) based on density
      and importance.
- [ ] Tooltips/Infotips appear on both Hover AND Keyboard Focus.
- [ ] Content is dismissible via the `Escape` key.
- [ ] Interactive help (Infotips) allows the mouse to move into the bubble
      without disappearing (WCAG 1.4.13).
- [ ] Collision detection is defined (bubble doesn't go off-screen).
- [ ] ARIA attributes (`aria-label` or `aria-describedby`) are correctly applied.
- [ ] Text contrast inside the bubble meets WCAG AA (4.5:1).
- [ ] Triggers meet the 24x24px (WCAG 2.2 2.5.8) minimum target size.
