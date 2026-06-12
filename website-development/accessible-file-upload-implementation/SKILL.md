---
name: accessible-file-upload-implementation
description:
  Implement and debug accessible file uploaders with drag-and-drop support,
  native fallbacks, and real-time ARIA live status announcements.
---

# Accessible File Upload Implementation

## Purpose

The Accessible File Upload Implementation skill provides a technical framework
for building file uploaders that are usable by all users, including those
relying on screen readers and keyboard-only navigation. It focuses on
transforming standard `<input type="file">` elements into robust, accessible
drag-and-drop zones with clear status feedback.

## Use Cases

- Building a single or multi-file uploader for a user profile or document system.
- Implementing a drag-and-drop zone with a native file input fallback.
- Auditing existing file upload components for accessibility gaps (e.g., missing
  labels, silent errors, or lack of keyboard support).
- Adding real-time status updates (upload progress, success, file removal) for
  assistive technology users.

## When NOT to Use

- **Standard OS File Pickers:** If the default browser/OS file picker UI is
  sufficient and no custom styling or drag-and-drop is required.
- **Large Scale Data Migration:** This skill focuses on the UI/UX of uploading
  files via a browser, not backend batch processing or CLI-based data transfers.

## Inputs

1. **Functional Requirements:** Single vs. multi-file support, accepted file
   types (MIME types/extensions), and size limits.
2. **UI Design:** Visual requirements for the drop zone, file list, and progress
   indicators.
3. **Integration Context:** Is it part of a standard form submission or an
   asynchronous (AJAX) upload?

## Outputs

1. **Semantic HTML:** A structure using a hidden or styled native `<input>`
   paired with a `<label>` or interactive drop zone.
2. **ARIA Live Region:** A dedicated status area (`aria-live="polite"`) for
   announcing file additions, removals, and progress.
3. **Keyboard & Drag-and-Drop Handlers:** JavaScript for handling file
   selection, drop events, and focus management.
4. **State Management:** Logic for displaying selected files and handling
   removal actions.

## Workflow

### 1. Establish the Native Core

- Always start with a hidden or visually hidden native `<input type="file">`.
- Use a `<label>` or a button to trigger the input's click event.
- Ensure the input has a clear `id` and is associated with its label or
  described by instructional text (`aria-describedby`).

### 2. Build the Drop Zone

- Use a container element (e.g., `<div>`) for the drag-and-drop area.
- Apply `tabindex="-1"` to the drop zone to allow safe programmatic focus
  transitions (e.g., returning focus to the zone after a file is removed).
- Implement `dragover`, `dragleave`, and `drop` event listeners.
- Prevent default browser behavior for these events to handle files via JS.

### 3. Implement Status Announcements

- Create an ARIA live region (e.g., `<div aria-live="polite" class="sr-only">`).
- **File Addition:** Announce the file name and the total count when a file is
  successfully added.
- **File Removal:** Announce the removal event and the updated total count
  (e.g., "File name removed. 3 file(s) total.").
- **Progress:** For long uploads, announce progress at meaningful intervals
  (e.g., 25%, 50%, 75%, Complete).

### 4. Manage the File List

- Display a list of selected files (e.g., in a `<ul>`).
- Provide a "Remove" button for each file.
- Ensure "Remove" buttons have descriptive labels (e.g., `aria-label="Remove image.jpg"`).

### 5. Handle Interactions and Focus

- **Double-Trigger Prevention:** Ensure click listeners on the drop zone check if
  the event target was the label or the input itself to prevent opening the
  file picker twice.
- **Focus Restoration:** When a file is removed, move focus to the next item in
  the list or back to the drop zone container if the list is empty.

## Decision Rules

- **Native vs. Custom:** Always use the native `<input>` for the actual file
  selection logic. Use custom UI only for the "wrapper" and status feedback.
- **Single vs. Multiple:** Use the `multiple` attribute on the `<input>` if the
  use case allows for more than one file. Ensure the live region reflects "N
  files selected."
- **Validation timing:** Validate file type and size immediately upon selection.
  Announce any errors via the ARIA live region or `aria-describedby`.

## Constraints

- **Keyboard Operability:** Users must be able to trigger the file picker using
  the `Space` or `Enter` keys on the label or button.
- **No Invisible Feedback:** All changes to the list of files must be announced
  to screen readers.
- **Touch Targets:** Removal buttons and the main trigger must meet 44x44px
  minimum size requirements.

## Non-Goals

- Handling server-side file processing, storage, or security (e.g., virus
  scanning).
- Implementing complex image editing or cropping tools within the uploader.
- Managing network-level retry logic for failed uploads (though UI feedback for
  failure is required).

## Common Failure Patterns

- **Silent Removals:** Deleting a file from the UI list without announcing the
  change to screen readers.
- **Double File Pickers:** Clicking a custom drop zone that triggers the input
  twice (once for the label, once for the input).
- **Focus Loss:** Deleting a file and having the focus disappear, forcing the
  user to start tabbing from the top of the page.
- **Missing Progress Announcements:** Providing only visual progress bars that
  are invisible to screen reader users.
- **Invalid Drop Zones:** Using a `<div>` as a drop zone without providing a
  keyboard-accessible alternative to "drop" files.

## Validation Steps

- [ ] **Keyboard Test:** Can you trigger the file picker and remove files
      using only the keyboard?
- [ ] **Screen Reader Test:** Verify that adding a file, removing a file, and
      validation errors are all announced in the ARIA live region.
- [ ] **Focus Management Test:** Verify that focus is handled correctly after
      removing a file (not lost to `body`).
- [ ] **Drag-and-Drop Test:** Verify that files can be dropped and are
      correctly processed without navigating the browser away from the page.
- [ ] **Live Region Content Check:** Ensure removals announce both the event
      and the *updated* total file count.
