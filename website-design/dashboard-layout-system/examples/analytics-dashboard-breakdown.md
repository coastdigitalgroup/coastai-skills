# Analytics Dashboard Layout Breakdown

This example analyzes a high-density SaaS analytics dashboard featuring a three-pane layout: a Left Navigation Sidebar, a Central Content Workspace (with dynamic data grids), and a Collapsible Right Contextual Insights Panel.

## The Design Challenge

SaaS operators need to inspect a continuous stream of event logs and chart data while simultaneously executing contextual actions (such as configuring filters, looking up metadata details, or navigating between different systems) without losing their workspace context or being forced to scroll a giant page back and forth.

---

## Spatial Composition Diagram

Below is the layout composition of the active dashboard inside a viewport-locked screen boundary (`100dvh`):

```text
+------------------------------------------------------------------------------------------------------+
|                                          [1] THE APP SHELL (100dvh)                                  |
|                                                                                                      |
|  +--------------------+---------------------------------------------------------------------------+  |
|  | [2] NAV SIDEBAR    | [3] GLOBAL WORKSPACE HEADER (Fixed height: 64px)                          |  |
|  |     (Width: 260px) |     [Logo/Breadcrumbs]                             [User Profile / Admin] |  |
|  |                    +----------------------------------------------------+----------------------+  |
|  |  * Dashboard       | [4] CENTRAL CONTENT WORKSPACE (overflow-y: auto)   | [5] PROPERTIES PANEL  |  |
|  |  * Analytics       |                                                    |     (Width: 320px)   |  |
|  |  * Data Logs       |  +----------------------------------------------+  |     (Collapsible)    |  |
|  |  * Team            |  |  [KPI Cards Grid]                            |  |                      |  |
|  |  * Settings        |  +----------------------------------------------+  |  * Selected Row Info |  |
|  |                    |  |  [Active Chart Canvas]                       |  |  * Metadata Details  |  |
|  |                    |  +----------------------------------------------+  |  * Action CTAs       |  |
|  |                    |  |  [Dense Data Grid Table (Horizontal Scroll)] |  |                      |  |
|  |                    |  +----------------------------------------------+  |                      |  |
|  |                    |                                                    |                      |  |
|  +--------------------+----------------------------------------------------+----------------------+  |
+------------------------------------------------------------------------------------------------------+
```

---

## Spatial & Visual Specifications

### 1. The App Shell Container (`.app-shell`)
- **Layout Model:** CSS Grid.
- **Columns Structure:** `260px` (Sidebar) | `1fr` (Main Content Workspace area).
- **Rows Structure:** `100dvh` (Locked to full viewport height, preventing dynamic address bar shifts).
- **Sizing & Bounds:** `width: 100vw; height: 100dvh; overflow: hidden;`

### 2. The Navigation Sidebar (`.app-sidebar`)
- **Background Contrast:** Neutral dark tint background (e.g., `#0F172A`) against canvas-white core workspace.
- **Border Partition:** Clean vertical separator (`border-right: 1px solid #1E293B`).
- **Anatomy Layout:** Flexbox column layout:
  - **Header:** Workspace selector.
  - **Body (`flex: 1`):** Vertical list items (`gap: 4px`).
  - **Footer:** Profile avatar + collapse trigger.

### 3. Global Workspace Header (`.app-header`)
- **Sizing & Bounds:** `height: 64px; flex-shrink: 0;`
- **Border Partition:** Clean horizontal divider (`border-bottom: 1px solid #E2E8F0`).
- **Layout Model:** Flexbox row, spacing elements via `justify-content: space-between; align-items: center; padding: 0 24px;`.

### 4. Central Content Workspace (`.app-content`)
- **Layout Model:** CSS Grid.
- **Columns Structure:** `1fr` (Center content) | `320px` (Optional properties drawer).
- **Scroll Behavior:** `overflow-y: auto; overflow-x: hidden;` inside the center zone. This allows independent scrolling of charts and logs while the global header, sidebar, and right properties drawer remain completely static.
- **Padding Scale:** Adaptive spacing (`padding: clamp(16px, 3vw, 32px)`) maintaining balanced structural grids.

### 5. Properties Drawer (`.properties-drawer`)
- **Width:** `320px`.
- **Anatomy Layout:** Positioned inline for wide desktop views, but transitioned absolutely using CSS `transform: translateX(100%)` when collapsed.
- **Visual Separation:** Left-hand border (`border-left: 1px solid #E2E8F0`) with a subtle overlay drop shadow (`0 10px 15px -3px rgba(0,0,0,0.05)`) to layer depth.

---

## Responsive Breakpoint Adaptation Behavior

```text
                  +---------------------------------------------------+
                  | Desktop (>1200px)                                 |
                  | [Sidebar: 260px] [Main Area] [Properties: 320px]  |
                  +---------------------------------------------------+
                                            |
                                            v
                  +---------------------------------------------------+
                  | Tablet (768px-1200px)                             |
                  | [Sidebar: 72px Rail] [Main Area] [Drawer: Off]    |
                  +---------------------------------------------------+
                                            |
                                            v
                  +---------------------------------------------------+
                  | Mobile (<768px)                                   |
                  | [Hamburger] [Main Area (100% Fluid Scroll)]       |
                  +---------------------------------------------------+
```

### Desktop View (>1200px): Wide Workspace
- Full three-pane view active.
- Center main content width shifts fluidly to accommodate resizing of the window.
- The Right Context drawer remains anchored in the document layout, pushing the main content container without causing overlaps.

### Tablet View (768px - 1200px): Icon-Rail Mode
- Sidebar collapses from `260px` to a `72px` vertical icon rail to reclaim workspace pixels. Text labels collapse out of view, leaving high-contrast accessible SVG icons.
- Right contextual insights panel is closed by default. Clicking an item inside the main data table slides the properties drawer in as a sheet overlay (`z-index: 40`) positioned on top of the main central area.

### Mobile View (<768px): Single Column Flow
- The Left Sidebar collapses out of view completely.
- A fixed Mobile Bottom Nav bar or a sliding hamburger-triggered menu drawer (`z-index: 50`) handles primary navigational routes.
- The workspace content area is allocated 100% of the viewport width. Heavy data grids utilize local container overflow scrolling (`overflow-x: auto`) to prevent breaking the layout boundary.
