---
name: accessible-file-upload-implementation
description:
  Implement and debug accessible, high-performance file upload components
  supporting drag-and-drop, keyboard interactions, and real-time status
  announcements.
---

# Accessible File Upload Implementation

## Purpose

The Accessible File Upload Implementation skill provides a technical protocol for
building robust file upload interfaces. It ensures that complex interactions
like drag-and-drop are accessible to keyboard and screen reader users, provides
immediate feedback for validation and progress, and handles the performance
implications of processing files on the client side.

## Use Cases

- Implementing a profile picture uploader with image preview.
- Building a multi-file document drop zone for a business application.
- Auditing existing file inputs for accessibility gaps (e.g., hidden inputs
  without proper labeling).
- Adding drag-and-drop capabilities to standard `<input type="file">` elements.
- Managing client-side validation for file size and type before network transmission.

## When NOT to Use

- **Simple CMS Image Fields:** If you are using a CMS where the file upload
  component is already handled and accessible, do not re-implement it.
- **Large Video Processing:** For massive files (GBs), client-side processing
  and previews may crash the browser; use specialized chunking libraries.
- **Background Auto-Uploads:** For system-level logs or analytics where the
  user is not intentionally uploading a file, use background APIs.

## Inputs

1. **Functional Constraints:** Allowed file types (MIME types) and maximum file
   size.
2. **UI Requirements:** Single vs. multi-file support, and whether previews
   (thumbnails) are required.
3. **Submission Context:** Is it part of a larger form or an immediate
   standalone upload?
4. **Visual Design:** Specific "Drag Over" and "Success/Error" visual states.

## Outputs

1. **Semantic HTML Structure:** A hidden but accessible `<input type="file">`
   programmatically linked to a custom visual trigger.
2. **Drag-and-Drop Logic:** JavaScript handlers for `dragover`, `dragleave`, and
   `drop` events.
3. **ARIA Live Region:** An announcement system for communicating status
   (e.g., "File uploaded successfully," "File too large").
4. **File API Integration:** Logic for reading file metadata and generating
   `URL.createObjectURL` for previews.

## Workflow

### 1. Establish the Semantic Core

- Start with a standard `<input type="file">` with a correctly associated
  `<label>`.
- For custom triggers, keep the native input in the DOM (visually hidden but
  accessible) and proxy clicks from your custom button to the input.
- Use `accept` and `multiple` attributes on the native input for base validation.

### 2. Implement the Drag-and-Drop Zone

- Use a `<div>` or `<section>` as the drop zone.
- Prevent default browser behavior for `dragover` and `drop` events to avoid
  the browser opening the file in a new tab.
- Apply a visual "active" class on `dragover` and remove it on `dragleave` or
  `drop`.

### 3. Handle File Selection and Validation

- Centralize file processing logic so it can be called by both the input
  `change` event and the drop zone `drop` event.
- Validate `file.size` and `file.type` (MIME type) against your constraints.
- Clear the input value after processing to allow the user to select the same
  file again if they deleted it.

### 4. Provide Visual and Programmatic Feedback

- **Previews:** For images, use `URL.createObjectURL(file)` to generate a
  temporary URL for an `<img>` tag. Remember to `URL.revokeObjectURL()` when the
  preview is no longer needed.
- **Progress:** If the upload is asynchronous, use a `<progress>` element or
  `role="progressbar"`.
- **Announcements:** Use a hidden `aria-live="polite"` region to announce
  validation errors or upload completion to screen reader users.

### 5. Keyboard Accessibility

- Ensure the custom drop zone trigger is a `<button>` or has `tabindex="0"`.
- Map the `Enter` and `Space` keys to trigger the file selection dialog if the
  element is not a native button.
- Ensure any "Remove File" buttons are in the tab order and have clear labels.

## Decision Rules

- **Native vs. Custom:** Always use the native file dialog (triggered via
  `.click()` on the input) as the primary method. Drag-and-drop is an
  *enhancement*.
- **Live Previews:** Only generate previews for common web images
  (JPEG, PNG, WebP). For other files, use icons to represent the file type.
- **Immediate vs. Batched Upload:** For single files (like avatars), immediate
  upload on selection is often preferred. For multiple documents, wait for a
  form "Submit" action.

## Constraints

- **Accessibility:** The drop zone must be identifiable as a file uploader
  by screen readers (use `aria-label` or `aria-labelledby`).
- **Memory:** Revoke Object URLs for previews to prevent memory leaks in
  single-page applications.
- **Security:** Never rely *only* on client-side validation; always re-verify
  files on the server.

## Non-Goals

- Implementing the server-side receiving endpoint.
- Handling complex image editing (cropping, filtering) after upload.
- Building a full "File Explorer" interface with folder support.

## Common Failure Patterns

- **The "Dead Drop":** Forgetting to call `e.preventDefault()` on drag events,
  causing the browser to navigate away from your site to the dropped file.
- **Inaccessible Triggers:** Using a `<div>` as a trigger without `tabindex` or
  keyboard event listeners, making it impossible for keyboard users to upload.
- **Missing Feedback:** Providing no indication that a file was accepted or
  rejected, leaving the user guessing.
- **Memory Bloat:** Creating thousands of Object URLs for previews without
  revoking them.
- **Labeling Gap:** Hiding the native input with `display: none` in a way that
  strips its association with the `<label>` or makes it un-tabbable.

## Validation Steps

- [ ] **Drag-and-Drop Test:** Drop a file onto the zone; verify it is processed
      and does not trigger a browser navigation.
- [ ] **Keyboard Test:** Navigate to the upload trigger using `Tab` and open the
      file dialog using `Enter` or `Space`.
- [ ] **Screen Reader Test:** Verify that validation errors (e.g., "File too
      large") are announced via the live region.
- [ ] **Validation Check:** Attempt to upload a file that exceeds the size limit
      or is of an incorrect type; verify the UI handles it gracefully.
- [ ] **Memory Audit:** Verify that `URL.revokeObjectURL` is called when
      removing a file preview.
- [ ] **Input Sync:** Verify that the native `<input>` value and custom UI
      remain in sync when files are removed.
