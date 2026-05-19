# Tooltip Accessibility & Usability Audit

Use this checklist to evaluate whether a tooltip implementation meets modern
accessibility and usability standards.

## 1. Programmatic Association

- [ ] Does the trigger have `aria-describedby` pointing to the tooltip's `id`?
- [ ] Does the tooltip container have `role="tooltip"`?
- [ ] If it's an icon-only button, does the trigger have a clear `aria-label`?

## 2. Triggering & Interaction

- [ ] Does the tooltip appear on mouse hover?
- [ ] Does the tooltip appear on keyboard focus (`Tab`)?
- [ ] Does the tooltip stay visible when the mouse moves from the trigger to the
      tooltip content?
- [ ] Can the tooltip be dismissed using the `Escape` key?
- [ ] Is there a slight delay (approx 300ms) before the tooltip appears on
      hover?

## 3. Visibility & Readability

- [ ] Is the text color contrast at least 4.5:1 against the tooltip background?
- [ ] Is the tooltip positioned so it doesn't cover the trigger or critical
      neighboring info?
- [ ] Does the tooltip remain within the viewport on mobile/small screens?
- [ ] Is the font size at least 12px (ideally 14px+)?

## 4. Common Pitfalls

- [ ] **No Auto-Hide:** Does the tooltip stay visible as long as the trigger is
      hovered/focused (unless dismissed)?
- [ ] **No Content Loss:** Is the tooltip content purely informational (no links
      or buttons)?
- [ ] **No Clipping:** Is the tooltip fully visible (not cut off by
      `overflow: hidden`)?
