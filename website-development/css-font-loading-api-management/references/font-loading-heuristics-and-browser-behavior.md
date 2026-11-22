# CSS Font Loading API Heuristics & Browser Behavior

This reference guide details technical browser behaviors, spec requirements, and engineering heuristics for managing custom web fonts using the W3C CSS Font Loading API (`document.fonts` and `FontFace`).

---

## 1. Browser Font Discovery & Rendering Pipeline

Understanding the exact sequence of browser font discovery is critical for diagnosing FOIT, FOUT, and canvas text bugs.

```
[HTML Parsing] ---> [DOM Node Construction] ---> [CSSOM Attachment]
                                                        |
                                                        v
                                             [Style & Layout Tree]
                                                        |
[Font Download Triggered] <--- (Is Node Rendered & Custom Font Applied?)
          |
          v
[Font Binary Download & Decoding] ---> [FontFaceSet Status: 'loaded']
```

### Key Insight
Declarative CSS `@font-face` rules are **lazy**. Browsers do NOT initiate font binary network fetches when CSS is parsed. A font request is only dispatched when the layout engine proves that a visible DOM element uses that specific `font-family`.

Programmatic font loading via `new FontFace()` or `document.fonts.load()` bypasses layout discovery and initiates the network fetch **immediately**.

---

## 2. CSS Font Shorthand Parsing Rules

`document.fonts.check()` and `document.fonts.load()` execute internal CSS font shorthand parsing algorithms.

### Valid Syntax Requirements

The spec requires a valid CSS font shorthand string containing at least a **font size** and a **font family**.

```javascript
// ✅ VALID (Includes size and family)
document.fonts.check('16px "BrandSans"');
document.fonts.check('bold italic 1.2rem "BrandSans"');

// ❌ INVALID (Throws SyntaxError or returns false)
document.fonts.check('BrandSans');
document.fonts.check('"BrandSans"');
```

---

## 3. Fallback Font Metric Matching Formulas

To prevent Cumulative Layout Shift (CLS) when custom fonts swap in, align fallback font metrics using CSS `@font-face` descriptor overrides:

- **`size-adjust`:** Scales the glyph outline bounding box.
- **`ascent-override`:** Specifies the maximum height above the baseline.
- **`descent-override`:** Specifies the maximum depth below the baseline.
- **`line-gap-override`:** Specifies the recommended line gap.

### Formula & Approximations
$$\text{ascent-override} = \frac{\text{Custom Font Ascent}}{\text{Fallback Font Ascent}} \times 100\%$$

```css
@font-face {
  font-family: 'AlignedFallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 20%;
  line-gap-override: 0%;
  size-adjust: 100%;
}
```

---

## 4. Canvas & WebGL Rendering Gotchas

Unlike standard HTML DOM elements, `<canvas>` 2D contexts do not automatically trigger reflows or re-renders when a web font finishes loading in the background.

```javascript
// ❌ WRONG: Canvas will permanently render Arial because CustomFont isn't loaded yet
ctx.font = '24px CustomFont';
ctx.fillText('Hello World', 10, 50);

// ✅ CORRECT: Await document.fonts.load() before fillText()
await document.fonts.load('24px CustomFont');
ctx.font = '24px CustomFont';
ctx.fillText('Hello World', 10, 50);
```

---

## 5. Browser Compatibility & CORS Constraints

| Feature | Chrome / Edge | Firefox | Safari | iOS Safari |
| :--- | :--- | :--- | :--- | :--- |
| `document.fonts` (`FontFaceSet`) | 35+ | 41+ | 10+ | 10+ |
| `FontFace` Constructor | 35+ | 41+ | 10+ | 10+ |
| `font-display` Descriptor | 60+ | 58+ | 11.1+ | 11.1+ |
| Metric Overrides (`ascent-override`) | 87+ | 89+ | 16.4+ | 16.4+ |

### CORS Enforcement
Custom fonts fetched via `FontFace` or `document.fonts.load()` across origins must return `Access-Control-Allow-Origin` headers. Failing CORS results in immediate promise rejection with a `DOMException` (NetworkError).
