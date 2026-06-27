---
name: copy-to-clipboard-implementation
description:
  Implement and debug accessible, robust copy-to-clipboard functionality using
  the modern Navigator Clipboard API and ARIA live regions for feedback.
---

# Copy-to-Clipboard Implementation

## Purpose

The Copy-to-Clipboard Implementation skill provides a technical protocol for
adding "Copy" functionality to websites. It ensures the implementation is
accessible, handles browser security constraints (like secure contexts and user
activation), and provides clear feedback to all users, including those using
assistive technologies.

## Use Cases

- Adding "Copy to Clipboard" buttons for code snippets or documentation.
- Implementing share links that copy a URL to the user's clipboard.
- Copying referral codes, discount codes, or cryptographic addresses.
- Improving the UX of long, hard-to-select strings by providing a one-click copy
  action.

## When NOT to Use

- **Sensitive Data:** Avoid auto-copying highly sensitive data without explicit
  user intent and clear visual confirmation.
- **Bulk Data:** For very large datasets, consider providing a "Download"
  option instead, as clipboard limits vary.
- **Legacy Browsers:** If targeting browsers that don't support
  `navigator.clipboard` and cannot be polyfilled, this modern approach may not
  work.

## Inputs

1. **Target Content:** The string or element content to be copied.
2. **Trigger Element:** The button or interactive element that initiates the
   copy.
3. **Feedback UI:** Visual (e.g., icon change, tooltip) and audible/screen
   reader (ARIA live region) feedback mechanisms.

## Outputs

1. **Secure Clipboard Script:** JavaScript using `navigator.clipboard.writeText()`
   with proper error handling.
2. **Accessible Trigger Markup:** Semantic `<button>` with appropriate ARIA
   attributes.
3. **Live Feedback Mechanism:** An `aria-live` region that announces success or
   failure.

## Workflow

### 1. Structure the Trigger and Feedback

- Use a `<button>` element for the copy trigger.
- Add an `aria-live="polite"` element (visually hidden or part of the UI) to
  handle announcements.
- Ensure the button has a clear label (e.g., `aria-label="Copy code to clipboard"`).

### 2. Implement the Clipboard Logic

- Use the modern `navigator.clipboard.writeText()` API.
- Wrap the call in a `try...catch` block to handle permissions or "Secure
  Context" errors.
- Always ensure the function is called within a "Transient User Activation"
  (e.g., inside a `click` event handler).

### 3. Manage Feedback States

- **Success:** Update the button UI (e.g., change "Copy" to "Copied!") and update
  the `aria-live` region.
- **Failure:** Provide a fallback or error message if the copy fails (e.g.,
  "Failed to copy. Please select and copy manually").
- **Reset:** After a short delay (e.g., 2000ms), reset the button UI to its
  original state.

### 4. Accessibility Best Practices

- Use `aria-describedby` to link the button to the content it copies if
  appropriate.
- Ensure the `aria-live` announcement is concise (e.g., "Copied").
- Maintain focus on the button after the click; do not move focus unless the UI
  significantly changes.

## Decision Rules

- **Navigator Clipboard vs. `execCommand('copy')`:** Always prefer
  `navigator.clipboard`. It is asynchronous, doesn't block the main thread, and
  is the modern standard. Only use `execCommand` as a legacy fallback if
  strictly required.
- **Success Duration:** Keep success feedback visible for 1.5 to 3 seconds. Any
  shorter might be missed; any longer might feel "stuck."
- **Permissions:** Be aware that some browsers may require explicit permission
  for clipboard access, though `writeText` usually only requires a secure
  context and user gesture.

## Constraints

- **Secure Context:** The Clipboard API only works in Secure Contexts (HTTPS or
  localhost).
- **User Activation:** Clipboard writes must be triggered by a user action
  (click, keypress).
- **Browser Support:** Most modern browsers support `navigator.clipboard`, but
  check for its existence before calling.

## Non-Goals

- Implementing "Paste" functionality (different security implications).
- Handling complex data types like images or formatted HTML (this skill focuses
  on text).
- Managing global clipboard history or clipboard managers.

## Common Failure Patterns

- **The "Silent" Success:** Changing the icon visually but not informing screen
  reader users that the copy happened.
- **Missing Secure Context:** Trying to use the API on an HTTP-only site where
  it will be `undefined`.
- **Background Copying:** Attempting to copy text without a direct user
  interaction, which browsers will block.
- **Long Success States:** Leaving the "Copied!" message visible indefinitely,
  confusing the user about whether the button is still clickable.
- **Focus Loss:** Re-rendering the button in a way that destroys the focused
  element, breaking keyboard navigation.

## Validation Steps

- [ ] **Secure Context Check:** Verify the site is served over HTTPS or
      localhost.
- [ ] **Screen Reader Test:** Confirm that the success message is announced by
      the screen reader.
- [ ] **Keyboard Test:** Verify the copy action can be triggered using `Tab`
      and `Enter/Space`.
- [ ] **Failure Handling:** Temporarily disable the API or mock a rejection to
      ensure the error feedback appears.
- [ ] **Reset Test:** Verify the button returns to its original state after the
      timeout.
