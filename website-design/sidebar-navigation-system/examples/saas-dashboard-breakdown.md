# SaaS Dashboard Sidebar Breakdown

This example demonstrates the application of the Sidebar Navigation System to a
complex SaaS platform (e.g., a Project Management Tool). It highlights how to
manage multi-level hierarchy and utility tools within a vertical space.

## The Problem

A project management tool with over 20 distinct views (Projects, Tasks,
Reporting, Billing, Team Settings, etc.) needs a navigation system that doesn't
overwhelm the user but provides immediate access to core workflows.

## The Solution: A Structured Vertical Sidebar

### 1. Functional Zones

- **Header:** Workspace Switcher (Dropdown) allowing users to move between
  "Marketing Team" and "Product Team."
- **Search:** A compact, inline search trigger (`Cmd + K`) placed at the top for
  global discovery.
- **Primary Nav:** High-frequency areas (Home, My Tasks, Inbox).
- **Secondary Nav (Project Hierarchy):** A "Projects" folder that expands to
  show the user's top 5 active projects, with a "View All" link.
- **Footer:** A "Settings" group and the User Profile, including a "Collapse"
  toggle to maximize workspace.

### 2. Visual Hierarchy (CSS/Design Tokens)

- **Top-Level Link:** 14px Semi-bold, `--color-text-primary`, 24px Icon.
- **Nested Project Link:** 13px Regular, `--color-text-secondary`, 16px Icon
  (Circle or Square representing project color).
- **Active State:** Background color `#F3F4F6` (light gray), Left border 4px
  `#2563EB` (Primary Blue).
- **Spacing:** 8px vertical gap between items; 16px padding on left/right.

### 3. Responsive Pivot Points

| Viewport | Sidebar State | Behavior |
| :--- | :--- | :--- |
| **Desktop (1440px+)** | Expanded (260px) | Labels and icons visible. All folders remember state. |
| **Laptop (1024px-1440px)** | Mini (72px) | Icons only. Hovering shows tooltips with labels. |
| **Tablet (768px-1024px)** | Hidden / Drawer | Sidebar is hidden; Hamburger menu opens a full-height overlay. |
| **Mobile (<768px)** | Hidden / Drawer | Same as tablet, but full-width with larger touch targets. |

---

## Annotated Layout Spec

```text
[ Sidebar Container: 260px width, Border-right: 1px ]
------------------------------------------------------
[ Workspace Switcher (48px height) ]
  (Logo) Marketing Dept. [V]
------------------------------------------------------
[ Search Bar (36px, Rounded 6px) ]
  (Icon) Search...      [Cmd+K]
------------------------------------------------------
[ Primary Links ]
  (Icon) Home                   <-- Active (Blue Bar)
  (Icon) My Tasks
  (Icon) Inbox          (Badge: 3)
------------------------------------------------------
[ Projects Folder (Accordion Open) ]
  [V] Projects
      - Web Redesign
      - App Launch
      - Q4 Roadmap
      - + New Project
------------------------------------------------------
[ (Flexible Spacer) ]
------------------------------------------------------
[ Utility Footer ]
  (Icon) Team Settings
  (Icon) Help & Support
  (Avatar) Brad Potts
  (Icon) Collapse Sidebar       <-- Trigger for Mini Mode
```

## Why this works

1. **Orientation:** The blue left border on "Home" ensures the user never loses
   their place.
2. **Efficiency:** "My Tasks" and "Inbox" are top-level because they are
   accessed dozens of times a day.
3. **Scalability:** The "Projects" accordion allows the user to have 5 or 50
   projects without breaking the layout.
4. **Context:** The workspace switcher at the top defines the scope of
   everything below it.
