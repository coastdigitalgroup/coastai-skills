# File Upload Technical Reference

## ARIA Roles and Attributes for Uploaders

| Attribute | Applied To | Purpose |
|-----------|------------|---------|
| `role="region"` | Drop Zone Container | Defines the drop zone as a landmark if it covers a significant portion of the page. |
| `aria-label` | Drop Zone / Container | Provides a descriptive name (e.g., "Document Upload Area"). |
| `aria-live="polite"` | Hidden Status Div | Announces file selections and successful uploads without interrupting the user. |
| `aria-live="assertive"` | Hidden Error Div | Immediately announces critical errors like "Upload Failed". |
| `role="progressbar"` | Progress Indicator | Communicates the numeric progress of an upload to assistive technologies. |
| `aria-valuenow` | Progress Bar | The current percentage of the upload (0-100). |
| `aria-describedby` | File Input | Links the input to helper text or error messages. |

## The "Visually Hidden" Pattern

To ensure a native `<input type="file">` remains accessible to screen readers
while being visually replaced by a custom UI, use the following CSS pattern:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Avoid `display: none` or `visibility: hidden`, as these will remove the
element from the accessibility tree, making it impossible for keyboard or
screen reader users to trigger the file picker.

## Browser Support & The File API

### The `accept` Attribute
The `accept` attribute is widely supported but should be used carefully:
- Use MIME types (`image/jpeg`, `application/pdf`) or file extensions (`.jpg`, `.pdf`).
- On mobile (iOS/Android), `accept="image/*"` will often trigger the camera
  interface directly.

### DataTransfer vs. Input Change
- When a user selects a file via the native picker, the files are available
  at `input.files`.
- When a user drops a file, the files are available at `event.dataTransfer.files`.
- **Pro Tip:** You cannot programmatically set the value of an `<input type="file">`
  for security reasons, but you can assign a `FileList` object to it in some
  modern browsers, or more commonly, keep a separate array of `File` objects
  in your JavaScript state for the actual upload logic.

## Security Considerations
- **Client-side validation:** Always check `file.size` and `file.type` before
  starting an upload to provide immediate feedback.
- **Filename Sanitization:** Never trust the `file.name` provided by the client;
  ensure the server renames or sanitizes the file before saving it to disk.
- **Large Files:** For files over 100MB, consider using the `Blob.slice()`
  method to implement chunked uploads, which are more resilient to network
  interruptions.
