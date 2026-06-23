# Nesting and Responsive Patterns

This reference covers the technical considerations for managing deep navigation
hierarchies and ensuring the sidebar remains accessible across different
devices.

## 1. Nesting Strategies

When an application's IA exceeds two levels of depth, choose one of these
nesting patterns:

### A. The Inline Accordion (Preferred)
- **Behavior:** Clicking a parent item expands it downwards, pushing other
  items down.
- **Limit:** Best for 1-2 levels of nesting. Beyond 2 levels, indentation makes
  labels too short.
- **State:** Use `aria-expanded="true/false"` on the trigger.

### B. The Flyout Menu
- **Behavior:** Hovering or clicking a parent opens a floating panel to the
  right.
- **Limit:** Can be used for 3+ levels.
- **Drawback:** Requires precise mouse movement; hard to use on touch screens.
- **Accessibility:** Must ensure focus moves into the flyout and `Escape` closes
  it.

### C. The Drill-Down (Mobile/Compact)
- **Behavior:** Clicking a parent replaces the current sidebar content with the
  sub-menu content. Includes a "Back" button at the top.
- **Limit:** Unlimited depth.
- **Benefit:** Keeps the interface extremely clean. Best for mobile drawers.

---

## 2. Responsive Transformation Logic

Sidebars must adapt to the viewport to prevent "Mobile Cramming."

| Viewport Width | Display Mode | Implementation Rule |
| :--- | :--- | :--- |
| **> 1440px** | Persistent Expanded | `width: 260px;` |
| **1024px - 1439px** | Persistent Mini | `width: 72px;` Hide labels; show tooltips. |
| **768px - 1023px** | Collapsible / Overlay | Hidden by default; Slides in from left on trigger. |
| **< 768px** | Bottom Bar / Drawer | High-priority items move to a bottom tab bar; rest in "More" drawer. |

---

## 3. Accessibility Checkpoints (WCAG 2.1 AA)

### Semantic Markup
```html
<nav aria-label="Main Sidebar">
  <ul role="menubar">
    <li role="none">
      <a href="/dashboard" role="menuitem" aria-current="page">Dashboard</a>
    </li>
    <li role="none">
      <button
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="projects-menu"
        role="menuitem">
        Projects
      </button>
      <ul id="projects-menu" role="menu" hidden>
        <li role="none"><a href="/p1" role="menuitem">Web App</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

### Visual Contrast
- **Text (Small):** 4.5:1 minimum against sidebar background.
- **Icons:** 3:1 minimum.
- **Focus Ring:** Must be distinct (e.g., 2px solid offset) and have 3:1 contrast
  against the background.

### Touch Targets
- **Height:** All clickable items must be at least **44px** tall on touch
  devices.
- **Spacing:** Ensure at least **8px** of "dead space" between distinct links
  to prevent accidental taps.
