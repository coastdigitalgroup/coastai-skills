# File Upload Accessibility & UX Audit Checklist

Use this template to audit existing file upload components or to verify a new
implementation against accessibility and usability standards.

## 1. Semantic Structure & Native Support
- [ ] **Native Input:** Is there a hidden (but reachable) `<input type="file">`?
- [ ] **Labeling:** Does the input have an associated `<label>` via `for` and `id`?
- [ ] **MIME Types:** Does the input use the `accept` attribute to guide the user?
- [ ] **Multiple Support:** Is the `multiple` attribute used correctly for the
      intended use case?
- [ ] **Visually Hidden Pattern:** Is the native input hidden using a
      `visually-hidden` CSS class rather than `display: none`?

## 2. Keyboard & Focus Management
- [ ] **Trigger Focus:** Can the user tab to the upload trigger (button or region)?
- [ ] **Activation:** Can the file picker be opened using the `Enter` or `Space` key?
- [ ] **Focus Restoration:** After selecting files, does the focus return to the
      upload trigger or a logical next step?
- [ ] **Action Focus:** Are "Remove" or "Cancel" buttons in the file list reachable
      via the keyboard?
- [ ] **Post-Removal Focus:** When a file is removed, does focus move to a logical
      place (the next item or the trigger) instead of the top of the page?

## 3. Drag and Drop Implementation
- [ ] **Keyboard Fallback:** Is the component fully functional without using
      drag-and-drop?
- [ ] **Visual Feedback:** Does the drop zone clearly change its visual state
      during `dragover`?
- [ ] **Drop Zone Labeling:** If the drop zone is a large region, does it have
      `role="region"` and an `aria-label`?
- [ ] **Accessibility Announcement:** Does a screen reader announce when the
      active drag-and-drop zone is entered?

## 4. Status & Feedback (ARIA)
- [ ] **Selection Announcement:** Is the number of files selected announced via
      an `aria-live` region?
- [ ] **Progress Updates:** Do upload progress bars use `role="progressbar"` or
      the `<progress>` element?
- [ ] **Completion Feedback:** Is the user notified when an upload finishes
      successfully?
- [ ] **Error Announcement:** Are validation errors (e.g., "File too large")
      announced using `aria-live="assertive"` or `role="alert"`?

## 5. File List Management
- [ ] **File Names:** Are the names of selected files visible and readable by
      screen readers?
- [ ] **Descriptive Actions:** Do removal buttons have unique labels
      (e.g., `aria-label="Remove image-1.jpg"`)?
- [ ] **Empty State:** Is there clear text when no files have been selected yet?

## 6. Visual Design & Mobile
- [ ] **Tap Targets:** Are all interactive elements (buttons, drop zones) at
      least 44x44px?
- [ ] **Contrast:** Do progress bars and status icons meet WCAG 2.1 AA
      contrast requirements (3:1 for graphics, 4.5:1 for text)?
- [ ] **Reduced Motion:** If there are upload animations, do they respect the
      `prefers-reduced-motion` media query?
