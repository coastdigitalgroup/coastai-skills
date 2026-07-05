---
name: search-interface-system
description:
  Design a systematic framework for the end-to-end search experience, defining
  the visual and spatial organization of search triggers, autocomplete patterns,
  and results page layouts to maximize findability.
---

# Search Interface System

## Purpose

The Search Interface System provides a methodology for designing a cohesive,
high-performance discovery experience. While `internal-search-optimization`
focuses on the "growth" and logic side, this system defines the **design
patterns** and **spatial ergonomics** of the search UI. It ensures that users
can find the search entry point instantly, interact with it effortlessly (even
on mobile), and process results in a way that minimizes cognitive load and
maximizes the "scent of information."

## Use Cases

- Designing the search entry points in global headers or persistent toolbars.
- Creating the "Command Center" or "Omnibox" experience for SaaS applications.
- Structuring e-commerce "Visual Search" and autocomplete dropdowns.
- Designing high-density Search Results Pages (SERPs) for documentation or
  catalogs.
- Implementing "Full-screen Search" overlays for mobile-first designs.

## When NOT to Use

- **Static Landing Pages:** Where the content is fixed and discovery is not a
  primary goal.
- **Micro-Sites (<20 pages):** Where robust navigation and breadcrumbs are
  sufficient for findability.
- **Purely Relational Dashboards:** Where data is accessed exclusively via
  defined filters and tabs rather than free-text search.

## Inputs

1. **User Intent Profile:** Is the user looking for a specific SKU (Precision)
   or exploring a topic (Discovery)?
2. **Catalog Density:** How many items are in the system, and how diverse is the
   metadata?
3. **Primary Device:** Is the search predominantly used on mobile (touch) or
   desktop (keyboard)?
4. **Existing Systems:** Color systems, spacing tokens, and typography scales
   (from `fluid-spacing-system` and `fluid-typography-system`).

## Outputs

1. **Search Trigger Spec:** Visual definitions for the search bar (static,
   expandable, or icon-only).
2. **Autocomplete Anatomy:** Design for the suggestion dropdown, including
   categories, images, and keyboard states.
3. **SERP Layout Blueprint:** Spatial organization of the results page,
   balancing metadata density and readability.
4. **Mobile Interaction Map:** A plan for how search transitions from a header
   icon to a full-screen focused interface.

## Workflow

### 1. Define the Search Trigger Pattern

Choose a trigger based on its importance to the user journey:

- **The Persistent Bar:** Always visible, high-contrast input. Best for
  e-commerce or search-primary sites.
- **The Expandable Input:** Starts as an icon or small bar and expands on
  click. Best for sites where search is secondary to navigation.
- **The "Command + K" Trigger:** A subtle hint or icon that opens a modal. Best
  for power-user SaaS tools or documentation.

### 2. Design the Autocomplete (Instant) Experience

Reduce the "distance to result" by providing immediate feedback:

- **Categorization:** Group results by type (e.g., Products, Articles, Help).
- **Rich Metadata:** Include small thumbnails, prices, or status badges within
  the dropdown.
- **Focused State:** Use `interactive-state-system` to clearly highlight the
  currently selected suggestion for keyboard users.
- **ARIA Pattern:** Model the input/listbox relationship on the ARIA APG
  Combobox pattern (`role="combobox"` with `aria-expanded`,
  `aria-controls`, and `aria-activedescendant` pointing at the highlighted
  `role="option"`) rather than inventing a custom interaction model.

### 3. Establish the Results Page (SERP) Hierarchy

Apply `visual-hierarchy-system` to the search results:

- **The "Query Echo":** Display the user's search term prominently to confirm
  the context.
- **Result Cards:** Use the `card-ui-system` to standardize the result
  format.
- **Metadata Weight:** Ensure titles are the most prominent, followed by the
  "Snippet" (the part of the content that matches the query).

### 4. Build the Mobile Discovery Layer

Search on mobile is a dedicated mode, not a widget:

- **The Mode Shift:** Tapping search should open a full-screen overlay to remove
  background distractions.
- **Auto-Focus:** Automatically focus the input and trigger the keyboard.
- **The "Thumb-Zone" Action:** Place a "Clear" and "Cancel" button within easy
  reach (min 44x44px).

### 5. Define Loading and Empty States

- **Skeleton Results:** Use `skeleton-state-system` to maintain layout
  stability while results are fetching.
- **Smart No-Results:** Use `empty-state-system` to provide alternative
  paths when no exact matches are found.

## Decision Rules

- **The Visibility Rule:** If search is used by >30% of your audience, it must
  be a persistent, full-width bar on desktop.
- **The "Three-Word" Minimum:** Don't start showing auto-suggestions until the
  user has typed at least 3 characters (to prevent visual jitter).
- **The Result Limit:** Limit autocomplete suggestions to 5-8 items. If more
  exist, provide a "View all results for '...'" link.
- **Scent of Information:** Bold the matching terms in the search results
  snippet to help users quickly scan for relevance.

## Constraints

- **Accessibility:** The search input must have a visible label (or `aria-label`).
  Keyboard users must be able to navigate the autocomplete list using arrow
  keys, select with `Enter`, and dismiss with `Escape` without losing their
  typed query. All interactive targets (clear button, suggestion rows) must
  meet the WCAG 2.2 24x24px minimum target size (2.5.8).
- **Responsiveness:** Autocomplete dropdowns must never exceed the viewport
  width.
- **Contrast:** Highlighting matching text must meet WCAG AA contrast ratios
  (usually using a background-color shift or bolding).

## Common Failure Patterns

- **The "Hidden Search":** Forcing users to hunt for a magnifying glass icon
  when search is the primary way they navigate.
- **The "Disconnected" Dropdown:** Autocomplete menus that don't match the
  width or alignment of the input, creating visual "float."
- **Keyboard Trap:** Not allowing users to exit the search overlay or dropdown
  with the `Escape` key.
- **The Dead-End Results:** Not maintaining the search term in the input box
  on the results page, forcing the user to re-type if they want to refine.

## Validation Criteria

- [ ] Search entry point is visible within 2 seconds of page scan.
- [ ] Autocomplete dropdown includes rich metadata (images/labels) where
      appropriate.
- [ ] Keyboard navigation (Arrows, Enter, Escape) is fully defined for search,
      following the ARIA APG combobox pattern.
- [ ] Mobile search opens a full-screen mode with immediate keyboard focus.
- [ ] Search results page echoes the query and highlights matching terms.
- [ ] Skeleton states are used for results loading.
- [ ] All interactive elements meet the 44x44px touch target minimum.
