---
name: accordion-ui-system
description:
  Design and implement a systematic framework for progressive disclosure using
  accordions, ensuring structural integrity, visual affordances, and
  accessibility across different content densities and devices.
---

# Accordion UI System

## Purpose

The Accordion UI System skill provides a methodology for designing and
structuring accordions—stacked headers that expand to reveal associated
content. This pattern is essential for **progressive disclosure**, allowing
users to skim high-level information and choose which details to consume. A
systematic approach to accordions ensures that they reduce cognitive load
without hiding critical information or creating accessibility barriers.

## Use Cases

- **FAQ Sections:** Organizing a long list of questions and answers into a
  scannable list.
- **Mobile Menus:** Collapsing secondary navigation items to save vertical
  space.
- **Complex Forms:** Grouping related form fields into manageable, toggleable
  sections.
- **Product Details:** Hiding technical specifications, shipping info, or
  reviews on e-commerce pages.
- **Filtering:** Managing multiple facet groups in a discovery sidebar.

## When NOT to Use

- **Small Content Volumes:** If the total content is brief, hiding it behind a
  click adds unnecessary interaction cost.
- **Critical Instructions:** If a user *must* read the information to proceed
  (e.g., legal warnings or "how-to" steps), do not hide it.
- **Search-Heavy Pages:** If users need to use the browser's "Find" (Cmd/Ctrl+F)
  frequently; hidden accordion content is often not searchable by default.
- **Single Item Disclosure:** Use a simple "Show More" link or a single
  disclosure component if there is only one piece of content to toggle.

## Inputs

1. **Content Inventory:** A list of headers and their corresponding expanded
   content.
2. **Expansion Logic:** Should only one item be open at a time (Exclusive), or
   can multiple be open?
3. **Trigger Context:** Where will the accordion live? (e.g., main content
   area, sidebar, or mobile drawer?)
4. **Existing Systems:** Fluid spacing and typography scales from the parent
   design system.

## Outputs

1. **Accordion Anatomy Spec:** Visual definitions for Headers, Icons, Panels,
   and Spacing.
2. **Interaction Spec:** Behavior for expansion, focus states, and transitions.
3. **Accessibility Blueprint:** ARIA roles, states, and keyboard mapping.
4. **Responsive Strategy:** Rules for how the accordion adapts to narrow
   viewports.

## Workflow

### 1. Structure the Content Anatomy

Define the standard parts of an accordion item:

- **The Header (Trigger):** The clickable area containing the title.
- **The Icon (Affordance):** Usually a chevron or plus/minus sign to indicate
  expandability.
- **The Panel:** The container that holds the hidden content.
- **The Group:** The parent container that manages the relationship between
  multiple items.

### 2. Establish Visual Affordances

Apply `visual-hierarchy-system` to ensure the accordion is recognizable:

- **State Indicators:** Use icons (chevrons) that rotate or change when the
  accordion is open.
- **Separation:** Use borders, background color shifts, or vertical spacing
  (from `fluid-spacing-system`) to distinguish items.
- **Headers:** Ensure the header text looks interactive (higher weight or
  different color).

### 3. Define the Interaction Logic

Choose the behavior pattern:

- **Exclusive (Single-Open):** Opening one item automatically closes the
  others. Best for focus and reducing page length.
- **Multi-Open:** Multiple items can remain open. Best for when users need to
  compare information across sections.
- **Default State:** Determine if the first item should be open by default
  to signal functionality.

### 4. Optimize for Spacing and Content

Apply `fluid-spacing-system` to the interior:

- **Header Padding:** Ensure the touch target is at least 44x44px.
- **Panel Padding:** Use internal padding to create a clear relationship
  between the header and its content.
- **Transitions:** Use subtle height or opacity transitions (200-300ms) to
  soften the "jump" when content appears.

### 5. Verify Accessibility and Responsiveness

- **Keyboard:** Users must be able to `Tab` to headers and use `Enter/Space`
  to toggle.
- **ARIA:** Use `aria-expanded="true/false"` and `aria-controls`.
- **Mobile:** Ensure long headers wrap gracefully and don't overlap icons.

## Decision Rules

- **The Chevron Rule:** Always include a visual indicator (like a chevron) on
  the right side of the header. It should point down when closed and up when
  open.
- **The First-Item Rule:** Open the first accordion item by default if it
  contains the most important or most requested information.
- **Text Truncation:** Never truncate accordion headers. If a title is long,
  let it wrap to multiple lines to ensure clarity.
- **Alignment:** Keep the expand/collapse trigger icon consistent (usually
  aligned to the far right) to create a predictable scan path.

## Constraints

- **Accessibility:** Headers must use semantic heading tags (H2-H4) wrapped in
  a button for keyboard access.
- **Responsiveness:** Accordion width should be fluid (100% of parent). Panel
  content must be fully responsive.
- **Hierarchy:** Accordion headers should never be visually more prominent
  than the page's H1.

## Common Failure Patterns

- **Mystery Meat Triggers:** Accordion headers that look like plain text,
  leaving users unaware they can be clicked.
- **Content Jumping:** Fast, jerky transitions that disorient the user's
  scroll position.
- **Missing Focus States:** Forgetting to design a visible focus ring for
  keyboard users.
- **Overstuffed Panels:** Placing too much complex interactive content (like
  other accordions) inside a panel, leading to "nested inception."
- **Inaccessible ARIA:** Failing to update `aria-expanded` states
  programmatically.

## Validation Criteria

- [ ] Every accordion item has a clear visual indicator (e.g., chevron).
- [ ] Headers are keyboard-accessible (button-based) with visible focus states.
- [ ] `aria-expanded` and `aria-controls` are correctly defined.
- [ ] Internal spacing follows the fluid spacing system.
- [ ] The exclusive/multi-open logic is appropriate for the content type.
- [ ] The accordion transitions smoothly without breaking layout.
- [ ] Mobile touch targets meet the 44x44px minimum.
