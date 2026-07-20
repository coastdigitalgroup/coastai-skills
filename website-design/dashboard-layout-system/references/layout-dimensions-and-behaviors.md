# Dashboard Layout Dimensions & Behaviors Reference

This reference catalog provides standard metrics, scroll containment solutions, and accessibility checklists for viewport-locked application shells.

---

## 1. Standard Dashboard Spatials & Layout Dimensions

Use these dimensions to maintain visual consistency across app workspace views:

| Layout Zone | Width Parameter | Height Parameter | Behavior Model |
| :--- | :--- | :--- | :--- |
| **Global Sidebar (Desktop)** | `240px` - `280px` | `100%` of Shell | Fixed width, flex Column layout, dynamic vertical content scrolling. |
| **Sidebar Rail (Tablet)** | `64px` - `72px` | `100%` of Shell | Fixed width, centered vertical icon stack, hides text labels. |
| **Sidebar Drawer (Mobile)** | `280px` | `100%` of Shell | Off-canvas sliding layer triggered via hamburger buttons. |
| **Global Header** | `100%` of Workspace | `56px` - `64px` | Fixed height, flex row, horizontal alignment. |
| **Properties Drawer** | `300px` - `360px` | `100%` of workspace | Collapsible, absolute slide-in or inline column grid push. |
| **Content Padding Scales** | `16px` (Mobile) \| `24px` (Tablet) \| `32px` (Desktop) | Custom or auto | Padding boundaries for internal workspace dashboards. |

---

## 2. Scroll Lock & Back-scroll Prevention Protocol

When building viewport-locked dashboard environments, prevent overall browser page bounces (especially on mobile touch devices) and ensure nested scrolling containers behave exactly as expected.

### A. The Scroll Lock Rule
To lock the main screen bounds and delegate scrolling exclusively to specific children:
```css
/* Apply to parent layout wrappers */
.viewport-locked-shell {
  position: relative;
  width: 100vw;
  height: 100dvh; /* Dynamic Viewport Height prevents mobile address bar cropping */
  overflow: hidden; /* Absolutely locks out general browser page scrollbars */
}

/* Apply to nested panels that need scrolling capability */
.isolated-scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  /* Retain native inertia momentum scrolling on mobile Safari */
  -webkit-overflow-scrolling: touch;
}
```

### B. Scroll Leak / Scroll Overscroll Containment
When scrolling to the bounds of a nested container, the scrolling interaction can "leak" to parent containers or cause the entire document body to rubberband on iOS. Prevent this behavior by specifying the `overscroll-behavior` CSS property:
```css
.isolated-scroll-container {
  overscroll-behavior: contain; /* Isolates scroll gestures within this node */
}
```

---

## 3. High-Performance Collapsible State Animations

Do not use transitions on `width`, `min-width`, or `left` properties to animate the collapse of sidebars or properties drawers. Doing so forces layout recalculations ("reflows") on every frame, leading to visual lag.

Instead, combine hardware-accelerated transitions with relative coordinates:
```css
/* Recommended CSS structure for a right properties drawer */
.properties-drawer {
  width: 320px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 30;

  /* Hardware-accelerated sliding transition */
  will-change: transform;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Collapsed State: Slide completely off-canvas */
.properties-drawer.collapsed {
  transform: translateX(100%);
}
```

---

## 4. Accessibility Landmark and Association Checklist

Ensure assistive technologies can smoothly parse and navigate the multi-pane dashboard layout structure:

- [ ] **Main Landmark Unique Target:** Ensure there is exactly one `<main>` landmark element on the page, representing the central workspace content area.
- [ ] **Global Navigation Landmark:** Ensure the primary navigation panel is wrapped inside a `<nav>` container with an explicit descriptive label (e.g., `<nav aria-label="Primary Navigation">`).
- [ ] **Dynamic Panel State Handlers:** Buttons that toggle side panels or collapsible drawers must have an `aria-expanded` state that dynamically toggles between `"true"` and `"false"` via JavaScript.
- [ ] **Responsive Inert Attribute:** When a mobile modal drawer or dialog is active, apply the `inert` attribute to all inactive adjacent screen layouts (`.app-sidebar` and `.app-workspace`), trapping focus flow within the open overlay.
- [ ] **Contrast Verification:** Ensure background borders separating adjacent layout containers meet the minimum **3:1 contrast ratio** against the background surface colors to remain perceptible to low-vision keyboard users.
