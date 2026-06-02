# Reference: Resource Priority Heuristics

Browsers (specifically Chromium-based ones) use an internal prioritization system to decide which assets to download first. Understanding these defaults is essential for knowing when to override them.

## Default Chromium Priorities

| Asset Type | Default Priority | Notes |
| :--- | :--- | :--- |
| **Main HTML** | Very High | Always the highest priority. |
| **CSS** | Very High | Required for the render tree. |
| **Fonts** | Very High | Critical for layout stability (CLS). |
| **Scripts (Head)** | High | Parser-blocking unless `async`/`defer`. |
| **Images (In View)** | High | Initially High, but often demoted until layout. |
| **Images (Off View)** | Low | Default for elements below the fold. |
| **XHR/Fetch** | High | Default for most API calls. |
| **Prefetch** | Lowest | Only loaded when the browser is idle. |

## Impact of Prioritization Hints

### 1. `fetchpriority`
Allows you to nudge the priority up or down within the same asset type.
- `fetchpriority="high"`: Moves an image or script to the top of its category.
- `fetchpriority="low"`: Explicitly de-prioritizes a resource (e.g., a carousel image that is not the first one shown).

### 2. `preload`
Signals that the resource is required for the *current* page and should be discovered as soon as possible.
- **Why use it?** It bypasses the "Discovery Delay" caused by assets being referenced in CSS or late-running JS.
- **Risk:** If you preload too much, you create contention on the network, effectively slowing down everything.

### 3. `prefetch`
Signals that the resource is required for a *future* navigation.
- **Behavior:** The browser downloads this at the "Lowest" priority, only when there is spare bandwidth.
- **Cache:** Assets are stored in the HTTP cache for future use.

### 4. `async` vs `defer`
- **Standard (`<script src="...">`):** Fetches and executes immediately, blocking the HTML parser.
- **Async (`<script async src="...">`):** Fetches in parallel but executes as soon as it arrives, potentially blocking the parser.
- **Defer (`<script defer src="...">`):** Fetches in parallel and waits until the HTML is fully parsed before executing. **Recommended for most scripts.**

## Browser Support Notes
- **Fetch Priority:** Supported in Chrome 101+, Edge 101+, Safari 17.2+.
- **Preload:** Widely supported across all modern browsers.
- **Prefetch:** Widely supported (except Safari, which often ignores it or handles it differently).
- **Early Hints (103):** A server-side mechanism to send these hints even before the HTML is generated. This skill focuses on the client-side implementation of those hints.
