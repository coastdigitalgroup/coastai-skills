# Web Worker Global Scope and APIs

Web Workers run in a different global context than the main thread. This
reference lists what is available and what is restricted in the
`DedicatedWorkerGlobalScope`.

## Available Globals
- `self`: Reference to the worker's own global scope.
- `location`: Read-only access to the worker's script location.
- `navigator`: Limited access to the browser identity (e.g., `onLine`, `userAgent`).
- `console`: Standard logging is typically supported and piped to the main console.

## Available APIs
- **Timers:** `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`.
- **Network:** `fetch()` (modern way to make requests).
- **Storage:** `IndexedDB` (for persistent background storage).
- **Communication:** `postMessage()`, `BroadcastChannel`.
- **Utilities:** `atob`, `btoa`, `crypto`, `performance`.
- **Scripts:** `importScripts()` (for synchronous loading of external scripts).

## Prohibited (Main Thread Only)
- **DOM:** `window`, `document`, `HTMLElement`, `querySelector`.
- **Direct UI:** `alert()`, `confirm()`, `prompt()`.
- **Storage:** `localStorage`, `sessionStorage` (synchronous storage is blocked).
- **Layout:** `getBoundingClientRect()`, `computedStyle`.

## Data Transfer: Structured Clone Algorithm
When you use `postMessage()`, data is not shared; it is **cloned**.

### What can be cloned:
- All primitive types (String, Number, Boolean, null, undefined).
- `Array`, `Object`, `Date`, `RegExp`.
- `Map`, `Set`.
- `Blob`, `File`, `FileList`.
- `ArrayBuffer`, `ImageData`.

### What CANNOT be cloned (will throw an error):
- **Functions.**
- **DOM Nodes** (e.g., an `HTMLDivElement`).
- **Error objects** (in some browsers, though modern ones often support them).
- **Prototype chains** (methods on classes are lost).

## Optimization: Transferable Objects
For massive data (like high-res image data or large TypedArrays), cloning can be
slow. Use **Transferables** to move the memory buffer instead of copying it.

```javascript
// Transferring an ArrayBuffer
const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB
worker.postMessage(buffer, [buffer]);
// After transfer, 'buffer' is unusable on the main thread!
```
