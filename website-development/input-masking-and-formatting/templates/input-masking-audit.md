# Input Masking & Formatting Audit Checklist

Use this checklist to evaluate existing input masking implementations for accessibility, UX, and technical robustness.

## 1. Technical Robustness
- [ ] **Cursor Stability:** Does the cursor jump to the end of the input when editing in the middle of the string?
- [ ] **Backspace Handling:** Can you delete separators (dashes, spaces) without being "trapped" by immediate re-insertion?
- [ ] **Autofill Support:** Does the browser's "Save Credit Card" or "Address" autofill work correctly with the mask?
- [ ] **Paste Support:** Does pasting a pre-formatted string (e.g., `555-555-5555`) into the field result in a correctly formatted value?
- [ ] **Mobile Performance:** Does the formatting logic cause noticeable lag or "flickering" on low-end mobile devices?

## 2. Accessibility (WCAG)
- [ ] **Inputmode:** Does the field trigger the correct keyboard? (e.g., `inputmode="numeric"` for cards, `tel` for phone).
- [ ] **ARIA Placeholder:** If the field has a visible mask placeholder (like `####`), is it also provided via `aria-placeholder`?
- [ ] **Clear Announcements:** Does a screen reader announce the value clearly? Test if it reads "dash" for every separator.
- [ ] **Error Messaging:** If the user types an invalid character, is they notified, or is it silently dropped? (Silently dropping is often better, but must not be confusing).
- [ ] **Focus Management:** Does focusing the field automatically move the cursor to the start or end appropriately?

## 3. User Experience
- [ ] **Input Freedom:** Can the user type or paste the data in their own format and have the system "clean" it?
- [ ] **Visual Clarity:** Are separators used consistently (e.g., spaces for credit cards, dashes/parentheses for phones)?
- [ ] **Length Enforcement:** Does the field stop accepting input once the maximum length is reached?
- [ ] **Real-time Feedback:** Does the formatting happen as the user types, rather than only on blur? (Real-time is preferred for short structured data).

## 4. Common Edge Cases
- [ ] **Leading Zeros:** Does the mask correctly handle leading zeros (common in some zip codes or IDs)?
- [ ] **Internationalization:** If the field is for phone numbers, does it handle varying lengths and country codes?
- [ ] **Selection Replacement:** If a user selects text and types over it, does the mask re-apply correctly to the resulting string?
