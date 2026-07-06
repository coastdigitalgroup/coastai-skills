# Example: Input Masking and Formatting

This example demonstrates how to implement a robust phone number mask using vanilla JavaScript, addressing common pitfalls like cursor jumping and backspace trapping.

## Problem (Before)

Without masking, users often enter data inconsistently, and simple "on input" formatters cause the cursor to jump to the end of the field, making editing impossible.

```html
<!-- Hard to read, inconsistent data -->
<label for="phone-raw">Phone Number:</label>
<input type="tel" id="phone-raw" placeholder="1234567890">
```

## Solution (After)

A robust implementation that provides real-time feedback, preserves cursor position, and handles deletions gracefully.

### HTML

```html
<div class="form-group">
  <label for="phone-masked">Phone Number:</label>
  <input
    type="tel"
    id="phone-masked"
    placeholder="(555) 555-5555"
    inputmode="numeric"
    autocomplete="tel"
  >
  <p id="phone-error" class="error-msg" aria-live="polite"></p>
</div>
```

### JavaScript

```javascript
const phoneInput = document.getElementById('phone-masked');

phoneInput.addEventListener('input', (e) => {
  const input = e.target;
  let cursorPosition = input.selectionStart;
  const originalValue = input.value;

  // 1. Get raw numbers only
  const rawValue = originalValue.replace(/\D/g, '').substring(0, 10);

  // 2. Build the formatted string
  let formattedValue = '';
  if (rawValue.length > 0) {
    formattedValue = '(' + rawValue.substring(0, 3);
    if (rawValue.length > 3) {
      formattedValue += ') ' + rawValue.substring(3, 6);
    }
    if (rawValue.length > 6) {
      formattedValue += '-' + rawValue.substring(6, 10);
    }
  }

  // 3. Update the value
  input.value = formattedValue;

  // 4. Calculate and restore cursor position
  // This logic ensures the cursor doesn't jump to the end
  const charactersBeforeCursor = originalValue.substring(0, cursorPosition).replace(/\D/g, '').length;

  let newCursorPos = 0;
  let numberCount = 0;
  for (let i = 0; i < formattedValue.length; i++) {
    if (/\D/.test(formattedValue[i])) {
       // It's a mask character, skip it if we haven't reached our number count
    } else {
      numberCount++;
    }
    newCursorPos = i + 1;
    if (numberCount === charactersBeforeCursor) break;
  }

  input.setSelectionRange(newCursorPos, newCursorPos);
});

// Handle backspace trap
phoneInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    const input = e.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    // If cursor is at a separator (e.g., after ') ' or '-'),
    // manually remove the digit before it to avoid the "trap".
    if (start === end && start > 0) {
      const charBefore = input.value[start - 1];
      if (/\D/.test(charBefore)) {
        e.preventDefault();
        // Remove the separator AND the digit before it
        const beforeSeparator = input.value.substring(0, start - 1);
        const afterSeparator = input.value.substring(start);

        // Find the last digit in 'beforeSeparator' and remove it
        const lastDigitIdx = beforeSeparator.search(/\d(?=\D*$)/);
        if (lastDigitIdx !== -1) {
          input.value = beforeSeparator.substring(0, lastDigitIdx) + beforeSeparator.substring(lastDigitIdx + 1) + afterSeparator;
          // Trigger input event to re-format
          input.dispatchEvent(new Event('input'));
          // Set selection range to where the digit was
          input.setSelectionRange(lastDigitIdx, lastDigitIdx);
        }
      }
    }
  }
});
```

## Key Benefits

1.  **Immediate Feedback:** Users see the familiar phone format as they type.
2.  **Valid Data:** The script limits input to 10 digits, preventing overflow.
3.  **No "Cursor Jumps":** Editing the middle of the phone number works exactly as expected.
4.  **Mobile Friendly:** `inputmode="numeric"` ensures a number pad is shown on iOS and Android.
5.  **Accessible:** Semantic labeling and clear placeholders help assistive technologies.
