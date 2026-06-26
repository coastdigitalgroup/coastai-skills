# Clipboard API and Accessibility References

## Browser API: `navigator.clipboard`

The [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously read from and write to the system clipboard.

### Security Requirements
1. **Secure Context:** The API is only available in secure contexts (HTTPS).
2. **User Activation:** Writing to the clipboard requires a transient user activation (e.g., a click or keypress).
3. **Permissions:** While writing to the clipboard usually doesn't prompt the user (if triggered by a gesture), reading from it *always* requires explicit permission.

### Example: Writing Text
```javascript
navigator.clipboard.writeText('Text to copy')
  .then(() => console.log('Success'))
  .catch(err => console.error('Error', err));
```

## Accessibility Best Practices

### ARIA Live Regions
The most common mistake in "Copy" buttons is failing to announce the result to screen readers. Because the button usually stays focused, changing its internal text from "Copy" to "Copied" might not be announced by all screen readers.

- **Use `aria-live="polite"`:** Announces the change without interrupting the current speech.
- **Specific Messages:** Use "Link copied" or "Code snippet copied" instead of just "Copied".
- **Dynamic Content:** Always update the `textContent` of the live region *after* the async action completes.

### Focus Management
- Do not move focus away from the button after the copy action.
- Ensure the button is a real `<button>` element to maintain standard keyboard behavior (`Enter` and `Space` to trigger).

### Color Contrast
If you change the button color to green (success) after copying, ensure the text remains readable. Check contrast ratios for both the default and "Success" states.

## Legacy Fallback: `document.execCommand`

If you must support older browsers (like IE11), the legacy method involves:
1. Creating a hidden `<textarea>`.
2. Setting its value to the desired text.
3. Adding it to the DOM.
4. Selecting the text.
5. Calling `document.execCommand('copy')`.
6. Removing the textarea.

*Warning:* This method is synchronous, can cause scroll jumps, and is officially deprecated.

## Comparison: `writeText` vs `execCommand`

| Feature | `navigator.clipboard.writeText` | `document.execCommand('copy')` |
| :--- | :--- | :--- |
| **Paradigm** | Asynchronous (Promises) | Synchronous |
| **DOM Requirement** | None | Requires a selected element in DOM |
| **Reliability** | High (in secure contexts) | Medium (prone to selection issues) |
| **Browser Support** | Modern Evergreen | Legacy |
| **Security** | Secure Context Only | Works in HTTP/Local |
