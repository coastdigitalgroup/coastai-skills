---
name: user-avatar-system
description:
  Design and implement a systematic framework for user identity visualization,
  including sizing, fallback strategies, presence indicators, and avatar
  grouping to ensure consistent personal representation across the UI.
---

# User Avatar System

## Purpose

The User Avatar System provides a methodology for visualizing user identity through
graphical representatives. It ensures that user profiles, contributors, and
collaborators are presented consistently across different contexts, maintaining
visual rhythm and providing clear fallback mechanisms when images are missing or
loading. This system also manages the "meta-information" of identity, such as
presence status and collaborative groupings (stacks).

## Use Cases

- **User Profiles:** Displaying the current user or other users in account settings.
- **Collaborative Tools:** Showing multiple active participants in a document or workspace.
- **Comments & Activity Feeds:** Identifying actors in a chronological stream of events.
- **Messaging & Communication:** Representing senders and recipients in chat interfaces.
- **Author Attribution:** Giving credit to content creators in articles and blog posts.
- **Member Directories:** Listing users in a team, group, or organization.

## When NOT to Use

- **Non-Human Entities:** For company logos or brands, use `logo-grid-system`.
- **System Actions:** For purely functional icons (e.g., a "Delete" icon), use `iconography-system`.
- **Product Imagery:** For physical or digital products, use `imagery-and-media-system` or `card-ui-system`.
- **Abstract Decorative Elements:** For visual patterns that carry no identity information.

## Inputs

1. **User Data:** The source of identity (Image URL, Full Name, Username, Unique ID).
2. **Context of Use:** Where the avatar will sit (e.g., Navigation Bar, Card, Data Table).
3. **Presence Data:** Real-time status (Online, Away, Busy, Offline).
4. **Group Context:** Is the avatar displayed alone or as part of a list/stack?
5. **Brand Tokens:** Defined colors, border-radius standards, and spacing scales.

## Outputs

1. **Avatar Size Matrix:** A set of standardized dimensions (e.g., XS, SM, MD, LG, XL) mapped to specific use cases.
2. **Fallback Specification:** Design rules for displaying initials or generic icons when an image is unavailable.
3. **Presence Indicator Map:** Visual definitions for status overlays (color, placement, shape).
4. **Stacking/Grouping Blueprint:** Rules for overlapping avatars and "overflow" indicators (e.g., "+3 others").
5. **Interaction Matrix:** Hover and click behaviors for accessing profile details or menus.

## Workflow

### 1. Define the Size Matrix

Establish a consistent scale to ensure visual alignment:
- **XS (20px-24px):** Inline metadata, comment threads, small attribution.
- **SM (32px):** Standard list items, table rows, secondary navigation.
- **MD (40px-48px):** Primary navigation (user menu), card headers, activity feeds.
- **LG (64px-80px):** Profile summaries, search results, member directories.
- **XL (96px+):** Individual profile pages, large hero-style attributions.

### 2. Establish Fallback Strategies

Avatars must never appear broken or empty:
- **The Initials Pattern:** If no image is provided, display the user's first and last initial.
- **Color Assignment:** Assign a background color to initials based on the user's ID or name to ensure distinct identities are visually unique.
- **The Generic Icon:** If initials are unavailable or privacy is required, use a standardized "Person" icon.
- **Loading State:** Use a neutral circle with a shimmer (from `skeleton-state-system`) while the image fetches.

### 3. Design Presence & Status Overlays

Communicate availability without cluttering the UI:
- **Placement:** Usually the bottom-right corner of the avatar circle.
- **Shapes:** Use solid circles for online, rings for away, and "cutouts" or symbols for busy/DND.
- **Accessibility:** Use distinct shapes or icons for statuses (not just color) to support colorblind users.

### 4. Create Avatar Groups (Stacks)

Handle multiple users in a compact space:
- **Overlapping:** Avatars should overlap by 15-25% of their width.
- **Order:** Newest/Primary user should be on top (highest z-index), or order based on activity.
- **The Overflow Indicator:** If the group exceeds a limit (e.g., 5 users), the final element should be a "+X" count.
- **Border/Stroke:** Use a high-contrast border (matching the background) around each avatar in a stack to maintain separation.

### 5. Define Interactive Affordances

- **Hover State:** Apply a slight lift (elevation) or a subtle brightness shift.
- **Active State:** Show a clear ring or background change when clicked.
- **Tooltips:** Always show the user's full name on hover if the text is not already visible nearby.

## Decision Rules

- **The Shape Rule:** Use circular avatars for individuals to distinguish them from square/rounded-rect product or brand imagery.
- **The Initials Limit:** Use a maximum of 2 characters for initials.
- **Color Contrast:** Background colors for initial-based avatars must provide at least 4.5:1 contrast against the initials' text color.
- **Proportional Status:** The status indicator should be roughly 25-33% of the total avatar size.
- **The "Face" Focus:** Use `object-fit: cover` and ensure focal point logic (from `imagery-and-media-system`) centers the face.

## Constraints

- **Accessibility:** Avatars must have an `aria-label` or `alt` text containing the user's name. If decorative (next to a name label), use `aria-hidden="true"`.
- **Responsiveness:** Avatars should maintain their aspect ratio (1:1) regardless of viewport. Use fixed pixel sizes or fluid scales that preserve the circle shape.
- **Consistency:** Use the same size matrix across the entire application to prevent visual "noise" and misaligned lists.

## Common Failure Patterns

- **The Broken Link:** Showing a browser "missing image" icon instead of a designed fallback.
- **Low Contrast Initials:** Putting white text on a light gray background, making the identity unreadable.
- **Status Clutter:** Making status indicators too large or placing them in inconsistent locations.
- **Stacking Chaos:** Overlapping avatars without a border, causing them to blend into a single blob.
- **The "Squished" Face:** Using an incorrect aspect ratio that distorts the user's image.

## Validation Criteria

- [ ] Avatar sizes follow the established matrix (XS, SM, MD, LG, XL).
- [ ] Fallback (initials/icon) is displayed when the image is missing.
- [ ] Initial-based avatars meet WCAG AA contrast requirements.
- [ ] Presence indicators are visually distinct and include shape-based cues.
- [ ] Avatar stacks use consistent overlapping and overflow logic.
- [ ] All avatars have appropriate `alt` text or `aria-label` definitions.
- [ ] Aspect ratio is locked at 1:1 using `object-fit: cover`.
