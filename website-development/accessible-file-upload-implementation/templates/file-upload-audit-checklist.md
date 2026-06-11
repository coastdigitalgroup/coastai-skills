# File Upload Accessibility Audit Checklist

Use this checklist to ensure your custom file upload implementation meets WCAG 2.1 accessibility standards.

## 1. Semantic Structure
- [ ] **Native Fallback:** Is there a hidden `<input type="file">` that remains functional?
- [ ] **Labeling:** Does the uploader have a correctly associated `<label>` or `aria-labelledby`?
- [ ] **Instructions:** Are constraints (file size, types) linked via `aria-describedby`?
- [ ] **Role:** If using a `div` as a drop zone, does it have `role="button"` or `role="region"`?

## 2. Keyboard Interaction
- [ ] **Focusability:** Can the uploader be reached using the `Tab` key?
- [ ] **Focus Indicator:** Is there a clear visual outline when the uploader is focused?
- [ ] **Activation:** Can the file picker be opened using `Enter` or `Space`?
- [ ] **Escape Hatch:** Can the user cancel the upload or remove files using only the keyboard?

## 3. Assistive Technology Support
- [ ] **Live Announcements:** Is an `aria-live` region used to announce "upload started", "success", and "errors"?
- [ ] **Dynamic Content:** When a file is added to the list, is the new list item announced?
- [ ] **Remove Buttons:** Do buttons to delete files have descriptive `aria-label` attributes (e.g., "Remove [filename]")?
- [ ] **Invalid State:** If a file fails validation, is `aria-invalid="true"` applied to the relevant element?

## 4. Visual and Interaction Design
- [ ] **Contrast:** Do all text and icons meet the 4.5:1 (text) and 3:1 (UI components) contrast ratios?
- [ ] **Drag State:** Is there a visual change (color, border) when a file is dragged over the zone?
- [ ] **Touch Targets:** Are all interactive elements (buttons, drop zones) at least 44x44px?
- [ ] **No Auto-Submit:** Does the user have a chance to review selected files before they are permanently uploaded?

## 5. Mobile & Fallbacks
- [ ] **Physical Device Test:** Does the uploader work on iOS/Android (where drag-and-drop might not be supported)?
- [ ] **JS Fallback:** Does the uploader provide a basic experience if JavaScript fails to load?
