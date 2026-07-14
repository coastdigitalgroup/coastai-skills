---
name: table-of-contents-system
description:
  Design and implement a systematic framework for in-page navigation that
  orientates users within long-form content and provides direct access to
  document sections via scroll-synced links.
---

# Table of Contents (ToC) System

## Purpose

The Table of Contents (ToC) System provides a methodology for designing in-page
navigation menus that reflect the structure of a single page or document. It
solves the problem of "scroll fatigue" in long-form content by providing a
constant visual map of the page's hierarchy, allowing users to understand their
current context and jump to specific sections instantly without losing their
place.

## Use Cases

- **Documentation & Technical Guides:** Navigating deep hierarchies of headers
  and sub-headers.
- **Long-form Articles & Blog Posts:** Providing a roadmap for 2,000+ word
  editorial content.
- **Complex Landing Pages:** Helping users jump between Feature, Pricing, and
  FAQ sections.
- **Legal & Policy Pages:** Navigating dense clauses and numbered sections.
- **Resource Hubs:** Organizing long lists of links or tools on a single page.

## When NOT to Use

- **Short Content (<3 sections):** If the entire page can be scanned in two
  scrolls, a ToC adds unnecessary visual noise.
- **Primary Site Navigation:** Do not use a ToC for moving between different
  pages; use `site-navigation-system` instead.
- **Linear Wizards:** For step-by-step processes where the user must follow a
  fixed order, use `step-progress-system`.
- **Minimalist Marketing:** Where the goal is a single, uninterrupted narrative
  flow without diversion.

## Inputs

1.  **Heading Hierarchy:** The map of `<h2>` through `<h4>` tags on the page.
2.  **Layout Context:** The available horizontal space (Sidebar vs. Inline).
3.  **Scroll Container:** Is the scroll happening on the body or a specific
    overflowing container?
4.  **Brand Tokens:** Spacing, typography, and "Active" state colors from the
    design system.

## Outputs

1.  **ToC Anatomy Spec:** Visual definitions for list items, indentation levels,
    and the "Active" indicator.
2.  **Scroll-Spy Blueprint:** Logic for how the "Active" state updates as the
    user scrolls.
3.  **Responsive Adaptation Map:** How the ToC transforms from a Desktop sidebar
    to a Mobile utility (e.g., Sticky Header or Bottom Drawer).
4.  **Wayfinding Spec:** Definition of smooth-scroll behaviors and focus
    management.

## Workflow

### 1. Audit the Document Outline

Extract the heading structure. A clean ToC depends on a logical `h1 -> h2 -> h3`
progression.
-   **Primary Level:** Usually derived from `<h2>` tags.
-   **Secondary Level:** Derived from `<h3>` tags (indented).
-   **Tertiary Level:** Rarely shown in the ToC unless the document is
    exceptionally dense; consider collapsing these by default.

### 2. Select the Layout Pattern

Choose a spatial arrangement based on the page layout:
-   **Persistent Sidebar (Right/Left):** Best for wide screens (Desktop). Keeps
    the map visible at all times.
-   **Inline Summary:** Placed at the top of the article. Best for mobile or
    medium-length content where "stickiness" isn't required.
-   **Sticky Header/Floating Bar:** A minimized version that appears only after
    scrolling past the hero.

### 3. Establish Visual Hierarchy (Levels)

Apply the `visual-hierarchy-system` to indicate depth:
-   **Indentation:** Use consistent horizontal padding (e.g., `--space-s` per
    level) to show parent-child relationships.
-   **Typography:** Use a smaller font size or muted color for sub-levels (h3)
    compared to primary levels (h2).
-   **Indicators:** Use a vertical "progress line" on the left/right of the list
    to visually connect the items.

### 4. Design the Scroll-Spy (Active) State

The ToC must stay in sync with the user's viewport:
-   **The Active Link:** Highlight the link corresponding to the section currently
    at the top of the viewport.
-   **The "Active Line" Effect:** If using a vertical line, animate a marker
    to slide to the active item's position.
-   **Feedback Delay:** Ensure the active state updates quickly (<100ms) but
    includes a small buffer to prevent flickering when scrolling between headers.

### 5. Plan Responsive Wayfinding

Sidebars usually disappear on mobile; provide an alternative:
-   **The Mobile ToC Trigger:** A sticky button (e.g., "In this section") at the
    top or bottom of the screen that opens a drawer.
-   **The Progressive Reveal:** Show only the current `<h2>` in a sticky bar, with
    a chevron to expand the full list.

## Decision Rules

-   **The "Three-Level" Limit:** Never show more than 3 levels of depth in a
    ToC. If the content is deeper, simplify the ToC to focus on `h2` and `h3`
    only.
-   **Indentation over Icons:** Use indentation to show hierarchy rather than
    bullets or icons, which can clutter the dense text list.
-   **Active State Uniqueness:** Only ONE item in the ToC should be "Active" at
    a time.
-   **Sticky Threshold:** The ToC should become sticky (fixed) only when it
    reaches the top of the viewport, not immediately upon page load.
-   **Click to Jump:** Clicking a ToC link must use "Smooth Scrolling" to prevent
    disorientation, and MUST update the URL hash (`#section-id`) for shareability.

## Constraints

-   **Accessibility:** The ToC must be wrapped in a `<nav>` with
    `aria-label="Table of contents"`. The active link must use
    `aria-current="true"` (or `aria-current="location"`). Ensure the focus
    ring is visible when tabbing through links.
-   **Contrast:** Active and inactive states must meet WCAG AA (4.5:1)
    requirements.
-   **Responsiveness:** On mobile, the ToC must not overlap the main text content;
    use a drawer or a toggleable section.
-   **Content Sync:** Link text in the ToC should match the heading text exactly
    (or be a clearly recognizable shortened version).

## Common Failure Patterns

-   **The "Stale" State:** The ToC highlighting the wrong section because the
    scroll-spy trigger point is set too high or too low.
-   **The Content Obscurer:** A sticky ToC that overlaps the text it's supposed
    to be helping the user read.
-   **Depth Overload:** Showing every single `h4` and `h5`, making the ToC
    longer than the viewport and requiring its own scrollbar (avoid nested
    scrollbars).
-   **Missing IDs:** Links that don't work because the headings lack matching
    `id` attributes.
-   **Broken Back Button:** Jumping to a section without updating the URL hash,
    preventing users from using the browser's "Back" button to return to the
    ToC.

## Validation Criteria

- [ ] A clear visual hierarchy (indentation) exists between `h2` and `h3` levels.
- [ ] Scroll-spy correctly highlights the active section as the user scrolls.
- [ ] Clicking a link triggers a smooth scroll to the correct section.
- [ ] The URL hash is updated upon clicking a ToC link.
- [ ] The ToC is wrapped in a `<nav aria-label="Table of contents">` landmark.
- [ ] The active state is accessible via `aria-current`.
- [ ] A mobile-specific wayfinding pattern (e.g., Drawer or Sticky Bar) is
      defined.
- [ ] No more than 3 levels of hierarchy are displayed.
