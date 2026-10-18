# CSS Relative Color Syntax (RCS) Audit Checklist

Use this audit checklist when implementing, refactoring, or reviewing CSS Relative Color Syntax (`from <color>`) across design systems, component libraries, and web applications.

---

## 1. Syntax & Channel Unit Verification

- [ ] **Valid `from <color>` Declaration:** Verify all relative color rules follow `color-function(from <origin-color> <channel-1> <channel-2> <channel-3> [/ <alpha>])`.
- [ ] **Channel Keyword Accuracy:**
  - `oklch()`: uses `l` (lightness), `c` (chroma), `h` (hue).
  - `oklab()`: uses `l` (lightness), `a` (green-red), `b` (blue-yellow).
  - `hsl()`: uses `h` (hue), `s` (saturation), `l` (lightness).
  - `rgb()`: uses `r` (red), `g` (green), `b` (blue).
- [ ] **Unit Compatibility in `calc()` Math:**
  - For `oklch()` lightness (`l`), treat raw `l` as a 0..1 floating point value (e.g. `calc(l - 0.08)`). Do not mix raw `l` with percentage additions unless `l` was originally declared in `%`.
  - For `hsl()` saturation (`s`) and lightness (`l`), include `%` in math operations (e.g., `calc(l - 10%)`).
  - For `rgb()` channels (`r`, `g`, `b`), use raw integers (0..255) or percentages (e.g., `calc(r + 20)`).
- [ ] **Alpha Channel Slash Separator:** Ensure alpha channel opacity modifications use the forward-slash (`/`) separator (e.g., `oklch(from var(--brand) l c h / 0.15)`), NOT a comma.

---

## 2. Progressive Enhancement & Fallback Strategy

- [ ] **Cascade Static Fallbacks:** Ensure every CSS declaration using relative color syntax is preceded by a valid static CSS color property for legacy engines:
  ```css
  .button {
    background-color: #2563eb; /* Static Legacy Fallback */
    background-color: oklch(from var(--brand) l c h); /* RCS Modern */
  }
  ```
- [ ] **Feature Query Coverage (`@supports`):** If applying complex derived utility classes, wrap fallback overrides inside `@supports not (color: oklch(from red l c h))`.
- [ ] **PostCSS / Build Pipeline Verification:** If using build tools (e.g. PostCSS `postcss-preset-env`), verify whether RCS is transformed at build time or preserved as native CSS based on browser targets.

---

## 3. Accessibility & Contrast Preservation (WCAG 2.1)

- [ ] **Interactive Hover / Active Contrast:** Check derived button hover and active background states against text color to ensure WCAG AA (4.5:1 ratio for normal text, 3:1 for large text).
- [ ] **Focus Halo & Ring Visibility:** Verify semi-transparent focus rings (e.g. `/ 0.45` alpha) maintain at least a 3:1 contrast ratio against both component background and adjacent page backdrop.
- [ ] **Dark Mode Inversion Check:** Ensure lightness operations switch correctly in dark mode (darken in light mode `calc(l - 0.08)`, lighten in dark mode `calc(l + 0.08)`).
- [ ] **Forced Colors Mode Safeguard:** Verify components rely on standard borders or outlines so high-contrast mode users retain visual boundaries when forced system colors override RCS rules.

---

## 4. Color Gamut & Performance Integrity

- [ ] **Chroma Thresholding in OKLCH:** Keep chroma (`c`) values within `0.01` to `0.28` for general web UI elements to avoid unexpected gamut clipping or color shifts on sRGB displays.
- [ ] **No Unnecessary Repaints:** Ensure relative color CSS declarations modify only CSS properties and do not force layout reflows or unnecessary compositing layers (unlike `filter: brightness()`).
- [ ] **Dynamic Theme Mutation Test:** Programmatically update origin CSS variables at runtime (`document.documentElement.style.setProperty('--brand-primary', newColor)`) and confirm all component states adapt smoothly without visual glitches.
