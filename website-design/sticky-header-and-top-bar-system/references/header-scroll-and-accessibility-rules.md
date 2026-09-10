# Sticky Header & Top Bar Rules Reference

This reference provides technical specifications, scroll behavior matrices, z-index standards, and accessibility guidelines for implementing sticky headers and multi-tier top bars.

---

## 1. Scroll Mechanics & State Matrix

| Scroll State | Trigger Condition | CSS/JS Modifications | Layout Effect |
| :--- | :--- | :--- | :--- |
| **Top of Page** | `window.scrollY === 0` | `.is-scrolled: false`, `.is-hidden: false` | Full height, maximum padding, standard transparent/solid surface. |
| **Initial Scroll** | `0 < scrollY < 50px` | Secondary top bars scroll out | Announcement/utility bars leave viewport naturally. |
| **Scrolled Compact** | `scrollY >= 50px` | `.is-scrolled: true` | Height reduces, backdrop blur applied, surface shadow enabled. |
| **Scroll Down Hide** | `scrollY > 150px` AND `deltaY > 12px` | `.is-hidden: true` | `transform: translateY(-100%)` slides header offscreen. |
| **Scroll Up Reveal** | `scrollY > 150px` AND `deltaY < -12px` | `.is-hidden: false` | `transform: translateY(0)` slides header back into view. |

---

## 2. Z-Index Layering Standard

To prevent layering conflicts across popovers, drawers, and sticky elements, follow this system z-index scale:

```text
+-----------------------------------------------------------------------+
|  z-index: 10000; -> Skip to Main Content Link (Focused State)         |
+-----------------------------------------------------------------------+
|  z-index: 9000;  -> Lightbox / Full-Screen Image Overlay              |
+-----------------------------------------------------------------------+
|  z-index: 8000;  -> Mobile Navigation Drawer / Backdrop               |
+-----------------------------------------------------------------------+
|  z-index: 7000;  -> Global Modal Dialogs & Toast Notifications         |
+-----------------------------------------------------------------------+
|  z-index: 1000;  -> Sticky Top Header Container & Dropdown Menus        |
+-----------------------------------------------------------------------+
|  z-index: 500;   -> Floating Action Docks / Back-to-Top FAB           |
+-----------------------------------------------------------------------+
|  z-index: 1;     -> Standard In-Flow Content Cards & Images           |
+-----------------------------------------------------------------------+
```

---

## 3. Anchor Target Scroll Margin Formula

When internal links or Table of Contents items jump to IDs on a page (`#features`, `#pricing`), sticky headers cover target section titles unless compensated with `scroll-margin-top`.

```css
/* Calculate total height of maximum sticky header element */
:root {
  --sticky-header-height: 72px; /* Set to match active header height */
  --anchor-padding-buffer: 1.5rem; /* Additional breathing room */
}

/* Apply scroll-margin-top to all heading tags and target elements */
:target,
h1[id],
h2[id],
h3[id],
section[id] {
  scroll-margin-top: calc(var(--sticky-header-height) + var(--anchor-padding-buffer));
}
```

---

## 4. Performance & Hardware Acceleration Checklist

1. **Use Hardware-Accelerated Transforms:** Animate `transform: translateY()` and `opacity` instead of top/height properties during scroll hide/reveal transitions to avoid triggering layout reflows.
2. **Throttle Scroll Handlers:** Bind scroll handlers using `window.requestAnimationFrame()` or use `IntersectionObserver` to detect top-of-page thresholds without forcing synchronous layout queries (`offsetHeight`).
3. **Passive Event Listeners:** Always attach scroll event listeners with `{ passive: true }`:
   ```javascript
   window.addEventListener('scroll', handleScroll, { passive: true });
   ```
4. **Scope Backdrop Blurs:** Limit `backdrop-filter: blur(12px)` to the `.is-scrolled` state and test on mobile GPUs to ensure 60fps scrolling performance.

---

## 5. WCAG 2.1 AA Accessibility Checklist

- [ ] **Bypass Blocks (SC 2.4.1):** A skip-to-content link is the first focusable HTML element, visually overlaying the sticky header on keyboard focus.
- [ ] **Landmark Hierarchy (SC 1.3.1):** The outer container is wrapped in `<header role="banner">` and inner sub-navigations use `<nav aria-label="...">` with distinct label names (e.g., `aria-label="Main Navigation"`, `aria-label="Utility Links"`).
- [ ] **Color Contrast (SC 1.4.3):** All header navigation text, icon triggers, and CTA buttons meet minimum **4.5:1** contrast against both un-scrolled and scrolled glass surface colors.
- [ ] **Focus Visibility (SC 2.4.7):** All focus indicators are unclipped by container `overflow` rules, displaying at least **3:1** contrast against the background surface.
- [ ] **Target Size (SC 2.5.8):** All interactive links, buttons, and mobile menu toggles satisfy minimum **44x44px** touch target sizes.
- [ ] **Reduced Motion Support (SC 2.3.3):** All slide animations and height transitions are disabled when `@media (prefers-reduced-motion: reduce)` is detected.
