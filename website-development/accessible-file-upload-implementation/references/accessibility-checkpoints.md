# Accessibility Checkpoints for File Uploaders

## ARIA Roles and Attributes

| Attribute | Purpose | Implementation Note |
| :--- | :--- | :--- |
| `role="button"` | Identifies the drop zone as interactive. | Use on the container if it triggers the file picker. |
| `aria-labelledby` | Names the uploader. | Point to the main "Upload" text. |
| `aria-describedby` | Provides additional instructions. | Point to text describing file limits and formats. |
| `aria-live="polite"` | Announces status updates. | Use for success messages and progress. |
| `aria-live="assertive"` | Announces critical errors. | Use for immediate validation failures. |
| `aria-invalid="true"` | Indicates a validation error. | Apply to the uploader or the specific file item. |

## Keyboard Mapping

| Key | Action | Requirement |
| :--- | :--- | :--- |
| `Tab` | Navigation | Move focus into and out of the uploader. |
| `Enter` / `Space` | Activation | Open the native system file picker. |
| `Escape` | Cancel | Close the file picker (handled by OS) or clear selection. |
| `Delete` / `Backspace` | Removal | Remove the focused file from the selection list. |

## Screen Reader Announcements

1. **On Focus:** "Upload documents, button. Maximum file size 5MB."
2. **On Selection:** "3 files selected."
3. **On Upload Success:** "Upload complete. Your files have been saved."
4. **On Error:** "Error: file-name.exe is an unsupported file type."

## Implementation Gotchas

- **Focus Loss:** When a user clicks a "Remove" button and the item is deleted, the focus often disappears. **Fix:** Programmatically move focus to the next item or back to the uploader.
- **Double Labels:** Avoid putting the native `<input type="file">` inside a `<label>` if the parent container also has a click listener, as this can trigger the file picker twice in some browsers.
- **Progressive Enhancement:** Ensure the `<input type="file">` is only hidden *after* JavaScript has initialized the custom uploader UI.
