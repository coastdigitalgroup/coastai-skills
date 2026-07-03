# File Interaction & State Guidelines

These guidelines define standard patterns for file-related interactions and visual cues within the design system.

## 1. File Type Iconography
When a preview is unavailable (e.g., PDF, ZIP, or before an image is uploaded), use semantic icons:
- **Images:** `image` icon (Blue)
- **Documents:** `file-text` icon (Grey)
- **Video:** `video` icon (Purple)
- **Archives:** `folder-zip` icon (Orange)
- **Code:** `code` icon (Green)

## 2. Progress Visualization
- **Deterministic (Known size):** Use a standard progress bar from 0% to 100%.
- **Indeterministic (Unknown size):** Use a "pulsing" or "infinite loop" animation on the bar until the server responds with progress.
- **The "Finalizing" State:** Once progress hits 100%, change the label to "Finalizing..." or "Scanning..." if server-side processing is required.

## 3. Success and Error Colors
Follow the parent system's semantic color tokens:
- **Success:** `--color-success-700` (Text) / `--color-success-100` (Background).
- **Error:** `--color-error-700` (Text) / `--color-error-100` (Background).
- **Warning:** `--color-warning-700` (Text) / `--color-warning-100` (Background) — used for "Duplicate File" or "Resolution Low" warnings.

## 4. Interaction Best Practices
- **Undo Deletion:** Instead of a complex confirmation modal for every file deletion, consider a "File deleted. [Undo]" toast notification.
- **Drag-and-Drop Boundaries:** If the entire page supports file drops, provide a "Fullscreen Overlay" that appears only when a file enters the browser window.
- **Multiple Triggers:** Always provide a secondary "Click to browse" link for users who are uncomfortable with drag-and-drop or using assistive technology.

## 5. Accessibility References
- **WCAG 2.1 Success Criterion 1.4.3 (Contrast):** Ensure text on progress bars and status badges meets 4.5:1.
- **WCAG 2.1 Success Criterion 2.1.1 (Keyboard):** All upload actions must be reachable via `Tab` and triggered via `Enter/Space`.
- **ARIA Live Regions:** Use `aria-live="polite"` for progress updates to avoid overwhelming the user with frequent announcements. Use `aria-live="assertive"` for critical error messages.
