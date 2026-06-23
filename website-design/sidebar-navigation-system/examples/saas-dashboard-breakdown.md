# SaaS Dashboard Sidebar Breakdown

This example demonstrates the Sidebar Navigation System applied to a complex B2B SaaS platform (Project Management Tool).

## The Design Challenge

The platform manages multiple organizations, projects, and specialized tools (Time Tracking, Reporting, Team Management). A standard top-bar navigation would quickly become overcrowded, and users need to switch between high-level company views and specific project details frequently.

---

## 1. Sidebar Anatomy

The sidebar is divided into four distinct vertical zones to manage hierarchy and utility.

### A. The Header (Account & Workspace)
- **Organization Switcher:** A dropdown allowing users to jump between "Acme Corp" and "Personal Projects."
- **Search Trigger:** A compact search bar or icon for global "Go to" commands.

### B. Primary Navigation (Top-Level Nodes)
- **Dashboard:** (Icon: House) Overview of all activity.
- **My Tasks:** (Icon: Check-circle) Personal task list with a notification badge (e.g., "12").
- **Inbox:** (Icon: Inbox) Internal communications.
- **Projects:** (Icon: Folder) A nested group containing the user's "Star projects."

### C. Secondary/Project Context (Nested Items)
When "Projects" is expanded:
- **Project Alpha:** (Indented)
- **Project Beta:** (Indented, Active State)
- **Archived:** (Muted color)

### D. The Footer (Utility & User)
- **Support:** (Icon: Help-circle) Link to documentation.
- **Settings:** (Icon: Settings) Personal and Org settings.
- **User Profile:** (Avatar + Name) Account management and Logout.
- **Collapse Trigger:** (Icon: Chevron-left) To toggle the "Rail" view.

---

## 2. Visual Hierarchy & States

| Element | Visual Treatment | Interaction State |
| :--- | :--- | :--- |
| **Active Item** | Background: Primary-100; Text: Primary-700; Left Border: 4px Solid Primary-600. | Persistent. |
| **Hover Item** | Background: Gray-100. | Transitions in 150ms. |
| **Notification Badge** | Background: Red-500; Text: White; Shape: Pill. | Updates via WebSockets. |
| **Level 2 Link** | Margin-left: 32px; Font-size: 0.875rem; Color: Gray-600. | Subordinated to Level 1. |

---

## 3. Responsive Strategy: The "Three-State" Sidebar

The sidebar adapts to the available viewport width to balance accessibility and content space.

### State 1: Expanded (Desktop > 1200px)
- **Width:** 260px.
- **Behavior:** Persistent. Labels and icons are both visible.
- **Impact:** Provides the fastest navigation speed and clearest wayfinding.

### State 2: Rail (Tablet / Collapsed Desktop)
- **Width:** 64px.
- **Behavior:** Only icons are visible. Labels appear on hover via a high-contrast tooltip.
- **Impact:** Reclaims horizontal space for complex data tables or Kanban boards.

### State 3: Drawer (Mobile < 768px)
- **Width:** 0px (Hidden).
- **Behavior:** Slides in from the left over the content when the hamburger menu is clicked. Backdrop scrim is applied to the main content.
- **Impact:** Ensures the application is usable on small screens while prioritizing content visibility.

---

## 4. Accessibility Checklist

- [x] **ARIA Landmark:** Wrapped in `<nav aria-label="Main Navigation">`.
- [x] **Nesting:** Expandable sections use `aria-expanded="true/false"`.
- [x] **Keyboard:** Tab order moves from Header -> Primary -> Footer.
- [x] **Contrast:** All nav links meet the 4.5:1 ratio against the sidebar background.
