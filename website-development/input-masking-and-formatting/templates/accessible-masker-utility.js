/**
 * A lightweight, framework-agnostic utility for applying input masks.
 * Focuses on cursor stability and accessibility.
 *
 * @param {HTMLInputElement} inputEl - The input element to mask.
 * @param {Object} options
 * @param {Function} options.format - Function that takes raw string and returns masked string.
 * @param {RegExp} options.strip - Regex to identify characters to strip before formatting.
 */
export function createMasker(inputEl, { format, strip = /\D/g }) {
  if (!inputEl) return;

  // Ensure we don't have state issues with global regexps in loops
  const stripPattern = new RegExp(strip.source, strip.flags.replace('g', ''));

  const handleInput = (e) => {
    const { value, selectionStart } = inputEl;

    // 1. Extract raw data and data before the cursor
    const rawValue = value.replace(strip, '');
    const rawBeforeCursor = value.slice(0, selectionStart).replace(strip, '');

    // 2. Format the new value
    const formattedValue = format(rawValue);

    // 3. Update the input
    inputEl.value = formattedValue;

    // 4. Calculate new cursor position to prevent "jumps"
    let newPos = 0;
    let rawSeen = 0;
    while (rawSeen < rawBeforeCursor.length && newPos < formattedValue.length) {
      // If the current char in formatted value is NOT a "stripped" char, it's data
      if (!stripPattern.test(formattedValue[newPos])) {
        rawSeen++;
      }
      newPos++;
    }

    inputEl.setSelectionRange(newPos, newPos);
  };

  inputEl.addEventListener('input', handleInput);

  // Return a cleanup function
  return () => inputEl.removeEventListener('input', handleInput);
}

/**
 * Common Formatters
 */
export const Formatters = {
  // Credit Card: 0000 0000 0000 0000
  creditCard: (raw) => (raw.match(/.{1,4}/g) || []).join(' ').slice(0, 19),

  // US Phone: (000) 000-0000
  usPhone: (raw) => {
    const val = raw.slice(0, 10);
    if (val.length <= 3) return val;
    if (val.length <= 6) return `(${val.slice(0, 3)}) ${val.slice(3)}`;
    return `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
  },

  // Date: MM / DD / YYYY
  date: (raw) => {
    const val = raw.slice(0, 8);
    if (val.length <= 2) return val;
    if (val.length <= 4) return `${val.slice(0, 2)} / ${val.slice(2)}`;
    return `${val.slice(0, 2)} / ${val.slice(2, 4)} / ${val.slice(4)}`;
  }
};
