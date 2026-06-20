# Accessibility Checkpoints for File Uploads

When implementing or auditing a file upload component, ensure it meets the following WCAG-aligned criteria.

## 1. Perceivable

- **Visible Labels:** Every upload input must have a visible label (WCAG 3.3.2). Do not rely on placeholders or instructions inside the drop zone alone.
- **Visual Cues for Drag-and-Drop:** Provide a clear visual change (e.g., border color, background shift) when a file is dragged over the target area.
- **Contrast:** Ensure all text and the boundaries of the upload zone meet contrast requirements (4.5:1 for text, 3:1 for UI components).

## 2. Operable

- **Keyboard Access:** The upload trigger (the "Browse" button) must be reachable via the `Tab` key and activatable via `Enter` or `Space`.
- **Drag-and-Drop is Optional:** Never make drag-and-drop the *only* way to upload a file. A standard file selection dialog must always be available (WCAG 2.1.1).
- **Focus Management:**
  - When an error occurs, consider moving focus to the error message or the input.
  - If a file is removed from a list, move focus to the next logical element (e.g., the previous "Remove" button or the upload trigger) rather than letting focus drop to the `<body>`.

## 3. Understandable

- **Instructions:** Use `aria-describedby` to link the input to instructions about file types, size limits, and count limits.
- **Error Messages:** Errors should be clear, specific, and programmatically associated with the input or announced via `role="alert"`.

## 4. Robust

- **Native Input Usage:** Use `<input type="file">` even if it is visually hidden. This ensures that assistive technologies recognize the element's purpose and native behaviors (like triggering the OS file picker) are preserved.
- **Live Region Updates:** Use `aria-live` to announce status changes that aren't otherwise focused:
  - "File photo.jpg successfully added."
  - "Removing file document.pdf."
  - "Upload progress: 50%."

## Implementation Tips

- **The "Visually Hidden" Pattern:**
  Use a CSS class that hides the input from sight but keeps it in the accessibility tree and tab order. Avoid `display: none`.
- **Label as Trigger:**
  Wrapping the "Browse" button text in a `<label for="input-id">` is the most robust way to trigger the native file picker without complex JavaScript.
- **Preventing Memory Leaks:**
  Always call `URL.revokeObjectURL(url)` when an image preview is removed from the DOM.
