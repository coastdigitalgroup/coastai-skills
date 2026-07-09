# Audit Template: Input Masking & Formatting

Use this checklist to evaluate the quality and accessibility of an input masking
implementation.

## 1. Functional Integrity

- [ ] **Middle-string Edit:** Placing the cursor in the middle of the value and
      typing/deleting works without jumping the cursor to the end.
- [ ] **Paste Support:** Pasting a fully formatted string (e.g., from an email)
      results in a correctly masked field without duplicates.
- [ ] **Paste Support:** Pasting a raw string (no separators) results in a
      correctly masked field.
- [ ] **Backspace Behavior:** Deleting a separator character (like a space or
      dash) either skips it or deletes the preceding digit logically.
- [ ] **Select-All Delete:** Selecting all text (`Cmd/Ctrl + A`) and pressing
      `Backspace` successfully clears the field.

## 2. Mobile & Interaction

- [ ] **Input Mode:** The correct `inputmode` (e.g., `numeric`, `tel`, `decimal`)
      is set to trigger the appropriate mobile keyboard.
- [ ] **Type Selection:** The input `type` is appropriate (`text`, `tel`).
- [ ] **Autofill:** The `autocomplete` attribute is present and correct (e.g.,
      `cc-number`, `tel`).

## 3. Accessibility (WCAG)

- [ ] **ARIA Description:** An `aria-describedby` or `title` provides clear
      instructions on the required format.
- [ ] **Placeholder:** A visible placeholder or `aria-placeholder` shows the
      expected pattern.
- [ ] **Error Announcement:** If the mask enforces a limit, invalid attempts
      trigger a polite announcement or visual feedback.
- [ ] **Screen Reader Reading:** The value is read back sensibly (e.g., "One
      two three four" rather than "One dash two dash...").

## 4. Code Quality

- [ ] **Normalization:** The mask is stripped before data is sent to the
      application state or server.
- [ ] **Event Choice:** Uses the `input` event to handle all forms of data
      entry (keyboard, paste, voice, autofill).
- [ ] **Loop Prevention:** The script ensures it doesn't trigger infinite
      updates when setting the value.
