# CSS Font Loading API Audit Checklist

Use this audit checklist when implementing, reviewing, or debugging custom web font loading performance, Flash of Invisible Text (FOIT), Flash of Unstyled Text (FOUT), Cumulative Layout Shift (CLS), or Canvas/WebGL text rendering race conditions.

---

## 1. CORS & Network Request Verification

- [ ] **Cross-Origin CDN Headers:** Are custom font binary files (`.woff2`) served with appropriate `Access-Control-Allow-Origin` CORS headers if hosted on a CDN or external domain?
- [ ] **Optimal Format:** Are custom fonts provided in WOFF2 format (`format('woff2')`) to minimize compressed payload size?
- [ ] **Font Subsetting:** Are font files subsetted to include only necessary language scripts/glyphs (e.g., Latin subset)?

---

## 2. API Usage & Syntax Verification

- [ ] **Feature Detection:** Is `document.fonts` and `window.FontFace` checked prior to calling programmatic font loading methods?
- [ ] **FontFace Registration:** Are instantiated `new FontFace(family, source, descriptors)` objects added to `document.fonts` via `document.fonts.add(font)`?
- [ ] **Correct Shorthand Syntax for `check()` & `load()`:** Are calls to `document.fonts.check()` and `document.fonts.load()` formatted with valid CSS font shorthand including a font size (e.g., `'16px "FontName"'` or `'bold 20px "HeaderFont"'`) instead of bare family names?
- [ ] **Timeout Race Enforcement:** Is `font.load()` or `document.fonts.load()` wrapped in a `Promise.race()` timeout limit (1500ms - 2500ms) to prevent infinite UI loading states on slow connections?

---

## 3. Layout Shift (CLS) & Fallback Metric Alignment

- [ ] **Fallback Font Metric Overrides:** Are fallback `@font-face` declarations configured with `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` to match custom font metrics?
- [ ] **Root State Markers:** Does the application toggle CSS classes on `<html>` or `<body>` (`.fonts-loading`, `.fonts-loaded`, `.fonts-failed`) to control style transitions?
- [ ] **Flash of Invisible Text (FOIT) Avoidance:** Is `font-display: swap` set on custom font declarations to guarantee text remains readable during initial download?

---

## 4. Canvas & WebGL Synchronization

- [ ] **Canvas Rendering Await:** Are `<canvas>` 2D context text drawing methods (`fillText`, `strokeText`) delayed until `document.fonts.check()` returns `true` or `document.fonts.load()` resolves?
- [ ] **Fallback Canvas Rendering:** Does canvas text drawing fall back gracefully to system fonts if custom font loading fails or times out?

---

## 5. Lifecycle & SPA Memory Management

- [ ] **Font Set Cleanup:** In dynamic SPAs or theme customizers, are unused `FontFace` instances deleted from `document.fonts` (`document.fonts.delete(font)`) when unmounted?
- [ ] **Error Handling:** Are network or font decoding rejections caught cleanly without unhandled promise rejections crashing runtime scripts?
