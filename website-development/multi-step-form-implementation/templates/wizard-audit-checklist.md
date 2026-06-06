# Multi-Step Form (Wizard) Accessibility Audit Checklist

Use this checklist to ensure your multi-step form implementation meets WCAG AA standards and provides a robust experience for assistive technology users.

## 1. Structure & Landmarks
- [ ] The entire sequence is wrapped in a `<form>` or each step is a logical `<region>`/`<group>`.
- [ ] Each step has a unique, descriptive heading (`<h2>`–`<h6>`).
- [ ] The progress indicator is wrapped in a `<nav>` element with `aria-label="Progress"`.

## 2. Focus Management
- [ ] When clicking "Next", focus is moved to the top of the new step (e.g., the heading or first input).
- [ ] When clicking "Back", focus is moved to a logical element in the previous step (e.g., the "Next" button or the step container).
- [ ] Elements in hidden steps are removed from the tab order (`display: none`, `hidden`, or `tabindex="-1"`).
- [ ] No "focus traps" exist where a user cannot navigate back or out of the form.

## 3. Dynamic Announcements
- [ ] An `aria-live="polite"` region (visible or `sr-only`) announces the current step number and title upon transition.
- [ ] Validation errors are announced immediately or linked to inputs via `aria-describedby`.
- [ ] Loading states (during intermediate data saves) are announced via `aria-busy="true"` or a live region.

## 4. Progress Indication
- [ ] The current step in the visual progress bar is marked with `aria-current="step"`.
- [ ] Steps already completed are visually and programmatically distinct (e.g., using a checkmark icon with `aria-label="Completed"`).

## 5. Form Interaction & Validation
- [ ] Validation is performed per-step; users are blocked from proceeding but NOT from going backward.
- [ ] Previously entered data is preserved when a user navigates back.
- [ ] A "Review" step is provided before final submission for sequences with 3+ steps.
- [ ] All inputs have associated `<label>` elements.
- [ ] Error messages are programmatically linked to their respective inputs using `aria-describedby`.

## 6. Keyboard Support
- [ ] The entire form can be completed using only the `Tab`, `Space`, and `Enter` keys.
- [ ] The "Back" button is reachable and functional via keyboard.
- [ ] If custom select/radio components are used, they follow standard ARIA keyboard patterns.
