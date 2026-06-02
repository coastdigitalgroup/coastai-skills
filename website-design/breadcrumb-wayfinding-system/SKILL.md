---
name: breadcrumb-wayfinding-system
description:
  Design and implement a systematic framework for secondary navigation trails
  that provide orientation, context, and one-click access to parent levels in
  deep information architectures.
---

# Breadcrumb and Wayfinding System

## Purpose

The Breadcrumb and Wayfinding System provides a methodology for designing the
secondary navigation trails that sit above the main content. It ensures that
users never feel "lost" in deep information architectures (IA) by providing a
clear, linear map of their current location relative to the home page or root
directory. This system balances navigational precision with minimal visual
weight, ensuring users can understand their context and traverse back to parent
levels with a single click.

## Use Cases

- **E-commerce:** Navigating through Category > Sub-category > Product.
- **Documentation & Wikis:** Moving through Volume > Chapter > Section > Page.
- **SaaS Dashboards:** Managing nested entities like Account > Project > Asset.
- **Directory Sites:** Browsing through Location > Category > Listing.
- **Search Results:** Showing the path to a specific item found via search.

## When NOT to Use

- **Flat Architectures:** If the site is only 1–2 levels deep (Home > Page),
  breadcrumbs add unnecessary clutter.
- **Linear Progressions:** For step-by-step wizards or checkout flows, use
  `step-progress-system` instead.
- **Dynamic/Non-Hierarchical Paths:** If the user's path is based on session
  history (e.g., "Back to Search Results") rather than a fixed structure, use a
  "Back" button instead.
- **Landing Pages:** Where the goal is a single conversion and navigation
  distracts from the primary CTA.

## Inputs

1. **Information Architecture (IA):** The hierarchical map of the site.
2. **Current Node:** The specific page the user is currently viewing.
3. **Parent Hierarchy:** The chain of ancestors from the current page to the
   root.
4. **Display Constraints:** Available horizontal width (from
   `responsive-grid-system`).

## Outputs

1. **Wayfinding Blueprint:** A defined anatomy for labels, separators, and links.
2. **Truncation Strategy:** Rules for handling long paths on small screens or
   overflow scenarios.
3. **Responsive Mapping:** How the trail collapses or transforms for mobile
   viewports.
4. **Semantic Accessibility Layer:** Defined ARIA roles and labels for screen
   readers.

## Workflow

### 1. Map the Hierarchical Path

Determine the absolute path from the Home/Root to the current page.
*Example:* `Home > Resources > Whitepapers > [Current Page Title]`

### 2. Define the Visual Anatomy

Establish the styling for each component:
- **The Links:** Standard link style (from `interactive-state-system`).
- **The Separators:** A non-interactive symbol (e.g., `/`, `>`, or `→`) that
  visually distinguishes levels.
- **The Current Page:** A non-clickable, plain-text label that confirms the user's
  location.

### 3. Establish Spatial Rhythm

Apply the `fluid-spacing-system`:
- **Gaps:** Use small, consistent spacing (e.g., `--space-xs`) between links and
  separators.
- **Vertical Placement:** Place the trail consistently above the main `<h1>` but
  below the global site header.

### 4. Implement Truncation & Overflow

For deep paths (4+ levels) or long titles:
- **Middle Truncation:** Collapse intermediate levels into an ellipsis (`...`)
  if the total width exceeds the container (e.g., `Home > ... > Section > Page`).
- **Label Truncation:** Use `max-width` and `text-overflow: ellipsis` for
  individual long labels to prevent wrapping.

### 5. Plan for Responsive Adaptation

Map the mobile experience:
- **The "Back to Parent" Pattern:** On very small screens, replace the full
  trail with a single "<- Back to [Parent]" link to save space.
- **Horizontal Scroll:** Allow the breadcrumb list to scroll horizontally if the
  full trail must be preserved.

## Decision Rules

- **The "Root Always" Rule:** The first item in the trail should always be the
  functional root (usually "Home").
- **Current Page State:** The last item in the breadcrumb (the current page) must
  NOT be a link. This prevents users from clicking on a link to the page they
  are already on.
- **Logical vs. History:** Breadcrumbs must reflect the site structure, NOT the
  user's browser history.
- **Separator Visibility:** Separators should have lower visual weight (e.g.,
  muted color) than the links to avoid competing for attention.

## Constraints

- **Accessibility:** Must be wrapped in a `<nav>` element with
  `aria-label="Breadcrumb"`.
- **Contrast:** Links and separators must meet WCAG AA (4.5:1) requirements.
- **Length:** Breadcrumb labels should match the page titles exactly (or use a
  shortened version if the title is excessively long).

## Common Failure Patterns

- **The "Lost Home":** Not including the Home/Root link, forcing users to use the
  main menu to start over.
- **Link Overkill:** Making the current page a clickable link, which reloads the
  same page and confuses users.
- **Visual Competition:** Using separators that are too large or high-contrast,
  making the trail hard to read.
- **Wrap Breakage:** Allowing breadcrumbs to wrap into 3+ lines on mobile,
  pushing the main content too far down the page.
- **Inconsistent IA:** Showing different paths for the same page depending on
  how the user reached it.

## Validation Criteria

- [ ] The trail starts with the Home/Root node.
- [ ] The current page is the last item and is NOT clickable.
- [ ] The breadcrumbs are wrapped in a `<nav aria-label="Breadcrumb">` landmark.
- [ ] Visual separators are used and have a lower contrast than the links.
- [ ] The trail adapts gracefully to mobile viewports (truncation or "Back" link).
- [ ] Spacing between items is consistent and follows the fluid spacing system.
- [ ] Keyboard users can `Tab` through intermediate links.
