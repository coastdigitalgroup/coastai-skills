# File Upload Accessibility Audit Checklist

Use this checklist to audit existing file upload components or verify new implementations.

## 1. Semantic Structure & Labeling
- [ ] **Native Fallback:** Is there a native `<input type="file">` present?
- [ ] **Label Association:** Does the input have an associated `<label>` (using `for` and `id`)?
- [ ] **Instructions:** Are file type and size constraints clearly communicated and linked via `aria-describedby`?
- [ ] **Visible Label:** Is there a visible label or button to trigger the upload, rather than relying solely on drag-and-drop?

## 2. Keyboard & Interaction
- [ ] **Tab Order:** Is the upload trigger (label or button) reachable via the `Tab` key?
- [ ] **Activation:** Can the file picker be opened using `Enter` or `Space`?
- [ ] **No Double-Trigger:** Does clicking the drop zone open the file picker only once?
- [ ] **Focus Management:** When a file is removed from the list, does focus move to a logical next element (the next remove button or the drop zone) instead of resetting to the `body`?

## 3. Screen Reader Feedback (ARIA)
- [ ] **Live Region:** Is there an `aria-live="polite"` region for status updates?
- [ ] **Addition Announcement:** Are file names announced when added?
- [ ] **Removal Announcement:** When a file is removed, does the live region announce the removal AND the updated total file count? (e.g., "Image.png removed. 2 files total.")
- [ ] **Error Announcement:** Are validation errors (invalid type, file too large) announced immediately?
- [ ] **Progress Updates:** For large files, is progress announced at regular intervals?

## 4. Visual Integrity & State
- [ ] **Drop Zone Indication:** Is there a clear visual change when a file is dragged over the drop zone?
- [ ] **File List:** Are selected files displayed in a clear list?
- [ ] **Removal Action:** Does each file in the list have a "Remove" button with a descriptive `aria-label`?
- [ ] **Touch Targets:** Are all interactive elements (buttons, links, triggers) at least 44x44px in size?

## 5. Robustness & Validation
- [ ] **Client-side Validation:** Does the component check file types and sizes before attempting an upload?
- [ ] **Accepted Types:** Does the `<input>` use the `accept` attribute to guide the OS file picker?
- [ ] **Multi-file Support:** If multiple files are allowed, is the `multiple` attribute applied and handled correctly in the UI?
