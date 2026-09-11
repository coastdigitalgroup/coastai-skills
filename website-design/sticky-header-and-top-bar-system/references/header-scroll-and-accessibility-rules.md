# Sticky Header Scroll Physics and Accessibility Reference

This reference provides technical specifications, scroll threshold formulas, z-index layering rules, and WCAG AA accessibility compliance criteria for sticky headers and top bars.

---

## 1. Z-Index Layering Scale

To prevent stacking context conflicts (such as headers clipping under hero carousels or rendering over modal dialogs), strictly follow this standard scale:

| Interface Layer | Z-Index Value | Notes |
| :--- | :--- | :--- |
| **Base Page Content** | `0` – `10` | Standard layout elements, grids, typography. |
| **In-Page Sticky Widgets** | `100` | Sticky sidebars, table of contents rails. |
| **Sticky Top Header** | `1000` | Multi-tier header assembly. |
| **Header Dropdowns & Megamenus** | `1100` | Nav menus open *within* the header stacking context. |
| **Skip-to-Content Focus Trigger** | `2000` | Renders above header when focused by keyboard users. |
| **Mobile Drawer Navigation Overlay**| `2000` | Full-screen or sliding mobile nav drawer. |
| **Modal / Dialog Windows** | `3000` | Full-screen backdrops and modal dialogs. |
| **Toast & Banner Notifications** | `4000` | System alert toasts anchored to top/bottom edges. |

---

## 2. Scroll Physics & State Threshold Formulas

### Shrink-on-Scroll Threshold
- **Initial Scroll Activation (`scrollY > 60px`):** Adds `.is-scrolled` class.
- **Header Height Transition:** `72px` $\rightarrow$ `56px` (`transition: height 0.25s cubic-bezier(0.16, 1, 0.3, 1)`).
- **Logo Shrink Scale:** `font-size: 1.25rem` $\rightarrow$ `1.125rem`.

### Smart Auto-Hide/Reveal Sensitivity Delta
To prevent annoying header flicker caused by minor scroll jitter or finger resting on touchscreens:
- **Hide Trigger:** `scrollY > 200px` AND `deltaY > +12px` (scrolling down).
- **Reveal Trigger:** `deltaY < -15px` (scrolling up).
- **Reset to Unscrolled:** `scrollY < 50px`.

---

## 3. WCAG AA Accessibility Checklist

### SC 2.4.11 Focus Not Obscured (Minimum) (Level AA)
- **Requirement:** When an item receives keyboard focus (`Tab`), it must not be completely hidden behind fixed or sticky UI elements.
- **Implementation:** Apply CSS `scroll-margin-top` globally based on active scrolled header height:
  ```css
  :target,
  [id],
  main button,
  main a,
  main input,
  main select,
  main textarea {
    scroll-margin-top: calc(var(--sticky-header-height) + 24px);
  }
  ```

### SC 2.1.1 Keyboard (Level A)
- Top-bar announcement close buttons, search triggers, and mobile menu toggles must be fully focusable and operable using `Tab`, `Enter`, `Space`, and `Escape`.
- When an announcement banner is dismissed via keyboard, programmatically shift focus to the next logically actionable element or the brand logo.

### SC 1.4.3 Contrast (Minimum) (Level AA)
- Header navigation text and icons must maintain at least **4.5:1** contrast ratio against both the static background and the scrolled backdrop surface.
- Focus rings must maintain at least **3:1** contrast ratio against both header background and adjacent elements.
