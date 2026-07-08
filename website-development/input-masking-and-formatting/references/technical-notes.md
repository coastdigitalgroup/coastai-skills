# Input Masking: Technical Reference

## HTML `inputmode` Guide

The `inputmode` attribute is critical for input masking as it determines which virtual keyboard is displayed on mobile devices.

| Data Type | `inputmode` Value | Keyboard Result |
| :--- | :--- | :--- |
| Credit Card | `numeric` | Number pad (0-9) |
| Phone Number | `tel` | Telephone pad (+, *, #, 0-9) |
| Currency / Decimals | `decimal` | Number pad with decimal point |
| Year / Quantity | `numeric` | Number pad |
| Search / IDs | `text` | Standard keyboard |

---

## ARIA Patterns for Masked Inputs

Masked inputs can be noisy for screen reader users if not handled carefully.

### 1. `aria-placeholder`
Use this to communicate the structure of the mask to assistive technology.
```html
<input type="text" aria-placeholder="MM/YY" placeholder="MM/YY">
```

### 2. `aria-describedby`
If the mask is complex, provide a clear instruction.
```html
<label for="iban">IBAN</label>
<input id="iban" aria-describedby="iban-hint">
<p id="iban-hint">Enter your 22-character IBAN without spaces.</p>
```

---

## Cursor Management Math

When you update `input.value` programmatically, the browser loses track of the user's intent. To fix the "Jumping Cursor" bug, follow this logic:

1.  **Count before:** Identify how many "data characters" (non-mask characters) exist before the current cursor position.
2.  **Format:** Apply the mask to the entire string.
3.  **Find after:** Iterate through the new formatted string. Stop when you have encountered the same number of "data characters" as in Step 1.
4.  **Set:** Place the cursor at that new index.

---

## Browser Behavior Gotchas

### Chrome vs. Safari selection handling
Some versions of Safari on iOS have a bug where setting `selectionStart` immediately after changing `value` doesn't stick. Wrap the `setSelectionRange` call in a `requestAnimationFrame` or `setTimeout(..., 0)` if you encounter issues on mobile Safari.

### Android Gboard & Predictive Text
Android's Gboard often uses "composing" states for predictive text. If your masker is too aggressive, it can "fight" with the keyboard's predictive logic, resulting in duplicated characters. Using `inputmode="numeric"` usually bypasses this by disabling predictive text.

### The `delete` vs `backspace` distinction
- `Backspace` (Key Code 8) deletes the character *before* the cursor.
- `Delete` (Key Code 46) deletes the character *after* the cursor.
Your logic should handle both if it attempts to "jump over" separators during deletion.
