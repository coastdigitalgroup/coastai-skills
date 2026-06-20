---
name: accessible-file-upload-implementation
description:
  Implement and debug accessible, user-friendly file upload components using
  native input elements, ARIA enhancements, and drag-and-drop support.
---

# Accessible File Upload Implementation

## Purpose

The Accessible File Upload Implementation skill provides a technical protocol for building file upload components that are accessible to all users. It ensures that custom-styled uploaders remain keyboard-navigable, provides clear status updates to screen readers, and handles interaction states (drag-over, uploading, success, error) reliably.

## Use Cases

- Building custom-styled "drag and drop" zones that replace or augment native file inputs.
- Implementing profile picture uploaders with immediate visual and programmatic feedback.
- Adding multi-file upload capabilities with accessible lists of selected files.
- Auditing existing upload components for WCAG compliance (e.g., missing labels, lack of keyboard support).

## When NOT to Use

- **Standard Native Uploads:** If the default browser styling is sufficient and no complex interaction (like drag-and-drop or AJAX previews) is needed, the native `<input type="file">` is already accessible.
- **Direct Cloud Integration Widgets:** If using a third-party widget (like Cloudinary or Uploadcare) that manages its own UI, though you should still audit their accessibility.

## Inputs

1. **Functional Requirements:** Single vs. multi-file? Specific file types (accept attribute)? Size limits?
2. **Visual Design:** How should the drop zone and file list appear in various states?
3. **API Context:** Is the file submitted via standard form multipart/form-data or an asynchronous Fetch/XHR request?

## Outputs

1. **Semantic HTML Structure:** A hidden but focusable native `<input type="file">` linked to a visual trigger.
2. **ARIA-Enhanced Drop Zone:** Use of `aria-describedby` for instructions and `aria-live` for status updates.
3. **Keyboard & Drag Interaction:** JavaScript handlers for `click`, `keydown`, `dragover`, `dragleave`, and `drop`.
4. **Accessible File List:** A list of selected files that allows for removal, with state changes announced to screen readers.

## Workflow

### 1. The Core Structure
- Keep the native `<input type="file">` as the primary functional element.
- Use a `<label>` or `aria-labelledby` to ensure the input has a clear, accessible name.
- If styling a custom button, ensure it triggers the native input's `click()` event.

### 2. Implement Drag-and-Drop
- Add event listeners for `dragover` and `dragleave` to the drop zone to provide visual cues (e.g., changing border color).
- Handle the `drop` event to extract files from `event.dataTransfer.files` and assign them to the input or an internal state.
- Ensure the drop zone is not focusable if the native input or a "Select File" button already is, to avoid redundant tab stops.

### 3. Provide Programmatic Feedback
- Use an ARIA live region (`aria-live="polite"` or `"assertive"`) to announce when files are added, removed, or if an error occurs.
- Link instructions (e.g., "Max file size 5MB") to the input using `aria-describedby`.

### 4. Manage the File List
- When files are selected, render a list (usually a `<ul>`).
- Each item should include the file name and a "Remove" button.
- The "Remove" button must have an accessible label (e.g., `aria-label="Remove photo.jpg"`).

### 5. Handle Image Previews (Optional)
- For image uploads, use `URL.createObjectURL()` to show a preview.
- Ensure preview images have appropriate `alt` text (e.g., `alt="Preview of uploaded file: photo.jpg"`) or are marked as decorative if the file name is sufficient.
- **Important:** Call `URL.revokeObjectURL()` when the preview is no longer needed to prevent memory leaks.

## Decision Rules

- **Hidden vs. Visible Input:** The native input should be visually hidden (using a "visually-hidden" CSS class) but remain in the DOM and focusable. Avoid `display: none` or `visibility: hidden` as they remove the element from the tab order.
- **Click Trigger:** The "Select File" button should ideally be the `<label>` for the input, which natively triggers the file picker.
- **Live Region Politeness:** Use `aria-live="polite"` for general updates (e.g., "File uploaded"). Use `aria-live="assertive"` for critical errors (e.g., "File too large").

## Constraints

- **Single Tab Stop:** The custom component should ideally only add one tab stop to the page.
- **No Keyboard Lock:** Users must be able to navigate away from the component using `Tab` or `Shift+Tab`.
- **Contrast:** Status indicators and error messages must meet WCAG AA contrast requirements.

## Non-Goals

- Implementing the server-side file processing logic.
- Building complex image cropping or editing tools (though the uploader may lead into one).
- Handling large-scale chunked uploads (this skill focuses on the UI/UX layer).

## Common Failure Patterns

- **Removing the Native Input:** Replacing the input with a `<div>` that has no `role="button"` or `tabindex`, making it unreachable for keyboard users.
- **Silent Drop Zones:** Dragging a file over a zone with no visual or screen-reader feedback.
- **Missing Remove Button Labels:** Using a "X" icon for the remove button without an `aria-label`, leaving screen reader users unable to know what the button does.
- **Memory Leaks:** Failing to revoke object URLs used for previews.
- **Focus Loss:** Losing the user's focus when a file is removed from the list or when the upload completes.

## Validation Steps

- [ ] **Keyboard Test:** Can you trigger the file picker using only the `Space` or `Enter` keys?
- [ ] **Screen Reader Test:** Does the screen reader announce the file name after it's selected?
- [ ] **Drag-and-Drop Test:** Does the drop zone provide visual feedback during `dragover`?
- [ ] **Error Handling:** Does an error message appear and get announced if an invalid file type is "dropped"?
- [ ] **Memory Management:** Check that `URL.revokeObjectURL` is called when a file preview is removed.
- [ ] **Accessibility Audit:** Run Axe or Lighthouse and verify no violations for labels or ARIA attributes.
