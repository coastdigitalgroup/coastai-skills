---
name: sidebar-navigation-system
description:
  Design and implement a persistent, hierarchical vertical navigation framework
  for complex web applications, dashboards, and documentation sites.
---

# Sidebar Navigation System

## Purpose

The Sidebar Navigation System provides a methodology for designing persistent vertical navigation structures. Unlike horizontal headers, sidebars are optimized for high-density information architectures, supporting deep nesting, secondary utility actions, and workspace switching. This system ensures that users can navigate complex applications with minimal cognitive load while maintaining a clear sense of their current location within a hierarchical environment.

## Use Cases

- **SaaS Dashboards:** Managing multiple workspaces, tools, and data views.
- **Admin Panels:** Organizing extensive management functions and system settings.
- **Documentation Sites:** Navigating deep hierarchies of articles, sections, and API references.
- **Internal Tools:** Structuring complex workflows and data-entry modules.
- **Content Management Systems (CMS):** Switching between page editing, media libraries, and user permissions.

## When NOT to Use

- **Marketing Landing Pages:** Where a simple horizontal header is more appropriate for conversion-focused navigation.
- **Simple Blog Sites:** Where breadcrumbs and top-level links provide sufficient wayfinding.
- **Mobile-First Consumer Apps:** Where a bottom tab bar is better suited for primary thumb-zone interaction.
- **Immersive Narrative Sites:** Where persistent UI elements might distract from the storytelling experience.

## Inputs

1. **Information Architecture (IA):** A map of all pages and tools, grouped by functional relationship.
2. **User Contexts:** Identifying different user roles and the primary tasks they perform.
3. **Workspace Levels:** Determining if the app requires switching between different accounts or projects.
4. **Brand Style Tokens:** Colors, typography, and spacing from the existing design system.
5. **Interactive Component Inventory:** Standardized icons, badges (for notifications), and buttons.

## Outputs

1. **Sidebar Anatomy Spec:** Defined regions (Branding, Workspace Switcher, Primary Nav, Secondary Nav, User Footer).
2. **Interaction Matrix:** Behavior for hover, focus, active states, and nesting (expand/collapse).
3. **Responsive Mapping:** Rules for how the sidebar transforms (e.g., Fixed -> Collapsed Rail -> Mobile Drawer).
4. **State Specifications:** Defined visual treatments for different navigation levels and notification indicators.

## Workflow

### 1. Define the Navigation Levels

Organize the IA into a vertical hierarchy:
- **Level 1 (Direct):** Core sections always visible in the primary list.
- **Level 2 (Nested):** Sub-sections revealed via expansion or drill-down.
- **Global Actions:** Secondary utilities like "Settings," "Help," or "Notifications" usually placed at the bottom.

### 2. Establish the Visual Anatomy

Divide the sidebar into functional zones:
- **Header:** Brand logo and workspace/account switcher.
- **Body (Scrollable):** The primary navigation list.
- **Footer (Fixed):** User profile, system settings, and collapse/expand trigger.

### 3. Design the Nesting Pattern

Choose how to handle deep hierarchy:
- **Accordion:** Expanding sections that push other items down. Best for 2 levels.
- **Flyout:** Sub-menus that appear next to the sidebar on hover/click. Best for narrow "rail" sidebars.
- **Drill-down:** The entire sidebar view swaps for a sub-level view. Best for very deep structures.

### 4. Create the State Matrix

Apply consistent visual feedback (from `interactive-state-system`):
- **Active State:** Use a high-contrast indicator (e.g., color bar or background shift) to show the current page.
- **Hover/Focus:** Subtle background change to indicate interactivity.
- **Notification Badges:** Use the `badge-and-tag-system` to show unread items or status.

### 5. Plan Responsive Adaptation

Map the sidebar's behavior across breakpoints:
- **Desktop (>1200px):** Fixed, wide sidebar (240px-280px).
- **Tablet (768px-1200px):** Collapsed "Rail" showing only icons, expanding on hover/click.
- **Mobile (<768px):** Hidden by default, appearing as a full-screen drawer triggered by a hamburger icon.

## Decision Rules

- **The "Seven Item" Rule:** Limit top-level groups to seven or fewer to ensure they are easily scannable without scrolling.
- **Iconography Requirement:** Always use icons for Level 1 items. Icons provide a visual anchor that aids recognition, especially in collapsed states.
- **Label Persistence:** Labels should never be hidden in the desktop view unless the user explicitly collapses the sidebar.
- **Visual Distinction:** Ensure Level 2 items are visually distinct from Level 1 (e.g., through indentation, smaller font size, or muted color).
- **Active Page Visibility:** The active page indicator must be the most prominent visual state in the sidebar.

## Constraints

- **Accessibility:** The sidebar must be wrapped in a `<nav>` with a unique `aria-label`. Use `aria-expanded` for nested items.
- **Responsiveness:** The sidebar must not overlap content on desktop; it should push or squeeze the main content area.
- **Visual Hierarchy:** Branding and Workspace switchers must be at the top; User settings and help must be at the bottom.
- **Touch Targets:** All links and expand triggers must meet the 44x44px touch target minimum.

## Common Failure Patterns

- **Scroll-within-Scroll:** Having a scrollable sidebar and a scrollable content area that compete for user focus, leading to "scroll hijacking" feel.
- **The "Invisible Active" State:** Making the current page indicator so subtle that the user loses their place.
- **Over-nesting:** Going deeper than 3 levels, making the navigation feel like a file-system rather than an application.
- **Hidden Collapse Trigger:** Hiding the "Close" or "Collapse" button in a place where users can't find it.
- **Unlabeled Icons:** Using icons without text labels in the primary view, relying on "mystery meat" navigation.

## Validation Criteria

- [ ] Sidebar is structured into clear zones (Header, Body, Footer).
- [ ] Active state is clearly distinct from hover and default states.
- [ ] All Level 1 items have a unique and recognizable icon.
- [ ] Nested items are visually subordinated to their parent items.
- [ ] The sidebar is fully keyboard navigable (Tab and Arrow keys).
- [ ] Mobile and Tablet responsive states are defined and functional.
- [ ] ARIA landmarks and states are correctly implemented.
- [ ] Contrast ratios for text and indicators meet WCAG AA (4.5:1).
