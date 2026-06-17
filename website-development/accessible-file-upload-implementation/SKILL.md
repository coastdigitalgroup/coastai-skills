---
name: accessible-file-upload-implementation
description:
  Implement and debug accessible file upload components, including drag-and-drop
  interfaces, keyboard-accessible file selection, and ARIA live status updates.
---

# Accessible File Upload Implementation

## Purpose

The Accessible File Upload Implementation skill provides a technical protocol
for building and auditing file uploaders that are usable by everyone. Native
`<input type="file">` elements are famously difficult to style, leading many
developers to build custom "drag and drop" zones that are often inaccessible
to keyboard and screen reader users. This skill ensures that custom upload
interfaces maintain native functionality while providing enhanced accessible
feedback.

## Use Cases

- Building a drag-and-drop file upload zone for profile pictures or documents.
- Implementing a multi-file uploader with progress tracking and removal options.
- Auditing existing "styled" file inputs that lack keyboard support or
  announcements.
- Ensuring that file type and size validation errors are communicated to
  assistive technologies.

## When NOT to Use

- **Standard Form Submissions:** If you don't need a custom UI and the default
  browser "Choose File" button is acceptable, use the native element without
  heavy customization.
- **Direct Asset Linking:** If users are providing URLs to files rather than
  uploading them, use a standard text input.
- **Extremely Large Files (GB+):** While the UI principles apply, these often
  require specialized chunked uploading libraries that go beyond basic frontend
  implementation.

## Inputs

1. **Upload Requirements:** Single or multiple files? Specific file types
   (extensions or MIME types)? Maximum file size?
2. **UI/UX Design:** Visual design for the "drop zone," file list, and progress
   states.
3. **API Context:** Endpoint for the upload and the expected data format (e.g.,
   `FormData`).

## Outputs

1. **Accessible HTML Structure:** A hidden but functional `<input type="file">`
   linked to a custom-styled `<label>` or trigger.
2. **Drag-and-Drop Logic:** JavaScript handlers for `dragover`, `dragleave`, and
   `drop` events that update the UI and the input state.
3. **ARIA State Management:** Implementation of `aria-live` for status updates
   and `aria-describedby` for instructions and errors.
4. **Keyboard Handlers:** Ensuring the upload trigger is focusable and
   activatable via `Enter` or `Space`.

## Workflow

### 1. Build the Semantic Core

- Start with a standard `<input type="file">`.
- Use a `<label>` to trigger the file picker. This ensures the native OS
  dialog opens when the label is clicked or activated.
- If using a custom "Drop Zone" `div`, ensure it contains the input and that the
  input is keyboard-accessible (usually by making it visually hidden but not
  `display: none`).

### 2. Implement the Drag-and-Drop Interface

- Add event listeners to the drop zone for `dragover`, `dragenter`, `dragleave`,
  and `drop`.
- **Visual Feedback:** Toggle a CSS class (e.g., `.is-dragging`) during
  drag events to indicate the zone is active.
- **Handling Drops:** In the `drop` event, access `event.dataTransfer.files`
  and assign them to the hidden input's `files` property (or handle them via
  AJAX).

### 3. Communicate Status via ARIA Live

- Create a visually hidden `aria-live="polite"` region.
- When files are added, removed, or if an error occurs, update the text inside
  this region (e.g., "3 files selected", "Upload complete", "Error: File too
  large").

### 4. Manage the File List

- Display a list of selected files. Each file should have its name, size, and
  a "Remove" button.
- The "Remove" button must have a descriptive label (e.g., `aria-label="Remove
  photo.jpg"`).

### 5. Handle Validation & Errors

- Validate files immediately (extension, size, MIME type).
- Display errors near the input and link them using `aria-describedby`.
- Ensure errors are also announced via the `aria-live` region.

## Decision Rules

- **Label vs. Button:** Use a `<label for="id">` as the primary trigger; it
  handles the "click-to-open-dialog" behavior natively without extra JS.
- **Live Region Politeness:** Use `aria-live="polite"` for general updates.
  Use `aria-live="assertive"` ONLY for immediate, critical errors that stop
  the process.
- **Progress Bars:** If using a `<progress>` element, ensure it has a label
  and that its value is updated programmatically.

## Constraints

- **Input Visibility:** Do not use `display: none` or `visibility: hidden` on
  the `<input type="file">` if you want it to remain in the tab order. Use
  the "visually hidden" CSS pattern instead.
- **Security:** Browsers restrict programmatic setting of the `files` property
  for security. You can set it from a `DataTransfer` object during a drop event,
  but you cannot "clear" it easily without resetting the input.
- **Mobile Support:** Touch devices don't have "drag and drop" in the same
  way; ensure the "Click to upload" fallback is prominent and large.

## Non-Goals

- Implementing server-side file processing or storage.
- Handling complex image manipulation (cropping, filtering) before upload.
- Building a full "Cloud Storage" file explorer.

## Common Failure Patterns

- **No Keyboard Access:** Creating a `div` drop zone that can't be reached via
  `Tab`.
- **Silent Uploads:** Not informing screen reader users that a file was
  successfully selected or that an upload is in progress.
- **Missing File Type Instructions:** Not telling the user what formats are
  accepted until *after* they try to upload.
- **Focus Loss:** When a file is removed from a list, focus often disappears or
  resets to the top of the page instead of moving to the next logical item.

## Validation Steps

- [ ] **Keyboard Test:** Can you trigger the file picker using only the `Space`
      or `Enter` keys?
- [ ] **Screen Reader Test:** When a file is dropped or selected, does the
      screen reader announce the status (e.g., "File selected: image.png")?
- [ ] **Drag State Check:** Does the drop zone visually change when a file is
      dragged over it?
- [ ] **Error Announcement:** If you try to upload an invalid file, is the
      error message read aloud?
- [ ] **Remove Action:** Can you remove a selected file using the keyboard,
      and is the removal announced?
