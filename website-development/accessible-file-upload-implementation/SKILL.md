---
name: accessible-file-upload-implementation
description:
  Implement and debug accessible file upload components including drag-and-drop
  zones, native input fallbacks, progress indicators, and error handling.
---

# Accessible File Upload Implementation

## Purpose

The Accessible File Upload Implementation skill provides a technical protocol
for building file upload components that are usable by everyone, including users
relying on screen readers, keyboard navigation, and switch devices. It solves the
challenge of making complex "drag and drop" interfaces accessible by ensuring
there is always a functional native fallback and that the upload state is
correctly communicated.

## Use Cases

- Building a profile picture uploader with image preview.
- Implementing a multi-file document upload zone for application forms.
- Adding drag-and-drop capabilities to an existing `<input type="file">`.
- Auditing and fixing accessibility gaps in third-party upload libraries.

## When NOT to Use

- **Simple Form Submissions:** If you only need a single file and don't require
  drag-and-drop or immediate feedback, a standard `<input type="file">` with a
  proper `<label>` is sufficient and more robust.
- **Large Data Streaming:** For multi-gigabyte files requiring chunked uploads
  and complex pause/resume logic, this skill covers the UI/UX layer but not
  the heavy infrastructure required for the transfer itself.
- **Mobile-Only Apps:** Where native OS file pickers are the primary interaction
  and web-based drag-and-drop is less relevant.

## Inputs

1. **Upload Requirements:** Single or multiple files? Specific file types (MIME types)?
2. **Visual Design:** Is there a dedicated "drop zone" or just a button?
3. **Feedback Needs:** Does it need progress bars, file lists, or thumbnail previews?
4. **Backend Contract:** How does the server expect the files (Multipart/form-data, Base64, etc.)?

## Outputs

1. **Semantic HTML Structure:** An implementation using a hidden native `<input>`
   linked to a visible, accessible trigger.
2. **Accessible Drag-and-Drop Logic:** JavaScript handlers for `dragover`,
   `dragleave`, and `drop` that manage visual states and accessibility roles.
3. **ARIA Live Region Announcements:** Real-time updates for "File added",
   "Uploading (40%)", and "Upload complete".
4. **Focus Management:** Logic to ensure focus returns to a logical place after
   files are selected or removed.

## Workflow

### 1. The Foundation: Semantic HTML

- Start with a standard `<input type="file">`.
- Wrap it in a `<label>` or use the `for`/`id` association.
- Use the `accept` attribute to limit file types (e.g., `accept="image/*,.pdf"`).
- For multiple files, add the `multiple` attribute.

### 2. The Custom UI (The "Drop Zone")

- If creating a custom drop zone, use a `<div>` with `role="region"` and an
  `aria-label` (e.g., "File Upload").
- Alternatively, use a `<button>` as the primary trigger if it's not a large area.
- Ensure the drop zone is keyboard-focusable if it's the primary way to trigger
  the file picker (`tabindex="0"`).

### 3. Implement Drag and Drop

- Add event listeners for `dragover`, `dragleave`, and `drop`.
- In `dragover`, add a visual "active" state and prevent default browser behavior.
- In `drop`, capture the files from `event.dataTransfer.files`, update the
  UI, and then clear the visual active state.
- **Important:** Ensure the "Drop Zone" also triggers the hidden file input
  on `click` or `Enter` key.

### 4. Provide Real-time Feedback

- **Live Regions:** Use an element with `aria-live="polite"` to announce
  state changes (e.g., "2 files selected", "Uploading document.pdf").
- **Progress Indicators:** Use the native `<progress>` element or a `div`
  with `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.

### 5. Manage the File List

- Display a list of selected files using a `<ul>`.
- For each file, provide a "Remove" button with a descriptive label
  (e.g., `aria-label="Remove image-1.jpg"`).
- After removing a file, move focus to the next item in the list or the
  upload trigger.

### 6. Error Handling

- Clearly display errors (e.g., "File too large", "Invalid format").
- Link error messages to the upload component using `aria-describedby`.
- Announce errors immediately using `aria-live="assertive"` if they prevent
  the user from continuing.

## Decision Rules

- **Hidden Input vs. Visible:** Always keep a hidden `<input type="file">`
  in the DOM. It provides the most reliable way for assistive technologies to
  interact with the file system.
- **Drag-and-Drop as Enhancement:** Treat drag-and-drop as a progressive
  enhancement. The component must be 100% functional via clicking/keyboard
  without any drag interaction.
- **Progressive Disclosure:** For multi-file uploads, show a summary (e.g.,
  "3 files ready") and allow the user to expand to see the full list if space
  is limited.

## Constraints

- **Input Visibility:** Don't use `display: none` on the native input as it
  can make it unreachable for some screen readers. Use the "visually hidden"
  CSS pattern instead.
- **Touch Support:** Drag-and-drop is difficult on touch devices. Ensure the
  tap-to-upload target is at least 44x44px.
- **Security:** Always validate file types and sizes on the client-side as a UX
  courtesy, but remember that server-side validation is the only real security
  measure.

## Non-Goals

- Implementation of the server-side upload handler (Node.js, Python, etc.).
- Complex image editing or cropping within the browser (canvas-based).
- Long-term storage or file management UI (Google Drive-like interfaces).

## Common Failure Patterns

- **The "Mouse-Only" Drop Zone:** Creating a drop zone that has no `click`
  handler or keyboard support, making it impossible for non-mouse users to upload.
- **Silent Uploads:** Starting an upload without any visual or screen-reader
  notification, leaving the user wondering if anything happened.
- **Stuck Focus:** Losing focus after a file is selected or removed,
  forcing the user to "re-discover" their place on the page.
- **Missing Labels:** Providing a "Browse" button that isn't programmatically
  linked to the file input.
- **Ambiguous Progress:** Showing a spinner but no percentage or text,
  which is unhelpful for users with cognitive disabilities or slow connections.

## Validation Steps

- [ ] **Keyboard Test:** Can you trigger the file picker using only the `Tab`
      and `Enter` keys?
- [ ] **Screen Reader Test:** When a file is dropped or selected, is the
      action announced (e.g., "File: resume.pdf ready to upload")?
- [ ] **Error Announcement:** If you try to upload an invalid file, is the
      error message read aloud immediately?
- [ ] **No-Mouse Test:** Can you complete a full upload-and-remove cycle
      without using a mouse?
- [ ] **Contrast Check:** Verify that progress bars and "Remove" buttons
      meet WCAG AA contrast ratios (4.5:1).
- [ ] **State Sync:** Verify that `aria-valuenow` on the progress bar
      updates in sync with the actual upload progress.
