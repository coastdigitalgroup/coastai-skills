---
name: filter-and-sort-system
description:
  Design and implement a systematic framework for content discovery interfaces,
  defining the visual and spatial organization of filters, facets, and sorting
  controls to maximize findability and reduce cognitive load.
---

# Filter and Sort System

## Purpose

The Filter and Sort System provides a methodology for designing discovery
interfaces that help users navigate large datasets or product catalogs. While
technical implementation handles the logic, this system defines the **spatial
composition** and **visual affordances** of the discovery tools. It ensures
that users can easily refine their view, understand their current state of
filtering, and switch between prioritization modes (sorting) without losing
context or feeling overwhelmed.

## Use Cases

- Designing the sidebar or top-bar discovery layer for e-commerce sites.
- Organizing complex search results pages (SERPs) for directories or resource
  hubs.
- Implementing "Discovery Drawers" for mobile-first application interfaces.
- Creating faceted navigation for content-heavy documentation or blog archives.

## When NOT to Use

- **Small Datasets (<12 items):** If all content fits in a single view, adding
  filtering and sorting introduces unnecessary interaction cost.
- **Single-Path Workflows:** Where the user is meant to follow a linear
  sequence rather than explore a catalog.
- **Raw Data Tables:** Where users are likely to use browser-native "Find" or
  advanced spreadsheet-like tools (though high-level sorting still helps).

## Inputs

1. **Facet Inventory:** A list of all attributes users can filter by (e.g., Size,
   Color, Rating, Price).
2. **Priority Ranking:** Which facets are "Primary" (used by 80% of users) vs.
   "Secondary" (niche specifications).
3. **Control Types:** Mapping data types to UI controls (e.g., Checkboxes for
   multi-select, Range sliders for price).
4. **Layout Context:** The available horizontal and vertical space (from the
   `responsive-grid-system`).

## Outputs

1. **Discovery Layout Blueprint:** Defined placement for the filter bar (Sidebar
   vs. Top-bar) and the results grid.
2. **Facet Component Spec:** Visual design for checkboxes, swatches, and range
   inputs within the discovery context.
3. **State Map:** Visual treatments for Active Filters (chips/pills), Loading
   states (skeletons), and Empty states.
4. **Responsive Strategy:** A plan for how filters transform from Desktop (e.g.,
   Sidebar) to Mobile (e.g., Bottom Drawer).

## Workflow

### 1. Select the Primary Layout Pattern

Choose a spatial arrangement based on the number of facets:

- **Sidebar (Left/Right):** Best for 5+ facets. Provides high visibility and
  persistent access to discovery tools.
- **Horizontal Top Bar:** Best for 1–4 facets. Maximizes the width for results
  but can become cluttered if more facets are added later.
- **Overlay/Drawer:** Best for mobile or "clean" desktop interfaces where
  discovery is a secondary task.

### 2. Define Facet Visual Hierarchy

Apply `visual-hierarchy-system` principles to the filter list:

- **Group Headers:** Use bold, concise titles (e.g., **Category**, **Brand**).
- **Control Sizing:** Ensure checkboxes and text links have enough vertical
  rhythm (usually `--space-s` gap).
- **Initially Expanded vs. Collapsed:** Expand the top 3 most-used facets;
  collapse the rest to save vertical space.

### 3. Design the "Active State" System

Users must always know what filters are applied:

- **Summarization (Pills/Chips):** Place a horizontal list of active filters
  above the results or at the top of the sidebar.
- **Clear All:** Provide a single, prominent action to reset the entire view.
- **Visual Feedback:** The results container should indicate it is "updating"
  (e.g., 20% opacity or a skeleton screen) when a filter is toggled.

### 4. Establish Sorting Affordances

Distinguish between inclusion (Filtering) and prioritization (Sorting):

- **Placement:** Keep sorting in the top-right or top-left of the results
  area, separate from the filters.
- **Labeling:** Use clear labels like "Sort by: Price (Low to High)" rather than
  just "Price."

### 5. Plan for Mobile Discovery

- **The Discovery Trigger:** Use a sticky button (e.g., "Filter & Sort") at the
  bottom or top of the screen.
- **The Drawer Pattern:** Open filters in a full-screen or bottom drawer to
  maximize touch target size.
- **Immediate vs. Batch:** Decide if the mobile view should update instantly
  (Faceted) or require a "Show X Results" button to apply.

## Decision Rules

- **The "80/20" Rule:** Only show the top 5 values for any given facet; use a
  "Show More" link to reveal the rest.
- **Sidebar vs. Top Bar:** If your facet list requires scrolling on a standard
  laptop screen, use a Sidebar. If it fits in one line, use a Top Bar.
- **Selection Persistence:** Applied filters must remain visible even if they
  are scrolled out of the sidebar (e.g., using a sticky chip bar).
- **Empty State Fallback:** Never allow a filter combination to lead to a dead
  end; always provide a "Reset" button or suggested alternatives.

## Constraints

- **Accessibility:** All filter controls must have visible focus rings and be
  operable via keyboard. Use `aria-expanded` for collapsible facets and
  `aria-live="polite"` on the results count/container so screen reader users
  know when results have updated.
- **Responsiveness:** Filters must stack or move into a drawer on mobile to
  avoid horizontal overflow or "squeezing" the content grid. Prefer container
  queries over viewport breakpoints when the filter bar can appear in more than
  one layout context (e.g., sidebar vs. embedded widget).
- **Contrast:** Ensure that active/selected states (e.g., a checked box or a
  blue chip) meet the 3:1 contrast ratio against the background.

## Common Failure Patterns

- **The "Mystery Filter":** Users can't tell which filters are active because
  there's no summary pill/chip bar.
- **The "Infinite Sidebar":** A sidebar that is so long it becomes a task to
  manage, often caused by not using "Show More" for long lists.
- **Mobile Cramming:** Trying to fit a desktop sidebar into a mobile view,
  making the results grid unreadable.
- **Lack of "Applied" Feedback:** Toggling a filter without the results grid
  visually indicating a change (even if the change is fast).
- **The Dead End:** Filtering down to zero items and providing no way to go
  back.

## Validation Criteria

- [ ] A clear distinction exists between Filtering (inclusion) and Sorting
      (prioritization).
- [ ] Active filters are summarized visually (e.g., chips/pills).
- [ ] Top-used facets are expanded by default; others are collapsible.
- [ ] A "Clear All" or "Reset" action is easily accessible.
- [ ] The system provides a mobile-specific discovery pattern (e.g., Drawer).
- [ ] Loading states (skeletons/spinners) are defined for when the results
      update.
- [ ] All controls meet touch-target size (24x24px minimum per WCAG 2.2 SC
      2.5.8, 44x44px preferred) and keyboard accessibility requirements.
