---
name: badge-and-tag-system
description:
  Design and implement a systematic framework for informational elements that
  communicate state (Badges) and categorization (Tags) with clarity and
  accessibility.
---

# Badge and Tag System

## Purpose

The Badge and Tag System provides a methodology for designing and implementing small, informational components that provide quick context, status, or categorization. This skill ensures that these elements remain secondary to primary content while being instantly scannable, accessible, and logically organized across a website.

## Use Cases

- **Status Indicators:** Showing the state of an object (e.g., "Active," "Pending," "Sold Out").
- **Categorization:** Labeling content by topic, type, or collection (e.g., "Productivity," "Tutorial," "New Arrival").
- **Quantity/Counts:** Displaying numbers associated with an item (e.g., "12 Notifications," "5 Items in Cart").
- **Filter Visibility:** Showing active filters that can be removed by the user.
- **Priority Signaling:** Highlighting specific attributes like "Best Seller" or "Urgent."

## When NOT to Use

- **Primary Actions:** Do not use badges or tags as the main Call-to-Action (CTA); use buttons from the `interactive-state-system`.
- **Large Content Blocks:** If the information requires more than 2-3 words, use a `card-ui-system` or standard typography.
- **Navigation:** While tags can lead to filtered views, they should not replace the primary `site-navigation-system`.
- **Decorative-only Icons:** If the element has no semantic meaning, it belongs in the `iconography-system`.

## Inputs

1. **Content Intent:** Is it a status (state), a category (metadata), or a count (number)?
2. **Interactive Requirement:** Is the element static, or is it removable/clickable?
3. **Hierarchy Context:** What is the parent element? (e.g., a card, a header, a table row).
4. **Color Tokens:** Existing semantic color scale (Success, Warning, Error, Info).

## Outputs

1. **Visual Anatomy Spec:** Definitions for border-radius (pill vs. rounded), padding, and typography.
2. **Semantic Color Matrix:** Mapping of colors to specific meanings (e.g., Green = Success).
3. **Interactive Specs:** Visual treatments for hover, focus, and "remove" (X) actions.
4. **Placement Rules:** Guidelines for where these elements sit relative to titles and images.

## Workflow

### 1. Distinguish between Badge and Tag

Define the functional role first:
- **Badges:** Generally indicate **Status** (e.g., "Live") or **Counts** (e.g., "3"). They are usually non-interactive or link to a single state.
- **Tags:** Generally indicate **Categorization** (e.g., "SaaS"). They are often interactive, allowing users to filter content or remove the tag.

### 2. Establish Visual Anatomy

Define the base style to ensure they don't look like buttons:
- **Typography:** Use a smaller, often all-caps or semibold font (e.g., 12px/0.75rem).
- **Border Radius:**
  - **Pill (Full Round):** Best for statuses and counts.
  - **Rounded (4-8px):** Best for categorization and removable tags.
- **Sizing:** Keep height consistent (e.g., 20px-24px) to ensure they align well with text.

### 3. Assign Semantic Logic (Color & Icons)

Use color to communicate meaning without forcing the user to read:
- **Success (Green):** "Complete," "Active," "Verified."
- **Warning (Yellow/Orange):** "Pending," "Low Stock," "Draft."
- **Error (Red):** "Failed," "Critical," "Out of Stock."
- **Info/Neutral (Blue/Gray):** "New," "Category," "Metadata."

*Rule:* Always pair color with text or an icon to ensure accessibility for colorblind users.

### 4. Define Interactive States

If the tag is interactive:
- **Hover/Focus:** Apply a subtle background shift or border change.
- **Removable:** Include a clear "X" icon with a minimum hit area of 24x24px (WCAG 2.2 SC 2.5.8), sized up to 44x44px where layout allows for comfortable touch use.

### 5. Determine Placement and Hierarchy

- **Overlay:** Placing a "New" badge in the top corner of an image.
- **Inline:** Placing a status badge immediately after a title in a `page-header-system`.
- **Grouped:** Stacking multiple tags below a description in a `card-ui-system`.

## Decision Rules

- **The "Squint Test":** If a badge is so bright it distracts from the H1, reduce its saturation or use an outline style.
- **Limit the Count:** Never use more than 3 tags on a single card to prevent visual clutter.
- **Text Length:** Keep labels to 1-2 words. Truncate or use tooltips if data is dynamic and unpredictable.
- **Button Distinction:** Badges should have a different visual treatment (e.g., smaller size, different radius) than the primary "Submit" or "Buy" buttons.

## Constraints

- **Accessibility:** Text inside badges/tags must meet WCAG AA (4.5:1 contrast). Interactive tags must be keyboard navigable.
- **Responsiveness:** Tags in a group should wrap to the next line (`flex-wrap: wrap`) rather than overflowing the container.
- **Touch Targets:** Removable tags must have a large enough target for the "close" action (min 24x24px per WCAG 2.2 SC 2.5.8; 44x44px preferred).

## Common Failure Patterns

- **The "Button Mimic":** Making tags look exactly like buttons, leading users to expect a primary action.
- **Color Over-reliance:** Using red/green/yellow without text labels, making it impossible for colorblind or screen-reader users to understand status.
- **Tag Soup:** Crowding a card with 10+ tags, making none of them useful.
- **Inconsistent Radius:** Mixing pill-shaped badges and square-cornered tags in the same UI.

## Validation Criteria

- [ ] Badges and tags are visually distinct from buttons.
- [ ] Semantic colors are used consistently (e.g., Green always means Success).
- [ ] Contrast ratios meet WCAG AA (4.5:1) for all color variations.
- [ ] Interactive tags include focus states and touch targets of at least 24x24px (WCAG 2.2 SC 2.5.8).
- [ ] Elements wrap gracefully on mobile viewports.
- [ ] Icons are used alongside color for critical status indicators.
