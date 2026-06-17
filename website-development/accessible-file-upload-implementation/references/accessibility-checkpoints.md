# Accessibility Checkpoints: File Uploads

To comply with WCAG 2.1/2.2 and provide a robust experience for assistive technology, verify your file upload implementation against these checkpoints.

## 1. Perceivable

- [ ] **Visible Label:** Ensure the upload trigger has a visible, clear text label (WCAG 3.3.2).
- [ ] **Instructional Text:** Provide clear instructions on accepted file types and size limits before the user starts the upload (WCAG 3.3.2).
- [ ] **Contrast:** Ensure all text, icons, and focus indicators meet minimum contrast requirements (4.5:1 for text, 3:1 for UI components).
- [ ] **Status Announcements:** Use `aria-live` to announce when files are successfully added or removed, so screen reader users are aware of the state change without moving focus.

## 2. Operable

- [ ] **Keyboard Access:** The entire flow must be navigable via keyboard. This includes triggering the picker, dragging/dropping (via the fallback picker), and removing files from the list (WCAG 2.1.1).
- [ ] **Focus Management:**
    - [ ] When the file picker dialog closes, focus must return to the trigger element.
    - [ ] When a file is removed from the selection list, focus should move to a logical next element (e.g., the next item in the list or the upload trigger) rather than being lost.
- [ ] **No Keyboard Trap:** Ensure users can tab into and *out of* the upload component (WCAG 2.1.2).
- [ ] **Touch Targets:** For mobile users, ensure the "Click to upload" area and all "Remove" buttons are at least 44x44px.

## 3. Understandable

- [ ] **Error Identification:** If a file fails validation (size, type), the error must be clearly identified in text and associated with the input using `aria-describedby` (WCAG 3.3.1).
- [ ] **Descriptive Labels:** Buttons like "Remove" must include the filename in their accessible name (e.g., `<button aria-label="Remove image.jpg">`) so users know exactly which file they are deleting.

## 4. Robust

- [ ] **Native Fallback:** Ensure that even if JavaScript fails, the basic `<input type="file">` is still functional and accessible.
- [ ] **Valid ARIA:** Use `role="alert"` for critical errors and `role="status"` (or `aria-live="polite"`) for general feedback. Avoid nesting live regions.

## Summary of ARIA Attributes

| Attribute | Purpose |
| :--- | :--- |
| `aria-describedby` | Links the input to instructions or error messages. |
| `aria-live="polite"` | Announces file selection/removal without interrupting the user. |
| `aria-live="assertive"` | Announces critical errors immediately. |
| `aria-label` | Provides a specific label for "Remove" buttons (e.g., "Remove [filename]"). |
| `aria-hidden="true"` | Hides decorative icons from screen readers. |
