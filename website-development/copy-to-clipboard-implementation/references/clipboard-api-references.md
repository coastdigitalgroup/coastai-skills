# Clipboard API References

## Browser Support

The `navigator.clipboard` API is supported in all modern browsers.

- **Chrome:** 66+
- **Edge:** 79+
- **Firefox:** 63+
- **Safari:** 13.1+

*Note: In Firefox, `writeText()` may require a user gesture even if the tab is focused.*

## Security Requirements

1. **Secure Context:** The Clipboard API is only available in secure contexts (`HTTPS`), with the exception of `localhost`.
2. **User Activation:** Writing to the clipboard requires "transient user activation" (a recent user interaction like a click or keypress).
3. **Permissions API:** While `writeText` usually doesn't prompt for permission if triggered by a user gesture, the Permissions API (`navigator.permissions.query({name: 'clipboard-write'})`) can be used to check status.

## ARIA and Accessibility

- **`aria-live="polite"`:** Used to announce the result of the copy operation without interrupting the user's current task.
- **`aria-label`:** Essential for icon-only buttons to provide a text alternative for screen readers.
- **`aria-describedby`:** Useful for linking the copy button to the specific text block it targets.

## References

- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [W3C: Clipboard API and Events](https://w3c.github.io/clipboard-apis/)
- [Web.dev: Unblocking clipboard access](https://web.dev/async-clipboard/)
