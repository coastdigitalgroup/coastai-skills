# Nesting & Responsive Sidebar Patterns

This reference documents the logic for handling deep navigation hierarchies and the transition between different sidebar states across breakpoints.

---

## 1. Hierarchy Nesting Patterns

When your application exceeds 5–7 top-level sections, you must use nesting to manage cognitive load.

### Pattern A: The Accordion (Default)
- **Visuals:** Clicking a parent item expands a list of children below it, pushing subsequent items down.
- **Pros:** Keeps the user in context; easy to implement.
- **Cons:** Can lead to an excessively long sidebar that requires internal scrolling.
- **Constraint:** Limit to 2 levels of nesting. Level 3 should be managed via on-page tabs or sub-headers.

### Pattern B: The Flyout (Advanced)
- **Visuals:** Hovering or clicking a parent item opens a floating menu to the right of the sidebar.
- **Pros:** Doesn't move other items; great for "Rail" (collapsed) states.
- **Cons:** Harder to use on touch devices; requires precise mouse movement.
- **Constraint:** Flyouts should close automatically when the mouse leaves the area (with a small delay).

### Pattern C: The Drill-down (Mobile/Deep IA)
- **Visuals:** Clicking a parent item slides the entire sidebar view to the left, replacing it with the children view (with a "Back" button).
- **Pros:** Zero vertical scrolling issues; handles infinite depth.
- **Cons:** Disorients users if not paired with clear breadcrumbs or animations.

---

## 2. Responsive Breakpoint Matrix

| Viewport | State | Behavior | Navigation Access |
| :--- | :--- | :--- | :--- |
| **Desktop (>1200px)** | Expanded | Persistent | Icons + Labels. |
| **Laptop (1024px-1200px)** | Collapsible | User-Toggleable | Default to Expanded, allow Rail. |
| **Tablet (768px-1024px)** | Rail | Persistent | Icons only (Labels on Hover). |
| **Mobile (<768px)** | Hidden Drawer | Modal Overlay | Via Hamburger Menu. |

---

## 3. The "Rail" Transition Logic

When transitioning from **Expanded** to **Rail** (Icon-only) view:

1. **Brand Treatment:** Swap the full logo for a "Mark-only" version.
2. **Text Visibility:** Set `.nav-label` to `opacity: 0` or `display: none`.
3. **Tooltip Activation:** Enable tooltips for every Level 1 icon.
4. **Active State:** Maintain the active indicator (e.g., the colored left border) to ensure the user still knows their location.
5. **Secondary Actions:** Group secondary actions (like user settings) into a single "User Avatar" trigger at the bottom.

---

## 4. Accessibility Landmarks & Focus

To ensure the sidebar is "keyboard friendly":

- **Focus Trapping:** When the Mobile Drawer is open, focus must be trapped within the sidebar until it is closed.
- **Escape Key:** Pressing `ESC` should close the Mobile Drawer or any open Flyout menus.
- **Skip Link:** Ensure the site's "Skip to Content" link bypasses the sidebar entirely to reach the main `<h1>`.
- **ARIA Current:** Use `aria-current="page"` on the specific `<a>` tag that matches the active route.
