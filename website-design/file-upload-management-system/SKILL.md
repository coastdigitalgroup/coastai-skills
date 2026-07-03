---
name: file-upload-management-system
description:
  Design a systematic framework for uploading and managing files, defining the
  visual and spatial organization of drop zones, upload queues, and file
  management actions to ensure a high-trust and efficient user experience.
---

# File Upload and Management System

## Purpose

The File Upload and Management System provides a methodology for designing the end-to-end experience of transferring files from a user's device to a server. It ensures that the process is transparent, recoverable, and accessible. This system defines the **interaction states** of the upload trigger (drop zones), the **spatial rhythm** of the upload queue, and the **feedback loops** (progress, success, and error) required to maintain user confidence during high-latency operations.

## Use Cases

- **Content Management Systems (CMS):** Designing media libraries and asset uploaders.
- **SaaS Applications:** Implementing document management, CSV imports, or user profile attachments.
- **Project Management Tools:** Structuring file attachments within tasks or comments.
- **Creative Tools:** Designing high-volume uploaders for photos, videos, or design files.
- **Cloud Storage Interfaces:** Managing complex folder and file upload operations.

## When NOT to Use

- **Small Text Attachments:** If the "file" is just a tiny snippet of text, use a standard text area or the `copy-to-clipboard-implementation`.
- **System-Automated Transfers:** Where the user doesn't trigger or monitor the upload (e.g., background telemetry).
- **Single-Input Profile Photos:** While this system applies, a simple "Avatar" trigger (from `user-avatar-system`) might be more appropriate for low-complexity single-image updates.
- **Static Assets:** For assets that are part of the site's code (e.g., icons, theme images), which are managed via developer workflows.

## Inputs

1. **File Type and Size Constraints:** What is allowed (PDF, JPG, PNG) and what are the maximum sizes?
2. **Volume Expectation:** Is the user uploading one file at a time or 50+ files in bulk?
3. **Context of Upload:** Is this a standalone task (e.g., "Import Data") or a supporting action (e.g., "Attach to Message")?
4. **Metadata Requirements:** Does the file need a title, description, or tags during the upload process?
5. **System Tokens:** Spacing, color, and typography scales from the parent design system.

## Outputs

1. **Drop Zone Anatomy Spec:** Visual definitions for the upload trigger (Idle, Hover, Active, and Disabled states).
2. **Queue Management Blueprint:** The spatial organization of the "Pending," "Uploading," and "Completed" list items.
3. **Progress and Feedback Matrix:** Visual treatments for progress bars, percentage indicators, and success/error states.
4. **Action Hierarchy:** Rules for "Cancel," "Retry," "Delete," and "Edit" actions within the file list.

## Workflow

### 1. Design the Upload Trigger (The Drop Zone)

Establish a clear invitation for interaction:
- **Idle State:** Use a dashed or solid border with an icon (usually a cloud-up or paperclip) and a clear instruction (e.g., "Drag & Drop or Click to Upload").
- **Drag-Over State:** Change the background color or border style to provide immediate feedback that the area is ready to receive the file.
- **Mobile Fallback:** Ensure the drop zone remains a large, tappable button (min 44x44px) that opens the native system file picker.

### 2. Establish the Upload Queue

Manage multiple files without cluttering the interface:
- **Immediate Feedback:** As soon as a file is selected, add it to a list below or within the trigger.
- **File Anatomy:** Each list item should include:
  - **Thumbnail/Icon:** To help the user identify the file type or content.
  - **File Name and Size:** To confirm the correct file was chosen.
  - **Progress Indicator:** A bar or circle showing the upload status.
  - **Actions:** A way to cancel an in-progress upload or remove a completed one.

### 3. Provide Granular Status Feedback

Use the `step-progress-system` and `interactive-state-system` for file states:
- **Uploading:** Show a progress bar and, for long uploads, the percentage or "X of Y MB" uploaded.
- **Success:** Use a semantic "Success" color (green) and a checkmark icon. Provide a "View" or "Link" action.
- **Error:** Use a semantic "Error" color (red). Provide a clear reason (e.g., "File too large") and a "Retry" button.

### 4. Design for File Management (Post-Upload)

Define how users interact with their uploaded assets:
- **Editing Metadata:** If titles or descriptions are needed, provide inline editing or a "Settings" modal.
- **Deletion:** Use a "Trash" icon with a confirmation step for destructive actions.
- **Grid vs. List View:** For media-heavy uploads, provide a grid view of thumbnails; for document-heavy uploads, use a list view for metadata density.

### 5. Plan for Responsive Stacking

- **The Compact Queue:** On mobile, collapse metadata (like file size) and prioritize the file name and progress bar.
- **Full-Screen Focus:** For complex uploaders (like a CSV importer with mapping), use a full-screen overlay to remove distractions.

## Decision Rules

- **The "Instant Entry" Rule:** Files must appear in the UI the moment they are dropped/selected, even if the actual server request hasn't started yet.
- **Progress Visibility:** Use a progress bar for any file that takes >1 second to upload. For very fast uploads, transition directly to the "Success" state.
- **Batch Actions:** If the user can upload 5+ files, provide a "Clear All" or "Upload All" action to manage the queue collectively.
- **Conflict Management:** Define what happens if a file with the same name exists (e.g., "Keep Both," "Replace," "Skip").
- **Empty State:** If the media library is empty, use the `empty-state-system` to provide an "Upload" button as the primary CTA.

## Constraints

- **Accessibility:**
  - The drop zone must be focusable and operable via the `Space` or `Enter` keys.
  - Use `aria-live` to announce upload progress and completion to screen readers.
  - File inputs must have a hidden but accessible `<label>`.
- **Responsiveness:** Drop zones should be fluid and never cause horizontal overflow.
- **Contrast:** Progress bars and error messages must meet WCAG AA (4.5:1) contrast ratios.

## Common Failure Patterns

- **The "Silent Fail":** An upload fails, but the UI provides no feedback, leaving the user waiting indefinitely.
- **Vanishing Progress:** The progress bar disappears before the upload is actually finalized, causing "Late-Stage Anxiety."
- **Small Drop Zones:** Creating a tiny target that is difficult to hit with a mouse or thumb.
- **Lack of "Cancel":** Not allowing a user to stop a large, accidental upload.
- **Obscure Errors:** Showing "Error 500" instead of "The server is currently busy, please try again in a moment."

## Validation Criteria

- [ ] Drop zone has distinct Idle, Hover, and Drag-over states.
- [ ] Each file in the queue shows name, size, and progress.
- [ ] Success and Error states are indicated by both color and icons.
- [ ] Users can cancel or remove files from the queue.
- [ ] ARIA live regions are used for status updates.
- [ ] Layout is responsive and handles long file names gracefully.
- [ ] All interactive elements meet the 44x44px touch target minimum.
