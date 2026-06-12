# File Upload Accessibility Checkpoints

Key ARIA attributes and implementation details for accessible file uploaders.

## ARIA Attributes

| Attribute | Purpose |
| :--- | :--- |
| `aria-live="polite"` | Announces changes (additions, removals, progress) without interrupting the user. |
| `aria-label` | Provides descriptive names for "Remove" buttons (e.g., `aria-label="Remove image.jpg"`). |
| `aria-describedby` | Links instructional text (e.g., "Max file size 5MB") to the file input. |
| `aria-invalid="true"` | Indicates to assistive tech that the current file selection has failed validation. |

## Focus Management Rules

1.  **Opening the Picker:** When the file picker is closed, focus should remain on the trigger (button or label).
2.  **Adding Files:** Programmatic focus usually stays on the trigger. The ARIA live region announces the change.
3.  **Removing Files:**
    *   If other files remain: Move focus to the "Remove" button of the next file in the list.
    *   If no files remain: Move focus back to the primary drop zone or upload trigger.
    *   *Constraint:* Never allow focus to drop to the `body` element.

## Event Handling Best Practices

### Drag and Drop
*   Always `preventDefault()` on `dragover` and `drop` to prevent the browser from opening the file in the tab.
*   Apply visual classes (e.g., `.is-dragging`) only on `dragenter`/`dragover` and remove them on `dragleave`/`drop`.

### Double-Triggering
When a click listener is placed on a container that also contains a `<label>` and a hidden `<input>`, check the event target. If the user clicked the label, the browser already triggers the input. Manual `input.click()` in the container's listener should only happen if the target wasn't the label or input.

## Required Live Region Announcements

| Event | Announcement Pattern |
| :--- | :--- |
| **File Added** | `[Filename] added. [N] files total.` |
| **File Removed** | `[Filename] removed. [N] files total.` |
| **Invalid Type** | `Error: [Filename] is not a supported file type. Allowed: .jpg, .png.` |
| **File Too Large** | `Error: [Filename] exceeds the 5MB limit.` |
| **Upload Progress** | `Uploading [Filename]: [X]% complete.` |
