---
name: accessible-file-upload-implementation
description:
  Implement and debug accessible file upload components that support native
  inputs and drag-and-drop interactions while maintaining full screen reader and
  keyboard compatibility.
---

# Accessible File Upload Implementation

## Purpose

The Accessible File Upload Implementation skill provides a technical protocol
for building file upload interfaces that are usable by everyone, including users
relying on screen readers, keyboard navigation, or switch devices. It solves the
common problem of inaccessible "drag-and-drop" zones that hide the native file
input and fail to communicate state changes to assistive technology.

## Use Cases

- Building a profile picture uploader with instant image preview.
- Implementing a multi-file document upload zone for a business application.
- Modernizing a legacy `<input type="file">` with a custom-styled,
  drag-and-drop interface.
- Auditing existing uploaders for WCAG compliance (keyboard access, focus
  trapping, and status announcements).

## When NOT to Use

- **External File Pickers:** If you are using a third-party service (like
  Cloudinary, Uploadcare, or Google Drive picker) that provides its own UI
  iframe, follow their specific integration guides instead.
- **Backend File Processing:** This skill does not cover server-side handling,
  virus scanning, or storage of uploaded files.
- **Simple Forms:** If a standard, unstyled `<input type="file">` meets the
  design requirements, use it directly. It is the most accessible method by
  default.

## Inputs

1. **Functional Requirements:** Single vs. multi-file support, accepted file
   types (MIME types), and maximum file size.
2. **UI Design:** Visual requirements for the "Drop Zone," upload triggers, and
   file preview cards.
3. **Feedback Requirements:** Progress indicators, success/error messages, and
   file removal logic.

## Outputs

1. **Semantic HTML Structure:** A hidden but accessible `<input type="file">`
   linked to a custom trigger.
2. **Drag-and-Drop Logic:** JavaScript handlers for `dragover`, `dragleave`, and
   `drop` events that sync with the native input.
3. **ARIA Live Region:** Implementation for announcing file selection, upload
   progress, and errors.
4. **Accessible Previews:** Logic for rendering file names, sizes, and image
   thumbnails with appropriate `alt` text and "Remove" actions.

## Workflow

### 1. Structure for Native Accessibility

- Use a standard `<input type="file">` as the source of truth.
- If styling a custom button, ensure the `<label>` is correctly associated with
  the input's `id`.
- Visually hide the input (e.g., using `opacity: 0` or a "visually-hidden"
  utility) but keep it in the tab order so it remains focusable.

### 2. Implement the Drag-and-Drop Zone

- Add a wrapper element with `role="region"` and an `aria-label` (e.g., "File
  Upload").
- Use JavaScript to listen for `dragover` and `dragenter` to apply visual
  "active" styles to the drop zone.
- Prevent default browser behavior for `dragover` and `drop` to handle the files
  manually.
- On `drop`, extract the files from `event.dataTransfer.files` and assign them
  to the hidden input's `files` property (or handle them via a JS state
  manager).

### 3. Communicate State with Live Regions

- Create a container with `aria-live="polite"` and `aria-atomic="true"`.
- When a file is added, update the text (e.g., "File 'resume.pdf' added").
- When a file is removed, update the text (e.g., "File removed").
- For errors (e.g., "File too large"), use `aria-live="assertive"`.

### 4. Provide Keyboard-Accessible Actions

- Ensure the "Drop Zone" itself is focusable (`tabindex="0"`) if it serves as a
  trigger.
- All "Remove" or "Cancel" buttons in the file list must be standard
  `<button>` elements with clear `aria-label` text (e.g., "Remove resume.pdf").

### 5. Handle File Previews

- For images, use `URL.createObjectURL()` to generate a preview.
- Ensure preview images have `alt=""` if they are decorative, or describe the
  file name if they are informative.
- Display file metadata (name, size) clearly and ensure it is read by screen
  readers when the preview card is focused.

## Decision Rules

- **Native vs. Custom Trigger:** If the user clicks the drop zone, trigger the
  `.click()` method on the hidden input. Never try to reimplement the system
  file picker.
- **Accepted Types:** Use the `accept` attribute on the input (e.g.,
  `accept="image/*,.pdf"`) to filter the system picker, but *also* validate
  file types in JavaScript for dropped files.
- **Multi-file Handling:** Use the `multiple` attribute for batch uploads. When
  announcing multiple files, provide a summary (e.g., "3 files selected").

## Constraints

- **Focus Visibility:** The custom drop zone or trigger must have a clear visual
  focus indicator when the hidden input is focused.
- **Contrast:** Status text and progress bars must meet WCAG AA (4.5:1)
  contrast.
- **Security:** Always check file sizes and extensions in JS before attempting
  to process or upload them to protect the client-side environment.

## Non-Goals

- Implementing actual `multipart/form-data` network requests or fetch logic.
- Building complex image cropping or editing tools.
- Managing persistent server-side file state.

## Common Failure Patterns

- **Unreachable Input:** Hiding the input with `display: none` or
  `visibility: hidden`, which removes it from the keyboard tab order.
- **Silent Drop:** Dropping a file into a zone without any screen reader
  announcement, leaving the user unsure if the action succeeded.
- **Missing File Removal Focus:** Deleting a file from a list and losing the
  user's focus position.
- **Label-less Previews:** Using an `<a>` or `<div>` as a "Remove" button
  without a text label or `aria-label`.
- **Drag-only Zones:** Building a uploader that *only* works via drag-and-drop,
  making it impossible for keyboard-only or mobile users to upload files.

## Validation Steps

- [ ] **Keyboard Test:** Can you trigger the file picker using only the `Tab`
      and `Space/Enter` keys?
- [ ] **Screen Reader Test:** Are file additions, removals, and errors
      announced via the `aria-live` region?
- [ ] **Focus Audit:** When the hidden input is focused, does the custom UI
      show a clear focus ring?
- [ ] **Removal Test:** When a file is removed, does focus move to a logical
      neighbor (or the main uploader) rather than jumping to the top of the
      page?
- [ ] **Mobile Check:** Verify the uploader works on touch devices where
      drag-and-drop might not be available or behaves differently.
