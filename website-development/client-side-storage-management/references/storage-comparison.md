# Client-Side Storage Comparison

Choosing the right storage mechanism depends on the data's size, persistence requirements, and security sensitivity.

| Feature | Cookies | LocalStorage | SessionStorage | IndexedDB |
| :--- | :--- | :--- | :--- | :--- |
| **Capacity** | ~4KB | ~5MB - 10MB | ~5MB | Unlimited (approx. 80% of disk) |
| **Persistence** | Expires as set | Forever | Until tab is closed | Forever |
| **Access** | Client & Server | Client only | Client only | Client only |
| **Complexity** | Low | Low | Low | High |
| **Browser Support** | All | Modern (IE8+) | Modern (IE8+) | Modern (IE10+) |
| **Synchronous** | Yes | Yes | Yes | No (Asynchronous) |

## Security Considerations

### 1. Cross-Site Scripting (XSS)
Any data in `localStorage`, `sessionStorage`, or `IndexedDB` is accessible to any JavaScript running on the same origin.
- **Vulnerability:** If an attacker successfully injects a script (XSS), they can read all your stored data.
- **Prevention:** Do not store sensitive session tokens or PII in these stores. Use `HttpOnly` and `Secure` cookies for authentication tokens.

### 2. Cross-Site Request Forgery (CSRF)
Cookies are automatically sent with every request to the domain they are set for.
- **Vulnerability:** Attackers can trick a user's browser into making requests to your server with the user's credentials.
- **Prevention:** Use `SameSite=Strict` or `SameSite=Lax` for cookies and implement CSRF tokens.

### 3. Data Integrity
Users can easily modify data in client-side storage via the browser's DevTools.
- **Risk:** The application could crash or behave unexpectedly if the data format is changed.
- **Prevention:** Always validate and sanitize data retrieved from storage before using it in your application. Treat it as "untrusted" input.

## Performance Heuristics

1.  **Main Thread Blocking:** `localStorage` and `sessionStorage` are synchronous. Writing or reading large chunks of data (e.g., a 2MB JSON string) will block the UI and cause visible stuttering (jank).
2.  **Serialization Overhead:** `JSON.stringify` and `JSON.parse` are expensive for large objects. Avoid frequent reads/writes of large structures.
3.  **IO Latency:** Disk access is significantly slower than memory access. Cache frequently used values in application memory and only sync to storage when necessary.
4.  **IndexedDB for Blobs:** If you need to store large images or files, use `IndexedDB`. It handles binary data efficiently and does not block the main thread.
