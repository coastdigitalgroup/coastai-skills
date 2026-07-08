---
name: input-masking-and-formatting
description:
  Implement and debug accessible, real-time input formatting for structured
  data like phone numbers, credit cards, and dates, ensuring cursor stability
  and browser autofill compatibility.
---

# Input Masking and Formatting

## Purpose

The Input Masking and Formatting skill provides a technical protocol for
transforming user input into a structured format (e.g., `(123) 456-7890`) in
real-time. It solves the UX problem of "guess the format" while preventing
common implementation bugs like "jumping cursors" and inaccessible screen reader
announcements.

## Use Cases

- **Payment Forms:** Formatting credit card numbers (4-4-4-4) and expiration
  dates (MM/YY).
- **Contact Information:** Formatting phone numbers according to local or
  international standards.
- **Identity & Finance:** Formatting Social Security Numbers, IBANs, or tax
  identifiers.
- **Dates:** Implementing simple date masks for birthday or expiry fields when
  native date pickers are not suitable.

## When NOT to Use

- **Passwords:** Never format or mask passwords in real-time; it can interfere
  with password managers and expose character counts.
- **Free-text Fields:** Fields like "Name" or "Address" should not have
  restrictive masks.
- **Native Date Pickers:** If `<input type="date">` provides a better mobile
  experience and meets design needs, prefer the native implementation.
- **Complex Search:** Do not mask search inputs where the user might search for
  varied formats.

## Inputs

1. **Target Input:** The `<input>` element to be controlled.
2. **Mask Pattern:** The desired visual structure (e.g., `#### #### #### ####`).
3. **Character Type:** The allowed characters (e.g., numeric only, alphanumeric).
4. **Input Mode:** The desired mobile keyboard trigger (`inputmode="numeric"`,
   `tel`, etc.).

## Outputs

1. **Formatted UI Value:** The string displayed in the input field with
   separators.
2. **Clean Data Value:** The "raw" string (e.g., digits only) ready for backend
   submission.
3. **Cursor Management:** Precise placement of the text cursor after a format
   event.
4. **ARIA State:** Live updates that inform screen readers of the value without
   redundancy.

## Workflow

### 1. Configure the Element

- Set the appropriate `type` (usually `text` or `tel`).
- Set `inputmode` to trigger the correct mobile keyboard.
- Disable `autocomplete` if the mask is extremely custom, or set it
  appropriately (e.g., `cc-number`) to allow browser help.

### 2. Capture the Event

- Use the `input` event for real-time formatting.
- Avoid `keyup` or `keydown` for formatting logic as they don't capture all
  input methods (like pasting or voice-to-text).
- Track the cursor's `selectionStart` **before** the value is changed.

### 3. Normalize the Data

- Strip all non-essential characters (separators) from the current `input.value`.
- Apply character limits based on the raw data length, not the masked length.

### 4. Apply the Mask

- Re-insert separators based on the normalized data.
- For dynamic masks (like international phones), determine the pattern based on
  the first few digits (BIN for cards, country code for phones).

### 5. Manage Cursor Position (The "Jumping Cursor" Fix)

- Calculate the new cursor position by counting how many "raw" characters were
  before the cursor before formatting.
- Re-apply `selectionStart` and `selectionEnd` to the input element after the
  new value is set.

### 6. Communicate via ARIA

- Use `aria-placeholder` to show the expected format.
- Ensure the mask characters (like dashes) aren't announced redundantly by using
  `aria-label` or `aria-describedby` to provide the clear value if necessary.

## Decision Rules

- **Strict Masking vs. Auto-formatting:**
  - **Strict Masking:** Blocks invalid characters as they are typed. Use for
    highly rigid data like Credit Cards.
  - **Auto-formatting:** Allows characters but adds separators on-the-fly or
    on-blur. Use for fields where users might copy-paste varied formats.
- **Pasting:** Always handle pastes by cleaning the entire clipboard string
  before applying the mask.
- **Deleting:** If a user hits "Backspace" on a separator (like a space in a
  credit card), ensure the logic doesn't immediately re-add it, which would trap
  the user.

## Constraints

- **Autofill Compatibility:** Do not let the mask logic break the browser's
  ability to fill the field. If a value comes in all at once, format it
  completely.
- **Selection/Highlighting:** Ensure that if a user highlights text, typing a
  new character correctly replaces the selection without breaking the mask.
- **Mobile Interaction:** Be aware that some mobile browsers handle
  `selectionStart` differently; always test on physical devices.

## Non-Goals

- Comprehensive international phone number validation (use a library like
  `libphonenumber`).
- Server-side data sanitization (this skill is frontend-only).
- Styling the input appearance (CSS).

## Common Failure Patterns

- **The Jumping Cursor:** Updating `input.value` without manually resetting
  the selection range, causing the cursor to fly to the end of the line.
- **Backspace Trap:** Formatting logic that prevents a user from deleting
  characters because the separator is automatically re-inserted.
- **Broken Autofill:** Logic that only triggers on `keypress`, missing browser
  auto-fill events or paste actions.
- **Redundant Announcements:** Screen readers reading out "dash dash dash" or
  the entire value on every keystroke.
- **Non-Numeric Inputs:** Forgetting to allow only digits, leading to messy
  values being submitted to the database.

## Validation Steps

- [ ] **Cursor Stability Test:** Type in the middle of a formatted value. The
      cursor should stay exactly where it is relative to the characters.
- [ ] **Backspace Test:** Delete a separator and the character before it. It
      should delete cleanly.
- [ ] **Autofill Test:** Use browser autofill (e.g., for a Credit Card) and
      verify the mask applies correctly to the whole value.
- [ ] **Paste Test:** Paste a value with extra characters (e.g., `(555) 555-5555`)
      into a numeric-only field and verify it cleans and formats.
- [ ] **Screen Reader Test:** Verify the value is announced clearly and that
      separators don't cause excessive noise.
- [ ] **Inputmode Test:** On a mobile device, verify that clicking the field
      opens the correct keyboard (e.g., number pad for cards).
