---
name: tab-ui-system
description:
  Design and implement a systematic framework for organizing related but
  mutually exclusive content into a single view, ensuring clear visual
  affordances, state logic, and responsive adaptation.
---

# Tab UI System

## Purpose

The Tab UI System provides a methodology for designing and structuring
tabs—navigational elements that allow users to toggle between related content
panes within the same context. Tabs are a key pattern for **progressive
disclosure**, helping to reduce cognitive load by organizing information into
logical groups without requiring a page reload. A systematic approach ensures
that tabs have clear active states, logical grouping, and adapt gracefully
across devices.

## Use Cases

- **Product Detail Pages:** Organizing specifications, reviews, shipping
  details, and FAQ into scannable sections.
- **Account Settings:** Grouping user profile, security, notifications, and
  billing settings.
- **Dashboards:** Switching between different data views (e.g., "Overview,"
  "Analytics," "History").
- **Search Results:** Filtering results by type (e.g., "All," "Images," "Videos,"
  "News").
- **Complex Forms:** Breaking down large forms into themed sections (if steps
  don't need to be completed in a strict order).

## When NOT to Use

- **Sequential Steps:** If the user must complete content in a specific order,
  use `step-progress-system` instead.
- **Global Navigation:** Tabs should manage content *within* a page; use
  `site-navigation-system` for moving between different pages.
- **Comparing Information:** If a user needs to see content from two sections
  simultaneously, do not use tabs. Consider an accordion or a side-by-side
  layout.
- **Too Few Items:** If there are only two items and the content is short, consider
  showing both or using a simple toggle.
- **Too Many Items:** If you have more than 6-7 tabs, the interface becomes
  cluttered. Consider a sidebar navigation or a dropdown-based filter.

## Inputs

1. **Content Inventory:** A list of labels and their corresponding content
   panels.
2. **Context of Use:** Where the tabs will live (e.g., main content area,
   sidebar, or within a modal).
3. **Priority Level:** Is this the primary focus of the page or a secondary
   detail?
4. **Existing Systems:** Fluid spacing, typography scales, and interactive
   state definitions.

## Outputs

1. **Tab Anatomy Spec:** Visual definitions for Triggers (the tabs), the
   Tablist (the container), and the Panels (the content).
2. **State Matrix:** Defined visual treatments for Default, Hover, Active,
   Focus, and Disabled states.
3. **Responsive Strategy:** Rules for handling overflow (Scrollable, Wrapped,
   or Collapsed into Accordion/Select).
4. **Accessibility Blueprint:** ARIA roles, keyboard mapping, and focus
   management rules.

## Workflow

### 1. Define the Content Relationship

Ensure all tabs are at the same level of hierarchy and relate to the same
parent entity. Labels should be short (1-3 words) and use consistent casing.

### 2. Establish Visual Anatomy

Apply the `visual-hierarchy-system` to define the tablist:

- **The Active Tab:** Must be the most prominent. Use a combination of color,
  font weight, and a visual indicator (like a bottom border or background fill).
- **The Inactive Tab:** Should look interactive but secondary.
- **The Content Panel:** Usually shares a visual container or alignment with
  the active tab to create a "connected" feel.

### 3. Define Interaction Logic

- **Immediate Switching:** Content should change instantly upon interaction.
- **Hover vs. Click:** Tabs must *never* switch on hover; they require an
  explicit click or tap.
- **Default State:** The first tab is typically active by default unless the
  user is returning to a specific state.

### 4. Optimize for Spacing and Touch

Apply `fluid-spacing-system` and `interactive-state-system`:

- **Touch Targets:** Each tab trigger should meet WCAG 2.2 SC 2.5.8 (24x24px
  minimum); prefer 44x44px for primary tab UIs.
- **Internal Gaps:** Use consistent spacing between tabs (usually `--space-s`
  or `--space-m`).
- **Active Indicator:** Ensure the "Active" line or background is thick enough
  to be seen clearly.

### 5. Plan for Responsiveness

Determine how the tablist handles narrow viewports:

- **Horizontal Scroll:** The most common mobile pattern. Allow the tablist to
  overflow horizontally with a subtle fade or arrow to indicate more content.
- **Accordion Transformation:** For long content, transform the tabs into an
  accordion layout on mobile.
- **Select Menu:** For utility-heavy tabs, replace the tablist with a `<select>`
  element on mobile.

## Decision Rules

- **The "Labels" Rule:** If labels vary significantly in length, use
  left-aligned tabs. If they are consistent and few, use centered or justified
  tabs.
- **Horizontal vs. Vertical:**
  - **Horizontal:** Standard for top-of-content organization.
  - **Vertical:** Best for deep lists (settings) or when horizontal space is
    limited but vertical space is abundant.
- **The "Seven" Rule:** Limit horizontal tabs to 7 items. If you need more,
  reevaluate your information architecture or use a vertical layout.
- **Active Indicator:** Always use more than just color to indicate the active
  state (e.g., a 2px-3px underline or a bold font weight shift).

## Constraints

- **Accessibility:** Follow the ARIA APG Tabs pattern — `role="tablist"` on the
  container, `role="tab"` with `aria-selected` and `aria-controls` on each
  trigger, and `role="tabpanel"` with `aria-labelledby` pointing back to its
  tab. Only the active tab has `tabindex="0"`; inactive tabs use
  `tabindex="-1"` (roving tabindex).
- **Activation Model:** Prefer automatic activation (arrow keys move focus and
  switch panel content immediately) for fast, lightweight panels. Use manual
  activation (arrow keys move focus only; `Enter`/`Space` confirms) if
  switching triggers an expensive network request.
- **Keyboard Navigation:** Left/Right Arrow (or Up/Down for vertical tabs)
  moves between tabs; `Home`/`End` jump to first/last tab; `Tab` moves focus
  out of the tablist into the active panel.
- **Contrast:** Active and Inactive states must meet WCAG AA (4.5:1 for text).
- **Responsiveness:** Tabs must never cause horizontal page scrolling; the
  tablist itself should handle overflow.

## Common Failure Patterns

- **Hidden Active State:** Using a subtle color change that is hard to see,
  leaving users unsure which section they are viewing.
- **Content Jump:** Tab panels that vary wildly in height, causing the footer
  to jump up and down as users switch tabs.
- **Misused for Navigation:** Using tabs to link to separate pages, which
  breaks user expectations for instant content switching.
- **Mobile Truncation:** Cutting off tab labels on mobile without providing a
  way to see the rest.
- **Missing Focus States:** Forgetting to design a visible focus ring for
  keyboard users.

## Validation Criteria

- [ ] All tabs are related to the same context.
- [ ] Active state is visually distinct (more than just color).
- [ ] Each tab trigger meets at least the WCAG 2.2 24x24px touch target
      minimum (44x44px preferred).
- [ ] ARIA roles (`tablist`, `tab`, `tabpanel`) are correctly assigned, with
      `aria-selected` and roving `tabindex` implemented.
- [ ] Keyboard navigation (Arrow keys, Home/End) is supported per the ARIA APG
      Tabs pattern.
- [ ] Responsive behavior (scroll, accordion, or select) is defined.
- [ ] Content panels maintain a consistent visual relationship with the tabs.
