# CSS Relative Color Syntax (RCS) Heuristics & Color Spaces Reference

This reference guide provides technical specifications, color space selection criteria, channel unit rules, math formulas, and gamut mapping behaviors for implementing CSS Relative Color Syntax (`from <color>`).

---

## 1. Color Space Selection Matrix

CSS Relative Color Syntax allows origin colors to be transformed into any destination color space regardless of the original format. Choosing the right color space depends on the engineering requirement:

| Color Space | Syntax Pattern | Key Strengths | Weaknesses / Gotchas | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **OKLCH** | `oklch(from <color> l c h [/ a])` | **Perceptually uniform lightness**; no hue shift when changing lightness; native wide-gamut support. | High chroma can exceed sRGB gamut. | **Design System Tokens, Hover/Active states, Dark Mode**. |
| **OKLAB** | `oklab(from <color> l a b [/ alpha])` | Perceptually uniform Cartesian coordinates; ideal for programmatic color interpolation. | Less intuitive for manual hue adjustments than OKLCH. | Algorithmic color blending & gradients. |
| **HSL** | `hsl(from <color> h s l [/ a])` | Familiar hue angle and percentage controls; simple mental model. | **Perceptually NON-uniform**: yellow looks far brighter than blue at identical lightness (`50%`). | Legacy refactoring and quick adjustments. |
| **sRGB / RGB** | `rgb(from <color> r g b [/ a])` | Direct component extraction (`r`, `g`, `b`: 0..255 or 0%..100%). | Changing brightness without changing hue requires complex multi-channel scaling. | **Alpha blending & opacity halos** (`rgb(from ... r g b / 0.15)`). |
| **Display P3** | `color(from <color> display-p3 r g b [/ a])` | Extended wide-gamut color space for Apple / modern displays. | Older monitors map down to sRGB. | High-vibrancy brand graphics & hero displays. |

---

## 2. Channel Identifier & Unit Reference Table

When an origin color is passed to `from <color>`, the browser exposes channel keywords specific to that destination color function:

| Function | Channel Keywords | Origin Data Type / Range | `calc()` Math Rule & Example |
| :--- | :--- | :--- | :--- |
| **`oklch()`** | `l` (Lightness)<br>`c` (Chroma)<br>`h` (Hue)<br>`alpha` | `l`: 0 to 1 (or 0%..100%)<br>`c`: 0 to ~0.37<br>`h`: 0 to 360 (angle)<br>`alpha`: 0 to 1 | `calc(l - 0.08)` (Subtract raw float)<br>`calc(c * 0.5)` (Scale chroma)<br>`calc(h + 180)` (Rotate hue angle) |
| **`hsl()`** | `h` (Hue)<br>`s` (Saturation)<br>`l` (Lightness)<br>`alpha` | `h`: 0 to 360 (angle)<br>`s`: 0% to 100%<br>`l`: 0% to 100%<br>`alpha`: 0 to 1 | `calc(h + 45)`<br>`calc(s - 15%)` (**Must include `%`**)<br>`calc(l - 10%)` (**Must include `%`**) |
| **`rgb()`** | `r` (Red)<br>`g` (Green)<br>`b` (Blue)<br>`alpha` | `r`, `g`, `b`: 0 to 255 (or 0%..100%)<br>`alpha`: 0 to 1 | `calc(r + 25)` (Integer math)<br>`r g b / 0.2` (Direct opacity override) |
| **`color()`** | `r`, `g`, `b`<br>`alpha` | `r`, `g`, `b`: 0 to 1 (float)<br>`alpha`: 0 to 1 | `color(from var(--brand) display-p3 calc(r * 1.1) g b)` |

---

## 3. Recommended Math Patterns & Derived Formulas

### A. Light Mode Hover & Active States (`oklch`)
- **Base:** `var(--brand)` (`oklch(0.55 0.22 255)`)
- **Hover:** `oklch(from var(--brand) calc(l - 0.08) c h)`
- **Active:** `oklch(from var(--brand) calc(l - 0.14) c h)`

### B. Dark Mode Hover & Active States (`oklch`)
- **Base:** `var(--brand)` (`oklch(0.55 0.22 255)`)
- **Hover:** `oklch(from var(--brand) calc(l + 0.08) c h)`
- **Active:** `oklch(from var(--brand) calc(l + 0.14) c h)`

### C. Semi-Transparent Focus Ring / Focus Halo
- **Formula:** `oklch(from var(--brand) l c h / 0.40)` or `rgb(from var(--brand) r g b / 0.40)`

### D. Complementary Accent (180° Hue Shift)
- **Formula:** `oklch(from var(--brand) 0.90 0.10 calc(h + 180))`

### E. Desaturated Disabled State
- **Formula:** `oklch(from var(--brand) 0.85 calc(c * 0.15) h)`

### F. Subtle Surface Background Tint
- **Formula:** `oklch(from var(--brand) 0.975 0.015 h)`

---

## 4. Gamut Mapping & Out-of-Gamut Behavior

When deriving colors in OKLCH, setting high chroma values (`c > 0.28`) or shifting lightness near `1.0` can produce color coordinates outside the standard sRGB monitor spectrum.

- **Browser Behavior:** Per the W3C CSS Color 4 specification, browser rendering engines apply automatic **Gamut Mapping** using Oklch clipping. The browser dynamically reduces chroma while preserving lightness and hue until the color falls inside the display target gamut (sRGB or Display P3).
- **Best Practice:** Keep chroma for web UI components within `c: 0.01` to `c: 0.25`. Extreme chroma (`c > 0.30`) is reserved for high-vibrancy display media on wide-gamut screens.

---

## 5. Browser Compatibility & Fallback Rules

- **Native Support Matrix:**
  - Chrome / Edge: 119+ (Nov 2023)
  - Safari: 16.4+ (Mar 2023)
  - Firefox: 128+ (Jul 2024)
- **Cascade Fallback Protocol:**
  Always declare a static fallback preceding the RCS property:
  ```css
  .element {
    background-color: #2563eb; /* Fallback for older browsers */
    background-color: oklch(from var(--brand) l c h); /* RCS Modern */
  }
  ```
- **Feature Query Testing:**
  ```css
  @supports (color: oklch(from red l c h)) {
    /* RCS-specific dynamic stylesheet rules */
  }
  ```
