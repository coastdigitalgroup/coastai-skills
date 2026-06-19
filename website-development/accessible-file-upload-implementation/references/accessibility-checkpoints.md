# Accessibility Checkpoints for File Uploads

## WCAG Compliance Checklist

### 1. Perceivable
- [ ] **Text Alternatives (1.1.1):** Ensure all non-text content (icons, thumbnails) has a text alternative or is marked as decorative (`alt=""`).
- [ ] **Contrast (1.4.3):** Check that text, labels, and borders of the drop zone have a contrast ratio of at least 4.5:1 (3:1 for large text and UI components).
- [ ] **Status Messages (4.1.3):** Use ARIA live regions to announce the results of uploads and deletions without moving focus.

### 2. Operable
- [ ] **Keyboard Accessible (2.1.1):** All functionality must be available via keyboard. Users must be able to trigger the file picker and manage the file list using `Tab`, `Enter`, and `Space`.
- [ ] **No Keyboard Trap (2.1.2):** Ensure focus doesn't get stuck inside the uploader or the file picker dialog.
- [ ] **Focus Visible (2.4.7):** Provide clear, high-contrast focus indicators for the drop zone, the hidden input (when focused), and all "Remove" buttons.
- [ ] **Pointer Gestures (2.5.1):** While drag-and-drop is a convenience, it must not be the *only* way to upload files. A standard click/keyboard-activated file picker must be available.

### 3. Understandable
- [ ] **Labels or Instructions (3.3.2):** Provide clear labels for the input and instructions regarding file type and size limits. Use `aria-describedby` to link instructions to the input.
- [ ] **Error Suggestion (3.3.3):** If a file is rejected (e.g., wrong type), provide a specific reason in the announcement.

## ARIA Pattern: File Upload

| Attribute | Applied To | Purpose |
|-----------|------------|---------|
| `role="status"` | Wrapper div | Turns the container into a live region for non-critical updates. |
| `aria-live="polite"` | Wrapper div | Ensures screen readers announce content changes when the user is idle. |
| `aria-atomic="true"`| Wrapper div | Forces the screen reader to read the entire message when part of it changes. |
| `aria-invalid` | Native Input | Indicates that the current selection contains errors. |
| `aria-describedby`| Native Input | Links the input to hints (limits) or the list of already selected files. |
| `aria-label` | Remove Button | Provides context for which file will be removed (e.g., "Remove photo.jpg"). |

## Implementation Tips

- **The Hidden Input Hack:** When hiding the native `<input type="file">` to style a custom button, use `opacity: 0` and position it over the button, or use the `label for` attribute. Never use `display: none` or `visibility: hidden` if you want it to remain focusable.
- **Focus Management:** If the user removes a file, consider where the focus should go. If it was the last item in a list, move focus back to the "Add File" trigger or the container.
- **Progressive Enhancement:** Ensure the native file input works if JavaScript fails to load. The drag-and-drop and local preview features should be treated as enhancements.
