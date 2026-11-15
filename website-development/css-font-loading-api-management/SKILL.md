---
name: css-font-loading-api-management
description: Dynamically load, monitor, and manage custom web fonts using the CSS Font Loading API (`document.fonts`, `FontFace`), preventing Flash of Invisible Text (FOIT), Flash of Unstyled Text (FOUT), cumulative layout shift (CLS), and canvas text rendering race conditions.
---

# CSS Font Loading API Management

## Purpose

The CSS Font Loading API Management skill provides a standardized engineering methodology, lifecycle controller architecture, and audit framework for dynamically loading, tracking, and applying web fonts via `document.fonts` (`FontFaceSet`) and `FontFace` programmatic constructors.

Declarative `@font-face` rules in CSS are lazily discovered by browser layout engines. Browsers do not trigger a web font request until the DOM parser encounters a node styled with that specific `font-family` AND the layout engine confirms the node is rendered. This default browser behavior causes severe frontend visual issues:
- **Flash of Invisible Text (FOIT):** Text rendered with `font-display: block` or browser default hidden states remains invisible for up to 3 seconds while fonts download over slow connections.
- **Flash of Unstyled Text (FOUT) & Layout Shifts:** Text rendered instantly with fallback fonts abruptly switches metrics when custom fonts load, triggering jarring text reflows and Cumulative Layout Shift (CLS).
- **Canvas & WebGL Text Race Conditions:** Drawing text to `<canvas>` or 3D contexts before web fonts complete loading causes canvas contexts to permanently bake system fallback fonts into bitmap outputs.
- **Uncontrolled Dynamic Font Injection:** Single-Page Applications (SPAs) dynamically applying custom fonts (e.g., user theme customization, document editors) lack visibility into font loading progress, status, or failure events.

The CSS Font Loading API (`document.fonts` and `FontFace`) solves these problems by providing explicit JavaScript controls over font instantiation, pre-layout loading, completion promises, and global status events.

---

## Use Cases

- **Eliminating CLS via Staged Font Loading:** Using `document.fonts.load()` or `FontFace` to load critical custom body/heading fonts before rendering or toggling CSS fallback font metric override classes (`.fonts-loaded`).
- **Canvas & WebGL Text Rendering:** Guaranteeing custom web fonts are fully loaded in `document.fonts` before executing `canvasContext.fillText()` or generating WebGL text textures.
- **Dynamic Web Font Injection in SPAs:** Programmatically instantiating `new FontFace(family, source, descriptors)` for dynamic user-generated content, custom theme pickers, or rich document editors.
- **Critical Web Font Pre-Fetching:** Triggering high-priority web font network fetches in early JavaScript execution before DOM layout discovery.
- **Font Loading Timeout & Fallback Graceful Degradation:** Enforcing strict timeout limits (e.g., 2000ms) on custom font downloads to fall back cleanly to system fonts without blocking user readability.

---

## When NOT to Use

- **Static Pages with Standard Declarative `@font-face` and `font-display: swap`:** Simple content pages where standard CSS `@font-face` declarations combined with `<link rel="preload" as="font">` and `font-display: swap` provide sufficient performance without JavaScript overhead.
- **System Native Font Stacks:** Websites using system font stacks (e.g., `font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`).
- **Icon Font Libraries (Migrate to SVG):** Loading large icon fonts dynamically instead of using accessible, scalable inline or sprite SVGs.

---

## Inputs

1. **Font Definitions:** Font family name, font binary source URL or ArrayBuffer, and style descriptors (e.g., `weight`, `style`, `stretch`, `unicodeRange`).
2. **Target Selector Scope & Text Samples:** Representative text strings and CSS formatting for `document.fonts.load()` verification (e.g., `16px "CustomSans"` or `bold 24px "CustomSerif"`).
3. **Timeout Strategy:** Maximum allowed loading duration in milliseconds before falling back to system metrics.
4. **CSS Metric Overrides:** CSS `@font-face` metric descriptors (`ascent-override`, `descent-override`, `line-gap-override`, `size-adjust`) for matching fallback fonts.

---

## Outputs

1. **Programmatic Font Lifecycle Manager:** A robust, framework-agnostic JavaScript controller (`FontLoadingManager`) handling font registration, loading promises, timeouts, and state classes.
2. **State-Driven CSS Class Markers:** Body/Root level CSS state classes (`.fonts-loading`, `.fonts-loaded`, `.fonts-failed`) enabling smooth font metric transitions.
3. **Canvas / WebGL Readiness Resolver:** Async functions guaranteeing font availability before visual rendering operations.

---

## Workflow

### 1. Check Browser API Support & Define Fallback Metric CSS
Verify `document.fonts` and `FontFace` availability. Set up baseline CSS classes with matched fallback font metrics (`size-adjust`, `ascent-override`) to prevent CLS.

```css
/* Baseline CSS with Fallback Font Metric Alignment */
@font-face {
  font-family: 'FallbackSans';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 20%;
  size-adjust: 100%;
}

body {
  font-family: 'FallbackSans', sans-serif;
}

/* Custom font activated once loaded */
.fonts-loaded body {
  font-family: 'BrandSans', 'FallbackSans', sans-serif;
}
```

### 2. Instantiate and Register Programmatic FontFace
Create a new `FontFace` instance with URL or ArrayBuffer source and optional descriptors. Add it to `document.fonts` (`FontFaceSet`).

```javascript
const brandFont = new FontFace(
  'BrandSans',
  'url(/fonts/brand-sans-regular.woff2)',
  {
    style: 'normal',
    weight: '400',
    display: 'swap'
  }
);

// Add to browser's global FontFaceSet
document.fonts.add(brandFont);
```

### 3. Trigger Download and Enforce Loading Timeout
Call `font.load()` or `document.fonts.load()` wrapped in a `Promise.race` against a configurable timeout (e.g., 2000ms).

```javascript
async function loadFontWithTimeout(fontInstance, timeoutMs = 2000) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Font load timed out')), timeoutMs)
  );

  try {
    // Initiate network download and font decoding
    await Promise.race([fontInstance.load(), timeoutPromise]);
    return true;
  } catch (error) {
    console.warn(`Font ${fontInstance.family} failed or timed out:`, error);
    return false;
  }
}
```

### 4. Apply Global State Classes and Resolve Canvas/App Renderers
Update DOM root element classes once critical fonts are loaded. Broadcast readiness to canvas contexts or application state.

```javascript
async function initializeCriticalFonts() {
  document.documentElement.classList.add('fonts-loading');

  const loaded = await loadFontWithTimeout(brandFont, 2000);

  if (loaded && document.fonts.check('16px "BrandSans"')) {
    document.documentElement.classList.remove('fonts-loading');
    document.documentElement.classList.add('fonts-loaded');
  } else {
    document.documentElement.classList.remove('fonts-loading');
    document.documentElement.classList.add('fonts-failed');
  }
}
```

---

## Decision Rules

| Font Requirement | Recommended API & Technique | Key Parameters / Syntax |
| :--- | :--- | :--- |
| **Canvas / WebGL Text Drawing** | `document.fonts.load(fontSpec)` or `font.load()` await | `await document.fonts.load('bold 20px "MyFont"')` |
| **Dynamic SPA Theme/Font Switching** | `new FontFace()` + `document.fonts.add()` | `const f = new FontFace(...); document.fonts.add(f); await f.load();` |
| **Declarative CSS Font Monitoring** | `document.fonts.ready` promise or `document.fonts.check()` | `document.fonts.ready.then(...)` |
| **Preventing FOIT on Low-Bandwidth** | `font.load()` with strict `Promise.race` timeout | Timeout limit: 1500ms – 2500ms |

---

## Constraints

- **Same-Origin & CORS Restrictions:** Web font files (`.woff2`) requested via `FontFace` or `document.fonts.load()` MUST be served with appropriate CORS headers (`Access-Control-Allow-Origin: *` or explicit origin) when hosted on a CDN or cross-origin server.
- **Browser API Support:** `document.fonts` and `FontFace` are supported across all modern browsers (Chrome 35+, Firefox 41+, Safari 10+, Edge 79+). Polyfills or feature checks (`'fonts' in document`) are required for legacy environments.
- **Font Specification Format for `load()` / `check()`:** `document.fonts.check()` and `document.fonts.load()` require a valid CSS font shorthand string (e.g., `'16px "FontName"'` or `'italic bold 1em "FontName"'`). Passing just the font family name without a font size will throw a syntax error or return `false`.
- **Memory Management in Dynamic Font Injection:** Repeatedly creating and adding `FontFace` instances without removing unused fonts (`document.fonts.delete(font)`) in long-lived SPAs can lead to high memory consumption.

---

## Non-Goals

- Replacing standard WOFF2 compression or font subsetting pipelines.
- Replacing CSS `@font-face` declarations for static non-interactive marketing pages.
- Server-side font generation or dynamic TTF/OTF parsing.

---

## Common Failure Patterns

- **Canvas Rendering Before `document.fonts.load()` Completes:** Calling `ctx.fillText()` immediately after assigning `ctx.font = '20px CustomFont'`, resulting in the browser silently rendering default system fonts into the canvas buffer.
- **Invalid Font Shorthand Syntax in `check()` / `load()`:** Calling `document.fonts.check('MyFont')` instead of `document.fonts.check('16px "MyFont"')`. The CSS Font Parsing specification requires a font size for font shorthand string validation.
- **CORS Missing Headers on CDN Font Requests:** Instantiating `new FontFace('CustomFont', 'url(https://cdn.example.com/font.woff2)')` without proper CORS origin configuration on the CDN server, resulting in blocked network fetches.
- **Infinite Loading Block on Network Failure:** Awaiting `font.load()` or `document.fonts.ready` without a timeout fallback, causing the UI to hang in a loading state permanently when font files fail to download or hit network timeouts.
- **Ignoring Layout Shifts (CLS):** Toggling custom fonts without aligning fallback font metrics using `size-adjust`, `ascent-override`, and `descent-override`, leading to visible text jumps when `.fonts-loaded` is applied.

---

## Validation Steps

### 1. Dynamic Loading & Status Verification
- Open the application and inspect `document.fonts.status` in DevTools console.
- Run `document.fonts.check('16px "YourCustomFont"')` and verify it returns `true` after custom fonts load.
- Verify `document.documentElement` receives the `.fonts-loaded` class.

### 2. Canvas Text Verification
- Open a canvas text rendering component.
- Simulate 3G network throttling in DevTools Network tab.
- Reload the page and ensure canvas text does NOT draw until fonts are fully loaded.

### 3. Timeout & Network Failure Resilience Test
- Block the font `.woff2` URL using DevTools Request Blocking.
- Reload the page. Verify the timeout handler triggers within 2000ms, `.fonts-failed` is applied, and the UI gracefully displays readable text using fallback system fonts.
