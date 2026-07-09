# Technical Notes: Input Masking & Browser Behavior

## The `input` Event vs `keydown`

Always prefer the `input` event for masking.
- **`keydown`:** Occurs before the value is updated. Hard to handle paste,
  autofill, or complex composition (like emoji or accented chars).
- **`input`:** Occurs after the value is updated. Allows you to see the "final"
  state and then format it. It handles almost all entry methods automatically.

## `inputmode` Reference

| Data Type | `inputmode` | Mobile Result |
| :--- | :--- | :--- |
| Credit Card, ZIP | `numeric` | Number pad (0-9) |
| Phone Number | `tel` | Phone pad (includes +, *, #) |
| Currency, Weight | `decimal` | Number pad with decimal point |
| Year, Month | `numeric` | Number pad |

## Selection API and Cursor Stability

When you update `input.value` in JavaScript, the browser usually moves the
text selection (the cursor) to the end of the string. To prevent this:

1.  **Read** `selectionStart` and `selectionEnd` before modifying the value.
2.  **Modify** the value.
3.  **Calculate** where those offsets should now be in the new string.
4.  **Write** them back using `setSelectionRange(start, end)`.

## ARIA Coordination

- **`aria-placeholder`:** Use this if you want to provide a format hint that
  persists even if the standard `placeholder` is hidden or if you are using
  a custom input element.
- **`aria-invalid`:** If a user types a character that the mask allows but the
  validation doesn't (e.g., an expired year in a date), toggle
  `aria-invalid="true"`.

## Performance Tip: `RequestAnimationFrame`

For extremely complex masks or low-end devices, wrapping the `value` update and
`setSelectionRange` in a `requestAnimationFrame` can prevent "flicker" where
the cursor briefly appears at the end of the input before being moved back.
However, for most masks, synchronous updates in the `input` handler are
preferred to avoid "race conditions" with the next keystroke.
