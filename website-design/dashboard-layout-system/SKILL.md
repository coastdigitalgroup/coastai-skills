---
name: dashboard-layout-system
description:
  Design a systematic layout framework for viewport-locked, multi-pane web applications
  and SaaS dashboards, establishing scroll containment, collapsible panels, and robust responsive adaptations.
---

# Dashboard Layout System

## Purpose

The Dashboard Layout System provides a systematic design methodology for viewport-locked, multi-pane web interfaces (often referred to as application shells or workspaces). Unlike standard document-based pages that flow infinitely down a single scroll container, a dashboard shell locks the main viewport height to exactly `100vh` (or `100dvh`) and partitions the workspace into distinct functional zones.

A systematic approach resolves common spatial friction points—such as "scroll-within-scroll" lockups, viewport rubber-banding, layout shifting during panel collapse transitions, and overlapping dialog focus traps. It bridges the gap between aesthetic visual design and technical CSS containment, resulting in a cohesive, highly functional, and accessible workspace.

## Use Cases

- **B2B SaaS Core Workspaces:** Web platforms requiring concurrent views of sidebars, filters, list controls, and content detail panels.
- **Data Analytics Dashboards:** High-density, multi-panel grids presenting live data, metrics, charts, and control sidebars in a unified view.
- **Admin and Operations Panels:** Heavy operational software that requires fixed actions headers and contextual detail drawers next to extensive data grids.
- **Rich Content Editing Interfaces:** Layouts with collapsible formatting/properties side drawers flanking a central canvas or rich-text workspace (e.g., CMS editors, email builders, and design canvas tools).

## When NOT to Use

- **Marketing and Landing Pages:** Where linear, vertical scroll journeys optimized for storytelling and call-to-actions are required. Use `hero-design-system` and `section-composition-system` instead.
- **Editorial and Blog Articles:** Where readers expect standard native browser scrolling with a single linear text flow. Use `article-layout-system` and `table-of-contents-system`.
- **E-Commerce Product Listing Pages (PLP):** Where infinite scroll or standard paginated layouts work better for continuous product scanning.
- **Simple Utility Tools:** Single-input utilities (e.g., a simple file converter or image resizer) that do not benefit from a multi-pane layout shell.

## Inputs

1. **Workspace Pane Inventory:** List of the spatial regions required by the application (e.g., Sidebar Navigation, Topbar Workspace actions, Central Content Workspace, Right Properties Drawer).
2. **Interactive Control Layout:** Specifications for collapsible panels, resizable panes, and trigger areas.
3. **Typography & Spacing Tokens:** Fluid typography and relative spacing systems (`fluid-spacing-system` and `fluid-typography-system`) to establish clean alignment grids.
4. **Target Breakpoints:** Device layout definitions from `responsive-grid-system` to determine panel folding, rail collapsing, and mobile drawer transitions.

## Outputs

1. **Viewport Containment Blueprint:** HTML and CSS grid/flexbox spatial specifications locking parent dimensions to `100dvh` and isolating scrolling to specific sub-containers.
2. **Pane Composition Spec:** Visual definition, width constraints, and border lines partitioning Navigation, Utility headers, and Workspaces.
3. **Transition & Motion Model:** Hardware-accelerated CSS animation guidelines (`transform`, `opacity`) for smooth, shift-free collapsible panel transitions.
4. **Responsive Folding Rules:** Specifications detailing layout adaptation across Desktop, Tablet, and Mobile viewport bounds.
5. **Accessibility landmark Map:** Defined ARIA role regions and keyboard navigation flow parameters.

## Workflow

### 1. Establish Viewport-Locking and Scroll Containment

Lock the main browser viewport to prevent overall page scrolling and rubber-banding. All layout components must fit within this rigid viewport container, and scrolling must be delegated strictly to isolated content panes:

- Set the parent container (e.g., `.app-shell`) to `width: 100vw` and `height: 100dvh` (dynamic viewport height) with `overflow: hidden`.
- Partition the `.app-shell` using a 2-tier layout grid:
  - **Tier 1 (Outer Grid):** Separates the left sidebar from the right content workspace.
  - **Tier 2 (Inner Grid):** Separates the workspace top-bar/header from the scrolling content canvas.
- For scrollable panes, apply `overflow-y: auto` and `-webkit-overflow-scrolling: touch` to ensure smooth inertia scrolling on mobile Safari.

### 2. Define Pane Visual Anchors and Borders

Use clear visual boundaries to organize high-density dashboards without adding visual noise:
- **Border Separation:** Avoid heavy shadow elevations between persistent adjacent panels. Instead, use clean, low-contrast 1px border separators (e.g., `1px solid var(--border-neutral-muted)`) to partition sections.
- **Background Contrast:** Use subtle background shade differences to distinguish navigation from active content. Set the navigation sidebar to a slightly darker or lighter shade (e.g., a neutral tint) while the main content workspace utilizes a clean canvas white or deep dark surface.
- **Scroll Shadows:** For scrolling content areas, implement subtle linear-gradient fade overlays at the top and bottom edge boundaries to visually signal to the user that more content lies beyond the fold.

### 3. Design the Collapsible Panel Mechanics

Collapsible panels (such as sidebars or right-hand detail drawers) must change states smoothly without introducing Cumulative Layout Shift (CLS) or visual jerkiness:
- **Avoid Width Transitions:** Animating CSS `width` forces the browser to recalculate layouts of all child elements on every frame, leading to low frame rates.
- **Prefer Transforms:** Position side drawers absolutely or out of canvas bounds, and animate their visibility using CSS `transform: translateX()` combined with hardware-accelerated transitions.
- **Content Masking:** Use `overflow: hidden` on containing wrapper blocks so that sliding panels clip neatly behind adjacent views.

### 4. Code and Handoff Accessibility Landmarks

Dashboard layout templates must deliver structured semantic landmark hierarchies for screen readers and keyboard users:
- **Landmark Assignment:** Ensure every pane maps to an appropriate HTML5 semantic tag:
  - Global Navigation Sidebar: `<nav aria-label="Main Navigation">`
  - Workspace Top bar / Header: `<header>`
  - Central Workspace: `<main>`
  - Properties / Context Drawer: `<aside aria-label="Properties and Metadata">`
- **Focus Management:** When a collapsible panel is closed, programmatically shift focus to the trigger button that closed it. When a mobile drawer is opened, trap keyboard tab focus within that panel.
- **Inert Attribute:** Toggle the `inert` HTML attribute on the central main panel when a modal panel or mobile side drawer is active, preventing keyboard users from accidentally tabbing out of the visible screen overlay.

### 5. Plan Responsive Adaptations (Folding Rules)

Scale the dashboard workspace gracefully across diverse devices:
- **Desktop Range (>1200px):** Multi-pane layout fully expanded. Left Navigation sidebar fixed, workspace header fixed, center canvas auto-scrolls, right properties drawer expanded.
- **Tablet Range (768px-1200px):** Collapse the Left Navigation sidebar into a compact "Rail" (displaying only icons). Pivot the right properties drawer from a persistent grid column to an overlay sheet triggered via an action button.
- **Mobile Range (<768px):** Hide both the sidebar and properties drawer entirely behind overlay drawers. The primary layout simplifies to a single-column view consisting of a mobile top-bar header containing a hamburger menu trigger, an action button, and the isolated scrollable content workspace.

## Decision Rules

### Grid vs. Flexbox for Shell Structure

| Aspect | Use CSS Grid | Use CSS Flexbox |
| :--- | :--- | :--- |
| **Primary Axis** | Two-dimensional (both rows and columns are dynamic/rigid). | One-dimensional (linear row stacks or column stacks). |
| **Layout Purpose** | Outer frame structuring (Sidebar Column + Main Content Column). | Inner header contents alignment (Logo Left + Actions Right). |
| **Panel Collapsing** | When sidebar columns collapse dynamically to exactly `0` width. | When children should grow, shrink, and wrap naturally. |

### Scrolling Management: Global Scroll vs. Pane-Specific Scroll
- **Global Page Scroll (Do NOT use in dashboards):** Causes the entire header, sidebar, and dashboard frame to scroll away from the screen, forcing the user to scroll back up to access navigation.
- **Isolated Pane Scroll (Standard dashboard pattern):** Keeps the outer framework (headers, rails, actions) perfectly anchored to the screen edges while only the data table, chart feed, or document editor scroll independently inside their viewport cells.

## Constraints

- **Dynamic Viewport Height:** Always use `dvh` units (`100dvh`) instead of `vh` (`100vh`) for the outer parent container. On mobile browsers, the standard `vh` unit does not account for expanding/retracting browser chrome (address bars, navigation controls), causing the bottom of the dashboard to be clipped out of reach.
- **Focus Indicators:** Ensure focus rings are highly visible on interactive panel triggers. They must meet WCAG 2.2 contrast rules and never be clipped by `overflow: hidden` container edges.
- **No Double Scrollbars:** Ensure that container margins, paddings, and height bounds are calculated exactly (using CSS `calc()` or Flex/Grid auto constraints) so that a scrolling pane never triggers nested double-scrollbar bars side-by-side.
- **Touch Target Minimums:** Handlers for resizable panels, sidebar expand buttons, and tab toggles must provide a touch target of at least **24x24px** (WCAG 2.2 SC 2.5.8), with **44x44px** preferred.

## Common Failure Patterns

- **The Address Bar Clip (Mobile):** Using `100vh` on mobile, causing the user profile footer or primary submit buttons at the bottom of the sidebar to hide behind mobile browser action bars.
- **The Layout Twitch:** Animating the `width` property on a navigation menu, causing cards, charts, and grids inside the main workspace to rapidly jump and re-render during collapse transitions.
- **The Scroll Trap / Scroll Leak:** Failing to isolate scroll events within an open overlay pane, causing the main background content to scroll underneath when the user swipes on a mobile navigation drawer.
- **Unlabeled Scroll Containers:** Adding `overflow: auto` to a page container without an accompanying role or keyboard focus path, which prevents keyboard-only users from scrolling the data within that container.
- **Double Scrollbar Chaos:** Creating nested wrappers without strict height limits, causing both the main browser window and the inner container to show double scrollbars, confusing navigation.

## Validation Criteria

- [ ] Outer layout container height is locked to `100dvh` (or fallback `100vh`) with main document `overflow` set to `hidden`.
- [ ] No double scrollbars are visible when interacting with scrolling data lists or workspaces.
- [ ] Responsive states are defined across Desktop, Tablet, and Mobile ranges with appropriate drawer and rail transformations.
- [ ] Sliding panels and sidebars animate using hardware-accelerated CSS properties (`transform: translateX()`).
- [ ] Workspace utilizes appropriate semantic HTML5 landmarks (`<nav>`, `<header>`, `<main>`, `<aside>`).
- [ ] When an overlay drawer or panel is open on mobile, background elements are set to `inert` or hidden from the keyboard focus flow.
- [ ] Touch targets on panel triggers, toggles, and handles meet the minimum size requirement of 24x24px (44px preferred).
- [ ] Inactive background pane elements do not scroll when swiping/scrolling within active top-layer overlay sheets (Scroll Leak Prevention).
