# References: Input Masking and Accessibility

## The `beforeinput` Event

Modern browsers support the `beforeinput` event, which allows you to inspect the change before it is applied to the DOM. This can be cleaner than the `input` event for preventing invalid characters entirely.

- **Advantage:** Prevents the "flash" of invalid characters.
- **Disadvantage:** Slightly more complex to implement for cross-browser consistency (especially with `inputType`).

## Accessibility Considerations (WCAG)

When using masks, keep these accessibility principles in mind:

1.  **SC 3.3.2 (Labels or Instructions):** Provide a clear label and include the expected format in the label or `aria-describedby` text, not just the placeholder.
2.  **SC 4.1.2 (Name, Role, Value):** Ensure screen readers announce the value change. Standard inputs do this by default, but complex JS that clears and resets values rapidly can sometimes cause announcement issues.
3.  **Predictability:** Avoid masks that "surprise" the user. If they type a number and it appears in a different place than expected, it can be disorienting.

## Browser Support: `inputmode`

| Value | Keyboard Type | Best For |
|---|---|---|
| `numeric` | Number pad (0-9) | Credit Cards, Zip codes, IDs |
| `tel` | Telephone pad (+, *, #) | Phone numbers |
| `decimal` | Numbers with decimal point | Currency, measurements |
| `email` | Standard + @ and . | Email addresses |
| `url` | Standard + / and .com | Web addresses |

## Useful Resources

- [WAI-ARIA Authoring Practices (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/): Guidance on accessible widgets.
- [MDN: Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation): Native ways to validate input.
- [MDN: inputmode attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode): Optimizing mobile keyboards.
