# Template: Input Mask Utility

This template provides a lightweight, reusable JavaScript class for applying masks to any text input. It handles cursor positioning, raw value extraction, and prevents the "backspace trap".

## The `InputMask` Class

```javascript
/**
 * A lightweight utility for input masking
 */
class InputMask {
  /**
   * @param {HTMLInputElement} element - The input element to mask
   * @param {string} pattern - The mask pattern (e.g., '#### #### #### ####')
   * @param {Object} options - Configuration options
   */
  constructor(element, pattern, options = {}) {
    this.element = element;
    this.pattern = pattern;
    this.maskChar = '#'; // Character representing a user-input digit
    this.options = {
      unmaskOnSubmit: true,
      ...options
    };

    this.init();
  }

  init() {
    this.element.addEventListener('input', (e) => this.handleInput(e));
    this.element.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  /**
   * Returns the raw value (numbers only by default)
   */
  getRawValue(value) {
    return value.replace(/\D/g, '');
  }

  /**
   * Formats a raw value according to the pattern
   */
  format(raw) {
    let formatted = '';
    let rawIdx = 0;

    for (let i = 0; i < this.pattern.length && rawIdx < raw.length; i++) {
      if (this.pattern[i] === this.maskChar) {
        formatted += raw[rawIdx++];
      } else {
        formatted += this.pattern[i];
      }
    }
    return formatted;
  }

  handleKeyDown(e) {
    if (e.key === 'Backspace') {
      const input = this.element;
      const start = input.selectionStart;
      const end = input.selectionEnd;

      // If cursor is at a separator, manually delete the digit before it
      if (start === end && start > 0) {
        const charBefore = input.value[start - 1];
        if (/\D/.test(charBefore)) {
          e.preventDefault();
          const beforeSeparator = input.value.substring(0, start - 1);
          const lastDigitIdx = beforeSeparator.search(/\d(?=\D*$)/);

          if (lastDigitIdx !== -1) {
            const raw = this.getRawValue(input.value);
            const numbersBeforeCursor = this.getRawValue(input.value.substring(0, start)).length;
            const newRaw = raw.substring(0, numbersBeforeCursor - 1) + raw.substring(numbersBeforeCursor);

            this.applyValue(newRaw, lastDigitIdx);
          }
        }
      }
    }
  }

  handleInput(e) {
    // If it's a deleteContentBackward but we handled it in keydown, e.inputType might be useful
    // but standard 'input' handler works for typing and pasting.
    const input = this.element;
    const originalValue = input.value;
    const cursorPosition = input.selectionStart;
    const numbersBeforeCursor = this.getRawValue(originalValue.substring(0, cursorPosition)).length;
    const raw = this.getRawValue(originalValue);

    this.applyValue(raw, null, numbersBeforeCursor);
  }

  applyValue(raw, preferredCursorPos, numbersBeforeCursor) {
    const formatted = this.format(raw);
    this.element.value = formatted;

    let newCursorPos = 0;
    if (preferredCursorPos !== null) {
      newCursorPos = preferredCursorPos;
    } else {
      let numberCount = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (!/\D/.test(formatted[i])) {
          numberCount++;
        }
        newCursorPos = i + 1;
        if (numberCount === numbersBeforeCursor) break;
      }
    }

    this.element.setSelectionRange(newCursorPos, newCursorPos);
  }
}

// Usage Example:
// new InputMask(document.getElementById('credit-card'), '#### #### #### ####');
```

## Checklist for Implementation

- [ ] **Input Mode:** Set `inputmode="numeric"` for number-based masks.
- [ ] **Autocomplete:** Use standard tokens (`cc-number`, `tel`, `bday-day`).
- [ ] **Aria Label:** Ensure the purpose and format are clear to screen readers.
- [ ] **Maxlength:** Set a `maxlength` slightly longer than the mask to allow for separators.
- [ ] **Data Retrieval:** Use the `getRawValue` method when preparing data for an API call.
