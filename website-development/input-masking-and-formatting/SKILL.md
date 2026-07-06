---
name: input-masking-and-formatting
description:
  Implement and debug real-time input masking and formatting for data types like
  phone numbers, credit cards, and currency, ensuring accessibility and correct
  cursor management.
---

# Input Masking and Formatting

## Purpose

The Input Masking and Formatting skill provides a technical framework for
improving data entry accuracy and user experience by automatically formatting
input values in real-time. It solves the challenge of guiding users through
specific data formats (e.g., `(123) 456-7890` or `4444 4444 4444 4444`) without
breaking native browser behavior, accessibility, or the ability to delete
content.

## Use Cases

- Formatting phone numbers into standard regional formats.
- Grouping credit card numbers for better readability.
- Adding separators to dates (e.g., `MM / DD / YYYY`).
- Real-time currency formatting with prefixes and decimal constraints.
- Implementing "Fixed-Width" masks where only specific characters are allowed
  at specific positions.

## When NOT to Use

- **Simple Validation:** If you only need to ensure a value is correct before
  submission, use standard HTML5 validation or the `robust-form-implementation`
  skill.
- **Passwords:** Masking logic can interfere with password managers and
  accessibility on sensitive fields.
- **Free-text Fields:** Comments, names, or addresses should not be restricted
  by rigid masks.
- **Native Browser Pickers:** Use `<input type="date">` or `<input type="color">`
  where browser-native pickers provide a superior experience to a text mask.

## Inputs

1. **Format Pattern:** The target visual structure (e.g., `###-###-####`).
2. **Input Type:** The semantic purpose (e.g., `tel`, `text`, `number`).
3. **Allowed Characters:** Regex or character sets permitted in the input.
4. **Data Requirements:** Should the output include formatting (masked) or be
   clean (unmasked) data?

## Outputs

1. **Masked Input Logic:** JavaScript handlers for `input` or `beforeinput`
   events that transform user entry.
2. **Cursor Management:** Logic to preserve the user's cursor position during
   asynchronous formatting.
3. **Accessible Metadata:** Correct use of `placeholder`, `aria-label`, and
   `inputmode` to guide assistive technologies.
4. **Data Sync:** A method to retrieve the "unmasked" (raw) value for API
   submission.

## Workflow

### 1. Select the Semantic Input Mode

- Use `type="tel"` for phone numbers to trigger the correct mobile keyboard.
- Use `inputmode="numeric"` for credit cards or IDs to show a number pad while
  allowing formatting characters.
- Avoid `type="number"` for fields requiring formatting, as it doesn't support
  non-numeric characters like spaces or dashes.

### 2. Implement the Transformation Logic

- Listen for the `input` event (or `beforeinput` for more control).
- **Step A:** Strip all existing formatting characters to get the "raw" value.
- **Step B:** Re-apply the mask pattern based on the raw value's length.
- **Step C:** Update the input value with the new masked string.

### 3. Manage Cursor Position (The "Jump" Problem)

- Updating an input value programmatically often moves the cursor to the end.
- Save the current `selectionStart` before formatting.
- Calculate the new cursor position by counting how many "raw" characters were
  before the cursor, and finding the new index of the same raw character in the
  formatted string.
- Restore the cursor position using `setSelectionRange`.

### 4. Handle Deletions Correctly

- Ensure that pressing `Backspace` at a separator (like a dash or space)
  doesn't get "stuck" because the formatter immediately re-adds it.
- Listen for the `keydown` event to detect backspace and manually handle the
  deletion of the preceding "raw" character if a separator is in the way.

### 5. Provide Clear Visual Cues

- Use a `placeholder` that matches the expected mask (e.g., `(555) 555-5555`).
- Optionally use a persistent mask (where characters like `_` are visible for
  empty slots) only if it doesn't confuse screen readers.

## Decision Rules

- **Client-Side vs. Submission Data:** Always store the "clean" unmasked data
  in a hidden field or a data variable. Most APIs expect `1234567890`, not
  `(123) 456-7890`.
- **`input` vs. `change` event:** Use `input` for real-time formatting. Use
  `change` only if you want to format once the user leaves the field (less
  obtrusive but less helpful).
- **Hard vs. Soft Constraints:** If a user pastes a value with different
  formatting, the logic should be robust enough to strip and re-format rather
  than rejecting the paste.

## Constraints

- **Accessibility:** Screen readers should announce the value as it is
  formatted. Avoid complex masks that cause the screen reader to repeat the
  entire value on every keystroke.
- **Mobile Keyboards:** Ensure `inputmode` is set correctly so users don't have
  to switch keyboard layouts manually.
- **Performance:** Formatting logic must be extremely fast (< 10ms) to avoid
  typing lag.

## Non-Goals

- Implementing server-side data validation.
- Building a full "Date Picker" UI (this skill is for text masking only).
- Creating complex "Typewriter" or animation effects for inputs.

## Common Failure Patterns

- **The "Cursor Jump":** Setting `value` without restoring cursor position,
  frustrating users who try to edit the middle of the string.
- **The "Backspace Trap":** User presses backspace on a separator, and the JS
  immediately re-adds it, making it impossible to delete.
- **Over-restriction:** Preventing a user from pasting a valid number because
  it contains brackets or spaces the mask didn't expect.
- **Screen Reader Noise:** Every keystroke causing a full value re-read, which
  is distracting for assistive technology users.
- **Missing `inputmode`:** Users on mobile having to use the full QWERTY
  keyboard for a numeric-only field.

## Validation Steps

- [ ] **Typing Test:** Verify that typing a number automatically adds the
      correct separators in the correct places.
- [ ] **Middle-Edit Test:** Move the cursor to the middle of the string and
      add/remove characters. Verify the cursor stays in the correct relative
      position.
- [ ] **Backspace Test:** Verify that deleting a character immediately after
      a separator works as expected (deletes both the separator and the character).
- [ ] **Paste Test:** Copy a formatted value (e.g., from an email) and paste
      it. Verify it is correctly processed and re-formatted.
- [ ] **Screen Reader Check:** Use VoiceOver or NVDA to ensure the value
      announcements are predictable and not excessively repetitive.
- [ ] **Unmasked Value Check:** Inspect the data being sent to the server to
      ensure it is the "raw" unmasked version.
