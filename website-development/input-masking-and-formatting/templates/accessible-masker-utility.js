/**
 * AccessibleInputMasker.js
 *
 * A reusable, framework-agnostic class for implementing input masks
 * without cursor-jumping or accessibility regressions.
 */

export class AccessibleInputMasker {
  /**
   * @param {HTMLInputElement} inputElement - The target input
   * @param {Object} options
   * @param {Function} options.formatter - (rawValue) => formattedValue
   * @param {RegExp} [options.cleaner] - Regex to strip characters before formatting
   * @param {number} [options.maxLength] - Max length of the raw data
   */
  constructor(inputElement, options) {
    this.input = inputElement;
    this.formatter = options.formatter;
    this.cleaner = options.cleaner || /\D/g;
    this.maxLength = options.maxLength || Infinity;
    this.isDeleting = false;

    this.init();
  }

  init() {
    this.input.addEventListener('keydown', (e) => {
      this.isDeleting = e.key === 'Backspace' || e.key === 'Delete';
    });

    this.input.addEventListener('input', (e) => this.process(e));
  }

  process(e) {
    const originalValue = this.input.value;
    const originalCursor = this.input.selectionStart;

    // 1. Calculate how many "raw" characters were before the cursor
    const rawBeforeCursor = originalValue
      .slice(0, originalCursor)
      .replace(this.cleaner, '').length;

    // 2. Clean and limit the total value
    let rawValue = originalValue.replace(this.cleaner, '');
    if (rawValue.length > this.maxLength) {
      rawValue = rawValue.slice(0, this.maxLength);
    }

    // 3. Format the value
    const formattedValue = this.formatter(rawValue);
    this.input.value = formattedValue;

    // 4. Calculate new cursor position
    // We find the index in the formatted string that contains the same
    // number of raw characters as we had before the cursor.
    let newCursor = 0;
    let rawCount = 0;
    while (rawCount < rawBeforeCursor && newCursor < formattedValue.length) {
      if (!formattedValue[newCursor].match(this.cleaner)) {
        rawCount++;
      }
      newCursor++;
    }

    // 5. Restore cursor
    this.input.setSelectionRange(newCursor, newCursor);
  }
}

/* Usage Example:
  new AccessibleInputMasker(myInput, {
    cleaner: /\D/g,
    maxLength: 16,
    formatter: (raw) => raw.match(/.{1,4}/g)?.join(' ') || raw
  });
*/
