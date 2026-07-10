# Example: Accessible Credit Card Masking

This example demonstrates how to implement a credit card input mask that
maintains cursor stability and accessibility.

## Before: Standard Input

Without masking, users must manually track where they are in the sequence,
leading to errors.

```html
<label for="cc-raw">Credit Card Number</label>
<input type="text" id="cc-raw" inputmode="numeric" placeholder="1234123412341234">
```

## After: Masked Input

The input automatically adds spaces every 4 digits and prevents non-numeric
characters.

### HTML

```html
<div class="field-group">
  <label for="cc-masked">Credit Card Number</label>
  <input
    type="text"
    id="cc-masked"
    inputmode="numeric"
    placeholder="0000 0000 0000 0000"
    autocomplete="cc-number"
    aria-describedby="cc-hint"
  >
  <span id="cc-hint" class="sr-only">Format: 16 digits, spaces will be added automatically.</span>
</div>
```

### JavaScript (The "Stable Cursor" Pattern)

```javascript
const input = document.getElementById('cc-masked');

input.addEventListener('input', (e) => {
  const value = e.target.value;
  const cursorPosition = e.target.selectionStart;

  // 1. Save state
  const unformattedValue = value.replace(/\D/g, '');
  const beforeCursor = value.substring(0, cursorPosition).replace(/\D/g, '');

  // 2. Apply Mask (Credit Card: 4-4-4-4)
  const parts = unformattedValue.match(/.{1,4}/g) || [];
  const formattedValue = parts.join(' ').substring(0, 19);

  // 3. Update Value
  e.target.value = formattedValue;

  // 4. Calculate and Restore Cursor
  // We find how many characters (including spaces) now precede the "raw" chars
  // that were before the cursor.
  let newCursorPos = 0;
  let rawCharsCount = 0;

  while (rawCharsCount < beforeCursor.length && newCursorPos < formattedValue.length) {
    if (/\d/.test(formattedValue[newCursorPos])) {
      rawCharsCount++;
    }
    newCursorPos++;
  }

  e.target.setSelectionRange(newCursorPos, newCursorPos);
});
```

## Key Accessibility & UX Wins

1.  **Cursor Stability:** By calculating `newCursorPos`, the user can go back
    to the middle of the card number to fix a typo without the cursor jumping
    to the end of the input.
2.  **`inputmode="numeric"`:** Ensures mobile users see a number pad, not a
    full keyboard.
3.  **`autocomplete="cc-number"`:** Allows browser autofill to work correctly.
4.  **`aria-describedby`:** Informs screen reader users of the auto-formatting
    behavior.
5.  **Pattern Robustness:** The regex `\D/g` handles pastes containing dashes,
    dots, or spaces gracefully.
