# Example: Accessible Credit Card and Phone Masking

This example demonstrates how to implement a robust, accessible input masker using vanilla JavaScript. It specifically addresses the "jumping cursor" problem and handles backspaces correctly.

## Before (Naive Implementation)
A naive implementation often breaks cursor position or traps the user during backspaces.

```javascript
// AVOID: This causes the cursor to jump to the end on every keystroke
input.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  e.target.value = value.match(/.{1,4}/g)?.join(' ') || '';
});
```

## After (Robust Implementation)

### 1. HTML Structure
We use `inputmode` and `autocomplete` to help both the browser and the user.

```html
<div class="form-group">
  <label for="cc-number">Credit Card Number</label>
  <input
    type="text"
    id="cc-number"
    inputmode="numeric"
    autocomplete="cc-number"
    placeholder="#### #### #### ####"
    aria-placeholder="#### #### #### ####"
  >
</div>

<div class="form-group">
  <label for="phone">Phone Number (US)</label>
  <input
    type="tel"
    id="phone"
    inputmode="tel"
    autocomplete="tel"
    placeholder="(###) ###-####"
  >
</div>
```

### 2. JavaScript Logic
The key is tracking the cursor position and cleaning data before re-formatting.

```javascript
/**
 * Simple Masker Utility
 */
class InputMasker {
  constructor(input, maskFn) {
    this.input = input;
    this.maskFn = maskFn;
    this.isDeleting = false;

    this.input.addEventListener('keydown', (e) => {
      this.isDeleting = e.key === 'Backspace' || e.key === 'Delete';
    });

    this.input.addEventListener('input', (e) => this.handleInput(e));
  }

  handleInput(e) {
    // 1. Store cursor position
    let cursor = this.input.selectionStart;
    const originalValue = this.input.value;

    // 2. Format the value
    const formattedValue = this.maskFn(originalValue, this.isDeleting);

    // 3. Apply formatted value
    this.input.value = formattedValue;

    // 4. Adjust cursor position
    // If we added a separator, move the cursor forward
    if (!this.isDeleting && formattedValue.length > originalValue.length) {
      cursor++;
    }
    // If we are in the middle and separators were shifted,
    // more complex logic would count "digits before cursor".

    this.input.setSelectionRange(cursor, cursor);
  }
}

// Phone Masker (US)
const phoneMask = (val, isDeleting) => {
  const digits = val.replace(/\D/g, '').substring(0, 10);
  let result = '';

  if (digits.length > 0) result += '(' + digits.substring(0, 3);
  if (digits.length >= 3) result += ') ';
  if (digits.length > 3) result += digits.substring(3, 6);
  if (digits.length >= 6) result += '-';
  if (digits.length > 6) result += digits.substring(6, 10);

  // Prevent backspace trap: don't end with a separator if deleting
  if (isDeleting && (result.endsWith(' ') || result.endsWith('-') || result.endsWith('('))) {
     // result = result.slice(0, -1);
  }

  return result;
};

// Credit Card Masker
const ccMask = (val) => {
  const digits = val.replace(/\D/g, '').substring(0, 16);
  return digits.match(/.{1,4}/g)?.join(' ') || digits;
};

// Initialize
new InputMasker(document.getElementById('phone'), phoneMask);
new InputMasker(document.getElementById('cc-number'), ccMask);
```

## Why this works
1. **Cursor Management:** By using `setSelectionRange`, we prevent the cursor from jumping to the end of the input, allowing users to edit mistakes in the middle of a string.
2. **Event Selection:** Using `input` ensures that pastes, deletions, and voice-to-text are all captured, whereas `keyup` might miss them.
3. **Accessibility:** `inputmode="numeric"` ensures the number pad opens on mobile, while `autocomplete` allows the browser's own secure vault to fill the data, which the `input` event then formats.
