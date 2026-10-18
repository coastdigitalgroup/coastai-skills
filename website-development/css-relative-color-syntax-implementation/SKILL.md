---
name: css-relative-color-syntax-implementation
description: Dynamically derive, modify, and compose CSS colors from origin colors or tokens using CSS Relative Color Syntax (from <color>) across OKLCH, HSL, and sRGB color spaces with progressive enhancement fallbacks and WCAG contrast preservation.
---

# CSS Relative Color Syntax Implementation

## Purpose

The CSS Relative Color Syntax (RCS) skill provides a modern engineering methodology, token architecture, and fallback protocol for dynamically deriving, modifying, and composing colors directly in CSS using origin colors or design tokens.

Before Relative Color Syntax (W3C CSS Color Module Level 5), creating interactive UI state variations (hover, active, focus, disabled), transparent overlays, surface tints, or dark mode color scales required either:
1. Fragmenting single color tokens into raw component variables (e.g., `--brand-r`, `--brand-g`, `--brand-b`) to inject alpha channels with `rgba()`.
2. Declaring dozens of static derived hex/RGB variables in design tokens (e.g., `--brand-hover`, `--brand-active`, `--brand-focus-ring`, `--brand-subtle-bg`).
3. Relying on preprocessor functions (SASS/PostCSS `lighten()`, `darken()`, `mix()`) which compile at build time and cannot react to dynamic runtime CSS custom property changes (e.g., user-selected accent themes).
4. Using CSS filters (`filter: brightness(0.9)`), which introduce unexpected stacking contexts, composite layers, and layout performance side effects.

CSS Relative Color Syntax solves this by allowing developers to take ANY existing color (keyword, hex, `hsl()`, `rgb()`, `oklch()`, or `var(--custom-property)`) and modify its individual color channels using math expressions (`calc()`) natively inside browser rendering engines:

```css
/* Deriving a hover state in OKLCH (Perceptually Uniform Lightness) */
.button {
  background-color: var(--brand-500);
}
.button:hover {
  background-color: oklch(from var(--brand-500) calc(l - 0.08) c h);
}

/* Deriving a semi-transparent focus ring halo */
.button:focus-visible {
  outline: 3px solid oklch(from var(--brand-500) l c h / 0.4);
}
```

This skill equips developers to build maintainable, dynamic color systems, reduce token fragmentation, handle wide-gamut displays (Display P3, Rec. 2020), preserve WCAG AA/AAA contrast ratios, and implement graceful progressive enhancement for legacy browsers.

---

## Use Cases

- **Runtime Design System Token Derivation:** Deriving interactive component states (hover, active, selected, disabled, pressed) from a single primary base CSS variable without maintaining 10+ derived static tokens.
- **Dynamic User-Selected Theme Customization:** Enabling real-time tenant/user color customization (e.g., brand color pickers) where all UI surface tints, borders, focus rings, and state indicators automatically update via CSS rules.
- **Perceptually Uniform Dark Mode Adjustments:** Adjusting lightness and chroma in `oklch()` or `oklab()` to ensure dark mode surfaces and text maintain consistent visual weight without color distortion or hue shifts.
- **Accessible Focus Ring & Backdrop Generation:** Creating alpha-blended focus halos and modal backdrop overlays (`rgb(from var(--color) r g b / 0.2)`) directly from base design tokens.
- **Complementary & Harmonic Color Generation:** Generating split-complementary, triadic, or monochromatic accent colors dynamically using hue math in OKLCH or HSL (`oklch(from var(--accent) l c calc(h + 180))`).

---

## When NOT to Use

- **Static Build-Time Palette Generation:** If your project uses fixed design tokens that never change at runtime and you are targeting strict legacy environments (e.g., Internet Explorer 11 or Chrome < 119) without CSS variable dynamic requirements, static hex/rgb tokens remain appropriate.
- **Simple Color Mixing Without Origin Reference:** If you only need to mix two fixed colors (e.g., 20% white and 80% blue), use CSS `color-mix()` instead (`color-mix(in oklch, var(--primary) 80%, white)`).
- **High Contrast Forced Colors Mode (Windows HCM):** Forced Colors Mode overrides CSS color declarations with system colors (`CanvasText`, `Highlight`, `ButtonText`). RCS cannot alter system forced colors. Use `forced-color-adjust: none` or System Colors instead.

---

## Inputs

1. **Origin Base Color:** A valid CSS color value or CSS variable reference (`var(--brand)`, `#3b82f6`, `rgb(59 130 246)`, `oklch(0.6 0.2 250)`).
2. **Target Color Space:** Choice of destination color function (`oklch()`, `oklab()`, `hsl()`, `hwb()`, `rgb()`, `lab()`, `lch()`).
3. **Channel Modification Rules:** Specific channel adjustments using channel identifiers (`l`, `c`, `h`, `r`, `g`, `b`, `s`, `alpha`) and math calculations (`calc()`).
4. **Browser Compatibility Requirements:** Target browser matrix determining fallback strategies (e.g., Chrome 119+, Safari 16.4+, Firefox 128+ baseline support).

---

## Outputs

1. **RCS-Powered CSS Stylesheet / Module:** Modular CSS declarations utilizing `from <color>` syntax for component states, surfaces, and design tokens.
2. **Progressive Enhancement Fallback Layer:** Backward-compatible CSS cascade declarations or `@supports` feature queries for legacy browsers.
3. **Audited Color Token System:** Verified color scale with contrast checks (WCAG 2.1 AA/AAA) and gamut mapping safeguards.

---

## Workflow

### Step 1: Audit Base Tokens & Select Color Space
Select the appropriate color space for relative transformation based on the design requirement:
- **`oklch()` (Recommended for Design Systems):** Perceptually uniform lightness (`l`: 0 to 1 or 0% to 100%), chroma (`c`: 0 to ~0.37), hue (`h`: 0 to 360 deg). Ideal for predictable hover states, dark mode scaling, and wide-gamut displays.
- **`hsl()` (Standard Angular Hue Space):** Hue (`h`: 0 to 360), saturation (`s`: 0% to 100%), lightness (`l`: 0% to 100%). Easy for intuitive adjustments, but non-uniform (yellow appears brighter than blue at 50% lightness).
- **`rgb()` (sRGB Direct Channel Space):** Red, green, blue (`r`, `g`, `b`: 0 to 255 or 0% to 100%). Ideal when working purely with alpha channel blending (`rgb(from var(--color) r g b / 0.12)`).

### Step 2: Define Origin Color References
Ensure origin colors are declared in CSS custom properties or valid color literals:
```css
:root {
  --color-primary: oklch(0.55 0.22 255);
  --color-surface: oklch(0.98 0.005 255);
  --color-text: oklch(0.20 0.02 255);
}
```

### Step 3: Implement Relative Channel Math Expressions
Derive states using math expressions with channel keywords:
```css
/* Hover: reduce lightness in light mode */
.btn-primary {
  background-color: var(--color-primary);
  color: oklch(from var(--color-primary) 0.98 0.01 h);
}

.btn-primary:hover {
  background-color: oklch(from var(--color-primary) calc(l - 0.08) c h);
}

.btn-primary:active {
  background-color: oklch(from var(--color-primary) calc(l - 0.14) c h);
}

/* Subtle background tint */
.card-tinted {
  background-color: oklch(from var(--color-primary) 0.96 0.03 h);
  border: 1px solid oklch(from var(--color-primary) 0.85 0.08 h / 0.4);
}
```

### Step 4: Add Progressive Enhancement Fallbacks
Provide legacy cascade fallbacks before RCS rules or inside `@supports`:
```css
.btn-primary {
  /* Legacy fallback */
  background-color: #2563eb;
  /* RCS modern implementation */
  background-color: oklch(from var(--color-primary) l c h);
}

@supports not (color: oklch(from red l c h)) {
  .btn-primary:hover {
    background-color: #1d4ed8;
  }
}
```

### Step 5: Verify Contrast & Gamut Integrity
Check contrast ratio using browser developer tools or WCAG contrast calculators for all derived hover/active/focus states. Ensure chroma does not cause severe gamut clipping on standard sRGB screens.

---

## Decision Rules

| Requirement | Preferred Syntax | Formula / Pattern |
| :--- | :--- | :--- |
| **Hover / Active Darkening (Light Mode)** | `oklch()` | `oklch(from var(--base) calc(l - 0.08) c h)` |
| **Hover / Active Lightening (Dark Mode)** | `oklch()` | `oklch(from var(--base) calc(l + 0.10) c h)` |
| **Opacity Adjustment (Alpha Halo)** | `rgb()` or `oklch()` | `rgb(from var(--base) r g b / 0.15)` or `oklch(from var(--base) l c h / 0.15)` |
| **Complementary Color Accent** | `oklch()` | `oklch(from var(--base) l c calc(h + 180))` |
| **Desaturated Disabled State** | `oklch()` | `oklch(from var(--base) 0.85 calc(c * 0.2) h)` |
| **Subtle Tinted Surface Backdrop** | `oklch()` | `oklch(from var(--base) 0.96 0.02 h)` |
| **High Contrast Foreground Text** | `oklch()` | `oklch(from var(--base) 0.15 0.02 h)` |

---

## Constraints

- **Browser Support:** CSS Relative Color Syntax was released across all major browser engines in 2023-2024 (Chrome 119+, Safari 16.4+, Firefox 128+). Projects supporting legacy Chrome (<119) or Safari (<16.4) MUST supply cascade fallbacks or PostCSS build tools.
- **Channel Unit Syntax Rules:**
  - `oklch()` channels: `l` (0..1 or 0%..100%), `c` (0..0.37+), `h` (angle in deg/rad/turn or number). Do NOT append `%` to `l` if using raw 0..1 scale in `calc()`.
  - `hsl()` channels: `h` (angle/number), `s` (percentage `%`), `l` (percentage `%`). `calc(l - 10%)` MUST include `%` sign.
  - `rgb()` channels: `r`, `g`, `b` (0..255 or percentage `%`).
- **Gamut Mapping:** Colors created in `oklch()` with high chroma (`c > 0.25`) may fall outside standard sRGB space. Browsers perform automatic Gamut Mapping (CSS Color 4), but slight visual clipping may occur on standard sRGB monitors.
- **WCAG Contrast:** Automatically changing lightness by a fixed constant (e.g. `l - 0.1`) does NOT guarantee equal contrast ratio across all hues. Always test derived text/background pairs against WCAG AA standards (4.5:1).

---

## Non-Goals

- **SASS/Less Preprocessor Math:** This skill focuses exclusively on native browser CSS Relative Color Syntax, not SASS `$color` variables or preprocessor functions.
- **JavaScript Canvas/WebGL Shaders:** Does not cover dynamic color manipulation inside JavaScript 2D Canvas or WebGL shaders.
- **Forced Colors Mode Overriding:** RCS does not alter Windows High Contrast Mode user preference overrides.

---

## Common Failure Patterns

1. **Mismatched Unit Types in `calc()`:**
   - *Wrong:* `hsl(from var(--color) h s calc(l - 10))` (Missing `%` for HSL lightness).
   - *Fix:* `hsl(from var(--color) h s calc(l - 10%))` or use `oklch(from var(--color) calc(l - 0.1) c h)`.
2. **Channel Keyword Spelling Errors:**
   - *Wrong:* `oklch(from var(--color) l s h)` (`oklch` uses `c` for chroma, not `s` for saturation).
   - *Fix:* `oklch(from var(--color) l c h)`.
3. **Over-scaling Chroma Out of Gamut:**
   - *Wrong:* `oklch(from var(--color) l calc(c * 3) h)` producing `c = 0.6`, causing clipping and muddy display on sRGB displays.
   - *Fix:* Keep chroma within `0.01 - 0.28` for standard web UI components.
4. **Omitting Cascade Fallbacks for Older Browsers:**
   - *Wrong:* Using ONLY `background-color: oklch(from var(--brand) calc(l - 0.1) c h);` without fallback, resulting in invisible or transparent backgrounds in older browsers.
   - *Fix:* Declare a standard static fallback value directly preceding the RCS declaration.
5. **Alpha Slash Syntax Errors:**
   - *Wrong:* `oklch(from var(--brand) l c h, 0.5)` (Using comma instead of slash).
   - *Fix:* `oklch(from var(--brand) l c h / 0.5)`.

---

## Validation Steps

1. **Feature Support Check:** Test in Chrome 119+, Safari 16.4+, and Firefox 128+ to verify native parsing without syntax errors.
2. **Fallback Verification:** Disable RCS support or test in older browser engine to ensure legacy cascade fallbacks render cleanly without broken UI.
3. **Contrast Ratio Verification:** Run Lighthouse or Accessibility DevTools contrast inspector on derived hover, active, and text states to ensure WCAG 2.1 AA compliance (4.5:1 ratio).
4. **Theme Switch Test:** Change base CSS variable at runtime (e.g. `document.documentElement.style.setProperty('--brand', '#e11d48')`) and verify all derived RCS component states update instantly across the application.
