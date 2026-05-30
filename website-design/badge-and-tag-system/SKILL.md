---
name: badge-and-tag-system
description:
  Design and implement a systematic framework for informational elements that
  communicate state (Badges) and categorization (Tags) with clarity and
  accessibility.
---

# Badge and Tag System

## Purpose

The Badge and Tag System provides a methodology for designing small,
high-context UI elements that communicate status, category, or metadata. It
solves the problem of visual clutter by standardizing how information is
weighted and grouped, ensuring that users can scan and differentiate between
system-driven states (e.g., "Success", "Overdue") and user-driven
classifications (e.g., "Personal", "Work").

## Use Cases

- Communicating status in data tables (e.g., "Active", "Pending", "Failed").
- Categorizing items in a list or library (e.g., "Tutorial", "Case Study").
- Highlighting attributes in product cards (e.g., "Sale", "New Arrival").
- Displaying numeric counts (e.g., unread messages in a navigation menu).
- Organizing user-generated content labels (e.g., "Priority: High").

## When NOT to Use

- **Primary Actions:** Never use a badge or tag in place of a Button. If the
  element is the primary way to trigger an action, it should be a Button.
- **Large Content Blocks:** If the information requires more than 2-3 words or
  includes complex formatting, use a Card or a Callout.
- **Critical System Alerts:** For page-level errors or high-priority
  interruptions, use a Toast or an Alert banner.
- **Navigation:** Do not use badges/tags as primary navigation links unless they
  are part of a filter/sort system.

## Inputs

1. **Information Type:** Is it a Status (state-driven), a Tag (categorization),
   or a Badge (numeric/count)?
2. **Semantic Meaning:** What is the intent? (e.g., Neutral, Success, Warning,
   Error).
3. **Visual Context:** Where will it live? (e.g., inside a Button, on a Card,
   next to a Title).
4. **Interaction Level:** Is it static (read-only) or interactive (removable,
   clickable filter)?

## Outputs

1. **Anatomy Spec:** Definition of the container (padding, border-radius) and
   content (text, icons).
2. **Color Logic Matrix:** Mapping of semantic meanings to specific color and
   contrast pairings.
3. **Hierarchy System:** Distinction between "Solid" (high emphasis) and
   "Subtle/Outline" (low emphasis) variants.
4. **Interactive States:** Design for hover, focus, and "Remove" (X) actions.

## Workflow

### 1. Identify the Information Class

Distinguish between the three primary types:
- **Status (Badge):** Communicates the current state of an object. Usually
  follows a semantic color scheme.
- **Tag:** Communicates categorization or attributes. Usually uses a varied or
  neutral color scheme.
- **Count (Badge):** Displays a numeric value (e.g., "+5"). Usually small,
  circular, and positioned as an overlay.

### 2. Define the Visual Anatomy

Apply the `visual-hierarchy-system`:
- **Shape:** Use a high border-radius (often pill-shaped) to distinguish them
  from buttons or square inputs.
- **Sizing:** Keep them small. Ensure font size is readable but significantly
  smaller than the primary body text.
- **Icons:** Use icons to reinforce meaning (e.g., a checkmark for "Success") to
  support accessibility and quick scanning.

### 3. Establish Color and Emphasis Tiers

Assign visual weight based on importance:
- **High Emphasis (Solid):** Solid background with high-contrast text. Use for
  critical statuses like "Error" or "Urgent".
- **Medium Emphasis (Subtle):** Tinted background with dark text. Best for
  general categorization and non-critical status.
- **Low Emphasis (Outline):** Transparent background with a border. Best for
  secondary metadata or user-generated tags.

### 4. Determine Interaction Patterns

- **Static:** Informational only.
- **Removable:** Includes an "X" icon. Used in filters or multi-select inputs.
- **Selectable:** Changes state when clicked. Used in filter chips.

### 5. Plan for Scaling and Truncation

- **Max Width:** Define a maximum width for tags to prevent layout breaks.
- **Truncation:** Use ellipsis (...) if the tag text exceeds the max width, but
  ensure the full text is available via a tooltip.

## Decision Rules

- **The Color Rule:** Never use color alone to convey status. Always include
  text or an icon to ensure users with color blindness can distinguish states.
- **The Contrast Rule:** Text inside badges must meet WCAG AA contrast (4.5:1).
  If the background is too light, use a darker border or text.
- **Badge vs. Tag:** If it's about *what it is*, use a Tag. If it's about *what
  it's doing*, use a Status Badge.
- **Placement:** Status badges should be placed near the object's name or title.
  Tags should be grouped together at the bottom or top of a container.

## Constraints

- **Accessibility:** Interactive tags must have a focus state and a clear
  `aria-label` (especially for "Remove" buttons).
- **Responsiveness:** Badges must never cause horizontal overflow. Use flex-wrap
  for tag groups.
- **Touch Targets:** Removable/Interactive tags must ensure the clickable area
  (especially the "X") is large enough (min 24px for the icon, inside a 44px
  parent if possible).

## Common Failure Patterns

- **Button Mimicry:** Making tags look so much like buttons that users try to
  click them to "submit" something.
- **Color Overload:** Using too many different colors for tags, which makes the
  page look messy and dilutes the meaning of semantic colors.
- **Tiny Text:** Using font sizes below 11px, making them unreadable for many
  users.
- **No Contrast:** Putting white text on a light yellow badge, making it
  invisible to users with low vision.
- **Crowded Layouts:** Not providing enough gap between tags, causing them to
  blend into a single unreadable mass.

## Validation Criteria

- [ ] Status colors follow a consistent semantic logic (Green=Success, etc.).
- [ ] Text-to-background contrast meets WCAG AA (4.5:1).
- [ ] Tags and Badges are visually distinct from Buttons.
- [ ] Icons are used to reinforce meaning in status badges.
- [ ] Tag groups use `flex-wrap` to handle small screens.
- [ ] Interactive elements have clearly defined focus states.
- [ ] ARIA labels are present for removable tags.
