# Accessibility Checkpoints for File Uploads

To ensure a file upload component meets WCAG 2.2 standards, use this checklist during development and auditing.

## 1. Operability (Keyboard & Touch)
- [ ] **Tab Order:** The uploader must be reachable via the `Tab` key.
- [ ] **Trigger Action:** Users must be able to open the file picker using `Space` or `Enter` when the uploader is focused.
- [ ] **Drag-and-Drop Fallback:** The component MUST provide a standard click-to-upload method. Drag-and-drop must not be the only way to upload files.
- [ ] **Focus Management:**
    - After selecting a file, focus should remain on or return to the uploader.
    - When a file is removed from the list, focus must move to a logical neighbor (the next/previous item or the uploader itself) instead of resetting to the top of the `<body>`.

## 2. Robustness (Screen Readers)
- [ ] **Role & Labeling:**
    - The drop zone should have `role="region"` and an `aria-label` explaining its purpose.
    - If a custom button is used, it should have `role="button"`.
- [ ] **Status Announcements (`aria-live`):**
    - **Success:** Announce when files are successfully added (e.g., "File resume.pdf added").
    - **Progress:** For large files, announce significant milestones (e.g., "Uploading... 50%").
    - **Error:** Announce validation failures immediately using `aria-live="assertive"`.
    - **Removal:** Announce when a file is removed.
- [ ] **Dynamic Content:**
    - The list of uploaded files should be marked up as a list (`<ul>` or `<ol>`) so screen readers announce the number of items.
    - Every "Remove" button must have an `aria-label` that includes the filename (e.g., `aria-label="Remove photo-1.jpg"`).

## 3. Perceivability (Visual)
- [ ] **Focus Indicator:** There must be a high-contrast visual indicator (ring or border change) when the uploader or its buttons are focused.
- [ ] **Contrast:** All status text, labels, and icons must meet WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI components).
- [ ] **Error Visualization:** Errors must not be signaled by color alone. Use icons and descriptive text to indicate a failed upload.
- [ ] **Redundant Cues:** Use visual changes (like dashed borders or background highlights) during drag events to signal that the drop zone is active.

## 4. Browser Behavior Notes
- **`input[type="file"]` Visibility:** Browsers ignore `.click()` calls on file inputs that are `display: none`. Use `opacity: 0` or `clip-path` to hide the input while keeping it functional and focusable.
- **Drag-and-Drop API:** Always prevent the default behavior on `dragover` and `drop` events, or the browser will attempt to open the file in the tab instead of uploading it.
- **`URL.createObjectURL`:** Remember to revoke object URLs (`URL.revokeObjectURL(url)`) when previews are removed to prevent memory leaks in long-running sessions.
