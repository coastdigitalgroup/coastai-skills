---
name: accessible-toast-implementation
description:
  Implement and debug accessible, non-blocking notification systems (Toasts)
  using ARIA live regions, focus management, and WCAG-compliant timing.
---

# Accessible Toast Implementation

## Purpose

The Accessible Toast Implementation skill provides a technical protocol for
building and auditing notification systems that provide feedback about
asynchronous actions (e.g., "Message Sent", "File Deleted") without interrupting
the user's current task. It focuses on ensuring these transient messages are
perceivable by assistive technologies and comply with timing requirements.

## Use Cases

- Providing success/error feedback after a form submission.
- Notifying users of background event completions (e.g., "Export Ready").
- Displaying system-level status changes (e.g., "Connection Restored").
- Auditing existing toast libraries for accessibility gaps (e.g., missing
  announcements or unreachable buttons).

## When NOT to Use

- **Critical Errors:** If the user must take immediate action to resolve a
  problem, use an `accessible-modal-dialog` or `alertdialog`.
- **Primary Information:** Critical content should be part of the page flow,
  not a transient overlay.
- **Complex Interactions:** Do not put complex forms or multiple interactive
  elements inside a toast. If it requires more than one simple action (like
  "Undo"), use a more persistent UI pattern.
- **On-Page Status Changes:** If a specific element changes state (e.g., a
  single checkbox), use localized ARIA attributes (`aria-expanded`,
  `aria-checked`) rather than a global toast.

## Inputs

1. **Message Content:** The text to be displayed (should be concise).
2. **Status Level:** Categorization (Success, Info, Warning, Error).
3. **Action Requirements:** Does the toast need an action button (e.g., "Undo")?
4. **Context:** Is the notification triggered by a user action or an external
   system event?

## Outputs

1. **Live Region Container:** A persistent or dynamically managed element with
   `role="status"` or `role="alert"`.
2. **Toast Component Markup:** Semantic HTML for the individual notification.
3. **Manager Logic:** JavaScript to handle queueing, timing, and cleanup of
   multiple toasts.
4. **Accessibility Metadata:** Correct usage of `aria-live`, `aria-atomic`, and
   focus management.

## Workflow

### 1. Establish the Live Region

- Create a persistent container in the DOM (usually near the end of `<body>`).
- For standard notifications, use `role="status"` (equivalent to
  `aria-live="polite"` and `aria-atomic="true"`).
- For urgent but non-blocking errors, use `role="alert"` (equivalent to
  `aria-live="assertive"`).

### 2. Implement the Toast Component

- Use a `<div>` or `<li>` (if using a list for multiple toasts).
- Include a "Dismiss" button for every toast.
- Ensure the toast has high visual contrast and an icon (optional but
  recommended) that reinforces the status level.

### 3. Handle Timing and Dismissal

- **Default Duration:** 5–10 seconds is standard.
- **WCAG Compliance (2.2.1):** Ensure the user can extend the time, or that the
  toast is "persistent" until dismissed if it contains important interaction.
- **Pause on Hover/Focus:** Always stop the auto-dismiss timer when the user
  hovers over or focuses the toast.

### 4. Manage Focus (for Interactive Toasts)

- Toasts should generally NOT steal focus upon appearing.
- If a toast contains an action (e.g., "Undo"), ensure it is reachable via the
  keyboard.
- _Advanced Pattern:_ Provide a global keyboard shortcut (e.g., `F8`) to move
  focus directly to the active toast.

### 5. Stacking and Queueing Logic

- Ensure new toasts don't visually cover previous ones unless intended.
- Use a "First-In, First-Out" (FIFO) queue if many notifications arrive
  simultaneously.
- Limit the maximum number of visible toasts (e.g., 3) to avoid overwhelming the
  viewport.

## Decision Rules

- **Polite vs. Assertive:** Use `role="status"` (polite) for 95% of cases. Use
  `role="alert"` (assertive) only for critical status changes that require
  immediate awareness but not an immediate stop of work.
- **Auto-dismiss vs. Manual:** Auto-dismiss is for purely informational
  feedback. If a toast contains an action button (like "Undo"), it should
  ideally remain visible until the user interacts with it or the action expires.
- **Placement:** Bottom-right is standard for desktop; top-center or bottom-center is
  preferred for mobile for better visibility.

## Constraints

- **Screen Reader Conflict:** Avoid making the entire toast container
  `aria-live`. Only the *content* being added should trigger the announcement.
- **Animation:** Use high-performance CSS transitions (transform/opacity).
  Animations must respect `prefers-reduced-motion`.
- **Z-Index:** Toasts must sit above all other UI elements except perhaps
  critical modals.

## Non-Goals

- Styling the specific look and feel (beyond contrast/visibility).
- Implementing a full backend notification service or database.
- Handling persistent "Notification Center" UI (this skill is for transient
  toasts).

## Common Failure Patterns

- **The "Silent" Toast:** Displaying a visual message but not using an ARIA
  live region, leaving screen reader users unaware of the outcome.
- **Too Fast to Read:** Dismissing the toast before a user can read it,
  especially for slow readers or those using translation tools.
- **Unreachable Actions:** Putting an "Undo" button in a toast that disappears
  before a keyboard user can `Tab` to it.
- **The "Overload" Pattern:** Triggering dozens of toasts at once, causing
  the screen reader to "chatter" or visual clutter.
- **Lack of Contrast:** Using light green text on a white background for
  success messages, failing WCAG contrast requirements.

## Validation Criteria

- [ ] **Screen Reader Test:** Verify the message is announced automatically when
      it appears.
- [ ] **Keyboard Test:** Verify that if the toast has an action, it can be
      reached via `Tab`.
- [ ] **Timer Pause Test:** Verify the dismissal timer stops when the mouse is
      over the toast.
- [ ] **Reduced Motion Test:** Verify that entry/exit animations are disabled or
      simplified if the user has "Reduced Motion" enabled.
- [ ] **Stacking Check:** Verify that multiple toasts do not overlap in a way
      that obscures content.
- [ ] **Contrast Check:** Verify that text and icons meet the 4.5:1 (text) or
      3:1 (graphics) contrast ratios.
