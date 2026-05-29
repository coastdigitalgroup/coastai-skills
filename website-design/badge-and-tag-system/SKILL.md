---
name: badge-and-tag-system
description:
  Design and implement a systematic framework for Badges (status indicators) and
  Tags (categorization elements) to communicate metadata, state, and
  classification with clarity and accessibility.
---

# Badge and Tag System

## Purpose

The Badge and Tag System provides a methodology for designing small,
informational components that provide quick-glance metadata about an object.
While often used interchangeably, this system distinguishes between **Badges**
(non-interactive indicators of state or status) and **Tags** (often interactive
labels used for categorization or filtering). It ensures that these elements
don't clutter the UI but instead provide meaningful, accessible, and
hierarchically correct information.

## Use Cases

- Communicating the status of an object (e.g., "Paid," "Pending," "Error").
- Categorizing content or products (e.g., "SaaS," "E-commerce," "New Arrival").
- Displaying count-based metadata (e.g., "12 Comments," "5 New Messages").
- Indicating user-defined labels or "folders" in a dashboard.
- Marking high-priority or time-sensitive items (e.g., "Live," "Expiring Soon").

## When NOT to Use

- **Primary Actions:** Never use a badge or tag as a substitute for a primary
  button or CTA.
- **Large Volumes of Text:** If the metadata requires more than 2-3 words, use a
  standard text block or description list.
- **Critical Error Alerts:** For system-wide or page-level errors that require
  immediate user attention, use a **Toast** or **Alert** component.
- **Navigation:** Do not use tags as the primary site navigation; use the
  `site-navigation-system` instead.

## Inputs

1. **Information Type:** Is the element indicating a State (Badge) or a Category
   (Tag)?
2. **Metadata Value:** The specific text or count to be displayed.
3. **Semantic Context:** What is the "mood" of the information? (Success,
   Warning, Danger, Info, or Neutral).
4. **Interaction Level:** Does the user need to click the element to filter or
   remove it?

## Outputs

1. **Badge/Tag Anatomy Spec:** Visual definitions for padding, border-radius,
   font-size, and icon placement.
2. **Semantic Color Palette:** A defined set of background and text color pairs
   that meet WCAG AA contrast.
3. **Interactive State Matrix:** (For Tags) Definition of Hover, Focus, and
   "Remove" (dismissible) states.
4. **Implementation Logic:** CSS classes or component properties for different
   variants (Solid, Outline, Pill).

## Workflow

### 1. Categorize the Element

Determine if the element is a Badge or a Tag:
- **Badge (Status):** Communicates "What state is this item in?" (Usually
  read-only).
- **Tag (Category):** Communicates "What group does this item belong to?"
  (Often clickable).

### 2. Select the Visual Style (Variant)

Choose a variant based on the surrounding UI density:
- **Solid:** High prominence. Best for critical statuses (e.g., "Error").
- **Subtle/Tonal:** Low prominence. Best for secondary categories or background
  metadata.
- **Outline:** Minimalist. Best for avoiding visual noise in data-heavy tables.
- **Pill vs. Rounded:** Use Pills (fully rounded) for counts and statuses; use
  Rounded (small radius) for categories to distinguish them from buttons.

### 3. Assign Semantic Colors

Map the metadata to a color based on established patterns:
- **Green (Success):** Completed, Paid, Active, Verified.
- **Yellow/Orange (Warning):** Pending, Low Stock, Expiring.
- **Red (Danger):** Overdue, Error, Deleted, High Risk.
- **Blue (Info):** New, Featured, Processing, Tip.
- **Gray (Neutral):** Archived, Draft, Category, General.

### 4. Define Sizing and Typography

- **Scale:** Keep badges/tags smaller than the body text (e.g., 0.75rem to
  0.875rem).
- **Weight:** Use `Medium` or `Semibold` weights to maintain legibility at
  small sizes.
- **Padding:** Maintain a 1:2 ratio (vertical:horizontal) for a balanced look
  (e.g., 2px 8px).

### 5. Handle Interactivity (Tags Only)

- **Filtering:** If clicking a tag filters the view, provide a hover state.
- **Dismissible:** If a tag can be removed, include a "Close" (X) icon with a
  clear hit area (min 24x24px within the tag).

## Decision Rules

- **The "Two Word" Rule:** Limit badge/tag text to two words max. If it needs
  more, it's not a tag.
- **Avoid Icon Overload:** Only use icons if they add immediate clarity (e.g., a
  check for "Verified"). Don't add icons to every tag.
- **Case Consistency:** Use `Sentence case` or `UPPERCASE` consistently.
  Avoid `lowercase` as it can look like a typo at small sizes.
- **Placement Logic:**
  - Place **Badges** near the object's title or status column.
  - Place **Tags** at the bottom of a card or in a dedicated "Labels" section.

## Constraints

- **Accessibility:** Text-to-background contrast must be at least 4.5:1 (WCAG
  AA).
- **No Color-Only Meaning:** A "Danger" badge must use the word "Error" or an
  icon, not just the color red.
- **Responsiveness:** Badges/tags should never wrap their internal text. Use
  `white-space: nowrap`.
- **Touch Targets:** For dismissible tags, the "X" button must be easy to tap
  without clearing the whole tag accidentally.

## Common Failure Patterns

- **The "Button Lookalike":** Designing tags that look identical to primary
  buttons, leading users to expect a major action.
- **Color Overload:** Using too many different colors on one screen, creating a
  "fruit salad" effect that obscures meaning.
- **Poor Legibility:** Using light-colored text on light backgrounds (e.g.,
  white text on a yellow badge).
- **Redundancy:** Using a "Success" color and the word "Success" for an item
  that is already in a "Completed" list.

## Validation Criteria

- [ ] Badges and Tags are visually distinct from primary buttons.
- [ ] Contrast ratios meet WCAG AA (4.5:1) for all color variants.
- [ ] Semantic colors are used logically (e.g., red for errors, green for
      success).
- [ ] Dismissible tags have a clear, accessible "close" mechanism.
- [ ] Typography is legible (minimum 11px or 0.7rem).
- [ ] Spacing and border-radius are consistent across all variants.
