# Browser Compatibility & Technical Notes

## AbortController Support

The `AbortController` and `AbortSignal` interfaces are widely supported in all
modern browsers.

| Browser | Version |
| ------- | ------- |
| Chrome  | 66+     |
| Edge    | 16+     |
| Firefox | 57+     |
| Safari  | 12.1+   |
| Node.js | 15.0.0+ |

## Polyfills

For legacy environments (e.g., IE11), a polyfill for `AbortController` is
required. Popular options include:
- `abortcontroller-polyfill`
- `abort-controller` (NPM package)

## Server-Side Behavior

It is important to understand that calling `abort()` on the client-side:
1.  **Stops the browser** from waiting for the response.
2.  **Closes the TCP connection** if the response hasn't started yet.
3.  **Does NOT necessarily stop the server** from continuing to process the
    request (e.g., database queries).

To fully optimize performance, the server must also be "abort-aware" by
monitoring the connection state.

## Relationship with Debounce

While `AbortController` manages the **network lifecycle**, `debounce` manages
the **trigger frequency**.

- **Debounce:** Prevents sending 10 requests while the user is typing.
- **AbortController:** Ensures that if 3 requests *are* sent, only the last one
  affects the UI.

For the most robust experience, **use both**.
