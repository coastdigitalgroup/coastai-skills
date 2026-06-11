---
name: accessible-file-upload-implementation
description:
  Implement and debug accessible file upload components, including drag-and-drop
  zones, native fallbacks, and ARIA live region status announcements.
---

# Accessible File Upload Implementation

## Purpose

The Accessible File Upload Implementation skill ensures that file uploaders are
usable by all users, including those relying on screen readers, keyboard
navigation, or assistive technologies. It solves the common problem where custom
"drag-and-drop" zones are inaccessible, while also managing upload states and
validation feedback.

## Use Cases

- Building a modern "drop zone" uploader with a native `<input type="file">`
  fallback.
- Implementing an accessible "multi-file" upload interface with progress
  tracking.
- Auditing existing file uploaders for focus management and ARIA compliance.
- Providing real-time feedback (e.g., "File too large", "Upload complete") to
  screen reader users.

## When NOT to Use

- **Standard, Unstyled Uploads:** If a basic `<input type="file">` meets all
  design and functional requirements, do not add custom JS-driven drop zones.
- **Backend Upload Logic:** This skill focuses on the frontend UI and
  interaction; it does not cover server-side file handling, storage, or security
  (e.g., virus scanning).

## Inputs

1. **Functional Requirements:** Single vs. multi-file support, file type
   restrictions (MIME types), and size limits.
2. **Visual Design:** Drop zone styling, loading indicators, and file preview
   requirements.
3. **API Context:** How files are sent to the server (e.g., `FormData` via
   `fetch`).

## Outputs

1. **Semantic HTML Structure:** An accessible uploader using a hidden (but
   functional) `<input type="file">` and a visible, keyboard-accessible drop
   zone.
2. **ARIA Live Regions:** Implementation of `aria-live` for status announcements.
3. **Keyboard & Pointer Handlers:** Logic for drag-and-drop events and keyboard
   activation.
4. **Validation Logic:** Frontend checks for file size and type with accessible
   error reporting.

## Workflow

### 1. Establish the Core Markup

- Use a native `<input type="file">` as the source of truth. It should be
  visually hidden (but not `display: none`) so it remains focusable and
  reachable.
- Associate the input with a `<label>` that clearly describes the action.
- Wrap the drop zone in a container that is keyboard-focusable
  (`tabindex="0"`).

### 2. Implement Drag-and-Drop Logic

- Listen for `dragover`, `dragleave`, `dragenter`, and `drop` events on the
  container.
- **Important:** Prevent the default browser behavior (opening the file) for
  these events.
- Update visual states (e.g., a "dragging" class) during these events to provide
  feedback.

### 3. Synchronize with Native Input

- When a file is dropped, manually update the `files` property of the hidden
  native `<input>` or store the files in a JavaScript state for submission.
- Ensure clicking the drop zone triggers the native file picker (`input.click()`).

### 4. Manage Accessibility and Focus

- **Live Region:** Use a hidden `aria-live="polite"` element to announce
  changes, such as "File [Name] uploaded successfully" or "3 files selected".
- **Keyboard:** Ensure the drop zone can be activated via `Enter` or `Space` by
  triggering the hidden input's click event.
- **Attributes:** Use `aria-describedby` to link the uploader to instructions
  (e.g., "Max file size: 5MB").

### 5. Provide Feedback and Validation

- Display a list of selected files with a "Remove" button for each.
- Ensure the "Remove" buttons have clear accessible names (e.g., "Remove [File
  Name]").
- If validation fails, move focus to the error message or announce it
  immediately.

## Decision Rules

- **Hidden Input vs. Visible Input:** Always use a hidden native input. It
  ensures the uploader works on mobile devices and for users who prefer standard
  OS file pickers.
- **Live Region Type:** Use `aria-live="polite"` for non-critical status updates
  (like progress) and `aria-live="assertive"` for critical errors that stop the
  flow.
- **Focus Management:** When a file is removed from the list, return focus to the
  next available "Remove" button or the uploader itself to prevent focus loss.

## Constraints

- **No "Click-Only" Zones:** The uploader must be functional via keyboard and
  drag-and-drop.
- **Mobile Support:** Custom drag-and-drop often doesn't work on mobile; the
  native input click fallback is essential.
- **Performance:** Avoid heavy processing (like client-side image resizing)
  on the main thread; use Web Workers for intensive tasks.

## Non-Goals

- Handling server-side authentication or multipart-form-data parsing.
- Implementation of complex "image editing" tools inside the uploader.
- Managing persistent storage of uploaded files in a database.

## Common Failure Patterns

- **Invisible Focus:** The drop zone has no `:focus-visible` outline, making it
  unusable for keyboard users.
- **Silent Success/Failure:** Screen reader users don't know if their upload
  started, finished, or failed.
- **Broken Drag-and-Drop:** Forgetting to call `preventDefault()`, causing the
  browser to navigate away from the page when a file is dropped.
- **Missing Labeling:** The uploader is just a `div` without a name, or the
  label is not correctly associated with the hidden input.
- **Double Triggering:** Clicking a label inside a drop zone that also has a
  click listener, causing the file picker to open twice.

## Validation Criteria

- [ ] **Keyboard Test:** Can you tab to the uploader and open the file picker
      using `Enter`?
- [ ] **Drag-and-Drop Test:** Does dropping a file correctly populate the
      selected list without navigating the browser?
- [ ] **Screen Reader Test:** Does the `aria-live` region announce "1 file
      selected" after an upload?
- [ ] **Mobile Test:** Does tapping the uploader open the native iOS/Android
      file selection menu?
- [ ] **Focus Management:** Does focus stay within the component after
      interacting with it?
