---
name: tooltip-and-hint-system
description:
  Design a systematic framework for contextual micro-help, defining trigger
  mechanisms, content hierarchy, spatial positioning, and accessibility to
  reduce cognitive load and prevent user errors.
---

# Tooltip and Hint System

## Purpose

The Tooltip and Hint System provides a methodology for designing and
implementing non-intrusive contextual help. It ensures that users receive
clarification, definitions, or instructions at the precise moment of need
without cluttering the primary interface. This system balances "discovery" vs.
"utility," ensuring micro-help is findable but not distracting.

## Use Cases

- Defining technical terms or industry jargon within body copy (Definition Tooltip).
- Explaining why a specific field is required in a complex form (Inline Hint).
- Providing keyboard shortcuts for power-user features (Utility Tooltip).
- Guiding new users through a complex interface during onboarding (Coach Mark).
- Describing the function of icon-only buttons (Icon Label Tooltip).

## When NOT to Use

- **Critical Errors:** Use `error-and-status-system` or `banner-and-alert-system`
  for information the user *must* see to proceed.
- **Primary Information:** If the information is essential for all users, it
  should be part of the base layout, not hidden behind a hover/click.
- **Complex Content:** If the help requires more than two sentences, a video,
  or multiple links, use a dedicated help page or a `Drawer` from the
  `overlay-and-dialog-system`.
- **Primary Navigation:** Do not use tooltips to house essential navigation
  links.

## Inputs

1. **Content Type:** Is it a definition, an instruction, or a status?
2. **Trigger Importance:** How frequently will users need this help?
3. **Anchor Element:** What specific UI component triggers the help?
4. **Contextual Space:** How much room is available around the anchor across
   different viewports?

## Outputs

1. **Pattern Selection:** A choice between Tooltip (transient/hover), Hint
   (inline/persistent), or Coach Mark (onboarding/high-friction).
2. **Anatomy Spec:** Defined regions (Pointer/Arrow, Container, Content, Close
   action).
3. **Placement Rules:** Logic for where the help appears relative to the anchor
   (Top, Bottom, Left, Right).
4. **Accessibility Spec:** Interaction model (Hover, Focus, Click) and ARIA
   requirements.

## Workflow

### 1. Categorize the Micro-Help Pattern

Choose the pattern based on the user's need for persistence:

- **The Tooltip:** Transient, appearing on hover/focus. Best for short labels or
  quick definitions.
- **The Inline Hint:** Persistent, sitting near the target. Best for form field
  requirements or critical secondary info.
- **The Coach Mark:** High-prominence, often part of a sequence. Best for
  introducing new features.

### 2. Define the Trigger Mechanism

- **Mouse:** Hover (with a 250ms-500ms delay to prevent accidental triggers).
- **Keyboard:** Triggers on `:focus`.
- **Touch:** Triggers on tap. Note: Tooltips on touch often require a
  second tap to "dismiss" or a separate "Close" button.

### 3. Establish Spatial Positioning

Define the "Safety Zone":
- **Default:** Prefer **Top-Centered** as it doesn't obscure the content below
  the user's cursor.
- **Fallback:** If Top is blocked by the viewport edge, shift to Bottom, then
  Right, then Left.
- **Offset:** Maintain a consistent gap (e.g., 8px) between the anchor and the
  tooltip arrow.

### 4. Design the Visual Anatomy

- **Container:** High-contrast background (usually dark for light themes) with
  subtle shadows to indicate elevation.
- **The Pointer (Arrow):** Must clearly point to the center of the anchor.
- **Content:** Concise text. Use a smaller font size than the body copy but
  maintain a 4.5:1 contrast ratio.

### 5. Plan Responsive Adaptations

- **Touch Conversion:** On mobile, tooltips often become "Tap-to-view."
- **Full-Screen Fallback:** For very long hints, consider converting the
  tooltip into a bottom-sheet on mobile.

## Decision Rules

- **The "Two-Sentence" Rule:** If the content exceeds 140 characters, it's likely
  too complex for a tooltip. Use an inline hint or a link to documentation.
- **The "Hover-Intent" Rule:** Tooltips should not appear instantly. Use a
  slight delay (300ms) to ensure the user intended to hover over the item.
- **Icon-Only Buttons:** Every icon-only button MUST have a tooltip label for
  users who don't recognize the icon.
- **Persistent Hints:** Use inline hints for fields with strict validation
  (e.g., "Must include one special character") so the user can refer to them
  *while* typing.

## Constraints

- **Accessibility:** Tooltips must be triggerable by keyboard focus. Content
  must be dismissible with the `Escape` key. Use `aria-describedby` on the
  anchor pointing to the tooltip's ID. Tooltips must NOT disappear when the
  user moves their mouse from the anchor to the tooltip itself (WCAG 2.1 SC
  1.4.13 Content on Hover or Focus).
- **Contrast:** The tooltip container must be visually distinct from the anchor
  and the background.
- **Responsiveness:** Tooltips must never overflow the viewport. Use auto-flip
  logic (e.g., from top to bottom) if space is limited.

## Common Failure Patterns

- **The "Flicker" Trap:** Tooltips that appear and disappear rapidly as the user
  moves their mouse, caused by the tooltip itself blocking the hover trigger.
- **Mobile Mystery:** Relying on hover-only tooltips for mobile users, making
  information inaccessible.
- **Blocking Content:** Positioning a tooltip so it covers the very input or
  label the user is trying to understand.
- **No Keyboard Access:** Tooltips that only appear on mouse-over, excluding
  keyboard and screen reader users.

## Validation Criteria

- [ ] Every tooltip is triggerable by both Hover and Keyboard Focus.
- [ ] Content is concise (under 140 characters) or moved to an inline hint.
- [ ] Tooltips are dismissible via the `Escape` key.
- [ ] "Hover-intent" delay is implemented (approx 300ms).
- [ ] Tooltip positioning avoids viewport overflow and uses auto-flip logic.
- [ ] Accessibility: `aria-describedby` correctly links the anchor and content.
- [ ] Touch users have a clear way to trigger and dismiss contextual help.
